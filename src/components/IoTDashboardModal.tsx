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
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-emerald-500/40 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-950 p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 border border-emerald-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">Live IoT Hive Telemetry Stream</h2>
                <span className="bg-emerald-900 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-600">
                  GSM Solar Feed
                </span>
              </div>
              <p className="text-xs text-slate-400">
                EcoHive Apiary Clusters • Real-time telemetry monitoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchTelemetry}
              disabled={loading}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg border border-slate-700 text-xs flex items-center gap-1.5"
              title="Refresh Stream"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
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
                  className={`p-3.5 rounded-2xl text-left transition-all border ${
                    isSelected
                      ? 'bg-emerald-950 border-amber-400 shadow-md ring-1 ring-amber-400'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-amber-400 font-bold">{node.id}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        node.status === 'Harvest Ready'
                          ? 'bg-amber-400 animate-ping'
                          : 'bg-emerald-400'
                      }`}
                    ></span>
                  </div>
                  <div className="font-bold text-white text-xs truncate">{node.location}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{node.region}</div>
                  <div className="mt-2 text-xs font-mono font-bold text-emerald-400">
                    {node.tempC}°C • {node.weightKg}kg
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Node Detailed Metrics */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-emerald-400 font-mono text-xs font-bold uppercase">
                  {selectedNode.id} • {selectedNode.region}
                </span>
                <h3 className="text-xl font-extrabold text-white">{selectedNode.location}</h3>
                <p className="text-xs text-slate-400">Beekeeper: {selectedNode.farmerName} ({selectedNode.hiveCount} Hives)</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-emerald-900/80 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-600">
                  Status: {selectedNode.status}
                </span>
              </div>
            </div>

            {/* Gauge Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Temperature */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Internal Temp</span>
                  <Thermometer className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {selectedNode.tempC} °C
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold">
                  Optimal Colony Zone (33.5 - 35.5 °C)
                </div>
              </div>

              {/* Weight */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Hive Weight</span>
                  <Weight className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {selectedNode.weightKg} kg
                </div>
                <div className="text-[10px] text-amber-300 font-semibold">
                  {selectedNode.weightKg > 25 ? '★ Harvest Recommended' : 'Accumulating Comb'}
                </div>
              </div>

              {/* Humidity & Acoustic */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Humidity & Acoustic</span>
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-black text-blue-300 font-mono">
                  {selectedNode.humidityPct}% RH
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Freq: {selectedNode.soundFreqHz} Hz (Normal Queen)
                </div>
              </div>

              {/* Battery & Solar */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Solar & Battery</span>
                  <Sun className="w-4 h-4 text-amber-300" />
                </div>
                <div className="text-2xl font-black text-emerald-300 font-mono">
                  {selectedNode.batteryPct}%
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold">
                  Solar Trickle: {selectedNode.solarStatus}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span>Last Stream Pulse: <strong className="text-amber-400">{selectedNode.lastUpdated}</strong></span>
              <span className="text-emerald-400 font-mono">Telemetry Protocol: LoRaWAN / GSM</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Powered by EcoHive Solar IoT Micro-PCBs</span>
          <button
            onClick={onClose}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition-all"
          >
            Close Telemetry Monitor
          </button>
        </div>
      </div>
    </div>
  );
};
