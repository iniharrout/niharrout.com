/**
 * Markup for the animated hero demos (styled and animated by assets/hero-demo.css, pure CSS).
 *   card(kind): the looping demo card. kind = ai | mobile | web | software | strategy
 *   bar(kind):  the slim typing prompt bar for pages with no room for the card. kind = ai | mobile | software | hub
 * Every demo shows the same three beats: a prompt, three phases with a status pill, and a progress bar.
 * The content is sample data and is labelled as an illustration in the caption.
 */
const ai = require('./ai-hero');

const SPARK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.1 5.9 5.9 2.1-5.9 2.1L12 18.5l-2.1-5.9L4 10.5l5.9-2.1z" fill="currentColor"/><path d="M19 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="currentColor" opacity=".7"/></svg>';
const TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const L = 'abcd';

const checks = (items) => `<ul class="aix-checks">${items.map((t, i) => `<li class="aix-r${L[i]}"><span class="aix-tick">${TICK}</span>${t}</li>`).join('')}</ul>`;
const rows = (items) => `<ul class="aix-rows">${items.map(([t, tag, later], i) => `<li class="aix-r${L[i]}"><span class="aix-dot"></span>${t}<span class="aix-tag${later ? ' is-later' : ''}">${tag}</span></li>`).join('')}</ul>`;
const kv = (items) => `<ul class="aix-rows aix-kv">${items.map(([k, v], i) => `<li class="aix-r${L[i]}"><span class="aix-k">${k}</span><span class="aix-v">${v}</span></li>`).join('')}</ul>`;

const phase = (n, no, pill, sub, body, done) => `<div class="aix-phase aix-p${n}">
                  <header><span class="aix-no">${no}</span><span class="aix-pill${done ? ' is-done' : ''}"><i></i>${pill}</span></header>
                  ${sub ? `<p class="aix-sub">${sub}</p>` : ''}
                  ${body}
                </div>`;

const shell = ({ label, text, phases, steps, caption }) => `<figure class="aix">
            <div class="aix-panel">
              <span class="aix-glow aix-glow-a" aria-hidden="true"></span>
              <span class="aix-glow aix-glow-b" aria-hidden="true"></span>
              <div class="aix-ask">
                <span class="aix-ico">${SPARK}</span>
                <div class="aix-ask-body">
                  <span class="aix-label">${label}</span>
                  <span class="aix-type" style="--n:${text.length}">${text}</span>
                </div>
              </div>
              <span class="aix-wire" aria-hidden="true"><i></i></span>
              <div class="aix-stage">
                ${phases.join('\n                ')}
              </div>
              <ol class="aix-steps" aria-hidden="true">
                ${steps.map((s, i) => `<li class="aix-s${i + 1}"><i></i><span>${s}</span></li>`).join('\n                ')}
              </ol>
            </div>
            <figcaption class="aix-cap">${caption}</figcaption>
          </figure>`;

const screens = (names) => `<div class="aix-screens">${names.map((n, i) => `<div class="aix-screen aix-r${L[i]}"><b></b><i></i><u></u><u></u><span>${n}</span></div>`).join('')}</div>`;

