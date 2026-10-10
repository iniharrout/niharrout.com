#!/usr/bin/env node
/**
 * Adds a "by location" block to each service page that has city pages (mobile, custom software, AI), linking to that
 * service's page in every city plus the Bhubaneswar page where one exists. This connects the location pages to the
 * main service pages, so search engines can see them as part of the site rather than a separate cluster.
 * Marker-based and safe to re-run. Part of build-all.js.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const metros = require('./locations/cities-metros.js');
const odisha = require('./locations/cities-odisha.js');
const services = require('./locations/services.js');
const cities = [...(Array.isArray(metros) ? metros : Object.values(metros)), ...(Array.isArray(odisha) ? odisha : Object.values(odisha))];

const PAGES = {
  mobile: { file: 'services/mobile-app-development/index.html', home: { href: '/mobile-app-development-bhubaneswar', label: 'Bhubaneswar' } },
  software: { file: 'services/custom-software-development/index.html', home: null },
  ai: { file: 'services/ai-product-development/index.html', home: { href: '/ai-product-development-bhubaneswar', label: 'Bhubaneswar' } },
};

let changed = 0;
for (const [key, cfg] of Object.entries(PAGES)) {
  const svc = services[key];
  const links = [];
  if (cfg.home) links.push(`<a href="${cfg.home.href}">${cfg.home.label}</a>`);
  for (const c of cities) links.push(`<a href="/locations/${c.slug}/${svc.slug}">${c.name}</a>`);
  const block = `<!-- city:links -->
    <section class="city-links" aria-labelledby="city-links-title">
      <div class="wrap">
        <h2 id="city-links-title">${svc.name} by location</h2>
        <p>Based in Bhubaneswar, working with teams across India and worldwide. See how we deliver ${svc.nameLc} in your city.</p>
        <ul>
          ${links.map((l) => `<li>${l}</li>`).join('\n          ')}
        </ul>
        <p class="city-links-all"><a href="/locations">All locations &rarr;</a></p>
      </div>
    </section>
    <!-- /city:links -->`;
  const file = path.join(ROOT, cfg.file);
  let html = fs.readFileSync(file, 'utf8');
  const marked = /[ \t]*<!-- city:links -->[\s\S]*?<!-- \/city:links -->\n*/;
  html = html.replace(marked, '');
  const anchor = '    <section class="contact-section" id="contact">';
  if (!html.includes(anchor)) { console.error(`anchor missing in ${cfg.file}`); process.exitCode = 1; continue; }
  const next = html.replace(anchor, `    ${block}\n\n${anchor}`);
  if (next !== fs.readFileSync(file, 'utf8')) { fs.writeFileSync(file, next); changed++; }
}
console.log(`city links: ${Object.keys(PAGES).length} service pages checked, ${changed} updated`);
