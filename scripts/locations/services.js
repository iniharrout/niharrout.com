/**
 * Per-service content shared by every city page.
 * `{city}` is replaced with the city name at build time.
 * Prices and timelines mirror the ranges already published on the site
 * (project-costs, b2b-software and the Bhubaneswar service pages).
 */

module.exports = {
  mobile: {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    nameLc: 'mobile app development',
    label: 'mobile app',
    short: 'Mobile Apps',
    h1: 'Mobile App Development Company in {city}',
    titleLead: 'Mobile App Development Company in {city}',
    heroSub: 'iOS, Android, Flutter and React Native apps for {city} businesses, built by a product-led in-house team. Fixed-scope PRD, fortnightly demos, and 100% code ownership.',
    formType: 'Mobile App',
    budgets: ['Under ₹5L', '₹5L – ₹12L', '₹12L – ₹25L', 'Above ₹25L', 'Still evaluating'],
    bhubaneswarPage: '/mobile-app-development-bhubaneswar.html',
    servicesHeading: 'Mobile app development services for {city}',
    servicesSub: 'Every layer of a shipped app, from PRD and design to store approval and post-launch support.',
    services: [
      ['Cross-platform apps (Flutter & React Native)', 'One codebase for iOS and Android, usually the fastest and most economical route.'],
      ['iOS app development (Swift & SwiftUI)', 'Native iPhone and iPad apps with offline caching and deep OS integration.'],
      ['Android app development (Kotlin & Compose)', 'Native Android apps tuned for varied devices and network conditions.'],
      ['Backend, APIs & cloud architecture', 'REST and GraphQL back ends, real-time sockets, notifications and admin dashboards.'],
      ['UI/UX design & prototypes', 'Figma design systems and tested clickable prototypes before engineering starts.'],
      ['Progressive web apps & admin panels', 'Web companions and operations dashboards sharing the same APIs.'],
      ['App Store & Google Play launch', 'Listing, compliance, review handling and staged rollouts with CI/CD.'],
      ['Maintenance, monitoring & scaling', 'Crash monitoring, OS updates, security patches and new releases.']
    ],
    industries: ['On-demand services', 'FinTech & payments', 'Healthcare & clinics', 'E-commerce & D2C', 'Logistics & fleet', 'Education & edtech', 'Travel & hospitality', 'Real estate', 'Manufacturing', 'Retail & distribution', 'Food & restaurants', 'Events & ticketing', 'Agri-tech', 'Media & community', 'Field service', 'Government-linked services'],
    complianceHeading: 'Compliance and security we design for in every app',
    compliance: [
      ['India data protection (DPDP Act, 2023)', 'Consent, data-principal rights and breach-notification workflows built in.'],
      ['Payments & RBI-aligned flows', 'UPI, cards and wallets via PCI-DSS-compliant gateways, so card data never touches your servers.'],
      ['Store policies & privacy labels', 'Apple and Google Play guidelines met up front to avoid review rejections.'],
      ['Application security (OWASP MASVS)', 'Encrypted storage and transport, secure authentication and pre-release security testing.'],
      ['Sector rules when they apply', 'ABDM for health, KYC for fintech and GST for commerce, scoped in the PRD.']
    ],
    stack: [
      ['Cross-platform', 'Flutter, Dart, React Native, TypeScript, Expo'],
      ['Native', 'Swift, SwiftUI, Kotlin, Jetpack Compose'],
      ['Back end', 'Node.js, Python (FastAPI), NestJS, GraphQL'],
      ['Data', 'PostgreSQL, MongoDB, Redis, Firebase'],
      ['Cloud', 'AWS, Google Cloud, Docker, serverless'],
      ['Payments', 'Razorpay, Cashfree, Stripe, UPI intents'],
      ['Messaging', 'FCM, APNs, WhatsApp Business API, WebSockets'],
      ['Quality & release', 'Fastlane, GitHub Actions, TestFlight, Crashlytics']
    ],
    process: [
      ['Discovery & PRD', 'Goals, users and constraints become a signed-off requirements document.'],
      ['UX & prototype', 'Wireframes and a clickable prototype tested with real users.'],
      ['Sprint build', 'Two-week sprints with a build on your phone every cycle.'],
      ['QA & security', 'Device-matrix testing, performance profiling and security checks.'],
      ['Store launch', 'Submission, review handling and staged rollout.'],
      ['Support & growth', 'Analytics, crash monitoring and a post-launch roadmap.']
    ],
    tiers: [
      ['Focused MVP', '₹1.5L – ₹5L', '$2k – $6k', '4 – 8 weeks', 'One core workflow, one or two roles, cross-platform, basic admin panel.'],
      ['Full product', '₹5L – ₹12L', '$6k – $15k', '8 – 14 weeks', 'Multiple roles, payments, integrations and a full admin dashboard.'],
      ['Multi-role platform', '₹12L – ₹25L+', '$15k – $30k+', '3 – 6 months', 'Marketplace or delivery apps with several connected apps.']
    ],
    cases: ['make-my-look', 'flashnow', 'sky1-event-booking'],
    faqs: [
      ['How much does it cost to build a mobile app in {city}?', 'A focused MVP typically costs ₹1.5 to ₹5 lakh, a full product ₹5 to ₹12 lakh, and multi-role platforms such as marketplaces or delivery apps ₹12 lakh and above. The number depends on roles, integrations and the admin back end. You receive a fixed-scope estimate after a discovery workshop, with payment tied to milestones.'],
      ['How long does it take to launch an app?', 'A focused MVP takes 4 to 8 weeks from signed PRD to store submission. Full products take 8 to 14 weeks, and multi-role platforms 3 to 6 months. Store review adds a few days, which we plan for.'],
      ['Should we choose native or cross-platform?', 'For most startups and mid-market products, Flutter or React Native is the better choice: one team, one codebase and faster releases at lower cost. We recommend native when you need deep hardware access, heavy graphics or platform-specific features, and explain the trade-off in writing before you commit.'],
      ['Do we own the source code and IP?', 'Yes, fully. You get repository access from the first sprint, we sign an NDA before discovery, and there is no lock-in to Creuto for hosting or maintenance.'],
      ['Do you build apps that work offline?', 'Yes. Offline-first design stores actions on the device and syncs them safely when the connection returns, which suits field teams, deliveries and patchy networks.']
    ]
  },

  ai: {
    slug: 'ai-product-development',
    name: 'AI Product Development',
    nameLc: 'AI product development',
    label: 'AI',
    short: 'AI Products',
    h1: 'AI Product Development Company in {city}',
    titleLead: 'AI Product Development Company in {city}',
    heroSub: 'Practical AI for {city} businesses: LLM assistants, document automation and agentic workflows that ship to production with measurable results, not demos.',
    formType: 'AI Product',
    budgets: ['Under ₹5L', '₹5L – ₹10L', '₹10L – ₹25L', 'Above ₹25L', 'Still evaluating'],
    bhubaneswarPage: '/ai-product-development-bhubaneswar.html',
    servicesHeading: 'AI development services for {city}',
    servicesSub: 'From a two-week feasibility check to production AI features with evaluation, guardrails and cost control.',
    services: [
      ['LLM assistants & copilots', 'Assistants grounded in your documents and data, with citations and guardrails.'],
      ['Retrieval-augmented generation (RAG)', 'Permission-aware search and Q&A over contracts, manuals and tickets.'],
      ['AI agents & workflow automation', 'Agents that act in your CRM, ERP or helpdesk under approval rules.'],
      ['Document intelligence (OCR & extraction)', 'Invoices, forms and handwritten records turned into validated structured data.'],
      ['Computer vision', 'Defect, safety and quality checks from photos or camera feeds.'],
      ['Predictive analytics & forecasting', 'Demand, churn and maintenance models trained on your history.'],
      ['Multilingual & voice AI', 'English, Hindi and Odia speech and text, tested on your real content.'],
      ['LLM evaluation, safety & cost control', 'Test sets, monitoring and model routing that keep accuracy up and cost down.']
    ],
    industries: ['Manufacturing', 'FinTech & BFSI', 'Healthcare & diagnostics', 'E-commerce & D2C', 'Legal & professional services', 'Education & edtech', 'Logistics', 'Retail & distribution', 'SaaS & product companies', 'Hospitality & tourism', 'Agri & food processing', 'Real estate', 'Customer support teams', 'HR & recruitment', 'Media & content', 'Energy & utilities'],
    complianceHeading: 'Responsible AI, privacy and governance',
    compliance: [
      ['India data protection (DPDP Act, 2023)', 'Lawful-purpose, consent, retention and deletion handling for personal data.'],
      ['Data residency & private deployment', 'Open-source models on your private cloud or on-premise when data cannot leave.'],
      ['Zero-retention model APIs', 'Hosted providers configured so your data is not used for training.'],
      ['LLM application security (OWASP LLM Top 10)', 'Prompt-injection defences, least-privilege tools and audit logs of every agent action.'],
      ['Human oversight for regulated work', 'AI-assisted, human-approved review for finance, health and legal outputs.']
    ],
    stack: [
      ['Models', 'Claude, GPT, Gemini, Llama, Mistral, Whisper'],
      ['Orchestration', 'LangChain, LlamaIndex, custom tool-calling agents, MCP'],
      ['Retrieval', 'pgvector, Pinecone, Qdrant, Elasticsearch'],
      ['Vision & OCR', 'PyTorch, OpenCV, YOLO, Tesseract, cloud vision APIs'],
      ['Back end', 'Python (FastAPI), Node.js, Celery, Redis'],
      ['Data', 'PostgreSQL, BigQuery, S3, dbt'],
      ['Evaluation', 'Custom eval harnesses, LangSmith, Langfuse'],
      ['Deployment', 'AWS, GCP, Docker, Kubernetes, private cloud']
    ],
    process: [
      ['Use-case discovery', 'Pick the workflow with the clearest cost and cleanest data.'],
      ['Data & feasibility check', 'Test the approach on real samples within two to three weeks.'],
      ['Pilot build', 'A working prototype evaluated against agreed accuracy and savings targets.'],
      ['Guardrails & evaluation', 'Test sets, safety rules and human-review paths before wider release.'],
      ['Production rollout', 'Integration, access control, monitoring and staff training.'],
      ['Monitor & improve', 'Drift checks, prompt and model updates, then the next workflow.']
    ],
    tiers: [
      ['Feasibility pilot', '₹5L – ₹10L', '$6k – $12k', '4 – 8 weeks', 'One workflow, real data and a clear go/no-go recommendation.'],
      ['Production AI feature or product', '₹10L – ₹25L+', '$12k – $30k+', '3 – 5 months', 'Full build with integrations, evaluation suite and monitoring.'],
      ['Private or enterprise deployment', 'Quoted after scoping', 'Quoted after scoping', 'Scoped per project', 'On-premise or private-cloud models with strict access control.']
    ],
    cases: ['skribe', 'custom-erp-manufacturing', 'make-my-look'],
    faqs: [
      ['How much does AI product development cost in {city}?', 'A feasibility pilot usually costs ₹5 to ₹10 lakh and a production build ₹10 to ₹25 lakh or more, depending on integrations, data readiness and deployment needs. We agree the success metric before the pilot so the investment is judged on results.'],
      ['How long does an AI project take?', 'A pilot takes 4 to 8 weeks. Production builds take roughly 3 to 5 months, including evaluation, guardrails and rollout.'],
      ['Do we need a lot of data to start?', 'Not usually. Many first projects start from existing documents and a few hundred labelled examples. We check data quality in the first weeks and tell you plainly if it is not ready.'],
      ['Can our data stay inside our own environment?', 'Yes. We can deploy open-source models on your private cloud or on-premise servers, or configure hosted providers for zero data retention. We explain the accuracy and cost trade-offs before you choose.'],
      ['How do you make sure the AI is accurate?', 'We define accuracy targets up front, build an evaluation set from your real cases, add guardrails and human review where errors are costly, and monitor quality after launch.']
    ]
  },

  software: {
    slug: 'custom-software-development',
    name: 'Custom Software Development',
    nameLc: 'custom software development',
    label: 'custom software',
    short: 'Custom Software',
    h1: 'Custom Software Development Company in {city}',
    titleLead: 'Custom Software & ERP Development Company in {city}',
    heroSub: 'Custom ERP, B2B platforms and SaaS products for {city} companies that have outgrown spreadsheets and off-the-shelf tools. One system of record, built around your process.',
    formType: 'Custom Software',
    budgets: ['Under ₹7L', '₹7L – ₹18L', '₹18L – ₹40L', 'Above ₹40L', 'Still evaluating'],
    bhubaneswarPage: '/b2b-software-development-for-startups',
    servicesHeading: 'Custom software development services for {city}',
    servicesSub: 'Business systems and products engineered for daily use by real teams, with role-based access and audit trails from day one.',
    services: [
      ['Custom ERP & operations systems', 'Inventory, purchasing, production, HR and finance in one role-based platform.'],
      ['B2B SaaS product development', 'Multi-tenant architecture, billing, admin consoles and onboarding.'],
      ['Workflow & approval automation', 'Multi-level approvals and audit logs replacing email and paper sign-offs.'],
      ['Customer, vendor & partner portals', 'Secure portals for orders, invoices and documents tied to your back office.'],
      ['Marketplace & booking platforms', 'Vendor onboarding, availability, payments and payouts, proven on Sky1.'],
      ['Integrations & data pipelines', 'Tally, Zoho, SAP, Salesforce, GST and payment gateways connected reliably.'],
      ['Dashboards & business intelligence', 'Live operational dashboards replacing month-end spreadsheet consolidation.'],
      ['Legacy modernisation & support', 'Staged re-platforming and maintenance plans with response-time commitments.']
    ],
    industries: ['Manufacturing', 'Distribution & wholesale', 'Healthcare & diagnostics', 'Education & institutions', 'Logistics & fleet', 'Real estate & construction', 'FinTech & lending', 'Retail & franchises', 'Professional services', 'Hospitality & events', 'Agri & food processing', 'Energy & utilities', 'Non-profits & cooperatives', 'SaaS startups', 'Government-linked vendors', 'Telecom & field services'],
    complianceHeading: 'Controls and compliance built into business software',
    compliance: [
      ['India data protection (DPDP Act, 2023)', 'Consent, access and erasure workflows and breach-response processes.'],
      ['GST, e-invoicing & e-way bills', 'Compliant invoicing and dispatch documents generated from one entry.'],
      ['Audit trail for accounting records', 'Change logs on financial records, aligned with the Companies Act audit-trail rule.'],
      ['Access control & segregation of duties', 'Role-based permissions, multi-level approvals and maker-checker flows.'],
      ['SOC 2-ready engineering practices', 'Code review, backups, encryption and logging; certification depends on your audit scope.']
    ],
    stack: [
      ['Front end', 'React, Next.js, TypeScript, Tailwind'],
      ['Back end', 'Node.js, NestJS, Python (Django, FastAPI), Java'],
      ['Data', 'PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch'],
      ['Integration', 'REST, GraphQL, webhooks, message queues, ETL'],
      ['Cloud & DevOps', 'AWS, GCP, Docker, Terraform, GitHub Actions'],
      ['Identity', 'OAuth 2.0, SSO (SAML/OIDC), RBAC, audit logging'],
      ['Reporting', 'Metabase, custom dashboards, scheduled exports'],
      ['Quality', 'Automated tests, staging environments, monitoring and alerting']
    ],
    process: [
      ['Process discovery', 'Walk-throughs and interviews across the departments involved.'],
      ['PRD & architecture', 'Modules, roles, data model and milestones signed off.'],
      ['UX & prototype', 'Workflow-first designs validated with daily users.'],
      ['Sprint delivery', 'Module-by-module builds with demos and staging access.'],
      ['Migration & training', 'Data import, parallel running and role-based training.'],
      ['Support & evolution', 'Monitoring, enhancements and new modules under a plan.']
    ],
    tiers: [
      ['Focused first version', '₹7L – ₹18L', '$8k – $22k', '8 – 14 weeks', 'One or two departments or a SaaS MVP, with roles and key integrations.'],
      ['Multi-module platform', '₹18L – ₹40L+', '$22k – $50k+', '3 – 6 months', 'Several departments or a full B2B product with billing and portals.'],
      ['Dedicated squad', 'Monthly retainer', 'Monthly retainer', 'Ongoing', 'A stable in-house team for continuous development and support.']
    ],
    cases: ['custom-erp-manufacturing', 'sky1-event-booking', 'skribe'],
    faqs: [
      ['How much does custom software cost in {city}?', 'A focused first version, such as one or two departments or a SaaS MVP, typically costs ₹7 to ₹18 lakh. Multi-module platforms run ₹18 to ₹40 lakh or more. We give a fixed-scope estimate after a discovery workshop and bill against approved milestones.'],
      ['How long does it take to build a custom ERP or business system?', 'A first release covering one or two departments takes 8 to 14 weeks. Larger multi-department systems take 3 to 6 months, and we release module by module so your team starts using it early.'],
      ['Can it integrate with Tally, Zoho, SAP or our existing tools?', 'Yes. We integrate through APIs, database connectors or scheduled exchange, and define data flows and failure handling in the PRD. Many clients keep their accounting package and add the missing modules around it.'],
      ['Who owns the code and the data?', 'You do. You receive full repository access, documentation and your data in open formats, and we sign an NDA before discovery.'],
      ['What happens after launch?', 'We offer maintenance plans covering monitoring, bug fixes, security patches and enhancements, with response times agreed in writing. You can also move maintenance to your own team at any time.']
    ]
  }
};
