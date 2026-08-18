import type { MetadataRoute } from 'next';

// Reglas para los crawlers: se permite indexar todo el sitio y se apunta al
// sitemap para que descubran las páginas.
export default function robots(): MetadataRoute.Robots {
  const base = 'https://xolum.mx';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
