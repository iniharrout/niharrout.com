module.exports = {
  slug: "non-functional-requirements-checklist",
  title: "Non-Functional Requirements: A Checklist for Your App",
  headline: "Non-Functional Requirements: The Checklist Founders Skip (and Pay For Later)",
  shortTitle: "Non-functional requirements",
  description: "What non-functional requirements are, why they change your quote and timeline, and a checklist to add speed, security and scale targets to your app spec.",
  keywords: ["non-functional requirements", "non-functional requirements checklist", "non-functional requirements examples", "functional vs non-functional requirements", "app requirements specification"],
  category: "Product Strategy",
  badge: "PRODUCT STRATEGY",
  readMinutes: 8,
  published: "2026-11-04",
  icon: "doc",
  lead: "Functional requirements say what your app does. Non-functional requirements say how well it has to do it: how fast, how secure, how many users, how available and how easy to maintain. They are the part of a spec founders most often leave blank, and the part that most often explains why two quotes for the same app look so different.",
  cardDesc: "What non-functional requirements are, how they affect cost and timeline, and a checklist to add to your app spec before you ask for quotes.",
  cta: { title: "Writing a spec for your app?", text: "Book a free 30-minute call. We will go through your requirements and point out the targets that are missing.", button: "Book a free 30-minute call" },
  endCta: { title: "Need a PRD with clear targets?", text: "We write PRDs that cover features and the speed, security and scale targets behind them, so every quote you get is comparable.", service: { href: "/services/product-strategy-prd", label: "See product strategy and PRD" } },
  related: ["what-is-a-prd-how-to-write-a-product-requirements-document", "how-to-write-user-stories", "how-to-write-a-software-rfp"],
  faq: [
    ["What is the difference between functional and non-functional requirements?", "A functional requirement describes a behaviour, such as 'a customer can reschedule a booking'. A non-functional requirement describes a quality of the whole system, such as 'search results load in under two seconds on a mid-range phone' or 'customer data is encrypted at rest'."],
    ["What are examples of non-functional requirements?", "Common examples are page or screen load time, number of users at the same time, uptime target, backup and recovery time, security and login rules, data retention, accessibility level, supported devices and browsers, and how logs and monitoring work."],
    ["Do non-functional requirements affect the cost of an app?", "Yes. Higher targets for scale, availability, security or compliance mean more infrastructure, more testing and more engineering time. Stating them up front is what lets different development companies quote for the same thing."],
    ["Who should write non-functional requirements?", "The founder or product owner sets the business targets, such as how many users and how much downtime is acceptable. The development team turns those into measurable technical targets and checks they are realistic."],
    ["How do you test non-functional requirements?", "Each one needs a measurable target and a test: load tests for speed and scale, security reviews and penetration tests for security, restore drills for backups, and accessibility audits against WCAG. If you cannot test it, rewrite it until you can."],
  ],
  body: `
<p>
  When I review a founder's spec, the feature list is usually detailed. Then I ask a few simple questions. How many people will use this on launch day? What happens if it is down for an hour? Whose data are we storing, and for how long? Most of the time, nobody has written those answers down. Those answers are the non-functional requirements, and they shape the architecture, the timeline and the cost as much as any feature does.
</p>

<div class="blog-callout">
  <h4>The short version</h4>
  <p>
    For every quality that matters to your business, write one measurable target: a number, a condition and how it will be tested. "The app should be fast" is a wish. "The home screen loads in under two seconds on a mid-range Android phone on 4G" is a requirement.
  </p>
</div>

<h2 id="what">What non-functional requirements are</h2>
<p>
  Functional requirements describe what the product does: sign up, book a slot, pay, get a receipt. You usually capture them as <a href="/blog/how-to-write-user-stories">user stories</a> in your <a href="/blog/what-is-a-prd-how-to-write-a-product-requirements-document">PRD</a>.
</p>
<p>
  Non-functional requirements describe how the whole system behaves while doing those things. The international software quality model, <a href="https://www.iso.org/standard/78176.html" target="_blank" rel="noopener">ISO/IEC 25010</a>, groups these qualities into areas such as performance efficiency, reliability, security, usability, maintainability and portability. You do not need to read the standard, but it is a useful reminder of what to cover.
</p>

<h2 id="why">Why they change your quote</h2>
<p>
  Two development companies can read the same feature list and imagine very different products. One pictures a few hundred users and a single server. The other pictures a national launch, strict data rules and round-the-clock support. Both quotes can be fair, and they will still be far apart.
</p>
<ul>
  <li><strong>Scale</strong> decides the architecture, caching and how much load testing is needed.</li>
  <li><strong>Availability</strong> decides whether you need redundancy across servers or regions, and on-call monitoring.</li>
  <li><strong>Security and compliance</strong> add reviews, audit logs, encryption and sometimes outside testing.</li>
  <li><strong>Device and browser support</strong> multiplies design and testing effort.</li>
</ul>
<p>
  This is why I ask founders to add these targets before they send an <a href="/blog/how-to-write-a-software-rfp">RFP</a>. If you want to see how these choices move a budget, our <a href="/project-costs">project cost guide</a> and the <a href="/tools/app-cost-calculator">app cost calculator</a> show the main drivers.
</p>

<h2 id="checklist">The checklist</h2>
<p>
  Copy this table into your spec and fill in the last column. If you do not know an answer, write a rough estimate and mark it as one. A guess is far more useful to a development team than a blank.
</p>
<table>
  <thead><tr><th>Area</th><th>Question to answer</th><th>Example target</th></tr></thead>
  <tbody>
    <tr><td>Performance</td><td>How fast must key screens and actions be?</td><td>Search results appear in under two seconds on a mid-range phone on 4G.</td></tr>
    <tr><td>Scale</td><td>How many users at the same time, at launch and in a year?</td><td>Handles the expected launch-day peak with room to spare, confirmed by a load test.</td></tr>
    <tr><td>Availability</td><td>How much downtime can the business accept, and when?</td><td>Planned maintenance only between 2 am and 4 am local time, announced a day ahead.</td></tr>
    <tr><td>Backup and recovery</td><td>How much data can you afford to lose, and how fast must you recover?</td><td>Daily backups kept for 30 days; a restore is tested every quarter.</td></tr>
    <tr><td>Security</td><td>Who can see what, and how do they sign in?</td><td>Role-based access for staff, two-step login for admins, data encrypted in transit and at rest.</td></tr>
    <tr><td>Privacy and compliance</td><td>Which laws apply to the data you store, and where must it live?</td><td>Personal data stored in a named region; users can request deletion.</td></tr>
    <tr><td>Accessibility</td><td>Which accessibility level must screens meet?</td><td>Customer-facing screens meet WCAG 2.2 level AA.</td></tr>
    <tr><td>Compatibility</td><td>Which devices, OS versions and browsers are supported?</td><td>The last three major iOS and Android versions; current Chrome, Safari and Edge.</td></tr>
    <tr><td>Localisation</td><td>Which languages, currencies, time zones and date formats?</td><td>English and Hindi at launch; all times stored in UTC and shown in local time.</td></tr>
    <tr><td>Observability</td><td>How will you know something is wrong before customers tell you?</td><td>Error tracking and uptime alerts sent to the on-call person within minutes.</td></tr>
    <tr><td>Maintainability</td><td>Who will change this code later, and what do they need?</td><td>Automated tests for core flows, a written setup guide, code in the client's own repository.</td></tr>
  </tbody>
</table>

{{cta}}

<h2 id="measurable">How to make each one measurable</h2>
<p>
  A good non-functional requirement has three parts: the quality, the number, and the conditions under which the number must hold. Here is how I rewrite common vague ones.
</p>
<ul>
  <li><strong>"It should be secure"</strong> becomes: staff accounts use role-based access, admin logins need a second factor, and the app passes a review against the <a href="https://owasp.org/www-project-application-security-verification-standard/" target="_blank" rel="noopener">OWASP Application Security Verification Standard</a> at the level we agree on.</li>
  <li><strong>"It should handle lots of users"</strong> becomes: the checkout flow handles the expected peak load with acceptable response times, proven by a load test before launch.</li>
  <li><strong>"It should be accessible"</strong> becomes: customer screens meet <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener">WCAG</a> level AA, checked with automated tools and a manual screen reader pass.</li>
  <li><strong>"It should always be up"</strong> becomes: a stated uptime target, a maintenance window and a plan for what users see when something fails.</li>
</ul>
<p>
  Be honest about the targets. Asking for the highest level everywhere makes the product slower and more expensive to build. A booking app for one city does not need the same availability plan as a payments platform. Pick high targets only where the business truly needs them.
</p>

<h2 id="when">When to set them</h2>
<ol>
  <li><strong>Before you ask for quotes.</strong> Even rough targets make proposals comparable.</li>
  <li><strong>During discovery.</strong> The development team checks each target, flags the expensive ones and suggests cheaper alternatives.</li>
  <li><strong>Before each milestone.</strong> Review the targets that matter for that release, such as load testing before a marketing push.</li>
  <li><strong>After launch.</strong> Real usage data will show which targets were too high or too low. Update the spec.</li>
</ol>
<p>
  For mobile apps, security is the area founders most often underestimate. Our <a href="/blog/mobile-app-security-checklist">mobile app security checklist</a> goes deeper on what to ask for.
</p>

<h2 id="mistakes">Common mistakes</h2>
<ul>
  <li><strong>Leaving them out entirely.</strong> The team then makes its own assumptions, and you discover them after launch.</li>
  <li><strong>Words instead of numbers.</strong> "Fast", "secure" and "scalable" cannot be tested, so they cannot be accepted or rejected.</li>
  <li><strong>Gold-plating.</strong> Demanding enterprise-level targets for a first version burns budget before you have users.</li>
  <li><strong>No owner.</strong> Someone has to own monitoring, backups and security updates after launch. Write down who.</li>
  <li><strong>No test plan.</strong> Every target needs a matching test, or it will quietly be skipped under deadline pressure.</li>
</ul>

<h2 id="creuto">How we handle them at Creuto</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a>, we cover non-functional requirements in the first call and write them into the proposal, which you get within 24 hours of the call. The targets go into the PRD next to the features, each one with a test. We set up monitoring and backups as part of the build, your code lives in your own accounts from day one, and after launch there is a 60-day warranty while real users put those targets to the test.
</p>
<p>
  If you already have a feature list, add the checklist above and send both to any team you are talking to. You will get clearer answers, and you will find out quickly which teams have thought about the questions.
</p>
`,
};
