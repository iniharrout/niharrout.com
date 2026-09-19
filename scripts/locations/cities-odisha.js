/**
 * Odisha city data. Every string here is unique to the city.
 * Delivery is remote-first from Bhubaneswar; nothing here claims a local office.
 */

module.exports = [
  {
    slug: 'cuttack',
    name: 'Cuttack',
    state: 'Odisha',
    region: 'odisha',
    lat: 20.4625,
    lng: 85.883,
    eyebrow: 'Serving Cuttack from Bhubaneswar',
    overview: 'Cuttack is Odisha’s traditional commercial centre, about 30 km from Bhubaneswar. Its economy runs on wholesale trade around Badambadi and Buxi Bazaar, silver filigree and handicraft exports, textiles, and a large base of legal, medical and education institutions.',
    areas: ['Badambadi', 'Buxi Bazaar', 'Link Road', 'Chandni Chowk', 'CDA Sectors', 'Tulsipur', 'Madhupatna', 'Choudwar Industrial Estate'],
    sectors: [
      ['Wholesale & distribution', 'Dense trader networks that still run on phone calls and WhatsApp orders.'],
      ['Handicrafts & textiles', 'Silver filigree, handloom and export-oriented artisans.'],
      ['Healthcare & education', 'SCB Medical College, Ravenshaw University and many private clinics and coaching institutes.'],
      ['Legal & professional services', 'The Orissa High Court anchors a large legal and advisory community.']
    ],
    ecosystem: ['Ravenshaw University', 'SCB Medical College & Hospital', 'Orissa High Court', 'Choudwar Industrial Estate'],
    distance: 'About 30 km from our Bhubaneswar base',
    delivery: 'Cuttack is close enough for same-day, in-person workshops and demo days. Between visits we work over video with fortnightly demos and shared test builds, so you get face-to-face time where it counts and fast iteration in between.',
    costNote: 'Because delivery runs from Bhubaneswar, Cuttack clients get product-agency quality at Odisha operating costs, with no metro-agency overhead in the estimate.',
    services: {
      mobile: {
        angle: 'Cuttack’s traders and manufacturers already run on WhatsApp orders and phone calls. A focused mobile app for retailers reordering stock, reps taking orders in the field, or customers booking services replaces that chatter with a record you can search, reconcile and grow on.',
        cases: [
          ['Wholesale reorder & field-sales app', 'Retailers browse the catalogue and rates and reorder in two taps. Your reps capture orders offline on market rounds, and everything syncs to your stock ledger when they are back online.'],
          ['Handicraft & textile storefront', 'Take silver filigree, sarees and handloom to national and export buyers with a story-led app, secure payments and shipment tracking instead of marketplace fees.'],
          ['Clinic & diagnostics apps', 'Appointment booking, digital reports and reminders for private clinics and labs serving patients from across coastal Odisha.']
        ],
        faqs: [
          ['Can we meet in person in Cuttack to scope the app?', 'Yes. Cuttack is about 30 km from our Bhubaneswar base, so workshops and demo days in person are straightforward, with video calls in between.'],
          ['Can the app work in low-connectivity areas around Cuttack?', 'Yes. We design offline-first: orders, forms and checklists are saved on the device and sync when the network returns, which suits market rounds and field visits.']
        ]
      },
      ai: {
        angle: 'For Cuttack businesses the first AI win is rarely a chatbot. It is turning piles of invoices, ledgers, case papers or handwritten registers into structured data, and answering repeat customer questions automatically in the language customers use.',
        cases: [
          ['Invoice & ledger extraction', 'Read purchase bills, challans and ledger pages into structured entries with validation, so accounts staff review exceptions instead of typing every line.'],
          ['Odia, Hindi & English customer assistant', 'A WhatsApp or website assistant that answers price, stock and order-status questions from your own data and hands complex cases to a person.'],
          ['Demand forecasting for wholesale stock', 'Predict reorder quantities by SKU and season from sales history, reducing dead stock and stock-outs.']
        ],
        faqs: [
          ['Can AI work with Odia-language documents and customers?', 'For many tasks, yes. Current language models handle Odia text and speech reasonably well, though accuracy varies by task. We validate on your real documents during the pilot before committing to a full build.'],
          ['How much data do we need before starting?', 'Less than most expect. Many first projects use existing documents and a few hundred labelled examples, and we test feasibility in a short pilot before recommending a full build.']
        ]
      },
      software: {
        angle: 'Cuttack companies commonly outgrow a Tally-plus-Excel setup: stock lives in one place, dues in another, and sales orders in WhatsApp. Custom software joins these into one system of record with role-based access and a clear audit trail.',
        cases: [
          ['Distribution & stock ERP', 'Party ledgers, multi-godown stock, sales orders, dispatch and GST invoicing in one system, with dues and stock visible to the owner in real time.'],
          ['Case & document management', 'Matter tracking, hearing dates, document vaults and client billing for law firms and professional practices.'],
          ['Institution & clinic management portal', 'Admissions or patient registration, fees, records and parent or patient communication in one secure portal.']
        ],
        faqs: [
          ['Do you integrate with Tally or our existing accounting software?', 'Yes. Most Cuttack businesses keep Tally or Zoho Books for accounting. We build around it and sync invoices and ledgers rather than forcing a replacement.'],
          ['How long does a custom business system take?', 'A focused first version covering one or two departments typically takes 8 to 14 weeks. Larger multi-department systems take 3 to 6 months, released module by module so your team starts using it early.']
        ]
      }
    }
  },

  {
    slug: 'rourkela',
    name: 'Rourkela',
    state: 'Odisha',
    region: 'odisha',
    lat: 22.2604,
    lng: 84.8536,
    eyebrow: 'Serving Rourkela from Bhubaneswar',
    overview: 'Rourkela is Odisha’s steel city, built around the Rourkela Steel Plant (SAIL) and a dense ring of ancillary, engineering and logistics businesses. It is roughly 330 km from Bhubaneswar, so most companies here are used to working with specialist vendors remotely.',
    areas: ['Civil Township', 'Sector 2', 'Udit Nagar', 'Panposh', 'Chhend Industrial Area', 'Koel Nagar', 'Basanti Colony', 'Kansbahal'],
    sectors: [
      ['Steel & metals', 'The Rourkela Steel Plant and its downstream fabrication and trading ecosystem.'],
      ['Engineering & ancillary MSMEs', 'Job-work, fabrication and maintenance contractors serving large plants.'],
      ['Mining & logistics', 'Sundargarh’s mining belt drives transport, weighbridge and dispatch operations.'],
      ['Education & research', 'NIT Rourkela produces a steady pipeline of engineering talent and startups.']
    ],
    ecosystem: ['NIT Rourkela', 'Rourkela Steel Plant (SAIL)', 'Ispat General Hospital', 'Sundargarh mining belt'],
    distance: 'Roughly 330 km from our Bhubaneswar base',
    delivery: 'Most delivery runs over video, with fortnightly demos and test builds shared through TestFlight and Play internal testing. Because Rourkela is a long trip, we plan on-site visits around milestones that benefit most from being in the room: discovery workshops, shop-floor observation and rollout training.',
    costNote: 'Industrial buyers in Rourkela often compare us with metro vendors. Our costs reflect Odisha operating rates, and travel is quoted separately and up front so it never surprises you.',
    services: {
      mobile: {
        angle: 'Rourkela’s industrial ecosystem runs on shifts, contractors and inspections, which are exactly the problems a mobile app solves best. Digital checklists, gate passes and vendor apps take paperwork off the shop floor and into a searchable record.',
        cases: [
          ['Plant-floor inspection & maintenance app', 'Offline checklists with photo evidence, supervisor sign-off and automatic escalation of failed checks to the maintenance team.'],
          ['Contractor & gate management', 'Contractor attendance, gate passes and safety-induction tracking, with expiry alerts on licences and medical certificates.'],
          ['Fleet & dispatch tracking for logistics', 'A driver app with trip logs, proof of delivery and weighbridge slips, synced to your dispatch dashboard.']
        ],
        faqs: [
          ['Can you build apps that work inside plant premises with poor connectivity?', 'Yes. Offline-first design lets inspectors and supervisors capture data and photos on the device and sync when they reach a network. We can also work with your IT team on private-cloud or on-premise hosting.'],
          ['How do you work with a Rourkela team from Bhubaneswar?', 'Video sprint demos every two weeks, shared test builds and planned on-site visits for workshops and rollout training. Rourkela is roughly 330 km away, so we batch visits around milestones.']
        ]
      },
      ai: {
        angle: 'Heavy industry generates the data AI feeds on: sensor logs, inspection photos, maintenance histories and purchase records. The practical starting points in Rourkela are predicting equipment downtime, reading documents and drawings, and giving supervisors instant answers from manuals and SOPs.',
        cases: [
          ['Predictive maintenance alerts', 'Flag likely equipment failures from vibration, temperature and run-hour data so maintenance is planned before a breakdown stops a line.'],
          ['Visual defect & safety inspection', 'Detect surface defects, missing PPE or unsafe zones from camera images, with a human confirming flagged cases.'],
          ['SOP & manual Q&A assistant', 'Supervisors ask questions in plain language and get answers with page references from your manuals, SOPs and maintenance records.']
        ],
        faqs: [
          ['Can AI run on our own servers for data-sensitive plant operations?', 'Yes. Where data cannot leave your premises we deploy open-source models inside your network or private cloud instead of calling public APIs. The trade-off is hardware cost and somewhat lower peak accuracy, which we set out before you decide.'],
          ['Is our operational data enough for predictive models?', 'Often, if you have several months of consistent sensor or maintenance logs. We check data quality in a short pilot first and tell you plainly if the data is not ready.']
        ]
      },
      software: {
        angle: 'Rourkela’s engineering firms and contractors often run purchase, stores, production and billing in disconnected sheets. A custom system ties indent-to-invoice into one flow with approvals, which is where the biggest time and leakage savings usually sit.',
        cases: [
          ['Stores, purchase & vendor ERP', 'Indents, purchase orders, goods receipt, stock and vendor bills in one workflow with multi-level approvals and a full audit log.'],
          ['Production planning & job-work tracking', 'Work orders, machine loading, job-work challans and traceability for fabrication and ancillary units.'],
          ['Contractor billing & compliance portal', 'Measurement books, running bills and statutory documents with approval trails, so payments are faster and audits are simpler.']
        ],
        faqs: [
          ['Can you connect a new system with SAP or existing plant software?', 'Yes, through APIs, database connectors or scheduled file exchange. Many ancillary units in Rourkela must interoperate with a larger customer’s systems, and we scope those integrations up front.'],
          ['Can it support our approval hierarchy and audit trail?', 'Yes. Role-based permissions, multi-level approvals and a complete audit log are part of our standard build, since most industrial and contractor workflows depend on them.']
        ]
      }
    }
  },

  {
    slug: 'berhampur',
    name: 'Berhampur',
    state: 'Odisha',
    region: 'odisha',
    lat: 19.3149,
    lng: 84.7941,
    eyebrow: 'Serving Berhampur (Brahmapur) from Bhubaneswar',
    overview: 'Berhampur (Brahmapur) is the commercial hub of southern Odisha, roughly 170 km from Bhubaneswar in Ganjam district. Silk and handloom textiles, coastal trade and seafood around the Gopalpur port belt, and a large medical and education cluster drive the local economy.',
    areas: ['Gosaninuagaon', 'Engineering School Road', 'Aska Road', 'Lanjipalli', 'Bada Bazar', 'Giri Road', 'Khodasingi', 'Bhanja Bihar'],
    sectors: [
      ['Silk & textiles', 'Berhampuri silk sarees and a large network of weavers and wholesalers.'],
      ['Coastal trade & seafood', 'Ganjam’s coast and Gopalpur port support fisheries and export trade.'],
      ['Healthcare', 'MKCG Medical College and many private hospitals and diagnostic centres.'],
      ['Education & coaching', 'Berhampur University and a busy coaching and training sector.']
    ],
    ecosystem: ['Berhampur University', 'MKCG Medical College & Hospital', 'Gopalpur Port', 'Ganjam agri-trade network'],
    distance: 'Roughly 170 km from our Bhubaneswar base',
    delivery: 'Most work runs over video with fortnightly demos. For discovery workshops and launch training we travel to Berhampur, and the Bhubaneswar–Berhampur road and rail links make a same-day visit practical.',
    costNote: 'Berhampur businesses get a Bhubaneswar-based product team at Odisha rates, with a phased scope so you can start small and add modules as revenue grows.',
    services: {
      mobile: {
        angle: 'Berhampur’s weavers, saree traders and seafood exporters sell to buyers far from Ganjam. A well-built app lets them show catalogues, take advance orders and collect payments without depending on a middleman or a marketplace.',
        cases: [
          ['Silk saree catalogue & wholesale ordering', 'Rich product galleries, size and fabric filters, wholesale price tiers, WhatsApp share and order tracking for boutiques and retailers.'],
          ['Seafood & agri-produce order app', 'Daily price lists, quality grades, cold-chain dispatch tracking and repeat ordering for buyers across states.'],
          ['Coaching institute & student engagement app', 'Live classes, test series, attendance, fee dues and parent updates in one app.']
        ],
        faqs: [
          ['Can the app support Odia and Telugu speaking users?', 'Yes. We build multilingual interfaces from the start: Odia, Hindi and English, plus Telugu if your buyers are across the border in Andhra Pradesh, with regional keyboards and fonts.'],
          ['How do you handle meetings when Berhampur is 170 km away?', 'Most work runs over video with fortnightly demos. We travel for discovery workshops and launch training, and the road and rail links make a same-day visit practical.']
        ]
      },
      ai: {
        angle: 'For Berhampur, AI is most useful where language and images are the bottleneck: reading regional-language documents, grading product quality from photos, and answering student or customer queries around the clock in Odia.',
        cases: [
          ['Odia, Hindi & English student and customer assistant', 'Answers admissions, fee, stock and order questions instantly from your own data and escalates the rest to staff.'],
          ['Fabric & product quality grading from photos', 'Grade weave quality, colour consistency or seafood freshness from phone photos, giving buyers consistent, documented grades.'],
          ['Record digitisation for clinics', 'Convert handwritten prescriptions and registers into structured records, with mandatory human review of every extracted field.']
        ],
        faqs: [
          ['Is AI affordable for a small Berhampur business?', 'A focused pilot on one workflow with one measurable outcome typically starts around ₹5 lakh. We agree the success metric up front so you can stop or scale based on results.'],
          ['Which AI tasks work well in regional languages today?', 'Speech-to-text and translation for Odia are usable for many tasks, while open-ended generation is weaker than in English. We test on your real content in the pilot and add human review where errors would be costly.']
        ]
      },
      software: {
        angle: 'Berhampur’s trading and textile businesses usually have strong relationships but weak systems: orders in notebooks and dues in memory. Custom software brings party ledgers, stock, dispatch and GST invoicing into one place, so growth does not depend on one person’s memory.',
        cases: [
          ['Textile & saree trade ERP', 'Party ledger, design-wise stock, order booking, dispatch and GST invoices for wholesalers and manufacturers.'],
          ['Hospital & diagnostic centre management', 'Registration, billing, lab reports, doctor schedules and insurance or TPA workflows in one system.'],
          ['Cold-chain & seafood export dispatch tracker', 'Lot tracking, temperature logs, export documentation and buyer-wise invoicing.']
        ],
        faqs: [
          ['Does the software handle GST, e-invoicing and e-way bills?', 'Yes. We integrate with GST-compliant invoicing and e-way bill APIs so invoices, returns data and dispatch documents all come from one entry.'],
          ['Can staff with limited computer experience use it?', 'That is a design requirement, not an afterthought. We prototype screens with your actual staff, keep workflows to a few taps, and support Odia labels where useful.']
        ]
      }
    }
  },

  {
    slug: 'sambalpur',
    name: 'Sambalpur',
    state: 'Odisha',
    region: 'odisha',
    lat: 21.4669,
    lng: 83.9812,
    eyebrow: 'Serving Sambalpur from Bhubaneswar',
    overview: 'Sambalpur, in western Odisha and about 320 km from Bhubaneswar, is known for Hirakud Dam, Sambalpuri handloom (ikat) and the Mahanadi Coalfields headquarters. Its economy blends mining and power, handloom and tourism, and a growing education and healthcare cluster around Burla.',
    areas: ['Burla', 'Ainthapali', 'Modipara', 'Dhanupali', 'Budharaja', 'Jyoti Vihar', 'Gole Bazaar', 'Hirakud'],
    sectors: [
      ['Mining, coal & power', 'Mahanadi Coalfields, power plants and a large contractor and transport ecosystem.'],
      ['Sambalpuri handloom', 'Ikat weavers, cooperatives and export-oriented handicraft businesses.'],
      ['Tourism & hospitality', 'Hirakud reservoir, Debrigarh and the Huma temple draw steady visitors.'],
      ['Education & healthcare', 'IIM Sambalpur, VSSUT Burla, Sambalpur University and VIMSAR anchor a large institutional base.']
    ],
    ecosystem: ['IIM Sambalpur', 'VSSUT Burla', 'VIMSAR', 'Sambalpur University', 'Mahanadi Coalfields Limited'],
    distance: 'Roughly 320 km from our Bhubaneswar base',
    delivery: 'Discovery workshops and rollout training can be held on site in Sambalpur. Because the trip is long, we batch visits around milestones and cover the rest by video with fortnightly demos, and travel costs are quoted up front instead of folded into rates.',
    costNote: 'Western Odisha buyers often assume a good product team means a metro agency. We deliver the same discovery-led process at Odisha costs, with phased releases that match your budget cycle.',
    services: {
      mobile: {
        angle: 'In western Odisha, handloom collectives, coal-belt contractors and tourism operators need mobile tools that work with patchy coverage and serve customers who are elsewhere. Sambalpur apps succeed when they are offline-capable and built around the customer’s or field worker’s actual routine.',
        cases: [
          ['Handloom marketplace & artisan collective app', 'Artisan profiles, per-piece stories, made-to-order flows and split payouts for cooperatives selling Sambalpuri ikat nationally.'],
          ['Field-service & contractor app', 'Job cards, attendance, material requests and photo proof of work for contractors serving mining and power operations.'],
          ['Tourism, homestay & guide booking', 'Bookings for boat rides, homestays and guides around Hirakud, Debrigarh and Huma, with local-language content and offline maps.']
        ],
        faqs: [
          ['Can you build an app for a handloom cooperative with many artisans?', 'Yes. A multi-vendor model with artisan profiles, made-to-order flows and split payouts suits cooperatives well. Our Make My Look platform onboarded 200+ vendors at launch using the same marketplace principles.'],
          ['Are site visits to Sambalpur included?', 'Discovery workshops and rollout training can be held on site. The trip is roughly 320 km each way, so we batch visits and use video for the rest, and quote travel costs transparently up front.']
        ]
      },
      ai: {
        angle: 'Sambalpur’s mix of mining, handloom, tourism and campuses gives AI several concrete jobs: reading coal and dispatch documents, recommending designs and pricing for handloom, and giving tourists or students instant multilingual answers.',
        cases: [
          ['Weighbridge & dispatch document reading', 'Extract vehicle, weight, grade and party details from slips and challans, and reconcile them automatically against orders.'],
          ['Handloom design & demand recommendations', 'Use sales history and seasonal patterns to suggest which designs, colours and quantities to produce next.'],
          ['Admissions & campus assistant', 'Answer admissions, fee and schedule queries in multiple languages for colleges and institutes, with escalation to staff.']
        ],
        faqs: [
          ['Do you build AI for institutions like colleges and hospitals?', 'Yes. Assistants for admissions, fee queries and internal knowledge search are common first builds. For anything touching student or patient data we design privacy controls and keep a human in the loop.'],
          ['How long does an AI pilot take?', 'Typically 4 to 8 weeks from scoping to a working pilot you can test on real data, with a go or no-go checkpoint at the end.']
        ]
      },
      software: {
        angle: 'Sambalpur organisations often run a mix of paper approvals and generic software that never matched their process. Custom systems for stores, contractor billing, admissions or membership can be shaped around how the office actually works.',
        cases: [
          ['Contractor, stores & vendor management', 'Indents, purchase, stores, contractor bills and vendor documents with approvals, for coal-belt and power-sector ancillaries.'],
          ['Institute admissions, fees & records portal', 'Online applications, fee collection, records, certificates and parent communication in one secure system.'],
          ['Handloom cooperative inventory & payment ledger', 'Artisan-wise production, stock, orders and payment settlement with simple mobile entry for members.']
        ],
        faqs: [
          ['Can you build software for a PSU-linked vendor?', 'Yes. We build role-based access, audit trails and data-retention rules into the system, which is typically what larger buyers audit. Share your customer’s vendor requirements early and we scope against them.'],
          ['Can the system run on our own server?', 'Yes. Cloud, private cloud and on-premise deployments are all options, and we recommend one based on your connectivity, security needs and budget.']
        ]
      }
    }
  }
];
