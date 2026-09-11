import React, { useState } from 'react';
import {
  MapPin,
  Thermometer,
  Trees,
  Users,
  ShieldCheck,
  Radio,
  ArrowRight,
  TrendingUp,
  Droplet,
  Layers
} from 'lucide-react';

export interface ApiaryRegion {
  id: string;
  name: string;
  county: string;
  regionType: string;
  coordinates: { x: number; y: number }; // SVG % coordinates (Kenya bounding box)
  hives: number;
  farmers: number;
  womenYouthPct: number;
  avgBroodTemp: number;
  floraType: string;
  honeyYieldKgPerYear: number;
  status: 'Peak Harvest' | 'Active Brood' | 'Nectar Flow' | 'R&D Calibration';
  statusColor: string;
  lead: string;
  highlights: string[];
  description: string;
}

export const APIARY_REGIONS: ApiaryRegion[] = [
  {
    id: 'baringo',
    name: 'Baringo Rift Apiary Sanctuary',
    county: 'Baringo County (Marigat & Lake Baringo)',
    regionType: 'Semi-Arid Acacia Savanna',
    coordinates: { x: 42, y: 44 },
    hives: 180,
    farmers: 290,
    womenYouthPct: 68,
    avgBroodTemp: 35.1,
    floraType: 'Desert Acacia (Acacia tortilis & senegal)',
    honeyYieldKgPerYear: 3960,
    status: 'Nectar Flow',
    statusColor: 'bg-emerald-500',
    lead: 'Kiprotich Chemwetich',
    highlights: [
      'High bioactivity medicinal propolis',
      'Ultra-low moisture acacia honey (<16.5%)',
      'Termite-proof recycled plastic hive testing grounds'
    ],
    description:
      'Nestled in the arid floor of the Great Rift Valley, Baringo bees forage on drought-resilient acacia blooms. The extreme dry heat proves the thermal superiority of our recycled plastic insulation.'
  },
  {
    id: 'nakuru',
    name: 'Nakuru Valley Highlands Hub',
    county: 'Nakuru County (Rongai & Subukia)',
    regionType: 'Fertile Agricultural Basin',
    coordinates: { x: 38, y: 55 },
    hives: 240,
    farmers: 360,
    womenYouthPct: 64,
    avgBroodTemp: 34.6,
    floraType: 'Eucalyptus, Farm Poly-culture & Clover',
    honeyYieldKgPerYear: 5280,
    status: 'Peak Harvest',
    statusColor: 'bg-amber-500',
    lead: 'Mary Wanjiku Gitau',
    highlights: [
      'Flagship community training center',
      'Continuous GSM telemetry brood curve recording',
      'Direct farm-to-jar cold extraction pipeline'
    ],
    description:
      'Our primary field demonstration cluster. Smallholder farmer families here report a 3.4x income increase using IoT acoustic swarming sensors to prevent colony loss.'
  },
  {
    id: 'kitui',
    name: 'Kitui Dryland Honey Sanctuary',
    county: 'Kitui County (Kitui South & Mwingi)',
    regionType: 'Arid & Semi-Arid Pastoral Lands',
    coordinates: { x: 62, y: 64 },
    hives: 210,
    farmers: 310,
    womenYouthPct: 74,
    avgBroodTemp: 35.2,
    floraType: 'Dryland Wildflower, Baobab & Myrrh',
    honeyYieldKgPerYear: 4620,
    status: 'Nectar Flow',
    statusColor: 'bg-emerald-500',
    lead: 'Emanuel Mutua Musyoka',
    highlights: [
      'High women-led cooperative membership (74%)',
      'Certified organic single-origin raw honey',
      'Solar trickle-charging telemetry nodes'
    ],
    description:
      'In Kitui, honey beekeeping provides a reliable climate-proof income cushion during failed crop seasons. Traditional wooden hives suffered severe termite damage—EcoHive solved this with 100% HDPE plastic.'
  },
  {
    id: 'laikipia',
    name: 'Mount Kenya Foothills Cluster',
    county: 'Laikipia County (Nanyuki & Dol Dol)',
    regionType: 'Sub-Alpine & Pastoral Transition Zone',
    coordinates: { x: 50, y: 48 },
    hives: 190,
    farmers: 270,
    womenYouthPct: 61,
    avgBroodTemp: 34.1,
    floraType: 'Highland Cedar, Wild Thyme & Heather',
    honeyYieldKgPerYear: 4180,
    status: 'Active Brood',
    statusColor: 'bg-blue-500',
    lead: 'Grace Muthoni',
    highlights: [
      'Bio-diversity conservation corridor',
      'Cold-night insulation stability (3.2x vs wood)',
      'Community wildlife-conflict reduction program'
    ],
    description:
      'High altitudes mean cold mountain nights. EcoHive’s recycled plastic composite walls maintain steady 34-36°C internal brood temperature, cutting queen mortality to near zero.'
  },
  {
    id: 'nairobi',
    name: 'Nairobi IoT Tech & Calibration Hub',
    county: 'Nairobi County (Industrial Area & Karura)',
    regionType: 'Innovation Lab & Urban Apiary',
    coordinates: { x: 48, y: 68 },
    hives: 60,
    farmers: 90,
    womenYouthPct: 58,
    avgBroodTemp: 34.8,
    floraType: 'Indigenous Urban Canopy & Botanic Flora',
    honeyYieldKgPerYear: 1320,
    status: 'R&D Calibration',
    statusColor: 'bg-purple-500',
    lead: 'Eric Munyi (CEO)',
    highlights: [
      'Hardware stress-testing laboratory',
      'Firmware OTA (Over-the-Air) telemetry lab',
      'University student apprenticeship station'
    ],
    description:
      'Where EcoHive’s electronic smart-boards and acoustic queen monitoring algorithms are programmed, calibrated, and stress-tested before deployment to rural farmer clusters.'
  },
  {
    id: 'eldoret',
    name: 'Eldoret Rift Highland Apiary',
    county: 'Uasin Gishu (Moiben & Soy)',
    regionType: 'High-Altitude Grain & Sunflower Belt',
    coordinates: { x: 30, y: 46 },
    hives: 220,
    farmers: 340,
    womenYouthPct: 65,
    avgBroodTemp: 34.4,
    floraType: 'Organic Sunflower, Canola & Acacia',
    honeyYieldKgPerYear: 4840,
    status: 'Active Brood',
    statusColor: 'bg-blue-500',
    lead: 'Joseph Kiptoo',
    highlights: [
      'Massive pollination crop yield boosts',
      'Integrated fair off-take warehouse',
      'High-volume wax extraction facility'
    ],
    description:
      'Bees in Eldoret boost adjacent sunflower and legume seed yields by 38% through optimal pollination, showcasing the dual economic power of smart apiculture.'
  }
];

