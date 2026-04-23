async function findDatasets() {
  const url = 'https://api.beta.ons.gov.uk/v1/datasets?limit=100';
  try {
    const r = await fetch(url);
    const d = await r.json();
    console.log(d.items.map(i => i.id));
  } catch (e) {
    console.error(e);
  }
}
findDatasets();
