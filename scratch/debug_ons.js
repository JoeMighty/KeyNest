async function checkONS() {
  const ladCode = 'E09000033'; // Westminster
  const datasets = [
    { id: 'TS024', dim: 'main_language_detailed' },
    { id: 'TS007', dim: 'resident_age_101a' }
  ];

  for (const d of datasets) {
    const url = `https://www.nomisweb.co.uk/api/v01/dataset/${d.id}.data.json?geography=${ladCode}&${d.dim}=type299&select=geography_name,${d.dim}_name,obs_value`;
    console.log(`Checking ${d.id}...`);
    try {
      const r = await fetch(url);
      const data = await r.json();
      console.log(`${d.id} obs count:`, data.obs?.length);
    } catch (e) {
      console.error(`${d.id} failed:`, e);
    }
  }
}
checkONS();
