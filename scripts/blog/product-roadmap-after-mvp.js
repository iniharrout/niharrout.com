module.exports = {
  slug: 'product-roadmap-after-mvp',
  title: 'Product Roadmap After MVP: What to Build Next',
  headline: 'Product Roadmap After MVP: How to Decide What to Build Next',
  shortTitle: 'Roadmap after MVP',
  description: 'How to plan a product roadmap after your MVP launches: what to measure, how to rank feature requests, and how to plan releases with your development team.',
  keywords: ['product roadmap after MVP', 'what to build after MVP', 'post MVP roadmap', 'MVP to version 2', 'how to prioritise features after launch'],
  category: 'Product Strategy',
  badge: 'PRODUCT STRATEGY',
  readMinutes: 8,
  published: '2026-11-28',
  icon: 'doc',
  lead: 'Launching the MVP is the start of the real work. Within a few weeks you will have more feature requests than budget, a few bugs that annoy everyone, and a team asking what comes next. A roadmap is how you answer that question on purpose instead of by whoever shouted loudest. Here is the way I plan the months after a first release with founders.',
  cardDesc: 'What to measure after launch, how to rank feature requests, and how to turn them into a release plan your development team can estimate.',
  cta: { title: 'Just launched and not sure what comes next?', text: 'Book a free 30-minute call. Bring your usage numbers and your feature request list, and I will help you sort what to build now and what can wait.', button: 'Book a free 30-minute call' },
  endCta: { title: 'Want a team to plan and ship the next releases?', text: 'After a short call you get a clear written proposal within 24 hours for your next release, with the code staying in your own accounts and a 60-day warranty after each launch.', service: { href: '/services/product-strategy-prd/post-launch-iteration', label: 'See post-launch iteration' } },
  related: ['mvp-vs-prototype-vs-proof-of-concept', 'what-is-a-prd-how-to-write-a-product-requirements-document', 'software-maintenance-cost-and-planning'],
  faq: [
    ['What should I build after my MVP?', 'Build whatever removes the biggest obstacle between your users and the one result your product promises. That is usually fixing where users drop off, making the core workflow faster, or adding the one missing step that stops people paying. New features for new audiences usually come later.'],
    ['How long should a post-MVP roadmap cover?', 'I plan the next release in detail, the one after that roughly, and keep everything else as a ranked list of themes. Plans further than a few months out change too often to be worth estimating line by line.'],
    ['How do I decide between feature requests from different customers?', 'Group requests by the problem behind them, not the feature asked for, then rank each problem by how many of your target users it affects, how much it matters to them and what it costs to solve. A request from one loud customer outside your target market should rank low.'],
    ['Should I fix bugs or build new features first?', 'Fix bugs that break the core workflow, lose data or create support work first. Small cosmetic bugs can be batched into a regular maintenance slot in each release so they never block the roadmap entirely.'],
    ['Do I need a new PRD for each release?', 'You do not need a full document every time, but each release should have a short written scope: the problem, the users affected, what is in, what is out and how you will know it worked. That keeps estimates honest and stops scope creep.'],
  ],
  body: `
<p>
  The week after a launch is usually quiet. Then the messages start: a customer wants an export button, a sales prospect asks for a feature you never planned, your co-founder has three new ideas and the developers have a list of things they rushed. All of it sounds urgent. Very little of it is.
</p>
<p>
  A product roadmap after the MVP is simply a ranked, written plan of what you will build next and why. It does not need special software. It needs evidence, a few clear rules for ranking, and a rhythm of releases your team can actually deliver. This guide walks through each part.
</p>

<div class="blog-callout">
  <h4>The rule I keep coming back to</h4>
  <p>
    Your next release should make the one thing your product promises work better for the users you already have. New audiences, new platforms and big new modules can wait until the core loop is healthy.
  </p>
</div>

<h2 id="measure-first">1. Measure before you plan</h2>
<p>
  The MVP exists to teach you something, so start the roadmap by writing down what it has taught you so far. Before any planning meeting, gather four kinds of evidence:
</p>
<ul>
  <li><strong>Usage of the core workflow.</strong> How many people who sign up reach the main action, such as placing an order, booking a slot or sending an invoice? Where do the rest stop?</li>
  <li><strong>Return visits.</strong> Do people come back a week later without being reminded? Repeat use tells you more than downloads.</li>
  <li><strong>App health.</strong> Crash rates, slow screens and failed payments. For mobile apps, <a href="https://developer.android.com/topic/performance/vitals" target="_blank" rel="noopener">Android vitals in Google Play Console</a> and <a href="https://developer.apple.com/app-store-connect/analytics/" target="_blank" rel="noopener">App Store Connect analytics</a> show these for free.</li>
  <li><strong>What users say.</strong> Support messages, reviews and short calls with five to ten active users. Ask what they were trying to do, not which feature they want.</li>
</ul>
<p>
  If you cannot answer the first two questions, the first item on your roadmap is basic event tracking. Tools such as <a href="https://firebase.google.com/docs/analytics" target="_blank" rel="noopener">Google Analytics for Firebase</a> make this a small job, and every later decision depends on it.
</p>

<h2 id="collect-requests">2. Put every request in one list</h2>
<p>
  Feature requests arrive through email, WhatsApp, sales calls and team chats. Move them all into one list, with a line for each: who asked, what they were trying to do, and how often you have heard it. Then rewrite each item as a problem. "Add a CSV export" becomes "accountants need order data in their own software every month". Two requests that look different often turn out to be the same problem, and a problem usually has a cheaper fix than the feature first suggested.
</p>
<p>
  This is the same thinking we use before a first build, described in our guide to <a href="/blog/product-scoping-framework-kill-feature-bloat">product scoping and cutting feature bloat</a>. It works just as well after launch.
</p>

<h2 id="rank">3. Rank with a simple scorecard</h2>
<p>
  You do not need a complicated framework. I ask the same four questions about each problem and score them low, medium or high:
</p>
<table>
  <thead>
    <tr><th>Question</th><th>What a high score means</th></tr>
  </thead>
  <tbody>
    <tr><td>How many target users does it affect?</td><td>Most of the people you built the product for hit this problem.</td></tr>
    <tr><td>How much does it matter to them?</td><td>It stops them finishing the core task, paying, or coming back.</td></tr>
    <tr><td>How sure are we?</td><td>The evidence comes from usage data and several users, not one opinion.</td></tr>
    <tr><td>How much effort does it take?</td><td>The development team can deliver it in days, not months. Effort counts against the score.</td></tr>
  </tbody>
</table>
<p>
  Ask your development team for rough effort sizes rather than exact estimates at this stage. Our guide to <a href="/blog/software-development-estimates-explained">software development estimates</a> explains why early numbers come as ranges. Problems that score high on reach, impact and confidence with low effort go to the top. High effort items with weak evidence go to the bottom, however exciting they sound.
</p>

<h2 id="three-buckets">4. Sort the top of the list into three buckets</h2>
<p>
  A healthy post-MVP release usually mixes three kinds of work. Keeping all three visible stops any one of them from crowding out the rest:
</p>
<ul>
  <li><strong>Fix:</strong> bugs, crashes and slow screens in the core workflow. These protect the users you already have.</li>
  <li><strong>Improve:</strong> changes that help more users reach the main result, such as a shorter sign-up, clearer onboarding or a missing step in the workflow.</li>
  <li><strong>Extend:</strong> new capabilities that open more value, such as integrations, roles for larger teams or a second platform.</li>
</ul>
<p>
  Right after launch, most of the release should be fix and improve. As usage settles, the balance moves towards extend. If every release is only extend, you are probably building for the customers you hope to get instead of the ones you have.
</p>

<h2 id="plan-releases">5. Turn the ranking into releases</h2>
<p>
  A roadmap your team can deliver has three horizons:
</p>
<ol>
  <li><strong>Now:</strong> the next release, written up with a short scope, clear acceptance criteria and an estimate. A lean <a href="/blog/what-is-a-prd-how-to-write-a-product-requirements-document">product requirements document</a> or a set of user stories is enough.</li>
  <li><strong>Next:</strong> the release after that, described as goals and rough sizes. It will change once the current release ships.</li>
  <li><strong>Later:</strong> a ranked list of themes with no dates. This is where most ideas live, and that is fine.</li>
</ol>
<p>
  Short releases of a few weeks each work better than one large version two. Each one gets real feedback sooner, and if the evidence changes you lose less work. At Creuto we usually ship a first working version in about 4 weeks and then keep the same rhythm for each milestone after launch.
</p>

{{cta}}

<h2 id="budget">6. Plan the budget alongside the roadmap</h2>
<p>
  The money question changes after launch. You are now paying for hosting, third-party services and maintenance every month, as well as new features. Set aside a fixed share of each release for upkeep and keep it there, so security updates and OS changes never compete with features for attention. Our guide to <a href="/blog/software-maintenance-cost-and-planning">software maintenance planning</a> covers what that slot should include.
</p>
<p>
  For the feature work itself, ask your team to estimate each release separately rather than the whole roadmap at once. If you want a rough range before that conversation, our <a href="/project-costs">project cost guide</a> and <a href="/tools/app-cost-calculator">app timeline calculator</a> give a starting point.
</p>

<h2 id="mistakes">7. Mistakes I see after an MVP launch</h2>
<ul>
  <li><strong>Building for the next investor demo.</strong> A demo feature that no user asked for slows the product down for months.</li>
  <li><strong>Saying yes to one large customer.</strong> Custom features for a single account can turn your product into a services project. Charge for it separately or say no.</li>
  <li><strong>Rewriting too early.</strong> Shortcuts in an MVP are normal. Fix the parts that slow you down, and only rebuild when the evidence says so.</li>
  <li><strong>No owner for the roadmap.</strong> Someone, usually the founder or a product manager, must make the final call and say no on the product's behalf.</li>
  <li><strong>Not telling users what changed.</strong> Short release notes show early users that their feedback counts, and that keeps them talking to you.</li>
</ul>

<h2 id="working-with-team">8. Working with your development team on it</h2>
<p>
  The roadmap belongs to you, but your development team should shape it. Share the evidence, not just the feature list, and ask them to point out cheaper ways to solve each problem. Agree on a regular review, for example at the end of every release, where you look at what shipped, what the numbers did and what moves up or down the list.
</p>
<p>
  If you are working with a partner, make sure the code, analytics and app store accounts stay in your company's name, so the roadmap is never tied to one team. At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a>, clients' code lives in their own accounts from day one, and our <a href="/services/product-strategy-prd/post-launch-iteration">post-launch iteration service</a> runs on exactly this cycle: measure, rank, release and review.
</p>
<p>
  A good roadmap is short, ranked and honest about what you do not know yet. Keep it that way and the months after launch become the period where your product gets steadily better, not the period where it gets steadily bigger.
</p>
`,
};
