import { waLink, CONTACT } from '@/lib/data';
import { Reveal } from '../Reveal';
import { WhatsappLogo, ArrowLeft } from '@phosphor-icons/react/dist/ssr';

export function XolsecCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ background: 'radial-gradient(circle at 40% 40%, #10b981, transparent 60%), radial-gradient(circle at 70% 60%, #22d3ee, transparent 60%)' }}
        aria-hidden
      />
      <div className="shell relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Protege lo tuyo con
            <br />
            <span className="grad-text">ojos que sí piensan.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[50ch] text-lg text-[var(--text-soft)]">
            Cuéntanos qué espacio quieres cuidar. Te armamos una propuesta con el equipo correcto y la IA adecuada.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={waLink('Hola XOLSEC, quiero proteger mi negocio con videovigilancia e IA.')} target="_blank" rel="noreferrer" className="btn-brand">
              <WhatsappLogo size={20} weight="fill" />
              Cotizar por WhatsApp
            </a>
            <a href="/" className="btn-ghost">
              <ArrowLeft size={18} />
              Volver a XOLUM
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
