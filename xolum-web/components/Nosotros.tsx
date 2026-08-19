import { nosotros } from '@/lib/data';
import { Reveal } from './Reveal';
import { Compass, Eye, Handshake, ShieldCheck, Sparkle, Shield } from '@phosphor-icons/react/dist/ssr';
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
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[450px]"
        style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(34,211,238,0.12), transparent 70%)' }}
      />

      <div className="shell relative z-10">
        {/* Encabezado + origen del nombre */}
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3.5 py-1 text-xs font-mono tracking-widest text-brand-300 backdrop-blur-md">
              <Shield size={14} weight="fill" className="text-brand-300" />
              <span>XÓLOTL // IDENTIDAD Y MANIFIESTO</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
              Ingeniería inspirada en el guardián que nos <span className="grad-text">da nombre</span>.
            </h2>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-[var(--text-soft)]">
              {nosotros.origen}
            </p>
          </Reveal>

          {/* Slogan destacado con diseño de tarjeta editorial */}
          <Reveal delay={0.12}>
            <figure className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10 border border-brand-400/20">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-30 blur-2xl"
                style={{ background: 'var(--grad-brand)' }}
              />
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-300">Lema Corporativo</p>
              <blockquote className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                <span className="grad-text">{nosotros.slogan}</span>
              </blockquote>
              <p className="mt-5 text-sm leading-relaxed text-[var(--text-soft)]">
                XOLUM construye plataformas y automatizaciones que aceleran tu crecimiento a plena luz. XOLSEC resguarda tus instalaciones y activos cuando cae la noche. La misma fiabilidad de ingeniería, 24 horas al día.
              </p>
            </figure>
          </Reveal>
        </div>

        {/* Misión y Visión */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {[
            { icon: Compass, label: 'Misión Tecnológica', texto: nosotros.mision },
            { icon: Eye, label: 'Visión de Futuro', texto: nosotros.vision },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <article className="group glass flex h-full flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--hair)] bg-[var(--surface-2)] text-brand-300 transition-colors group-hover:border-brand-400/50 group-hover:bg-brand-500/10">
                  <item.icon size={28} weight="duotone" />
                </div>
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-brand-300">{item.label}</h3>
                <p className="mt-3 text-lg leading-relaxed text-[var(--text)] font-medium">{item.texto}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Valores */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {nosotros.valores.map((v, i) => {
            const V = valorIcons[v.icon] ?? Sparkle;
            return (
              <Reveal key={v.t} delay={i * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-[var(--hair)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-brand-400/30">
                  <V size={24} weight="duotone" className="mt-0.5 shrink-0 text-emerald-400" />
                  <div>
                    <h4 className="text-base font-bold text-[var(--text)]">{v.t}</h4>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[var(--text-soft)]">{v.d}</p>
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
