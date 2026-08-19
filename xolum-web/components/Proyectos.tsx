'use client';

import { useState } from 'react';
import Image from 'next/image';
import { proyectos } from '@/lib/data';
import { Reveal } from './Reveal';
import { ArrowUpRight, CheckCircle } from '@phosphor-icons/react';

type Proyecto = (typeof proyectos)[number];

function LogoTile({ p }: { p: Proyecto }) {
  return (
    <figure className="stage-dark group relative h-52 w-[280px] shrink-0 overflow-hidden rounded-2xl border border-[var(--hair)] bg-ink-800/60 transition-colors duration-500 hover:border-brand-400/40">
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
              'bg-gradient-to-r from-white via-brand-100 to-brand-300 bg-clip-text text-3xl font-bold text-transparent',
              p.wordClass ?? '',
            ].join(' ')}
          >
            {p.word}
          </span>
        ) : (
          <Image
            src={p.logo!}
            alt={p.nombre}
            width={240}
            height={150}
            sizes="240px"
            className="max-h-full max-w-full object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Etiqueta de tipo, aparece al hover */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-[#06090e] via-[#06090e]/90 to-transparent px-4 pb-3 pt-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
  const [selectedIdx, setSelectedIdx] = useState(0);
  const featured = proyectos[selectedIdx];

  return (
    <section id="proyectos" className="relative overflow-hidden py-24 sm:py-32">
      <div className="shell mb-12">
        <Reveal className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-brand-300">
            Casos de Éxito & Evidencia Técnica
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Soluciones reales construidas para empresas exigentes.
          </h2>
          <p className="mt-5 max-w-[62ch] text-lg text-[var(--text-soft)] leading-relaxed">
            Desde plataformas de gestión con inteligencia artificial hasta portales inmersivos de alto rendimiento. Cada desarrollo responde a un objetivo de negocio medible.
          </p>
        </Reveal>

        {/* Featured Case Study Spotlight */}
        <Reveal delay={0.1} className="mt-12">
          <div className="glass rounded-3xl p-6 sm:p-10 border border-brand-400/20">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-brand-400" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-300">
                    Caso Destacado
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{featured.nombre}</h3>
                <p className="font-mono text-xs text-emerald-400 mt-1 uppercase tracking-wider">
                  {featured.tipo}
                </p>
                <p className="mt-4 text-base text-[var(--text-soft)] leading-relaxed">
                  {featured.resumen}
                </p>

                <div className="mt-6 pt-6 border-t border-[var(--hair)] flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-soft)] bg-[var(--surface-2)] px-3 py-1.5 rounded-full border border-[var(--hair)]">
                    <CheckCircle size={15} className="text-emerald-400" />
                    <span>Código Propietario</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-soft)] bg-[var(--surface-2)] px-3 py-1.5 rounded-full border border-[var(--hair)]">
                    <CheckCircle size={15} className="text-emerald-400" />
                    <span>Integración IA</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-soft)] bg-[var(--surface-2)] px-3 py-1.5 rounded-full border border-[var(--hair)]">
                    <CheckCircle size={15} className="text-emerald-400" />
                    <span>Alta Disponibilidad</span>
                  </div>
                </div>
              </div>

              {/* Selector de proyectos por botones */}
              <div className="flex flex-col gap-2.5">
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-1">
                  Seleccionar Caso de Estudio
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {proyectos.map((p, idx) => (
                    <button
                      key={p.nombre}
                      onClick={() => setSelectedIdx(idx)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold text-left transition-all ${
                        idx === selectedIdx
                          ? 'border border-brand-400 bg-brand-500/20 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'border border-[var(--hair)] bg-[var(--surface)] text-[var(--text-soft)] hover:border-brand-400/30 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{p.nombre}</span>
                      <ArrowUpRight size={14} className={idx === selectedIdx ? 'text-brand-300' : 'opacity-40'} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee Continuo de Confianza */}
      <div className="mt-10">
        <p className="font-mono text-[11px] text-center uppercase tracking-[0.25em] text-[var(--text-muted)] mb-6">
          Marcas que respaldan nuestra ingeniería
        </p>
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
      </div>
    </section>
  );
}
