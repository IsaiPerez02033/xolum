"use client";

import { Student, Buildings, SealPercent, MegaphoneSimple, ArrowRight } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { waLink, WA_MESSAGES } from "@/lib/site";

const PROMOS = [
  {
    Icon: Student,
    tag: "Si vienes de escuela pública",
    highlight: "Inscripción GRATIS",
    desc: "Cámbiate a Federico Froebel sin pagar inscripción y mejora tu nivel académico.",
  },
  {
    Icon: Buildings,
    tag: "Si vienes de escuela privada",
    highlight: "Inscripción + 1 mes GRATIS",
    desc: "Trasládate sin pagar doble inscripción y con tu primer mes de colegiatura de regalo.",
  },
  {
    Icon: SealPercent,
    tag: "Alumnos de nuevo ingreso",
    highlight: "10% de descuento",
    desc: "Aprovecha el descuento especial en la inscripción para este ciclo escolar.",
  },
];

const BECAS = [
  { prom: "10.0", pct: "50%" },
  { prom: "9.0 – 9.9", pct: "40%" },
  { prom: "8.5 – 8.9", pct: "30%" },
];

export default function AdmisionesSection() {
  return (
    <section
      id="admisiones"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "linear-gradient(160deg, #112567 0%, #1b3aa5 60%, #12277a 100%)" }}
    >
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: "radial-gradient(#fff 1.3px, transparent 1.3px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold/25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-dark">
            <MegaphoneSimple weight="fill" className="h-4 w-4" />
            Inscripciones abiertas
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Tu lugar en Federico Froebel{" "}
            <span className="text-gradient-gold">te está esperando</span>
          </h2>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Contamos con promociones y becas para que más familias sean parte de
            nuestra comunidad educativa.
          </p>
        </Reveal>

        {/* Promociones */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PROMOS.map((promo, i) => {
            const { Icon } = promo;
            return (
              <Reveal
                key={promo.tag}
                delay={i * 0.12}
                className="promo-card rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 "
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/20 text-gold">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-gold-soft">
                  {promo.tag}
                </p>
                <p className="mt-2 font-display text-2xl font-extrabold text-white">
                  {promo.highlight}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {promo.desc}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Becas por promedio */}
        <Reveal className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm sm:p-10" delay={0.1}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                Becas de hasta{" "}
                <span className="text-gold">50%</span> en colegiaturas
              </h3>
              <p className="mt-3 text-sm text-white/75">
                Premiamos el esfuerzo de nuestros alumnos. El porcentaje de beca
                se otorga según el promedio del último ciclo escolar cursado.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-3 sm:max-w-md">
              {BECAS.map((b) => (
                <div
                  key={b.prom}
                  className="rounded-2xl bg-white/95 p-4 text-center card-shadow"
                >
                  <p className="font-display text-3xl font-extrabold text-blue-dark">
                    {b.pct}
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-gold-dark">
                    Promedio
                  </p>
                  <p className="text-sm font-bold text-muted">{b.prom}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/15 pt-8 sm:flex-row sm:justify-between">
            <p className="text-sm text-white/70">
              *Promociones y becas sujetas a los términos del ciclo escolar
              vigente.
            </p>
            <a
              href={waLink(WA_MESSAGES.becas)}
              target="_blank"
              rel="noopener noreferrer"
              className="school-button school-button-gold group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-blue-dark shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white hover:scale-105"
            >
              Quiero mi beca
              <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
