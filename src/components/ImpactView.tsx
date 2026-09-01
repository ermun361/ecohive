import React, { useState } from 'react';
import { ToneMode } from '../types';
import { IMAGES } from '../data/images';
import {
  Recycle,
  Users,
  TreePine,
  DollarSign,
  MapPin,
  TrendingUp,
  Sparkles,
  Award,
} from 'lucide-react';

interface Props {
  tone: ToneMode;
}

export const ImpactView: React.FC<Props> = ({ tone }) => {
  const [hiveCount, setHiveCount] = useState<number>(50);

  // Calculations based on 25kg plastic per hive & KES 45,000 net profit per hive per year
  const plasticSavedKg = hiveCount * 25;
  const carbonOffsetKg = Math.round(hiveCount * 42.5);
  const farmerRevenueKes = hiveCount * 48000;
  const farmerRevenueUsd = Math.round(farmerRevenueKes / 128);

  const clusters = [
    { name: 'Nairobi Demo Hub', county: 'Nairobi', hives: 80, farmers: 120, lead: 'Joseph Kiptoo' },
    { name: 'Eldoret Agri-Cluster', county: 'Uasin Gishu', hives: 250, farmers: 380, lead: 'Mary Wanjiku' },
    { name: 'Kitui Dryland Sanctuary', county: 'Kitui', hives: 180, farmers: 290, lead: 'Emanuel Mutua' },
    { name: 'Nanyuki Foothills Apiary', county: 'Laikipia', hives: 210, farmers: 340, lead: 'Grace Muthoni' },
    { name: 'Machakos Eastern Cluster', county: 'Machakos', hives: 130, farmers: 210, lead: 'Samuel Musyoka' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white py-12 px-4 rounded-3xl shadow-xl text-center space-y-4">
        <span className="bg-emerald-700 text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
          Triple Bottom Line Impact
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          People, Planet & Profit in Action
        </h1>
        <p className="text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          {tone === 'technical'
            ? 'Quantifying environmental decarbonization and disintermediated rural supply chain economics across Kenya.'
            : tone === 'community'
            ? 'Cleaning our countryside of plastic waste while providing honest, hardworking Kenyan families with steady earnings.'
            : 'Every EcoHive climate-smart beehive removes plastic from rivers and landfills while generating sustainable income for rural beekeepers.'}
        </p>
      </section>

      {/* INTERACTIVE IMPACT CALCULATOR */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              Interactive Impact Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Calculate Your Project Environmental & Economic Yield
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Adjust the slider below to simulate hive deployment scale.
            </p>
          </div>

          {/* Slider Control */}
          <div className="space-y-4 max-w-2xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between font-extrabold">
              <span className="text-slate-700 text-sm">Deployment Scale:</span>
              <span className="text-emerald-800 text-xl font-mono bg-emerald-100 px-4 py-1 rounded-lg">
                {hiveCount} Smart Hives
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={hiveCount}
              onChange={(e) => setHiveCount(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>10 Hives (Smallholder)</span>
              <span>250 Hives (Cluster)</span>
              <span>1,000 Hives (Commercial)</span>
            </div>
          </div>

          {/* Calculated Output Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-800 text-center space-y-1 shadow-md">
              <Recycle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                {plasticSavedKg.toLocaleString()} kg
              </div>
              <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                Plastic Waste Saved
              </div>
              <p className="text-[10px] text-emerald-400/80">Diverted from landfills & oceans</p>
            </div>

            <div className="bg-emerald-900 text-white p-6 rounded-2xl border border-emerald-700 text-center space-y-1 shadow-md">
              <TreePine className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {carbonOffsetKg.toLocaleString()} kg CO₂e
              </div>
              <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                Carbon Offset
              </div>
              <p className="text-[10px] text-emerald-300/80">Avoided logging emissions</p>
            </div>

            <div className="bg-amber-500 text-slate-950 p-6 rounded-2xl text-center space-y-1 shadow-md">
              <DollarSign className="w-8 h-8 text-slate-950 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                KES {(farmerRevenueKes / 1000).toFixed(0)}k
              </div>
              <div className="text-xs font-bold uppercase tracking-wider">
                Annual Farmer Revenue (~${farmerRevenueUsd.toLocaleString()})
              </div>
              <p className="text-[10px] text-slate-900 font-semibold">Direct community earnings</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY FEATURE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full">
                Community Empowerment
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                Empowering Kenya’s Rural Beekeeping Families
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                By organizing beekeepers into tech-enabled cluster networks, EcoHive provides free installation training, safety suits, and fair guaranteed purchase prices for raw honey and propolis. Over 62% of our participating cluster members are rural women and youth entrepreneurs.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-semibold text-emerald-300 border-t border-slate-800">
                <div>✓ Free Equipment Training</div>
                <div>✓ Guaranteed Price Contracts</div>
                <div>✓ Women & Youth Focus</div>
                <div>✓ Zero Middlemen Exploitation</div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <img
                src={IMAGES.beekeepers}
                alt="Kenyan Beekeepers in field"
                className="w-full h-full object-cover min-h-[320px]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* KENYA CLUSTER APIARY MAP / LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Active Deployments
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            EcoHive Apiary Clusters in Kenya
          </h2>
          <p className="text-slate-600 text-sm">
            Live telemetry nodes monitoring honey accumulation across diverse regional ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clusters.map((c, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{c.county}</span>
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{c.name}</h3>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px]">Active Hives:</span>
                  <span className="font-extrabold text-slate-800 font-mono">{c.hives} Hives</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Cluster Beekeepers:</span>
                  <span className="font-extrabold text-slate-800 font-mono">{c.farmers} Members</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                <span>Cluster Lead: <strong className="text-slate-700">{c.lead}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
