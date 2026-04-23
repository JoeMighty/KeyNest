async function searchNomis() {
  const queries = ['TS007', 'TS024', 'TS066', 'TS054'];
  for (const q of queries) {
    const url = `https://www.nomisweb.co.uk/api/v01/dataset/def.json?search=${q}`;
    try {
      const r = await fetch(url);
      const d = await r.json();
      console.log(`${q}:`, d.dataset?.[0]?.id, d.dataset?.[0]?.name);
    } catch (e) {}
  }
}
searchNomis();
