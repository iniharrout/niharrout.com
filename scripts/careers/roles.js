/**
 * Open roles for /work-with-me. One source for the listing page, the pop-up, the four role pages and the
 * job-posting markup, so they never disagree. Edit the wording here, then run `node scripts/build-careers.js`
 * (it also runs as part of `node scripts/build-all.js`).
 *
 * Confirmed by the founder: every role is remote and open to people anywhere in India (2026-10-13), and on 2026-10-26
 * the founder confirmed real hiring for engineering, design and product, sales and marketing roles and internships.
 * Fields: dept groups the listing; type is FULL_TIME or INTERN; posted is the date the role was published;
 * salary is { min, max, unit: 'YEAR' | 'MONTH' } in INR and is only marked up when the founder has given it.
 */

const POSTED = '2026-10-13';

const roles = [
  {
    slug: 'founders-office', dept: 'Founder\u2019s team',
    title: 'Founder’s Office',
    apply: 'Application: Founder\'s Office',
    short: 'Work at my side across product, operations and growth.',
    summary: 'A role at my side across product, operations and growth. You help me keep the company moving and make sure the important things get done.',
    tags: ['Operations', 'Product', 'Growth'],
    seoTitle: 'Founder’s Office Job, Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Full-time remote Founder’s Office job in India. Work directly with Nihar Ranjan Rout, founder of Creuto, across product, operations and growth. Apply online.',
    does: [
      'Turn my priorities into plans, follow-ups and clear next steps',
      'Prepare briefs, research and summaries for meetings and decisions',
      'Coordinate between the team, clients and partners',
      'Track projects and flag what needs my attention',
    ],
    looks: [
      'Someone organised, who finishes what they start',
      'Clear thinking and clear writing in English',
      'Comfort with open-ended problems',
      'Curiosity about software, product and AI',
    ],
    icon: '<path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z"/><path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1M4 12.5h16"/>',
  },
  {
    slug: 'linkedin-content-manager', dept: 'Founder\u2019s team',
    title: 'LinkedIn & Content Manager',
    apply: 'Application: LinkedIn & Content Manager',
    short: 'Run my LinkedIn presence: ideas, posts, publishing and conversations.',
    summary: 'Someone to run my LinkedIn presence: ideas, posts, publishing and conversations, so what I know and build reaches the right people.',
    tags: ['Content', 'LinkedIn', 'Community'],
    seoTitle: 'LinkedIn Content Manager Job, Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Full-time remote LinkedIn and content manager job in India. Plan, write, publish and engage for Nihar Ranjan Rout, founder of Creuto. Apply online.',
    does: [
      'Plan and write posts from my projects, ideas and experience',
      'Publish on a steady schedule',
      'Reply to comments and start conversations with relevant people',
      'Look at what works and adjust the plan',
    ],
    looks: [
      'Strong writing, with a feel for what a good LinkedIn post looks like',
      'Experience managing a profile or page, yours or someone else’s',
      'An understanding of B2B and tech audiences',
      'Links to posts you have written',
    ],
    icon: '<path d="M20.5 15a2.2 2.2 0 0 1-2.2 2.2H8L3.5 21V6.2A2.2 2.2 0 0 1 5.7 4h12.6a2.2 2.2 0 0 1 2.2 2.2z"/><path d="M8 9h8M8 12.5h5"/>',
  },
  {
    slug: 'graphic-designer', dept: 'Founder\u2019s team',
    title: 'Graphic Designer',
    apply: 'Application: Graphic Designer',
    short: 'Make my posts look as good as the ideas in them.',
    summary: 'A designer with a strong eye, who can make my posts look as good as the ideas in them.',
    tags: ['Visual design', 'Social', 'Branding'],
    seoTitle: 'Graphic Designer Job, Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Full-time remote graphic designer job in India. Design social posts, carousels and visuals for Nihar Ranjan Rout, founder of Creuto. Apply with your portfolio.',
    does: [
      'Design post graphics, carousels and announcement visuals',
      'Turn case studies and ideas into clear visuals',
      'Keep a consistent look across everything I publish',
      'Prepare files in the sizes each platform needs',
    ],
    looks: [
      'A portfolio that shows taste, typography and layout',
      'Comfort with Figma, Canva or similar tools',
      'The ability to keep up with a steady flow of work',
      'Openness to feedback and quick revisions',
    ],
    icon: '<path d="M12 3l2.4 5.1 5.6.7-4.1 3.9 1 5.5L12 15.5 7.1 18.2l1-5.5L4 8.8l5.6-.7z"/>',
  },
  {
    slug: 'video-editor', dept: 'Founder\u2019s team',
    title: 'Video Editor',
    apply: 'Application: Video Editor',
    short: 'Turn my raw videos into clean, watchable posts, with thumbnails.',
    summary: 'An editor who can turn my raw videos into clean, watchable posts, with thumbnails that make people want to press play.',
    tags: ['Video', 'Thumbnails', 'Social'],
    seoTitle: 'Video Editor Job, Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Full-time remote video editor job in India. Edit videos and design thumbnails for Nihar Ranjan Rout, founder of Creuto. Apply with your showreel.',
    does: [
      'Edit short and long videos for LinkedIn, YouTube and other channels',
      'Handle cuts, pacing, captions and sound clean-up',
      'Design thumbnails',
      'Deliver in the right format for each platform',
    ],
    looks: [
      'A showreel or sample videos, shared as links',
      'A strong sense of pacing and storytelling',
      'Comfort with Premiere Pro, Final Cut, DaVinci Resolve or similar',
      'Reliable delivery',
    ],
    icon: '<rect x="3" y="5.5" width="18" height="13" rx="2.6"/><path d="M10.2 9.4v5.2l4.4-2.6z"/>',
  },
];

