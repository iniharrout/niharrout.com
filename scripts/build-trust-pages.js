#!/usr/bin/env node
/**
 * Trust pages for buyers comparing partners: /reviews (client feedback already published on the site, plus links
 * to independent review profiles) and /how-we-work (the engagement process, communication and ownership).
 * Facts only (see project business facts). No Review or AggregateRating schema: Google does not show
 * self-published review stars for an organisation, and the verified reviews live on Clutch.
 * Run through `node scripts/build-all.js`.
 */
const fs = require('fs');
const path = require('path');
const { WORK } = require('./site-data/industries');
const { SITE, esc, head, foot, crumbs } = require('./careers/shell');
const R = require('./site-data/render');

const ROOT = path.resolve(__dirname, '..');
const write = (rel, html) => { const f = path.join(ROOT, rel, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
const linkCards = (list) => `<ul class="wwm-cards wwm-cards-links">
${list.map(([t, d, href, go = 'Learn more', ext], n) => `        <li class="wwm-c"><a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}><span class="wwm-c-n" aria-hidden="true">${String(n + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p><span class="wwm-c-go">${esc(go)}</span></a></li>`).join('\n')}
      </ul>`;
const steps = (list) => `<ol class="wwm-flow">
${list.map(([t, d], i) => `        <li><span class="wwm-flow-n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('\n')}
      </ol>`;

// ---------- /reviews ----------
// The same client quotes shown on the homepage and About page (supplied by the founder).
const QUOTES = [
  ['Before Creuto, every department was running on its own disconnected spreadsheet. Nihar locked down our operational requirements in the PRD, and his team delivered a unified system that gave our management team real-time visibility for the first time.', 'Operations Director', 'Large-scale manufacturing enterprise', WORK.erp.href],
  ['Nihar is that rare breed of product leader who understands business levers just as well as software architecture. He stopped us from wasting budget on features our customers didn\'t want and delivered our marketplace ahead of our launch schedule.', 'Co-Founder', 'SkyeOne event booking marketplace', WORK.skyone.href],
  ['Finding an engineering team that doesn\'t disappear or cut corners is rare. Creuto\'s in-house squad was disciplined and launched our mobile apps cleanly to the App Store and Google Play.', 'Founder and CEO', 'Make My Look beauty platform', WORK.mml.href],
  ['SkyeOne solved a problem every family planning a wedding faces, the endless back-and-forth across a dozen vendors with nothing written down. Creuto built a platform that finally makes event planning feel as simple as booking a flight.', 'Rakesh Sharma', 'SkyeOne founding team', WORK.skyone.href],
];
const quoteCards = `<ul class="wwm-cards rv-quotes">
${QUOTES.map(([q, who, org, href]) => `        <li class="wwm-c rv-quote"><div class="rv-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote><p>&ldquo;${esc(q)}&rdquo;</p></blockquote><p class="rv-who"><strong>${esc(who)}</strong><span>${esc(org)}</span></p><a class="wwm-c-go" href="${href}">Read the case study</a></li>`).join('\n')}
      </ul>`;
const PROFILES = [
  ['Clutch', 'Rated 5.0 from 16 verified reviews. Clutch interviews or checks each reviewer before a review is published.', 'https://clutch.co/profile/creuto', 'Read the reviews on Clutch', true],
  ['TechBehemoths', 'Company profile with services, awards and client feedback.', 'https://techbehemoths.com/company/nihar-rout', 'See the profile', true],
  ['OpenAI Select Partner', 'Creuto is an OpenAI Select Partner, building AI products on OpenAI models for clients.', '/blog/openai-select-partner', 'Read the announcement'],
];
const REVIEW_FAQ = [
  ['Where can I read verified reviews of Creuto?', 'On Clutch, where Creuto is rated 5.0 from 16 verified reviews. Clutch collects and checks those reviews itself, so we cannot edit or remove them.'],
  ['What do clients say about working with Creuto?', 'Clients mention clear requirements in the PRD, a disciplined team, clean app store launches and a founder who keeps the product focused on what users need.'],
  ['Can I see examples of past work?', 'Yes. Our case studies cover a manufacturing ERP, an event booking marketplace, a beauty booking platform, a quick commerce app and a team chat product.'],
  ['How do I know if Creuto is right for my project?', 'Book a free 30-minute call with Nihar Ranjan Rout. If we are a good fit, you receive a written proposal within 24 hours; if not, we say so.'],
];
function reviews() {
  const url = `${SITE}/reviews`;
  const title = 'Creuto Reviews: What Clients Say About Working With Us';
  const description = 'Client reviews of Creuto and founder Nihar Ranjan Rout: 5.0 on Clutch from 16 verified reviews, client feedback and case studies from 120+ products shipped.';
  const graph = [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#organization` } },
    crumbs([['Home', `${SITE}/`], ['Reviews', url]]),
    R.faqLd(REVIEW_FAQ),
  ];
  return head({ title, description, canonical: url, graph }) + `
<main id="top">${R.hero({ crumbs: [['Home', '/'], ['Reviews', '/reviews']], pill: '5.0 on Clutch · 16 verified reviews', h1: 'What Clients Say About Working With Creuto', sub: 'Feedback from founders and business leaders who built their products with Nihar Ranjan Rout and the Creuto team, and where to read independent, verified reviews.', secondary: ['Read reviews on Clutch', 'https://clutch.co/profile/creuto'], art: 'growth' })}
${R.section('feedback', 'Client feedback', quoteCards)}
${R.section('verified', 'Independent reviews and recognition', linkCards(PROFILES), 'wwm-sec-alt')}
${R.section('work', 'The products behind the reviews', linkCards(['erp', 'skyone', 'mml', 'flash', 'skribe'].map((k) => [WORK[k].title, WORK[k].note, WORK[k].href, 'Read the case study'])))}
${R.section('how', 'Why clients come back', R.why('software'), 'wwm-sec-alt')}
${R.section('faq', 'Questions about Creuto reviews', R.faqHtml(REVIEW_FAQ))}
${R.endBand('Want results like these?', 'Tell me what you want to build. The first call is free, and you get a written proposal within 24 hours.', 'Reviews page enquiry')}
</main>
` + foot();
}

