import { stats } from '@/lib/data';
import { CountUp } from './CountUp';
import { Reveal } from './Reveal';

export function Stats() {
  return (
    <section className="relative border-y border-white/5 bg-[var(--bg-elevated)]/40 py-14">
      <div className="shell grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="grad-text">
                <CountUp to={s.valor} suffix={s.sufijo} />
              </span>
            </div>
            <p className="mt-2 text-sm leading-snug text-[var(--text-muted)]">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
