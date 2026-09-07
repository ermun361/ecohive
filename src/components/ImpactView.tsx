import React, { useState } from 'react';
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

interface Props {}

export const ImpactView: React.FC<Props> = () => {
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
      <section className="bg-gradient-to-br from-amber-500 via-yellow-500 to-stone-950 text-white py-14 px-6 rounded-3xl shadow-xl text-center space-y-4 border-2 border-amber-400/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <span className="bg-amber-400 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md border border-amber-300 relative z-10">
          Triple Bottom Line Impact
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-white relative z-10">
          People, Planet & Profit in Action
        </h1>
        <p className="text-amber-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-body relative z-10">
          Every EcoHive climate-smart beehive removes plastic from rivers and landfills while generating sustainable income for rural beekeepers and decarbonizing agricultural value chains.
        </p>
      </section>

      {/* INTERACTIVE IMPACT CALCULATOR */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-amber-400/30 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-amber-950 uppercase tracking-widest bg-amber-400/15 px-3.5 py-1 rounded-full border border-amber-400/40 shadow-2xs">
              Interactive Impact Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
              Calculate Your Project Environmental & Economic Yield
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm font-body">
              Adjust the slider below to simulate hive deployment scale across Kenyan apiaries.
            </p>
          </div>

          {/* Slider Control */}
          <div className="space-y-4 max-w-2xl mx-auto bg-amber-400/10 p-6 rounded-3xl border border-amber-400/30">
            <div className="flex items-center justify-between font-black">
              <label htmlFor="impact-slider" className="text-stone-800 text-sm cursor-pointer">
                Deployment Scale:
              </label>
              <span className="text-slate-950 text-xl font-mono bg-gradient-to-r from-amber-400 to-yellow-500 border border-amber-400 px-4 py-1 rounded-xl shadow-xs font-black">
                {hiveCount} Smart Hives
              </span>
            </div>

            <input
              id="impact-slider"
              type="range"
              min="10"
              max="1000"
              step="10"
              value={hiveCount}
              onChange={(e) => setHiveCount(Number(e.target.value))}
              aria-label="Adjust simulated hive deployment scale"
              aria-valuemin={10}
              aria-valuemax={1000}
              aria-valuenow={hiveCount}
              aria-valuetext={`${hiveCount} smart hives`}
              className="w-full accent-amber-500 h-2.5 bg-amber-400/30 rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
            />

            <div className="flex justify-between text-[11px] text-stone-600 font-mono font-bold">
              <span>10 Hives (Smallholder)</span>
              <span>250 Hives (Cluster)</span>
              <span>1,000 Hives (Commercial)</span>
            </div>
          </div>

          {/* Calculated Output Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-600 to-stone-900 text-white p-6 rounded-3xl border border-amber-400/40 text-center space-y-1 shadow-md">
              <Recycle className="w-8 h-8 text-amber-300 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-amber-200 font-mono">
                {plasticSavedKg.toLocaleString()} kg
              </div>
              <div className="text-xs font-black text-amber-100 uppercase tracking-wider">
                Plastic Waste Saved
              </div>
              <p className="text-[10px] text-amber-200/90 font-medium">Diverted from landfills & rivers</p>
            </div>

            <div className="bg-stone-950 text-white p-6 rounded-3xl border border-amber-400/40 text-center space-y-1 shadow-md">
              <TreePine className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {carbonOffsetKg.toLocaleString()} kg CO₂e
              </div>
              <div className="text-xs font-black text-amber-300 uppercase tracking-wider">
                Carbon Offset
              </div>
              <p className="text-[10px] text-amber-200/80 font-medium">Avoided timber logging emissions</p>
            </div>

            <div className="bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 p-6 rounded-3xl text-center space-y-1 shadow-md border border-amber-400/50">
              <DollarSign className="w-8 h-8 text-slate-950 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                KES {(farmerRevenueKes / 1000).toFixed(0)}k
              </div>
              <div className="text-xs font-black uppercase tracking-wider">
                Annual Farmer Revenue (~${farmerRevenueUsd.toLocaleString()})
              </div>
              <p className="text-[10px] text-slate-900 font-black">Direct community honey payout</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY FEATURE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-950 text-white rounded-3xl overflow-hidden border-2 border-amber-400/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-4">
              <span className="text-amber-300 text-xs font-black uppercase tracking-widest bg-stone-900 border border-amber-400/40 px-3.5 py-1 rounded-full inline-block shadow-2xs">
                Community Empowerment
              </span>
              <h2 className="text-2xl sm:text-4xl font-black leading-tight font-display text-white">
                Empowering Kenya’s Rural Beekeeping Families
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed font-body">
                By organizing beekeepers into tech-enabled cluster networks, EcoHive provides free installation training, safety suits, and fair guaranteed purchase prices for raw honey and propolis. Over 62% of our participating cluster members are rural women and youth entrepreneurs.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-bold text-amber-300 border-t border-amber-400/20">
                <div>✓ Free Equipment Training</div>
                <div>✓ Guaranteed Price Contracts</div>
                <div>✓ Women & Youth Focus</div>
                <div>✓ Zero Middlemen Exploitation</div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <img
                src={IMAGES.beekeepers}
                alt="Kenyan Beekeeping community members inspecting healthy EcoHive apiary in Nakuru County"
                width="640"
                height="420"
                className="w-full h-full object-cover min-h-[320px]"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* KENYA CLUSTER APIARY MAP / LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-black text-amber-950 uppercase tracking-widest bg-amber-400/15 px-3.5 py-1 rounded-full border border-amber-400/40 shadow-2xs">
            Active Deployments
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            EcoHive Apiary Clusters in Kenya
          </h2>
          <p className="text-stone-600 text-sm font-body">
            Live telemetry nodes monitoring honey accumulation across diverse regional flora ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clusters.map((c, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-amber-400/25 shadow-sm hover:border-yellow-500 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-950 bg-amber-400/15 px-2.5 py-1 rounded-lg border border-amber-400/40">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{c.county}</span>
                </span>
                <span className="text-[10px] bg-gradient-to-r from-amber-400/20 to-yellow-500/20 text-amber-950 font-black px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  Active
                </span>
              </div>

              <h3 className="text-base font-bold text-stone-900 font-display">{c.name}</h3>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-amber-400/20">
                <div>
                  <span className="text-stone-400 block text-[10px]">Active Hives:</span>
                  <span className="font-black text-stone-800 font-mono">{c.hives} Hives</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Cluster Beekeepers:</span>
                  <span className="font-black text-stone-800 font-mono">{c.farmers} Members</span>
                </div>
              </div>

              <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1 font-body">
                <span>Cluster Lead: <strong className="text-stone-700">{c.lead}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
