module.exports = {
  slug: "dpdp-act-guide-for-app-founders",
  title: "India's DPDP Act: What App and SaaS Founders Need to Know",
  headline: "India's Digital Personal Data Protection Act: A Plain-English Guide for App and SaaS Founders",
  shortTitle: "DPDP Act for founders",
  description: "A plain-English guide to the Indian DPDP Act for app and SaaS founders: consent, notices, user rights, security safeguards and the features to build in.",
  keywords: ["DPDP Act 2023", "Digital Personal Data Protection Act India", "DPDP compliance for apps", "data protection India startups", "DPDP Act SaaS"],
  category: "Mobile & Web",
  badge: "DATA PROTECTION",
  readMinutes: 8,
  published: "2026-10-22",
  icon: "doc",
  lead: "India's Digital Personal Data Protection Act, 2023 sets rules for how digital personal data is collected, used and protected. If your app or SaaS product handles personal data of people in India, it shapes what you build: consent, notices, user rights and security. This guide explains the practical parts for founders. It is not legal advice.",
  cardDesc: "What India's DPDP Act means for app and SaaS products in plain English: consent, notices, user rights, security and the features to build in.",
  cta: { title: "Building a product that handles personal data?", text: "Book a free 30-minute call. We design consent, data access and deletion into the product from the first release.", button: "Book a free 30-minute call" },
  endCta: { title: "Need privacy built into your app?", text: "We build apps and SaaS products with consent records, role-based access, audit logs and account deletion from day one.", service: { href: "/services/custom-software-development", label: "See custom software development" } },
  related: ["mobile-app-security-checklist", "app-store-and-google-play-approval-guide", "how-to-choose-a-software-development-company"],
  faq: [
    ["Does the DPDP Act apply to my startup?", "If you process digital personal data of individuals in India, it very likely applies, including small startups. Some obligations depend on your size and the nature of the data, so check the current rules and take legal advice for your case."],
    ["What is a data fiduciary?", "The organisation that decides why and how personal data is processed, usually the company that owns the app or service. A data processor processes data on its behalf, such as a cloud or software vendor."],
    ["Do I need consent for everything?", "Consent is the main basis for processing, and it must be free, specific, informed and clear, with an easy way to withdraw. The Act also lists certain legitimate uses where consent is not required."],
    ["What rights do users have?", "Users can access information about their data, ask for correction and erasure, have grievances addressed and nominate someone to exercise their rights."],
    ["Where can I read the official text?", "The Ministry of Electronics and Information Technology (MeitY) publishes the Act and related rules on its website. Always check the latest official version."],
  ],
  body: `
<p>
  I am not a lawyer, and this is not legal advice. But the DPDP Act affects product decisions, and founders ask us how to build for it. Here is the practical view from a product team, with links to the official sources.
</p>

<div class="blog-callout">
  <h4>Start with the source</h4>
  <p>
    The Act and related rules are published by the <a href="https://www.meity.gov.in/" target="_blank" rel="noopener">Ministry of Electronics and Information Technology (MeitY)</a>. Check the latest official text and take legal advice for your specific product.
  </p>
</div>

<h2 id="what-it-covers">What the Act covers</h2>
<p>
  The Digital Personal Data Protection Act, 2023 applies to digital personal data: data about an identifiable person that is collected digitally, or collected offline and later digitised. The organisation deciding how data is used is the <strong>data fiduciary</strong>. The person the data is about is the <strong>data principal</strong>.
</p>

<h2 id="consent">Consent and notices</h2>
<ul>
  <li>Tell users clearly what data you collect and why, in a notice they can understand.</li>
  <li>Ask for consent that is specific to the purpose, not bundled into one checkbox for everything.</li>
  <li>Make withdrawing consent as easy as giving it.</li>
  <li>Record when and how consent was given.</li>
</ul>

<h2 id="rights">User rights you need to support</h2>
<ul>
  <li>Access to a summary of their data and how it is used.</li>
  <li>Correction and erasure of their data.</li>
  <li>A way to raise grievances and get a response.</li>
  <li>Nominating someone to act for them.</li>
</ul>

{{cta}}

<h2 id="build-in">What to build into your product</h2>
<table>
  <thead><tr><th>Requirement</th><th>Product feature</th></tr></thead>
  <tbody>
    <tr><td>Informed consent</td><td>Clear notice screens and purpose-specific consent toggles</td></tr>
    <tr><td>Withdrawal</td><td>Privacy settings to withdraw consent</td></tr>
    <tr><td>Erasure</td><td>Account and data deletion that actually removes data</td></tr>
    <tr><td>Security</td><td>Encryption, access control, audit logs</td></tr>
    <tr><td>Breach response</td><td>Monitoring and an incident process</td></tr>
  </tbody>
</table>

<h2 id="security">Security safeguards</h2>
<p>
  The Act expects reasonable security safeguards against breaches. In practice: encryption, least-privilege access, logs and regular testing. Our <a href="/blog/mobile-app-security-checklist">mobile app security checklist</a> is a good starting point.
</p>

<h2 id="vendors">Your vendors and processors</h2>
<p>
  Cloud providers, analytics tools and software vendors that process data for you are data processors. Check their terms and keep a list of who processes what.
</p>


<h2 id="checklist">A starting checklist</h2>
<ul>
  <li>List every piece of personal data you collect, where it is stored and why.</li>
  <li>Remove fields you do not need.</li>
  <li>Write a clear, specific privacy notice and show it at the point of collection.</li>
  <li>Record consent with a timestamp and the notice version.</li>
  <li>Build simple ways for users to access, correct and delete their data, and withdraw consent.</li>
  <li>Decide how long you keep each type of data, and delete it after that.</li>
  <li>Prepare a plan for handling a data breach.</li>
</ul>

<h2 id="children">Children's data</h2>
<p>
  If children may use your product, the Act sets stricter requirements, including verifiable consent from a parent or guardian, and limits on tracking and targeted advertising. Education and gaming apps should plan for this from the first design, not after launch.
</p>
<p>
  This guide is general information, not legal advice. Read the <a href="https://www.meity.gov.in/data-protection-framework" target="_blank" rel="noopener">official framework from MeitY</a> and speak to a lawyer for decisions specific to your business.
</p>

<h2 id="how-we-help">How we approach it</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> we design consent, access and deletion into the product from the first release, which is far cheaper than adding them later. This matters most in sectors such as <a href="/industries/healthcare">healthcare</a>, <a href="/industries/fintech">financial services</a> and <a href="/industries/education">education</a>.
</p>
`,
};
