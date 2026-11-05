#!/usr/bin/env node
/**
 * Landing pages for major world cities: /software-development-<city> (scripts/site-data/world-cities.js).
 * Each page: who we build for in that city, live local time against India, working-hours overlap, local
 * industries, the country's rules and payment methods (from countries.js), services, case studies and FAQs.
 * We have no offices in these cities; copy says we work with companies there remotely.
 * Run through `node scripts/build-all.js` (after build-countries.js).
 */
const fs = require('fs');
const path = require('path');
const { families } = require('./site-data/services');
const { WORK } = require('./site-data/industries');
const { HOME, countries } = require('./site-data/countries');
const CITIES = require('./site-data/world-cities');
const { flag } = require('./site-data/flags');
const { SITE, esc, head, foot, crumbs } = require('./careers/shell');
const R = require('./site-data/render');

const ROOT = path.resolve(__dirname, '..');
const write = (rel, html) => { const f = path.join(ROOT, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const bySlug = Object.fromEntries(countries.map((c) => [c.slug, c]));
const urlOf = (c) => `/software-development-${c.slug}`;

const clockRow = (code, city, tz, label) => `<div class="cty-clock-row">
            <span class="cty-clock-flag">${flag(code)}</span>
            <span class="cty-clock-name"><strong>${esc(city)}</strong><small>${esc(label)}</small></span>
            <span class="cty-clock-time" data-clock data-tz="${tz}">&nbsp;</span>
          </div>`;
const clockCard = (c) => `<div class="cty-clock" aria-label="Local time in ${esc(c.name)} and India">
          <p class="cty-clock-head">Right now</p>
          ${clockRow(c.code, c.name, c.tz, c.tzLabel)}
          ${clockRow(HOME.code, 'India', HOME.tz, 'India Standard Time')}
          <p class="cty-clock-diff"><span data-clock-diff data-tz="${c.tz}">${esc(c.name)} and India</span></p>
        </div>`;

const SERVICES = (c) => [
  ['Mobile app development', `Android, iOS, Flutter and React Native apps for ${c.name} startups and businesses, from PRD to App Store launch.`, '/services/mobile-app-development'],
  ['Web application development', 'Portals, dashboards, SaaS platforms and fast, SEO-friendly websites.', '/services/web-application-development'],
  ['Custom software and ERP', 'ERP, CRM and enterprise applications built around how your teams work.', '/services/custom-software-development'],
  ['AI development', 'RAG assistants, AI agents and chatbots grounded in your own data.', '/services/ai-product-development'],
  ['MVP development', 'A first working version in about 4 weeks, then improvements in milestones.', '/services/product-strategy-prd/mvp-development'],
  ['DevOps and cloud', 'AWS, Azure and Google Cloud setup, CI/CD, monitoring and cost control.', '/services/devops-cloud-engineering'],
];
const linkCards = (list) => `<ul class="wwm-cards wwm-cards-links">
${list.map(([t, d, href], n) => `        <li class="wwm-c"><a href="${href}"><span class="wwm-c-n" aria-hidden="true">0${n + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p><span class="wwm-c-go">Learn more</span></a></li>`).join('\n')}
      </ul>`;
const workCards = () => linkCards(['skyone', 'flash', 'mml', 'erp'].map((k) => [WORK[k].title, WORK[k].note, WORK[k].href]));

function cityPage(c) {
  const country = bySlug[c.country];
  const url = `${SITE}${urlOf(c)}`;
  const title = `Software & App Development for ${c.name} Companies | Creuto`;
  const description = `Mobile app, web and AI development for ${c.name} startups and enterprises: a founder-led team with calls in ${c.tzLabel}, 120+ products shipped. Free call.`;
  const h1 = `Software and App Development for ${c.name} Companies`;
  const faq = [
    [`Do you build software for companies in ${c.name}?`, `Yes. Creuto builds mobile apps, web platforms, custom software and AI products for startups and enterprises in ${c.name}, working remotely with calls planned around ${c.tzLabel}.`],
    ...c.faq,
    [`How do ${c.name} projects start?`, 'Book a free 30-minute call with Nihar Ranjan Rout. If we are a good fit, you receive a written proposal within 24 hours, then a PRD and the first milestone.'],
    ...R.commonFaq('software'),
  ];
  const graph = [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${url}#service` } },
    { '@type': 'Service', '@id': `${url}#service`, name: h1, serviceType: 'Software development', description, url, provider: { '@id': `${SITE}/#organization` }, areaServed: { '@type': 'City', name: c.name } },
    crumbs([['Home', `${SITE}/`], ['Countries', `${SITE}/countries`], [country.name, `${SITE}/countries/${country.slug}`], [c.name, url]]),
    R.faqLd(faq),
  ];
  const others = CITIES.filter((x) => x.slug !== c.slug);
  return head({ title, description, canonical: url, graph }) + `
<main id="top">${R.hero({ crumbs: [['Home', '/'], ['Countries', '/countries'], [country.name, `/countries/${country.slug}`], [c.name, urlOf(c)]], pill: `${c.name} · ${c.tzLabel}`, h1, sub: c.intro, secondary: ['Get a free quote', '#quote'], artHtml: clockCard(c) })}
${R.glance(`Software, mobile app and AI development for ${c.name} companies`)}
${R.section('services', `What we build for ${c.name} companies`, linkCards(SERVICES(c)))}
${R.section('approach', `How we work with ${c.name} teams`, R.prose(c.angle), 'wwm-sec-alt')}
${R.section('hours', `Working hours with ${c.name}`, R.prose(c.hours))}
${R.section('industries', `Industries we build for in ${c.name}`, R.pills(c.industries), 'wwm-sec-alt')}
${R.section('rules', `Built for ${country.short || country.name} rules and users`, `${R.cards(country.rules).replace('wwm-cards', 'wwm-cards wwm-cards-4')}
      <p class="wwm-lead cty-pay"><strong>Payments we integrate:</strong> ${esc(country.payments)}</p>
      <p class="cty-note">We design for these requirements and support your review; your legal and compliance advisers confirm what applies to your business.</p>`)}
${R.section('why', `Why ${c.name} companies choose Creuto`, R.why('software'), 'wwm-sec-alt')}
${R.section('process', 'How an engagement works', R.process())}
${R.section('work', 'Products we have built', workCards(), 'wwm-sec-alt')}
${R.section('faq', `Questions from ${c.name} companies`, R.faqHtml(faq))}
${R.section('more', 'Other cities and countries we build for', `${R.pills(others.map((x) => [x.name, urlOf(x)]))}
      <p class="cty-note"><a href="/countries/${country.slug}">Software development for ${esc(country.name)}</a> · <a href="/countries">All countries</a></p>`, 'wwm-sec-alt')}
${R.endBand(`Building something in ${c.name}?`, `Tell me what you want to build. The first call is free, and we will pick a time that suits ${c.tzLabel}.`, '', c.name)}
</main>
` + foot();
}

for (const c of CITIES) write(urlOf(c).slice(1), cityPage(c));
console.log(`world cities: ${CITIES.length} pages written`);
