async function checkDims() {
  const ids = ['NM_2054_1', 'NM_2066_1', 'NM_2024_1', 'NM_2007_1'];
  for (const id of ids) {
    const url = `https://www.nomisweb.co.uk/api/v01/dataset/${id}/def.json`;
    try {
      const r = await fetch(url);
      const data = await r.json();
      const dims = data.structure.keyfamilies.keyfamily.components.dimension;
      console.log(`${id}:`, dims.map(d => d.conceptref));
    } catch (e) {
      console.log(`${id} failed`);
    }
  }
}
checkDims();
