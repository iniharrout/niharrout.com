module.exports = {
  slug: "erp-requirements-checklist",
  title: "ERP Requirements Checklist: What to Define Before You Build",
  headline: "ERP Requirements Checklist: What to Write Down Before You Talk to an ERP Vendor or Developer",
  shortTitle: "ERP requirements checklist",
  description: "An ERP requirements checklist for business owners: processes, modules, roles, reports, integrations, data and compliance to define before you get quotes.",
  keywords: ["erp requirements checklist", "erp requirements", "erp requirements document", "erp system requirements", "custom erp requirements", "erp requirements gathering"],
  category: "Enterprise ERP",
  badge: "ERP & OPERATIONS",
  readMinutes: 8,
  published: "2026-11-22",
  icon: "doc",
  imageAlt: "ERP requirements checklist covering processes, modules, user roles, reports, integrations and data",
  lead: "Most ERP quotes go wrong before anyone writes a line of code, because the business never wrote down what it actually needs. This checklist walks through the requirements I ask every business owner to define before we talk about modules or budgets: processes, roles, reports, integrations, data and compliance. Fill it in and every vendor or developer you speak to will be quoting the same thing.",
  cardDesc: "The requirements to define before you get ERP quotes: processes, modules, user roles, approvals, reports, integrations, data, compliance and go-live priorities.",
  cta: { title: "Want help turning your notes into ERP requirements?", text: "Book a free 30-minute call. Walk me through how orders, stock and accounts flow today and I will help you shape the requirements and pick the first module.", button: "Book a free 30-minute call" },
  endCta: { title: "Ready to build an ERP that fits how you work?", text: "We build custom ERP systems one module at a time, with a first working version in about 4 weeks and your code in your own accounts from day one.", service: { href: "/services/custom-software-development/custom-erp-development", label: "See custom ERP development" } },
  related: ["erp-implementation-timeline", "erp-data-migration-checklist", "custom-erp-vs-off-the-shelf-erp"],
  faq: [
    ["What should an ERP requirements document include?", "Your business goals, the processes the ERP must run end to end, the modules in scope, user roles and approval rules, the reports each team needs, every system it must connect to, the data you will move across, compliance needs such as GST, and which module should go live first."],
    ["Who should write the ERP requirements?", "The business should own them, with one decision-maker per department. Your development partner can run workshops and write them up, but the people who handle orders, stock, purchase and accounts every day must review and approve what is written."],
    ["How detailed should ERP requirements be before getting quotes?", "Detailed enough that two vendors would quote the same scope. You do not need screen designs, but you do need the processes, roles, reports, integrations and data volumes. Missing detail turns into assumptions, and assumptions turn into change requests later."],
    ["What is the difference between functional and non-functional ERP requirements?", "Functional requirements describe what the ERP does, such as raising a purchase order or posting a GST invoice. Non-functional requirements describe how well it does it, such as speed, uptime, security, backups and how many users work at once."],
    ["Should we list every feature we might ever need?", "No. Mark each requirement as must-have for go-live, needed later or nice to have. A shorter must-have list gets the first module live sooner, and real use will tell you which of the later items matter."],
  ],
  body: `
<p>
  When a business owner tells me they need an ERP, the next thing I ask is what it should do on day one. The answers are usually honest and vague: "manage inventory", "connect everything", "stop the spreadsheets". Those are good reasons to start, but they are not requirements. Give three vendors a brief like that and you will get three quotes for three different systems.
</p>
<p>
  This is the checklist we at Creuto use to turn those reasons into requirements a developer can estimate and build. It works whether you end up buying a packaged ERP or having one built for you.
</p>

<div class="blog-callout">
  <h4>The short version</h4>
  <p>
    Before you ask for quotes, write down your goals, the processes the ERP must run, the modules in scope, who does what, the reports you need, every system it must connect to, the data you will move and what has to go live first. Mark each item as must-have, later or nice to have.
  </p>
</div>

<p>
  <strong>Free tool:</strong> the <a href="/tools/software-rfp-generator">software RFP generator</a> turns a few answers into a request for proposal you can copy or download.
</p>

<h2 id="goals">1. Business goals and the problem you are solving</h2>
<p>
  Start with why, in plain words. An ERP that exists to cut stock-outs is designed differently from one that exists to close the books faster. Write three to five goals and how you would know each one is met.
</p>
<ul>
  <li>What is going wrong today, and where does it cost you time or money?</li>
  <li>Which decisions do you struggle to make because the numbers are late or unreliable?</li>
  <li>What would a good first year with the new system look like?</li>
</ul>
<p>
  If you are not yet sure an ERP is the right answer, our guide on <a href="/blog/what-is-erp">what ERP is and when a business needs one</a> is a useful starting point.
</p>

<h2 id="processes">2. Processes the ERP must run end to end</h2>
<p>
  Requirements built around processes age far better than requirements built around screens. For each process, write who starts it, the steps, who approves, and what document or record comes out at the end.
</p>
<table>
  <thead><tr><th>Process</th><th>Questions to answer</th></tr></thead>
  <tbody>
    <tr><td>Order to cash</td><td>How do orders arrive? Who confirms stock and price? How are invoices, dispatch and payments recorded?</td></tr>
    <tr><td>Procure to pay</td><td>Who raises purchase requests? What are the approval limits? How are goods received and supplier bills matched?</td></tr>
    <tr><td>Inventory</td><td>How many warehouses or locations? Batches, serial numbers or expiry dates? How are transfers and stock counts done?</td></tr>
    <tr><td>Production</td><td>Bills of materials, work orders, scrap and job work? How is actual cost tracked against planned cost?</td></tr>
    <tr><td>Finance</td><td>Which accounting package stays, if any? Cost centres, branches, multiple companies or currencies?</td></tr>
    <tr><td>People</td><td>Is attendance, payroll or field staff tracking in scope now, later or never?</td></tr>
  </tbody>
</table>
<p>
  Sit with the people who do this work every day, not only managers. The workarounds they use, the extra spreadsheet and the WhatsApp group for approvals, are often the most important requirements of all.
</p>

<h2 id="modules">3. Modules in scope and the go-live order</h2>
<p>
  List the modules you need and put them in order. Most growing businesses get more value from one module live and working than from six modules half-finished. Choose the first module by pain, usually inventory or order management, and plan the rest around it.
</p>
<p>
  Mark every module and feature with one of three labels: <strong>must-have for go-live</strong>, <strong>needed later</strong> or <strong>nice to have</strong>. This single step does more to control cost and time than anything else on this list. Our guide on <a href="/blog/erp-implementation-timeline">ERP implementation timelines</a> shows how a staged rollout works in practice.
</p>

<h2 id="roles">4. Users, roles and approvals</h2>
<p>
  Write down who will use the system and what each role may see and do. Count users per role and per location, because this drives licensing for packaged ERP and design for a custom one.
</p>
<ul>
  <li>Roles such as owner, accounts, stores, purchase, sales, production supervisor and auditor.</li>
  <li>What each role can create, edit, approve, delete and export.</li>
  <li>Approval rules with limits, for example purchase orders above a set value going to a second approver.</li>
  <li>Who works on a phone or tablet on the shop floor, in the field or at a warehouse.</li>
</ul>

{{cta}}

<h2 id="reports">5. Reports and dashboards</h2>
<p>
  Reports are where an ERP earns its keep, and they are the requirement owners most often leave until last. Collect the reports you use today, the ones you wish you had, and who reads each one and how often. A stock ageing report, daily sales by branch and a purchase versus budget view are common starting points. If a report needs data the ERP does not capture, you have found a missing requirement.
</p>

<h2 id="integrations">6. Integrations with other systems</h2>
<p>
  List every system the ERP must talk to, even the small ones. Each integration adds design, testing and sign-off, and an unlisted integration is one of the most common reasons ERP projects run late.
</p>
<ul>
  <li>Accounting software, if it stays in place.</li>
  <li>GST e-invoicing and e-way bills through the <a href="https://einvoice1.gst.gov.in/" target="_blank" rel="noopener">official e-invoice portal</a>.</li>
  <li>Online store, marketplace or B2B ordering portal.</li>
  <li>Payment gateway, bank statements and payroll.</li>
  <li>Barcode scanners, weighing scales or machines on the shop floor.</li>
  <li>Your <a href="/services/custom-software-development/crm-development">CRM</a>, if sales and customer history live there.</li>
</ul>
<p>
  For each one, note which direction data flows, how often, and who owns that system today.
</p>

<h2 id="data">7. Data you will move across</h2>
<p>
  Describe your data before anyone estimates the migration. Which masters move (customers, suppliers, items, bills of materials, opening stock and balances), how many records, where they live today and how clean they are. Decide how much history you need: open transactions only, the current financial year or several years.
</p>
<p>
  Personal data about customers and staff needs care at this stage too. The <a href="https://www.meity.gov.in/data-protection-framework" target="_blank" rel="noopener">MeitY data protection framework</a> sets out India's rules, and our <a href="/blog/erp-data-migration-checklist">ERP data migration checklist</a> covers cleaning, mapping and trial loads step by step.
</p>

<h2 id="non-functional">8. Non-functional requirements</h2>
<p>
  These describe how well the ERP must work rather than what it does, and they shape the architecture and hosting. Write down how many people use it at once, how fast key screens must load, what happens if the internet drops at a branch, how often data is backed up, who can access it from outside the office and how long records must be kept. Our <a href="/blog/non-functional-requirements-checklist">non-functional requirements checklist</a> has the full list of questions.
</p>

<h2 id="checklist">The ERP requirements checklist</h2>
<p>
  Before you send a brief to any vendor or developer, check that you can answer each of these:
</p>
<ol>
  <li>Three to five business goals and how you will measure them.</li>
  <li>Each core process written as steps, owners, approvals and outputs.</li>
  <li>Modules in scope, each marked must-have, later or nice to have.</li>
  <li>The first module to go live and the order of the rest.</li>
  <li>User roles, counts per role and location, and approval limits.</li>
  <li>The reports and dashboards each team needs, and how often.</li>
  <li>Every integration, with data direction and frequency.</li>
  <li>Data to migrate, record counts, history needed and current quality.</li>
  <li>Compliance needs such as GST, e-invoicing and data protection.</li>
  <li>Non-functional needs: users at once, speed, backups, access and retention.</li>
  <li>One named decision-maker per department.</li>
  <li>A target go-live window away from peak season and year-end.</li>
</ol>

<h2 id="mistakes">Common mistakes when writing ERP requirements</h2>
<ul>
  <li><strong>Copying a vendor's feature list.</strong> It describes their product, not your business.</li>
  <li><strong>Describing today's workarounds as requirements.</strong> Ask why each step exists before you ask the ERP to repeat it.</li>
  <li><strong>Leaving reports until the end.</strong> They decide what data must be captured from day one.</li>
  <li><strong>No owner per department.</strong> Open decisions become delays during the build. Our guide on <a href="/blog/scope-creep-in-software-projects">scope creep</a> explains how unmanaged changes grow cost.</li>
  <li><strong>Treating requirements as fixed forever.</strong> They should be clear enough to estimate and flexible enough to improve once people use the first module.</li>
</ul>
<p>
  If you are still deciding between a packaged system and one built around these requirements, read <a href="/blog/custom-erp-vs-off-the-shelf-erp">custom vs off-the-shelf ERP</a> next.
</p>

<h2 id="creuto">How we turn requirements into a working ERP at Creuto</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a>, we start with a free 30-minute strategy call where we go through this checklist with you, and you get a clear written proposal within 24 hours showing the modules, the go-live order and what the first version includes. We aim for a first working version in about 4 weeks, so your team reacts to real screens rather than documents, and a 60-day post-launch warranty covers fixes after each go-live. You can see the kind of system we build in our <a href="/work/custom-erp-manufacturing">custom ERP for manufacturing</a> case study. For budgets, see <a href="/project-costs/enterprise-erp">the cost to build an enterprise ERP</a> or try the <a href="/tools/app-cost-calculator">app cost calculator</a>.
</p>
`,
};
