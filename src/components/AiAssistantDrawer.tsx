import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User, MessageSquare } from 'lucide-react';

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

  const handleSend = async (queryText?: string) => {
    const messageToSend = queryText || input;
    if (!messageToSend.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user' as const, text: messageToSend }];
    setMessages(newMessages);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await res.json();
      setMessages([
        ...newMessages,
        {
          sender: 'bot',
          text: data.reply || 'EcoHive Kenya Ltd. offers climate-smart beehives and IoT value chain solutions. Please email Info@ecohivekenya.com for details.',
        },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          sender: 'bot',
          text: 'EcoHive Kenya Ltd. provides 100% recycled plastic climate beehives with solar IoT sensors. Contact Gitau@ecohivekenya.com or Andika@ecohivekenya.com.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center border border-emerald-600">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm leading-tight">Hive AI Assistant</h3>
              <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                EcoHive Kenya Ltd. • Powered by Gemini AI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-full bg-emerald-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 font-bold">
                  🐝
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-br-none shadow-xs font-medium'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-2xs'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-slate-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
              <span>Hive AI is formulating response...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 space-y-1.5 text-[11px]">
          <span className="text-slate-500 font-bold block">Quick Prompts:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleSend('What are the specs of the Climate-Smart Hive?')}
              className="bg-white hover:bg-emerald-50 text-emerald-900 border border-slate-200 px-2.5 py-1 rounded-lg text-left"
            >
              🐝 Smart Hive Specs
            </button>
            <button
              onClick={() => handleSend('How can I invest or partner with EcoHive?')}
              className="bg-white hover:bg-emerald-50 text-emerald-900 border border-slate-200 px-2.5 py-1 rounded-lg text-left"
            >
              💼 Investor Partnerships
            </button>
            <button
              onClick={() => handleSend('Who is CEO Peter Gitau?')}
              className="bg-white hover:bg-emerald-50 text-emerald-900 border border-slate-200 px-2.5 py-1 rounded-lg text-left"
            >
              👤 CEO Peter Gitau
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Hive AI a question..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-600"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="bg-emerald-700 hover:bg-emerald-800 text-white p-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
