'use client';

import { useEffect, useRef } from 'react';

/**
 * Constelación de nodos conectados que reaccionan al cursor.
 * Comunica el tema: datos vivos moviéndose por una red. Se apaga con
 * prefers-reduced-motion y se pausa fuera de viewport.
 */
export function NetworkCanvas({ density = 1 }: { density?: number }) {
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

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseRadius: number;
      phase: number;
    };
    type Signal = {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
      isCyan: boolean;
    };

    let nodes: Node[] = [];
    let signals: Signal[] = [];
    const mouse = { x: -9999, y: -9999 };
    let time = 0;

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
      const count = Math.min(Math.floor((w * h) / 14000) * density, 120);

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        baseRadius: 1.2 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      }));

      // Initialize signals traveling on connections
      signals = Array.from({ length: Math.min(12, Math.floor(count / 4)) }, () => ({
        fromIndex: Math.floor(Math.random() * count),
        toIndex: Math.floor(Math.random() * count),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
        isCyan: Math.random() > 0.35,
      }));
    }

    function draw() {
      time += 0.016;
      ctx!.clearRect(0, 0, w, h);
      const linkDist = 145;

      // Update nodes + subtle magnetic field effect
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        const dxm = mouse.x - n.x;
        const dym = mouse.y - n.y;
        const dm = Math.hypot(dxm, dym);

        // Magnetic attraction field towards cursor when within 170px
        if (dm < 170 && dm > 1) {
          const mag = (1 - dm / 170) * 0.35;
          n.x += (dxm / dm) * mag;
          n.y += (dym / dm) * mag;
        }
      }

      // Draw connections & occasional illuminated lines
      const connectedPairs: { i: number; j: number; d: number }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);

          if (d < linkDist) {
            connectedPairs.push({ i, j, d });
            const baseAlpha = (1 - d / linkDist) * 0.38;

            // Occasional organic connection light-up pulse
            const lineHash = (i * 31 + j * 17 + Math.floor(time * 0.8)) % 29;
            const isHighlight = lineHash === 0;
            const alpha = isHighlight ? Math.min(baseAlpha * 2.2, 0.75) : baseAlpha;

            const grad = ctx!.createLinearGradient(a.x, a.y, b.x, b.y);
            if (isHighlight) {
              grad.addColorStop(0, `rgba(34,211,238,${alpha})`);
              grad.addColorStop(0.5, `rgba(16,185,129,${alpha * 1.2})`);
              grad.addColorStop(1, `rgba(34,211,238,${alpha})`);
            } else {
              grad.addColorStop(0, `rgba(34,211,238,${alpha})`);
              grad.addColorStop(1, `rgba(16,185,129,${alpha * 0.8})`);
            }

            ctx!.strokeStyle = grad;
            ctx!.lineWidth = isHighlight ? 1.2 : 0.65;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // Draw traveling signals / data packets along valid connections
      if (connectedPairs.length > 0) {
        for (const sig of signals) {
          sig.progress += sig.speed;
          if (sig.progress >= 1) {
            sig.progress = 0;
            const pair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
            sig.fromIndex = pair.i;
            sig.toIndex = pair.j;
            sig.isCyan = Math.random() > 0.35;
          }

          const n1 = nodes[sig.fromIndex];
          const n2 = nodes[sig.toIndex];
          if (n1 && n2) {
            const sx = n1.x + (n2.x - n1.x) * sig.progress;
            const sy = n1.y + (n2.y - n1.y) * sig.progress;

            ctx!.beginPath();
            ctx!.arc(sx, sy, 1.8, 0, Math.PI * 2);
            ctx!.fillStyle = sig.isCyan ? 'rgba(34,211,238,0.95)' : 'rgba(16,185,129,0.95)';
            ctx!.shadowColor = sig.isCyan ? '#22d3ee' : '#10b981';
            ctx!.shadowBlur = 6;
            ctx!.fill();
            ctx!.shadowBlur = 0;
          }
        }
      }

      // Draw nodes with organic breathing radius & opacity
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const breath = Math.sin(time * 2 + n.phase) * 0.3;
        const radius = Math.max(0.8, n.baseRadius + breath * 0.4);
        const opacity = 0.65 + breath * 0.25;

        ctx!.beginPath();
        ctx!.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = i % 5 === 0 ? `rgba(16,185,129,${opacity})` : `rgba(103,232,249,${opacity})`;
        ctx!.fill();
      }
    }

    let raf = 0;
    let running = true;
    function loop() {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !reduce;
        if (running) loop();
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 }
    );

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    io.observe(canvas);

    if (reduce) draw();
    else loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      io.disconnect();
    };
  }, [density]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
