import { IoTTelemetry, ExplodedHotspot, ProductItem, WorklogTask } from '../types';

// Export generated image assets paths
export const ASSETS = {
  heroBg: '/src/assets/images/ecohive_hero_bg_1785682566593.jpg',
  peterGitau: '/src/assets/images/peter_gitau_portrait_1785682580605.jpg',
  explodedHive: '/src/assets/images/exploded_smart_hive_1785682591275.jpg',
  products: '/src/assets/images/ecohive_products_1785682601224.jpg',
  beekeeperImpact: '/src/assets/images/kenyan_beekeeper_impact_1785682615966.jpg',
};

export const DEFAULT_IOT_DATA: IoTTelemetry = {
  hiveId: 'EH-NBO-042',
  temperature: 34.2,
  weight: 28.4,
  humidity: 58,
  batteryLevel: 96,
  acousticFrequency: 220,
  swarmRisk: 'Low',
  lastUpdated: 'Just now (Live Telemetry)',
  isOnline: true,
};

export const EXPLODED_HOTSPOTS: ExplodedHotspot[] = [
  {
    id: 'lid',
    name: 'Weather-Resistant Recycled HDPE Lid',
    shortDesc: 'UV-stabilized, high-density polyethylene top cover.',
    techSpec: 'Manufactured from 100% recycled HDPE with thermal R-value 3.8. Resist 50°C heat and intense UV without degradation.',
    communityBenefit: 'A tough, waterproof cover that lasts over 15 years with zero maintenance. No rotting wood or leaking roofs.',
    xPercent: 50,
    yPercent: 18,
  },
  {
    id: 'iot-sensor',
    name: 'Integrated IoT Smart Sensor Hub',
    shortDesc: 'Solar-assisted wireless telemetry module with cellular & LoRa connectivity.',
    techSpec: 'Precision internal thermal probe (±0.1°C accuracy), load cell weight sensor up to 100kg, acoustic mic, GSM/LoRaWAN transmitter.',
    communityBenefit: 'Sends instant alert messages straight to your phone so you know exactly when your honey is ready or if your bees need water.',
    xPercent: 50,
    yPercent: 35,
  },
  {
    id: 'super-boxes',
    name: 'Modular Honey Super Chambers',
    shortDesc: 'Interlocking food-grade frames for maximum honey yield.',
    techSpec: 'Standard Langstroth dimension, precision-molded frame runners with anti-propolis binding joints to simplify frame inspection.',
    communityBenefit: 'Harvest honey quickly without hurting bees. Clean, hygienic frames that yield pure export-quality honey.',
    xPercent: 50,
    yPercent: 52,
  },
  {
    id: 'brood-box',
    name: 'Insulated Brood Chamber',
    shortDesc: 'Agricultural fiber composite walls for optimal colony thermal balance.',
    techSpec: 'Composite blend of recycled plastic and agricultural byproduct fibers. Micro-cellular air pockets reduce thermal variance.',
    communityBenefit: 'Bees stay cool in the hot sun and warm at night, saving energy so they build bigger colonies and produce more honey.',
    xPercent: 50,
    yPercent: 70,
  },
  {
    id: 'bottom-board',
    name: 'Aero-Ventilated Pest Entrance & Base',
    shortDesc: 'Screened bottom board with integrated pest trap and landing porch.',
    techSpec: 'Stainless steel mesh screen for Varroa mite dropping, anti-hive-beetle oil moat, landing ramp tuned for bee navigation.',
    communityBenefit: 'Keeps out dangerous pests, ants, and hive beetles naturally without using harmful chemicals or insecticides.',
    xPercent: 50,
    yPercent: 88,
  },
];

