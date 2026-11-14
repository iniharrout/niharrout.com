#!/usr/bin/env node
/**
 * "Hire developers" pages for buyers ready to hire: /hire (hub), /hire/<role-or-model> and
 * /offshore-software-development-company. Content lives in scripts/site-data/hire.js.
 * Facts only (see project business facts): no prices, no trial periods, no "top 1%" style claims.
 * Run through `node scripts/build-all.js` (after build-world-cities.js).
 */
const fs = require('fs');
const path = require('path');
const { roles, models, offshore } = require('./site-data/hire');
const { WORK } = require('./site-data/industries');
const { SITE, esc, head, foot, crumbs } = require('./careers/shell');
const R = require('./site-data/render');

const ROOT = path.resolve(__dirname, '..');
const write = (rel, html) => { const f = path.join(ROOT, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const blogTitle = (slug) => { try { return require(`./blog/${slug}`).title; } catch { return slug; } };

const ART = { 'flutter-developers': 'layers', 'react-native-developers': 'mobile', 'ai-developers': 'agent', 'python-developers': 'api', 'nodejs-developers': 'realtime', 'react-developers': 'web', 'full-stack-developers': 'stack', 'android-developers': 'android', 'ios-developers': 'ios', 'dedicated-development-team': 'senior', 'staff-augmentation': 'roadmap', 'offshore-software-development-company': 'cloud' };
const urlOf = (p) => (p === offshore ? `/${p.slug}` : `/hire/${p.slug}`);
const skillPills = (list) => `<ul class="wwm-pills wwm-pills-static">${list.map((t) => `<li><span>${esc(t)}</span></li>`).join('')}</ul>`;
const linkCards = (list) => `<ul class="wwm-cards wwm-cards-links">
${list.map(([t, d, href, go = 'Learn more'], n) => `        <li class="wwm-c"><a href="${href}"><span class="wwm-c-n" aria-hidden="true">${String(n + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p><span class="wwm-c-go">${esc(go)}</span></a></li>`).join('\n')}
      </ul>`;

const MODELS = [
  ['Dedicated team', 'A team that works only on your product. We manage people and quality; you set priorities.', '/hire/dedicated-development-team'],
  ['Team extension', 'Engineers who join your in-house team, work in your tools and follow your processes.', '/hire/staff-augmentation'],
  ['Fixed-scope project', 'A written PRD, milestones and payment tied to deliverables, for a clearly defined build.', '/services/product-strategy-prd/mvp-development'],
];
const STEPS = [
  ['Free 30-minute call', 'Tell me about your product, team and the skills you need.'],
  ['Written proposal in 24 hours', 'Roles, seniority, engagement model and how we will work together.'],
  ['Meet the people', 'You talk to the developers before they start. NDA signed before any details are shared.'],
  ['Onboarding', 'Access to your repositories and tools, a daily overlap window and a reporting rhythm agreed.'],
  ['Ongoing delivery', 'Daily written updates, demos of working software and founder oversight throughout.'],
];
const steps = () => `<ol class="wwm-flow">
${STEPS.map(([t, d], i) => `        <li><span class="wwm-flow-n">0${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('\n')}
      </ol>`;
const WHY = (what) => R.cards([
  ['Founder-led', `Nihar Ranjan Rout scopes the engagement and stays involved, so your ${what} have senior backing.`],
  ['Your code, your accounts', 'Repositories, cloud and app store accounts in your name from day one. NDA before discovery.'],
  ['Working in your time zone', 'A fixed daily overlap with the US, UK, Australia or the UAE, plus written updates every day.'],
  ['Proven delivery', 'OpenAI Select Partner, 5.0 on Clutch from 16 verified reviews and 120+ products shipped.'],
]).replace('wwm-cards', 'wwm-cards wwm-cards-4');
const SHARED_FAQ = [
  ['How quickly can developers start?', 'It depends on the skills and seniority you need. After the first call we confirm availability and a start date in the written proposal.'],
  ['Who owns the code?', 'You do. Code, repositories and accounts stay in your name, and we sign an NDA before discovery.'],
  ['Can we scale the team up or down?', 'Yes. Roles can be added or reduced as your roadmap changes, with notice agreed in the contract.'],
  ['How do you price developer hiring?', 'Pricing depends on the roles, seniority and engagement model. You receive a written proposal with costs within 24 hours of the first call.'],
];

function page(p, kind) {
  const url = `${SITE}${urlOf(p)}`;
  const isRole = kind === 'role';
  const name = isRole ? `${p.tech} developers` : p.kw;
  const faq = [...p.faq, ...SHARED_FAQ];
  const trail = p === offshore ? [['Home', '/'], [p.h1, urlOf(p)]] : [['Home', '/'], ['Hire developers', '/hire'], [p.h1, urlOf(p)]];
  const graph = [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: p.title, description: p.desc, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${url}#service` } },
    { '@type': 'Service', '@id': `${url}#service`, name: p.h1, serviceType: isRole ? `${p.tech} developer hiring` : p.h1, description: p.desc, url, provider: { '@id': `${SITE}/#organization` }, areaServed: ['US', 'GB', 'CA', 'AU', 'AE', 'IN'] },
    crumbs(trail.map(([l, h]) => [l, `${SITE}${h === '/' ? '/' : h}`])),
    R.faqLd(faq),
  ];
  const others = roles.filter((r) => r !== p).map((r) => [r.h1.replace('Hire ', ''), urlOf(r)]);
  const sections = [];
  sections.push(R.glance(isRole ? `${p.tech} developers for hire from a founder-led team in India` : `${p.h1} from a founder-led team in India`));
  sections.push(R.section('what', isRole ? `What our ${p.tech} developers build` : p.workTitle, R.cards(p.work)));
  sections.push(R.section('skills', isRole ? `${p.tech} skills and tools` : p.skillsTitle, skillPills(p.skills), 'wwm-sec-alt'));
  sections.push(R.section('fit', isRole ? `When to hire ${p.tech} developers` : 'When this is a good fit', R.fits('A good fit when', p.fits)));
  if (isRole || p === offshore) sections.push(R.section('models', 'Ways to work with us', linkCards(MODELS), 'wwm-sec-alt'));
  sections.push(R.section('process', 'How hiring works', steps(), isRole || p === offshore ? '' : 'wwm-sec-alt'));
  sections.push(R.section('why', `Why hire ${name} through Creuto`, WHY(isRole ? `${p.tech} developers` : 'engineers'), 'wwm-sec-alt'));
  if (p.cases) sections.push(R.section('work', 'Products our team has built', linkCards(p.cases.map((k) => [WORK[k].title, WORK[k].note, WORK[k].href, 'Read the case study']))));
  const more = [];
  if (p.service) more.push([`${p.tech} development services`, 'Prefer us to build the whole product? See the service page.', p.service]);
  if (p.guide) more.push([blogTitle(p.guide), 'A practical guide to choosing and running this model.', `/blog/${p.guide}`, 'Read the guide']);
  if (more.length) sections.push(R.section('more', 'Related', linkCards(more)));
  sections.push(R.section('faq', `Questions about hiring ${name}`, R.faqHtml(faq), 'wwm-sec-alt'));
  sections.push(R.section('roles', 'Other developers you can hire', `${R.pills(others)}
      <p class="cty-note"><a href="/hire">All hiring options</a> · <a href="/hire/dedicated-development-team">Dedicated team</a> · <a href="/hire/staff-augmentation">Staff augmentation</a> · <a href="/offshore-software-development-company">Offshore development</a></p>`));
  sections.push(R.endBand(isRole ? `Need ${p.tech} developers?` : 'Ready to build your team?', 'Tell me the roles and skills you need. The first call is free, and you get a written proposal within 24 hours.', isRole ? `Hire ${p.tech} developers` : p.h1));
  return head({ title: p.title, description: p.desc, canonical: url, graph }) + `
<main id="top">${R.hero({ crumbs: trail, pill: isRole ? `Hire ${p.tech} developers · Remote, from India` : 'Founder-led team · India', h1: p.h1, sub: p.intro, secondary: ['Get a free quote', '#quote'], art: ART[p.slug] })}
${sections.join('\n')}
</main>
` + foot();
}

