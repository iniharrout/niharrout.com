module.exports = {
  slug: "app-store-optimization-guide",
  title: "App Store Optimisation (ASO): A Practical Guide for Founders",
  headline: "App Store Optimisation (ASO): How to Get Your App Found on Google Play and the App Store",
  shortTitle: "App store optimisation",
  description: "App store optimisation explained: app name, keywords, screenshots, ratings, localisation and how ASO differs between Google Play and the Apple App Store.",
  keywords: ["app store optimization", "ASO guide", "how to rank app on Google Play", "App Store keywords", "increase app downloads"],
  category: "Mobile Engineering",
  badge: "MOBILE ENGINEERING",
  readMinutes: 8,
  published: "2026-10-22",
  icon: "doc",
  lead: "App store optimisation, or ASO, is the work of helping people find your app in store search and choose to install it. It covers the words in your listing, the visuals, ratings and reviews, and the quality signals the stores watch after people download.",
  cardDesc: "App name, keywords, screenshots, ratings and localisation: how ASO works on Google Play and the App Store, and what to do first.",
  cta: { title: "Launching an app soon?", text: "Book a free 30-minute call. We will review your listing plan and launch checklist.", button: "Book a free 30-minute call" },
  endCta: { title: "Need an app that launches well?", text: "We build and launch mobile apps, including store listings, testing and the first updates after launch.", service: { href: "/services/mobile-app-development", label: "See mobile app development" } },
  related: ["app-store-and-google-play-approval-guide", "the-essential-ingredients-for-a-successful-product-launch-by-nihar-ranjan-rout", "react-native-vs-flutter"],
  faq: [
    ["What is app store optimisation?", "ASO is improving your app's store listing and quality so it appears in more relevant searches and more people who see it choose to install it."],
    ["How is ASO different on Google Play and the App Store?", "Google Play reads your full description for keywords. Apple uses the app name, subtitle and a separate hidden keyword field, and does not use the description for search in the same way."],
    ["Do ratings affect ranking?", "Ratings and reviews influence both whether people install and how stores rank apps. Ask for ratings at a good moment in the app, using the stores' built-in rating prompts."],
    ["How long does ASO take to show results?", "Listing changes can affect conversion quickly, while search ranking changes take longer. Change one element at a time and measure."],
    ["Does app quality affect ASO?", "Yes. Crashes, slow performance, uninstalls and poor reviews all hurt visibility. ASO cannot make up for an unreliable app."],
  ],
  body: `
<p>
  Many founders treat the store listing as a form to fill in on launch day. It is actually your app's landing page. A clear name, honest screenshots and well-chosen words can make a visible difference to installs.
</p>

<div class="blog-callout">
  <h4>The two goals</h4>
  <p>
    Be found for the searches your users make, and convince the people who find you to install. Words drive the first; visuals and ratings drive the second.
  </p>
</div>

<h2 id="research">1. Research the words your users search</h2>
<ul>
  <li>List the problems your app solves in your users' words, not your internal terms.</li>
  <li>Look at competitor listings and the store's search suggestions.</li>
  <li>Prefer specific phrases with clear intent, such as "salon booking", over very broad ones.</li>
</ul>

<h2 id="listing">2. Write the listing</h2>
<table>
  <thead><tr><th>Element</th><th>Google Play</th><th>App Store</th></tr></thead>
  <tbody>
    <tr><td>Name</td><td>App name, used in search</td><td>App name, used in search</td></tr>
    <tr><td>Short line</td><td>Short description</td><td>Subtitle, used in search</td></tr>
    <tr><td>Keywords</td><td>Taken from the text, including the full description</td><td>A separate keyword field</td></tr>
    <tr><td>Long text</td><td>Full description, read for search</td><td>Description, mainly for people</td></tr>
  </tbody>
</table>
<p>
  Apple's guidance on the <a href="https://developer.apple.com/app-store/product-page/" target="_blank" rel="noopener">App Store product page</a> and Google's <a href="https://play.google.com/console/about/" target="_blank" rel="noopener">Play Console</a> tools explain each field. Keep the text accurate: misleading listings can be rejected, as covered in our <a href="/blog/app-store-and-google-play-approval-guide">app approval guide</a>.
</p>

<h2 id="visuals">3. Design screenshots that sell</h2>
<ul>
  <li>Show the main benefit in the first two screenshots.</li>
  <li>Add a short caption to each, in plain language.</li>
  <li>Use real app screens, not mock-ups of features that do not exist.</li>
  <li>Consider a short preview video for apps that are easier to show than describe.</li>
</ul>

{{cta}}

<h2 id="ratings">4. Earn ratings and reviews</h2>
<ul>
  <li>Ask after a success moment, such as a completed booking, not on first launch.</li>
  <li>Use the built-in rating prompts from Apple and Google.</li>
  <li>Reply to reviews, especially critical ones, and fix what they point out.</li>
</ul>

<h2 id="quality">5. Protect quality signals</h2>
<p>
  Stores watch crashes, performance and uninstalls. Test on real devices before every release, and monitor crash reports after launch. Our <a href="/services/mobile-app-development/mobile-app-qa-testing">mobile app QA and testing</a> service focuses on exactly this.
</p>

<h2 id="localise">6. Localise for your markets</h2>
<p>
  If you serve users in several languages or countries, translate the listing and screenshots. In India, a listing in Hindi or a regional language can help reach users who search in that language.
</p>

<h2 id="measure">7. Test and measure</h2>
<ol>
  <li>Track store visits, installs and the conversion rate between them.</li>
  <li>Use store listing experiments where available to test icons and screenshots.</li>
  <li>Change one thing at a time so you know what worked.</li>
  <li>Review search terms that bring installs and adjust your wording.</li>
</ol>

<h2 id="beyond">Beyond the store</h2>
<p>
  Store search is only one channel. A website with helpful content, links from your social profiles and good launch planning all bring people to your listing. Read <a href="/blog/the-essential-ingredients-for-a-successful-product-launch-by-nihar-ranjan-rout">the essential ingredients for a successful product launch</a> for the bigger picture.
</p>

<h2 id="creuto">How we help</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> we build and launch apps, including the store listing, testing and the first improvements after release.
</p>
`,
};
