import React, { useState } from 'react';
import { WORKLOG_TASKS } from '../data/ecohiveData';
import { X, CheckCircle2, FolderTree, FileCode, Layers, ShieldCheck, Download } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const WorklogScaffoldingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'worklog' | 'scaffolding' | 'folder-structure'>('worklog');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-6 flex items-center justify-between border-b border-emerald-800">
          <div>
            <span className="text-amber-400 text-xs font-mono font-bold uppercase tracking-wider block">
              Pullus Africa Benchmark Audit
            </span>
            <h2 className="text-xl font-extrabold">Project Worklog & Website Scaffolding</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-300 hover:text-white rounded-full bg-emerald-900/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('worklog')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'worklog'
                ? 'bg-white text-emerald-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Implementation Worklog ({WORKLOG_TASKS.length} Phases)</span>
          </button>

          <button
            onClick={() => setActiveTab('scaffolding')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'scaffolding'
                ? 'bg-white text-emerald-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>5-Page Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('folder-structure')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'folder-structure'
                ? 'bg-white text-emerald-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderTree className="w-4 h-4 text-emerald-600" />
            <span>2-Tier Folder Structure</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {activeTab === 'worklog' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-900">
                  Status: All 6 Core Phases Completed
                </span>
                <span className="bg-emerald-700 text-white font-mono px-3 py-1 rounded-full font-bold">
                  100% Ready
                </span>
              </div>

              <div className="space-y-3">
                {WORKLOG_TASKS.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 hover:border-emerald-500 transition-all shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900">{task.phase}</span>
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                        ✓ {task.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs">{task.description}</p>
                    <div className="text-[11px] text-emerald-700 font-mono pt-1">
                      Deliverable: <strong>{task.deliverables}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scaffolding' && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                The EcoHive website adopts the exact high-converting long-scroll structure of Pullus Africa, streamlined into 5 pages:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-extrabold text-emerald-950 text-sm">Page 1: Home (The Hook)</h4>
                  <p className="text-slate-600 text-xs">
                    Hero slider with Smart Hive, Triple Bottom Line bar (People/Planet/Profit), Live traction counters, 4-step Value Chain, and CEO message.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-extrabold text-emerald-950 text-sm">Page 2: The Smart Hive (Tech)</h4>
                  <p className="text-slate-600 text-xs">
                    Interactive 3D Exploded View with clickable hotspots, HDPE material comparison table, and live IoT telemetry widget.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-extrabold text-emerald-950 text-sm">Page 3: Impact & Sustainability</h4>
                  <p className="text-slate-600 text-xs">
                    Interactive plastic waste diversion calculator, Kenya cluster apiary map, and community beekeeper empowerment stories.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-extrabold text-emerald-950 text-sm">Page 4: Products & Catalog</h4>
                  <p className="text-slate-600 text-xs">
                    Raw Honey, Medical Propolis, Beeswax Soap, and Hardware Kit with prices in KES/USD and wholesale order modal.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 md:col-span-2">
                  <h4 className="font-extrabold text-emerald-950 text-sm">Page 5: About Us & Contact</h4>
                  <p className="text-slate-600 text-xs">
                    CEO Peter Gitau profile, direct email directory (Info@, Gitau@, Andika@), and interactive auto-routing inquiry form.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'folder-structure' && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                To guarantee clean handover to Peter Gitau (CEO) and smooth server execution:
              </p>

              <div className="bg-slate-900 text-emerald-300 p-5 rounded-2xl font-mono text-xs overflow-x-auto space-y-2 border border-slate-800">
                <div className="text-amber-400 font-bold">// Tier 1: Client Handover Directory</div>
                <div>ECOHIVE_PROJECT_2024/</div>
                <div>├── 01_Branding/ (Logos, Style_Guide.pdf)</div>
                <div>├── 02_Assets/ (3D_Renders, Technical_Photos, Community_Photos)</div>
                <div>├── 03_Content/ (Website_Copy_Final.docx, Product_Catalog.pdf)</div>
                <div>├── 04_Legal_Admin/ (Domain_Credentials, SSL_Certificate)</div>
                <div>└── 05_Website_Build/ (Production Server Files)</div>

                <div className="text-amber-400 font-bold pt-3">// Tier 2: Technical Build Scaffolding</div>
                <div>/public_html</div>
                <div>├── server.ts (Express + Gemini API + Email Router)</div>
                <div>├── src/</div>
                <div>│   ├── assets/ (Compressed WEBP images & icons)</div>
                <div>│   ├── components/ (Modular React Views)</div>
                <div>│   └── data/ (Dual-tone copy & IoT telemetry)</div>
                <div>└── dist/ (Compiled CommonJS server & bundle)</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">EcoHive Kenya Ltd. Blueprint Audit</span>
          <button
            onClick={onClose}
            className="bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-emerald-900 transition-all"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
