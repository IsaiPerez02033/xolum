"use client";

import { Robot, Translate, Trophy, Palette, ShieldCheck, UsersThree } from "@phosphor-icons/react";
import Reveal from "./Reveal";

const OFERTA = [
  {
    Icon: Robot,
    title: "Robótica con Lego",
    desc: "Los alumnos crean, programan y resuelven retos reales desarrollando pensamiento lógico y trabajo en equipo.",
    gold: false,
  },
  {
    Icon: Translate,
    title: "Certificaciones Cambridge",
    desc: "Inglés con estándares internacionales y certificaciones que abren puertas dentro y fuera del aula.",
    gold: true,
  },
  {
    Icon: Trophy,
    title: "Deportes",
    desc: "Actividades físicas que fomentan la salud, la disciplina, el compañerismo y el espíritu de superación.",
    gold: false,
  },
  {
    Icon: Palette,
    title: "Actividades culturales",
    desc: "Música, arte y eventos que despiertan la creatividad y la expresión de cada estudiante.",
    gold: true,
  },
  {
    Icon: ShieldCheck,
    title: "Ambiente seguro y familiar",
    desc: "Un espacio cercano donde cada familia es parte de la comunidad Froebel y cada alumno es acompañado con cariño.",
    gold: false,
  },
  {
    Icon: UsersThree,
    title: "Atención personalizada",
    desc: "Docentes comprometidos que conocen a cada alumno y dan seguimiento a su desarrollo y aprendizaje.",
    gold: true,
  },
];

export default function OfertaSection() {
  return (
    <section id="oferta" className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-gold/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">
            Oferta educativa
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-blue-dark sm:text-5xl">
            Mucho más que{" "}
            <span className="text-gradient-gold">un salón de clases</span>
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Formamos alumnos preparados para el mundo real, con habilidades
            académicas, tecnológicas, físicas y humanas.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFERTA.map((item, i) => {
            const { Icon } = item;
            return (
              <Reveal
                key={item.title}
                delay={(i % 3) * 0.1}
                className="feature-card group rounded-3xl border border-silver/50 bg-white p-8 card-shadow transition-all duration-300 "
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                    item.gold
                      ? "bg-gold/20 text-gold-dark"
                      : "bg-blue/12 text-blue"
                  }`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-xl font-extrabold text-blue-dark">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
