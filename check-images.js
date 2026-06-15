const fs = require('fs');
const http = require('https');

const productsCode = fs.readFileSync('src/data/products.ts', 'utf8');
const urls = [...productsCode.matchAll(/https:\/\/images\.unsplash\.com\/[^"']+/g)].map(m => m[0]);

const HomeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');
urls.push(...[...HomeCode.matchAll(/https:\/\/images\.unsplash\.com\/[^"']+/g)].map(m => m[0]));

const uniqueUrls = [...new Set(urls)];
console.log(`Checking ${uniqueUrls.length} unique URLs`);

uniqueUrls.forEach(url => {
  http.get(url, (res) => {
    if (res.statusCode >= 400 || res.statusCode === 302) {
      console.log(`Failed or Redirect (might be missing): ${url} (Status: ${res.statusCode})`);
    } else {
    //  console.log(`OK: ${url}`);
    }
  }).on('error', (e) => {
    console.error(`Error with ${url}: ${e.message}`);
  });
});
