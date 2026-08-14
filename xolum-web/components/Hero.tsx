'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkle } from '@phosphor-icons/react';
import dynamic from 'next/dynamic';
import { NetworkCanvas } from './NetworkCanvas';
import { waLink } from '@/lib/data';

const XolumHeroScene = dynamic(() => import('./XolumHeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full aspect-square rounded-2xl border border-[#22d3ee]/20 bg-[#06090e]/60 flex items-center justify-center font-mono text-xs text-[#22d3ee]/70">
      CARGANDO XOLUM CORE 3D...
    </div>
  ),
});

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (d: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden pt-24">
      {/* Fondo: red viva + grid técnico + aurora */}
      <div className="absolute inset-0 tech-grid" aria-hidden />
      <div className="absolute inset-0 opacity-70" aria-hidden>
        <NetworkCanvas />
      </div>
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[860px] -translate-x-1/2 animate-aurora rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle at 30% 30%, #22d3ee, transparent 60%), radial-gradient(circle at 70% 60%, #10b981, transparent 60%)' }}
        aria-hidden
      />

      <div className="shell relative z-10 grid min-h-[calc(100dvh-6rem)] grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Columna de texto */}
        <div className="max-w-2xl">
          <motion.div {...rise(0)} className="chip mb-6">
            <Sparkle size={14} weight="fill" className="text-brand-300" />
            Estudio de software · {' '}
            <span className="grad-text font-semibold">México</span>
          </motion.div>

          <motion.h1 {...rise(0.08)} className="text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.9rem]">
            El software que tu negocio
            <br />
            <span className="grad-text">opera todos los días.</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-[54ch] text-lg leading-relaxed text-[var(--text-soft)]">
            Plataformas a la medida y bots de WhatsApp con IA para tu operación. Más XOLSEC, nuestra división de seguridad con inteligencia artificial.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-4">
            <a href={waLink('Hola XOLUM, quiero agendar una llamada.')} target="_blank" rel="noreferrer" className="btn-brand">
              Agenda una llamada
              <ArrowRight size={18} weight="bold" />
            </a>
            <a href="#servicios" className="btn-ghost">
              Ver lo que hacemos
            </a>
          </motion.div>
        </div>

        {/* Columna visual: Xolum 3D Constellation Scene */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block"
        >
          <XolumHeroScene />
        </motion.div>
      </div>

      <div className="shell relative z-10 -mt-6 hidden pb-6 text-xs text-[var(--text-muted)] lg:block">
        <div className="hairline mb-4 h-px w-full" />
      </div>
    </section>
  );
}
