import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCircle, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '../data/ecohiveData';

export const WhatsAppWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Hello EcoHive Kenya! I would like to inquire about the Climate-Smart Beehive.');

  const whatsappNumber = '254726988151'; // From company phone +254 726 988 151

  const handleSend = () => {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all group"
          title="Chat with EcoHive Kenya on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-emerald-500 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-emerald-600 animate-ping"></span>
          </div>
          <span className="hidden sm:inline text-sm font-semibold pr-1">WhatsApp Chat</span>
        </button>
      )}

      {/* WhatsApp Dialog Drawer */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-emerald-100 w-80 sm:w-96 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-amber-300 border border-emerald-500">
                🐝
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">EcoHive Kenya Ltd.</h4>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Online | Quick Response
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-emerald-200 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <p className="font-semibold text-slate-800">Karibu EcoHive Kenya! 👋</p>
              <p className="text-slate-600 leading-relaxed">
                How can we assist you today? Select a quick prompt or type your message to chat directly with our team in Kenya.
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => setMessage('I am interested in buying Climate-Smart Beehives for my farm.')}
                className="w-full text-left p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-medium text-[11px] transition-colors"
              >
                🐝 Inquiry about Buying Smart Hives
              </button>

              <button
                onClick={() => setMessage('I want to order EcoHive Raw Honey & Propolis wholesale.')}
                className="w-full text-left p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-medium text-[11px] transition-colors"
              >
                🍯 Order Raw Honey / Propolis Wholesale
              </button>

              <button
                onClick={() => setMessage('I am an investor / partner interested in the Honey Value Chain.')}
                className="w-full text-left p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-medium text-[11px] transition-colors"
              >
                💼 Investor & Value Chain Partnership
              </button>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-emerald-600"
              placeholder="Type your inquiry..."
            ></textarea>
          </div>

          {/* Footer CTA */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono">+254 726 988 151</span>
            <button
              onClick={handleSend}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs"
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
