import { nosotros } from '@/lib/data';
import { Reveal } from './Reveal';
import { Compass, Eye, Handshake, ShieldCheck, Sparkle, PawPrint } from '@phosphor-icons/react/dist/ssr';
import type { IconProps } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

const valorIcons: Record<string, ComponentType<IconProps>> = {
  Handshake,
  ShieldCheck,
  Sparkle,
};

export function Nosotros() {
  return (
    <section id="nosotros" className="relative overflow-hidden py-24 sm:py-32">
      {/* Resplandor sutil de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
        style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(34,211,238,0.10), transparent 70%)' }}
      />

      <div className="shell">
        {/* Encabezado + origen del nombre */}
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <span className="chip mb-5">
              <PawPrint size={14} weight="fill" className="text-brand-300" />
              Xólotl · el que guía y protege
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              El guardián que nos da <span className="grad-text">nombre</span>.
            </h2>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-[var(--text-soft)]">
              {nosotros.origen}
            </p>
          </Reveal>

          {/* Slogan destacado */}
          <Reveal delay={0.12}>
            <figure className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-30 blur-2xl"
                style={{ background: 'var(--grad-brand)' }}
              />
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand-300">Nuestro lema</p>
              <blockquote className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                <span className="grad-text">{nosotros.slogan}</span>
              </blockquote>
              <p className="mt-5 text-sm leading-relaxed text-[var(--text-soft)]">
                XOLUM construye y acompaña a plena luz. XOLSEC vigila cuando cae la noche. La misma promesa, de día y de noche.
              </p>
            </figure>
          </Reveal>
        </div>

        {/* Misión y Visión */}
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {[
            { icon: Compass, label: 'Misión', texto: nosotros.mision },
            { icon: Eye, label: 'Visión', texto: nosotros.vision },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <article className="group glass flex h-full flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brand-300 transition-colors group-hover:border-brand-500/40">
                  <item.icon size={26} weight="duotone" />
                </div>
                <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-brand-300">{item.label}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-[var(--text)]">{item.texto}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Valores */}
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {nosotros.valores.map((v, i) => {
            const V = valorIcons[v.icon] ?? Sparkle;
            return (
              <Reveal key={v.t} delay={i * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                  <V size={22} weight="duotone" className="mt-0.5 shrink-0 text-emerald-400" />
                  <div>
                    <h4 className="text-[15px] font-semibold text-white">{v.t}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-soft)]">{v.d}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
