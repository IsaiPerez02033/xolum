'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { PaperPlaneTilt, Warning, VideoCamera, Info, Eye } from '@phosphor-icons/react';
import { xolsec } from '@/lib/data';
import { Reveal } from '../Reveal';

const nivelStyle: Record<string, { ring: string; icon: JSX.Element; tag: string; tagColor: string }> = {
  alto: {
    ring: 'border-rose-500/40 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.2)]',
    icon: <Warning size={18} weight="fill" className="text-rose-400" />,
    tag: 'ALERTA PRIORITARIA',
    tagColor: 'text-rose-300',
  },
  medio: {
    ring: 'border-amber-400/40 bg-amber-500/10',
    icon: <VideoCamera size={18} weight="fill" className="text-amber-300" />,
    tag: 'REGISTRO DE EVENTO',
    tagColor: 'text-amber-200',
  },
  info: {
    ring: 'border-emerald-400/40 bg-emerald-500/10',
    icon: <Info size={18} weight="fill" className="text-emerald-300" />,
    tag: 'EVIDENCIA ADJUNTA',
    tagColor: 'text-emerald-200',
  },
};

export function FrigateDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduce) {
      setShown(xolsec.frigate.alertas.length);
      return;
    }
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= xolsec.frigate.alertas.length) clearInterval(id);
    }, 900);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <section id="deteccion" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[140px]" aria-hidden />
      <div className="shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono tracking-widest text-emerald-300">
            <Eye size={14} className="text-emerald-400 animate-pulse" />
            <span>DEMO DE VISIÓN POR COMPUTADORA EN SITIO</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">{xolsec.frigate.titulo}</h2>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-[var(--text-soft)]">{xolsec.frigate.desc}</p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--hair)] pt-8">
            <div>
              <dt className="grad-text text-3xl font-extrabold">&lt; 3 s</dt>
              <dd className="mt-1 text-xs font-mono uppercase text-[var(--text-muted)]">Transmisión de Alerta</dd>
            </div>
            <div>
              <dt className="grad-text text-3xl font-extrabold">30 FPS</dt>
              <dd className="mt-1 text-xs font-mono uppercase text-[var(--text-muted)]">Procesamiento Local</dd>
            </div>
            <div>
              <dt className="grad-text text-3xl font-extrabold">Edge AI</dt>
              <dd className="mt-1 text-xs font-mono uppercase text-[var(--text-muted)]">Análisis Sin Nube</dd>
            </div>
          </dl>
        </Reveal>

        {/* Feed de alertas estilo mensajería y consola táctica */}
        <div ref={ref} className="relative mx-auto w-full max-w-[420px]">
          <div className="pointer-events-none absolute -inset-5 rounded-[2.6rem] bg-gradient-to-b from-emerald-500/20 to-brand-500/10 blur-2xl" aria-hidden />
          <div className="stage-dark relative overflow-hidden rounded-[2.2rem] border border-emerald-500/30 bg-[#05080e] shadow-2xl">
            {/* Header Telemetría Console */}
            <div className="flex items-center justify-between border-b border-emerald-500/20 bg-[#070c14] px-4 py-2 font-mono text-[9px] text-emerald-300">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                CAM_ZONE_01 // DETECCIÓN ACTIVA
              </span>
              <span>MODELO: YOLO-V8 / NVR-01</span>
            </div>

            <div className="flex items-center gap-3 border-b border-[var(--hair)] bg-[var(--surface-2)] px-5 py-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                <PaperPlaneTilt size={18} weight="fill" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-white">Bot de Seguridad XOLSEC</p>
                <p className="text-[11px] font-mono text-emerald-400">Canal Telegram Cifrado</p>
              </div>
            </div>

            <div className="flex min-h-[370px] flex-col gap-3 p-4 bg-[#04070c]">
              {xolsec.frigate.alertas.slice(0, shown).map((a, i) => {
                const st = nivelStyle[a.nivel];
                return (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`rounded-2xl border p-4 ${st.ring}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {st.icon}
                        <span className={`font-mono text-[10.5px] font-bold tracking-wide ${st.tagColor}`}>{st.tag}</span>
                      </div>
                      <span className="font-mono text-[10.5px] text-[var(--text-muted)]">{a.hora} HRS</span>
                    </div>
                    <p className="mt-2.5 text-xs sm:text-sm leading-snug text-white font-medium">{a.texto}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