const demos = {
  mobile: () => shell({
    label: 'Describe your app',
    text: 'Delivery app for local shops',
    caption: 'Illustration with sample data: how an idea becomes a launched app.',
    steps: ['Design', 'Build', 'Test', 'Launch'],
    phases: [
      phase(1, '/01 Design', 'Designing', 'Key screens drawn and tested before any code.', screens(['Home', 'Order', 'Track'])),
      phase(2, '/02 Build', 'Building', 'iOS and Android from one codebase.', checks(['Sign-in and payments', 'Push notifications', 'Live order tracking', 'Works on slow networks'])),
      phase(3, '/03 Launch', 'Live', 'Submitted, approved and in the stores.', checks(['App Store: approved', 'Google Play: approved', 'First version in about 4 weeks']), true),
    ],
  }),
  web: () => shell({
    label: 'Describe your web app',
    text: 'Client portal for logistics',
    caption: 'Illustration with sample data: how an idea becomes a live web app.',
    steps: ['Plan', 'Build', 'Test', 'Live'],
    phases: [
      phase(1, '/01 Plan', 'Planning', 'Roles, screens and data agreed before building.', rows([['Admin dashboard', 'Launch'], ['Customer login', 'Launch'], ['Shipment tracking', 'Launch'], ['Invoices and reports', 'Later', true]])),
      phase(2, '/02 Build', 'Building', 'The product takes shape and is reviewed as it grows.', `<div class="aix-browser"><div class="aix-browser-bar"><i></i><i></i><i></i><span>app.yourcompany.com</span></div><div class="aix-browser-body"><div class="aix-side"><i></i><i></i><i></i><i></i></div><div class="aix-main"><div class="aix-tiles"><div class="aix-tile aix-ra"><strong>128</strong>Shipments</div><div class="aix-tile aix-rb"><strong>96%</strong>On time</div></div><div class="aix-line aix-rc"><i class="aix-fill" style="--v:.86"></i></div><div class="aix-line aix-rd"><i class="aix-fill" style="--v:.62"></i></div></div></div></div>`),
      phase(3, '/03 Live', 'Live', 'Tested, secured and running on your own cloud.', checks(['Automated tests pass', 'Security checks pass', 'Deployed to your cloud account', 'Code in your own repository']), true),
    ],
  }),
  software: () => shell({
    label: 'Describe the problem',
    text: 'Replace our spreadsheets',
    caption: 'Illustration with sample data: how a manual process becomes a custom system.',
    steps: ['Map', 'Build', 'Test', 'Switch'],
    phases: [
      phase(1, '/01 Map', 'Mapping', 'Your real workflows, drawn before anything is built.', rows([['Orders', 'Mapped'], ['Inventory', 'Mapped'], ['Billing', 'Mapped'], ['Reports', 'Mapped']])),
      phase(2, '/02 Build', 'Building', 'One module at a time, each tested with your team.', `<div class="aix-modules">${['Orders', 'Inventory', 'Billing', 'Reports'].map((m, i) => `<div class="aix-mod aix-r${L[i]}"><span class="aix-tick">${TICK}</span>${m}</div>`).join('')}</div>`),
      phase(3, '/03 Switch', 'Live', 'Old and new run side by side, then you switch.', checks(['Data migrated and verified', 'Old and new run in parallel', 'Team trained before switch-over']), true),
    ],
  }),
  strategy: () => shell({
    label: 'Describe your idea',
    text: 'Marketplace for local tutors',
    caption: 'Illustration with sample data: how an idea becomes a scoped plan.',
    steps: ['Define', 'Prioritise', 'Write', 'Estimate'],
    phases: [
      phase(1, '/01 Define', 'Defining', 'Who it is for and the one thing it must do.', kv([['Users', 'Students and local tutors'], ['Core action', 'Book a lesson'], ['Success', 'Repeat bookings']])),
      phase(2, '/02 Prioritise', 'Prioritising', 'Build what proves demand first. Park the rest.', `<div class="aix-lanes"><div class="aix-lane"><h5>Build first</h5><div class="aix-chip aix-ra">Search tutors</div><div class="aix-chip aix-rb">Book and pay</div></div><div class="aix-lane is-later"><h5>Later (V2)</h5><div class="aix-chip aix-rc">Reviews</div><div class="aix-chip aix-rd">Group classes</div></div></div>`),
      phase(3, '/03 PRD ready', 'Ready', 'The plan your developers and investors can read.', checks(['Scope and user stories', 'Screens and flows', 'Milestones and estimate', 'Proposal within 24 hours']), true),
    ],
  }),
  startup: () => shell({
    label: 'Describe your product',
    text: 'B2B tool for freight brokers',
    caption: 'Illustration with sample data: how a startup idea becomes a first release.',
    steps: ['Scope', 'Build', 'Demo', 'Launch'],
    phases: [
      phase(1, '/01 Scope', 'Scoping', 'Only what proves demand goes into the first release.', rows([['Broker dashboard', 'Launch'], ['Carrier onboarding', 'Launch'], ['Quote requests', 'Launch'], ['Analytics', 'Later', true]])),
      phase(2, '/02 Build', 'Building', 'Short sprints, with working software after each one.', checks(['Sprint 1: sign-in and roles', 'Sprint 2: quotes and bookings', 'Sprint 3: carrier portal', 'Demo after every sprint'])),
      phase(3, '/03 Launch', 'Live', 'The first release, in front of real customers.', checks(['First version in about 4 weeks', 'Code in your own GitHub from day one', 'Tested and deployed', '60-day post-launch warranty']), true),
    ],
  }),
  stack: () => shell({
    label: 'Ask about your stack',
    text: 'Which stack fits my app?',
    caption: 'Illustration with sample data: how technology choices are made.',
    steps: ['Match', 'Compare', 'Prove', 'Run'],
    phases: [
      phase(1, '/01 Match', 'Matching', 'Tools picked for the problem, not the resume.', rows([['Web app', 'Next.js'], ['Mobile app', 'React Native'], ['Data', 'PostgreSQL'], ['AI features', 'Python and APIs']])),
      phase(2, '/02 Check', 'Checking', 'Every choice checked against what you need.', checks(['Fast enough for your users', 'Easy to hire for later', 'Secure by default', 'Sensible running costs'])),
      phase(3, '/03 Run', 'Live', 'Built, tested and watched in production.', checks(['Automated tests on every change', 'Automated deployments', 'Monitoring and alerts', 'Code you own']), true),
    ],
  }),
  costs: () => shell({
    label: 'Ask about cost',
    text: 'What will my app cost?',
    caption: 'Illustration with sample data: how a cost range is built.',
    steps: ['List', 'Size', 'Plan', 'Range'],
    phases: [
      phase(1, '/01 List', 'Listing', 'Every feature written down, nothing assumed.', rows([['Sign-in and profiles', 'Core'], ['Payments', 'Core'], ['Admin dashboard', 'Core'], ['In-app chat', 'Later', true]])),
      phase(2, '/02 Size', 'Sizing', 'Each feature sized by effort and risk.', `<ul class="aix-sizes">${[['Sign-in', '.35'], ['Payments', '.8'], ['Dashboard', '.6'], ['Chat', '.9']].map(([n, v], i) => `<li class="aix-r${L[i]}"><span>${n}</span><span class="aix-line"><i class="aix-fill" style="--v:${v}"></i></span></li>`).join('')}</ul>`),
      phase(3, '/03 Range', 'Ready', 'A range you can plan around, with milestones.', checks(['Fixed scope, agreed upfront', 'Milestones tied to deliverables', 'Range, timeline and next steps']), true),
    ],
  }),
};

