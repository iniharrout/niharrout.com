#!/usr/bin/env node
/**
 * Builds the site navigation from the service and industry data (scripts/site-data/):
 *   - the primary menu in partials/header.html: AI, Services mega menu, Industries mega menu, Work, Resources, About, Work with me
 *   - the link columns in partials/footer.html
 * build-chrome.js then stamps the header and footer onto every page. Safe to re-run.
 * Usage: node scripts/build-nav.js   (part of build-all.js, before build-chrome.js)
 */
const fs = require('fs');
const path = require('path');
const { families, subs } = require('./site-data/services');
const { industries } = require('./site-data/industries');

const ROOT = path.resolve(__dirname, '..');
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const svg = (inner) => `<svg viewBox="0 0 24 24" aria-hidden="true">${inner}</svg>`;
const CHEVRON = '<svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const TONES = { custom: '#1d4ed8', mobile: '#2563eb', web: '#0284c7', devops: '#475569', ai: '#4f46e5', startup: '#0f172a' };

// Where a family item lives, and what to call it
function resolveItem(fam, item) {
  if (typeof item === 'object') return { name: item.name, href: item.href };
  return { name: subs[item].name, href: `${fam.path}/${item}` };
}

// ---------- header ----------
function servicesMega() {
  const rail = families.map((f, i) => `
          <a class="sc-fam${i === 0 ? ' is-active' : ''}" href="${f.path}" data-fam="${f.key}"><i class="sc-mi" style="--tone:${TONES[f.key]}">${svg(f.icon)}</i><span class="sc-mt"><strong>${esc(f.name)}</strong><span>${f.items.length} services</span></span></a>`).join('');
  const panels = families.map((f, i) => {
    const items = f.items.map((it) => resolveItem(f, it)).map((it) => `
            <a class="sc-sub" href="${it.href}"><i class="sc-mi" style="--tone:${TONES[f.key]}">${svg(f.icon)}</i><span>${esc(it.name)}</span></a>`).join('');
    return `
        <div class="sc-mega-panel${i === 0 ? ' is-active' : ''}" data-fam="${f.key}">
          <div class="sc-mega-top"><div><p class="sc-mega-eyebrow">Service family</p><h3>${esc(f.name)}</h3></div><a class="sc-mega-over" href="${f.path}">Overview &rarr;</a></div>
          <p class="sc-mega-desc">${esc(f.menu)}</p>
          <div class="sc-mega-grid">${items}
          </div>
          <a class="sc-mega-cta" href="${f.path}">Explore ${esc(f.name)} &rarr;</a>
        </div>`;
  }).join('');
  return `        <li class="sc-item sc-has-menu sc-mega-item">
          <a class="sc-link" href="/services">Services</a>
          <button class="sc-toggle" type="button" aria-expanded="false" aria-label="Show services menu">${CHEVRON}</button>
          <div class="sc-menu sc-mega sc-mega-services">
            <div class="sc-mega-rail">
              <p class="sc-mega-h"><span>Services</span><a class="sc-mega-all" href="/services">View all</a></p>${rail}
            </div>
            <div class="sc-mega-body">${panels}
            </div>
            <a class="sc-menu-all sc-m-only" href="/services">All services &rarr;</a>
          </div>
        </li>`;
}

function industriesMega() {
  const links = industries.map((i) => `
              <a class="sc-ind" href="/industries/${i.slug}"><span>${esc(i.name)}</span></a>`).join('');
  return `        <li class="sc-item sc-has-menu sc-mega-item">
          <a class="sc-link" href="/industries">Industries</a>
          <button class="sc-toggle" type="button" aria-expanded="false" aria-label="Show industries menu">${CHEVRON}</button>
          <div class="sc-menu sc-mega sc-mega-industries">
            <div class="sc-mega-body sc-mega-wide">
              <div class="sc-mega-top"><div><p class="sc-mega-eyebrow">Industries we serve</p><h3>Software built around how your sector actually works</h3></div><a class="sc-mega-over" href="/industries">All industries &rarr;</a></div>
              <div class="sc-ind-grid">${links}
              </div>
            </div>
            <a class="sc-menu-all sc-m-only" href="/industries">All industries &rarr;</a>
          </div>
        </li>`;
}

