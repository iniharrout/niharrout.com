/**
 * Shared page shell for the generated "Work with me" and "Work" pages: head (analytics and chrome markers, meta, JSON-LD),
 * header/footer markers and the closing scripts. Used by scripts/build-careers.js and scripts/build-work-index.js.
 */
const SITE = 'https://www.niharrout.com';
const CSS = '/assets/work-with-me.css?v=w14';

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
  <link rel="stylesheet" href="/assets/chrome.css?v=51">
  <script src="/assets/chrome.js?v=19" defer></script>
</head>
<body class="wwm">
<!-- chrome:header -->
<!-- /chrome:header -->
`;
}

const foot = (scripts = []) => `
<!-- chrome:footer -->
<!-- /chrome:footer -->
${scripts.map((src) => `<script src="${src}"></script>`).join('\n')}
</body>
</html>
`;

const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: url })),
});


module.exports = { SITE, CSS, esc, ld, svg, ARROW, ORG, head, foot, crumbs };
