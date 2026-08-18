import type { MetadataRoute } from 'next';

// Mapa del sitio para buscadores. Al agregar páginas nuevas (blog, servicios),
// súmalas aquí. La URL base sale de metadataBase (https://xolum.mx).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://xolum.mx';
  const ahora = new Date();
  return [
    {
      url: base,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/xolsec`,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
