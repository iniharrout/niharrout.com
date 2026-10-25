#!/usr/bin/env node
/**
 * Generates the "Work with me" pages from scripts/careers/roles.js:
 *   work-with-me/index.html            listing: four role cards (each links to its own page), hiring steps, FAQ
 *   work-with-me/<slug>/index.html     one page per role, with the full description, the form and JobPosting markup
 *
 * Every role has its own page so each job has a crawlable address for search results and Google Jobs.
 * Run through `node scripts/build-all.js`, which also stamps the shared header, footer, analytics and share tags.
 */
const fs = require('fs');
const path = require('path');
const { POSTED, roles, faq } = require('./careers/roles');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'work-with-me');
const { SITE, esc, ARROW, ORG, head, foot, crumbs } = require('./careers/shell');
const { doodle } = require('./site-data/doodles');
const { DETAILS, WORK, OFFER, PROCESS, PROOF } = require('./careers/details');

// Doodle and card tint for each role (scripts/site-data/doodles.js).
const ROLE_ART = {
  'founders-office': ['roadmap', 'sky'],
  'linkedin-content-manager': ['social', 'sun'],
  'graphic-designer': ['design', 'peach'],
  'video-editor': ['media', 'sky'],
  'react-native-developer': ['cross-platform', 'peach'],
  'flutter-developer': ['mobile', 'sky'],
  'full-stack-developer': ['web', 'sun'],
  'ai-engineer': ['ai', 'peach'],
  'qa-engineer': ['check', 'sky'],
  'devops-engineer': ['cloud', 'sun'],
  'ui-ux-designer': ['design', 'sky'],
  'product-manager': ['prd', 'sun'],
  'business-analyst': ['analytics', 'peach'],
  'business-development-executive': ['growth', 'sky'],
  'digital-marketing-executive': ['seo', 'sun'],
  'content-writer': ['doc-scan', 'peach'],
  'software-development-intern': ['custom-software', 'sky'],
  'ui-ux-design-intern': ['prototype', 'sun'],
  'digital-marketing-intern': ['social', 'peach'],
};
const art = (slug) => (ROLE_ART[slug] || ['team', 'sky']);

const kind = (r) => (r.type === 'INTERN' ? 'Internship' : 'Full-time');
const chips = (r) => `<ul class="wwm-chips"><li>Remote</li><li>India</li><li>${kind(r)}</li></ul>`;
// a role stays listed for 90 days from when it was posted; reposting (a new date in roles.js) extends it
const validThrough = (d) => { const x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + 90); return x.toISOString().slice(0, 10); };
const salaryLd = (s) => (s ? { '@type': 'MonetaryAmount', currency: 'INR', value: { '@type': 'QuantitativeValue', minValue: s.min, maxValue: s.max, unitText: s.unit || 'YEAR' } } : undefined);
const GUIDES = ['react-native-interview-questions', 'flutter-interview-questions', 'react-interview-questions', 'node-js-interview-questions', 'how-to-become-an-ai-engineer', 'how-to-become-a-product-manager', 'ui-ux-designer-portfolio-tips', 'software-developer-resume-for-freshers', 'how-to-get-a-remote-software-job-from-india', 'how-to-get-a-software-internship-in-india'];
const DEPTS = ['Engineering', 'Design and product', 'Sales and marketing', 'Founder\u2019s team', 'Internships'];

