#!/usr/bin/env node
/**
 * Generates /work: one card per case study, each with a "View case study" link, so the main menu can point to a
 * single page instead of listing every project in a dropdown. Reads assets/work-data.js (the same list the homepage
 * work section is written from), so titles and descriptions stay in sync.
 * Run through `node scripts/build-all.js`, which also stamps the shared header, footer, analytics and share tags.
 */
const fs = require('fs');
const path = require('path');
const { SITE, esc, ARROW, head, foot, crumbs } = require('./careers/shell');

const ROOT = path.resolve(__dirname, '..');
const projects = new Function(`${fs.readFileSync(path.join(ROOT, 'assets/work-data.js'), 'utf8')}; return portfolioProjects;`)();

// Skribe has no photo card yet; its illustrated SVG card is used instead.
const image = (p) => (p.thumbnail ? `/${p.thumbnail}` : `/work/${p.slug}-card.svg`);

const url = `${SITE}/work`;
const title = 'Case Studies: Software Products Built by Nihar Ranjan Rout';
const description = 'Case studies from Nihar Ranjan Rout and Creuto: a manufacturing ERP, event booking, beauty booking, quick commerce and team chat products, built from PRD to launch.';

const graph = [
  { '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: 'Case studies', description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#person` } },
  crumbs([['Home', `${SITE}/`], ['Work', url]]),
  { '@type': 'ItemList', name: 'Case studies', itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: `${SITE}${p.link}` })) },
];

const cards = projects.map((p, i) => `        <li>
          <a class="wwm-wcard" href="${p.link}">
            <span class="wwm-wcard-img"><img src="${image(p)}" alt="${esc(p.title)}: case study" width="1024" height="683"${i < 2 ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></span>
            <span class="wwm-wcard-body">
              <span class="wwm-wcard-tag">${esc(p.industry)}</span>
              <h3>${esc(p.title)}</h3>
              <p>${esc(p.description)}</p>
              <span class="wwm-rcard-go">View case study ${ARROW}</span>
            </span>
          </a>
        </li>`).join('\n');

const html = head({ title, description, canonical: url, graph }) + `
<main id="top">
  <section class="wwm-hero">
    <div class="wwm-wrap">
      <p class="wwm-pill"><span class="wwm-dot"></span>Case studies &middot; ${projects.length} products</p>
      <h1>Selected work.</h1>
      <p class="wwm-sub">${projects.length} products I have built with the Creuto team, from a manufacturing ERP to consumer booking marketplaces. Open a case study to see the problem, the decisions and the result.</p>
    </div>
  </section>

  <section class="wwm-roles" aria-label="Case studies">
    <div class="wwm-wrap">
      <ul class="wwm-grid wwm-grid-work">
${cards}
      </ul>
    </div>
  </section>

  <section class="wwm-end">
    <div class="wwm-wrap">
      <div class="wwm-end-card">
        <div>
          <h2 class="wwm-h2">Have a product in mind?</h2>
          <p>Tell me what you want to build. The first call is free and takes 30 minutes.</p>
        </div>
        <a class="wwm-btn is-primary" href="https://calendly.com/creuto/meet" target="_blank" rel="noopener" data-book="true">Book a free strategy call ${ARROW}</a>
      </div>
    </div>
  </section>
</main>
` + foot();

fs.writeFileSync(path.join(ROOT, 'work', 'index.html'), html);
console.log(`work index: ${projects.length} case study cards written`);
