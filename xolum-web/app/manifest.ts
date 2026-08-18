import type { MetadataRoute } from 'next';

// Manifest PWA: mejora la ficha en móvil (agregar a inicio) y da señales de
// marca a los buscadores. El tema oscuro es el look base del sitio.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'XOLUM · Software, IA y videovigilancia',
    short_name: 'XOLUM',
    description:
      'Estudio mexicano de software: plataformas a la medida, bots de WhatsApp con IA y XOLSEC, videovigilancia con inteligencia artificial.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0f172a',
    lang: 'es-MX',
    icons: [
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
