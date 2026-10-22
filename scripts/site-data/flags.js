/**
 * Small flat flags (inline SVG, 3:2) for the footer country cards and the country pages.
 * Simplified on purpose so they stay crisp at 24 to 48 px and need no image files or emoji
 * (flag emoji show as two letters on Windows).
 */
const UNION = (w = 60, h = 30) => `<svg x="0" y="0" width="${w}" height="${h}" viewBox="0 0 60 30" preserveAspectRatio="none"><rect width="60" height="30" fill="#012169"/><path d="M0 0L60 30M60 0L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" stroke-width="2"/><path d="M30 0V30M0 15H60" stroke="#fff" stroke-width="10"/><path d="M30 0V30M0 15H60" stroke="#C8102E" stroke-width="6"/></svg>`;
const star = (cx, cy, r, fill = '#fff') => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
};

const BODY = {
  in: `<rect width="90" height="20" fill="#FF9933"/><rect y="20" width="90" height="20" fill="#fff"/><rect y="40" width="90" height="20" fill="#138808"/><circle cx="45" cy="30" r="7" fill="none" stroke="#000080" stroke-width="1.6"/><circle cx="45" cy="30" r="1.4" fill="#000080"/>`,
  us: `${Array.from({ length: 13 }, (_, i) => `<rect y="${(i * 60) / 13}" width="90" height="${60 / 13 + 0.1}" fill="${i % 2 ? '#fff' : '#B22234'}"/>`).join('')}<rect width="38" height="${(60 / 13) * 7}" fill="#3C3B6E"/>${Array.from({ length: 20 }, (_, i) => `<circle cx="${4 + (i % 5) * 7.5}" cy="${4 + Math.floor(i / 5) * 7.6}" r="1.3" fill="#fff"/>`).join('')}`,
  gb: UNION(90, 60),
  ca: `<rect width="90" height="60" fill="#fff"/><rect width="22.5" height="60" fill="#D80621"/><rect x="67.5" width="22.5" height="60" fill="#D80621"/><polygon fill="#D80621" points="45,12 48,18 52,16.5 50.5,25 55,22 57,25 54,27.5 56,29 49.5,33 50.5,36 46,35 46,44 44,44 44,35 39.5,36 40.5,33 34,29 36,27.5 33,25 35,22 39.5,25 38,16.5 42,18"/>`,
  ae: `<rect width="90" height="20" fill="#00732F"/><rect y="20" width="90" height="20" fill="#fff"/><rect y="40" width="90" height="20" fill="#000"/><rect width="24" height="60" fill="#FF0000"/>`,
  au: `<rect width="90" height="60" fill="#012169"/>${UNION(45, 30)}${star(22.5, 45, 7)}${star(68, 46, 4)}${star(60, 30, 4)}${star(68, 12, 4)}${star(77, 25, 4)}`,
  sg: `<rect width="90" height="30" fill="#EF3340"/><rect y="30" width="90" height="30" fill="#fff"/><circle cx="20" cy="15" r="9" fill="#fff"/><circle cx="24" cy="15" r="9" fill="#EF3340"/>${star(30, 9, 2.2)}${star(36, 13, 2.2)}${star(34, 20, 2.2)}${star(26, 20, 2.2)}${star(24, 13, 2.2)}`,
  vn: `<rect width="90" height="60" fill="#DA251D"/>${star(45, 31, 17, '#FFFF00')}`,
};

const flag = (code, cls = 'cty-flag') => `<svg class="${cls}" viewBox="0 0 90 60" aria-hidden="true" focusable="false">${BODY[code]}</svg>`;

module.exports = { flag, codes: Object.keys(BODY) };
