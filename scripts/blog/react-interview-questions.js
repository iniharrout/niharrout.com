module.exports = {
  slug: "react-interview-questions",
  title: "React Interview Questions and Answers for Freshers",
  headline: "React Interview Questions and Answers for Freshers and Juniors",
  shortTitle: "React interview questions",
  description: "React interview questions with clear answers for freshers and junior developers: components, hooks, state, rendering, forms, performance and testing.",
  keywords: ["React interview questions", "React interview questions for freshers", "React JS interview questions and answers", "React hooks interview questions", "frontend developer interview questions"],
  category: "Careers",
  badge: "CAREERS",
  readMinutes: 9,
  published: "2026-10-26",
  icon: "doc",
  lead: "React questions appear in almost every frontend and full stack interview. Most of them test whether you understand how React renders, how state flows and how hooks behave. These answers focus on the reasoning interviewers want to hear.",
  cardDesc: "Components, hooks, state, rendering, forms, performance and testing: React interview questions with answers for freshers and juniors.",
  cta: { title: "Looking for a full stack role?", text: "Creuto is hiring full stack developers (React, Node.js) to work remotely from anywhere in India.", button: "See the full stack developer job", href: "/work-with-me/full-stack-developer" },
  endCta: { title: "Build real products with us", text: "We hire developers, designers and interns to work remotely across India on real client products.", primary: { href: "/work-with-me", label: "See open roles" }, service: { href: "/work-with-me/full-stack-developer", label: "Full stack developer job" } },
  related: ["node-js-interview-questions", "react-native-interview-questions", "software-developer-resume-for-freshers"],
  faq: [
    ["What React topics are asked most in interviews?", "Components and props, state and hooks, rendering and keys, effects and data fetching, forms, and basic performance. For mid-level roles, add state management, routing and testing."],
    ["Should freshers learn Next.js?", "It helps. Many companies build with Next.js, so knowing routing, server rendering and data fetching in Next.js makes you stand out."],
    ["Do I need to know class components?", "Rarely for new code, but you may meet them in older projects. Know the basics and how hooks replaced lifecycle methods."],
    ["How do I show React skills without job experience?", "Build two or three small but complete projects, deploy them and keep the code clean on GitHub. Be ready to explain every decision."],
  ],
  body: `
<p>
  We hire full stack developers at Creuto who use React every day. In interviews, clear explanations of how React works beat long lists of memorised facts. Here are the questions to practise.
</p>

<div class="blog-callout">
  <h4>A quick tip</h4>
  <p>
    For each answer, add one sentence about when it matters in a real app. That turns a textbook answer into a strong one.
  </p>
</div>

<h2 id="components">Components and rendering</h2>
<h3>1. What is JSX?</h3>
<p>A syntax that lets you write UI as HTML-like code in JavaScript. It compiles to function calls that create React elements.</p>
<h3>2. What triggers a re-render?</h3>
<p>A change in a component's state, a change in its props from a parent re-render, or a change in a context it uses.</p>
<h3>3. Why do lists need keys?</h3>
<p>Keys let React match items between renders. Stable, unique keys keep the right state with the right item; array indexes cause bugs when items move.</p>
<h3>4. What is the virtual DOM?</h3>
<p>A lightweight description of the UI. React compares the new description with the previous one and updates only what changed in the real DOM.</p>

<h2 id="hooks">Hooks</h2>
<h3>5. Explain useState and useEffect.</h3>
<p>useState stores a value that triggers a re-render when it changes. useEffect runs side effects after render, such as fetching data or subscribing to events, and can clean up when the component unmounts.</p>
<h3>6. What are the rules of hooks?</h3>
<p>Call hooks at the top level of a component or custom hook, never inside loops, conditions or nested functions, so React can keep their order.</p>
<h3>7. When would you use useRef?</h3>
<p>To hold a mutable value that does not trigger a re-render, or to access a DOM element directly, such as focusing an input.</p>
<h3>8. What are useMemo and useCallback for?</h3>
<p>Caching a computed value or a function between renders, mainly to avoid expensive recalculations or unnecessary child re-renders.</p>
<h3>9. What is a custom hook?</h3>
<p>A function starting with "use" that combines hooks into reusable logic, such as useFetch or useDebounce.</p>

{{cta}}

<h2 id="state">State and data</h2>
<h3>10. What is lifting state up?</h3>
<p>Moving shared state to the nearest common parent so sibling components stay in sync.</p>
<h3>11. When would you use context?</h3>
<p>For values many components need, such as theme, language or the logged-in user. For frequently changing data, a state library is often a better fit.</p>
<h3>12. How do you fetch data in React?</h3>
<p>In an effect with proper loading and error states, or, more commonly now, with a library such as TanStack Query or the data features of a framework like Next.js.</p>

<h2 id="forms">Forms</h2>
<h3>13. Controlled vs uncontrolled inputs?</h3>
<p>Controlled inputs keep their value in React state. Uncontrolled inputs keep it in the DOM and are read with a ref. Form libraries often mix both for performance.</p>

<h2 id="performance">Performance</h2>
<h3>14. How do you improve a slow React page?</h3>
<p>Measure with the React DevTools profiler, avoid unnecessary re-renders, split code with lazy loading, virtualise long lists and keep heavy work out of render.</p>

<h2 id="testing">Testing</h2>
<h3>15. How do you test React components?</h3>
<p>With a test runner such as Jest or Vitest and React Testing Library, testing what the user sees and does rather than internal implementation details.</p>

<h2 id="prepare">How to prepare</h2>
<ul>
  <li>Revise from the official <a href="https://react.dev/learn" target="_blank" rel="noopener">React documentation</a>, which teaches modern React with hooks.</li>
  <li>Build and deploy a small app with routing, a form and data from an API.</li>
  <li>Practise explaining your code out loud.</li>
  <li>For full stack roles, also revise <a href="/blog/node-js-interview-questions">Node.js interview questions</a>.</li>
</ul>

<h2 id="creuto">Working at Creuto</h2>
<p>
  At <a href="https://creuto.com" target="_blank" rel="noopener">Creuto</a> we build web apps with React, Next.js and Node.js and hire remotely across India. See the <a href="/work-with-me/full-stack-developer">full stack developer role</a>, the <a href="/work-with-me/software-development-intern">software development internship</a> and all <a href="/work-with-me">open roles</a>.
</p>
`,
};
