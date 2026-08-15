import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

// Pesos acotados a los que realmente usa el sitio: cada peso extra es un
// archivo de fuente más que descargar en conexiones lentas.
export const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  variable: '--font-sans',
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
  variable: '--font-mono',
});
