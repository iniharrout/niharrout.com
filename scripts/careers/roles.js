/**
 * Open roles for /work-with-me. One source for the listing page, the pop-up, the four role pages and the
 * job-posting markup, so they never disagree. Edit the wording here, then run `node scripts/build-careers.js`
 * (it also runs as part of `node scripts/build-all.js`).
 *
 * Confirmed by the founder: all four roles are full-time and remote, open to people anywhere in India.
 * Salary is not published, so no salary is stated or marked up.
 */

const POSTED = '2026-10-13';

const roles = [
  {
    slug: 'founders-office',
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
    about: 'Founder’s Office is a generalist role close to the founder. The work changes week to week: one day it is preparing a client brief, the next it is untangling a hiring plan or chasing a project that has stalled. You will see how the company really runs, and you will be trusted with the follow-through.',
    success: ['Priorities set on Monday have an owner, a date and a status by Tuesday', 'Meetings end with written next steps that actually get done', 'The founder spends time on decisions, not on chasing details', 'Clients and partners get quick, clear replies'],
    icon: '<path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z"/><path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1M4 12.5h16"/>',
  },
  {
    slug: 'linkedin-content-manager',
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
    about: 'Most of the work is turning real experience into posts people want to read. You will sit with me for ideas, draft in my voice, publish on a steady schedule and keep the conversation going in the comments. Good writing, patience and a feel for what B2B readers care about matter more than any tool.',
    success: ['A steady posting rhythm that does not depend on my mood', 'Posts that sound like me and teach something', 'Comments and messages answered quickly and thoughtfully', 'A simple monthly view of what worked and what to try next'],
    icon: '<path d="M20.5 15a2.2 2.2 0 0 1-2.2 2.2H8L3.5 21V6.2A2.2 2.2 0 0 1 5.7 4h12.6a2.2 2.2 0 0 1 2.2 2.2z"/><path d="M8 9h8M8 12.5h5"/>',
  },
  {
    slug: 'graphic-designer',
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
    about: 'You will design for a founder who publishes often, so consistency matters as much as creativity. Expect a mix of single graphics, carousels and announcement visuals, plus the occasional piece for a case study or a talk. A clear visual system, set up once and applied every time, is the real deliverable.',
    success: ['Every post looks like it belongs to the same brand', 'Carousels are easy to read on a phone', 'Turnaround is predictable, so posts never wait on design', 'Source files are organised so anyone can edit them later'],
    icon: '<path d="M12 3l2.4 5.1 5.6.7-4.1 3.9 1 5.5L12 15.5 7.1 18.2l1-5.5L4 8.8l5.6-.7z"/>',
  },
  {
    slug: 'video-editor',
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
    about: 'Raw footage arrives from a phone or camera: talking-head clips, product walkthroughs and event recordings. Your job is to find the story, cut it tight, add captions and sound that make it watchable with the sound off, and package it with a thumbnail. Pace and clarity are the craft.',
    success: ['Videos hold attention in the first few seconds', 'Captions are accurate and easy to read on mobile', 'Thumbnails are clear and consistent across channels', 'Files are delivered in the right format for each platform, on time'],
    icon: '<rect x="3" y="5.5" width="18" height="13" rx="2.6"/><path d="M10.2 9.4v5.2l4.4-2.6z"/>',
  },
];

const faq = [
  ['Are these jobs remote?', 'Yes. All four roles are remote and open to people based anywhere in India.'],
  ['Are the roles full-time?', 'Yes. All four are full-time roles.'],
  ['How do I apply?', 'Open a role, read the details and press Apply. The form asks for your contact details, your LinkedIn profile and a link to your work. Applications are sent to me directly.'],
  ['What happens after I apply?', 'Applications are sent to me directly. If one looks like a fit, I will get in touch by email or WhatsApp.'],
  ['Do I need a portfolio?', 'For the graphic designer and video editor roles, yes: share a link to your work. For the LinkedIn and content role, links to posts you have written help. For Founder’s Office, a clear note about what you have done is the most useful.'],
];

module.exports = { POSTED, roles, faq };
