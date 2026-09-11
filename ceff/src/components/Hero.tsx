"use client";

import { GraduationCap, MapPin, ArrowRight } from "@phosphor-icons/react";
import { SITE, waLink, WA_MESSAGES } from "@/lib/site";
import ScrollBadge from "./ScrollBadge";

const LEVELS = ["Preescolar", "Primaria", "Secundaria"];
const HIGHLIGHTS = ["Robótica Lego", "Cambridge", "Deportes", "Cultura"];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-surface via-white to-white pt-28 pb-16"
    >
      {/* Foto de la fachada de la escuela, muy sutil de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/fachada.jpg"
          fetchPriority="high"
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
        {/* Velo blanco para legibilidad: más denso arriba y difuminado a blanco abajo */}
        <div className="absolute inset-0 bg-white/[0.85]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-transparent to-white" />
      </div>

      {/* Fondo decorativo dinámico (blobs que se desplazan lentamente) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-blob animate-drift-a -top-24 -left-24 h-80 w-80 bg-blue/15 md:h-[26rem] md:w-[26rem]" />
        <div className="hero-blob animate-drift-b -bottom-28 -right-16 h-80 w-80 bg-gold/25 md:h-[30rem] md:w-[30rem]" />
        <div className="hero-blob animate-drift-c top-1/3 left-1/2 h-64 w-64 bg-blue-light/12 md:h-[22rem] md:w-[22rem]" />
      </div>
      <div className="absolute inset-0 dot-grid opacity-70" />

      <div className="hero-anim relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Insignia superior */}
        <div className="hero-item inline-flex items-center gap-2 rounded-full border border-blue/15 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue shadow-sm backdrop-blur">
          <MapPin weight="fill" className="h-3.5 w-3.5 text-gold-dark" />
          {SITE.city}
        </div>

        {/* Escudo con halo de luz */}
        <div className="hero-item relative mx-auto mt-8 mb-7 flex h-32 w-32 items-center justify-center md:h-40 md:w-40">
          <span
            aria-hidden
            className="absolute inset-0 -z-10 scale-[1.7] rounded-full bg-gold/35 blur-2xl"
          />
          <span
            aria-hidden
            className="absolute inset-0 -z-10 scale-[1.25] rounded-full bg-blue/10 blur-xl"
          />
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gold ring-4 ring-white card-shadow-lg animate-floaty">
            <img
              src="/logo.png"
              alt="Escudo Centro Educativo Federico Froebel"
              className="h-full w-full object-contain p-1"
            />
          </div>
        </div>

        <h1 className="hero-item font-display leading-[0.98] text-blue-dark">
          <span className="block text-xl font-semibold uppercase tracking-[0.14em] text-blue sm:text-2xl lg:text-[1.9rem]">
            Centro Educativo
          </span>
          <span className="mt-1 block text-5xl font-black uppercase tracking-[-0.02em] text-gradient-blue sm:text-7xl lg:text-[5.5rem]">
            Federico Froebel
          </span>
        </h1>

        <p className="hero-item font-serif mx-auto mt-6 max-w-xl text-lg italic text-blue/75 sm:text-2xl">
          {SITE.motto}
        </p>

        <p className="hero-item mx-auto mt-4 max-w-lg text-base text-muted sm:text-lg">
          {SITE.tagline}
        </p>

        {/* Niveles (clickables) */}
        <div className="hero-item mt-7 flex flex-wrap items-center justify-center gap-2.5">
          {LEVELS.map((lvl) => (
            <a
              key={lvl}
              href="#niveles"
              className="group inline-flex items-center gap-1.5 rounded-full border border-blue/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-dark card-shadow transition-all duration-300 hover:-translate-y-0.5 hover:border-blue/40 hover:text-blue"
            >
              <GraduationCap
                weight="duotone"
                className="h-4 w-4 text-blue transition-transform duration-300 group-hover:scale-110"
              />
              {lvl}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-item mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href={waLink(WA_MESSAGES.informes)}
            target="_blank"
            rel="noopener noreferrer"
            className="school-button school-button-blue group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-blue px-8 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white hover:bg-blue-dark transition-all duration-300 shadow-lg shadow-blue/30 hover:scale-105"
          >
            Informes de inscripción
            <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#niveles"
            className="school-button school-button-outline w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-blue/20 bg-white px-8 py-3.5 text-sm font-extrabold uppercase tracking-wide text-blue hover:border-blue hover:bg-blue/5 transition-all duration-300"
          >
            Conoce los niveles
          </a>
        </div>

        {/* Franja de valor */}
        <div className="hero-item mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-muted/80">
          {HIGHLIGHTS.map((h, i) => (
            <span key={h} className="inline-flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-gold" />}
              {h}
            </span>
          ))}
        </div>

        {/* Indicador de scroll */}
        <div className="hero-item mt-11 flex justify-center sm:mt-14">
          <ScrollBadge />
        </div>
      </div>
    </section>
  );
}
