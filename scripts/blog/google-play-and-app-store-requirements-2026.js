module.exports = {
  slug: 'google-play-and-app-store-requirements-2026',
  title: 'Google Play and App Store Requirements 2026: Checklist',
  headline: 'Google Play and App Store Requirements in 2026: What Your App Needs Now',
  shortTitle: 'Store requirements 2026',
  description: 'The 2026 store requirements now in force: Android 16 target API on Google Play, the iOS 26 SDK on the App Store, and what to test before your next update.',
  keywords: ['google play target api level 2026', 'target api 36 requirement', 'ios 26 sdk requirement', 'app store requirements 2026', 'app update rejected target sdk'],
  category: 'Mobile Engineering',
  badge: 'APP STORES',
  readMinutes: 7,
  published: '2026-11-27',
  icon: 'doc',
  lead: 'If your next app update is blocked, or your app has not been touched for a year, the cause is often a store requirement that has already taken effect. Here is what Google Play and Apple require as of late November 2026, taken from their own pages, and what to check before you ship.',
  cardDesc: 'Android 16 target API, the iOS 26 SDK and other 2026 store requirements now in force, with a checklist for your next release.',
  cta: { title: 'Is your update blocked?', text: 'Book a free 30-minute call. Bring your app and the warning from the store console, and we will tell you what the upgrade involves.', button: 'Book a free 30-minute call' },
  endCta: { title: 'Need your app brought up to date?', text: 'We upgrade Android, iOS, React Native and Flutter apps to current store requirements, test them on real devices and handle the submission. You get a written proposal within 24 hours of a free call.', service: { href: '/services/mobile-app-development', label: 'See mobile app development' } },
  related: ['app-store-and-google-play-approval-guide', 'rebuild-or-update-your-app', 'software-maintenance-cost-and-planning'],
  faq: [
    ['What target API level does Google Play require in 2026?', 'From 31 August 2026, new apps and app updates must target Android 16 (API level 36) or higher. Wear OS and Android Automotive OS apps must target API 35, and Android TV and Android XR apps API 34.'],
    ['Will my old app be removed from Google Play?', 'Google says existing apps must target at least Android 15 (API level 35) to remain available to new users on devices running a newer Android version than the app targets. Apps targeting lower levels are only available on devices at or below their target.'],
    ['What does Apple require for App Store uploads?', 'Since 28 April 2026, apps uploaded to App Store Connect must be built with Xcode 26 or later using the iOS 26 SDK or the equivalent SDK for other Apple platforms. Since 9 September 2026, iOS and iPadOS uploads must target iOS 13 or later.'],
    ['Does building with the iOS 26 SDK drop support for older iPhones?', 'Not by itself. The SDK you build with is different from the oldest iOS version your app supports. You can build with the newer SDK and keep an older minimum version, subject to the iOS 13 floor.'],
  ],
  body: `
<p>
  Both stores raise their minimum technical requirements regularly. Nothing happens to your app on the day itself, which is why the change is easy to miss. You find out months later, when you try to ship a fix and the console refuses it.
</p>

<div class="blog-callout">
  <h4>The short answer</h4>
  <p>
    Google Play: new apps and updates must target Android 16 (API 36). App Store: builds must use Xcode 26 and the iOS 26 SDK. Both are already in force.
  </p>
</div>

<h2 id="summary">Requirements in force as of November 2026</h2>
<table>
  <thead><tr><th>Store</th><th>Requirement</th><th>In force since</th></tr></thead>
  <tbody>
    <tr><td>Google Play</td><td>New apps and updates target Android 16 (API 36) or higher</td><td>31 August 2026</td></tr>
    <tr><td>Google Play</td><td>Existing apps target Android 15 (API 35) or higher to stay visible to new users on newer devices</td><td>31 August 2026</td></tr>
    <tr><td>App Store</td><td>Built with Xcode 26 or later, using the iOS 26 SDK or equivalent</td><td>28 April 2026</td></tr>
    <tr><td>App Store</td><td>iOS and iPadOS apps target iOS 13 or later</td><td>9 September 2026</td></tr>
    <tr><td>App Store</td><td>Updated age rating questions answered</td><td>31 January 2026</td></tr>
  </tbody>
</table>
<p>
  Sources: Google's <a href="https://developer.android.com/google/play/requirements/target-sdk" target="_blank" rel="noopener">target API level requirements</a> and Apple's <a href="https://developer.apple.com/news/upcoming-requirements/" target="_blank" rel="noopener">upcoming requirements</a> page. Check them before you plan a release, because they are updated as new dates are announced.
</p>

<h2 id="google-play">Google Play: Android 16 target API</h2>
<p>
  Wear OS and Android Automotive OS apps have a lower bar (API 35), and Android TV and Android XR apps need API 34. Permanently private apps, limited to one organisation for internal use, are exempt.
</p>
<p>
  Google offered an extension to 1 November 2026 for teams that needed more time. That date has passed, so plan on the upgrade being required for your next update.
</p>

<h2 id="behaviour">What can break when you raise the target</h2>
<p>
  Changing one number in the build file is not the whole job. Android applies different behaviour to apps that target Android 16. These are the ones most likely to affect a business app, from Google's <a href="https://developer.android.com/about/versions/16/behavior-changes-16" target="_blank" rel="noopener">behaviour changes page</a>:
</p>
<ul>
  <li><strong>Edge-to-edge screens.</strong> Apps can no longer opt out, so headers and bottom buttons can sit under the system bars if insets are not handled.</li>
  <li><strong>Back navigation.</strong> Predictive back is on by default, and older custom back handling is not called unless you migrate or opt out.</li>
  <li><strong>Large screens.</strong> On tablets and large foldables, orientation and resizing restrictions are ignored, so portrait-only layouts can stretch.</li>
  <li><strong>Health sensors.</strong> Apps reading heart rate and similar data move to more specific permissions.</li>
  <li><strong>Scheduled tasks.</strong> Missed fixed-rate tasks no longer run all at once when the app returns.</li>
</ul>

{{cta}}

<h2 id="apple">App Store: the iOS 26 SDK</h2>
<p>
  Apple's rule is about the tools you build with. Your Mac and build service need Xcode 26 or later, which can in turn require a newer macOS version. Older third-party libraries may fail to compile, and new system styling can change how some standard controls look, so review the main screens after rebuilding.
</p>

<h2 id="cross-platform">React Native and Flutter apps</h2>
<p>
  Cross-platform apps are affected too, because they produce native Android and iOS builds. Expect to upgrade the framework and any plugin that has not been updated. An app that has skipped several framework versions needs more work than one kept current, which is the practical argument for small regular maintenance. See <a href="/blog/software-maintenance-cost-and-planning">planning software maintenance</a>.
</p>

<h2 id="checklist">Checklist before your next release</h2>
<ol>
  <li>Check the target API level in your Android build and the Xcode version on your build machine.</li>
  <li>List third-party SDKs, and update payment, maps, analytics and notification libraries first.</li>
  <li>Test every screen with gesture navigation, on a small phone and on a tablet.</li>
  <li>Test the back gesture on forms, checkouts and any screen that asks "are you sure?".</li>
  <li>Run payments, login, push notifications and deep links end to end.</li>
  <li>Review your store listings, privacy details and age rating answers.</li>
  <li>Release to a small share of users first and watch crash reports.</li>
</ol>

<h2 id="rejected">If you are already blocked</h2>
<p>
  Fix the requirement first and ship that update on its own, without new features. It is easier to test, quicker to approve and it unblocks urgent fixes. If the app is old enough that the upgrade keeps failing, compare the effort with <a href="/blog/rebuild-or-update-your-app">rebuilding it</a>. For review rejections that are about policy rather than versions, see our <a href="/blog/app-store-and-google-play-approval-guide">store approval guide</a>.
</p>
`,
};
