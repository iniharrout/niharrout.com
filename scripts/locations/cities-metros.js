/**
 * Indian metro city data. Delivery is remote-first from Bhubaneswar (same time zone);
 * nothing here claims a local office or named local clients.
 */

module.exports = [
  {
    slug: 'bangalore',
    name: 'Bangalore',
    state: 'Karnataka',
    region: 'metro',
    lat: 12.9716,
    lng: 77.5946,
    eyebrow: 'Serving Bangalore (Bengaluru) teams remotely',
    overview: 'Bengaluru is India’s densest startup and product-engineering market, where founders compete on speed for funding rounds and talent. Buyers here compare vendors on shipping cadence, engineering quality and cost efficiency, which is where a focused product-led team from Odisha competes well.',
    areas: ['Koramangala', 'HSR Layout', 'Indiranagar', 'Whitefield', 'Electronic City', 'Bellandur & Outer Ring Road', 'Manyata Tech Park', 'Sarjapur Road'],
    sectors: [
      ['SaaS & B2B software', 'The country’s largest concentration of product companies selling to global customers.'],
      ['FinTech', 'Payments, lending and wealth platforms with heavy compliance and integration needs.'],
      ['Consumer & D2C', 'Fast-moving consumer brands that live and die on app ratings and retention.'],
      ['AI & deep-tech startups', 'Early-stage teams shipping AI-native products and needing engineering capacity quickly.']
    ],
    ecosystem: ['Koramangala and HSR startup clusters', 'Manyata and Bagmane tech parks', 'IISc and IIIT Bangalore', 'Outer Ring Road product companies'],
    distance: 'Same time zone, regular direct flights from Bhubaneswar',
    delivery: 'We work as a remote product squad in your time zone, with weekly status calls, fortnightly demos and shared boards. Bhubaneswar and Bengaluru are connected by regular direct flights, so we can join you in person for kick-offs and key workshops.',
    costNote: 'Our rates reflect Bhubaneswar operating costs, so comparable scope generally costs meaningfully less than a Bengaluru agency. Scope drives the number, so we give a fixed-scope estimate you can compare like for like.',
    services: {
      mobile: {
        angle: 'A Bengaluru founder needs a first release in weeks, not quarters, and a codebase the next hire can extend. We work as a product-led squad: PRD, design and cross-platform build in two-week sprints, with builds on your phone from the first sprint.',
        cases: [
          ['Consumer app MVP for a seed round', 'A tightly scoped iOS and Android launch with analytics, onboarding experiments and payments, built to demonstrate traction to investors.'],
          ['B2B companion & field apps for SaaS products', 'Mobile apps that extend an existing web SaaS: approvals, field data capture, notifications and offline modes.'],
          ['Mobile rebuild for scale', 'Replace a slow or crash-prone app with a maintainable architecture, better crash-free rates and a proper release pipeline.']
        ],
        faqs: [
          ['How do you compare with Bangalore-based app agencies on cost?', 'Our rates reflect Bhubaneswar operating costs, so comparable scope typically costs meaningfully less than a Bengaluru agency. We do not quote a percentage because scope drives the number. You receive a fixed-scope estimate after a PRD workshop, with milestones so you can compare like for like.'],
          ['Can you join our existing team and codebase?', 'Yes. We can take over an existing React Native, Flutter or native codebase, or embed alongside your engineers on a defined feature stream, starting with a short code audit.']
        ]
      },
      ai: {
        angle: 'Bengaluru startups are being asked by investors and customers how they use AI. The differentiator is shipping features that work in production: retrieval, agents with guardrails, evaluation suites and cost control, not demos.',
        cases: [
          ['AI copilots inside existing SaaS products', 'Contextual assistants that answer questions, draft content or take actions inside your product, grounded in each customer’s own data.'],
          ['Support & operations automation', 'Agentic workflows that triage tickets, draft replies and update systems, with approval rules and full audit logs.'],
          ['LLM evaluation, guardrails & cost optimisation', 'Build the test sets, monitoring and model routing that make existing AI features reliable and cheaper to run.']
        ],
        faqs: [
          ['Which models and stack do you use?', 'We choose per use case: hosted frontier models via API for speed, open-source models where data control or cost demands it, plus a vector store, evaluation harness and monitoring. The model layer stays swappable to avoid lock-in.'],
          ['How do you keep AI features reliable in production?', 'Automated evaluation sets, guardrails, fallbacks to human review, and per-request cost and latency monitoring. We agree accuracy targets before the build so that "works" is measurable.']
        ]
      },
      software: {
        angle: 'After the MVP, Bengaluru SaaS teams hit the unglamorous work: multi-tenant architecture, admin consoles, billing, integrations and SSO. That is where a stable engineering squad beats a rotating cast of freelancers.',
        cases: [
          ['Multi-tenant SaaS platform build', 'Tenant isolation, roles, subscription billing, usage metering and admin tooling designed to scale past the first hundred customers.'],
          ['Internal tools & admin consoles', 'Operations dashboards, support tooling and back-office workflows that free your core engineers to work on the product.'],
          ['Integrations: payments, CRMs, ERPs & GST', 'Reliable connectors to Razorpay, HubSpot, Zoho, Tally and GST systems, with retries, logging and reconciliation.']
        ],
        faqs: [
          ['Do you work with pre-seed founders who need a full product built?', 'Yes. That is our core B2B engagement: PRD, design, build and launch of a first version in 8 to 14 weeks. We help you cut scope to what proves your hypothesis first.'],
          ['Who owns the IP and code?', 'You do, 100%. You get full repository access from day one with no vendor lock-in, and we sign an NDA before discussing your idea.']
        ]
      }
    }
  },

  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    region: 'metro',
    lat: 17.385,
    lng: 78.4867,
    eyebrow: 'Serving Hyderabad teams remotely',
    overview: 'Hyderabad combines a large enterprise IT and global-capability-centre base in HITEC City and the Financial District with a strong pharma and life-sciences cluster around Genome Valley and a startup ecosystem anchored by T-Hub. Buyers here often need enterprise-grade delivery, compliance and integration, not just fast prototypes.',
    areas: ['HITEC City', 'Gachibowli', 'Madhapur', 'Kondapur', 'Financial District', 'Kokapet', 'Banjara Hills & Jubilee Hills', 'Secunderabad'],
    sectors: [
      ['Enterprise IT & GCCs', 'Global capability centres that need internal tools, portals and integration work.'],
      ['Pharma & life sciences', 'A major Indian pharma and biotech cluster with documentation-heavy processes.'],
      ['FinTech & BFSI', 'Banks, NBFCs and fintechs with KYC, lending and compliance workloads.'],
      ['Startups & product companies', 'T-Hub and a large early-stage ecosystem building B2B and consumer products.']
    ],
    ecosystem: ['T-Hub', 'Genome Valley', 'HITEC City', 'ISB and IIIT Hyderabad'],
    distance: 'Same time zone, regular direct flights from Bhubaneswar',
    delivery: 'We run engagements remotely with weekly status calls, fortnightly demos and shared test environments. Bhubaneswar and Hyderabad are linked by regular direct flights, so we travel for kick-off and discovery workshops when in-person time matters.',
    costNote: 'Enterprise buyers in Hyderabad often need security documentation and vendor onboarding. We supply that up front, while keeping cost at Odisha rates rather than metro-agency rates.',
    services: {
      mobile: {
        angle: 'Hyderabad’s enterprises and GCCs need mobile apps that clear security reviews and integrate with SSO, MDM and legacy back ends. We build with those constraints from the first sprint so the app passes review, rather than retrofitting.',
        cases: [
          ['Employee & field-force apps with SSO', 'Internal apps with single sign-on, role-based access, offline forms and integration to HR, ERP or ticketing systems.'],
          ['Pharma & healthcare apps', 'Field-representative call reporting, doctor engagement and patient medication adherence apps with strict data handling.'],
          ['FinTech onboarding, KYC & payments apps', 'Smooth onboarding with document capture, eKYC integrations and UPI or card payments through compliant gateways.']
        ],
        faqs: [
          ['Can your apps meet enterprise security reviews?', 'We design for the common checklist: encrypted storage and transport, SSO and OAuth, certificate pinning, role-based access and secure release pipelines. Formal certifications such as SOC 2 depend on your organisation’s own audit scope.'],
          ['Do you offer on-site workshops in Hyderabad?', 'We can travel for kick-off and discovery workshops, and run everything else over video with fortnightly demos. Bhubaneswar and Hyderabad are linked by regular direct flights.']
        ]
      },
      ai: {
        angle: 'Hyderabad’s pharma, BFSI and GCC buyers care about AI that is auditable and privacy-safe. That shifts the build toward private deployments, retrieval over controlled document sets, logging, and human-in-the-loop review.',
        cases: [
          ['Regulatory & clinical document search', 'Search and summarise SOPs, submissions and study documents with citations to the exact page, restricted by user permissions.'],
          ['KYC & loan document automation', 'Extract, validate and cross-check identity, income and property documents, routing exceptions to human underwriters.'],
          ['Internal knowledge assistants for GCC teams', 'Secure assistants over wikis, tickets and policies that reduce repetitive questions to shared-service teams.']
        ],
        faqs: [
          ['How do you handle sensitive pharma or financial data with AI?', 'By keeping data inside your controlled environment, using private cloud or on-premise models where required, with access controls, redaction, audit logs and human review on regulated outputs.'],
          ['Can AI replace manual document review entirely?', 'For regulated documents we recommend AI-assisted review rather than full replacement: the system extracts and cites, and a person approves. This typically cuts review time substantially while keeping accountability.']
        ]
      },
      software: {
        angle: 'Hyderabad organisations often need software that plugs into existing enterprise estates such as SAP, Oracle or Salesforce while adding what off-the-shelf products lack. Integration design is where these projects are won or lost.',
        cases: [
          ['Partner, vendor & distributor portals', 'Secure portals for orders, invoices, claims and documents, integrated with your ERP and finance systems.'],
          ['Workflow & approval automation', 'Multi-department approvals with SLAs, escalations and full audit trails replacing email and spreadsheet trackers.'],
          ['Data platforms & reporting over legacy systems', 'Consolidate data from ageing systems into a clean reporting layer and dashboards for leadership.']
        ],
        faqs: [
          ['Can you integrate with SAP, Oracle or Salesforce?', 'Yes, through their APIs and standard connectors. We scope each integration’s data flows, limits and failure handling in the PRD so nothing surprising appears mid-build.'],
          ['Do you offer post-launch support and SLAs?', 'Yes. Maintenance plans cover monitoring, bug fixes, security patches and enhancements, with response-time commitments agreed in the contract.']
        ]
      }
    }
  },

  {
    slug: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    region: 'metro',
    lat: 18.5204,
    lng: 73.8567,
    eyebrow: 'Serving Pune teams remotely',
    overview: 'Pune pairs a deep IT and product-engineering talent pool in Hinjewadi and Kharadi with one of India’s strongest automotive and manufacturing belts across Chakan, Pimpri-Chinchwad and Talegaon. Manufacturers and mid-market firms here increasingly want to digitise shop-floor and supply-chain workflows.',
    areas: ['Hinjewadi', 'Kharadi', 'Baner', 'Magarpatta', 'Viman Nagar', 'Hadapsar', 'Chakan MIDC', 'Pimpri-Chinchwad'],
    sectors: [
      ['Automotive & auto-components', 'OEMs and a deep tier-1 and tier-2 supplier network.'],
      ['Manufacturing & engineering', 'Precision engineering, machinery and industrial units across the MIDC belts.'],
      ['IT & product companies', 'Large IT services base and a growing set of product startups.'],
      ['Education & edtech', 'One of India’s largest student populations and a busy edtech scene.']
    ],
    ecosystem: ['Hinjewadi IT Park', 'Chakan and Talegaon industrial belts', 'Pimpri-Chinchwad MIDC', 'COEP and MIT-WPU engineering community'],
    distance: 'Same time zone, regular direct flights from Bhubaneswar',
    delivery: 'We work as a remote squad in your time zone with weekly status calls, shared boards and fortnightly demos. For manufacturers, we plan on-site visits to your plant or office for process workshops, pilots and go-live training.',
    costNote: 'Pune’s manufacturers are cost-aware and quality-obsessed. We price at Odisha rates and structure milestones around a pilot on one line or department, so you see results before committing to the full rollout.',
    services: {
      mobile: {
        angle: 'Pune’s manufacturers and their suppliers run on shifts, quality checks and dispatch schedules. Mobile tools that capture inspection data at the line, track dispatch and give plant heads live status remove daily reconciliation.',
        cases: [
          ['Shop-floor quality & maintenance app', 'Offline inspection checklists with photo evidence, defect codes, sign-off and automatic alerts to supervisors.'],
          ['Dealer & distributor ordering app', 'Order booking, scheme visibility, stock availability and payment status for auto-component makers and their channel partners.'],
          ['Edtech & student-engagement app', 'Live classes, doubt solving, test series and parent dashboards for Pune’s large student market.']
        ],
        faqs: [
          ['Can you build apps for tablets and rugged Android devices on the shop floor?', 'Yes. We build Android apps for tablets and rugged handhelds, including barcode and QR scanning, kiosk mode and offline sync.'],
          ['How do we coordinate if our team is in Pune and yours is in Bhubaneswar?', 'There is no time-zone gap. We use fortnightly demos, shared boards and test builds, with visits to your plant or office for workshops and go-live. Regular direct flights connect the two cities.']
        ]
      },
      ai: {
        angle: 'In Pune’s manufacturing belt, AI value shows up in quality inspection, demand planning and maintenance. In its IT base, it shows up in shipping AI features faster. We start with the use case where a measurable saving already exists.',
        cases: [
          ['Vision-based defect detection', 'Camera-based inspection for machined parts, castings or packaging, with defect classification and a human-review queue for uncertain cases.'],
          ['Demand & inventory forecasting for suppliers', 'Forecast customer schedules and raw-material needs to cut expedite costs and inventory carrying.'],
          ['Engineering documentation Q&A & RFQ drafting', 'Search drawings, specs and past quotes, and draft RFQ responses grounded in your own history.']
        ],
        faqs: [
          ['How accurate is AI visual inspection?', 'It depends on defect type, lighting and data. We run a pilot on images from your line, report precision and recall against your current inspection, and proceed only if the numbers justify it.'],
          ['Do we need special cameras or hardware?', 'Often standard industrial cameras and controlled lighting are enough. We specify the setup during the pilot so you do not overspend on hardware before proving value.']
        ]
      },
      software: {
        angle: 'Pune’s mid-sized manufacturers and suppliers often outgrow generic ERPs on the things that make them different: job-work flows, tolerances and customer-specific documentation. Custom modules on top of, or instead of, a standard ERP close that gap.',
        cases: [
          ['Production, job-work & traceability system', 'Work orders, machine loading, batch traceability and job-work challans, connected to stores and quality.'],
          ['Supplier & vendor portals', 'Purchase orders, advance shipping notices, invoice status and performance scorecards for your supply base.'],
          ['OEM-facing compliance & documentation portal', 'Manage PPAP-style documents, certificates and audit records in one place, ready for customer audits.']
        ],
        faqs: [
          ['We use Tally or SAP Business One already. Do we replace it?', 'Usually not. We add the missing modules or integrations, such as shop-floor capture, dashboards and portals, and sync with your accounting or ERP, replacing only what is truly holding you back.'],
          ['How do you scope a manufacturing system reliably?', 'Through a short discovery on the shop floor: a process walk-through, document samples and user interviews, followed by a PRD with milestones. Our manufacturing ERP unified four departments using this approach.']
        ]
      }
    }
  },

  {
    slug: 'delhi-ncr',
    name: 'Delhi NCR',
    state: 'Delhi',
    region: 'metro',
    lat: 28.6139,
    lng: 77.209,
    eyebrow: 'Serving Delhi, Gurugram and Noida remotely',
    overview: 'Delhi NCR spans Delhi, Gurugram, Noida, Greater Noida and Faridabad and is India’s largest consolidated market: corporate headquarters and consulting in Gurugram, media, edtech and IT services in Noida, and a large ecosystem of D2C and e-commerce brands. Decisions move fast and buyers expect polished, responsive delivery.',
    areas: ['Gurugram Cyber City', 'Golf Course Road', 'Udyog Vihar', 'Noida Sector 62', 'Noida Sector 125', 'Greater Noida', 'Nehru Place & Okhla', 'Faridabad'],
    sectors: [
      ['Corporate services & consulting', 'Headquarters and consulting firms that need internal platforms and client portals.'],
      ['E-commerce & D2C', 'High-volume consumer brands where conversion and retention decide margins.'],
      ['Edtech & media', 'Content-heavy platforms with large user bases and demanding release cycles.'],
      ['FinTech & BFSI', 'Lending, payments and insurance products with heavy compliance requirements.']
    ],
    ecosystem: ['Gurugram Cyber City', 'Noida Sector 62 and 125 IT hubs', 'Startup clusters in Gurugram and Noida', 'Corporate headquarters on Golf Course Road'],
    distance: 'Same time zone, regular direct flights from Bhubaneswar',
    delivery: 'There is no time-zone gap. We run a weekly status call, fortnightly demos and shared team channels, and can meet you in Gurugram, Noida or Delhi for milestone workshops. Regular direct flights connect Bhubaneswar and Delhi.',
    costNote: 'NCR buyers are used to premium agency pricing. Our rates reflect Bhubaneswar operating costs, so you get founder-led product discipline without paying for a Gurugram office in the estimate.',
    services: {
      mobile: {
        angle: 'NCR consumer brands and service businesses compete on app store ratings and repeat orders. We focus on the parts that move those numbers: a fast onboarding flow, reliable payments, push messaging people do not mute, and crash-free releases.',
        cases: [
          ['D2C shopping & loyalty apps', 'Catalogue, wishlists, checkout, subscriptions, loyalty and personalised push, built for conversion and retention.'],
          ['On-demand & hyperlocal service apps', 'Booking, dispatch, live tracking and vendor payouts, proven on our Make My Look and FlashNow platforms.'],
          ['Corporate employee & sales-force apps', 'Secure internal apps with SSO, attendance, expense, order capture and manager dashboards.']
        ],
        faqs: [
          ['Do you have experience with on-demand and delivery apps?', 'Yes. FlashNow, a quick-commerce platform we built, delivers in 10 to 15 minutes from neighbourhood shops across a four-role platform, and Make My Look is an on-demand booking marketplace.'],
          ['How do you handle communication with an NCR team?', 'There is no time-zone gap. We run a weekly status call, fortnightly demos and shared team channels, and can meet in Gurugram or Noida for milestone workshops.']
        ]
      },
      ai: {
        angle: 'NCR e-commerce, edtech and services businesses already have the data volume to justify AI: catalogue enrichment, support deflection, lead scoring and personalisation. The focus is on measurable lifts, not novelty.',
        cases: [
          ['Support deflection & agent assist', 'Answer routine e-commerce and D2C queries automatically from order and policy data, and suggest replies to human agents for the rest.'],
          ['Catalogue enrichment, search & recommendations', 'Generate consistent product attributes and descriptions, improve search relevance and personalise recommendations.'],
          ['Lead qualification & sales-call summarisation', 'Score inbound leads, summarise calls and update your CRM automatically for B2B sales teams.']
        ],
        faqs: [
          ['What results can we expect from AI support automation?', 'It varies with your ticket mix. We baseline first-response time, resolution rate and cost per ticket, then measure the same metrics after launch. We do not promise a fixed percentage before seeing your data.'],
          ['Can AI integrate with our CRM and helpdesk?', 'Yes: HubSpot, Zoho, Salesforce, Freshdesk, Zendesk and custom systems, through their APIs, with the AI’s actions logged for audit.']
        ]
      },
      software: {
        angle: 'NCR businesses with multiple entities, franchises or channels need software that reflects that complexity: role-based access by entity, consolidated reporting, and integrations with marketplaces, payment gateways and logistics providers.',
        cases: [
          ['Multi-entity & franchise management platforms', 'Entity-wise data separation, consolidated dashboards, royalty and billing workflows for franchise and group structures.'],
          ['Order management & integration hubs', 'Central order, inventory and returns handling across marketplaces, your own storefront and logistics partners.'],
          ['Partner, dealer & agent portals', 'Onboarding, targets, commissions and payouts with transparent statements for partners.']
        ],
        faqs: [
          ['Do you build marketplaces and multi-vendor platforms?', 'Yes. Sky1 (event and vendor booking), Make My Look (beauty booking) and FlashNow (hyperlocal delivery) are marketplace-style platforms with vendor onboarding, payouts and real-time availability.'],
          ['What does a typical B2B platform cost?', 'A first version usually falls between ₹7 lakh and ₹18 lakh, and larger multi-module systems between ₹18 lakh and ₹40 lakh or more. The detail depends on modules, integrations and scale, and we give a fixed-scope estimate after discovery.']
        ]
      }
    }
  }
];
