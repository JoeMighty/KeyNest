export interface DemographicProfile {
  ethnicity: { name: string; percentage: number }[];
  religion: { name: string; percentage: number }[];
  housing: { name: string; percentage: number }[];
  employment: { name: string; percentage: number }[];
  languages: { name: string; percentage: number }[];
  age: { name: string; percentage: number }[];
}

export const DEMOGRAPHIC_PROFILES: Record<string, DemographicProfile> = {
  // Westminster - High-end urban profile
  'E09000033': {
    ethnicity: [{ name: "White", percentage: 58 }, { name: "Asian", percentage: 17 }, { name: "Black", percentage: 8 }, { name: "Mixed", percentage: 6 }, { name: "Other", percentage: 11 }],
    religion: [{ name: "Christian", percentage: 41 }, { name: "Muslim", percentage: 20 }, { name: "No Religion", percentage: 26 }, { name: "Other", percentage: 13 }],
    housing: [{ name: "Owned", percentage: 31 }, { name: "Private Rent", percentage: 42 }, { name: "Social Rent", percentage: 27 }],
    employment: [{ name: "Full-time", percentage: 55 }, { name: "Part-time", percentage: 12 }, { name: "Self-employed", percentage: 18 }, { name: "Other", percentage: 15 }],
    languages: [{ name: "English", percentage: 72 }, { name: "Arabic", percentage: 6 }, { name: "Spanish", percentage: 4 }, { name: "French", percentage: 3 }, { name: "Other", percentage: 15 }],
    age: [{ name: "0-17", percentage: 15 }, { name: "18-34", percentage: 38 }, { name: "35-54", percentage: 29 }, { name: "55-74", percentage: 14 }, { name: "75+", percentage: 4 }]
  },
  // Walsall - West Midlands industrial/residential
  'E08000030': {
    ethnicity: [{ name: "White", percentage: 71 }, { name: "Asian", percentage: 21 }, { name: "Black", percentage: 3 }, { name: "Mixed", percentage: 3 }, { name: "Other", percentage: 2 }],
    religion: [{ name: "Christian", percentage: 52 }, { name: "Muslim", percentage: 14 }, { name: "No Religion", percentage: 28 }, { name: "Sikh", percentage: 4 }, { name: "Other", percentage: 2 }],
    housing: [{ name: "Owned", percentage: 61 }, { name: "Social Rent", percentage: 24 }, { name: "Private Rent", percentage: 15 }],
    employment: [{ name: "Full-time", percentage: 42 }, { name: "Part-time", percentage: 18 }, { name: "Self-employed", percentage: 10 }, { name: "Other", percentage: 30 }],
    languages: [{ name: "English", percentage: 89 }, { name: "Panjabi", percentage: 4 }, { name: "Polish", percentage: 2 }, { name: "Urdu", percentage: 1 }, { name: "Other", percentage: 4 }],
    age: [{ name: "0-17", percentage: 24 }, { name: "18-34", percentage: 21 }, { name: "35-54", percentage: 26 }, { name: "55-74", percentage: 20 }, { name: "75+", percentage: 9 }]
  },
  // Coventry
  'E08000026': {
    ethnicity: [{ name: "White", percentage: 65 }, { name: "Asian", percentage: 18 }, { name: "Black", percentage: 9 }, { name: "Mixed", percentage: 4 }, { name: "Other", percentage: 4 }],
    religion: [{ name: "Christian", percentage: 44 }, { name: "Muslim", percentage: 10 }, { name: "No Religion", percentage: 35 }, { name: "Sikh", percentage: 5 }, { name: "Other", percentage: 6 }],
    housing: [{ name: "Owned", percentage: 54 }, { name: "Private Rent", percentage: 26 }, { name: "Social Rent", percentage: 20 }],
    employment: [{ name: "Full-time", percentage: 48 }, { name: "Part-time", percentage: 15 }, { name: "Self-employed", percentage: 9 }, { name: "Other", percentage: 28 }],
    languages: [{ name: "English", percentage: 84 }, { name: "Panjabi", percentage: 3 }, { name: "Polish", percentage: 2 }, { name: "Other", percentage: 11 }],
    age: [{ name: "0-17", percentage: 20 }, { name: "18-34", percentage: 32 }, { name: "35-54", percentage: 24 }, { name: "55-74", percentage: 17 }, { name: "75+", percentage: 7 }]
  },
  // Default UK Average
  'DEFAULT': {
    ethnicity: [{ name: "White", percentage: 81 }, { name: "Asian", percentage: 9 }, { name: "Black", percentage: 4 }, { name: "Mixed", percentage: 3 }, { name: "Other", percentage: 3 }],
    religion: [{ name: "Christian", percentage: 46 }, { name: "No Religion", percentage: 37 }, { name: "Muslim", percentage: 7 }, { name: "Other", percentage: 10 }],
    housing: [{ name: "Owned", percentage: 62 }, { name: "Private Rent", percentage: 20 }, { name: "Social Rent", percentage: 18 }],
    employment: [{ name: "Full-time", percentage: 45 }, { name: "Part-time", percentage: 16 }, { name: "Self-employed", percentage: 12 }, { name: "Other", percentage: 27 }],
    languages: [{ name: "English", percentage: 91 }, { name: "Other", percentage: 9 }],
    age: [{ name: "0-17", percentage: 21 }, { name: "18-34", percentage: 22 }, { name: "35-54", percentage: 27 }, { name: "55-74", percentage: 22 }, { name: "75+", percentage: 8 }]
  }
};
