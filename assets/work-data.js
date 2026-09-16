/**
 * Selected Work / Portfolio Data for niharrout.com
 * 
 * Contains verified real production projects engineered and led by Nihar Ranjan Rout & Creuto.
 * Edit this array to update project metadata, tags, or links.
 */

var portfolioProjects = [
  {
    title: "End-to-End Custom ERP for Manufacturing Operations",
    slug: "custom-erp-manufacturing",
    client: "Large-scale manufacturing enterprise (name under NDA)",
    industry: "Manufacturing / Enterprise Operations",
    tags: ["Enterprise", "ERP", "B2B"],
    description: "Replaced four disconnected departments with one real-time system of record.",
    challenge: "HR, sales, inventory, and finance were each running on their own fragmented tools with no shared data layer — every cross-team task meant manual reconciliation. Attendance was tracked by hand with no payroll link. Sales kept separate lead files. Inventory ran on outdated spreadsheets. Finance compiled reports manually. There were no role-based permissions, so sensitive data was visible to everyone — and leadership had no real-time view of the business.",
    decision: "Rather than patch each department's tool individually, we scoped a single PRD to unify HR, CRM/Sales, Inventory, and Finance on one platform with role-based dashboards from day one — then built it module by module in two-week sprints, with weekly touchpoints per department so nothing shipped that the actual users hadn't already validated.",
    result: "✓ 4 departments unified · 0 data silos · Monthly close cut to 1 day",
    thumbnail: "work/erp-manufacturing-card.jpg",
    video: null,
    link: "work/custom-erp-manufacturing.html"
  },
  {
    title: "Sky1 — End-to-End Wedding & Event Booking Platform",
    slug: "sky1-event-booking",
    client: "Sky1",
    industry: "Event Technology / Venue & Vendor Booking",
    tags: ["Consumer", "Marketplace", "Events", "Mobile"],
    description: "One app to book a venue and every vendor around it — no phone calls required.",
    challenge: "Planning a wedding meant hours spent across Instagram, Google, and word-of-mouth just to find vendors — with no way to compare pricing or availability without direct outreach. Every booking happened over phone calls or WhatsApp with verbal confirmations and no digital record; most vendors didn't publish rates at all, so hidden costs surfaced late. A single wedding could mean coordinating 8–12 separate vendors — venue, decorator, caterer, mehendi artist, makeup team, choreographer, photographer — and scheduling conflicts were often only discovered days before the event, because every change meant notifying every vendor individually.",
    decision: "The obvious build here would have been \"just another venue directory\" — we scoped for something harder but more valuable: one booking flow spanning the venue and every vendor category around it, with a shared real-time calendar and automatic conflict detection, so a couple could build and confirm their entire event in one checkout instead of a dozen separate conversations.",
    result: "✓ 8–12 vendors unified per event · 0 phone calls to book · 100% real-time availability",
    thumbnail: "work/sky1-card.jpg",
    video: null,
    link: "work/sky1-event-booking.html"
  },
  {
    title: "Make My Look — On-Demand Beauty & Salon Booking",
    slug: "make-my-look",
    client: "Make My Look",
    industry: "Beauty & Wellness",
    tags: ["Consumer", "Marketplace", "Mobile"],
    description: "Took an all-offline beauty industry online — for customers and salon owners alike.",
    challenge: "India's beauty industry was still running almost entirely offline. Customers had no centralized way to find salons, check real credentials, or confirm a booking — most transactions still happened over WhatsApp, phone calls, or walk-ins. Salon owners were in the same bind from the other side: bookings managed through WhatsApp groups, handwritten diaries, or whoever happened to be free to answer the phone — with no visibility into their own schedule and no digital presence to compete on.",
    decision: "Rather than build \"just another booking app,\" we scoped a true two-sided marketplace from day one — a consumer experience built for fast discovery and confirmed bookings, and a vendor dashboard simple enough for salon owners with zero technical background to run their whole business from, plus a super-admin layer so the platform itself could scale across cities without developer involvement on every operational decision.",
    result: "✓ 200+ vendors onboarded at launch · ✓ 40% fewer booking drop-offs · ✓ Live in 16 weeks",
    thumbnail: "work/mml-card.jpg",
    video: null,
    link: "work/make-my-look.html"
  },
  {
    title: "FlashNow — Quick Commerce Built on Local Shops",
    slug: "flashnow",
    client: "FlashNow",
    industry: "Quick Commerce / Hyperlocal Delivery",
    tags: ["Consumer", "Marketplace", "Mobile", "Logistics"],
    description: "10-15 minute delivery — powered by neighborhood stores instead of warehouses.",
    challenge: "By the time FlashNow started, Indian quick commerce had consolidated around a handful of well-funded players — and neighborhood kirana stores were being systematically shut out of it. Their customers were already ordering online; none of those orders were reaching them. Neither shoppers nor vendors had real-time visibility into what was in stock or where an order stood — inventory was tracked manually, and orders were handled over phone or WhatsApp with no structured workflow. Last-mile delivery was entirely ad hoc, with no dispatch system, route optimization, or way to track a delivery partner in real time.",
    decision: "Instead of building another centralized-warehouse quick-commerce app — the model the big players already owned — we scoped FlashNow around the opposite bet: give existing local shops the same real-time infrastructure the big players had, so demand could route through the neighborhood store that was already there instead of a new warehouse. Real-time was treated as a first-class engineering concern from day one, not a feature bolted on later — the goal was zero architecture rewrites after launch.",
    result: "✓ 10-15 min delivery · ✓ 4-role platform, zero centralized warehouses · ✓ Sub-2-minute checkout",
    thumbnail: "work/flashnow-card.jpg",
    video: null,
    link: "work/flashnow.html"
  },
  {
    title: "Skribe — Team Chat That Meets You Where You Already Are",
    slug: "skribe",
    client: "Skribe (skribe.app)",
    industry: "Enterprise Communication / B2B SaaS",
    tags: ["Enterprise", "B2B", "SaaS", "Communication"],
    description: "One chat layer for teams split across Slack-style channels, Google Chat, Google Workspace, and Microsoft 365.",
    challenge: "Most companies aren't actually on one communication tool anymore — one team lives on Google Chat, another runs on Microsoft 365, and getting a message across the org means either forcing everyone onto the same platform or watching messages fall through the cracks between tools no one wants to give up.",
    decision: "Rather than build another standalone team-chat app asking companies to migrate away from tools they'd already standardized on, Skribe was scoped as a connective layer: native team chat that also bridges into Google Chat, Google Workspace, and Microsoft 365 — so a message reaches people wherever they already are, instead of creating one more inbox for everyone to check. The product promise: \"Reach with clarity. Know what worked.\"",
    result: "✓ Connects native chat, Google Chat, Google Workspace & Microsoft 365 in one place",
    thumbnail: "work/skribe-card.jpg",
    video: null,
    link: "work/skribe.html"
  }
];

if (typeof window !== "undefined") {
  window.portfolioProjects = portfolioProjects;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { portfolioProjects: portfolioProjects };
}
