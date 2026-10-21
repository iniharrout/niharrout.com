module.exports = {
  slug: "software-maintenance-cost-and-planning",
  title: "Software Maintenance: What It Includes and How to Plan It",
  headline: "Software Maintenance After Launch: What It Includes and How to Plan for It",
  shortTitle: "Software maintenance",
  description: "What software and app maintenance includes after launch: updates, security, hosting, monitoring and improvements, and how to plan and budget for it.",
  keywords: ["software maintenance cost", "app maintenance after launch", "mobile app maintenance", "types of software maintenance", "annual maintenance contract software"],
  category: "Costs & Planning",
  badge: "COSTS & PLANNING",
  readMinutes: 8,
  published: "2026-10-22",
  icon: "doc",
  lead: "Launch is the start of a product's life, not the end of the project. Phones get new operating systems, libraries need security updates, servers need watching and users ask for improvements. Planning for this from the start keeps your product healthy and your costs predictable.",
  cardDesc: "What maintenance includes after launch, the four types of maintenance work, and how to plan and budget for it.",
  cta: { title: "Need help after launch?", text: "Book a free 30-minute call. We will look at your product and suggest a maintenance plan that fits how it is used.", button: "Book a free 30-minute call" },
  endCta: { title: "Want a team to keep your product healthy?", text: "We handle updates, monitoring, fixes and improvements after launch, with every launch covered by a 60-day warranty.", service: { href: "/services/product-strategy-prd/post-launch-iteration", label: "See post-launch iteration" } },
  related: ["app-development-cost-factors-india", "mobile-app-security-checklist", "legacy-software-modernization-guide"],
  faq: [
    ["What does software maintenance include?", "Fixing bugs, keeping libraries and operating system support up to date, security patches, hosting and monitoring, backups, and small improvements based on user feedback."],
    ["Why do apps need updates if nothing is broken?", "Apple and Google release new operating systems every year and set deadlines for supporting newer versions. Libraries also receive security fixes. Without updates, apps gradually stop working well or get removed from stores."],
    ["How should I budget for maintenance?", "Plan a recurring yearly budget rather than paying only when something breaks. The right amount depends on how complex the product is, how many users it has and how often you want improvements."],
    ["What is a warranty period?", "A period after launch during which the team fixes defects in the delivered work at no extra cost. At Creuto that period is 60 days."],
    ["Can someone else maintain software another team built?", "Yes, if the code, documentation and accounts are available. A short technical review first shows the condition of the code and what needs attention."],
  ],
  body: `
<p>
  Some founders are surprised when I bring up maintenance during the first call. I do it because products without a maintenance plan tend to decline quietly, and the eventual fix costs much more than steady care would have.
</p>

<div class="blog-callout">
  <h4>The principle</h4>
  <p>
    Budget for maintenance as a running cost, like rent. Small, regular updates are cheaper and safer than large, rushed ones.
  </p>
</div>

<h2 id="types">The four types of maintenance</h2>
<table>
  <thead><tr><th>Type</th><th>What it means</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Corrective</td><td>Fixing bugs</td><td>A payment screen fails on some phones</td></tr>
    <tr><td>Adaptive</td><td>Keeping up with changes around the product</td><td>Supporting a new iOS or Android version</td></tr>
    <tr><td>Preventive</td><td>Reducing future problems</td><td>Updating libraries, cleaning up code</td></tr>
    <tr><td>Perfective</td><td>Improving based on feedback</td><td>Making checkout faster</td></tr>
  </tbody>
</table>

<h2 id="platform-updates">Platform updates you cannot skip</h2>
<p>
  Google Play requires apps to target recent Android versions, as described in its <a href="https://developer.android.com/google/play/requirements/target-sdk" target="_blank" rel="noopener">target API level requirements</a>, and Apple publishes <a href="https://developer.apple.com/news/upcoming-requirements/" target="_blank" rel="noopener">upcoming requirements</a> for App Store submissions. Missing these can block updates or hide your app from new users.
</p>

<h2 id="running-costs">Running costs to plan for</h2>
<ul>
  <li><strong>Hosting:</strong> servers, databases, storage and backups.</li>
  <li><strong>Third-party services:</strong> SMS, email, maps, payments and AI usage.</li>
  <li><strong>Monitoring:</strong> error tracking, uptime checks and alerts. See <a href="/services/devops-cloud-engineering/infrastructure-monitoring">infrastructure monitoring</a>.</li>
  <li><strong>Store accounts:</strong> Apple and Google developer memberships.</li>
  <li><strong>Team time:</strong> for updates, fixes and improvements.</li>
</ul>

{{cta}}

<h2 id="security">Security maintenance</h2>
<p>
  Security is not a one-time task. Libraries get vulnerabilities, access lists go out of date and new risks appear. Our <a href="/blog/mobile-app-security-checklist">mobile app security checklist</a> covers what to review regularly.
</p>

<h2 id="plan">How to set up a maintenance plan</h2>
<ol>
  <li><strong>List what you run:</strong> apps, servers, services, accounts and who owns each.</li>
  <li><strong>Agree response times</strong> for urgent, important and minor issues.</li>
  <li><strong>Schedule regular updates,</strong> for example monthly library updates and yearly platform upgrades.</li>
  <li><strong>Set up monitoring</strong> so problems are found before users report them.</li>
  <li><strong>Keep a backlog of improvements</strong> and review it with usage data each month.</li>
</ol>

<h2 id="models">Ways to pay for maintenance</h2>
<ul>
  <li><strong>Monthly retainer:</strong> a fixed number of hours or a fixed scope each month.</li>
  <li><strong>Annual maintenance contract:</strong> common in India for business software, with defined support terms.</li>
  <li><strong>Pay as you go:</strong> works for very stable products, but response times are less predictable.</li>
</ul>
<p>
  For a view of all costs, including the first build, see <a href="/blog/app-development-cost-factors-india">what decides app development cost in India</a>.
</p>

<h2 id="old-software">When maintenance is no longer enough</h2>
<p>
  If every change breaks something else, the technology is no longer supported or the product cannot grow, it may be time to modernise. Read our <a href="/blog/legacy-software-modernization-guide">legacy software modernisation guide</a>.
</p>

<h2 id="creuto">How we handle it</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> every launch includes a 60-day warranty, and we offer ongoing support plans for updates, monitoring and improvements after that.
</p>
`,
};
