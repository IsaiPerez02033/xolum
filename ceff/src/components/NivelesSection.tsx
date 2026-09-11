"use client";

import { Baby, BookOpen, Compass, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { waLink, WA_MESSAGES } from "@/lib/site";

const NIVELES = [
  {
    Icon: Baby,
    name: "Preescolar",
    grades: "Kinder · 3 a 5 años",
    tint: "from-gold/15 to-gold/5",
    ring: "ring-gold/40",
    iconBg: "bg-gold/20 text-gold-dark",
    desc: "Los primeros pasos con amor. Un entorno seguro donde despierta la curiosidad y el gusto por aprender.",
    points: [
      "Desarrollo socioemocional y motriz",
      "Lectoescritura y pensamiento lógico inicial",
      "Inglés desde los primeros años",
      "Aprendizaje a través del juego",
    ],
  },
  {
    Icon: BookOpen,
    name: "Primaria",
    grades: "1° a 6° grado",
    tint: "from-blue/12 to-blue/5",
    ring: "ring-blue/40",
    iconBg: "bg-blue/15 text-blue",
    desc: "Bases sólidas para toda la vida. Fortalecemos hábitos de estudio, valores y pensamiento crítico.",
    points: [
      "Comprensión lectora y matemáticas",
      "Robótica con Lego",
      "Inglés con enfoque Cambridge",
      "Deporte, arte y valores",
    ],
  },
  {
    Icon: Compass,
    name: "Secundaria",
    grades: "1° a 3° grado",
    tint: "from-blue-dark/12 to-blue-dark/5",
    ring: "ring-blue-dark/40",
    iconBg: "bg-blue-dark/15 text-blue-dark",
    desc: "Preparados para su futuro. Un nivel académico exigente que forma jóvenes seguros y responsables.",
    points: [
      "Certificaciones Cambridge",
      "Tecnología y robótica",
      "Orientación vocacional",
      "Actividades culturales y deportivas",
    ],
  },
];

export default function NivelesSection() {
  return (
    <section id="niveles" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-blue/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-blue">
            Niveles educativos
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-blue-dark sm:text-5xl">
            Un camino completo,{" "}
            <span className="text-gradient-blue">de kinder a secundaria</span>
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Acompañamos a tu hijo o hija en cada etapa de su crecimiento, con un
            proyecto educativo continuo y coherente.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {NIVELES.map((nivel, i) => {
            const { Icon } = nivel;
            return (
              <Reveal
                key={nivel.name}
                delay={i * 0.12}
                className={`level-card group relative flex flex-col rounded-3xl border border-silver/50 bg-gradient-to-b ${nivel.tint} p-8 card-shadow transition-all duration-300 `}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${nivel.iconBg} ring-1 ${nivel.ring}`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold text-blue-dark">
                  {nivel.name}
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gold-dark">
                  {nivel.grades}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {nivel.desc}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {nivel.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle weight="fill" className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(WA_MESSAGES.informes)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="level-link mt-auto pt-8 inline-flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-wide text-blue transition-colors hover:text-blue-dark"
                >
                  Solicitar informes
                  <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
