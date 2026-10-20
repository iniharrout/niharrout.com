#!/usr/bin/env node
/**
 * Generates /book: the Google Calendar appointment page embedded in the site, with a short "what to expect"
 * and a "Before the call" FAQ.
 * Same booking page as the Book a Call pop-up and buttons (see assets/schedule-popup.js), here shown inline.
 * Run through `node scripts/build-all.js`, which also stamps the shared header, footer, analytics and share tags.
 */
const fs = require('fs');
const path = require('path');
const { SITE, ARROW, head, foot, crumbs } = require('./careers/shell');
const { doodle } = require('./site-data/doodles');

const ROOT = path.resolve(__dirname, '..');
const SHORT = 'https://calendar.app.google/HJ4ctVHEXLjUxCzp6';
const EMBED = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2_xXGxvkoPUq-EZu-9OFN59ehyVyKzMM5OMnc0RXBdI3W7EqVJnmpc_v7Zu2nkjmJhMjTI-YqN?gv=true';

const url = `${SITE}/book`;
const title = 'Book a Free Strategy Call | Nihar Ranjan Rout';
const description = 'Book a free 30-minute strategy call with Nihar Ranjan Rout, founder of Creuto. Talk through your app, web or AI product and what to build first.';


// Questions people ask before booking (moved here from the homepage FAQ, which keeps the buying questions).
const faq = [
  ['What do I need to have ready before the first call?', 'Nothing formal. A rough idea, a few notes or an existing product is enough. If you have competitor examples, sketches or a list of what your users struggle with, bring them along. Turning an unclear idea into a scoped plan is part of the work.'],
  ['Will you sign an NDA?', 'Yes. Formal mutual non-disclosure agreements are available and signed before any deep architecture or discovery sessions. Client information is kept strictly confidential.'],
  ['How will we communicate while the product is being built?', 'Asynchronous daily updates via Loom and GitHub, plus live overlap hours each week for stand-ups and demos with founders in the US, EU and APAC. You see working progress regularly instead of waiting for a final reveal.'],
];
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const graph = [
  { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: 'Book a free strategy call', description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#person` } },
  crumbs([['Home', `${SITE}/`], ['Book a call', url]]),
  { '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
];

const html = head({ title, description, canonical: url, graph }) + `
<main id="top">
  <section class="wwm-hero wwm-hero-tight">
    <div class="wwm-wrap">
      <p class="wwm-pill"><span class="wwm-dot"></span>Free &middot; 30 minutes &middot; with Nihar</p>
      <h1>Book a free strategy call.</h1>
      <p class="wwm-sub">Pick a time below. We will talk through your idea, what to build first and what it could take. You speak with me directly.</p>
    </div>
  </section>

  <section class="wwm-book" aria-label="Choose a time">
    <div class="wwm-wrap">
      <div class="wwm-embed">
        <iframe src="${EMBED}" title="Book a call with Nihar: Google Calendar appointment page" width="100%" height="760"></iframe>
        <p class="wwm-embed-fallback">Calendar not showing? <a href="${SHORT}" target="_blank" rel="noopener">Open it in a new tab ${ARROW}</a></p>
      </div>

      <div class="wwm-expect">
        <div><span class="wwm-expect-art" aria-hidden="true">${doodle('calendar')}</span><h2>30 minutes, free</h2><p>A focused conversation about your product, with no pitch deck and no obligation.</p></div>
        <div><span class="wwm-expect-art" aria-hidden="true">${doodle('call')}</span><h2>You talk to me</h2><p>The founder is on the call, not a sales team.</p></div>
        <div><span class="wwm-expect-art" aria-hidden="true">${doodle('prd')}</span><h2>A clear proposal</h2><p>Within 24 hours of the call you get scope, priorities and next steps in writing.</p></div>
      </div>

      <p class="wwm-book-note">Calls are for new software projects. Looking for a job? See <a href="/work-with-me">Work with me</a>. Prefer to write first? Message me on <a href="https://wa.me/917608844995" target="_blank" rel="noopener">WhatsApp</a> or email <a href="mailto:me@niharrout.com">me@niharrout.com</a>.</p>
    </div>
  </section>

  <section class="wwm-faq" id="before-the-call" aria-labelledby="faq-title">
    <div class="wwm-wrap wwm-faq-wrap">
      <h2 class="wwm-h2" id="faq-title">Before the call</h2>
      <div class="wwm-qs">
${faq.map(([q, a]) => `        <details class="wwm-q">
          <summary>${esc(q)}</summary>
          <p>${esc(a)}</p>
        </details>`).join('\n')}
      </div>
    </div>
  </section>
</main>
` + foot();

fs.mkdirSync(path.join(ROOT, 'book'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'book', 'index.html'), html);
console.log('book page written');
