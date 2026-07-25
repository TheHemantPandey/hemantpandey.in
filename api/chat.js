import { buildContextText, getPortfolioIdentity } from '../src/utils/portfolioContext.js';

const MAX_HISTORY = 8;
const MAX_INPUT_LENGTH = 600;
const identity = getPortfolioIdentity();

const toHistoryMessages = (history) => {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .slice(-MAX_HISTORY)
    .map((entry) => {
      if (!entry || typeof entry.text !== 'string') {
        return null;
      }

      return {
        role: entry.from === 'user' ? 'user' : 'assistant',
        content: entry.text.slice(0, MAX_INPUT_LENGTH)
      };
    })
    .filter(Boolean);
};

const buildSystemPrompt = () => {
  return [
    'You are a portfolio assistant for a developer website.',
    `Developer name: ${identity.name}`,
    `Role: ${identity.role}`,
    `Location: ${identity.location}`,
    `Availability: ${identity.availability}`,
    `Primary contact email: ${identity.email}`,
    'Rules:',
    '- Answer naturally, like a helpful human assistant.',
    '- Use only the provided context. Do not invent facts, links, or metrics.',
    `- If information is unavailable, say: 'I do not have that information yet. You can contact Hemant via email for more details. (${identity.email})'`,
    '- Keep responses concise and readable (2-5 short paragraphs).',
    '- Use line breaks between key points. Do not return one long paragraph.',
    '- Prefer plain, clean text formatting. Avoid decorative markdown characters unless necessary.',
    '- If comparing multiple items, use a markdown table.',
    '- For contact or hiring questions, include email and relevant links if available in context.'
  ].join('\n');
};

const formatReplyText = (text) => {
  if (typeof text !== 'string') {
    return '';
  }

  let formatted = text.replace(/\r\n/g, '\n').trim();
  formatted = formatted.replace(/\n{3,}/g, '\n\n');

  const hasNewLines = formatted.includes('\n');
  const hasUrl = /(https?:\/\/|www\.)/i.test(formatted);
  if (!hasNewLines && !hasUrl && formatted.length > 180) {
    formatted = formatted.replace(/([.!?])\s+(?=[A-Z0-9])/g, '$1\n\n');
  }

  return formatted;
};

const buildFallbackReply = (contextText) => {
  if (!contextText || typeof contextText !== 'string') {
    return `I do not have that information yet. You can contact Hemant via email for more details. (${identity.email})`;
  }

  const lines = contextText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('['));

  if (lines.length === 0) {
    return `I do not have that information yet. You can contact Hemant via email for more details. (${identity.email})`;
  }

  const summaryLines = lines.slice(0, 4);
  return [
    'Here is what I found from Hemant\'s portfolio:',
    ...summaryLines.map((line) => `- ${line}`)
  ].join('\n');
};

const buildChatMessages = (message, history, contextText) => {
  return [
    { role: 'system', content: buildSystemPrompt() },
    { role: 'system', content: `Context:\n${contextText}` },
    ...toHistoryMessages(history),
    { role: 'user', content: message }
  ];
};

const callOpenAiCompatibleModels = async ({
  endpoint,
  apiKey,
  modelCandidates,
  headers,
  payloadBase,
  providerName
}) => {
  if (!apiKey) {
    return null;
  }

  let lastError = null;

  for (const model of modelCandidates.filter(Boolean)) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          ...headers
        },
        body: JSON.stringify({ ...payloadBase, model })
      });

      if (!response.ok) {
        const errorText = await response.text();
        lastError = new Error(`${providerName} request failed for ${model}: ${response.status} ${errorText}`);

        if (response.status === 400 || response.status === 404 || response.status === 429) {
          continue;
        }

        throw lastError;
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();

      if (reply) {
        return formatReplyText(reply);
      }
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  if (lastError) {
    throw lastError;
  }

  return null;
};

const callOpenRouter = async ({ message, history, contextText, env }) => {
  if (!env.OPENROUTER_API_KEY) return null;

  const modelCandidates = [
    env.OPENROUTER_MODEL,
    'meta-llama/llama-3.1-8b-instruct:free',
    'google/gemma-3-27b-it:free',
    'mistralai/mistral-7b-instruct:free'
  ];

  const payloadBase = {
    temperature: 0.35,
    max_tokens: 360,
    messages: buildChatMessages(message, history, contextText)
  };

  return callOpenAiCompatibleModels({
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    apiKey: env.OPENROUTER_API_KEY,
    modelCandidates,
    headers: {
      'HTTP-Referer': env.OPENROUTER_SITE_URL || 'http://localhost:5173',
      'X-Title': env.OPENROUTER_SITE_NAME || 'Portfolio Chatbot'
    },
    payloadBase,
    providerName: 'OpenRouter'
  });
};

const callGroq = async ({ message, history, contextText, env }) => {
  if (!env.GROQ_API_KEY) return null;

  const modelCandidates = [
    env.GROQ_MODEL,
    'llama-3.1-8b-instant',
    'llama3-8b-8192'
  ];

  const payloadBase = {
    temperature: 0.35,
    max_tokens: 360,
    messages: buildChatMessages(message, history, contextText)
  };

  return callOpenAiCompatibleModels({
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    apiKey: env.GROQ_API_KEY,
    modelCandidates,
    headers: {},
    payloadBase,
    providerName: 'Groq'
  });
};

