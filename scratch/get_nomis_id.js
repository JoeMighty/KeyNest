async function getNomisId() {
  const url = 'https://www.nomisweb.co.uk/api/v01/geography/TYPE298.def.json?search=E01000001';
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data.item[0], null, 2));
  } catch (e) {
    console.error(e);
  }
}

getNomisId();
