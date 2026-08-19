import { servicios } from '@/lib/data';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { Check, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { waLink } from '@/lib/data';

export function Servicios() {
  return (
    <section id="servicios" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow accent */}
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-brand-500/10 blur-[140px]"
        aria-hidden
      />

      <div className="shell relative z-10">
        <Reveal className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-brand-300">
            Arquitectura & Soluciones
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Ingeniería diseñada para resolver cuellos de botella reales.
          </h2>
          <p className="mt-5 max-w-[62ch] text-lg text-[var(--text-soft)] leading-relaxed">
            Combinamos desarrollo de plataformas, inteligencia artificial y gráficos de alto rendimiento para entregar sistemas listos para producción.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {servicios.map((s, i) => (
            <Reveal key={s.titulo} delay={i * 0.1}>
              <article className="group glass relative flex h-full flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400/40 hover:shadow-[0_15px_45px_-15px_rgba(6,182,212,0.25)]">
                {/* Header Icon + Number Tag */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--hair-strong)] bg-[var(--surface-2)] text-brand-300 transition-colors duration-300 group-hover:border-brand-400/50 group-hover:bg-brand-500/10 group-hover:text-brand-200">
                    <Icon name={s.icon} size={28} weight="duotone" />
                  </div>
                  <span className="font-mono text-xs font-bold tracking-widest text-[var(--text-muted)] group-hover:text-brand-300 transition-colors">
                    0{i + 1} // TECH
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold tracking-tight text-[var(--text)] group-hover:text-brand-300 transition-colors">
                  {s.titulo}
                </h3>
                <p className="mt-3.5 flex-1 text-[14.5px] leading-relaxed text-[var(--text-soft)]">
                  {s.desc}
                </p>

                {/* Bullet Points */}
                <ul className="mt-6 space-y-2.5 border-t border-[var(--hair)] pt-6">
                  {s.puntos.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-soft)] font-medium">
                      <Check size={16} weight="bold" className="shrink-0 text-emerald-400" />
                      {p}
                    </li>
                  ))}
                </ul>

                {/* Direct Action Link */}
                <div className="mt-8 pt-4 border-t border-[var(--hair)] flex items-center justify-between">
                  <a
                    href={waLink(`Hola XOLUM, requiero información sobre ${s.titulo}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-brand-300 transition-all group-hover:translate-x-1 group-hover:text-brand-200"
                  >
                    <span>Consultar solución</span>
                    <ArrowRight size={14} weight="bold" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
