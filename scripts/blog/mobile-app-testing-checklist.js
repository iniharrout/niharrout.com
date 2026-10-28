module.exports = {
  slug: 'mobile-app-testing-checklist',
  title: 'How to Test a Mobile App Before Launch: A Checklist',
  headline: 'How to Test a Mobile App Before Launch: A Founder\'s Checklist',
  shortTitle: 'App testing checklist',
  description: 'A checklist for founders testing a mobile app before launch: real devices, poor networks, payments, crashes, beta testers and a clear sign-off.',
  keywords: ['mobile app testing checklist', 'how to test a mobile app before launch', 'app user acceptance testing', 'app beta testing', 'pre-launch app testing'],
  category: 'Mobile Engineering',
  badge: 'MOBILE ENGINEERING',
  readMinutes: 8,
  published: '2026-10-28',
  icon: 'check',
  lead: 'Your development team will test the app. You still need to test it yourself, because you know how your customers behave and they do not. This is the checklist I give founders before they sign off a release: what to try, on which phones, in which conditions, and what "ready" should mean.',
  cardDesc: 'What to test before you sign off an app release: real devices, bad networks, payments, crashes, beta testers and a clear go or no-go.',
  cta: { title: 'Launching an app soon?', text: 'Book a free 30-minute call. I will look at your release plan and tell you what to test before you go live.', button: 'Book a free 30-minute call' },
  endCta: { title: 'Want a team that tests before you have to?', text: 'We test every release on real Android and iOS devices, and every launch comes with a 60-day post-launch warranty.', service: { href: '/services/mobile-app-development/mobile-app-qa-testing', label: 'See mobile app QA and testing' } },
  related: ['app-store-and-google-play-approval-guide', 'mobile-app-security-checklist', 'how-long-does-it-take-to-build-an-app'],
  faq: [
    ['Who should test a mobile app before launch?', 'Three groups: the development team, who test that each feature works as built; you or someone on your side, who tests that it works the way your business needs; and a small group of real users in a beta, who find the problems neither of you expected.'],
    ['How long should testing take before an app launch?', 'Plan for testing throughout the build, not only at the end. Before launch, leave enough time for at least one full round of your own acceptance testing, a short beta and one round of fixes. Store review needs its own time on top of that.'],
    ['Which phones should I test my app on?', 'Test on the phones your customers actually use. For a broad audience in India that means several budget and mid-range Android phones, not only flagships. Always include the oldest operating system version you plan to support and at least one small screen.'],
    ['What is user acceptance testing for an app?', 'User acceptance testing, or UAT, is when the client checks the finished release against the agreed scope and real business scenarios before signing it off. It answers "does this do what we need?", not only "does this work?".'],
    ['Can a bug still appear after launch?', 'Yes. No amount of testing finds everything, which is why crash reporting, a quick way to release fixes and a post-launch warranty matter. The goal of pre-launch testing is to make sure the problems left are small and rare.'],
  ],
  body: `
<p>
  Most launch problems I see are not exotic. A sign-up that fails on one phone model. A payment that succeeds but never shows in the app. A screen that looks fine on the office Wi-Fi and spins forever on a train. None of these need special tools to find. They need someone to sit down with a list and try the app the way customers will.
</p>
<p>
  This guide is that list. It is written for founders and business owners signing off a release built by their own team or an outside partner. It does not replace your developers' testing. It is the check you do on top of it.
</p>

<div class="blog-callout">
  <h4>The rule I use</h4>
  <p>
    Do not sign off a release you have only seen in a demo. Install the build on your own phone, use it for real tasks for a few days, and have at least a handful of real users do the same before it goes to the stores.
  </p>
</div>

<h2 id="three-layers">Know who tests what</h2>
<p>
  Testing an app happens in three layers. Each catches different problems, and skipping one usually means its problems reach your customers.
</p>
<table>
  <thead><tr><th>Layer</th><th>Who does it</th><th>What it answers</th></tr></thead>
  <tbody>
    <tr><td>Developer and QA testing</td><td>Your development team</td><td>Does each feature work as specified, on the agreed devices?</td></tr>
    <tr><td>Acceptance testing (UAT)</td><td>You or your operations team</td><td>Does the app handle our real business scenarios?</td></tr>
    <tr><td>Beta testing</td><td>A small group of real users</td><td>Do people understand it and use it the way we expected?</td></tr>
  </tbody>
</table>
<p>
  Ask your team early what their QA covers: which devices, which operating system versions, and whether they run automated tests on the core flows. A clear answer here tells you a lot about how the rest of the project will go. Our <a href="/services/mobile-app-development/mobile-app-qa-testing">mobile app QA and testing</a> page shows what we include.
</p>

<h2 id="core-flows">Step 1: Write down your core flows</h2>
<p>
  Before you test anything, list the five to ten journeys that make or break the business. For a booking app that might be: sign up, search, book, pay, cancel, get a reminder. For a field team app: log in, see today's jobs, update a job offline, sync. Write each one as a short sequence of steps with the result you expect.
</p>
<p>
  If you have a PRD or user stories, start from those. Every flow should map to something in the agreed scope, which makes sign-off a factual conversation instead of a debate.
</p>

<h2 id="devices">Step 2: Test on the phones your customers use</h2>
<ul>
  <li><strong>A spread of Android phones:</strong> at least one budget phone with limited memory, one mid-range phone and one recent flagship. Budget phones expose slow screens and crashes that flagships hide.</li>
  <li><strong>At least two iPhones:</strong> one small screen and one large, including the oldest iOS version you support.</li>
  <li><strong>Large text and dark mode:</strong> turn on the largest font size and dark mode on one device and walk through every screen. Text that gets cut off is a common, avoidable problem.</li>
  <li><strong>Accessibility basics:</strong> check that buttons have readable labels for screen readers and that contrast is reasonable. The <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener">WCAG guidelines</a> are the usual reference.</li>
</ul>

<h2 id="real-conditions">Step 3: Break it the way real life does</h2>
<p>
  Most apps are tested on fast office Wi-Fi with a full battery. Customers use them on a weak mobile signal, while switching apps, with notifications off. Try each of these on your core flows:
</p>
<ul>
  <li>Switch to a slow or unstable connection, then turn on airplane mode in the middle of a task. The app should tell you what happened and recover, not freeze or lose data.</li>
  <li>Send the app to the background during a payment or upload, then come back.</li>
  <li>Take a phone call in the middle of a flow.</li>
  <li>Deny a permission, such as location or camera, and see whether the app explains why it needs it and still works where it can.</li>
  <li>Log in on two devices with the same account.</li>
  <li>Use the app for a full day and watch battery use and phone storage.</li>
</ul>

{{cta}}

<h2 id="money-and-data">Step 4: Check money, messages and data carefully</h2>
<p>
  The flows that touch money or customer data deserve their own pass, because mistakes there cost trust, not just time.
</p>
<ul>
  <li><strong>Payments:</strong> test a successful payment, a failed payment, a cancelled payment and a refund. Check that the order status in the app, the admin panel and the payment provider's dashboard all agree.</li>
  <li><strong>Notifications, SMS and email:</strong> confirm each one arrives, reads correctly and opens the right screen when tapped.</li>
  <li><strong>Admin panel:</strong> make a change in the admin panel and confirm the app reflects it. Many launch issues sit between the two.</li>
  <li><strong>Accounts:</strong> test password reset, logout, account deletion and what happens to a deleted user's data.</li>
  <li><strong>Security basics:</strong> our <a href="/blog/mobile-app-security-checklist">mobile app security checklist</a> lists what to confirm before real customer data goes in.</li>
</ul>

<h2 id="beta">Step 5: Run a short beta with real users</h2>
<p>
  Both stores have built-in ways to share a pre-release build. Apple uses <a href="https://developer.apple.com/testflight/" target="_blank" rel="noopener">TestFlight</a>, and Google Play has <a href="https://support.google.com/googleplay/android-developer/answer/9845334" target="_blank" rel="noopener">internal, closed and open testing tracks</a>. Note that Google Play asks new personal developer accounts to run a closed test with a minimum number of testers for a set period before they can publish, so check the current rules early and build that time into your plan.
</p>
<p>
  Keep the beta small and specific. Pick people who match your target customer, give them two or three tasks to complete, and ask what confused them. Watch one or two of them use the app in person if you can. You will learn more from ten minutes of watching than from a week of written feedback.
</p>

<h2 id="monitoring">Step 6: Make sure you can see problems after launch</h2>
<p>
  Testing reduces risk. It does not remove it. Before you launch, confirm with your team that:
</p>
<ul>
  <li>Crash reporting is switched on for both platforms and someone checks it daily in the first weeks. Google's <a href="https://developer.android.com/topic/performance/vitals" target="_blank" rel="noopener">Android vitals</a> also shows crash and freeze rates for apps on Google Play.</li>
  <li>Basic analytics track whether users finish your core flows, so you can spot where they drop off.</li>
  <li>There is a clear process for releasing an urgent fix, and you know who to call.</li>
  <li>Store listings, privacy details and the demo account for reviewers are ready. Our <a href="/blog/app-store-and-google-play-approval-guide">App Store and Google Play approval guide</a> covers the common rejections.</li>
</ul>

<h2 id="sign-off">Step 7: Decide go or no-go with clear rules</h2>
<p>
  Agree the sign-off rules before testing starts, not after. A simple version that works for most first releases:
</p>
<ul>
  <li><strong>Blockers:</strong> anything that stops a core flow, loses data or mishandles money. Zero allowed at launch.</li>
  <li><strong>Major issues:</strong> a core flow works but is confusing or slow. Fix before launch, or launch with a dated plan to fix.</li>
  <li><strong>Minor issues:</strong> cosmetic problems and edge cases. Log them and schedule them after launch.</li>
</ul>
<p>
  Keep all issues in one shared list with screenshots, the phone model and the steps to repeat them. It makes fixes faster and gives you a clean record of what was agreed. Planning the budget for life after launch? Our guide to <a href="/blog/software-maintenance-cost-and-planning">software maintenance cost and planning</a> helps, and the <a href="/tools/app-cost-calculator">app timeline calculator</a> shows where testing fits in an overall schedule.
</p>

<h2 id="how-we-do-it">How we handle testing at Creuto</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> testing runs through the whole build, not just the final week. You get a working build on your own phone early, typically with the first working version in about 4 weeks, so acceptance testing starts long before launch. We test on real Android and iOS devices, handle store submission, and every launch is covered by a 60-day post-launch warranty. Apps like the <a href="/work/make-my-look">Make My Look</a> salon app went through this same process before going live.
</p>
`,
};