const toGeminiHistory = (history) => {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .slice(-MAX_HISTORY)
    .map((entry) => {
      if (!entry || typeof entry.text !== 'string') {
        return null;
      }

      return {
        role: entry.from === 'user' ? 'user' : 'model',
        parts: [{ text: entry.text.slice(0, MAX_INPUT_LENGTH) }]
      };
    })
    .filter(Boolean);
};

const callGemini = async ({ message, history, contextText, env }) => {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const modelCandidates = [
    env.GEMINI_MODEL,
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ].filter(Boolean);

  const payload = {
    systemInstruction: {
      parts: [{ text: buildSystemPrompt() }]
    },
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 360
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: `Context:\n${contextText}` }]
      },
      ...toGeminiHistory(history),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ]
  };

  let lastError = null;

  for (const model of modelCandidates) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        lastError = new Error(`Gemini request failed for ${model}: ${response.status} ${errorText}`);
        continue;
      }

      const data = await response.json();
      const parts = data?.candidates?.[0]?.content?.parts || [];
      const reply = parts
        .map((part) => (typeof part?.text === 'string' ? part.text : ''))
        .join('')
        .trim();

      if (reply) {
        return formatReplyText(reply);
      }
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  throw lastError || new Error('Gemini request failed for all configured models.');
};

const callOpenAI = async ({ message, history, contextText, env }) => {
  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const model = env.OPENAI_MODEL || 'gpt-4o-mini';
  const payload = {
    model,
    temperature: 0.35,
    max_tokens: 360,
    messages: buildChatMessages(message, history, contextText)
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();

  return formatReplyText(reply);
};

const getModelReply = async ({ message, history, contextText }) => {
  // 🚀 CRITICAL FIX: Explicitly target standard node environment keys safely
  const env = {
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
    OPENROUTER_MODEL: process.env.OPENROUTER_MODEL || '',
    OPENROUTER_SITE_URL: process.env.OPENROUTER_SITE_URL || '',
    OPENROUTER_SITE_NAME: process.env.OPENROUTER_SITE_NAME || '',
    GROQ_API_KEY: process.env.GROQ_API_KEY || '',
    GROQ_MODEL: process.env.GROQ_MODEL || '',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    GEMINI_MODEL: process.env.GEMINI_MODEL || '',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    OPENAI_MODEL: process.env.OPENAI_MODEL || ''
  };

  const providerErrors = [];

  // 1. Try OpenRouter
  try {
    const openRouterReply = await callOpenRouter({ message, history, contextText, env });
    if (openRouterReply) return { reply: openRouterReply, provider: 'openrouter' };
  } catch (error) {
    providerErrors.push(error);
  }

  // 2. Try Groq
  try {
    const groqReply = await callGroq({ message, history, contextText, env });
    if (groqReply) return { reply: groqReply, provider: 'groq' };
  } catch (error) {
    providerErrors.push(error);
  }

  // 3. Try Gemini
  try {
    const geminiReply = await callGemini({ message, history, contextText, env });
    if (geminiReply) return { reply: geminiReply, provider: 'gemini' };
  } catch (error) {
    providerErrors.push(error);
  }

  // 4. Try OpenAI
  try {
    const openAiReply = await callOpenAI({ message, history, contextText, env });
    if (openAiReply) return { reply: openAiReply, provider: 'openai' };
  } catch (error) {
    providerErrors.push(error);
  }

  // Fallback setup if all active provider keys are offline/missing
  if (providerErrors.length > 0) {
    const [firstError] = providerErrors;
    return {
      reply: buildFallbackReply(contextText),
      provider: 'retrieval',
      diagnostics: firstError?.message || 'Providers completely unavailable'
    };
  }

  return {
    reply: buildFallbackReply(contextText),
    provider: 'retrieval'
  };
};

const parseRequestBody = async (req) => {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  if (req.readable) {
    const decoder = new TextDecoder();
    let raw = '';
    for await (const chunk of req) {
      raw += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true });
    }
    raw += decoder.decode();

    raw = raw.trim();
    if (!raw) return {};

    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  return {};
};

const sendJson = (res, statusCode, payload) => {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(payload);
  }

  res.statusCode = statusCode;
  if (typeof res.setHeader === 'function') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  }

  if (typeof res.end === 'function') {
    res.end(JSON.stringify(payload));
  }

  return null;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = await parseRequestBody(req);
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, MAX_INPUT_LENGTH) : '';
    const history = Array.isArray(body.history) ? body.history : [];

    if (!message) {
      return sendJson(res, 400, { error: 'Message is required' });
    }

    // Safely wrap context builders
    let contextText = '';
    try {
      contextText = buildContextText(message, 5) || '';
    } catch (e) {
      console.error("Context parsing failed:", e);
    }

    let reply;
    let provider = 'retrieval';
    let usedFallback = false;
    let result = null;

    try {
      result = await getModelReply({ message, history, contextText });
      reply = formatReplyText(result.reply);
      provider = result.provider;
      usedFallback = provider === 'retrieval';
    } catch {
      reply = buildFallbackReply(contextText);
      provider = 'retrieval';
      usedFallback = true;
    }

    return sendJson(res, 200, {
      reply,
      contextUsed: contextText,
      provider,
      usedFallback,
      diagnostics: result?.diagnostics || null
    });
  } catch (error) {
    return sendJson(res, 500, {
      error: 'Failed to generate response',
      details: error?.message || 'Unknown backend thread crash'
    });
  }
}