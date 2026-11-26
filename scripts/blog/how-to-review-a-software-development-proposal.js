module.exports = {
  slug: "how-to-review-a-software-development-proposal",
  title: "How to Review a Software Development Proposal",
  headline: "How to Review a Software Development Proposal Before You Sign",
  shortTitle: "Review a development proposal",
  description: "How to review a software development proposal: check scope, assumptions, milestones, price, ownership and support so you know what you are paying for.",
  keywords: ["software development proposal", "how to review a software proposal", "app development proposal", "software development quote", "compare software development quotes"],
  category: "Costs & Planning",
  badge: "COSTS & PLANNING",
  readMinutes: 8,
  published: "2026-11-17",
  icon: "doc",
  lead: "A proposal is the first real look at how a development team thinks. Two quotes for the same idea can differ a lot, and the reason is almost always in what each one includes, assumes or leaves out. Here is how I would read one, section by section, before you sign anything.",
  cardDesc: "A section-by-section checklist for reading a software proposal: scope, assumptions, milestones, price, ownership, support and red flags.",
  cta: { title: "Holding a proposal right now?", text: "Bring it to a free 30-minute call. I will go through it with you and point out what is missing, even if you choose another team.", button: "Book a free 30-minute call" },
  endCta: { title: "Want a proposal you can check line by line?", text: "After a short call you get a clear written proposal within 24 hours, with scope, assumptions, milestones and running costs written down.", service: { href: "/services/custom-software-development/software-consulting", label: "See software consulting" } },
  related: ["how-to-write-a-software-rfp", "software-development-contract-checklist", "app-development-cost-factors-india"],
  faq: [
    ["What should a software development proposal include?", "At minimum: the problem and goal, a written scope of the first release, what is out of scope, the assumptions behind the price, milestones with deliverables, the team, the price and payment terms, who owns the code and accounts, and what support looks like after launch."],
    ["Why are two quotes for the same app so different?", "Usually because they are not quoting the same thing. One may include design, testing, an admin panel and launch support while another leaves them out or assumes the client provides them. Compare scope and assumptions before you compare totals."],
    ["Is a proposal the same as a contract?", "No. A proposal describes what will be built and how. The contract makes it binding and covers payment, ownership, confidentiality and what happens if things change or go wrong. The scope in the proposal should be attached to or referenced in the contract."],
    ["Should I choose the cheapest proposal?", "Only if it covers the same scope, quality and support as the others. A lower number that leaves out testing, the admin side or post-launch fixes often costs more once those gaps show up."],
    ["How long should it take to get a proposal?", "For a clear idea, a few days is reasonable. At Creuto we send a written proposal within 24 hours of the free strategy call. Larger or unclear projects may need a short paid discovery first."],
  ],
  body: `
<p>
  Founders often send me two or three proposals and ask which one is right. Most of the time the totals are not the interesting part. The interesting part is what each team understood about the product, what they quietly left out and what they will charge extra for later.
</p>
<p>
  This guide walks through a proposal in the order you will usually read it, with the questions to ask at each step. If you have not asked for quotes yet, start with <a href="/blog/how-to-write-a-software-rfp">how to write a software RFP</a> so every team quotes the same product.
</p>

<div class="blog-callout">
  <h4>The one rule</h4>
  <p>
    Compare scope and assumptions first, milestones second and price last. A price only means something once you know exactly what it buys.
  </p>
</div>

<p>
  <strong>Free tool:</strong> the <a href="/tools/software-rfp-generator">software RFP generator</a> turns a few answers into a request for proposal you can copy or download.
</p>

<h2 id="understanding">1. Does it show they understood the problem?</h2>
<p>
  A good proposal opens by restating your goal in its own words: who the users are, what job the software does for them and what success looks like. If this section is generic or copied from a template, the rest of the plan was probably built on guesses.
</p>
<ul>
  <li>Does it name your users and the main workflow, not just "a mobile app"?</li>
  <li>Does it mention the business result you care about, such as fewer manual steps or more bookings?</li>
  <li>Did they ask questions before writing it? Teams that ask nothing tend to find the surprises after you have paid.</li>
</ul>

<h2 id="scope">2. Is the scope written down, including what is out?</h2>
<p>
  Scope is the heart of the proposal. Look for a feature list for the first release that is specific enough to test. "User management" is vague. "Sign up with phone number and OTP, edit profile, admin can deactivate a user" is testable.
</p>
<p>
  Just as important is an <strong>out of scope</strong> list. It protects both sides. If nothing is listed as excluded, assume disagreements later about what was "obviously included". Our guide on <a href="/blog/scope-creep-in-software-projects">scope creep</a> explains how unclear scope turns into extra cost.
</p>
<p>Check that the scope covers the parts founders often forget:</p>
<ul>
  <li>The admin panel or back office your team will use every day.</li>
  <li>Design: is it wireframes only, or full screen designs you approve?</li>
  <li>Testing on real devices and browsers.</li>
  <li>Speed, security and scale targets, the <a href="/blog/non-functional-requirements-checklist">non-functional requirements</a>.</li>
  <li>App store submission, hosting setup and launch.</li>
</ul>

<h2 id="assumptions">3. Read the assumptions as carefully as the price</h2>
<p>
  Every estimate rests on assumptions. Good proposals list them openly. Typical ones: you provide content and logos, a third-party service has a working API, there is one user role, there is no data to migrate. Each assumption is a place where cost can change.
</p>
<p>
  Go through the list and mark anything you know is not true. If they assumed no migration but you have five years of records in spreadsheets, the price will move. Better to find that now. The guide on <a href="/blog/software-development-estimates-explained">how software estimates work</a> covers why this matters.
</p>

<h2 id="milestones">4. Are milestones tied to working software?</h2>
<p>
  Look at how the work is split. Milestones should end in something you can open and use, not in "40% of development complete". Working software you can click through is the only progress report that cannot be misread.
</p>
<table>
  <thead><tr><th>Weaker milestone</th><th>Stronger milestone</th></tr></thead>
  <tbody>
    <tr><td>Design phase complete</td><td>Approved screens for sign-up, booking and payment</td></tr>
    <tr><td>Backend 50% done</td><td>Customers can book and pay on a test build you can install</td></tr>
    <tr><td>Testing</td><td>Release candidate passes the agreed test list on named devices</td></tr>
    <tr><td>Launch</td><td>App live on both stores, admin trained, monitoring switched on</td></tr>
  </tbody>
</table>
<p>
  Ask how often you will see a demo and who you will talk to each week. Short cycles with regular demos are the idea behind most modern delivery practice; the <a href="https://www.gov.uk/service-manual/agile-delivery" target="_blank" rel="noopener">GOV.UK Service Manual on agile delivery</a> is a clear public example of the approach.
</p>

{{cta}}

<h2 id="price">5. Understand the price model and payment terms</h2>
<p>
  A proposal is usually either fixed price for a defined scope or time and materials, where you pay for the hours used. Neither is wrong, but you should know which one you are signing and what happens when scope changes. Our comparison of <a href="/blog/fixed-price-vs-time-and-materials-software-development">fixed price vs time and materials</a> goes deeper.
</p>
<ul>
  <li><strong>Line items:</strong> can you see design, development, testing and launch separately?</li>
  <li><strong>Payments:</strong> are they tied to the milestones above, not to calendar dates?</li>
  <li><strong>Change requests:</strong> how is new work priced and approved, and who signs off?</li>
  <li><strong>Running costs:</strong> hosting, app store accounts, SMS, maps, payment gateway and AI usage are separate from the build. Are they listed so you can budget for them?</li>
</ul>
<p>
  To sanity-check a number, compare it with the real breakdowns on our <a href="/project-costs">project costs page</a> or get a quick range from the <a href="/tools/app-cost-calculator">app cost calculator</a>.
</p>

<h2 id="ownership">6. Who owns the code, accounts and data?</h2>
<p>
  This is the section people skim and later regret. The proposal, and then the contract, should say that you own the source code, designs and data once paid for, and that the code repository, cloud account and app store accounts sit in your name. <a href="https://www.wipo.int/copyright/en/" target="_blank" rel="noopener">WIPO's copyright overview</a> is a useful primer on why written ownership terms matter for software.
</p>
<p>
  At Creuto, clients' code lives in their own accounts from day one, so there is nothing to hand over at the end. If a proposal says the code will be "transferred on completion", ask what happens if the project stops halfway.
</p>

<h2 id="team">7. Who is actually doing the work?</h2>
<ul>
  <li>Who leads the project, and will you speak to them directly?</li>
  <li>Which roles are included: design, development, testing, project management?</li>
  <li>Is any part subcontracted to another company or freelancers?</li>
  <li>What happens if a key person leaves mid-project?</li>
</ul>
<p>
  Ask to see relevant past work, ideally something close to your product. Our <a href="/blog/how-to-choose-a-software-development-company">guide to choosing a software development company</a> lists more questions for this stage.
</p>

<h2 id="quality">8. How will quality and security be checked?</h2>
<p>
  A proposal should say how the work will be tested and what "done" means. For anything that handles logins, payments or personal data, ask which security checks are included. The <a href="https://owasp.org/www-project-application-security-verification-standard/" target="_blank" rel="noopener">OWASP Application Security Verification Standard</a> is a widely used reference you can point to when asking.
</p>

<h2 id="after-launch">9. What happens after launch?</h2>
<p>
  Software needs fixes, updates and small improvements once real users arrive. Look for a warranty period during which bugs in the agreed scope are fixed at no extra cost, and a clear offer for ongoing support after that. Every Creuto launch comes with a 60-day post-launch warranty. Our guide to <a href="/blog/software-maintenance-cost-and-planning">software maintenance</a> explains what to plan for beyond that.
</p>

<h2 id="red-flags">Red flags in a proposal</h2>
<ul>
  <li>A single total with no breakdown and no assumptions.</li>
  <li>No out of scope list.</li>
  <li>Payments weighted heavily up front, before you see any working software.</li>
  <li>Code and accounts held by the agency until the final payment.</li>
  <li>No mention of testing, the admin side or launch.</li>
  <li>Promises that sound too certain about an unclear idea, such as a fixed date before anyone has asked about integrations.</li>
</ul>

<h2 id="checklist">A quick checklist to compare proposals</h2>
<table>
  <thead><tr><th>Check</th><th>Proposal A</th><th>Proposal B</th></tr></thead>
  <tbody>
    <tr><td>Restates your goal and users</td><td></td><td></td></tr>
    <tr><td>Testable scope and out of scope list</td><td></td><td></td></tr>
    <tr><td>Assumptions listed</td><td></td><td></td></tr>
    <tr><td>Milestones end in working software</td><td></td><td></td></tr>
    <tr><td>Line items and running costs shown</td><td></td><td></td></tr>
    <tr><td>Code and accounts in your name</td><td></td><td></td></tr>
    <tr><td>Named lead and team roles</td><td></td><td></td></tr>
    <tr><td>Testing and security described</td><td></td><td></td></tr>
    <tr><td>Warranty and support after launch</td><td></td><td></td></tr>
  </tbody>
</table>
<p>
  Once you have picked a proposal, carry its scope into the contract. The <a href="/blog/software-development-contract-checklist">software development contract checklist</a> covers what to add.
</p>

<h2 id="creuto">How we write proposals at Creuto</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> every proposal follows a free 30-minute strategy call and arrives within 24 hours. It sets out the first release, what is out of scope, the assumptions, milestones that end in working software and the running costs you should expect. The first working version typically lands in about 4 weeks, and the code sits in your accounts from the start. If you would rather talk it through, <a href="https://calendly.com/creuto/meet" target="_blank" rel="noopener">book a call</a> and bring any proposals you already have.
</p>
`,
};
