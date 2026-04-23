async function testTS() {
  const ts = ['TS030', 'TS066', 'TS024', 'TS007'];
  for (const t of ts) {
    const url = `https://api.beta.ons.gov.uk/v1/datasets/${t}/editions/2021/versions/1`;
    const r = await fetch(url);
    if (r.ok) {
      const d = await r.json();
      console.log(`${t} dims:`, d.dimensions.map(dm => dm.name));
    } else {
      console.log(`${t} failed: ${r.status}`);
    }
  }
}
testTS();
