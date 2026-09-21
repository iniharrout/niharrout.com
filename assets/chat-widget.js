/**
 * NiharRout.com - Self-Contained Floating AI Chat Widget
 * Supports: Conversational AI, Voice Input (Web Speech API),
 * Starter Prompts, Session Limits, & Graceful Contact Handoffs.
 */

(function () {
  'use strict';

  // Prevent multiple initializations
  if (window.__NIHAR_CHAT_WIDGET_LOADED__) return;
  window.__NIHAR_CHAT_WIDGET_LOADED__ = true;

  // Configuration & Constants
  const MAX_SESSION_MESSAGES = 20;
  const STARTER_PROMPTS = [
    "What does Nihar do?",
    "How much would my project cost?",
    "Show me some of his work"
  ];

  const FALLBACK_MESSAGE = "I'm taking a quick breather — but you can reach Nihar directly here";
  const SESSION_LIMIT_MESSAGE = "We've covered quite a bit! Let's continue this directly over a call or message:";

  // Session State (In-Memory, cleared on refresh)
  let sessionMessages = [];
  let userMessageCount = 0;
  let isOpen = false;
  let isAwaitingReply = false;
  let isListening = false;
  let speechRecognizer = null;

  // Check Web Speech API Support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

  // Inject Styles dynamically to keep widget 100% self-contained
  function injectStyles() {
    if (document.getElementById('nihar-chat-styles')) return;

    const css = `
      /* ================= FLOATING AI CHAT WIDGET ================= */
      #nihar-chat-root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: #141312;
        -webkit-font-smoothing: antialiased;
      }

      /* Floating Action Button */
      .nihar-chat-fab {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #141312;
        color: #FFFFFF;
        border: 1px solid rgba(255, 255, 255, 0.16);
        box-shadow: 0 8px 28px rgba(15, 23, 42, 0.24);
        cursor: pointer;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.26s ease, background-color 0.2s ease;
        outline: none;
        user-select: none;
      }

      .nihar-chat-fab:hover {
        transform: translateY(-3px) scale(1.04);
        box-shadow: 0 14px 34px rgba(255, 85, 0, 0.28), 0 6px 16px rgba(0, 0, 0, 0.2);
        background: #1D1C1B;
      }

      .nihar-chat-fab:active {
        transform: translateY(0) scale(0.98);
      }

      .nihar-chat-fab-dot {
        position: absolute;
        top: 3px;
        right: 3px;
        width: 12px;
        height: 12px;
        background: #FF5500;
        border-radius: 50%;
        border: 2px solid #141312;
        animation: chatDotPulse 2.4s infinite ease-in-out;
      }

      @keyframes chatDotPulse {
        0% { transform: scale(0.95); opacity: 0.9; }
        50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 10px rgba(255, 85, 0, 0.7); }
        100% { transform: scale(0.95); opacity: 0.9; }
      }

      .nihar-chat-fab svg {
        width: 26px;
        height: 26px;
        fill: currentColor;
        transition: transform 0.25s ease;
      }

      .nihar-chat-fab.open svg.chat-icon {
        display: none;
      }

      .nihar-chat-fab.open svg.close-icon {
        display: block;
      }

      .nihar-chat-fab:not(.open) svg.close-icon {
        display: none;
      }

      /* Chat Modal Window */
      .nihar-chat-panel {
        position: fixed;
        bottom: 96px;
        right: 24px;
        width: 384px;
        max-width: calc(100vw - 32px);
        height: 560px;
        max-height: calc(100vh - 120px);
        background: #FFFFFF;
        border: 1px solid #E6E2D8;
        border-radius: 20px;
        box-shadow: 0 24px 56px -10px rgba(15, 23, 42, 0.22), 0 8px 24px -4px rgba(0, 0, 0, 0.08);
        z-index: 999998;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: scale(0.92) translateY(18px);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.26s ease;
      }

      .nihar-chat-panel.active {
        transform: scale(1) translateY(0);
        opacity: 1;
        pointer-events: auto;
      }

      /* Responsive Mobile */
      @media (max-width: 480px) {
        .nihar-chat-panel {
          width: 100vw;
          height: 100vh;
          max-width: 100vw;
          max-height: 100vh;
          bottom: 0;
          right: 0;
          border-radius: 0;
          border: none;
        }
        .nihar-chat-fab {
          bottom: 18px;
          right: 18px;
        }
      }

      /* Header */
      .nihar-chat-header {
        background: #141312;
        color: #FFFFFF;
        padding: 16px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .nihar-chat-header-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .nihar-chat-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #252422;
        border: 1.5px solid rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 14px;
        color: #FF5500;
        flex-shrink: 0;
        overflow: hidden;
      }

      .nihar-chat-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .nihar-chat-header-text h3 {
        margin: 0;
        font-size: 15px;
        font-weight: 700;
        color: #FFFFFF;
        letter-spacing: -0.01em;
      }

      .nihar-chat-header-status {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11.5px;
        color: rgba(255, 255, 255, 0.7);
        margin-top: 1px;
      }

      .nihar-chat-status-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #10B981;
        box-shadow: 0 0 6px rgba(16, 185, 129, 0.7);
      }

      .nihar-chat-close-btn {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.75);
        cursor: pointer;
        padding: 6px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.18s ease, background-color 0.18s ease;
      }

      .nihar-chat-close-btn:hover {
        color: #FFFFFF;
        background: rgba(255, 255, 255, 0.12);
      }

      /* Messages Area */
      .nihar-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 18px 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        background: #FAF8F5;
        overscroll-behavior: contain;
      }

      .nihar-chat-msg {
        display: flex;
        flex-direction: column;
        max-width: 84%;
        font-size: 14.5px;
        line-height: 1.56;
        animation: chatMsgFadeIn 0.22s ease-out;
      }

      @keyframes chatMsgFadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .nihar-chat-msg.user {
        align-self: flex-end;
      }

      .nihar-chat-msg.assistant {
        align-self: flex-start;
      }

      .nihar-chat-bubble {
        padding: 11px 15px;
        border-radius: 16px;
        word-break: break-word;
      }

      .nihar-chat-msg.user .nihar-chat-bubble {
        background: #141312;
        color: #FFFFFF;
        border-bottom-right-radius: 4px;
      }

      .nihar-chat-msg.assistant .nihar-chat-bubble {
        background: #FFFFFF;
        color: #141312;
        border: 1px solid #E8E4D9;
        border-bottom-left-radius: 4px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
      }

      .nihar-chat-bubble a {
        color: #FF5500;
        text-decoration: underline;
        font-weight: 600;
      }

      .nihar-chat-bubble a:hover {
        color: #E04B00;
      }

      /* Action buttons inside chat (Fallback or Cap CTA) */
      .nihar-chat-cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 10px;
        background: #141312;
        color: #FFFFFF !important;
        font-size: 13px;
        font-weight: 700;
        padding: 9px 14px;
        border-radius: 8px;
        text-decoration: none !important;
        transition: background-color 0.18s ease, transform 0.18s ease;
      }

      .nihar-chat-cta-btn:hover {
        background: #FF5500;
        transform: translateY(-1px);
      }

      /* Starter Prompts Area */
      .nihar-chat-starters {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 8px;
      }

      .nihar-chat-starters-label {
        font-size: 11.5px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #8C877D;
        margin-bottom: 2px;
      }

      .nihar-chat-starter-chip {
        background: #FFFFFF;
        border: 1px solid #E2DED4;
        border-radius: 12px;
        padding: 10px 14px;
        font-size: 13.5px;
        font-weight: 600;
        color: #141312;
        text-align: left;
        cursor: pointer;
        transition: all 0.18s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .nihar-chat-starter-chip:hover {
        background: #FFFDF9;
        border-color: #FF5500;
        color: #FF5500;
        transform: translateX(3px);
      }

      .nihar-chat-starter-chip span.arrow {
        color: #B5B0A4;
        transition: transform 0.18s ease, color 0.18s ease;
      }

      .nihar-chat-starter-chip:hover span.arrow {
        color: #FF5500;
        transform: translateX(3px);
      }

      /* Typing Indicator */
      .nihar-chat-typing {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 10px 14px;
        background: #FFFFFF;
        border: 1px solid #E8E4D9;
        border-radius: 16px 16px 16px 4px;
        align-self: flex-start;
      }

      .nihar-chat-typing-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #A39E93;
        animation: chatTypingBounce 1.4s infinite ease-in-out both;
      }

      .nihar-chat-typing-dot:nth-child(1) { animation-delay: -0.32s; }
      .nihar-chat-typing-dot:nth-child(2) { animation-delay: -0.16s; }

      @keyframes chatTypingBounce {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
        40% { transform: scale(1.1); opacity: 1; }
      }

      /* Input Footer */
      .nihar-chat-footer {
        padding: 12px 14px;
        background: #FFFFFF;
        border-top: 1px solid #ECE8DE;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .nihar-chat-input-wrap {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
      }

      .nihar-chat-input {
        width: 100%;
        padding: 11px 40px 11px 14px;
        border: 1px solid #DCD7CB;
        border-radius: 22px;
        font-size: 14px;
        color: #141312;
        background: #FAF8F5;
        outline: none;
        transition: border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;
      }

      .nihar-chat-input:focus {
        background: #FFFFFF;
        border-color: #141312;
        box-shadow: 0 0 0 3px rgba(20, 19, 18, 0.08);
      }

      /* Mic Button */
      .nihar-chat-mic-btn {
        position: absolute;
        right: 8px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: none;
        background: transparent;
        color: #716C63;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.18s ease;
      }

      .nihar-chat-mic-btn:hover {
        color: #141312;
        background: rgba(0, 0, 0, 0.06);
      }

      .nihar-chat-mic-btn.listening {
        color: #EF4444;
        background: rgba(239, 68, 68, 0.12);
        animation: chatMicPulse 1.2s infinite ease-in-out;
      }

      @keyframes chatMicPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); box-shadow: 0 0 8px rgba(239, 68, 68, 0.4); }
        100% { transform: scale(1); }
      }

      /* Send Button */
      .nihar-chat-send-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: #141312;
        color: #FFFFFF;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .nihar-chat-send-btn:hover:not(:disabled) {
        background: #FF5500;
        transform: scale(1.05);
      }

      .nihar-chat-send-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.id = 'nihar-chat-styles';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  // Create & Inject Widget DOM
  function createWidgetDOM() {
    if (document.getElementById('nihar-chat-root')) return;

    const root = document.createElement('div');
    root.id = 'nihar-chat-root';

    root.innerHTML = `
      <!-- Floating Action Button -->
      <button class="nihar-chat-fab" id="niharChatFab" aria-label="Open AI chat assistant" title="Chat with Nihar's AI Assistant">
        <span class="nihar-chat-fab-dot"></span>
        <!-- Chat Bubble SVG -->
        <svg class="chat-icon" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
          <circle cx="8" cy="10" r="1.5"/>
          <circle cx="12" cy="10" r="1.5"/>
          <circle cx="16" cy="10" r="1.5"/>
        </svg>
        <!-- Close SVG -->
        <svg class="close-icon" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>

      <!-- Chat Modal Panel -->
      <div class="nihar-chat-panel" id="niharChatPanel" role="dialog" aria-modal="true" aria-label="Nihar's AI Assistant Chat">
        <!-- Header -->
        <div class="nihar-chat-header">
          <div class="nihar-chat-header-info">
            <div class="nihar-chat-avatar">
              <img src="/assets/nihar-avatar.jpg" alt="Nihar Ranjan Rout" onerror="this.style.display='none'; this.parentNode.textContent='NR';">
            </div>
            <div class="nihar-chat-header-text">
              <h3>Nihar's AI Assistant</h3>
              <div class="nihar-chat-header-status">
                <span class="nihar-chat-status-dot"></span>
                <span>Online · Creuto Strategy</span>
              </div>
            </div>
          </div>
          <button class="nihar-chat-close-btn" id="niharChatCloseBtn" aria-label="Close chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <!-- Scrollable Messages Area -->
        <div class="nihar-chat-messages" id="niharChatMessages">
          <!-- Initial Welcome Message -->
          <div class="nihar-chat-msg assistant">
            <div class="nihar-chat-bubble">
              Hi! I'm Nihar's AI assistant. Ask me anything about Nihar, Creuto's software engineering capabilities, or how we scope and build projects.
            </div>
          </div>

          <!-- Starter Prompts (Visible until first user query) -->
          <div class="nihar-chat-starters" id="niharChatStarters">
            <div class="nihar-chat-starters-label">Suggested Questions</div>
            ${STARTER_PROMPTS.map(prompt => `
              <button class="nihar-chat-starter-chip" data-prompt="${escapeHtml(prompt)}">
                <span>${escapeHtml(prompt)}</span>
                <span class="arrow">→</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Footer Input Bar -->
        <div class="nihar-chat-footer" id="niharChatFooter">
          <div class="nihar-chat-input-wrap">
            <input 
              type="text" 
              class="nihar-chat-input" 
              id="niharChatInput" 
              placeholder="Ask anything about Nihar & Creuto..." 
              autocomplete="off"
            />
            <!-- Microphone Button (Hidden if Web Speech API unsupported) -->
            <button class="nihar-chat-mic-btn" id="niharChatMicBtn" aria-label="Speak your message" title="Voice input" style="display:none;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </button>
          </div>
          <button class="nihar-chat-send-btn" id="niharChatSendBtn" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(root);
  }

  // Format and escape HTML with markdown link parsing
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatMessageText(text) {
    let formatted = escapeHtml(text);

    // Parse markdown links [text](url)
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (match, linkText, url) {
      const cleanUrl = escapeHtml(url);
      const isInternal = cleanUrl.startsWith('#') || cleanUrl.startsWith('/');
      const targetAttr = isInternal ? '' : 'target="_blank" rel="noopener noreferrer"';
      return `<a href="${cleanUrl}" ${targetAttr}>${linkText}</a>`;
    });

    // Replace line breaks with <br>
    formatted = formatted.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
    return formatted;
  }

  // Scroll to bottom of message list
  function scrollToBottom() {
    const container = document.getElementById('niharChatMessages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  // Append a message to the UI
  function appendMessage(role, text, cta) {
    const container = document.getElementById('niharChatMessages');
    if (!container) return;

    // Remove starter chips if present
    const starters = document.getElementById('niharChatStarters');
    if (starters && role === 'user') {
      starters.style.display = 'none';
    }

    const msgEl = document.createElement('div');
    msgEl.className = `nihar-chat-msg ${role}`;

    let html = `<div class="nihar-chat-bubble">${formatMessageText(text)}`;
    if (cta && cta.text && cta.url) {
      html += `<br><a href="${escapeHtml(cta.url)}" class="nihar-chat-cta-btn">${escapeHtml(cta.text)} →</a>`;
    }
    html += `</div>`;

    msgEl.innerHTML = html;
    container.appendChild(msgEl);
    scrollToBottom();
  }

  // Show Typing Indicator
  function showTypingIndicator() {
    const container = document.getElementById('niharChatMessages');
    if (!container || document.getElementById('niharChatTyping')) return;

    const typingEl = document.createElement('div');
    typingEl.id = 'niharChatTyping';
    typingEl.className = 'nihar-chat-typing';
    typingEl.innerHTML = `
      <span class="nihar-chat-typing-dot"></span>
      <span class="nihar-chat-typing-dot"></span>
      <span class="nihar-chat-typing-dot"></span>
    `;
    container.appendChild(typingEl);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    const el = document.getElementById('niharChatTyping');
    if (el) el.remove();
  }

  // Toggle Chat Open / Close
  function toggleChat(forceOpen) {
    const fab = document.getElementById('niharChatFab');
    const panel = document.getElementById('niharChatPanel');
    const input = document.getElementById('niharChatInput');

    if (!panel || !fab) return;

    isOpen = typeof forceOpen === 'boolean' ? forceOpen : !isOpen;

    if (isOpen) {
      panel.classList.add('active');
      fab.classList.add('open');
      setTimeout(() => {
        if (input && window.innerWidth > 480) input.focus();
      }, 100);
    } else {
      panel.classList.remove('active');
      fab.classList.remove('open');
      stopVoiceRecognition();
    }
  }

  // Handle User Message Submission
  async function sendMessage(text) {
    const trimmed = (text || '').trim();
    if (!trimmed || isAwaitingReply) return;

    // Check 20-message session limit
    if (userMessageCount >= MAX_SESSION_MESSAGES) {
      appendMessage('assistant', SESSION_LIMIT_MESSAGE, {
        text: "Book a Call with Nihar",
        url: "#contact"
      });
      disableInputForSessionLimit();
      return;
    }

    userMessageCount += 1;

    // Clear input
    const input = document.getElementById('niharChatInput');
    if (input) input.value = '';

    // Record and display user message
    sessionMessages.push({ role: 'user', content: trimmed });
    appendMessage('user', trimmed);

    // Check if cap reached on this turn
    if (userMessageCount >= MAX_SESSION_MESSAGES) {
      showTypingIndicator();
      setTimeout(() => {
        hideTypingIndicator();
        appendMessage('assistant', "Let's continue this over a call — you can book a call with Nihar directly or send a message below:", {
          text: "Book a Call with Nihar",
          url: "#contact"
        });
        disableInputForSessionLimit();
      }, 600);
      return;
    }

    isAwaitingReply = true;
    showTypingIndicator();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: sessionMessages
        })
      });

      hideTypingIndicator();
      isAwaitingReply = false;

      if (!response.ok) {
        // Graceful fallback on non-200
        appendMessage('assistant', FALLBACK_MESSAGE, {
          text: "Discuss Your Project",
          url: "#contact"
        });
        return;
      }

      const data = await response.json();
      const reply = data?.reply || FALLBACK_MESSAGE;
      const cta = data?.cta || (data?.fallback ? { text: "Discuss Your Project", url: "#contact" } : null);

      sessionMessages.push({ role: 'assistant', content: reply });
      appendMessage('assistant', reply, cta);

    } catch (err) {
      hideTypingIndicator();
      isAwaitingReply = false;
      console.warn("[Chat Widget]: Request error, displaying fallback", err);
      appendMessage('assistant', FALLBACK_MESSAGE, {
        text: "Discuss Your Project",
        url: "#contact"
      });
    }
  }

  function disableInputForSessionLimit() {
    const input = document.getElementById('niharChatInput');
    const sendBtn = document.getElementById('niharChatSendBtn');
    const micBtn = document.getElementById('niharChatMicBtn');

    if (input) {
      input.disabled = true;
      input.placeholder = "Session message limit reached.";
    }
    if (sendBtn) sendBtn.disabled = true;
    if (micBtn) micBtn.style.display = 'none';
  }

  // Voice Input Setup (Web Speech API)
  function initSpeechRecognition() {
    if (!SpeechRecognition) return;

    const micBtn = document.getElementById('niharChatMicBtn');
    if (!micBtn) return;

    micBtn.style.display = 'flex';

    try {
      speechRecognizer = new SpeechRecognition();
      speechRecognizer.continuous = false;
      speechRecognizer.interimResults = true;
      speechRecognizer.lang = 'en-US';

      speechRecognizer.onstart = function () {
        isListening = true;
        micBtn.classList.add('listening');
        const input = document.getElementById('niharChatInput');
        if (input) input.placeholder = "Listening... speak now";
      };

      speechRecognizer.onresult = function (event) {
        let transcript = '';
        let isFinal = false;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
          if (event.results[i].isFinal) isFinal = true;
        }

        const input = document.getElementById('niharChatInput');
        if (input && transcript) {
          input.value = transcript;
        }

        if (isFinal && transcript.trim()) {
          stopVoiceRecognition();
          sendMessage(transcript.trim());
        }
      };

      speechRecognizer.onerror = function (e) {
        console.warn("[Voice Input Error]:", e.error);
        stopVoiceRecognition();
      };

      speechRecognizer.onend = function () {
        stopVoiceRecognition();
      };

      micBtn.addEventListener('click', function () {
        if (isListening) {
          stopVoiceRecognition();
        } else {
          startVoiceRecognition();
        }
      });
    } catch (err) {
      console.warn("[Voice Input Init Failed]:", err);
      micBtn.style.display = 'none';
    }
  }

  function startVoiceRecognition() {
    if (!speechRecognizer || isListening) return;
    try {
      speechRecognizer.start();
    } catch (e) {
      console.warn("Could not start speech recognition", e);
    }
  }

  function stopVoiceRecognition() {
    if (!isListening) return;
    isListening = false;
    const micBtn = document.getElementById('niharChatMicBtn');
    if (micBtn) micBtn.classList.remove('listening');
    const input = document.getElementById('niharChatInput');
    if (input) input.placeholder = "Ask anything about Nihar & Creuto...";
    if (speechRecognizer) {
      try { speechRecognizer.stop(); } catch (e) {}
    }
  }

  // Setup Event Listeners
  function attachEventListeners() {
    const fab = document.getElementById('niharChatFab');
    const closeBtn = document.getElementById('niharChatCloseBtn');
    const input = document.getElementById('niharChatInput');
    const sendBtn = document.getElementById('niharChatSendBtn');
    const starters = document.getElementById('niharChatStarters');

    if (fab) {
      fab.addEventListener('click', () => toggleChat());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => toggleChat(false));
    }

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => {
        sendMessage(input.value);
      });
    }

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage(input.value);
        }
      });
    }

    // Starter Prompts Click Handler
    if (starters) {
      starters.addEventListener('click', (e) => {
        const chip = e.target.closest('.nihar-chat-starter-chip');
        if (chip) {
          const prompt = chip.getAttribute('data-prompt');
          if (prompt) {
            sendMessage(prompt);
          }
        }
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleChat(false);
      }
    });
  }

  // Initialize Widget
  function init() {
    injectStyles();
    createWidgetDOM();
    initSpeechRecognition();
    attachEventListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
