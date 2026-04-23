async function debugWalsall() {
  const lad = 'E08000030'; // Walsall
  const url = `https://api.beta.ons.gov.uk/v1/datasets/TS021/editions/2021/versions/1/observations?area-type=ltla&area-code=${lad}`;
  try {
    const r = await fetch(url);
    console.log('Status:', r.status);
    const d = await r.json();
    console.log('Observations:', d.observations?.length);
  } catch (e) {
    console.error(e);
  }
}
debugWalsall();
