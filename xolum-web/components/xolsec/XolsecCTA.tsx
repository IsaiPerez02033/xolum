import { waLink } from '@/lib/data';
import { Reveal } from '../Reveal';
import { WhatsappLogo, ArrowLeft, ShieldCheck } from '@phosphor-icons/react/dist/ssr';

export function XolsecCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[140px]"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, #10b981, transparent 60%), radial-gradient(circle at 70% 60%, #22d3ee, transparent 60%)',
        }}
        aria-hidden
      />
      <div className="shell relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono tracking-widest text-emerald-300">
            <ShieldCheck size={16} weight="fill" className="text-emerald-400" />
            <span>DIAGNÓSTICO E INSPECCIÓN DE SEGURIDAD</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl leading-tight">
            Protege tus activos con
            <br />
            <span className="grad-text">inteligencia en tiempo real.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--text-soft)]">
            Compártenos las dimensiones y vulnerabilidades de tu espacio. Diseñamos la arquitectura de cámaras y modelos de detección a la medida de tu operación.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={waLink('Hola XOLSEC, quiero solicitar una propuesta de videovigilancia con inteligencia artificial.')}
              target="_blank"
              rel="noreferrer"
              className="btn-brand bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 text-xs font-semibold"
            >
              <WhatsappLogo size={20} weight="fill" />
              <span>Cotizar proyecto por WhatsApp</span>
            </a>
            <a href="/" className="btn-ghost text-xs inline-flex items-center gap-2">
              <ArrowLeft size={16} />
              <span>Volver a sitio principal XOLUM</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
