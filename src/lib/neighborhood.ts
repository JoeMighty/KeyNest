export interface SoldPrice {
  price: number;
  date: string;
  type: string;
  address: string;
}

export interface CensusStat {
  name: string;
  value: number;
  percentage: number;
}

export interface NeighborhoodProfile {
  postcode: string;
  lsoa: string;
  district: string;
  ethnicity: CensusStat[];
  religion: CensusStat[];
  housing: CensusStat[];
  age: CensusStat[];
  employment: CensusStat[];
  soldPrices: SoldPrice[];
}

// Map Nomis Table IDs to readable categories
const TABLES = {
  ETHNICITY: "NM_2021_1", // Using simplified table IDs for this demonstration
  RELIGION: "NM_2021_1",
  HOUSING: "NM_2021_1",
  EMPLOYMENT: "NM_2021_1",
};

export async function fetchLandRegistryData(postcode: string): Promise<SoldPrice[]> {
  try {
    const formattedPostcode = postcode.replace(/\s+/g, "").toUpperCase();
    const response = await fetch(
      `https://landregistry.data.gov.uk/data/ppi/address.json?postcode=${formattedPostcode}&_limit=10`
    );
    if (!response.ok) return [];
    const data = await response.json();
    
    return data.result.items.map((item: any) => ({
      price: item.pricePaid,
      date: item.transactionDate,
      type: item.propertyType.label,
      address: `${item.paon} ${item.street}`,
    })).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Land Registry Error:", error);
    return [];
  }
}

export async function getNeighborhoodProfile(postcode: string): Promise<NeighborhoodProfile | null> {
  try {
    // 1. Get LSOA from postcodes.io
    const pcResponse = await fetch(`https://api.postcodes.io/postcodes/${postcode.replace(/\s+/g, '')}`);
    if (!pcResponse.ok) return null;
    const pcData = await pcResponse.json();
    const { lsoa, admin_district, codes } = pcData.result;

    // 2. Fetch Sold Prices
    const soldPrices = await fetchLandRegistryData(postcode);

    // 3. Mock/Simplified Census Data (As the actual ONS/Nomis API requires complex area-code mapping)
    // In a production app, we'd use the Nomis API with the LSOA code.
    // For this demonstration, I'll provide a structure that we'll populate with realistic mocks 
    // or further API calls if time permits.
    
    return {
      postcode: pcData.result.postcode,
      lsoa: lsoa,
      district: admin_district,
      ethnicity: [
        { name: "White", value: 75, percentage: 75 },
        { name: "Asian", value: 12, percentage: 12 },
        { name: "Black", value: 6, percentage: 6 },
        { name: "Mixed", value: 4, percentage: 4 },
        { name: "Other", value: 3, percentage: 3 },
      ],
      religion: [
        { name: "Christian", value: 45, percentage: 45 },
        { name: "No Religion", value: 38, percentage: 38 },
        { name: "Muslim", value: 8, percentage: 8 },
        { name: "Other", value: 9, percentage: 9 },
      ],
      housing: [
        { name: "Owned", value: 62, percentage: 62 },
        { name: "Private Rent", value: 22, percentage: 22 },
        { name: "Social Rent", value: 14, percentage: 14 },
        { name: "Other", value: 2, percentage: 2 },
      ],
      age: [
        { name: "0-17", value: 21, percentage: 21 },
        { name: "18-34", value: 24, percentage: 24 },
        { name: "35-54", value: 28, percentage: 28 },
        { name: "55-74", value: 19, percentage: 19 },
        { name: "75+", value: 8, percentage: 8 },
      ],
      employment: [
        { name: "Full-time", value: 55, percentage: 55 },
        { name: "Part-time", value: 15, percentage: 15 },
        { name: "Self-employed", value: 12, percentage: 12 },
        { name: "Unemployed", value: 4, percentage: 4 },
        { name: "Student/Other", value: 14, percentage: 14 },
      ],
      languages: [
        { name: "English", value: 92, percentage: 92 },
        { name: "Polish", value: 2, percentage: 2 },
        { name: "Romanian", value: 1.5, percentage: 1.5 },
        { name: "Panjabi", value: 1, percentage: 1 },
        { name: "Other", value: 3.5, percentage: 3.5 },
      ],
      income: {
        average: 38500,
        percentile: 65,
      },
      soldPrices
    };
  } catch (error) {
    console.error("Neighborhood Profile Error:", error);
    return null;
  }
}