export const PRODUCTS_LIST: ProductItem[] = [
  {
    id: 'smart-beehive-kit',
    name: 'Climate-Smart Langstroth Beehive Kit',
    category: 'Hardware',
    shortDesc: 'Full IoT-enabled beehive manufactured from 100% recycled plastic with smart sensors.',
    fullDesc: 'The flagship EcoHive Langstroth system engineered specifically for East African climatic conditions. Comes pre-fitted with solar IoT temperature, weight, and humidity telemetry sensors.',
    priceEstimate: 'KES 18,500 / $140 per kit',
    keyFeatures: [
      '100% Recycled HDPE & Agricultural Fiber Composition',
      'Integrated Solar GSM/LoRa Telemetry Sensor Hub',
      '15+ Years All-Weather Durability with Zero Rot',
      'Pre-assembled Brood & Honey Super Boxes',
      'Mobile App Access & SMS Harvesting Alerts',
    ],
    imageUrl: ASSETS.explodedHive,
    techDetail: 'R-value 3.8 insulation, IP67 sensor housing, 2G/4G/LoRa connectivity, 100kg max weight load cell, 15-year lifecycle.',
    communityDetail: 'Designed for quick installation in any rural apiary. Increases annual honey production by up to 45% compared to log hives.',
  },
  {
    id: 'ecohive-raw-honey',
    name: 'EcoHive Pure Raw Multifloral Honey',
    category: 'Honey',
    shortDesc: '100% pure, unpasteurized, cold-extracted honey traceable to Kenyan rural apiaries.',
    fullDesc: 'Harvested directly from our network of climate-smart hives. Never micro-filtered or heated above natural hive temperatures to retain rich propolis, pollen, and natural enzymes.',
    priceEstimate: 'KES 850 ($6.50) / 500g Glass Jar',
    keyFeatures: [
      'Cold-pressed & Unfiltered Pure Honey',
      'Traceable via QR Code to Farmer Cluster',
      'Zero Additives, Preservatives, or Sugar Syrup',
      'Rich in Natural Antioxidants & Pollen',
      'Certified by Kenya Bureau of Standards (KEBS)',
    ],
    imageUrl: ASSETS.products,
    techDetail: 'Brix rating > 81.5%, moisture content < 17.5%, HMF level < 15mg/kg, fully compliant with EU & FDA export criteria.',
    communityDetail: 'Every jar purchased guarantees a fair, above-market price paid directly to local Kenyan beekeeping families.',
  },
  {
    id: 'medical-propolis',
    name: 'EcoHive Bio-Propolis Tincture',
    category: 'Wellness',
    shortDesc: 'Medical-grade propolis extract rich in bioflavonoids for natural immunity and health.',
    fullDesc: 'Propolis is bee glue known as natures antibiotic. Harvested hygienically using specialized propolis collectors from EcoHives.',
    priceEstimate: 'KES 1,200 ($9.00) / 30ml Dropper',
    keyFeatures: [
      'High Bioflavonoid & Polyphenol Content',
      'Natural Antibacterial, Antiviral & Healing',
      'Non-Alcoholic & Alcohol-Based Formulations Available',
      'Supports Immune System & Oral Health',
    ],
    imageUrl: ASSETS.products,
    techDetail: 'High-performance liquid chromatography verified for active pinocembrin and caffeic acid phenethyl ester (CAPE).',
    communityDetail: 'Provides beekeepers with a lucrative secondary income stream beyond honey production.',
  },
  {
    id: 'beeswax-soap',
    name: 'EcoHive Honey & Beeswax Artisan Soap',
    category: 'Skincare',
    shortDesc: 'Handcrafted nourishing soap made from pure organic beeswax, raw honey, and macadamia oil.',
    fullDesc: 'An eco-friendly, zero-waste cosmetic line utilizing clean wax byproducts from our sustainable honey extraction process.',
    priceEstimate: 'KES 450 ($3.50) / 120g Bar',
    keyFeatures: [
      '100% Natural Organic Ingredients',
      'Deep Moisturizing Beeswax Barrier',
      'Gentle Exfoliation with Wild Honey',
      'Biodegradable & Zero Synthetic Fragrance',
    ],
    imageUrl: ASSETS.products,
    techDetail: 'Cold-process saponification utilizing unbleached beeswax with high myricyl palmitate content for lasting skin moisture.',
    communityDetail: 'Crafted in partnership with local women-led cottage enterprise cooperatives in Kenya.',
  },
];

