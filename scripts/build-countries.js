#!/usr/bin/env node
/**
 * Generates /countries (the hub) and /countries/<slug> (one landing page per country) from scripts/site-data/countries.js.
 * Each page shows live local time against India, the working-hours overlap, the rules and payment methods we plan for,
 * services, case studies, FAQs and guides. The footer country cards (build-nav.js) link here.
 * Run through `node scripts/build-all.js`.
 */
const fs = require('fs');
const path = require('path');
const { families } = require('./site-data/services');
const { WORK } = require('./site-data/industries');
const { HOME, countries } = require('./site-data/countries');
const { flag } = require('./site-data/flags');
const { SITE, esc, head, foot, crumbs } = require('./careers/shell');
const R = require('./site-data/render');
const G = require('./site-data/guides');

const ROOT = path.resolve(__dirname, '..');
const write = (rel, html) => { const f = path.join(ROOT, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };

// live clocks: chrome.js fills [data-clock] with the local time and [data-clock-diff] with the gap to India
const clock = (c, label) => `<div class="cty-clock-row">
            <span class="cty-clock-flag">${flag(c.code)}</span>
            <span class="cty-clock-name"><strong>${esc(c.city)}</strong><small>${esc(label)}</small></span>
            <span class="cty-clock-time" data-clock data-tz="${c.tz}">&nbsp;</span>
          </div>`;
const clockCard = (c) => `<div class="cty-clock" aria-label="Local time in ${esc(c.city)} and Bhubaneswar">
          <p class="cty-clock-head">Right now</p>
          ${clock(c, c.tzLabel)}
          ${clock(HOME, 'India Standard Time')}
          <p class="cty-clock-diff"><span data-clock-diff data-tz="${c.tz}">${esc(c.city)} and India</span></p>
        </div>`;

function countryPage(c) {
  const url = `${SITE}/countries/${c.slug}`;
  const graph = [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: c.title, description: c.description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${url}#service` } },
    { '@type': 'Service', '@id': `${url}#service`, name: `Software and app development for ${c.name}`, serviceType: 'Software development', description: c.description, url, provider: { '@id': `${SITE}/#organization` }, areaServed: { '@type': 'Country', name: c.name } },
    crumbs([['Home', `${SITE}/`], ['Countries', `${SITE}/countries`], [c.name, url]]),
    R.faqLd(c.faq),
  ];
  const others = countries.filter((x) => x.slug !== c.slug);
  const otherPills = `<ul class="cty-pills">${others.map((x) => `<li><a href="/countries/${x.slug}">${flag(x.code)}<span>${esc(x.name)}</span></a></li>`).join('')}<li><a href="${HOME.href}">${flag(HOME.code)}<span>India</span></a></li></ul>`;
  return head({ title: c.title, description: c.description, canonical: url, graph }) + `
<main id="top">${R.hero({ crumbs: [['Home', '/'], ['Countries', '/countries'], [c.name, `/countries/${c.slug}`]], pill: `${c.name} · ${c.tzLabel}`, h1: c.h1, sub: c.intro, secondary: ['See our work', '/work'], artHtml: clockCard(c) })}
${R.section('why', `Why ${c.adj} teams work with us`, R.cards(c.why).replace('wwm-cards', 'wwm-cards wwm-cards-4'))}
${R.section('hours', 'Working hours that overlap', R.prose(c.overlap), 'wwm-sec-alt')}
${R.section('rules', `Built for ${c.name === 'United States' ? 'US' : c.name === 'United Kingdom' ? 'UK' : c.name === 'United Arab Emirates' ? 'UAE' : c.name} rules and users`, `${R.cards(c.rules).replace('wwm-cards', 'wwm-cards wwm-cards-4')}
      <p class="wwm-lead cty-pay"><strong>Payments we integrate:</strong> ${esc(c.payments)}</p>
      <p class="cty-note">We design for these requirements and support your review; your legal and compliance advisers confirm what applies to your business.</p>`)}
${R.section('services', 'What we build', R.pills(families.map((f) => [f.name, f.path])), 'wwm-sec-alt')}
${R.section('work', 'Products we have built', `<ul class="wwm-cards wwm-cards-links">
${Object.values(WORK).map((w, n) => `        <li class="wwm-c"><a href="${w.href}"><span class="wwm-c-n" aria-hidden="true">0${n + 1}</span><h3>${esc(w.title)}</h3><p>${esc(w.note)}</p><span class="wwm-c-go">Read the case study</span></a></li>`).join('\n')}
      </ul>`)}
${R.section('process', 'How an engagement works', R.process(), 'wwm-sec-alt')}
${R.section('faq', `Questions from ${c.adj} founders`, R.faqHtml(c.faq))}
${R.section('guides', 'Guides for planning your build', R.guides(c.guides.map(G.guide)), 'wwm-sec-alt')}
${R.section('countries', 'Other countries we build for', otherPills)}
${R.endBand(`Building for the ${c.short === 'USA' ? 'US' : c.short} market?`, 'Tell me what you want to build. The first call is free, and we will pick a time that suits your time zone.')}
</main>
` + foot();
}

function hubPage() {
  const url = `${SITE}/countries`;
  const title = 'Countries We Build Software For | Nihar Ranjan Rout';
  const description = 'Mobile apps, web apps and AI products for founders in the USA, UK, Canada, UAE, Australia, Singapore and Vietnam, from a founder-led team in India.';
  const graph = [
    { '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: 'Countries we build software for', description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#person` } },
    crumbs([['Home', `${SITE}/`], ['Countries', url]]),
    { '@type': 'ItemList', name: 'Countries', itemListElement: countries.map((c, n) => ({ '@type': 'ListItem', position: n + 1, name: c.name, url: `${SITE}/countries/${c.slug}` })) },
  ];
  const card = (c, href, line) => `        <li class="cty-card"><a href="${href}">
          <span class="cty-card-top">${flag(c.code)}<span><strong>${esc(c.name)}</strong><small>${esc(c.city)}</small></span></span>
          <span class="cty-card-line">${esc(line)}</span>
          <span class="cty-card-foot"><span class="cty-time"><i aria-hidden="true"></i><span data-clock data-tz="${c.tz}">&nbsp;</span></span><span class="cty-diff" data-clock-diff data-tz="${c.tz}" data-short></span></span>
        </a></li>`;
  const grid = `<ul class="cty-grid">
${countries.map((c) => card(c, `/countries/${c.slug}`, c.card)).join('\n')}
${card(HOME, HOME.href, HOME.card)}
      </ul>`;
  const prose = 'Every project runs the same way wherever you are: a free call, a written proposal, a PRD before any code and working software at every milestone. What changes by country is the working rhythm and the rules. We agree a daily overlap window that suits your time zone, plan for your privacy and payment requirements, and keep decisions in writing so nothing waits on a meeting.';
  return head({ title, description, canonical: url, graph }) + `
<main id="top">${R.hero({ crumbs: [['Home', '/'], ['Countries', '/countries']], pill: `${countries.length + 1} countries, one team`, h1: 'Building with founders across time zones.', sub: 'Based in Bhubaneswar, India, and set up to work with startups and businesses abroad. Pick your country to see how the hours overlap and what we plan for.', secondary: ['See our work', '/work'] })}
${R.section('all', 'Choose your country', grid)}
${R.section('how', 'How we work across countries', R.prose(prose), 'wwm-sec-alt')}
${R.section('process', 'How an engagement works', R.process())}
${R.endBand('Not sure the hours will work?', 'Book a free call at a time that suits you and we will agree a working rhythm before anything else.')}
</main>
` + foot();
}

write('countries', hubPage());
for (const c of countries) write(`countries/${c.slug}`, countryPage(c));
console.log(`countries: hub and ${countries.length} country pages written`);
