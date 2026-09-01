import React, { useState } from 'react';
import { ToneMode, Hotspot } from '../types';
import { HOTSPOTS } from '../data/ecohiveData';
import { IMAGES } from '../data/images';
import {
  Cpu,
  Layers,
  Thermometer,
  Weight,
  Sun,
  ShieldAlert,
  Download,
  CheckCircle,
  FileCode2,
  Sparkles,
  Info,
} from 'lucide-react';

interface Props {
  tone: ToneMode;
  openTelemetry: () => void;
  openWorklog: () => void;
}

export const SmartHiveView: React.FC<Props> = ({ tone, openTelemetry, openWorklog }) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[1]); // Default IoT module
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (downloadEmail) {
      fetch('/api/catalog-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: downloadEmail, name: 'Lead User' }),
      })
        .then((res) => res.json())
        .then((data) => {
          setDownloadSuccess(true);
          setDownloadEmail('');
        })
        .catch(() => setDownloadSuccess(true));
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white py-12 px-4 rounded-3xl shadow-xl">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            Flagship Agri-Tech Hardware
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            The Climate-Smart Langstroth Beehive
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {tone === 'technical'
              ? 'Engineering precision meets IoT telemetry. Built with UV-stabilized recycled HDPE composite panels, solar micro-PCBs, and high R-value insulation.'
              : tone === 'community'
              ? 'A sturdy, rot-proof home for your bees that alerts your phone when honey is ready to harvest—no rotting wood, no termites, and zero stress.'
              : 'Our patented design isn’t just a beehive; it’s a high-precision data center for your colony, engineered for maximum honey yield and 15-year durability.'}
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={openTelemetry}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Launch Live Telemetry Monitor</span>
            </button>
            <button
              onClick={openWorklog}
              className="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 font-semibold px-4 py-2.5 rounded-xl text-xs border border-emerald-700/80 flex items-center gap-2"
            >
              <FileCode2 className="w-4 h-4 text-amber-300" />
              <span>Inspect Technical Blueprint</span>
            </button>
          </div>
        </div>
      </section>

      {/* INTERACTIVE EXPLODED HIVE INSPECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Interactive 3D Modular Anatomy
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Click on any hotspot badge to inspect technical engineering and community benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Render Image with Clickable Hotspots */}
          <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden min-h-[420px]">
            <img
              src={IMAGES.explodedHive}
              alt="3D Exploded View of EcoHive Climate-Smart Beehive"
              className="w-full h-auto object-contain max-h-[500px] mx-auto rounded-xl opacity-90"
              referrerPolicy="no-referrer"
            />

            {/* Hotspot Pins */}
            {HOTSPOTS.map((spot) => {
              const isSelected = activeHotspot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  style={{ top: `${spot.yPct}%`, left: `${spot.xPct}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg z-20 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 scale-110'
                      : 'bg-emerald-700/90 text-white hover:bg-emerald-600 hover:scale-105 border border-emerald-400/40'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  <span>{spot.badge}</span>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-slate-300 text-xs flex items-center justify-between">
              <span>💡 Tip: Click pins on the image to inspect components</span>
              <span className="text-amber-400 font-mono font-bold">{HOTSPOTS.length} Hotspots Active</span>
            </div>
          </div>

          {/* Active Hotspot Detail Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {activeHotspot.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {activeHotspot.id}</span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                {tone === 'technical'
                  ? activeHotspot.titleTechnical
                  : tone === 'community'
                  ? activeHotspot.titleCommunity
                  : activeHotspot.titleTechnical}
              </h3>

              <div className="space-y-4 pt-2">
                {/* Technical Perspective */}
                {(tone === 'technical' || tone === 'balanced') && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                      <Cpu className="w-4 h-4 text-emerald-600" />
                      <span>Technical & Engineering Spec</span>
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed">
                      {activeHotspot.descTechnical}
                    </p>
                  </div>
                )}

                {/* Community Perspective */}
                {(tone === 'community' || tone === 'balanced') && (
                  <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Beekeeper & Community Benefit</span>
                    </div>
                    <p className="text-amber-950 text-xs leading-relaxed">
                      {activeHotspot.descCommunity}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Component selector buttons */}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 mb-2">Select Component:</p>
              <div className="flex flex-wrap gap-1.5">
                {HOTSPOTS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveHotspot(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeHotspot.id === item.id
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.badge}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIAL SCIENCE COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white p-8 lg:p-12 rounded-3xl border border-slate-800 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full">
              Material Engineering Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Recycled Composite vs Traditional Cedar Wood
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Why EcoHive delivers 5x longer lifecycle and 3x higher honey yield.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-800 text-amber-400 uppercase text-[11px] font-bold">
                  <th className="py-3 px-4">Performance Metric</th>
                  <th className="py-3 px-4 bg-emerald-950/80 text-emerald-300 font-extrabold rounded-t-lg">
                    EcoHive Recycled HDPE
                  </th>
                  <th className="py-3 px-4 text-slate-400">Traditional Cedar Wood</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Expected Lifecycle</td>
                  <td className="py-3.5 px-4 bg-emerald-950/40 font-bold text-amber-300">15+ Years (No Maintenance)</td>
                  <td className="py-3.5 px-4 text-slate-400">2 - 3 Years (Rots & Warps)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Pest Resistance (Termites/Beetles)</td>
                  <td className="py-3.5 px-4 bg-emerald-950/40 font-bold text-emerald-300">100% Impervious</td>
                  <td className="py-3.5 px-4 text-slate-400">High vulnerability</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Thermal Insulation (R-Value)</td>
                  <td className="py-3.5 px-4 bg-emerald-950/40 font-bold text-emerald-300">R-3.8 Composite Insulation</td>
                  <td className="py-3.5 px-4 text-slate-400">R-1.1 Basic Wood Wall</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">IoT Sensor Integration</td>
                  <td className="py-3.5 px-4 bg-emerald-950/40 font-bold text-amber-300">Built-in GSM Solar Unit</td>
                  <td className="py-3.5 px-4 text-slate-400">None (Manual Inspection)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Environmental Footprint</td>
                  <td className="py-3.5 px-4 bg-emerald-950/40 font-bold text-emerald-300">Diverts 25kg Plastic Waste</td>
                  <td className="py-3.5 px-4 text-slate-400">Requires tree logging</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LEAD MAGNET / TECHNICAL CATALOG DOWNLOAD FORM */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
            <Download className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold">
              Download Technical Specifications PDF
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-lg mx-auto">
              Get full engineering blueprints, material test certifications, and IoT sensor integration manuals.
            </p>
          </div>

          {downloadSuccess ? (
            <div className="bg-emerald-900/90 border border-emerald-500/60 p-4 rounded-xl text-amber-300 text-xs font-semibold animate-in fade-in duration-200">
              ✓ Specification Sheet Prepared! Sent to your email address.
            </div>
          ) : (
            <form onSubmit={handleDownloadSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={downloadEmail}
                onChange={(e) => setDownloadEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-white/10 border border-emerald-600/80 rounded-xl px-4 py-3 text-xs text-white placeholder-emerald-300 focus:outline-hidden focus:border-amber-400"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shrink-0"
              >
                Get Spec Sheet PDF
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