// ---- Roles added 2026-10-26 (founder confirmed these teams are hiring)
const P2 = '2026-10-26';
const role = (o) => ({ posted: P2, type: 'FULL_TIME', apply: `Application: ${o.title}`, seoTitle: `${o.title} Job, Remote in India | Nihar Ranjan Rout`, ...o });
roles.push(
  role({
    slug: 'react-native-developer', dept: 'Engineering', title: 'React Native Developer',
    short: 'Build Android and iOS apps in React Native for startups and businesses.',
    summary: 'A React Native developer to build and ship Android and iOS apps for our clients, from the first screen to the App Store and Google Play.',
    tags: ['React Native', 'TypeScript', 'Mobile'],
    seoDescription: 'Remote React Native developer job in India at Creuto. Build Android and iOS apps for startups and businesses, from first screen to store launch. Apply online.',
    does: ['Build app screens and features in React Native and TypeScript', 'Connect apps to APIs, payments, maps and push notifications', 'Test on real devices and fix performance issues', 'Prepare builds for the App Store and Google Play'],
    looks: ['Apps you have built or worked on, ideally live in the stores', 'Good command of React, TypeScript and state management', 'Care for smooth, polished interfaces', 'Clear written communication for remote work'],
  }),
  role({
    slug: 'flutter-developer', dept: 'Engineering', title: 'Flutter Developer',
    short: 'Build cross-platform mobile apps in Flutter and Dart.',
    summary: 'A Flutter developer to build cross-platform mobile apps for our clients, with clean architecture and interfaces that feel native.',
    tags: ['Flutter', 'Dart', 'Mobile'],
    seoDescription: 'Remote Flutter developer job in India at Creuto. Build cross-platform Android and iOS apps in Flutter and Dart for startups and businesses. Apply online.',
    does: ['Build features and screens in Flutter and Dart', 'Integrate REST APIs, Firebase, payments and device features', 'Write maintainable code with a clear state management approach', 'Ship builds to testers and the app stores'],
    looks: ['Flutter apps you have built, with links or screenshots', 'Understanding of state management such as Riverpod, Bloc or Provider', 'Attention to detail on layouts and animations', 'Reliability when working remotely'],
  }),
  role({
    slug: 'full-stack-developer', dept: 'Engineering', title: 'Full Stack Developer (React, Node.js)',
    short: 'Build web apps and APIs with React, Next.js and Node.js.',
    summary: 'A full stack developer to build web applications, dashboards and APIs for our clients using React, Next.js and Node.js.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    seoTitle: 'Full Stack Developer Job, Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Remote full stack developer job in India at Creuto. Build web apps, dashboards and APIs with React, Next.js, Node.js and PostgreSQL. Apply online.',
    does: ['Build front ends in React and Next.js', 'Design and build APIs in Node.js', 'Model data in PostgreSQL and keep queries fast', 'Deploy and monitor apps on the cloud'],
    looks: ['Web apps you have built end to end', 'Comfort across the front end and back end', 'Good habits: reviews, tests and readable code', 'Clear written updates'],
  }),
  role({
    slug: 'ai-engineer', dept: 'Engineering', title: 'AI Engineer (Python, LLMs)',
    short: 'Build AI features with Python, LLMs, RAG and agents.',
    summary: 'An AI engineer to build production AI features for our clients: assistants that answer from company documents, agents that complete tasks and the checks that keep them reliable.',
    tags: ['Python', 'LLMs', 'RAG'],
    seoTitle: 'AI Engineer Job (Python, LLMs), Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Remote AI engineer job in India at Creuto, an OpenAI Select Partner. Build RAG assistants, agents and LLM features in Python for real products. Apply online.',
    does: ['Build retrieval-augmented generation pipelines over client data', 'Integrate OpenAI and other model APIs into products', 'Design evaluation sets and guardrails for answer quality', 'Ship AI features behind clean APIs'],
    looks: ['Python projects with LLMs, embeddings or vector search', 'An evidence-first approach to measuring AI quality', 'Understanding of APIs and back-end basics', 'Curiosity and clear writing'],
  }),
  role({
    slug: 'qa-engineer', dept: 'Engineering', title: 'QA Engineer (Manual and Automation)',
    short: 'Test mobile and web apps, manually and with automation.',
    summary: 'A QA engineer to test the mobile and web apps we build, find problems before users do and grow our automated test coverage.',
    tags: ['Testing', 'Automation', 'Mobile'],
    seoTitle: 'QA Engineer Job, Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Remote QA engineer job in India at Creuto. Test mobile and web apps manually and with automation tools before every release. Apply online.',
    does: ['Write test cases from requirements and designs', 'Test apps on real Android and iOS devices and browsers', 'Report clear, reproducible bugs', 'Build and maintain automated tests'],
    looks: ['Experience testing mobile or web apps', 'Familiarity with tools such as Appium, Playwright, Cypress or similar', 'A sharp eye for detail', 'Clear bug reports and written communication'],
  }),
  role({
    slug: 'devops-engineer', dept: 'Engineering', title: 'DevOps Engineer (AWS)',
    short: 'Run cloud infrastructure, CI/CD and monitoring for our products.',
    summary: 'A DevOps engineer to set up and run cloud infrastructure for the products we build: deployments, monitoring, security and cost control.',
    tags: ['AWS', 'CI/CD', 'Docker'],
    seoDescription: 'Remote DevOps engineer job in India at Creuto. Run AWS infrastructure, CI/CD pipelines, monitoring and cloud cost control for real products. Apply online.',
    does: ['Set up cloud environments on AWS, and on Azure or Google Cloud when needed', 'Build CI/CD pipelines for web and mobile projects', 'Set up monitoring, alerts and backups', 'Keep infrastructure secure and costs under control'],
    looks: ['Hands-on experience with AWS and infrastructure as code', 'Comfort with Docker and CI/CD tools', 'A calm approach to production issues', 'Clear documentation habits'],
  }),
  role({
    slug: 'ui-ux-designer', dept: 'Design and product', title: 'UI/UX Designer',
    short: 'Design app and web experiences in Figma, from flows to final screens.',
    summary: 'A UI/UX designer to design the apps and web products we build, from user flows and wireframes to polished screens and prototypes.',
    tags: ['Figma', 'UX', 'Mobile and web'],
    seoDescription: 'Remote UI/UX designer job in India at Creuto. Design mobile app and web product flows, wireframes and polished screens in Figma. Apply with your portfolio.',
    does: ['Map user flows and wireframes for new products', 'Design polished mobile and web screens in Figma', 'Build clickable prototypes for testing', 'Hand over designs with every state covered'],
    looks: ['A portfolio of app or web product design', 'Strong Figma skills and a good eye for typography', 'Understanding of iOS and Android design patterns', 'Openness to feedback'],
  }),
  role({
    slug: 'product-manager', dept: 'Design and product', title: 'Product Manager',
    short: 'Turn client ideas into PRDs, priorities and launched products.',
    summary: 'A product manager to work with me and our clients: shaping ideas into PRDs, setting priorities and guiding products from plan to launch.',
    tags: ['PRDs', 'Roadmaps', 'Delivery'],
    seoDescription: 'Remote product manager job in India at Creuto. Write PRDs, set priorities and guide software products from plan to launch with the founder. Apply online.',
    does: ['Run discovery with clients and write PRDs', 'Break work into user stories and milestones', 'Keep design and engineering aligned', 'Review demos and launches with clients'],
    looks: ['Experience shipping software products', 'Clear structured writing', 'Comfort talking to founders and business owners', 'Good judgement about what to cut'],
  }),
  role({
    slug: 'business-analyst', dept: 'Design and product', title: 'Business Analyst (IT)',
    short: 'Capture requirements and turn processes into clear specs.',
    summary: 'A business analyst to understand how our clients work, capture requirements and turn them into clear specifications our team can build from.',
    tags: ['Requirements', 'Process', 'Documentation'],
    seoTitle: 'IT Business Analyst Job, Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Remote IT business analyst job in India at Creuto. Capture requirements, map processes and write clear specs for ERP, CRM and app projects. Apply online.',
    does: ['Interview client teams about how they work today', 'Map processes and data for ERP, CRM and app projects', 'Write requirements, user stories and acceptance criteria', 'Support testing and user training'],
    looks: ['Experience gathering requirements for software projects', 'Strong written English and documentation', 'Comfort with process diagrams and spreadsheets', 'Patience and good listening'],
  }),
  role({
    slug: 'business-development-executive', dept: 'Sales and marketing', title: 'Business Development Executive (IT Sales)',
    short: 'Find and win new software development clients.',
    summary: 'A business development executive to find companies that need software, start conversations and help turn them into clients.',
    tags: ['IT sales', 'Lead generation', 'B2B'],
    seoTitle: 'IT Sales Business Development Job, Remote | Nihar Ranjan Rout',
    seoDescription: 'Remote business development executive job in India at Creuto. Generate leads and win clients for software, app and AI development services. Apply online.',
    does: ['Research and reach out to potential clients in India and abroad', 'Qualify leads and book calls with me', 'Follow up and keep the pipeline up to date', 'Help prepare proposals'],
    looks: ['Experience in IT services or B2B sales', 'Confident written and spoken English', 'Comfort with LinkedIn, email outreach and a CRM', 'Persistence and organisation'],
  }),
  role({
    slug: 'digital-marketing-executive', dept: 'Sales and marketing', title: 'Digital Marketing Executive (SEO)',
    short: 'Grow organic traffic and leads with SEO and content.',
    summary: 'A digital marketing executive to grow our organic traffic and leads through SEO, content and social channels.',
    tags: ['SEO', 'Content', 'Analytics'],
    seoTitle: 'Digital Marketing Executive (SEO) Job, Remote | Nihar Ranjan Rout',
    seoDescription: 'Remote digital marketing executive job in India at Creuto. Run SEO, content and analytics to grow organic traffic and leads for a software firm. Apply online.',
    does: ['Research keywords and plan content', 'Improve on-page SEO and track rankings', 'Build links and listings', 'Report on traffic and leads from Search Console and analytics'],
    looks: ['Hands-on SEO experience with results you can show', 'Familiarity with Search Console and analytics tools', 'Good written English', 'Curiosity about software and AI'],
  }),
  role({
    slug: 'content-writer', dept: 'Sales and marketing', title: 'Content Writer (Tech)',
    short: 'Write guides and case studies about software, apps and AI.',
    summary: 'A content writer to write clear guides, case studies and website copy about software development, mobile apps and AI.',
    tags: ['Writing', 'SEO', 'Tech'],
    seoTitle: 'Tech Content Writer Job, Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Remote tech content writer job in India at Creuto. Write guides, case studies and web copy about software development, mobile apps and AI. Apply online.',
    does: ['Write long-form guides for founders and business owners', 'Turn projects into case studies', 'Edit website copy for clarity', 'Work with SEO briefs and keywords'],
    looks: ['Writing samples on technology or business topics', 'Plain, clear English', 'Ability to learn technical subjects quickly', 'Respect for deadlines'],
  }),
  role({
    slug: 'software-development-intern', dept: 'Internships', title: 'Software Development Intern', type: 'INTERN',
    short: 'Learn by building real apps and web products with our team.',
    summary: 'An internship for students and recent graduates who want to learn by building real mobile and web products alongside our engineers.',
    tags: ['Internship', 'React', 'Mobile'],
    seoTitle: 'Software Development Internship, Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Remote software development internship in India at Creuto. Learn React, React Native and Node.js by building real products with our team. Apply online.',
    does: ['Build small features and fixes under guidance', 'Learn code reviews, testing and deployment', 'Work on real client and internal projects', 'Share what you learn with the team'],
    looks: ['Students or recent graduates in computer science or related fields', 'Projects on GitHub, even small ones', 'Basics of JavaScript or another language', 'Eagerness to learn'],
  }),
  role({
    slug: 'ui-ux-design-intern', dept: 'Internships', title: 'UI/UX Design Intern', type: 'INTERN',
    short: 'Learn product design in Figma on real projects.',
    summary: 'An internship for designers starting out who want to learn product design on real app and web projects.',
    tags: ['Internship', 'Figma', 'Design'],
    seoTitle: 'UI/UX Design Internship, Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Remote UI/UX design internship in India at Creuto. Learn product design in Figma, from wireframes to polished screens, on real projects. Apply online.',
    does: ['Help with wireframes, screens and prototypes', 'Prepare design assets for developers', 'Join design reviews and user testing', 'Build a portfolio from real work'],
    looks: ['A portfolio, even of student or personal projects', 'Basic Figma skills', 'A good eye for layout and type', 'Willingness to take feedback'],
  }),
  role({
    slug: 'digital-marketing-intern', dept: 'Internships', title: 'Digital Marketing Intern', type: 'INTERN',
    short: 'Learn SEO, content and social media marketing.',
    summary: 'An internship for people who want to learn SEO, content and social media marketing for a growing software company.',
    tags: ['Internship', 'SEO', 'Social media'],
    seoTitle: 'Digital Marketing Internship, Remote in India | Nihar Ranjan Rout',
    seoDescription: 'Remote digital marketing internship in India at Creuto. Learn SEO, content and social media marketing for a software company. Apply online.',
    does: ['Help research keywords and topics', 'Draft social posts and short articles', 'Track results in analytics tools', 'Support listings and outreach'],
    looks: ['Interest in marketing, writing or social media', 'Good written English', 'Basic comfort with spreadsheets', 'Curiosity and reliability'],
  }),
);

const faq = [
  ['Are these jobs remote?', 'Yes. Every role is remote and open to people based anywhere in India.'],
  ['Are the roles full-time?', 'Most roles are full-time. The internships are listed separately and marked as internships.'],
  ['Do you hire freshers?', 'Yes, through the internships for software development, UI/UX design and digital marketing. Students and recent graduates are welcome to apply.'],
  ['How do I apply?', 'Open a role, read the details and press Apply. The form asks for your contact details, your LinkedIn profile and a link to your work. Applications are sent to me directly.'],
  ['What happens after I apply?', 'Applications are sent to me directly. If one looks like a fit, I will get in touch by email or WhatsApp.'],
  ['Do I need a portfolio?', 'For design, video and writing roles, yes: share a link to your work. For engineering roles, a GitHub profile or links to apps you have built help most. For other roles, a clear note about what you have done is the most useful.'],
];

module.exports = { POSTED, roles, faq };
