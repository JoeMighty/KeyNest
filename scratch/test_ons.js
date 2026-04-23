async function testONS() {
  const url = 'https://api.beta.ons.gov.uk/v1/datasets/TS021/editions/2021/versions/1/observations?geography=E01000001';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log('Error:', response.status);
      const text = await response.text();
      console.log(text);
      return;
    }
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  }
}

testONS();
