#!/usr/bin/env node
/**
 * Homepage sections that help it rank: industries, technologies, the founder (for searches on Nihar Ranjan Rout),
 * and where we work (Bhubaneswar, Indian cities, countries). Each links with descriptive anchor text to the
 * keyword-led landing pages. Also adds keyword FAQs to the homepage FAQ list and its FAQPage data.
 * Sections sit between <!-- home:<name> --> markers in index.html, so reruns replace them.
 * Run through `node scripts/build-all.js` (after build-blog.js and build-services-pages.js).
 */
const fs = require('fs');
const path = require('path');
const { industries } = require('./site-data/industries');
const { countries } = require('./site-data/countries');
const { flag } = require('./site-data/flags');
const { doodle } = require('./site-data/doodles');
const KW = require('./site-data/keywords');

const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'index.html');
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ARROW = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// ---- industries: the twelve most searched sectors, anchor text = the page's keyword
const TOP = ['healthcare', 'fintech', 'ecommerce', 'education', 'real-estate', 'logistics', 'on-demand', 'restaurant', 'fitness-wellness', 'manufacturing', 'saas', 'travel-hospitality'];
const anchor = (slug) => KW.INDUSTRY[slug].replace(/ Company( in)? India$/, '').replace(/ Company$/, '');
const industriesSection = () => `    <section class="home-ind ed-section" id="industries" aria-labelledby="industries-title">
      <div class="wrap">
        <header class="ed-head">
          <p class="ed-label">Industries</p>
          <h2 class="section-title" id="industries-title">Software and app development for your industry.</h2>
          <p>Products shaped around how your sector works, its users, rules and day-to-day operations, built by one founder-led team in India.</p>
        </header>
        <ul class="home-ind-grid">
${TOP.map((slug) => { const i = industries.find((x) => x.slug === slug); return `          <li><a href="/industries/${slug}"><span class="home-ind-art" aria-hidden="true">${doodle(slug)}</span><span><strong>${esc(anchor(slug))}</strong><small>${esc(i.short)}</small></span></a></li>`; }).join('\n')}
        </ul>
        <p class="home-more"><a href="/industries" class="link-arrow">See all ${industries.length} industries ${ARROW}</a></p>
      </div>
    </section>`;

// ---- technologies: each links to the service page for it
const TECH = [
  ['React Native', '/services/mobile-app-development/react-native-app-development'],
  ['Flutter', '/services/mobile-app-development/flutter-app-development'],
  ['Swift and iOS', '/services/mobile-app-development/ios-app-development'],
  ['Kotlin and Android', '/services/mobile-app-development/android-app-development'],
  ['React and Next.js', '/services/web-application-development/customized-web-development'],
  ['Progressive web apps', '/services/web-application-development/pwa-development'],
  ['Node.js and Python', '/services/custom-software-development/enterprise-application-development'],
  ['OpenAI and LLMs', '/services/ai-product-development/chatgpt-solutions'],
  ['RAG and AI agents', '/services/ai-product-development/generative-ai'],
  ['AWS, Azure and Google Cloud', '/services/devops-cloud-engineering/cloud-consulting'],
  ['Kubernetes', '/services/devops-cloud-engineering/kubernetes-implementation'],
  ['CI/CD pipelines', '/services/devops-cloud-engineering/ci-cd-implementation'],
];
const techSection = () => `    <section class="home-tech ed-section" id="technology" aria-labelledby="technology-title">
      <div class="wrap home-tech-in">
        <header class="ed-head">
          <p class="ed-label">Technology</p>
          <h2 class="section-title" id="technology-title">The technology we build with.</h2>
          <p>Proven, well-supported tools chosen for your product, your team and how it will grow. See the full <a href="/technology">technology stack</a>.</p>
        </header>
        <ul class="home-tech-list">
${TECH.map(([name, href]) => `          <li><a href="${href}">${esc(name)}</a></li>`).join('\n')}
        </ul>
      </div>
    </section>`;

