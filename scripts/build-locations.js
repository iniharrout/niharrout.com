#!/usr/bin/env node
/**
 * Builds the location landing pages:
 *   /locations/                          index of all locations
 *   /locations/<city>/                   city hub (links to the three service pages)
 *   /locations/<city>/<service>/         city x service landing page
 * and refreshes the locations block in sitemap.xml.
 *
 * Usage: node scripts/build-locations.js
 * Content lives in scripts/locations/*.js. Zero dependencies.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://niharrout.com';
const services = require('./locations/services');
const cities = [...require('./locations/cities-odisha'), ...require('./locations/cities-metros')];
const scenarios = require('./locations/scenarios');
const SERVICE_KEYS = Object.keys(services);
const now = new Date();
const TODAY = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
const warnings = [];

/* ---------- Data helpers ---------- */

function loadPortfolio() {
  const src = fs.readFileSync(path.join(ROOT, 'assets/work-data.js'), 'utf8');
  const list = new Function(`${src}; return portfolioProjects;`)();
  return Object.fromEntries(list.map((p) => [p.slug, p]));
}
const portfolio = loadPortfolio();

const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fill = (text, city) => String(text).replace(/\{city\}/g, city.name);
const jsonLd = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n  </script>`;

const cityUrl = (c) => `/locations/${c.slug}/`;
const pageUrl = (c, key) => `/locations/${c.slug}/${services[key].slug}/`;

/* ---------- Shared page chrome ---------- */

function head({ title, description, path: urlPath, ogType = 'website', graph }) {
  if (title.length > 65) warnings.push(`title >65 chars (${title.length}): ${title}`);
  if (description.length > 165) warnings.push(`description >165 chars (${description.length}): ${urlPath}`);
  const canonical = SITE + urlPath;
  return `<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="author" content="Nihar Ranjan Rout">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/assets/nihar.jpg" type="image/jpeg">

  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="Nihar Ranjan Rout | Creuto">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${SITE}/assets/niharrout-og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${SITE}/assets/niharrout-og-image.png">

  ${jsonLd({ '@context': 'https://schema.org', '@graph': graph })}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="/assets/design-system.css?v=hs2026_5">
  <link rel="stylesheet" href="/assets/location-pages.css?v=loc1">

  <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
  <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
</head>

<body>
`;
}

const header = () => `
  <header class="site-header" id="site-header">
    <div class="wrap nav-inner">
      <a href="/" class="brand-link" aria-label="Nihar Ranjan Rout Homepage">
        <img src="/assets/nihar.jpg" alt="Nihar Ranjan Rout" class="brand-avatar" width="36" height="36">
        <div class="brand-text">nihar<span class="dot">.</span></div>
      </a>
      <nav aria-label="Primary Navigation">
        <ul class="nav-links">
          <li class="nav-item"><a href="/#services" class="nav-link">Services</a></li>
          <li class="nav-item"><a href="/#portfolio" class="nav-link">Portfolio</a></li>
          <li class="nav-item"><a href="/locations/" class="nav-link" style="color:var(--hs-brand); font-weight:700;">Locations</a></li>
          <li class="nav-item"><a href="/project-costs" class="nav-link">Pricing</a></li>
          <li class="nav-item"><a href="/about" class="nav-link">About</a></li>
        </ul>
      </nav>
      <div class="nav-actions">
        <a href="https://calendly.com/creuto/meet" data-calendly="true" class="cl-button -primary -small btn-book-call">Book a Call <span style="margin-left:4px;">→</span></a>
      </div>
    </div>
  </header>
