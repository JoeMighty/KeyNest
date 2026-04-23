async function getDimensions() {
  const url = 'https://api.beta.ons.gov.uk/v1/datasets/TS021/editions/2021/versions/1';
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Dimensions:', data.dimensions.map(d => d.name));
  } catch (e) {
    console.error(e);
  }
}

getDimensions();
