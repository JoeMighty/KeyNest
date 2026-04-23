const datasets = [
  { id: 'census-2021-religion-ltla', dim: 'religion_tb_10b' },
  { id: 'census-2021-age-ltla', dim: 'age_101yr_tb_21b' },
  { id: 'census-2021-economic-activity-status-ltla', dim: 'economic_activity_status_12b' },
  { id: 'census-2021-main-language-ltla', dim: 'main_language_detailed_tb_11b' }
];

async function check() {
  for (const ds of datasets) {
    const url = `https://api.beta.ons.gov.uk/v1/datasets/${ds.id}/editions/2021/versions/1`;
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        console.log(`Failed ${ds.id}: ${resp.status}`);
        continue;
      }
      const data = await resp.json();
      console.log(`${ds.id} dims:`, data.dimensions.map(d => d.name));
    } catch (e) {
      console.error(e);
    }
  }
}

check();
