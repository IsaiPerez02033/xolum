import { servicios } from '@/lib/data';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { Check } from '@phosphor-icons/react/dist/ssr';

export function Servicios() {
  return (
    <section id="servicios" className="relative py-24 sm:py-32">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-brand-300">Lo que hacemos</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Tres formas de poner la tecnología a trabajar por ti.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {servicios.map((s, i) => (
            <Reveal key={s.titulo} delay={i * 0.1}>
              <article className="group glass relative flex h-full flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brand-300 transition-colors group-hover:border-brand-500/40">
                  <Icon name={s.icon} size={26} weight="duotone" />
                </div>
                <h3 className="text-xl font-bold">{s.titulo}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[var(--text-soft)]">{s.desc}</p>
                <ul className="mt-6 space-y-2.5 border-t border-white/8 pt-6">
                  {s.puntos.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-[var(--text-soft)]">
                      <Check size={16} weight="bold" className="shrink-0 text-emerald-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
