/**
 * Doodle icon library: friendly spot illustrations drawn for niharrout.com.
 *
 * Style: one ink outline weight over flat fills, a soft round blob behind the object, one warm
 * accent (yellow or coral) and a small sparkle. Every doodle is drawn on a 160 x 160 canvas and
 * coloured through CSS variables (set in assets/primitives.css), so the palette lives in one place:
 *   --d-ink  outline        --d-blue  main fill     --d-deep  brand blue accent
 *   --d-sky  pale blue blob  --d-sun   pale yellow   --d-peach pale coral
 *   --d-yellow / --d-coral  warm accents          --d-paper white fill
 *
 * Use `doodle(name)` in generators, or put <span class="doodle-slot" data-doodle="name"></span> in any
 * page and scripts/build-doodles.js fills it in.
 */

const SW = 4; // outline weight on the 160 canvas
const ink = `stroke="var(--d-ink)" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round"`;
const f = (c) => (c === 'none' ? 'fill="none"' : `fill="var(--d-${c})"`);

// ---- building blocks
const blob = (cx, cy, r, c = 'sky') => `<circle cx="${cx}" cy="${cy}" r="${r}" ${f(c)}/>`;
const rect = (x, y, w, h, rx = 8, c = 'paper') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ${f(c)} ${ink}/>`;
const circ = (cx, cy, r, c = 'paper') => `<circle cx="${cx}" cy="${cy}" r="${r}" ${f(c)} ${ink}/>`;
const path = (d, c = 'none') => `<path d="${d}" ${f(c)} ${ink}/>`;
const line = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" ${ink}/>`;
const dot = (cx, cy, r = 3.2, c = 'ink') => `<circle cx="${cx}" cy="${cy}" r="${r}" ${f(c)}/>`;
// four-point sparkle in ink
const spark = (x, y, s = 7) => `<path d="M${x} ${y - s}V${y + s}M${x - s} ${y}H${x + s}" fill="none" stroke="var(--d-ink)" stroke-width="3" stroke-linecap="round"/>`;
// filled star sparkle
const star = (x, y, s = 9, c = 'yellow') => `<path d="M${x} ${y - s}C${x + s * 0.2} ${y - s * 0.2} ${x + s * 0.2} ${y - s * 0.2} ${x + s} ${y}C${x + s * 0.2} ${y + s * 0.2} ${x + s * 0.2} ${y + s * 0.2} ${x} ${y + s}C${x - s * 0.2} ${y + s * 0.2} ${x - s * 0.2} ${y + s * 0.2} ${x - s} ${y}C${x - s * 0.2} ${y - s * 0.2} ${x - s * 0.2} ${y - s * 0.2} ${x} ${y - s}Z" ${f(c)} stroke="var(--d-ink)" stroke-width="3" stroke-linejoin="round"/>`;
const check = (x, y, s = 1) => `<path d="M${x - 7 * s} ${y}l${5 * s} ${5 * s} ${9 * s}-${10 * s}" fill="none" stroke="var(--d-ink)" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round"/>`;
const badge = (cx, cy, r = 13, c = 'yellow') => circ(cx, cy, r, c) + check(cx, cy, r / 13);

// browser window: frame, top bar, three dots
const win = (x, y, w, h, c = 'paper', bar = 'sky') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" ${f(c)} ${ink}/>` +
  `<path d="M${x + 2} ${y + 20}H${x + w - 2}V${y + 9}a7 7 0 0 0-7-7H${x + 9}a7 7 0 0 0-7 7Z" ${f(bar)}/>` +
  line(x, y + 20, x + w, y + 20) + dot(x + 11, y + 11, 2.6) + dot(x + 20, y + 11, 2.6) + dot(x + 29, y + 11, 2.6);
// phone: body, screen, speaker
const phone = (x, y, w, h, c = 'blue', screen = 'paper') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" ${f(c)} ${ink}/>` +
  `<rect x="${x + 6}" y="${y + 14}" width="${w - 12}" height="${h - 26}" rx="4" ${f(screen)} ${ink}/>` +
  line(x + w / 2 - 6, y + 7, x + w / 2 + 6, y + 7);
// document with folded corner and text lines
const doc = (x, y, w, h, c = 'paper', lines = 3) => {
  const fold = 16;
  let s = path(`M${x} ${y + 6}a6 6 0 0 1 6-6H${x + w - fold}L${x + w} ${y + fold}V${y + h - 6}a6 6 0 0 1-6 6H${x + 6}a6 6 0 0 1-6-6Z`, c) +
    path(`M${x + w - fold} ${y}V${y + fold}H${x + w}`, 'sky');
  for (let i = 0; i < lines; i++) s += line(x + 12, y + 30 + i * 14, x + w - (i === lines - 1 ? 30 : 14), y + 30 + i * 14);
  return s;
};
const shield = (cx, cy, s = 1, c = 'blue') =>
  path(`M${cx} ${cy - 34 * s}L${cx + 28 * s} ${cy - 23 * s}V${cy}C${cx + 28 * s} ${cy + 20 * s} ${cx + 14 * s} ${cy + 32 * s} ${cx} ${cy + 38 * s}C${cx - 14 * s} ${cy + 32 * s} ${cx - 28 * s} ${cy + 20 * s} ${cx - 28 * s} ${cy}V${cy - 23 * s}Z`, c);
