/**
 * Builds one "top companies" guide module from scripts/blog/lists/lists.js and scripts/blog/lists/companies.js.
 * Each scripts/blog/top-*.js file is a one-liner: module.exports = require('./_toplist').make('<slug>');
 *
 * Safety checks that throw at build time:
 *  - every picked company must have at least one capability the list asks for (so a firm is never listed for
 *    something its own pages do not name);
 *  - every internal link in the body must point at a page that exists.
 */
const fs = require('fs');
const path = require('path');
const LISTS = require('./lists/lists');
const { CHECKED, byKey } = require('./lists/companies');

const ROOT = path.resolve(__dirname, '..', '..');
const PUBLISHED = '2026-11-23';
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CAP = {
  flutter: 'Flutter', rn: 'React Native', ios: 'iOS', android: 'Android', erp: 'ERP', crm: 'CRM', saas: 'SaaS',
  ecom: 'eCommerce', fintech: 'fintech', health: 'healthcare', edtech: 'education or e-learning', logistics: 'logistics',
  ondemand: 'on-demand or food delivery', ai: 'AI and machine learning', genai: 'generative AI', chatbot: 'chatbots',
  agents: 'AI agents', mvp: 'MVPs or startups', dedicated: 'dedicated teams', staffaug: 'staff augmentation', enterprise: 'enterprise work',
};
const list = (a) => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]);

// the lists, in groups of five, used for "more company lists" links
const GROUPS = [];
for (let i = 0; i < LISTS.length; i += 5) GROUPS.push(LISTS.slice(i, i + 5).map((l) => l.slug));

function internalLinksOk(slug, html) {
  const re = /href="(\/[^"#?]*)/g;
  let m;
  while ((m = re.exec(html))) {
    const p = m[1].replace(/\/$/, '');
    if (!p) continue;
    const ok = fs.existsSync(path.join(ROOT, p, 'index.html')) || fs.existsSync(path.join(ROOT, p + '.html')) || fs.existsSync(path.join(ROOT, p))
      || (p.startsWith('/blog/') && fs.existsSync(path.join(__dirname, p.slice(6) + '.js')))
      || (p.startsWith('/blog/') && require('./older')[p.slice(6)]);
    if (!ok) throw new Error(`${slug}: broken internal link ${m[1]}`);
  }
}

// claims are stored in the company's own register; make them read as sentences after the label
const claimText = (s) => s
  .replace(/^Says it /, 'It ').replace(/^Says /, '').replace(/^Describes itself as /, 'It is ').replace(/^Calls itself /, 'It is ')
  .replace(/^Describes its team as /, 'Its team is ').replace(/^Lists /, 'It lists ').replace(/^Shows /, 'It shows ');

function entry(c, n, need, variant) {
  const bits = {
    based: c.where && `<strong>Based:</strong> ${esc(c.where)}`,
    founded: c.founded && `<strong>Founded:</strong> ${c.founded}`,
    size: c.size && `<strong>Size:</strong> ${esc(c.size)}`,
  };
  const order = [['based', 'founded', 'size'], ['founded', 'size', 'based'], ['size', 'based', 'founded']][variant];
  const meta = order.map((k) => bits[k]).filter(Boolean);
  const matched = need ? c.caps.filter((k) => need.includes(k)) : [];
  const names = list(matched.map((k) => CAP[k]));
  const capLines = [
    [`Its own pages name ${names} among the services or industries it covers.`, `Its services or industries pages name ${names}.`, `The pages we read name ${names}.`],
    [`Listed here because its site mentions ${names}.`, `Why it is here: its own pages name ${names}.`, `Its site names ${names}.`],
    [`Relevant to this list: it names ${names}.`, `On its own pages: ${names}.`, `We found ${names} named on its site.`],
  ][variant][n % 3];
  const capLine = matched.length ? capLines : '';
  const kindLine = c.kind === 'platform' ? ' This is a product or platform you license, not a custom development shop.' : c.kind === 'large' ? ' It is a very large IT services firm.' : '';
  const about = `${esc(c.name)} is ${esc(c.about)}.${kindLine}`;
  const claimLabel = ['What it says about itself:', 'In its own words:', 'Self-reported:'][variant];
  const srcWord = ['Source:', 'Read on:', 'From:'][variant];
  const src = c.src === 'wikipedia' ? `${esc(c.name)} (Wikipedia and company site)` : `${esc(c.name)} website`;
  const paras = variant === 0 ? [`${about} ${capLine}`] : variant === 1 ? [capLine, about] : [`${about.charAt(0).toUpperCase()}${about.slice(1)}`, capLine];
  return `<h3 id="${c.key}">${n}. ${esc(c.name)}</h3>
${meta.length ? `<p>${meta.join(' &middot; ')}</p>\n` : ''}${paras.filter(Boolean).map((p) => `<p>${p}</p>`).join('\n')}
${c.claim ? `<p><strong>${claimLabel}</strong> ${esc(claimText(c.claim))}.</p>\n` : ''}${c.note ? `<p><em>${esc(c.note)}</em></p>\n` : ''}<p class="blog-source">${srcWord} <a href="${c.url}" target="_blank" rel="nofollow noopener">${src}</a>.</p>`;
}

