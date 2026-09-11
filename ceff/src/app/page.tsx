import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NosotrosSequence from "@/components/NosotrosSequence";
import NivelesSection from "@/components/NivelesSection";
import OfertaSection from "@/components/OfertaSection";
import TalleresSection from "@/components/TalleresSection";
import AdmisionesSection from "@/components/AdmisionesSection";
import InfoSection from "@/components/InfoSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { InstagramLogo, FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/site";

const FOOTER_LINKS = [
  { id: "nosotros", label: "Nosotros" },
  { id: "niveles", label: "Niveles" },
  { id: "oferta", label: "Oferta" },
  { id: "talleres", label: "Talleres" },
  { id: "admisiones", label: "Admisiones" },
  { id: "contacto", label: "Contacto" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <main id="contenido">
      <Hero />
      <NosotrosSequence />
      <NivelesSection />
      <OfertaSection />
      <TalleresSection />
      <AdmisionesSection />
      <InfoSection />
      </main>
      <FloatingWhatsApp />

      {/* Footer */}
      <footer className="relative overflow-hidden bg-blue-dark text-white">
        <div className="ribbon-accent h-1.5 w-full" />
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
            {/* Marca */}
            <div className="max-w-sm">
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gold ring-2 ring-white/30">
                  <img src="/logo.png" alt="Escudo CEFF" className="h-full w-full object-contain p-0.5" />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-base font-extrabold">
                    Centro Educativo
                  </p>
                  <p className="font-display text-base font-extrabold text-gold">
                    Federico Froebel
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-white/70">{SITE.tagline}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">
                {SITE.motto}
              </p>
            </div>

            {/* Enlaces */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">
                Navegación
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      className="text-white/75 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div className="max-w-xs">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-soft">
                Contacto
              </p>
              <p className="mt-4 text-sm text-white/75">{SITE.address}</p>
              <p className="mt-2 text-sm text-white/75">
                {SITE.phones.join(" · ")}
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 block text-sm text-white/75 transition-colors hover:text-gold"
              >
                {SITE.email}
              </a>
              <div className="mt-5 flex justify-center gap-3 lg:justify-start">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-all duration-300 hover:scale-110 hover:border-transparent hover:text-white hover:bg-gradient-to-br hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:shadow-[0_0_22px_rgba(214,41,118,0.7)]"
                >
                  <InstagramLogo weight="fill" className="h-5 w-5" />
                </a>
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-all duration-300 hover:scale-110 hover:border-transparent hover:text-white hover:bg-[#1877F2] hover:shadow-[0_0_22px_rgba(24,119,242,0.75)]"
                >
                  <FacebookLogo weight="fill" className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8 text-center">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Centro Educativo Federico Froebel.
              Todos los derechos reservados.
              <br />
              Diseñado por{" "}
              <a
                href="https://portafolio-chi-tawny-37.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold hover:underline"
              >
                Aram Perez
              </a>{" "}
              ·{" "}
              <a
                href="https://xolum.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold hover:underline"
              >
                XOLUM
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
