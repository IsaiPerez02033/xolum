"use client";
import { useState } from "react";
import { waLink } from "@/lib/site";

export default function AdmissionsGuide() {
  const [level, setLevel] = useState("Preescolar");
  return <div className="mb-16 grid gap-10 border-b border-white/20 pb-14 lg:grid-cols-[1.2fr_1fr]">
    <div><h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl">Una decisión importante.<br />Vamos paso a paso.</h2><p className="mt-5 max-w-xl leading-relaxed text-white/80">Conoce el colegio y reúne la información que necesitas antes de elegir la siguiente etapa de tu hijo o hija.</p>
    <ol className="mt-8 space-y-6">{[
      ["Cuéntanos qué nivel buscas", "Indica el grado y ciclo de tu interés para consultar disponibilidad, horarios y fechas."],
      ["Conoce el colegio", "Solicita una visita para recorrer los espacios y conversar sobre la propuesta educativa."],
      ["Revisa los detalles de ingreso", "Pide los requisitos, el desglose de costos y las condiciones de los apoyos antes de iniciar tu inscripción."],
    ].map(([title, body], i) => <li key={title} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40 text-sm text-gold">{i + 1}</span><div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 max-w-lg text-sm leading-relaxed text-white/75">{body}</p></div></li>)}</ol></div>
    <div className="self-start rounded-2xl bg-white p-7 text-blue-dark sm:p-9"><h3 className="font-display text-2xl font-bold">Comienza con una conversación</h3><p className="mt-3 text-sm leading-relaxed text-muted">Selecciona el nivel para preparar tu consulta. Al continuar se abrirá WhatsApp; tú decides cuándo enviar el mensaje.</p><label htmlFor="admission-level" className="mt-7 block text-sm font-bold">Nivel educativo</label><select id="admission-level" value={level} onChange={e => setLevel(e.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-silver bg-white px-3 text-base">{["Preescolar", "Primaria", "Secundaria"].map(value => <option key={value}>{value}</option>)}</select><a href={waLink(`Hola, me interesa ${level} en el Centro Educativo Federico Froebel. ¿Podrían compartir disponibilidad para el próximo ingreso, ciclo y fechas, horarios, documentos requeridos y costos desglosados (inscripción, colegiatura, materiales y actividades)? También me gustaría conocer las opciones para visitar el colegio.`)} target="_blank" rel="noopener noreferrer" className="school-button school-button-blue mt-5 flex justify-center px-5 py-3.5 text-center font-bold">Consultar sobre {level}</a><p className="mt-4 text-xs leading-relaxed text-muted">Esta consulta no reserva un lugar ni formaliza una inscripción. El colegio confirma disponibilidad y condiciones.</p></div>
  </div>;
}
