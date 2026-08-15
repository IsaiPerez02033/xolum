'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sun, MoonStars } from '@phosphor-icons/react';
import { useTheme } from '@/lib/theme';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      className={`group relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-soft)] transition-colors hover:border-brand-400/50 hover:text-[var(--text)] ${className}`}
    >
      {/* halo de marca al hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.18), transparent 70%)' }}
      />
      {mounted ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ y: 14, opacity: 0, rotate: -35 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 35 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
            className="relative grid place-items-center"
          >
            {isDark ? (
              <MoonStars size={18} weight="fill" className="text-brand-300" />
            ) : (
              <Sun size={18} weight="fill" className="text-amber-500" />
            )}
          </motion.span>
        </AnimatePresence>
      ) : (
        <MoonStars size={18} weight="fill" className="text-brand-300" />
      )}
    </button>
  );
}