// ---------- /how-we-work ----------
const PROCESS = [
  ['Free 30-minute call', 'You talk to Nihar Ranjan Rout about the product, users, timeline and budget. No sales team in between.'],
  ['NDA and discovery', 'We sign an NDA before discovery, then go through your idea, existing systems and constraints in detail.'],
  ['Written proposal within 24 hours', 'Scope, priorities, team, milestones and costs in writing, so you can compare us fairly.'],
  ['PRD and prototype', 'A product requirements document fixes what will be built. Where it helps, a clickable prototype lets users try the flows first.'],
  ['First working version in about 4 weeks', 'We build the most important flow first and put working software in your hands early.'],
  ['Milestones with demos', 'Each milestone ends with a demo you can test, and payment is tied to agreed deliverables.'],
  ['Launch', 'Store submissions, production setup, monitoring and handover notes, with code and accounts in your name.'],
  ['60-day warranty, then ongoing support', 'Fixes are covered for 60 days after launch. After that we agree a plan for maintenance and new features.'],
];
const COMMS = [
  ['A daily overlap window', 'A fixed time each working day for calls and quick decisions, planned around your time zone.'],
  ['Written updates', 'What was done, what is next and what is blocked, so nothing depends on memory or a missed call.'],
  ['Decisions in writing', 'Scope changes and decisions are recorded, so everyone works from the same version.'],
  ['Your tools or ours', 'We work in your Slack, Teams, Jira or GitHub, or set up a simple workspace for you.'],
];
const OWN = [
  ['Code and accounts in your name', 'Repositories, cloud, app store and third-party accounts are created in your name from day one.'],
  ['IP passes to you', 'Ownership of custom work passes to you as each milestone is paid for.'],
  ['NDA before discovery', 'You can share ideas, data and plans openly from the first detailed conversation.'],
  ['Documentation', 'Setup notes and decisions are written down, so your team or any future team can maintain the product.'],
];
const MODELS = [
  ['Fixed-scope project', 'A defined product built against a PRD, with milestones and payment tied to deliverables.', '/services/product-strategy-prd/mvp-development'],
  ['Dedicated team', 'A team that works only on your product. We manage the people; you set the priorities.', '/hire/dedicated-development-team'],
  ['Team extension', 'Engineers who join your in-house team and follow your processes.', '/hire/staff-augmentation'],
];
const HOW_FAQ = [
  ['How long does it take to start?', 'After the first call you receive a written proposal within 24 hours. Once it is agreed, discovery and the PRD come first, and the first working version usually follows in about 4 weeks.'],
  ['What is a PRD and why do you write one?', 'A product requirements document describes what will be built, for whom and in what order. It keeps scope, cost and timeline clear for both sides before code is written.'],
  ['How do we pay?', 'Payment is tied to milestones agreed in the proposal. Each milestone ends with working software you can review.'],
  ['What if requirements change during the project?', 'Changes are discussed, estimated and agreed in writing before they are built, so you always know the effect on cost and timeline.'],
  ['Do we own everything you build?', 'Yes. Code and accounts are in your name from day one, and ownership of custom work passes to you as milestones are paid.'],
];
function howWeWork() {
  const url = `${SITE}/how-we-work`;
  const title = 'How We Work: From First Call to Launch | Creuto';
  const description = 'How Creuto builds software: free call, NDA, written proposal within 24 hours, PRD, first working version in about 4 weeks, milestone demos and a 60-day warranty.';
  const graph = [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#organization` } },
    { '@type': 'HowTo', name: 'How a software project with Creuto works', description, step: PROCESS.map(([name, text], i) => ({ '@type': 'HowToStep', position: i + 1, name, text })) },
    crumbs([['Home', `${SITE}/`], ['How we work', url]]),
    R.faqLd(HOW_FAQ),
  ];
  return head({ title, description, canonical: url, graph }) + `
<main id="top">${R.hero({ crumbs: [['Home', '/'], ['How we work', '/how-we-work']], pill: 'Founder-led · Written plan before code', h1: 'How We Work, From First Call to Launch', sub: 'A clear, written process that keeps scope, cost and progress visible at every step, with Nihar Ranjan Rout involved from the first call and code in your accounts from day one.', secondary: ['Get a free quote', '#quote'], art: 'roadmap' })}
${R.glance('Software, app and AI development from a founder-led team in India')}
${R.section('process', 'The eight steps of every project', steps(PROCESS))}
${R.section('communication', 'How we communicate', R.cards(COMMS).replace('wwm-cards', 'wwm-cards wwm-cards-4'), 'wwm-sec-alt')}
${R.section('ownership', 'Ownership, IP and security', R.cards(OWN).replace('wwm-cards', 'wwm-cards wwm-cards-4'))}
${R.section('quality', 'Quality practices on every project', R.quality, 'wwm-sec-alt')}
${R.section('models', 'Ways to work with us', linkCards(MODELS))}
${R.section('faq', 'Questions about our process', R.faqHtml(HOW_FAQ), 'wwm-sec-alt')}
${R.section('more', 'See it in practice', `${R.pills([['Case studies', '/work'], ['Client reviews', '/reviews'], ['Hire developers', '/hire'], ['Project cost guides', '/project-costs'], ['About Nihar', '/about']])}`)}
${R.endBand('Ready to start with a free call?', 'Tell me what you want to build. You get a written proposal within 24 hours of the call.', 'How we work page enquiry')}
</main>
` + foot();
}

write('reviews', reviews());
write('how-we-work', howWeWork());
console.log('trust pages: /reviews and /how-we-work written');
