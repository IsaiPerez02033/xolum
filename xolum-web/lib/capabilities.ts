'use client';

import { useEffect, useState } from 'react';

/**
 * Detección de capacidad del dispositivo para decidir cuánto "peso visual"
 * cargamos. La mayoría de los usuarios llegan desde móvil y no todos tienen
 * gama alta, buena conexión ni GPU: por eso el 3D (Three.js, ~600KB-1MB) sólo
 * se monta —y por tanto sólo se descarga— cuando el equipo puede con él.
 *
 * - `heavy3D`: escenas WebGL (hero 3D). Requiere pantalla grande, WebGL real,
 *   RAM suficiente y que el usuario no pida reducir movimiento ni ahorrar datos.
 * - `ambient`: animaciones de fondo ligeras en canvas 2D (constelación de red).
 *   Más permisivo, pero se apaga en móvil pequeño, ahorro de datos o red 2G.
 *
 * SSR-safe: arranca en `false` (se renderiza el póster estático) y se "mejora"
 * a 3D tras montar en cliente. No hay salto de layout porque el contenedor
 * mantiene el mismo tamaño (aspect-square).
 */
export type DeviceCaps = { heavy3D: boolean; ambient: boolean };

export function useDeviceCapabilities(): DeviceCaps {
  const [caps, setCaps] = useState<DeviceCaps>({ heavy3D: false, ambient: false });

  useEffect(() => {
    const evaluate = () => {
      try {
        const nav = navigator as Navigator & {
          connection?: { saveData?: boolean; effectiveType?: string };
          deviceMemory?: number;
        };

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const conn = nav.connection;
        const saveData = !!conn?.saveData;
        const slowNet = /(^|-)2g$/.test(conn?.effectiveType || '');
        const mem = typeof nav.deviceMemory === 'number' ? nav.deviceMemory : undefined;
        const w = window.innerWidth;

        // Preferencias fuertes: si el usuario pide menos movimiento o menos
        // datos, o la red es muy lenta, apagamos todo lo pesado.
        if (reduce || saveData || slowNet) {
          setCaps({ heavy3D: false, ambient: false });
          return;
        }

        // Ambiente ligero: tablet/escritorio con algo de RAM.
        const ambient = w >= 768 && !(mem !== undefined && mem < 2);

        // 3D pesado: pantalla de escritorio, RAM decente y WebGL disponible.
        let heavy3D = false;
        if (w >= 1024 && !(mem !== undefined && mem < 4)) {
          const c = document.createElement('canvas');
          const gl =
            c.getContext('webgl') ||
            c.getContext('experimental-webgl');
          heavy3D = !!gl;
          // liberar el contexto de prueba
          const lose = (gl as WebGLRenderingContext | null)?.getExtension?.('WEBGL_lose_context');
          lose?.loseContext?.();
        }

        setCaps({ heavy3D, ambient });
      } catch {
        setCaps({ heavy3D: false, ambient: false });
      }
    };

    evaluate();
    // Reevaluar si el usuario rota una tablet a horizontal o redimensiona.
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(evaluate, 250);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return caps;
}