const resources = `        <li class="sc-item sc-has-menu">
          <a class="sc-link" href="/blog">Resources</a>
          <button class="sc-toggle" type="button" aria-expanded="false" aria-label="Show resources menu">${CHEVRON}</button>
          <div class="sc-menu">
            <a href="/blog"><i class="sc-mi">${svg('<path d="M12 6.5C10.3 5 7.5 4.5 3.5 4.5v14c4 0 6.8.5 8.5 2 1.7-1.5 4.5-2 8.5-2v-14c-4 0-6.8.5-8.5 2z"/><path d="M12 6.5v14"/>')}</i><span class="sc-mt"><strong>Blog &amp; Guides</strong><span>Practical guides on MVPs, ERP, mobile and AI</span></span></a>
            <a href="/project-costs"><i class="sc-mi">${svg('<path d="M12 2.5v19M16.5 6.5H10a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H7"/>')}</i><span class="sc-mt"><strong>Project Costs Guide</strong><span>What production software typically costs</span></span></a>
            <a href="/tools/app-cost-calculator"><i class="sc-mi">${svg('<rect x="4.5" y="2.5" width="15" height="19" rx="2.2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>')}</i><span class="sc-mt"><strong>App Cost Calculator</strong><span>Realistic build budgets and timelines</span></span></a>
            <a href="/b2b-software-development-for-startups"><i class="sc-mi">${svg('<circle cx="9" cy="8" r="3.3"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.8a3.3 3.3 0 0 1 0 6.4M18.5 14.3A6.5 6.5 0 0 1 21.5 20"/>')}</i><span class="sc-mt"><strong>B2B Startup Playbook</strong><span>Working with a remote-first product team</span></span></a>
            <a href="/technology"><i class="sc-mi">${svg('<path d="M12 3l9 4.8-9 4.8-9-4.8z"/><path d="M3 12.2l9 4.8 9-4.8M3 16.6l9 4.8 9-4.8"/>')}</i><span class="sc-mt"><strong>Technology Stack</strong><span>The tools we build with</span></span></a>
            <a class="sc-menu-all" href="/tools">All free tools &rarr;</a>
          </div>
        </li>`;

const ai = `        <li class="sc-item sc-item-ai">
          <a class="sc-ai" href="/services/ai-product-development" aria-label="AI product development">
            <svg class="sc-spark sc-spark-main" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0c.5 5.5 4.5 9.5 10 10-5.5.5-9.5 4.5-10 10-.5-5.5-4.5-9.5-10-10C5.5 9.5 9.5 5.5 10 0z"/></svg>
            <span class="sc-ai-txt">AI</span>
            <svg class="sc-spark sc-spark-a" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0c.5 5.5 4.5 9.5 10 10-5.5.5-9.5 4.5-10 10-.5-5.5-4.5-9.5-10-10C5.5 9.5 9.5 5.5 10 0z"/></svg>
            <svg class="sc-spark sc-spark-b" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0c.5 5.5 4.5 9.5 10 10-5.5.5-9.5 4.5-10 10-.5-5.5-4.5-9.5-10-10C5.5 9.5 9.5 5.5 10 0z"/></svg>
          </a>
        </li>`;

const items = [
  ai,
  servicesMega(),
  industriesMega(),
  '        <li class="sc-item"><a class="sc-link" href="/work">Work</a></li>',
  resources,
  '        <li class="sc-item"><a class="sc-link" href="/about">About</a></li>',
  '        <li class="sc-item sc-item-hire"><a class="sc-link sc-hire" href="/work-with-me"><i aria-hidden="true"></i>Work with me</a></li>',
].join('\n');

let header = fs.readFileSync(path.join(ROOT, 'partials/header.html'), 'utf8');
header = header.replace(/(<ul class="sc-links">\n)[\s\S]*?(\n      <\/ul>\n    <\/nav>)/, (m, a, b) => `${a}${items}${b}`);
fs.writeFileSync(path.join(ROOT, 'partials/header.html'), header);

// ---------- footer ----------
let footer = fs.readFileSync(path.join(ROOT, 'partials/footer.html'), 'utf8');
const colRe = /      <div class="sc-foot-col">\s*<h4>([^<]+)<\/h4>[\s\S]*?<\/ul>\s*<\/div>\n?/g;
const keep = {};
for (const m of footer.matchAll(colRe)) keep[m[1]] = m[0].replace(/\n$/, '');

const col = (title, links) => `      <div class="sc-foot-col">
        <h4>${title}</h4>
        <ul>
${links.map(([href, label]) => `          <li><a href="${href}">${label}</a></li>`).join('\n')}
        </ul>
      </div>`;
const cols = [
  col('Services', [...families.map((f) => [f.path, esc(f.name)]), ['/services', 'All services']]),
  col('Industries', [...['healthcare', 'fintech', 'ecommerce', 'logistics', 'education', 'real-estate', 'manufacturing', 'saas'].map((s) => { const i = industries.find((x) => x.slug === s); return [`/industries/${s}`, esc(i.name)]; }), ['/industries', 'All industries']]),
  col('Resources', [['/work', 'Case studies'], ['/blog', 'Blog &amp; Guides'], ['/project-costs', 'Project Costs Guide'], ['/tools/app-cost-calculator', 'App Cost Calculator'], ['/b2b-software-development-for-startups', 'B2B Startup Playbook'], ['/technology', 'Technology Stack'], ['/tools', 'Free Tools']]),
  keep.Locations, keep.Connect,
].filter(Boolean).join('\n');

const start = footer.indexOf('      <div class="sc-foot-col">');
const end = footer.indexOf('\n    </div>\n\n    <div class="sc-foot-bottom">');
if (start === -1 || end === -1) throw new Error('footer anchors not found');
footer = footer.slice(0, start) + cols + footer.slice(end);
fs.writeFileSync(path.join(ROOT, 'partials/footer.html'), footer);
console.log(`nav: header and footer built (${families.length} service families, ${industries.length} industries)`);
