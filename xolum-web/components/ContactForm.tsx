'use client';

import { useState } from 'react';
import {
  WhatsappLogo,
  EnvelopeSimple,
  MapPin,
  PaperPlaneTilt,
  CaretDown,
  CheckCircle,
} from '@phosphor-icons/react';
import { Reveal } from './Reveal';
import { waLink, CONTACT } from '@/lib/data';

// Tipos de proyecto que XOLUM realmente entrega. Alimenta el <select> y viaja
// en el mensaje de WhatsApp para que la conversación arranque con contexto.
const TIPOS = [
  'Software a la medida',
  'Bot de WhatsApp con IA',
  'Sitio web / landing',
  'Videovigilancia XOLSEC',
  'No estoy seguro / otro',
] as const;

const EMPTY = { nombre: '', negocio: '', email: '', tipo: '', mensaje: '' };

export function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof EMPTY) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (error) setError(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setError('Déjanos al menos tu nombre para saber cómo dirigirnos a ti.');
      return;
    }
    const lines = [
      '*Nueva solicitud desde XOLUM*',
      '',
      `*Nombre:* ${form.nombre.trim() || '—'}`,
      `*Negocio:* ${form.negocio.trim() || '—'}`,
      `*Email:* ${form.email.trim() || '—'}`,
      `*Qué necesita:* ${form.tipo || '—'}`,
      '',
      '*Mensaje:*',
      form.mensaje.trim() || '—',
    ];
    window.open(waLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section id="contacto" className="relative overflow-hidden py-24 sm:py-32">
      {/* Aura de marca de fondo (coincide con el resto de la página) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[130px]"
        style={{
          background:
            'radial-gradient(circle at 30% 40%, #22d3ee, transparent 60%), radial-gradient(circle at 70% 60%, #10b981, transparent 60%)',
        }}
        aria-hidden
      />

      <div className="shell relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* ── Columna izquierda: mensaje + contacto directo ── */}
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
            Contacto
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Cuéntanos
            <br />
            <span className="grad-text">qué necesitas.</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--text-soft)]">
            Escríbenos cómo operas hoy y qué te gustaría automatizar o proteger.
            Te respondemos con una propuesta concreta, sin compromiso.
          </p>

          <a
            href={waLink('Hola XOLUM, quiero una propuesta para mi negocio.')}
            target="_blank"
            rel="noreferrer"
            className="btn-brand mt-9"
          >
            <WhatsappLogo size={20} weight="fill" />
            Chatear ahora por WhatsApp
          </a>

          {/* Datos de contacto */}
          <div className="mt-10 space-y-5">
            <ContactRow
              icon={<EnvelopeSimple size={18} weight="bold" />}
              label="Email"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
            />
            <ContactRow
              icon={<WhatsappLogo size={18} weight="fill" />}
              label="WhatsApp"
              value={`+${CONTACT.whatsapp.slice(0, 2)} ${CONTACT.whatsapp.slice(2)}`}
              href={waLink('Hola XOLUM 👋')}
            />
            <ContactRow
              icon={<MapPin size={18} weight="bold" />}
              label="Ubicación"
              value={CONTACT.ciudad}
            />
          </div>
        </Reveal>

        {/* ── Columna derecha: formulario ── */}
        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="glass rounded-3xl p-6 sm:p-8"
            noValidate
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Nombre"
                name="nombre"
                placeholder="Tu nombre completo"
                required
                value={form.nombre}
                onChange={set('nombre')}
              />
              <Field
                label="Negocio"
                name="negocio"
                placeholder="Nombre de tu empresa"
                value={form.negocio}
                onChange={set('negocio')}
              />
            </div>

            <div className="mt-5">
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="tucorreo@empresa.mx"
                value={form.email}
                onChange={set('email')}
              />
            </div>

            <div className="mt-5">
              <SelectField
                label="¿Qué necesitas?"
                name="tipo"
                value={form.tipo}
                onChange={set('tipo')}
                options={TIPOS}
              />
            </div>

            <div className="mt-5">
              <Field
                label="Mensaje"
                name="mensaje"
                placeholder="Cuéntanos brevemente qué tienes en mente."
                multiline
                value={form.mensaje}
                onChange={set('mensaje')}
              />
            </div>

            {error && (
              <p className="mt-4 text-sm font-medium text-rose-400" role="alert">
                {error}
              </p>
            )}

            {sent && !error && (
              <p className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-400">
                <CheckCircle size={18} weight="fill" />
                Abrimos WhatsApp con tu mensaje. Si no se abrió, escríbenos directo.
              </p>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="btn-brand flex-1 justify-center">
                <PaperPlaneTilt size={18} weight="fill" />
                Enviar por WhatsApp
              </button>
              <a href={`mailto:${CONTACT.email}`} className="btn-ghost justify-center">
                <EnvelopeSimple size={18} />
                Prefiero email
              </a>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[var(--text-muted)]">
              Al enviar abrimos WhatsApp con tu mensaje listo. Tus datos solo se
              usan para responderte esta solicitud.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--brand-cyan)]">
        {icon}
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          {label}
        </p>
        <p className="text-[var(--text)]">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="block transition-opacity hover:opacity-80"
    >
      {content}
    </a>
  ) : (
    content
  );
}

const fieldClasses =
  'w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[rgba(34,211,238,0.55)] focus:bg-[var(--surface-2)]';

function Field({
  label,
  name,
  placeholder,
  type = 'text',
  multiline,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-soft)]">
        {label}
        {required && <span className="ml-1 text-[var(--brand-cyan)]">*</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClasses} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={fieldClasses}
        />
      )}
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-soft)]">
        {label}
      </span>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClasses} cursor-pointer appearance-none pr-11 ${
            value ? '' : 'text-[var(--text-muted)]'
          }`}
        >
          <option value="" disabled>
            Elige una opción
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-[var(--text)]">
              {o}
            </option>
          ))}
        </select>
        <CaretDown
          size={16}
          weight="bold"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        />
      </div>
    </label>
  );
}