`;

function footer(city) {
  const serviceLinks = city
    ? SERVICE_KEYS.map((k) => `<li><a href="${pageUrl(city, k)}">${esc(services[k].name)} in ${esc(city.name)}</a></li>`).join('')
    : SERVICE_KEYS.map((k) => `<li><a href="${services[k].bhubaneswarPage}">${esc(services[k].name)}</a></li>`).join('');
  const locationLinks = cities.map((c) => `<li><a href="${cityUrl(c)}">${esc(c.name)}</a></li>`).join('');
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="brand-link" style="margin-bottom:14px; display:inline-flex;" aria-label="Nihar Ranjan Rout Homepage">
            <img src="/assets/nihar.jpg" alt="Nihar Ranjan Rout" class="brand-avatar" width="36" height="36">
            <div class="brand-text" style="color:#ffffff;">nihar<span class="dot">.</span></div>
          </a>
          <p>Founder &amp; CEO of Creuto. Product leader with 8+ years turning complex operational requirements into scalable digital systems with a dedicated in-house squad.</p>
          <div style="font-size: 13.5px; color: #a8a8a8;">
            Bhubaneswar, Odisha, India · <a href="mailto:me@niharrout.com" style="color:var(--hs-brand); text-decoration:none;">me@niharrout.com</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>${city ? 'Services in ' + esc(city.name) : 'Services'}</h4>
          <ul class="footer-links">${serviceLinks}</ul>
        </div>
        <div class="footer-col">
          <h4>Locations</h4>
          <ul class="footer-links">
            <li><a href="/locations/" style="color:var(--hs-brand); font-weight:600;">All locations</a></li>
            ${locationLinks}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Insights</h4>
          <ul class="footer-links">
            <li><a href="/blog/">Blog &amp; Playbooks</a></li>
            <li><a href="/project-costs">Project Costs Guide 2026</a></li>
            <li><a href="/b2b-software-development-for-startups">B2B Startup Playbook</a></li>
            <li><a href="/technology">Technology Stack</a></li>
            <li><a href="https://linkedin.com/in/iniharrout" target="_blank" rel="noopener">LinkedIn Profile ↗</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© <span id="yr"></span> Nihar Ranjan Rout · Founder &amp; CEO, Creuto. All rights reserved.</div>
        <div style="display:flex; gap:20px;">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="#top">Back to Top ↑</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="/assets/site-enhancements.js?v=hs2026_5"></script>
  <script src="/assets/location-form.js?v=loc1"></script>
</body>
</html>
`;
}

const sectionHeader = (eyebrow, title, sub) => `
      <div class="section-header">
        <div class="hs-eyebrow"><span class="dot"></span>${esc(eyebrow)}</div>
        <h2 class="section-title">${esc(title)}</h2>
        ${sub ? `<p class="section-sub">${esc(sub)}</p>` : ''}
      </div>`;

const breadcrumbs = (trail) => `
        <nav class="loc-breadcrumbs" aria-label="Breadcrumb">
          ${trail.map(([label, href], i) => (i === trail.length - 1
            ? `<span aria-current="page">${esc(label)}</span>`
            : `<a href="${href}">${esc(label)}</a><span aria-hidden="true">/</span>`)).join('\n          ')}
        </nav>`;

const proofStrip = () => `
        <div class="loc-proof" aria-label="Track record">
          <div><strong>8+</strong><span>years in product management</span></div>
          <div><strong>14+</strong><span>production platforms shipped</span></div>
          <div><strong>100%</strong><span>in-house engineering squad</span></div>
          <div><strong>100%</strong><span>code and IP ownership</span></div>
        </div>`;

function leadForm({ city, svc, heading, sub }) {
  const budgets = (svc ? svc.budgets : ['Under ₹5L', '₹5L – ₹12L', '₹12L – ₹25L', 'Above ₹25L', 'Still evaluating']);
  return `
        <div class="loc-form-card" id="contact">
          <h2>${esc(heading)}</h2>
          <p>${esc(sub)}</p>
          <form class="loc-form" data-loc-form novalidate>
            <input type="hidden" name="service" value="${esc(svc ? svc.formType : 'General')}">
            <input type="hidden" name="city" value="${esc(city ? city.name : '')}">
            <div class="loc-hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
            <div class="form-row">
              <div class="form-group"><label for="lf-name">Name *</label><input class="form-input" id="lf-name" name="name" type="text" autocomplete="name" required></div>
              <div class="form-group"><label for="lf-phone">Phone</label><input class="form-input" id="lf-phone" name="phone" type="tel" autocomplete="tel"></div>
            </div>
            <div class="form-group"><label for="lf-email">Work email *</label><input class="form-input" id="lf-email" name="email" type="email" autocomplete="email" required></div>
            <div class="form-group"><label for="lf-budget">Budget range</label>
              <select class="form-select" id="lf-budget" name="budget">
                <option value="">Select a range</option>
                ${budgets.map((b) => `<option>${esc(b)}</option>`).join('\n                ')}
              </select>
            </div>
            <div class="form-group"><label for="lf-message">What are you building?</label><textarea class="form-textarea" id="lf-message" name="message" placeholder="Two or three lines on the problem, users and timeline."></textarea></div>
            <button type="submit" class="cl-button -primary">Get a free estimate <span>→</span></button>
            <p class="loc-form-note">Your idea is protected by an NDA. We reply within one working day.</p>
            <div class="loc-form-status" role="status" aria-live="polite"></div>
          </form>
        </div>`;
}

