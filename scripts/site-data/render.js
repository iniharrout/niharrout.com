/**
 * Section renderers shared by the generated service and industry pages (build-services-pages.js, build-industries.js).
 * Markup uses the wwm- classes in assets/work-with-me.css.
 */
const { esc, ARROW } = require('../careers/shell');
const { doodle } = require('./doodles');

const BOOK = 'https://calendly.com/creuto/meet';
const bookBtn = (label = 'Book a free strategy call', cls = 'is-primary') =>
  `<a class="wwm-btn ${cls}" href="${BOOK}" target="_blank" rel="noopener" data-book="true">${esc(label)} ${ARROW}</a>`;

const crumbsHtml = (items) => `<nav class="wwm-crumbs" aria-label="Breadcrumb">
      ${items.map(([label, href], i) => (i === items.length - 1 ? `<span aria-current="page">${esc(label)}</span>` : `<a href="${href}">${esc(label)}</a><span aria-hidden="true">/</span>`)).join('')}
    </nav>`;

// `art` names a doodle (scripts/site-data/doodles.js) drawn beside the heading.
const hero = ({ crumbs, pill, h1, sub, secondary, art, artHtml }) => `
  <section class="wwm-hero wwm-hero-page${art || artHtml ? ' has-art' : ''}">
    <div class="wwm-wrap">
      ${crumbsHtml(crumbs)}
      <div class="wwm-hero-grid">
        <div>
          <p class="wwm-pill"><span class="wwm-dot"></span>${esc(pill)}</p>
          <h1>${esc(h1)}</h1>
          <p class="wwm-sub">${esc(sub)}</p>
          <div class="wwm-cta-row">${bookBtn()}${secondary ? `<a class="wwm-btn" href="${secondary[1]}">${esc(secondary[0])}</a>` : ''}</div>
        </div>${art ? `
        <div class="wwm-hero-art">${doodle(art)}</div>` : ''}${artHtml ? `
        <div class="wwm-hero-art wwm-hero-art-html">${artHtml}</div>` : ''}
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

// Three guide cards and a link to the founder page: internal links that help search engines find
// and value the guides and About page (see scripts/site-data/guides.js for which guides go where).
const guides = (list) => `<ul class="wwm-cards wwm-cards-links">
${list.map((g) => `        <li class="wwm-c"><a href="/blog/${g.slug}"><span class="wwm-c-n">${esc(g.tag)}</span><h3>${esc(g.title)}</h3><p>${esc(g.text)}</p><span class="wwm-c-go">Read the guide</span></a></li>`).join('\n')}
      </ul>
      <a class="wwm-founder" href="/about"><img src="/assets/nihar-avatar.jpg" width="56" height="56" alt="" loading="lazy" decoding="async"><span><strong>Who you&rsquo;ll work with: Nihar Ranjan Rout</strong>Founder &amp; CEO of Creuto. 8+ years in product, 50+ products shipped. Read the story ${ARROW}</span></a>`;

// Closing band on generated pages: three ways to get in touch (call, WhatsApp, phone) beside a short quote form.
// The form posts to /api/lead through assets/lead-forms.js, which also records where the visitor came from.
const PHONE = '+917608844995';
const PHONE_LABEL = '+91 76088 44995';
const waLink = (service) => `https://wa.me/${PHONE.slice(1)}?text=${encodeURIComponent(`Hi Nihar, I found your website and would like a quote${service ? ' for ' + service.toLowerCase() : ''}.`)}`;
const WA_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.82.83-3.03-.2-.31a8.2 8.2 0 1 1 6.95 3.85Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.24-.63.8-.78.96-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.16-.47-.28Z"/></svg>';
const endBand = (title = 'Have a product in mind?', text = 'Tell me what you want to build. The first call is free, and you speak with me directly.', service = '', city = '') => `
  <section class="wwm-end" id="quote">
    <div class="wwm-wrap">
      <div class="wwm-end-card wwm-quote">
        <div class="wwm-quote-copy">
          <p class="wwm-quote-kicker">Free quote within 24 hours</p>
          <h2 class="wwm-h2">${esc(title)}</h2>
          <p>${esc(text)}</p>
          <div class="wwm-quote-ways">
            ${bookBtn('Book a free 30-minute call')}
            <a class="wwm-btn is-wa" href="${waLink(service)}" target="_blank" rel="noopener">${WA_ICON} Chat on WhatsApp</a>
          </div>
          <p class="wwm-quote-call">Prefer to talk now? Call <a href="tel:${PHONE}">${PHONE_LABEL}</a></p>
        </div>
        <form class="wwm-qform" action="/api/lead" method="POST" aria-label="Get a free quote">
          <input type="hidden" name="service" value="${esc(service || 'Project enquiry')}">${city ? `
          <input type="hidden" name="city" value="${esc(city)}">` : ''}
          <div aria-hidden="true" class="wwm-hp"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
          <div class="wwm-qrow">
            <label>Your name<input type="text" name="name" autocomplete="name" required></label>
            <label>Phone or WhatsApp<input type="tel" name="phone" autocomplete="tel" required></label>
          </div>
          <label>Work email<input type="email" name="email" autocomplete="email" required></label>
          <label>What do you want to build?<textarea name="details" rows="3" placeholder="A few lines is enough: the idea, who it is for and your timeline." required></textarea></label>
          <button type="submit" class="wwm-btn is-primary">Get my free quote ${ARROW}</button>
          <p class="wwm-qnote">Goes straight to Nihar. You get a reply within 24 hours.</p>
        </form>
      </div>
    </div>
  </section>
  <script src="/assets/lead-forms.js?v=lf8" defer></script>`;

module.exports = { PHONE, waLink, BOOK, bookBtn, hero, section, cards, fits, process, prose, pills, faqHtml, faqLd, endBand, crumbsHtml, guides };
