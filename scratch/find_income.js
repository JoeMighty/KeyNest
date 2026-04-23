async function findIncomeDataset() {
  const url = 'https://api.beta.ons.gov.uk/v1/datasets?q=earnings';
  try {
    const r = await fetch(url);
    const d = await r.json();
    console.log(JSON.stringify(d.items.map(i => i.id), null, 2));
  } catch (e) {
    console.error(e);
  }
}
findIncomeDataset();