const inlineCta = (title, sub) => `
    <section class="loc-section" style="padding:56px 0;">
      <div class="wrap">
        <div class="loc-card" style="flex-direction:row; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; padding:28px 32px;">
          <div><h3 style="font-size:20px; margin-bottom:6px;">${esc(title)}</h3><p>${esc(sub)}</p></div>
          <a href="https://calendly.com/creuto/meet" data-calendly="true" class="cl-button -primary btn-book-call">Book a free call <span>→</span></a>
        </div>
      </div>
    </section>`;

const ctaBand = (title, sub) => `
    <section class="loc-cta" id="book">
      <div class="wrap">
        <h2>${esc(title)}</h2>
        <p>${esc(sub)}</p>
        <div class="hero-ctas">
          <a href="https://calendly.com/creuto/meet" data-calendly="true" class="cl-button -primary btn-book-call">Book a Discovery Call <span>→</span></a>
          <a href="mailto:me@niharrout.com" class="cl-button -secondary">Email me@niharrout.com</a>
        </div>
      </div>
    </section>`;

function faqSection(faqs, { heading, sub }) {
  return `
    <section class="faq-section loc-section" id="faq">
      <div class="wrap">
        ${sectionHeader('Frequently asked questions', heading, sub)}
        <div class="faq-list-minimal loc-faq">
          ${faqs.map(([q, a], i) => `<div class="faq-item-minimal${i === 0 ? ' open' : ''}">
            <button class="faq-question-btn" aria-expanded="${i === 0}"><span>${esc(q)}</span><span class="faq-toggle-sign">+</span></button>
            <div class="faq-answer-pane">${esc(a)}</div>
          </div>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

const faqSchema = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
});

const breadcrumbSchema = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + href }))
});

const organizationSchema = () => ({
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Creuto',
  url: 'https://creuto.com',
  email: 'me@niharrout.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Bhubaneswar', addressRegion: 'Odisha', addressCountry: 'IN' },
  founder: { '@type': 'Person', name: 'Nihar Ranjan Rout', jobTitle: 'Founder & CEO', url: SITE }
});

const areaServed = (c) => ({
  '@type': c.slug === 'delhi-ncr' ? 'AdministrativeArea' : 'City',
  name: c.name,
  containedInPlace: { '@type': 'AdministrativeArea', name: c.state }
});

/* ---------- Section builders (service pages) ---------- */

