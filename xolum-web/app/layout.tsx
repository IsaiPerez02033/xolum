import type { Metadata } from 'next';
import { sans, mono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://xolum.mx'),
  title: {
    default: 'XOLUM · Software a la medida y automatización con IA',
    template: '%s · XOLUM',
  },
  description:
    'Estudio mexicano de software. Plataformas a la medida, bots de WhatsApp con IA para almacén, facturación CFDI y citas, y XOLSEC, nuestra división de videovigilancia con inteligencia artificial.',
  keywords: [
    'software a la medida',
    'automatización WhatsApp',
    'bot facturación CFDI',
    'bot almacén',
    'videovigilancia IA',
    'XOLUM',
    'XOLSEC',
    'México',
  ],
  openGraph: {
    title: 'XOLUM · Software a la medida y automatización con IA',
    description:
      'Plataformas a la medida y bots de WhatsApp con IA. XOLSEC: videovigilancia con inteligencia artificial.',
    type: 'website',
    locale: 'es_MX',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <div className="noise" aria-hidden />
        {children}
      </body>
    </html>
  );
}
