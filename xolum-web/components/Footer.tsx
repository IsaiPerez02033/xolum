import Image from 'next/image';
import { CONTACT, waLink } from '@/lib/data';
import { WhatsappLogo, EnvelopeSimple, MapPin } from '@phosphor-icons/react/dist/ssr';

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--hair)] bg-[var(--footer-bg)] pb-10 pt-16">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="/#top" className="flex items-center gap-2.5">
              <Image src="/xolum-logo.png" alt="XOLUM" width={40} height={40} className="h-9 w-9 object-contain" />
              <span className="text-lg font-extrabold tracking-tight">XOLUM</span>
            </a>
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-[var(--text-muted)]">
              Estudio mexicano de software. Plataformas a la medida, automatización con IA y seguridad electrónica con XOLSEC.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text)]">Navegación</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-muted)]">
              <li><a href="/#servicios" className="hover:text-[var(--text)]">Servicios</a></li>
              <li><a href="/#bots" className="hover:text-[var(--text)]">Bots con IA</a></li>
              <li><a href="/#proyectos" className="hover:text-[var(--text)]">Proyectos</a></li>
              <li><a href="/xolsec" className="hover:text-[var(--text)]">XOLSEC · Seguridad</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text)]">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
              <li>
                <a href={waLink('Hola XOLUM.')} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:text-[var(--text)]">
                  <WhatsappLogo size={17} weight="fill" className="text-emerald-400" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 hover:text-[var(--text)]">
                  <EnvelopeSimple size={17} /> {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={17} /> {CONTACT.ciudad}
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-12 h-px w-full" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-[var(--text-muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} XOLUM. Todos los derechos reservados.</p>
          <p className="font-mono">Hecho en México con precisión.</p>
        </div>
      </div>
    </footer>
  );
}
