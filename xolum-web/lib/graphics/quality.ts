'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { PerformanceTier, TierConfig, PerformanceStats } from './types';
import { evaluateDeviceSignals, determineInitialTier, TIER_CONFIGS } from './capabilities';

const STORAGE_KEY = 'xolum-graphics-tier';

const TIER_ORDER: PerformanceTier[] = ['STATIC', 'MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'ULTRA'];

function getTierIndex(tier: PerformanceTier): number {
  return TIER_ORDER.indexOf(tier);
}

export function useAdaptiveQuality() {
  const [override, setOverride] = useState<PerformanceTier | 'AUTO'>('AUTO');
  const [detectedTier, setDetectedTier] = useState<PerformanceTier>('STATIC');
  const [activeTier, setActiveTier] = useState<PerformanceTier>('STATIC');
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 60,
    frameTimeMs: 16.6,
    activeDpr: 1,
    activeParticles: 0,
    tier: 'STATIC',
    manualOverride: 'AUTO',
    isDegraded: false,
  });

  const fpsHistoryRef = useRef<number[]>([]);
  const lastDegradeTimeRef = useRef<number>(0);
  const lastUpgradeTimeRef = useRef<number>(0);

  // 1. Inicialización y lectura de preferencias guardadas en localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as PerformanceTier | 'AUTO' | null;
      if (saved && (saved === 'AUTO' || TIER_ORDER.includes(saved as PerformanceTier))) {
        setOverride(saved);
      }
    } catch {}

    const signals = evaluateDeviceSignals();
    const initial = determineInitialTier(signals);
    setDetectedTier(initial);
  }, []);

  // 2. Determinar el Tier activo (Manual vs Automático)
  useEffect(() => {
    const finalTier = override === 'AUTO' ? detectedTier : override;
    setActiveTier(finalTier);
  }, [override, detectedTier]);

  const config = useMemo<TierConfig>(() => {
    return TIER_CONFIGS[activeTier] || TIER_CONFIGS.STATIC;
  }, [activeTier]);

  // 3. Método para cambiar manualmente la calidad gráfica
  const setQualityOverride = useCallback((newTier: PerformanceTier | 'AUTO') => {
    setOverride(newTier);
    try {
      localStorage.setItem(STORAGE_KEY, newTier);
    } catch {}
  }, []);

  // 4. Muestreo de FPS e Histéresis
  const recordFrameTime = useCallback(
    (deltaMs: number) => {
      if (activeTier === 'STATIC' || override !== 'AUTO') return;

      const currentFps = 1000 / Math.max(deltaMs, 1);
      const history = fpsHistoryRef.current;
      history.push(currentFps);
      if (history.length > 90) history.shift(); // ~1.5 segundos a 60fps

      const now = performance.now();
      if (history.length >= 60) {
        const avgFps = history.reduce((a, b) => a + b, 0) / history.length;

        // Histéresis de degradación: FPS < 38 por 3 segundos
        if (avgFps < 38 && now - lastDegradeTimeRef.current > 3000) {
          const currentIndex = getTierIndex(activeTier);
          if (currentIndex > getTierIndex('LOW')) {
            const nextTier = TIER_ORDER[currentIndex - 1];
            setDetectedTier(nextTier);
            lastDegradeTimeRef.current = now;
            fpsHistoryRef.current = [];
          }
        }

        // Histéresis de recuperación: FPS > 55 sostenido por 10 segundos
        if (avgFps > 55 && now - lastUpgradeTimeRef.current > 10000 && now - lastDegradeTimeRef.current > 15000) {
          const currentIndex = getTierIndex(activeTier);
          const initialMax = getTierIndex(determineInitialTier(evaluateDeviceSignals()));
          if (currentIndex < initialMax) {
            const nextTier = TIER_ORDER[currentIndex + 1];
            setDetectedTier(nextTier);
            lastUpgradeTimeRef.current = now;
            fpsHistoryRef.current = [];
          }
        }
      }

      setStats({
        fps: Math.round(currentFps),
        frameTimeMs: Math.round(deltaMs * 10) / 10,
        activeDpr: config.maxDpr,
        activeParticles: config.particleCount,
        tier: activeTier,
        manualOverride: override,
        isDegraded: getTierIndex(activeTier) < getTierIndex(detectedTier),
      });
    },
    [activeTier, config, override, detectedTier],
  );

  return {
    tier: activeTier,
    config,
    override,
    stats,
    setQualityOverride,
    recordFrameTime,
    heavy3D: config.heavy3D,
    ambient: config.ambient,
  };
}
