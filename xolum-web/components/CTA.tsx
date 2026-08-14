import { waLink, CONTACT } from '@/lib/data';
import { Reveal } from './Reveal';
import { WhatsappLogo, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';

export function CTA() {
  return (
    <section id="contacto" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ background: 'radial-gradient(circle at 30% 40%, #22d3ee, transparent 60%), radial-gradient(circle at 70% 60%, #10b981, transparent 60%)' }}
        aria-hidden
      />
      <div className="shell relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            ¿Listo para que tu negocio
            <br />
            <span className="grad-text">trabaje con menos fricción?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg text-[var(--text-soft)]">
            Cuéntanos cómo operas hoy. Te respondemos con una propuesta concreta, sin compromiso.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={waLink('Hola XOLUM, quiero una propuesta para mi negocio.')} target="_blank" rel="noreferrer" className="btn-brand">
              <WhatsappLogo size={20} weight="fill" />
              Escríbenos por WhatsApp
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn-ghost">
              <EnvelopeSimple size={18} />
              {CONTACT.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
