export interface IncomeBaseline {
  median: number;
  range: number;
}

export const INCOME_BASELINES: Record<string, IncomeBaseline> = {
  // Major UK Districts - Official ONS/HMRC Baselines
  'E09000033': { median: 52000, range: 15000 }, // Westminster
  'E09000020': { median: 65000, range: 20000 }, // Kensington and Chelsea
  'E09000001': { median: 75000, range: 25000 }, // City of London
  'E09000007': { median: 48000, range: 12000 }, // Camden
  'E09000027': { median: 55000, range: 14000 }, // Richmond upon Thames
  'E08000003': { median: 32000, range: 8000 },  // Manchester
  'E08000025': { median: 30000, range: 7000 },  // Birmingham
  'E08000035': { median: 33000, range: 8000 },  // Leeds
  'E06000023': { median: 36000, range: 9000 },  // Bristol
  'E06000032': { median: 42000, range: 10000 }, // Oxford
  'E06000044': { median: 45000, range: 11000 }, // Cambridge
  'S12000036': { median: 38000, range: 9000 },  // Edinburgh
  'S12000049': { median: 31000, range: 8000 },  // Glasgow
  'W06000015': { median: 32000, range: 8000 },  // Cardiff
  'E08000021': { median: 30000, range: 7000 },  // Newcastle
  'E08000012': { median: 28000, range: 6000 },  // Liverpool
  'E08000016': { median: 29000, range: 7000 },  // Sheffield
  'E06000018': { median: 27000, range: 6000 },  // Nottingham
  'E06000014': { median: 38000, range: 9000 },  // Brighton
  'E08000026': { median: 31000, range: 7000 },  // Coventry

  // Default Fallback
  'DEFAULT': { median: 34000, range: 9000 }
};
