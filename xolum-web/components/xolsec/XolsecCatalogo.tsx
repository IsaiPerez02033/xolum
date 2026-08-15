import { xolsec, waLink } from '@/lib/data';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';
import { ArrowRight, HardDrives } from '@phosphor-icons/react/dist/ssr';

export function XolsecCatalogo() {
  return (
    <section id="catalogo" className="relative py-24 sm:py-28">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-emerald-300">Catálogo 2026</p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Una cámara para cada rincón.
            </h2>
            <p className="mt-4 max-w-[54ch] leading-relaxed text-[var(--text-soft)]">
              Elegimos cada equipo por su calidad y confiabilidad, y te ayudamos a escoger el correcto para tu espacio.
            </p>
          </div>
          <a href={waLink('Hola XOLSEC, quiero ver el catálogo de cámaras 2026.')} target="_blank" rel="noreferrer" className="btn-ghost">
            Ver catálogo completo
            <ArrowRight size={16} weight="bold" />
          </a>
        </Reveal>

        {/* Scroll horizontal en móvil, grid en escritorio */}
        <div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-5">
          {xolsec.camaras.map((c, i) => (
            <Reveal key={c.nombre} delay={(i % 5) * 0.06} className="min-w-[240px] snap-start md:min-w-0">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-[var(--hair)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-emerald-400/40 hover:bg-[var(--surface)]">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.4), transparent 70%)' }}
                  aria-hidden
                />
                <div className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--hair)] bg-[var(--surface-2)] text-emerald-300 transition-transform duration-300 group-hover:scale-110">
                  <Icon name={c.icon} size={24} weight="duotone" />
                </div>
                <h3 className="relative text-lg font-bold">{c.nombre}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-[var(--text-soft)]">{c.desc}</p>
                <ul className="relative mt-4 flex flex-wrap gap-1.5">
                  {c.specs.map((s) => (
                    <li key={s} className="rounded-md border border-[var(--hair)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--text-muted)]">
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Nota de grabación / NVR */}
        <Reveal delay={0.1}>
          <div className="mt-4 flex items-center gap-4 rounded-2xl border border-[var(--hair)] bg-[var(--bg-elevated)]/40 px-6 py-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--hair)] bg-[var(--surface-2)] text-brand-300">
              <HardDrives size={22} weight="duotone" />
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-soft)]">
              Todo se integra con <span className="font-semibold text-[var(--text)]">grabación en NVR</span> y monitoreo desde tu celular. Nosotros instalamos, configuramos y dejamos el acceso remoto listo desde el primer día.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
