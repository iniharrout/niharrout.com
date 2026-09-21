/**
 * LinkedIn Text Formatter & Hook Optimizer Engine
 * For NiharRout.com
 *
 * Features:
 * - 22+ Unicode Typography Styles (Bold, Italic, Script, Monospace, Gothic, etc.)
 * - In-place selection formatting (Bold, Italic, Underline, Strikethrough, Lists)
 * - Live LinkedIn Post Feed Mockup (Desktop vs Mobile)
 * - Hook Cutoff Detector (Simulates LinkedIn's "...see more" fold threshold)
 * - Quick Hook Presets & Templates
 * - Emoji Picker with top-converting LinkedIn emojis
 * - 1-Click Copy with toast notifications
 */

(function () {
  'use strict';

  // ================= UNICODE CONVERSION MAPS =================
  const NORMAL_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const NORMAL_LOWER = 'abcdefghijklmnopqrstuvwxyz';
  const NORMAL_DIGITS = '0123456789';

  // Character mapping dictionaries for exact glyph fidelity
  const STYLES = {
    boldSans: {
      name: 'Bold Sans',
      category: 'bold',
      desc: 'Modern, high-visibility headline style',
      upper: '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭',
      lower: '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇',
      digits: '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'
    },
    boldSerif: {
      name: 'Bold Serif',
      category: 'bold',
      desc: 'Editorial, classic authority aesthetic',
      upper: '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙',
      lower: '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳',
      digits: '𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗'
    },
    italicSans: {
      name: 'Italic Sans',
      category: 'italic',
      desc: 'Sleek, modern emphasis',
      upper: '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡',
      lower: '𝘢𝘣𝘤𝘥𝘦𝗳𝗴𝗵𝗶𝗷𝗸𝘭𝘮𝘯𝘰𝘱𝲂𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻'
    },
    italicSerif: {
      name: 'Italic Serif',
      category: 'italic',
      desc: 'Traditional typographic slant',
      // Note: 'h' in math italic is U+210E (Planck constant: ℎ)
      upper: '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍',
      lower: '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧'
    },
    boldItalicSans: {
      name: 'Bold Italic Sans',
      category: 'bold',
      desc: 'Maximum urgency and emphasis',
      upper: '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕',
      lower: '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣ⲟ𝘱𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯'
    },
    boldItalicSerif: {
      name: 'Bold Italic Serif',
      category: 'bold',
      desc: 'Prestigious, high-impact serif slant',
      upper: '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁',
      lower: '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'
    },
    underline: {
      name: 'Underline',
      category: 'emphasis',
      desc: 'Clean underline using combining diacritic',
      transform: function (text) {
        return text.split('').map(ch => (ch === '\n' || ch === ' ' ? ch : ch + '\u0332')).join('');
      }
    },
    doubleUnderline: {
      name: 'Double Underline',
      category: 'emphasis',
      desc: 'Distinct double bottom rule',
      transform: function (text) {
        return text.split('').map(ch => (ch === '\n' || ch === ' ' ? ch : ch + '\u0333')).join('');
      }
    },
    strikethrough: {
      name: 'Strikethrough',
      category: 'emphasis',
      desc: 'Before/after comparisons & deleted myths',
      transform: function (text) {
        return text.split('').map(ch => (ch === '\n' || ch === ' ' ? ch : ch + '\u0336')).join('');
      }
    },
    monospace: {
      name: 'Monospace / Code',
      category: 'creative',
      desc: 'Terminal font for technical breakdowns',
      upper: '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉',
      lower: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣',
      digits: '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿'
    },
    script: {
      name: 'Script / Cursive',
      category: 'creative',
      desc: 'Elegant handwritten cursive',
      upper: '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
      lower: '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'
    },
    boldScript: {
      name: 'Bold Script',
      category: 'creative',
      desc: 'Bold luxury calligraphy',
      upper: '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩',
      lower: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'
    },
    fraktur: {
      name: 'Gothic / Fraktur',
      category: 'creative',
      desc: 'Old-world medieval blackletter',
      upper: '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
      lower: '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'
    },
    boldFraktur: {
      name: 'Bold Fraktur',
      category: 'creative',
      desc: 'Heavyweight gothic blackletter',
      upper: '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅',
      lower: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟'
    },
    doubleStruck: {
      name: 'Double-Struck (Blackboard)',
      category: 'creative',
      desc: 'Mathematical blueprint style',
      upper: '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ',
      lower: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫',
      digits: '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡'
    },
    smallCaps: {
      name: 'Small Caps',
      category: 'creative',
      desc: 'Subtle, sophisticated all-caps',
      transform: function (text) {
        const smallCapsMap = {
          a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
          j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
          s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
          A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ', I: 'ɪ',
          J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ', Q: 'ǫ', R: 'ʀ',
          S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x', Y: 'ʏ', Z: 'ᴢ'
        };
        return text.split('').map(ch => smallCapsMap[ch] || ch).join('');
      }
    },
    bubble: {
      name: 'Circled / Bubble',
      category: 'creative',
      desc: 'Outlined badge numbering & list markers',
      upper: 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ',
      lower: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
      digits: '⓪①②③④⑤⑥⑦⑧⑨'
    },
    darkBubble: {
      name: 'Inverted Dark Bubble',
      category: 'creative',
      desc: 'Bold solid circled contrast',
      upper: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩',
      lower: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩',
      digits: '⓿❶❷❸❹❺❻❼❽❾'
    },
    squared: {
      name: 'Boxed / Squared',
      category: 'creative',
      desc: 'Letter blocks for branding & tags',
      upper: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉',
      lower: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'
    },
    darkSquared: {
      name: 'Inverted Dark Box',
      category: 'creative',
      desc: 'Heavy solid badges',
      upper: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉',
      lower: '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉'
    },
    upsideDown: {
      name: 'Upside Down / Flipped',
      category: 'creative',
      desc: 'Scroll-stopping novelty hooks',
      transform: function (text) {
        const flipMap = {
          a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
          j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
          s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
          A: '∀', B: '𐐒', C: 'Ɔ', D: '◖', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I',
          J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ',
          S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
          '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
          '?': '¿', '!': '¡', '.': '˙', ',': '\'', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
          '<': '>', '>': '<', '_': '‾'
        };
        return text.split('').reverse().map(ch => flipMap[ch] || ch).join('');
      }
    }
  };

  // Helper to split surrogate pairs accurately
  function splitUnicodeChars(str) {
    if (!str) return [];
    return Array.from(str);
  }

  // Convert plain text to target style
  function convertText(text, styleKey) {
    if (!text) return '';
    const style = STYLES[styleKey];
    if (!style) return text;

    if (typeof style.transform === 'function') {
      return style.transform(text);
    }

    const upperArray = style.upper ? splitUnicodeChars(style.upper) : [];
    const lowerArray = style.lower ? splitUnicodeChars(style.lower) : [];
    const digitArray = style.digits ? splitUnicodeChars(style.digits) : [];

    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const upperIdx = NORMAL_UPPER.indexOf(char);
      if (upperIdx !== -1 && upperArray.length > upperIdx) {
        result += upperArray[upperIdx];
        continue;
      }
      const lowerIdx = NORMAL_LOWER.indexOf(char);
      if (lowerIdx !== -1 && lowerArray.length > lowerIdx) {
        result += lowerArray[lowerIdx];
        continue;
      }
      const digitIdx = NORMAL_DIGITS.indexOf(char);
      if (digitIdx !== -1 && digitArray.length > digitIdx) {
        result += digitArray[digitIdx];
        continue;
      }
      result += char;
    }
    return result;
  }

  // Reverse Unicode back to standard plain characters (for clean edits)
  function cleanToPlain(text) {
    if (!text) return '';
    let res = '';
    const chars = Array.from(text);

    for (let ch of chars) {
      let found = false;
      // Strip combining marks
      if (ch === '\u0332' || ch === '\u0333' || ch === '\u0336') continue;

      for (let key in STYLES) {
        const s = STYLES[key];
        if (s.upper) {
          const uArr = splitUnicodeChars(s.upper);
          const idx = uArr.indexOf(ch);
          if (idx !== -1) {
            res += NORMAL_UPPER[idx];
            found = true;
            break;
          }
        }
        if (s.lower) {
          const lArr = splitUnicodeChars(s.lower);
          const idx = lArr.indexOf(ch);
          if (idx !== -1) {
            res += NORMAL_LOWER[idx];
            found = true;
            break;
          }
        }
        if (s.digits) {
          const dArr = splitUnicodeChars(s.digits);
          const idx = dArr.indexOf(ch);
          if (idx !== -1) {
            res += NORMAL_DIGITS[idx];
            found = true;
            break;
          }
        }
      }
      if (!found) {
        res += ch;
      }
    }
    return res;
  }

  // ================= SAMPLE POSTS & PRESETS =================
  const SAMPLES = {
    framework: `Most founders build the wrong MVP.\n\nHere is the 3-step framework we use to validate demand BEFORE writing a single line of production code:\n\n1. Scope the absolute core value metric\n2. Talk to 15 qualified ICP buyers\n3. Pre-sell via interactive Figma prototype\n\nResult? 60% less engineering burn.\n\nWhat is your #1 rule before starting development?`,
    contrarian: `Unpopular truth: You don't need a 20-person engineering team to ship enterprise-grade software in 2026.\n\nA disciplined team of 3 senior engineers using modern toolchains will consistently outperform bloated agencies.\n\nAgree or disagree? #techleadership #startups #softwareengineering`,
    story: `6 months ago, a client was spending $18,000/month across 7 disparate SaaS tools.\n\nInventory was out of sync.\nOrders were dropping.\nThe warehouse team was working off paper sheets.\n\nWe unified their entire workflow into a single custom ERP in 8 weeks.\n\nHere are the 3 major takeaways... 👇`
  };

  // ================= DOM INITIALIZATION =================
  document.addEventListener('DOMContentLoaded', function () {
    const editor = document.getElementById('post-editor');
    if (!editor) return;

    // Elements
    const previewTextEl = document.getElementById('preview-post-text');
    const previewCutoffBadge = document.getElementById('preview-cutoff-badge');
    const seeMoreBtn = document.getElementById('preview-see-more');
    const charCountEl = document.getElementById('stat-char-count');
    const wordCountEl = document.getElementById('stat-word-count');
    const readingTimeEl = document.getElementById('stat-reading-time');
    const hookStatusEl = document.getElementById('hook-meter-status');
    const hookProgressEl = document.getElementById('hook-meter-progress');
    const deviceRadios = document.querySelectorAll('input[name="preview-device"]');
    const previewCard = document.getElementById('linkedin-preview-card');
    const stylesGrid = document.getElementById('styles-showcase-grid');
    const toastEl = document.getElementById('formatter-toast');

    // Default state
    let activeDevice = 'desktop'; // 'desktop' or 'mobile'
    let isPreviewExpanded = false;

    // Set initial text if empty
    if (!editor.value.trim()) {
      editor.value = SAMPLES.framework;
    }

    // ================= SELECTION FORMATTING IN EDITOR =================
    function applySelectionFormat(formatStyleKey) {
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const fullText = editor.value;

      if (start === end) {
        showToast('Tip: Select text first to apply formatting', 'info');
        return;
      }

      const selected = fullText.substring(start, end);
      const plainSelected = cleanToPlain(selected);
      const converted = convertText(plainSelected, formatStyleKey);

      editor.value = fullText.substring(0, start) + converted + fullText.substring(end);
      editor.focus();
      editor.setSelectionRange(start, start + converted.length);

      updateAll();
      showToast('Applied ' + (STYLES[formatStyleKey] ? STYLES[formatStyleKey].name : 'formatting') + '!');
    }

    // List formatting helpers
    function applyListFormat(type) {
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const fullText = editor.value;

      if (start === end) {
        const marker = type === 'bullet' ? '• ' : '1. ';
        editor.value = fullText.substring(0, start) + marker + fullText.substring(end);
        editor.focus();
        editor.setSelectionRange(start + marker.length, start + marker.length);
      } else {
        const selected = fullText.substring(start, end);
        const lines = selected.split('\n');
        const formattedLines = lines.map((line, idx) => {
          const cleanLine = line.replace(/^([•\-\*]|\d+\.)\s*/, '');
          if (!cleanLine.trim()) return line;
          return (type === 'bullet' ? '• ' : (idx + 1) + '. ') + cleanLine;
        });
        const replacement = formattedLines.join('\n');
        editor.value = fullText.substring(0, start) + replacement + fullText.substring(end);
        editor.focus();
        editor.setSelectionRange(start, start + replacement.length);
      }
      updateAll();
    }

    // ================= TOOLBAR BUTTONS =================
    document.querySelectorAll('[data-format-btn]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const format = this.getAttribute('data-format-btn');
        if (format === 'bullet') {
          applyListFormat('bullet');
        } else if (format === 'numbered') {
          applyListFormat('numbered');
        } else if (format === 'clear-formatting') {
          const start = editor.selectionStart;
          const end = editor.selectionEnd;
          if (start !== end) {
            const selected = editor.value.substring(start, end);
            const plain = cleanToPlain(selected);
            editor.value = editor.value.substring(0, start) + plain + editor.value.substring(end);
            editor.setSelectionRange(start, start + plain.length);
            updateAll();
            showToast('Cleared formatting from selection');
          } else {
            editor.value = cleanToPlain(editor.value);
            updateAll();
            showToast('Cleared all Unicode formatting');
          }
        } else {
          applySelectionFormat(format);
        }
      });
    });

    // ================= EMOJI PICKER =================
    const emojiTrigger = document.getElementById('btn-emoji-picker');
    const emojiPopover = document.getElementById('emoji-popover');
    if (emojiTrigger && emojiPopover) {
      emojiTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = emojiPopover.classList.contains('active');
        if (isOpen) {
          emojiPopover.classList.remove('active');
        } else {
          emojiPopover.classList.add('active');
        }
      });

      // Emoji selection
      emojiPopover.addEventListener('click', function (e) {
        const emojiBtn = e.target.closest('.emoji-item');
        if (emojiBtn) {
          const emoji = emojiBtn.getAttribute('data-emoji');
          insertAtCursor(emoji);
          emojiPopover.classList.remove('active');
        }
      });

      // Close popover when clicking outside
      document.addEventListener('click', function (e) {
        if (!emojiPopover.contains(e.target) && e.target !== emojiTrigger) {
          emojiPopover.classList.remove('active');
        }
      });
    }

    function insertAtCursor(textToInsert) {
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const full = editor.value;
      editor.value = full.substring(0, start) + textToInsert + full.substring(end);
      editor.focus();
      editor.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
      updateAll();
    }

    // ================= PRESETS DROPDOWN =================
    const presetSelect = document.getElementById('select-hook-preset');
    if (presetSelect) {
      presetSelect.addEventListener('change', function () {
        const val = this.value;
        if (SAMPLES[val]) {
          editor.value = SAMPLES[val];
          updateAll();
          showToast('Loaded ' + val + ' hook template');
        }
        this.value = '';
      });
    }

    // ================= ACTION BUTTONS =================
    const btnCopyFull = document.getElementById('btn-copy-post');
    if (btnCopyFull) {
      btnCopyFull.addEventListener('click', function () {
        copyToClipboard(editor.value, 'Full post copied! Ready to paste into LinkedIn.');
      });
    }

    const btnClearPost = document.getElementById('btn-clear-post');
    if (btnClearPost) {
      btnClearPost.addEventListener('click', function () {
        if (confirm('Clear the current post text?')) {
          editor.value = '';
          updateAll();
          showToast('Post cleared');
        }
      });
    }

    // ================= DEVICE TOGGLE (DESKTOP / MOBILE) =================
    deviceRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        if (this.checked) {
          activeDevice = this.value;
          if (activeDevice === 'mobile') {
            previewCard.classList.add('device-mobile');
            previewCard.classList.remove('device-desktop');
          } else {
            previewCard.classList.add('device-desktop');
            previewCard.classList.remove('device-mobile');
          }
          renderPreview();
          updateHookMeter();
        }
      });
    });

    // ================= SEE MORE TOGGLE =================
    if (seeMoreBtn) {
      seeMoreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        isPreviewExpanded = !isPreviewExpanded;
        renderPreview();
      });
    }

    // ================= RENDER PREVIEW =================
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function formatTextWithLinks(rawText) {
      const escaped = escapeHtml(rawText);
      // Highlight #hashtags
      const withHashtags = escaped.replace(/(#[a-zA-Z0-9_\u0080-\uffff]+)/g, '<span class="li-tag">$1</span>');
      // Highlight @mentions
      const withMentions = withHashtags.replace(/(@[a-zA-Z0-9_\u0080-\uffff]+)/g, '<span class="li-mention">$1</span>');
      // Linebreaks
      return withMentions.replace(/\n/g, '<br>');
    }

    function renderPreview() {
      const rawText = editor.value;
      if (!rawText.trim()) {
        previewTextEl.innerHTML = '<span class="preview-empty">Start typing your post or hook in the editor... It will render live here in authentic LinkedIn layout.</span>';
        if (seeMoreBtn) seeMoreBtn.style.display = 'none';
        return;
      }

      const cutoffLimit = activeDevice === 'mobile' ? 140 : 210;
      const lines = rawText.split('\n');
      const maxLines = activeDevice === 'mobile' ? 3 : 5;

      const needsCutoff = rawText.length > cutoffLimit || lines.length > maxLines;

      if (!needsCutoff || isPreviewExpanded) {
        previewTextEl.innerHTML = formatTextWithLinks(rawText);
        if (seeMoreBtn) {
          if (needsCutoff && isPreviewExpanded) {
            seeMoreBtn.style.display = 'inline';
            seeMoreBtn.textContent = '...show less';
          } else {
            seeMoreBtn.style.display = 'none';
          }
        }
      } else {
        let truncated = '';
        let currentLineCount = 0;
        for (let i = 0; i < lines.length; i++) {
          if (currentLineCount >= maxLines) break;
          truncated += (i > 0 ? '\n' : '') + lines[i];
          currentLineCount++;
          if (truncated.length >= cutoffLimit) break;
        }
        if (truncated.length > cutoffLimit) {
          truncated = truncated.substring(0, cutoffLimit);
        }

        previewTextEl.innerHTML = formatTextWithLinks(truncated);
        if (seeMoreBtn) {
          seeMoreBtn.style.display = 'inline-block';
          seeMoreBtn.textContent = '...see more';
        }
      }
    }

    // ================= METRICS & HOOK CUTOFF METER =================
    function updateHookMeter() {
      const text = editor.value;
      const charCount = text.length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const readSec = Math.ceil(words / 3.3);

      if (charCountEl) charCountEl.textContent = charCount.toLocaleString();
      if (wordCountEl) wordCountEl.textContent = words.toLocaleString();
      if (readingTimeEl) readingTimeEl.textContent = readSec < 60 ? readSec + 's' : Math.ceil(readSec / 60) + ' min';

      const cutoffLimit = activeDevice === 'mobile' ? 140 : 210;
      const firstLineBreak = text.indexOf('\n');
      const firstChunk = firstLineBreak !== -1 ? text.substring(0, firstLineBreak) : text;

      const percent = Math.min(100, Math.round((firstChunk.length / cutoffLimit) * 100));

      if (hookProgressEl) {
        hookProgressEl.style.width = percent + '%';
        if (firstChunk.length <= cutoffLimit) {
          hookProgressEl.style.backgroundColor = '#10b981';
        } else {
          hookProgressEl.style.backgroundColor = '#f59e0b';
        }
      }

      if (hookStatusEl) {
        if (!text.trim()) {
          hookStatusEl.innerHTML = 'Paste or type a hook to measure visibility';
          hookStatusEl.className = 'hook-meter-status';
        } else if (firstChunk.length <= cutoffLimit) {
          hookStatusEl.innerHTML = `<strong>Hook Visible!</strong> Your opening is ${firstChunk.length} chars (${cutoffLimit - firstChunk.length} chars to spare before the fold on ${activeDevice}).`;
          hookStatusEl.className = 'hook-meter-status status-good';
        } else {
          hookStatusEl.innerHTML = `<strong>Warning:</strong> Opening exceeds ${activeDevice} fold limit (${firstChunk.length}/${cutoffLimit} chars). Tighten line 1 so readers don't miss the premise!`;
          hookStatusEl.className = 'hook-meter-status status-warn';
        }
      }

      if (previewCutoffBadge) {
        if (text.length > cutoffLimit) {
          previewCutoffBadge.innerHTML = `Fold: ~${cutoffLimit} chars (${activeDevice})`;
          previewCutoffBadge.style.display = 'inline-flex';
        } else {
          previewCutoffBadge.style.display = 'none';
        }
      }
    }

    // ================= RENDER STYLES SHOWCASE GRID =================
    function renderStylesShowcase() {
      if (!stylesGrid) return;

      const sampleText = editor.value.trim() || 'Grow your audience with high-converting hooks and formatted LinkedIn posts';
      const plainSample = cleanToPlain(sampleText);

      let html = '';
      for (let key in STYLES) {
        const style = STYLES[key];
        const formatted = convertText(plainSample, key);

        html += `
          <div class="style-card" data-style-key="${key}" data-category="${style.category}">
            <div class="style-card-header">
              <div class="style-info">
                <span class="style-name">${escapeHtml(style.name)}</span>
                <span class="style-desc">${escapeHtml(style.desc || '')}</span>
              </div>
              <button type="button" class="btn-copy-style" data-copy-style="${key}" title="Copy this style">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
            <div class="style-preview-box">
              <textarea readonly class="style-preview-textarea">${escapeHtml(formatted)}</textarea>
            </div>
          </div>
        `;
      }

      stylesGrid.innerHTML = html;

      stylesGrid.querySelectorAll('[data-copy-style]').forEach(btn => {
        btn.addEventListener('click', function () {
          const key = this.getAttribute('data-copy-style');
          const style = STYLES[key];
          const textToCopy = convertText(plainSample, key);
          copyToClipboard(textToCopy, `Copied ${style.name} text!`);

          const originalContent = this.innerHTML;
          this.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:#10b981;"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span style="color:#10b981; font-weight:700;">Copied!</span>
          `;
          setTimeout(() => {
            this.innerHTML = originalContent;
          }, 1800);
        });
      });
    }

    // Filter styles by category chips
    document.querySelectorAll('[data-style-filter]').forEach(chip => {
      chip.addEventListener('click', function () {
        document.querySelectorAll('[data-style-filter]').forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-style-filter');
        const cards = stylesGrid.querySelectorAll('.style-card');
        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // ================= CLIPBOARD & TOAST =================
    function copyToClipboard(text, successMsg) {
      if (!text) {
        showToast('Nothing to copy yet!', 'error');
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(successMsg || 'Copied to clipboard!');
        }).catch(() => {
          fallbackCopy(text, successMsg);
        });
      } else {
        fallbackCopy(text, successMsg);
      }
    }

    function fallbackCopy(text, successMsg) {
      const tempArea = document.createElement('textarea');
      tempArea.value = text;
      tempArea.style.position = 'fixed';
      tempArea.style.opacity = '0';
      document.body.appendChild(tempArea);
      tempArea.select();
      try {
        document.execCommand('copy');
        showToast(successMsg || 'Copied to clipboard!');
      } catch (err) {
        showToast('Failed to copy. Please select and copy manually.', 'error');
      }
      document.body.removeChild(tempArea);
    }

    let toastTimer = null;
    function showToast(msg, type) {
      if (!toastEl) return;
      toastEl.textContent = msg;
      toastEl.className = 'formatter-toast show' + (type ? ' ' + type : '');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastEl.className = 'formatter-toast';
      }, 2500);
    }

    // ================= MASTER UPDATE DISPATCHER =================
    let debounceTimer = null;
    function updateAll() {
      renderPreview();
      updateHookMeter();

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        renderStylesShowcase();
      }, 150);
    }

    editor.addEventListener('input', updateAll);
    editor.addEventListener('paste', () => setTimeout(updateAll, 50));

    // Initial render
    updateAll();
  });
})();
