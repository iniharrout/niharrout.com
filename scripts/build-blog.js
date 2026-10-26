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
  'creuto-top-software-development-company-in-odisha',
  'hire-development-team-in-india-from-uk',
  'react-native-interview-questions',
  'flutter-interview-questions',
  'react-interview-questions',
  'node-js-interview-questions',
  'how-to-become-an-ai-engineer',
  'how-to-become-a-product-manager',
  'ui-ux-designer-portfolio-tips',
  'software-developer-resume-for-freshers',
  'how-to-get-a-remote-software-job-from-india',
  'how-to-get-a-software-internship-in-india',
  'discovery-phase-in-software-development',
  'how-to-build-a-ride-hailing-app',
  'how-to-build-a-dating-app',
  'how-to-build-a-fitness-app',
  'how-to-build-a-hospital-management-system',
  'inventory-management-software-development',
  'fleet-management-software-development',
  'shopify-vs-custom-ecommerce-development',
  'software-development-contract-checklist',
  'ai-voice-agents-for-business',
  'ios-vs-android-which-to-build-first',
  'hire-development-team-in-india-from-usa',
  'ai-app-development-cost',
  'custom-erp-vs-off-the-shelf-erp',
  'how-to-build-a-saas-product',
  'how-to-choose-a-tech-stack-for-your-startup',
  'ui-vs-ux-design-difference',
  'agile-vs-waterfall-software-development',
  'freelancer-vs-agency-for-app-development',
  'software-maintenance-cost-and-planning',
  'how-to-build-a-food-delivery-app',
  'how-to-build-a-telemedicine-app',
  'how-to-build-a-fintech-app-in-india',
  'how-to-build-an-edtech-app',
  'how-to-build-a-real-estate-app',
  'upi-payment-integration-for-apps',
  'whatsapp-business-api-guide',
  'pwa-vs-native-app',
  'legacy-software-modernization-guide',
  'aws-vs-azure-vs-google-cloud-for-startups',
  'generative-ai-use-cases-for-business',
  'how-to-reduce-ai-hallucinations',
  'how-to-write-user-stories',
  'app-store-optimization-guide',
  'app-development-cost-factors-india',
  'how-long-does-it-take-to-build-an-app',
  'react-native-vs-flutter',
  'native-vs-cross-platform-app-development',
  'how-to-hire-app-developers-in-india',
  'outsourcing-software-development-to-india',
  'mvp-vs-prototype-vs-proof-of-concept',
  'how-to-validate-a-startup-idea',
  'erp-vs-crm-difference',
  'custom-crm-vs-salesforce-hubspot-zoho',
  'how-to-build-an-ai-chatbot-for-business',
  'rag-vs-fine-tuning',
  'ai-agents-for-business',
  'app-store-and-google-play-approval-guide',
  'mobile-app-security-checklist',
  'how-to-build-a-multi-vendor-marketplace-app',
  'how-to-build-a-quick-commerce-app',
  'salon-booking-app-development',
  'dpdp-act-guide-for-app-founders',
  'website-vs-web-app-difference',
  'how-to-choose-a-software-development-company',
  'what-is-a-prd-how-to-write-a-product-requirements-document',
  'how-to-add-ai-to-an-existing-product',
  'mobile-app-vs-web-app-which-to-build-first',
  'fixed-price-vs-time-and-materials-software-development',
  // moved from the earlier blog at blog.niharrout.com (original dates kept)
  'the-future-of-digital-india-is-homegrown',
  'does-your-business-need-software',
  'the-essential-ingredients-for-a-successful-product-launch-by-nihar-ranjan-rout',
  'investing-in-technology-a-smart-strategy-for-business-growth',
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
  ${c.href ? `<a href="${c.href}" class="cl-button -primary">${esc(c.button)} <span style="margin-left:4px;">&rarr;</span></a>` : `<a href="https://calendly.com/creuto/meet" target="_blank" rel="noopener" data-book="true" class="cl-button -primary btn-book-call">${esc(c.button)} <span style="margin-left:4px;">&rarr;</span></a>`}
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


