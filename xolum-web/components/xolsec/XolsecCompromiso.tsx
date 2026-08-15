import { xolsec, waLink } from '@/lib/data';
import { Reveal } from '../Reveal';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function XolsecCompromiso() {
  return (
    <section className="relative border-y border-[var(--hair)] bg-[var(--bg-elevated)]/30 py-24 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-emerald-300">Más que vender cámaras</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Te acompañamos de la asesoría a la garantía.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {xolsec.compromiso.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-[var(--hair)] bg-[var(--surface)] p-8 transition-colors hover:border-emerald-400/30">
                <span className="grad-text font-mono text-5xl font-extrabold opacity-90">{c.n}</span>
                <h3 className="mt-5 text-xl font-bold">{c.t}</h3>
                <p className="mt-3 leading-relaxed text-[var(--text-soft)]">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12 flex justify-center">
          <a href={waLink('Hola XOLSEC, quiero asesoría para instalar cámaras.')} target="_blank" rel="noreferrer" className="btn-brand">
            Solicita tu asesoría
            <ArrowRight size={18} weight="bold" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
