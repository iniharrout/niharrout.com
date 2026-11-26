/**
 * Software RFP generator (/tools/software-rfp-generator).
 * Builds a plain-text request for proposal from the form as you type. Answers stay in the browser
 * (saved locally so a reload does not lose them) and are only sent if the visitor submits the
 * "send it to us" form, which assets/lead-forms.js posts to /api/lead.
 */
(function () {
  'use strict';

  var form = document.getElementById('rfpForm');
  var out = document.getElementById('rfpOutput');
  if (!form || !out) return;
  var KEY = 'nr-rfp-draft';

  var ASKS = [
    'Your understanding of the problem, in your own words.',
    'The scope of the first release as a list of workflows, with exclusions named.',
    'The team: roles, seniority and our main contact.',
    'A timeline split into milestones, with what we can see and test at each one.',
    'Cost per milestone and the pricing model (fixed price or time and materials).',
    'Estimated monthly running costs, with assumptions.',
    'Every assumption behind the estimate.',
    'How code, accounts and documentation are handed over, and who owns them.',
    'What happens after launch: warranty, support and maintenance.',
    'Two or three similar projects and a client we can speak to.'
  ];

  var SECTIONS = [
    ['about', 'About us'],
    ['problem', 'The problem'],
    ['outcome', 'What must be true after launch'],
    ['users', 'Users and roles'],
    ['workflows', 'Core workflows for the first release', true],
    ['platforms', 'Platforms'],
    ['integrations', 'Integrations', true],
    ['constraints', 'Constraints (data, security, compliance, accessibility)', true],
    ['budget', 'Budget range'],
    ['timeline', 'Timeline and fixed dates']
  ];

  function value(name) {
    if (name === 'platforms') {
      return Array.prototype.filter.call(form.elements.platforms, function (box) { return box.checked; })
        .map(function (box) { return box.value; }).join(', ');
    }
    var el = form.elements[name];
    return el ? el.value.trim() : '';
  }

  function asList(text) {
    return text.split('\n').map(function (line) { return line.replace(/^[\s\-*•]+/, '').trim(); })
      .filter(Boolean).map(function (line) { return '- ' + line; }).join('\n');
  }

  function build() {
    var project = value('project') || 'Our software project';
    var lines = ['REQUEST FOR PROPOSAL: ' + project.toUpperCase(), ''];
    var n = 0;
    var filled = 0;
    SECTIONS.forEach(function (section) {
      var text = value(section[0]);
      if (text) filled += 1;
      n += 1;
      lines.push(n + '. ' + section[1]);
      lines.push(text ? (section[2] ? asList(text) : text) : '[To be completed]');
      lines.push('');
    });
    lines.push((n + 1) + '. What your proposal must include');
    ASKS.forEach(function (ask, i) { lines.push('  ' + (i + 1) + ') ' + ask); });
    lines.push('', (n + 2) + '. How we will choose');
    lines.push(value('criteria') || 'Understanding of the problem, clarity of scope and assumptions, relevant work, communication, then cost.');
    lines.push('', 'Please send questions and your proposal to: ' + (value('contact') || '[name and email]'));
    return { text: lines.join('\n'), filled: filled, total: SECTIONS.length };
  }

  function render() {
    var doc = build();
    out.textContent = doc.text;
    var progress = document.getElementById('rfpProgress');
    if (progress) progress.textContent = doc.filled + ' of ' + doc.total + ' sections filled in';
    var hidden = document.getElementById('rfpMessage');
    if (hidden) {
      // keep what fits in one enquiry: the sections that have answers
      hidden.value = SECTIONS.filter(function (s) { return value(s[0]); })
        .map(function (s) { return s[1] + ': ' + value(s[0]); }).join('\n').slice(0, 1500) || 'RFP generator: no sections filled in.';
    }
  }

  function save() {
    try {
      var data = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name) return;
        if (el.type === 'checkbox') { if (el.checked) (data.platforms = data.platforms || []).push(el.value); return; }
        data[el.name] = el.value;
      });
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) { /* storage blocked: the tool still works */ }
  }

  function restore() {
    try {
      var data = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (!data) return;
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name) return;
        if (el.type === 'checkbox') { el.checked = (data.platforms || []).indexOf(el.value) !== -1; return; }
        if (typeof data[el.name] === 'string') el.value = data[el.name];
      });
    } catch (e) { /* ignore a broken draft */ }
  }

  function track(name) {
    if (typeof window.gtag === 'function') window.gtag('event', name, { tool: 'software-rfp-generator' });
  }

  function note(message) {
    var el = document.getElementById('rfpNote');
    if (el) el.textContent = message;
  }

  form.addEventListener('input', function () { render(); save(); });
  form.addEventListener('change', function () { render(); save(); });
  form.addEventListener('submit', function (event) { event.preventDefault(); });

  document.getElementById('rfpCopy').addEventListener('click', function () {
    var text = build().text;
    if (!navigator.clipboard) { note('Select the text and copy it.'); return; }
    navigator.clipboard.writeText(text).then(function () { note('Copied.'); track('rfp_copy'); }, function () { note('Select the text and copy it.'); });
  });

  document.getElementById('rfpDownload').addEventListener('click', function () {
    var blob = new Blob([build().text], { type: 'text/plain;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'software-rfp.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    track('rfp_download');
  });

  document.getElementById('rfpClear').addEventListener('click', function () {
    if (!window.confirm('Clear everything you have typed here?')) return;
    form.reset();
    try { localStorage.removeItem(KEY); } catch (e) { /* nothing to clear */ }
    render();
    note('Cleared.');
  });

  restore();
  render();
})();
