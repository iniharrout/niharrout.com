/**
 * Selected Work / Portfolio Data for niharrout.com
 * 
 * Each project entry supports:
 * - title:       Display name of the product or project
 * - client:      Client name (or generic/confidential description)
 * - tags:        Array of category tags used for filtering (e.g. "AI/SaaS", "B2B", "Mobile", "Product Strategy", "Web App")
 * - description: Concise one-line overview of the product
 * - challenge:   Original business/operational bottleneck or problem statement
 * - decision:    Strategic product & engineering solution implemented
 * - result:      Measurable outcome, metrics, and timeline
 * - thumbnail:   Image or SVG thumbnail path (displayed at rest)
 * - video:       Optional hover video URL/path (null if none; autoplayed muted & looped on desktop hover)
 * - link:        Optional case study or live URL (null if confidential/no external page)
 */

var portfolioProjects = [
  {
    title: "Enterprise Operational Workflow Suite",
    client: "Confidential Enterprise Client",
    tags: ["B2B", "Product Strategy"],
    description: "Unified 12+ fragmented operational spreadsheets into a centralized, modular workflow dashboard.",
    challenge: "Client had fragmented operations across 12+ manual spreadsheets, causing 30+ hours of weekly administrative bottlenecks.",
    decision: "Rather than building 14 separate tools, we unified core operations into a single modular workflow dashboard with automated status triggers.",
    result: "70% operational latency reduction · Shipped in 8 weeks",
    thumbnail: "assets/work/enterprise-workflow.svg",
    // video: "assets/work/enterprise-workflow.mp4", // Optional: path to .mp4 / .webm video
    video: null,
    link: null
  },
  {
    title: "Customer Intelligence & Search Engine",
    client: "AI Venture / Early-Stage Startup",
    tags: ["AI/SaaS", "Product Strategy"],
    description: "High-accuracy Vector RAG pipeline with semantic caching replacing an expensive custom LLM fine-tune.",
    challenge: "Founder wanted a custom LLM fine-tune that would have cost $40k+ to train and maintain with high latency.",
    decision: "Architected a hybrid Vector RAG pipeline with semantic caching, delivering 99.4% factual accuracy at 85% lower token cost.",
    result: "Sub-second latency · MVP delivered in 4 weeks",
    thumbnail: "assets/work/customer-intelligence.svg",
    // video: "assets/work/customer-intelligence.mp4",
    video: null,
    link: null
  },
  {
    title: "Multi-Platform Consumer & Fleet App",
    client: "Urban Mobility Startup",
    tags: ["Mobile", "B2B"],
    description: "Cross-platform iOS and Android mobile app with live fleet tracking built on a single unified Flutter codebase.",
    challenge: "Startup needed native iOS and Android apps with real-time GPS tracking under a strict launch budget.",
    decision: "Engineered a unified Flutter codebase with Clean Architecture, cutting development and QA costs by 45%.",
    result: "4.9★ App Store rating · 25k+ active quarterly users",
    thumbnail: "assets/work/fleet-app.svg",
    // video: "assets/work/fleet-app.mp4",
    video: null,
    link: null
  },
  // TODO: replace with real project
  {
    title: "Next-Gen Fintech Wealth Management",
    client: "Confidential WealthTech",
    tags: ["Product Strategy", "B2B"],
    description: "0-to-1 PRD scoping, regulatory architecture, and modular MVP design for modern wealth managers.",
    challenge: "Early-stage fintech needed clear feature prioritization and regulatory compliance roadmap before writing code.",
    decision: "Defined core value proposition, phased PRD milestones, and high-fidelity prototype validating product-market fit.",
    result: "Target: MVP launch within 10 weeks · Full PRD approved",
    thumbnail: "assets/work/fintech-wealth.svg",
    // video: "assets/work/fintech-wealth.mp4",
    video: null,
    link: null
  },
  // TODO: replace with real project
  {
    title: "Collaborative Design Systems Platform",
    client: "Enterprise SaaS",
    tags: ["Web App", "AI/SaaS", "B2B"],
    description: "High-performance collaborative web application for distributed UI engineering and token management.",
    challenge: "Design and engineering teams suffered from unsynchronized component libraries across multiple repositories.",
    decision: "Engineered an automated token sync pipeline with WebSockets real-time canvas collaboration.",
    result: "Target: 50% faster design-to-production handoff",
    thumbnail: "assets/work/design-systems.svg",
    // video: "assets/work/design-systems.mp4",
    video: null,
    link: null
  }
];

// Support both browser script tags and module environments
if (typeof window !== "undefined") {
  window.portfolioProjects = portfolioProjects;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { portfolioProjects: portfolioProjects };
}
