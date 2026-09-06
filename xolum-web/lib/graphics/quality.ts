'use client';

import { createContext, createElement, useContext, type ReactNode, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { PerformanceTier, TierConfig, PerformanceStats } from './types';
import { evaluateDeviceSignals, determineInitialTier, TIER_CONFIGS } from './capabilities';

const STORAGE_KEY = 'xolum-graphics-tier';

const TIER_ORDER: PerformanceTier[] = ['STATIC', 'MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'ULTRA'];

function getTierIndex(tier: PerformanceTier): number {
  return TIER_ORDER.indexOf(tier);
}

function useQualityEngine() {
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
  const lastStatsRef = useRef(0);
  const ceilingRef = useRef<PerformanceTier>('STATIC');
  const [restricted, setRestricted] = useState(true);

  // 1. Inicialización y lectura de preferencias guardadas en localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as PerformanceTier | 'AUTO' | null;
      if (saved && (saved === 'AUTO' || TIER_ORDER.includes(saved as PerformanceTier))) {
        setOverride(saved);
      }
    } catch {}

    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      const initial = determineInitialTier(evaluateDeviceSignals());
      ceilingRef.current = initial;
      setRestricted(initial === 'STATIC');
      setDetectedTier(initial);
      fpsHistoryRef.current = [];
    };
    const resize = () => { clearTimeout(timer); timer = setTimeout(update, 250); };
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    update();
    window.addEventListener('resize', resize);
    media.addEventListener('change', update);
    return () => { clearTimeout(timer); window.removeEventListener('resize', resize); media.removeEventListener('change', update); };
  }, []);

  // 2. Determinar el Tier activo (Manual vs Automático)
  useEffect(() => {
    const finalTier = restricted ? 'STATIC' : override === 'AUTO' ? detectedTier : override;
    setActiveTier(finalTier);
  }, [override, detectedTier, restricted]);

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
      if (activeTier === 'STATIC') return;

      const currentFps = 1000 / Math.max(deltaMs, 1);
      const history = fpsHistoryRef.current;
      history.push(currentFps);
      if (history.length > 90) history.shift(); // ~1.5 segundos a 60fps

      const now = performance.now();
      if (history.length >= 60 && override === 'AUTO') {
        const avgFps = history.reduce((a, b) => a + b, 0) / history.length;

        // Histéresis de degradación: FPS < 38 por 3 segundos
        if (avgFps < config.targetFps * 0.72 && now - lastDegradeTimeRef.current > 3000) {
          const currentIndex = getTierIndex(activeTier);
          if (currentIndex > getTierIndex('MINIMAL')) {
            const nextTier = TIER_ORDER[currentIndex - 1];
            setDetectedTier(nextTier);
            lastDegradeTimeRef.current = now;
            fpsHistoryRef.current = [];
          }
        }

        // Histéresis de recuperación: FPS > 55 sostenido por 10 segundos
        if (avgFps >= config.targetFps * 0.95 && now - lastUpgradeTimeRef.current > 10000 && now - lastDegradeTimeRef.current > 15000) {
          const currentIndex = getTierIndex(activeTier);
          const initialMax = getTierIndex(ceilingRef.current);
          lastUpgradeTimeRef.current = now;
          if (currentIndex < initialMax) {
            const nextTier = TIER_ORDER[currentIndex + 1];
            setDetectedTier(nextTier);
            lastUpgradeTimeRef.current = now;
            fpsHistoryRef.current = [];
          }
        }
      }

      if (now - lastStatsRef.current < 500) return;
      lastStatsRef.current = now;
      setStats({
        fps: Math.round(currentFps),
        frameTimeMs: Math.round(deltaMs * 10) / 10,
        activeDpr: config.maxDpr,
        activeParticles: config.particleCount,
        tier: activeTier,
        manualOverride: override,
        isDegraded: getTierIndex(activeTier) < getTierIndex(ceilingRef.current),
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

const QualityContext = createContext<ReturnType<typeof useQualityEngine> | null>(null);
export function GraphicsProvider({ children }: { children: ReactNode }) {
  const value = useQualityEngine();
  return createElement(QualityContext.Provider, { value }, children);
}
export function useAdaptiveQuality() {
  const value = useContext(QualityContext);
  if (!value) throw new Error('GraphicsProvider is required');
  return value;
}
