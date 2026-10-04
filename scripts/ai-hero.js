/**
 * Markup for the animated AI hero on the AI pages. The animation is pure CSS (assets/ai-theme.css), so it works
 * without JavaScript, costs no extra requests, and shows a finished frame for visitors who prefer reduced motion.
 *
 * card(): the "question to cited answer" demo used on the AI service page and the Bhubaneswar AI page.
 * bar():  a slim prompt bar that types through example questions, used where the hero has no room for the card.
 */

const SPARK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.1 5.9 5.9 2.1-5.9 2.1L12 18.5l-2.1-5.9L4 10.5l5.9-2.1z" fill="currentColor"/><path d="M19 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="currentColor" opacity=".7"/></svg>';
const DOC = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3v5h5M10 13h6M10 17h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const docs = [
  ['Contract_v3.pdf', '.94', '94%', 'b1'],
  ['Policy_2026.docx', '.88', '88%', 'b2'],
  ['Order_terms.pdf', '.71', '71%', 'b3'],
];

function card() {
  return `<figure class="aix">
            <div class="aix-panel">
              <span class="aix-glow aix-glow-a" aria-hidden="true"></span>
              <span class="aix-glow aix-glow-b" aria-hidden="true"></span>
              <div class="aix-ask">
                <span class="aix-ico">${SPARK}</span>
                <div class="aix-ask-body">
                  <span class="aix-label">Ask your documents</span>
                  <span class="aix-type" style="--n:29">Refund window for enterprise?</span>
                </div>
              </div>
              <span class="aix-wire" aria-hidden="true"><i></i></span>
              <div class="aix-stage">
                <div class="aix-phase aix-p1">
                  <header><span class="aix-no">/01 Find</span><span class="aix-pill"><i></i>Retrieving</span></header>
                  <p class="aix-sub">Searching 6 documents. Only what this person is allowed to see.</p>
                  <ul class="aix-docs">
${docs.map(([n, v, s, k]) => `                    <li><span class="aix-doc-ico">${DOC}</span><span class="aix-doc-name">${n}</span><span class="aix-track"><i class="aix-${k}" style="--v:${v}"></i></span><span class="aix-score">${s}</span></li>`).join('\n')}
                  </ul>
                </div>
                <div class="aix-phase aix-p2">
                  <header><span class="aix-no">/02 Check</span><span class="aix-pill"><i></i>Checking</span></header>
                  <p class="aix-sub">Rules run before any answer is shown.</p>
                  <ul class="aix-checks">
                    <li class="aix-k1"><span class="aix-tick">${TICK}</span>Permissions respected</li>
                    <li class="aix-k2"><span class="aix-tick">${TICK}</span>Every claim has a source</li>
                    <li class="aix-k3"><span class="aix-tick">${TICK}</span>Within the spend limit</li>
                  </ul>
                </div>
                <div class="aix-phase aix-p3">
                  <header><span class="aix-no">/03 Answer</span><span class="aix-pill is-done"><i></i>Answered</span></header>
                  <p class="aix-answer"><span class="aix-l1">Enterprise contracts can be refunded within 30 days of go-live.<sup class="aix-c1">1</sup></span> <span class="aix-l2">After that, the refund is issued as service credit.<sup class="aix-c2">2</sup></span></p>
                  <p class="aix-sources"><span>1 Contract_v3.pdf, p.12</span><span>2 Policy_2026.docx, p.4</span></p>
                  <p class="aix-logged"><span class="aix-tick">${TICK}</span>Saved to the audit log</p>
                </div>
              </div>
              <ol class="aix-steps" aria-hidden="true">
                <li class="aix-s1"><i></i><span>Find</span></li>
                <li class="aix-s2"><i></i><span>Check</span></li>
                <li class="aix-s3"><i></i><span>Answer</span></li>
                <li class="aix-s4"><i></i><span>Log</span></li>
              </ol>
            </div>
            <figcaption class="aix-cap">Illustration with sample data: how a question becomes a cited answer.</figcaption>
          </figure>`;
}

const prompts = [
  'Summarise this supplier contract',
  'Which invoices are overdue this month?',
  'Draft a reply to this support ticket',
];

function bar() {
  return `<div class="aix-bar" aria-hidden="true">
              <span class="aix-ico">${SPARK}</span>
              <span class="aix-bar-stage">${prompts.map((t, i) => `<span class="aix-bar-line" style="--n:${t.length};--d:${i * 4}s">${t}</span>`).join('')}</span>
            </div>`;
}

module.exports = { card, bar };
