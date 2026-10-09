#!/usr/bin/env node
/**
 * Tells IndexNow-compatible search engines (Bing, and through Bing the web search behind ChatGPT and Copilot,
 * plus Yandex, Seznam and others) that pages are new or changed. Run it AFTER a deploy, so the pages and the key file
 * are already live.
 *
 * Usage: node scripts/indexnow.js              submit every URL in sitemap.xml
 *        node scripts/indexnow.js <url> ...    submit specific URLs
 * The key file (590061f68d6b662539b0613f8a2cc8d3.txt in the site root) proves you own the site. It is meant to be public.
 */
const fs = require('fs');
const path = require('path');
const HOST = 'www.niharrout.com';
const KEY = '590061f68d6b662539b0613f8a2cc8d3';
const ROOT = path.resolve(__dirname, '..');

let urls = process.argv.slice(2);
if (!urls.length) {
  const xml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
(async () => {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
  });
  console.log(`IndexNow: submitted ${urls.length} URLs, response ${res.status} ${res.statusText}`);
  if (res.status === 403) console.log('403 usually means the key file is not live yet. Deploy first, then run again.');
})().catch((e) => { console.error('IndexNow failed:', e.message); process.exitCode = 1; });
