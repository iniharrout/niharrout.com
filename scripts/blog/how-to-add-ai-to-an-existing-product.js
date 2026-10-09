module.exports = {
  slug: 'how-to-add-ai-to-an-existing-product',
  title: 'How to Add AI to an Existing Product: A 6-Step Plan',
  headline: 'How to Add AI to an Existing Product: A Practical 6-Step Plan for Founders and Product Teams',
  shortTitle: 'Add AI to your product',
  description: 'Add AI to a product you already run without wasting budget. A 6-step plan: pick one workflow, check your data, choose an approach, add guardrails, pilot.',
  keywords: ['how to add AI to an existing product', 'integrate AI into an app', 'AI features for SaaS', 'AI product development', 'LLM integration plan'],
  category: 'Enterprise AI',
  badge: 'AI PRODUCT DEVELOPMENT',
  readMinutes: 10,
  published: '2026-10-10',
  icon: 'spark',
  lead: 'You do not need to rebuild your product around AI. You need to find one workflow where AI saves real time or money, prove it on a small scale and then ship it with safeguards. This six-step plan shows how to do that without burning budget on a demo that never reaches your customers.',
  cardDesc: 'A six-step plan for adding AI to a product you already run: pick one workflow, check your data, choose an approach, add guardrails, pilot and ship.',
  cta: { title: 'Not sure where AI fits in your product?', text: 'Book a free 45-minute call. We look at your workflows, tell you honestly where AI helps and where it does not, and outline a small first pilot.', button: 'Book a free AI strategy call' },
  endCta: { title: 'Ready to scope a first AI feature?', text: 'Creuto is an OpenAI Select Partner. We start with one workflow, test it on your real data and ship only what passes.', service: { href: '/services/ai-product-development', label: 'Explore AI product development' } },
  related: ['pragmatic-enterprise-ai-workflows', 'openai-select-partner', 'product-scoping-framework-kill-feature-bloat'],
  faq: [
    ['Do I need to rebuild my product to add AI?', 'No. Most useful AI features are added to an existing product as a new service that your current system calls, such as search over your documents, a drafting assistant or automatic sorting of incoming requests. Your core product stays as it is.'],
    ['How do I know if AI is the right tool for my problem?', 'Ask whether the task involves language, documents, images or fuzzy judgement that rules cannot capture, and whether an occasional mistake is acceptable or can be caught by a person. If the answer needs to be exactly right every time, a normal rule-based feature is often better.'],
    ['Will my company data be used to train public AI models?', 'It does not have to be. Enterprise agreements with major providers and private deployment options keep your data out of public model training. Confirm this in writing for any provider you use and limit what you send to what the task needs.'],
    ['How do I stop an AI feature from making things up?', 'You reduce it, rather than remove it. Ground answers in your own documents, require the feature to cite its sources, validate outputs against rules, and send risky answers to a person for approval. Test on your real questions before launch.'],
    ['How long does a first AI pilot take?', 'A narrow pilot on one workflow can often be built and tested in a few weeks. The timeline depends on how clean your data is and how many systems it touches. We scope it after looking at your workflow and data.'],
  ],
  body: `
<p>
  Almost every product team is being asked the same question right now: "What are we doing with AI?" The pressure leads to two common mistakes. Some teams bolt a chatbot onto the homepage and hope it works. Others commission a large AI project with no clear goal and discover six months later that nobody uses it.
</p>
<p>
  There is a calmer way to do it. Treat AI like any other feature: pick a real problem, test a small version with real data, put safeguards around it and only then expand. At Creuto we work with teams that already have a product, and this is the sequence we follow.
</p>

<div class="blog-callout">
  <h4>The principle</h4>
  <p>
    Start from a workflow that hurts, not from a model that excites you. A good AI feature is the one your customers or team stop noticing because the task just got easier.
  </p>
</div>

<h2 id="where-ai-fits">Where AI actually helps in an existing product</h2>
<p>
  AI is strongest where there is a lot of language, documents or messy input and where a person currently does the sorting, searching or first draft. Typical examples:
</p>
<ul>
  <li><strong>Search and answers over your own content:</strong> staff or customers ask questions and get answers with links to the source document.</li>
  <li><strong>Support triage:</strong> incoming tickets are labelled, routed and given a suggested reply for an agent to approve.</li>
  <li><strong>Document extraction:</strong> invoices, contracts or forms become structured data without manual typing.</li>
  <li><strong>Drafting and summarising:</strong> first drafts of emails, reports or meeting notes that a person edits.</li>
  <li><strong>Recommendations and tagging:</strong> suggesting the next step, product or category based on past behaviour.</li>
</ul>
<p>
  It is weaker where the answer must be exactly right every time with no review, such as final financial calculations or legal decisions. For those, ordinary rule-based software is usually safer and cheaper.
</p>

<h2 id="the-six-steps">The 6-step plan</h2>

<h3>Step 1: Pick one workflow and one measure</h3>
<p>
  Choose a single task that is repetitive, slow or expensive today. Write down how you measure it now, for example "support agents spend a long time finding the right policy" or "ops staff retype invoice details". That measure becomes your success test later. If you cannot name a number or behaviour to improve, choose a different workflow.
</p>

<h3>Step 2: Check your data</h3>
<p>
  AI is only as useful as the information it can use. Ask:
</p>
<ul>
  <li>Where does the relevant information live: documents, a database, a help centre, email?</li>
  <li>Is it current, consistent and permitted to be used this way?</li>
  <li>Who is allowed to see what? A good feature respects the same permissions your product already has.</li>
</ul>
<p>
  Messy or outdated data is the most common reason a promising pilot disappoints. Fixing it is often the real first task.
</p>

<h3>Step 3: Choose the right approach</h3>
<p>
  There is more than one way to add AI, and the simplest that works is usually the right one:
</p>
<table>
  <thead>
    <tr><th>Approach</th><th>Good for</th><th>Watch out for</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Prompting a hosted model</strong></td><td>Drafting, summarising, simple classification</td><td>Consistency and sending sensitive data out</td></tr>
    <tr><td><strong>Retrieval over your documents (RAG)</strong></td><td>Answers grounded in your own content with sources</td><td>Quality of documents and permissions</td></tr>
    <tr><td><strong>Fine-tuning a model</strong></td><td>A very specific style or format at scale</td><td>Needs good examples, rarely the first step</td></tr>
    <tr><td><strong>Classic machine learning or rules</strong></td><td>Predictions on structured data, exact logic</td><td>Not suited to free text</td></tr>
  </tbody>
</table>
<p>
  We run a short feasibility check to decide which approach fits, and sometimes the answer is "this does not need AI". That honest answer saves money. You can read more about this in our post on <a href="/blog/pragmatic-enterprise-ai-workflows">pragmatic enterprise AI workflows</a>.
</p>

<h3>Step 4: Design guardrails and a human check</h3>
<p>
  This step separates a demo from a feature you can trust. Plan these before you build:
</p>
<ul>
  <li><strong>Grounding and citations:</strong> answers come from your documents and show where they came from.</li>
  <li><strong>Permissions:</strong> the feature only retrieves what the current user may see.</li>
  <li><strong>Validation:</strong> outputs are checked against rules, such as required fields or allowed values.</li>
  <li><strong>Human approval:</strong> anything risky, such as finance, health or legal content, goes to a person before it reaches a customer.</li>
  <li><strong>Spend limits and logging:</strong> usage costs are capped and every request is recorded for review.</li>
</ul>

{{cta}}

<h3>Step 5: Run a small pilot and measure it</h3>
<p>
  Release to a small group, such as one team or a slice of customers. Compare the measure you picked in step 1 before and after. Collect examples where the feature failed, because those teach you the most. Decide in advance what result counts as success so the decision is not driven by excitement.
</p>
<p>
  Before launch, test on your own real questions or documents, not only on clean samples. Only ship what passes.
</p>

<h3>Step 6: Ship, monitor and improve</h3>
<p>
  After launch, watch quality, usage and cost. Models and data change, so check results regularly, keep a way for users to flag bad answers and update your documents as the business changes. Expand to the next workflow only once the first one is stable and clearly paying for itself.
</p>

<h2 id="example-pilots">Three example pilots</h2>
<p>
  To make this concrete, here are three hypothetical first pilots. They show how small and specific a good starting point is.
</p>
<ul>
  <li><strong>Internal knowledge search:</strong> a support team asks questions in plain language and gets answers drawn from the help centre and policy documents, each with a link to the source. Measure the time agents spend searching before and after.</li>
  <li><strong>Ticket triage:</strong> incoming requests are labelled by topic and urgency and routed to the right queue with a suggested reply. A person approves the reply. Measure first-response time and misrouted tickets.</li>
  <li><strong>Invoice capture:</strong> uploaded invoices are read and turned into structured fields for review. Staff correct exceptions instead of retyping every field. Measure minutes per invoice and error rate.</li>
</ul>
<p>
  Notice the pattern: one workflow, one measure, a person in the loop and a clear before-and-after comparison.
</p>

<h2 id="measure-roi">How to measure whether it paid off</h2>
<p>
  Judge an AI feature the same way you judge any investment. Compare what you measured in step 1 against the pilot group, and count the full cost: build time, running costs such as model usage, and the time people spend reviewing results.
</p>
<ul>
  <li><strong>Time saved:</strong> minutes per task, multiplied by how often it happens.</li>
  <li><strong>Quality:</strong> error rates, rework, customer satisfaction or resolution speed.</li>
  <li><strong>Adoption:</strong> how many people use it voluntarily after the first week. Low adoption usually means it is not helping.</li>
  <li><strong>Running cost:</strong> monthly usage against the value created.</li>
</ul>
<p>
  If the numbers do not justify scaling, that is still a good outcome. You learned cheaply, and you can try a different workflow.
</p>

<h2 id="prepare">What to prepare before you talk to an AI team</h2>
<ul>
  <li>The one workflow you want to improve, and how it is done today.</li>
  <li>Examples of real inputs and the correct outputs, such as past tickets with the replies that worked.</li>
  <li>Where the data lives and who is allowed to access it.</li>
  <li>Any rules about customer data, regions or industries that limit what can be sent to an outside provider.</li>
  <li>A rough view of how you will decide the pilot succeeded.</li>
</ul>
<p>
  Having these ready makes the first conversation far more useful, and lets a team give you an honest view on feasibility much faster.
</p>

<h2 id="risks">The risks to plan for</h2>
<ul>
  <li><strong>Privacy:</strong> know what data leaves your systems, which provider handles it and under what agreement. Send only what the task needs.</li>
  <li><strong>Wrong answers:</strong> plan for them with sources, validation and review rather than hoping they will not happen.</li>
  <li><strong>Cost creep:</strong> usage-based pricing can grow quietly. Cache repeated work and set limits.</li>
  <li><strong>Over-promising:</strong> tell users what the feature can and cannot do, and show when something is AI-generated.</li>
</ul>

<h2 id="build-or-buy">Should you build it or buy a ready-made tool?</h2>
<p>
  If a packaged tool already does the job and your needs are common, buy it. Build when the feature depends on your own data, workflows or permissions, or when it should feel like a native part of your product. A first pilot is a good way to find out which side you are on without a large commitment.
</p>
<p>
  If you are still working out what you want built, our guide to <a href="/blog/product-scoping-framework-kill-feature-bloat">scoping a product before you build</a> applies to AI features too. Start with a narrow first release and a written plan. You can also read about <a href="/blog/openai-select-partner">our OpenAI Select Partner status</a> and what it means for the work.
</p>
`
};
