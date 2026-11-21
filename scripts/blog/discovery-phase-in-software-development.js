module.exports = {
  slug: "discovery-phase-in-software-development",
  title: "What Is a Discovery Phase in Software Development?",
  headline: "What Is a Discovery Phase in Software Development, and Is It Worth Paying For?",
  shortTitle: "Discovery phase",
  description: "What a software discovery phase is, what you should get from it, how long it takes, when it is worth paying for and the warning signs to watch for.",
  keywords: ["discovery phase software development", "software discovery phase", "project discovery phase", "paid discovery phase", "discovery phase deliverables"],
  category: "Product Strategy",
  badge: "PRODUCT STRATEGY",
  readMinutes: 8,
  published: "2026-10-25",
  icon: "check",
  lead: "Ask a few development companies for a quote and at least one will suggest starting with a discovery phase. Some founders see it as the step that saves the project. Others see it as a way to get paid before any code is written. Here is what a discovery phase is, what you should get from it and how to decide whether you need one.",
  cardDesc: "What a discovery phase covers, the deliverables to expect, how long it takes, when to pay for one and the warning signs.",
  cta: { title: "Not sure how much discovery your idea needs?", text: "Book a free 30-minute call. We will look at what is clear, what is still a guess and what to settle before anyone fixes a price.", button: "Book a free 30-minute call" },
  endCta: { title: "Want a clear plan before you build?", text: "We help founders turn an idea into a scoped first release: users, flows, screens, architecture and a written proposal you can compare.", service: { href: "/services/product-strategy-prd", label: "See product strategy and PRD" } },
  related: ["what-is-a-prd-how-to-write-a-product-requirements-document", "mvp-vs-prototype-vs-proof-of-concept", "fixed-price-vs-time-and-materials-software-development"],
  faq: [
    ["What is a discovery phase in software development?", "It is a short, focused stage before the build where the client and the development team agree on the problem, the users, the scope of the first release, the main screens and the technical approach. It ends with documents and designs that make a reliable estimate possible."],
    ["How long does a discovery phase take?", "For most first releases it takes one to four weeks. A small app with a clear idea needs little, while a product with many user types, integrations or an old system to replace needs more."],
    ["Is a discovery phase worth paying for?", "It is worth paying for when the scope is still uncertain, the product has several user types or integrations, or you are replacing an existing system. If your idea is small and already written down clearly, a light review during the proposal is usually enough."],
    ["Do I own the discovery documents?", "You should. Agree in writing that the PRD, designs and technical notes are yours once paid for, so you can take them to any team. A discovery output you cannot reuse elsewhere is a warning sign."],
    ["Is a discovery phase the same as writing a PRD?", "A PRD is one of the main outputs of discovery, not the whole of it. Discovery also includes user research, design of the main flows, technical checks and an estimate built on all of these."],
  ],
  body: `
<p>
  Most software projects that go over budget did not fail during the build. They failed earlier, when a team started coding on a short description and only later found that the founder, the designer and the developers had each pictured a different product. A discovery phase exists to find those differences while they are still cheap to fix.
</p>
<p>
  In this guide I explain what a discovery phase is, what it should produce, how long it takes, when it is worth paying for and the warning signs that a discovery is not giving you value.
</p>

<div class="blog-callout">
  <h4>The short version</h4>
  <p>
    A discovery phase is a short stage before the build that turns an idea into a written scope, the main screens and a technical plan. Pay for one when your scope is still uncertain. Whatever you pay for, make sure you own the outputs and can take them to any team.
  </p>
</div>

<h2 id="what-it-is">What a discovery phase is</h2>
<p>
  Discovery is the stage where you and the development team answer the questions that decide what gets built: who the users are, what problem the first release solves, which features are in and which wait, how the main flows work and what technology fits. Public bodies use the same idea. The UK government's service manual describes <a href="https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works" target="_blank" rel="noopener">how the discovery phase works</a> as understanding the problem before committing to build anything.
</p>
<p>
  It is not a long research project, and it is not a sales meeting. It is focused work with a clear end: documents and designs good enough that a team can estimate the build with confidence.
</p>

<h2 id="deliverables">What you should get at the end</h2>
<p>
  The names vary between companies, but a useful discovery should leave you with most of the following:
</p>
<table>
  <thead><tr><th>Output</th><th>What it answers</th></tr></thead>
  <tbody>
    <tr><td>Problem and goals</td><td>What the first release must achieve and how you will measure it</td></tr>
    <tr><td>User types and journeys</td><td>Who uses the product and the steps each one takes</td></tr>
    <tr><td>Scoped feature list</td><td>What is in the first release, what waits, and why</td></tr>
    <tr><td>PRD</td><td>A written <a href="/blog/what-is-a-prd-how-to-write-a-product-requirements-document">product requirements document</a> two developers would read the same way</td></tr>
    <tr><td>Wireframes or a clickable prototype</td><td>How the main screens look and connect, before any code</td></tr>
    <tr><td>Technical plan</td><td>Architecture, integrations, hosting and the risky parts to test early</td></tr>
    <tr><td>Estimate and milestones</td><td>A build plan you can compare across companies</td></tr>
  </tbody>
</table>
<p>
  If a discovery ends with only a slide deck and a price, you paid for a sales proposal.
</p>

<h2 id="process">How a discovery phase usually runs</h2>
<ol>
  <li><strong>Kick-off workshop.</strong> The founder or product owner walks the team through the idea, the customers and the business model. Everyone writes down their open questions.</li>
  <li><strong>Research.</strong> Short interviews with a few target users, a look at competitors and, for internal tools, time with the people who do the work today.</li>
  <li><strong>Scoping.</strong> The feature list is cut down to one first release. This is the step that saves the most money.</li>
  <li><strong>Design of the main flows.</strong> Wireframes or a simple prototype of the screens that matter most, tested with a few users where possible.</li>
  <li><strong>Technical checks.</strong> Confirm that integrations, payment providers, data sources or old systems behave the way the plan assumes.</li>
  <li><strong>Plan and estimate.</strong> Milestones, a timeline and a cost built on everything above, plus a list of known risks.</li>
</ol>
<p>
  The Nielsen Norman Group's overview of the <a href="https://www.nngroup.com/articles/discovery-phase/" target="_blank" rel="noopener">discovery phase in UX</a> is a good read if you want more detail on the research side.
</p>

{{cta}}

<h2 id="how-long">How long it takes</h2>
<p>
  For most first releases, discovery takes one to four weeks. What moves it towards the longer end:
</p>
<ul>
  <li>Several user types, such as customers, vendors and admins in a marketplace.</li>
  <li>Integrations with payment gateways, ERPs, government systems or hardware.</li>
  <li>An existing system to replace, where the hidden rules live in old code and in people's heads.</li>
  <li>Regulated data, such as health or financial records.</li>
  <li>Many people who need to agree on the scope.</li>
</ul>
<p>
  Discovery should be a small part of the whole project. If it starts to feel like the project, the scope is probably too big for a first release.
</p>

<h2 id="worth-it">When it is worth paying for, and when it is not</h2>
<p>
  A paid discovery makes sense when:
</p>
<ul>
  <li>Your idea is clear in your head but not written down.</li>
  <li>Quotes from different companies are far apart, which usually means each one imagined a different product.</li>
  <li>You plan a <a href="/blog/fixed-price-vs-time-and-materials-software-development">fixed-price contract</a>, which only works when the scope is written and agreed.</li>
  <li>You are replacing a system your business depends on, like a custom ERP.</li>
  <li>You need to show investors or a board a clear plan before you commit.</li>
</ul>
<p>
  You can usually skip a separate paid discovery when the product is small, you already have a written scope or PRD, or you are building a quick <a href="/blog/mvp-vs-prototype-vs-proof-of-concept">prototype or proof of concept</a> to learn something fast. In those cases a careful review during the proposal is enough.
</p>

<h2 id="warning-signs">Warning signs to watch for</h2>
<ul>
  <li><strong>No clear outputs.</strong> If the company cannot list what you will receive, ask before you pay.</li>
  <li><strong>You do not own the documents.</strong> The PRD, designs and technical notes should be yours once paid for, so you can take them to any team.</li>
  <li><strong>No end date.</strong> Discovery should have a fixed length and a fixed fee, agreed upfront.</li>
  <li><strong>Discovery that only confirms the original idea.</strong> Good discovery removes features and raises hard questions. If nothing changed, little was examined.</li>
  <li><strong>The build is assumed.</strong> You should be free to take the outputs elsewhere if the fit is wrong.</li>
</ul>

<h2 id="prepare">How to prepare for discovery</h2>
<p>
  You will get more from any discovery, paid or free, if you bring:
</p>
<ul>
  <li>A one-page description of the problem, the customer and how you will make money.</li>
  <li>Two or three products you like, and what you like about each.</li>
  <li>The must-have features for launch, and the ones you would cut if you had to.</li>
  <li>Any existing systems, data or contracts the new product must work with.</li>
  <li>A budget range and a target date, even rough ones.</li>
</ul>
<p>
  For a first view of budget, try the <a href="/tools/app-cost-calculator">app timeline calculator</a> or look at the <a href="/project-costs">project cost breakdowns</a> before you start.
</p>

<h2 id="creuto">How we approach it</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a>, every project starts with a free 30-minute strategy call, and you get a clear written proposal within 24 hours. For a small, well-defined product, that is often all the planning needed before we start, and the first working version typically follows in about 4 weeks. For a larger or less certain product, I recommend a focused discovery first, so the scope, screens and technical plan are agreed before anyone fixes a price. Either way, your code lives in your own accounts from day one. See our <a href="/services/product-strategy-prd">product strategy and PRD service</a> and <a href="/services/product-strategy-prd/rapid-prototyping">rapid prototyping</a>.
</p>
`,
};
