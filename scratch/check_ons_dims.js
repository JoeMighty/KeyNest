async function checkONSDims() {
  const ids = ['TS007', 'TS024', 'TS066', 'TS054'];
  for (const id of ids) {
    const url = `https://api.beta.ons.gov.uk/v1/datasets/${id}/editions/2021/versions/1/dimensions`;
    try {
      const r = await fetch(url);
      const d = await r.json();
      console.log(`${id}:`, d.items.map(i => i.name));
    } catch (e) {
      console.log(`${id} failed`);
    }
  }
}
checkONSDims();
