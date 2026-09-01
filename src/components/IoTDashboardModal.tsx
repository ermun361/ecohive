import React, { useState, useEffect } from 'react';
import { HiveTelemetry } from '../types';
import { INITIAL_TELEMETRY } from '../data/ecohiveData';
import { X, Activity, RefreshCw, Cpu, Thermometer, Weight, Sun, BatteryCharging, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const IoTDashboardModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [telemetry, setTelemetry] = useState<HiveTelemetry[]>(INITIAL_TELEMETRY);
  const [loading, setLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<HiveTelemetry>(INITIAL_TELEMETRY[0]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const fetchTelemetry = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/iot-telemetry');
      const data = await res.json();
      if (data.nodes) {
        setTelemetry(data.nodes);
        const updatedSelected = data.nodes.find((n: HiveTelemetry) => n.id === selectedNode.id);
        if (updatedSelected) setSelectedNode(updatedSelected);
      }
    } catch (err) {
      console.log('Telemetry fetch fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTelemetry();
      const interval = setInterval(fetchTelemetry, 8000); // Auto-refresh telemetry every 8s
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="iot-modal-title"
      className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4"
    >
      <div className="bg-stone-900 text-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-amber-500/30 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-stone-950 p-6 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Activity className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="iot-modal-title" className="text-xl font-black text-white font-display">Live IoT Hive Telemetry Stream</h2>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  GSM Solar Feed
                </span>
              </div>
              <p className="text-xs text-stone-400 font-body">
                EcoHive Apiary Clusters • Real-time telemetry monitoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchTelemetry}
              disabled={loading}
              aria-label="Refresh telemetry stream"
              className="p-2 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-xl border border-stone-700 text-xs flex items-center gap-1.5 cursor-pointer"
              title="Refresh Stream"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline font-bold">Refresh</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close telemetry monitor"
              className="p-2 text-stone-400 hover:text-white rounded-full bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Node Selector Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {telemetry.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-400 shadow-md ring-1 ring-amber-400'
                      : 'bg-stone-950/80 border-stone-800 hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-amber-400 font-bold">{node.id}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        node.status === 'Harvest Ready'
                          ? 'bg-amber-400 animate-ping'
                          : 'bg-amber-300'
                      }`}
                    ></span>
                  </div>
                  <div className="font-bold text-white text-xs truncate font-display">{node.location}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">{node.region}</div>
                  <div className="mt-2 text-xs font-mono font-bold text-amber-300">
                    {node.tempC}°C • {node.weightKg}kg
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Node Detailed Metrics */}
          <div className="bg-stone-950 p-6 rounded-3xl border border-stone-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
              <div>
                <span className="text-amber-400 font-mono text-xs font-bold uppercase">
                  {selectedNode.id} • {selectedNode.region}
                </span>
                <h3 className="text-xl font-black text-white font-display">{selectedNode.location}</h3>
                <p className="text-xs text-stone-400 font-body">Beekeeper: {selectedNode.farmerName} ({selectedNode.hiveCount} Hives)</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-black border border-amber-400/40">
                  Status: {selectedNode.status}
                </span>
              </div>
            </div>

            {/* Gauge Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Temperature */}
              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>Internal Temp</span>
                  <Thermometer className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {selectedNode.tempC} °C
                </div>
                <div className="text-[10px] text-amber-300/80 font-semibold">
                  Optimal Colony Zone (33.5 - 35.5 °C)
                </div>
              </div>

              {/* Weight */}
              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>Hive Weight</span>
                  <Weight className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-300 font-mono">
                  {selectedNode.weightKg} kg
                </div>
                <div className="text-[10px] text-amber-300 font-semibold">
                  {selectedNode.weightKg > 25 ? '★ Harvest Recommended' : 'Accumulating Comb'}
                </div>
              </div>

              {/* Humidity & Acoustic */}
              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>Humidity & Acoustic</span>
                  <Activity className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {selectedNode.humidityPct}% RH
                </div>
                <div className="text-[10px] text-stone-400 font-mono">
                  Freq: {selectedNode.soundFreqHz} Hz (Normal Queen)
                </div>
              </div>

              {/* Battery & Solar */}
              <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>Solar & Battery</span>
                  <Sun className="w-4 h-4 text-amber-300" />
                </div>
                <div className="text-2xl font-black text-amber-300 font-mono">
                  {selectedNode.batteryPct}%
                </div>
                <div className="text-[10px] text-amber-400 font-semibold">
                  Solar Trickle: {selectedNode.solarStatus}
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-900 rounded-2xl border border-stone-800 text-xs text-stone-300 flex items-center justify-between font-body">
              <span>Last Stream Pulse: <strong className="text-amber-400 font-mono">{selectedNode.lastUpdated}</strong></span>
              <span className="text-amber-400 font-mono">Telemetry Protocol: LoRaWAN / GSM</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>Powered by EcoHive Solar IoT Micro-PCBs</span>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black px-5 py-2.5 rounded-xl transition-all shadow-md border border-amber-400/50 cursor-pointer"
          >
            Close Telemetry Monitor
          </button>
        </div>
      </div>
    </div>
  );
};
