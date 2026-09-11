import { createClient } from '@supabase/supabase-js';

// Supabase URL & Public Publishable Anon Key
const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://oofkbzkncgztazlfvlsp.supabase.co';

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  'sb_publishable_4Sqdy0YVuN1x0lJnifmOCg_q6Gr4p4w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SupabaseLead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  hive_quantity?: number;
  target_email?: string;
  message: string;
  created_at?: string;
}

export interface SupabaseTelemetryLog {
  id?: number;
  hive_id: string;
  cluster_id: string;
  temp_c: number;
  weight_kg: number;
  humidity_pct?: number;
  sound_freq_hz?: number;
  battery_pct?: number;
  recorded_at?: string;
}
