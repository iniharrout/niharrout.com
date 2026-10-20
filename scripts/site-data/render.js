/**
 * Section renderers shared by the generated service and industry pages (build-services-pages.js, build-industries.js).
 * Markup uses the wwm- classes in assets/work-with-me.css.
 */
const { esc, ARROW } = require('../careers/shell');
const { doodle } = require('./doodles');

const BOOK = 'https://calendar.app.google/HJ4ctVHEXLjUxCzp6';
const bookBtn = (label = 'Book a free strategy call', cls = 'is-primary') =>
  `<a class="wwm-btn ${cls}" href="${BOOK}" target="_blank" rel="noopener" data-book="true">${esc(label)} ${ARROW}</a>`;

const crumbsHtml = (items) => `<nav class="wwm-crumbs" aria-label="Breadcrumb">
      ${items.map(([label, href], i) => (i === items.length - 1 ? `<span aria-current="page">${esc(label)}</span>` : `<a href="${href}">${esc(label)}</a><span aria-hidden="true">/</span>`)).join('')}
    </nav>`;

// `art` names a doodle (scripts/site-data/doodles.js) drawn beside the heading.
const hero = ({ crumbs, pill, h1, sub, secondary, art }) => `
  <section class="wwm-hero wwm-hero-page${art ? ' has-art' : ''}">
    <div class="wwm-wrap">
      ${crumbsHtml(crumbs)}
      <div class="wwm-hero-grid">
        <div>
          <p class="wwm-pill"><span class="wwm-dot"></span>${esc(pill)}</p>
          <h1>${esc(h1)}</h1>
          <p class="wwm-sub">${esc(sub)}</p>
          <div class="wwm-cta-row">${bookBtn()}${secondary ? `<a class="wwm-btn" href="${secondary[1]}">${esc(secondary[0])}</a>` : ''}</div>
        </div>${art ? `
        <div class="wwm-hero-art">${doodle(art)}</div>` : ''}
      </div>
    </div>
  </section>`;

const section = (id, title, body, cls = '') => `
  <section class="wwm-sec ${cls}" ${id ? `id="${id}" ` : ''}aria-labelledby="${id || 's'}-title">
    <div class="wwm-wrap">
      <h2 class="wwm-h2" id="${id || 's'}-title">${esc(title)}</h2>
      ${body}
    </div>
  </section>`;

const cards = (list) => `<ul class="wwm-cards">
${list.map(([t, d], i) => `        <li class="wwm-c"><span class="wwm-c-n" aria-hidden="true">0${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('\n')}
      </ul>`;

const fits = (title, list) => `<div class="wwm-fitbox"><h3>${esc(title)}</h3><ul>${list.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>`;

const STEPS = [
  ['Scope', 'A free strategy call, then a clear proposal with scope and priorities.'],
  ['Plan', 'A PRD and, where useful, a clickable prototype before building starts.'],
  ['Build', 'An in-house team builds in stages, with demos along the way.'],
  ['Launch and improve', 'Release, then keep improving with the people who built it.'],
];
const process = () => `<ol class="wwm-flow">
${STEPS.map(([t, d], i) => `        <li><span class="wwm-flow-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('\n')}
      </ol>`;

const prose = (text) => `<p class="wwm-prose">${esc(text)}</p>`;

const pills = (list) => `<ul class="wwm-pills">${list.map(([label, href]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('')}</ul>`;

const faqHtml = (faq) => `<div class="wwm-qs">
${faq.map(([q, a]) => `        <details class="wwm-q"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
      </div>`;
const faqLd = (faq) => ({ '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

const endBand = (title = 'Have a product in mind?', text = 'Tell me what you want to build. The first call is free, and you speak with me directly.') => `
  <section class="wwm-end">
    <div class="wwm-wrap">
      <div class="wwm-end-card">
        <div>
          <h2 class="wwm-h2">${esc(title)}</h2>
          <p>${esc(text)}</p>
        </div>
        ${bookBtn()}
      </div>
    </div>
  </section>`;

module.exports = { BOOK, bookBtn, hero, section, cards, fits, process, prose, pills, faqHtml, faqLd, endBand, crumbsHtml };
