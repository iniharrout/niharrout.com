module.exports = {
  slug: 'switch-software-development-company-mid-project',
  title: 'How to Switch Software Development Companies Mid-Project',
  headline: 'How to Switch Software Development Companies Mid-Project Without Losing Your Product',
  shortTitle: 'Switching Dev Companies',
  description: 'Thinking of switching software development companies mid-project? A step-by-step plan to recover your code, accounts and data, then hand over safely.',
  keywords: ['switch software development company', 'change app development agency mid-project', 'replace software vendor', 'take over existing software project', 'software project handover checklist'],
  category: 'Hiring a Team',
  badge: 'HIRING A SOFTWARE TEAM',
  readMinutes: 8,
  published: '2026-11-07',
  icon: 'check',
  lead: 'Deadlines keep slipping, updates have gone quiet and every new build breaks something that used to work. At some point the question stops being whether to fix the relationship and becomes how to leave it without losing months of work. Here is the order I would do it in, so your product survives the move.',
  cardDesc: 'Signs it is time to change development partners, how to recover code and accounts first, and a handover checklist for the new team.',
  cta: { title: 'Not sure whether to stay or switch?', text: 'Book a free 30-minute call. Tell me what is going wrong and I will help you work out whether the project can be fixed where it is or needs a new team.', button: 'Book a free 30-minute call' },
  endCta: { title: 'Need a team to take over your project?', text: 'After a short call you get a clear written proposal within 24 hours, starting with a code review and a handover plan, so you know what you have before any new work begins.', service: { href: '/services/custom-software-development/software-consulting', label: 'See software consulting' } },
  related: ['how-to-choose-a-software-development-company', 'software-development-contract-checklist', 'mistakes-founders-make-hiring-software-company'],
  faq: [
    ['Can I switch software development companies in the middle of a project?', 'Yes. It happens more often than most founders think. The move is safe when you first secure access to your code repository, hosting, app store accounts, domains and data, and only then give notice. The new team should review the code before committing to a timeline.'],
    ['Who owns the code if I change development agencies?', 'That depends on your contract. Most agreements transfer ownership of the code to the client, sometimes only after payment for that work. Read the intellectual property and termination clauses before you act, and settle any undisputed invoices so ownership is not held up.'],
    ['Should the new team rewrite the app from scratch?', 'Not by default. A rewrite throws away working features and restarts the clock. A good new team reviews the code first and then recommends keeping, fixing or replacing each part. A full rewrite only makes sense when the code is so fragile that fixing it costs more than starting again.'],
    ['How long does a handover to a new development team take?', 'It depends on the size of the product and how well it is documented. The access and code review steps usually take days, not months. The bigger time cost is the new team learning the business rules, which goes faster if you have a PRD or can walk them through the main workflows.'],
    ['What should I ask the outgoing team for?', 'Ask for repository access with full history, admin access to hosting and cloud accounts, app store and domain ownership, database exports, credentials for third-party services, any documentation and design files, and a list of known bugs and work in progress.'],
  ],
  body: `
<p>
  Most founders who ask me about switching development companies have already waited too long. They hoped the next sprint would be better, then the next one. By the time they decide to move, they are frustrated, behind schedule and worried that leaving will mean starting over.
</p>
<p>
  It rarely does. A project can change hands mid-build and keep most of its value, as long as you do things in the right order. The mistake I see is giving notice first and asking for access later. This guide covers how to tell whether you should switch, what to secure before you say anything, and how to hand over to a new team cleanly.
</p>

<div class="blog-callout">
  <h4>The rule</h4>
  <p>
    Secure access before you give notice. Code, hosting, app store accounts, domains and data should all sit in accounts you control. Once they do, switching is a business decision. Until they do, it is a negotiation.
  </p>
</div>

<h2 id="signs-it-is-time">Signs it is time to switch</h2>
<p>
  Every project has a bad week. These are the patterns that suggest the problem is the partnership, not the week:
</p>
<ul>
  <li><strong>You cannot see working software.</strong> Updates are status reports and promises, not builds you can open and test.</li>
  <li><strong>Deadlines move without explanation.</strong> Delays happen, but a good team tells you early and says why.</li>
  <li><strong>Fixed bugs come back.</strong> Repeated regressions point to missing tests and rushed code.</li>
  <li><strong>The people keep changing.</strong> The developer you met in week one is gone, and nobody can explain earlier decisions.</li>
  <li><strong>You do not have access.</strong> The code, servers or store listings sit in the agency's accounts and requests for access get delayed.</li>
  <li><strong>Every change becomes a new quote.</strong> Small adjustments arrive with large estimates and no breakdown.</li>
</ul>
<p>
  Before deciding, have one direct conversation. Write down what is going wrong, what you need to change and by when. Some teams recover once the problem is named. If nothing changes after that, you have your answer, and a written record that will help if the exit becomes difficult.
</p>

<h2 id="secure-access-first">Step 1: Secure access before you give notice</h2>
<p>
  This is the step that decides how painful the switch will be. Go through this list quietly and make sure you hold owner or admin rights to each item, not just a login someone shared with you:
</p>
<table>
  <thead>
    <tr><th>Asset</th><th>What you need</th><th>Why it matters</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Code repository</strong></td><td>Owner access on GitHub, GitLab or Bitbucket, with full commit history</td><td>History shows what changed and why; a zip file does not</td></tr>
    <tr><td><strong>Hosting and cloud</strong></td><td>Admin on AWS, Google Cloud, Azure or the hosting provider, with billing in your name</td><td>Whoever pays the bill controls the servers</td></tr>
    <tr><td><strong>App store accounts</strong></td><td>Apple Developer and Google Play accounts owned by your company</td><td>Moving an app between accounts later is slower and has conditions</td></tr>
    <tr><td><strong>Domains and DNS</strong></td><td>Registrar account in your name</td><td>Losing the domain means losing email and the website</td></tr>
    <tr><td><strong>Database and files</strong></td><td>A recent export you have tested, plus admin access</td><td>Your customers' data is the hardest thing to recreate</td></tr>
    <tr><td><strong>Third-party services</strong></td><td>Payment gateway, email, SMS, maps, analytics and AI provider accounts</td><td>Keys stored only in the agency's accounts stop working when they leave</td></tr>
    <tr><td><strong>Design files</strong></td><td>Edit access to Figma or the design tool in use</td><td>The new team needs the source, not screenshots</td></tr>
  </tbody>
</table>
<p>
  If the repository sits in the agency's organisation, ask them to move it to yours. GitHub explains how <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository" target="_blank" rel="noopener">repository transfers</a> work, and the history comes with it. If your app was published under their developer account, read Apple's guide to <a href="https://developer.apple.com/help/app-store-connect/transfer-an-app/overview-of-app-transfer" target="_blank" rel="noopener">transferring an app</a> and Google's steps for <a href="https://support.google.com/googleplay/android-developer/answer/6230247" target="_blank" rel="noopener">moving apps between Play accounts</a> early, because both have conditions that take time to meet.
</p>

<h2 id="check-the-contract">Step 2: Read the contract and settle what you owe</h2>
<p>
  Look for three clauses: who owns the code and when ownership passes, how either side can end the agreement, and what the agency must hand over on exit. Many contracts transfer the code only once the related work is paid for. If an invoice is genuinely owed, paying it is usually cheaper than a dispute that holds your product hostage.
</p>
<p>
  If the contract is silent on handover, that is worth knowing now. It also tells you what to fix in the next one. Our <a href="/blog/software-development-contract-checklist">software development contract checklist</a> lists the clauses that make a future exit simple.
</p>

{{cta}}

<h2 id="get-a-code-review">Step 3: Get an independent code review</h2>
<p>
  Before a new team quotes for the remaining work, they need to know what they are inheriting. A short review should answer a few plain questions:
</p>
<ol>
  <li>Does the project build and run from the repository, with steps someone else can follow?</li>
  <li>Which features work, which are half done, and which only work on the old team's machines?</li>
  <li>Are there automated tests, and do they pass?</li>
  <li>Are passwords or API keys written into the code where they should not be?</li>
  <li>Is the structure sound enough to keep building on, or are there parts that need replacing?</li>
</ol>
<p>
  The answer shapes everything else. A team that quotes the rest of your project without reading the code is guessing. If the codebase turns out to be old or tangled, our guide to <a href="/blog/legacy-software-modernization-guide">modernising legacy software</a> explains how to replace it in stages rather than all at once.
</p>

<h2 id="keep-or-rewrite">Step 4: Decide what to keep, fix or rebuild</h2>
<p>
  New teams are often tempted to say everything must be rewritten. Sometimes that is true. More often, the data model and core logic are usable, and the problems sit in a few areas such as the payment flow, the admin panel or how the app talks to the server.
</p>
<p>
  Ask for a recommendation per module, not one verdict for the whole product. Keep what works, fix what is close, and rebuild only what costs more to repair than to replace. Then reset the plan: write down the remaining scope, the milestones and the assumptions, as you would for a new project. If you never had a written spec, now is the time to <a href="/blog/what-is-a-prd-how-to-write-a-product-requirements-document">write a PRD</a>, because the gaps in it are often why the first engagement went wrong.
</p>
<p>
  For a sense of what the remaining work may take, our <a href="/project-costs">project cost guide</a> shows what drives the size of a build.
</p>

<h2 id="handover-checklist">Step 5: Run the handover</h2>
<p>
  If the relationship allows it, a short overlap where both teams can talk saves a lot of guesswork. Even a couple of recorded walkthrough calls help. Ask the outgoing team for:
</p>
<ul>
  <li>A list of every environment, server and service the product depends on.</li>
  <li>How to build, test and release the app, written down step by step.</li>
  <li>Known bugs, unfinished features and anything that is deliberately switched off.</li>
  <li>Decisions that are not obvious from the code, such as why a library was chosen or a workaround added.</li>
</ul>
<p>
  Once the new team confirms they can build and release on their own, rotate every password and API key the old team had. Remove their access from the repository, cloud, stores and third-party services. This is routine hygiene, not an accusation, and a professional team will expect it.
</p>

<h2 id="choose-the-next-team">Choosing the next team</h2>
<p>
  The second hire is easier because you know exactly what went wrong the first time. Ask candidates how they take over existing code, what they need from you in the first week, and how you will see progress. Look for a team that offers a review before a quote, shows working software early and keeps everything in your accounts. Our guide on <a href="/blog/how-to-choose-a-software-development-company">how to choose a software development company</a> has the full list of questions.
</p>

<h2 id="how-we-take-over">How we take over projects at Creuto</h2>
<p>
  When a founder brings us a project another team started, we begin with a free 30-minute call to understand what is going wrong, then send a clear written proposal within 24 hours. The first piece of work is a code review and a handover plan, so you know what you have before you commit to more. Your code and accounts stay in your name from day one, you see working software early, and every launch we deliver comes with a 60-day warranty. You can read more about how we work at <a href="https://creuto.com" target="_blank" rel="noopener">creuto.com</a>.
</p>
`
};
