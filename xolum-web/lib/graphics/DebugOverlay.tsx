'use client';

import { useEffect, useState } from 'react';
import { useAdaptiveQuality } from './quality';
import { PerformanceTier } from './types';
import { Cpu, Gauge, Monitor, Wrench } from '@phosphor-icons/react';

export function DebugOverlay() {
  const [visible, setVisible] = useState(false);
  const { tier, config, override, stats, setQualityOverride } = useAdaptiveQuality();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug')) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const tiers: (PerformanceTier | 'AUTO')[] = ['AUTO', 'ULTRA', 'HIGH', 'MEDIUM', 'LOW', 'STATIC'];

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-80 rounded-2xl border border-[#22d3ee]/40 bg-[#06090e]/95 p-4 font-mono text-xs text-[#22d3ee] shadow-[0_0_40px_rgba(34,211,238,0.25)] backdrop-blur-xl select-none">
      <div className="flex items-center justify-between border-b border-[#22d3ee]/20 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Gauge size={18} className="text-[#10b981]" />
          <span className="font-bold tracking-widest text-white">XOLUM // 3D DEBUG</span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-[var(--text-muted)] hover:text-white font-bold px-1.5 py-0.5 rounded"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-[var(--text-muted)]">TIER ACTIVO:</span>
          <span className="font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/30">
            {tier} {override !== 'AUTO' && '(MANUAL)'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[var(--text-muted)]">FPS ESTIMADO:</span>
          <span className={`font-bold ${stats.fps >= 50 ? 'text-[#10b981]' : stats.fps >= 30 ? 'text-amber-400' : 'text-rose-400'}`}>
            {stats.fps} FPS ({stats.frameTimeMs} ms)
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[var(--text-muted)]">DPR RENDERING:</span>
          <span className="font-semibold text-white">{config.maxDpr}x</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[var(--text-muted)]">PARTÍCULAS:</span>
          <span className="font-semibold text-white">{config.particleCount}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[var(--text-muted)]">POSTPROCESSING:</span>
          <span className="font-semibold text-[#22d3ee]">
            {config.enableBloom ? 'BLOOM' : 'NINGUNO'} {config.enableDepthOfField && '+ DOF'}
          </span>
        </div>
      </div>

      <div className="border-t border-[#22d3ee]/20 pt-2.5">
        <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] mb-2 uppercase tracking-wider">
          <Wrench size={12} />
          <span>FORZAR CALIDAD GRÁFICA:</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setQualityOverride(t)}
              className={`rounded px-2 py-1 text-[10px] font-bold transition-all ${
                override === t
                  ? 'bg-[#22d3ee] text-[#06090e] shadow-[0_0_10px_#22d3ee]'
                  : 'bg-[#121722] text-[var(--text-soft)] hover:bg-[#1a2130] hover:text-white border border-[var(--border)]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
