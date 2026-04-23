const fs = require('fs');

async function downloadUKCensus() {
  const datasets = [
    { id: 'NM_2021_1', dim: 'ethnic_group_tb_20b', key: 'ethnicity' },
    { id: 'NM_2030_1', dim: 'religion_tb', key: 'religion' },
    { id: 'NM_2054_1', dim: 'tenure_8b', key: 'housing' },
    { id: 'NM_2066_1', dim: 'economic_activity_status_12b', key: 'employment' },
    { id: 'NM_2024_1', dim: 'main_language_detailed', key: 'languages' },
    { id: 'NM_2007_1', dim: 'resident_age_101a', key: 'age' }
  ];

  const masterDB = {};

  console.log("Starting full UK Census download (Districts)...");

  for (const d of datasets) {
    console.log(`Fetching ${d.key} for all districts...`);
    const url = `https://www.nomisweb.co.uk/api/v01/dataset/${d.id}.data.json?geography=TYPE154&${d.dim}=all&select=geography_code,geography_name,${d.dim}_name,obs_value`;

    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (!data.obs) {
        console.log(`Failed to get data for ${d.key}`);
        continue;
      }

      data.obs.forEach(obs => {
        const code = obs.geography_code;
        const name = obs[`${d.dim}_name`];
        const value = obs.obs_value;

        if (name.toLowerCase().includes("total") || name.toLowerCase().includes("all categories")) return;

        if (!masterDB[code]) {
          masterDB[code] = { 
            name: obs.geography_name,
            ethnicity: [], religion: [], housing: [], employment: [], languages: [], age: [] 
          };
        }

        masterDB[code][d.key].push({
          name: name.split(':').pop().trim(),
          percentage: value // We'll convert to % later or store raw if we want
        });
      });
    } catch (e) {
      console.error(`Error fetching ${d.key}:`, e);
    }
  }

  // Convert raw values to percentages and aggregate Age
  console.log("Processing and aggregating data...");
  for (const code in masterDB) {
    const area = masterDB[code];
    
    // Process regular demographics
    ['ethnicity', 'religion', 'housing', 'employment', 'languages'].forEach(key => {
      const total = area[key].reduce((acc, curr) => acc + curr.percentage, 0);
      if (total > 0) {
        area[key] = area[key]
          .map(item => ({ name: item.name, percentage: (item.percentage / total) * 100 }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 8); // Keep top 8 for each
      }
    });

    // Aggregate Age into buckets
    const ageRaw = area.age;
    const ageGroups = [
      { name: "0-17", min: 0, max: 17, val: 0 },
      { name: "18-34", min: 18, max: 34, val: 0 },
      { name: "35-54", min: 35, max: 54, val: 0 },
      { name: "55-74", min: 55, max: 74, val: 0 },
      { name: "75+", min: 75, max: 200, val: 0 }
    ];

    ageRaw.forEach(a => {
      const ageMatch = a.name.match(/\d+/);
      const age = ageMatch ? parseInt(ageMatch[0]) : -1;
      const group = ageGroups.find(g => age >= g.min && age <= g.max);
      if (group) group.val += a.percentage;
    });

    const ageTotal = ageGroups.reduce((acc, curr) => acc + curr.val, 0);
    area.age = ageGroups.map(g => ({
      name: g.name,
      percentage: ageTotal > 0 ? (g.val / ageTotal) * 100 : 0
    }));
  }

  const outputPath = 'src/data/uk-census-db.json';
  fs.writeFileSync(outputPath, JSON.stringify(masterDB, null, 2));
  console.log(`Success! Saved 300+ districts to ${outputPath}`);
}

downloadUKCensus();