const TOPICS = [
  { slug: 'product', name: 'Product & MVP', cats: ['Product Strategy', 'Product Leadership'], title: 'Product Strategy and MVP Guides for Founders', desc: 'Guides on validating ideas, writing a PRD, scoping an MVP, user stories and design, written by Nihar Ranjan Rout, founder of Creuto.' },
  { slug: 'cost-and-hiring', name: 'Cost & Hiring', cats: ['Costs & Planning', 'Hiring a Team'], title: 'App Development Cost and Hiring Guides', desc: 'What decides software cost and timelines, how to hire developers in India and how to choose and work with a development partner.' },
  { slug: 'mobile', name: 'Mobile Apps', cats: ['Mobile Engineering', 'Mobile & Web'], title: 'Mobile App Development Guides', desc: 'React Native vs Flutter, native vs cross-platform, PWAs, app security, UPI payments and getting approved on the App Store and Google Play.' },
  { slug: 'software-and-cloud', name: 'Software & Cloud', cats: ['Web Application Development', 'Business Software', 'Enterprise ERP', 'Technology & Business', 'Cloud & DevOps'], title: 'Web, ERP, CRM and Cloud Guides', desc: 'Guides on web applications, ERP and CRM, WhatsApp Business API, legacy modernisation and choosing a cloud provider for your business.' },
  { slug: 'ai', name: 'AI', cats: ['Enterprise AI'], title: 'AI Guides for Business: Chatbots, RAG and Agents', desc: 'Practical guides on AI chatbots, RAG vs fine-tuning, AI agents, reducing hallucinations and generative AI use cases for business.' },
  { slug: 'news', name: 'Company News', cats: ['Company News'], title: 'Creuto Company News and Announcements', desc: 'News from Creuto and Nihar Ranjan Rout: rankings, partnerships and milestones from a software, mobile app and AI development company in India.' },
  { slug: 'careers', name: 'Careers', cats: ['Careers'], title: 'Career Guides: Interviews, Roadmaps and Remote Jobs', desc: 'Interview questions, career roadmaps and job search guides for developers, designers, product managers and marketers in India.' },
  { slug: 'industries', name: 'Industry Guides', cats: ['Industry Guides'], title: 'Industry App Guides: Fintech, Healthcare, Delivery and More', desc: 'How to build apps for fintech, telemedicine, EdTech, real estate, food delivery, quick commerce, salons and multi-vendor marketplaces.' },
];
const topicOf = (cat) => TOPICS.find((t) => t.cats.includes(cat));
// topic of a category, for breadcrumbs and "more guides" links (TOPICS is defined further down)
const topicSlug = (cat) => TOPICS.find((t) => t.cats.includes(cat)).slug;
const topicName = (cat) => TOPICS.find((t) => t.cats.includes(cat)).name;
const ICO = (d) => `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const SHARE = {
  linkedin: ICO('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>'),
  x: ICO('<path d="M4 4l16 16M20 4L4 20"/>'),
  whatsapp: ICO('<path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-3.7A8.5 8.5 0 1 1 20 11.5z"/><path d="M9 9.5c.3 1.8 2.2 3.8 4 4.2l1.2-1.1 1.8.9-.4 1.4c-3 .4-7.1-3.4-7.1-6.6l1.3-.6 1 1.7z"/>'),
  link: ICO('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
};

function page(p) {
  const url = `${SITE}/blog/${p.slug}`;
  const image = `${SITE}/assets/blog/${p.slug}-share.jpg`;
  const toc = tocFromBody(p.body);
  if (p.faq.length) toc.push(['faq', 'Frequently asked questions']);
  const body = p.body.replace('{{cta}}', ctaBox(p.cta)).replace(/<div class="blog-callout">(\s*)<h4>([\s\S]*?)<\/h4>/g, '<div class="blog-callout">$1<p class="blog-callout-title">$2</p>').replace(/<table>/g, '<div class="reader-table" tabindex="0" role="region" aria-label="Table"><table>').replace(/<\/table>/g, '</table></div>');
  const words = stripTags(p.body + ' ' + p.lead + ' ' + p.faq.map((f) => f.join(' ')).join(' ')).split(' ').length;
  const alt = p.imageAlt || `${p.headline}: guide by Nihar Ranjan Rout`;

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
  ${p.faq.length ? ld(faqLd) : ''}

  <!-- Fonts & Design System -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&amp;family=Inter:wght@400;500;600;700&amp;display=swap">
  <link rel="stylesheet" href="/assets/design-system.css?v=blue9">
  <link rel="stylesheet" href="/assets/blog-post.css?v=bp6">
</head>

<body>

  <!-- chrome:header -->
  <!-- /chrome:header -->

  <div class="reader-progress" aria-hidden="true"><span></span></div>
  <main id="top" class="reader">
    <article>
      <header class="article-header reader-header">
        <div class="reader-head">
          <div class="reader-head-text">
            <nav class="article-breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/blog">Blog</a>
              <span>/</span>
              <a href="/blog/topic/${topicSlug(p.category)}">${esc(topicName(p.category))}</a>
            </nav>

            <div class="blog-category-badge">${esc(p.badge)}</div>

            <h1 class="article-headline">${esc(p.headline)}</h1>

            <p class="article-lead">${esc(p.lead)}</p>

            <div class="article-meta-bar">
              <div class="article-author-info">
                <img src="/assets/nihar-avatar.jpg" alt="Nihar Ranjan Rout" class="article-author-avatar" width="96" height="96" decoding="async">
                <div>
                  <div class="article-author-name">Nihar Ranjan Rout</div>
                  <div class="article-author-title">Founder &amp; CEO, Creuto</div>
                </div>
              </div>
              <div class="reader-meta">
                <time datetime="${p.published}">${fmtDate(p.published)}</time><span aria-hidden="true">&middot;</span><span>${p.readMinutes} min read</span>
              </div>
            </div>
          </div>
          <figure class="article-figure reader-cover">
            <img src="/assets/blog/${p.slug}-banner.jpg" alt="${esc(alt)}" width="1200" height="630" fetchpriority="high" decoding="async">
          </figure>
        </div>
      </header>

      <div class="reader-layout">
        <aside class="reader-side" aria-label="Guide tools">
          <div class="reader-side-inner">
${toc.length > 1 ? `            <nav class="article-toc" aria-label="In this guide">
              <p class="article-toc-title">In this guide</p>
              <ol>
