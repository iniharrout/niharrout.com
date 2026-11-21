module.exports = {
  slug: 'software-development-estimates-explained',
  title: 'Software Estimates: How They Work and Why They Slip',
  headline: 'Software Development Estimates: How They Work, Why They Slip and How to Get a Better One',
  shortTitle: 'Software estimates',
  description: 'How software development estimates are made, why they slip and what to give a development team so the estimate you get back is one you can plan around.',
  keywords: ['software development estimate', 'how to estimate a software project', 'why software estimates are wrong', 'app development estimate', 'software project estimation'],
  category: 'Costs & Planning',
  badge: 'COSTS & PLANNING',
  readMinutes: 8,
  published: '2026-11-10',
  icon: 'doc',
  lead: 'An estimate is the number every founder plans around, and it is also the number most likely to be wrong. That is not because development teams are careless. It is because an estimate is a forecast made with incomplete information. Once you know how estimates are built and where they break, you can ask for one you can actually plan around.',
  cardDesc: 'How development teams build an estimate, the five reasons estimates slip and what to give a team so the number you get back holds up.',
  cta: { title: 'Want an estimate you can plan around?', text: 'Book a free 30-minute call. Walk me through your idea and I will tell you which parts are clear enough to estimate now and which need a short discovery first.', button: 'Book a free 30-minute call' },
  endCta: { title: 'Ready for a clear, written estimate?', text: 'After a short call you get a clear written proposal within 24 hours, with the first release, the assumptions and the milestones spelled out.', service: { href: '/services/custom-software-development/software-consulting', label: 'See software consulting' } },
  related: ['how-long-does-it-take-to-build-an-app', 'discovery-phase-in-software-development', 'fixed-price-vs-time-and-materials-software-development'],
  faq: [
    ['How accurate is a software development estimate?', 'It depends on how much is known when it is made. An estimate from a one-paragraph idea is a rough range. An estimate made after the screens, user roles, integrations and acceptance criteria are written down is much tighter. Accuracy grows as uncertainty shrinks, which is why a short discovery phase is often worth it.'],
    ['Why do two companies give such different estimates for the same app?', 'Usually because they are picturing different apps. One may assume a simple admin panel and one platform, the other a full back office, two platforms and integrations. Ask each team to list its assumptions, and compare those before you compare the numbers.'],
    ['Should I ask for a single number or a range?', 'Ask for a range plus the assumptions behind it. A single number hides the uncertainty rather than removing it. A range with clear assumptions tells you what would push the work to the high end, so you can decide early.'],
    ['What are story points and do I need to understand them?', 'Story points are a way for a team to size work relative to other work, rather than in hours. They help the team plan, but as a buyer you mainly need to know how much working software is delivered each week or two and whether that pace is steady.'],
    ['How can I make an estimate more reliable before the build starts?', 'Write down the users, the core workflow, every integration and what is out of scope for the first release. Share real examples of documents, reports or data the software must handle. Then ask the team to name the riskiest part and, if possible, test it first.'],
  ],
  body: `
<p>
  Here is a pattern that comes up often when founders talk to me about a project that went over. The team estimated the app described in a short brief. The app being built slowly grew past that brief. Nobody went back to update the forecast, so the gap only showed up when the money ran short. Nobody lied; the estimate simply stopped describing the work.
</p>
<p>
  This guide explains how development teams build an estimate, why estimates slip and what you can give a team so the number you get back holds up. I will not quote prices here because they depend on your scope. For a starting range, use our <a href="/project-costs">project cost guide</a> or the <a href="/tools/app-cost-calculator">app timeline calculator</a>.
</p>

<div class="blog-callout">
  <h4>The short version</h4>
  <p>
    An estimate is only as good as the information behind it. Ask for a range with written assumptions, give the team as much real detail as you can and expect the estimate to be updated as the project learns.
  </p>
</div>

<h2 id="what-an-estimate-is">What an estimate is, and what it is not</h2>
<p>
  An estimate is a forecast of effort, time and cost, based on what the team knows today. It is not a promise and it is not a quote. A quote is a commercial offer that may include margin, risk buffer and payment terms. An estimate is the thinking underneath it.
</p>
<p>
  The gap between the two matters. A team that shows you only a final quote is asking you to trust a number you cannot inspect. A team that shows you the estimate, broken into parts with assumptions, lets you see where the money goes and which decisions move it.
</p>

<h2 id="how-teams-estimate">How development teams build an estimate</h2>
<p>
  Most teams use one or more of these methods. Knowing them helps you read what you receive.
</p>
<table>
  <thead>
    <tr><th>Method</th><th>How it works</th><th>When it fits</th></tr>
  </thead>
  <tbody>
    <tr><td>Comparison with past projects</td><td>The team compares your idea with similar products it has shipped and adjusts for differences</td><td>Early conversations, before a detailed scope exists</td></tr>
    <tr><td>Feature breakdown</td><td>The work is split into screens, features and integrations, each sized separately, then added up</td><td>Once the first release is written down</td></tr>
    <tr><td>Three-point estimate</td><td>Each part gets an optimistic, likely and pessimistic figure, which turns into a range</td><td>Any time uncertainty is high and you want it visible</td></tr>
    <tr><td>Relative sizing</td><td>The team sizes work against other work using story points or simple sizes like small, medium and large</td><td>During the build, to plan each cycle</td></tr>
  </tbody>
</table>
<p>
  Relative sizing is common in agile teams. Atlassian's <a href="https://www.atlassian.com/agile/project-management/estimation" target="_blank" rel="noopener">guide to agile estimation</a> explains story points well if you want the detail. As a buyer, the useful question is simpler: how much working software does the team deliver each cycle, and is that pace steady?
</p>

<h2 id="why-estimates-slip">Five reasons estimates slip</h2>
<ol>
  <li><strong>The scope was vague.</strong> "User management" or "a dashboard" can mean a day or a month. If the scope does not name roles, screens and rules, the estimate is a guess dressed up as a number.</li>
  <li><strong>The scope grew.</strong> Small additions arrive one at a time and nobody updates the forecast. Our guide on <a href="/blog/scope-creep-in-software-projects">scope creep</a> covers how to catch this early.</li>
  <li><strong>Integrations were assumed to be simple.</strong> Payment gateways, ERPs, government systems and older internal tools often behave differently from their documentation. This is the most common single surprise I see.</li>
  <li><strong>The unseen work was left out.</strong> The admin panel, notifications, error handling, testing, app store review and deployment are real work. Estimates that only count the screens a customer sees will run short.</li>
  <li><strong>Decisions took longer than planned.</strong> When feedback or approvals take a week instead of a day, the calendar slips even if the effort does not.</li>
</ol>

{{cta}}

<h2 id="the-uncertainty">Why early estimates are ranges</h2>
<p>
  At the idea stage, there are many open questions: which users come first, which platform, what the admin side needs, which systems it connects to. Each open question widens the range. As decisions get made and written down, the range narrows. Software people sometimes call this the cone of uncertainty.
</p>
<p>
  This is why I am wary of any team that gives a precise figure after a single short call. Either they are pricing in a large hidden buffer, or they will be back later with change requests. A short <a href="/blog/discovery-phase-in-software-development">discovery phase</a> is often the cheapest way to turn a wide range into a narrow one.
</p>

<h2 id="what-to-give">What to give a team so the estimate holds up</h2>
<p>
  You control more of the estimate's accuracy than you might think. Before you ask for one, prepare:
</p>
<ul>
  <li><strong>Who uses it.</strong> Every type of user, such as customer, staff and admin, and what each one must be able to do.</li>
  <li><strong>The core workflow.</strong> The one journey that must work on day one, step by step.</li>
  <li><strong>Every integration.</strong> Each system it must talk to, with links to its documentation if you have them.</li>
  <li><strong>Real examples.</strong> Sample invoices, reports, spreadsheets or messages the software must produce or read.</li>
  <li><strong>What is out of scope.</strong> A written list of things the first release will not do.</li>
  <li><strong>Constraints.</strong> A launch date that cannot move, rules you must follow, or platforms you must support.</li>
</ul>
<p>
  Writing the core features as user stories with clear acceptance criteria helps even more, because "done" then means the same thing to you and to the team.
</p>

<h2 id="how-to-read">How to read the estimate you get back</h2>
<p>
  When the estimate arrives, check for these before you look at the total:
</p>
<ol>
  <li>Is it broken into parts you recognise, such as features, design, integrations, testing and launch?</li>
  <li>Are the assumptions written down? If an assumption is wrong, you want to know now.</li>
  <li>Does it name the riskiest part and say how the team will handle it?</li>
  <li>Does it include the unseen work: admin side, testing, deployment and store submission?</li>
  <li>Does it say what happens after launch, and for how long fixes are covered?</li>
  <li>Is there a clear way to handle changes, with their cost and time impact shown before you approve them?</li>
</ol>
<p>
  The way you pay also shapes how an estimate is used. A fixed price turns the estimate into a commitment for a written scope. Time and materials keeps the estimate as a forecast that you review together. Our comparison of <a href="/blog/fixed-price-vs-time-and-materials-software-development">fixed price and time and materials</a> explains when each fits.
</p>

<h2 id="keep-it-honest">Keep the estimate alive during the build</h2>
<p>
  An estimate made before the build should not be the last one. Ask the team to compare progress against the plan at every demo and to re-forecast when something changes. The <a href="https://scrumguides.org/scrum-guide.html" target="_blank" rel="noopener">Scrum Guide</a> builds this in: the team inspects progress toward its goal regularly and adapts the plan. The <a href="https://agilemanifesto.org/principles.html" target="_blank" rel="noopener">principles behind the Agile Manifesto</a> make the same point from another angle, by treating working software as the main measure of progress.
</p>
<p>
  In practice that means a short, regular update: what was finished, what is left, whether the range has moved and why. Bad news delivered in week three is a planning decision. The same news in week ten is a crisis.
</p>

<h2 id="how-we-work">How we estimate at Creuto</h2>
<p>
  After a free 30-minute strategy call, we send a clear written proposal within 24 hours. It breaks the work into parts, lists our assumptions and names the riskiest piece so you can see what would move the number. We keep the first release small on purpose, so a first working version is usually ready in about 4 weeks and the estimate is tested against real software early. Changes come back with their cost and time impact written down before anything is approved. Your code lives in your own accounts from day one, and every launch is covered by a 60-day warranty. You can read more about how we work at <a href="https://creuto.com" target="_blank" rel="noopener">creuto.com</a>.
</p>
`
};
