async function testONS() {
  const url = 'https://api.beta.ons.gov.uk/v1/datasets/TS021/editions/2021/versions/1/observations?area-type=lsoa&area-code=E01000001';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log('Error:', response.status);
      return;
    }
    const data = await response.json();
    console.log('Success! Observations count:', data.observations?.length);
  } catch (e) {
    console.error(e);
  }
}

testONS();