const hash = (s) => [...s].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 7);
const ABROAD = /USA|United States|UK\b|United Kingdom|London|Dubai|UAE|Canada|Australia|Poland|Germany|Singapore|Abu Dhabi|Amsterdam|Toronto|Bellevue|Princeton|Dallas|Las Vegas|California/;
const firstNum = (s) => { const m = /([\d,]+)\s*\+?/.exec(s || ''); return m ? parseInt(m[1].replace(/,/g, ''), 10) : 0; };

// facts counted from the stated data of the companies in one list, so each list carries its own numbers
function summary(companies) {
  const out = [];
  const yr = companies.filter((c) => c.founded).sort((a, b) => a.founded - b.founded);
  if (yr.length >= 3) out.push(`${yr.length} of the ${companies.length} companies state a founding year. The earliest is ${yr[0].name} (${yr[0].founded}) and the most recent is ${yr[yr.length - 1].name} (${yr[yr.length - 1].founded}).`);
  const sz = companies.filter((c) => firstNum(c.size) >= 100).sort((a, b) => firstNum(b.size) - firstNum(a.size));
  if (sz.length >= 3) out.push(`${sz.length} give a team size of 100 or more. The largest team size stated is ${sz[0].size.replace(/ \(.*?\)/, '')}, at ${sz[0].name}. Other firms in the list give no size at all, and some count specialists rather than all staff.`);
  const ab = companies.filter((c) => c.kind === 'india' && c.where && ABROAD.test(c.where));
  if (ab.length >= 2) out.push(`${ab.length} of the Indian firms mention an office or headquarters outside India (${ab.length > 4 ? ab.slice(0, 4).map((c) => c.name).join(', ') + ' and others' : list(ab.map((c) => c.name))}), which can help with time-zone overlap for clients abroad.`);
  const pl = companies.filter((c) => c.kind === 'platform').length;
  if (pl) out.push(`${pl} ${pl === 1 ? 'entry is a platform or marketplace' : 'entries are platforms or marketplaces'} rather than a development firm.`);
  return out;
}

