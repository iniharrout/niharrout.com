module.exports = {
  slug: 'ai-proof-of-concept',
  title: 'AI Proof of Concept: How to Scope and Run One',
  headline: 'AI Proof of Concept: How to Scope, Run and Judge One Before You Commit to a Full Build',
  shortTitle: 'AI proof of concept',
  description: 'How to run an AI proof of concept that ends in a clear decision: one question, pass marks set in advance, tests on real data, and a go or no-go call.',
  keywords: ['AI proof of concept', 'AI POC', 'how to run an AI proof of concept', 'AI POC success criteria', 'AI POC vs pilot', 'generative AI proof of concept'],
  category: 'Enterprise AI',
  badge: 'AI PRODUCT DEVELOPMENT',
  readMinutes: 9,
  published: '2026-11-12',
  icon: 'spark',
  lead: 'An AI proof of concept should answer one question: can AI do this specific task well enough, on your real data, to be worth building properly? Most proofs of concept fail not because the AI is weak but because nobody agreed in advance what "well enough" meant. This guide shows how to scope one, run it and make a clean go or no-go decision at the end.',
  cardDesc: 'How to scope an AI proof of concept, set pass marks before you start, test on real data and make a clear go or no-go decision.',
  cta: { title: 'Want a second opinion on your AI idea?', text: 'Book a free 30-minute call. We look at the task and your data and tell you honestly whether a proof of concept is worth running, and what it should test.', button: 'Book a free 30-minute call' },
  endCta: { title: 'Ready to test an AI idea properly?', text: 'Creuto is an OpenAI Select Partner. We scope a narrow proof of concept, test it on your real data and give you a written result you can act on.', service: { href: '/services/ai-product-development/ai-consulting', label: 'See AI consulting' } },
  related: ['ai-app-development-cost', 'how-to-add-ai-to-an-existing-product', 'how-to-choose-an-ai-development-company'],
  faq: [
    ['What is an AI proof of concept?', 'It is a small, time-boxed experiment that tests whether an AI approach can do one specific task well enough on your real data. It is not a product. Its output is evidence and a decision: build it, change the approach, or stop.'],
    ['How long should an AI proof of concept take?', 'Usually a few weeks, not months. If it keeps growing, the question was too broad. The length depends on how quickly you can provide real data and how many systems it needs to read from.'],
    ['What is the difference between an AI proof of concept and a pilot?', 'A proof of concept tests whether the AI can do the task at all, usually offline with a fixed set of test cases. A pilot puts a working version in front of a small group of real users to see whether it helps them in daily work.'],
    ['Can the proof of concept code become the product?', 'Sometimes parts of it can, such as prompts, test sets and data preparation. The quick scaffolding around it usually should not. Plan for the real build to add security, permissions, logging and monitoring that a proof of concept skips.'],
    ['What if the proof of concept fails?', 'A clear failure is a useful result. It saves you from funding a full build that would not have worked. Look at why it failed: poor data, the wrong approach or a task that needs exact answers. Sometimes a narrower version of the same idea passes.'],
  ],
  body: `
<p>
  Almost every AI conversation I have with founders and business owners starts the same way. They have seen a demo, they have an idea for their own business, and they want to know whether it will really work before they spend serious money. That is exactly what an AI proof of concept is for.
</p>
<p>
  The trouble is that many proofs of concept end with a nice demo and no decision. The team says "it mostly works", nobody knows whether "mostly" is good enough, and the project drifts. At Creuto we treat a proof of concept as an experiment with a question, a test set and a pass mark agreed before anyone writes code. Here is how to run one that way.
</p>

<div class="blog-callout">
  <h4>The one-line rule</h4>
  <p>
    If you cannot write down what result would make you stop, you are not ready to start. A proof of concept is only useful when both "yes" and "no" are possible answers.
  </p>
</div>

<h2 id="when-you-need-one">When you need a proof of concept, and when you do not</h2>
<p>
  A proof of concept is worth running when there is real uncertainty about whether AI can do the task. If the uncertainty is about whether users want the product, you need a prototype or an MVP instead. Our guide to <a href="/blog/mvp-vs-prototype-vs-proof-of-concept">MVP vs prototype vs proof of concept</a> explains the difference.
</p>
<ul>
  <li><strong>Run one when:</strong> the AI has to read your messy documents, handle your specific language or domain, make judgement calls, or reach an accuracy level you have not seen proven elsewhere.</li>
  <li><strong>Skip it when:</strong> the task is well understood, such as summarising meeting notes or drafting simple emails, and the main risk is product fit or integration work.</li>
  <li><strong>Question it when:</strong> the task needs an exactly correct answer every time with no human check. Ordinary rule-based software may be the better tool.</li>
</ul>

<h2 id="scope-it">Step 1: Scope it to one question</h2>
<p>
  The most common mistake is a proof of concept that tries to prove everything at once. Write a single sentence in this form:
</p>
<p>
  <em>"Can AI [do this task] on [this data] at [this quality level] for [this user]?"</em>
</p>
<p>
  For example: "Can AI pull the supplier name, invoice number, date and total from our scanned purchase invoices correctly often enough that staff only need to check the exceptions?" That sentence tells you the task, the data, the user and roughly how quality will be judged. Anything outside it, such as a dashboard, user accounts or a mobile app, waits for the real build.
</p>

<h2 id="success-criteria">Step 2: Set pass marks before you start</h2>
<p>
  Decide what success looks like while you are still neutral. Once people see a demo, it becomes hard to say no. A short criteria table is enough:
</p>
<table>
  <thead>
    <tr><th>What you measure</th><th>How you measure it</th><th>Example pass mark you might set</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Accuracy</strong></td><td>Share of test cases where the output matches the correct answer</td><td>A level your team agrees is worth reviewing, set before testing</td></tr>
    <tr><td><strong>Serious errors</strong></td><td>Cases where the output is wrong in a way that causes harm or cost</td><td>Fewer than an agreed number, and always caught by review</td></tr>
    <tr><td><strong>Knowing its limits</strong></td><td>Does it say "I am not sure" instead of guessing?</td><td>Flags unclear cases rather than inventing answers</td></tr>
    <tr><td><strong>Speed</strong></td><td>Time from input to output</td><td>Fast enough for the way people will use it</td></tr>
    <tr><td><strong>Running cost</strong></td><td>Model usage cost per task at expected volume</td><td>Below the value of the time or money it saves</td></tr>
  </tbody>
</table>
<p>
  The right pass marks depend on the task. Ticket tagging that a person reviews can live with more mistakes than reading medical or financial figures. The point is to write the numbers down first.
</p>

<h2 id="real-data">Step 3: Build a test set from real data</h2>
<p>
  The test set is the most valuable thing a proof of concept produces. It is a collection of real inputs from your business, each paired with the answer a skilled person would give. Without it, you are judging the AI by feel.
</p>
<ul>
  <li><strong>Use real examples,</strong> not clean samples written for the test. Include the blurry scans, the badly worded questions and the odd cases.</li>
  <li><strong>Include the hard cases on purpose.</strong> If a fifth of your real inputs are messy, a fifth of your test set should be too.</li>
  <li><strong>Have a domain expert write the correct answers.</strong> This is often the slowest part, so start it on day one.</li>
  <li><strong>Remove or mask personal data</strong> that the test does not need, and agree in writing which provider will see the data.</li>
</ul>
<p>
  Model providers publish guidance on this kind of testing. OpenAI's <a href="https://platform.openai.com/docs/guides/evals" target="_blank" rel="noopener">guide to evaluations</a> describes how to score model outputs against expected answers, and the same idea applies whichever model you use.
</p>

{{cta}}

<h2 id="run-it">Step 4: Try the simplest approach first</h2>
<p>
  Start with the least complex approach that could pass, and add complexity only when the test results tell you to.
</p>
<ol>
  <li><strong>A well-written prompt to a hosted model.</strong> Often enough for drafting, sorting and simple extraction.</li>
  <li><strong>Retrieval over your documents.</strong> When answers must come from your own content and show their source. Our guide on <a href="/blog/how-to-reduce-ai-hallucinations">how to reduce AI hallucinations</a> covers why grounding matters.</li>
  <li><strong>Tool use or multiple steps.</strong> When the task needs the AI to look things up in your systems or follow a sequence.</li>
  <li><strong>Fine-tuning.</strong> Rarely the first step. Consider it only when the simpler options fall short and you have many good examples.</li>
</ol>
<p>
  Run the full test set after every meaningful change and keep a simple log of the scores. That log shows whether you are improving or just moving errors around.
</p>

<h2 id="decide">Step 5: Make the go or no-go decision</h2>
<p>
  At the end, compare the results with the pass marks you set in step 2. There are only three honest outcomes:
</p>
<ul>
  <li><strong>Go:</strong> it met the pass marks. Move to a proper build and a small pilot with real users.</li>
  <li><strong>Change course:</strong> it came close, and the failures point to a fixable cause such as poor source documents or a narrower task.</li>
  <li><strong>Stop:</strong> it missed clearly and the failures look built into the task. You have saved the cost of a full build.</li>
</ul>
<p>
  Ask for a short written report, not only a demo. It should cover the question, the test set, the approaches tried, the scores, examples of failures and an estimate of what the real build needs. Our guide to <a href="/blog/ai-app-development-cost">AI app development cost</a> explains what drives that next budget, and the <a href="/project-costs">project costs page</a> shows how we price work.
</p>

<h2 id="poc-to-product">What changes between the proof of concept and the product</h2>
<p>
  A proof of concept skips things on purpose. The real build adds them back, and they are often most of the work:
</p>
<ul>
  <li><strong>Security and permissions,</strong> so each user only sees what they are allowed to see.</li>
  <li><strong>Human review screens</strong> for low-confidence or high-risk outputs.</li>
  <li><strong>Logging and monitoring,</strong> so you can see quality and cost after launch.</li>
  <li><strong>Integration</strong> with your existing software, data and sign-in.</li>
  <li><strong>Ongoing testing,</strong> because models and your data change over time.</li>
</ul>
<p>
  For a structured view of AI risk across this whole lifecycle, the US National Institute of Standards and Technology publishes the <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener">AI Risk Management Framework</a>. It is a useful checklist even for small teams.
</p>

<h2 id="red-flags">Red flags when a vendor runs your proof of concept</h2>
<ul>
  <li>No written question or pass marks before work starts.</li>
  <li>Testing only on examples the vendor chose or wrote.</li>
  <li>A demo with no scores and no failure examples.</li>
  <li>The test set and prompts stay with the vendor instead of in your accounts.</li>
  <li>Pressure to sign for a full build before the results are in.</li>
</ul>
<p>
  At Creuto, everything we build for a client, including test sets and prompts, lives in the client's own accounts from day one. If you are comparing partners, our guide on <a href="/blog/how-to-choose-an-ai-development-company">how to choose an AI development company</a> lists the questions to ask.
</p>

<h2 id="how-we-help">How we run proofs of concept at Creuto</h2>
<p>
  We start with a free 30-minute call to understand the task and look at sample data. If a proof of concept makes sense, you get a clear written proposal within 24 hours of the call with the question, the pass marks and what you need to provide. If the idea passes, we move to a proper build, and the first working version usually takes about 4 weeks. You can read more about our work at <a href="https://creuto.com" target="_blank" rel="noopener">creuto.com</a>.
</p>
`
};
