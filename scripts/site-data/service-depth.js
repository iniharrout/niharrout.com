/**
 * Extra depth for each service page (build-services-pages.js): the features we build, the technology used,
 * related case studies and service-specific FAQs. Keeps every page different from its siblings, so the pages
 * are not thin template copies.
 *
 * Copy rules: no prices, no invented numbers or client names (case studies come only from WORK in
 * industries.js), no "best", "world-class", "guarantee", "zero downtime", no em dashes. Technology names
 * stay within what /technology lists or what the service itself states.
 */
module.exports = {
  // ---------- Custom software ----------
  'custom-erp-development': {
    features: [
      ['Inventory and warehouse', 'Stock by location, batches and barcodes, with reorder alerts before you run out.'],
      ['Purchase and vendor management', 'Purchase orders, approvals and supplier records in one flow.'],
      ['Sales, billing and GST', 'Quotes, orders, GST invoices and e-way bills generated from the same data.'],
      ['Production and job work', 'Bills of materials, work orders and shop-floor progress you can see live.'],
      ['HR and attendance inputs', 'Staff records, attendance and leave that feed payroll and reporting.'],
      ['Owner dashboards', 'Daily numbers for owners and managers without waiting for month-end reports.'],
    ],
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Flutter', 'AWS', 'Docker'],
    work: ['erp'],
    faq: [
      ['Can a custom ERP work with Tally or our accounting software?', 'Yes. We can keep your accounting software for accounts and sync invoices, payments and ledgers with the ERP, so your accountant keeps working the way they do today.'],
      ['Do we have to replace everything at once?', 'No. We roll out one module at a time, run it next to your current process for a short period and switch over only when your team is comfortable.'],
      ['Can staff use the ERP on mobile phones?', 'Yes. Warehouse, shop-floor and field staff get simple mobile screens for scanning, entries and approvals, while managers use the full web version.'],
    ],
  },
  'crm-development': {
    features: [
      ['Lead capture from every channel', 'Website forms, WhatsApp, calls and marketplaces flowing into one pipeline.'],
      ['Pipeline and deal stages', 'Stages that match how your team actually sells, with owners and next steps.'],
      ['Follow-up reminders', 'Tasks and reminders so no enquiry goes cold after the first call.'],
      ['Quotes and proposals', 'Quotes created from the CRM with your products, terms and approvals.'],
      ['Service and support tickets', 'After-sales requests tracked against the same customer record.'],
      ['Sales reports', 'Conversion by source, salesperson and stage, ready every morning.'],
    ],
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Flutter', 'AWS'],
    work: ['erp', 'skribe'],
    faq: [
      ['Should we build a custom CRM or use Salesforce, HubSpot or Zoho?', 'If a ready-made CRM fits your sales process with light setup, use it. A custom CRM makes sense when your process is unusual, you need deep integration with your own systems, or per-user licences become expensive as the team grows.'],
      ['Can the CRM connect to WhatsApp and our website?', 'Yes. We connect website forms, WhatsApp Business and call logs so every enquiry lands in the CRM with its source.'],
      ['Can we move our existing customer data into it?', 'Yes. We clean and import customer, contact and deal history from spreadsheets or your current CRM, and test the import before go-live.'],
    ],
  },
  'enterprise-application-development': {
    tech: [],
    work: [],
    faq: [],
  },
  'software-consulting': {
    features: [
      ['Build or buy review', 'An honest view of whether to build, buy or combine both for your need.'],
      ['Scope and requirements', 'A clear written scope your team and any vendor can work from.'],
      ['Architecture review', 'A check of your current or planned architecture against scale, cost and security.'],
      ['Vendor and proposal review', 'A second opinion on quotes and proposals you have received.'],
      ['Technology choices', 'Which stack, cloud and tools suit your team and roadmap.'],
      ['Roadmap planning', 'What to build first, what can wait and how to measure progress.'],
    ],
    tech: ['React', 'Node.js', 'Python', 'Flutter', 'PostgreSQL', 'AWS', 'Azure', 'OpenAI'],
    work: ['erp', 'skyone'],
    faq: [
      ['Do we have to build with you after the consulting work?', 'No. You get documents and recommendations you can take to any team. Many clients do build with us afterwards, but there is no obligation.'],
      ['How long does a consulting engagement take?', 'Most reviews take one to three weeks, depending on how much exists already and how many people we need to speak with.'],
      ['Can you review a project that is already in trouble?', 'Yes. We review the code, process and plan, then give you a written list of what to fix first and whether to continue, restart or change direction.'],
    ],
  },
  'legacy-application-modernization': {
    features: [
      ['Code and system audit', 'A map of what the old system does, where it breaks and what it depends on.'],
      ['Staged rebuild plan', 'Modules replaced one at a time so the business keeps running.'],
      ['Data migration', 'Rehearsed migrations with checks, so records match before you switch.'],
      ['Modern interfaces', 'Web and mobile screens on top of logic that still works.'],
      ['API layer', 'APIs that let old and new parts talk while the move happens.'],
      ['Cloud move', 'Hosting moved to the cloud with backups, monitoring and access control.'],
    ],
    tech: ['React', 'Node.js', 'Java', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Azure'],
    work: ['erp'],
    faq: [
      ['Should we rebuild from scratch or modernise step by step?', 'Step by step is usually safer. We replace the parts that cause the most pain first, keep what still works and avoid a single risky switchover.'],
      ['Will our users need retraining?', 'Some, but we keep familiar workflows where they work and train the people who use the system every day before each module goes live.'],
      ['Can you work with old code nobody understands any more?', 'Yes. We start by reading and documenting what the system really does, including rules nobody wrote down, before changing anything.'],
    ],
  },
  'ecommerce-solutions': {
    features: [
      ['Online store', 'Product catalogue, search, cart and checkout that work well on phones.'],
      ['Payments for India and abroad', 'UPI, cards, wallets and cash on delivery, plus international cards where needed.'],
      ['Order and inventory sync', 'Stock and orders kept in step across your store, warehouse and marketplaces.'],
      ['Shipping and returns', 'Courier integration, tracking updates and a simple returns flow.'],
      ['Multi-vendor marketplace', 'Seller onboarding, commissions and payouts for marketplace models.'],
      ['Offers and loyalty', 'Coupons, bundles and repeat-purchase rewards you can change without a developer.'],
    ],
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Flutter', 'AWS'],
    work: ['flash', 'skyone'],
    faq: [
      ['Shopify or a custom ecommerce build?', 'Shopify is a good start for a standard store. A custom build makes sense for marketplaces, quick commerce, complex pricing or deep integration with your own systems.'],
      ['Can you build a quick-commerce or delivery app?', 'Yes. We built FlashNow, a quick-commerce platform powered by neighbourhood stores, with consumer, vendor, delivery partner and city admin roles in one real-time system.'],
      ['Do you handle GST invoices and courier integration?', 'Yes. We generate GST-ready invoices and connect courier partners for labels, tracking and cash-on-delivery reconciliation.'],
    ],
  },

  // ---------- Mobile ----------
  'android-app-development': {
    features: [
      ['Kotlin and Jetpack Compose', 'Modern native Android code that is easier to maintain and extend.'],
      ['Works on budget phones', 'Tested for low memory, small screens and slow networks common in India.'],
      ['Offline mode and sync', 'Field and rural users keep working without a signal and sync later.'],
      ['Payments and UPI', 'UPI, cards and wallets through your payment gateway.'],
      ['Push notifications', 'Timely alerts that bring users back without spamming them.'],
      ['Google Play release', 'Store listing, review requirements and staged rollouts handled for you.'],
    ],
    tech: ['Kotlin', 'Flutter', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    work: ['mml', 'flash', 'skyone'],
    faq: [
      ['How long does an Android app take to build?', 'A focused first version is typically working in about 4 weeks. Larger apps with several user roles and an admin panel take longer, and the written proposal sets out the plan.'],
      ['Will the app work on older Android phones?', 'We agree a minimum Android version with you and test on a range of low and mid-range devices, because that is what many of your users carry.'],
      ['Can you add an iOS version later?', 'Yes. If iOS is likely, we often suggest Flutter or React Native from the start so one codebase serves both.'],
    ],
  },
  'ios-app-development': {
    features: [
      ['Swift and SwiftUI', 'Native iOS code that feels at home on iPhone and iPad.'],
      ['Apple sign-in and Face ID', 'Secure, quick login that iPhone users expect.'],
      ['Apple Pay and in-app purchases', 'Payments and subscriptions that follow App Store rules.'],
      ['Widgets and notifications', 'Useful information on the home screen and lock screen.'],
      ['HealthKit and device features', 'Camera, location, Bluetooth and health data where your app needs them.'],
      ['App Store submission', 'Review guidelines, privacy labels and TestFlight testing handled for you.'],
    ],
    tech: ['Swift', 'Flutter', 'Node.js', 'PostgreSQL', 'AWS'],
    work: ['mml', 'skyone'],
    faq: [
      ['Do you handle App Store review and rejections?', 'Yes. We prepare the listing, privacy details and test accounts, submit the app and handle any questions or rejections from Apple.'],
      ['Native Swift or cross-platform for iOS?', 'Native Swift suits apps that rely heavily on Apple features or advanced graphics. For most business apps that also need Android, Flutter or React Native is faster and costs less to maintain.'],
      ['Can you build for iPad as well?', 'Yes. We design layouts that adapt to iPad screens, or build a dedicated iPad experience where it helps your users.'],
    ],
  },
  'react-native-app-development': {
    features: [
      ['One codebase, two stores', 'Android and iOS apps from shared code, released together.'],
      ['Native modules where needed', 'Camera, maps, payments and device features without compromise.'],
      ['Shared logic with your web app', 'Business rules and types shared with a React or Next.js web app.'],
      ['Fast updates', 'Fixes and small changes shipped quickly, within store rules.'],
      ['Offline support', 'Local storage and sync for users with patchy connections.'],
      ['Performance tuning', 'Smooth lists, quick start-up and careful memory use on lower-end phones.'],
    ],
    tech: ['React Native', 'TypeScript', 'React', 'Node.js', 'GraphQL', 'PostgreSQL', 'AWS'],
    work: ['mml', 'flash'],
    faq: [
      ['React Native or Flutter?', 'Both work well. React Native fits teams that already use React or JavaScript on the web. Flutter gives very consistent visuals across devices. We recommend one based on your team and product, and explain why in writing.'],
      ['Will a React Native app feel native?', 'Yes, when it is built carefully. We use native components and modules where they matter and test on real devices for smooth scrolling and quick start-up.'],
      ['Can you take over an existing React Native app?', 'Yes. We review the code, upgrade dependencies safely and fix the biggest stability issues before adding new features.'],
    ],
  },
  'flutter-app-development': {
    features: [
      ['One codebase for Android and iOS', 'Consistent design and behaviour on both platforms.'],
      ['Custom, branded interfaces', 'Pixel-accurate screens and smooth animations.'],
      ['Web and desktop from the same code', 'An admin panel or companion web app where it makes sense.'],
      ['Offline-first storage', 'Data saved on the device and synced when the network returns.'],
      ['Payments and maps', 'UPI, cards, location and maps integrated through tested packages.'],
      ['Store releases', 'Google Play and App Store submissions, testing tracks and staged rollouts.'],
    ],
    tech: ['Flutter', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    work: ['mml', 'flash', 'skyone'],
    faq: [
      ['Is Flutter good for business apps?', 'Yes. Flutter is a strong choice for most business and consumer apps that need Android and iOS, especially when a consistent branded design matters.'],
      ['How long does a Flutter app take?', 'A focused first version is typically working in about 4 weeks, then we add features in milestones. Apps with several user roles take longer.'],
      ['Can Flutter use phone features like the camera and GPS?', 'Yes. Camera, GPS, Bluetooth, notifications and biometrics are all available, and we write native code for anything special.'],
    ],
  },
  'mobile-app-qa-testing': {
    features: [
      ['Real-device testing', 'Testing on a spread of Android and iOS devices your users actually own.'],
      ['Automated test suites', 'Repeatable checks that run before every release.'],
      ['Performance and battery checks', 'Start-up time, memory and battery use measured and improved.'],
      ['Security checks', 'Storage, login, API and permission checks before launch.'],
      ['Payment and edge cases', 'Failed payments, poor networks and interrupted flows tested on purpose.'],
      ['Release checklists', 'Store requirements and crash monitoring confirmed before each release.'],
    ],
    tech: ['Kotlin', 'Swift', 'Flutter', 'React Native', 'TypeScript'],
    work: ['mml', 'flash'],
    faq: [
      ['Can you test an app another team built?', 'Yes. We test apps built by any team and give you a clear report of issues, ranked by how much they affect users.'],
      ['Do you write automated tests or only test manually?', 'Both. Manual testing finds usability problems; automated tests protect key flows so they do not break in later releases.'],
      ['What do we get at the end?', 'A written report with steps to reproduce each issue, screenshots or recordings, and a priority order for fixing them.'],
    ],
  },
  'mobile-app-modernization': {
    features: [
      ['App health audit', 'Crashes, slow screens, outdated libraries and store risks found and ranked.'],
      ['Framework and SDK upgrades', 'Old Android, iOS, Flutter or React Native versions brought up to date.'],
      ['Redesign of key flows', 'The screens that lose users rebuilt for clarity and speed.'],
      ['Backend and API refresh', 'Slow or fragile APIs replaced without breaking existing users.'],
      ['Migration to cross-platform', 'Two separate apps moved to one Flutter or React Native codebase where it helps.'],
      ['Store compliance', 'Updates for new store rules, privacy labels and target SDK requirements.'],
    ],
    tech: ['Kotlin', 'Swift', 'Flutter', 'React Native', 'Node.js', 'PostgreSQL'],
    work: ['mml'],
    faq: [
      ['Should we rebuild our app or improve the one we have?', 'It depends on the code. After an audit we tell you which parts are worth keeping, what to fix first and whether a rebuild would actually save money.'],
      ['Will existing users lose their data?', 'No. We plan upgrades and migrations so accounts, history and settings carry over, and test them before release.'],
      ['Can you fix an app that Google Play or the App Store warned us about?', 'Yes. We update the app for the store requirements in the warning and resubmit it.'],
    ],
  },

  // ---------- Web ----------
  'customized-web-development': {
    features: [
      ['Business websites', 'Clear, fast company websites that explain what you do and bring in enquiries.'],
      ['Customer portals', 'Logins where customers see orders, documents and support.'],
      ['Booking and scheduling', 'Appointments, slots and reminders built around your rules.'],
      ['Dashboards and admin panels', 'Internal tools that replace spreadsheets.'],
      ['Integrations', 'Payments, CRM, ERP, email and WhatsApp connected to the site.'],
      ['SEO-ready builds', 'Fast pages, clean structure and the technical SEO search engines expect.'],
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    work: ['skyone', 'flash'],
    faq: [
      ['Website or web application: which do we need?', 'A website explains your business and brings enquiries. A web application is something people log in to and use, like a portal, booking system or dashboard. Many businesses need both, and we can build them together.'],
      ['Will the site load fast on mobile phones?', 'Yes. We build for phones first and test page speed, because most visitors in India browse on mobile data.'],
      ['Can our team update the content ourselves?', 'Yes. We set up an easy editor for the pages your team changes often, so you do not need a developer for every update.'],
    ],
  },
  'enterprise-web-development': {
    features: [
      ['Single sign-on', 'Login with your company identity provider and role-based access.'],
      ['Portals for staff, partners and customers', 'Separate experiences with shared data underneath.'],
      ['Workflow and approvals', 'Multi-step processes with owners and a full history.'],
      ['Integrations', 'ERP, CRM, data warehouse and partner APIs connected securely.'],
      ['Audit trails', 'A record of every sensitive action, for compliance and peace of mind.'],
      ['Scalable hosting', 'Cloud setup with monitoring, backups and staged releases.'],
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Java', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure'],
    work: ['erp', 'skribe'],
    faq: [
      ['Can you integrate with Microsoft 365 or Google Workspace?', 'Yes. We have built team chat that connects Google Chat, Workspace and Microsoft 365, and we integrate single sign-on and data with either suite.'],
      ['How do you handle security reviews?', 'We agree security requirements during scoping and provide the documentation your security team asks for, then build to your policies.'],
      ['Can you work with our in-house developers?', 'Yes. We can work in your repositories and review process, or deliver modules your team takes over with full documentation.'],
    ],
  },
  'cross-platform-development': {
    features: [
      ['Web, Android and iOS together', 'One product across platforms with shared business logic.'],
      ['Shared design system', 'Consistent components and branding everywhere.'],
      ['One backend', 'A single API and database serving every platform.'],
      ['Progressive web app option', 'An installable web app for users who will not download an app.'],
      ['Single release process', 'Coordinated releases so platforms do not drift apart.'],
      ['Analytics across platforms', 'One view of how users behave on web and mobile.'],
    ],
    tech: ['Flutter', 'React Native', 'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    work: ['skyone', 'mml'],
    faq: [
      ['Is cross-platform cheaper than separate apps?', 'Usually, because most code is shared and one team maintains it. The exact difference depends on how many platform-specific features you need.'],
      ['Which framework do you recommend?', 'Flutter for consistent, branded mobile and web screens; React Native with React when your team works in JavaScript. We explain the trade-off for your product in writing.'],
      ['Can we start with web and add mobile later?', 'Yes. We plan the backend and design system so mobile apps can be added without rebuilding.'],
    ],
  },
  'pwa-development': {
    features: [
      ['Installable from the browser', 'Users add the app to their home screen without an app store.'],
      ['Works offline', 'Key screens and data available without a connection.'],
      ['Push notifications', 'Re-engagement messages on supported devices.'],
      ['Fast on slow networks', 'Small, cached pages that load quickly on mobile data.'],
      ['One codebase for every device', 'Phones, tablets and desktops served by the same app.'],
      ['Search engine friendly', 'Pages that can rank in Google, unlike a native app.'],
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    work: ['flash'],
    faq: [
      ['PWA or native app?', 'A PWA is faster to launch and easier to update, and works well for content, ordering and booking. Choose native when you need deep device features or a strong App Store presence. Our guide on PWA vs native apps explains the trade-offs.'],
      ['Do PWAs work on iPhone?', 'Yes, with some limits. iPhone users can install PWAs and receive notifications on recent iOS versions, though some device features remain native-only.'],
      ['Can a PWA be listed on Google Play?', 'Yes. A PWA can be packaged and published on Google Play, which gives you store presence without a separate native app.'],
    ],
  },
  'on-site-seo-development': {
    features: [
      ['Technical SEO audit', 'Crawl, indexing, speed and structured data issues found and ranked.'],
      ['Core Web Vitals', 'Faster loading, stable layouts and quicker responses.'],
      ['Structured data', 'Schema for services, articles, FAQs and local business.'],
      ['Clean URLs and redirects', 'Site structure fixed without losing existing rankings.'],
      ['Page templates for search', 'Service, location and guide pages planned around real searches.'],
      ['Sitemaps and monitoring', 'Search Console set up so you can see what Google sees.'],
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js'],
    work: [],
    faq: [
      ['Can you promise first-page rankings?', 'No honest team can. We fix the technical issues, structure and content that search engines reward, and you can track progress in Search Console.'],
      ['How soon will we see results?', 'Technical fixes are usually picked up within weeks. Ranking gains for competitive searches take longer and depend on content and links from other sites.'],
      ['Will changing our website hurt our rankings?', 'Not if it is planned. We map old URLs to new ones and set redirects so existing rankings carry over.'],
    ],
  },
  'cms-development': {
    features: [
      ['Headless CMS setup', 'Content managed in one place and shown on web, app or both.'],
      ['Custom admin areas', 'Editing screens shaped around your content, not a generic template.'],
      ['Content modelling', 'Structured content types so pages stay consistent.'],
      ['Roles and approvals', 'Writers, editors and approvers with the right permissions.'],
      ['Multilingual content', 'English, Hindi, Odia or other languages managed side by side.'],
      ['Migration from WordPress or old systems', 'Content and URLs moved without losing search traffic.'],
    ],
    tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'MongoDB'],
    work: [],
    faq: [
      ['Should we use WordPress?', 'WordPress suits many content sites. A headless or custom CMS is better when you publish to an app as well, need structured content or want a faster, more secure site.'],
      ['Will our team need training?', 'We keep the editor simple and give your team a short walkthrough and written guide.'],
      ['Can the CMS feed our mobile app too?', 'Yes. A headless CMS can serve the same content to your website and your mobile app.'],
    ],
  },

  // ---------- DevOps and cloud ----------
  'cloud-consulting': {
    features: [
      ['Cloud architecture', 'A design that fits your product, team and budget.'],
      ['Provider choice', 'AWS, Azure or Google Cloud compared for your needs.'],
      ['Security baseline', 'Accounts, roles, encryption and backups set up properly from the start.'],
      ['Migration planning', 'A staged move with rehearsals and a rollback plan.'],
      ['Environments', 'Separate development, staging and production environments.'],
      ['Handover', 'Documentation and a walkthrough so your team can run it.'],
    ],
    tech: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
    work: ['flash'],
    faq: [
      ['Which cloud is right for a startup in India?', 'All three major clouds have India regions. The right one depends on your team skills, the services you need and the credits available to you. Our guide comparing AWS, Azure and Google Cloud covers this in detail.'],
      ['Can you reduce what we spend on the cloud?', 'Often, yes. We review usage, remove waste and right-size services, and our cloud cost optimisation service focuses on exactly that.'],
      ['Do we need DevOps engineers in-house?', 'Not always. Many teams run well with a solid setup, automation and occasional support. We help you decide.'],
    ],
  },
  'ci-cd-implementation': {
    features: [
      ['Automated builds', 'Every change built and checked the same way.'],
      ['Automated tests in the pipeline', 'Problems caught before they reach users.'],
      ['Staged deployments', 'Changes move through staging before production.'],
      ['One-click rollbacks', 'A quick way back if a release misbehaves.'],
      ['Mobile app pipelines', 'Android and iOS builds and store uploads automated.'],
      ['Secrets management', 'Keys and passwords kept out of code.'],
    ],
    tech: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Node.js'],
    work: [],
    faq: [
      ['How long does it take to set up CI/CD?', 'A basic pipeline for one application can be running within days. Larger systems with many services take longer.'],
      ['Can CI/CD work for our mobile apps too?', 'Yes. We automate Android and iOS builds, testing and uploads to the stores.'],
      ['Will it slow our developers down?', 'No. A good pipeline removes manual steps, so developers release more often with fewer surprises.'],
    ],
  },
  'kubernetes-implementation': {
    features: [
      ['Cluster setup', 'Managed Kubernetes on your cloud with sensible defaults.'],
      ['Containerising your apps', 'Applications packaged with Docker so they run the same everywhere.'],
      ['Autoscaling', 'Capacity that grows with traffic and shrinks when it is quiet.'],
      ['Monitoring and alerts', 'Visibility into health, errors and performance.'],
      ['Secure networking', 'Access controls and secrets handled properly.'],
      ['Runbooks and handover', 'Clear instructions your team can follow.'],
    ],
    tech: ['Kubernetes', 'Docker', 'AWS', 'Azure', 'PostgreSQL', 'Redis'],
    work: [],
    faq: [
      ['Do we actually need Kubernetes?', 'Not always. For many products a simpler setup is cheaper and easier. We recommend Kubernetes when you run several services, need autoscaling or want portability between clouds.'],
      ['Can you move our existing apps onto Kubernetes?', 'Yes. We containerise applications, move them in stages and test each step.'],
      ['Who looks after the cluster afterwards?', 'Your team, with our documentation, or us under a support plan.'],
    ],
  },
  'serverless-architecture': {
    features: [
      ['Serverless APIs', 'Back ends that run only when called, so you pay for actual use.'],
      ['Event-driven processing', 'Jobs triggered by uploads, messages or schedules.'],
      ['Managed databases', 'Databases that scale without servers to look after.'],
      ['File and media processing', 'Image, document and video handling on demand.'],
      ['Monitoring and cost alerts', 'Visibility so usage never surprises you.'],
      ['Security by default', 'Least-privilege access for every function.'],
    ],
    tech: ['AWS', 'Azure', 'Node.js', 'Python', 'PostgreSQL'],
    work: [],
    faq: [
      ['When is serverless a good fit?', 'Serverless suits spiky or unpredictable traffic, background jobs and products that want low running costs while usage is small.'],
      ['Is serverless slower?', 'There can be a short delay when a function starts after being idle. We design around it for user-facing features.'],
      ['Can we mix serverless with our existing servers?', 'Yes. Many systems use serverless for some jobs and regular servers for others.'],
    ],
  },
  'cloud-cost-optimisation': {
    features: [
      ['Cost review', 'Where the money goes, service by service.'],
      ['Right-sizing', 'Servers and databases matched to real usage.'],
      ['Removing waste', 'Idle resources, old snapshots and forgotten environments cleaned up.'],
      ['Reserved and savings plans', 'Commitments used where usage is steady.'],
      ['Budgets and alerts', 'Warnings before spending runs over.'],
      ['Monthly reporting', 'A simple view of cost trends for founders and finance.'],
    ],
    tech: ['AWS', 'Azure', 'Kubernetes', 'Docker'],
    work: [],
    faq: [
      ['How much can we save?', 'It depends on how your cloud is set up today. We give you a written list of savings with an estimate for each before anything changes.'],
      ['Will savings affect performance?', 'We size for your real peaks and test changes, so performance stays where you need it.'],
      ['Do you need full access to our cloud account?', 'We start with read-only access for the review and only request change permissions for the work you approve.'],
    ],
  },
  'infrastructure-monitoring': {
    features: [
      ['Uptime monitoring', 'Alerts when your site, app or API stops responding.'],
      ['Error tracking', 'Crashes and errors grouped and sent to the right person.'],
      ['Performance dashboards', 'Response times, load and database health in one place.'],
      ['Log management', 'Searchable logs for faster troubleshooting.'],
      ['Alert routing', 'Alerts to email, Slack, Google Chat or phone, by severity.'],
      ['Incident runbooks', 'Clear steps for the most likely problems.'],
    ],
    tech: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Node.js'],
    work: [],
    faq: [
      ['What should we monitor first?', 'Start with uptime, errors and response time for the features customers use most, then add deeper checks.'],
      ['Can alerts go to Google Chat or Slack?', 'Yes. We route alerts to the channels your team already uses, with severity levels so nobody ignores them.'],
      ['Do you offer ongoing monitoring support?', 'Yes, under a support plan, or we hand over runbooks so your team can respond.'],
    ],
  },

  // ---------- AI ----------
  'ai-development': {
    features: [
      ['AI assistants on your data', 'Answers grounded in your documents, policies and records.'],
      ['Document processing', 'Invoices, forms and contracts read and filed automatically.'],
      ['AI agents for workflows', 'Multi-step tasks completed with approvals where needed.'],
      ['Classification and routing', 'Tickets, leads and requests sorted and sent to the right team.'],
      ['Evaluation and guardrails', 'Tests and limits that keep answers accurate and safe.'],
      ['Integration with your systems', 'AI connected to your CRM, ERP, helpdesk or app.'],
    ],
    tech: ['OpenAI', 'Python', 'Node.js', 'PostgreSQL', 'React', 'AWS'],
    work: ['skribe'],
    faq: [
      ['Is our data safe when we use AI?', 'We use providers and settings that do not train on your data, keep sensitive data out of prompts where possible, and control who can see what.'],
      ['How do you stop AI from making things up?', 'We ground answers in your own sources, show citations, add refusal rules and test against real questions before launch. Our guide on reducing AI hallucinations explains the approach.'],
      ['Should we start with a pilot?', 'Yes. A focused pilot on one workflow with a clear success measure shows whether AI is worth scaling before you invest more.'],
    ],
  },
  'ai-consulting': {
    features: [
      ['Use-case discovery', 'Where AI can save time or money in your business, and where it cannot.'],
      ['Data readiness review', 'Whether your data is good enough, and what to fix first.'],
      ['Build, buy or both', 'Ready-made AI tools compared with custom builds.'],
      ['Pilot design', 'A small, measurable first project.'],
      ['Risk and policy', 'Privacy, accuracy and approval rules for using AI safely.'],
      ['Team enablement', 'Practical guidance so your team can use AI well.'],
    ],
    tech: ['OpenAI', 'Python', 'Node.js', 'PostgreSQL'],
    work: [],
    faq: [
      ['We do not know where to use AI. Can you help?', 'Yes. We look at your workflows, data and goals and give you a short list of AI use cases ranked by value and risk.'],
      ['Is AI consulting useful for small businesses?', 'Yes. Small businesses often get quick wins from AI in support, sales follow-up and document handling.'],
      ['Do you work with OpenAI?', 'Yes. Creuto is an OpenAI Select Partner, and we also choose other models when they suit the task better.'],
    ],
  },
  'ai-powered-mobile-app-development': {
    features: [
      ['In-app AI assistant', 'Help and answers inside your app, grounded in your content.'],
      ['Smart search', 'Search that understands what users mean, not just the words they type.'],
      ['Personalised recommendations', 'Suggestions based on behaviour and preferences.'],
      ['Image and document scanning', 'Camera-based capture with AI reading the details.'],
      ['Voice input', 'Speak instead of type, including Indian languages.'],
      ['Privacy controls', 'Clear consent and control over what data AI uses.'],
    ],
    tech: ['OpenAI', 'Flutter', 'React Native', 'Kotlin', 'Swift', 'Python', 'Node.js'],
    work: ['mml'],
    faq: [
      ['Can AI be added to our existing app?', 'Yes. We add AI features to existing Android, iOS, Flutter or React Native apps without rebuilding them. Our guide on adding AI to an existing product explains how.'],
      ['Will AI make the app slower?', 'We run heavy AI work on the server, cache results and show progress, so the app stays responsive.'],
      ['Does AI in an app cost a lot to run?', 'It depends on usage and the model. We design features to keep running costs predictable and measure them during the pilot.'],
    ],
  },
  'machine-learning-analytics': {
    features: [
      ['Demand forecasting', 'Predictions for sales, stock or staffing from your history.'],
      ['Customer segmentation', 'Groups of customers who behave differently.'],
      ['Churn and risk signals', 'Early warnings about customers or orders at risk.'],
      ['Anomaly detection', 'Unusual transactions or readings flagged automatically.'],
      ['Dashboards with predictions', 'Forecasts shown next to the numbers you already track.'],
      ['Data pipelines', 'Clean, regular data feeding the models.'],
    ],
    tech: ['Python', 'PostgreSQL', 'AWS', 'Azure', 'React'],
    work: ['erp'],
    faq: [
      ['How much data do we need for machine learning?', 'It depends on the problem. Some forecasts work with a year or two of clean history; others need more. We check your data before recommending a model.'],
      ['Machine learning or generative AI?', 'Machine learning predicts and classifies from structured data, such as sales or sensor readings. Generative AI works with language and content. Many businesses need one, not both.'],
      ['Can predictions appear in our ERP or dashboard?', 'Yes. We feed forecasts and alerts into the systems your team already uses.'],
    ],
  },
  'generative-ai': {
    features: [
      ['Drafting and content tools', 'First drafts of emails, descriptions and reports in your tone.'],
      ['Summarisation', 'Long documents, calls and threads turned into short summaries.'],
      ['Knowledge assistants (RAG)', 'Answers from your own documents with sources shown.'],
      ['Translation and Indian languages', 'Content in Hindi, Odia and other languages.'],
      ['Guardrails and review', 'Limits, filters and human approval where it matters.'],
      ['Quality evaluation', 'Test sets that measure accuracy before and after launch.'],
    ],
    tech: ['OpenAI', 'Python', 'Node.js', 'PostgreSQL', 'React'],
    work: [],
    faq: [
      ['What is the difference between generative AI and a chatbot?', 'A chatbot is one use of generative AI. Generative AI can also draft, summarise, translate and extract information inside your existing tools.'],
      ['Can generative AI use our private documents?', 'Yes, through retrieval: the AI looks up the relevant parts of your documents for each question instead of being trained on them.'],
      ['How do we measure whether it works?', 'We build a test set of real questions and expected answers, and track accuracy before launch and after every change.'],
    ],
  },
  'chatgpt-solutions': {
    features: [
      ['Custom ChatGPT-style assistant', 'A branded assistant that knows your business.'],
      ['Website and WhatsApp chatbots', 'Answers for customers on your site and on WhatsApp.'],
      ['Internal helpdesk assistant', 'Staff questions about policies and processes answered instantly.'],
      ['Lead qualification', 'Visitors asked the right questions and handed to sales.'],
      ['Integration with your tools', 'Connected to your CRM, helpdesk, documents or database.'],
      ['Usage and accuracy reports', 'What people ask and how well the assistant answers.'],
    ],
    tech: ['OpenAI', 'Node.js', 'Python', 'PostgreSQL', 'React'],
    work: ['skribe'],
    faq: [
      ['Can you build a chatbot that answers from our website and documents?', 'Yes. We connect the assistant to your website, PDFs and knowledge base, and it shows where each answer came from.'],
      ['Can the chatbot work on WhatsApp?', 'Yes, through the WhatsApp Business API, with a handover to a person when needed.'],
      ['Will the chatbot give wrong answers?', 'We reduce this with grounding in your sources, clear refusal rules and testing, and we route uncertain questions to your team.'],
    ],
  },

  // ---------- Startup and MVP ----------
  'mvp-development': {
    features: [
      ['Scope workshop', 'The smallest version that proves your idea, agreed in writing.'],
      ['Clickable prototype', 'Something you can show users and investors before building.'],
      ['Working app or web app', 'A real product, not a throwaway demo.'],
      ['Admin panel', 'The tools you need to run the product day to day.'],
      ['Analytics from day one', 'See what users do so the next version is based on facts.'],
      ['Launch support', 'Store submission, hosting and a plan for the first weeks.'],
    ],
    tech: ['Flutter', 'React Native', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    work: ['mml', 'flash', 'skyone'],
    faq: [
      ['How long does an MVP take?', 'A focused first working version typically takes about 4 weeks, then we improve it in milestones based on what users do.'],
      ['Can I raise funding with an MVP?', 'An MVP with real users and early numbers is much stronger in investor meetings than slides alone. Our investor-ready demo service helps you prepare.'],
      ['What if my idea changes after launch?', 'That is expected. We build the MVP so it can change direction without starting again.'],
    ],
  },
  'rapid-prototyping': {
    features: [
      ['Clickable prototypes', 'Realistic screens you can tap through on a phone.'],
      ['User testing', 'Sessions with real users to see what works and what confuses.'],
      ['Design system starter', 'Colours, type and components ready for the real build.'],
      ['Feasibility checks', 'Quick technical spikes for the riskiest features.'],
      ['Investor and stakeholder demos', 'A prototype that tells your product story clearly.'],
      ['Build-ready handover', 'Screens and notes developers can build from.'],
    ],
    tech: ['React', 'Flutter', 'Next.js'],
    work: ['skyone'],
    faq: [
      ['How long does a prototype take?', 'Most clickable prototypes take one to two weeks, depending on the number of screens and flows.'],
      ['Is a prototype the same as an MVP?', 'No. A prototype looks and feels real but is not a working product. It helps you test the idea quickly before building the MVP.'],
      ['Can the prototype be turned into the real app?', 'The designs carry straight into the build. The prototype itself is replaced by real code.'],
    ],
  },
  'technical-architecture': {
    features: [
      ['Architecture plan', 'How the system fits together, written so non-engineers can follow.'],
      ['Technology choices', 'Stack, cloud and tools chosen for your team and roadmap.'],
      ['Data model', 'The core data structure that everything else depends on.'],
      ['Security and scale plan', 'How the system handles growth and protects data.'],
      ['Integration map', 'Which outside systems you depend on and how they connect.'],
      ['Phased roadmap', 'What to build first, so early decisions do not block later ones.'],
    ],
    tech: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure'],
    work: ['erp', 'flash'],
    faq: [
      ['Do non-technical founders need an architecture plan?', 'Yes, especially if you plan to hire or outsource the build. A clear plan protects you from expensive rewrites and vendor lock-in.'],
      ['Can you review an architecture another team proposed?', 'Yes. We give you a written review of risks, costs and alternatives.'],
      ['How detailed is the architecture document?', 'Detailed enough for a team to build from, and clear enough for you to explain to investors.'],
    ],
  },
  'investor-ready-demos': {
    features: [
      ['Demo-ready product', 'A stable, polished version for investor meetings.'],
      ['Demo script and data', 'Realistic sample data and a clear walkthrough.'],
      ['Product story', 'Screens that show the problem, solution and why now.'],
      ['Technical due diligence prep', 'Answers to the questions technical investors ask.'],
      ['Roadmap slides input', 'What is built, what is next and how long it takes.'],
      ['Metrics setup', 'Analytics so you can show real usage.'],
    ],
    tech: ['React', 'Next.js', 'Flutter', 'Node.js', 'PostgreSQL'],
    work: ['skyone', 'flash'],
    faq: [
      ['Is a demo enough to raise funding?', 'A demo helps, but investors also look at the team, market and traction. A working product with early users is the strongest signal.'],
      ['Can you help with technical due diligence?', 'Yes. We prepare architecture, security and code-quality notes and can join investor calls to answer technical questions.'],
      ['How fast can you prepare a demo?', 'It depends on what exists already. If there is a working product, we can usually polish it for demos within a few weeks.'],
    ],
  },
  'post-launch-iteration': {
    features: [
      ['Analytics review', 'What users do, where they drop off and what to fix first.'],
      ['Feature roadmap', 'The next features ranked by impact and effort.'],
      ['Regular releases', 'Improvements shipped in planned milestones.'],
      ['Bug fixing and stability', 'Crashes and errors fixed before new features.'],
      ['Performance and cost tuning', 'Faster screens and lower running costs as usage grows.'],
      ['User feedback loops', 'Feedback from users and support turned into changes.'],
    ],
    tech: ['React', 'Flutter', 'React Native', 'Node.js', 'PostgreSQL', 'AWS'],
    work: ['mml', 'flash'],
    faq: [
      ['Can you take over an app another team launched?', 'Yes. We review the code and infrastructure first, fix the biggest risks and then continue development.'],
      ['How often do you release updates?', 'In planned milestones agreed with you. The rhythm depends on your product and users.'],
      ['Do you offer monthly support?', 'Yes. We agree a support plan after launch that covers fixes, updates and new work.'],
    ],
  },
};
