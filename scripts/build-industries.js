#!/usr/bin/env node
/**
 * Generates /industries (the overview) and /industries/<slug> (24 sector pages) from scripts/site-data/industries.js.
 * Run through `node scripts/build-all.js`.
 */
const fs = require('fs');
const path = require('path');
const { families, subs } = require('./site-data/services');
const { industries, WORK } = require('./site-data/industries');
const { SITE, esc, head, foot, crumbs } = require('./careers/shell');
const R = require('./site-data/render');

const ROOT = path.resolve(__dirname, '..');
const write = (rel, html) => { const f = path.join(ROOT, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const subHref = (key) => `${families.find((f) => f.key === subs[key].family).path}/${key}`;

function titleFor(i) {
  const options = [`${i.name} Software Development | Nihar Ranjan Rout`, `${i.name} Software Company | Nihar Ranjan Rout`, `${i.name} Software | Nihar Ranjan Rout`];
  return options.find((t) => t.length <= 66) || options[2];
}

function industryPage(i) {
  const url = `${SITE}/industries/${i.slug}`;
  const title = titleFor(i);
  const description = `${i.name} software development by Nihar Ranjan Rout and the Creuto team: ${i.short.toLowerCase()}, built from PRD to launch.`;
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
<main id="top">${R.hero({ crumbs: [['Home', '/'], ['Industries', '/industries'], [i.name, `/industries/${i.slug}`]], pill: 'Industry', h1: `${i.name} software development`, sub: i.intro, secondary: ['See our work', '/work'] })}
${R.section('build', `What we build for ${i.name}`, R.cards(i.builds))}
${R.section('matters', `What matters in ${i.name}`, R.cards(i.matters).replace('wwm-cards', 'wwm-cards wwm-cards-4'), 'wwm-sec-alt')}
${work}
${R.section('services', 'Services we use', `<p class="wwm-lead">The services behind most ${esc(i.name)} projects:</p>${svc}`)}
${R.section('process', 'How an engagement works', R.process(), 'wwm-sec-alt')}
${R.section('faq', `Questions about ${i.name} software`, R.faqHtml(i.faq))}
${R.endBand()}
</main>
` + foot();
}

function indexPage() {
  const url = `${SITE}/industries`;
  const title = 'Industries We Serve: Software for 24 Sectors | Nihar Ranjan Rout';
  const description = 'Software built around how your sector works: healthcare, fintech, retail, logistics, education, manufacturing, SaaS and more, by Nihar Ranjan Rout and the Creuto team.';
  const graph = [
    { '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: 'Industries we serve', description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#person` } },
    crumbs([['Home', `${SITE}/`], ['Industries', url]]),
    { '@type': 'ItemList', name: 'Industries', itemListElement: industries.map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.name, url: `${SITE}/industries/${i.slug}` })) },
  ];
  const grid = `<ul class="wwm-cards wwm-cards-links">
${industries.map((i, n) => `        <li class="wwm-c"><a href="/industries/${i.slug}"><span class="wwm-c-n" aria-hidden="true">${String(n + 1).padStart(2, '0')}</span><h3>${esc(i.name)}</h3><p>${esc(i.short)}</p><span class="wwm-c-go">Explore</span></a></li>`).join('\n')}
      </ul>`;
  return head({ title, description, canonical: url, graph }) + `
<main id="top">${R.hero({ crumbs: [['Home', '/'], ['Industries', '/industries']], pill: `${industries.length} industries`, h1: 'Industries we serve.', sub: 'Software built around how your sector actually works. Pick your industry to see what we build, what matters in your field and how we approach it.', secondary: ['See our work', '/work'] })}
${R.section('all', 'Choose your industry', grid)}
${R.endBand('Not sure where you fit?', 'Tell me what you want to build and I will tell you honestly whether we are the right team.')}
</main>
` + foot();
}

write('industries', indexPage());
for (const i of industries) write(`industries/${i.slug}`, industryPage(i));
console.log(`industries: overview and ${industries.length} sector pages written`);
