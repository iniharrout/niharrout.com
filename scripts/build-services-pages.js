#!/usr/bin/env node
/**
 * Generates the service pages from scripts/site-data/services.js:
 *   /services/<family path>/<service>            one page per service (35)
 *   /services/devops-cloud-engineering           the one family page that did not exist yet
 * and adds a "services in this family" block to the hand-written family pages and the services overview
 * (marker <!-- sub:links -->, safe to re-run).
 * Run through `node scripts/build-all.js`.
 */
const fs = require('fs');
const path = require('path');
const { families, subs } = require('./site-data/services');
const { doodle } = require('./site-data/doodles');
const G = require('./site-data/guides');
const KW = require('./site-data/keywords');
const { industries } = require('./site-data/industries');
const { SITE, ORG, esc, head, foot, crumbs } = require('./careers/shell');
const R = require('./site-data/render');
const approach = require('./site-data/approach');

const ROOT = path.resolve(__dirname, '..');
const famByKey = Object.fromEntries(families.map((f) => [f.key, f]));
const indBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
const subUrl = (key) => `${famByKey[subs[key].family].path}/${key}`;
const write = (rel, html) => { const f = path.join(ROOT, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const itemOf = (fam, it) => (typeof it === 'object' ? { name: it.name, href: it.href, short: it.short } : { name: subs[it].name, href: `${fam.path}/${it}`, short: subs[it].short });

// ---------- one page per service ----------
// keyword-led title, H1, description and two FAQs per service page (see scripts/site-data/keywords.js)
const cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);
function seoFor(key, s) {
  const k = KW.SUB[key];
  if (!k) return { title: s.seoTitle, h1: s.name, desc: s.seoDesc, faq: s.faq };
  const lead = s.short.charAt(0).toLowerCase() + s.short.slice(1);
  const options = [
    `${cap(k.kw)}: ${lead}, built by a founder-led team from PRD to launch. Free strategy call.`,
    `${cap(k.kw)}: ${lead}, from PRD to launch. Free 30-minute strategy call.`,
    `${cap(k.kw)}: ${lead}. Founder-led team, free strategy call.`,
  ];
  const desc = options.find((d) => d.length <= 158 && d.length >= 110) || options.find((d) => d.length <= 158) || options[2];
  const base = k.alt[0];
  const faq = [
    [/company/.test(k.kw) ? `Are you ${/^([aeiou]|MVP|SEO|AI|ML)/i.test(k.kw) ? 'an' : 'a'} ${k.kw}?` : `Do you offer ${k.kw}?`, `Yes. Creuto is a founder-led software, mobile app and AI development company in India, headquartered in Bhubaneswar. We provide ${base} for startups and businesses across India and abroad, and you work with Nihar Ranjan Rout directly, starting with a free 30-minute call.`],
    ...s.faq,
    [`How much ${/s$/.test(base) ? 'do' : 'does'} ${base} cost?`, `It depends on scope, platforms and integrations. Use the free app cost calculator for a first estimate or read the project cost breakdowns. After a free 30-minute call you get a written proposal within 24 hours.`],
  ];
  return { title: k.title, h1: k.h1, desc, faq, k };
}

function subPage(key) {
  const s = subs[key];
  const fam = famByKey[s.family];
  const seo = seoFor(key, s);
  const url = `${SITE}${subUrl(key)}`;
  const siblings = fam.items.map((it) => itemOf(fam, it)).filter((it) => it.href !== subUrl(key));
  const graph = [
    { '@type': 'Service', '@id': `${url}#service`, name: seo.h1, serviceType: s.name, description: seo.desc, url, provider: { '@id': `${SITE}/#organization` }, areaServed: [{ '@type': 'Country', name: 'India' }, 'Worldwide'] },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: seo.title, description: seo.desc, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${url}#service` } },
    crumbs([['Home', `${SITE}/`], ['Services', `${SITE}/services`], [fam.name, `${SITE}${fam.path}`], [s.name, url]]),
    R.faqLd(seo.faq),
  ];
  const related = [
    ...siblings.map((it) => [it.name, it.href]),
  ];
  const inds = (s.industries || []).map((slug) => [indBySlug[slug].name, `/industries/${slug}`]);
  return head({ title: seo.title, description: seo.desc, canonical: url, graph }) + `
<main id="top">${R.hero({
    crumbs: [['Home', '/'], ['Services', '/services'], [fam.name, fam.path], [s.name, subUrl(key)]],
    pill: fam.name, h1: seo.h1, sub: s.intro, secondary: ['Get a free quote', '#quote'], art: SUB_DOODLE[key] || DOODLE[fam.key],
  })}
${R.section('build', seo.k ? `What our ${seo.k.alt[0]} cover` : 'What we build', R.cards(s.builds))}
${R.section('approach', 'How we approach ' + s.name, R.prose(approach.subs[key]), 'wwm-sec-alt')}
${R.section('fit', 'When this is a good fit', R.fits('A good fit when', s.fits))}
${R.section('process', 'How an engagement works', R.process(), 'wwm-sec-alt')}
${R.section('related', 'Related services and industries', `<div class="wwm-rel"><div><h3>More in ${esc(fam.name)}</h3>${R.pills(related)}</div>${inds.length ? `<div><h3>Industries we build this for</h3>${R.pills(inds)}</div>` : ''}</div>`)}
${R.section('faq', 'Questions about ' + s.name, R.faqHtml(seo.faq))}
${R.section('guides', 'Guides on this topic', R.guides(G.forSub(key, fam.key)), 'wwm-sec-alt')}
${R.endBand(undefined, undefined, s.name)}
</main>
` + foot();
}

// ---------- the DevOps family page ----------
function familyPage(fam) {
  const fk = KW.FAMILY[fam.key];
  const p = fk ? { ...fam.page, title: fk.title, description: fk.desc, h1: fk.h1, lead: `${fam.page.h1} ${fam.page.lead}` } : fam.page;
  const url = `${SITE}${fam.path}`;
  const graph = [
    { '@type': 'Service', '@id': `${url}#service`, name: fam.name, serviceType: fam.name, description: p.description, url, provider: { '@id': `${SITE}/#organization` }, areaServed: 'Worldwide' },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: p.title, description: p.description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${url}#service` } },
    crumbs([['Home', `${SITE}/`], ['Services', `${SITE}/services`], [fam.name, url]]),
    R.faqLd(p.faq),
  ];
  const list = fam.items.map((it) => itemOf(fam, it));
  const grid = `<ul class="wwm-cards wwm-cards-links">
${list.map((it, i) => `        <li class="wwm-c"><a href="${it.href}"><span class="wwm-c-n" aria-hidden="true">0${i + 1}</span><h3>${esc(it.name)}</h3><p>${esc(it.short)}</p><span class="wwm-c-go">Learn more</span></a></li>`).join('\n')}
      </ul>`;
  return head({ title: p.title, description: p.description, canonical: url, graph }) + `
<main id="top">${R.hero({ crumbs: [['Home', '/'], ['Services', '/services'], [fam.name, fam.path]], pill: 'Service family', h1: p.h1, sub: p.lead, secondary: ['See our work', '/work'], art: DOODLE[fam.key] })}
${R.section('includes', 'What this covers', `<ul class="wwm-pills wwm-plain">${p.points.map((t) => `<li><span>${esc(t)}</span></li>`).join('')}</ul>`)}
${R.section('approach', 'How we approach DevOps and cloud', R.prose(approach.families.devops), 'wwm-sec-alt')}
${R.section('services', 'Services in ' + fam.name, grid)}
${R.section('process', 'How an engagement works', R.process(), 'wwm-sec-alt')}
${R.section('faq', 'Questions about DevOps and cloud', R.faqHtml(p.faq))}
${R.section('guides', 'Guides on this topic', R.guides(G.forFamily(fam.key)), 'wwm-sec-alt')}
${R.endBand()}
</main>
` + foot();
}

// ---------- directory blocks on the hand-written pages ----------
function dirBlock(title, intro, groups) {
  return `<!-- sub:links -->
    <section class="sub-links" aria-labelledby="sub-links-title">
      <div class="wrap">
        <h2 id="sub-links-title">${esc(title)}</h2>
        <p>${esc(intro)}</p>
        ${groups.map((g) => `${g.heading ? `<h3>${g.heading}</h3>` : ''}<ul>
          ${g.items.map((it) => `<li><a href="${it.href}"><strong>${esc(it.name)}</strong><span>${esc(it.short || '')}</span></a></li>`).join('\n          ')}
        </ul>`).join('\n        ')}
      </div>
    </section>
    <!-- /sub:links -->`;
}
function insertBlock(rel, block) {
  const file = path.join(ROOT, rel);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/[ \t]*<!-- sub:links -->[\s\S]*?<!-- \/sub:links -->\n*/, '');
  const anchor = '    <section class="contact-section" id="contact">';
  if (!html.includes(anchor)) { console.error(`anchor missing in ${rel}`); process.exitCode = 1; return false; }
  const next = html.replace(anchor, `    ${block}\n\n${anchor}`);
  if (next !== fs.readFileSync(file, 'utf8')) { fs.writeFileSync(file, next); return true; }
  return false;
}

