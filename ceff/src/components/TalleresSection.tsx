"use client";

import { MusicNotes, Robot, Flag, Medal, GraduationCap, Palette } from "@phosphor-icons/react";
import Reveal from "./Reveal";

/*
  Cada "momento" muestra un mosaico de color de marca por defecto.
  Para usar una foto real de la escuela: coloca la imagen en /public
  (por ejemplo /public/vida-1.jpg) y agrega  img: "/vida-1.jpg"  al objeto.
*/
type Momento = {
  Icon: typeof MusicNotes;
  label: string;
  sub: string;
  bg: string;
  span?: string;
  img?: string;
};

const MOMENTOS: Momento[] = [
  {
    Icon: MusicNotes,
    label: "Concierto de talento",
    sub: "Pop Talent Concert",
    bg: "linear-gradient(135deg, #1b3aa5, #3b6fe0)",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    Icon: Robot,
    label: "Robótica Lego",
    sub: "Ciencia y tecnología",
    bg: "linear-gradient(135deg, #d9a406, #f5c518)",
  },
  {
    Icon: Flag,
    label: "Festejos patrios",
    sub: "Identidad y cultura",
    bg: "linear-gradient(135deg, #112567, #1b3aa5)",
  },
  {
    Icon: Medal,
    label: "Deportes",
    sub: "Salud y disciplina",
    bg: "linear-gradient(135deg, #3b6fe0, #1b3aa5)",
  },
  {
    Icon: GraduationCap,
    label: "Graduaciones",
    sub: "Logros que se celebran",
    bg: "linear-gradient(135deg, #1b3aa5, #112567)",
  },
  {
    Icon: Palette,
    label: "Arte y creatividad",
    span: "sm:col-span-2",
    sub: "Expresión y talento",
    bg: "linear-gradient(135deg, #f5c518, #d9a406)",
  },
];

export default function TalleresSection() {
  return (
    <section id="talleres" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-blue/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-blue">
            Talleres y vida escolar
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-blue-dark sm:text-5xl">
            Aprender también es{" "}
            <span className="text-gradient-blue">vivir experiencias</span>
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Conciertos, robótica, deportes, festejos y ceremonias: momentos que
            forman recuerdos y hacen comunidad.
          </p>
        </Reveal>

        <Reveal className="mt-16 grid auto-rows-[190px] grid-cols-1 gap-4 min-[380px]:grid-cols-2 sm:grid-cols-4">
          {MOMENTOS.map((m) => {
            const { Icon } = m;
            return (
              <div
                key={m.label}
                className={`workshop-card group relative overflow-hidden rounded-3xl card-shadow transition-transform duration-300  ${
                  m.span ?? ""
                }`}
                style={m.img ? undefined : { background: m.bg }}
              >
                {m.img && (
                  <img
                    src={m.img}
                    alt={m.label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {m.img && (
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-dark/80 via-blue-dark/20 to-transparent" />
                )}

                {/* Textura */}
                <div
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#fff 1.2px, transparent 1.2px)",
                    backgroundSize: "22px 22px",
                  }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between p-5">
                  <Icon className="h-8 w-8 text-white/90 drop-shadow" />
                  <div>
                    <p className="font-display text-lg font-extrabold leading-tight text-white drop-shadow">
                      {m.label}
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                      {m.sub}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-2.5" delay={0.1}>
          {[
            "Inglés Cambridge",
            "Robótica Lego",
            "Música",
            "Danza",
            "Fútbol",
            "Artes plásticas",
            "Eventos culturales",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-silver/60 bg-surface px-4 py-2 text-xs font-bold text-blue-dark"
            >
              {t}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
