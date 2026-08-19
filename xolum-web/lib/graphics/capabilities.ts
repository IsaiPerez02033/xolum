'use client';

import { DeviceSignals, PerformanceTier, TierConfig } from './types';

export function evaluateDeviceSignals(): DeviceSignals {
  if (typeof window === 'undefined') {
    return {
      width: 1280,
      height: 800,
      dpr: 1,
      webglVersion: 2,
      saveData: false,
      slowNet: false,
      reducedMotion: false,
      isTouch: false,
    };
  }

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };

  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const memory = typeof nav.deviceMemory === 'number' ? nav.deviceMemory : undefined;
  const hardwareConcurrency = typeof nav.hardwareConcurrency === 'number' ? nav.hardwareConcurrency : undefined;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = nav.connection;
  const saveData = !!conn?.saveData;
  const slowNet = /(^|-)2g$/.test(conn?.effectiveType || '');
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  // Test de WebGL2 / WebGL1 mediante canvas oculto
  let webglVersion: 0 | 1 | 2 = 0;
  try {
    const c = document.createElement('canvas');
    const gl2 = c.getContext('webgl2');
    if (gl2) {
      webglVersion = 2;
      const lose = gl2.getExtension('WEBGL_lose_context');
      lose?.loseContext?.();
    } else {
      const gl1 = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (gl1) {
        webglVersion = 1;
        const lose = (gl1 as WebGLRenderingContext).getExtension('WEBGL_lose_context');
        lose?.loseContext?.();
      }
    }
  } catch {
    webglVersion = 0;
  }

  return {
    memory,
    hardwareConcurrency,
    width,
    height,
    dpr,
    webglVersion,
    saveData,
    slowNet,
    reducedMotion,
    isTouch,
  };
}

export function determineInitialTier(signals: DeviceSignals): PerformanceTier {
  // Preferencias estrictas: Si el usuario pide reducir movimiento, ahorro de datos o red 2G, pasamos a STATIC o MINIMAL
  if (signals.reducedMotion || signals.saveData || signals.slowNet || signals.webglVersion === 0) {
    return 'STATIC';
  }

  const w = signals.width;
  const mem = signals.memory;
  const cores = signals.hardwareConcurrency;

  // Móviles muy pequeños (< 640px) o dispositivos con RAM < 2GB
  if (w < 640 || (mem !== undefined && mem < 2)) {
    return 'STATIC';
  }

  // Móviles o tablets básicas (< 1024px o RAM < 4GB o 2 núcleos)
  if (w < 1024 || (mem !== undefined && mem < 4) || (cores !== undefined && cores < 4)) {
    return 'LOW';
  }

  // Escritorios o laptops de gama media (RAM 4GB-7GB o 4 núcleos)
  if ((mem !== undefined && mem < 8) || (cores !== undefined && cores < 6)) {
    return 'MEDIUM';
  }

  // Escritorios con más de 8GB RAM, WebGL2 y procesadores potentes
  if (mem !== undefined && mem >= 8 && cores !== undefined && cores >= 8 && signals.webglVersion === 2) {
    return 'ULTRA';
  }

  return 'HIGH';
}

export const TIER_CONFIGS: Record<PerformanceTier, TierConfig> = {
  ULTRA: {
    tier: 'ULTRA',
    targetFps: 60,
    minDpr: 1.25,
    maxDpr: 2.0,
    particleCount: 1200,
    enableBloom: true,
    enableDepthOfField: true,
    enableShadows: true,
    wireframeSubdivisions: 80,
    frameloop: 'always',
    heavy3D: true,
    ambient: true,
  },
  HIGH: {
    tier: 'HIGH',
    targetFps: 60,
    minDpr: 1.0,
    maxDpr: 1.5,
    particleCount: 700,
    enableBloom: true,
    enableDepthOfField: false,
    enableShadows: false,
    wireframeSubdivisions: 60,
    frameloop: 'always',
    heavy3D: true,
    ambient: true,
  },
  MEDIUM: {
    tier: 'MEDIUM',
    targetFps: 45,
    minDpr: 1.0,
    maxDpr: 1.25,
    particleCount: 350,
    enableBloom: true,
    enableDepthOfField: false,
    enableShadows: false,
    wireframeSubdivisions: 45,
    frameloop: 'always',
    heavy3D: true,
    ambient: true,
  },
  LOW: {
    tier: 'LOW',
    targetFps: 30,
    minDpr: 0.75,
    maxDpr: 1.0,
    particleCount: 120,
    enableBloom: false,
    enableDepthOfField: false,
    enableShadows: false,
    wireframeSubdivisions: 30,
    frameloop: 'always',
    heavy3D: true,
    ambient: false,
  },
  MINIMAL: {
    tier: 'MINIMAL',
    targetFps: 30,
    minDpr: 0.75,
    maxDpr: 1.0,
    particleCount: 40,
    enableBloom: false,
    enableDepthOfField: false,
    enableShadows: false,
    wireframeSubdivisions: 20,
    frameloop: 'demand',
    heavy3D: false,
    ambient: false,
  },
  STATIC: {
    tier: 'STATIC',
    targetFps: 0,
    minDpr: 1,
    maxDpr: 1,
    particleCount: 0,
    enableBloom: false,
    enableDepthOfField: false,
    enableShadows: false,
    wireframeSubdivisions: 0,
    frameloop: 'never',
    heavy3D: false,
    ambient: false,
  },
};
