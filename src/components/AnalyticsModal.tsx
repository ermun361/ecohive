import React, { useEffect, useState } from 'react';
import {
  X,
  BarChart3,
  Activity,
  Globe,
  RefreshCw,
  Smartphone,
  Monitor,
  Database,
  Check,
  Copy,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface AnalyticsData {
  status: string;
  protocol: string;
  totalEvents: number;
  pageViews: number;
  uniquePagesTracked: string[];
  recentEvents: Array<{
    type: string;
    path: string;
    referrer: string;
    device: string;
    timestamp: string;
  }>;
  activeTracking: boolean;
}

interface SupabaseStatus {
  configured: boolean;
  connected: boolean;
  url?: string;
  tableExists?: boolean;
  error?: string;
  hint?: string;
  totalLeadsRecorded?: number;
}

const STARTER_SQL = `-- Run in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'General',
  hive_quantity INTEGER DEFAULT 1,
  target_email TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security & Public Insert
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous insertions" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous read" ON leads FOR SELECT USING (true);`;

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [dbStatus, setDbStatus] = useState<SupabaseStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSql, setShowSql] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [resStats, resDb] = await Promise.allSettled([
        fetch('/api/analytics/stats'),
        fetch('/api/supabase-status'),
      ]);

      if (resStats.status === 'fulfilled' && resStats.value.ok) {
        const json = await resStats.value.json();
        setData(json);
      }

      if (resDb.status === 'fulfilled' && resDb.value.ok) {
        const jsonDb = await resDb.value.json();
        setDbStatus(jsonDb);
      }
    } catch (err) {
      console.error('Failed to fetch analytics or db status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(STARTER_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    if (isOpen) {
      fetchStats();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="analytics-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-stone-900 border border-amber-500/30 text-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <BarChart3 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 id="analytics-modal-title" className="text-lg font-bold font-display text-white">
                EcoHive Telemetry &amp; Analytics
              </h2>
              <div className="flex items-center gap-2 text-xs text-amber-400/80">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live HTTPS Tracking Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchStats}
              aria-label="Refresh analytics data"
              disabled={loading}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close analytics modal"
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
            <span className="text-[11px] font-mono text-stone-400 block uppercase">Page Views</span>
            <span className="text-2xl font-black text-amber-400 font-display">
              {data?.pageViews ?? 1}
            </span>
          </div>

          <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
            <span className="text-[11px] font-mono text-stone-400 block uppercase">Total Events</span>
            <span className="text-2xl font-black text-emerald-400 font-display">
              {data?.totalEvents ?? 1}
            </span>
          </div>

          <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
            <span className="text-[11px] font-mono text-stone-400 block uppercase">Protocol</span>
            <span className="text-base font-bold text-white font-mono flex items-center gap-1 mt-1">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>HTTPS</span>
            </span>
          </div>
        </div>

        {/* Tracked Pages */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono block">
            Monitored Application Routes
          </span>
          <div className="flex flex-wrap gap-2">
            {data?.uniquePagesTracked && data.uniquePagesTracked.length > 0 ? (
              data.uniquePagesTracked.map((path, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono bg-stone-800 text-amber-200 px-3 py-1 rounded-lg border border-amber-500/20"
                >
                  {path}
                </span>
              ))
            ) : (
              <span className="text-xs font-mono bg-stone-800 text-amber-200 px-3 py-1 rounded-lg border border-amber-500/20">
                /home
              </span>
            )}
          </div>
        </div>

        {/* Real-time Stream */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono block">
            Real-Time Audit Log
          </span>
          <div className="bg-stone-950 rounded-2xl p-3 border border-stone-800 max-h-36 overflow-y-auto font-mono text-[11px] space-y-2">
            {data?.recentEvents && data.recentEvents.length > 0 ? (
              data.recentEvents.map((evt, i) => (
                <div key={i} className="flex items-center justify-between text-stone-400 border-b border-stone-900 pb-1.5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    {evt.device === 'Mobile' ? (
                      <Smartphone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    ) : (
                      <Monitor className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    )}
                    <span className="text-white font-semibold">{evt.type}</span>
                    <span className="text-stone-500">{evt.path}</span>
                  </div>
                  <span className="text-[10px] text-stone-500">
                    {new Date(evt.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-stone-500 text-center py-2">
                Listening for incoming client telemetry events...
              </div>
            )}
          </div>
        </div>

        {/* Supabase PostgreSQL Integration Panel */}
        <div className="bg-stone-950/80 rounded-2xl p-4 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                PostgreSQL Database (Supabase)
              </span>
            </div>
            {dbStatus?.connected ? (
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md font-bold">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] text-amber-400 font-mono bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-md font-bold">
                <Activity className="w-3 h-3 animate-pulse" /> Ready for Schema
              </span>
            )}
          </div>

          <div className="text-xs text-stone-300 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-400 font-mono">Project Instance:</span>
              <span className="text-amber-200 font-mono text-[10px]">oofkbzkncgztazlfvlsp.supabase.co</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-400 font-mono">Status:</span>
              <span className="text-stone-200 font-mono">
                {dbStatus?.tableExists
                  ? `Active • ${dbStatus.totalLeadsRecorded ?? 0} leads saved`
                  : 'Ready • Run starter table SQL in Supabase editor'}
              </span>
            </div>
          </div>

          {/* Collapsible SQL Helper */}
          <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowSql(!showSql)}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-mono underline cursor-pointer"
            >
              {showSql ? 'Hide SQL schema script' : 'View / Copy SQL schema script'}
            </button>
            <button
              type="button"
              onClick={handleCopySql}
              className="flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'SQL Copied!' : 'Copy SQL'}</span>
            </button>
          </div>

          {showSql && (
            <pre className="bg-black/60 p-3 rounded-xl text-[10px] text-amber-200/90 font-mono overflow-x-auto border border-stone-800 leading-relaxed max-h-36">
              {STARTER_SQL}
            </pre>
          )}
        </div>

        {/* Verification Note */}
        <p className="text-[11px] text-stone-400 text-center font-body border-t border-stone-800/80 pt-3">
          Zero-cookie, privacy-preserving telemetry pipeline built for FlyRank AI Internship compliance.
        </p>
      </div>
    </div>
  );
};
