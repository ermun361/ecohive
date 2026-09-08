import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, User, Square, RotateCcw, Copy, Check, Zap, Sparkles, Sprout, Briefcase, ShoppingBag } from 'lucide-react';
import Markdown from 'react-markdown';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export type AssistantRole = 'general' | 'farmer' | 'investor' | 'buyer';
export type AssistantMode = 'fast' | 'balanced';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  modelUsed?: string;
  suggestedFollowUps?: string[];
}

const ROLE_CONFIG: Record<AssistantRole, { label: string; icon: React.ReactNode; placeholder: string; greeting: string; quickPrompts: string[] }> = {
  general: {
    label: 'General Guide',
    icon: <Bot className="w-3.5 h-3.5" />,
    placeholder: 'Ask Hive AI about EcoHive, CEO Eric Munyi, or smart hives...',
    greeting: 'Karibu! I am Hive AI, your interactive guide to EcoHive Kenya Ltd. How can I help you explore our climate-smart beehives, raw organic honey, or CEO Eric Munyi’s vision?',
    quickPrompts: [
      'What are the Smart Hive specs?',
      'Who is CEO Eric Munyi?',
      'How does EcoHive empower farmers?',
      'Where are your apiary clusters?',
    ],
  },
  farmer: {
    label: 'Farmer Coach',
    icon: <Sprout className="w-3.5 h-3.5" />,
    placeholder: 'Ask about colony health, swarm alerts, or off-take...',
    greeting: 'Habari mkulima! I am your Apiculture Agronomist. Ask me anything about hive installation, brood nest temperature (34-36°C), acoustic swarming telemetry, or our guaranteed off-take contracts.',
    quickPrompts: [
      'What is ideal brood temperature?',
      'How does the acoustic swarm sensor alert me?',
      'How do I join as an out-grower?',
      'Why choose recycled plastic over wood?',
    ],
  },
  investor: {
    label: 'Investor & ESG',
    icon: <Briefcase className="w-3.5 h-3.5" />,
    placeholder: 'Ask about unit economics, ESG metrics, or founder pitch...',
    greeting: 'Welcome. I am configured in Investor & ESG Strategy mode. I can walk you through EcoHive’s unit economics, circular plastic recycling metrics (15+ tons diverted), carbon credits, and connection with Founder & CEO Eric Munyi.',
    quickPrompts: [
      'What is the yield comparison vs traditional hives?',
      'What are EcoHive’s ESG and carbon credit metrics?',
      'How can I connect with CEO Eric Munyi?',
      'What is the honey export market opportunity?',
    ],
  },
  buyer: {
    label: 'Honey Buyer',
    icon: <ShoppingBag className="w-3.5 h-3.5" />,
    placeholder: 'Ask about bulk honey specs, propolis, or export MOQ...',
    greeting: 'Welcome wholesale and retail buyers! In Honey Buyer mode, I can provide chemical analysis specs (<18% moisture), pollen sourcing, propolis extracts, beeswax certifications, and bulk shipping MOQs.',
    quickPrompts: [
      'What is your raw honey moisture content?',
      'Do you offer medical-grade propolis tinctures?',
      'What are your wholesale order minimums?',
      'How is each honey jar batch traced?',
    ],
  },
};