function hub() {
  const url = `${SITE}/hire`;
  const title = 'Hire Developers in India: Mobile, Web and AI | Creuto';
  const description = 'Hire Flutter, React Native, Android, iOS, React, Node.js, Python, full-stack and AI developers, or a dedicated team, from a founder-led company in India.';
  const h1 = 'Hire Developers for Your Product';
  const faq = SHARED_FAQ;
  const graph = [
    { '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${SITE}/#website` } },
    crumbs([['Home', `${SITE}/`], ['Hire developers', url]]),
    R.faqLd(faq),
  ];
  return head({ title, description, canonical: url, graph }) + `
<main id="top">${R.hero({ crumbs: [['Home', '/'], ['Hire developers', '/hire']], pill: 'Remote developers · Founder-led team in India', h1, sub: 'Add mobile, web, backend and AI engineers to your product, as individual developers, a team extension or a complete dedicated team, with code in your accounts and calls planned around your working day.', secondary: ['Get a free quote', '#quote'], art: 'stack' })}
${R.glance('Developers and dedicated teams for hire from a founder-led company in India')}
${R.section('roles', 'Developers you can hire', linkCards(roles.map((r) => [r.h1, r.intro.split('. ')[0] + '.', urlOf(r), 'See the details'])))}
${R.section('models', 'Ways to work with us', linkCards([...models.map((m) => [m.h1, m.intro.split('. ')[0] + '.', urlOf(m)]), [offshore.h1, offshore.intro.split('. ')[0] + '.', urlOf(offshore)]]), 'wwm-sec-alt')}
${R.section('process', 'How hiring works', steps())}
${R.section('why', 'Why hire through Creuto', WHY('developers'), 'wwm-sec-alt')}
${R.section('faq', 'Questions about hiring developers', R.faqHtml(faq))}
${R.endBand('Tell me who you need', 'Share the roles and skills you need. The first call is free, and you get a written proposal within 24 hours.', 'Hire developers')}
</main>
` + foot();
}

write('hire', hub());
for (const r of roles) write(urlOf(r).slice(1), page(r, 'role'));
for (const m of models) write(urlOf(m).slice(1), page(m, 'model'));
write(offshore.slug, page(offshore, 'offshore'));
console.log(`hire: ${roles.length + models.length + 2} pages written`);
