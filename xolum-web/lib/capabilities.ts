'use client';

import { useAdaptiveQuality } from './graphics/quality';

export type DeviceCaps = { heavy3D: boolean; ambient: boolean };

/**
 * Hook de compatibilidad que conecta con el Motor Gráfico Adaptativo (`lib/graphics/`).
 * Garantiza que cualquier componente existente reciba el estado dinámico de capacidad
 * en tiempo real sin romper su firma previa.
 */
export function useDeviceCapabilities(): DeviceCaps {
  const { heavy3D, ambient } = useAdaptiveQuality();
  return { heavy3D, ambient };
}
