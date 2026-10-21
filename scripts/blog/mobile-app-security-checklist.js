module.exports = {
  slug: "mobile-app-security-checklist",
  title: "Mobile App Security Checklist: 15 Checks Before Launch",
  headline: "Mobile App Security Checklist: 15 Checks Every App Should Pass Before Launch",
  shortTitle: "Mobile app security checklist",
  description: "A practical mobile app security checklist based on OWASP: data storage, login, API security, permissions, payments and testing before you launch.",
  keywords: ["mobile app security checklist", "app security practices", "OWASP mobile top 10", "secure mobile app development", "app security testing"],
  category: "Mobile Engineering",
  badge: "MOBILE ENGINEERING",
  readMinutes: 8,
  published: "2026-10-22",
  icon: "doc",
  lead: "Most app security problems are not exotic attacks. They are basics that were skipped: secrets in the code, tokens stored carelessly, APIs that trust whatever the app sends. This checklist covers the fifteen checks I want every app to pass before it reaches users.",
  cardDesc: "Fifteen security checks for mobile apps before launch, covering storage, login, APIs, permissions, payments and testing, based on OWASP guidance.",
  cta: { title: "Want a security review before launch?", text: "Book a free 30-minute call. We can review your app's architecture and point out the gaps that matter most.", button: "Book a free 30-minute call" },
  endCta: { title: "Building an app that handles sensitive data?", text: "We build mobile apps with secure storage, role-based access and audit logs from the first release.", service: { href: "/services/mobile-app-development/mobile-app-qa-testing", label: "See mobile app QA and testing" } },
  related: ["app-store-and-google-play-approval-guide", "dpdp-act-guide-for-app-founders", "react-native-mobile-app-playbook"],
  faq: [
    ["What is OWASP MASVS?", "The OWASP Mobile Application Security Verification Standard is an open standard that lists security requirements for mobile apps. It is a useful reference for what a secure app should do."],
    ["Where should an app store login tokens?", "In the platform's secure storage: Keychain on iOS and the Android Keystore-backed storage on Android, never in plain local storage or logs."],
    ["Is the app itself the main security risk?", "Often the bigger risk is the backend API. The server must check permissions on every request and never trust data just because it came from your app."],
    ["Do small apps need security testing?", "Yes. Even a small app holds personal data and payment details. Basic testing against a checklist catches most common problems at little cost."],
    ["How often should security be reviewed?", "Before each major release and whenever you add payments, new data types or new integrations, plus regular dependency updates."],
  ],
  body: `
<p>
  This checklist draws on the open <a href="https://mas.owasp.org/MASVS/" target="_blank" rel="noopener">OWASP Mobile Application Security Verification Standard</a> and the <a href="https://owasp.org/www-project-mobile-top-10/" target="_blank" rel="noopener">OWASP Mobile Top 10</a>, turned into checks a founder can actually ask a team about.
</p>

<div class="blog-callout">
  <h4>Where to look first</h4>
  <p>
    The backend API is where most real damage happens. A secure app with an API that trusts every request is not secure.
  </p>
</div>

<h2 id="storage">Data storage</h2>
<ol>
  <li><strong>No secrets in the app code.</strong> API keys and credentials that grant access belong on the server.</li>
  <li><strong>Tokens in secure storage.</strong> Keychain on iOS, Keystore-backed storage on Android.</li>
  <li><strong>No sensitive data in logs</strong> or crash reports.</li>
  <li><strong>Minimal data on the device.</strong> Store only what the app needs offline.</li>
</ol>

<h2 id="auth">Login and sessions</h2>
<ol start="5">
  <li><strong>Strong login:</strong> OTP or passwords with rate limiting, and multi-factor options for sensitive apps.</li>
  <li><strong>Short-lived sessions</strong> with refresh tokens that can be revoked.</li>
  <li><strong>Account deletion</strong> that actually removes the user's data.</li>
</ol>

{{cta}}

<h2 id="api">The API and backend</h2>
<ol start="8">
  <li><strong>HTTPS everywhere</strong> with modern TLS.</li>
  <li><strong>Permission checks on every request</strong> on the server, never only in the app.</li>
  <li><strong>Input validation</strong> on the server for every field.</li>
  <li><strong>Rate limiting</strong> on login, OTP and search endpoints.</li>
</ol>

<h2 id="device">Permissions and the device</h2>
<ol start="12">
  <li><strong>Ask only for permissions you use</strong>, at the moment you need them, with a clear reason.</li>
  <li><strong>Handle payments through certified providers</strong> such as payment gateways and never store card numbers yourself.</li>
</ol>

<h2 id="process">Process</h2>
<ol start="14">
  <li><strong>Keep dependencies updated</strong> and remove unused libraries.</li>
  <li><strong>Test before each release</strong> against this list, and fix what you find before launch.</li>
</ol>


<h2 id="third-party">Third-party libraries and SDKs</h2>
<ul>
  <li>Keep a list of every library and SDK in the app, and why it is there.</li>
  <li>Remove ones you no longer use.</li>
  <li>Update them regularly, and check security advisories for the important ones.</li>
  <li>Check what data analytics and advertising SDKs collect, and declare it in the store listings.</li>
</ul>

<h2 id="after-launch">After launch</h2>
<ul>
  <li><strong>Monitor:</strong> crash reports, failed login spikes and unusual API traffic.</li>
  <li><strong>Patch quickly:</strong> have a release process that can ship a fix within days.</li>
  <li><strong>Force updates when needed:</strong> build a way to require a minimum app version for critical fixes.</li>
  <li><strong>Review access:</strong> remove former team members from code, cloud and store accounts.</li>
  <li><strong>Plan for incidents:</strong> know who decides, who informs users, and what the law requires you to report.</li>
</ul>
<p>
  The <a href="https://mas.owasp.org/" target="_blank" rel="noopener">OWASP Mobile Application Security</a> project is a detailed reference if your team wants to go deeper than this checklist.
</p>

<h2 id="compliance">Compliance and store review</h2>
<p>
  Security also affects store approval and legal compliance. Read the <a href="/blog/app-store-and-google-play-approval-guide">app store approval guide</a> and, for Indian apps, the <a href="/blog/dpdp-act-guide-for-app-founders">DPDP Act guide for app founders</a>.
</p>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> these checks are part of every mobile build, from <a href="/services/mobile-app-development/ios-app-development">iOS</a> and <a href="/services/mobile-app-development/android-app-development">Android</a> apps to cross-platform ones. Apps in sensitive sectors such as <a href="/industries/healthcare">healthcare</a> and <a href="/industries/fintech">financial services</a> get extra review.
</p>
`,
};
