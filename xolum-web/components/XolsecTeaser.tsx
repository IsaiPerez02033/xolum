'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ShieldCheck, Eye } from '@phosphor-icons/react';

export function XolsecTeaser() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden py-8">
      <div className="shell">
        <motion.a
          href="/xolsec"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="stage-dark group relative block overflow-hidden rounded-[2.5rem] border border-emerald-500/30 bg-[#03060a] shadow-[0_0_60px_-15px_rgba(16,185,129,0.25)] transition-all duration-500 hover:border-emerald-400/60 hover:shadow-[0_0_80px_-10px_rgba(16,185,129,0.35)]"
        >
          {/* Fondo: night-vision + barrido de escaneo */}
          <div className="absolute inset-0 tech-grid opacity-40" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: 'radial-gradient(circle at 78% 40%, rgba(16,185,129,0.25), transparent 55%)' }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scanline bg-gradient-to-b from-emerald-400/20 to-transparent" aria-hidden />

          <div className="relative grid items-center gap-8 p-9 sm:p-14 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-emerald-300 backdrop-blur-md">
                <ShieldCheck size={16} weight="fill" className="text-emerald-400" />
                <span>DIVISIÓN DE CIBERSEGURIDAD & VIDEOVIGILANCIA IA</span>
              </div>
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl text-white">
                Conoce <span className="grad-text">XOLSEC</span>
                <br />
                Seguridad electrónica con visión artificial en sitio.
              </h2>
              <p className="mt-5 max-w-[54ch] text-lg text-[var(--text-soft)] leading-relaxed">
                Videovigilancia inteligente con modelos Edge AI integrados en la cámara. Detecta intrusos fuera de horario y transmite alertas prioritarias por Telegram o WhatsApp en segundos.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span className="btn-brand bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500">
                  Explorar división XOLSEC
                  <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1.5" />
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                  <Eye size={16} />
                  <span>MONITOREO EDGE 24/7</span>
                </span>
              </div>
            </div>

            <div className="relative mx-auto hidden aspect-square w-full max-w-[260px] lg:block">
              <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-pulse" aria-hidden />
              <div className="absolute inset-6 rounded-full border border-brand-400/20" aria-hidden />
              <div className="absolute inset-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/25 blur-[60px]" aria-hidden />
              <Image src="/xolsec-logo-transparent.png" alt="XOLSEC" width={560} height={658} sizes="260px" className="relative h-full w-full animate-floaty object-contain" />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
