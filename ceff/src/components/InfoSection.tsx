"use client";

import {
  MapPin,
  Phone,
  EnvelopeSimple,
  InstagramLogo,
  FacebookLogo,
  Clock,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { SITE, waLink, WA_MESSAGES } from "@/lib/site";

export default function InfoSection() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    SITE.mapsQuery
  )}&output=embed`;

  return (
    <section id="contacto" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-blue/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-blue">
            Visítanos
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-blue-dark sm:text-5xl">
            Estamos para{" "}
            <span className="text-gradient-blue">recibirte</span>
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Conoce nuestras instalaciones y platícanos sobre tu hijo o hija. Con
            gusto resolvemos todas tus dudas.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Datos de contacto */}
          <Reveal className="flex flex-col gap-4">
            <div className="rounded-3xl border border-silver/50 bg-white p-7 card-shadow">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue/12 text-blue">
                    <MapPin weight="duotone" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                      Dirección
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground/90">
                      {SITE.address}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue/12 text-blue">
                    <Phone weight="duotone" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                      Teléfonos
                    </p>
                    {SITE.phones.map((p) => (
                      <p key={p} className="mt-1 text-sm font-semibold text-foreground/90">
                        {p}
                      </p>
                    ))}
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue/12 text-blue">
                    <EnvelopeSimple weight="duotone" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                      Correo
                    </p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1 block text-sm font-semibold text-blue hover:text-blue-dark transition-colors"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue/12 text-blue">
                    <Clock weight="duotone" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                      Atención
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground/90">
                      Lunes a Viernes · Informes todo el día por WhatsApp
                    </p>
                  </div>
                </li>
              </ul>

              {/* Redes */}
              <div className="mt-7 flex flex-wrap gap-3 border-t border-silver/50 pt-6">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-silver/60 bg-surface px-4 py-2.5 text-sm font-bold text-blue-dark transition-colors hover:border-blue hover:text-blue"
                >
                  <InstagramLogo weight="fill" className="h-4 w-4" />
                  {SITE.instagramHandle}
                </a>
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-silver/60 bg-surface px-4 py-2.5 text-sm font-bold text-blue-dark transition-colors hover:border-blue hover:text-blue"
                >
                  <FacebookLogo weight="fill" className="h-4 w-4" />
                  Facebook
                </a>
              </div>
            </div>

            {/* CTA WhatsApp */}
            <a
              href={waLink(WA_MESSAGES.visita)}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-card group flex items-center justify-between gap-4 rounded-3xl bg-blue p-7 text-white card-shadow transition-all duration-300 hover:bg-blue-dark"
            >
              <div>
                <p className="font-display text-lg font-extrabold">
                  Agenda una visita
                </p>
                <p className="text-sm text-white/75">
                  Escríbenos por WhatsApp y te atendemos al momento.
                </p>
              </div>
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gold text-blue-dark transition-transform duration-300 group-hover:scale-110">
                <WhatsappLogo weight="fill" className="h-6 w-6" />
              </span>
            </a>
          </Reveal>

          {/* Mapa */}
          <Reveal delay={0.12} className="min-h-[420px] overflow-hidden rounded-3xl border border-silver/50 card-shadow">
            <iframe
              title="Ubicación Centro Educativo Federico Froebel"
              src={mapSrc}
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