const cloud = (x, y, s = 1, c = 'paper') =>
  path(`M${x + 18 * s} ${y + 44 * s}H${x + 72 * s}a18 18 0 0 0 2-35.9A26 26 0 0 0 ${x + 26 * s} ${y + 4 * s}a20 20 0 0 0-8 40Z`, c);
const gear = (cx, cy, r, c = 'yellow') => {
  const teeth = 8; let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2, b = a + Math.PI / teeth;
    const o = r + 7, p = (ang, rad) => `${(cx + Math.cos(ang) * rad).toFixed(1)} ${(cy + Math.sin(ang) * rad).toFixed(1)}`;
    d += `${i ? 'L' : 'M'}${p(a - 0.18, r)}L${p(a - 0.12, o)}L${p(a + 0.24, o)}L${p(a + 0.3, r)}L${p(b + 0.1, r)}`;
  }
  return path(d + 'Z', c) + circ(cx, cy, r * 0.38, 'paper');
};
const bars = (x, y, hs, w = 14, gap = 8, cs = ['sky', 'blue', 'deep']) =>
  hs.map((h, i) => rect(x + i * (w + gap), y - h, w, h, 3, cs[i % cs.length])).join('');
const person = (cx, cy, c = 'blue', hair = 'ink') =>
  path(`M${cx - 20} ${cy + 34}v-6a20 20 0 0 1 40 0v6Z`, c) + circ(cx, cy, 14, 'peach') + path(`M${cx - 14} ${cy - 2}a14 14 0 0 1 28 0c-6-5-20-5-28 0Z`, hair);
