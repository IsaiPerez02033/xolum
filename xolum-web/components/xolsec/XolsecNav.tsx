'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from '@phosphor-icons/react';
import { waLink } from '@/lib/data';

export function XolsecNav() {
  const [scrolled, setScrolled] = useState(false);
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
          <div className="flex items-center gap-2.5">
            {/* XOLUM (logo + wordmark) vuelve al sitio principal; XOLSEC se queda
                en su página. XOLUM va con el gradiente de marca para distinguirse
                del wordmark oscuro de XOLSEC: lee como "XOLUM · XOLSEC". */}
            <a
              href="/"
              aria-label="Volver al sitio principal de XOLUM"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <Image src="/xolum-logo.png" alt="XOLUM" width={40} height={40} className="h-9 w-9 object-contain" priority />
              <span className="grad-text text-lg font-extrabold tracking-tight">XOLUM</span>
            </a>
            <span className="text-lg font-extrabold text-[var(--text-muted)]" aria-hidden>·</span>
            <a href="/xolsec#top" className="text-lg font-extrabold tracking-tight text-[var(--text)]">
              XOLSEC
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a href="/" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-soft)] transition-colors hover:text-[var(--text)] sm:flex">
              <ArrowLeft size={15} weight="bold" />
              Volver a XOLUM
            </a>
            <a href={waLink('Hola XOLSEC, quiero cotizar un proyecto de videovigilancia e IA.')} target="_blank" rel="noreferrer" className="btn-brand text-xs font-semibold">
              Cotizar proyecto
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
