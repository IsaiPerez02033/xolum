import { proceso } from '@/lib/data';
import { Reveal } from './Reveal';
import { Cpu, Blueprint, Code, Gauge } from '@phosphor-icons/react/dist/ssr';

const stepIcons = [Blueprint, Cpu, Code, Gauge];

export function Proceso() {
  return (
    <section id="proceso" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-brand-300">
            Pipeline de Ingeniería
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
            Metodología clara. De tu flujo operativo a código en producción.
          </h2>
          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-[var(--text-soft)]">
            Construimos software mediante una arquitectura rigurosa: desde la auditoría inicial de requerimientos hasta el monitoreo continuo de infraestructura.
          </p>
          <div className="mt-8 hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-mono text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SOPORTE Y MANTENIMIENTO CONTINUO INCLUIDO</span>
            </div>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical Pipeline Connector Line */}
          <div
            className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand-400 via-brand-500/40 to-emerald-500/40"
            aria-hidden
          />

          <div className="space-y-4">
            {proceso.map((p, i) => {
              const IconComp = stepIcons[i % stepIcons.length];
              return (
                <Reveal key={p.n} delay={i * 0.08}>
                  <div className="group glass relative flex gap-6 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:border-brand-400/40 hover:-translate-y-1">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-400/30 bg-[#070c14] font-mono text-sm font-bold text-brand-300 transition-colors group-hover:border-brand-400 group-hover:bg-brand-500/20 group-hover:text-white shadow-lg">
                      <IconComp size={24} weight="duotone" />
                    </div>
                    <div className="pt-0.5 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-brand-300 tracking-widest uppercase">
                          FASE {p.n}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                          ESTÁNDAR ISO/IEEE
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[var(--text)] group-hover:text-brand-300 transition-colors">
                        {p.titulo}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
