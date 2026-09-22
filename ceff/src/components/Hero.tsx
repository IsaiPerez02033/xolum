import Image from "next/image";
import HeroCrest from "./HeroCrest";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SITE, waLink, WA_MESSAGES } from "@/lib/site";

export default function Hero() {
  return (
    <section id="inicio" className="bg-white pt-28 pb-14 sm:pt-36 sm:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div className="text-center sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <HeroCrest />
            <h1 className="min-w-0 font-display font-extrabold text-blue-dark">
              <span className="block text-xl font-semibold leading-snug sm:text-2xl">Centro Educativo</span>
              <span className="mt-2 block text-[clamp(2.25rem,3.7vw,3.25rem)] leading-[1.08] text-blue">Federico<br />Froebel</span>
            </h1>
          </div>
          <p className="mx-auto mt-6 max-w-lg text-base sm:mx-0 sm:text-lg leading-relaxed text-muted">Preescolar, primaria y secundaria en Teoloyucan. {SITE.tagline}</p>
          <p className="mt-4 font-serif text-lg sm:text-xl italic text-blue-dark">{SITE.motto}.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-start">
            <a href={waLink(WA_MESSAGES.visita)} target="_blank" rel="noopener noreferrer" className="school-button school-button-blue inline-flex items-center justify-center gap-3 px-6 py-3.5 font-bold">Agenda una visita <ArrowRight aria-hidden className="h-5 w-5" /></a>
            <a href="#niveles" className="school-button school-button-outline inline-flex items-center justify-center border px-6 py-3.5 font-bold text-blue">Explora los niveles</a>
          </div>
          <p className="mt-4 text-sm text-muted">Coordina tu visita por WhatsApp con el colegio.</p>
        </div>
        <figure className="overflow-hidden rounded-2xl bg-cream">
          <div className="relative aspect-[4/3]"><Image src="/fachada.jpg" alt="Fachada del Centro Educativo Federico Froebel en Teoloyucan" fill preload sizes="(max-width: 1023px) 100vw, 600px" className="object-cover" /></div>
          <figcaption className="flex flex-wrap justify-between gap-2 px-5 py-4 text-sm text-blue-dark"><span className="font-bold">Aquí comienza su siguiente etapa.</span><span>Teoloyucan, Estado de México</span></figcaption>
        </figure>
      </div>
    </section>
  );
}
