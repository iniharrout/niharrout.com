module.exports = {
  slug: "how-to-reduce-ai-hallucinations",
  title: "How to Reduce AI Hallucinations in Business Applications",
  headline: "How to Reduce AI Hallucinations in Chatbots and Business AI Features",
  shortTitle: "Reduce AI hallucinations",
  description: "Why AI models hallucinate and how to reduce it in business apps: grounding, retrieval, clear instructions, citations, refusal rules, checks and testing.",
  keywords: ["how to reduce AI hallucinations", "AI hallucination", "LLM hallucination prevention", "grounding AI answers", "reliable AI chatbot"],
  category: "Enterprise AI",
  badge: "ENTERPRISE AI",
  readMinutes: 8,
  published: "2026-10-22",
  icon: "doc",
  lead: "An AI hallucination is a confident answer that is wrong or made up. You cannot remove the risk entirely, but you can reduce it a lot with good design: giving the model the right information, limiting what it should answer, showing sources and checking outputs before they reach people.",
  cardDesc: "Why AI models hallucinate and the practical techniques that reduce it: grounding, citations, refusal rules, checks and testing.",
  cta: { title: "Worried about AI accuracy?", text: "Book a free 30-minute call. We will review your AI feature or idea and suggest ways to make its answers more reliable.", button: "Book a free 30-minute call" },
  endCta: { title: "Need AI you can trust?", text: "We build AI features with grounding, citations, guardrails and evaluation sets, so accuracy is measured, not assumed.", service: { href: "/services/ai-product-development/ai-consulting", label: "See AI consulting" } },
  related: ["rag-vs-fine-tuning", "how-to-build-an-ai-chatbot-for-business", "pragmatic-enterprise-ai-workflows"],
  faq: [
    ["Why do AI models hallucinate?", "Language models generate likely-sounding text based on patterns. When they lack the right information or the question is unclear, they can produce fluent answers that are not true."],
    ["Can hallucinations be eliminated completely?", "No. They can be reduced substantially and caught more often, but any AI feature should be designed assuming occasional mistakes."],
    ["Does retrieval-augmented generation stop hallucinations?", "It reduces them by giving the model your actual documents to answer from. Quality still depends on finding the right passages and instructing the model to use only them."],
    ["How do I measure hallucination rates?", "Build a test set of real questions with correct answers, run it regularly and track how many answers are wrong, unsupported or missing sources."],
    ["Should AI answers always show sources?", "For business information, yes where possible. Sources let users check answers and help your team find documents that need fixing."],
  ],
  body: `
<p>
  The first question I hear from business leaders about AI is "what if it makes things up?" It is the right question. The answer is not to avoid AI, but to design every feature so that wrong answers are rare, visible and caught.
</p>

<div class="blog-callout">
  <h4>The core idea</h4>
  <p>
    Give the model the facts it needs, tell it to use only those facts, make it show where each answer came from, and let it say "I don't know".
  </p>
</div>

<h2 id="why">Why hallucinations happen</h2>
<ul>
  <li>The model does not have the information, so it fills the gap.</li>
  <li>The question is vague or outside the intended topic.</li>
  <li>The retrieved documents are outdated, contradictory or irrelevant.</li>
  <li>The instructions do not say what to do when unsure.</li>
</ul>

<h2 id="grounding">1. Ground answers in your data</h2>
<p>
  Retrieval-augmented generation finds relevant passages from your documents and passes them to the model. Most business assistants should use it. Our guide on <a href="/blog/rag-vs-fine-tuning">RAG vs fine-tuning</a> explains when each approach fits.
</p>

<h2 id="instructions">2. Write clear instructions</h2>
<ul>
  <li>Answer only from the provided documents.</li>
  <li>If the documents do not contain the answer, say so.</li>
  <li>Do not guess numbers, dates, prices or names.</li>
  <li>Keep answers within the defined topic.</li>
</ul>

<h2 id="citations">3. Show sources</h2>
<p>
  Link each answer to the document and section it came from. Users can verify important answers, and your team can spot weak documents quickly.
</p>

{{cta}}

<h2 id="checks">4. Add checks</h2>
<ul>
  <li><strong>Structured outputs:</strong> ask for fixed formats and validate them in code.</li>
  <li><strong>Rules in code:</strong> check amounts, dates and IDs against your database instead of trusting the model.</li>
  <li><strong>Second-pass review:</strong> a separate check that the answer is supported by the sources.</li>
  <li><strong>Human approval</strong> for anything that reaches customers or changes records.</li>
</ul>

<h2 id="data-quality">5. Fix the source content</h2>
<p>
  Many "AI mistakes" are document problems: two versions of a policy, missing information or unclear wording. Assign owners to source documents and update them when answers go wrong.
</p>

<h2 id="testing">6. Test continuously</h2>
<ol>
  <li>Collect real questions and the correct answers.</li>
  <li>Include tricky cases: out-of-scope questions, missing information, similar products.</li>
  <li>Run the set after every change to prompts, models or documents.</li>
  <li>Track accuracy, refusals and missing citations over time.</li>
</ol>
<p>
  The <a href="https://platform.openai.com/docs" target="_blank" rel="noopener">OpenAI platform documentation</a> includes guidance on evaluation, and the <a href="https://www.nist.gov/itl/ai-risk-management-framework" target="_blank" rel="noopener">NIST AI Risk Management Framework</a> covers broader governance.
</p>

<h2 id="design">7. Design for mistakes</h2>
<ul>
  <li>Make it easy to report a wrong answer.</li>
  <li>Offer a hand-over to a person.</li>
  <li>Label AI-generated content clearly.</li>
  <li>Log conversations, with appropriate privacy controls, for review.</li>
</ul>

<h2 id="creuto">How we build reliable AI</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> every AI feature ships with an evaluation set and guardrails, an approach described in <a href="/blog/pragmatic-enterprise-ai-workflows">pragmatic enterprise AI</a>. Building a chatbot? Start with <a href="/blog/how-to-build-an-ai-chatbot-for-business">how to build an AI chatbot for your business</a>.
</p>
`,
};
