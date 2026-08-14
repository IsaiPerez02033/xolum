'use client';

import { proyectos } from '@/lib/data';
import { Reveal } from './Reveal';
import { ArrowUpRight } from '@phosphor-icons/react';

// Marquee doble para loop continuo. Único marquee de la página.
function Row({ items, reverse }: { items: typeof proyectos; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex w-max gap-5 animate-marquee" style={reverse ? { animationDirection: 'reverse' } : undefined}>
      {doubled.map((p, i) => (
        <figure
          key={`${p.nombre}-${i}`}
          className="group relative h-64 w-[340px] shrink-0 overflow-hidden rounded-2xl border border-white/8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/${p.seed}/680/520`}
            alt={p.nombre}
            loading="lazy"
            className="h-full w-full object-cover opacity-55 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-[#06090e]/40 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <div>
              <p className="text-lg font-bold">{p.nombre}</p>
              <p className="text-xs text-[var(--text-muted)]">{p.tipo}</p>
            </div>
            <ArrowUpRight size={20} className="text-brand-300 opacity-0 transition-opacity group-hover:opacity-100" />
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Proyectos() {
  return (
    <section id="proyectos" className="relative overflow-hidden py-24 sm:py-32">
      <div className="shell mb-12">
        <Reveal className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-brand-300">Proyectos</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Marcas que ya confiaron en XOLUM.
          </h2>
          <p className="mt-5 max-w-[58ch] text-lg text-[var(--text-soft)]">
            Desde landings cinematográficas con 3D hasta plataformas de operación completas. Cada proyecto, construido a la medida.
          </p>
        </Reveal>
      </div>

      <div
        className="flex flex-col gap-5"
        style={{ maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}
      >
        <Row items={proyectos} />
        <Row items={[...proyectos].reverse()} reverse />
      </div>
    </section>
  );
}
