export type NavigationTab = 'home' | 'smart-hive' | 'hive-tech' | 'impact' | 'products' | 'about-contact';
export type PageType = NavigationTab;

export interface IoTTelemetry {
  hiveId: string;
  temperature: number;
  weight: number;
  humidity: number;
  batteryLevel: number;
  acousticFrequency: number;
  swarmRisk: 'Low' | 'Moderate' | 'High';
  lastUpdated: string;
  isOnline: boolean;
}

export interface HiveTelemetry {
  id: string;
  location: string;
  region: string;
  farmerName: string;
  hiveCount: number;
  tempC: number;
  weightKg: number;
  humidityPct: number;
  soundFreqHz: number;
  batteryPct: number;
  solarStatus: 'Charging' | 'Optimal' | 'Standby';
  lastUpdated: string;
  status: 'Healthy' | 'Harvest Ready' | 'Inspection Required' | 'Alert';
}

export interface ExplodedHotspot {
  id: string;
  name: string;
  shortDesc: string;
  techSpec: string;
  communityBenefit: string;
  xPercent: number;
  yPercent: number;
}

export interface Hotspot {
  id: string;
  titleTechnical: string;
  titleCommunity: string;
  descTechnical: string;
  descCommunity: string;
  xPct: number;
  yPct: number;
  badge: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Honey' | 'Wellness' | 'Hardware' | 'Skincare' | 'All';
  shortDesc?: string;
  fullDesc?: string;
  priceEstimate?: string;
  keyFeatures?: string[];
  imageUrl?: string;
  techDetail?: string;
  communityDetail?: string;

  // Legacy/Alternative fields
  tagline?: string;
  descTechnical?: string;
  descCommunity?: string;
  priceKes?: number;
  priceUsd?: number;
  certification?: string;
  badge?: string;
  specs?: string[];
}

export interface WorklogTask {
  phase: string;
  description: string;
  deliverables?: string;
  deliverable?: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  category?: 'Design' | 'Content' | 'Technical' | 'Optimization';
  assignee?: string;
}

export interface ContactFormInput {
  fullName: string;
  email: string;
  phone: string;
  category: 'Investor / Partner' | 'Farmer / Beekeeper' | 'Retailer / Wholesale' | 'General Inquiry';
  targetContact: 'info@ecohivekenya.com' | 'gitau@ecohivekenya.com' | 'andika@ecohivekenya.com';
  message: string;
}
