'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { List, X } from '@phosphor-icons/react';
import { waLink } from '@/lib/data';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#bots', label: 'Bots con IA' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/xolsec', label: 'XOLSEC' },
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
            scrolled ? 'glass' : 'border border-transparent'
          }`}
        >
          <a href="/#top" className="flex items-center gap-2.5">
            <Image src="/xolum-logo.png" alt="XOLUM" width={40} height={40} className="h-9 w-9 object-contain" priority />
            <span className="text-lg font-extrabold tracking-tight">XOLUM</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-soft)] transition-colors hover:text-[var(--text)] ${
                  l.label === 'XOLSEC' ? 'grad-text font-semibold' : ''
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2.5 lg:flex">
            <ThemeToggle />
            <a href={waLink('Hola XOLUM, quiero información sobre sus servicios.')} target="_blank" rel="noreferrer" className="btn-brand text-sm">
              Agenda una llamada
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button onClick={() => setOpen((v) => !v)} aria-label="Menú">
              {open ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 lg:hidden">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-[var(--text-soft)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]">
                {l.label}
              </a>
            ))}
            <a href={waLink('Hola XOLUM, quiero información.')} target="_blank" rel="noreferrer" className="btn-brand mt-1 justify-center">
              Agenda una llamada
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
