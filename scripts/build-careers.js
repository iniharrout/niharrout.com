#!/usr/bin/env node
/**
 * Generates the "Work with me" pages from scripts/careers/roles.js:
 *   work-with-me/index.html            listing: four role cards, a pop-up with details and the application form, FAQ
 *   work-with-me/<slug>/index.html     one page per role, with the full description, the form and JobPosting markup
 *
 * The role pages exist so each job has its own crawlable address (links, search results and Google Jobs need that);
 * the pop-up on the listing is a faster way to read the same content (assets/work-with-me.js).
 * Run through `node scripts/build-all.js`, which also stamps the shared header, footer, analytics and share tags.
 */
const fs = require('fs');
const path = require('path');
const { POSTED, roles, faq } = require('./careers/roles');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://www.niharrout.com';
const OUT = path.join(ROOT, 'work-with-me');
const CSS = '/assets/work-with-me.css?v=w3';
const JS = '/assets/work-with-me.js?v=w3';

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ld = (obj) => JSON.stringify(obj, null, 2).replace(/<\//g, '<\\/');
const svg = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const ORG = { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'Creuto', sameAs: 'https://creuto.com', logo: `${SITE}/favicon-192.png` };

function head({ title, description, canonical, graph }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- ga4 -->
  <!-- /ga4 -->
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="author" content="Nihar Ranjan Rout">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&amp;family=Inter:wght@400;500;600;700&amp;display=swap">
  <link rel="stylesheet" href="${CSS}">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Nihar Ranjan Rout | Creuto">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${SITE}/assets/og/default.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <script type="application/ld+json">
${ld({ '@context': 'https://schema.org', '@graph': graph })}
  </script>
  <link rel="stylesheet" href="/assets/chrome.css?v=29">
  <script src="/assets/chrome.js?v=9" defer></script>
</head>
<body class="wwm">
<!-- chrome:header -->
<!-- /chrome:header -->
`;
}

const foot = (extra = '') => `
<!-- chrome:footer -->
<!-- /chrome:footer -->
${extra}
<script src="${JS}"></script>
<script src="/assets/lead-forms.js?v=blue7"></script>
</body>
</html>
`;

const chips = () => '<ul class="wwm-chips"><li>Remote</li><li>India</li><li>Full-time</li></ul>';

function detail(role, level) {
  const h = level;
  const sub = level + 1;
  return `<div class="wwm-detail">
  ${chips()}
  <h${h} class="wwm-d-title"${level === 2 ? ' id="dlgTitle"' : ''}>${esc(role.title)}</h${h}>
  <p class="wwm-d-sum">${esc(role.summary)}</p>
  <div class="wwm-d-cols">
    <section>
      <h${sub}>What you’ll do</h${sub}>
      <ul>
${role.does.map((t) => `        <li>${esc(t)}</li>`).join('\n')}
      </ul>
    </section>
    <section>
      <h${sub}>Who I’m looking for</h${sub}>
      <ul>
${role.looks.map((t) => `        <li>${esc(t)}</li>`).join('\n')}
      </ul>
    </section>
  </div>
</div>`;
}

function form(roleValue) {
  return `<form class="wwm-form" id="applyForm" action="/api/lead" method="post" data-inline-success>
  <input type="hidden" name="service" id="a-service" value="${esc(roleValue)}">
  <div class="wwm-field">
    <label for="a-name">Full name</label>
    <input id="a-name" name="name" type="text" autocomplete="name" maxlength="120" required>
  </div>
  <div class="wwm-field">
    <label for="a-email">Email</label>
    <input id="a-email" name="email" type="email" autocomplete="email" maxlength="160" required>
  </div>
  <div class="wwm-field">
    <label for="a-phone">Phone or WhatsApp <span>(optional)</span></label>
    <input id="a-phone" name="phone" type="tel" autocomplete="tel" maxlength="40">
  </div>
  <div class="wwm-field">
    <label for="a-city">Where in India are you based?</label>
    <input id="a-city" name="city" type="text" autocomplete="address-level2" maxlength="60" placeholder="City, state" required>
  </div>
  <div class="wwm-field">
    <label for="a-linkedin">LinkedIn profile</label>
    <input id="a-linkedin" name="LinkedIn" type="url" inputmode="url" maxlength="200" placeholder="https://www.linkedin.com/in/...">
  </div>
  <div class="wwm-field">
    <label for="a-work">Portfolio or sample work</label>
    <input id="a-work" name="portfolio" type="url" inputmode="url" maxlength="200" placeholder="Behance, Drive, YouTube or a link">
  </div>
  <div class="wwm-field is-wide">
    <label for="a-start">When could you start? <span>(optional)</span></label>
    <input id="a-start" name="availability" type="text" maxlength="120" placeholder="For example: immediately, or after a 30-day notice">
  </div>
  <div class="wwm-field is-wide">
    <label for="a-note">Why this role, and why you?</label>
    <textarea id="a-note" name="message" maxlength="1500" minlength="20" required placeholder="A few honest lines about what you have done and what you want to do next."></textarea>
  </div>
  <div class="wwm-field wwm-hp" aria-hidden="true">
    <label for="a-site">Leave this field empty</label>
    <input id="a-site" name="website" type="text" tabindex="-1" autocomplete="off">
  </div>
  <div class="wwm-submit">
    <button class="wwm-btn is-primary" type="submit">Send my application</button>
    <p class="wwm-fine">Your details are used only to consider your application. See the <a href="/privacy-policy">privacy policy</a>.</p>
  </div>
</form>
<div class="wwm-done" id="applyDone" role="status" hidden>
  <svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="25" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 27l8 8 15-17" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <h3>Application received</h3>
  <p>Thank you for taking the time. I’ll go through it, and if it looks like a fit I’ll get in touch by email or WhatsApp.</p>
  <a class="wwm-btn" href="/work-with-me">See other roles</a>
</div>`;
}

const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: url })),
});

// ---------- Listing ----------
function listing() {
  const url = `${SITE}/work-with-me`;
  const title = 'Careers: Work With Nihar Ranjan Rout | Remote Jobs in India';
  const description = 'Four full-time remote jobs in India with Nihar Ranjan Rout, founder of Creuto: Founder’s Office, LinkedIn content manager, graphic designer and video editor.';
  const graph = [
    { '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: 'Careers: Work With Nihar Ranjan Rout', description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#person` } },
    crumbs([['Home', `${SITE}/`], ['Work With Me', url]]),
    { '@type': 'ItemList', name: 'Open roles', itemListElement: roles.map((r, i) => ({ '@type': 'ListItem', position: i + 1, name: r.title, url: `${url}/${r.slug}` })) },
    { '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];

  const cards = roles.map((r, i) => `        <li>
          <a class="wwm-rcard" href="/work-with-me/${r.slug}" data-slug="${r.slug}" data-apply="${esc(r.apply)}">
            <span class="wwm-rcard-ic">${svg(r.icon)}</span>
            <span class="wwm-rcard-no" aria-hidden="true">0${i + 1}</span>
            <h3>${esc(r.title)}</h3>
            <p>${esc(r.short)}</p>
            <span class="wwm-rcard-foot"><span class="wwm-rcard-meta">Remote &middot; Full-time</span><span class="wwm-rcard-go">View role ${ARROW}</span></span>
          </a>
        </li>`).join('\n');

  const templates = roles.map((r) => `<template id="tpl-${r.slug}">
${detail(r, 2)}
</template>`).join('\n');

  const dialog = `<dialog class="wwm-dialog" id="roleDialog" aria-labelledby="dlgTitle">
  <div class="wwm-dlg-shell">
    <button class="wwm-dlg-x" type="button" data-close aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    <div class="wwm-pane" data-pane="details">
      <div class="wwm-scroll" id="dlgBody"></div>
      <div class="wwm-dlg-foot">
        <button class="wwm-btn is-primary" type="button" data-apply-btn>Apply for this role ${ARROW}</button>
        <a class="wwm-dlg-page" id="dlgPage" href="/work-with-me">Open as a full page</a>
      </div>
    </div>
    <div class="wwm-pane" data-pane="form" hidden>
      <div class="wwm-scroll">
        <button class="wwm-back" type="button" data-back><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Back to the role</button>
        <h2 class="wwm-dlg-h" id="dlgFormTitle">Apply</h2>
        <p class="wwm-dlg-sub">Your application is sent to me directly.</p>
        ${form('').replace(/\n/g, '\n        ')}
      </div>
    </div>
  </div>
</dialog>`;

  const faqHtml = faq.map(([q, a]) => `        <details class="wwm-q">
          <summary>${esc(q)}</summary>
          <p>${esc(a)}</p>
        </details>`).join('\n');

  return head({ title, description, canonical: url, graph }) + `
<main id="top">
  <section class="wwm-hero">
    <div class="wwm-wrap">
      <p class="wwm-pill"><span class="wwm-dot"></span>Careers at Creuto &middot; 4 open roles</p>
      <h1>Work with me.</h1>
      <p class="wwm-sub">Four full-time remote roles are open to people across India. Each one works directly with me, from product and operations to the content that goes out under my name.</p>
      <div class="wwm-by">
        <img src="/assets/nihar-avatar.jpg" width="96" height="96" alt="Nihar Ranjan Rout">
        <span><strong>Nihar Ranjan Rout</strong>Founder &amp; CEO, Creuto</span>
      </div>
    </div>
  </section>

  <section class="wwm-roles" id="roles" aria-labelledby="roles-title">
    <div class="wwm-wrap">
      <h2 class="wwm-h2" id="roles-title">Open roles</h2>
      <ul class="wwm-grid">
${cards}
      </ul>
    </div>
  </section>

  <section class="wwm-faq" aria-labelledby="faq-title">
    <div class="wwm-wrap wwm-faq-wrap">
      <h2 class="wwm-h2" id="faq-title">Questions before you apply</h2>
      <div class="wwm-qs">
${faqHtml}
      </div>
    </div>
  </section>
</main>

${dialog}
${templates}
` + foot();
}