// ---- founder: entity facts for searches on the name
const founderSection = () => `    <section class="home-founder ed-section" id="about-nihar" aria-labelledby="about-nihar-title">
      <div class="wrap home-founder-in">
        <figure class="home-founder-photo">
          <img src="/assets/nihar-office-900.jpg" srcset="/assets/nihar-office-480.jpg 480w, /assets/nihar-office-900.jpg 1000w" sizes="(max-width: 900px) 92vw, 520px" width="1000" height="750" alt="Nihar Ranjan Rout, founder and CEO of Creuto, at the Creuto office in Bhubaneswar" loading="lazy" decoding="async">
        </figure>
        <div class="home-founder-copy">
          <p class="ed-label">About the founder</p>
          <h2 class="section-title" id="about-nihar-title">Meet Nihar Ranjan Rout, founder and CEO of Creuto.</h2>
          <p>Nihar Ranjan Rout founded Creuto, a software, mobile app and AI development company headquartered in Bhubaneswar, Odisha. Over 8+ years in product leadership, Nihar has shipped 50+ products, from custom ERPs for manufacturers to consumer booking apps and quick commerce platforms.</p>
          <p>Every project starts with Nihar: a free call, a written plan, and the same person accountable from the PRD to launch. Creuto is an OpenAI Select Partner and rated 5.0 on Clutch from 16 verified reviews.</p>
          <ul class="home-founder-facts">
            <li><strong>8+ years</strong><span>in product leadership</span></li>
            <li><strong>50+</strong><span>products shipped</span></li>
            <li><strong>5.0</strong><span>on Clutch, 16 reviews</span></li>
            <li><strong>OpenAI</strong><span>Select Partner</span></li>
          </ul>
          <p class="home-founder-links"><a href="/about" class="link-arrow">Read Nihar&rsquo;s story ${ARROW}</a><a href="https://www.linkedin.com/in/iniharrout" target="_blank" rel="noopener">LinkedIn</a><a href="/about/facts">Company fact sheet</a></p>
        </div>
      </div>
    </section>`;

// ---- where we work: Bhubaneswar, Indian cities, countries
const LOCAL = [
  ['Software development company in Bhubaneswar', '/software-development-company-bhubaneswar'],
  ['App development company in Bhubaneswar', '/mobile-app-development-bhubaneswar'],
  ['Web development company in Bhubaneswar', '/web-development-company-bhubaneswar'],
  ['ERP software development in Bhubaneswar', '/erp-software-development-bhubaneswar'],
  ['AI development company in Bhubaneswar', '/ai-product-development-bhubaneswar'],
];
const CITIES = [['Bangalore', '/locations/bangalore'], ['Hyderabad', '/locations/hyderabad'], ['Pune', '/locations/pune'], ['Delhi NCR', '/locations/delhi-ncr'], ['Cuttack', '/locations/cuttack'], ['Rourkela', '/locations/rourkela'], ['Sambalpur', '/locations/sambalpur'], ['Berhampur', '/locations/berhampur']];
const abroad = countries.filter((c) => !c.home && c.footer !== false);
const locationsSection = () => `    <section class="home-where ed-section" id="where-we-work" aria-labelledby="where-title">
      <div class="wrap">
        <header class="ed-head">
          <p class="ed-label">Where we work</p>
          <h2 class="section-title" id="where-title">A software development company in Bhubaneswar, building for India and the world.</h2>
          <p>Headquartered in Bhubaneswar, Odisha, working with startups and businesses across India and in other countries, with calls planned around your working day.</p>
        </header>
        <div class="home-where-grid">
          <div class="home-where-col">
            <h3>Bhubaneswar, Odisha</h3>
            <ul class="home-where-links">
${LOCAL.map(([t, h]) => `              <li><a href="${h}">${esc(t)}</a></li>`).join('\n')}
            </ul>
          </div>
          <div class="home-where-col">
            <h3>Across India</h3>
            <p><a href="/countries/india">Software development company in India</a>, working with businesses in:</p>
            <ul class="home-where-pills">
${CITIES.map(([t, h]) => `              <li><a href="${h}">${esc(t)}</a></li>`).join('\n')}
            </ul>
          </div>
          <div class="home-where-col">
            <h3>Worldwide</h3>
            <ul class="home-where-countries">
${abroad.map((c) => `              <li><a href="/countries/${c.slug}">${flag(c.code, 'home-flag')}<span>${esc(c.name.length > 14 ? c.short : c.name)}</span></a></li>`).join('\n')}
            </ul>
          </div>
        </div>
      </div>
    </section>`;

