module.exports = {
  slug: "how-to-choose-an-llm-for-your-product",
  title: "How to Choose an LLM for Your Product: A Practical Guide",
  headline: "How to Choose an LLM for Your Product: Hosted vs Open Models, Cost, Quality and Privacy",
  shortTitle: "Choose an LLM",
  description: "How to choose a large language model for your app or SaaS: hosted vs open models, quality, cost, speed, privacy, context size and how to test before you commit.",
  keywords: ["how to choose an LLM", "best LLM for my app", "LLM comparison for business", "open source vs closed LLM", "choosing an AI model", "OpenAI vs Claude vs Gemini", "LLM selection"],
  category: "Enterprise AI",
  badge: "ENTERPRISE AI",
  readMinutes: 10,
  published: "2026-11-15",
  icon: "doc",
  imageAlt: "Comparing large language models on quality, cost, speed and privacy for a product",
  lead: "There is no single right model. Choose by testing two or three candidates on your own examples, then weigh quality against cost, speed, privacy and how much control you need. Build your product so the model can be swapped later, because the options change every few months.",
  cardDesc: "Hosted vs open models, quality, cost, speed, privacy and context size, plus how to test models on your own data before choosing.",
  cta: { title: "Choosing a model for your product?", text: "Book a free 30-minute call. We will look at your use case and suggest which models to test and how.", button: "Book a free 30-minute call" },
  endCta: { title: "Need help choosing and building?", text: "We help companies pick the right model for each AI feature, test it on their own data and build it so it can be swapped later.", service: { href: "/services/ai-product-development/ai-consulting", label: "See AI consulting" } },
  related: ["how-to-evaluate-llm-features", "rag-vs-fine-tuning", "ai-app-development-cost"],
  faq: [
    ["Which LLM is best for business?", "It depends on the task. A model that is excellent at long reasoning may be slower and more expensive than you need for simple classification. Test a few candidates on your own examples and choose the cheapest one that meets your quality bar."],
    ["Should I use an open model or a hosted API?", "Hosted APIs are the fastest way to start and usually give the strongest quality. Open models give more control over data, hosting and cost at scale, but you take on running them. Many products use both."],
    ["Can I use more than one model?", "Yes, and it is common. A small, fast model can handle simple steps such as routing or classification while a larger model handles complex answers."],
    ["How do I avoid being locked in to one provider?", "Put model calls behind your own service layer, keep prompts and evaluation sets in your repository, and avoid relying on features only one provider offers unless they are worth it."],
    ["Do I need to fine-tune a model?", "Usually not at first. Good prompts and retrieval of your own data solve most business cases. Fine-tuning helps with very specific formats or styles at scale. See our guide on RAG vs fine-tuning."],
    ["How often should I review my model choice?", "Whenever a major new model is released or your costs or quality needs change. With an evaluation set in place, comparing a new model takes hours, not weeks."],
  ],
  body: `
<p>
  "Which AI model should we use?" usually comes up early in any AI project. It is a reasonable question with an unsatisfying honest answer: it depends on your task, and the right choice today may not be the right choice in six months. What you can do is choose well for now and build so that changing later is easy.
</p>

<div class="blog-callout">
  <h4>The quick answer</h4>
  <p>
    Shortlist <strong>two or three models</strong>. Test them on <strong>your own examples</strong>. Pick the <strong>cheapest one that meets your quality bar</strong>, check it fits your <strong>privacy and speed</strong> needs, and keep the model behind your own layer so you can <strong>swap it</strong> later.
  </p>
</div>

<h2 id="types">The main options</h2>
<table>
  <thead><tr><th>Option</th><th>What it is</th><th>Good for</th><th>Trade-offs</th></tr></thead>
  <tbody>
    <tr><td>Hosted frontier models</td><td>Large models from providers such as OpenAI, Anthropic and Google, used through an API</td><td>Strongest general quality, fast start, no infrastructure</td><td>Per-use cost, data leaves your servers, less control over changes</td></tr>
    <tr><td>Smaller hosted models</td><td>Faster, cheaper versions from the same providers</td><td>High-volume, simpler tasks such as classification or extraction</td><td>Weaker on complex reasoning</td></tr>
    <tr><td>Open-weight models</td><td>Models you can download and run yourself or through a host</td><td>Data control, predictable cost at scale, customisation</td><td>You run and update them; quality varies by task</td></tr>
    <tr><td>Cloud-platform models</td><td>Models offered inside your cloud provider's platform</td><td>Teams that want AI under existing cloud contracts and data controls</td><td>Choice and features depend on the platform</td></tr>
  </tbody>
</table>

<h2 id="criteria">What to compare</h2>
<h3>Quality on your task</h3>
<p>
  Public leaderboards are a starting point, not an answer. A model that tops a general benchmark may be no better at reading your invoices or answering your customers. The only reliable test is your own examples, scored the way we describe in <a href="/blog/how-to-evaluate-llm-features">how to evaluate an LLM feature</a>.
</p>
<h3>Cost</h3>
<p>
  Hosted models are usually priced per amount of text in and out. Cost depends on how long your prompts are, how much context you send, how long the answers are and how many requests you make. Estimate it on realistic traffic, not a single test. Our guide to <a href="/blog/ai-app-development-cost">AI app development cost</a> covers the build side.
</p>
<h3>Speed</h3>
<p>
  Response time matters for chat and voice; it matters much less for overnight document processing. Larger models are usually slower. Streaming the answer as it is written can make a slower model feel responsive.
</p>
<h3>Context size</h3>
<p>
  The context window is how much text the model can consider at once. Larger windows help with long documents, but sending more text costs more and does not always improve answers. Retrieving only the relevant parts, as in <a href="/blog/what-is-rag-in-ai">RAG</a>, is often better.
</p>
<h3>Privacy and data location</h3>
<p>
  Check how each provider stores inputs, for how long, whether they are used for training, and where they are processed. If you have strict rules about where data may go, open models on your own infrastructure or models inside your cloud platform may be required. See <a href="/blog/ai-security-risks-prompt-injection">AI security risks</a> for the wider picture.
</p>
<h3>Features you need</h3>
<p>
  Tool or function calling (for <a href="/blog/what-is-agentic-ai">agents</a>), structured output, image or audio input, and language support vary between models. List the ones your feature needs before you shortlist.
</p>

{{cta}}

<h2 id="match">Matching models to common tasks</h2>
<table>
  <thead><tr><th>Task</th><th>What usually matters most</th><th>Where to start</th></tr></thead>
  <tbody>
    <tr><td>Customer support assistant</td><td>Faithfulness to your docs, tone, speed</td><td>A strong hosted model with retrieval; test a smaller one too</td></tr>
    <tr><td>Classifying or tagging items</td><td>Cost and consistency at volume</td><td>Smaller hosted or open models</td></tr>
    <tr><td>Extracting data from documents</td><td>Accuracy and structured output</td><td>Models with reliable structured output; test on your real documents</td></tr>
    <tr><td>Agents that take actions</td><td>Reliable tool calling and following instructions</td><td>Strong hosted models, with approval steps for risky actions</td></tr>
    <tr><td>Voice assistants</td><td>Speed above all</td><td>Fast models; see <a href="/blog/ai-voice-agents-for-business">AI voice agents</a></td></tr>
    <tr><td>Strict data-control environments</td><td>Where data is processed</td><td>Open models on your infrastructure, or your cloud's AI platform</td></tr>
  </tbody>
</table>

<h2 id="process">A simple selection process</h2>
<ol>
  <li><strong>Write down the task and the quality bar.</strong> What must the feature do, and what counts as good enough?</li>
  <li><strong>List your constraints.</strong> Privacy, data location, budget per request, speed and features.</li>
  <li><strong>Shortlist two or three models</strong> that meet the constraints, including at least one smaller, cheaper option.</li>
  <li><strong>Test on your own evaluation set.</strong> Same prompts, same data, same scoring.</li>
  <li><strong>Estimate cost on realistic traffic</strong> for each model that passes.</li>
  <li><strong>Choose the cheapest model that meets the bar</strong>, and note the runner-up as a fallback.</li>
</ol>

<h2 id="multiple">Using more than one model</h2>
<p>
  Many products route different steps to different models: a small model to understand what the user wants, a stronger one to write the answer, and perhaps an open model for sensitive data that must stay in-house. This keeps cost down without lowering quality where it matters.
</p>

<h2 id="lockin">Avoiding lock-in</h2>
<ul>
  <li>Call models through your own service layer, not directly from every part of the app.</li>
  <li>Keep prompts and evaluation sets in your repository so you can re-run tests on a new model quickly.</li>
  <li>Be deliberate about provider-specific features; use them when they are worth it, knowing they make switching harder.</li>
  <li>Keep accounts and API keys in your company's name.</li>
</ul>

<h2 id="finetune">What about fine-tuning?</h2>
<p>
  Most business features do not need a fine-tuned model to start. Clear prompts and retrieval of your own data cover most needs. Fine-tuning can help when you need a very specific format or style at large volume. Our guide to <a href="/blog/rag-vs-fine-tuning">RAG vs fine-tuning</a> explains when each fits.
</p>

<h2 id="creuto">How we help</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a>, an OpenAI Select Partner, we choose models per feature, not per company: we test candidates on the client's own data, compare quality and cost, and build so the model can be changed later. If you are planning an <a href="/services/ai-product-development/ai-development">AI feature</a> or an <a href="/services/ai-product-development/ai-powered-mobile-app-development">AI-powered app</a>, <a href="/book">book a free 30-minute call</a>.
</p>
`,
};
