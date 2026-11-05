/**
 * Major world cities we build for (build-world-cities.js writes /software-development-<slug>).
 * We have no offices in these cities: pages say we work with companies there remotely, with calls planned
 * around their day. No client names, results or prices; compliance and payment notes come from the country
 * data in countries.js. Copy rules: no em dashes, no "best", "world-class", "guarantee".
 */
module.exports = [
  {
    slug: 'new-york', name: 'New York', country: 'united-states', code: 'us', tz: 'America/New_York', tzLabel: 'Eastern Time',
    industries: [['Fintech and financial services', '/industries/fintech'], ['Media and entertainment', '/industries/media-entertainment'], ['Retail and ecommerce', '/industries/ecommerce'], ['Healthcare', '/industries/healthcare'], ['Real estate', '/industries/real-estate'], ['SaaS', '/industries/saas']],
    intro: 'New York companies move fast and expect polished products. We build mobile apps, web platforms and AI products for startups and enterprises in New York, with a founder who leads every project and calls in your morning.',
    angle: 'New York buyers often work with tight launch dates, strict security reviews and investors watching progress. We plan around that: a written plan within 24 hours of the first call, a PRD before code, working software early and documentation your security team can review.',
    hours: 'India is 9.5 to 10.5 hours ahead of New York, depending on daylight saving. Our evening meets your morning, so calls and demos happen between about 8 am and 11 am Eastern, and work continues while you sleep. Feedback you send in the afternoon is usually acted on by your next morning.',
    faq: [
      ['Do you have an office in New York?', 'No. We work with New York companies remotely from India, with calls in your morning and a founder who stays involved from the first call to launch.'],
      ['Can we pay in US dollars and sign a US-style contract?', 'Yes. We invoice in US dollars, work under a written agreement with milestones, and sign an NDA before discovery.'],
      ['Can you build fintech or healthcare products for the US market?', 'Yes. We design for the requirements that apply, such as SOC 2 readiness, HIPAA safeguards for health data and state privacy laws, and support your compliance review.'],
    ],
  },
  {
    slug: 'san-francisco', name: 'San Francisco', country: 'united-states', code: 'us', tz: 'America/Los_Angeles', tzLabel: 'Pacific Time',
    industries: [['SaaS', '/industries/saas'], ['AI products', '/services/ai-product-development'], ['Fintech', '/industries/fintech'], ['Healthcare', '/industries/healthcare'], ['On-demand services', '/industries/on-demand'], ['Social networking', '/industries/social-networking']],
    intro: 'San Francisco and Bay Area startups need to ship quickly and keep burn under control. We build MVPs, SaaS products and AI features for San Francisco founders, led directly by our founder and built by an in-house team in India.',
    angle: 'Bay Area founders usually come to us to extend runway: a senior, founder-led team that turns a PRD into a working first version in about 4 weeks, then keeps shipping in milestones while the core team focuses on customers and fundraising.',
    hours: 'India is 12.5 to 13.5 hours ahead of San Francisco. We agree a fixed daily slot, usually your late afternoon or early evening, which is our early morning. Because our days are opposite, work progresses overnight and you wake up to updates.',
    faq: [
      ['How do you handle the time difference with the West Coast?', 'We agree one fixed overlap slot each day, usually your late afternoon, and share written updates so decisions never wait a full day.'],
      ['Can you build AI products with OpenAI models?', 'Yes. Creuto is an OpenAI Select Partner, and we build RAG assistants, AI agents and chatbots, choosing other models when they suit a task better.'],
      ['Can you work with our in-house engineers?', 'Yes. We can work in your repositories and review process, or own complete modules and hand them over with documentation.'],
    ],
  },
  {
    slug: 'los-angeles', name: 'Los Angeles', country: 'united-states', code: 'us', tz: 'America/Los_Angeles', tzLabel: 'Pacific Time',
    industries: [['Media and entertainment', '/industries/media-entertainment'], ['Retail and ecommerce', '/industries/ecommerce'], ['Real estate', '/industries/real-estate'], ['Fitness and wellness', '/industries/fitness-wellness'], ['Events', '/industries/events'], ['Healthcare', '/industries/healthcare']],
    intro: 'Los Angeles brands, creators and startups need apps and platforms that look great and handle real traffic. We design and build mobile apps, ecommerce platforms and booking products for Los Angeles companies, with the founder leading every project.',
    angle: 'Consumer products in Los Angeles live or die on design and speed. We prototype first so you can test with real users, build with Flutter or React Native for both app stores, and set up analytics from day one so the next release is based on what people actually do.',
    hours: 'India is 12.5 to 13.5 hours ahead of Los Angeles. We meet at a fixed daily time, usually your late afternoon, and send written progress updates, so work moves forward overnight.',
    faq: [
      ['Do you build consumer apps for both iPhone and Android?', 'Yes. We build native or cross-platform apps with Flutter and React Native and handle App Store and Google Play submission.'],
      ['Can you build an ecommerce or booking platform?', 'Yes. We have built event and vendor booking, quick commerce and on-demand beauty booking platforms, with payments, vendor tools and admin panels.'],
      ['Do you sign an NDA?', 'Yes. We sign an NDA before discovery, so you can share your idea and plans openly.'],
    ],
  },
  {
    slug: 'chicago', name: 'Chicago', country: 'united-states', code: 'us', tz: 'America/Chicago', tzLabel: 'Central Time',
    industries: [['Logistics and supply chain', '/industries/logistics'], ['Manufacturing', '/industries/manufacturing'], ['Fintech and financial services', '/industries/fintech'], ['Healthcare', '/industries/healthcare'], ['Retail and ecommerce', '/industries/ecommerce'], ['SaaS', '/industries/saas']],
    intro: 'Chicago businesses in logistics, manufacturing and financial services need software that fits real operations. We build custom ERP, logistics platforms, portals and mobile apps for Chicago companies, led by our founder from the first call.',
    angle: 'Operations-heavy companies rarely want a big-bang switch. We roll out custom software one module at a time, run it alongside your current process, connect it to the systems you already use and train the people who use it every day.',
    hours: 'India is 10.5 to 11.5 hours ahead of Chicago. Calls usually happen in your early morning, our evening, and progress updates arrive before your working day starts.',
    faq: [
      ['Can you build a custom ERP or logistics system?', 'Yes. We build inventory, production, dispatch and fleet systems, and integrate them with accounting, ERP and partner APIs.'],
      ['Will the new system work with our existing tools?', 'Yes. We plan integrations in the PRD and connect to your current software through APIs rather than forcing a full replacement.'],
      ['How do you reduce risk when replacing an old system?', 'We migrate data in rehearsals, run old and new side by side where needed and switch over in stages.'],
    ],
  },
  {
    slug: 'austin', name: 'Austin', country: 'united-states', code: 'us', tz: 'America/Chicago', tzLabel: 'Central Time',
    industries: [['SaaS', '/industries/saas'], ['AI products', '/services/ai-product-development'], ['Fintech', '/industries/fintech'], ['Healthcare', '/industries/healthcare'], ['Energy', '/industries/energy'], ['Real estate', '/industries/real-estate']],
    intro: 'Austin startups and growing software companies need product engineering that keeps pace with their roadmap. We build SaaS products, MVPs and AI features for Austin teams, with a founder who leads every engagement.',
    angle: 'For Austin startups we often act as the product engineering team behind the founders: scoping the smallest valuable version, building it in about 4 weeks and continuing in milestones, so the company can grow without a large hiring round.',
    hours: 'India is 10.5 to 11.5 hours ahead of Austin. We meet in your early morning, our evening, and you receive written updates before your day starts.',
    faq: [
      ['Can you build our MVP and keep developing it after launch?', 'Yes. We build the first version, then continue in planned milestones based on what users do, or hand over to your team with documentation.'],
      ['Do you build multi-tenant SaaS?', 'Yes. We build SaaS products with roles, billing, multi-tenant data separation and admin tools.'],
      ['Who owns the code?', 'Your code lives in your own repositories and cloud accounts from the first sprint, and ownership of the custom work passes to you as each milestone is paid.'],
    ],
  },
  {
    slug: 'london', name: 'London', country: 'united-kingdom', code: 'gb', tz: 'Europe/London', tzLabel: 'UK time',
    industries: [['Fintech and financial services', '/industries/fintech'], ['Retail and ecommerce', '/industries/ecommerce'], ['Healthcare', '/industries/healthcare'], ['Media and entertainment', '/industries/media-entertainment'], ['Real estate', '/industries/real-estate'], ['SaaS', '/industries/saas']],
    intro: 'London companies need software that is secure, well documented and ready for scrutiny. We build mobile apps, web platforms and AI products for London startups and enterprises, with UK working hours covered every day.',
    angle: 'London has one of the largest fintech and B2B software markets in the world, and buyers expect UK GDPR compliance, accessibility and clear documentation. We design for those from the first sprint and support your security and compliance reviews.',
    hours: 'India is 4.5 to 5.5 hours ahead of London, so our afternoon overlaps with your morning. Most of your working day is shared with ours, which makes daily calls and quick decisions easy.',
    faq: [
      ['Do you work during UK hours?', 'Yes. Our afternoon overlaps with the London morning every working day, so calls, reviews and quick questions fit easily.'],
      ['Can you build to UK GDPR requirements?', 'Yes. We design consent, data access, retention and deletion into the product and support your data protection review.'],
      ['Can we pay in pounds?', 'Yes. We can invoice in pounds sterling under a written agreement with milestones.'],
    ],
  },
  {
    slug: 'toronto', name: 'Toronto', country: 'canada', code: 'ca', tz: 'America/Toronto', tzLabel: 'Eastern Time',
    industries: [['Fintech and financial services', '/industries/fintech'], ['AI products', '/services/ai-product-development'], ['Healthcare', '/industries/healthcare'], ['Real estate', '/industries/real-estate'], ['Retail and ecommerce', '/industries/ecommerce'], ['SaaS', '/industries/saas']],
    intro: 'Toronto startups and enterprises need product teams that understand privacy and scale. We build mobile apps, SaaS platforms and AI products for Toronto companies, led by our founder with calls in your morning.',
    angle: 'Canadian buyers expect privacy built in, under PIPEDA and provincial rules, and products that work in English and French where needed. We plan for both, and keep you involved through a written plan, a PRD and working software at every milestone.',
    hours: 'India is 9.5 to 10.5 hours ahead of Toronto. Our evening meets your morning for calls and demos, and work continues overnight so updates are waiting when you start the day.',
    faq: [
      ['Can you build products that meet Canadian privacy rules?', 'Yes. We design for PIPEDA and provincial privacy requirements with consent, access controls and data handling agreed in the PRD.'],
      ['Can the app support English and French?', 'Yes. We build multilingual interfaces from the start, so adding French content does not require a rebuild.'],
      ['Can we pay in Canadian dollars?', 'Yes. We can invoice in Canadian dollars under a written agreement with milestones.'],
    ],
  },
  {
    slug: 'sydney', name: 'Sydney', country: 'australia', code: 'au', tz: 'Australia/Sydney', tzLabel: 'Sydney time',
    industries: [['Fintech and financial services', '/industries/fintech'], ['Retail and ecommerce', '/industries/ecommerce'], ['Healthcare', '/industries/healthcare'], ['Real estate', '/industries/real-estate'], ['Education', '/industries/education'], ['SaaS', '/industries/saas']],
    intro: 'Sydney businesses need reliable apps and platforms without the cost of a large local agency. We build mobile apps, web platforms and AI products for Sydney startups and companies, with the founder leading every project.',
    angle: 'Australian buyers expect privacy under the Privacy Act, accessible design and products that work across iPhone and Android. We plan for those in the PRD and show working software early, so you see progress rather than reports.',
    hours: 'Sydney is 4.5 to 5.5 hours ahead of India, depending on daylight saving. Our morning overlaps with your afternoon, giving several shared working hours every day for calls and reviews.',
    faq: [
      ['How many working hours overlap with Sydney?', 'Several hours each working day: our morning overlaps with your afternoon, which is enough for calls, reviews and quick decisions.'],
      ['Can you build to the Australian Privacy Act?', 'Yes. We design consent, data access and secure storage into the product and support your privacy review.'],
      ['Can we pay in Australian dollars?', 'Yes. We can invoice in Australian dollars under a written agreement with milestones.'],
    ],
  },
  {
    slug: 'melbourne', name: 'Melbourne', country: 'australia', code: 'au', tz: 'Australia/Melbourne', tzLabel: 'Melbourne time',
    industries: [['Education', '/industries/education'], ['Healthcare', '/industries/healthcare'], ['Retail and ecommerce', '/industries/ecommerce'], ['Logistics and supply chain', '/industries/logistics'], ['Events', '/industries/events'], ['SaaS', '/industries/saas']],
    intro: 'Melbourne companies in education, healthcare, retail and logistics need software that fits how they work. We build mobile apps, custom platforms and AI products for Melbourne businesses, led by our founder from the first call.',
    angle: 'Many Melbourne teams come to us with a process that has outgrown spreadsheets or an off-the-shelf tool. We map the workflow with the people who use it, build in stages and keep the system easy to extend as the business grows.',
    hours: 'Melbourne is 4.5 to 5.5 hours ahead of India. Our morning overlaps with your afternoon each working day, which keeps calls and decisions on the same day.',
    faq: [
      ['Do you build education or healthcare platforms?', 'Yes. We build learning platforms, booking and patient tools, and internal systems, designed for the privacy rules that apply.'],
      ['Can you replace our spreadsheets with a custom system?', 'Yes. We start with the most painful process, build it as a first module and add others in stages.'],
      ['How do we start?', 'Book a free 30-minute call. If we are a good fit, you receive a written proposal within 24 hours.'],
    ],
  },
  {
    slug: 'dubai', name: 'Dubai', country: 'uae', code: 'ae', tz: 'Asia/Dubai', tzLabel: 'Gulf time',
    industries: [['Real estate', '/industries/real-estate'], ['Logistics and supply chain', '/industries/logistics'], ['Travel and hospitality', '/industries/travel-hospitality'], ['Retail and ecommerce', '/industries/ecommerce'], ['Fintech', '/industries/fintech'], ['On-demand services', '/industries/on-demand']],
    intro: 'Dubai businesses need apps and platforms that work in English and Arabic and scale with fast growth. We build mobile apps, booking and marketplace platforms and AI products for Dubai companies, with almost the same working day as yours.',
    angle: 'Dubai buyers often need bilingual interfaces, right-to-left Arabic layouts, local payment options and quick launches. We plan these in the PRD and build with frameworks that handle both languages cleanly on iPhone and Android.',
    hours: 'India is only 1.5 hours ahead of Dubai, so almost the whole working day is shared. Calls, reviews and quick questions happen in real time.',
    faq: [
      ['Can you build apps in Arabic and English?', 'Yes. We build bilingual apps with proper right-to-left Arabic layouts and content managed for both languages.'],
      ['Do you work during UAE business hours?', 'Yes. With only 1.5 hours between us, our working days overlap almost completely.'],
      ['Can you build real estate or booking platforms?', 'Yes. We build listing, booking and vendor platforms with payments, admin tools and mobile apps.'],
    ],
  },
];
