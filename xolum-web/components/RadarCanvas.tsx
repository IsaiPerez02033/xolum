'use client';

import { useEffect, useRef } from 'react';

/**
 * Radar de vigilancia: un haz que barre, blips que aparecen y, al ser
 * "detectados" por el haz, se encienden con un cuadro de seguimiento.
 * Es la metáfora visual de XOLSEC: la IA que ve y detecta.
 */
export function RadarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cx = 0;
    let cy = 0;
    let R = 0;

    type Blip = { ang: number; dist: number; lit: number; kind: 'person' | 'car' };
    let blips: Blip[] = [];

    function seed() {
      const n = 7;
      blips = Array.from({ length: n }, () => ({
        ang: Math.random() * Math.PI * 2,
        dist: 0.28 + Math.random() * 0.66,
        lit: 0,
        kind: Math.random() > 0.55 ? 'person' : 'car',
      }));
    }

    function resize() {
      const parent = canvas!.parentElement;
      w = parent ? parent.clientWidth : window.innerWidth;
      h = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + 'px';
      canvas!.style.height = h + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
      R = Math.min(w, h) * 0.46;
    }

    let sweep = 0;

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      // Anillos
      ctx!.strokeStyle = 'rgba(34,211,238,0.10)';
      ctx!.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx!.beginPath();
        ctx!.arc(cx, cy, (R * i) / 4, 0, Math.PI * 2);
        ctx!.stroke();
      }
      // Cruces
      ctx!.beginPath();
      ctx!.moveTo(cx - R, cy);
      ctx!.lineTo(cx + R, cy);
      ctx!.moveTo(cx, cy - R);
      ctx!.lineTo(cx, cy + R);
      ctx!.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx!.stroke();

      // Haz de barrido
      if (typeof ctx!.createConicGradient === 'function') {
        const grad = ctx!.createConicGradient(sweep, cx, cy);
        grad.addColorStop(0, 'rgba(16,185,129,0.28)');
        grad.addColorStop(0.08, 'rgba(16,185,129,0.02)');
        grad.addColorStop(1, 'rgba(16,185,129,0)');
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.arc(cx, cy, R, sweep, sweep + Math.PI * 0.5);
        ctx!.closePath();
        ctx!.fillStyle = grad;
        ctx!.fill();
      }
      // Línea del haz
      ctx!.beginPath();
      ctx!.moveTo(cx, cy);
      ctx!.lineTo(cx + Math.cos(sweep) * R, cy + Math.sin(sweep) * R);
      ctx!.strokeStyle = 'rgba(52,211,153,0.6)';
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // Blips
      for (const b of blips) {
        const bx = cx + Math.cos(b.ang) * b.dist * R;
        const by = cy + Math.sin(b.ang) * b.dist * R;
        let diff = Math.abs(((sweep - b.ang) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2));
        if (diff > Math.PI) diff = Math.PI * 2 - diff;
        if (diff < 0.14) b.lit = 1;
        b.lit *= 0.975;

        if (b.lit > 0.04) {
          const isPerson = b.kind === 'person';
          const color = isPerson ? '52,211,153' : '34,211,238';
          ctx!.beginPath();
          ctx!.arc(bx, by, 3, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${color},${b.lit})`;
          ctx!.fill();
          // Cuadro de seguimiento
          if (b.lit > 0.5) {
            const s = 15;
            ctx!.strokeStyle = `rgba(${color},${b.lit})`;
            ctx!.lineWidth = 1.2;
            ctx!.strokeRect(bx - s, by - s, s * 2, s * 2);
            ctx!.font = '9px monospace';
            ctx!.fillStyle = `rgba(${color},${b.lit})`;
            ctx!.fillText(isPerson ? 'PERSONA' : 'VEHÍCULO', bx - s, by - s - 4);
          }
          // halo
          ctx!.beginPath();
          ctx!.arc(bx, by, 3 + (1 - b.lit) * 18, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(${color},${b.lit * 0.4})`;
          ctx!.stroke();
        }
      }

      // Punto central
      ctx!.beginPath();
      ctx!.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx!.fillStyle = 'rgba(52,211,153,0.9)';
      ctx!.fill();
    }

    let raf = 0;
    let running = true;
    function loop() {
      if (!running) return;
      sweep += 0.012;
      if (sweep > Math.PI * 2) sweep -= Math.PI * 2;
      draw();
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting && !reduce;
        if (running) loop();
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 },
    );

    seed();
    resize();
    window.addEventListener('resize', resize);
    io.observe(canvas);
    if (reduce) draw();
    else loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
