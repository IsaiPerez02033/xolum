import { verticales } from '@/lib/data';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export function Verticales() {
  return (
    <section id="verticales" className="relative border-y border-[var(--hair)] bg-[var(--bg-elevated)]/30 py-24 sm:py-32 overflow-hidden">
      <div className="shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-brand-300">
              Adaptabilidad Multigiro
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
              Una plataforma que se
              <br />
              <span className="grad-text">adapta a tu industria.</span>
            </h2>
            <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-[var(--text-soft)]">
              No importa si operas inventario, agenda médica, comandero de alimentos o cobranza CFDI: la arquitectura de XOLUM se configura a la medida de tu proceso.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
            {verticales.map((v, i) => (
              <Reveal key={v.nombre} delay={(i % 4) * 0.06}>
                <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-[var(--hair)] bg-[var(--surface)] p-5 transition-all duration-300 hover:border-brand-400/50 hover:bg-[var(--surface-2)] hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.2)]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--hair)] bg-[var(--bg)] text-brand-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-200">
                        <Icon name={v.icon} size={22} weight="duotone" />
                      </div>
                      <ArrowUpRight size={14} className="text-[var(--text-muted)] opacity-40 transition-opacity group-hover:opacity-100 group-hover:text-brand-300" />
                    </div>
                    <h3 className="text-sm font-bold leading-tight text-[var(--text)] group-hover:text-brand-300 transition-colors">
                      {v.nombre}
                    </h3>
                    <p className="mt-2 text-xs leading-snug text-[var(--text-muted)]">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