const bubble = (x, y, w, h, c = 'paper', tail = 'left') => {
  const t = tail === 'left' ? `M${x + 14} ${y + h}l-6 14 18-14` : `M${x + w - 14} ${y + h}l6 14-18-14`;
  return path(`M${x + 10} ${y}H${x + w - 10}a10 10 0 0 1 10 10V${y + h - 10}a10 10 0 0 1-10 10H${x + 10}a10 10 0 0 1-10-10V${y + 10}a10 10 0 0 1 10-10Z`, c) + path(t, c);
};
const pin = (cx, cy, s = 1, c = 'coral') => path(`M${cx} ${cy + 26 * s}C${cx - 18 * s} ${cy + 4 * s} ${cx - 18 * s} ${cy - 18 * s} ${cx} ${cy - 18 * s}C${cx + 18 * s} ${cy - 18 * s} ${cx + 18 * s} ${cy + 4 * s} ${cx} ${cy + 26 * s}Z`, c) + circ(cx, cy - 3 * s, 6 * s, 'paper');
const bolt = (x, y, s = 1, c = 'yellow') => path(`M${x + 14 * s} ${y}L${x} ${y + 26 * s}H${x + 12 * s}L${x + 6 * s} ${y + 46 * s}L${x + 26 * s} ${y + 16 * s}H${x + 14 * s}L${x + 20 * s} ${y}Z`, c);
const coin = (cx, cy, r = 14) => circ(cx, cy, r, 'yellow') + `<path d="M${cx - 4} ${cy - 6}h9M${cx - 4} ${cy}h9M${cx - 4} ${cy - 6}c8 0 8 12 0 12l7 6" fill="none" stroke="var(--d-ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
const lock = (cx, cy, s = 1, c = 'yellow') => path(`M${cx - 10 * s} ${cy - 4 * s}v-8a10 10 0 0 1 ${20 * s} 0v8`) + rect(cx - 16 * s, cy - 4 * s, 32 * s, 26 * s, 6, c) + dot(cx, cy + 8 * s, 3.5);

// ---- the library
const D = {
  // services
  'custom-software': blob(84, 86, 58) + win(26, 34, 108, 84) + `<path d="M58 70l-12 10 12 10M92 70l12 10-12 10M80 64l-8 32" fill="none" ${ink}/>` + gear(126, 118, 15) + spark(28, 128) + spark(136, 30, 6),
  mobile: blob(80, 84, 58) + phone(52, 22, 56, 112) + rect(64, 50, 32, 22, 5, 'sky') + line(64, 84, 96, 84) + line(64, 96, 86, 96) + star(118, 46, 11) + spark(36, 116),
  web: blob(80, 86, 58, 'sun') + win(22, 36, 116, 88) + rect(34, 68, 40, 42, 5, 'blue') + line(84, 72, 126, 72) + line(84, 86, 120, 86) + line(84, 100, 110, 100) + spark(136, 26) + dot(24, 132, 4, 'coral'),
  cloud: blob(80, 82, 56) + cloud(36, 34, 1, 'paper') + `<path d="M80 92v34M68 114l12 12 12-12" fill="none" ${ink}/>` + rect(42, 128, 76, 14, 5, 'blue') + star(132, 40, 10) + spark(26, 60, 6),
  ai: blob(80, 82, 58, 'peach') + rect(42, 42, 76, 76, 14, 'blue') + rect(56, 56, 48, 48, 8, 'paper') + `<path d="M56 30v12M80 30v12M104 30v12M56 118v12M80 118v12M104 118v12M30 58h12M30 80h12M30 102h12M118 58h12M118 80h12M118 102h12" fill="none" ${ink}/>` + star(80, 80, 13),
  rocket: blob(80, 84, 58) + path('M80 22c22 14 30 40 22 70H58C50 62 58 36 80 22Z', 'paper') + circ(80, 58, 10, 'blue') + path('M58 92l-16 18 20-4M102 92l16 18-20-4', 'coral') + path('M68 98c0 16 6 26 12 34 6-8 12-18 12-34Z', 'yellow') + spark(124, 34) + spark(32, 44, 5),

  // contact
  call: blob(80, 80, 56) + path('M52 38l18 4 6 22-12 8c6 14 14 22 28 28l8-12 22 6 4 18c-4 10-14 14-24 12C66 116 44 94 36 58c-2-10 2-18 16-20Z', 'blue') + `<path d="M98 40a26 26 0 0 1 22 22M98 54a12 12 0 0 1 8 8" fill="none" ${ink}/>` + spark(128, 112, 6),
  chat: blob(80, 82, 56, 'sun') + bubble(24, 38, 76, 50, 'yellow') + dot(46, 63) + dot(62, 63) + dot(78, 63) + bubble(66, 78, 72, 42, 'paper', 'right') + line(80, 94, 122, 94) + line(80, 106, 108, 106),
  calendar: blob(80, 84, 56, 'peach') + rect(30, 38, 100, 92, 12, 'paper') + `<path d="M32 50a12 12 0 0 1 12-12h72a12 12 0 0 1 12 12v14H32Z" ${f('coral')}/>` + line(30, 64, 130, 64) + line(56, 28, 56, 46) + line(104, 28, 104, 46) +
    [0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => dot(48 + c * 21, 82 + r * 16, 3.6)).join('')).join('') + badge(118, 118, 14),
  email: blob(80, 84, 56) + rect(28, 46, 104, 76, 10, 'paper') + path('M30 52l50 38 50-38', 'none') + path('M30 120l36-30M130 120l-36-30') + circ(124, 46, 14, 'coral') + `<path d="M124 39v8M124 53v.5" fill="none" stroke="var(--d-paper)" stroke-width="4" stroke-linecap="round"/>`,

  // why us
  senior: blob(78, 86, 56) + path('M42 132v-10a36 36 0 0 1 72 0v10Z', 'blue') + circ(78, 64, 24, 'peach') + path('M54 60a24 24 0 0 1 48 0c-10-8-36-8-48 0Z', 'ink') + circ(118, 104, 15, 'yellow') + star(118, 104, 7, 'paper') + spark(32, 40),
  stack: blob(80, 84, 56, 'sun') + path('M80 32l48 22-48 22-48-22Z', 'blue') + path('M32 78l48 22 48-22', 'none') + path('M32 100l48 22 48-22', 'none') + star(124, 28, 9) + spark(30, 124, 6),
  design: blob(80, 84, 56, 'peach') + rect(30, 34, 84, 84, 12, 'paper') + circ(58, 64, 12, 'blue') + rect(76, 52, 26, 24, 5, 'yellow') + path('M44 98h48', 'none') + path('M108 124l26-46 10 6-26 46-14 6Z', 'coral') + spark(136, 40),
  pricing: blob(80, 84, 56) + path('M32 66l34-34h46v46l-34 34a8 8 0 0 1-11 0L32 77a8 8 0 0 1 0-11Z', 'yellow') + circ(96, 48, 7, 'paper') + `<path d="M64 76l18 18M58 92l10 10" fill="none" ${ink}/>` + coin(120, 118, 15),
  growth: blob(80, 84, 56, 'sun') + rect(30, 36, 100, 92, 12, 'paper') + bars(44, 116, [18, 34, 52], 14, 9) + path('M44 76l24-16 18 10 30-26', 'none') + path('M104 44h12v12', 'none') + star(128, 30, 9),

  // AI capabilities
  rag: blob(80, 84, 56) + doc(28, 30, 70, 90) + circ(104, 92, 22, 'sky') + line(120, 108, 136, 124) + star(104, 92, 8),
  agent: blob(80, 84, 56, 'peach') + rect(42, 52, 76, 64, 16, 'blue') + circ(64, 82, 9, 'paper') + circ(96, 82, 9, 'paper') + dot(64, 82) + dot(96, 82) + line(68, 102, 92, 102) + line(80, 52, 80, 36) + circ(80, 30, 7, 'yellow') + line(42, 84, 30, 84) + line(118, 84, 130, 84),
  'private-llm': blob(80, 84, 56) + rect(38, 34, 70, 30, 7, 'paper') + rect(38, 70, 70, 30, 7, 'paper') + dot(52, 49) + dot(52, 85) + line(66, 49, 92, 49) + line(66, 85, 92, 85) + lock(112, 112, 1.1, 'yellow'),
  'doc-scan': blob(80, 84, 56, 'sun') + doc(40, 28, 78, 100) + `<path d="M28 76h104" fill="none" stroke="var(--d-coral)" stroke-width="5" stroke-linecap="round"/>` + path('M28 46v-12h12M132 46v-12h-12M28 108v12h12M132 108v12h-12'),
  guardrails: blob(80, 84, 56) + shield(80, 78, 1.25, 'blue') + circ(80, 80, 18, 'paper') + check(80, 80, 1.1) + spark(132, 38) + spark(28, 120, 5),
  tuning: blob(80, 84, 56, 'peach') + rect(30, 34, 100, 92, 12, 'paper') + line(54, 54, 54, 108) + line(80, 54, 80, 108) + line(106, 54, 106, 108) + rect(46, 64, 16, 12, 4, 'blue') + rect(72, 88, 16, 12, 4, 'yellow') + rect(98, 72, 16, 12, 4, 'coral'),

  // custom software capabilities
  erp: blob(80, 84, 56) + rect(30, 34, 46, 40, 8, 'blue') + rect(84, 34, 46, 40, 8, 'paper') + rect(30, 82, 46, 40, 8, 'paper') + rect(84, 82, 46, 40, 8, 'yellow') + circ(80, 78, 10, 'coral'),
  saas: blob(80, 84, 56, 'sun') + win(48, 26, 84, 64, 'paper') + win(28, 58, 84, 70, 'paper', 'blue') + rect(40, 92, 26, 24, 4, 'sky') + line(74, 96, 102, 96) + line(74, 108, 94, 108),
  legacy: blob(80, 84, 56) + rect(22, 42, 56, 46, 6, 'sky') + line(36, 100, 64, 100) + line(50, 88, 50, 100) + `<path d="M84 64h22M98 56l8 8-8 8" fill="none" ${ink}/>` + win(92, 76, 50, 44, 'paper') + star(118, 38, 9),
  analytics: blob(80, 84, 56, 'peach') + rect(28, 32, 104, 94, 12, 'paper') + bars(42, 112, [24, 46, 34, 62], 13, 8) + circ(118, 46, 9, 'yellow'),
  access: blob(80, 84, 56) + circ(58, 72, 22, 'yellow') + circ(58, 72, 8, 'paper') + path('M76 84l42 42M100 108l10-10M110 118l10-10') + shield(122, 52, 0.55, 'blue'),
  api: blob(80, 84, 56, 'sun') + rect(26, 64, 40, 34, 8, 'blue') + `<path d="M66 74h16M66 88h16" fill="none" ${ink}/>` + path('M26 81H14', 'none') + rect(94, 60, 42, 42, 10, 'paper') + circ(106, 81, 4, 'ink') + circ(124, 81, 4, 'ink') + path('M115 102v24', 'none') + spark(80, 44) + spark(56, 126, 5),

  // mobile capabilities
  ios: blob(80, 84, 56) + phone(52, 24, 56, 110, 'paper', 'sky') + circ(80, 74, 14, 'blue') + star(118, 42, 10) + spark(36, 120, 5),
  android: blob(80, 84, 56, 'sun') + phone(52, 24, 56, 110, 'blue', 'paper') + gear(80, 76, 12, 'yellow') + spark(124, 44) + dot(34, 108, 4, 'coral'),
  'cross-platform': blob(80, 84, 56) + phone(26, 34, 48, 94, 'blue') + phone(86, 34, 48, 94, 'paper', 'sky') + `<path d="M64 20c10-8 22-8 32 0M92 14l4 6-7 2" fill="none" ${ink}/>` + star(110, 80, 9),
  layers: blob(80, 84, 56, 'peach') + phone(50, 26, 60, 110, 'paper', 'sky') + rect(60, 52, 40, 14, 4, 'blue') + rect(60, 72, 40, 14, 4, 'yellow') + rect(60, 92, 40, 14, 4, 'coral'),
  'offline-sync': blob(80, 84, 56) + phone(30, 40, 50, 96, 'blue') + cloud(80, 26, 0.7, 'paper') + `<path d="M104 72c0 18-6 30-20 36M90 98l-6 10 12 2" fill="none" ${ink}/>` + spark(134, 112, 6),
  'mobile-security': blob(80, 84, 56, 'sun') + phone(36, 28, 56, 108, 'paper', 'sky') + shield(108, 92, 0.75, 'blue') + check(108, 94, 0.8),

  // strategy capabilities
  prd: blob(80, 84, 56) + doc(36, 24, 80, 108) + badge(110, 112, 15) + star(130, 36, 9),
  triage: blob(80, 84, 56, 'peach') + path('M28 36h104l-38 44v34l-28 14V80Z', 'blue') + rect(40, 18, 20, 14, 4, 'yellow') + rect(68, 14, 24, 16, 4, 'paper') + rect(100, 18, 20, 14, 4, 'coral'),
  prototype: blob(80, 84, 56) + rect(24, 32, 64, 92, 10, 'paper') + rect(34, 44, 44, 26, 4, 'sky') + line(34, 82, 76, 82) + line(34, 96, 66, 96) + rect(98, 46, 40, 64, 8, 'blue') + path('M88 78h10M93 73l5 5-5 5') + star(124, 30, 8),
  journey: blob(80, 84, 56, 'sun') + path('M24 122c20 0 18-34 40-34s14-34 36-34 18-16 30-16', 'none') + `<path d="M24 122c20 0 18-34 40-34s14-34 36-34 18-16 30-16" fill="none" stroke="var(--d-paper)" stroke-width="2" stroke-dasharray="4 8"/>` + circ(64, 88, 8, 'blue') + pin(124, 36, 0.9, 'coral') + circ(24, 122, 7, 'yellow'),
  roadmap: blob(80, 84, 56) + line(28, 112, 132, 112) + circ(42, 112, 8, 'blue') + circ(80, 112, 8, 'blue') + circ(118, 112, 8, 'yellow') + line(118, 104, 118, 40) + path('M118 40h22l-6 10 6 10h-22Z', 'coral') + rect(28, 46, 44, 30, 6, 'paper') + line(38, 58, 62, 58),
  metrics: blob(80, 84, 56, 'peach') + circ(80, 82, 44, 'paper') + circ(80, 82, 29, 'sky') + circ(80, 82, 14, 'coral') + path('M80 82l40-40M108 42h12v12'),

  // web capabilities
  portal: blob(80, 84, 56) + win(22, 34, 116, 90) + person(62, 82, 'blue') + line(96, 72, 126, 72) + line(96, 86, 120, 86) + rect(96, 98, 26, 12, 4, 'yellow'),
  dashboard: blob(80, 84, 56, 'sun') + win(22, 34, 116, 90) + rect(32, 64, 30, 50, 5, 'blue') + rect(70, 64, 58, 22, 5, 'paper') + bars(74, 112, [10, 18, 14], 10, 6) + circ(116, 101, 9, 'coral'),
  realtime: blob(80, 84, 56) + win(22, 34, 116, 90) + bolt(66, 62, 1.15) + spark(132, 26) + dot(28, 132, 4, 'coral'),
  pwa: blob(80, 84, 56, 'peach') + win(20, 30, 92, 76, 'paper') + phone(92, 56, 46, 84, 'blue') + path('M48 70v20M40 82l8 8 8-8'),
  seo: blob(80, 84, 56) + win(22, 34, 96, 78) + bars(34, 100, [14, 26, 40], 12, 7) + circ(112, 100, 20, 'yellow') + line(126, 114, 140, 128),

  // industries
  healthcare: blob(80, 84, 56, 'peach') + rect(34, 44, 92, 74, 12, 'paper') + path('M70 62h20v16h16v20H90v16H70V98H54V78h16Z', 'coral') + spark(132, 34),
  finance: blob(80, 84, 56) + rect(24, 50, 104, 72, 12, 'blue') + path('M24 70h104', 'none') + rect(96, 76, 40, 28, 8, 'paper') + circ(110, 90, 5, 'yellow') + line(38, 104, 70, 104) + coin(118, 40, 14),
  ecommerce: blob(80, 84, 56, 'sun') + path('M26 42h16l14 56h62l12-42H50', 'none') + path('M54 56h76l-12 42H62Z', 'blue') + circ(66, 118, 8, 'paper') + circ(108, 118, 8, 'paper') + star(126, 30, 9),
  logistics: blob(80, 84, 56) + rect(22, 54, 70, 56, 6, 'paper') + path('M92 70h24l18 20v20H92Z', 'blue') + circ(48, 116, 10, 'yellow') + circ(114, 116, 10, 'yellow') + rect(36, 66, 22, 18, 3, 'sky'),
  education: blob(80, 84, 56, 'peach') + path('M80 40l56 24-56 24-56-24Z', 'blue') + path('M48 76v28c16 12 48 12 64 0V76') + line(136, 64, 136, 96) + circ(136, 100, 5, 'yellow'),
  'real-estate': blob(80, 84, 56) + path('M30 76L80 34l50 42', 'none') + path('M42 68v56h76V68L80 38Z', 'paper') + rect(68, 92, 24, 32, 4, 'blue') + rect(48, 78, 16, 14, 3, 'yellow') + rect(96, 78, 16, 14, 3, 'yellow'),
  travel: blob(80, 84, 56, 'sun') + rect(42, 52, 76, 70, 12, 'blue') + path('M64 52V40a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v12') + line(42, 78, 118, 78) + rect(72, 72, 16, 14, 4, 'yellow') + circ(54, 126, 5, 'paper') + circ(106, 126, 5, 'paper'),
  restaurant: blob(80, 84, 56, 'peach') + path('M28 96a52 52 0 0 1 104 0Z', 'yellow') + rect(22, 96, 116, 14, 6, 'paper') + circ(80, 40, 6, 'coral') + spark(130, 40, 6) + `<path d="M58 70c6-10 14-14 22-14" fill="none" ${ink}/>`,
  'on-demand': blob(80, 84, 56) + phone(30, 30, 52, 100, 'paper', 'sky') + pin(56, 76, 0.7, 'coral') + bolt(98, 52, 0.95, 'yellow') + spark(134, 112, 6),
  automotive: blob(80, 84, 56, 'sun') + path('M24 104V88l14-26h70l22 26h8v16Z', 'blue') + `<path d="M46 66l-8 22h88l-18-22" fill="none" ${ink}/>` + circ(50, 106, 12, 'paper') + circ(110, 106, 12, 'paper') + dot(50, 106) + dot(110, 106),
  ev: blob(80, 84, 56) + rect(40, 40, 54, 90, 10, 'paper') + rect(52, 54, 30, 24, 4, 'sky') + bolt(56, 86, 0.75, 'yellow') + path('M94 70h14a8 8 0 0 1 8 8v28a8 8 0 0 0 16 0V64') + rect(124, 44, 16, 20, 4, 'blue'),
  energy: blob(80, 84, 56, 'sun') + circ(80, 70, 30, 'yellow') + `<path d="M80 20v10M80 110v10M30 70h10M120 70h10M45 35l7 7M108 98l7 7M115 35l-7 7M52 98l-7 7" fill="none" ${ink}/>` + rect(44, 112, 72, 20, 4, 'blue') + line(80, 112, 80, 132),
  manufacturing: blob(80, 84, 56) + path('M24 124V70l30 18V70l30 18V48h28v76Z', 'paper') + rect(88, 26, 14, 22, 3, 'blue') + rect(36, 100, 14, 12, 3, 'yellow') + rect(66, 100, 14, 12, 3, 'yellow') + gear(124, 108, 12, 'coral'),
  construction: blob(80, 84, 56, 'peach') + path('M30 98a50 50 0 0 1 100 0Z', 'yellow') + rect(24, 98, 112, 14, 6, 'yellow') + line(80, 48, 80, 98) + `<path d="M64 52v24M96 52v24" fill="none" ${ink}/>` + spark(134, 36),
  agriculture: blob(80, 84, 56, 'sun') + path('M80 128V70', 'none') + path('M80 92c-26 0-36-18-36-36 26 0 36 18 36 36Z', 'blue') + path('M80 76c0-22 12-38 36-38 0 22-12 38-36 38Z', 'yellow') + line(44, 128, 116, 128) + spark(36, 40),
  aviation: blob(80, 84, 56) + path('M78 26c6 0 8 8 8 16v26l46 26v12l-46-12v22l14 10v10l-22-6-22 6v-10l14-10v-22l-46 12v-12l46-26V42c0-8 2-16 8-16Z', 'paper') + circ(80, 58, 5, 'blue') + spark(128, 40),
  telecom: blob(80, 84, 56, 'peach') + path('M66 132l14-64 14 64Z', 'paper') + circ(80, 60, 9, 'blue') + `<path d="M58 40a30 30 0 0 0 0 40M102 40a30 30 0 0 1 0 40M44 28a48 48 0 0 0 0 64M116 28a48 48 0 0 1 0 64" fill="none" ${ink}/>` + line(72, 104, 88, 104),
  media: blob(80, 84, 56) + rect(26, 40, 108, 76, 12, 'blue') + path('M70 62v32l28-16Z', 'yellow') + line(52, 132, 108, 132) + line(80, 116, 80, 132),
  gaming: blob(80, 84, 56, 'sun') + path('M46 54h68a24 24 0 0 1 24 26l-4 26a14 14 0 0 1-24 6l-10-10H60L50 112a14 14 0 0 1-24-6l-4-26a24 24 0 0 1 24-26Z', 'blue') + `<path d="M50 74v18M41 83h18" fill="none" ${ink}/>` + circ(104, 76, 5, 'yellow') + circ(116, 88, 5, 'coral'),
  social: blob(80, 84, 56) + circ(56, 66, 18, 'yellow') + circ(108, 58, 14, 'coral') + circ(96, 110, 16, 'blue') + `<path d="M72 72l22-8M68 80l18 20M104 72l-4 22" fill="none" ${ink}/>` + spark(34, 118, 6),
  fitness: blob(80, 84, 56, 'peach') + rect(20, 64, 14, 32, 4, 'blue') + rect(34, 56, 14, 48, 4, 'blue') + rect(112, 56, 14, 48, 4, 'blue') + rect(126, 64, 14, 32, 4, 'blue') + rect(48, 74, 64, 12, 3, 'paper') + path('M80 46c-6-8-18-4-14 6l14 10 14-10c4-10-8-14-14-6Z', 'coral'),
  events: blob(80, 84, 56, 'peach') + path('M30 52h100v18a12 12 0 0 0 0 24v18H30V94a12 12 0 0 0 0-24Z', 'yellow') + `<path d="M98 54v56" fill="none" stroke="var(--d-ink)" stroke-width="3" stroke-dasharray="4 7" stroke-linecap="round"/>` + line(44, 74, 84, 74) + line(44, 90, 74, 90) + star(124, 32, 10) + spark(28, 130, 5),
  government: blob(80, 84, 56, 'sun') + path('M24 60L80 30l56 30Z', 'blue') + `<path d="M38 66v46M60 66v46M100 66v46M122 66v46" fill="none" ${ink}/>` + rect(24, 112, 112, 16, 4, 'paper') + circ(80, 48, 6, 'yellow'),
  'saas-industry': blob(80, 84, 56) + cloud(34, 28, 0.95, 'paper') + win(40, 80, 80, 54, 'paper', 'blue') + line(52, 112, 108, 112) + star(130, 44, 9),

  // careers
  team: blob(80, 86, 58, 'peach') + path('M18 132v-8a26 26 0 0 1 52 0v8Z', 'blue') + circ(44, 78, 17, 'peach') + path('M27 74a17 17 0 0 1 34 0c-8-6-26-6-34 0Z', 'ink') +
    path('M90 132v-8a26 26 0 0 1 52 0v8Z', 'yellow') + circ(116, 78, 17, 'peach') + path('M99 76a17 17 0 0 1 34 0c-4-10-30-12-34 0Z', 'coral') + star(80, 40, 11) + spark(30, 34, 6) + spark(136, 40, 5),
  remote: blob(80, 84, 56) + rect(26, 46, 92, 62, 8, 'paper') + rect(34, 54, 76, 46, 4, 'sky') + path('M16 116h112l-8 10H24Z', 'blue') + pin(122, 50, 0.8, 'coral') + spark(40, 32, 6),

  // misc
  check: blob(80, 80, 52) + badge(80, 80, 34) + spark(124, 36) + spark(36, 124, 5),
  question: blob(80, 82, 56, 'sun') + bubble(30, 36, 100, 70, 'yellow') + `<path d="M68 60a12 12 0 1 1 18 10c-4 3-6 6-6 10" fill="none" ${ink}/>` + dot(80, 92, 3.8),
};

// Aliases so data files can use natural names.
const ALIAS = {
  'devops-cloud-engineering': 'cloud', 'ai-product-development': 'ai', 'mobile-app-development': 'mobile',
  'web-application-development': 'web', 'custom-software-development': 'custom-software', 'product-strategy-prd': 'rocket',
  fintech: 'finance', 'travel-hospitality': 'travel', 'electric-vehicles': 'ev', 'media-entertainment': 'media',
  'gaming-sports': 'gaming', 'social-networking': 'social', 'fitness-wellness': 'fitness', saas: 'saas-industry',
};

// Colour tones. Each doodle's main fill (--d-blue) and pale blob (--d-sky) are swapped per tone,
// with the warm accents adjusted so they stay visible. Doodles take tones in turn as they are listed
// above, so neighbours in a group (services, capabilities, industries) always differ.
const TONES = {
  blue: '',
  coral: '--d-blue:#ff8f6b;--d-sky:#ffeee6;--d-coral:#ffc94d',
  yellow: '--d-blue:#ffc94d;--d-sky:#fff4d6;--d-yellow:#7ea6ff',
  violet: '--d-blue:#a78bfa;--d-sky:#f1ecff',
  green: '--d-blue:#5fd39a;--d-sky:#e6f6ee',
};
const ORDER = ['blue', 'coral', 'yellow', 'violet', 'green'];
const toneOf = (name) => ORDER[Math.max(0, Object.keys(D).indexOf(ALIAS[name] || name)) % ORDER.length];
const toneStyle = (tone) => (TONES[tone] ? ` style="${TONES[tone]}"` : '');

const has = (name) => Boolean(D[ALIAS[name] || name]);
function doodle(name, cls = 'doodle', tone = toneOf(name)) {
  const body = D[ALIAS[name] || name];
  if (!body) throw new Error('unknown doodle: ' + name);
  return `<svg class="${cls}" viewBox="0 0 160 160" aria-hidden="true" focusable="false"${toneStyle(tone)}>${body}</svg>`;
}

// ---- blog cover scenes: a main doodle and a smaller supporting one on a soft panel (480 x 300 canvas)
const BLOG_ART = {
  'ai-app-development-cost': ['ai', 'pricing', 'peach'],
  'custom-erp-vs-off-the-shelf-erp': ['erp', 'layers', 'sun'],
  'how-to-choose-a-software-development-company': ['senior', 'question', 'sky'],
  'what-is-a-prd-how-to-write-a-product-requirements-document': ['prd', 'prototype', 'sun'],
  'how-to-add-ai-to-an-existing-product': ['ai', 'dashboard', 'peach'],
  'mobile-app-vs-web-app-which-to-build-first': ['mobile', 'web', 'sky'],
  'fixed-price-vs-time-and-materials-software-development': ['pricing', 'calendar', 'sun'],
  'cost-to-build-mvp-2026': ['rocket', 'pricing', 'peach'],
  'product-scoping-framework-kill-feature-bloat': ['triage', 'roadmap', 'sky'],
  'pragmatic-enterprise-ai-workflows': ['rag', 'agent', 'sun'],
  'openai-select-partner': ['ai', 'check', 'sky'],
  'react-native-mobile-app-playbook': ['cross-platform', 'layers', 'peach'],
  'web-application-development-build-vs-buy': ['web', 'saas', 'sun'],
  'why-custom-erp-implementations-fail': ['erp', 'guardrails', 'sky'],
  // second October 2026 batch
  'how-to-build-a-saas-product': ['saas', 'rocket', 'sky'],
  'how-to-choose-a-tech-stack-for-your-startup': ['stack', 'layers', 'sun'],
  'ui-vs-ux-design-difference': ['design', 'journey', 'peach'],
  'agile-vs-waterfall-software-development': ['roadmap', 'calendar', 'sky'],
  'freelancer-vs-agency-for-app-development': ['team', 'senior', 'sun'],
  'software-maintenance-cost-and-planning': ['metrics', 'check', 'peach'],
  'how-to-build-a-food-delivery-app': ['restaurant', 'logistics', 'sky'],
  'how-to-build-a-telemedicine-app': ['healthcare', 'call', 'sun'],
  'how-to-build-a-fintech-app-in-india': ['finance', 'mobile-security', 'peach'],
  'how-to-build-an-edtech-app': ['education', 'mobile', 'sky'],
  'how-to-build-a-real-estate-app': ['real-estate', 'portal', 'sun'],
  'upi-payment-integration-for-apps': ['finance', 'api', 'peach'],
  'whatsapp-business-api-guide': ['chat', 'api', 'sky'],
  'pwa-vs-native-app': ['pwa', 'mobile', 'sun'],
  'legacy-software-modernization-guide': ['legacy', 'cloud', 'peach'],
  'aws-vs-azure-vs-google-cloud-for-startups': ['cloud', 'stack', 'sky'],
  'generative-ai-use-cases-for-business': ['ai', 'doc-scan', 'sun'],
  'how-to-reduce-ai-hallucinations': ['guardrails', 'rag', 'peach'],
  'how-to-write-user-stories': ['prd', 'journey', 'sky'],
  'app-store-optimization-guide': ['seo', 'mobile', 'sun'],
  // October 2026 guides
  'app-development-cost-factors-india': ['pricing', 'mobile', 'sun'],
  'how-long-does-it-take-to-build-an-app': ['calendar', 'roadmap', 'sky'],
  'react-native-vs-flutter': ['cross-platform', 'mobile', 'peach'],
  'native-vs-cross-platform-app-development': ['ios', 'android', 'sky'],
  'how-to-hire-app-developers-in-india': ['team', 'question', 'sun'],
  'outsourcing-software-development-to-india': ['remote', 'team', 'peach'],
  'mvp-vs-prototype-vs-proof-of-concept': ['prototype', 'rocket', 'sky'],
  'how-to-validate-a-startup-idea': ['question', 'metrics', 'sun'],
  'erp-vs-crm-difference': ['erp', 'dashboard', 'peach'],
  'custom-crm-vs-salesforce-hubspot-zoho': ['portal', 'growth', 'sky'],
  'how-to-build-an-ai-chatbot-for-business': ['chat', 'ai', 'sun'],
  'rag-vs-fine-tuning': ['rag', 'tuning', 'peach'],
  'ai-agents-for-business': ['agent', 'guardrails', 'sky'],
  'app-store-and-google-play-approval-guide': ['check', 'mobile', 'sun'],
  'mobile-app-security-checklist': ['mobile-security', 'access', 'peach'],
  'how-to-build-a-multi-vendor-marketplace-app': ['ecommerce', 'on-demand', 'sky'],
  'how-to-build-a-quick-commerce-app': ['logistics', 'realtime', 'sun'],
  'salon-booking-app-development': ['calendar', 'fitness', 'peach'],
  'dpdp-act-guide-for-app-founders': ['guardrails', 'doc-scan', 'sky'],
  'website-vs-web-app-difference': ['web', 'pwa', 'sun'],
  // moved from the earlier blog
  'the-future-of-digital-india-is-homegrown': ['cloud', 'government', 'sky'],
  'does-your-business-need-software': ['erp', 'growth', 'sun'],
  'the-essential-ingredients-for-a-successful-product-launch-by-nihar-ranjan-rout': ['rocket', 'roadmap', 'peach'],
  'investing-in-technology-a-smart-strategy-for-business-growth': ['growth', 'pricing', 'sky'],
};
const body = (name) => { const b = D[ALIAS[name] || name]; if (!b) throw new Error('unknown doodle: ' + name); return b; };
function scene(slug, cls = 'doodle-scene') {
  const art = BLOG_ART[slug];
  if (!art) throw new Error('no blog art for ' + slug);
  const [main, side, tone] = art;
  return `<svg class="${cls}" viewBox="0 0 480 300" aria-hidden="true" focusable="false">` +
    `<rect x="0" y="0" width="480" height="300" rx="24" ${f(tone)}/>` +
    `<g opacity=".55">${[0, 1, 2, 3, 4, 5, 6, 7].map((c) => [0, 1, 2, 3, 4].map((r) => `<circle cx="${40 + c * 57}" cy="${34 + r * 58}" r="2.2" fill="var(--d-ink)" opacity=".18"/>`).join('')).join('')}</g>` +
    `<circle cx="202" cy="152" r="106" fill="var(--d-paper)" opacity=".7"/>` +
    `<g transform="translate(78 28) scale(1.55)"${toneStyle(toneOf(main))}>${body(main)}</g>` +
    `<g transform="translate(300 128) scale(.95)"${toneStyle(toneOf(side) === toneOf(main) ? 'coral' : toneOf(side))}>${body(side)}</g>` +
    `<g>${spark(52, 60, 9)}${spark(430, 52, 8)}${star(440, 250, 11)}</g></svg>`;
}

module.exports = { doodle, has, scene, BLOG_ART, TONES, names: Object.keys(D), D };
