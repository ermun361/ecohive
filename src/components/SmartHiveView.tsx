import React, { useState } from 'react';
import { Hotspot } from '../types';
import { HOTSPOTS } from '../data/ecohiveData';
import { IMAGES } from '../data/images';
import { Hive3DCanvas } from './Hive3DCanvas';
import {
  Cpu,
  Download,
  Box,
  Image as ImageIcon,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface Props {
  openTelemetry: () => void;
}

export const SmartHiveView: React.FC<Props> = ({ openTelemetry }) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[1]); // Default IoT module
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [downloadEmail, setDownloadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelect3DPart = (partId: string) => {
    const found = HOTSPOTS.find((h) => h.id === partId);
    if (found) {
      setActiveHotspot(found);
    }
  };

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const emailTrimmed = downloadEmail.trim();

    if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/catalog-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailTrimmed, name: 'Lead User' }),
      });

      if (!res.ok) {
        throw new Error('Network error processing download request.');
      }
      setDownloadSuccess(true);
      setDownloadEmail('');
    } catch (err: any) {
      setErrorMessage('Unable to dispatch specification PDF right now. Please try again or reach out directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-br from-amber-500 via-yellow-500 to-stone-950 text-white py-14 px-6 rounded-3xl shadow-xl border-2 border-amber-400/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <span className="bg-amber-400 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md border border-amber-300">
            Flagship Honey-Yield Hardware
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-white">
            The Climate-Smart Langstroth Beehive
          </h1>
          <p className="text-amber-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-body">
            Engineering precision meets IoT telemetry. Built with UV-stabilized recycled HDPE composite panels, solar micro-PCBs, and high R-value insulation to maximize colony health and pure honey output.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={openTelemetry}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black px-6 py-3 rounded-full text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-400/25 border border-amber-400/50 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-slate-950" />
              <span>Launch Live Telemetry Monitor</span>
            </button>
          </div>
        </div>
      </section>

      {/* INTERACTIVE EXPLODED HIVE INSPECTOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
              Interactive 3D Modular Anatomy
            </h2>
            <p className="text-stone-600 text-sm mt-1 font-body">
              {viewMode === '3d'
                ? 'Rotate, zoom, and explode the real-time 3D WebGL Langstroth Hive.'
                : 'Click on any hotspot badge to inspect technical specifications.'}
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-amber-400/10 p-1.5 rounded-2xl border border-amber-400/30 self-start sm:self-auto shadow-2xs">
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-xs border border-amber-400/40'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Interactive 3D WebGL</span>
            </button>
            <button
              onClick={() => setViewMode('2d')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                viewMode === '2d'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-xs border border-amber-400/40'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>2D Hotspot Pins</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D WebGL Canvas OR 2D Render Image with Hotspots */}
          <div className="lg:col-span-7">
            {viewMode === '3d' ? (
              <Hive3DCanvas
                activePartId={activeHotspot.id}
                onSelectPart={handleSelect3DPart}
              />
            ) : (
              <div className="bg-stone-950 p-6 rounded-3xl border-2 border-amber-400/40 shadow-2xl relative overflow-hidden min-h-[420px]">
                <img
                  src={IMAGES.explodedHive}
                  alt="3D Exploded View of EcoHive Climate-Smart Beehive showing solar roof, honey super, brood chamber, and hive scale"
                  width="700"
                  height="450"
                  className="w-full h-auto object-contain max-h-[500px] mx-auto rounded-2xl opacity-90"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />

                {/* Hotspot Pins */}
                {HOTSPOTS.map((spot) => {
                  const isSelected = activeHotspot.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(spot)}
                      style={{ top: `${spot.yPct}%`, left: `${spot.xPct}%` }}
                      aria-label={`Hotspot pin for ${spot.badge}`}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all shadow-lg z-20 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 scale-110 shadow-amber-400/40'
                          : 'bg-stone-900/90 text-amber-300 hover:bg-stone-800 hover:scale-105 border border-amber-400/50'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                      <span>{spot.badge}</span>
                    </button>
                  );
                })}

                <div className="absolute bottom-4 left-4 right-4 bg-stone-950/85 backdrop-blur-md p-3 rounded-2xl border border-amber-400/30 text-stone-300 text-xs flex items-center justify-between">
                  <span>💡 Tip: Click pins on the image to inspect components</span>
                  <span className="text-amber-400 font-mono font-bold">{HOTSPOTS.length} Hotspots Active</span>
                </div>
              </div>
            )}
          </div>

          {/* Active Hotspot Detail Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-amber-400/30 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-amber-400/20 pb-4">
              <span className="bg-amber-400/15 text-amber-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider border border-amber-400/40 shadow-2xs">
                {activeHotspot.badge}
              </span>
              <span className="text-xs text-stone-400 font-mono">ID: {activeHotspot.id}</span>
            </div>

            <div>
              <h3 className="text-xl font-black text-stone-900 mb-2 font-display">
                {activeHotspot.titleTechnical}
              </h3>

              <div className="space-y-4 pt-2">
                {/* Technical Perspective */}
                <div className="bg-amber-400/5 p-4 rounded-2xl border border-amber-400/25 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wide">
                    <Cpu className="w-4 h-4 text-amber-600" />
                    <span>Technical & Engineering Spec</span>
                  </div>
                  <p className="text-stone-700 text-xs leading-relaxed font-body">
                    {activeHotspot.descTechnical}
                  </p>
                </div>

                {/* Community Perspective */}
                <div className="bg-gradient-to-br from-amber-400/10 to-yellow-500/10 p-4 rounded-2xl border border-amber-400/35 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wide">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Beekeeper & Community Benefit</span>
                  </div>
                  <p className="text-amber-950 text-xs leading-relaxed font-body">
                    {activeHotspot.descCommunity}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Component selector buttons */}
            <div className="pt-2 border-t border-amber-400/20">
              <p className="text-xs font-bold text-stone-500 mb-2">Select Component:</p>
              <div className="flex flex-wrap gap-1.5">
                {HOTSPOTS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveHotspot(item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeHotspot.id === item.id
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-xs border border-amber-400/50'
                        : 'bg-amber-400/10 text-stone-800 hover:bg-amber-400/20 border border-amber-400/25'
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
        <div className="bg-stone-950 text-white p-8 lg:p-12 rounded-3xl border-2 border-amber-400/30 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-300 text-xs font-black uppercase tracking-widest bg-stone-900 border border-amber-400/40 px-3.5 py-1 rounded-full">
              Material Engineering Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Recycled Composite vs Traditional Cedar Wood
            </h2>
            <p className="text-amber-100/70 text-xs sm:text-sm font-body">
              Why EcoHive delivers 5x longer lifecycle and 3x higher honey yield.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-stone-800 text-amber-400 uppercase text-[11px] font-bold">
                  <th className="py-3 px-4">Performance Metric</th>
                  <th className="py-3 px-4 bg-amber-400/20 text-amber-300 font-black rounded-t-xl border border-amber-400/40">
                    EcoHive Recycled HDPE
                  </th>
                  <th className="py-3 px-4 text-stone-400">Traditional Cedar Wood</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 text-stone-300">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Expected Lifecycle</td>
                  <td className="py-3.5 px-4 bg-amber-400/10 font-bold text-amber-300">15+ Years (No Maintenance)</td>
                  <td className="py-3.5 px-4 text-stone-400">2 - 3 Years (Rots & Warps)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Pest Resistance (Termites/Beetles)</td>
                  <td className="py-3.5 px-4 bg-amber-400/10 font-bold text-amber-300">100% Impervious</td>
                  <td className="py-3.5 px-4 text-stone-400">High vulnerability</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Thermal Insulation (R-Value)</td>
                  <td className="py-3.5 px-4 bg-amber-400/10 font-bold text-amber-300">R-3.8 Composite Insulation</td>
                  <td className="py-3.5 px-4 text-stone-400">R-1.1 Basic Wood Wall</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">IoT Sensor Integration</td>
                  <td className="py-3.5 px-4 bg-amber-400/10 font-bold text-amber-300">Built-in GSM Solar Unit</td>
                  <td className="py-3.5 px-4 text-stone-400">None (Manual Inspection)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Environmental Footprint</td>
                  <td className="py-3.5 px-4 bg-amber-400/10 font-bold text-amber-300">Diverts 25kg Plastic Waste</td>
                  <td className="py-3.5 px-4 text-stone-400">Requires tree logging</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LEAD MAGNET / TECHNICAL CATALOG DOWNLOAD FORM (CALL-TO-ACTION) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-stone-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl text-center space-y-6 border-2 border-amber-400/40">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-md border border-amber-300">
            <Download className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black font-display text-white">
              Download Technical Specifications PDF
            </h3>
            <p className="text-amber-100 text-xs sm:text-sm max-w-lg mx-auto font-body">
              Get full engineering blueprints, material test certifications, and IoT sensor integration manuals.
            </p>
          </div>

          {downloadSuccess ? (
            <div className="bg-stone-900/90 border-2 border-amber-400 p-4 rounded-2xl text-amber-300 text-xs font-black animate-in fade-in duration-200 shadow-md">
              ✓ Specification Sheet Prepared! Sent to your email address.
            </div>
          ) : (
            <div className="space-y-3">
              <form onSubmit={handleDownloadSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                <label htmlFor="spec-download-email" className="sr-only">
                  Your email address for technical specification PDF
                </label>
                <input
                  id="spec-download-email"
                  type="email"
                  value={downloadEmail}
                  onChange={(e) => {
                    setDownloadEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Enter your email address"
                  required
                  disabled={isSubmitting}
                  aria-label="Enter your email address to receive technical specifications"
                  className="flex-1 bg-white/20 border border-amber-300/60 rounded-xl px-4 py-3 text-xs text-white placeholder-amber-100 focus:outline-hidden focus:border-amber-300 focus-visible:ring-2 focus-visible:ring-amber-300 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-400 hover:bg-yellow-500 text-slate-950 font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md shrink-0 disabled:opacity-60 flex items-center justify-center gap-1.5 border border-amber-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-hidden"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Get Spec Sheet PDF'
                  )}
                </button>
              </form>
              {errorMessage && (
                <div role="alert" className="flex items-center justify-center gap-1.5 text-xs text-red-200 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 text-red-300 shrink-0" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
