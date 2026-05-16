async function run() {
  const t = await fetch('https://api.github.com/search/issues?q=%22Invalid+path+specified+in+request+URL%22');
  const d = await t.json();
  console.log(JSON.stringify(d, null, 2));
}
run();
