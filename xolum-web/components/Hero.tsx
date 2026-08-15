'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkle } from '@phosphor-icons/react';
import dynamic from 'next/dynamic';
import { NetworkCanvas } from './NetworkCanvas';
import { MagneticButton } from './MagneticButton';
import { ScenePoster } from './ScenePoster';
import { useDeviceCapabilities } from '@/lib/capabilities';
import { waLink } from '@/lib/data';

const XolumHeroScene = dynamic(() => import('./XolumHeroScene'), {
  ssr: false,
  loading: () => (
    <div className="stage-dark w-full h-full aspect-square rounded-2xl border border-[#22d3ee]/25 bg-[#070b12] flex items-center justify-center font-mono text-xs text-[#22d3ee]/70">
      CARGANDO XOLUM CORE 3D...
    </div>
  ),
});

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { heavy3D, ambient } = useDeviceCapabilities();

  // Mouse tracking for Spotlight & Multi-layer Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const lerpMouse = useRef({ x: 0, y: 0 });

  // Scroll Interaction
  const { scrollY } = useScroll();
  const heroContentY = useTransform(scrollY, [0, 800], [0, -50]);
  const heroCardY = useTransform(scrollY, [0, 800], [0, -110]);
  const heroBgOpacity = useTransform(scrollY, [0, 600], [1, 0.25]);
  const cardScrollRotate = useTransform(scrollY, [0, 800], [0, 5]);
  // Hoisted (no puede ir dentro de un render condicional por reglas de hooks).
  const gridParallaxY = useTransform(scrollY, [0, 800], [0, -30]);
  const networkParallaxY = useTransform(scrollY, [0, 800], [0, -45]);

  useEffect(() => {
    if (reduce) return;
    // El parallax por cursor sólo tiene sentido con puntero fino (mouse/trackpad).
    // En táctil evitamos un loop rAF permanente que gasta batería sin efecto.
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;

    let rafId: number;
    const animateParallax = () => {
      lerpMouse.current.x += (mousePos.x - lerpMouse.current.x) * 0.06;
      lerpMouse.current.y += (mousePos.y - lerpMouse.current.y) * 0.06;
      rafId = requestAnimationFrame(animateParallax);
    };

    animateParallax();
    return () => cancelAnimationFrame(rafId);
  }, [mousePos, reduce]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y });

    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);
    setMousePos({ x: normX, y: normY });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const rise = (d: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      ref={containerRef}
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-dvh overflow-hidden pt-24 select-none"
    >
      {/* LAYER 0: Dynamic Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(650px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(34, 211, 238, 0.08), transparent 75%)`,
          opacity: spotlightPos.x === 0 && spotlightPos.y === 0 ? 0 : 1,
        }}
        aria-hidden
      />

      {/* LAYER 1: Tech Grid with Parallax */}
      <motion.div
        style={{ opacity: heroBgOpacity, y: gridParallaxY }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 tech-grid transition-transform duration-300 ease-out"
          style={{
            transform: reduce
              ? 'none'
              : `translate3d(${lerpMouse.current.x * -12}px, ${lerpMouse.current.y * -12}px, 0)`,
          }}
          aria-hidden
        />
      </motion.div>

      {/* LAYER 2: Live Network Canvas with Parallax (sólo en equipos capaces) */}
      {ambient && (
        <motion.div
          style={{ opacity: heroBgOpacity, y: networkParallaxY }}
          className="absolute inset-0 opacity-70 z-0"
        >
          <div
            className="w-full h-full transition-transform duration-300 ease-out"
            style={{
              transform: reduce
                ? 'none'
                : `translate3d(${lerpMouse.current.x * -18}px, ${lerpMouse.current.y * -18}px, 0)`,
            }}
          >
            <NetworkCanvas />
          </div>
        </motion.div>
      )}

      {/* LAYER 3: Aurora Glow with Parallax */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 animate-aurora rounded-full opacity-30 blur-[120px] z-0 transition-transform duration-500 ease-out"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, #22d3ee, transparent 60%), radial-gradient(circle at 70% 60%, #10b981, transparent 60%)',
          transform: reduce
            ? 'translateX(-50%)'
            : `translate3d(calc(-50% + ${lerpMouse.current.x * 15}px), ${lerpMouse.current.y * 15}px, 0)`,
        }}
        aria-hidden
      />

      <div className="shell relative z-10 grid min-h-dvh-nav grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LAYER 4: Content Column (Text, Chip, Buttons) */}
        <motion.div
          style={{ y: heroContentY }}
          className="max-w-2xl transition-transform duration-300 ease-out"
        >
          <div
            style={{
              transform: reduce
                ? 'none'
                : `translate3d(${lerpMouse.current.x * 12}px, ${lerpMouse.current.y * 12}px, 0)`,
            }}
          >
            <motion.div {...rise(0)} className="chip mb-6">
              <Sparkle size={14} weight="fill" className="text-brand-300" />
              Estudio de software · {' '}
              <span className="grad-text font-semibold">México</span>
            </motion.div>

            <motion.h1
              {...rise(0.08)}
              className="text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.9rem]"
            >
              El software que tu negocio
              <br />
              <span className="grad-text">opera todos los días.</span>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-6 max-w-[54ch] text-lg leading-relaxed text-[var(--text-soft)]"
            >
              Plataformas a la medida y bots de WhatsApp con IA para tu operación. Más XOLSEC, nuestra división de seguridad con inteligencia artificial.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton
                href={waLink('Hola XOLUM, quiero agendar una llamada.')}
                className="btn-brand group transition-all duration-300 hover:shadow-[0_0_35px_rgba(16,185,129,0.55)]"
                strength={0.35}
              >
                Agenda una llamada
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-110"
                />
              </MagneticButton>

              <MagneticButton href="#servicios" className="btn-ghost group" strength={0.3}>
                Ver lo que hacemos
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* LAYER 5: Main Visual Card (Interactive 3D Card Tilt + Parallax) */}
        <motion.div
          style={{ y: heroCardY, rotateX: cardScrollRotate }}
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block z-10 transition-transform duration-300 ease-out"
        >
          <div
            style={{
              transform: reduce
                ? 'none'
                : `translate3d(${lerpMouse.current.x * 22}px, ${lerpMouse.current.y * 22}px, 0)`,
            }}
            className="w-full h-full"
          >
            {heavy3D ? <XolumHeroScene /> : <ScenePoster variant="core" />}
          </div>
        </motion.div>
      </div>

      <div className="shell relative z-10 -mt-6 hidden pb-6 text-xs text-[var(--text-muted)] lg:block">
        <div className="hairline mb-4 h-px w-full" />
      </div>
    </section>
  );
}