${toc.map(([id, t]) => `                <li><a href="#${id}">${esc(t)}</a></li>`).join('\n')}
              </ol>
            </nav>
` : ''}            <div class="reader-share">
              <p class="article-toc-title">Share this guide</p>
              <div class="reader-share-row">
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener" aria-label="Share on LinkedIn">${SHARE.linkedin}</a>
                <a href="https://x.com/intent/post?url=${encodeURIComponent(url)}&amp;text=${encodeURIComponent(p.title)}" target="_blank" rel="noopener" aria-label="Share on X">${SHARE.x}</a>
                <a href="https://wa.me/?text=${encodeURIComponent(p.title + ' ' + url)}" target="_blank" rel="noopener" aria-label="Share on WhatsApp">${SHARE.whatsapp}</a>
                <button type="button" class="reader-copy" data-copy="${url}" aria-label="Copy link">${SHARE.link}<span class="reader-copy-done" role="status"></span></button>
              </div>
            </div>
${p.category === 'Careers' ? `            <a class="reader-side-cta" href="/work-with-me">
              <strong>Remote jobs at Creuto</strong>
              <span>See open roles &rarr;</span>
            </a>` : `            <a class="reader-side-cta" href="https://calendly.com/creuto/meet" target="_blank" rel="noopener" data-book="true">
              <strong>Talk it through with Nihar</strong>
              <span>Free 30-minute call &rarr;</span>
            </a>`}
          </div>
        </aside>

        <div class="reader-main">
${toc.length > 1 ? `          <details class="reader-toc-mobile">
            <summary>In this guide <span>${toc.length} sections</span></summary>
            <ol>
${toc.map(([id, t]) => `              <li><a href="#${id}">${esc(t)}</a></li>`).join('\n')}
            </ol>
          </details>
` : ''}
          <div class="prose">
${body}
          </div>

${p.faq.length ? `          <section class="article-faq" id="faq" aria-labelledby="faq-title">
            <h2 id="faq-title">Frequently asked questions</h2>
${p.faq.map(([q, a], i) => `            <details class="reader-faq"${i === 0 ? ' open' : ''}>\n              <summary><h3>${esc(q)}</h3></summary>\n              <p>${esc(a)}</p>\n            </details>`).join('\n')}
          </section>
