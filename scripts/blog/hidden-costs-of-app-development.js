module.exports = {
  slug: 'hidden-costs-of-app-development',
  title: 'Hidden Costs of App Development: What Quotes Leave Out',
  headline: 'Hidden Costs of App Development: What Most Quotes Leave Out',
  shortTitle: 'Hidden app costs',
  description: 'Hidden costs of app development that quotes often leave out: store accounts, hosting, paid APIs, SMS, maintenance and changes, and how to plan for each.',
  keywords: ['hidden costs of app development', 'app development hidden costs', 'cost of running an app', 'app costs after launch', 'total cost of app ownership'],
  category: 'Costs & Planning',
  badge: 'COSTS & PLANNING',
  readMinutes: 8,
  published: '2026-11-27',
  icon: 'doc',
  lead: 'The build price on a quote is rarely the full cost of having an app. Store accounts, servers, paid services, text messages, updates and the changes you ask for along the way all land on your desk too, often after you have already committed. None of these is a trick. They are just easy to leave out. Here is the list I walk founders through before they sign anything.',
  cardDesc: 'Store accounts, hosting, paid APIs, OTP messages, maintenance and change requests: the app costs a build quote often leaves out, and how to plan for them.',
  cta: { title: 'Want a second look at the quote you have?', text: 'Book a free 30-minute call. Share the quote and your feature list, and I will point out the costs it does not cover, even if you build with another team.', button: 'Book a free 30-minute call' },
  endCta: { title: 'Want build and running costs on one page?', text: 'After a short call you get a clear written proposal within 24 hours, with the build, third-party services and running costs listed separately, and a 60-day warranty after launch.', service: { href: '/services/product-strategy-prd/mvp-development', label: 'See MVP development' } },
  related: ['how-to-set-a-software-development-budget', 'software-maintenance-cost-and-planning', 'how-to-review-a-software-development-proposal'],
  faq: [
    ['What are the most common hidden costs of app development?', 'The ones I see most often are developer store accounts, cloud hosting, paid third-party services such as maps, OTP text messages and email, app store commissions on digital sales, ongoing maintenance and OS updates, and the cost of changes requested after the scope was agreed.'],
    ['Are hidden costs a sign that a developer is being dishonest?', 'Usually not. Many of these costs are paid to other providers, not to the developer, so they are easy to leave off a build quote. The fix is to ask for running costs and third-party services to be listed separately in writing before you sign.'],
    ['How much should I set aside beyond the build price?', 'It depends on your users, your integrations and how much the app is used, so I would not trust a single percentage. List each service the app depends on, estimate usage for your first year, and keep a contingency for changes. Our project cost guide and calculator give a starting range for the build itself.'],
    ['Who should own the accounts for hosting and third-party services?', 'You should. Store accounts, cloud hosting, payment gateways and other services should be registered to your company, with your billing details, so you see every cost directly and keep control if you ever change teams.'],
    ['How do I stop running costs growing as the app grows?', 'Ask for monitoring and billing alerts from launch, review the bills every month, and choose services whose pricing scales in a way you understand. Caching, sensible limits on expensive calls and removing unused services all help keep the monthly bill predictable.'],
  ],
  body: `
<p>
  A question I often hear after launch is why the app still costs money every month when the build has been paid in full. It is a fair question. A build quote covers the work of designing and writing the software. It usually does not cover the accounts, services and upkeep the app needs to keep running, or the changes that come up once real people start using it.
</p>
<p>
  I will not put price figures here, because they depend on your scope and your usage. For a starting range on the build, see our <a href="/project-costs">project cost guide</a> or try the <a href="/tools/app-cost-calculator">app timeline calculator</a>. This guide is about everything around that number.
</p>

<div class="blog-callout">
  <h4>The question to ask every team</h4>
  <p>
    "What will this app cost me in its first year, not just to build?" A good team can answer with a list: the build, each third-party service, hosting, store accounts and maintenance, each shown on its own line. If the answer is only the build price, ask again before you sign.
  </p>
</div>

<h2 id="accounts-and-stores">1. Developer accounts and app store fees</h2>
<p>
  To publish an app you need your own developer accounts. Apple charges a yearly membership through the <a href="https://developer.apple.com/programs/" target="_blank" rel="noopener">Apple Developer Program</a>, and Google charges a one-time registration fee for a <a href="https://support.google.com/googleplay/android-developer/answer/6112435" target="_blank" rel="noopener">Google Play developer account</a>. These are small, but they should be in your name, not the developer's, so the app stays yours.
</p>
<p>
  The larger store cost is commission. If your app sells digital goods or subscriptions inside the app, the stores take a share of each sale. Physical goods and real-world services usually go through your own payment gateway instead, which has its own transaction fees. Our guide to <a href="/blog/in-app-purchases-and-app-store-fees">in-app purchases and app store fees</a> explains which rules apply to which kind of app.
</p>

<h2 id="hosting">2. Hosting, storage and the cloud bill</h2>
<p>
  Every app with a login, a database or uploaded files runs on servers somewhere, and those servers bill monthly. The cost depends on how many people use the app, how much data you store, how many images or videos you serve and how many environments you keep (most projects need at least a test environment as well as the live one).
</p>
<p>
  Cloud providers publish tools to estimate this, such as the <a href="https://calculator.aws/" target="_blank" rel="noopener">AWS Pricing Calculator</a>. Ask your team to fill one in for your expected first-year usage and to set billing alerts from launch day. A design that is cheap to build but expensive to run can cost more within a year than one that took a little longer to build properly.
</p>

<h2 id="third-party-services">3. Paid third-party services</h2>
<p>
  Most apps lean on outside services for the parts that are already solved. That is usually the right call, because it saves build time. But nearly every one of them bills by usage once you pass a free tier, and these bills are the ones founders most often discover late.
</p>
<table>
  <thead>
    <tr><th>Service</th><th>How it usually bills</th><th>What drives the cost</th></tr>
  </thead>
  <tbody>
    <tr><td>OTP and SMS messages</td><td>Per message sent</td><td>Logins, sign-ups, order updates</td></tr>
    <tr><td>Maps, places and routing</td><td>Per request</td><td>Map loads, address search, live tracking</td></tr>
    <tr><td>Email delivery</td><td>Per email or monthly plan</td><td>Receipts, alerts, marketing</td></tr>
    <tr><td>Push notifications</td><td>Often free, paid at scale or with extra tools</td><td>Campaigns and segmentation</td></tr>
    <tr><td>AI and LLM features</td><td>Per token or per call</td><td>Prompt length, users, how often it runs</td></tr>
    <tr><td>Payment gateway</td><td>Per transaction</td><td>Sales volume and payment methods</td></tr>
    <tr><td>Error tracking and analytics</td><td>Monthly plan by volume</td><td>Events tracked, users, retention</td></tr>
  </tbody>
</table>
<p>
  Ask for a list of every service the app will use, with its pricing page and an estimate at your expected usage. If AI is part of the product, running costs deserve their own line, which I cover in our guide to <a href="/blog/ai-app-development-cost">AI app development cost</a>.
</p>

{{cta}}

<h2 id="maintenance">4. Maintenance and OS updates</h2>
<p>
  An app is never finished in the way a building is finished. Apple and Google release new OS versions every year, change their store rules, and ask apps to target newer versions to stay listed. Libraries need security updates. Servers need patches. Something that worked perfectly at launch can break on a new phone a year later without anyone touching the code.
</p>
<p>
  Plan for this from the start, either as a monthly support arrangement or as a set number of hours each quarter. Our guide on <a href="/blog/software-maintenance-cost-and-planning">software maintenance</a> explains what it includes and how to plan it. At Creuto, every launch comes with a 60-day warranty, so bugs found in the first weeks are fixed without a new bill. Ongoing updates after that are planned separately, in writing.
</p>

<h2 id="changes">5. Changes after the scope is agreed</h2>
<p>
  This is often the largest hidden cost, and it is one you control. Once real users see the app, you will want changes. Some are essential. Many are good ideas that can wait. Each one added mid-build costs design, development and testing time, and a steady stream of small additions is how budgets quietly double.
</p>
<p>
  Agree up front how changes are handled: written down, estimated, approved by you, then scheduled. Our guide to <a href="/blog/scope-creep-in-software-projects">controlling scope creep</a> covers how to do this without slowing the project.
</p>

<h2 id="less-obvious">6. The less obvious ones</h2>
<ul>
  <li><strong>Your own time.</strong> Someone on your side has to answer questions, review builds and make decisions every week. Delays here cost money too.</li>
  <li><strong>Content and data.</strong> Product photos, descriptions, menus, help text and imported records rarely appear in a build quote.</li>
  <li><strong>Legal and compliance.</strong> A privacy policy, terms, and data protection work for the countries you serve.</li>
  <li><strong>Admin tools.</strong> Someone will need to manage users, orders and content. If an admin panel is not in the scope, it becomes a surprise later.</li>
  <li><strong>Domains, certificates and business email.</strong> Small, recurring and easy to forget.</li>
  <li><strong>Switching teams.</strong> If the code or accounts are not in your name, moving to a new team can mean paying to rebuild what you already paid for.</li>
</ul>

<h2 id="how-to-plan">How to plan for all of it</h2>
<ol>
  <li><strong>Ask for a first-year cost view,</strong> not just a build price, with each item on its own line.</li>
  <li><strong>Open every account in your company's name</strong> with your billing details, so you see each cost directly.</li>
  <li><strong>Estimate usage honestly</strong> for your first year and check it against each provider's pricing page.</li>
  <li><strong>Set billing alerts</strong> on hosting and paid services from launch day.</li>
  <li><strong>Keep a contingency</strong> for changes, and agree how change requests are priced before work starts.</li>
  <li><strong>Review the bills monthly</strong> for the first few months and remove anything you are not using.</li>
</ol>
<p>
  When you compare quotes from different teams, use the same list for each. Our guide on <a href="/blog/how-to-review-a-software-development-proposal">how to review a software development proposal</a> shows what else to check.
</p>

<h2 id="how-we-work">How we handle this at Creuto</h2>
<p>
  At Creuto, after a free 30-minute call you get a clear written proposal within 24 hours, with the build split into milestones and third-party services and running costs listed separately, so nothing arrives as a surprise. Your code and accounts live in your own name from day one, a first working version is usually ready in about 4 weeks, and every launch is covered by a 60-day warranty. Across 8+ years in product and 50+ products shipped, the projects that stay on budget are the ones where the full cost was written down before the first line of code. You can read more about how we work at <a href="https://creuto.com" target="_blank" rel="noopener">creuto.com</a>.
</p>
`
};
