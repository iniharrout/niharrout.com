module.exports = {
  slug: "erp-data-migration-checklist",
  title: "ERP Data Migration: A Checklist Before You Go Live",
  headline: "ERP Data Migration Checklist: Moving Off Spreadsheets and Old Systems Without Losing Data",
  shortTitle: "ERP data migration",
  description: "Moving to a new ERP? This data migration checklist covers what to move, cleaning masters, opening balances, trial runs and the cutover weekend.",
  keywords: ["erp data migration", "erp data migration checklist", "data migration plan for erp", "migrating from spreadsheets to erp", "erp go live checklist"],
  category: "Enterprise ERP",
  badge: "ERP & OPERATIONS",
  readMinutes: 8,
  published: "2026-10-30",
  icon: "doc",
  imageAlt: "ERP data migration checklist for moving off spreadsheets and old systems",
  lead: "Most ERP projects that stumble at go-live do not stumble on features. They stumble on data: duplicate customers, item codes nobody can explain, stock that does not match the shelf and opening balances that do not tie to the books. This checklist is how I plan migration so the first day on the new system is boring, which is exactly what you want.",
  cardDesc: "What to move, how to clean customer, supplier and item masters, opening balances, trial loads and a calm cutover weekend for your new ERP.",
  cta: { title: "Planning a move to a new ERP?", text: "Book a free 30-minute call. Tell me where your data lives today and I will help you sketch what to move, what to clean and what to leave behind.", button: "Book a free 30-minute call" },
  endCta: { title: "Need an ERP built around your data and process?", text: "We build custom ERP systems and plan the migration with you, with your code and data in your own accounts from day one.", service: { href: "/services/custom-software-development/custom-erp-development", label: "See custom ERP development" } },
  related: ["custom-erp-vs-off-the-shelf-erp", "inventory-management-software-development", "legacy-software-modernization-guide"],
  faq: [
    ["How long does ERP data migration take?", "It depends on how many sources you have and how clean they are. Cleaning master data usually takes longer than the technical load itself, so start it in the first weeks of the project, not the last."],
    ["Should we move all our historical transactions to the new ERP?", "Usually not. Most businesses move clean masters, open documents and opening balances, and keep full history in the old system or a read-only archive for reference and audits."],
    ["Who should own data cleaning, us or the development team?", "Your team owns the decisions, such as which duplicate customer record is correct. The development team builds the scripts, reports and checks that make those decisions fast and repeatable."],
    ["What is a trial migration?", "A full practice load of your real data into a test copy of the new ERP. You run it at least twice before go-live and check totals, counts and sample records against the old system each time."],
    ["What happens if something is wrong after go-live?", "With a tested rollback plan and a short freeze period, small fixes are corrected in the new system. That is why reconciliation reports and a clear sign-off before cutover matter so much."],
  ],
  body: `
<p>
  When a business moves to a new ERP, the software gets most of the attention: screens, workflows, approvals, reports. The data gets a line in the plan that says "migration" and a date close to go-live. That is the wrong way round. If customers, items, stock and balances arrive in the new system wrong, nobody trusts it, and people quietly go back to their spreadsheets.
</p>
<p>
  Below is the checklist we at Creuto use when we plan an ERP migration, whether the data is coming from spreadsheets, an accounting package or an older system that has been patched for years.
</p>

<div class="blog-callout">
  <h4>The rule I follow</h4>
  <p>
    Migrate clean masters and opening positions, not years of mess. Old history can stay readable in an archive. The new ERP should start from data that your own team has checked and signed off.
  </p>
</div>

<h2 id="inventory">1. List every source of data</h2>
<p>
  Before anyone writes a script, write down where the data lives today. In most growing businesses it is spread far wider than people expect.
</p>
<ul>
  <li>The accounting package and its ledgers.</li>
  <li>Spreadsheets for stock, pricing, production plans and dispatch.</li>
  <li>An older ERP, billing tool or custom database.</li>
  <li>CRM or sales tools holding customer contacts and open quotes.</li>
  <li>Paper or shared drives for bills of materials, contracts and approvals.</li>
</ul>
<p>
  For each source, note who owns it, how often it changes and whether it is the "true" copy. When two sources disagree, someone has to decide which one wins, and that decision is far easier to make now than during the cutover weekend.
</p>

<h2 id="scope">2. Decide what to move and what to leave behind</h2>
<p>
  Not everything deserves a place in the new system. A simple split keeps the project focused.
</p>
<table>
  <thead><tr><th>Data type</th><th>Examples</th><th>Usual decision</th></tr></thead>
  <tbody>
    <tr><td>Master data</td><td>Customers, suppliers, items, bills of materials, chart of accounts, price lists</td><td>Move, after cleaning</td></tr>
    <tr><td>Open documents</td><td>Unpaid invoices, open purchase orders, pending sales orders, work in progress</td><td>Move, as of the cutover date</td></tr>
    <tr><td>Opening balances</td><td>Stock on hand by location, ledger balances, receivables, payables</td><td>Move, reconciled to the books</td></tr>
    <tr><td>Closed history</td><td>Old invoices, completed orders, past years of transactions</td><td>Archive, keep readable</td></tr>
    <tr><td>Dead records</td><td>Inactive items, duplicate customers, suppliers you no longer use</td><td>Leave behind or mark inactive</td></tr>
  </tbody>
</table>
<p>
  Check with your accountant before you archive anything. Tax and audit rules decide how long records must be kept and in what form, so the archive has to be easy to search, not just a folder of exports.
</p>

<h2 id="clean">3. Clean the master data first</h2>
<p>
  This is where most of the effort goes, and it is work your team has to own. The development team can build reports that surface problems, but only the people who run the business can say which record is right.
</p>
<ul>
  <li><strong>Customers and suppliers:</strong> merge duplicates, fix spellings, confirm addresses and payment terms. In India, check GSTINs against the <a href="https://services.gst.gov.in/services/searchtp" target="_blank" rel="noopener">GST portal taxpayer search</a> so invoices do not bounce later.</li>
  <li><strong>Items:</strong> one code, one name and one base unit per item. Agree how variants, sizes and packs are coded before loading anything.</li>
  <li><strong>Bills of materials:</strong> confirm quantities and units with the production team, not from an old file.</li>
  <li><strong>Chart of accounts:</strong> map old ledgers to the new structure with your accountant, line by line.</li>
</ul>
<p>
  Set simple rules and write them down: mandatory fields, naming formats, allowed units. Those rules become validation checks in the new ERP so the data stays clean after go-live.
</p>

{{cta}}

<h2 id="map">4. Map fields and build repeatable loads</h2>
<p>
  For every table you move, create a mapping sheet: the source field, the target field, any conversion, and what happens when a value is missing. Then build the migration as scripts that can run again and again, not as a one-time copy and paste. You will run them several times, and each run should give the same result from the same input.
</p>
<p>
  If the old system is being retired, this is also the moment to plan how it will be switched off. Our <a href="/blog/legacy-software-modernization-guide">legacy software modernisation guide</a> covers that side in more detail.
</p>

<h2 id="trial">5. Run at least two trial migrations</h2>
<p>
  A trial migration is a full load of real data into a test copy of the new ERP. Treat it like a rehearsal.
</p>
<ol>
  <li>Load everything in the agreed order: masters, then open documents, then balances.</li>
  <li>Compare record counts between old and new for every table.</li>
  <li>Compare totals: stock value, receivables, payables and ledger balances.</li>
  <li>Spot check real records with the people who use them, such as a sales rep checking their top customers.</li>
  <li>Log every error, fix it at the source or in the script, and run again.</li>
</ol>
<p>
  The second trial should be close to clean. If it is not, run a third before setting a go-live date.
</p>

<h2 id="privacy">6. Protect personal and sensitive data</h2>
<p>
  Migration files are full of names, phone numbers, bank details and salaries. Keep them in a restricted location, share them only with the people who need them, and delete working copies once the migration is signed off. If you hold personal data of people in India, the <a href="https://www.meity.gov.in/data-protection-framework" target="_blank" rel="noopener">Digital Personal Data Protection framework from MeitY</a> applies; our <a href="/blog/dpdp-act-guide-for-app-founders">DPDP Act guide</a> explains what that means in practice.
</p>

<h2 id="cutover">7. Plan the cutover weekend</h2>
<table>
  <thead><tr><th>When</th><th>What happens</th></tr></thead>
  <tbody>
    <tr><td>Two weeks before</td><td>Freeze changes to master data in the old system; any new customer or item is logged for the final load</td></tr>
    <tr><td>Last working day</td><td>Close the day in the old system, take a full stock count, record final balances</td></tr>
    <tr><td>Cutover</td><td>Run the final load with the tested scripts, then the reconciliation reports</td></tr>
    <tr><td>Sign-off</td><td>Finance, stores and sales heads confirm totals and samples before anyone starts transacting</td></tr>
    <tr><td>First weeks</td><td>Old system stays read-only; a daily check catches differences early</td></tr>
  </tbody>
</table>
<p>
  Write down a rollback plan too: what would make you stay on the old system for another week, and who makes that call. You will probably not need it, but having it keeps the weekend calm.
</p>

<h2 id="mistakes">Common mistakes to avoid</h2>
<ul>
  <li>Leaving data cleaning until the last month of the project.</li>
  <li>Moving every historical transaction "just in case".</li>
  <li>Doing the final load by hand instead of with tested scripts.</li>
  <li>Skipping the physical stock count and trusting the spreadsheet.</li>
  <li>Going live without a written sign-off from finance.</li>
</ul>

<h2 id="creuto">How we handle migration at Creuto</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a>, migration is part of the ERP plan from the first week, not a task at the end. You can see the kind of system we build in our <a href="/work/custom-erp-manufacturing">custom ERP for manufacturing</a> case study, which brings inventory, purchasing and production into one real-time system. If you are still deciding between building and buying, read <a href="/blog/custom-erp-vs-off-the-shelf-erp">custom vs off-the-shelf ERP</a>. For budgets, see <a href="/project-costs/enterprise-erp">the cost to build an enterprise ERP</a> or try the <a href="/tools/app-cost-calculator">app cost calculator</a>.
</p>
`,
};
