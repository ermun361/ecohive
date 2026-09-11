import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed in standalone mode, hide
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        id="pwa-install-btn"
        type="button"
        onClick={install}
        className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold px-3 py-1.5 text-xs shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-amber-400"
        title="Install EcoHive App on your home screen for offline field access"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          id="pwa-install-ios-btn"
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-50/50 hover:bg-amber-100 text-amber-900 font-semibold px-2.5 py-1.5 text-xs transition-all"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-700" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#FDFBF7] p-6 shadow-2xl border border-amber-200">
              <div className="flex items-center justify-between pb-3 border-b border-amber-200/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs">
                    EH
                  </div>
                  <h3 className="text-base font-bold text-stone-900">Install EcoHive on iOS</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg hover:bg-amber-100 text-stone-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-stone-700">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    1
                  </div>
                  <p>
                    Tap the <strong>Share</strong> icon in the Safari navigation bar at the bottom or top of your screen.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    2
                  </div>
                  <p>
                    Scroll down and tap <strong>Add to Home Screen</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    3
                  </div>
                  <p>
                    Confirm <strong>Add</strong> to access EcoHive and offline field telemetry directly from your phone!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-600 transition-colors shadow-sm"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback ambient button to allow users on desktop/Chromium that haven't triggered beforeinstallprompt yet
  return (
    <button
      id="pwa-install-ambient-btn"
      type="button"
      onClick={() => {
        if (!install()) {
          alert('To install EcoHive: tap your browser menu (⋮ or Share) and select "Install App" or "Add to Home Screen"');
        }
      }}
      className="hidden md:flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-50/60 hover:bg-amber-100 text-amber-900 font-medium px-2.5 py-1 text-xs transition-colors"
      title="Install EcoHive App for offline field use"
    >
      <Download className="w-3.5 h-3.5 text-amber-700" />
      <span>Install</span>
    </button>
  );
};
