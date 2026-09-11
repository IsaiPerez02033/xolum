"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { waLink, WA_MESSAGES } from "@/lib/site";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contacto");
    if (!hero || !contact) return;
    let pastHero = false;
    let atContact = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) pastHero = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
        if (entry.target === contact) atContact = entry.isIntersecting;
      });
      setShow(pastHero && !atContact);
    });
    observer.observe(hero);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={waLink(WA_MESSAGES.informes)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`floating-whatsapp ${show ? "is-visible" : ""}`}
    >
      <WhatsappLogo weight="fill" className="h-6 w-6 shrink-0" />
      <span className="hidden text-sm font-bold sm:block">Informes</span>
    </a>
  );
}
