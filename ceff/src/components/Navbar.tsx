"use client";

import { useState, useEffect } from "react";
import { List, X, Phone } from "@phosphor-icons/react";
import { SITE, waLink, WA_MESSAGES } from "@/lib/site";

const NAV_ITEMS = [
  { id: "nosotros", label: "Nosotros" },
  { id: "niveles", label: "Niveles" },
  { id: "oferta", label: "Oferta" },
  { id: "talleres", label: "Talleres" },
  { id: "admisiones", label: "Admisiones" },
  { id: "contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );
    [{ id: "inicio" }, ...NAV_ITEMS].forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const linkClass = (id: string) => {
    const active = activeSection === id;
    return `px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
      active
        ? "bg-blue text-white shadow-md shadow-blue/30"
        : "text-blue-dark/70 hover:text-blue hover:bg-blue/8"
    }`;
  };

  return (
    <nav
      aria-label="Navegación principal"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center transition-all duration-500 w-[calc(100%-1.5rem)] max-w-7xl ${
        isOpen ? "rounded-3xl" : ""
      }`}
    >
      <div
        className={`flex items-center justify-between w-full gap-2 rounded-full border transition-all duration-500 px-3 py-2 ${
          isScrolled || isOpen
            ? "bg-white/90 backdrop-blur-xl border-silver/60 shadow-lg shadow-blue-dark/10"
            : "bg-white/70 backdrop-blur-md border-white/60 shadow-md shadow-blue-dark/5"
        }`}
      >
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2.5 pl-1 pr-2 group">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden ring-2 ring-gold/70 bg-gold shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img
              src="/logo.png"
              alt="Escudo CEFF"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="block shrink-0 leading-tight">
            <span className="block font-display text-[13px] font-extrabold tracking-tight text-blue-dark">
              Federico Froebel
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-gold-dark">
              Excelencia Académica
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5 px-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={linkClass(id)} aria-current={activeSection === id ? "location" : undefined}>
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={waLink(WA_MESSAGES.informes)}
          target="_blank"
          rel="noopener noreferrer"
          className="school-button school-button-gold hidden md:inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-[11px] font-extrabold uppercase tracking-wider text-blue-dark hover:bg-gold-dark hover:text-white transition-all duration-300 shadow-md shadow-gold/40 hover:scale-105"
        >
          <Phone weight="fill" className="h-3.5 w-3.5" />
          Inscríbete
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-silver/60 bg-white text-blue-dark hover:text-blue transition-colors"
        >
          {isOpen ? <X weight="bold" className="h-5 w-5" /> : <List weight="bold" className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-navigation"
        inert={!isOpen}
        className={`lg:hidden w-full overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[460px] opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="rounded-3xl border border-silver/60 bg-white/95 backdrop-blur-xl shadow-xl shadow-blue-dark/10 p-4 flex flex-col gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide text-blue-dark hover:bg-blue/8 hover:text-blue transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href={waLink(WA_MESSAGES.informes)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="school-button school-button-gold mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-blue-dark shadow-md shadow-gold/40"
          >
            <Phone weight="fill" className="h-4 w-4" />
            Informes de inscripción
          </a>
        </div>
      </div>
    </nav>
  );
}
