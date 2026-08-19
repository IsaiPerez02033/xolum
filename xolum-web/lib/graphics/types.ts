export type PerformanceTier = 'ULTRA' | 'HIGH' | 'MEDIUM' | 'LOW' | 'MINIMAL' | 'STATIC';

export interface DeviceSignals {
  memory?: number;
  hardwareConcurrency?: number;
  width: number;
  height: number;
  dpr: number;
  webglVersion: 0 | 1 | 2;
  saveData: boolean;
  slowNet: boolean;
  reducedMotion: boolean;
  isTouch: boolean;
  batteryLevel?: number;
  isCharging?: boolean;
}

export interface TierConfig {
  tier: PerformanceTier;
  targetFps: number;
  minDpr: number;
  maxDpr: number;
  particleCount: number;
  enableBloom: boolean;
  enableDepthOfField: boolean;
  enableShadows: boolean;
  wireframeSubdivisions: number;
  frameloop: 'always' | 'demand' | 'never';
  heavy3D: boolean;
  ambient: boolean;
}

export interface PerformanceStats {
  fps: number;
  frameTimeMs: number;
  activeDpr: number;
  activeParticles: number;
  tier: PerformanceTier;
  manualOverride: PerformanceTier | 'AUTO';
  isDegraded: boolean;
}
