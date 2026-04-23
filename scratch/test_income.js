async function testIncome() {
  // ASHE: Gross Weekly Pay, Median, for LAD Westminster
  const url = 'https://www.nomisweb.co.uk/api/v01/dataset/NM_30_1.data.json?geography=E09000033&item=2&variable=2&time=latest';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log('Error:', response.status);
      return;
    }
    const data = await response.json();
    if (data.obs && data.obs.length > 0) {
      const weekly = data.obs[0].obs_value;
      console.log('Success! Median Weekly Pay:', weekly);
      console.log('Annualized:', weekly * 52);
    } else {
      console.log('No data found for this LAD.');
    }
  } catch (e) {
    console.error(e);
  }
}

testIncome();
