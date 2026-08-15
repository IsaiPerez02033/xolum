'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ShieldCheck } from '@phosphor-icons/react';

export function XolsecTeaser() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden py-4">
      <div className="shell">
        <motion.a
          href="/xolsec"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="stage-dark group relative block overflow-hidden rounded-[2rem] border border-[var(--hair)] bg-[#03060a]"
        >
          {/* Fondo: night-vision + barrido de escaneo */}
          <div className="absolute inset-0 tech-grid opacity-40" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: 'radial-gradient(circle at 78% 40%, rgba(16,185,129,0.22), transparent 55%)' }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scanline bg-gradient-to-b from-emerald-400/20 to-transparent" aria-hidden />

          <div className="relative grid items-center gap-8 p-9 sm:p-14 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <div className="chip mb-6 border-emerald-400/30 text-emerald-300">
                <ShieldCheck size={14} weight="fill" />
                División de seguridad de XOLUM
              </div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Conoce <span className="grad-text">XOLSEC</span>
                <br />
                Seguridad que ve, entiende y avisa.
              </h2>
              <p className="mt-5 max-w-[54ch] text-lg text-[var(--text-soft)]">
                Videovigilancia con IA en la cámara: detecta actividad sospechosa y te alerta al instante. Más de 7 empresas ya protegidas.
              </p>
              <span className="btn-brand mt-8">
                Entrar a XOLSEC
                <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>

            <div className="relative mx-auto hidden aspect-square w-full max-w-[260px] lg:block">
              <div className="absolute inset-0 rounded-full border border-emerald-400/20" aria-hidden />
              <div className="absolute inset-6 rounded-full border border-brand-400/20" aria-hidden />
              <div className="absolute inset-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[60px]" aria-hidden />
              <Image src="/xolsec-logo-transparent.png" alt="XOLSEC" width={560} height={658} sizes="260px" className="relative h-full w-full animate-floaty object-contain" />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
