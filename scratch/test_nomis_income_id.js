async function testNomisIncome() {
  // Try with the LAD code directly but using geography=...
  // E09000033 is Westminster
  const url = 'https://www.nomisweb.co.uk/api/v01/dataset/NM_30_1.data.json?geography=2013265955&item=2&variable=2&time=latest';
  // 2013265955 is the Nomis ID for Westminster LTLA
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data.obs?.[0], null, 2));
  } catch (e) {
    console.error(e);
  }
}
testNomisIncome();
