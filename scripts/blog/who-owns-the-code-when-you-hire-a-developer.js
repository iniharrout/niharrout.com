module.exports = {
  slug: "who-owns-the-code-when-you-hire-a-developer",
  title: "Who Owns the Code When You Hire a Developer?",
  headline: "Who Owns the Code When You Hire a Developer or Agency?",
  shortTitle: "Who owns the code",
  description: "Who owns the code when you hire a developer or agency: IP assignment, accounts, open source and handover, plus the clauses to check before you sign.",
  keywords: ["who owns the code", "software ip ownership", "source code ownership", "intellectual property software development contract", "do I own my app code"],
  category: "Hiring a Team",
  badge: "HIRING A TEAM",
  readMinutes: 8,
  published: "2026-11-26",
  icon: "doc",
  lead: "Paying for software does not always mean you own it. Whether you hire a freelancer, an agency or a team in another country, ownership of the code is decided by what you sign and where the code lives, not by who paid the invoice. Here is what I tell founders to check before the first line is written.",
  cardDesc: "Paying for software is not the same as owning it. What to check in the contract, the accounts and the handover so the code is really yours.",
  cta: { title: "Not sure what your contract says?", text: "Bring it to a free 30-minute call. I will point out the ownership gaps I see, even if you work with another team.", button: "Book a free 30-minute call" },
  endCta: { title: "Want code that sits in your accounts from day one?", text: "After a short call you get a clear written proposal within 24 hours, with ownership, accounts and handover written down.", service: { href: "/services/custom-software-development/software-consulting", label: "See software consulting" } },
  related: ["software-development-contract-checklist", "how-to-review-a-software-development-proposal", "switch-software-development-company-mid-project"],
  faq: [
    ["Do I automatically own the code if I pay a developer?", "Not necessarily. In many countries the person who writes code is its first owner unless they are your employee or a written agreement transfers it to you. With a freelancer or agency, make sure the contract assigns the intellectual property to your company in writing."],
    ["What is the difference between owning the code and having a licence to use it?", "Owning the code means you can change it, sell it, hire another team to work on it and stop paying the original developer. A licence only lets you use it on the terms given, which may limit changes, transfers or use after the contract ends."],
    ["Can a development company reuse parts of my code?", "Most teams reuse their own general tools and libraries, and that is normal. The contract should say that anything built specifically for your product belongs to you, and that any reused components come with a permanent licence for you to use and change them."],
    ["What should I get at the end of a project?", "Full source code in a repository you control, admin access to the cloud, domain and app store accounts, database access, deployment notes, environment setup steps and a list of third-party services and open source licences used."],
    ["Who owns the code when I work with Creuto?", "Your code lives in your own accounts from day one, so the repository, cloud and app store accounts are in your name throughout the project, not handed over at the end. Ownership terms are written into the proposal and contract before work begins."],
  ],
  body: `
<p>
  "My developer has stopped replying. Can I give the app to someone else?" The honest answer to that question is "it depends on what you signed and whose accounts the code is in". That is not an answer anyone wants to hear after the money is spent.
</p>
<p>
  Code ownership feels like a legal detail, so it gets skimmed. But it decides whether you can change teams, raise money, sell the business or simply fix a bug without asking permission. This guide covers the four things that make code truly yours: the contract, the accounts, third-party and open source parts, and the handover.
</p>

<div class="blog-callout">
  <h4>The short version</h4>
  <p>
    You own your software when three things are true: a signed agreement assigns the intellectual property to your company, the repository and accounts are in your name, and you can build and deploy the product without the original team. Check all three.
  </p>
</div>

<h2 id="default-rules">Why paying for code does not always mean owning it</h2>
<p>
  Software is protected by copyright, and copyright starts with the author. In many countries, including the US and India, the code an employee writes as part of their job belongs to the employer, but code written by an outside contractor does not automatically pass to the client. A written agreement has to transfer it.
</p>
<p>
  In the US, for example, work by an independent contractor only counts as a "work made for hire" in limited cases and with a signed agreement, which the <a href="https://www.copyright.gov/circs/circ09.pdf" target="_blank" rel="noopener">US Copyright Office circular on works made for hire</a> explains. <a href="https://www.wipo.int/copyright/en/" target="_blank" rel="noopener">WIPO's copyright overview</a> is a good general primer if you work across countries. The rules differ by country, so treat this guide as a checklist for questions, and have a lawyer in your own country review the final contract.
</p>
<p>
  The practical point is simple: if the contract is silent, you may have paid for a product you cannot freely change or move. This matters whether you hire a freelancer or an agency; our comparison of <a href="/blog/freelancer-vs-agency-for-app-development">freelancer vs agency for app development</a> covers the other differences.
</p>

<h2 id="contract-clauses">The clauses that decide ownership</h2>
<p>
  When you review a contract or proposal, look for these points. If one is missing, ask for it to be added before you sign.
</p>
<table>
  <thead>
    <tr><th>Clause</th><th>What it should say</th><th>Why it matters</th></tr>
  </thead>
  <tbody>
    <tr><td>IP assignment</td><td>All code, designs and documents made for your product are assigned to your company</td><td>Without it, the author may still own the code</td></tr>
    <tr><td>When ownership passes</td><td>The point at which rights transfer, for example as each milestone is paid</td><td>Avoids arguments about partly paid work</td></tr>
    <tr><td>Pre-existing tools</td><td>Any reused libraries or internal tools come with a permanent, transferable licence for you</td><td>You can keep using and changing them after the project</td></tr>
    <tr><td>Third-party and open source</td><td>A list of outside components and their licences is provided</td><td>Some licences carry conditions you must follow</td></tr>
    <tr><td>Subcontractors</td><td>Anyone the vendor brings in signs the same assignment terms</td><td>Closes the gap where a subcontractor owns a piece</td></tr>
    <tr><td>Confidentiality</td><td>Your code, data and business details stay private during and after the project</td><td>Protects your idea and your users</td></tr>
    <tr><td>Handover on exit</td><td>What you receive if the contract ends early, and how fast</td><td>Lets you switch teams without starting over</td></tr>
  </tbody>
</table>
<p>
  Our <a href="/blog/software-development-contract-checklist">software development contract checklist</a> covers the rest of the agreement, from payment terms to warranty. If you are still comparing quotes, the guide on <a href="/blog/how-to-review-a-software-development-proposal">how to review a software development proposal</a> shows where ownership should appear in a proposal.
</p>

{{cta}}

<h2 id="accounts">Paper ownership is not enough: whose accounts is it in?</h2>
<p>
  A contract can say you own the code, but if the repository, cloud server and app store listing all sit in the developer's personal accounts, you still depend on them to reach it. A good contract helps you win that argument, but it does not give you the keys on the day you need them.
</p>
<p>
  The fix is to set up the accounts in your company's name before work starts, and invite the team in:
</p>
<ul>
  <li><strong>Code repository</strong> (GitHub, GitLab or Bitbucket) owned by your organisation, with the team added as members.</li>
  <li><strong>Cloud hosting</strong> (AWS, Google Cloud, Azure or similar) billed to you, with access given to named people.</li>
  <li><strong>Apple App Store and Google Play</strong> developer accounts in your company's name, not the agency's.</li>
  <li><strong>Domain, email and DNS</strong> registered to you.</li>
  <li><strong>Third-party services</strong> such as payments, maps, SMS, analytics and AI APIs, signed up under your business so the keys and billing are yours.</li>
</ul>
<p>
  This also makes it easy to remove access when someone leaves. You simply revoke their invitation; nothing needs to be transferred.
</p>

<h2 id="open-source">Open source and reused code</h2>
<p>
  Almost every modern app uses open source libraries, and that is a good thing. It saves time and the popular ones are well tested. But each library has a licence, and a few licences come with conditions, such as sharing your own changes if you distribute the software.
</p>
<p>
  You do not need to read every licence yourself. Ask the team for a simple list of the main open source and paid components and their licences. The <a href="https://opensource.org/licenses" target="_blank" rel="noopener">Open Source Initiative's list of approved licences</a> is a useful reference if a name on the list is unfamiliar. Investors and buyers often ask for exactly this list during due diligence, so having it early saves a scramble later.
</p>
<p>
  Agencies also reuse their own starter code, such as login screens or admin panel templates. That is normal and keeps cost down. What matters is that the contract gives you a permanent right to use and change those parts as part of your product.
</p>

<h2 id="handover">What a proper handover includes</h2>
<p>
  Whether the project ends as planned or you decide to switch teams, you should be able to run the product without the people who built it. A handover should include:
</p>
<ul>
  <li>The full source code, including mobile apps, backend, admin panel and any scripts, in your repository.</li>
  <li>Admin access to every account listed above, with the old team's access removed.</li>
  <li>Database access and a recent backup.</li>
  <li>Setup and deployment notes, so a new developer can build and release the app.</li>
  <li>The list of environment settings and where secret keys are stored (not the keys pasted in an email).</li>
  <li>The list of third-party services and open source licences.</li>
</ul>
<p>
  A good test: ask a developer outside the original team to build and run the project from the repository using only the notes. If they cannot, the handover is not finished. If you are already in the middle of a difficult change, our guide on <a href="/blog/switch-software-development-company-mid-project">switching software development companies mid-project</a> walks through the steps.
</p>

<h2 id="red-flags">Red flags to watch for</h2>
<ul>
  <li>The vendor wants to keep the code in their own repository "for convenience" until the final payment.</li>
  <li>The contract talks about a "licence to use" rather than an assignment of ownership.</li>
  <li>App store or cloud accounts are created under the agency's name.</li>
  <li>No mention of subcontractors, or the vendor will not say who is doing the work.</li>
  <li>You are told the source code is "not included" in the price, or will cost extra at the end.</li>
</ul>
<p>
  Ownership terms rarely change the price of a fair project, but they change your options a great deal. If you want to understand what does drive cost, see our <a href="/project-costs">project costs page</a>.
</p>

<h2 id="creuto">How we handle ownership at Creuto</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> clients' code lives in their own accounts from day one. We set up or join your repository, cloud and app store accounts at the start, so there is nothing to hand back at the end and no point at which we hold your product. Ownership terms are written into the proposal, which you receive within 24 hours of a free 30-minute strategy call, and the first working version typically lands in about 4 weeks. Every launch also comes with a 60-day post-launch warranty.
</p>
<p>
  If you want a second opinion on a contract you already have, <a href="https://calendly.com/creuto/meet" target="_blank" rel="noopener">book a call</a> and bring it along.
</p>
`,
};
