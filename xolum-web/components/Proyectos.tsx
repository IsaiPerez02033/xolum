'use client';

import Image from 'next/image';
import { proyectos } from '@/lib/data';
import { Reveal } from './Reveal';

type Proyecto = (typeof proyectos)[number];

function LogoTile({ p }: { p: Proyecto }) {
  return (
    <figure className="stage-dark group relative h-56 w-[300px] shrink-0 overflow-hidden rounded-2xl border border-[var(--hair)] bg-ink-800/60 transition-colors duration-500 hover:border-brand-400/40">
      {/* Placa del logo */}
      <div
        className={[
          'flex h-full w-full items-center justify-center p-8 transition-transform duration-500 group-hover:scale-[1.04]',
          p.variant === 'light' ? 'bg-white' : 'bg-[#060809]',
        ].join(' ')}
      >
        {p.variant === 'word' ? (
          <span
            className={[
              'bg-gradient-to-r from-white via-brand-100 to-brand-300 bg-clip-text text-4xl font-bold text-transparent',
              p.wordClass ?? '',
            ].join(' ')}
          >
            {p.word}
          </span>
        ) : (
          // next/image sirve AVIF/WebP a navegadores modernos y el original a
          // los viejos; en móvil con conexión lenta baja mucho menos peso.
          <Image
            src={p.logo!}
            alt={p.nombre}
            width={252}
            height={160}
            sizes="252px"
            className="max-h-full max-w-full object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Etiqueta de tipo, aparece al hover */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-[#06090e] via-[#06090e]/85 to-transparent px-4 pb-3 pt-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-sm font-semibold text-white">{p.nombre}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-300">{p.tipo}</p>
      </figcaption>
    </figure>
  );
}

// Marquee doble para loop continuo.
function Row({ items, reverse }: { items: Proyecto[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="flex w-max gap-5 animate-marquee"
      style={reverse ? { animationDirection: 'reverse' } : undefined}
    >
      {doubled.map((p, i) => (
        <LogoTile key={`${p.nombre}-${i}`} p={p} />
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
        style={{
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <Row items={[...proyectos]} />
        <Row items={[...proyectos].reverse()} reverse />
      </div>
    </section>
  );
}
