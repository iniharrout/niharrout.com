module.exports = {
  slug: 'upi-collect-removed-what-to-use-instead',
  title: 'UPI Collect Removed: What to Use Instead in 2026',
  headline: 'UPI Collect Has Been Withdrawn: How to Update Your App or Website Checkout',
  shortTitle: 'UPI Collect removal',
  description: 'UPI Collect, where customers type a UPI ID, was withdrawn for most merchants from 28 February 2026. What replaces it on mobile and desktop, and what to test.',
  keywords: ['upi collect removed', 'upi collect deprecation', 'upi intent vs collect', 'upi collect request not working', 'upi qr checkout website'],
  category: 'Mobile Engineering',
  badge: 'PAYMENTS',
  readMinutes: 6,
  published: '2026-11-27',
  icon: 'doc',
  lead: 'If your checkout still asks customers to type a UPI ID and approve a request, check it today. Payment gateways say NPCI withdrew that flow, called UPI Collect, for most merchants from 28 February 2026. Here is what replaces it and how to make the change without losing payments.',
  cardDesc: 'What the withdrawal of UPI Collect means for your checkout, what replaces it on mobile and desktop, and a test list.',
  cta: { title: 'Not sure what your checkout still uses?', text: 'Book a free 30-minute call. We will look at your payment flow and tell you what has to change.', button: 'Book a free 30-minute call' },
  endCta: { title: 'Need your checkout updated?', text: 'We integrate UPI intent, QR, cards and recurring payments with server-side confirmation and reconciliation. You get a written proposal within 24 hours of a free call.', service: { href: '/services/mobile-app-development', label: 'See mobile app development' } },
  related: ['upi-payment-integration-for-apps', 'how-to-build-a-fintech-app-in-india', 'mobile-app-testing-checklist'],
  faq: [
    ['What was UPI Collect?', 'It was the flow where a customer entered a UPI ID (or mobile number) on your checkout, received a payment request in their UPI app and approved it there.'],
    ['What replaces UPI Collect?', 'UPI Intent on mobile apps and mobile web, which opens the customer’s UPI app directly, and a UPI QR code on desktop.'],
    ['Are there exceptions?', 'Yes, narrow ones. Gateway documentation lists cases such as IPO and secondary market payments and some cross-border businesses, and Razorpay also lists iOS app and mobile web transactions on its migration page. Its general FAQ does not mention iOS, so confirm your own case with your gateway.'],
    ['Does this affect UPI Autopay?', 'Razorpay says new Autopay mandates can no longer be registered through Collect, while existing mandates keep working. Register new mandates through intent or QR.'],
  ],
  body: `
<p>
  Many older checkouts have a box that says "Enter your UPI ID". For most merchants, that box should now be gone. If it is still there, some customers may be trying to pay and failing without ever telling you.
</p>

<div class="blog-callout">
  <h4>The change</h4>
  <p>
    Use UPI Intent on phones and a UPI QR code on desktop. Remove the option to type a UPI ID unless your gateway confirms you are exempt.
  </p>
</div>

<h2 id="what-changed">What changed</h2>
<p>
  <a href="https://razorpay.com/docs/payments/payment-methods/upi/faqs" target="_blank" rel="noopener">Razorpay's UPI documentation</a> says NPCI is sunsetting UPI Collect from 28 February 2026, and that transactions started through it after that date may fail or be declined. <a href="https://docs.payu.in/docs/upi-collect-disablement-information" target="_blank" rel="noopener">PayU's documentation</a> gives the same date. Check the page for your own gateway, because the exemption lists are not identical.
</p>

<h2 id="replacements">What to use instead</h2>
<table>
  <thead><tr><th>Where the customer is</th><th>Use</th><th>What they see</th></tr></thead>
  <tbody>
    <tr><td>Your Android or iOS app</td><td>UPI Intent</td><td>A list of UPI apps, then approval inside the chosen app</td></tr>
    <tr><td>Mobile browser</td><td>UPI Intent</td><td>The same hand-off to a UPI app</td></tr>
    <tr><td>Desktop browser</td><td>Dynamic UPI QR</td><td>A code to scan with any UPI app on their phone</td></tr>
  </tbody>
</table>
<p>
  UPI Intent does not work on desktop web, so a desktop checkout needs the QR code.
</p>

<h2 id="by-integration">What you have to change, by integration type</h2>
<ul>
  <li><strong>Hosted or standard checkout.</strong> Razorpay says its Standard Checkout switches over automatically. Confirm by running a payment yourself.</li>
  <li><strong>Custom checkout.</strong> Remove the UPI ID field and the code behind it, then add intent and QR.</li>
  <li><strong>Server-to-server integration.</strong> Change the flow your server requests from collect to intent, and handle the link that comes back.</li>
  <li><strong>Saved UPI IDs.</strong> Razorpay says saving and validating UPI IDs stops working, because both depended on Collect. Remove those screens.</li>
</ul>

{{cta}}

<h2 id="webview">Watch out for apps built on a web view</h2>
<p>
  If your app shows your website inside a web view, opening a UPI app from it needs handling in the native shell. This is a common place for intent to fail silently, so test it on real devices.
</p>

<h2 id="test">What to test</h2>
<ol>
  <li>Pay with two or three different UPI apps on Android and on iPhone.</li>
  <li>Pay on a phone with no UPI app installed, and check the message shown.</li>
  <li>Scan the desktop QR, then let one expire and try again.</li>
  <li>Close the UPI app without paying, and return to your checkout.</li>
  <li>Pay successfully but do not return to your app. The order should still be confirmed by your server.</li>
  <li>Check refunds and your daily reconciliation.</li>
</ol>
<p>
  The server-side rules do not change: confirm every payment with the gateway's webhook or status API before you fulfil the order. The full flow is in our guide to <a href="/blog/upi-payment-integration-for-apps">UPI payment integration for apps and websites</a>.
</p>
`,
};
