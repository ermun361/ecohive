import React from 'react';
import { ToneMode } from '../types';
import { Cpu, Users, Layers } from 'lucide-react';

interface Props {
  tone: ToneMode;
  setTone: (tone: ToneMode) => void;
}

export const DualToneToggle: React.FC<Props> = ({ tone, setTone }) => {
  return (
    <div className="bg-[#166534] text-white backdrop-blur-md border-b border-green-700/50 py-2 px-4 sticky top-0 z-40 text-xs sm:text-sm shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#86EFAC] animate-pulse"></span>
          <span className="font-semibold text-green-100">Dual-Tone View Strategy:</span>
          <span className="text-green-200 hidden md:inline">Tailor content for Investors vs Beekeepers</span>
        </div>

        <div className="flex items-center bg-white/10 p-1 rounded-full border border-white/20">
          <button
            onClick={() => setTone('balanced')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all font-medium text-xs ${
              tone === 'balanced'
                ? 'bg-white text-[#166534] shadow-xs font-bold'
                : 'text-green-100 hover:text-white hover:bg-white/10'
            }`}
            title="Balanced view with both technical and community perspectives"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Dual / Balanced</span>
          </button>

          <button
            onClick={() => setTone('technical')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all font-medium text-xs ${
              tone === 'technical'
                ? 'bg-white text-[#166534] shadow-xs font-bold'
                : 'text-green-100 hover:text-white hover:bg-white/10'
            }`}
            title="Focus on IoT specs, material engineering, and ROI for investors"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical / Investor</span>
          </button>

          <button
            onClick={() => setTone('community')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all font-medium text-xs ${
              tone === 'community'
                ? 'bg-white text-[#166534] shadow-xs font-bold'
                : 'text-green-100 hover:text-white hover:bg-white/10'
            }`}
            title="Focus on ease of use, farmer earnings, and community impact"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Community / Farmer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
