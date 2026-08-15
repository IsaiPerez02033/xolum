'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { PaperPlaneTilt, Warning, VideoCamera, Info } from '@phosphor-icons/react';
import { xolsec } from '@/lib/data';
import { Reveal } from '../Reveal';

const nivelStyle: Record<string, { ring: string; icon: JSX.Element; tag: string; tagColor: string }> = {
  alto: {
    ring: 'border-rose-400/40 bg-rose-500/5',
    icon: <Warning size={18} weight="fill" className="text-rose-400" />,
    tag: 'ALERTA',
    tagColor: 'text-rose-300',
  },
  medio: {
    ring: 'border-amber-400/30 bg-amber-500/5',
    icon: <VideoCamera size={18} weight="fill" className="text-amber-300" />,
    tag: 'AVISO',
    tagColor: 'text-amber-200',
  },
  info: {
    ring: 'border-emerald-400/30 bg-emerald-500/5',
    icon: <Info size={18} weight="fill" className="text-emerald-300" />,
    tag: 'INFO',
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
      <div className="pointer-events-none absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[130px]" aria-hidden />
      <div className="shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-emerald-300">Caso real</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{xolsec.frigate.titulo}</h2>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-[var(--text-soft)]">{xolsec.frigate.desc}</p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--hair)] pt-8">
            <div>
              <dt className="grad-text text-3xl font-extrabold">&lt; 3 s</dt>
              <dd className="mt-1 text-xs text-[var(--text-muted)]">de detección a alerta</dd>
            </div>
            <div>
              <dt className="grad-text text-3xl font-extrabold">24/7</dt>
              <dd className="mt-1 text-xs text-[var(--text-muted)]">análisis sin descanso</dd>
            </div>
            <div>
              <dt className="grad-text text-3xl font-extrabold">En sitio</dt>
              <dd className="mt-1 text-xs text-[var(--text-muted)]">la IA corre local</dd>
            </div>
          </dl>
        </Reveal>

        {/* Feed de alertas estilo mensajería */}
        <div ref={ref} className="relative mx-auto w-full max-w-[400px]">
          <div className="pointer-events-none absolute -inset-5 rounded-[2.4rem] bg-gradient-to-b from-emerald-500/15 to-brand-500/10 blur-2xl" aria-hidden />
          <div className="glass relative overflow-hidden rounded-[2rem] border border-[var(--hair-strong)]">
            <div className="flex items-center gap-3 border-b border-[var(--hair)] bg-[var(--surface)] px-5 py-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                <PaperPlaneTilt size={18} weight="fill" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Alertas XOLSEC</p>
                <p className="text-[11px] text-[var(--text-muted)]">bot de seguridad</p>
              </div>
            </div>

            <div className="flex min-h-[360px] flex-col gap-3 p-4">
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
                        <span className={`font-mono text-[11px] font-semibold tracking-wide ${st.tagColor}`}>{st.tag}</span>
                      </div>
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">{a.hora}</span>
                    </div>
                    <p className="mt-2.5 text-sm leading-snug text-[var(--text)]">{a.texto}</p>
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
