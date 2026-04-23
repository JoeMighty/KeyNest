async function testWalsallNomis() {
  const lad = 'E08000030'; // Walsall
  const url = `https://www.nomisweb.co.uk/api/v01/dataset/NM_2021_1.data.json?geography=${lad}&ethnic_group_tb_20b=all&select=obs_value,ethnic_group_tb_20b_name`;
  try {
    const r = await fetch(url);
    const d = await r.json();
    console.log('Obs:', d.obs?.length);
  } catch (e) {
    console.error(e);
  }
}
testWalsallNomis();
