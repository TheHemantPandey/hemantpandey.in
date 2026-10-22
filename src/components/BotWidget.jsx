import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { trackChatbotAction } from '../utils/analytics';

const quickHints = ['/projects', '/services', '/education', '/certificates', '/highlights', '/contact',];
const initialMessages = [
  {
    id: 1,
    from: 'bot',
    text: 'Agent online. Ask me anything.'
  }
];

const fallbackReply =
  'I am having trouble reaching the AI service right now. Please send me a direct message via the Contact section (/contact), or use the email/LinkedIn links there and I will get back to you soon.';

const normalizeBotReply = (text) => {
  if (typeof text !== 'string') {
    return '';
  }

  let formatted = text.replace(/\r\n/g, '\n').trim();

  const hasNewLines = formatted.includes('\n');
  const hasUrl = /(https?:\/\/|www\.)/i.test(formatted);

  if (!hasNewLines && !hasUrl && formatted.length > 160) {
    formatted = formatted.replace(/([.!?])\s+(?=[A-Z0-9])/g, '$1\n\n');
  }

  return formatted;
};

const BotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const nextMessageIdRef = useRef(2);
  const activeRequestRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    if (isOpen) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    return () => {
      if (activeRequestRef.current) {
        activeRequestRef.current.abort();
        activeRequestRef.current = null;
      }
    };
  }, []);

  const getNextMessageId = () => {
    const id = nextMessageIdRef.current;
    nextMessageIdRef.current += 1;
    return id;
  };

  const sendMessage = async (text) => {
    const cleanText = text.trim();
    if (!cleanText || isTyping) {
      return;
    }

    if (quickHints.includes(cleanText)) {
      trackChatbotAction('chatbot_quick_prompt_click', { prompt_command: cleanText });
    } else {
      trackChatbotAction('chatbot_message_sent', { message_length: cleanText.length });
    }

    const userMessage = { id: getNextMessageId(), from: 'user', text: cleanText };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const requestHistory = [...messages, userMessage].map((message) => ({
      from: message.from,
      text: message.text
    }));

    if (activeRequestRef.current) {
      activeRequestRef.current.abort();
      activeRequestRef.current = null;
    }

    const controller = new AbortController();
    activeRequestRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: cleanText,
          history: requestHistory
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error('Chat request failed');
      }

      const data = await response.json();
      const replyText = typeof data?.reply === 'string' && data.reply.trim() ? data.reply.trim() : fallbackReply;

      const botMessage = {
        id: getNextMessageId(),
        from: 'bot',
        text: replyText
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      if (error?.name !== 'AbortError') {
        const botMessage = {
          id: getNextMessageId(),
          from: 'bot',
          text: fallbackReply
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } finally {
      if (activeRequestRef.current === controller) {
        activeRequestRef.current = null;
      }
      setIsTyping(false);
    }
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      const nextState = !prev;
      trackChatbotAction(nextState ? 'chatbot_open' : 'chatbot_close');
      return nextState;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[115] h-14 w-14">
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            data-clarity-mask="true"
            className="absolute bottom-[4.5rem] right-0 w-[21rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-[0_10px_55px_var(--shadow)] backdrop-blur-xl"
          >
            <div className="border-b border-[var(--glass-border)] bg-gradient-to-r from-indigo-500/15 via-sky-500/10 to-transparent px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-sky-100">
                  <Bot size={16} />
                  AI Agent
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-sky-100/60">
                Context aware assistant
              </p>
            </div>

            <div className="min-h-48 max-h-72 space-y-3 overflow-y-auto px-4 py-3" data-clarity-mask="true">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[86%] rounded-xl border px-3 py-2 text-sm leading-relaxed ${
                    message.from === 'bot'
                      ? 'border-indigo-500/20 bg-indigo-500/10 font-mono text-sky-50/95'
                      : 'ml-auto border-indigo-500/30 bg-gradient-to-r from-indigo-500 to-sky-500 text-white cursor-none shadow-sm'
                  }`}
                >
                  {message.from === 'bot' && (
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-sky-200/70">
                      Agent
                    </span>
                  )}
                  {message.from === 'bot' ? (
                    <div className="prose prose-invert max-w-none text-sm leading-relaxed prose-p:my-2 prose-headings:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-strong:text-sky-50 prose-a:text-sky-300 prose-table:my-2 prose-th:border prose-th:border-indigo-200/25 prose-th:px-2 prose-th:py-1 prose-td:border prose-td:border-indigo-200/20 prose-td:px-2 prose-td:py-1">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        components={{
                          table: ({ ...props }) => (
                            <div className="overflow-x-auto">
                              <table {...props} />
                            </div>
                          )
                        }}
                      >
                        {normalizeBotReply(message.text)}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    message.text
                  )}
                </div>
              ))}

              {isTyping && (
                <Motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/15 bg-cyan-200/10 px-3 py-2"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-100/60">Agent</span>
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-100/85" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-100/65 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-100/45 [animation-delay:240ms]" />
                  </div>
                </Motion.div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            <div className="border-t border-indigo-500/20 px-3 py-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {quickHints.map((hint) => (
                  <button
                    key={hint}
                    type="button"
                    onClick={() => sendMessage(hint)}
                    className="rounded-full border border-indigo-400/20 bg-indigo-500/5 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-sky-100/75 transition hover:border-sky-400/40 hover:text-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-1 cursor-none"
                  >
                    {hint}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Type command or question..."
                  data-clarity-mask="true"
                  className="w-full rounded-lg border border-indigo-400/20 bg-indigo-500/5 px-3 py-2 font-mono text-sm text-sky-50 outline-none placeholder:text-sky-100/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 cursor-none"
                />
                <button
                  type="submit"
                  className="rounded-lg border border-indigo-400/20 bg-indigo-500/10 p-2 text-sky-50 transition hover:border-sky-400/45 hover:bg-indigo-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 cursor-none"
                  aria-label="Send message"
                  disabled={isTyping}
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={handleToggle}
        className="group absolute bottom-0 right-0 flex h-14 w-14 items-center justify-center rounded-full border border-indigo-400/35 bg-gradient-to-tr from-indigo-600/90 to-sky-500/90 text-white shadow-[0_8px_30px_rgba(99,102,241,0.35)] backdrop-blur-md transition hover:scale-105 hover:border-sky-300/60 hover:shadow-[0_8px_35px_rgba(99,102,241,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 cursor-none"
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        <span className="absolute inset-0 rounded-full border border-sky-400/40 animate-ping" />
        <Motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={20} /> : <Bot size={25} />}
        </Motion.div>
      </button>
    </div>
  );
};

export default BotWidget;
