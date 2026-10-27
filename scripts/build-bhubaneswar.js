#!/usr/bin/env node
/**
 * Local landing pages for Bhubaneswar, where the team is based, targeting what people there search for
 * (Google search suggestions, 2026-10-25): "software development company in Bhubaneswar", "IT company in
 * Bhubaneswar", "web development company in Bhubaneswar", "website design company in Bhubaneswar" and
 * "ERP software development company in Bhubaneswar". The mobile app and AI pages for Bhubaneswar already exist
 * as hand-written pages and are linked from here.
 * Run through `node scripts/build-all.js`.
 */
const fs = require('fs');
const path = require('path');
const { SITE, esc, head, foot, crumbs } = require('./careers/shell');
const R = require('./site-data/render');
const G = require('./site-data/guides');
const { WORK } = require('./site-data/industries');

const ROOT = path.resolve(__dirname, '..');
const write = (rel, html) => { const f = path.join(ROOT, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };

const LOCAL = [
  ['Software development company in Bhubaneswar', '/software-development-company-bhubaneswar'],
  ['App development company in Bhubaneswar', '/mobile-app-development-bhubaneswar'],
  ['Web development company in Bhubaneswar', '/web-development-company-bhubaneswar'],
  ['ERP software development in Bhubaneswar', '/erp-software-development-bhubaneswar'],
  ['AI development company in Bhubaneswar', '/ai-product-development-bhubaneswar'],
];
const ODISHA = [['Cuttack', '/locations/cuttack'], ['Rourkela', '/locations/rourkela'], ['Sambalpur', '/locations/sambalpur'], ['Berhampur', '/locations/berhampur']];

const business = (url, name, description) => ({
  '@type': 'ProfessionalService', '@id': `${url}#business`, name: `Creuto: ${name}`, description, url,
  parentOrganization: { '@id': `${SITE}/#organization` }, founder: { '@id': `${SITE}/#person` },
  address: { '@type': 'PostalAddress', addressLocality: 'Bhubaneswar', addressRegion: 'Odisha', addressCountry: 'IN' },
  areaServed: [{ '@type': 'City', name: 'Bhubaneswar' }, { '@type': 'State', name: 'Odisha' }, { '@type': 'Country', name: 'India' }],
  award: 'Top Software Development Company in Odisha, GoodFirms (October 2026)',
  telephone: '+91 76088 44995', email: 'me@niharrout.com',
});

const workCards = () => `<ul class="wwm-cards wwm-cards-links">
${Object.values(WORK).map((w, n) => `        <li class="wwm-c"><a href="${w.href}"><span class="wwm-c-n" aria-hidden="true">0${n + 1}</span><h3>${esc(w.title)}</h3><p>${esc(w.note)}</p><span class="wwm-c-go">Read the case study</span></a></li>`).join('\n')}
      </ul>`;
const linkCards = (list) => `<ul class="wwm-cards wwm-cards-links">
${list.map(([t, d, href], n) => `        <li class="wwm-c"><a href="${href}"><span class="wwm-c-n" aria-hidden="true">0${n + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p><span class="wwm-c-go">Learn more</span></a></li>`).join('\n')}
      </ul>`;

const PAGES = [
  {
    slug: 'software-development-company-bhubaneswar',
    name: 'Software Development Company in Bhubaneswar',
    title: 'Top Software Development Company in Bhubaneswar | Nihar Ranjan Rout',
    description: 'Top software development company in Bhubaneswar, India: ranked #1 in Odisha by GoodFirms. Apps, websites, ERP and AI by a founder-led team. Free call.',
    image: '/assets/blog/creuto-top-software-development-company-in-odisha-share.jpg',
    pill: 'Bhubaneswar, Odisha',
    h1: 'Top Software Development Company in Bhubaneswar',
    sub: 'Creuto is a founder-led software, mobile app and AI development company headquartered in Bhubaneswar, Odisha, and ranked the top software development company in Odisha by GoodFirms. We build apps, websites, ERPs and AI products for businesses in Bhubaneswar and across India, and you work with me directly from the first call.',
    art: 'custom-software',
    sections: (r) => `
${R.section('services', 'What we build for Bhubaneswar businesses', linkCards([
    ['Mobile app development', 'Android, iOS, React Native and Flutter apps from PRD to Play Store and App Store launch.', '/mobile-app-development-bhubaneswar'],
    ['Website and web app development', 'Fast, SEO-friendly websites, ecommerce stores and web applications.', '/web-development-company-bhubaneswar'],
    ['ERP and custom software', 'Inventory, production, HR and accounting in one system built around how you work.', '/erp-software-development-bhubaneswar'],
    ['CRM development', 'Leads, follow-ups, WhatsApp and quotes in one place for your sales team.', '/services/custom-software-development/crm-development'],
    ['AI development', 'Chatbots and assistants that answer from your documents, and AI features in your product.', '/ai-product-development-bhubaneswar'],
    ['Startup MVPs', 'A first working version in about 4 weeks, starting from a clear PRD.', '/services/product-strategy-prd/mvp-development'],
  ]))}
${R.section('why', 'Why work with a software company based in Bhubaneswar', R.cards([
    ['Top-ranked in Odisha', 'Ranked the top software development company in Odisha by GoodFirms, first of 74 firms reviewed in October 2026.'],
    ['Meet in person', 'Workshops, demos and launch days can happen face to face, not only on video calls.'],
    ['Founder-led', 'You speak with Nihar Ranjan Rout, the person responsible for your product, not an account manager.'],
    ['Built for Odisha and India', 'Odia, Hindi and English interfaces, UPI payments and performance on budget phones.'],
  ]).replace('wwm-cards', 'wwm-cards wwm-cards-4'), 'wwm-sec-alt')}
${R.section('work', 'Products we have built', workCards())}
${R.section('process', 'How an engagement works', R.process(), 'wwm-sec-alt')}
${R.section('faq', 'Questions about software development in Bhubaneswar', R.faqHtml(r.faq))}
${R.section('guides', 'Guides for planning your project', R.guides(['app-development-cost-factors-india', 'how-to-choose-a-software-development-company', 'how-long-does-it-take-to-build-an-app'].map(G.guide)), 'wwm-sec-alt')}
${R.section('local', 'More from Bhubaneswar and Odisha', `${R.pills(LOCAL.filter(([, h]) => h !== '/software-development-company-bhubaneswar'))}<p class="wwm-lead" style="margin-top:20px">We also work with businesses in other Odisha cities:</p>${R.pills(ODISHA)}`)}`,
    faq: [
      ['Is Creuto a software company in Bhubaneswar?', 'Yes. Creuto is a founder-led software, mobile app and AI development company headquartered in Bhubaneswar, Odisha, working with businesses in Bhubaneswar, across India and abroad.'],
      ['Which is the top software development company in Odisha?', 'GoodFirms reviewed 74 software development companies in Odisha as of October 2026 and ranked Creuto first, with a 4.9-star rating from verified client reviews.'],
      ['What kind of IT company is Creuto?', 'A product and engineering company: we plan, design and build mobile apps, websites, web applications, ERPs, CRMs and AI products, and keep improving them after launch. We do not resell software licences or run IT support desks.'],
      ['Can we meet you in person in Bhubaneswar?', 'Yes. For businesses in Bhubaneswar and nearby cities we can meet at Infocity, Patia or at your office for workshops, demos and launch sessions when it helps the project.'],
      ['Do you work with businesses outside Odisha?', 'Yes. We work with startups and businesses across India and in countries such as the USA, UAE, Australia and Singapore, with calls planned around their working day.'],
      ['Are you hiring in Bhubaneswar?', 'Open roles are listed on the careers page. Current roles are full-time and remote across India, so people in Bhubaneswar are welcome to apply.'],
      ['How do we start a project?', 'Book a free 30-minute call. If we are a good fit, you get a written proposal within 24 hours, followed by a PRD and the first milestone.'],
    ],
  },
  {
    slug: 'web-development-company-bhubaneswar',
    name: 'Web Development Company in Bhubaneswar',
    title: 'Website Design & Web Development Company in Bhubaneswar | Nihar Rout',
    description: 'Website design and web development company in Bhubaneswar: web designers building fast, SEO-friendly business websites, online stores and web apps.',
    pill: 'Bhubaneswar, Odisha',
    h1: 'Website Design and Web Development Company in Bhubaneswar',
    sub: 'Websites, ecommerce stores and web applications for Bhubaneswar businesses, designed to load fast, rank in search and turn visitors into enquiries. Built by a founder-led team headquartered in Bhubaneswar.',
    art: 'web',
    sections: (r) => `
${R.section('services', 'Website and web development services', R.cards([
    ['Business websites', 'Clear, fast company websites that explain what you do and bring in enquiries.'],
    ['Website design', 'Custom design for your brand, built mobile-first and accessible.'],
    ['Ecommerce websites', 'Online stores with UPI, cards and cash on delivery, GST invoices and courier integration.'],
    ['Web applications', 'Customer portals, dashboards, booking systems and internal tools.'],
    ['SEO-friendly builds', 'Clean structure, fast pages and the technical SEO search engines expect.'],
    ['Redesigns and migrations', 'Move from an old or slow site without losing search rankings.'],
  ]))}
${R.section('approach', 'How we build websites that bring business', R.prose('Most business websites in Bhubaneswar look fine but do little: slow on phones, hard to find on Google and unclear about what to do next. We start from the enquiries you want, plan the pages people actually search for, write clear content with you, and build a site that loads fast on budget phones. Every site ships with analytics, so you can see which pages bring calls and messages.'), 'wwm-sec-alt')}
${R.section('compare', 'Website, ecommerce store or web app?', R.cards([
    ['Website', 'You need people to find you, understand your offer and contact you.'],
    ['Ecommerce store', 'You want customers to browse products and pay online.'],
    ['Web application', 'Customers or staff log in to book, track, manage or work.'],
  ]))}
${R.section('work', 'Products we have built', workCards(), 'wwm-sec-alt')}
${R.section('faq', 'Questions about web development in Bhubaneswar', R.faqHtml(r.faq))}
${R.section('guides', 'Guides for planning your website', R.guides(['website-vs-web-app-difference', 'shopify-vs-custom-ecommerce-development', 'pwa-vs-native-app'].map(G.guide)), 'wwm-sec-alt')}
${R.section('local', 'More from Bhubaneswar', R.pills([...LOCAL.filter(([, h]) => h !== '/web-development-company-bhubaneswar'), ['Custom web development services', '/services/web-application-development/customized-web-development']]))}`,
    faq: [
      ['Are you a website design company in Bhubaneswar?', 'Yes. We design and build business websites, ecommerce stores and web applications for businesses in Bhubaneswar and across Odisha, from a team headquartered in Bhubaneswar.'],
      ['Do you have web designers in Bhubaneswar?', 'Yes. Our web designers and developers work from Bhubaneswar, so local businesses can meet the team, review designs together and get changes made quickly.'],
      ['Do you build ecommerce websites in Bhubaneswar?', 'Yes. We build online stores with UPI, cards and cash on delivery, GST-ready invoices and courier integrations, either on a platform like Shopify or as a custom build when you need more flexibility.'],
      ['Will my website rank on Google?', 'No one can promise rankings, but we build sites the way search engines expect: fast pages, clean structure, the right page for each service and location, and content written around what customers search for.'],
      ['How much does a website cost?', 'It depends on the number of pages, features and integrations. Use the free cost calculator for a first estimate, or book a call and get a written proposal within 24 hours.'],
      ['Can you redesign our existing website?', 'Yes. We redesign and rebuild existing sites and set up redirects so you keep the search rankings you already have.'],
    ],
  },
  {
    slug: 'erp-software-development-bhubaneswar',
    name: 'ERP Software Development Company in Bhubaneswar',
    title: 'ERP Software Development Company in Bhubaneswar | Nihar Ranjan Rout',
    description: 'ERP software development company in Bhubaneswar: custom ERP for manufacturing, distribution, retail and services businesses in Odisha. Free strategy call.',
    pill: 'Bhubaneswar, Odisha',
    h1: 'ERP Software Development Company in Bhubaneswar',
    sub: 'Custom ERP software for manufacturers, distributors, retailers and service businesses in Bhubaneswar and across Odisha. Inventory, production, purchase, sales, HR and accounts in one system built around how your business runs.',
    art: 'erp',
    sections: (r) => `
${R.section('modules', 'ERP modules we build', R.cards([
    ['Inventory and warehouse', 'Stock by location, batches, barcodes and reorder alerts.'],
    ['Production', 'Bills of materials, work orders and shop-floor tracking.'],
    ['Purchase and vendors', 'Purchase orders, approvals and supplier records.'],
    ['Sales and billing', 'Quotes, orders, GST invoices and e-way bills.'],
    ['HR and payroll inputs', 'Attendance, leave and staff records.'],
    ['Reports and dashboards', 'Real-time numbers for owners and managers.'],
  ]))}
${R.section('approach', 'How we roll out an ERP without stopping the business', R.prose('We start on your floor, not in a meeting room: how orders come in, how stock moves, where the spreadsheets live. Then we build one module at a time, run it alongside your old process for a short period, train the people who use it every day and only then switch over. This staged approach is how we moved four departments onto one real-time system in our manufacturing ERP project.'), 'wwm-sec-alt')}
${R.section('work', 'Case study', `${R.pills([['Custom ERP for manufacturing operations', '/work/custom-erp-manufacturing']])}<p class="wwm-lead" style="margin-top:16px">See every product we have built on the <a href="/work">work page</a>.</p>`)}
${R.section('process', 'How an engagement works', R.process(), 'wwm-sec-alt')}
${R.section('faq', 'Questions about ERP software in Bhubaneswar', R.faqHtml(r.faq))}
${R.section('guides', 'Guides for planning your ERP', R.guides(['custom-erp-vs-off-the-shelf-erp', 'why-custom-erp-implementations-fail', 'inventory-management-software-development'].map(G.guide)), 'wwm-sec-alt')}
${R.section('local', 'More from Bhubaneswar', R.pills([...LOCAL.filter(([, h]) => h !== '/erp-software-development-bhubaneswar'), ['Custom ERP development services', '/services/custom-software-development/custom-erp-development'], ['Cost to build an enterprise ERP', '/project-costs/enterprise-erp']]))}`,
    faq: [
      ['Do you build custom ERP software in Bhubaneswar?', 'Yes. We build custom ERP systems for manufacturers, distributors, retailers and service businesses in Bhubaneswar and across Odisha, from a team headquartered in Bhubaneswar.'],
      ['Should we buy an ERP or build one?', 'Buy when a product fits your process. Build, or extend, when your workflows are distinctive or you need tight integration with your own apps and machines. Our guide on custom vs off-the-shelf ERP explains the decision.'],
      ['Can the ERP generate GST invoices and e-way bills?', 'Yes. We integrate GST e-invoicing and e-way bill generation for businesses that need them, alongside your accounting software.'],
      ['How long does an ERP project take?', 'It depends on the number of modules. We roll out in stages, so the first module is in use well before the whole system is complete.'],
      ['Can our staff use it on mobile phones?', 'Yes. Shop-floor, warehouse and field staff can use simple mobile screens for scanning, entries and approvals.'],
    ],
  },
];

const SVC = { 'software-development-company-bhubaneswar': 'Software development', 'web-development-company-bhubaneswar': 'Website design and development', 'erp-software-development-bhubaneswar': 'ERP software' };

function page(p) {
  const url = `${SITE}/${p.slug}`;
  const graph = [
    business(url, p.name, p.description),
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: p.title, description: p.description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${url}#business` } },
    crumbs([['Home', `${SITE}/`], ['Locations', `${SITE}/locations`], ['Bhubaneswar', `${SITE}/software-development-company-bhubaneswar`], ...(p.slug === 'software-development-company-bhubaneswar' ? [] : [[p.name, url]])]),
    R.faqLd(p.faq),
  ];
  const trail = [['Home', '/'], ['Locations', '/locations'], ['Bhubaneswar', '/software-development-company-bhubaneswar'], ...(p.slug === 'software-development-company-bhubaneswar' ? [] : [[p.name, `/${p.slug}`]])];
  return head({ title: p.title, description: p.description, canonical: url, graph, image: p.image }) + `
<main id="top">${R.hero({ crumbs: trail, pill: p.pill, h1: p.h1, sub: p.sub, secondary: ['Get a free quote', '#quote'], art: p.art })}
${p.sections(p)}
${R.endBand('Have a project in Bhubaneswar?', 'Tell me what you want to build. The first call is free, and we can meet in person if that helps.', SVC[p.slug], 'Bhubaneswar')}
</main>
` + foot();
}

for (const p of PAGES) write(p.slug, page(p));
console.log(`bhubaneswar: ${PAGES.length} local pages written`);
