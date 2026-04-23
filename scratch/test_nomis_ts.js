async function testNomisTS() {
  const ladCode = 'E09000033'; // Westminster
  const url = `https://www.nomisweb.co.uk/api/v01/dataset/NM_2054_1.data.json?geography=${ladCode}&tenure_8b=all&select=geography_name,tenure_8b_name,obs_value`;
  try {
    const r = await fetch(url);
    const d = await r.json();
    console.log(d.obs?.length);
  } catch (e) {
    console.log('Failed');
  }
}
testNomisTS();