// ---------- homepage services section (same data as the menu) ----------
// Doodle drawn for each family (scripts/site-data/doodles.js).
// Doodle for each sub-service hero; anything not listed uses its family's doodle.
const SUB_DOODLE = {
  'custom-erp-development': 'erp', 'crm-development': 'portal', 'enterprise-application-development': 'dashboard', 'software-consulting': 'question',
  'legacy-application-modernization': 'legacy', 'ecommerce-solutions': 'ecommerce',
  'android-app-development': 'android', 'ios-app-development': 'ios', 'react-native-app-development': 'cross-platform', 'flutter-app-development': 'layers',
  'mobile-app-qa-testing': 'check', 'mobile-app-modernization': 'offline-sync',
  'customized-web-development': 'web', 'enterprise-web-development': 'dashboard', 'cross-platform-development': 'pwa', 'pwa-development': 'pwa',
  'on-site-seo-development': 'seo', 'cms-development': 'portal',
  'cloud-consulting': 'cloud', 'ci-cd-implementation': 'roadmap', 'kubernetes-implementation': 'saas', 'serverless-architecture': 'realtime',
  'cloud-cost-optimisation': 'pricing', 'infrastructure-monitoring': 'analytics',
  'ai-development': 'ai', 'ai-consulting': 'question', 'ai-powered-mobile-app-development': 'agent', 'machine-learning-analytics': 'growth',
  'generative-ai': 'design', 'chatgpt-solutions': 'chat',
  'mvp-development': 'rocket', 'rapid-prototyping': 'prototype', 'technical-architecture': 'stack', 'investor-ready-demos': 'growth', 'post-launch-iteration': 'metrics',
};
const DOODLE = { custom: 'custom-software', mobile: 'mobile', web: 'web', devops: 'cloud', ai: 'ai', startup: 'rocket' };
const TAGS = { custom: 'Custom software', mobile: 'Mobile', web: 'Web', devops: 'Cloud and delivery', ai: 'AI, OpenAI Select Partner', startup: 'Product and startups' };
const CHECK = '<svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
function homeServices() {
  const cards = families.map((f) => `          <article class="service-bento-card">
            <div class="service-card-top">
              <span class="doodle-wrap service-doodle">${doodle(DOODLE[f.key])}</span>
              <span class="service-card-tag">${esc(TAGS[f.key])}</span>
              <h3 class="service-card-title">${esc(f.name)}</h3>
              <p class="service-card-desc">${esc(f.menu)}</p>
              <ul class="service-feature-list">
                ${f.items.slice(0, 3).map((it) => `<li>${CHECK}${esc(itemOf(f, it).name)}</li>`).join('\n                ')}
              </ul>
            </div>
            <a href="${f.path}" class="service-card-action"><span>Explore ${esc(f.name)}</span> &rarr;</a>
          </article>`).join('\n\n');
  return `        <!-- home:services -->
        <header class="ed-head">
          <p class="ed-label">Services</p>
          <h2 class="section-title">Software, mobile app and AI development services.</h2>
          <p>Six areas of work for startups and businesses in India and abroad, one process: a clear PRD first, then an in-house team builds it and keeps improving it.</p>
        </header>

        <div class="bento-services-grid">
${cards}
        </div>
        <p class="ed-post-more"><a href="/services" class="link-arrow">See all services <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a></p>
        <!-- /home:services -->`;
}

let pages = 0;
for (const key of Object.keys(subs)) { write(subUrl(key).slice(1), subPage(key)); pages++; }
const devops = famByKey.devops;
write(devops.path.slice(1), familyPage(devops)); pages++;

let updated = 0;
for (const fam of families.filter((f) => f.existing)) {
  const rel = `${fam.path.slice(1)}/index.html`;
  const block = dirBlock(`${fam.name}: what we offer`, `Every service in this area has its own page, with what we build, when it fits and the questions people ask.`, [{ items: fam.items.map((it) => itemOf(fam, it)) }]);
  if (insertBlock(rel, block)) updated++;
}
{
  const file = path.join(ROOT, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const next = html.replace(/[ \t]*<!-- home:services -->[\s\S]*?<!-- \/home:services -->/, () => homeServices());
  if (next !== html) { fs.writeFileSync(file, next); updated++; }
}
const overview = dirBlock('All services', 'Six service families, from a first prototype to the cloud that keeps the product running.', families.map((f) => ({ heading: `<a href="${f.path}">${esc(f.name)}</a>`, items: f.items.map((it) => itemOf(f, it)) })));
if (insertBlock('services/index.html', overview)) updated++;
console.log(`services: ${pages} pages written, ${updated} directory blocks updated`);