function servicesSection(c, svc) {
  return `
    <section class="loc-section" id="services">
      <div class="wrap">
        ${sectionHeader('What we build', fill(svc.servicesHeading, c), svc.servicesSub)}
        <div class="loc-grid c4">
          ${svc.services.map(([t, d]) => `<div class="loc-card"><h3>${esc(t)}</h3><p>${esc(fill(d, c))}</p></div>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

function localSection(c, svc, cs) {
  return `
    <section class="loc-section -alt" id="local">
      <div class="wrap">
        <div class="loc-local">
          <div>
            <div class="hs-eyebrow"><span class="dot"></span>${esc(c.eyebrow)}</div>
            <h2>Why ${esc(c.name)} businesses choose Creuto for ${esc(svc.nameLc)}</h2>
            <p>${esc(c.overview)}</p>
            <p>${esc(cs.angle)}</p>
            <div class="loc-subhead">Business districts and hubs in ${esc(c.name)}</div>
            <ul class="loc-chips">${c.areas.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
          </div>
          <aside class="loc-facts">
            <h3>How we work with ${esc(c.name)} teams</h3>
            <dl>
              <dt>Distance and logistics</dt><dd>${esc(c.distance)}</dd>
              <dt>Delivery model</dt><dd>${esc(c.delivery)}</dd>
              <dt>Commercials</dt><dd>${esc(c.costNote)}</dd>
              <dt>Local ecosystem</dt><dd>${esc(c.ecosystem.join(' · '))}</dd>
            </dl>
          </aside>
        </div>
      </div>
    </section>`;
}

function scenarioSection(c, svcKey) {
  const [title, body] = scenarios[c.slug][svcKey];
  return `
    <section class="loc-section" id="scenario">
      <div class="wrap">
        <div class="loc-scenario">
          <div class="hs-eyebrow"><span class="dot"></span>Illustrative scenario</div>
          <h2>${esc(title)}</h2>
          <p>${esc(body)}</p>
          <p class="loc-scenario-note">An example of how we would scope a typical ${esc(c.name)} engagement. It is not a client case study.</p>
        </div>
      </div>
    </section>`;
}

function portfolioSection(c, svc) {
  const start = cities.indexOf(c) % svc.cases.length;
  const chosen = [0, 1].map((i) => svc.cases[(start + i) % svc.cases.length]);
  const cards = chosen.map((slug) => portfolio[slug]).filter(Boolean).map((p) => `
          <a class="loc-card loc-case" href="${esc(p.link)}">
            <img src="/${esc(p.thumbnail)}" alt="${esc(p.title)}" loading="lazy" width="640" height="400">
            <div class="loc-case-body">
              <div class="loc-case-tag">${esc(p.industry)}</div>
              <h3>${esc(p.title)}</h3>
              <div class="loc-case-result">${esc(p.result)}</div>
              <div class="loc-more">Read the case study →</div>
            </div>
          </a>`).join('');
  return `
    <section class="loc-section" id="work">
      <div class="wrap">
        ${sectionHeader('Selected work', `Platforms we have shipped, relevant to ${c.name}`, 'Real products with real users. These are the systems behind the approach described on this page.')}
        <div class="loc-grid c2">${cards}
        </div>
      </div>
    </section>`;
}

const TESTIMONIALS = [
  ['Before Creuto, every department was running on its own disconnected spreadsheet. Nihar locked down our operational requirements in the PRD, and his team delivered a unified system that gave our management team real-time visibility for the first time.', 'Operations Director', 'Large-Scale Manufacturing Enterprise'],
  ['Nihar is that rare breed of product leader who understands business levers just as well as software architecture. He stopped us from wasting budget on features our customers didn\'t want and delivered our marketplace ahead of our launch schedule.', 'Co-Founder', 'Skyeone Event Booking Marketplace'],
  ['Finding an engineering team that doesn\'t disappear or cut corners is rare. Creuto\'s in-house squad was disciplined, delivered bi-weekly demos like clockwork, and launched our mobile apps cleanly to the App Store and Google Play.', 'Founder & CEO', 'Make My Look Beauty Platform']
];

function testimonialsSection(c, svcKey) {
  const [quote, role, org] = TESTIMONIALS[(cities.indexOf(c) + SERVICE_KEYS.indexOf(svcKey)) % TESTIMONIALS.length];
  return `
    <section class="loc-section -alt" id="testimonials">
      <div class="wrap">
        <figure class="loc-quote">
          <div class="testimonial-stars">★★★★★</div>
          <blockquote>“${esc(quote)}”</blockquote>
          <figcaption><strong>${esc(role)}</strong>, ${esc(org)} · <a href="/#testimonials">More client feedback</a></figcaption>
        </figure>
      </div>
    </section>`;
}

function industriesSection(c, svc, cs) {
  return `
    <section class="loc-section" id="industries">
      <div class="wrap">
        ${sectionHeader('Industries', `${svc.label[0].toUpperCase() + svc.label.slice(1)} solutions for ${c.name}’s leading industries`, `Where ${svc.nameLc} pays back fastest for ${c.name} organisations.`)}
        <div class="loc-grid c4">
          ${c.sectors.map(([t, d]) => `<div class="loc-card"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('\n          ')}
        </div>
        <div class="loc-subhead" style="margin-top:44px;">What we would build first in ${esc(c.name)}</div>
        <div class="loc-grid c3">
          ${cs.cases.map(([t, d], i) => `<div class="loc-card"><span class="loc-num">0${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('\n          ')}
        </div>
        <div class="loc-subhead" style="margin-top:44px;">Other industries we serve</div>
        <ul class="loc-chips -soft">${svc.industries.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>
    </section>`;
}

function complianceSection(c, svc) {
  return `
    <section class="loc-section -alt" id="compliance">
      <div class="wrap">
        ${sectionHeader('Security & compliance', svc.complianceHeading, `Standards and regulations we design for when delivering to ${c.name} organisations.`)}
        <div class="loc-list c2">
          ${svc.compliance.map(([t, d]) => `<div class="loc-row"><span class="loc-tick">✓</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

function stackSection(c, svc) {
  return `
    <section class="loc-section -alt" id="stack">
      <div class="wrap">
        ${sectionHeader('Tech stack', `Technology behind our ${svc.label} work`, 'We choose tools for your latency, security and scale needs, not for fashion.')}
        <div class="loc-stack">
          ${svc.stack.map(([t, d]) => `<div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

function processSection(c, svc) {
  return `
    <section class="loc-section" id="process">
      <div class="wrap">
        ${sectionHeader('How we work', `Our ${svc.process.length}-step process for ${c.name} clients`, 'Transparent milestones from the first workshop to launch and beyond.')}
        <div class="loc-steps">
          ${svc.process.map(([t, d]) => `<div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('\n          ')}
        </div>
      </div>
    </section>`;
}

function pricingSection(c, svc) {
  return `
    <section class="loc-section -alt" id="pricing">
      <div class="wrap">
        ${sectionHeader('Pricing', `${svc.name} cost in ${c.name}`, 'Indicative ranges based on projects we have delivered. Your fixed-scope quote follows a discovery workshop.')}
        <div class="loc-grid c3">
          ${svc.tiers.map(([tier, inr, usd, time, desc]) => `<div class="loc-card loc-tier">
            <h3>${esc(tier)}</h3>
            <div class="loc-price">${esc(inr)}</div>
            <div class="loc-usd">${esc(usd)}</div>
            <span class="loc-time">${esc(time)}</span>
            <p>${esc(desc)}</p>
          </div>`).join('\n          ')}
        </div>
        <p class="loc-note">${esc(c.costNote)} <a href="/project-costs" style="color:var(--hs-brand); font-weight:600;">See detailed cost breakdowns →</a></p>
      </div>
    </section>`;
}

function relatedSection(c, svcKey) {
  const svc = services[svcKey];
  const others = SERVICE_KEYS.filter((k) => k !== svcKey);
  const sameServiceOtherCities = cities.filter((x) => x.slug !== c.slug);
  return `
    <section class="loc-section" id="related">
      <div class="wrap">
        <div class="loc-related">
          <div>
            <h3>More services in ${esc(c.name)}</h3>
            <ul class="loc-links">
              ${others.map((k) => `<li><a href="${pageUrl(c, k)}">${esc(services[k].name)} in ${esc(c.name)}</a></li>`).join('\n              ')}
              <li><a href="${cityUrl(c)}">All services in ${esc(c.name)}</a></li>
            </ul>
          </div>
          <div>
            <h3>${esc(svc.name)} in other cities</h3>
            <ul class="loc-links">
              ${sameServiceOtherCities.map((x) => `<li><a href="${pageUrl(x, svcKey)}">${esc(svc.name)} in ${esc(x.name)}</a></li>`).join('\n              ')}
              <li><a href="${svc.bhubaneswarPage}">${esc(svc.name)} in Bhubaneswar</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>`;
}

/* ---------- Page: city x service ---------- */

function buildServicePage(c, svcKey) {
  const svc = services[svcKey];
  const cs = c.services[svcKey];
  const urlPath = pageUrl(c, svcKey);
  const fullUrl = SITE + urlPath;
  const trail = [['Home', '/'], ['Locations', '/locations/'], [c.name, cityUrl(c)], [svc.name, urlPath]];
  const startPrice = svc.tiers[0][1].split(' – ')[0];
  const title = `${fill(svc.titleLead, c)} | Creuto`;
  const description = `${svc.name} for ${c.name} businesses: fixed-scope PRD, in-house engineers, full code ownership. Estimates from ${startPrice}. Free call with the founder.`;

  const faqs = [
    [fill(svc.faqs[0][0], c), `${fill(svc.faqs[0][1], c)} ${c.costNote}`],
    [fill(svc.faqs[1][0], c), fill(svc.faqs[1][1], c)],
    ...cs.faqs,
    [`Do you have an office in ${c.name}?`, `No. Creuto is based in Bhubaneswar, Odisha, and serves ${c.name} clients remotely. ${c.distance}. Travel for workshops and launches is planned around milestones and quoted separately up front.`],
    [fill(svc.faqs[3][0], c), fill(svc.faqs[3][1], c)]
  ];

  const graph = [
    organizationSchema(),
    {
      '@type': 'Service',
      '@id': `${fullUrl}#service`,
      name: `${svc.name} in ${c.name}`,
      serviceType: svc.name,
      description,
      url: fullUrl,
      provider: { '@id': `${SITE}/#organization` },
      areaServed: areaServed(c),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${svc.name} services`,
        itemListElement: svc.services.map(([t]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: t } }))
      }
    },
    breadcrumbSchema(trail),
    faqSchema(faqs)
  ];

  const body = `${header()}
  <main id="top">
    <section class="loc-hero">
      <div class="wrap">
        <div class="loc-hero-grid">
          <div>
            ${breadcrumbs(trail)}
            <div class="hs-eyebrow"><span class="dot"></span>${esc(c.eyebrow)}</div>
            <h1>${esc(fill(svc.h1, c))}</h1>
            <p class="hero-sub">${esc(fill(svc.heroSub, c))}</p>
            <div class="hero-ctas">
              <a href="https://calendly.com/creuto/meet" data-calendly="true" class="cl-button -primary btn-book-call">Book a Free Call <span>→</span></a>
              <a href="#pricing" class="cl-button -secondary">See pricing ↓</a>
            </div>
            ${proofStrip()}
          </div>
          ${leadForm({ city: c, svc, heading: 'Get a free estimate', sub: `Share your requirements and get a scoped estimate. Serving ${c.name} from Bhubaneswar.` })}
        </div>
      </div>
    </section>
${servicesSection(c, svc)}
${localSection(c, svc, cs)}
${scenarioSection(c, svcKey)}
${portfolioSection(c, svc)}
${inlineCta(`Planning ${svc.nameLc} in ${c.name}?`, 'Get a scoped estimate and a candid view on what to build first.')}
${testimonialsSection(c, svcKey)}
${industriesSection(c, svc, cs)}
${complianceSection(c, svc)}
${stackSection(c, svc)}
${processSection(c, svc)}
${pricingSection(c, svc)}
${faqSection(faqs, { heading: `${svc.name} in ${c.name}: common questions`, sub: 'Costs, timelines, ownership and how we work with teams in ' + c.name + '.' })}
${relatedSection(c, svcKey)}
${ctaBand(`Ready to start ${svc.nameLc} in ${c.name}?`, 'Book a discovery call with Nihar. We will scope features, timeline and budget before you commit to anything.')}
  </main>
`;
  return head({ title, description, path: urlPath, graph }) + body + footer(c);
}

/* ---------- Page: city hub ---------- */

function buildCityHub(c) {
  const urlPath = cityUrl(c);
  const fullUrl = SITE + urlPath;
  const trail = [['Home', '/'], ['Locations', '/locations/'], [c.name, urlPath]];
  const title = `Software, App & AI Development in ${c.name} | Creuto`;
  const description = `Mobile app, AI product and custom software development for ${c.name} businesses. Founder-led Creuto team, fixed-scope PRDs, full code ownership. Free discovery call.`;

  const faqs = [
    [`Do you have an office in ${c.name}?`, `No. Creuto is based in Bhubaneswar, Odisha, and serves ${c.name} clients remotely with fortnightly demos and shared test environments. We travel to ${c.name} for workshops and launches when in-person time is valuable, and quote any travel costs separately and up front.`],
    ...SERVICE_KEYS.map((k) => [fill(services[k].faqs[0][0], c), fill(services[k].faqs[0][1], c)]),
    c.services.mobile.faqs[0],
    c.services.ai.faqs[0]
  ];

  const graph = [
    organizationSchema(),
    {
      '@type': 'CollectionPage',
      '@id': `${fullUrl}#page`,
      name: `Software, app and AI development in ${c.name}`,
      url: fullUrl,
      description,
      about: areaServed(c),
      publisher: { '@id': `${SITE}/#organization` },
      hasPart: SERVICE_KEYS.map((k) => ({ '@type': 'WebPage', name: `${services[k].name} in ${c.name}`, url: SITE + pageUrl(c, k) }))
    },
    breadcrumbSchema(trail),
    faqSchema(faqs)
  ];

  const serviceCards = SERVICE_KEYS.map((k) => `
          <a class="loc-card" href="${pageUrl(c, k)}">
            <h3>${esc(services[k].name)} in ${esc(c.name)}</h3>
            <p>${esc(c.services[k].angle)}</p>
            <div class="loc-more">See scope, pricing and FAQs →</div>
          </a>`).join('');

  const otherCities = cities.filter((x) => x.slug !== c.slug);

  const body = `${header()}
  <main id="top">
    <section class="loc-hero">
      <div class="wrap">
        <div class="loc-hero-grid">
          <div>
            ${breadcrumbs(trail)}
            <div class="hs-eyebrow"><span class="dot"></span>${esc(c.eyebrow)}</div>
            <h1>Software, Mobile App &amp; AI Development in ${esc(c.name)}</h1>
            <p class="hero-sub">${esc(c.overview)}</p>
            <div class="hero-ctas">
              <a href="https://calendly.com/creuto/meet" data-calendly="true" class="cl-button -primary btn-book-call">Book a Free Call <span>→</span></a>
              <a href="#services" class="cl-button -secondary">Explore services ↓</a>
            </div>
            ${proofStrip()}
          </div>
          ${leadForm({ city: c, svc: null, heading: 'Talk to the team', sub: `Tell us what you are building in ${c.name}. Serving ${c.name} from Bhubaneswar.` })}
        </div>
      </div>
    </section>

    <section class="loc-section" id="services">
      <div class="wrap">
        ${sectionHeader('Services', `What we build for ${c.name} organisations`, 'Choose a service for scope, pricing, use cases and FAQs specific to ' + c.name + '.')}
        <div class="loc-grid c3">${serviceCards}
        </div>
      </div>
    </section>

    <section class="loc-section -alt" id="local">
      <div class="wrap">
        <div class="loc-local">
          <div>
            <h2>The ${esc(c.name)} market we build for</h2>
            <p>${esc(c.overview)}</p>
            <div class="loc-subhead">Key sectors</div>
            <div class="loc-grid c2">
              ${c.sectors.map(([t, d]) => `<div class="loc-card"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('\n              ')}
            </div>
            <div class="loc-subhead">Business districts and hubs</div>
            <ul class="loc-chips">${c.areas.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
          </div>
          <aside class="loc-facts">
            <h3>How we work with ${esc(c.name)} teams</h3>
            <dl>
              <dt>Distance and logistics</dt><dd>${esc(c.distance)}</dd>
              <dt>Delivery model</dt><dd>${esc(c.delivery)}</dd>
              <dt>Commercials</dt><dd>${esc(c.costNote)}</dd>
              <dt>Local ecosystem</dt><dd>${esc(c.ecosystem.join(' · '))}</dd>
            </dl>
          </aside>
        </div>
      </div>
    </section>
${faqSection(faqs, { heading: `${c.name}: common questions`, sub: `How we work with ${c.name} teams, what it costs and how long it takes.` })}
    <section class="loc-section -alt" id="related">
      <div class="wrap">
        <div class="loc-related">
          <div>
            <h3>Services in ${esc(c.name)}</h3>
            <ul class="loc-links">${SERVICE_KEYS.map((k) => `<li><a href="${pageUrl(c, k)}">${esc(services[k].name)} in ${esc(c.name)}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h3>Other locations</h3>
            <ul class="loc-links">
              ${otherCities.map((x) => `<li><a href="${cityUrl(x)}">${esc(x.name)}</a></li>`).join('\n              ')}
              <li><a href="/locations/">All locations</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
${ctaBand(`Building something in ${c.name}?`, 'Book a discovery call with Nihar. We will scope features, timeline and budget before you commit to anything.')}
  </main>
`;
  return head({ title, description, path: urlPath, graph }) + body + footer(c);
}

/* ---------- Page: locations index ---------- */

function buildIndex() {
  const urlPath = '/locations/';
  const trail = [['Home', '/'], ['Locations', urlPath]];
  const title = 'Software, App & AI Development Across India | Creuto';
  const description = 'Creuto builds mobile apps, AI products and custom software for businesses across Odisha and India’s metros. Founder-led, fixed-scope, remote-first from Bhubaneswar.';
  const graph = [
    organizationSchema(),
    {
      '@type': 'CollectionPage',
      '@id': `${SITE}${urlPath}#page`,
      name: 'Service locations',
      url: SITE + urlPath,
      description,
      publisher: { '@id': `${SITE}/#organization` },
      hasPart: cities.map((c) => ({ '@type': 'WebPage', name: `Software, app and AI development in ${c.name}`, url: SITE + cityUrl(c) }))
    },
    breadcrumbSchema(trail)
  ];

  const cityCard = (c) => `
          <div class="loc-card loc-citycard">
            <h3><a href="${cityUrl(c)}" style="color:inherit; text-decoration:none;">${esc(c.name)}</a></h3>
            <div class="loc-region">${esc(c.state)} · ${esc(c.distance)}</div>
            <p>${esc(c.overview.split('. ')[0])}.</p>
            <ul class="loc-links">${SERVICE_KEYS.map((k) => `<li><a href="${pageUrl(c, k)}">${esc(services[k].name)}</a></li>`).join('')}</ul>
          </div>`;
  const group = (region) => cities.filter((c) => c.region === region).map(cityCard).join('');

  const body = `${header()}
  <main id="top">
    <section class="loc-hero">
      <div class="wrap">
        <div style="max-width:820px;">
          ${breadcrumbs(trail)}
          <div class="hs-eyebrow"><span class="dot"></span>Bhubaneswar-based · Serving India</div>
          <h1>Software, Mobile App &amp; AI Development Across India</h1>
          <p class="hero-sub">Creuto is a founder-led product and engineering team based in Bhubaneswar. We build mobile apps, AI products and custom software for businesses across Odisha and India’s major metros, working remotely in your time zone and visiting for the moments that matter.</p>
          <div class="hero-ctas">
            <a href="https://calendly.com/creuto/meet" data-calendly="true" class="cl-button -primary btn-book-call">Book a Free Call <span>→</span></a>
            <a href="#odisha" class="cl-button -secondary">Browse locations ↓</a>
          </div>
        </div>
        ${proofStrip()}
      </div>
    </section>

    <section class="loc-section" id="bhubaneswar">
      <div class="wrap">
        ${sectionHeader('Home base', 'Bhubaneswar, Odisha', 'Where our team works. Meet us in person at Infocity, Patia or across the city.')}
        <div class="loc-grid c3">
          ${SERVICE_KEYS.map((k) => `<a class="loc-card" href="${services[k].bhubaneswarPage}"><h3>${esc(services[k].name)} in Bhubaneswar</h3><p>${esc(services[k].servicesSub)}</p><div class="loc-more">View the Bhubaneswar page →</div></a>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="loc-section -alt" id="odisha">
      <div class="wrap">
        ${sectionHeader('Odisha', 'Cities across Odisha', 'Closest to our Bhubaneswar base, with in-person workshops planned around your project milestones.')}
        <div class="loc-grid c2">${group('odisha')}
        </div>
      </div>
    </section>

    <section class="loc-section" id="metros">
      <div class="wrap">
        ${sectionHeader('Metros', 'India’s metro markets', 'Same time zone, remote-first delivery, and visits by arrangement for kick-offs and key workshops.')}
        <div class="loc-grid c2">${group('metro')}
        </div>
      </div>
    </section>

    <section class="loc-section -alt" id="how">
      <div class="wrap">
        ${sectionHeader('How we serve you', 'One process, wherever you are', 'The same discovery-led method applies in every city.')}
        <div class="loc-grid c3">
          <div class="loc-card"><span class="loc-num">01</span><h3>Discovery workshop</h3><p>We map goals, users and constraints, in person where practical, and produce a signed-off PRD.</p></div>
          <div class="loc-card"><span class="loc-num">02</span><h3>Fortnightly demos</h3><p>Working builds every two weeks, shared boards and a single point of contact who is the founder.</p></div>
          <div class="loc-card"><span class="loc-num">03</span><h3>Launch and support</h3><p>Store or production launch, on-site training if needed, then a maintenance plan you can keep or end.</p></div>
        </div>
      </div>
    </section>
${ctaBand('Not sure which page fits?', 'Tell us what you are building and where your team is. We will point you to the right scope and price range.')}
  </main>
`;
  return head({ title, description, path: urlPath, graph }) + body + footer(null);
}

/* ---------- Output ---------- */

function write(relPath, html) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
}

function updateSitemap(urls) {
  const file = path.join(ROOT, 'sitemap.xml');
  let xml = fs.readFileSync(file, 'utf8');
  xml = xml.replace(/\s*<!-- locations:start -->[\s\S]*?<!-- locations:end -->/, '');
  const entries = urls.map(({ loc, priority, changefreq }) => `  <url>
    <loc>${SITE}${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n');
  xml = xml.replace('</urlset>', `  <!-- locations:start -->\n${entries}\n  <!-- locations:end -->\n</urlset>`);
  fs.writeFileSync(file, xml);
}

function main() {
  const urls = [];
  write('locations/index.html', buildIndex());
  urls.push({ loc: '/locations/', priority: '0.8', changefreq: 'monthly' });

  for (const c of cities) {
    write(`locations/${c.slug}/index.html`, buildCityHub(c));
    urls.push({ loc: cityUrl(c), priority: '0.7', changefreq: 'monthly' });
    for (const key of SERVICE_KEYS) {
      write(`locations/${c.slug}/${services[key].slug}/index.html`, buildServicePage(c, key));
      urls.push({ loc: pageUrl(c, key), priority: '0.8', changefreq: 'monthly' });
    }
  }

  updateSitemap(urls);
  console.log(`Built ${urls.length} pages and updated sitemap.xml.`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    warnings.forEach((w) => console.warn(' - ' + w));
  }
}

main();
