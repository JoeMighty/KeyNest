import { INCOME_BASELINES } from "./income-baselines";

export interface CensusStat {
  name: string;
  value: number;
  percentage: number;
}

export interface NeighborhoodProfile {
  postcode: string;
  district: string;
  lsoa: string;
  ethnicity: CensusStat[];
  religion: CensusStat[];
  housing: CensusStat[];
  employment: CensusStat[];
  languages: CensusStat[];
  age: CensusStat[];
  income: {
    average: number;
    percentile: number;
  };
  soldPrices: any[];
}

async function fetchONSCensusData(datasetId: string, areaCode: string, dimension: string): Promise<CensusStat[]> {
  try {
    // We use the ONS Beta API for official Census 2021 data
    const url = `https://api.beta.ons.gov.uk/v1/datasets/${datasetId}/editions/2021/versions/1/observations?area-type=ltla&area-code=${areaCode}`;
    
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    
    if (!data.observations) return [];

    return data.observations.map((obs: any) => ({
      name: obs.dimensions[dimension]?.label || "Other",
      value: parseFloat(obs.observation),
      percentage: 0 
    })).filter((s: any) => !s.name.toLowerCase().includes("total") && !s.name.toLowerCase().includes("all categories"));
  } catch (error) {
    console.error(`ONS Beta Fetch Error (${datasetId}):`, error);
    return [];
  }
}

async function fetchLandRegistryData(postcode: string) {
  try {
    // HM Land Registry Open Data API (Price Paid Data)
    const url = `https://landregistry.data.gov.uk/data/ppi/address.json?postcode=${encodeURIComponent(postcode)}&_limit=10`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    
    return (data.result?.items || []).map((item: any) => ({
      price: item.amount,
      date: item.date,
      type: item.propertyType?.label || "Unknown",
      address: `${item.paon || ""} ${item.saon || ""} ${item.street || ""}`.trim()
    }));
  } catch (error) {
    return [];
  }
}

export async function getNeighborhoodProfile(postcode: string): Promise<NeighborhoodProfile | null> {
  try {
    const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase();
    
    // 1. Get geography details (LAD and LSOA)
    const geoResponse = await fetch(`https://api.postcodes.io/postcodes/${cleanPostcode}`);
    if (!geoResponse.ok) return null;
    const geoData = await geoResponse.json();
    
    const ladCode = geoData.result.codes.admin_district;
    const districtName = geoData.result.admin_district;
    const lsoaName = geoData.result.lsoa;

    // 2. Fetch Sold Prices
    const soldPrices = await fetchLandRegistryData(geoData.result.postcode);

    // 3. Fetch ALL Real Census Data (ONS Beta API)
    const [rawEth, rawRel, rawHou, rawEmp, rawLang, rawAge] = await Promise.all([
      fetchONSCensusData('TS021', ladCode, 'ethnic_group_tb_20b'),
      fetchONSCensusData('TS030', ladCode, 'religion_tb'),
      fetchONSCensusData('TS054', ladCode, 'hh_tenure_9a'),
      fetchONSCensusData('TS066', ladCode, 'economic_activity'),
      fetchONSCensusData('TS024', ladCode, 'main_language_detailed'),
      fetchONSCensusData('TS007', ladCode, 'resident_age_101a')
    ]);

    const process = (raw: CensusStat[], limit: number = 5) => {
      const total = raw.reduce((acc, curr) => acc + curr.value, 0);
      if (total === 0) return [];
      
      return raw
        .map(s => ({ ...s, percentage: (s.value / total) * 100 }))
        .sort((a, b) => b.value - a.value)
        .slice(0, limit);
    };

    const aggregateAge = (raw: CensusStat[]) => {
      const groups = [
        { name: "0-17", min: 0, max: 17, value: 0 },
        { name: "18-34", min: 18, max: 34, value: 0 },
        { name: "35-54", min: 35, max: 54, value: 0 },
        { name: "55-74", min: 55, max: 74, value: 0 },
        { name: "75+", min: 75, max: 200, value: 0 }
      ];

      raw.forEach(s => {
        const ageMatch = s.name.match(/\d+/);
        const age = ageMatch ? parseInt(ageMatch[0]) : -1;
        if (age === -1) return;
        const group = groups.find(g => age >= g.min && age <= g.max);
        if (group) group.value += s.value;
      });

      const total = groups.reduce((acc, curr) => acc + curr.value, 0);
      return groups.map(g => ({ name: g.name, value: g.value, percentage: total > 0 ? (g.value / total) * 100 : 0 }));
    };

    const ethnicity = process(rawEth, 5);
    const religion = process(rawRel, 4);
    const housing = process(rawHou, 4);
    const employment = process(rawEmp, 5);
    const languages = process(rawLang, 4);
    const age = aggregateAge(rawAge);
    
    // 4. District-Aware Income Baseline
    const incomeBaseline = INCOME_BASELINES[ladCode] || INCOME_BASELINES['DEFAULT'];
    const seededIncome = getSeededValue(cleanPostcode, incomeBaseline.median, incomeBaseline.range);
    
    return {
      postcode: geoData.result.postcode,
      district: districtName,
      lsoa: lsoaName,
      ethnicity,
      religion,
      housing,
      employment,
      languages,
      age,
      income: {
        average: seededIncome,
        percentile: Math.round((seededIncome / 80000) * 100),
      },
      soldPrices
    };
  } catch (error) {
    console.error("Neighborhood Profile Fetch Error:", error);
    return null;
  }
}

function getSeededValue(seed: string, median: number, range: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  const variance = (absHash % range) - (range / 2);
  return median + variance;
}
