/**
 * Small line glyphs for the navigation menus and footer (24 x 24, drawn for this site).
 * Shown white inside a solid round badge (.sc-ico in assets/chrome.css). The bigger, illustrated
 * icons used in page content are the doodles in doodles.js.
 *
 * Usage: glyph('phone') returns the badge markup; G lists the available names.
 */
const G = {
  code: '<path d="M8.5 8 4.5 12l4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  browser: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M3 9h18M6.5 6.8h.01M9 6.8h.01"/>',
  cloud: '<path d="M7.5 18.5h9.5a4.2 4.2 0 0 0 .6-8.36A6 6 0 0 0 6.2 9.4a4.6 4.6 0 0 0 1.3 9.1z"/>',
  spark: '<path d="M12 3.5 13.8 8.6 19 10.5 13.8 12.4 12 17.5 10.2 12.4 5 10.5 10.2 8.6Z"/><path d="M18.5 16v4M16.5 18h4"/>',
  rocket: '<path d="M12 2.8c3 2.2 4.6 6 3.8 10.7H8.2C7.4 8.8 9 5 12 2.8Z"/><path d="M8.6 12.2 6 16.5l3.4-1M15.4 12.2 18 16.5l-3.4-1M10.5 17.5 12 21l1.5-3.5"/><circle cx="12" cy="8.5" r="1.4"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2A5 5 0 0 1 21 19"/>',
  building: '<path d="M4.5 21V5.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2V21M15.5 9.5h2a2 2 0 0 1 2 2V21M3 21h18M8 7.5h4M8 11h4M8 14.5h4"/>',
  chat: '<path d="M20.5 14.5a2 2 0 0 1-2 2H8.5l-4 3.5V6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/><path d="M8.5 9h8M8.5 12.2h5"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.2-4.6L4 8.5M4 4v4.5h4.5M4 13a8 8 0 0 0 14.2 4.6L20 15.5M20 20v-4.5h-4.5"/>',
  cart: '<path d="M3 4h2.4l2 11h10.2l2-7.5H6.3"/><circle cx="9" cy="19.2" r="1.3"/><circle cx="16.5" cy="19.2" r="1.3"/>',
  bot: '<rect x="4.5" y="8" width="15" height="11" rx="3"/><path d="M12 8V4.5M9 13h.01M15 13h.01M2.5 13h2M19.5 13h2"/><circle cx="12" cy="3.8" r="1"/>',
  layers: '<path d="M12 3.5 21 8.2l-9 4.7-9-4.7Z"/><path d="m3 12.5 9 4.7 9-4.7M3 16.6l9 4.7 9-4.7"/>',
  check: '<circle cx="12" cy="12" r="8.5"/><path d="m8.3 12.2 2.5 2.5 5-5.2"/>',
  devices: '<rect x="2.5" y="4.5" width="14" height="10" rx="1.8"/><path d="M6 18.5h6M9.5 14.5v4"/><rect x="16.5" y="8.5" width="5" height="11" rx="1.4"/>',
  download: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M12 7.5v7M9 11.5l3 3 3-3"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>',
  pen: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16Z"/><path d="m13.5 6.5 4 4"/>',
  server: '<rect x="3.5" y="4" width="17" height="7" rx="1.8"/><rect x="3.5" y="13" width="17" height="7" rx="1.8"/><path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6"/>',
  pipeline: '<circle cx="5.5" cy="6" r="2.3"/><circle cx="18.5" cy="6" r="2.3"/><circle cx="12" cy="18" r="2.3"/><path d="M7.8 6h8.4M6.8 8l4 7.8M17.2 8l-4 7.8"/>',
  box: '<path d="M12 2.8 20 7.4v9.2l-8 4.6-8-4.6V7.4Z"/><path d="m4 7.4 8 4.6 8-4.6M12 12v9.2"/>',
  bolt: '<path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12Z"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M9 8.5h6M9 11.5h6M9 8.5c4.2 0 4.2 6 0 6l5 3.5"/>',
  pulse: '<path d="M3 12.5h3.8l2.4-6 4.4 12 2.6-6H21"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>',
  wand: '<path d="m4 20 11-11M14 4l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1ZM19 12.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z"/>',
  frame: '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M3.5 9h17M9 9v11.5"/>',
  branch: '<circle cx="6" cy="5.5" r="2.2"/><circle cx="6" cy="18.5" r="2.2"/><circle cx="18" cy="8" r="2.2"/><path d="M6 7.7v8.6M18 10.2c0 4.3-6 3.3-12 6.1"/>',
  present: '<rect x="3" y="4" width="18" height="12" rx="1.8"/><path d="M12 16v4M8.5 20h7M10 8v4.5l3.8-2.2Z"/>',
  trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z"/><path d="M7.5 12h2.4l1.3-2.3 1.8 4.3 1.2-2h2.3"/>',
  wallet: '<path d="M4 7.5V18a2 2 0 0 0 2 2h13.5a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H6A2 2 0 0 1 4 7Zm0 0a2 2 0 0 1 2-2h11.5"/><path d="M16.5 14h.01"/>',
  truck: '<path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  cap: '<path d="M12 4.5 22 9l-10 4.5L2 9Z"/><path d="M6 11v4.5c3.5 2.6 8.5 2.6 12 0V11M22 9v5"/>',
  home: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5M10 20v-5.5h4V20"/>',
  luggage: '<rect x="5" y="7" width="14" height="13" rx="2.5"/><path d="M9 7V4.5h6V7M9 11v5M15 11v5"/>',
  fork: '<path d="M7 3v7a2.5 2.5 0 0 0 5 0V3M9.5 3v18M17 21V3c-2 1.5-3 4-3 7v4h3"/>',
  pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.4"/>',
  car: '<path d="M4 16.5v-4l2-5h12l2 5v4"/><path d="M3.5 12.5h17M4 16.5h16"/><circle cx="7.5" cy="16.8" r="1.6"/><circle cx="16.5" cy="16.8" r="1.6"/>',
  battery: '<rect x="2.5" y="7" width="16" height="10" rx="2"/><path d="M21 10.5v3M11 9l-2 3h3l-2 3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/>',
  factory: '<path d="M3 20.5V9l5.5 3.5V9l5.5 3.5V4.5h5V20.5Z"/><path d="M3 20.5h18M7 16.5h2M12 16.5h2"/>',
  hammer: '<path d="M14 6.5 9.5 11l7.5 9 2.5-2.5-9-7.5L15 6M12.5 4l6.5 6.5-1.5 1.5-6.5-6.5Z"/>',
  leaf: '<path d="M5 19c0-8 5-13 15-14 0 10-5 15-13 15"/><path d="M5 19c3-5 6-7.5 9.5-9"/>',
  plane: '<path d="M10.5 4.5c0-1 .7-2 1.5-2s1.5 1 1.5 2V10l7.5 4.5V17l-7.5-2.5v3.8l2.3 1.7v2l-3.8-1-3.8 1v-2l2.3-1.7v-3.8L3 17v-2.5L10.5 10Z"/>',
  antenna: '<path d="M12 11 8 21M12 11l4 10M9.4 17.5h5.2"/><circle cx="12" cy="9.5" r="1.6"/><path d="M8.2 6a5.4 5.4 0 0 0 0 7M15.8 6a5.4 5.4 0 0 1 0 7"/>',
  play: '<rect x="3" y="4.5" width="18" height="13" rx="2.2"/><path d="M10 8v6l5-3ZM8 21h8"/>',
  gamepad: '<path d="M7 7.5h10a4.5 4.5 0 0 1 4.4 5.4l-.8 4a2.5 2.5 0 0 1-4.2 1.3L14.5 16h-5l-1.9 2.2a2.5 2.5 0 0 1-4.2-1.3l-.8-4A4.5 4.5 0 0 1 7 7.5Z"/><path d="M8 10.5v3M6.5 12h3M15.5 11h.01M17.5 13h.01"/>',
  share: '<circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="6" r="2.6"/><circle cx="18" cy="18" r="2.6"/><path d="m8.3 10.8 7.4-3.6M8.3 13.2l7.4 3.6"/>',
  dumbbell: '<path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>',
  ticket: '<path d="M3.5 7.5h17v3a1.8 1.8 0 0 0 0 3v3h-17v-3a1.8 1.8 0 0 0 0-3Z"/><path d="M14.5 7.5v9" stroke-dasharray="1.5 2"/>',
  landmark: '<path d="M3 9.5 12 4l9 5.5ZM5 9.5v8M9.7 9.5v8M14.3 9.5v8M19 9.5v8M3 20.5h18"/>',
  user: '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2.2"/><path d="M8.5 7V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v2M3 12.5h18"/>',
  book: '<path d="M3.5 5.5A2 2 0 0 1 5.5 4H11v16H5.5a2 2 0 0 0-2 2ZM20.5 5.5A2 2 0 0 0 18.5 4H13v16h5.5a2 2 0 0 1 2 2Z"/>',
  calculator: '<rect x="5" y="2.5" width="14" height="19" rx="2.2"/><path d="M8.5 6.5h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h3.5"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9.5 9.5h5v5h-5zM9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
  tool: '<path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L3.5 17.5l3 3 5.7-5.7a4 4 0 0 0 5.3-5.3l-2.5 2.5-2.5-.5-.5-2.5Z"/>',
  file: '<path d="M6.5 3h8l4 4v13a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14.5 3v4h4M9 12h6M9 15.5h6"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4.5l2 2.5H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
};

function glyph(name, cls = 'sc-ico') {
  const d = G[name];
  if (!d) throw new Error('unknown glyph: ' + name);
  return `<span class="${cls}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${d}</svg></span>`;
}

module.exports = { glyph, G };