export const AiAssistantDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeRole, setActiveRole] = useState<AssistantRole>('general');
  const [activeMode, setActiveMode] = useState<AssistantMode>('balanced');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      sender: 'bot',
      text: ROLE_CONFIG.general.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.5-flash',
      suggestedFollowUps: [
        'What are the Smart Hive specs?',
        'Who is CEO Eric Munyi?',
        'How can I partner with EcoHive?',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');

  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Handle Escape key to close drawer or stop generation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (loading) {
          handleStop();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, onClose]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
    setLiveAnnouncement('AI response generation stopped.');
    setMessages((prev) => [
      ...prev,
      {
        id: `stop-${Date.now()}`,
        sender: 'bot',
        text: '— *Response stopped by user.* Feel free to ask another question or select a prompt below.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleClearHistory = () => {
    if (loading) handleStop();
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'bot',
        text: ROLE_CONFIG[activeRole].greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: activeMode === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash',
        suggestedFollowUps: ROLE_CONFIG[activeRole].quickPrompts.slice(0, 3),
      },
    ]);
    setLiveAnnouncement('Chat conversation history reset.');
  };

  const handleRoleChange = (newRole: AssistantRole) => {
    if (newRole === activeRole) return;
    setActiveRole(newRole);
    setMessages((prev) => [
      ...prev,
      {
        id: `role-switch-${Date.now()}`,
        sender: 'bot',
        text: `Switched to **${ROLE_CONFIG[newRole].label}** mode.\n\n${ROLE_CONFIG[newRole].greeting}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: activeMode === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash',
        suggestedFollowUps: ROLE_CONFIG[newRole].quickPrompts.slice(0, 3),
      },
    ]);
  };

  const handleCopyText = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(msgId);
    setTimeout(() => {
      setCopiedMessageId(null);
    }, 2000);
  };

  const handleSend = async (queryText?: string) => {
    const messageToSend = (queryText || input).trim();
    if (!messageToSend || loading) return;

    // Create new abort controller for this generation
    abortControllerRef.current = new AbortController();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: messageToSend,
      timestamp,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!queryText) setInput('');
    setLoading(true);
    setLiveAnnouncement(`User asked: ${messageToSend}. Generating interactive response...`);

    // Prepare history payload for multi-turn Gemini API
    const historyPayload = messages
      .filter((m) => m.id !== 'initial' && !m.id.startsWith('role-switch-') && !m.id.startsWith('stop-'))
      .slice(-10)
      .map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        text: m.text,
      }));

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          history: historyPayload,
          role: activeRole,
          mode: activeMode,
        }),
        signal: abortControllerRef.current.signal,
      });

      const data = await res.json();
      const botReply = data.reply || 'Thank you for reaching out to EcoHive Kenya Ltd. Please reach our team directly at Info@ecohivekenya.com.';
      const modelName = data.modelUsed || (activeMode === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash');

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: modelName,
        suggestedFollowUps: data.suggestedFollowUps || ROLE_CONFIG[activeRole].quickPrompts.slice(0, 3),
      };

      setMessages([...updatedMessages, botMsg]);
      setLiveAnnouncement(`Hive AI replied: ${botReply.slice(0, 100)}`);
    } catch (err: any) {
      if (err.name === 'AbortError') return;

      const fallbackReply = `EcoHive Kenya Ltd. provides 100% recycled plastic climate-smart beehives with solar IoT sensors. You can contact Founder & CEO Eric Munyi directly at ericmunyi361@gmail.com (+254741076205) or Operations at Andika@ecohivekenya.com.`;
      const botMsg: Message = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'bot',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'offline-knowledge',
        suggestedFollowUps: ROLE_CONFIG[activeRole].quickPrompts.slice(0, 3),
      };
      setMessages([...updatedMessages, botMsg]);
      setLiveAnnouncement(`Hive AI replied with fallback.`);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-drawer-title"
      className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs z-50 flex justify-end"
    >
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col border-l border-amber-200 animate-in slide-in-from-right duration-250">
        {/* Screen Reader Live Region */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {liveAnnouncement}
        </div>

        {/* Header */}
        <div className="bg-stone-950 text-white px-4 py-3.5 flex items-center justify-between border-b border-amber-500/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30 shrink-0">
              <Bot className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="ai-drawer-title" className="font-black text-sm leading-tight font-display text-white">
                  Hive AI Assistant
                </h3>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-amber-400/30">
                  Interactive Multi-Turn
                </span>
              </div>
              <p className="text-[11px] text-stone-300 flex items-center gap-1.5 font-body">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
                EcoHive Kenya Ltd. • Gemini {activeMode === 'fast' ? '3.1 Flash-Lite' : '3.5 Flash'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Speed / Mode Toggle */}
            <button
              type="button"
              onClick={() => setActiveMode(activeMode === 'fast' ? 'balanced' : 'fast')}
              title={activeMode === 'fast' ? 'Switch to Balanced (Gemini 3.5 Flash)' : 'Switch to Fast (Gemini 3.1 Flash-Lite)'}
              className={`p-1.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer ${
                activeMode === 'fast'
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                  : 'bg-stone-900 text-stone-300 border-stone-800 hover:text-white'
              }`}
            >
              {activeMode === 'fast' ? (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline text-[10px]">Fast</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline text-[10px]">Deep</span>
                </>
              )}
            </button>

            {/* Reset History Button */}
            <button
              type="button"
              onClick={handleClearHistory}
              title="Reset conversation history"
              aria-label="Reset conversation history"
              className="p-1.5 text-stone-400 hover:text-white rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close AI Assistant drawer"
              className="p-1.5 text-stone-400 hover:text-white rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Role Persona Tabs */}
        <div className="bg-stone-900 px-3 py-2 border-b border-stone-800 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider font-mono mr-1 shrink-0">
            Role:
          </span>
          {(Object.keys(ROLE_CONFIG) as AssistantRole[]).map((roleKey) => {
            const role = ROLE_CONFIG[roleKey];
            const isActive = activeRole === roleKey;
            return (
              <button
                key={roleKey}
                type="button"
                onClick={() => handleRoleChange(roleKey)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 shadow-xs'
                    : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-700 hover:text-white'
                }`}
              >
                {role.icon}
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Messages Thread */}
        <div
          role="log"
          aria-label="Chat messages history"
          tabIndex={0}
          className="flex-1 p-4 overflow-y-auto space-y-4 bg-amber-50/40 text-xs font-body focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
        >
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div key={m.id} className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {/* Bot Avatar */}
                {!isUser && (
                  <div
                    aria-hidden="true"
                    className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-xs border border-amber-400/40 text-xs"
                  >
                    🐝
                  </div>
                )}

                <div className={`max-w-[88%] space-y-1.5`}>
                  {/* Message Bubble */}
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed shadow-2xs relative group ${
                      isUser
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-semibold rounded-tr-none border border-amber-400/60'
                        : 'bg-white text-stone-900 border border-amber-200/80 rounded-tl-none'
                    }`}
                  >
                    <span className="sr-only">{isUser ? 'You said: ' : 'Hive AI said: '}</span>

                    {/* Markdown Body */}
                    <div className={isUser ? 'whitespace-pre-wrap' : 'markdown-body text-stone-800'}>
                      {isUser ? (
                        m.text
                      ) : (
                        <div className="prose prose-stone prose-xs max-w-none text-stone-800 leading-relaxed space-y-2 [&_h3]:text-xs [&_h3]:font-black [&_h3]:text-stone-900 [&_h3]:mt-2 [&_h3]:mb-1 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:my-1.5 [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-4 [&_strong]:text-stone-950 [&_strong]:font-bold [&_hr]:border-amber-200 [&_hr]:my-2">
                          <Markdown>{m.text}</Markdown>
                        </div>
                      )}
                    </div>

                    {/* Copy Button for Bot Messages */}
                    {!isUser && (
                      <div className="mt-2.5 pt-2 border-t border-amber-100/60 flex items-center justify-between text-[10px] text-stone-400">
                        <div className="flex items-center gap-1.5 font-mono">
                          {m.modelUsed && (
                            <span className="bg-amber-100/60 text-amber-800 px-1.5 py-0.5 rounded-md font-medium text-[9px]">
                              {m.modelUsed}
                            </span>
                          )}
                          <span>{m.timestamp}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyText(m.id, m.text)}
                          title="Copy response to clipboard"
                          className="inline-flex items-center gap-1 text-stone-500 hover:text-amber-700 bg-stone-50 hover:bg-amber-50 px-2 py-0.5 rounded border border-stone-200 transition-colors cursor-pointer"
                        >
                          {copiedMessageId === m.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Suggested Follow-ups on latest message */}
                  {!isUser && m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {m.suggestedFollowUps.map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          disabled={loading}
                          onClick={() => handleSend(prompt)}
                          className="text-[11px] bg-white hover:bg-amber-100 text-stone-700 hover:text-stone-950 border border-amber-200 rounded-full px-2.5 py-1 transition-all text-left shadow-2xs cursor-pointer flex items-center gap-1 font-medium disabled:opacity-50"
                        >
                          <span className="text-amber-500">↳</span>
                          <span>{prompt}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div
                    aria-hidden="true"
                    className="w-7 h-7 rounded-xl bg-stone-800 text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs"
                  >
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {loading && (
            <div
              role="status"
              className="flex items-center justify-between p-3 bg-white border border-amber-300 rounded-2xl text-stone-800 text-xs font-medium shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping absolute" aria-hidden="true"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 relative" aria-hidden="true"></span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-stone-900 block">Hive AI is thinking...</span>
                  <span className="text-[10px] text-stone-500">
                    Querying {activeMode === 'fast' ? 'Gemini 3.1 Flash-Lite' : 'Gemini 3.5 Flash'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStop}
                aria-label="Stop generating AI response"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[11px] font-bold shadow-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-hidden"
              >
                <Square className="w-3 h-3 fill-current" aria-hidden="true" />
                <span>Stop</span>
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Prompts */}
        <div className="p-3 bg-amber-100/50 border-t border-amber-200 shrink-0 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-stone-700 font-bold flex items-center gap-1 font-display">
              <span>Suggested for {ROLE_CONFIG[activeRole].label}:</span>
            </span>
            <span className="text-[10px] text-stone-500 font-mono">Click to send</span>
          </div>

          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Suggested questions">
            {ROLE_CONFIG[activeRole].quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                disabled={loading}
                onClick={() => handleSend(prompt)}
                className="bg-white hover:bg-amber-200/60 text-stone-800 border border-amber-300/80 px-2.5 py-1 rounded-lg text-left text-[11px] disabled:opacity-50 transition-colors cursor-pointer font-body shadow-2xs focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden flex items-center gap-1"
              >
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-amber-200 flex items-center gap-2 shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            placeholder={ROLE_CONFIG[activeRole].placeholder}
            aria-label="Ask Hive AI a question"
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:border-amber-400 font-body focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50"
          />

          {loading ? (
            <button
              type="button"
              onClick={handleStop}
              aria-label="Stop generating AI response"
              className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm font-bold text-xs focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-hidden shrink-0"
            >
              <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send question to AI Assistant"
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 p-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-sm font-bold border border-amber-400/40 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden shrink-0"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};


