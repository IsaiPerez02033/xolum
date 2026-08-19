import { xolsec, waLink } from '@/lib/data';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';
import { ArrowRight, HardDrives, ShieldCheck } from '@phosphor-icons/react/dist/ssr';

export function XolsecCatalogo() {
  return (
    <section id="catalogo" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="shell relative z-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-emerald-400 font-semibold">
              Catálogo de Hardware 2026
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-[var(--text)]">
              Cámaras de grado industrial y residencial.
            </h2>
            <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-[var(--text-soft)]">
              Elegimos cada equipo por su nitidez, resistencia a la intemperie y capacidad de procesamiento de visión artificial.
            </p>
          </div>
          <a
            href={waLink('Hola XOLSEC, me interesa recibir asesoría sobre el catálogo de cámaras de videovigilancia.')}
            target="_blank"
            rel="noreferrer"
            className="btn-brand bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold"
          >
            <span>Cotizar equipo para mi espacio</span>
            <ArrowRight size={16} weight="bold" />
          </a>
        </Reveal>

        {/* Grid de cámaras con tarjetas adaptativas claro/oscuro */}
        <div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-5">
          {xolsec.camaras.map((c, i) => (
            <Reveal key={c.nombre} delay={(i % 5) * 0.06} className="min-w-[240px] snap-start md:min-w-0">
              <article className="group glass relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-[var(--hair-strong)] p-6 transition-all duration-300 hover:border-emerald-400/50 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.25)]">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.35), transparent 70%)' }}
                  aria-hidden
                />
                <div>
                  <div className="relative mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--hair-strong)] bg-[var(--surface-2)] text-emerald-400 transition-transform duration-300 group-hover:scale-110 shadow-sm">
                      <Icon name={c.icon} size={24} weight="duotone" />
                    </div>
                    <span className="font-mono text-[9.5px] font-semibold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/25">
                      EDGE AI
                    </span>
                  </div>
                  <h3 className="relative text-base font-bold text-[var(--text)] group-hover:text-emerald-400 transition-colors">
                    {c.nombre}
                  </h3>
                  <p className="relative mt-2 text-xs leading-relaxed text-[var(--text-soft)]">
                    {c.desc}
                  </p>
                </div>

                <ul className="relative mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-[var(--hair)]">
                  {c.specs.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-[var(--hair-strong)] bg-[var(--surface-2)] px-2 py-0.5 font-mono text-[10.5px] font-medium text-[var(--text-soft)]"
                    >
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
          <div className="mt-6 glass flex items-center gap-4 rounded-2xl border border-emerald-500/30 p-6 shadow-lg">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <HardDrives size={24} weight="duotone" />
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-soft)]">
                Todos nuestros sistemas incluyen <span className="font-bold text-[var(--text)]">grabación local en NVR de alta seguridad</span> y sincronización en tiempo real con tu dispositivo móvil. Realizamos la canalización, el montaje y la configuración de red desde el primer día.
              </p>
            </div>
            <ShieldCheck size={24} className="text-emerald-400 hidden sm:block shrink-0" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
