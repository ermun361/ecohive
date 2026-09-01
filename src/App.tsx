import React, { useState } from 'react';
import { PageType, ToneMode } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DualToneToggle } from './components/DualToneToggle';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { HomeView } from './components/HomeView';
import { SmartHiveView } from './components/SmartHiveView';
import { ImpactView } from './components/ImpactView';
import { ProductsView } from './components/ProductsView';
import { AboutContactView } from './components/AboutContactView';
import { WorklogScaffoldingModal } from './components/WorklogScaffoldingModal';
import { IoTDashboardModal } from './components/IoTDashboardModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [toneMode, setToneMode] = useState<ToneMode>('balanced');

  const [worklogOpen, setWorklogOpen] = useState(false);
  const [telemetryOpen, setTelemetryOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Dual Tone Switcher Bar */}
      <DualToneToggle tone={toneMode} setTone={setToneMode} />

      {/* Header */}
      <Header
        currentPage={currentPage}
        setPage={setCurrentPage}
        openWorklog={() => setWorklogOpen(true)}
        openTelemetry={() => setTelemetryOpen(true)}
        openAiAssistant={() => setAiDrawerOpen(true)}
      />

      {/* Main Page View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            tone={toneMode}
            setPage={setCurrentPage}
            openTelemetry={() => setTelemetryOpen(true)}
            openWorklog={() => setWorklogOpen(true)}
          />
        )}

        {currentPage === 'smart-hive' && (
          <SmartHiveView
            tone={toneMode}
            openTelemetry={() => setTelemetryOpen(true)}
            openWorklog={() => setWorklogOpen(true)}
          />
        )}

        {currentPage === 'impact' && <ImpactView tone={toneMode} />}

        {currentPage === 'products' && (
          <ProductsView tone={toneMode} setPage={setCurrentPage} />
        )}

        {currentPage === 'about-contact' && <AboutContactView />}
      </main>

      {/* Footer */}
      <Footer
        setPage={setCurrentPage}
        openWorklog={() => setWorklogOpen(true)}
      />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Modals & Drawers */}
      <WorklogScaffoldingModal
        isOpen={worklogOpen}
        onClose={() => setWorklogOpen(false)}
      />

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

