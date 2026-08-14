import { verticales } from '@/lib/data';
import { Icon } from './Icon';
import { Reveal } from './Reveal';

export function Verticales() {
  return (
    <section className="relative border-y border-white/5 bg-[var(--bg-elevated)]/30 py-24 sm:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Una plataforma que se
              <br />
              <span className="grad-text">adapta a tu giro.</span>
            </h2>
            <p className="mt-5 max-w-[42ch] leading-relaxed text-[var(--text-soft)]">
              No importa el rubro: el mismo motor de citas, inventario, cobros y automatización se moldea a cómo trabaja tu empresa.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {verticales.map((v, i) => (
              <Reveal key={v.nombre} delay={(i % 4) * 0.06}>
                <div className="group h-full rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-all duration-300 hover:border-brand-500/40 hover:bg-white/[0.04]">
                  <Icon name={v.icon} size={24} weight="duotone" className="text-brand-300 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="mt-4 text-sm font-semibold leading-tight">{v.nombre}</h3>
                  <p className="mt-1.5 text-xs leading-snug text-[var(--text-muted)]">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
