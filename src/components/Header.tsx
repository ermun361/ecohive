import React, { useState } from 'react';
import { PageType } from '../types';
import { COMPANY_INFO } from '../data/ecohiveData';
import {
  Menu,
  X,
  Activity,
  Bot,
  ChevronRight,
} from 'lucide-react';

interface Props {
  currentPage: PageType;
  setPage: (page: PageType) => void;
  openTelemetry: () => void;
  openAiAssistant: () => void;
}

export const Header: React.FC<Props> = ({
  currentPage,
  setPage,
  openTelemetry,
  openAiAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'smart-hive', label: 'The Smart Hive' },
    { id: 'impact', label: 'Impact & Story' },
    { id: 'products', label: 'Products' },
    { id: 'about-contact', label: 'About & Contact' },
  ];

  const handleNavClick = (id: PageType) => {
    setPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-amber-400/20 sticky top-0 z-30 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden cursor-pointer"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md shadow-amber-400/25 group-hover:from-amber-500 group-hover:to-yellow-600 transition-all ring-2 ring-amber-400/40">
              <span className="text-xl transform group-hover:scale-110 transition-transform">🐝</span>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-stone-900 font-display">
                ECOHIVE<span className="text-amber-600">KENYA</span>
              </span>
              <p className="text-[10px] font-bold text-amber-800/90 uppercase tracking-widest leading-none mt-0.5">
                Pure Honey • Smart Hives • Kenya
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 font-semibold text-stone-600">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-1 text-sm transition-all relative cursor-pointer ${
                    active
                      ? 'text-amber-900 font-black'
                      : 'hover:text-amber-700 transition-colors'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={openTelemetry}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full bg-amber-400/10 text-amber-950 border border-amber-400/40 hover:border-yellow-500 hover:bg-amber-400/20 transition-all shadow-xs cursor-pointer"
              title="View Live IoT Hive Telemetry Data"
            >
              <Activity className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>IoT Telemetry</span>
            </button>

            <button
              onClick={openAiAssistant}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full bg-stone-100 text-stone-800 hover:bg-amber-400/10 hover:text-amber-950 border border-stone-200 hover:border-amber-400/40 transition-all shadow-xs cursor-pointer"
              title="Ask EcoHive AI Assistant"
            >
              <Bot className="w-4 h-4 text-amber-600" />
              <span>Hive AI</span>
            </button>

            <button
              onClick={() => handleNavClick('about-contact')}
              className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black px-5 py-2.5 rounded-full shadow-md shadow-amber-400/25 border border-amber-400/40 transition-all flex items-center gap-1 text-xs sm:text-sm ml-1 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Get a Hive</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-amber-900 rounded-xl hover:bg-amber-400/10 focus:outline-hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-amber-400/20 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-amber-400/10 text-amber-950 font-bold border border-amber-400/40'
                    : 'text-stone-700 hover:bg-amber-400/5'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-amber-400/20 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openTelemetry();
              }}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-amber-400/10 text-amber-950 text-xs font-bold border border-amber-400/40 shadow-xs cursor-pointer"
            >
              <Activity className="w-4 h-4 text-amber-600" />
              <span>IoT Telemetry</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAiAssistant();
              }}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold border border-stone-200 hover:border-amber-400/40 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-amber-600" />
              <span>Ask Hive AI</span>
            </button>
          </div>

          <button
            onClick={() => handleNavClick('about-contact')}
            className="w-full text-center py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black rounded-xl shadow-md border border-amber-400/40 cursor-pointer"
          >
            Partner With Us
          </button>
        </div>
      )}
    </header>
  );
};
