/**
 * Fuller detail for each role page (and its JobPosting data): a longer introduction, extra responsibilities,
 * requirements, nice-to-haves, skills and a related career guide. Shared sections (what we offer, how hiring works,
 * what you'll work on by team) live below. Keep to what is true about working at Creuto: no salary, benefit or
 * policy claims beyond what the founder has confirmed.
 */
const DETAILS = {
  'founders-office': {
    about: 'You will be the person who keeps priorities moving when there are many of them. Some weeks that means research and planning, other weeks client coordination or getting a launch over the line.',
    more: ['Draft documents, proposals and internal notes', 'Help set up and improve how the team works day to day', 'Own small projects end to end'],
    must: ['Excellent written and spoken English', 'Strong organisation and follow-through', 'Comfort with Google Workspace, Notion or similar tools', 'Good judgement about what matters most'],
    nice: ['Experience in a startup, agency or consulting firm', 'Familiarity with software projects', 'Interest in AI tools for productivity'],
    skills: ['Planning', 'Writing', 'Research', 'Coordination', 'Project management'],
  },
  'linkedin-content-manager': {
    about: 'You will shape how Creuto and I show up on LinkedIn: turning real projects, lessons and opinions into posts people want to read and share.',
    more: ['Keep a content calendar and a library of ideas', 'Repurpose guides and case studies into posts and carousels', 'Work with the designer and video editor on visuals'],
    must: ['A track record of writing engaging LinkedIn posts', 'Understanding of how LinkedIn reach and engagement work', 'Clear, simple English', 'Consistency with publishing'],
    nice: ['Experience with B2B or tech audiences', 'Basic design skills in Canva or Figma', 'Experience with scheduling and analytics tools'],
    skills: ['LinkedIn', 'Copywriting', 'Content strategy', 'Community management', 'Analytics'],
  },
  'graphic-designer': {
    about: 'You will give everything we publish a clear, recognisable look, from single posts and carousels to case study visuals and announcements.',
    more: ['Build and maintain reusable templates', 'Design visuals for guides, case studies and the website', 'Work with the content manager on campaign ideas'],
    must: ['A portfolio of social media and brand design', 'Strong typography and layout skills', 'Skill with Figma or Canva, and Adobe tools if possible', 'Ability to work fast without losing quality'],
    nice: ['Motion graphics or simple animation', 'Experience designing for B2B or tech brands', 'Illustration skills'],
    skills: ['Figma', 'Canva', 'Typography', 'Layout', 'Brand design'],
  },
  'video-editor': {
    about: 'You will turn raw recordings into short and long videos that hold attention: talking-head clips, explainers and case study stories.',
    more: ['Add captions, music and simple motion graphics', 'Cut long recordings into short clips', 'Keep a consistent style across channels'],
    must: ['A showreel of edited videos', 'Strong sense of pacing and storytelling', 'Skill in Premiere Pro, Final Cut, DaVinci Resolve or similar', 'Thumbnail design skills'],
    nice: ['After Effects or motion graphics', 'Experience with YouTube and LinkedIn video', 'Basic sound design'],
    skills: ['Video editing', 'Captions', 'Thumbnails', 'Storytelling', 'Motion graphics'],
  },
  'react-native-developer': {
    about: 'You will work on consumer and business apps for our clients: booking apps, marketplaces, field tools and AI-powered features, shipped to both Android and iOS from one codebase.',
    more: ['Write reusable components and clean, typed code', 'Fix bugs reported by testers and users', 'Take part in code reviews and planning'],
    must: ['Hands-on React Native experience with apps you can show', 'Strong JavaScript and TypeScript', 'Experience with REST APIs and state management', 'Understanding of Android and iOS build and release basics'],
    nice: ['Experience with the new React Native architecture', 'Native Android or iOS knowledge', 'Experience with payments, maps or real-time features', 'Testing with Jest, Detox or Maestro'],
    skills: ['React Native', 'TypeScript', 'React', 'Redux or Zustand', 'REST APIs', 'Git'],
    guide: 'react-native-interview-questions',
  },
  'flutter-developer': {
    about: 'You will build cross-platform apps for our clients in Flutter, from first screens to store releases, with a focus on smooth interfaces and clean architecture.',
    more: ['Write widget and unit tests for key flows', 'Optimise performance on low-end Android phones', 'Take part in code reviews and planning'],
    must: ['Hands-on Flutter experience with apps you can show', 'Solid Dart and async programming', 'Experience with a state management approach such as Riverpod or Bloc', 'Experience integrating REST APIs and Firebase'],
    nice: ['Platform channels or native module experience', 'Published apps on the App Store or Google Play', 'Experience with animations and custom UI'],
    skills: ['Flutter', 'Dart', 'Riverpod or Bloc', 'Firebase', 'REST APIs', 'Git'],
    guide: 'flutter-interview-questions',
  },
  'full-stack-developer': {
    about: 'You will build web applications, admin panels, customer portals and the APIs behind our mobile apps, owning features from the database to the interface.',
    more: ['Write tests for critical flows', 'Integrate third-party services such as payments, messaging and AI APIs', 'Take part in code reviews and planning'],
    must: ['Strong React and Next.js skills', 'Experience building APIs with Node.js', 'Good SQL knowledge, ideally PostgreSQL', 'Comfort with Git and deploying to the cloud'],
    nice: ['TypeScript across the stack', 'Experience with AWS, Vercel or Docker', 'Experience with authentication and role-based access'],
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs'],
    guide: 'node-js-interview-questions',
  },
  'ai-engineer': {
    about: 'Creuto is an OpenAI Select Partner. You will build AI features that businesses rely on: assistants that answer from company documents, extraction tools and agents, with the checks that keep them accurate.',
    more: ['Track quality, latency and cost of AI features', 'Work with product and design on how AI fits the user experience', 'Document what works and share it with the team'],
    must: ['Strong Python skills', 'Hands-on experience with LLM APIs, embeddings and vector search', 'Understanding of retrieval-augmented generation', 'A habit of measuring quality with real test sets'],
    nice: ['Experience with agents and tool calling', 'Backend experience with FastAPI or Node.js', 'Experience deploying AI features to production'],
    skills: ['Python', 'LLMs', 'RAG', 'Vector databases', 'Prompt design', 'Evaluation'],
    guide: 'how-to-become-an-ai-engineer',
  },
  'qa-engineer': {
    about: 'You will be the last line of defence before every release, testing mobile and web apps on real devices and making sure what we ship works the way clients expect.',
    more: ['Run regression tests before releases', 'Verify fixes and close bugs', 'Help define acceptance criteria with product'],
    must: ['Experience testing mobile and web applications', 'Clear, reproducible bug reporting', 'Understanding of test cases and test plans', 'Familiarity with at least one automation tool'],
    nice: ['Appium, Playwright, Cypress or Maestro experience', 'API testing with Postman or similar', 'Basic programming in JavaScript or Python'],
    skills: ['Manual testing', 'Test automation', 'Appium or Playwright', 'API testing', 'Bug tracking'],
  },
  'devops-engineer': {
    about: 'You will own how our products are deployed and run: cloud environments, pipelines, monitoring and the security and cost habits that keep them healthy.',
    more: ['Automate repeatable work with scripts and infrastructure as code', 'Respond to and learn from incidents', 'Advise developers on reliable deployment practices'],
    must: ['Hands-on AWS experience', 'Experience with Docker and CI/CD pipelines', 'Infrastructure as code with Terraform or similar', 'Linux and networking basics'],
    nice: ['Kubernetes experience', 'Azure or Google Cloud experience', 'Monitoring tools such as Grafana, Prometheus or Datadog'],
    skills: ['AWS', 'Docker', 'CI/CD', 'Terraform', 'Linux', 'Monitoring'],
  },
  'ui-ux-designer': {
    about: 'You will design apps and web products for our clients, from early flows that test an idea to the polished screens developers build from.',
    more: ['Maintain design systems and component libraries', 'Join client workshops and user tests', 'Review builds against designs before release'],
    must: ['A portfolio of mobile and web product design with case studies', 'Strong Figma skills including components and auto layout', 'Understanding of user research and usability testing', 'Knowledge of iOS and Android design conventions'],
    nice: ['Prototyping with interactions and animation', 'Experience designing dashboards or B2B tools', 'Basic understanding of front-end development'],
    skills: ['Figma', 'UX research', 'Wireframing', 'Prototyping', 'Design systems', 'UI design'],
    guide: 'ui-ux-designer-portfolio-tips',
  },
  'product-manager': {
    about: 'You will work with me and our clients to decide what to build, write it down clearly and guide the team from the first PRD to launch and the iterations after.',
    more: ['Run sprint planning and keep the backlog in order', 'Write release notes and client updates', 'Track results after launch and plan improvements'],
    must: ['Experience shipping software products as a product manager, analyst or similar', 'Excellent written English', 'Ability to write PRDs and user stories', 'Comfort working with engineers and designers'],
    nice: ['Experience in an agency or with multiple clients', 'Technical background', 'Familiarity with Jira, Linear or Notion'],
    skills: ['PRDs', 'User stories', 'Prioritisation', 'Stakeholder management', 'Roadmapping'],
    guide: 'how-to-become-a-product-manager',
  },
  'business-analyst': {
    about: 'You will understand how our clients run their businesses, especially for ERP, CRM and operations software, and translate that into specifications the team can build from.',
    more: ['Prepare data migration plans with clients', 'Write training material and user guides', 'Run user acceptance testing with client teams'],
    must: ['Experience as a business analyst on software projects', 'Strong documentation and process mapping skills', 'Comfort with spreadsheets and data', 'Clear communication with non-technical people'],
    nice: ['ERP or CRM implementation experience', 'Knowledge of manufacturing, retail or logistics processes', 'SQL basics'],
    skills: ['Requirements gathering', 'Process mapping', 'Documentation', 'UAT', 'Excel'],
  },
  'business-development-executive': {
    about: 'You will help Creuto grow by finding businesses that need software, apps or AI, starting good conversations and helping turn them into long-term clients.',
    more: ['Represent Creuto on LinkedIn and in communities', 'Gather feedback from prospects to improve our offers', 'Track results and share what works'],
    must: ['Experience in IT services sales, B2B sales or lead generation', 'Confident English, written and spoken', 'Comfort with LinkedIn and email outreach', 'Experience with a CRM'],
    nice: ['Experience selling to international clients', 'Understanding of software development services', 'Existing network among founders or SMEs'],
    skills: ['Lead generation', 'Outreach', 'CRM', 'Negotiation', 'LinkedIn'],
  },
  'digital-marketing-executive': {
    about: 'You will grow Creuto’s organic presence: search rankings, content performance and the listings and links that bring enquiries.',
    more: ['Run technical SEO checks and fix issues', 'Optimise Google Business Profile and directory listings', 'Plan and measure small campaigns'],
    must: ['Hands-on SEO experience with results you can show', 'Familiarity with Search Console and Google Analytics', 'Good written English', 'Comfort with keyword research tools'],
    nice: ['Link building or digital PR experience', 'Experience marketing B2B services', 'Basic HTML knowledge'],
    skills: ['SEO', 'Search Console', 'Google Analytics', 'Keyword research', 'Content marketing'],
  },
  'content-writer': {
    about: 'You will write the guides, case studies and pages that help founders understand software, apps and AI, and help Creuto get found.',
    more: ['Interview team members for technical detail', 'Update older content to keep it accurate', 'Repurpose long guides into shorter formats'],
    must: ['Writing samples on technology or business topics', 'Clear, simple English and strong editing', 'Ability to learn technical subjects quickly', 'Basic understanding of SEO writing'],
    nice: ['Experience writing for software or SaaS companies', 'Familiarity with AI tools for research', 'Experience writing case studies'],
    skills: ['Writing', 'Editing', 'SEO writing', 'Research', 'Case studies'],
    guide: 'how-to-get-a-remote-software-job-from-india',
  },
  'software-development-intern': {
    about: 'A remote internship for students and recent graduates who want real experience: you will work on actual projects with guidance from our engineers.',
    more: ['Pair with developers on features and bug fixes', 'Learn how products are planned, reviewed and released', 'Document what you build'],
    must: ['Basics of JavaScript, Python or another language', 'At least one project you built yourself', 'Willingness to learn and ask questions', 'A reliable internet connection and laptop'],
    nice: ['Some experience with React, React Native or Node.js', 'Projects on GitHub', 'Hackathon or open-source experience'],
    skills: ['JavaScript', 'React', 'Git', 'APIs', 'Problem solving'],
    guide: 'how-to-get-a-software-internship-in-india',
  },
  'ui-ux-design-intern': {
    about: 'A remote internship for designers starting out: you will work on real app and web projects and get regular feedback on your work.',
    more: ['Help organise design files and components', 'Join user testing and take notes', 'Present your work and act on feedback'],
    must: ['A portfolio of student or personal projects', 'Basic Figma skills', 'A good eye for layout and typography', 'Openness to feedback'],
    nice: ['Some user research experience', 'Interest in mobile app design', 'Illustration or visual design skills'],
    skills: ['Figma', 'Wireframing', 'UI design', 'User research', 'Prototyping'],
    guide: 'ui-ux-designer-portfolio-tips',
  },
  'digital-marketing-intern': {
    about: 'A remote internship for people who want to learn marketing in a growing software company: SEO, content, social media and analytics.',
    more: ['Help publish and promote guides', 'Support listings and directory submissions', 'Prepare simple performance reports'],
    must: ['Interest in digital marketing', 'Good written English', 'Basic comfort with spreadsheets', 'Reliability and curiosity'],
    nice: ['Some SEO or social media experience', 'Canva skills', 'Familiarity with analytics tools'],
    skills: ['SEO basics', 'Social media', 'Content', 'Analytics', 'Canva'],
    guide: 'how-to-get-a-software-internship-in-india',
  },
};

