import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SITE, waLink, WA_MESSAGES } from "@/lib/site";

export default function Hero() {
  return (
    <section id="inicio" className="bg-cream pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <h1 className="font-display text-[clamp(2.6rem,5.1vw,4.8rem)] font-extrabold leading-[1.04] text-blue-dark">Centro Educativo <span className="block text-blue">Federico Froebel</span></h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">Preescolar, primaria y secundaria en Teoloyucan. {SITE.tagline}</p>
          <p className="mt-5 font-serif text-xl italic text-blue-dark">{SITE.motto}.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waLink(WA_MESSAGES.visita)} target="_blank" rel="noopener noreferrer" className="school-button school-button-blue inline-flex items-center justify-center gap-3 px-6 py-3.5 font-bold">Agenda una visita <ArrowRight aria-hidden className="h-5 w-5" /></a>
            <a href="#niveles" className="school-button school-button-outline inline-flex items-center justify-center border px-6 py-3.5 font-bold text-blue">Explora los niveles</a>
          </div>
          <p className="mt-4 text-sm text-muted">Coordina tu visita por WhatsApp con el colegio.</p>
        </div>
        <figure className="overflow-hidden rounded-2xl bg-white">
          <div className="relative aspect-[4/3]"><Image src="/fachada.jpg" alt="Fachada del Centro Educativo Federico Froebel en Teoloyucan" fill preload sizes="(max-width: 1023px) 100vw, 600px" className="object-cover" /></div>
          <figcaption className="flex flex-wrap justify-between gap-2 px-5 py-4 text-sm text-blue-dark"><span className="font-bold">Aquí comienza su siguiente etapa.</span><span>Teoloyucan, Estado de México</span></figcaption>
        </figure>
      </div>
    </section>
  );
}
