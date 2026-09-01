import React from 'react';
import { PageType, ToneMode } from '../types';
import { COMPANY_INFO, TRACTION_STATS, VALUE_CHAIN_STEPS } from '../data/ecohiveData';
import { IMAGES } from '../data/images';
import {
  ArrowRight,
  ShieldCheck,
  Recycle,
  Users,
  TrendingUp,
  Box,
  Award,
  ChevronRight,
  Cpu,
  Sparkles,
  CheckCircle2,
  FileCode2,
  Activity,
} from 'lucide-react';

interface Props {
  tone: ToneMode;
  setPage: (page: PageType) => void;
  openTelemetry: () => void;
  openWorklog: () => void;
}

export const HomeView: React.FC<Props> = ({ tone, setPage, openTelemetry, openWorklog }) => {
  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative bg-[#F8FAFC] text-slate-900 overflow-hidden py-12 lg:py-20 border-b border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
                Building Africa's Future
              </div>

              {tone === 'technical' ? (
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
                  Building Africa’s First <span className="text-[#166534]">IoT-Enabled</span> Honey Value Chain
                </h1>
              ) : tone === 'community' ? (
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
                  Empowering Beekeepers with <span className="text-[#166534]">Smart Hives & Income</span>
                </h1>
              ) : (
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
                  Building <span className="text-[#166534]">Technology-Enabled</span> Honey Value Chains
                </h1>
              )}

              <p className="text-slate-600 text-base sm:text-lg max-w-lg leading-relaxed">
                {tone === 'technical'
                  ? 'EcoHive Kenya Ltd. integrates UV-stabilized recycled HDPE composite beehives, GSM telemetry sensors (temperature, weight, acoustics), and ISO standards to scale high-yield honey export.'
                  : tone === 'community'
                  ? 'Empowering local Kenyan beekeepers through IoT-monitored climate-smart Langstroth hives. Sustainable, modular, and built for farmer income.'
                  : 'Empowering beekeeping communities through IoT-monitored climate-smart Langstroth hives. Sustainable, modular, and built for impact.'}
              </p>

              {/* Stat Cards */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 w-60">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl">📈</div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">1,200+</div>
                    <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Farmers Empowered</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 w-60">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl">🌍</div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">15 Tons</div>
                    <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Honey Produced</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setPage('smart-hive')}
                  className="bg-[#166534] text-white px-6 py-3.5 rounded-full font-semibold shadow-md shadow-green-900/10 hover:bg-[#14532D] transition-all flex items-center gap-2 text-sm sm:text-base"
                >
                  <span>Explore Climate-Smart Hive</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setPage('about-contact')}
                  className="bg-white text-slate-700 px-6 py-3.5 rounded-full font-semibold border border-slate-200 shadow-xs hover:bg-slate-50 transition-all flex items-center gap-2 text-sm sm:text-base"
                >
                  <span>Get a Hive</span>
                  <ChevronRight className="w-5 h-5 text-[#166534]" />
                </button>

                <button
                  onClick={openTelemetry}
                  className="bg-green-50 text-[#166534] px-5 py-3.5 rounded-full font-semibold border border-green-200 hover:bg-green-100 transition-all flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Activity className="w-4 h-4 text-[#22C55E] animate-pulse" />
                  <span>Live Telemetry</span>
                </button>
              </div>
            </div>

            {/* Right Hero Visual (Smart Monitoring Display Widget) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full max-w-sm bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden relative z-10">
                <div className="bg-[#166534] p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-green-300 text-xs font-bold uppercase tracking-widest">Active Device</p>
                      <h3 className="text-xl font-bold">Hive Node #082-K</h3>
                    </div>
                    <div className="bg-green-400/20 text-white px-2 py-1 rounded text-[10px] font-bold">LIVE DATA</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-3 rounded-xl">
                      <p className="text-[10px] uppercase opacity-70">Internal Temp</p>
                      <p className="text-2xl font-bold">34.2°C</p>
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl">
                      <p className="text-[10px] uppercase opacity-70">Hive Weight</p>
                      <p className="text-2xl font-bold">28.4kg</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-medium italic">"Thermal stability optimal"</span>
                    <span className="text-green-600 font-bold uppercase text-[10px]">Sync OK</span>
                  </div>
                  <div className="h-32 bg-slate-50 rounded-xl border border-slate-100 flex items-end p-4 gap-1">
                    <div className="flex-1 bg-green-200 h-[40%] rounded-t-xs"></div>
                    <div className="flex-1 bg-green-300 h-[65%] rounded-t-xs"></div>
                    <div className="flex-1 bg-green-400 h-[55%] rounded-t-xs"></div>
                    <div className="flex-1 bg-[#166534] h-[90%] rounded-t-xs"></div>
                    <div className="flex-1 bg-green-500 h-[75%] rounded-t-xs"></div>
                    <div className="flex-1 bg-green-300 h-[45%] rounded-t-xs"></div>
                    <div className="flex-1 bg-green-200 h-[30%] rounded-t-xs"></div>
                  </div>
                  <button
                    onClick={openTelemetry}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm uppercase tracking-widest transition-colors"
                  >
                    Export Daily Metrics
                  </button>
                </div>
              </div>

              {/* Floating 3D Detail Label */}
              <div className="absolute top-1/4 -right-2 hidden sm:block bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-xl w-48 z-20">
                <p className="text-[10px] font-bold text-[#166534] uppercase tracking-wider">Eco-Material</p>
                <p className="text-sm font-semibold text-slate-800">100% Recycled HDPE Circular Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRIPLE BOTTOM LINE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-[#166534] uppercase tracking-widest bg-green-100 px-4 py-1.5 rounded-full">
            Our Core Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            People | Planet | Profit
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            Sustainable impact is engineered directly into our business model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PEOPLE */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-xl text-slate-800">
                  P1
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-none mb-1 text-lg">PEOPLE</p>
                  <p className="text-xs text-slate-500 font-medium">Community Empowerment</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {tone === 'technical'
                  ? 'Direct market disintermediation. We provide rural smallholders with standardized smart hives, agricultural training, and guaranteed off-take contracts to elevate household income levels.'
                  : 'Empowering local Kenyan beekeepers with reliable equipment, training, and direct access to fair market buyers so more money stays in the hands of hardworking families.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#166534]">
              1,200+ Farmers Enrolled →
            </div>
          </div>

          {/* PLANET */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-xl text-slate-800">
                  P2
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-none mb-1 text-lg">PLANET</p>
                  <p className="text-xs text-slate-500 font-medium">Sustainable Circularity</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {tone === 'technical'
                  ? 'HDPE plastic waste diversion. Every hive diverts ~25kg of post-consumer plastic from Kenyan landfills and rivers, creating UV-stabilized, non-biodegradable, 15-year weather-resistant assets.'
                  : 'Cleaning our environment by turning plastic waste into tough, weather-proof hives that protect bees, prevent deforestation, and preserve natural pollinator habitats.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#166534]">
              30+ Tons Plastic Diverted →
            </div>
          </div>

          {/* PROFIT */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-xl text-slate-800">
                  P3
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-none mb-1 text-lg">PROFIT</p>
                  <p className="text-xs text-slate-500 font-medium">Economic Growth</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                {tone === 'technical'
                  ? 'High-density yield optimization. Solar IoT telemetry enables predictive harvesting, eliminating colony mortality and maximizing Grade-A honey volume for commercial export.'
                  : 'Creating high-yield, premium honey and propolis that sell at top prices, giving farmers dependable earnings to build a better financial future.'}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-[#166534]">
              3.5x Yield Boost →
            </div>
          </div>
        </div>
      </section>

      {/* TRACTION COUNTERS */}
      <section className="bg-[#166534] text-white py-16 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Measuring Our Impact Across Kenya
            </h2>
            <p className="text-green-200 text-sm mt-2">Real data driven by modern agri-technology</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {TRACTION_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 p-6 rounded-2xl backdrop-blur-xs border border-white/10"
              >
                <div className="text-3xl sm:text-5xl font-black text-[#86EFAC] mb-2 font-mono">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white mb-1">{stat.label}</div>
                <div className="text-xs text-green-200/80">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE INNOVATION SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-[#166534] rounded-[32px] p-8 lg:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#86EFAC] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Hardware & IoT Tech
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white">
                Intelligence by Nature.{' '}
                <span className="text-[#86EFAC]">Sustainable by Design.</span>
              </h2>
              <p className="text-green-100/90 text-sm sm:text-base leading-relaxed">
                Traditional timber beehives rot, warp, and fall victim to termites within 2–3 years, resulting in high colony desertion. EcoHive’s Climate-Smart Langstroth design solves this with UV-stabilized recycled plastic, composite insulation, and integrated solar telemetry.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#86EFAC] text-[#166534] font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">15-Year Life Expectancy</h4>
                    <p className="text-xs text-green-200/80">Zero wood rot, zero termites, weatherproof design.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#86EFAC] text-[#166534] font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">GSM Solar IoT Telemetry</h4>
                    <p className="text-xs text-green-200/80">Monitors weight accumulation, colony thermal stability, and swarming sounds.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#86EFAC] text-[#166534] font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">3.2x Higher Thermal R-Value</h4>
                    <p className="text-xs text-green-200/80">Agricultural composite insulation reduces heat stress during African summers.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setPage('smart-hive')}
                  className="bg-white text-[#166534] hover:bg-green-50 font-bold px-6 py-3 rounded-full text-sm transition-all shadow-md"
                >
                  View 3D Exploded Hive & Hotspots
                </button>
                <button
                  onClick={openWorklog}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-3 rounded-full text-xs border border-white/20 flex items-center gap-2"
                >
                  <FileCode2 className="w-4 h-4 text-[#86EFAC]" />
                  <span>Inspect Blueprint & Worklog</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group">
                <img
                  src={IMAGES.explodedHive}
                  alt="3D Exploded View of Climate-Smart Beehive"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-slate-900/80 text-[#86EFAC] text-xs font-mono font-bold px-3 py-1 rounded-full border border-slate-700">
                  Interactive 3D Render
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE CHAIN PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-[#166534] uppercase tracking-widest bg-green-100 px-4 py-1.5 rounded-full">
            The Value Chain Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            How EcoHive Works
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm">
            Connecting African soil and modern technology to global honey tables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_CHAIN_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative hover:border-[#22C55E] hover:shadow-md transition-all group"
            >
              <div className="text-3xl font-black text-[#166534] font-mono mb-3">
                {step.step}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {tone === 'technical' ? step.titleTechnical : step.titleCommunity}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {tone === 'technical' ? step.descTechnical : step.descCommunity}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CEO FOUNDER PROFILE CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-100 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="relative inline-block">
                <img
                  src={IMAGES.ceoPeterGitau}
                  alt="Peter Gitau CEO EcoHive Kenya Ltd."
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover mx-auto shadow-xl border-4 border-slate-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-3 right-2 bg-[#166534] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  CEO & Founder
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-left">
              <span className="text-xs font-bold text-[#166534] uppercase tracking-wider">
                Leadership Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {COMPANY_INFO.ceo.name}
              </h3>
              <p className="text-xs font-semibold text-[#166534] uppercase tracking-wider">
                {COMPANY_INFO.ceo.title} • EcoHive Kenya Ltd.
              </p>

              <blockquote className="italic text-slate-700 text-base sm:text-lg border-l-4 border-[#22C55E] pl-4 py-1 font-sans">
                {COMPANY_INFO.ceo.quote}
              </blockquote>

              <p className="text-slate-600 text-sm leading-relaxed">
                {COMPANY_INFO.ceo.bio}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setPage('about-contact')}
                  className="bg-[#166534] hover:bg-[#14532D] text-white font-semibold px-6 py-2.5 rounded-full text-sm shadow-md transition-all"
                >
                  Contact CEO Office (Gitau@ecohivekenya.com)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
