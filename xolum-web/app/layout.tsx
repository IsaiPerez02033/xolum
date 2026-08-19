import type { Metadata } from 'next';
import { sans, mono } from '@/lib/fonts';
import { ThemeProvider } from '@/lib/theme';
import { JsonLd } from '@/components/JsonLd';
import { organizationJsonLd } from '@/lib/seo';
import { DebugOverlay } from '@/lib/graphics/DebugOverlay';
import './globals.css';

// Se ejecuta antes del primer paint para aplicar el tema guardado sin parpadeo.
// Es ES5 puro: corre incluso en navegadores viejos (Windows 7/XP) donde el
// bundle moderno de React no ejecuta.
const themeScript = `(function(){try{var s=localStorage.getItem('xolum-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var a=(s==='light'||(s==='system'&&!d))?'light':'dark';var r=document.documentElement;r.classList.add(a);r.style.colorScheme=a;}catch(e){document.documentElement.classList.add('dark');}})();`;

// Red de seguridad: las animaciones de entrada dejan el contenido con
// opacity:0 inline (SSR de Motion). Si en 4s React no hidrató —navegador
// viejo sin soporte del bundle, JS bloqueado o dispositivo muy lento— se
// fuerza la visibilidad del contenido vía CSS (.static-fallback en globals).
const fallbackScript = `setTimeout(function(){var r=document.documentElement;if(!r.hasAttribute('data-hydrated')){r.className+=' static-fallback';}},4000);`;

export const metadata: Metadata = {
  metadataBase: new URL('https://xolum.mx'),
  title: {
    default: 'XOLUM · Software a la medida y automatización con IA',
    template: '%s · XOLUM',
  },
  description:
    'Estudio mexicano de software. Plataformas y aplicaciones a la medida, chatbots de WhatsApp con inteligencia artificial para almacén, facturación CFDI y citas, y XOLSEC, nuestra división de videovigilancia con cámaras e IA.',
  applicationName: 'XOLUM',
  authors: [{ name: 'XOLUM', url: 'https://xolum.mx' }],
  creator: 'XOLUM',
  publisher: 'XOLUM',
  category: 'technology',
  keywords: [
    'software a la medida',
    'desarrollo de software México',
    'desarrollo de aplicaciones',
    'aplicaciones web y móviles',
    'páginas web profesionales',
    'inteligencia artificial para empresas',
    'chatbots con inteligencia artificial',
    'chatbot de WhatsApp',
    'bots de WhatsApp con IA',
    'automatización con IA',
    'automatización de WhatsApp',
    'bot de facturación CFDI',
    'facturación CFDI por WhatsApp',
    'bot de almacén e inventario',
    'sistema de citas y reservas',
    'cámaras de seguridad',
    'cámaras de videovigilancia',
    'videovigilancia con inteligencia artificial',
    'CCTV con IA',
    'circuito cerrado de televisión',
    'detección de intrusos con IA',
    'XOLUM',
    'XOLSEC',
    'México',
    'PyMEs',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'XOLUM · Software a la medida y automatización con IA',
    description:
      'Plataformas y aplicaciones a la medida, chatbots de WhatsApp con IA y XOLSEC: videovigilancia con cámaras e inteligencia artificial.',
    url: 'https://xolum.mx',
    siteName: 'XOLUM',
    type: 'website',
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XOLUM · Software a la medida y automatización con IA',
    description:
      'Software a la medida, chatbots de WhatsApp con IA y videovigilancia con inteligencia artificial (XOLSEC).',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript + fallbackScript }} />
        <JsonLd data={organizationJsonLd} />
      </head>
      <body>
        <ThemeProvider>
          <div className="noise" aria-hidden />
          {children}
          <DebugOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
