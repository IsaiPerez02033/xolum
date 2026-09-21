"use client";

import { MusicNotes, Robot, Flag, Medal, GraduationCap, Palette } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import Image from "next/image";

// Escenas ilustrativas generadas con IA; no son fotografías de alumnos reales.
type Momento = {
  Icon: typeof MusicNotes;
  label: string;
  sub: string;
  alt: string;
  span?: string;
  img: string;
  position?: string;
};

const MOMENTOS: Momento[] = [
  {
    Icon: MusicNotes,
    label: "Concierto de talento",
    sub: "Pop Talent Concert",
    img: "/images/talleres/concierto.png",
    alt: "Niños con uniforme escolar cantando y tocando instrumentos en un concierto, imagen generada con IA.",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    Icon: Robot,
    label: "Robótica Lego",
    sub: "Ciencia y tecnología",
    img: "/images/talleres/robotica.png",
    alt: "Niños construyendo un robot de piezas en el aula, imagen generada con IA.",
  },
  {
    Icon: Flag,
    label: "Festejos patrios",
    sub: "Identidad y cultura",
    img: "/images/talleres/festejos.png",
    alt: "Niños celebrando con banderas mexicanas en el patio escolar, imagen generada con IA.",
  },
  {
    Icon: Medal,
    label: "Deportes",
    sub: "Salud y disciplina",
    img: "/images/talleres/deportes.png",
    alt: "Niños practicando fútbol con uniforme escolar, imagen generada con IA.",
  },
  {
    Icon: GraduationCap,
    label: "Graduaciones",
    sub: "Logros que se celebran",
    img: "/images/talleres/graduaciones.png",
    alt: "Niños celebrando su graduación con diplomas, imagen generada con IA.",
  },
  {
    Icon: Palette,
    label: "Arte y creatividad",
    span: "sm:col-span-2",
    sub: "Expresión y talento",
    img: "/images/talleres/arte.png",
    alt: "Niños pintando en una clase de arte, imagen generada con IA.",
    position: "center 35%",
  },
];

export default function TalleresSection() {
  return (
    <section id="talleres" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
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
              >
                <Image
                  src={m.img}
                  alt={m.alt}
                  fill
                  sizes={m.span ? "(max-width: 379px) calc(100vw - 48px), (max-width: 639px) calc((100vw - 64px) / 2), (max-width: 1280px) 50vw, 608px" : "(max-width: 379px) calc(100vw - 48px), (max-width: 639px) calc((100vw - 64px) / 2), (max-width: 1280px) 25vw, 296px"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: m.position ?? "center" }}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-blue-dark/95 via-blue-dark/15 to-black/15" />

                <div className="relative z-10 flex h-full flex-col justify-between p-5">
                  <Icon aria-hidden="true" className="h-8 w-8 rounded-lg bg-blue-dark/45 p-1 text-white drop-shadow" />
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

        <p className="mt-4 text-center text-xs text-muted">Imágenes ilustrativas generadas con IA.</p>

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