export const WORKLOG_DATA: WorklogTask[] = [
  {
    phase: '1. Discovery & Assets',
    description: 'Audit provided images. Upscale 3D hive renders and logos. Clean background treatment for CEO Peter Gitau portrait.',
    deliverable: 'High-res Asset Library & Brand Guidelines',
    status: 'Completed',
    assignee: 'Project Lead',
  },
  {
    phase: '2. UI/UX Architecture',
    description: 'Design 5-page benchmark layout based on Pullus Africa structure with responsive mobile-first flow.',
    deliverable: '5-Page Site Blueprint & Layout Strategy',
    status: 'Completed',
    assignee: 'UI/UX Designer',
  },
  {
    phase: '3. Content Strategy',
    description: 'Draft Dual-Tone Copy Strategy (Technical Specs for Investors vs. Community Benefits for Farmers).',
    deliverable: 'Complete Dual-Tone Copy Document',
    status: 'Completed',
    assignee: 'Content Strategist',
  },
  {
    phase: '4. Technical Setup & Scaffolding',
    description: 'Setup Vite + React TypeScript, Tailwind CSS, motion animations, and modular component hierarchy.',
    deliverable: 'Production Web Workspace & Server Scripts',
    status: 'Completed',
    assignee: 'Fullstack Dev',
  },
  {
    phase: '5. Core Dev (Home Page)',
    description: 'Build Hero section, Triple Bottom Line bar, Traction counters, Process infographic, Founder quote, and Partner bar.',
    deliverable: 'Interactive Benchmark Homepage',
    status: 'Completed',
    assignee: 'Frontend Engineer',
  },
  {
    phase: '6. Tech & IoT Page',
    description: 'Build Exploded Smart Hive simulator with interactive hotspots and Live IoT Telemetry Dashboard widget.',
    deliverable: 'Smart Hive Technology Page',
    status: 'Completed',
    assignee: 'IoT & Frontend Dev',
  },
  {
    phase: '7. Products & Impact Pages',
    description: 'Build Product Catalog with inquiry modals and Impact Calculator with circular plastic waste metrics.',
    deliverable: 'Catalog & Sustainability Modules',
    status: 'Completed',
    assignee: 'Frontend Engineer',
  },
  {
    phase: '8. Contact & Integrations',
    description: 'Setup floating WhatsApp widget, inquiry directory routing (info@, gitau@, andika@), and location map.',
    deliverable: 'Contact Hub & Lead Generation Form',
    status: 'Completed',
    assignee: 'Integrations Lead',
  },
  {
    phase: '9. Optimization & Handover',
    description: 'Speed optimization, WebP compression, mobile responsiveness check, and client worklog drawer documentation.',
    deliverable: 'Final Production Deployment Ready',
    status: 'Completed',
    assignee: 'Project Manager',
  },
];

export const CLIENT_QUESTIONS = [
  {
    q: 'Q1: Content & Media Assets',
    detail: 'Who is providing the actual official copy and field photos? Should we continue using our dual-tone drafted copy and generated high-res 3D/portrait assets?',
    recommendation: 'Use the dual-tone copy provided; update with live field photography as available.',
  },
  {
    q: 'Q2: E-Commerce vs Inquiries',
    detail: 'Do you want customers to pay directly via M-Pesa/Credit Card on site, or use catalog inquiry buttons leading to WhatsApp and email forms?',
    recommendation: 'Start with Catalog Inquiries for high-value B2B/Farmer orders; add M-Pesa checkout in Phase 2.',
  },
  {
    q: 'Q3: IoT Live Telemetry Stream',
    detail: 'For the Smart Hive dashboard, do you want a simulated telemetry stream for preview, or connect to a live MQTT API endpoint?',
    recommendation: 'Simulated live telemetry is implemented for preview, with hooks ready for API key connection.',
  },
  {
    q: 'Q4: Target Priority Alignment',
    detail: 'Is the primary priority commercial investors looking for a climate-smart venture, or Kenyan farming cooperatives buying hardware?',
    recommendation: 'Dual-Tone switcher allows the platform to seamlessly serve both audiences simultaneously.',
  },
];
