import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ExternalLink } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Hello EcoHive Kenya! I would like to inquire about the Climate-Smart Beehive.');

  const whatsappNumber = '254726988151'; // From company phone +254 726 988 151

  // Handle Escape key to close dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleSend = () => {
    const encoded = encodeURIComponent(message.trim() || 'Hello EcoHive Kenya!');
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open WhatsApp live chat with EcoHive Kenya"
          className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all group border border-emerald-400/30 cursor-pointer"
          title="Chat with EcoHive Kenya on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-white/20 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-emerald-700 animate-ping"></span>
          </div>
          <span className="hidden sm:inline text-sm font-semibold pr-1 font-body">WhatsApp Chat</span>
        </button>
      )}

      {/* WhatsApp Dialog Drawer */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="EcoHive WhatsApp Support Dialog"
          className="bg-white rounded-3xl shadow-2xl border border-amber-200/80 w-80 sm:w-96 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-stone-950 text-white p-4 flex items-center justify-between border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center font-bold text-amber-400 border border-amber-400/40">
                🐝
              </div>
              <div>
                <h4 className="font-black text-sm leading-tight font-display text-white">EcoHive Kenya Ltd.</h4>
                <p className="text-[11px] text-amber-400 flex items-center gap-1 font-body">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Online | Quick Response
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp chat dialog"
              className="text-stone-400 hover:text-white p-1.5 rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-amber-50/30 space-y-3 text-xs font-body">
            <div className="bg-white p-3.5 rounded-2xl border border-amber-100 shadow-2xs space-y-1">
              <p className="font-bold text-stone-900 font-display">Karibu EcoHive Kenya! 👋</p>
              <p className="text-stone-600 leading-relaxed font-body">
                How can we assist you today? Select a quick prompt or type your message to chat directly with our team in Kenya.
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                type="button"
                onClick={() => setMessage('I am interested in buying Climate-Smart Beehives for my farm.')}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-amber-100/80 border border-amber-200 text-stone-900 font-medium text-[11px] transition-colors cursor-pointer"
              >
                🐝 Inquiry about Buying Smart Hives
              </button>

              <button
                type="button"
                onClick={() => setMessage('I want to order EcoHive Raw Honey & Propolis wholesale.')}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-amber-100/80 border border-amber-200 text-stone-900 font-medium text-[11px] transition-colors cursor-pointer"
              >
                🍯 Order Raw Honey / Propolis Wholesale
              </button>

              <button
                type="button"
                onClick={() => setMessage('I am an investor / partner interested in the Honey Value Chain.')}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-amber-100/80 border border-amber-200 text-stone-900 font-medium text-[11px] transition-colors cursor-pointer"
              >
                💼 Investor & Value Chain Partnership
              </button>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              aria-label="Message to send on WhatsApp"
              className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:outline-hidden focus:border-amber-500 font-body"
              placeholder="Type your inquiry..."
            ></textarea>
          </div>

          {/* Footer CTA */}
          <div className="p-3 bg-white border-t border-amber-100 flex items-center justify-between">
            <span className="text-[10px] text-stone-500 font-mono">+254 726 988 151</span>
            <button
              onClick={handleSend}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <span>Start WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