// What you'll work on, by team
const WORK = {
  Engineering: ['Mobile apps for Android and iOS used by real customers', 'Web platforms, dashboards and customer portals', 'Custom ERP, CRM and operations software', 'AI features such as assistants and document tools'],
  'Design and product': ['New products, from first idea to launch', 'Redesigns of existing apps and platforms', 'B2B tools such as ERPs and dashboards', 'Consumer apps for booking, commerce and services'],
  'Sales and marketing': ['Guides, case studies and the Creuto website', 'Campaigns for services such as app, ERP and AI development', 'Conversations with founders in India and abroad', 'Growing Creuto’s presence on search and LinkedIn'],
  'Founder’s team': ['Content and presence for Nihar Ranjan Rout and Creuto', 'Client projects, proposals and launches', 'Internal systems and ways of working', 'Growth initiatives'],
  Internships: ['Real client and internal projects', 'Features, designs or campaigns that actually ship', 'Reviews and feedback on your work', 'Learning how a software company runs'],
};

const OFFER = [
  ['Remote from anywhere in India', 'Work from your own city, with no relocation.'],
  ['Work directly with the founder', 'You work with Nihar Ranjan Rout and the team, without layers in between.'],
  ['Real products, real clients', 'Apps, web platforms, ERPs and AI products used by actual businesses.'],
  ['Feedback that helps you grow', 'Reviews of your work and room to take on more as you prove yourself.'],
];

const PROCESS = [
  ['Apply on this page', 'It takes a few minutes: your details, LinkedIn and a link to your work.'],
  ['Review', 'Applications come to me directly, and I read them myself.'],
  ['Conversation', 'If it looks like a fit, we talk about the role, your work and what you want next.'],
  ['Practical step', 'Depending on the role, a short task or a walkthrough of your previous work.'],
  ['Decision', 'You hear back from me, and if it is a yes, we agree a start date.'],
];

const PROOF = {
  Engineering: 'your GitHub profile or links to apps and projects you have built',
  'Design and product': 'your portfolio or examples of products and documents you have worked on',
  'Sales and marketing': 'examples of your work and results, such as content, campaigns or sales achievements',
  'Founder’s team': 'a link to relevant work, such as your portfolio, posts or a showreel',
  Internships: 'any projects, portfolio or GitHub links, even from college or personal work',
};

module.exports = { DETAILS, WORK, OFFER, PROCESS, PROOF };
