module.exports = {
  slug: "app-store-and-google-play-approval-guide",
  title: "How to Get Your App Approved on App Store and Google Play",
  headline: "How to Get Your App Approved on the App Store and Google Play: Common Rejections and Fixes",
  shortTitle: "App store approval guide",
  description: "How to get your app approved on the App Store and Google Play: common rejection reasons, a pre-submission checklist and what to do if you are rejected.",
  keywords: ["app store rejection reasons", "how to get app approved on app store", "google play app review", "app store submission checklist", "publish app on play store"],
  category: "Mobile Engineering",
  badge: "MOBILE ENGINEERING",
  readMinutes: 8,
  published: "2026-10-22",
  icon: "doc",
  lead: "Both Apple and Google review apps before they go live, and a rejection can push your launch back. Most rejections come from a short list of avoidable issues. Fix them before you submit and review becomes a formality.",
  cardDesc: "The common reasons apps are rejected by the App Store and Google Play, a pre-submission checklist and what to do if your app is rejected.",
  cta: { title: "Preparing to launch an app?", text: "Book a free 30-minute call. We can review your app and listing against the store guidelines before you submit.", button: "Book a free 30-minute call" },
  endCta: { title: "Want a team that handles store submission?", text: "We build, test and publish iOS and Android apps, including store listings, privacy details and review responses.", service: { href: "/services/mobile-app-development", label: "See mobile app development" } },
  related: ["how-long-does-it-take-to-build-an-app", "mobile-app-security-checklist", "react-native-mobile-app-playbook"],
  faq: [
    ["How long does app review take?", "It varies. Many apps are reviewed within a few days, but timing changes and a rejection adds another round. Leave time in your launch plan."],
    ["What is the most common reason apps are rejected?", "Crashes and broken features found during review, incomplete or misleading information, missing privacy details and apps that offer too little functionality are among the most common."],
    ["Do I need a privacy policy to publish an app?", "Yes. Both stores expect a privacy policy link and accurate details of what data your app collects and how it is used."],
    ["What should I do if my app is rejected?", "Read the reason carefully, fix the issue, reply in the review system with a clear explanation and resubmit. If you believe the reviewer misunderstood, explain politely with screenshots or a demo account."],
    ["Do reviewers need a login to test my app?", "If parts of your app require an account, provide a working demo account in the review notes. Missing demo access is a frequent cause of rejection."],
  ],
  body: `
<p>
  We publish apps to both stores regularly, including launches like the <a href="/work/make-my-look">Make My Look</a> salon app. The pattern is consistent: apps that are tested properly and described honestly get through. Here is what reviewers check.
</p>

<div class="blog-callout">
  <h4>Read the source</h4>
  <p>
    Apple's <a href="https://developer.apple.com/app-store/review/guidelines/" target="_blank" rel="noopener">App Store Review Guidelines</a> and Google's <a href="https://play.google.com/about/developer-content-policy/" target="_blank" rel="noopener">Developer Program Policy</a> are the rules. Skim both before you build, not only before you submit.
  </p>
</div>

<h2 id="common-rejections">Common rejection reasons</h2>
<ul>
  <li><strong>Crashes and bugs:</strong> anything that breaks during review.</li>
  <li><strong>No demo access:</strong> the reviewer cannot log in to test.</li>
  <li><strong>Incomplete information:</strong> placeholder text, broken links, missing contact details.</li>
  <li><strong>Privacy gaps:</strong> no privacy policy, or data use not declared accurately.</li>
  <li><strong>Too little functionality:</strong> an app that is just a website in a wrapper.</li>
  <li><strong>Misleading listing:</strong> screenshots or descriptions that do not match the app.</li>
  <li><strong>Payments:</strong> digital content sold outside the store's rules.</li>
</ul>

<h2 id="checklist">Pre-submission checklist</h2>
<ol>
  <li>Test on real devices and on slow networks.</li>
  <li>Remove test data, placeholder screens and debug menus.</li>
  <li>Add a working demo account and notes for the reviewer.</li>
  <li>Publish a privacy policy and declare data collection accurately.</li>
  <li>Provide a way to delete an account if users can create one.</li>
  <li>Use screenshots taken from the real app.</li>
  <li>Check every link, including support and terms.</li>
</ol>

{{cta}}

<h2 id="security">Security and data handling</h2>
<p>
  Reviewers and users both care about how data is handled. Our <a href="/blog/mobile-app-security-checklist">mobile app security checklist</a> covers storage, network security and permissions, and the <a href="/blog/dpdp-act-guide-for-app-founders">DPDP Act guide</a> explains Indian data protection basics.
</p>

<h2 id="rejected">If your app is rejected</h2>
<p>
  Do not panic and do not argue. Read the guideline cited, fix the issue, explain the change in the reply and resubmit. If the reviewer misunderstood a feature, a short screen recording usually resolves it.
</p>


<h2 id="store-listing">Preparing the store listing</h2>
<ul>
  <li><strong>App name and subtitle:</strong> clear and accurate, without keyword stuffing.</li>
  <li><strong>Screenshots:</strong> from the real app, in the sizes each store asks for.</li>
  <li><strong>Description:</strong> what the app does and who it is for, matching what reviewers will see.</li>
  <li><strong>Privacy policy URL:</strong> live, specific to the app, and consistent with what the app collects.</li>
  <li><strong>Support contact:</strong> a working email or page.</li>
  <li><strong>Age rating questionnaire:</strong> answered honestly for both stores.</li>
</ul>

<h2 id="updates">Updates get reviewed too</h2>
<p>
  Every update goes through review, not only the first release. Keep the same discipline for each version: test on real devices, update the release notes, and check that new permissions or data collection are declared. Store policies change during the year, so read the current <a href="https://developer.apple.com/app-store/review/guidelines/" target="_blank" rel="noopener">App Store Review Guidelines</a> and <a href="https://play.google.com/about/developer-content-policy/" target="_blank" rel="noopener">Google Play policies</a> before each major release.
</p>
<p>
  Use staged rollouts on Google Play and phased releases on the App Store, so a problem in a new version reaches a small group of users first.
</p>

<h2 id="plan">Plan review into your timeline</h2>
<p>
  Leave time for at least one review round in your launch plan. Our guide on <a href="/blog/how-long-does-it-take-to-build-an-app">how long it takes to build an app</a> shows where review fits. At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> store submission is part of every mobile project, and our <a href="/services/mobile-app-development/mobile-app-qa-testing">QA and testing service</a> covers the device testing reviewers expect.
</p>
`,
};
