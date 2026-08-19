'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { List, X, ShieldCheck } from '@phosphor-icons/react';
import { waLink } from '@/lib/data';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#bots', label: 'Bots IA' },
  { href: '/#proyectos', label: 'Casos de Éxito' },
  { href: '/#proceso', label: 'Ingeniería' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/xolsec', label: 'XOLSEC', badge: true },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="shell">
        <nav
          className={`mt-3 flex h-16 items-center justify-between rounded-2xl px-4 transition-all duration-300 ${
            scrolled ? 'glass border-brand-400/20 shadow-xl backdrop-blur-xl' : 'border border-transparent bg-transparent'
          }`}
        >
          <a href="/#top" className="flex items-center gap-2.5 group">
            <Image
              src="/xolum-logo.png"
              alt="XOLUM"
              width={40}
              height={40}
              className="h-9 w-9 object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-brand-300 transition-colors">
              XOLUM
            </span>
          </a>

          <div className="hidden items-center gap-1.5 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                  l.badge
                    ? 'inline-flex items-center gap-1.5 border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                    : 'text-[var(--text-soft)] hover:bg-[var(--surface-2)] hover:text-white'
                }`}
              >
                {l.badge && <ShieldCheck size={14} weight="fill" className="text-emerald-400" />}
                <span>{l.label}</span>
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <a
              href={waLink('Hola XOLUM, quiero agendar un diagnóstico técnico sin costo.')}
              target="_blank"
              rel="noreferrer"
              className="btn-brand text-xs font-semibold"
            >
              Diagnóstico sin costo
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menú principal"
              className="p-2 text-[var(--text)] hover:text-brand-300"
            >
              {open ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass mt-2 flex flex-col gap-1.5 rounded-2xl p-4 lg:hidden border border-brand-400/20 shadow-2xl">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  l.badge
                    ? 'border border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
                    : 'text-[var(--text-soft)] hover:bg-[var(--surface-2)] hover:text-white'
                }`}
              >
                <span>{l.label}</span>
                {l.badge && <ShieldCheck size={16} weight="fill" className="text-emerald-400" />}
              </a>
            ))}
            <a
              href={waLink('Hola XOLUM, quiero información sobre sus servicios.')}
              target="_blank"
              rel="noreferrer"
              className="btn-brand mt-2 justify-center text-xs"
            >
              Diagnóstico sin costo
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