interface Props {
  onSelectCluster?: (region: ApiaryRegion) => void;
}

export const ApiaryRegionalMap: React.FC<Props> = ({ onSelectCluster }) => {
  const [selectedId, setSelectedId] = useState<string>('baringo');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedRegion =
    APIARY_REGIONS.find((r) => r.id === selectedId) || APIARY_REGIONS[0];

  const totalHives = APIARY_REGIONS.reduce((sum, r) => sum + r.hives, 0);
  const totalFarmers = APIARY_REGIONS.reduce((sum, r) => sum + r.farmers, 0);
  const totalHoneyTons = (
    APIARY_REGIONS.reduce((sum, r) => sum + r.honeyYieldKgPerYear, 0) / 1000
  ).toFixed(1);

  return (
    <section className="bg-white rounded-3xl border-2 border-amber-400/30 p-6 sm:p-10 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-200/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest bg-amber-500/15 text-amber-950 px-3 py-1 rounded-full border border-amber-400/40 shadow-2xs">
              <Radio className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              Live Apiary Network
            </span>
            <span className="text-xs text-stone-500 font-mono">Kenya National Coverage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            Interactive Regional Apiary Clusters
          </h2>
          <p className="text-stone-600 text-sm max-w-xl font-body mt-1">
            Explore IoT-connected beehive nodes across Baringo, Nakuru, Kitui, and Kenya’s key agricultural microclimates.
          </p>
        </div>

        {/* Global Network Counters */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 bg-stone-950 text-white px-4 py-2.5 rounded-2xl border border-amber-400/30 shadow-md">
          <div className="text-center">
            <div className="text-xs text-amber-300 font-bold uppercase tracking-wider text-[10px]">Hives</div>
            <div className="text-base sm:text-lg font-black font-mono text-amber-400">{totalHives}</div>
          </div>
          <div className="w-px h-7 bg-stone-800" />
          <div className="text-center">
            <div className="text-xs text-amber-300 font-bold uppercase tracking-wider text-[10px]">Beekeepers</div>
            <div className="text-base sm:text-lg font-black font-mono text-white">{totalFarmers}</div>
          </div>
          <div className="w-px h-7 bg-stone-800" />
          <div className="text-center">
            <div className="text-xs text-amber-300 font-bold uppercase tracking-wider text-[10px]">Annual Honey</div>
            <div className="text-base sm:text-lg font-black font-mono text-emerald-400">{totalHoneyTons} T</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Interactive Map & Cluster Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Kenya SVG Map Stage */}
        <div className="lg:col-span-6 bg-radial from-amber-50/70 via-stone-100/50 to-amber-100/30 p-4 sm:p-6 rounded-3xl border border-amber-300/40 relative shadow-inner flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-stone-600 font-medium mb-3">
            <span className="flex items-center gap-1.5 font-bold text-stone-700">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              Tap a regional node to inspect:
            </span>
            <span className="text-[11px] font-mono text-stone-500">Equator 0.02° S, 37.9° E</span>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-square max-w-[440px] select-none">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-lg"
              aria-label="Kenya Regional Apiary Map"
            >
              <defs>
                {/* Regional gradient */}
                <linearGradient id="kenyaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#fde68a" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="0.6" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Simplified Geometric Silhouette of Kenya Boundary */}
              <polygon
                points="
                  35,12 55,10 75,18 88,38 90,56 82,75 70,88 56,92 45,86 32,84 22,78 18,65 15,50 18,34 26,20
                "
                fill="url(#kenyaGrad)"
                stroke="#d97706"
                strokeWidth="1.2"
                strokeLinejoin="round"
                className="transition-colors duration-300"
              />

              {/* Lake Victoria Indicative Notch */}
              <path
                d="M 18,65 Q 24,68 22,78 Q 16,74 18,65 Z"
                fill="#93c5fd"
                stroke="#3b82f6"
                strokeWidth="0.6"
                opacity="0.8"
              />

              {/* Lake Turkana Notch */}
              <path
                d="M 33,18 Q 36,28 35,38 Q 32,32 33,18 Z"
                fill="#93c5fd"
                stroke="#3b82f6"
                strokeWidth="0.6"
                opacity="0.8"
              />

              {/* Kenya Regional Micro-Divider Accents */}
              <path
                d="M 35,40 Q 50,45 65,42"
                stroke="#f59e0b"
                strokeWidth="0.5"
                strokeDasharray="1 2"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M 40,55 Q 52,60 70,70"
                stroke="#f59e0b"
                strokeWidth="0.5"
                strokeDasharray="1 2"
                fill="none"
                opacity="0.6"
              />

              {/* Equator Line */}
              <line
                x1="16"
                y1="50"
                x2="88"
                y2="50"
                stroke="#b45309"
                strokeWidth="0.4"
                strokeDasharray="2 2"
                opacity="0.5"
              />
              <text x="80" y="48.5" fontSize="2.5" fill="#92400e" fontFamily="monospace">
                EQUATOR 0°
              </text>

              {/* Connecting Telemetry Data Mesh Lines */}
              <path
                d="M 38,55 L 42,44 L 50,48 L 48,68 L 62,64 L 50,48 L 30,46"
                stroke="#d97706"
                strokeWidth="0.6"
                strokeDasharray="1.5 1.5"
                fill="none"
                opacity="0.55"
              />

              {/* Regional Node Pins */}
              {APIARY_REGIONS.map((region) => {
                const isSelected = selectedId === region.id;
                const isHovered = hoveredId === region.id;

                return (
                  <g
                    key={region.id}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => {
                      setSelectedId(region.id);
                      if (onSelectCluster) onSelectCluster(region);
                    }}
                    onMouseEnter={() => setHoveredId(region.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${region.name} in ${region.county}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedId(region.id);
                        if (onSelectCluster) onSelectCluster(region);
                      }
                    }}
                  >
                    {/* Pulsing Ripple Effect on Active Selection */}
                    {isSelected && (
                      <circle
                        cx={region.coordinates.x}
                        cy={region.coordinates.y}
                        r="6"
                        fill="#f59e0b"
                        opacity="0.3"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Circle */}
                    <circle
                      cx={region.coordinates.x}
                      cy={region.coordinates.y}
                      r={isSelected ? 4 : isHovered ? 3.5 : 2.8}
                      fill={isSelected ? '#78350f' : '#ffffff'}
                      stroke={isSelected ? '#d97706' : '#92400e'}
                      strokeWidth={isSelected ? '1.2' : '0.8'}
                      filter={isSelected ? 'url(#glow)' : undefined}
                      className="transition-all duration-200"
                    />

                    {/* Center Dot */}
                    <circle
                      cx={region.coordinates.x}
                      cy={region.coordinates.y}
                      r={isSelected ? 1.8 : 1.2}
                      fill={
                        region.status === 'Peak Harvest'
                          ? '#eab308'
                          : region.status === 'Nectar Flow'
                          ? '#10b981'
                          : '#f97316'
                      }
                    />

                    {/* Node Text Label */}
                    <text
                      x={region.coordinates.x}
                      y={region.coordinates.y - (isSelected ? 5 : 4)}
                      textAnchor="middle"
                      fontSize={isSelected ? '2.8' : '2.3'}
                      fontWeight={isSelected ? '900' : '700'}
                      fill={isSelected ? '#451a03' : '#78350f'}
                      fontFamily="system-ui, sans-serif"
                    >
                      {region.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Region Legend Bar */}
          <div className="w-full mt-3 pt-3 border-t border-amber-300/40 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-600">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Nectar Flow
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                Peak Harvest
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                Active Brood
              </span>
            </div>
            <span className="text-[10px] text-stone-500 italic">
              Encrypted LoRaWAN / GSM telemetry relays
            </span>
          </div>
        </div>

        {/* Right Column: Selected Region Detail Dossier */}
        <div className="lg:col-span-6 space-y-5">
          {/* Active Region Header Pill */}
          <div className="bg-stone-950 text-white p-6 rounded-3xl border border-amber-400/40 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${selectedRegion.statusColor} animate-pulse`}
                  />
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
                    {selectedRegion.status}
                  </span>
                  <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded-full font-mono">
                    {selectedRegion.regionType}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-1">
                  {selectedRegion.name}
                </h3>
                <p className="text-amber-200/90 text-xs flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  {selectedRegion.county}
                </p>
              </div>

              {/* Quick Badge */}
              <div className="text-right shrink-0">
                <span className="text-2xl font-black font-mono text-amber-400">
                  {selectedRegion.hives}
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold">
                  Smart Hives
                </span>
              </div>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-body border-t border-stone-800 pt-3">
              {selectedRegion.description}
            </p>

            {/* Core Regional Telemetry Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-stone-900/90 p-3 rounded-2xl border border-stone-800">
                <div className="flex items-center gap-1 text-[10px] text-stone-400 font-semibold mb-1">
                  <Thermometer className="w-3 h-3 text-amber-400" />
                  Brood Temp
                </div>
                <div className="text-base font-black font-mono text-amber-300">
                  {selectedRegion.avgBroodTemp}°C
                </div>
                <div className="text-[9px] text-stone-500 font-mono">Ideal: 34.0–36.0°C</div>
              </div>

              <div className="bg-stone-900/90 p-3 rounded-2xl border border-stone-800">
                <div className="flex items-center gap-1 text-[10px] text-stone-400 font-semibold mb-1">
                  <Users className="w-3 h-3 text-amber-400" />
                  Beekeepers
                </div>
                <div className="text-base font-black font-mono text-white">
                  {selectedRegion.farmers}
                </div>
                <div className="text-[9px] text-emerald-400 font-bold">
                  {selectedRegion.womenYouthPct}% Women/Youth
                </div>
              </div>

              <div className="bg-stone-900/90 p-3 rounded-2xl border border-stone-800">
                <div className="flex items-center gap-1 text-[10px] text-stone-400 font-semibold mb-1">
                  <Droplet className="w-3 h-3 text-amber-400" />
                  Annual Yield
                </div>
                <div className="text-base font-black font-mono text-amber-400">
                  {(selectedRegion.honeyYieldKgPerYear / 1000).toFixed(1)} T
                </div>
                <div className="text-[9px] text-stone-400 font-mono">Raw Honey</div>
              </div>

              <div className="bg-stone-900/90 p-3 rounded-2xl border border-stone-800">
                <div className="flex items-center gap-1 text-[10px] text-stone-400 font-semibold mb-1">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  Cluster Lead
                </div>
                <div className="text-xs font-bold text-stone-200 truncate" title={selectedRegion.lead}>
                  {selectedRegion.lead.split(' ')[0]}
                </div>
                <div className="text-[9px] text-stone-400">Field Trained</div>
              </div>
            </div>
          </div>

          {/* Flora & Ecological Profile */}
          <div className="bg-amber-400/10 p-5 rounded-3xl border border-amber-400/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                <Trees className="w-4 h-4 text-amber-700" />
                Flora & Honey Tasting Profile:
              </span>
              <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-400/25 px-2 py-0.5 rounded-md">
                100% Traceable
              </span>
            </div>
            <p className="text-xs font-semibold text-stone-800">
              {selectedRegion.floraType}
            </p>

            <div className="pt-2 border-t border-amber-400/20 space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider font-black text-amber-950 block">
                Cluster Field Highlights:
              </span>
              <ul className="space-y-1 text-xs text-stone-700">
                {selectedRegion.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cluster Selection Switcher Buttons */}
          <div>
            <span className="text-xs font-bold text-stone-600 block mb-2">
              Switch Cluster View:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {APIARY_REGIONS.map((r) => {
                const isActive = r.id === selectedId;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedId(r.id);
                      if (onSelectCluster) onSelectCluster(r);
                    }}
                    className={`px-2 py-1.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-sm border border-amber-600'
                        : 'bg-stone-100 hover:bg-amber-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {r.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
