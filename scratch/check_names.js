async function checkNomisNames() {
  const ladCode = '2092957697'; // Westminster Nomis ID
  const url = `https://www.nomisweb.co.uk/api/v01/dataset/NM_2066_1.data.json?geography=2092957697&economic_activity_status_12b=all&select=economic_activity_status_12b_name,obs_value`;
  try {
    const r = await fetch(url);
    const d = await r.json();
    console.log(d.obs.map(o => o.economic_activity_status_12b_name));
  } catch (e) {}
}
checkNomisNames();
