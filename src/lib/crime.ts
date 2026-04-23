export interface CrimeData {
  category: string;
  location_type: string;
  location: {
    latitude: string;
    longitude: string;
    street: {
      id: number;
      name: string;
    };
  };
  context: string;
  outcome_status: {
    category: string;
    date: string;
  } | null;
  persistent_id: string;
  id: number;
  location_subtype: string;
  month: string;
}

export interface PostcodeResult {
  postcode: string;
  latitude: number;
  longitude: number;
  admin_district: string;
  parliamentary_constituency: string;
}

export async function getCoordsFromPostcode(postcode: string): Promise<PostcodeResult | null> {
  try {
    const response = await fetch(`https://api.postcodes.io/postcodes/${postcode.replace(/\s+/g, '')}`);
    if (!response.ok) return null;
    const data = await response.json();
    if (data.status !== 200) return null;
    
    return {
      postcode: data.result.postcode,
      latitude: data.result.latitude,
      longitude: data.result.longitude,
      admin_district: data.result.admin_district,
      parliamentary_constituency: data.result.parliamentary_constituency,
    };
  } catch (error) {
    console.error("Error fetching postcode:", error);
    return null;
  }
}

export async function getCrimes(lat: number, lng: number): Promise<CrimeData[]> {
  try {
    // The Police API usually has a 1-2 month lag. 
    // If we don't provide a date, it returns the latest available.
    // crimes-street/all-crime provides a 1-mile radius search (roughly)
    const response = await fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching crimes:", error);
    return [];
  }
}

export function groupCrimesByCategory(crimes: CrimeData[]) {
  const groups: Record<string, number> = {};
  crimes.forEach(crime => {
    const category = crime.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    groups[category] = (groups[category] || 0) + 1;
  });
  
  return Object.entries(groups)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
