module.exports = {
  slug: 'what-is-a-prd-how-to-write-a-product-requirements-document',
  title: 'What Is a PRD? How to Write a Product Requirements Document',
  headline: 'What Is a PRD? How to Write a Product Requirements Document (With a Section-by-Section Outline)',
  shortTitle: 'What is a PRD?',
  description: 'A PRD (product requirements document) turns an idea into something a team can build. Learn the 10 sections, PRD vs BRD, and common mistakes.',
  keywords: ['what is a PRD', 'product requirements document', 'PRD template', 'how to write a PRD', 'PRD vs BRD'],
  category: 'Product Strategy',
  badge: 'PRODUCT STRATEGY & PRD',
  readMinutes: 11,
  published: '2026-10-10',
  icon: 'doc',
  lead: 'A PRD is the written plan that sits between your idea and the first line of code. It is the cheapest place to find mistakes, and the document that lets a team give you an honest estimate. This guide explains what goes in it and how to write one yourself.',
  cardDesc: 'What a PRD is, how it differs from a BRD, the ten sections to write, a worked example and the mistakes that make requirements useless.',
  cta: { title: 'Have an idea but no PRD yet?', text: 'In a free 45-minute call we map your idea, cut it down to a first release and outline the PRD. A clear proposal follows within 24 hours.', button: 'Book a free strategy call' },
  endCta: { title: 'Want help turning your idea into a PRD?', text: 'I write PRDs with founders and teams, from first draft to a clickable prototype and a fixed-scope proposal.', service: { href: '/services/product-strategy-prd', label: 'See the product strategy and PRD service' } },
  related: ['product-scoping-framework-kill-feature-bloat', 'how-to-choose-a-software-development-company', 'cost-to-build-mvp-2026'],
  faq: [
    ['What is the difference between a PRD and a BRD?', 'A BRD (business requirements document) explains why the business needs something: goals, stakeholders, costs and benefits. A PRD explains what the product must do to meet those goals: users, features, rules and acceptance criteria. Small teams often combine them into one document.'],
    ['How long should a PRD be?', 'Long enough that two developers would build the same thing from it, and short enough that you will keep it updated. For a first release that is often a handful of pages plus screens. Length is not the goal. Clarity is.'],
    ['Do I need a PRD for a small app?', 'Yes, but a lighter one. Even a two-page document listing users, the core flow, what is out of scope and how you will measure success removes most of the guesswork that inflates quotes.'],
    ['Who should write the PRD?', 'The person who owns the product decisions, usually the founder or product lead, with input from design and engineering. Developers should review it before sign-off to flag what is risky or unclear.'],
    ['Can AI write my PRD?', 'AI can help produce a first draft or tidy your notes. It cannot know your customers or decide what to leave out. Treat any generated draft as a starting point, then challenge every line against real user needs.'],
  ],
  body: `
<p>
  Nearly every software project that runs over budget has the same story behind it. The idea was clear in the founder's head, the team started building on a short description, and halfway through everyone discovered they had imagined different products. A product requirements document, usually called a PRD, exists to stop that from happening.
</p>
<p>
  In this guide I explain what a PRD is, how it differs from a BRD, the ten sections I put in every one, and the mistakes that make a PRD useless. It is based on more than eight years of leading product work, and it is written so you can draft your own before you ever speak to a development company.
</p>

<h2 id="what-is-a-prd">What is a PRD?</h2>
<p>
  A PRD, or product requirements document, is a written description of what a product must do, who it is for and how you will know it works. It turns a general idea such as "an app for booking dog walkers" into specific, testable statements: who books, what they see, what happens when a walker cancels, what is not part of the first release.
</p>
<p>
  A good PRD has three jobs:
</p>
<ul>
  <li><strong>Align people.</strong> Founders, designers, developers and investors all read the same description of the product.</li>
  <li><strong>Reduce risk.</strong> Changing a sentence costs minutes. Changing built software costs days or weeks.</li>
  <li><strong>Make estimates honest.</strong> A team can only price and schedule what has been described. A clear PRD is the difference between a guess and a plan.</li>
</ul>

<div class="blog-callout">
  <h4>A useful test</h4>
  <p>
    Give your PRD to two developers separately and ask each to describe what they would build. If their descriptions differ, the document is not finished.
  </p>
</div>

<h2 id="prd-vs-brd">PRD vs BRD vs other requirements documents</h2>
<p>
  The names get mixed up, so here is how the common ones differ:
</p>
<table>
  <thead>
    <tr><th>Document</th><th>Main question it answers</th><th>Typical audience</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>BRD</strong> (business requirements)</td><td>Why does the business need this, and what is the payoff?</td><td>Executives, sponsors, finance</td></tr>
    <tr><td><strong>PRD</strong> (product requirements)</td><td>What must the product do for its users?</td><td>Product, design, engineering</td></tr>
    <tr><td><strong>FRD or SRS</strong> (functional or software requirements)</td><td>Exactly how must each function behave and be built?</td><td>Engineers, testers</td></tr>
  </tbody>
</table>
<p>
  For startups and most first products I recommend one document that covers the business reason in a short opening section and then spends the rest of its length on the PRD itself. Large enterprises with formal approval steps often keep them separate. Either way, start with the problem, not with features.
</p>

<h2 id="ten-sections">The 10 sections of a PRD</h2>
<p>
  Here is the outline I use. You can copy it into a document and fill it in.
</p>

<h3>1. Problem and goals</h3>
<p>
  Describe the problem in two or three sentences, who has it and why it matters now. Add one to three goals you can measure, such as "reduce time to book from ten minutes to two". If you cannot state the problem simply, the product is not ready to build.
</p>

<h3>2. Users and their jobs</h3>
<p>
  List each type of user and what they are trying to get done. A marketplace usually has at least two: the person who buys and the person who provides. Add an admin if someone on your team will run the product.
</p>

<h3>3. Scope: in, out and later</h3>
<p>
  This is the most valuable section. Write three lists: what is in the first release, what is explicitly out, and what you will consider later. Being strict here is how you protect budget and timeline. Our guide on <a href="/blog/product-scoping-framework-kill-feature-bloat">cutting feature bloat before you build</a> shows how to make these decisions.
</p>

<h3>4. User flows and stories</h3>
<p>
  Describe the main journeys step by step, for example "customer finds a walker, picks a time, pays, gets a confirmation". Write them as short stories in the form <em>As a [user], I want to [do something] so that [benefit]</em>.
</p>

<h3>5. Functional requirements with acceptance criteria</h3>
<p>
  For each feature, write what it does and how someone will check it works. Acceptance criteria are plain, testable sentences. For example:
</p>
<div class="blog-callout">
  <h4>Example: booking a time slot</h4>
  <p>
    A customer can choose only slots that the walker marked as available. After payment succeeds, the slot is removed from the list for other customers and a confirmation is sent by email within one minute. If payment fails, the slot is released and the customer sees a clear message.
  </p>
</div>

<h3>6. Non-functional requirements</h3>
<p>
  These cover how the product behaves rather than what it does: speed, security, privacy, accessibility, supported devices and browsers, and what happens if the internet drops. They are easy to forget and expensive to add late.
</p>

<h3>7. Screens and prototype</h3>
<p>
  Link to sketches, wireframes or a clickable prototype. A prototype is the fastest way to find out that two people imagined different screens. Changing a flow in a design tool takes minutes, while changing it after the database and logic are built takes much longer.
</p>

<h3>8. Data and integrations</h3>
<p>
  List the information the product stores and the outside services it connects to, such as payments, maps, email, SMS or an existing system. Integrations often hide the most uncertainty, so name them early.
</p>

<h3>9. Success metrics</h3>
<p>
  Decide how you will judge the first release: sign-ups, completed bookings, hours saved, error rates. Without a metric, "did it work?" becomes an opinion.
</p>

<h3>10. Milestones, risks and open questions</h3>
<p>
  Break the work into milestones that each end with something you can see and test. List known risks and questions nobody has answered yet. An honest list of unknowns is a sign of a strong PRD, not a weak one.
</p>

{{cta}}

<h2 id="mini-example">A worked mini example</h2>
<p>
  Here is how the first three sections might look for an imaginary product, a booking app for local dog walkers. It is only an illustration of the level of detail to aim for.
</p>
<div class="blog-callout">
  <h4>Problem and goal</h4>
  <p>
    Busy owners struggle to find a trusted walker for short notice. Goal for release one: a customer can find, book and pay for a walk in under two minutes, and at least half of walkers keep their calendar up to date.
  </p>
</div>
<div class="blog-callout">
  <h4>Scope</h4>
  <p>
    <strong>In:</strong> customer sign-up, walker profiles, availability calendar, booking, card payment, email confirmation, a simple admin view. <strong>Out:</strong> in-app chat, live GPS tracking, group walks, reviews. <strong>Later:</strong> subscriptions and gift cards.
  </p>
</div>
<div class="blog-callout">
  <h4>Open questions</h4>
  <p>
    How are walkers verified? What is the cancellation window? Who handles refunds? Writing these down early is far cheaper than discovering them during testing.
  </p>
</div>

<h2 id="checklist">A quick PRD checklist</h2>
<p>
  Before you send a PRD to a team, check that you can answer yes to each of these:
</p>
<ul>
  <li>Can I state the problem and the user in two sentences?</li>
  <li>Does every feature trace back to a goal or a user job?</li>
  <li>Is there a written list of what is out of scope?</li>
  <li>Does each key feature have acceptance criteria someone could test?</li>
  <li>Have I described what happens when something fails, such as a declined payment or a lost connection?</li>
  <li>Do I have a sketch or prototype for every main screen?</li>
  <li>Have I named every outside service the product needs to connect to?</li>
  <li>Have I chosen at least one measurable success metric?</li>
  <li>Has someone technical read it and listed their concerns?</li>
</ul>

<h2 id="common-mistakes">Common PRD mistakes</h2>
<ul>
  <li><strong>Writing features instead of problems.</strong> A long feature list hides whether any of it solves anything.</li>
  <li><strong>No "out of scope" list.</strong> If it is not written down as excluded, someone will assume it is included.</li>
  <li><strong>Vague words.</strong> "Fast", "simple" and "user-friendly" cannot be tested. Replace them with numbers and examples.</li>
  <li><strong>Skipping edge cases.</strong> Cancellations, failed payments, empty states and lost connections are where most bugs live.</li>
  <li><strong>Writing it once and filing it.</strong> A PRD is a living document. Update it when decisions change, and note the date.</li>
  <li><strong>No engineering review.</strong> Developers spot risk and complexity that are invisible to non-technical readers.</li>
</ul>

<h2 id="prd-to-estimate">How a PRD turns into an honest estimate</h2>
<p>
  A team cannot give you a reliable price for an idea. It can give you one for a written plan. Once the scope, flows, screens and integrations are described, each piece can be sized, grouped into milestones and agreed as a fixed scope. That is why we write the PRD and a clickable prototype first and send a proposal afterwards, rather than quoting from a short description.
</p>
<p>
  If you want a rough range before the PRD exists, use the free <a href="/tools/app-cost-calculator">app cost calculator</a> and read the <a href="/project-costs">project costs guide</a>. Treat the result as a starting point and expect it to sharpen once your scope is written.
</p>

<h2 id="tools-and-tips">Tools and practical tips</h2>
<ul>
  <li><strong>Where to write it:</strong> any shared document works. What matters is that everyone reads the same version.</li>
  <li><strong>Where to design it:</strong> a design tool for wireframes and a clickable prototype, linked from the PRD.</li>
  <li><strong>How to keep it short:</strong> link to detail rather than pasting it, and move finished decisions out of the open-questions list.</li>
  <li><strong>When to stop:</strong> when a new team member could build the first release from it without asking you anything important.</li>
</ul>
<p>
  If you plan to hire a team, the PRD is also your most useful screening tool. See <a href="/blog/how-to-choose-a-software-development-company">how to choose a software development company</a> for the questions to ask once you have one.
</p>
`
};
