'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ShieldCheck, Eye } from '@phosphor-icons/react';
import dynamic from 'next/dynamic';
import { ScenePoster } from '../ScenePoster';
import { useDeviceCapabilities } from '@/lib/capabilities';
import { waLink } from '@/lib/data';

const XolsecHeroScene = dynamic(() => import('./XolsecHeroScene'), {
  ssr: false,
  loading: () => (
    <div className="stage-dark w-full h-full aspect-square rounded-2xl border border-[#10b981]/25 bg-[#070b12] flex items-center justify-center font-mono text-xs text-[#10b981]/70">
      CARGANDO RADAR TÁCTICO 3D...
    </div>
  ),
});

export function XolsecHero() {
  const reduce = useReducedMotion();
  const { heavy3D } = useDeviceCapabilities();
  const rise = (d: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="top" className="relative min-h-dvh overflow-hidden pt-24">
      <div className="absolute inset-0 tech-grid opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: 'radial-gradient(circle at 72% 45%, rgba(16,185,129,0.18), transparent 55%)' }}
        aria-hidden
      />
      {/* Barrido superior tipo cámara nocturna */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 animate-scanline bg-gradient-to-b from-emerald-400/10 to-transparent" aria-hidden />

      <div className="shell relative z-10 grid min-h-dvh-nav grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <motion.div {...rise(0)} className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono tracking-widest text-emerald-300 backdrop-blur-md">
            <ShieldCheck size={16} weight="fill" className="text-emerald-400" />
            <span>XOLSEC // DIVISIÓN DE CIBERSEGURIDAD & IA</span>
          </motion.div>

          <motion.h1 {...rise(0.08)} className="text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.9rem]">
            Seguridad que ve,
            <br />
            entiende <span className="grad-text">y te avisa al instante.</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-[54ch] text-lg leading-relaxed text-[var(--text-soft)]">
            Sistemas de videovigilancia profesional con modelos de inteligencia artificial procesados localmente en sitio. Discriminan falsas alarmas y notifican eventos críticos a tu celular en menos de 3 segundos.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={waLink('Hola XOLSEC, me interesa cotizar un proyecto de videovigilancia con inteligencia artificial.')}
              target="_blank"
              rel="noreferrer"
              className="btn-brand bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 text-xs font-semibold"
            >
              <span>Cotizar proyecto de seguridad</span>
              <ArrowRight size={18} weight="bold" />
            </a>
            <a href="#deteccion" className="btn-ghost text-xs inline-flex items-center gap-2">
              <Eye size={16} className="text-emerald-400" />
              <span>Ver demo de IA</span>
            </a>
          </motion.div>
        </div>

        {/* Radar 3D / Fallback Estático */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-[520px] lg:block"
        >
          {heavy3D ? <XolsecHeroScene /> : <ScenePoster variant="radar" />}
        </motion.div>
      </div>
    </section>
  );
}