// ---- keyword FAQs (added after the first question, mirrored in the FAQPage data)
const FAQ = [
  ['Who is Nihar Ranjan Rout?', 'Nihar Ranjan Rout is the founder and CEO of Creuto, a software, mobile app and AI development company headquartered in Bhubaneswar, Odisha, India. Nihar has 8+ years in product leadership, has shipped 50+ products and works directly with every client, from the first call to launch.'],
  ['Is Creuto a software development company in India?', 'Yes. Creuto is a founder-led software, mobile app and AI development company in India, headquartered in Bhubaneswar. We build for startups and businesses across India and in countries such as the USA, UAE, Australia and Singapore.'],
  ['What does Creuto build?', 'Mobile apps for Android and iOS (native, React Native and Flutter), web applications and websites, custom software such as ERP and CRM systems, AI products such as chatbots, RAG assistants and agents, and the cloud and DevOps setup to run them.'],
  ['How much does app development cost in India?', 'It depends on the features, platforms and integrations you need. Use the free app timeline calculator to see how long it takes, or book a call and get a written proposal within 24 hours. After a free 30-minute call you get a written proposal within 24 hours.'],
];
const faqItem = ([q, a]) => `          <div class="faq-item-minimal" data-home-seo-faq>
            <button class="faq-question-btn" aria-expanded="false">
              <span>${esc(q)}</span>
              <span class="faq-toggle-sign" aria-hidden="true">+</span>
            </button>
            <div class="faq-answer-pane">
              ${esc(a)}
            </div>
          </div>
`;

// ---- write
let html = fs.readFileSync(FILE, 'utf8');
function region(name, content, beforeMarker) {
  const re = new RegExp(`[ \\t]*<!-- home:${name} -->[\\s\\S]*?<!-- /home:${name} -->\\n?`);
  const block = `    <!-- home:${name} -->\n${content}\n    <!-- /home:${name} -->\n`;
  if (re.test(html)) { html = html.replace(re, () => block); return; }
  const at = html.indexOf(beforeMarker);
  if (at < 0) throw new Error('anchor not found for ' + name + ': ' + beforeMarker);
  const lineStart = html.lastIndexOf('\n', at) + 1;
  html = html.slice(0, lineStart) + block + '\n' + html.slice(lineStart);
}
region('industries', industriesSection(), '<section class="portfolio-section ed-section" id="portfolio">');
region('technology', techSection(), '<section class="portfolio-section ed-section" id="portfolio">');
region('founder', founderSection(), '<section class="fit" id="fit"');
region('where', locationsSection(), '<section class="faq-section ed-section faq2" id="faq">');

// FAQ list: remove earlier copies, add after the first item
html = html.replace(/[ \t]*<div class="faq-item-minimal" data-home-seo-faq>[\s\S]*?<\/div>\n[ \t]*<\/div>\n/g, '');
const firstEnd = html.indexOf('</div>\n          </div>\n', html.indexOf('<div class="faq-item-minimal open">'));
if (firstEnd < 0) throw new Error('first FAQ item not found');
const insertAt = firstEnd + '</div>\n          </div>\n'.length;
html = html.slice(0, insertAt) + FAQ.map(faqItem).join('') + html.slice(insertAt);

// FAQPage data: keep it in step with the visible list (edit only the JSON-LD block whose type is FAQPage)
html = html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (m, a, json, c) => {
  let data;
  try { data = JSON.parse(json); } catch (e) { return m; }
  if (data['@type'] !== 'FAQPage') return m;
  const names = new Set(FAQ.map(([q]) => q));
  const rest = data.mainEntity.filter((x) => !names.has(x.name));
  data.mainEntity = [rest[0], ...FAQ.map(([q, ans]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ans } })), ...rest.slice(1)];
  return `${a}\n  ${JSON.stringify(data, null, 2).replace(/\n/g, '\n  ')}\n  ${c}`;
});

fs.writeFileSync(FILE, html);
console.log('home seo: industries, technology, founder and where-we-work sections, ' + FAQ.length + ' FAQs');
