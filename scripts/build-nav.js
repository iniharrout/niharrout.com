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
const { industries, groups } = require('./site-data/industries');

const ROOT = path.resolve(__dirname, '..');
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const CHEVRON = '<svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// Where a family item lives, and what to call it
function resolveItem(fam, item) {
  if (typeof item === 'object') return { name: item.name, href: item.href };
  return { name: subs[item].name, href: `${fam.path}/${item}` };
}

// ---------- header ----------
// Text-first menus: numbered lists and hairlines, no icon tiles. Service items that live in two families point at one page.
const pad = (n) => String(n).padStart(2, '0');

function servicesMega() {
  const rail = families.map((f, i) => `
              <a class="sc-fam${i === 0 ? ' is-active' : ''}" href="${f.path}" data-fam="${f.key}"><span class="sc-fam-n">${pad(i + 1)}</span><span class="sc-fam-t">${esc(f.name)}</span></a>`).join('');
  const panels = families.map((f, i) => {
    const rows = f.items.map((it) => resolveItem(f, it)).map((it, n) => `
                <li><a class="sc-sub" href="${it.href}"><span class="sc-sub-n">${pad(n + 1)}</span><span class="sc-sub-t">${esc(it.name)}</span></a></li>`).join('');
    return `
            <div class="sc-mega-panel${i === 0 ? ' is-active' : ''}" data-fam="${f.key}">
              <p class="sc-mega-eyebrow">${pad(i + 1)} &middot; ${f.items.length} services</p>
              <h3>${esc(f.name)}</h3>
              <p class="sc-mega-desc">${esc(f.menu)}</p>
              <ul class="sc-mega-list">${rows}
              </ul>
              <a class="sc-mega-cta" href="${f.path}">Explore ${esc(f.name)} <span aria-hidden="true">&rarr;</span></a>
            </div>`;
  }).join('');
  return `        <li class="sc-item sc-has-menu sc-mega-item">
          <a class="sc-link" href="/services">Services</a>
          <button class="sc-toggle" type="button" aria-expanded="false" aria-label="Show services menu">${CHEVRON}</button>
          <div class="sc-menu sc-mega sc-mega-services">
            <div class="sc-mega-rail">
              <p class="sc-mega-h">Service families</p>${rail}
              <a class="sc-mega-all" href="/services">All services <span aria-hidden="true">&rarr;</span></a>
            </div>
            <div class="sc-mega-body">${panels}
            </div>
            <a class="sc-menu-all sc-m-only" href="/services">All services &rarr;</a>
          </div>
        </li>`;
}

const IND_GROUPS = groups;

function industriesMega() {
  const bySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
  const groups = IND_GROUPS.map(([title, slugs]) => `
              <div class="sc-ind-group">
                <p class="sc-ind-h">${esc(title)}</p>
                <ul>${slugs.map((slug) => `
                  <li><a class="sc-ind" href="/industries/${slug}">${esc(bySlug[slug].name)}</a></li>`).join('')}
                </ul>
              </div>`).join('');
  return `        <li class="sc-item sc-has-menu sc-mega-item">
          <a class="sc-link" href="/industries">Industries</a>
          <button class="sc-toggle" type="button" aria-expanded="false" aria-label="Show industries menu">${CHEVRON}</button>
          <div class="sc-menu sc-mega sc-mega-industries">
            <div class="sc-mega-body sc-mega-wide">
              <div class="sc-mega-top"><div><p class="sc-mega-eyebrow">Industries we serve</p><h3>Software built around how your sector works</h3></div><a class="sc-mega-over" href="/industries">All ${industries.length} industries <span aria-hidden="true">&rarr;</span></a></div>
              <div class="sc-ind-cols">${groups}
              </div>
            </div>
            <a class="sc-menu-all sc-m-only" href="/industries">All industries &rarr;</a>
          </div>
        </li>`;
}

const row = (href, title, text) => `            <a href="${href}"><strong>${title}</strong><span>${text}</span></a>`;
const resources = `        <li class="sc-item sc-has-menu">
          <a class="sc-link" href="/blog">Resources</a>
          <button class="sc-toggle" type="button" aria-expanded="false" aria-label="Show resources menu">${CHEVRON}</button>
          <div class="sc-menu sc-list">
            <p class="sc-list-h">Company</p>
${row('/about', 'About Nihar &amp; Creuto', 'The founder and the company behind the work')}
${row('/work-with-me', 'Work with me', 'We are hiring: four remote roles')}
            <p class="sc-list-h">Learn</p>
${row('/blog', 'Blog &amp; Guides', 'Practical guides on MVPs, ERP, mobile and AI')}
${row('/project-costs', 'Project Costs Guide', 'What production software typically costs')}
${row('/tools/app-cost-calculator', 'App Cost Calculator', 'Realistic build budgets and timelines')}
${row('/b2b-software-development-for-startups', 'B2B Startup Playbook', 'Working with a remote-first product team')}
${row('/technology', 'Technology Stack', 'The tools we build with')}
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
