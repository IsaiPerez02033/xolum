import { xolsec } from '@/lib/data';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

export function XolsecServicios() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{xolsec.claim}</h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[var(--text-soft)]">{xolsec.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {xolsec.servicios.map((s, i) => (
            <Reveal key={s.titulo} delay={(i % 2) * 0.08}>
              <article className="group glass flex h-full gap-5 rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-emerald-300 transition-colors group-hover:border-emerald-400/40">
                  <Icon name={s.icon} size={26} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{s.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-soft)]">{s.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