const promptSets = {
  mobile: ['Delivery app for local shops', 'Booking app for a salon chain', 'Fitness app with live classes'],
  software: ['Replace our spreadsheets', 'Inventory system for 3 warehouses', 'Customer portal for our clients'],
  hub: ['Build a delivery app', 'Add AI to our helpdesk', 'Replace our spreadsheets'],
};

/** A small "real project" strip under the card, so the page keeps its proof photo and a link to the case study. */
function proof(p) {
  const inner = `<img src="${p.src}" alt="${p.alt}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async"><span class="aix-proof-text"><b>${p.label || 'Built by Creuto'}</b><strong>${p.title}</strong><em>${p.sub}${p.href ? ' &rarr;' : ''}</em></span>`;
  return p.href ? `<a class="aix-proof" href="${p.href}">${inner}</a>` : `<div class="aix-proof">${inner}</div>`;
}

function card(kind, opts = {}) {
  if (kind !== 'ai' && !demos[kind]) throw new Error('unknown demo: ' + kind);
  const html = kind === 'ai' ? ai.card() : demos[kind]();
  return opts.proof ? html.replace('</figure>', `  ${proof(opts.proof)}\n          </figure>`) : html;
}

function bar(kind) {
  if (kind === 'ai') return ai.bar();
  const prompts = promptSets[kind];
  if (!prompts) throw new Error('unknown bar: ' + kind);
  return `<div class="aix-bar" aria-hidden="true">
              <span class="aix-ico">${SPARK}</span>
              <span class="aix-bar-stage">${prompts.map((t, i) => `<span class="aix-bar-line" style="--n:${t.length};--d:${i * 4}s">${t}</span>`).join('')}</span>
            </div>`;
}

module.exports = { card, bar };
