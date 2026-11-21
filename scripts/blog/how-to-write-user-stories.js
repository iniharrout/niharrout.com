module.exports = {
  slug: "how-to-write-user-stories",
  title: "How to Write User Stories: Format, Examples and Tips",
  headline: "How to Write User Stories That Developers Can Build From",
  shortTitle: "Write user stories",
  description: "How to write user stories: the standard format, acceptance criteria, the INVEST checklist, real examples and common mistakes founders make.",
  keywords: ["how to write user stories", "user story examples", "user story format", "acceptance criteria examples", "INVEST user stories"],
  category: "Product Strategy",
  badge: "PRODUCT STRATEGY",
  readMinutes: 7,
  published: "2026-10-22",
  icon: "doc",
  lead: "A user story describes a feature from the point of view of the person who uses it, in one sentence, with clear conditions for when it is done. Good user stories help founders and developers agree on what to build, and they make estimates and testing much easier.",
  cardDesc: "The user story format, acceptance criteria, the INVEST checklist, real examples and the mistakes to avoid.",
  cta: { title: "Turning an idea into a plan?", text: "Book a free 30-minute call. We will help you shape your idea into user stories and a first release.", button: "Book a free 30-minute call" },
  endCta: { title: "Need a PRD and backlog written?", text: "We turn ideas into a PRD, user stories and a milestone plan that development can start from.", service: { href: "/services/product-strategy-prd", label: "See product strategy and PRD" } },
  related: ["what-is-a-prd-how-to-write-a-product-requirements-document", "agile-vs-waterfall-software-development", "product-scoping-framework-kill-feature-bloat"],
  faq: [
    ["What is the user story format?", "As a [type of user], I want [an action] so that [a benefit]. For example: as a salon customer, I want to see free slots for my stylist so that I can book without calling."],
    ["What are acceptance criteria?", "Specific conditions that must be true for the story to be complete. They are often written as Given, When, Then statements and are used for testing."],
    ["What is the INVEST checklist?", "A set of qualities for good stories: Independent, Negotiable, Valuable, Estimable, Small and Testable."],
    ["How detailed should user stories be?", "Detailed enough that a developer and tester agree on what done means, but not so detailed that they describe every pixel. Designs and the PRD carry the rest."],
    ["Who writes user stories?", "Usually the product owner or product manager, with input from the founder, designers and developers. Writing them together reveals gaps early."],
  ],
  body: `
<p>
  When a founder gives me a long feature list, I rewrite it as user stories during scoping. It almost always reveals features nobody needed and steps nobody had thought about.
</p>

<div class="blog-callout">
  <h4>The format</h4>
  <p>
    As a <strong>[user]</strong>, I want <strong>[to do something]</strong> so that <strong>[I get a benefit]</strong>. Then list the acceptance criteria that prove it works.
  </p>
</div>

<h2 id="why">Why user stories help</h2>
<ul>
  <li>They keep the focus on users and outcomes, not technical tasks.</li>
  <li>They are small enough to estimate and build in short cycles.</li>
  <li>Acceptance criteria give testers a clear definition of done.</li>
  <li>They make prioritisation easier: which stories matter for launch?</li>
</ul>

<h2 id="examples">Examples</h2>
<table>
  <thead><tr><th>Weak</th><th>Better</th></tr></thead>
  <tbody>
    <tr><td>Add a booking system</td><td>As a salon customer, I want to see available slots for my preferred stylist so that I can book without calling.</td></tr>
    <tr><td>Notifications</td><td>As a customer, I want a reminder two hours before my appointment so that I do not miss it.</td></tr>
    <tr><td>Admin reports</td><td>As a salon owner, I want to see bookings per stylist each week so that I can plan staffing.</td></tr>
  </tbody>
</table>

<h2 id="acceptance">Writing acceptance criteria</h2>
<p>
  A common format is Given, When, Then:
</p>
<ul>
  <li><strong>Given</strong> I have a confirmed booking for 4 pm,</li>
  <li><strong>when</strong> it is 2 pm on the same day,</li>
  <li><strong>then</strong> I receive a reminder with the time, stylist and address, and a link to reschedule.</li>
</ul>
<p>
  Add criteria for errors too: what happens if the slot was just taken, or the payment fails?
</p>

{{cta}}

<h2 id="invest">The INVEST checklist</h2>
<p>
  The <a href="https://www.agilealliance.org/glossary/invest/" target="_blank" rel="noopener">Agile Alliance</a> describes INVEST as a check for good stories:
</p>
<ul>
  <li><strong>Independent:</strong> can be built without waiting for many others.</li>
  <li><strong>Negotiable:</strong> details can be discussed, it is not a contract.</li>
  <li><strong>Valuable:</strong> delivers something a user or the business cares about.</li>
  <li><strong>Estimable:</strong> the team can estimate it.</li>
  <li><strong>Small:</strong> fits within a short cycle.</li>
  <li><strong>Testable:</strong> has clear acceptance criteria.</li>
</ul>
<p>
  <a href="https://www.atlassian.com/agile/project-management/user-stories" target="_blank" rel="noopener">Atlassian's guide to user stories</a> is another practical reference.
</p>

<h2 id="organise">Organising stories</h2>
<ol>
  <li>Group stories into larger themes, often called epics, such as "booking" or "payments".</li>
  <li>Order them by the user journey, from sign-up to the core task.</li>
  <li>Mark which are needed for launch and which can wait.</li>
  <li>Put them in a shared backlog that the whole team can see.</li>
</ol>
<p>
  The <a href="/blog/product-scoping-framework-kill-feature-bloat">scoping framework</a> helps you decide what stays in the first release.
</p>

<h2 id="prd">User stories and the PRD</h2>
<p>
  The <a href="/blog/what-is-a-prd-how-to-write-a-product-requirements-document">PRD</a> explains the why: the problem, the users and the goals. User stories break that into buildable pieces. You need both, and they should agree.
</p>

<h2 id="mistakes">Common mistakes</h2>
<ul>
  <li>Writing technical tasks as stories ("set up the database").</li>
  <li>Stories so large they take weeks to build.</li>
  <li>No acceptance criteria, so "done" is a matter of opinion.</li>
  <li>Forgetting admin and staff users, who also need stories.</li>
</ul>

<h2 id="creuto">How we use them</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> scoping ends with a PRD and a prioritised backlog of user stories, which becomes the plan for each milestone. See how we run delivery in <a href="/blog/agile-vs-waterfall-software-development">agile vs waterfall</a>.
</p>
`,
};
