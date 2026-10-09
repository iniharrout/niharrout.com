#!/usr/bin/env node
/**
 * Builds the guide pages in scripts/blog/*.js into /blog/<slug>/index.html and keeps the blog index and the homepage
 * "Field notes" section in sync with them. Plain HTML, no plugins. Each page gets: a unique title and description,
 * canonical URL, Open Graph and Twitter tags, BlogPosting + BreadcrumbList + FAQPage structured data, a contents list,
 * a visible FAQ that matches the structured data, internal links and related guides.
 * The shared header/footer, analytics tag and share-image tags are added afterwards by build-chrome.js,
 * build-analytics.js and build-share-meta.js (see build-all.js).
 *
 * Usage: node scripts/build-blog.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://www.niharrout.com';
const ORDER = [
  'how-to-choose-a-software-development-company',
  'what-is-a-prd-how-to-write-a-product-requirements-document',
  'how-to-add-ai-to-an-existing-product',
  'mobile-app-vs-web-app-which-to-build-first',
  'fixed-price-vs-time-and-materials-software-development',
];
const posts = ORDER.map((slug) => require(path.join(__dirname, 'blog', slug + '.js')));

// Older guides, used for "keep reading" links and the blog index schema.
const OLD = {
  'cost-to-build-mvp-2026': { title: 'The True Cost of Building an MVP in 2026', tag: 'Product Strategy', min: 9, blurb: 'Agency, freelancers or a dedicated squad: where MVP budgets actually go.' },
  'product-scoping-framework-kill-feature-bloat': { title: "The Product Owner's Scoping Framework", tag: 'Product Leadership', min: 8, blurb: 'A step-by-step method to cut feature bloat before you write code.' },
  'pragmatic-enterprise-ai-workflows': { title: 'Pragmatic Enterprise AI: LLMs and Vector Search Without the Hype', tag: 'Enterprise AI', min: 8, blurb: 'How real businesses get measurable return from AI with sensible safeguards.' },
  'openai-select-partner': { title: 'Creuto Is Now an OpenAI Select Partner', tag: 'Company News', min: 3, blurb: 'What the OpenAI Select Partner status means for clients.' },
  'react-native-mobile-app-playbook': { title: 'From PRD to App Store: The React Native and Flutter Playbook', tag: 'Mobile Engineering', min: 10, blurb: 'A production blueprint for consumer and B2B mobile apps.' },
  'web-application-development-build-vs-buy': { title: 'Web Application Development: When Build Beats Buy in 2026', tag: 'Web Application Development', min: 8, blurb: 'A real comparison of stacked subscriptions and a custom web application.' },
  'why-custom-erp-implementations-fail': { title: 'Why Custom ERP Implementations Fail, and How to Prevent It', tag: 'Enterprise ERP', min: 11, blurb: 'Modular cutovers, access control and clean data for ERP projects.' },
};

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const stripTags = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const fmtDate = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const ARROW = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const ICONS = {
  check: '<svg viewBox="0 0 48 48"><rect x="9" y="6" width="30" height="36" rx="4"/><path d="M16 17l3 3 5-6M16 28l3 3 5-6M29 18h5M29 29h5"/></svg>',
  doc: '<svg viewBox="0 0 48 48"><path d="M13 5h16l8 8v28a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M29 5v8h8M17 22h14M17 29h14M17 36h8"/></svg>',
  spark: '<svg viewBox="0 0 48 48"><path d="M22 6l4.4 11.6L38 22l-11.6 4.4L22 38l-4.4-11.6L6 22l11.6-4.4z"/><path d="M37 30l1.6 4.4L43 36l-4.4 1.6L37 42l-1.6-4.4L31 36l4.4-1.6z"/></svg>',
  devices: '<svg viewBox="0 0 48 48"><rect x="4" y="10" width="28" height="20" rx="3"/><path d="M10 36h16M18 30v6"/><rect x="34" y="18" width="10" height="20" rx="2.5"/><path d="M37.5 34h3"/></svg>',
  scales: '<svg viewBox="0 0 48 48"><path d="M24 7v34M14 41h20M10 14h28"/><path d="M10 14l-6 13a6 6 0 0 0 12 0zM38 14l-6 13a6 6 0 0 0 12 0z"/></svg>',
};

const TONES = { check: 'var(--t-blue)', doc: 'var(--t-orange)', spark: 'var(--t-violet)', devices: 'var(--t-cyan)', scales: 'var(--t-rose)' };

function tocFromBody(body) {
  const items = [];
  body.replace(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g, (m, id, text) => { items.push([id, stripTags(text)]); return m; });
  return items;
}

function ctaBox(c) {
  return `<div class="blog-cta-box">
  <h3>${esc(c.title)}</h3>
  <p>${esc(c.text)}</p>
  <a href="https://calendly.com/creuto/meet" data-calendly="true" class="cl-button -primary btn-book-call">${esc(c.button)} <span style="margin-left:4px;">&rarr;</span></a>
</div>`;
}

function relatedCards(slugs) {
  return slugs.map((slug) => {
    const own = posts.find((p) => p.slug === slug);
    const t = own ? { title: own.title, tag: own.category, min: own.readMinutes, blurb: own.cardDesc } : OLD[slug];
    if (!t) throw new Error('unknown related slug: ' + slug);
    return `<a class="related-card" href="/blog/${slug}">
        <span class="related-tag">${esc(t.tag)} &middot; ${t.min} min read</span>
        <strong>${esc(t.title)}</strong>
        <span class="related-blurb">${esc(t.blurb)}</span>
        <span class="related-go">Read the guide ${ARROW}</span>
      </a>`;
  }).join('\n      ');
}

function page(p) {
  const url = `${SITE}/blog/${p.slug}`;
  const image = `${SITE}/assets/blog/${p.slug}-share.jpg`;
  const toc = tocFromBody(p.body);
  toc.push(['faq', 'Frequently asked questions']);
  const body = p.body.replace('{{cta}}', ctaBox(p.cta));
  const words = stripTags(p.body + ' ' + p.lead + ' ' + p.faq.map((f) => f.join(' ')).join(' ')).split(' ').length;
  const alt = `${p.headline}: guide by Nihar Ranjan Rout`;

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.headline.length > 110 ? p.title : p.headline,
    description: p.description,
    image: [image],
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Nihar Ranjan Rout', jobTitle: 'Founder & CEO, Creuto', url: `${SITE}/about`, sameAs: ['https://www.linkedin.com/in/iniharrout', 'https://x.com/iniharrout', 'https://github.com/iniharrout'] },
    publisher: { '@type': 'Organization', name: 'Creuto', url: 'https://creuto.com', logo: { '@type': 'ImageObject', url: `${SITE}/assets/nihar.jpg` } },
    datePublished: p.published,
    dateModified: p.published,
    articleSection: p.category,
    keywords: p.keywords.join(', '),
    wordCount: words,
    inLanguage: 'en',
    isAccessibleForFree: true,
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: p.shortTitle, item: url },
    ],
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  const ld = (o) => `<script type="application/ld+json">\n  ${JSON.stringify(o, null, 2).replace(/\n/g, '\n  ').replace(/<\//g, '<\\/')}\n  </script>`;

  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.description)}">
  <meta name="author" content="Nihar Ranjan Rout">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Nihar Ranjan Rout | Creuto">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(p.title)}">
  <meta property="og:description" content="${esc(p.description)}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:alt" content="${esc(alt)}">
  <meta property="article:published_time" content="${p.published}">
  <meta property="article:modified_time" content="${p.published}">
  <meta property="article:author" content="${SITE}/about">
  <meta property="article:section" content="${esc(p.category)}">
${p.keywords.map((k) => `  <meta property="article:tag" content="${esc(k)}">`).join('\n')}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(p.title)}">
  <meta name="twitter:description" content="${esc(p.description)}">

  <!-- Structured data -->
  ${ld(blogPosting)}
  ${ld(breadcrumb)}
  ${ld(faqLd)}

  <!-- Fonts & Design System -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&amp;family=Inter:wght@300;400;500;600;700&amp;display=swap">
  <link rel="stylesheet" href="/assets/design-system.css?v=blue4">
  <link rel="stylesheet" href="/assets/blog-post.css?v=bp2">
  <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
  <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
</head>

<body>

  <!-- chrome:header -->
  <!-- /chrome:header -->

  <main id="top">
    <article>
      <header class="article-header">
        <div class="wrap" style="max-width:920px;">
          <nav class="article-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/blog">Blog</a>
            <span>/</span>
            <span>${esc(p.category)}</span>
          </nav>

          <div class="blog-category-badge" style="display:inline-block; margin-bottom:16px;">${esc(p.badge)}</div>

          <h1 class="article-headline">${esc(p.headline)}</h1>

          <p class="article-lead">${esc(p.lead)}</p>

          <div class="article-meta-bar">
            <div class="article-author-info">
              <img src="/assets/nihar-avatar.jpg" alt="Nihar Ranjan Rout" class="article-author-avatar" width="96" height="96" decoding="async">
              <div>
                <div class="article-author-name">Nihar Ranjan Rout</div>
                <div class="article-author-title">Founder &amp; CEO, Creuto &middot; 8+ Years in Product Leadership</div>
              </div>
            </div>
            <div style="font-size:13.5px; color:var(--hs-text-03);">
              <time datetime="${p.published}">Published ${fmtDate(p.published)}</time> &middot; ${p.readMinutes} min read
            </div>
          </div>
        </div>
      </header>

      <div class="article-body-container">
        <figure class="article-figure">
          <img src="/assets/blog/${p.slug}-banner.jpg" alt="${esc(alt)}" width="1200" height="630" fetchpriority="high" decoding="async">
        </figure>

        <nav class="article-toc" aria-label="In this guide">
          <p class="article-toc-title">In this guide</p>
          <ol>
${toc.map(([id, t]) => `            <li><a href="#${id}">${esc(t)}</a></li>`).join('\n')}
          </ol>
        </nav>

        <div class="prose">
${body}
        </div>

        <section class="article-faq" id="faq" aria-labelledby="faq-title">
          <h2 id="faq-title">Frequently asked questions</h2>
${p.faq.map(([q, a]) => `          <h3>${esc(q)}</h3>\n          <p>${esc(a)}</p>`).join('\n')}
        </section>

        <div class="blog-cta-box blog-cta-end">
          <h3>${esc(p.endCta.title)}</h3>
          <p>${esc(p.endCta.text)}</p>
          <div class="blog-cta-actions">
            <a href="https://calendly.com/creuto/meet" data-calendly="true" class="cl-button -primary btn-book-call">Book a free strategy call <span style="margin-left:4px;">&rarr;</span></a>
            <a href="${p.endCta.service.href}" class="blog-cta-link">${esc(p.endCta.service.label)} ${ARROW}</a>
          </div>
        </div>

        <section class="related-posts" aria-labelledby="related-title">
          <h2 id="related-title">Keep reading</h2>
          <div class="related-grid">
      ${relatedCards(p.related)}
          </div>
        </section>

        <div class="article-author-card">
          <img src="/assets/nihar-avatar.jpg" alt="Nihar Ranjan Rout" width="96" height="96" loading="lazy" decoding="async">
          <div>
            <h4>About Nihar Ranjan Rout</h4>
            <p>Founder &amp; CEO of Creuto. Over the past 8+ years Nihar has led product strategy and engineering for 50+ products, including mobile apps, custom ERPs and B2B platforms. Creuto is an OpenAI Select Partner. He works directly with founders to turn an idea into a clear plan and a launched product.</p>
            <a href="/about">More about Nihar</a> &middot; <a href="https://www.linkedin.com/in/iniharrout" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
      </div>
    </article>
  </main>

  <!-- chrome:footer -->
  <!-- /chrome:footer -->

  <script src="/assets/site-enhancements.js?v=blue4"></script>
</body>
</html>
`;
}

function indexCard(p) {
  return `        <a class="ed-post" href="/blog/${p.slug}">
          <div><p class="ed-tag">${esc(p.category)} &middot; ${p.readMinutes} min read</p><h2>${esc(p.headline)}</h2></div>
          <div><p>${esc(p.cardDesc)}</p><span class="ed-link">Read the guide &rarr;</span></div>
        </a>`;
}

function homeBlock() {
  const [first, ...rest] = posts;
  const mini = (p) => `          <a class="blog-mini" href="/blog/${p.slug}">
            <span class="blog-ico" style="--tone:${TONES[p.icon]}" aria-hidden="true">${ICONS[p.icon]}</span>
            <div><p class="blog-tag">${esc(p.category)} &middot; ${p.readMinutes} min read</p><h3>${esc(p.title)}</h3><span class="blog-more">Read the guide <i>&rarr;</i></span></div>
          </a>`;
  return `<div class="blog-layout">
        <a class="blog-feature" href="/blog/${first.slug}">
          <div class="blog-visual" aria-hidden="true">
            <span class="blog-orb o1"></span><span class="blog-orb o2"></span>
            <span class="blog-ico blog-ico-lg">${ICONS[first.icon]}</span>
          </div>
          <div class="blog-body">
            <p class="blog-tag">${esc(first.category)} &middot; ${first.readMinutes} min read</p>
            <h3>${esc(first.headline)}</h3>
            <p class="blog-desc">${esc(first.cardDesc)}</p>
            <span class="blog-more">Read the guide <i>&rarr;</i></span>
          </div>
        </a>
        <div class="blog-side">
${rest.map(mini).join('\n')}
        </div>
      </div>`;
}

function replaceRegion(html, name, content) {
  const re = new RegExp(`<!-- ${name} -->[\\s\\S]*?<!-- /${name} -->`);
  if (!re.test(html)) throw new Error(`marker ${name} missing`);
  return html.replace(re, () => `<!-- ${name} -->\n${content}\n        <!-- /${name} -->`);
}

// ---- write the posts
for (const p of posts) {
  const dir = path.join(ROOT, 'blog', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(p));
}

// ---- blog index
const indexFile = path.join(ROOT, 'blog/index.html');
let index = fs.readFileSync(indexFile, 'utf8');
const total = posts.length + Object.keys(OLD).length;
index = index.replace(/All Articles \(\d+\)/, `All Articles (${total})`);
index = replaceRegion(index, 'blog:new', posts.map(indexCard).join('\n'));
const allItems = [
  ...posts.map((p) => ({ url: `${SITE}/blog/${p.slug}`, name: p.title })),
  ...Object.entries(OLD).map(([s, o]) => ({ url: `${SITE}/blog/${s}`, name: o.title })),
];
const listLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Insights on product management and software architecture',
  url: `${SITE}/blog`,
  mainEntity: { '@type': 'ItemList', itemListElement: allItems.map((it, i) => ({ '@type': 'ListItem', position: i + 1, url: it.url, name: it.name })) },
};
index = index.replace(/<!-- blog:ld -->[\s\S]*?<!-- \/blog:ld -->/, '');
index = index.replace('</head>', `  <!-- blog:ld -->\n  <script type="application/ld+json">\n  ${JSON.stringify(listLd, null, 2).replace(/\n/g, '\n  ')}\n  </script>\n  <!-- /blog:ld -->\n</head>`);
fs.writeFileSync(indexFile, index);

// ---- homepage
const homeFile = path.join(ROOT, 'index.html');
let home = fs.readFileSync(homeFile, 'utf8');
home = replaceRegion(home, 'blog:home', '      ' + homeBlock());
fs.writeFileSync(homeFile, home);

console.log(`blog: ${posts.length} guides built, blog index and homepage updated`);
