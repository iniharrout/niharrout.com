module.exports = {
  slug: "upi-payment-integration-for-apps",
  title: "UPI Payment Integration for Apps and Websites: A Guide",
  headline: "UPI Payment Integration for Apps and Websites: How It Works and What to Test",
  shortTitle: "UPI payment integration",
  description: "How UPI payment integration works in apps and websites: intent, collect and QR flows, payment gateways, autopay, refunds and the cases you must test.",
  keywords: ["UPI payment integration", "UPI integration in app", "UPI payment gateway", "UPI intent flow", "UPI autopay integration"],
  category: "Mobile Engineering",
  badge: "MOBILE ENGINEERING",
  readMinutes: 8,
  published: "2026-10-22",
  icon: "doc",
  lead: "UPI is how most people in India pay inside apps and on websites. Integrating it is usually done through a payment gateway, but the details matter: which flow you use, how you confirm payment and how you handle the cases where something goes wrong.",
  cardDesc: "UPI intent, collect and QR flows, payment gateways, autopay, refunds and the edge cases to test before launch.",
  cta: { title: "Adding payments to your product?", text: "Book a free 30-minute call. We will help you choose a payment flow and plan the edge cases.", button: "Book a free 30-minute call" },
  endCta: { title: "Need reliable payments in your app?", text: "We integrate UPI, cards, subscriptions and split payments, with server-side checks and proper reconciliation.", service: { href: "/services/custom-software-development/ecommerce-solutions", label: "See e-commerce solutions" } },
  related: ["how-to-build-a-fintech-app-in-india", "mobile-app-security-checklist", "how-to-build-a-food-delivery-app"],
  faq: [
    ["Can I integrate UPI without a payment gateway?", "Most businesses use a licensed payment gateway or aggregator, which handles the connection to banks and UPI, settlements and compliance. Direct integration is generally done by banks and larger regulated players."],
    ["What is the UPI intent flow?", "On a phone, the app opens a list of UPI apps installed on the device, the user picks one, approves the payment there and returns to your app. It is the most common flow in mobile apps."],
    ["What is UPI autopay?", "UPI autopay lets customers approve a recurring mandate once, after which subscription or instalment payments are collected automatically within the limits they approved."],
    ["How do I know a UPI payment succeeded?", "Never rely only on what the app reports. Confirm the payment on your server using the gateway's webhook or status API before you fulfil the order."],
    ["What happens if the money is debited but the order fails?", "Your system should detect the mismatch through reconciliation, then either complete the order or refund automatically, and tell the customer clearly what happened."],
  ],
  body: `
<p>
  Payments are where a small bug costs real money and real trust. When we integrate UPI, the payment screen is the easy part. The careful work is in confirming payments on the server and handling every failure case.
</p>

<div class="blog-callout">
  <h4>The rule</h4>
  <p>
    The app starts the payment. The server decides whether it succeeded, based on the payment provider's confirmation.
  </p>
</div>

<h2 id="flows">The main UPI flows</h2>
<table>
  <thead><tr><th>Flow</th><th>How it works</th><th>Suits</th></tr></thead>
  <tbody>
    <tr><td>Intent</td><td>Opens the user's UPI app to approve</td><td>Mobile apps and mobile web</td></tr>
    <tr><td>QR code</td><td>User scans a dynamic QR with any UPI app</td><td>Desktop checkout, counters, invoices</td></tr>
    <tr><td>Collect request</td><td>User enters a UPI ID and approves a request</td><td>Some web checkouts; check current gateway support</td></tr>
    <tr><td>Autopay</td><td>A recurring mandate approved once</td><td>Subscriptions and instalments</td></tr>
  </tbody>
</table>
<p>
  <a href="https://www.npci.org.in/what-we-do/upi/product-overview" target="_blank" rel="noopener">NPCI's UPI overview</a> explains the underlying system. Rules evolve, so check your gateway's current documentation for supported flows.
</p>

<h2 id="gateway">Choosing a payment gateway</h2>
<ul>
  <li>Supported methods: UPI, cards, net banking, wallets, EMI.</li>
  <li>Subscriptions and autopay support.</li>
  <li>Split payments for marketplaces, such as <a href="https://razorpay.com/docs/payments/route/" target="_blank" rel="noopener">Razorpay Route</a>.</li>
  <li>Quality of documentation, webhooks and test mode.</li>
  <li>Settlement times, dashboards and support.</li>
</ul>

<h2 id="architecture">How a safe integration works</h2>
<ol>
  <li>Your server creates an order with the gateway and records it as pending.</li>
  <li>The app or website opens the UPI flow using that order.</li>
  <li>The user approves the payment in their UPI app.</li>
  <li>The gateway notifies your server through a signed webhook.</li>
  <li>Your server verifies the signature and amount, marks the order paid and fulfils it.</li>
  <li>The app checks the order status from your server and shows the result.</li>
</ol>

{{cta}}

<h2 id="edge-cases">Edge cases to test</h2>
<ul>
  <li>The user closes the UPI app without paying.</li>
  <li>The payment succeeds but the user never returns to your app.</li>
  <li>The webhook arrives late, twice or before the app checks status.</li>
  <li>The payment is pending for several minutes.</li>
  <li>Money is debited but your order creation failed.</li>
  <li>No UPI app is installed on the device.</li>
  <li>Partial or full refunds, and their status updates.</li>
</ul>

<h2 id="reconciliation">Reconciliation</h2>
<p>
  Every day, compare your orders with the gateway's settlement reports. Any payment without a fulfilled order, or any order without a confirmed payment, should be flagged and resolved automatically where possible. This is what keeps support tickets low.
</p>

<h2 id="security">Security</h2>
<ul>
  <li>Keep gateway keys on the server only, never in the app.</li>
  <li>Verify webhook signatures and amounts.</li>
  <li>Use idempotency so a repeated webhook does not fulfil twice.</li>
  <li>Log every status change for audits.</li>
</ul>
<p>
  The wider checklist is in our <a href="/blog/mobile-app-security-checklist">mobile app security checklist</a>. Building a regulated financial product? Read <a href="/blog/how-to-build-a-fintech-app-in-india">how to build a fintech app in India</a>.
</p>

<h2 id="creuto">How we integrate payments</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> we integrate UPI and other payment methods with server-side confirmation, reconciliation and clear customer messages for every failure case.
</p>
`,
};
