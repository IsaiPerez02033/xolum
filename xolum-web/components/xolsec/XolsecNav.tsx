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
          <a href="/xolsec#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#06090e]">
              <Image src="/xolsec-logo.png" alt="XOLSEC" width={40} height={40} className="h-full w-full object-contain" priority />
            </span>
            <span className="text-lg font-extrabold tracking-tight">XOLSEC</span>
          </a>

          <div className="flex items-center gap-3">
            <a href="/" className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-soft)] transition-colors hover:text-[var(--text)] sm:flex">
              <ArrowLeft size={15} weight="bold" />
              Volver a XOLUM
            </a>
            <a href={waLink('Hola XOLSEC, quiero cotizar videovigilancia.')} target="_blank" rel="noreferrer" className="btn-brand text-sm">
              Cotizar instalación
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
