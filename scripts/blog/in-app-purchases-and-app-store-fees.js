module.exports = {
  slug: "in-app-purchases-and-app-store-fees",
  title: "In-App Purchases and App Store Fees: A Founder's Guide",
  headline: "In-App Purchases and App Store Fees: What Founders Must Know Before They Build",
  shortTitle: "In-app purchases and store fees",
  description: "When must your app use Apple and Google in-app purchases, what do store fees mean for your pricing, and how do you plan subscriptions the right way?",
  keywords: ["in-app purchase", "app store fees", "google play service fee", "app subscription model", "in-app purchase vs payment gateway"],
  category: "Mobile Engineering",
  badge: "MOBILE ENGINEERING",
  readMinutes: 8,
  published: "2026-11-24",
  icon: "doc",
  lead: "Many founders find out about app store fees after the app is built, when Apple rejects the build or the first payout is smaller than expected. Whether you must use in-app purchases, and what the stores keep, changes your pricing, your backend and sometimes your business model. This guide helps you plan it before you write a line of code.",
  cardDesc: "When Apple and Google require in-app purchases, when you can use your own payment gateway, how store fees affect pricing, and how to plan subscriptions.",
  cta: { title: "Planning how your app will make money?", text: "Book a free 30-minute call. We will look at what you sell, tell you which payment route the stores expect, and what that means for your build.", button: "Book a free 30-minute call" },
  endCta: { title: "Building a paid app or subscription product?", text: "We build iOS, Android and cross-platform apps with store billing, payment gateways and subscription backends, with your code in your own accounts from day one.", service: { href: "/services/mobile-app-development", label: "See mobile app development" } },
  related: ["app-store-and-google-play-approval-guide", "upi-payment-integration-for-apps", "ios-vs-android-which-to-build-first"],
  faq: [
    ["Do I have to use Apple in-app purchase for my app?", "Only if you sell digital content or features that are used inside the app, such as premium features, subscriptions to content, virtual currency or extra levels. Physical goods and real-world services, such as food, rides, salon appointments or event tickets, are normally paid through your own payment gateway instead. Read Apple's App Review Guidelines on payments for the exact rules, because they are updated regularly."],
    ["How much do Apple and Google take from in-app purchases?", "Both stores keep a commission on digital sales made through their billing. The rate depends on the store, your programme, your yearly earnings, whether it is a renewing subscription and the country of the buyer. Some regions, such as the European Union and India, have their own options. Check the official Apple and Google pages for the current rates before you set prices."],
    ["Can I use Razorpay, Stripe or UPI instead of in-app purchase?", "Yes for physical goods and real-world services, and for business payments made outside the app. For digital goods used inside the app, the stores usually expect their own billing, with some exceptions by region and app type. If you are unsure, describe your product to us or check the guidelines before you design the checkout."],
    ["Should my app be a one-time purchase or a subscription?", "A subscription suits products that deliver ongoing value, such as content, tools you use every week or a service that keeps improving. A one-time purchase or a one-time unlock suits a finished tool with little ongoing cost. Many apps use a free tier with an upgrade. Choose based on how often users get value, not only on revenue."],
    ["What does an in-app purchase setup add to development work?", "You need products set up in App Store Connect and the Google Play Console, purchase screens, receipt or purchase token checks on your server, handling for renewals, refunds, cancellations and restores, and testing in each store's sandbox. It is real work, so include it in your scope and estimate from the start."],
  ],
  body: `
<p>
  A common way this goes wrong: an app that sells digital content is built with a regular payment gateway at checkout, and the store review rejects it. The fix means new screens, a server change and a fresh look at pricing, often in the week the team planned to launch.
</p>
<p>
  That is why I raise payments in the very first call with a founder. Which payment route your app must use depends on <em>what</em> you sell, and it affects your margins, your backend and your release plan. Here is what founders need to know.
</p>

<div class="blog-callout">
  <h4>The short answer</h4>
  <p>
    If users buy something digital that they use inside the app, plan for Apple and Google in-app purchases and their commission. If users pay for physical goods or real-world services, use your own payment gateway. Decide this before design starts, because it shapes your pricing and your checkout.
  </p>
</div>

<h2 id="what-counts">What counts as an in-app purchase</h2>
<p>
  Apple and Google both run their own billing systems for digital goods. The rules are long, but the core idea is simple: if the thing a user pays for is unlocked or consumed inside the app, the store expects its billing to handle the payment.
</p>
<table>
  <thead><tr><th>What you sell</th><th>Typical payment route</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td>Premium features or a pro tier</td><td>Store in-app purchase</td><td>Extra filters, more storage, ad-free mode</td></tr>
    <tr><td>Digital content subscriptions</td><td>Store in-app purchase</td><td>Courses, videos, music, news, workout plans</td></tr>
    <tr><td>Virtual items and currency</td><td>Store in-app purchase</td><td>Coins, credits, game levels</td></tr>
    <tr><td>Physical goods</td><td>Your own payment gateway</td><td>Groceries, clothes, food delivery</td></tr>
    <tr><td>Real-world services</td><td>Your own payment gateway</td><td>Salon bookings, rides, home services, event tickets</td></tr>
    <tr><td>Business software sold to companies</td><td>Often billed outside the app</td><td>A team tool where the company pays on the web</td></tr>
  </tbody>
</table>
<p>
  The exact wording lives in the payments section of <a href="https://developer.apple.com/app-store/review/guidelines/#payments" target="_blank" rel="noopener">Apple's App Review Guidelines</a> and in Google Play's payments policy. Both change from time to time, and there are special cases such as reader apps, person-to-person services and apps sold to businesses. When a product sits near a line, we check the current wording before we design the checkout.
</p>

<h2 id="fees">How store fees work</h2>
<p>
  When a sale goes through store billing, the store keeps a commission and pays you the rest. What you actually pay depends on several things:
</p>
<ul>
  <li><strong>Your size:</strong> both stores have a reduced rate for smaller developers. Apple runs the <a href="https://developer.apple.com/app-store/small-business-program/" target="_blank" rel="noopener">App Store Small Business Program</a>, which you must apply for.</li>
  <li><strong>The product type:</strong> renewing subscriptions often get a lower rate than one-time purchases, especially after the first year.</li>
  <li><strong>The buyer's country:</strong> regulators in several regions, including the European Union and India, have pushed the stores to offer other billing options and different fee structures.</li>
  <li><strong>Taxes:</strong> the stores handle sales tax or GST collection in many countries, which also changes what reaches your bank account.</li>
</ul>
<p>
  I am not listing exact percentages here because they have changed several times in recent years and differ by region. Read the current figures on <a href="https://support.google.com/googleplay/android-developer/answer/112622" target="_blank" rel="noopener">Google Play's service fees page</a> and Apple's developer pages, and build them into your pricing sheet as a line of their own.
</p>

<h2 id="pricing">What fees mean for your pricing</h2>
<p>
  Store fees are a cost of sale, like a payment gateway fee, just larger. Founders handle them in a few ways:
</p>
<ol>
  <li><strong>Price for the fee.</strong> Work out your margin after the store's share and taxes, not before. If the numbers only work without the fee, the model needs another look.</li>
  <li><strong>Lean on subscriptions where they fit.</strong> If your product gives ongoing value, a subscription can carry a lower store rate over time and gives you more predictable revenue.</li>
  <li><strong>Sell on the web where the rules allow it.</strong> Many products let users sign up and pay on their website, then log in to the app. The rules about mentioning or linking to web purchases inside the app differ by store and region, so follow the current guidelines exactly.</li>
  <li><strong>Keep business customers on invoices.</strong> If companies pay for seats, billing them directly outside the app is common and keeps the app simple.</li>
</ol>

{{cta}}

<h2 id="own-gateway">When you use your own payment gateway</h2>
<p>
  For physical goods and real-world services you choose your own provider, such as Razorpay, Stripe or Cashfree, and in India you will almost certainly want UPI. Our guide to <a href="/blog/upi-payment-integration-for-apps">UPI payment integration for apps</a> covers that setup. On the <a href="/work/make-my-look">Make My Look salon app</a>, customers book and pay for appointments, which are real-world services, so store billing does not apply.
</p>
<p>
  Owning the gateway gives you more control over refunds, offers and payment methods, but you also own more: failed payments, reconciliation and the security rules of your provider.
</p>

<h2 id="build">What an in-app purchase setup involves</h2>
<p>
  Founders sometimes assume store billing is a switch you turn on. It is a small project of its own. A solid setup includes:
</p>
<ul>
  <li><strong>Products in both stores:</strong> each subscription or item created in App Store Connect and the Google Play Console, with prices per country.</li>
  <li><strong>Purchase screens:</strong> a clear paywall, plan comparison, and the restore purchases option Apple expects.</li>
  <li><strong>Server-side checks:</strong> your backend should verify every purchase with the store rather than trusting the phone. Our guide on <a href="/blog/mobile-app-backend-firebase-vs-custom">choosing a mobile app backend</a> explains where this logic lives.</li>
  <li><strong>Subscription events:</strong> renewals, upgrades, downgrades, grace periods, refunds and cancellations, each updating the user's access correctly.</li>
  <li><strong>One account across devices:</strong> a user who pays on iPhone and logs in on Android or the web should keep their access.</li>
  <li><strong>Sandbox testing:</strong> both stores provide test environments, and every purchase path should be tested there before review.</li>
  <li><strong>Review readiness:</strong> clear pricing, terms and privacy links, and a demo account for the reviewer. See our <a href="/blog/app-store-and-google-play-approval-guide">App Store and Google Play approval guide</a>.</li>
</ul>
<p>
  Include all of this in your scope from day one. Our <a href="/project-costs">project costs page</a> explains how features like billing affect a budget, and the <a href="/tools/app-cost-calculator">app cost calculator</a> gives you a starting range.
</p>

<h2 id="mistakes">Common mistakes I see</h2>
<ul>
  <li><strong>Deciding the payment route after the app is built.</strong> This is the most expensive time to find out.</li>
  <li><strong>Pricing without the store's share.</strong> Your margin looks fine on paper and disappears in the first payout.</li>
  <li><strong>Trusting the device.</strong> Unlocking features without a server check invites fraud.</li>
  <li><strong>Forgetting restore and cross-device access.</strong> These create support tickets and one-star reviews quickly.</li>
  <li><strong>Copying another app's checkout.</strong> A competitor may sell something different, sit in a different region or have a special agreement. Your rules depend on your product.</li>
</ul>

<h2 id="checklist">A quick checklist before you build</h2>
<ol>
  <li>List everything a user can pay for, and mark each item digital or physical.</li>
  <li>Choose the payment route for each, with a link to the guideline that supports it.</li>
  <li>Build a pricing sheet that includes store fees, gateway fees and taxes.</li>
  <li>Decide one-time purchase, subscription or both, and how free users upgrade.</li>
  <li>Plan the server checks, subscription events and cross-device access.</li>
  <li>Add billing setup and sandbox testing to the scope and timeline.</li>
</ol>

<h2 id="creuto">How we approach it</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> we settle the payment route in planning, not at review time. After a free 30-minute call, you get a clear written proposal within 24 hours that shows how your app will take payments and what that adds to the build. We usually have a first working version in about 4 weeks, your code lives in your own accounts from day one, and every launch comes with a 60-day warranty. See our <a href="/services/mobile-app-development">mobile app development</a> page for more.
</p>
`,
};
