async function testNomisLSOA() {
  const url = 'https://www.nomisweb.co.uk/api/v01/dataset/NM_2021_3.data.json?geography=TYPE298&search=E01000001';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log('Error:', response.status);
      return;
    }
    const data = await response.json();
    console.log('Success! Data items:', data.obs?.length);
    if (data.obs && data.obs.length > 0) {
      console.log('First observation:', JSON.stringify(data.obs[0], null, 2));
    }
  } catch (e) {
    console.error(e);
  }
}

testNomisLSOA();
