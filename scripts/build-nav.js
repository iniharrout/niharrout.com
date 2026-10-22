#!/usr/bin/env node
/**
 * Builds the site navigation from the service and industry data (scripts/site-data/):
 *   - the primary menu in partials/header.html: AI, Services mega menu, Industries mega menu, Work, Resources, About, Work with me
 *   - the whole footer in partials/footer.html (call band, brand column, link columns, legal bar)
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
// Mega menus in the style the founder chose (Razorpay-like): grouped columns, and every item has a
// solid round icon, a title and a one-line description. Service items that live in two families
// point at one page.
const { glyph } = require('./site-data/glyphs');
const { flag } = require('./site-data/flags');
const { HOME, countries } = require('./site-data/countries');
const FAMILY_GLYPH = { custom: 'code', mobile: 'phone', web: 'browser', devops: 'cloud', ai: 'spark', startup: 'rocket' };
const SUB_GLYPH = {
  'custom-erp-development': 'grid', 'crm-development': 'users', 'enterprise-application-development': 'building', 'software-consulting': 'chat',
  'legacy-application-modernization': 'refresh', 'ecommerce-solutions': 'cart',
  'android-app-development': 'bot', 'ios-app-development': 'phone', 'react-native-app-development': 'layers', 'flutter-app-development': 'layers',
  'mobile-app-qa-testing': 'check', 'mobile-app-modernization': 'refresh',
  'customized-web-development': 'browser', 'enterprise-web-development': 'building', 'cross-platform-development': 'devices', 'pwa-development': 'download',
  'on-site-seo-development': 'search', 'cms-development': 'pen',
  'cloud-consulting': 'server', 'ci-cd-implementation': 'pipeline', 'kubernetes-implementation': 'box', 'serverless-architecture': 'bolt',
  'cloud-cost-optimisation': 'coin', 'infrastructure-monitoring': 'pulse',
  'ai-development': 'spark', 'ai-consulting': 'chat', 'ai-powered-mobile-app-development': 'phone', 'machine-learning-analytics': 'chart',
  'generative-ai': 'wand', 'chatgpt-solutions': 'chat',
  'mvp-development': 'rocket', 'rapid-prototyping': 'frame', 'technical-architecture': 'branch', 'investor-ready-demos': 'present', 'post-launch-iteration': 'trend',
};
const IND_GLYPH = {
  healthcare: 'heart', fintech: 'wallet', ecommerce: 'cart', logistics: 'truck', education: 'cap', 'real-estate': 'home',
  'travel-hospitality': 'luggage', restaurant: 'fork', 'on-demand': 'pin', automotive: 'car', 'electric-vehicles': 'battery', energy: 'sun',
  manufacturing: 'factory', construction: 'hammer', agriculture: 'leaf', aviation: 'plane', telecom: 'antenna', 'media-entertainment': 'play',
  'gaming-sports': 'gamepad', 'social-networking': 'share', 'fitness-wellness': 'dumbbell', events: 'ticket', government: 'landmark', saas: 'cloud',
};
const BOOK = 'https://calendly.com/creuto/meet';

// One menu entry: icon, title, one-line description.
const entry = (cls, href, icon, title, text) => `<a class="${cls}" href="${href}">${glyph(icon)}<span class="sc-entry-t"><strong>${title}</strong><span>${text}</span></span></a>`;
// The strip along the bottom of every mega menu.
const strip = (text) => `
            <div class="sc-mega-strip"><span>${text}</span><a href="${BOOK}" target="_blank" rel="noopener" data-book="true">Book a free 30-minute call <span aria-hidden="true">&rarr;</span></a></div>`;

function subOf(fam, item) {
  if (typeof item === 'object') return { key: null, name: item.name, href: item.href, short: item.short || '' };
  return { key: item, name: subs[item].name, href: `${fam.path}/${item}`, short: subs[item].short };
}

function servicesMega() {
  const rail = families.map((f, i) => `
              <a class="sc-fam${i === 0 ? ' is-active' : ''}" href="${f.path}" data-fam="${f.key}">${glyph(FAMILY_GLYPH[f.key])}<span class="sc-fam-t">${esc(f.name)}</span></a>`).join('');
  const panels = families.map((f, i) => {
    const rows = f.items.map((it) => subOf(f, it)).map((it) => `
                <li>${entry('sc-sub', it.href, (it.key && SUB_GLYPH[it.key]) || FAMILY_GLYPH[f.key], esc(it.name), esc(it.short || f.menu))}</li>`).join('');
    return `
            <div class="sc-mega-panel${i === 0 ? ' is-active' : ''}" data-fam="${f.key}">
              <div class="sc-mega-top"><div><p class="sc-mega-eyebrow">${esc(f.name)}</p><p class="sc-mega-desc">${esc(f.menu)}</p></div><a class="sc-mega-over" href="${f.path}">Explore all <span aria-hidden="true">&rarr;</span></a></div>
              <ul class="sc-mega-list">${rows}
              </ul>
            </div>`;
  }).join('');
  return `        <li class="sc-item sc-has-menu sc-mega-item">
          <a class="sc-link" href="/services">Services</a>
          <button class="sc-toggle" type="button" aria-expanded="false" aria-label="Show services menu">${CHEVRON}</button>
          <div class="sc-menu sc-mega sc-mega-services">
            <div class="sc-mega-rail">
              <p class="sc-mega-h">What we build</p>${rail}
              <a class="sc-mega-all" href="/services">All ${Object.keys(subs).length} services <span aria-hidden="true">&rarr;</span></a>
            </div>
            <div class="sc-mega-body">${panels}
            </div>${strip('Not sure which service fits? Talk it through with Nihar.')}
            <a class="sc-menu-all sc-m-only" href="/services">All services &rarr;</a>
          </div>
        </li>`;
}

function industriesMega() {
  const bySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
  const cols = groups.map(([title, slugs]) => `
              <div class="sc-ind-group">
                <p class="sc-ind-h">${esc(title)}</p>
                <ul>${slugs.map((slug) => `
                  <li>${entry('sc-ind', `/industries/${slug}`, IND_GLYPH[slug] || 'building', esc(bySlug[slug].name), esc(bySlug[slug].short))}</li>`).join('')}
                </ul>
              </div>`).join('');
  return `        <li class="sc-item sc-has-menu sc-mega-item">
          <a class="sc-link" href="/industries">Industries</a>
          <button class="sc-toggle" type="button" aria-expanded="false" aria-label="Show industries menu">${CHEVRON}</button>
          <div class="sc-menu sc-mega sc-mega-industries">
            <div class="sc-mega-body sc-mega-wide">
              <div class="sc-ind-cols">${cols}
              </div>
            </div>${strip(`Software built around how your sector works. <a class="sc-strip-link" href="/industries">See all ${industries.length} industries</a>`)}
            <a class="sc-menu-all sc-m-only" href="/industries">All industries &rarr;</a>
          </div>
        </li>`;
}

const resources = `        <li class="sc-item sc-has-menu">
          <a class="sc-link" href="/blog">Resources</a>
          <button class="sc-toggle" type="button" aria-expanded="false" aria-label="Show resources menu">${CHEVRON}</button>
          <div class="sc-menu sc-list sc-list-wide">
            <div class="sc-list-cols">
              <div>
                <p class="sc-list-h">Company</p>
                ${entry('', '/about', 'user', 'About Nihar &amp; Creuto', 'The founder and the company behind the work')}
                ${entry('', '/work', 'folder', 'Case studies', 'Products we have built and shipped')}
                ${entry('', '/work-with-me', 'briefcase', 'Careers', 'Four full-time remote roles in India')}
                ${entry('', '/about/facts', 'file', 'Company fact sheet', 'Services, process and ownership in one page')}
              </div>
              <div>
                <p class="sc-list-h">Learn</p>
                ${entry('', '/blog', 'book', 'Blog &amp; Guides', 'Practical guides on MVPs, ERP, mobile and AI')}
                ${entry('', '/project-costs', 'coin', 'Project Costs Guide', 'What production software typically costs')}
                ${entry('', '/tools/app-cost-calculator', 'calculator', 'App Cost Calculator', 'Realistic build budgets and timelines')}
                ${entry('', '/technology', 'cpu', 'Technology Stack', 'The tools we build with')}
              </div>
            </div>${strip('Free tools for founders: cost calculator, name generator and more. <a class="sc-strip-link" href="/tools">Open the tools</a>')}
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
// Written whole from here (partials/footer.html is generated): a call band, a brand column with trust
// badges, contact and social links, then grouped link columns and a legal bar.
const SOCIAL = [
  ['LinkedIn', 'https://www.linkedin.com/in/iniharrout', '<path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-8M10.5 13a3 3 0 0 1 6 0v4.5"/><rect x="3" y="3" width="18" height="18" rx="3"/>'],
  ['X', 'https://x.com/iniharrout', '<path d="M4.5 4.5 19.5 19.5M19.5 4.5l-15 15"/>'],
  ['GitHub', 'https://github.com/iniharrout', '<path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.7 4.7 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.5 11.5 0 0 0-6 0C6.5 2.6 5.5 2.9 5.5 2.9a4.3 4.3 0 0 0-.1 3.2A4.7 4.7 0 0 0 4.1 9.3c0 4.6 2.8 5.6 5.5 6a3 3 0 0 0-.8 2.3V21"/>'],
  ['YouTube', 'https://www.youtube.com/@niharroutofficial', '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3Z"/>'],
  ['Medium', 'https://medium.com/@niharrout', '<ellipse cx="7.5" cy="12" rx="4.5" ry="5"/><ellipse cx="16" cy="12" rx="2" ry="4.6"/><path d="M20.5 7.5v9"/>'],
  ['Substack', 'https://substack.com/@niharrout', '<path d="M5 4.5h14M5 8.5h14M5 12.5h14v8l-7-4-7 4Z"/>'],
];
const socialRow = SOCIAL.map(([name, href, d]) => `<a class="sc-social" href="${href}" target="_blank" rel="noopener" aria-label="${name}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg></a>`).join('');

const group = (title, links) => `
          <div class="sc-foot-group">
            <h4>${title}</h4>
            <ul>${links.map(([href, label]) => `
              <li><a href="${href}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''}>${label}</a></li>`).join('')}
            </ul>
          </div>`;
const column = (...groupsHtml) => `
        <div class="sc-foot-col">${groupsHtml.join('')}
        </div>`;
const ind = (slug) => { const i = industries.find((x) => x.slug === slug); return [`/industries/${slug}`, esc(i.name)]; };
const sub = (fam, key) => [`${families.find((f) => f.key === fam).path}/${key}`, esc(subs[key].name)];

const PHONE = '+91 76088 44995';
const WA = 'https://wa.me/917608844995?text=Hi%20Nihar%2C%20I%20found%20your%20website%20and%20I%27m%20interested%20in%20discussing%20a%20project.';
const ARR = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const UP = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const footer = `<footer class="sc-footer">
  <div class="sc-wrap">
    <div class="sc-foot-cta">
      <p class="sc-foot-eyebrow">Free 30-minute strategy call</p>
      <h2>Have a product in mind? Let&rsquo;s scope it together.</h2>
      <p>Talk to the founder directly. You leave with a clear read on scope and budget, and a written proposal within 24 hours.</p>
      <div class="sc-foot-top-actions">
        <a class="sc-foot-btn is-primary" href="${BOOK}" target="_blank" rel="noopener" data-book="true"><span>Book a free strategy call</span>${ARR}</a>
        <a class="sc-foot-btn" href="${WA}" target="_blank" rel="noopener"><span>Message on WhatsApp</span></a>
      </div>
    </div>
  </div>

  <div class="sc-foot-body">
    <div class="sc-wrap">
      <div class="sc-foot-intro">
        <div class="sc-foot-brand">
          <a class="sc-brand" href="/" aria-label="Nihar Ranjan Rout, home"><span class="sc-brand-text">nihar<span class="sc-dot">.</span></span></a>
          <p>Founder and CEO of Creuto, a founder-led product and engineering company. Mobile apps, web apps, custom software and AI products, built from a clear PRD to launch, with you talking to me directly the whole way.</p>
          <div class="sc-foot-badges">
            <a class="sc-badge" href="/blog/openai-select-partner"><img src="/assets/openai-symbol.png" alt="" width="20" height="20" loading="lazy" decoding="async"><span><strong>OpenAI</strong>Select Partner</span></a>
            <a class="sc-badge" href="https://clutch.co/profile/creuto" target="_blank" rel="noopener"><span class="sc-badge-star" aria-hidden="true">&#9733;</span><span><strong>5.0 on Clutch</strong>16 verified reviews</span></a>
          </div>
          <div class="sc-foot-social">${socialRow}</div>
        </div>
        <div class="sc-foot-card">
          <p class="sc-foot-label">Not ready for a call?</p>
          <h3>Estimate your app&rsquo;s cost and timeline in two minutes.</h3>
          <p>Pick your platforms and features to see an estimated budget and timeline, then read the guides at your own pace.</p>
          <div class="sc-foot-card-row">
            <a class="sc-foot-card-btn" href="/tools/app-cost-calculator">Open the calculator ${ARR}</a>
            <a class="sc-foot-card-mail" href="/blog">Read the guides</a>
          </div>
        </div>
      </div>

      <div class="sc-foot-links">${[
    group('Services', [...families.map((f) => [f.path, esc(f.name)]), ['/services', 'All services']]),
    group('Popular services', [sub('custom', 'custom-erp-development'), sub('mobile', 'ios-app-development'), sub('mobile', 'android-app-development'), sub('mobile', 'react-native-app-development'), sub('startup', 'mvp-development'), sub('ai', 'ai-development')]),
    group('Industries', [...['healthcare', 'fintech', 'ecommerce', 'logistics', 'education', 'real-estate', 'manufacturing', 'saas'].map(ind), ['/industries', 'All industries']]),
    group('Resources', [['/blog', 'Guides for founders'], ['/project-costs', 'Project costs guide'], ['/technology', 'Technology stack'], ['/b2b-software-development-for-startups', 'B2B startup playbook'], ['/tools/app-cost-calculator', 'App cost calculator'], ['/tools/startup-name-generator', 'Startup name generator'], ['/tools/linkedin-text-formatter', 'LinkedIn text formatter']]),
    group('Company', [['/about', 'About Nihar &amp; Creuto'], ['/work', 'Case studies'], ['/work-with-me', 'Careers'], ['/about/facts', 'Company fact sheet'], ['/book', 'Book a call'], ['https://creuto.com', 'Creuto.com']]),
  ].join('')}
      </div>

      <div class="sc-foot-places">
        <div class="sc-foot-places-head">
          <div>
            <p class="sc-foot-label">Where I work</p>
            <h3>Based in India. Building with founders across time zones.</h3>
          </div>
          <a class="sc-foot-more" href="/countries">All countries ${ARR}</a>
        </div>
        <div class="sc-place-row">
${[{ ...HOME, slug: null, label: 'Bhubaneswar \u00b7 Home base' }, ...countries.map((c) => ({ ...c, href: `/countries/${c.slug}`, label: c.city }))].map((c) => `          <a class="sc-place${c.slug ? '' : ' is-home'}" href="${c.href}">
            <span class="sc-place-top">${flag(c.code, 'sc-place-flag')}<span><strong>${esc(c.short || c.name)}</strong><small>${esc(c.label)}</small></span></span>
            <span class="sc-place-foot"><span class="sc-place-time"><i aria-hidden="true"></i><span data-clock data-tz="${c.tz}">${c.slug ? '&nbsp;' : 'IST'}</span></span><span class="sc-place-diff" data-clock-diff data-tz="${c.tz}" data-short></span></span>
          </a>`).join('\n')}
        </div>
      </div>

      <div class="sc-foot-contacts">
        <div class="sc-fc">
          <span class="sc-fc-ico">${glyph('mail')}</span>
          <div><p class="sc-foot-label">Email</p><a href="mailto:me@niharrout.com">me@niharrout.com</a><span>Projects, partnerships and anything else. I reply within 24 hours.</span></div>
        </div>
        <div class="sc-fc">
          <span class="sc-fc-ico">${glyph('phone')}</span>
          <div><p class="sc-foot-label">Call or WhatsApp</p><a href="tel:+917608844995" data-reveal-phone="${PHONE}"><span data-phone-text>Call me</span></a><span>Talk to me directly, or <a class="sc-fc-inline" href="${WA}" target="_blank" rel="noopener">message on WhatsApp</a>.</span></div>
        </div>
        <div class="sc-fc">
          <span class="sc-fc-ico">${glyph('briefcase')}</span>
          <div><p class="sc-foot-label">Careers</p><a href="/work-with-me">Open roles</a><span>Remote, full-time roles across India, working with me directly.</span></div>
        </div>
      </div>

      <div class="sc-foot-bottom">
        <div>&copy; <span id="yr" data-year>2026</span> Nihar Ranjan Rout &middot; Founder &amp; CEO, Creuto. All rights reserved.</div>
        <div class="sc-foot-legal">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="#cookie-settings" data-cookie-settings>Cookie settings</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </div>
    <div class="sc-foot-mark" aria-hidden="true">nihar<span>.</span></div>
  </div>
</footer>
`;
fs.writeFileSync(path.join(ROOT, 'partials/footer.html'), footer);
console.log(`nav: header and footer built (${families.length} service families, ${industries.length} industries)`);
