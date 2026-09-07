import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, User, Square } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Karibu! I am Hive AI, the intelligent assistant for EcoHive Kenya Ltd. How can I help you today with our Climate-Smart Beehives, Honey Value Chain, or CEO Peter Gitau’s vision?',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
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
      { sender: 'bot', text: '— Response halted by user. Let me know what else I can help with!' },
    ]);
  };

  const handleSend = async (queryText?: string) => {
    const messageToSend = (queryText || input).trim();
    if (!messageToSend || loading) return;

    // Create new abort controller for this generation
    abortControllerRef.current = new AbortController();

    // Add user message
    const newMessages = [...messages, { sender: 'user' as const, text: messageToSend }];
    setMessages(newMessages);
    if (!queryText) setInput('');
    setLoading(true);
    setLiveAnnouncement(`User asked: ${messageToSend}. Generating AI response...`);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend }),
        signal: abortControllerRef.current.signal,
      });

      const data = await res.json();
      const botReply = data.reply || 'EcoHive Kenya Ltd. offers climate-smart beehives and IoT value chain solutions. Please email Info@ecohivekenya.com for details.';
      
      setMessages([
        ...newMessages,
        {
          sender: 'bot',
          text: botReply,
        },
      ]);
      setLiveAnnouncement(`Hive AI replied: ${botReply}`);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Generation was cancelled intentionally
        return;
      }
      const fallbackReply = 'EcoHive Kenya Ltd. provides 100% recycled plastic climate beehives with solar IoT sensors. Contact Gitau@ecohivekenya.com or Andika@ecohivekenya.com.';
      setMessages([
        ...newMessages,
        {
          sender: 'bot',
          text: fallbackReply,
        },
      ]);
      setLiveAnnouncement(`Hive AI replied: ${fallbackReply}`);
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
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-amber-200 animate-in slide-in-from-right duration-250">
        {/* Screen Reader Live Region for Politeness */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {liveAnnouncement}
        </div>

        {/* Header */}
        <div className="bg-stone-950 text-white p-5 flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <Bot className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 id="ai-drawer-title" className="font-black text-sm leading-tight font-display text-white">Hive AI Assistant</h3>
              <p className="text-[11px] text-amber-400 flex items-center gap-1 font-body">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" aria-hidden="true"></span>
                EcoHive Kenya Ltd. • Powered by Gemini AI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close AI Assistant drawer"
            className="p-1.5 text-stone-400 hover:text-white rounded-full bg-stone-900 hover:bg-stone-800 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-hidden"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Messages Body */}
        <div
          role="log"
          aria-label="Chat messages history"
          tabIndex={0}
          className="flex-1 p-4 overflow-y-auto space-y-3 bg-amber-400/5 text-xs font-body focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div
                  aria-hidden="true"
                  className="w-7 h-7 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-xs border border-amber-400/40"
                >
                  🐝
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-semibold rounded-br-none shadow-xs border border-amber-400/50'
                    : 'bg-white text-stone-900 border border-amber-400/25 rounded-bl-none shadow-2xs'
                }`}
              >
                <span className="sr-only">{m.sender === 'user' ? 'You said: ' : 'Hive AI: '}</span>
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div
                  aria-hidden="true"
                  className="w-7 h-7 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 font-bold"
                >
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div
              role="status"
              className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-stone-700 text-xs font-medium"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" aria-hidden="true"></span>
                <span>Hive AI is formulating response...</span>
              </div>

              {/* Keyboard-reachable Stop Button (FE-10 requirement) */}
              <button
                type="button"
                onClick={handleStop}
                aria-label="Stop generating AI response"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-bold shadow-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-hidden"
              >
                <Square className="w-3 h-3 fill-current" aria-hidden="true" />
                <span>Stop</span>
              </button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="p-3 bg-amber-400/10 border-t border-amber-400/20 space-y-1.5 text-[11px]">
          <span className="text-stone-700 font-bold block font-display">Quick Prompts:</span>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Suggested questions">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSend('What are the specs of the Climate-Smart Hive?')}
              className="bg-white hover:bg-amber-400/15 text-stone-900 border border-amber-400/30 px-2.5 py-1 rounded-lg text-left disabled:opacity-50 transition-colors cursor-pointer font-body shadow-2xs focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
            >
              🐝 Smart Hive Specs
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSend('How can I invest or partner with EcoHive?')}
              className="bg-white hover:bg-amber-400/15 text-stone-900 border border-amber-400/30 px-2.5 py-1 rounded-lg text-left disabled:opacity-50 transition-colors cursor-pointer font-body shadow-2xs focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
            >
              💼 Investor Partnerships
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSend('Who is CEO Peter Gitau?')}
              className="bg-white hover:bg-amber-400/15 text-stone-900 border border-amber-400/30 px-2.5 py-1 rounded-lg text-left disabled:opacity-50 transition-colors cursor-pointer font-body shadow-2xs focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
            >
              👤 CEO Peter Gitau
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-amber-400/20 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Hive AI a question..."
            aria-label="Ask Hive AI a question"
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:border-amber-400 font-body focus-visible:ring-2 focus-visible:ring-amber-500"
          />

          {loading ? (
            <button
              type="button"
              onClick={handleStop}
              aria-label="Stop generating AI response"
              className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white px-3 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm font-bold text-xs focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-hidden"
            >
              <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send question to AI Assistant"
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 p-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-sm font-bold border border-amber-400/40 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

