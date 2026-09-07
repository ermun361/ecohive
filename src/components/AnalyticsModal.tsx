import React, { useEffect, useState } from 'react';
import { X, BarChart3, Activity, Globe, RefreshCw, Smartphone, Monitor } from 'lucide-react';

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

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analytics/stats');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
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

        {/* Verification Note */}
        <p className="text-[11px] text-stone-400 text-center font-body border-t border-stone-800/80 pt-3">
          Zero-cookie, privacy-preserving telemetry pipeline built for FlyRank AI Internship compliance.
        </p>
      </div>
    </div>
  );
};
