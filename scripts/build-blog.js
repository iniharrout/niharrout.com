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
const OLD = require('./blog/older');
const { scene, doodle, BLOG_ART } = require('./site-data/doodles');

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const stripTags = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const fmtDate = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const ARROW = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';



function tocFromBody(body) {
  const items = [];
  body.replace(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g, (m, id, text) => { items.push([id, stripTags(text)]); return m; });
  return items;
}

function ctaBox(c) {
  return `<div class="blog-cta-box">
  <h3>${esc(c.title)}</h3>
  <p>${esc(c.text)}</p>
  <a href="https://calendar.app.google/HJ4ctVHEXLjUxCzp6" target="_blank" rel="noopener" data-book="true" class="cl-button -primary btn-book-call">${esc(c.button)} <span style="margin-left:4px;">&rarr;</span></a>
</div>`;
}

function relatedCards(slugs) {
  return slugs.map((slug) => {
    const own = posts.find((p) => p.slug === slug);
    const t = own ? { title: own.title, tag: own.category, min: own.readMinutes, blurb: own.cardDesc } : OLD[slug];
    if (!t) throw new Error('unknown related slug: ' + slug);
    return `<a class="related-card" href="/blog/${slug}">
        <span class="related-art" aria-hidden="true">${scene(slug)}</span>
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
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&amp;family=Inter:wght@400;500;600;700&amp;display=swap">
  <link rel="stylesheet" href="/assets/design-system.css?v=blue7">
  <link rel="stylesheet" href="/assets/blog-post.css?v=bp4">
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
            <a href="https://calendar.app.google/HJ4ctVHEXLjUxCzp6" target="_blank" rel="noopener" data-book="true" class="cl-button -primary btn-book-call">Book a free strategy call <span style="margin-left:4px;">&rarr;</span></a>
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

  <script src="/assets/site-enhancements.js?v=blue5"></script>
</body>
</html>
`;
}

function indexCard(p) {
  return `        <a class="ed-post" href="/blog/${p.slug}">
          <span class="ed-post-art" data-scene="${p.slug}" aria-hidden="true">${scene(p.slug)}</span>
          <div><p class="ed-tag">${esc(p.category)} &middot; ${p.readMinutes} min read</p><h2>${esc(p.headline)}</h2></div>
          <div><p>${esc(p.cardDesc)}</p><span class="ed-link">Read the guide &rarr;</span></div>
        </a>`;
}

function homeBlock() {
  const [first, ...rest] = posts;
  const mini = (p) => `          <a class="blog-mini" href="/blog/${p.slug}">
            <span class="blog-doodle" aria-hidden="true">${doodle(BLOG_ART[p.slug][0])}</span>
            <div><p class="blog-tag">${esc(p.category)} &middot; ${p.readMinutes} min read</p><h3>${esc(p.title)}</h3><span class="blog-more">Read the guide <i>&rarr;</i></span></div>
          </a>`;
  return `<div class="blog-layout">
        <a class="blog-feature" href="/blog/${first.slug}">
          <div class="blog-visual" aria-hidden="true">${scene(first.slug)}</div>
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
index = index.replace(/\n*[ \t]*<!-- blog:ld -->[\s\S]*?<!-- \/blog:ld -->\n*/, '\n');
index = index.replace('</head>', `  <!-- blog:ld -->\n  <script type="application/ld+json">\n  ${JSON.stringify(listLd, null, 2).replace(/\n/g, '\n  ')}\n  </script>\n  <!-- /blog:ld -->\n</head>`);
fs.writeFileSync(indexFile, index);

// ---- homepage
const homeFile = path.join(ROOT, 'index.html');
let home = fs.readFileSync(homeFile, 'utf8');
home = replaceRegion(home, 'blog:home', '      ' + homeBlock());
fs.writeFileSync(homeFile, home);

console.log(`blog: ${posts.length} guides built, blog index and homepage updated`);
