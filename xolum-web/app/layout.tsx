import type { Metadata } from 'next';
import { sans, mono } from '@/lib/fonts';
import { ThemeProvider } from '@/lib/theme';
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
    <html lang="es" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript + fallbackScript }} />
      </head>
      <body>
        <ThemeProvider>
          <div className="noise" aria-hidden />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