` : ''}
          <div class="blog-cta-box blog-cta-end">
            <h3>${esc(p.endCta.title)}</h3>
            <p>${esc(p.endCta.text)}</p>
            <div class="blog-cta-actions">
              ${p.endCta.primary ? `<a href="${p.endCta.primary.href}" class="cl-button -primary">${esc(p.endCta.primary.label)} <span style="margin-left:4px;">&rarr;</span></a>` : `<a href="https://calendly.com/creuto/meet" target="_blank" rel="noopener" data-book="true" class="cl-button -primary btn-book-call">Book a free strategy call <span style="margin-left:4px;">&rarr;</span></a>`}
              <a href="${p.endCta.service.href}" class="blog-cta-link">${esc(p.endCta.service.label)} ${ARROW}</a>
            </div>
          </div>

          <div class="article-author-card">
            <img src="/assets/nihar-avatar.jpg" alt="Nihar Ranjan Rout" width="96" height="96" loading="lazy" decoding="async">
            <div>
              <h4>About Nihar Ranjan Rout</h4>
              <p>Founder &amp; CEO of Creuto. Over the past 8+ years Nihar has led product strategy and engineering for 50+ products, including mobile apps, custom ERPs and B2B platforms. Creuto is an OpenAI Select Partner. He works directly with founders to turn an idea into a clear plan and a launched product.</p>
              <a href="/about">More about Nihar</a> &middot; <a href="https://www.linkedin.com/in/iniharrout" target="_blank" rel="noopener">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      <section class="related-posts reader-related" aria-labelledby="related-title">
        <div class="reader-related-head">
          <h2 id="related-title">Keep reading</h2>
          <a href="/blog/topic/${topicSlug(p.category)}">More ${esc(topicName(p.category))} guides ${ARROW}</a>
        </div>
        <div class="related-grid">
      ${relatedCards(p.related)}
        </div>
      </section>
    </article>
  </main>

  <!-- chrome:footer -->
  <!-- /chrome:footer -->

  <script src="/assets/site-enhancements.js?v=blue5"></script>
  <script src="/assets/blog-reader.js?v=br1" defer></script>
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
  // the homepage shows the five newest guides; ORDER lists newest first
  const [first, ...rest] = posts.slice(0, 5);
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

// ---- blog index: paginated list (/blog, /blog/page/2, ...) and one page per topic (/blog/topic/<slug>)
const PER_PAGE = 12;

function oldCard(slug, o) {
  return `        <a class="ed-post" href="/blog/${slug}">
          <span class="ed-post-art" data-scene="${slug}" aria-hidden="true">${scene(slug)}</span>
          <div><p class="ed-tag">${esc(o.tag)} &middot; ${o.min} min read</p><h2>${esc(o.headline)}</h2></div>
          <div><p>${esc(o.desc)}</p><span class="ed-link">${esc(o.link)} &rarr;</span></div>
        </a>`;
}
const entries = [
  ...posts.map((p, i) => ({ slug: p.slug, title: p.title, date: p.published, cat: p.category, html: indexCard(p), i })),
  ...Object.entries(OLD).map(([s, o], i) => ({ slug: s, title: o.title, date: o.date, cat: o.tag, html: oldCard(s, o), i: 1000 + i })),
].sort((a, b) => (b.date.localeCompare(a.date)) || (a.i - b.i));
for (const e of entries) if (!topicOf(e.cat)) throw new Error('no topic for category ' + e.cat);

const indexFile = path.join(ROOT, 'blog/index.html');
// strip anything a previous build set for page 1, so the file is a clean template
let template = fs.readFileSync(indexFile, 'utf8');
const pageUrl = (n) => (n === 1 ? '/blog' : `/blog/page/${n}`);
const totalPages = Math.ceil(entries.length / PER_PAGE);

function setHead(html, { title, desc, url }) {
  const a = esc(title), d = esc(desc);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${a}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${d}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${SITE}${url}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${SITE}${url}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${a}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${d}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${a}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${d}">`);
}
function filters(active) {
  const link = (href, label, on) => on ? `<a href="${href}" class="blog-filter-btn active" aria-current="page">${label}</a>` : `<a href="${href}" class="blog-filter-btn">${label}</a>`;
  return `        <nav class="blog-filter-bar" aria-label="Guide topics">
          ${link('/blog', `All guides (${entries.length})`, active === 'all')}
${TOPICS.map((t) => `          ${link(`/blog/topic/${t.slug}`, `${esc(t.name)} (${entries.filter((e) => topicOf(e.cat) === t).length})`, active === t.slug)}`).join('\n')}
        </nav>`;
}
function pager(n) {
  if (totalPages < 2) return '';
  const nums = Array.from({ length: totalPages }, (_, i) => i + 1).map((k) => k === n
    ? `<li><span aria-current="page">${k}</span></li>`
    : `<li><a href="${pageUrl(k)}" aria-label="Page ${k}">${k}</a></li>`).join('');
  const prev = n > 1 ? `<a class="blog-pager-step" href="${pageUrl(n - 1)}" rel="prev">&larr; Newer guides</a>` : `<span class="blog-pager-step is-off" aria-hidden="true">&larr; Newer guides</span>`;
  const next = n < totalPages ? `<a class="blog-pager-step" href="${pageUrl(n + 1)}" rel="next">Older guides &rarr;</a>` : `<span class="blog-pager-step is-off" aria-hidden="true">Older guides &rarr;</span>`;
  return `        <nav class="blog-pager" aria-label="Guide pages">
          ${prev}
          <ol>${nums}</ol>
          ${next}
        </nav>`;
}
function headLd(list, url, name, rels) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url: `${SITE}${url}`,
    mainEntity: { '@type': 'ItemList', itemListElement: list.map((e, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/blog/${e.slug}`, name: e.title })) },
  };
  return `  <!-- blog:ld -->\n${rels}  <script type="application/ld+json">\n  ${JSON.stringify(ld, null, 2).replace(/\n/g, '\n  ')}\n  </script>\n  <!-- /blog:ld -->\n</head>`;
}
function renderList({ list, url, title, desc, h1, intro, active, pagerHtml, rels }) {
  let html = setHead(template, { title, desc, url });
  html = replaceRegion(html, 'blog:hero', `          <h1>${h1}</h1>\n          <p>\n            ${intro}\n          </p>`);
  html = replaceRegion(html, 'blog:filters', filters(active));
  html = replaceRegion(html, 'blog:new', list.map((e) => e.html).join('\n'));
  html = replaceRegion(html, 'blog:pager', pagerHtml);
  html = html.replace(/\n*[ \t]*<!-- blog:ld -->[\s\S]*?<!-- \/blog:ld -->\n*/, '\n');
  html = html.replace('</head>', headLd(list, url, title, rels));
  return html;
}
const writePage = (url, html) => {
  const file = path.join(ROOT, url.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};
fs.rmSync(path.join(ROOT, 'blog/page'), { recursive: true, force: true });
fs.rmSync(path.join(ROOT, 'blog/topic'), { recursive: true, force: true });

const INTRO = 'Plain-English playbooks on app and software costs, MVPs, mobile apps, ERP and CRM, AI and industry products, written for founders and operators who value execution over fluff.';
for (let n = 1; n <= totalPages; n++) {
  const list = entries.slice((n - 1) * PER_PAGE, n * PER_PAGE);
  const rels = (n > 1 ? `  <link rel="prev" href="${SITE}${pageUrl(n - 1)}">\n` : '') + (n < totalPages ? `  <link rel="next" href="${SITE}${pageUrl(n + 1)}">\n` : '');
  writePage(pageUrl(n), renderList({
    list,
    url: pageUrl(n),
    title: n === 1 ? 'Software Development Guides for Founders | Nihar Ranjan Rout' : `Software Development Guides for Founders, Page ${n} of ${totalPages}`,
    desc: n === 1
      ? 'Practical guides on app costs, MVPs, mobile apps, ERP and CRM, AI and industry products, written by Nihar Ranjan Rout, founder of Creuto.'
      : `Page ${n} of ${totalPages}: practical guides on app costs, MVPs, mobile apps, ERP, CRM and AI, written by Nihar Ranjan Rout, founder of Creuto.`,
    h1: n === 1 ? 'Guides for founders and product teams.' : `Guides for founders and product teams, page ${n}.`,
    intro: INTRO,
    active: n === 1 ? 'all' : '',
    pagerHtml: pager(n),
    rels,
  }));
}
for (const t of TOPICS) {
  const list = entries.filter((e) => topicOf(e.cat) === t);
  writePage(`/blog/topic/${t.slug}`, renderList({
    list,
    url: `/blog/topic/${t.slug}`,
    title: t.title,
    desc: t.desc,
    h1: `${esc(t.name)} guides.`,
    intro: esc(t.desc),
    active: t.slug,
    pagerHtml: '',
    rels: '',
  }));
}

// ---- homepage
const homeFile = path.join(ROOT, 'index.html');
let home = fs.readFileSync(homeFile, 'utf8');
home = replaceRegion(home, 'blog:home', '      ' + homeBlock());
home = home.replace(/Explore all (?:guides &amp; playbooks|\d+ guides)/, `Explore all ${entries.length} guides`);
home = home.replace(/<p class="sec-sub">Plain-English guides on hiring a software team[^<]*<\/p>/, '<p class="sec-sub">Plain-English guides on app costs, MVPs, mobile and web, ERP and CRM, AI and industry products, written for founders and operators.</p>');
fs.writeFileSync(homeFile, home);

console.log(`blog: ${posts.length} guides built, blog index and homepage updated`);
