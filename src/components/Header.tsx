import React, { useState } from 'react';
import { PageType } from '../types';
import { COMPANY_INFO } from '../data/ecohiveData';
import {
  Hexagon,
  Menu,
  X,
  FileCode2,
  Activity,
  Bot,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';

interface Props {
  currentPage: PageType;
  setPage: (page: PageType) => void;
  openWorklog: () => void;
  openTelemetry: () => void;
  openAiAssistant: () => void;
}

export const Header: React.FC<Props> = ({
  currentPage,
  setPage,
  openWorklog,
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
    <header className="bg-white border-b border-slate-100 sticky top-[37px] z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 bg-[#166534] rounded-lg flex items-center justify-center shadow-xs group-hover:bg-[#14532D] transition-all">
              <div className="w-5 h-5 bg-[#86EFAC] rounded-full flex items-center justify-center text-[10px] font-bold text-[#166534]">
                🐝
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-[#166534] font-sans">
                ECOHIVE<span className="text-[#22C55E]">KENYA</span>
              </span>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                People | Planet | Profit
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 font-medium text-slate-600">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-1 text-sm transition-all ${
                    active
                      ? 'text-[#166534] border-b-2 border-[#166534] font-semibold'
                      : 'hover:text-[#166534] transition-colors'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={openWorklog}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-[#166534] transition-all"
              title="View Website Blueprint, Scaffolding & Project Worklog"
            >
              <FileCode2 className="w-4 h-4 text-[#166534]" />
              <span>Blueprint</span>
            </button>

            <button
              onClick={openTelemetry}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-green-50 text-[#166534] border border-green-200 hover:bg-green-100 transition-all"
              title="View Live IoT Hive Telemetry Data"
            >
              <Activity className="w-4 h-4 text-[#22C55E] animate-pulse" />
              <span>IoT Telemetry</span>
            </button>

            <button
              onClick={openAiAssistant}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-[#166534] transition-all"
              title="Ask EcoHive AI Assistant"
            >
              <Bot className="w-4 h-4 text-[#166534]" />
              <span>Hive AI</span>
            </button>

            <button
              onClick={() => handleNavClick('about-contact')}
              className="bg-[#166534] text-white px-6 py-2.5 rounded-full font-semibold shadow-md shadow-green-900/10 hover:bg-[#14532D] transition-all flex items-center gap-1 text-sm ml-2"
            >
              <span>Get a Hive</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={openWorklog}
              className="p-2 text-amber-800 bg-amber-50 rounded-lg border border-amber-200"
              title="Blueprint & Worklog"
            >
              <FileCode2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-emerald-900 rounded-lg hover:bg-emerald-50 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                  currentPage === item.id
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openTelemetry();
              }}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200"
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>IoT Telemetry</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAiAssistant();
              }}
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold"
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>Ask Hive AI</span>
            </button>
          </div>

          <button
            onClick={() => handleNavClick('about-contact')}
            className="w-full text-center py-3 bg-emerald-700 text-white font-bold rounded-lg shadow-sm"
          >
            Partner With Us
          </button>
        </div>
      )}
    </header>
  );
};
