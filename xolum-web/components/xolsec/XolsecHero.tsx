'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ShieldCheck } from '@phosphor-icons/react';
import dynamic from 'next/dynamic';
import { waLink } from '@/lib/data';

const XolsecHeroScene = dynamic(() => import('./XolsecHeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full aspect-square rounded-2xl border border-[#10b981]/20 bg-[#06090e]/60 flex items-center justify-center font-mono text-xs text-[#10b981]/70">
      CARGANDO RADAR 3D...
    </div>
  ),
});

export function XolsecHero() {
  const reduce = useReducedMotion();
  const rise = (d: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden pt-24">
      <div className="absolute inset-0 tech-grid opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: 'radial-gradient(circle at 72% 45%, rgba(16,185,129,0.16), transparent 55%)' }}
        aria-hidden
      />
      {/* Barrido superior tipo cámara nocturna */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 animate-scanline bg-gradient-to-b from-emerald-400/10 to-transparent" aria-hidden />

      <div className="shell relative z-10 grid min-h-[calc(100dvh-6rem)] grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <motion.div {...rise(0)} className="chip mb-6 border-emerald-400/30 text-emerald-300">
            <ShieldCheck size={14} weight="fill" />
            División de seguridad de XOLUM
          </motion.div>

          <motion.h1 {...rise(0.08)} className="text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.9rem]">
            Seguridad que ve,
            <br />
            entiende <span className="grad-text">y te avisa.</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-[54ch] text-lg leading-relaxed text-[var(--text-soft)]">
            Videovigilancia profesional con inteligencia artificial en la cámara. No solo grabamos: detectamos actividad sospechosa y te alertamos al instante.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-4">
            <a href={waLink('Hola XOLSEC, quiero cotizar un sistema de videovigilancia.')} target="_blank" rel="noreferrer" className="btn-brand">
              Cotizar instalación
              <ArrowRight size={18} weight="bold" />
            </a>
            <a href="#deteccion" className="btn-ghost">
              Ver la IA en acción
            </a>
          </motion.div>
        </div>

        {/* Radar 3D */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block"
        >
          <XolsecHeroScene />
        </motion.div>
      </div>
    </section>
  );
}
