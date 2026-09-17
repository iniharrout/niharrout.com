/**
 * Serverless API Route: POST /api/chat
 * Handles conversational queries for Nihar's AI assistant using Google Gemini API.
 * Rate limited to 10 requests per minute per IP.
 * Gracefully falls back to direct contact info on missing key, quota exceeded, or network errors.
 */

const SYSTEM_PROMPT = `You are a friendly, conversational assistant on Nihar Ranjan Rout's personal website. Nihar is the Founder & CEO of Creuto, a software development company (est. 2020, actively run since 2023) that builds mobile apps, AI-powered products, custom software, and MVPs for funded startups and mid-scale businesses. Creuto works with clients through three models: Advisory, End-to-End Build, and Dedicated Team.

Real projects Creuto has built: an end-to-end custom ERP for a manufacturing company; Sky1, a wedding/event booking platform connecting couples with venues and vendors; Make My Look, an on-demand beauty and salon booking app; FlashNow, a quick-commerce app delivering from local shops in 10-15 minutes; and Skribe, a team chat tool that unifies Slack-style channels with Google Chat, Google Workspace, and Microsoft 365.

Keep replies short — 2 to 4 sentences, conversational, not corporate. If someone describes a project idea or asks about cost/timeline, don't quote exact numbers — instead say pricing depends on scope and invite them to use the 'What Would This Cost' tool on the site or book a call with Nihar directly. If someone seems seriously interested in working together, proactively suggest booking a call. Never make up client names, numbers, or facts not given here — if you don't know something, say so and offer to connect them with Nihar directly.`;

const FALLBACK_MESSAGE = "I'm taking a quick breather — but you can reach Nihar directly here";
const RATE_LIMIT_MESSAGE = "I'm receiving a lot of questions right now! Let's continue this directly over a call or message.";

// In-memory rate limiting: 10 requests per minute per IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const ipRateLimits = new Map();

// Periodic cleanup of stale rate-limit entries
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRateLimits.entries()) {
    if (now > data.resetTime) {
      ipRateLimits.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref?.();

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = ipRateLimits.get(ip);

  if (!entry || now > entry.resetTime) {
    ipRateLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - entry.count };
}

function parseClientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers?.['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
}

async function callGemini(apiKey, history) {
  // Format history for Gemini API
  // history is expected to be an array of: { role: 'user' | 'assistant', content: string }
  const contents = [];
  
  if (Array.isArray(history)) {
    for (const msg of history) {
      if (!msg || !msg.content) continue;
      const role = msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user';
      // Truncate individual messages to prevent abuse
      const cleanText = String(msg.content).slice(0, 1000);
      contents.push({
        role: role,
        parts: [{ text: cleanText }]
      });
    }
  }

  // Ensure there is at least one user query
  if (contents.length === 0) {
    throw new Error("Empty message history");
  }

  // Primary model: gemini-2.0-flash, with fallback to gemini-1.5-flash
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const payload = {
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 350
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error [${response.status}] on ${model}: ${errorText}`);
      }

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply && typeof reply === 'string') {
        return reply.trim();
      }
      throw new Error(`No valid candidate text returned by ${model}`);
    } catch (err) {
      lastError = err;
      // Try next fallback model
    }
  }

  throw lastError || new Error("Failed to generate response from Gemini API");
}

/**
 * Main API Handler
 */
async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  const clientIp = parseClientIp(req);
  const rateCheck = checkRateLimit(clientIp);

  if (!rateCheck.allowed) {
    res.statusCode = 200; // Return 200 with graceful fallback payload so client UI handles smoothly
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      reply: RATE_LIMIT_MESSAGE,
      fallback: true,
      cta: { text: "Book a Call with Nihar", url: "#contact" }
    }));
    return;
  }

  // Parse request body
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  } else if (!body && typeof req.on === 'function') {
    // Standard Node.js incoming message stream
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString();
      body = raw ? JSON.parse(raw) : {};
    } catch (e) {
      body = {};
    }
  }

  const history = body?.history || (body?.message ? [{ role: 'user', content: body.message }] : []);
  const apiKey = process.env.GEMINI_API_KEY;

  // Graceful fallback if key is missing
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      reply: FALLBACK_MESSAGE,
      fallback: true,
      cta: { text: "Connect with Nihar Directly", url: "#contact" }
    }));
    return;
  }

  try {
    const aiReply = await callGemini(apiKey, history);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ reply: aiReply }));
  } catch (err) {
    console.error("[Chat API Error]:", err.message);
    // Graceful fallback on any API error (quota, network, 429, etc.)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      reply: FALLBACK_MESSAGE,
      fallback: true,
      cta: { text: "Discuss Your Project with Nihar", url: "#contact" }
    }));
  }
}

module.exports = handler;
module.exports.default = handler;