// ---------- Role pages ----------
function rolePage(role) {
  const url = `${SITE}/work-with-me/${role.slug}`;
  const description = [role.seoDescription].join('');
  const html = `<p>${role.summary}</p><h3>What you’ll do</h3><ul>${role.does.map((t) => `<li>${t}</li>`).join('')}</ul><h3>Who I’m looking for</h3><ul>${role.looks.map((t) => `<li>${t}</li>`).join('')}</ul>`;
  const graph = [
    {
      '@type': 'JobPosting',
      '@id': `${url}#job`,
      title: role.title,
      description: html,
      datePosted: POSTED,
      employmentType: 'FULL_TIME',
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'India' },
      hiringOrganization: ORG,
      directApply: true,
      url,
    },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: role.seoTitle, description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${url}#job` } },
    crumbs([['Home', `${SITE}/`], ['Work With Me', `${SITE}/work-with-me`], [role.title, url]]),
  ];
  const others = roles.filter((r) => r.slug !== role.slug).map((r) => `        <li><a href="/work-with-me/${r.slug}"><span>${esc(r.title)}</span>${ARROW}</a></li>`).join('\n');

  return head({ title: role.seoTitle, description, canonical: url, graph }) + `
<main id="top">
  <div class="wwm-wrap wwm-rp">
    <nav class="wwm-crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span aria-hidden="true">/</span><a href="/work-with-me">Work with me</a><span aria-hidden="true">/</span><span aria-current="page">${esc(role.title)}</span>
    </nav>
    <div class="wwm-rp-grid">
      <article>
        ${detail(role, 1).replace(/\n/g, '\n        ')}
        <p class="wwm-rp-note">This is a full-time remote role open to people based anywhere in India. Applications are sent to me directly, and I get in touch if one looks like a fit.</p>
      </article>
      <aside class="wwm-card" id="apply" aria-labelledby="apply-title">
        <h2 class="wwm-dlg-h" id="apply-title">Apply for this role</h2>
        <p class="wwm-dlg-sub">Your application is sent to me directly.</p>
        ${form(role.apply).replace(/\n/g, '\n        ')}
      </aside>
    </div>

    <section class="wwm-more" aria-labelledby="more-title">
      <h2 class="wwm-h3" id="more-title">Other open roles</h2>
      <ul>
${others}
      </ul>
    </section>
  </div>
</main>
` + foot();
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'index.html'), listing());
for (const role of roles) {
  const dir = path.join(OUT, role.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), rolePage(role));
}
console.log(`careers: listing and ${roles.length} role pages written`);
