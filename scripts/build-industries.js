#!/usr/bin/env node
/**
 * Generates /industries (the overview) and /industries/<slug> (24 sector pages) from scripts/site-data/industries.js.
 * Run through `node scripts/build-all.js`.
 */
const fs = require('fs');
const path = require('path');
const { families, subs } = require('./site-data/services');
const { industries, WORK, groups } = require('./site-data/industries');
const { SITE, esc, head, foot, crumbs } = require('./careers/shell');
const R = require('./site-data/render');
const { doodle } = require('./site-data/doodles');
const approach = require('./site-data/approach');

const ROOT = path.resolve(__dirname, '..');
const write = (rel, html) => { const f = path.join(ROOT, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const subHref = (key) => `${families.find((f) => f.key === subs[key].family).path}/${key}`;

// Shorter names for search-result titles (the on-page name stays in full)
const SHORT = { fintech: 'Fintech and Banking', 'electric-vehicles': 'EV and eMobility', logistics: 'Logistics and Supply Chain', 'real-estate': 'Real Estate', government: 'Government', restaurant: 'Restaurant', 'media-entertainment': 'Media and Entertainment', education: 'Education and EdTech', 'travel-hospitality': 'Travel and Hospitality', energy: 'Energy and Utilities', events: 'Event', 'fitness-wellness': 'Fitness and Wellness', 'gaming-sports': 'Gaming and Sports', ecommerce: 'eCommerce and Retail', 'on-demand': 'On-Demand Services', 'social-networking': 'Social Networking' };
function titleFor(i) {
  const n = SHORT[i.slug] || i.name;
  const options = [`${n} Software Development | Nihar Ranjan Rout`, `${n} Software | Nihar Ranjan Rout`];
  return options.find((t) => t.length <= 60) || options[1];
}
function descFor(i) {
  const lower = i.short.charAt(0).toLowerCase() + i.short.slice(1);
  const options = [`${i.name} software development by Nihar Ranjan Rout and Creuto: ${lower}, from PRD to launch.`, `${i.name} software development by Nihar Ranjan Rout: ${lower}, from PRD to launch.`, `${i.name} software by Nihar Ranjan Rout: ${lower}, from PRD to launch.`];
  return options.find((d) => d.length <= 155 && d.length >= 110) || options.find((d) => d.length <= 155) || options[2];
}

const bySlug = Object.fromEntries(industries.map((x) => [x.slug, x]));
// the other industries in the same theme, wrapping around, so every page links to four neighbours
function relatedOf(slug) {
  const group = groups.find(([, list]) => list.includes(slug))[1];
  const at = group.indexOf(slug);
  const out = [];
  for (let k = 1; out.length < Math.min(4, group.length - 1); k++) out.push(group[(at + k) % group.length]);
  return out;
}

const INDEX_PROSE = 'Every sector has its own vocabulary, rules and risks, but the way we start is the same. We spend time with the people who do the work, write down how things actually run, and turn that into a PRD before building anything. Where regulation applies, such as health data, payments or public procurement, we design for the requirements you give us and support your own compliance review. The case studies on this site show what we have built and how.';
const INDEX_FAQ = [
  ['Do you only work in the industries listed?', 'No. The list shows the sectors we are asked about most. If your industry is not here, the way we work still applies: start with the people who do the work, write a PRD and build in stages. Tell us about your project and we will say honestly whether we are a fit.'],
  ['Do you have experience in my industry?', 'Our published case studies cover manufacturing, event and venue booking, beauty and wellness booking, quick commerce and team communication software. For other sectors we bring the same process and ask you for the domain knowledge, which we capture in the PRD.'],
  ['How do you handle industry regulations?', 'We design for the requirements you share, such as data protection, payment or accessibility rules, and build the access control, logging and records they call for. Your compliance team or legal adviser remains responsible for sign-off.'],
];

function industryPage(i) {
  const url = `${SITE}/industries/${i.slug}`;
  const title = titleFor(i);
  const description = descFor(i);
  const graph = [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#person` } },
    crumbs([['Home', `${SITE}/`], ['Industries', `${SITE}/industries`], [i.name, url]]),
    R.faqLd(i.faq),
  ];
  const work = i.work.length ? R.section('work', `Related work`, `<ul class="wwm-cards wwm-cards-links">
${i.work.map((k, n) => `        <li class="wwm-c"><a href="${WORK[k].href}"><span class="wwm-c-n" aria-hidden="true">0${n + 1}</span><h3>${esc(WORK[k].title)}</h3><p>${esc(WORK[k].note)}</p><span class="wwm-c-go">Read the case study</span></a></li>`).join('\n')}
      </ul>`, 'wwm-sec-alt') : '';
  const svc = R.pills(i.services.map((k) => [subs[k].name, subHref(k)]));
  return head({ title, description, canonical: url, graph }) + `
<main id="top">${R.hero({ crumbs: [['Home', '/'], ['Industries', '/industries'], [i.name, `/industries/${i.slug}`]], pill: 'Industry', h1: `${i.name} software development`, sub: i.intro, secondary: ['See our work', '/work'], art: i.slug })}
${R.section('build', `What we build for ${i.name}`, R.cards(i.builds))}
${R.section('approach', `How we approach ${i.name} projects`, R.prose(approach.industries[i.slug]), 'wwm-sec-alt')}
${R.section('matters', `What matters in ${i.name}`, R.cards(i.matters).replace('wwm-cards', 'wwm-cards wwm-cards-4'))}
${work}
${R.section('services', 'Services we use', `<p class="wwm-lead">The services behind most ${esc(i.name)} projects:</p>${svc}`)}
${R.section('process', 'How an engagement works', R.process(), 'wwm-sec-alt')}
${R.section('faq', `Questions about ${i.name} software`, R.faqHtml(i.faq))}
${R.section('related', 'Related industries', R.pills(relatedOf(i.slug).map((s) => [bySlug[s].name, `/industries/${s}`])), 'wwm-sec-alt')}
${R.endBand()}
</main>
` + foot();
}

function indexPage() {
  const url = `${SITE}/industries`;
  const title = 'Industries We Serve: 24 Sectors | Nihar Ranjan Rout';
  const description = 'Software built around how your sector works: healthcare, fintech, retail, logistics, education, SaaS and more, by Nihar Ranjan Rout and Creuto.';
  const graph = [
    { '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: 'Industries we serve', description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#person` } },
    crumbs([['Home', `${SITE}/`], ['Industries', url]]),
    { '@type': 'ItemList', name: 'Industries', itemListElement: industries.map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.name, url: `${SITE}/industries/${i.slug}` })) },
    R.faqLd(INDEX_FAQ),
  ];
  const grid = `<ul class="wwm-cards wwm-cards-links">
${industries.map((i) => `        <li class="wwm-c"><a href="/industries/${i.slug}"><span class="wwm-c-art" aria-hidden="true">${doodle(i.slug)}</span><h3>${esc(i.name)}</h3><p>${esc(i.short)}</p><span class="wwm-c-go">Explore</span></a></li>`).join('\n')}
      </ul>`;
  return head({ title, description, canonical: url, graph }) + `
<main id="top">${R.hero({ crumbs: [['Home', '/'], ['Industries', '/industries']], pill: `${industries.length} industries`, h1: 'Industries we serve.', sub: 'Software built around how your sector actually works. Pick your industry to see what we build, what matters in your field and how we approach it.', secondary: ['See our work', '/work'] })}
${R.section('all', 'Choose your industry', grid)}
${R.section('how', 'How we work across sectors', R.prose(INDEX_PROSE), 'wwm-sec-alt')}
${R.section('faq', 'Questions about industries', R.faqHtml(INDEX_FAQ))}
${R.endBand('Not sure where you fit?', 'Tell me what you want to build and I will tell you honestly whether we are the right team.')}
</main>
` + foot();
}

write('industries', indexPage());
for (const i of industries) write(`industries/${i.slug}`, industryPage(i));
console.log(`industries: overview and ${industries.length} sector pages written`);
