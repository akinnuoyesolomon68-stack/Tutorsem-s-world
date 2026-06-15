const { readFileSync } = require('fs');

const productsCode = readFileSync('src/data/products.ts', 'utf8');
const urls = [...productsCode.matchAll(/https:\/\/images\.unsplash\.com\/[^"']+/g)].map(m => m[0]);

const HomeCode = readFileSync('src/pages/Home.tsx', 'utf8');
urls.push(...[...HomeCode.matchAll(/https:\/\/images\.unsplash\.com\/[^"']+/g)].map(m => m[0]));

const uniqueUrls = [...new Set(urls)];

async function checkUrls() {
  for (const url of uniqueUrls) {
    try {
      const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(3000) });
      if (!res.ok) {
        console.log(`BROKEN: ${url} (Status: ${res.status})`);
      }
    } catch (e) {
      console.log(`ERROR: ${url} - ${e.message}`);
    }
  }
}
checkUrls();
