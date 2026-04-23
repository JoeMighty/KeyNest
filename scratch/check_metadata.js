async function checkMetadata() {
  const datasets = [
    'NM_2021_1', // Ethnicity
    'NM_2030_1', // Religion
    'NM_2054_1', // Tenure
    'NM_2066_1', // Employment
    'NM_2024_1', // Language
    'NM_2007_1'  // Age
  ];

  for (const id of datasets) {
    const url = `https://www.nomisweb.co.uk/api/v01/dataset/${id}/def.json`;
    console.log(`Checking ${id}...`);
    try {
      const r = await fetch(url);
      const data = await r.json();
      const dims = data.structure.keyfamilies.keyfamily.components.dimension;
      console.log(`Dimensions for ${id}:`, dims.map(d => d.conceptref));
    } catch (e) {
      console.error(`${id} failed:`, e);
    }
  }
}
checkMetadata();