function make(slug) {
  const L = LISTS.find((x) => x.slug === slug);
  if (!L) throw new Error('unknown list ' + slug);
  const companies = L.picks.map((k) => {
    const c = byKey[k];
    if (!c) throw new Error(`${slug}: unknown company ${k}`);
    if (L.need && !c.caps.some((x) => L.need.includes(x))) throw new Error(`${slug}: ${c.name} does not name any of [${L.need}]`);
    return c;
  });
  if (new Set(L.picks).size !== L.picks.length) throw new Error(slug + ': duplicate pick');
  const total = companies.length + 1;

  const creutoEntry = `<h3 id="creuto">1. Creuto</h3>
<p><strong>Based:</strong> Bhubaneswar, India &middot; <strong>Led by:</strong> founder Nihar Ranjan Rout &middot; <strong>Reviews:</strong> 5.0 on Clutch from 16 reviews</p>
<p>Creuto is a founder-led software, mobile app and AI development company working with clients in India and abroad. It is also an <a href="/blog/openai-select-partner">OpenAI Select Partner</a>.</p>
${L.crFit.startsWith('<p>') ? L.crFit : '<p>' + L.crFit + '</p>'}
<p class="blog-source">Source: this website and <a href="https://clutch.co/profile/creuto" target="_blank" rel="nofollow noopener">Creuto on Clutch</a>.</p>`;

  const rows = [`<tr><td><strong>Creuto</strong></td><td>Bhubaneswar, India</td><td>Not stated here</td><td>Founder-led team</td><td>${L.need ? 'See entry above' : 'Mobile, web, ERP and AI'}</td></tr>`]
    .concat(companies.map((c) => {
      const focus = L.need ? list(c.caps.filter((k) => L.need.includes(k)).map((k) => CAP[k])) || 'See entry' : esc(c.about.replace(/^an? /, '').slice(0, 70));
      return `<tr><td><strong>${esc(c.name)}</strong></td><td>${esc((c.where || 'Not stated').replace(/ \(.*?\)/, ''))}</td><td>${c.founded || 'Not stated'}</td><td>${esc((c.size || 'Not stated').replace(/ \(.*?\)/, ''))}</td><td>${esc(focus)}</td></tr>`;
    })).join('\n    ');

  const gi = GROUPS.findIndex((g) => g.includes(slug));
  const sib = [...GROUPS[gi].filter((s) => s !== slug), ...GROUPS[(gi + 1) % GROUPS.length].slice(0, 2)];
  const sibLinks = sib.map((s) => { const o = LISTS.find((x) => x.slug === s); return `<li><a href="/blog/${s}">${esc(o.title)}</a></li>`; }).join('\n  ');

  const body = `
<p>${esc(L.who)}</p>

<h2 id="how-we-chose">How this list was put together</h2>
<ul>
  <li><strong>Their own words:</strong> ${[
    'each description is based on what the company\'s website says it does. Claims such as awards or project counts are shown as "what it says about itself" and are not verified by us.',
    'we read each company\'s own pages and report what they say. Anything like an award, rating or project count is the company\'s own claim, labelled as such, and we have not audited it.',
    'descriptions come from the company\'s own site. We repeat its claims, such as awards and project counts, only as claims it makes about itself, because we cannot verify them.'][hash(slug) % 3]}</li>
  <li><strong>Matched to the topic:</strong> ${L.need ? `a company appears only if its own pages name ${list(L.need.map((k) => CAP[k]))}.` : 'we included companies whose own pages describe the kind of work this list is about.'}</li>
  <li><strong>No guesses:</strong> where a company's pages did not state a detail, or contradicted themselves, we left it out or said so. Companies whose sites we could not read are not included.</li>
  <li><strong>Checked ${CHECKED}:</strong> details can change. If you spot something out of date, email <a href="mailto:me@niharrout.com">me@niharrout.com</a> and we will update it.</li>
</ul>

<h2 id="the-list">The list: ${total} companies</h2>
${creutoEntry}

${companies.map((c, i) => entry(c, i + 2, L.need, LISTS.indexOf(L) % 3)).join('\n\n')}

${summary(companies).length ? `<h2 id="what-the-data-shows">What the stated facts show</h2>
<p>${summary(companies).join(' ')}</p>
<p>All figures are as the companies state them, on different dates and in different ways, so they are not a like-for-like comparison.</p>

` : ''}<h2 id="at-a-glance">At a glance</h2>
<table>
  <thead>
    <tr><th>Company</th><th>Based</th><th>Founded</th><th>Size as stated</th><th>${L.need ? 'Named on its pages' : 'Describes itself as'}</th></tr>
  </thead>
  <tbody>
    ${rows}
  </tbody>
</table>

<h2 id="what-to-check">What to check before you shortlist</h2>
${L.matters.map(([h, t]) => `<h3>${esc(h)}</h3>\n<p>${esc(t)}</p>`).join('\n')}

<h2 id="more-lists">More company lists</h2>
<ul>
  ${sibLinks}
</ul>
<p>Prefer a method over a list? Read <a href="/blog/how-to-choose-a-software-development-company">how to choose a software development company</a>.</p>
`;
  internalLinksOk(slug, body);
  const endService = L.crLinks[0];
  return {
    slug,
    title: L.title,
    headline: L.title,
    shortTitle: L.short,
    description: L.desc,
    keywords: L.kw,
    category: 'Top Companies',
    badge: 'TOP COMPANIES',
    readMinutes: 8,
    published: PUBLISHED,
    icon: 'scales',
    topicOnly: true,
    lead: L.lead,
    cardDesc: L.desc,
    cta: { title: 'Comparing companies right now?', text: 'Bring your shortlist to a free 30-minute call. I will tell you honestly what to ask each one, even if you end up choosing another team.', button: 'Book a free 30-minute call' },
    endCta: { title: 'Want to talk to the founder who would lead your build?', text: 'Book a free 30-minute call. You get a written proposal within 24 hours.', service: { href: endService[0], label: endService[1] } },
    related: L.related,
    faq: L.faq,
    body,
  };
}

module.exports = { make, LISTS };
