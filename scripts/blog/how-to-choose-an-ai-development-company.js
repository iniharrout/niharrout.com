module.exports = {
  slug: 'how-to-choose-an-ai-development-company',
  title: 'How to Choose an AI Development Company: 10 Questions',
  headline: 'How to Choose an AI Development Company: 10 Questions to Ask Before You Sign',
  shortTitle: 'Choose an AI company',
  description: 'Hiring a team to build an AI feature or app? Ask these 10 questions on data, testing, model choice and running costs before you sign a contract.',
  keywords: ['how to choose an AI development company', 'hire AI developers', 'AI development partner', 'AI software development company', 'questions to ask an AI development company'],
  category: 'Enterprise AI',
  badge: 'AI FOR BUSINESS',
  readMinutes: 8,
  published: '2026-10-29',
  icon: 'spark',
  imageAlt: 'Questions to ask before hiring an AI development company',
  lead: 'Almost every software company now says it builds AI. Some have shipped AI features that real users rely on; others have wired up a chatbot demo. The questions below help you tell the difference before you sign, without needing to be an AI expert yourself.',
  cardDesc: 'Ten questions to ask an AI development company about data, testing, model choice, privacy and running costs, plus the red flags to watch for.',
  cta: { title: 'Comparing AI proposals right now?', text: 'Bring them to a free 30-minute call. I will go through the 10 questions with you and point out what each proposal leaves out, even if you choose another team.', button: 'Book a free 30-minute call' },
  endCta: { title: 'Planning an AI feature or product?', text: 'Creuto is an OpenAI Select Partner. After a short call you get a clear written proposal within 24 hours, with build and running costs set out separately.', service: { href: '/services/ai-product-development/ai-development', label: 'See AI development' } },
  related: ['ai-app-development-cost', 'how-to-choose-a-software-development-company', 'how-to-add-ai-to-an-existing-product'],
  faq: [
    ['What should I look for in an AI development company?', 'Look for a team that asks about your workflow and data before talking about models, shows AI features it has shipped to real users, explains how it will test accuracy, and gives you separate figures for build cost and monthly running cost.'],
    ['Do I need an AI specialist company or a regular software company?', 'In most business AI projects, the model is only one part. The rest is normal software: screens, integrations, permissions and data pipelines. A team that does both well is usually a safer choice than a pure AI research shop or a web agency adding AI for the first time.'],
    ['How do I know if an AI company is just building a demo?', 'Ask how they measure quality. A team that has shipped AI to production will talk about test sets, accuracy targets, fallbacks when the model is unsure, and monitoring after launch. A demo-only team will mostly talk about prompts and the model name.'],
    ['Who should own the AI model, prompts and data?', 'You should. Prompts, test sets, fine-tuned models, vector databases and API accounts should sit in your own accounts and be listed in the contract as your property, just like the source code.'],
    ['How long does it take to build a first AI feature?', 'It depends on the data and the workflow. At Creuto, a focused first working version typically takes about 4 weeks, and we usually start with one narrow workflow so you can measure value before expanding.'],
  ],
  body: `
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> we build AI features and apps for founders and businesses, and I see the same pattern in many first calls. The founder has spoken to two or three companies, all of whom said yes to everything, and has no way to compare them. The proposals list model names and buzzwords, but not how the thing will be tested, what it will cost to run each month, or what happens when it gets an answer wrong.
</p>
<p>
  This guide gives you ten questions that separate teams who ship working AI from teams who ship demos. You do not need to understand how large language models work to ask them. You only need to listen for clear, specific answers.
</p>

<div class="blog-callout">
  <h4>The short version</h4>
  <p>
    Pick the team that asks about your workflow and data first, can show AI it has shipped to real users, explains how it measures accuracy, separates build cost from running cost, and puts everything in your own accounts.
  </p>
</div>

<h2 id="why-different">Why choosing an AI team is different</h2>
<p>
  With normal software, a feature either works or it does not. AI features work most of the time, and the hard part is the rest of the time. That changes what you need from a partner:
</p>
<ul>
  <li><strong>Quality is measured, not assumed.</strong> Someone has to define what a good answer looks like and test against it.</li>
  <li><strong>Costs continue after launch.</strong> Every AI call to a hosted model is billed, so running cost matters as much as build cost.</li>
  <li><strong>Data handling carries more risk.</strong> Customer data may be sent to a model provider, so privacy and access rules need to be designed in.</li>
</ul>
<p>
  The general questions in my guide on <a href="/blog/how-to-choose-a-software-development-company">how to choose a software development company</a> still apply. The ten below are the AI-specific layer on top.
</p>

<h2 id="questions">The 10 questions to ask</h2>

<h3>1. "What problem would you solve first, and how will we know it worked?"</h3>
<p>
  A good team narrows your idea to one workflow and one measurable outcome, such as the share of support tickets answered without a human, or minutes saved per invoice. If the answer is "we will add AI across your platform", the scope is not clear yet.
</p>

<h3>2. "Can you show me AI you have shipped to real users?"</h3>
<p>
  Ask for a live product, not slides. Open it, try to break it, and ask what went wrong after launch and how they fixed it. Teams that have run AI in production have stories about edge cases; teams that have not will only have demos.
</p>

<h3>3. "What data do you need from us, and what if it is messy?"</h3>
<p>
  Most AI features depend on your documents, records or past conversations. A serious team will ask to see samples early and tell you honestly if the data is not ready. If nobody asks about your data before quoting, the quote is a guess.
</p>

<h3>4. "Which approach would you use: prompting, RAG, fine-tuning or a classic model?"</h3>
<p>
  You do not need to know the answer, but the team should explain its choice in plain words and say why the simpler options are not enough. My guide on <a href="/blog/rag-vs-fine-tuning">RAG vs fine-tuning</a> covers the trade-offs. Be wary of a team that jumps to training a custom model when a well-designed prompt with your documents would do.
</p>

<h3>5. "How will you test accuracy before launch?"</h3>
<p>
  Listen for a test set: a list of real questions or inputs with known good answers that the system is scored against every time it changes. Ask what accuracy target they would propose and what happens below it. The <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener">NIST AI Risk Management Framework</a> is a useful reference for the kind of measurement and monitoring a responsible team should plan.
</p>

<h3>6. "What happens when the AI is wrong or unsure?"</h3>
<p>
  Every model makes mistakes. The question is what the product does next: show sources, ask a clarifying question, hand over to a human, or refuse. A team that has thought about this will describe fallbacks and guardrails, the topics covered in my guide on <a href="/blog/how-to-reduce-ai-hallucinations">how to reduce AI hallucinations</a>.
</p>

{{cta}}

<h3>7. "Where does our data go, and who can see it?"</h3>
<p>
  Ask which model provider they will use, whether your data is used for training, where it is stored and how access is controlled. Major providers publish their terms, for example <a href="https://openai.com/enterprise-privacy/" target="_blank" rel="noopener">OpenAI's enterprise privacy commitments</a>, and your partner should be able to point you to the exact policy that applies. Also ask how they protect against prompt injection and data leaks; the <a href="https://genai.owasp.org/llm-top-10/" target="_blank" rel="noopener">OWASP Top 10 for LLM applications</a> lists the common risks.
</p>

<h3>8. "What will it cost to run each month?"</h3>
<p>
  A clear proposal separates the one-time build cost from monthly running costs: model usage, hosting, vector storage and monitoring. Ask how running cost changes with usage and what they would do to keep it predictable, such as caching or using a smaller model for simple requests. My guide on <a href="/blog/ai-app-development-cost">AI app development cost</a> explains the main drivers.
</p>

<h3>9. "Who owns the prompts, data, models and accounts?"</h3>
<p>
  Code ownership is standard; AI adds more assets. Prompts, test sets, fine-tuned models, embeddings and model provider accounts should all be yours. At Creuto, clients' code and accounts live in their own accounts from day one, and I would ask any team for the same.
</p>

<h3>10. "What happens after launch?"</h3>
<p>
  Models change, providers update versions and user behaviour shifts. Ask how they will monitor quality, how often they review failed answers, and who handles fixes. We include a 60-day post-launch warranty at Creuto; whatever a team offers, get it in writing.
</p>

<h2 id="red-flags">Red flags to watch for</h2>
<table>
  <thead><tr><th>What you hear</th><th>Why it is a concern</th></tr></thead>
  <tbody>
    <tr><td>"Our AI is 100% accurate"</td><td>No model is. It suggests nobody has measured it.</td></tr>
    <tr><td>A fixed quote before seeing your data</td><td>Data quality decides most of the effort and the risk.</td></tr>
    <tr><td>No mention of running costs</td><td>You find out the monthly bill after launch.</td></tr>
    <tr><td>"We will train our own model" for a simple task</td><td>More cost and time than prompting or RAG usually needs.</td></tr>
    <tr><td>Accounts in the agency's name</td><td>You cannot move teams without starting again.</td></tr>
    <tr><td>Only demos, no live products</td><td>Production AI is mostly about edge cases a demo hides.</td></tr>
  </tbody>
</table>

<h2 id="compare">How to compare proposals side by side</h2>
<p>
  Put each proposal in a simple sheet with these rows and score each one from 1 to 3:
</p>
<ol>
  <li>A narrow first use case with a measurable goal.</li>
  <li>Live AI products you have tried yourself.</li>
  <li>A plan to review your data before final pricing.</li>
  <li>A clear, plain-language reason for the chosen approach.</li>
  <li>A written testing plan with an accuracy target.</li>
  <li>Fallbacks for wrong or uncertain answers.</li>
  <li>Named model provider and data policy.</li>
  <li>Separate build cost and monthly running cost.</li>
  <li>All assets and accounts owned by you.</li>
  <li>A support plan after launch.</li>
</ol>
<p>
  To set a budget before you compare, start with the <a href="/tools/app-cost-calculator">app cost calculator</a> or the <a href="/project-costs">project costs page</a>, then check whether each proposal fits.
</p>

<h2 id="start-small">Start with a small pilot</h2>
<p>
  The safest way to choose is to work together on something small. Agree on one workflow, a test set and a success target, and build a first working version. At Creuto that typically takes about 4 weeks. You see how the team communicates, how they handle bad results and whether the numbers hold up with your data. If they do, you expand. If not, you have learned a lot for a small cost.
</p>
<p>
  If you want a team to look at your idea, our <a href="/services/ai-product-development/ai-development">AI development</a> service starts with exactly that kind of scoped pilot.
</p>
`,
};
