async function testNomisLADCode() {
  const url = 'https://www.nomisweb.co.uk/api/v01/dataset/NM_2021_3.data.json?geography=E09000033';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log('Error:', response.status);
      return;
    }
    const data = await response.json();
    console.log('Success! Observations:', data.obs?.length);
  } catch (e) {
    console.error(e);
  }
}

testNomisLADCode();
