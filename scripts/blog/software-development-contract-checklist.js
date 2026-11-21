module.exports = {
  slug: "software-development-contract-checklist",
  title: "Software Development Contract Checklist for Founders",
  headline: "Software Development Contract Checklist: What to Agree Before the Build Starts",
  shortTitle: "Software contract checklist",
  description: "A software development contract checklist for founders: scope, milestones, payments, IP ownership, warranty, confidentiality, changes and exit terms.",
  keywords: ["software development contract", "software development agreement checklist", "app development contract", "IP ownership software development", "statement of work software"],
  category: "Hiring a Team",
  badge: "HIRING A TEAM",
  readMinutes: 8,
  published: "2026-10-23",
  icon: "doc",
  lead: "Most disputes between founders and development teams trace back to something that was never written down: what was included, who owns the code, what happens when plans change. A clear contract protects both sides and makes the project calmer.",
  cardDesc: "Scope, milestones, payments, IP ownership, warranty, confidentiality, change requests and exit terms to agree before the build.",
  cta: { title: "Reviewing a development proposal?", text: "Book a free 30-minute call. I will walk you through what a clear proposal and contract should cover.", button: "Book a free 30-minute call" },
  endCta: { title: "Want a clear plan before you commit?", text: "Every Creuto project starts with a written proposal and a PRD, so scope and milestones are agreed up front.", service: { href: "/services/product-strategy-prd", label: "See product strategy and PRD" } },
  related: ["how-to-choose-a-software-development-company", "fixed-price-vs-time-and-materials-software-development", "freelancer-vs-agency-for-app-development"],
  faq: [
    ["Who should own the source code?", "The client, in most custom projects. The contract should say when ownership transfers, commonly as milestones are paid, and the code should live in the client's own repository from the start."],
    ["What is a statement of work?", "A statement of work, or SOW, describes the specific project: scope, deliverables, milestones, timeline and price. It sits under a master agreement that covers the general terms."],
    ["How should change requests be handled?", "Agree a simple process: the change is described in writing, its effect on time and cost is estimated, and it is approved before work starts."],
    ["What warranty is reasonable?", "A period after launch during which defects in the delivered work are fixed at no extra cost. At Creuto that period is 60 days."],
    ["Do I need a lawyer?", "For anything significant, yes. A checklist helps you ask the right questions, but a lawyer should review the final contract for your situation and jurisdiction."],
  ],
  body: `
<p>
  I prefer projects where everything important is written down before the first line of code. It is not about distrust. It saves both sides from arguments later, when memories differ and money has been spent.
</p>

<div class="blog-callout">
  <h4>Important</h4>
  <p>
    This checklist helps you prepare. It is not legal advice; have a lawyer review the final contract for your situation.
  </p>
</div>

<h2 id="structure">How contracts are usually structured</h2>
<ul>
  <li><strong>Master services agreement:</strong> the general terms, signed once.</li>
  <li><strong>Statement of work:</strong> the specific project, its scope, milestones and price.</li>
  <li><strong>NDA:</strong> often signed before detailed discussions start.</li>
</ul>

<h2 id="checklist">The checklist</h2>
<table>
  <thead><tr><th>Topic</th><th>What to agree</th></tr></thead>
  <tbody>
    <tr><td>Scope</td><td>Features included and excluded, ideally referencing a PRD</td></tr>
    <tr><td>Milestones</td><td>What is delivered at each stage and how it is accepted</td></tr>
    <tr><td>Payments</td><td>Amounts tied to milestones, invoicing and late payment terms</td></tr>
    <tr><td>IP ownership</td><td>Who owns the code and designs, and when ownership transfers</td></tr>
    <tr><td>Accounts</td><td>Code, cloud and app store accounts in the client's name</td></tr>
    <tr><td>Change requests</td><td>How changes are estimated and approved</td></tr>
    <tr><td>Warranty</td><td>How long defects are fixed for free after launch</td></tr>
    <tr><td>Confidentiality</td><td>What each side must keep private, and for how long</td></tr>
    <tr><td>Data protection</td><td>Who processes personal data and how it is protected</td></tr>
    <tr><td>Exit</td><td>How either side can end the contract and what is handed over</td></tr>
  </tbody>
</table>

{{cta}}

<h2 id="scope">Scope: the most important clause</h2>
<p>
  "Build an app like X" is not a scope. A good scope lists screens and features, names what is excluded and points to a <a href="/blog/what-is-a-prd-how-to-write-a-product-requirements-document">PRD</a> and designs. The clearer it is, the fairer the price and the fewer the disputes.
</p>

<h2 id="ip">IP and ownership</h2>
<p>
  Agree that custom code and designs belong to you, usually as each milestone is paid, and that the team may keep using its general tools and know-how. Make sure third-party and open-source components are listed with their licences. The <a href="https://www.wipo.int/copyright/en/" target="_blank" rel="noopener">WIPO copyright pages</a> explain the basics of software copyright.
</p>

<h2 id="pricing-model">Fixed price or time and materials</h2>
<p>
  The pricing model shapes the contract. Fixed price needs tight scope; time and materials needs clear reporting and budget caps. Our guide to <a href="/blog/fixed-price-vs-time-and-materials-software-development">fixed price vs time and materials</a> explains when each fits.
</p>

<h2 id="data">Data protection</h2>
<p>
  If the team handles your customers' personal data, the contract should say how, for what purpose and with what safeguards. In India the <a href="/blog/dpdp-act-guide-for-app-founders">DPDP Act</a> treats the development team as a processor working on your instructions.
</p>

<h2 id="red-flags">Red flags in a proposal</h2>
<ul>
  <li>No written scope, only a total price.</li>
  <li>The vendor hosts your code in their own accounts.</li>
  <li>Large upfront payment with no milestones.</li>
  <li>No warranty or support terms.</li>
  <li>Vague answers about who will actually do the work.</li>
</ul>

<h2 id="creuto">How we handle it</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> every engagement starts with a written proposal within 24 hours of the first call, then a PRD, milestones, code in your own accounts from day one and a 60-day warranty after launch. For choosing a team in the first place, read <a href="/blog/how-to-choose-a-software-development-company">how to choose a software development company</a>.
</p>
`,
};
