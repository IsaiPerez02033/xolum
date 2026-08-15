'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
  resolvedTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'xolum-theme';

function applyThemeToDOM(actual: 'dark' | 'light') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle('dark', actual === 'dark');
  root.classList.toggle('light', actual === 'light');
  root.style.colorScheme = actual;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default 'dark' preserva la identidad dark-tech de XOLUM.
  const [theme, setThemeState] = useState<Theme>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      const initial: Theme = saved && ['dark', 'light', 'system'].includes(saved) ? saved : 'dark';
      const actual: 'dark' | 'light' =
        initial === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : initial;
      setThemeState(initial);
      setResolvedTheme(actual);
      applyThemeToDOM(actual);
    } catch {}
  }, []);

  const setTheme = useCallback((next: Theme) => {
    const actual: 'dark' | 'light' =
      next === 'system'
        ? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : next;
    applyThemeToDOM(actual);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    setThemeState(next);
    setResolvedTheme(actual);
  }, []);

  const toggle = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  // Si el usuario está en 'system', reacciona a los cambios del SO.
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const actual = mq.matches ? 'dark' : 'light';
      applyThemeToDOM(actual);
      setResolvedTheme(actual);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggle, resolvedTheme }),
    [theme, setTheme, toggle, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  return ctx;
}
