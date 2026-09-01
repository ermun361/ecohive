import React from 'react';
import { motion } from 'motion/react';
import { PageType } from '../types';
import { COMPANY_INFO, TRACTION_STATS, VALUE_CHAIN_STEPS } from '../data/ecohiveData';
import { IMAGES } from '../data/images';
import {
  ArrowRight,
  ChevronRight,
  Activity,
} from 'lucide-react';

interface Props {
  setPage: (page: PageType) => void;
  openTelemetry: () => void;
}

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const HomeView: React.FC<Props> = ({ setPage, openTelemetry }) => {
  return (
    <div className="space-y-16 pb-12 overflow-x-hidden">
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative bg-gradient-to-b from-amber-400/15 via-[#FFFDF7] to-[#FDFBF7] text-stone-900 overflow-hidden py-14 lg:py-24 border-b border-amber-400/20"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.25, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={containerStagger}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6 text-left"
            >
              <motion.div variants={cardItemVariants} className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-yellow-500/20 text-amber-950 border border-amber-400/50 px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-2xs">
                <span>🍯</span>
                <span>Pure Honey Innovation • Kenya</span>
              </motion.div>

              <motion.h1
                variants={cardItemVariants}
                className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] text-stone-950 font-display"
              >
                Building Africa’s First <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">Honey Gold</span> & Smart Value Chain
              </motion.h1>

              <motion.p
                variants={cardItemVariants}
                className="text-stone-700 text-base sm:text-lg max-w-xl leading-relaxed font-body"
              >
                EcoHive Kenya Ltd. integrates recycled HDPE composite beehives, GSM solar telemetry sensors (temperature, weight, acoustics), and sustainable community empowerment to scale premium high-yield honey export.
              </motion.p>

              {/* Stat Cards */}
              <motion.div variants={cardItemVariants} className="flex flex-wrap gap-4 pt-2">
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl shadow-sm border border-amber-400/30 flex items-center gap-4 w-60 hover:border-yellow-500/60 transition-colors"
                >
                  <div className="w-12 h-12 bg-amber-400/20 border border-amber-400/40 rounded-xl flex items-center justify-center text-2xl shadow-2xs">📈</div>
                  <div>
                    <div className="text-2xl font-black text-stone-900 font-display">1,200+</div>
                    <div className="text-xs text-amber-900 uppercase font-black tracking-wider">Farmers Empowered</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl shadow-sm border border-amber-400/30 flex items-center gap-4 w-60 hover:border-yellow-500/60 transition-colors"
                >
                  <div className="w-12 h-12 bg-amber-400/20 border border-amber-400/40 rounded-xl flex items-center justify-center text-2xl shadow-2xs">🍯</div>
                  <div>
                    <div className="text-2xl font-black text-stone-900 font-display">15 Tons</div>
                    <div className="text-xs text-amber-900 uppercase font-black tracking-wider">Honey Produced</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={cardItemVariants} className="pt-4 flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPage('smart-hive')}
                  className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black px-7 py-3.5 rounded-full shadow-lg shadow-amber-400/25 border border-amber-400/40 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <span>Explore Climate-Smart Hive</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPage('about-contact')}
                  className="bg-white hover:bg-amber-400/10 text-stone-900 px-6 py-3.5 rounded-full font-black border border-amber-400/40 shadow-xs hover:border-yellow-500 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <span>Get a Hive</span>
                  <ChevronRight className="w-5 h-5 text-amber-600" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openTelemetry}
                  className="bg-amber-400/10 hover:bg-amber-400/20 text-amber-950 px-5 py-3.5 rounded-full font-black border border-amber-400/40 hover:border-yellow-500 transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>Live Telemetry</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Hero Visual (Smart Monitoring Display Widget in Honey Gold Theme) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <div className="w-full max-w-sm bg-white rounded-[32px] shadow-2xl border-2 border-amber-400/40 overflow-hidden relative z-10 ring-4 ring-amber-400/20">
                <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-stone-950 p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-amber-200 text-xs font-black uppercase tracking-widest">Active Solar Device</p>
                      <h3 className="text-xl font-black font-display text-white">Hive Node #082-K</h3>
                    </div>
                    <div className="bg-amber-400/30 text-amber-100 border border-amber-300/50 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider">
                      LIVE NECTAR FLOW
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/15">
                      <p className="text-[10px] uppercase font-bold text-amber-200 opacity-90">Internal Temp</p>
                      <p className="text-2xl font-black text-white font-mono">34.2°C</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/15">
                      <p className="text-[10px] uppercase font-bold text-amber-200 opacity-90">Hive Weight</p>
                      <p className="text-2xl font-black text-amber-300 font-mono">28.4kg</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4 bg-white">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-600 font-medium italic">"Thermal stability optimal for honey comb"</span>
                    <span className="text-amber-900 font-black uppercase text-[10px] bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-400/30">
                      Sync OK
                    </span>
                  </div>
                  <div className="h-32 bg-amber-400/5 rounded-2xl border border-amber-400/20 flex items-end p-4 gap-1.5">
                    <motion.div initial={{ height: 0 }} animate={{ height: '40%' }} transition={{ duration: 0.8, delay: 0.2 }} className="flex-1 bg-amber-200 rounded-t-sm" />
                    <motion.div initial={{ height: 0 }} animate={{ height: '65%' }} transition={{ duration: 0.8, delay: 0.3 }} className="flex-1 bg-amber-300 rounded-t-sm" />
                    <motion.div initial={{ height: 0 }} animate={{ height: '55%' }} transition={{ duration: 0.8, delay: 0.4 }} className="flex-1 bg-amber-400 rounded-t-sm" />
                    <motion.div initial={{ height: 0 }} animate={{ height: '90%' }} transition={{ duration: 0.8, delay: 0.5 }} className="flex-1 bg-yellow-500 rounded-t-sm" />
                    <motion.div initial={{ height: 0 }} animate={{ height: '75%' }} transition={{ duration: 0.8, delay: 0.6 }} className="flex-1 bg-amber-500 rounded-t-sm" />
                    <motion.div initial={{ height: 0 }} animate={{ height: '45%' }} transition={{ duration: 0.8, delay: 0.7 }} className="flex-1 bg-amber-300 rounded-t-sm" />
                    <motion.div initial={{ height: 0 }} animate={{ height: '30%' }} transition={{ duration: 0.8, delay: 0.8 }} className="flex-1 bg-amber-200 rounded-t-sm" />
                  </div>
                  <button
                    onClick={openTelemetry}
                    className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-yellow-400 rounded-xl font-extrabold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border border-amber-400/30 hover:border-yellow-500 cursor-pointer"
                  >
                    <Activity className="w-4 h-4 text-amber-400" />
                    <span>Export Daily Honey Telemetry</span>
                  </button>
                </div>
              </div>

              {/* Floating 3D Detail Label */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute top-1/4 -right-2 hidden sm:block bg-white/95 backdrop-blur-md border border-amber-400/40 p-4 rounded-2xl shadow-xl w-48 z-20"
              >
                <p className="text-[10px] font-black text-amber-800 uppercase tracking-wider">Eco-Material</p>
                <p className="text-xs font-bold text-stone-800">100% Recycled HDPE Circular Design</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* TRIPLE BOTTOM LINE PILLARS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={sectionHeaderVariants} className="text-center space-y-3 mb-10">
          <span className="text-xs font-black text-amber-950 uppercase tracking-widest bg-amber-400/15 px-4 py-1.5 rounded-full border border-amber-400/40 shadow-2xs">
            Our Core Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
            People | Planet | Profit
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base font-body">
            Sustainable impact is engineered directly into our honey value chain business model.
          </p>
        </motion.div>

        <motion.div variants={containerStagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PEOPLE */}
          <motion.div
            variants={cardItemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-white p-8 rounded-3xl border border-amber-400/25 shadow-sm hover:shadow-md hover:border-yellow-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-400/20 text-amber-950 rounded-2xl flex items-center justify-center font-black text-lg border border-amber-400/40 shadow-2xs">
                  P1
                </div>
                <div>
                  <p className="font-black text-stone-900 leading-none mb-1 text-lg font-display">PEOPLE</p>
                  <p className="text-xs text-amber-800 font-bold">Community Empowerment</p>
                </div>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                Direct market access and sustainable livelihood. We provide rural beekeepers with standardized smart hives, agricultural training, and guaranteed off-take contracts to elevate household income.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-amber-400/20 text-xs font-black text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>1,200+ Farmers Enrolled</span>
              <span>→</span>
            </div>
          </motion.div>

          {/* PLANET */}
          <motion.div
            variants={cardItemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-white p-8 rounded-3xl border border-amber-400/25 shadow-sm hover:shadow-md hover:border-yellow-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-400/20 text-amber-950 rounded-2xl flex items-center justify-center font-black text-lg border border-amber-400/40 shadow-2xs">
                  P2
                </div>
                <div>
                  <p className="font-black text-stone-900 leading-none mb-1 text-lg font-display">PLANET</p>
                  <p className="text-xs text-amber-800 font-bold">Sustainable Circularity</p>
                </div>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                HDPE plastic waste diversion. Every hive diverts ~25kg of post-consumer plastic from Kenyan landfills and rivers, creating UV-stabilized, non-biodegradable, 15-year weather-resistant assets.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-amber-400/20 text-xs font-black text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>30+ Tons Plastic Diverted</span>
              <span>→</span>
            </div>
          </motion.div>

          {/* PROFIT */}
          <motion.div
            variants={cardItemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-white p-8 rounded-3xl border border-amber-400/25 shadow-sm hover:shadow-md hover:border-yellow-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-400/20 text-amber-950 rounded-2xl flex items-center justify-center font-black text-lg border border-amber-400/40 shadow-2xs">
                  P3
                </div>
                <div>
                  <p className="font-black text-stone-900 leading-none mb-1 text-lg font-display">PROFIT</p>
                  <p className="text-xs text-amber-800 font-bold">Economic Growth</p>
                </div>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                High-density yield optimization. Solar IoT telemetry enables predictive harvesting, eliminating colony mortality and maximizing Grade-A honey volume for commercial export.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-amber-400/20 text-xs font-black text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>3.5x Yield Boost</span>
              <span>→</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* TRACTION COUNTERS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="bg-gradient-to-r from-amber-500 via-yellow-500 to-stone-950 text-white py-16 shadow-lg relative overflow-hidden border-y border-amber-400/30"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={sectionHeaderVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Measuring Our Honey Impact Across Kenya
            </h2>
            <p className="text-amber-100 text-sm mt-2 font-medium">Real metrics driven by solar agri-technology & community trust</p>
          </motion.div>

          <motion.div variants={containerStagger} className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {TRACTION_STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={cardItemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/10 p-6 rounded-3xl backdrop-blur-xs border border-white/20 hover:border-amber-400/80 transition-all shadow-sm"
              >
                <div className="text-3xl sm:text-5xl font-black text-amber-300 mb-2 font-mono">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white mb-1">{stat.label}</div>
                <div className="text-xs text-amber-100/90">{stat.detail}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* THE INNOVATION SPOTLIGHT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
      >
        <div className="bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 rounded-[32px] p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden border border-amber-400/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -28 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="text-xs font-black text-amber-300 uppercase tracking-widest bg-amber-400/20 px-3.5 py-1.5 rounded-full border border-amber-400/40 inline-block shadow-2xs">
                Hardware & IoT Tech
              </span>
              <h2 className="text-3xl sm:text-5xl font-black leading-tight text-white font-display">
                Intelligence by Nature.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-300">Sustainable by Design.</span>
              </h2>
              <p className="text-amber-100/85 text-sm sm:text-base leading-relaxed font-body">
                Traditional timber beehives rot, warp, and fall victim to termites within 2–3 years, resulting in high colony desertion. EcoHive’s Climate-Smart Langstroth design solves this with UV-stabilized recycled plastic, composite insulation, and integrated solar telemetry.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 mt-0.5 text-xs shadow-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white">15-Year Life Expectancy</h4>
                    <p className="text-xs text-amber-200/80">Zero wood rot, zero termites, weatherproof HDPE design.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 mt-0.5 text-xs shadow-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white">GSM Solar IoT Telemetry</h4>
                    <p className="text-xs text-amber-200/80">Monitors weight accumulation, colony thermal stability, and swarming acoustics.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 mt-0.5 text-xs shadow-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white">3.2x Higher Thermal R-Value</h4>
                    <p className="text-xs text-amber-200/80">Agricultural composite insulation reduces heat stress during arid African seasons.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPage('smart-hive')}
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black px-6 py-3.5 rounded-full text-sm transition-all shadow-md shadow-amber-400/20 border border-amber-400/40 cursor-pointer"
                >
                  View 3D Exploded Hive & Hotspots
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 28 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl group">
                <img
                  src={IMAGES.explodedHive}
                  alt="3D Exploded View of Climate-Smart Beehive"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-3 right-3 bg-slate-950/85 text-amber-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-amber-400/40">
                  Interactive 3D Render
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* VALUE CHAIN PROCESS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={sectionHeaderVariants} className="text-center space-y-3 mb-12">
          <span className="text-xs font-black text-amber-950 uppercase tracking-widest bg-amber-400/15 px-4 py-1.5 rounded-full border border-amber-400/40 shadow-2xs">
            The Value Chain Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 font-display">
            How EcoHive Works
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto text-sm">
            Connecting African flora, rural beekeepers, and smart technology to global honey markets.
          </p>
        </motion.div>

        <motion.div variants={containerStagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_CHAIN_STEPS.map((step) => (
            <motion.div
              key={step.step}
              variants={cardItemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-3xl border border-amber-400/25 shadow-sm relative hover:border-yellow-500 hover:shadow-md transition-all group"
            >
              <div className="text-3xl font-black text-amber-600 font-mono mb-3">
                {step.step}
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2 font-display">
                {step.titleTechnical}
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                {step.descTechnical}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CEO FOUNDER PROFILE CARD */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={cardItemVariants}
          className="bg-white rounded-3xl p-8 lg:p-12 border-2 border-amber-400/30 shadow-md hover:border-amber-400/50 transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.55 } },
              }}
              className="lg:col-span-4 text-center lg:text-left"
            >
              <div className="relative inline-block">
                <img
                  src={IMAGES.ceoPeterGitau}
                  alt="Peter Gitau CEO EcoHive Kenya Ltd."
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover mx-auto shadow-xl border-4 border-amber-400/50"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute -bottom-3 right-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[11px] font-black px-3.5 py-1 rounded-full shadow-md border border-amber-400">
                  CEO & Founder
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.55, delay: 0.1 } },
              }}
              className="lg:col-span-8 space-y-4 text-left"
            >
              <span className="text-xs font-black text-amber-950 uppercase tracking-wider bg-amber-400/15 px-3 py-1 rounded-full border border-amber-400/40 shadow-2xs">
                Leadership Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
                {COMPANY_INFO.ceo.name}
              </h3>
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                {COMPANY_INFO.ceo.title} • EcoHive Kenya Ltd.
              </p>

              <blockquote className="italic text-stone-700 text-base sm:text-lg border-l-4 border-amber-400 pl-4 py-1 font-editorial font-medium">
                "{COMPANY_INFO.ceo.quote}"
              </blockquote>

              <p className="text-stone-600 text-sm leading-relaxed font-body">
                {COMPANY_INFO.ceo.bio}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPage('about-contact')}
                  className="bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-yellow-400 font-black px-6 py-3 rounded-full text-sm shadow-md transition-all flex items-center gap-2 border border-amber-400/30 hover:border-yellow-500 cursor-pointer"
                >
                  <span>Contact CEO Office (Gitau@ecohivekenya.com)</span>
                  <span>→</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};