// The two lists on a role page: what the job involves and who fits it.
function detail(role) {
  return `<div class="wwm-d-cols">
    <section class="wwm-d-card">
      <span class="wwm-d-ico" aria-hidden="true">${doodle('roadmap', 'doodle', 'blue')}</span>
      <h2>What you’ll do</h2>
      <ul>
${role.does.map((t) => `        <li>${esc(t)}</li>`).join('\n')}
      </ul>
    </section>
    <section class="wwm-d-card">
      <span class="wwm-d-ico" aria-hidden="true">${doodle('senior', 'doodle', 'coral')}</span>
      <h2>Who I’m looking for</h2>
      <ul>
${role.looks.map((t) => `        <li>${esc(t)}</li>`).join('\n')}
      </ul>
    </section>
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

// ---------- Listing ----------
function listing() {
  const url = `${SITE}/work-with-me`;
  const title = 'Remote Tech Jobs and Internships in India | Nihar Ranjan Rout';
  const description = `${roles.length} remote jobs and internships in India at Creuto: React Native, Flutter, full stack, AI, QA, DevOps, design, product, marketing and sales roles.`;
  const graph = [
    { '@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: 'Careers: Work With Nihar Ranjan Rout', description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${SITE}/#person` } },
    crumbs([['Home', `${SITE}/`], ['Work With Me', url]]),
    { '@type': 'ItemList', name: 'Open roles', itemListElement: roles.map((r, i) => ({ '@type': 'ListItem', position: i + 1, name: r.title, url: `${url}/${r.slug}` })) },
    { '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];

  const dslug = (d) => d.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
  const row = (r) => `          <li class="job-row">
            <a class="job-link" href="/work-with-me/${r.slug}">
              <span class="job-ico" style="--tint:var(--d-${art(r.slug)[1]})" aria-hidden="true">${doodle(art(r.slug)[0])}</span>
              <span class="job-main"><strong class="job-title">${esc(r.title)}</strong><span class="job-sub">${esc(r.short)}</span></span>
              <span class="job-tags"><span>Remote</span><span>India</span><span class="${r.type === 'INTERN' ? 'is-intern' : ''}">${kind(r)}</span></span>
              <span class="job-go">Apply ${ARROW}</span>
            </a>
          </li>`;
  const groups = DEPTS.map((d) => roles.filter((r) => r.dept === d)).filter((list) => list.length);
  const filters = `<div class="job-filters" role="group" aria-label="Filter roles by team">
        <button type="button" class="is-on" data-filter="all" aria-pressed="true">All roles <span>${roles.length}</span></button>
${groups.map((list) => `        <button type="button" data-filter="${dslug(list[0].dept)}" aria-pressed="false">${esc(list[0].dept)} <span>${list.length}</span></button>`).join('\n')}
      </div>`;
  const cards = groups.map((list) => `      <div class="job-group" data-dept="${dslug(list[0].dept)}">
        <h3 class="job-group-h">${esc(list[0].dept)} <span>${list.length} ${list.length === 1 ? 'role' : 'roles'}</span></h3>
        <ul class="job-list">
${list.map(row).join('\n')}
        </ul>
      </div>`).join('\n');


  const faqHtml = faq.map(([q, a]) => `        <details class="wwm-q">
          <summary>${esc(q)}</summary>
          <p>${esc(a)}</p>
        </details>`).join('\n');

  return head({ title, description, canonical: url, graph }) + `
<main id="top">
  <section class="wwm-hero wwm-hero-careers">
    <div class="wwm-wrap wwm-careers-grid">
      <div>
        <p class="wwm-pill"><span class="wwm-dot"></span>Careers at Creuto &middot; ${roles.length} open roles</p>
        <h1>Work with me.</h1>
        <p class="wwm-sub">${roles.length} remote roles and internships are open to people across India, in engineering, design and product, sales and marketing, and my own team. You work with me directly, on real products for real clients.</p>
        <div class="wwm-cta-row"><a class="wwm-btn is-primary" href="#roles">See open roles ${ARROW}</a></div>
        <div class="wwm-by">
          <img src="/assets/nihar-avatar.jpg" width="96" height="96" alt="Nihar Ranjan Rout">
          <span><strong>Nihar Ranjan Rout</strong>Founder &amp; CEO, Creuto</span>
        </div>
      </div>
      <div class="wwm-hero-art" aria-hidden="true">${doodle('team')}</div>
    </div>
  </section>

  <section class="wwm-perks" aria-label="What working here looks like">
    <div class="wwm-wrap">
      <ul class="wwm-perk-list">
${[
    ['remote', 'Remote, anywhere in India', 'Work from your own city. Every role is open to people based anywhere in India.'],
    ['calendar', 'Full-time roles and internships', 'Full-time positions, not freelance gigs, plus internships for students and recent graduates.'],
    ['chat', 'Work directly with me', 'No layers in between: you work with me and the team on real products for real clients.'],
  ].map(([d, t, p]) => `        <li><span class="wwm-perk-art" aria-hidden="true">${doodle(d)}</span><div><h3>${t}</h3><p>${p}</p></div></li>`).join('\n')}
      </ul>
    </div>
  </section>

  <section class="wwm-roles" id="roles" aria-labelledby="roles-title">
    <div class="wwm-wrap">
      <div class="job-head">
        <h2 class="wwm-h2" id="roles-title">Open roles</h2>
        <p>All roles are remote and open to people anywhere in India.</p>
      </div>
      ${filters}
${cards}
      <script>
        (function () {
          var btns = document.querySelectorAll('.job-filters button');
          var groups = document.querySelectorAll('.job-group');
          btns.forEach(function (b) {
            b.addEventListener('click', function () {
              var f = b.getAttribute('data-filter');
              btns.forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
              groups.forEach(function (g) { g.hidden = f !== 'all' && g.getAttribute('data-dept') !== f; });
            });
          });
        })();
      </script>
    </div>
  </section>

  <section class="wwm-steps" aria-labelledby="steps-title">
    <div class="wwm-wrap">
      <h2 class="wwm-h2" id="steps-title">How hiring works</h2>
      <ol class="wwm-step-list">
${[
    ['prd', 'Pick a role', 'Open a role and read what you would do and who I am looking for.'],
    ['email', 'Apply on the page', 'The form asks for your contact details, your LinkedIn profile and a link to your work.'],
    ['call', 'I get in touch', 'Applications come to me directly. If one looks like a fit, I reach out by email or WhatsApp.'],
  ].map(([d, t, p], i) => `        <li><span class="wwm-step-art" aria-hidden="true">${doodle(d)}</span><span class="wwm-step-n">Step ${i + 1}</span><h3>${t}</h3><p>${p}</p></li>`).join('\n')}
      </ol>
    </div>
  </section>

  <section class="wwm-steps wwm-guides" aria-labelledby="guides-title">
    <div class="wwm-wrap">
      <h2 class="wwm-h2" id="guides-title">Career guides</h2>
      <ul class="wwm-cards wwm-cards-links">
${GUIDES.map((s) => { const g = require('./blog/' + s); return `        <li class="wwm-c"><a href="/blog/${s}"><span class="wwm-c-n">Career guide</span><h3>${esc(g.shortTitle.charAt(0).toUpperCase() + g.shortTitle.slice(1))}</h3><p>${esc(g.cardDesc)}</p><span class="wwm-c-go">Read the guide</span></a></li>`; }).join('\n')}
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
` + foot();
}

