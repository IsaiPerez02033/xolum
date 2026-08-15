/**
 * Póster estático (CSS/SVG, sin JS ni WebGL) que sustituye a las escenas 3D
 * cuando el dispositivo no puede con ellas: sin WebGL, poca RAM, ahorro de
 * datos o "reducir movimiento". Mantiene el mismo marco (aspect-square) para
 * que no haya salto de layout al mejorar a 3D en equipos capaces.
 */

type Variant = 'core' | 'radar';

export function ScenePoster({ variant }: { variant: Variant }) {
  const isRadar = variant === 'radar';
  const ring = isRadar ? '#10b981' : '#22d3ee';
  const glow = isRadar ? 'rgba(16,185,129,0.28)' : 'rgba(34,211,238,0.26)';

  return (
    <div
      className="stage-dark relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border bg-[#070b12] shadow-[0_0_50px_-18px_rgba(16,185,129,0.35)] select-none"
      style={{ borderColor: `${ring}40`, aspectRatio: '1 / 1' }}
      aria-hidden
    >
      {/* Rejilla estática */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />

      {/* Anillos concéntricos + núcleo */}
      <svg viewBox="0 0 200 200" className="relative h-[78%] w-[78%]" role="presentation">
        <defs>
          <radialGradient id={`poster-core-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ring} stopOpacity="0.9" />
            <stop offset="45%" stopColor={isRadar ? '#10b981' : '#06b6d4'} stopOpacity="0.55" />
            <stop offset="100%" stopColor={ring} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`poster-line-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {[86, 64, 42].map((r) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={ring}
            strokeOpacity={0.28}
            strokeWidth="1"
          />
        ))}

        {isRadar ? (
          <>
            {/* Cruz + barrido estático del radar */}
            <line x1="14" y1="100" x2="186" y2="100" stroke={ring} strokeOpacity="0.22" strokeWidth="1" />
            <line x1="100" y1="14" x2="100" y2="186" stroke={ring} strokeOpacity="0.22" strokeWidth="1" />
            <path d="M100 100 L100 20 A80 80 0 0 1 168 60 Z" fill={`url(#poster-core-${variant})`} opacity="0.5" />
          </>
        ) : (
          <polygon
            points="100,44 148,72 148,128 100,156 52,128 52,72"
            fill="none"
            stroke={`url(#poster-line-${variant})`}
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
        )}

        <circle cx="100" cy="100" r="30" fill={`url(#poster-core-${variant})`} />
        <circle cx="100" cy="100" r="6" fill={ring} />
      </svg>

      {/* Resplandor central */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }}
      />

      {/* HUD superior */}
      <div
        className="pointer-events-none absolute left-3 right-3 top-3 flex items-center justify-between font-mono text-[10px]"
        style={{ color: `${ring}cc` }}
      >
        <span className="flex items-center gap-2 font-bold tracking-widest">
          <span className="h-2 w-2 rounded-full" style={{ background: ring }} />
          {isRadar ? 'PTZ-CAM-01' : 'XOLUM // CORE'}
        </span>
        <span className="tracking-widest">{isRadar ? 'ARMADO' : 'ONLINE'}</span>
      </div>

      {/* HUD inferior */}
      <div
        className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[9px]"
        style={{ color: `${ring}99` }}
      >
        <span>{isRadar ? 'IA EN SITIO' : 'NODOS: 128'}</span>
        <span>SYS_OK</span>
      </div>
    </div>
  );
}
