import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, AlertCircle } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      id="pwa-offline-indicator"
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white shadow-2xl border border-amber-400/30 backdrop-blur-md animate-fade-in"
    >
      <div className="relative flex items-center justify-center">
        <WifiOff className="w-4 h-4 text-amber-100" />
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-400 animate-ping" />
      </div>
      <div>
        <p className="font-bold">Offline Mode Active</p>
        <p className="text-[11px] text-amber-100 font-normal">
          Field apiary guides and cached hive data remain fully accessible.
        </p>
      </div>
    </div>
  );
};