// ---------- Role pages ----------
const fmt = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const list = (items) => `<ul class="jd-list">${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
function roleFaq(role) {
  const intern = role.type === 'INTERN';
  return [
    [`Is the ${role.title} role remote?`, `Yes. It is fully remote and open to people based anywhere in India.`],
    [intern ? 'Is this an internship or a full-time job?' : 'Is this a full-time role?', intern ? 'This is an internship for students and recent graduates, with real project work and regular feedback.' : 'Yes. This is a full-time position, not freelance or contract work.'],
    ['What should I include in my application?', `Your contact details, your LinkedIn profile and ${PROOF[role.dept] || 'a link to your work'}, plus a few honest lines about why this role suits you.`],
    ['What happens after I apply?', 'Applications come to me directly. If yours looks like a fit, I get in touch by email or WhatsApp to arrange a conversation.'],
  ];
}

function rolePage(role) {
  const url = `${SITE}/work-with-me/${role.slug}`;
  const description = role.seoDescription;
  const d = DETAILS[role.slug] || { about: '', more: [], must: [], nice: [], skills: role.tags };
  const posted = role.posted || POSTED;
  const until = validThrough(posted);
  const doesAll = [...role.does, ...(d.more || [])];
  const skills = d.skills && d.skills.length ? d.skills : role.tags;
  const work = WORK[role.dept] || [];
  const faqs = roleFaq(role);
  const guide = d.guide ? require('./blog/' + d.guide) : null;
  const html = `<p>${esc(role.summary)}</p>${d.about ? `<p>${esc(d.about)}</p>` : ''}<h3>What you will do</h3><ul>${doesAll.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>${d.must && d.must.length ? `<h3>What you will need</h3><ul>${d.must.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}${d.nice && d.nice.length ? `<h3>Nice to have</h3><ul>${d.nice.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}<h3>About you</h3><ul>${role.looks.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><h3>What we offer</h3><ul>${OFFER.map(([a, b]) => `<li>${esc(a)}: ${esc(b)}</li>`).join('')}</ul><p>This is ${role.type === 'INTERN' ? 'a remote internship' : 'a full-time remote role'} open to people anywhere in India.</p>`;
  const graph = [
    {
      '@type': 'JobPosting',
      '@id': `${url}#job`,
      title: role.title,
      description: html,
      datePosted: posted,
      validThrough: until,
      employmentType: role.type || 'FULL_TIME',
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'India' },
      hiringOrganization: ORG,
      directApply: true,
      industry: 'Software Development',
      occupationalCategory: role.dept,
      responsibilities: doesAll.join('. ') + '.',
      ...(d.must && d.must.length ? { qualifications: d.must.join('. ') + '.' } : {}),
      skills: skills.join(', '),
      jobBenefits: OFFER.map(([a]) => a).join(', '),
      ...(role.salary ? { baseSalary: salaryLd(role.salary) } : {}),
      url,
    },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: role.seoTitle, description, isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': `${url}#job` } },
    crumbs([['Home', `${SITE}/`], ['Work With Me', `${SITE}/work-with-me`], [role.title, url]]),
    { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ];
  const sameTeam = roles.filter((r) => r.slug !== role.slug && r.dept === role.dept);
  const others = (sameTeam.length >= 3 ? sameTeam : [...sameTeam, ...roles.filter((r) => r.slug !== role.slug && r.dept !== role.dept)]).slice(0, 6);
  const facts = [['Team', role.dept], ['Location', 'Remote, India'], ['Type', kind(role)], ['Posted', fmt(posted)], ['Apply by', fmt(until)]];

  return head({ title: role.seoTitle, description, canonical: url, graph }) + `
<main id="top" class="jd">
  <section class="jd-hero" style="--tint:var(--d-${art(role.slug)[1]})">
    <div class="wwm-wrap jd-hero-grid">
      <div>
        <nav class="wwm-crumbs" aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><a href="/work-with-me">Careers</a><span aria-hidden="true">/</span><span aria-current="page">${esc(role.title)}</span>
        </nav>
        <p class="jd-team">${esc(role.dept)}</p>
        <h1 class="jd-title">${esc(role.title)}</h1>
        <p class="jd-sum">${esc(role.summary)}</p>
        <ul class="jd-meta"><li>Remote, India</li><li>${kind(role)}</li><li>Posted ${fmt(posted)}</li></ul>
        <div class="wwm-cta-row"><a class="wwm-btn is-primary" href="#apply">Apply for this role ${ARROW}</a><a class="wwm-btn" href="/work-with-me">All open roles</a></div>
      </div>
      <div class="jd-art" aria-hidden="true">${doodle(art(role.slug)[0])}</div>
    </div>
  </section>

  <div class="wwm-wrap jd-body">
    <article class="jd-main">
      <section class="jd-sec">
        <h2>About the role</h2>
        <p>${esc(role.summary)}</p>
        ${d.about ? `<p>${esc(d.about)}</p>` : ''}
      </section>
      <section class="jd-sec">
        <h2>What you&rsquo;ll do</h2>
        ${list(doesAll)}
      </section>
      ${d.must && d.must.length ? `<section class="jd-sec">
        <h2>What you&rsquo;ll need</h2>
        ${list(d.must)}
      </section>` : ''}
      ${d.nice && d.nice.length ? `<section class="jd-sec">
        <h2>Nice to have</h2>
        ${list(d.nice)}
      </section>` : ''}
      <section class="jd-sec">
        <h2>About you</h2>
        ${list(role.looks)}
      </section>
      <section class="jd-sec">
        <h2>Skills</h2>
        <ul class="jd-skills">${skills.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      </section>
      ${work.length ? `<section class="jd-sec">
        <h2>What you&rsquo;ll work on</h2>
        ${list(work)}
      </section>` : ''}
      <section class="jd-sec">
        <h2>What we offer</h2>
        <ul class="jd-offer">${OFFER.map(([a, b]) => `<li><strong>${esc(a)}</strong><span>${esc(b)}</span></li>`).join('')}</ul>
      </section>
      <section class="jd-sec">
        <h2>How hiring works</h2>
        <ol class="jd-steps">${PROCESS.map(([a, b]) => `<li><strong>${esc(a)}</strong><span>${esc(b)}</span></li>`).join('')}</ol>
      </section>
      <section class="jd-sec jd-apply" id="apply" aria-labelledby="apply-title">
        <h2 id="apply-title">Apply for this role</h2>
        <p class="jd-apply-sub">Your application for the ${esc(role.title)} role is sent to me directly.</p>
        ${form(role.apply).replace(/\n/g, '\n        ')}
      </section>
      <section class="jd-sec">
        <h2>Questions about this role</h2>
        <div class="wwm-qs">
${faqs.map(([q, a]) => `          <details class="wwm-q"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
        </div>
      </section>
    </article>

    <aside class="jd-side">
      <div class="jd-card">
        <h2>Job details</h2>
        <dl>${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        <a class="wwm-btn is-primary jd-card-btn" href="#apply">Apply for this role ${ARROW}</a>
        <p class="jd-card-note">Applications go to Nihar Ranjan Rout directly.</p>
      </div>
      ${guide ? `<a class="jd-guide" href="/blog/${d.guide}"><span>Career guide</span><strong>${esc(guide.title)}</strong></a>` : ''}
    </aside>
  </div>

  <section class="jd-more" aria-labelledby="more-title">
    <div class="wwm-wrap">
      <h2 class="wwm-h3" id="more-title">More open roles</h2>
      <ul class="job-list">
${others.map((r) => `        <li class="job-row"><a class="job-link" href="/work-with-me/${r.slug}"><span class="job-ico" style="--tint:var(--d-${art(r.slug)[1]})" aria-hidden="true">${doodle(art(r.slug)[0])}</span><span class="job-main"><strong class="job-title">${esc(r.title)}</strong><span class="job-sub">${esc(r.short)}</span></span><span class="job-tags"><span>${esc(r.dept)}</span><span>${kind(r)}</span></span><span class="job-go">View ${ARROW}</span></a></li>`).join('\n')}
      </ul>
      <p class="jd-all"><a class="wwm-btn" href="/work-with-me">See all ${roles.length} open roles</a></p>
    </div>
  </section>

  <div class="jd-sticky"><a class="wwm-btn is-primary" href="#apply">Apply for this role ${ARROW}</a></div>
</main>
` + foot(['/assets/lead-forms.js?v=blue7']);
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'index.html'), listing());
for (const role of roles) {
  const dir = path.join(OUT, role.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), rolePage(role));
}
console.log(`careers: listing and ${roles.length} role pages written`);
