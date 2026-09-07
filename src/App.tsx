import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { HomeView } from './components/HomeView';
import { SmartHiveView } from './components/SmartHiveView';
import { ImpactView } from './components/ImpactView';
import { ProductsView } from './components/ProductsView';
import { AboutContactView } from './components/AboutContactView';
import { IoTDashboardModal } from './components/IoTDashboardModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [telemetryOpen, setTelemetryOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  // Auto-scroll to top when page transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-body flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-slate-950 focus:font-bold focus:rounded-xl focus:shadow-xl focus:border-2 focus:border-amber-600 focus:outline-hidden"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header
        currentPage={currentPage}
        setPage={setCurrentPage}
        openTelemetry={() => setTelemetryOpen(true)}
        openAiAssistant={() => setAiDrawerOpen(true)}
      />

      {/* Main Page View Router */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden">
        {currentPage === 'home' && (
          <HomeView
            setPage={setCurrentPage}
            openTelemetry={() => setTelemetryOpen(true)}
          />
        )}

        {currentPage === 'smart-hive' && (
          <SmartHiveView
            openTelemetry={() => setTelemetryOpen(true)}
          />
        )}

        {currentPage === 'impact' && <ImpactView />}

        {currentPage === 'products' && (
          <ProductsView setPage={setCurrentPage} />
        )}

        {currentPage === 'about-contact' && <AboutContactView />}
      </main>

      {/* Footer */}
      <Footer setPage={setCurrentPage} />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Modals & Drawers */}
      <IoTDashboardModal
        isOpen={telemetryOpen}
        onClose={() => setTelemetryOpen(false)}
      />

      <AiAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
      />
    </div>
  );
}

