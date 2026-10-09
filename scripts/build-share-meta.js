#!/usr/bin/env node
/**
 * Makes sure every indexable page has complete, WhatsApp-safe social preview tags:
 *   og:image (absolute https, small JPEG, 1200x630), og:image:width/height/type/alt, twitter:image(+alt).
 * Pages that already point at their own image (blog posts, case studies) keep it; every other page gets the
 * share image that matches its service area (assets/og/*.jpg). Safe to run repeatedly.
 * Usage: node scripts/build-share-meta.js   (run after build-locations.js)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://www.niharrout.com';
const SKIP = new Set(['node_modules', '.git', '.claude', 'scripts', 'api', 'assets', 'partials']);

const SHARE = {
  default: 'Nihar Ranjan Rout, Founder and CEO of Creuto: mobile apps, web apps and AI products from PRD to launch',
  ai: 'Nihar Ranjan Rout, Founder and CEO of Creuto: AI products that answer from your own documents',
  mobile: 'Nihar Ranjan Rout, Founder and CEO of Creuto: iOS and Android apps from PRD to launch',
  web: 'Nihar Ranjan Rout, Founder and CEO of Creuto: web apps built to launch fast and scale',
  software: 'Nihar Ranjan Rout, Founder and CEO of Creuto: custom software and ERP built for your business',
  strategy: 'Nihar Ranjan Rout, Founder and CEO of Creuto: product strategy and PRD before you build',
};

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (e.name.endsWith('.html')) out.push(path.join(dir, e.name));
  }
  return out;
}

function kindFor(rel) {
  if (/ai-product-development/.test(rel)) return 'ai';
  if (/mobile-app-development/.test(rel)) return 'mobile';
  if (/web-application-development/.test(rel)) return 'web';
  if (/custom-software-development/.test(rel)) return 'software';
  if (/product-strategy-prd/.test(rel)) return 'strategy';
  return 'default';
}

function jpegSize(file) {
  const b = fs.readFileSync(file);
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const marker = b[i + 1];
    const len = b.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}

let changed = 0;
const problems = [];
for (const file of walk(ROOT)) {
  let html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file);
  if (!/<meta\s+property="og:image"/.test(html)) continue;

  const current = (html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/) || [])[1];
  const replaceable = !current || /niharrout-og-image|\/assets\/nihar\.jpg|\/assets\/og\//.test(current);
  const kind = kindFor(rel);
  const url = replaceable ? `${SITE}/assets/og/${kind}.jpg` : current;
  const local = path.join(ROOT, url.replace(SITE, ''));
  if (!fs.existsSync(local)) { problems.push(`${rel}: image missing ${url}`); continue; }
  const size = fs.statSync(local).size;
  if (size > 300 * 1024) problems.push(`${rel}: ${url} is ${Math.round(size / 1024)} KB (WhatsApp prefers under 300 KB)`);
  const dims = /\.jpe?g$/i.test(url) ? jpegSize(local) : null;
  const title = (html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/) || [])[1] || '';
  const unesc = (t) => String(t).replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  const alt = replaceable ? SHARE[kind] : unesc((html.match(/<meta\s+property="og:image:alt"\s+content="([^"]*)"/) || [])[1] || title);

  // drop old image-detail tags, then rewrite the block right after og:image
  html = html.replace(/\s*<meta\s+property="og:image:(?:width|height|type|alt)"[^>]*>/g, '');
  html = html.replace(/\s*<meta\s+name="twitter:image(?::alt)?"[^>]*>/g, '');
  const ogLines = [
    `<meta property="og:image" content="${url}">`,
    `<meta property="og:image:secure_url" content="${url}">`,
    dims ? `<meta property="og:image:width" content="${dims.w}">` : '',
    dims ? `<meta property="og:image:height" content="${dims.h}">` : '',
    `<meta property="og:image:type" content="${/\.png$/i.test(url) ? 'image/png' : 'image/jpeg'}">`,
    `<meta property="og:image:alt" content="${esc(alt)}">`,
  ].filter(Boolean).join('\n  ');
  html = html.replace(/<meta\s+property="og:image:secure_url"[^>]*>\s*/g, '');
  html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*">/, () => ogLines);

  const tw = `<meta name="twitter:image" content="${url}">\n  <meta name="twitter:image:alt" content="${esc(alt)}">`;
  if (/<meta\s+name="twitter:card"[^>]*>/.test(html)) {
    html = html.replace(/(<meta\s+name="twitter:card"[^>]*>)/, `$1\n  ${tw}`);
  } else {
    html = html.replace(/(<meta property="og:image:alt"[^>]*>)/, `$1\n  <meta name="twitter:card" content="summary_large_image">\n  ${tw}`);
  }
  fs.writeFileSync(file, html);
  changed++;
}
console.log(`share meta: ${changed} pages processed`);
if (problems.length) { console.log(problems.join('\n')); process.exitCode = 1; }
