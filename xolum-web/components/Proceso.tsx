import { proceso } from '@/lib/data';
import { Reveal } from './Reveal';

export function Proceso() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="shell grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <Reveal className="lg:sticky lg:top-28">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-brand-300">Cómo trabajamos</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Sin humo. De tu operación real a software que la sostiene.
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-500/60 via-white/10 to-transparent" aria-hidden />
          <div className="space-y-3">
            {proceso.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="group relative flex gap-6 rounded-2xl p-4 transition-colors hover:bg-white/[0.02]">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/12 bg-[var(--bg)] font-mono text-sm font-semibold text-brand-300 transition-colors group-hover:border-brand-500/50">
                    {p.n}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-bold">{p.titulo}</h3>
                    <p className="mt-1.5 max-w-[52ch] leading-relaxed text-[var(--text-soft)]">{p.desc}</p>
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
