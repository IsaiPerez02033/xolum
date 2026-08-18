import { CONTACT } from './data';

const SITE = 'https://xolum.mx';

// Organization + WebSite: identidad de XOLUM para el Knowledge Graph de Google.
// Va en el layout raíz (aplica a todas las páginas).
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'XOLUM',
      url: SITE,
      logo: `${SITE}/icon-512.png`,
      image: `${SITE}/icon-512.png`,
      description:
        'Estudio mexicano de software: plataformas y aplicaciones a la medida, chatbots de WhatsApp con inteligencia artificial y videovigilancia con IA (XOLSEC).',
      email: CONTACT.email,
      areaServed: 'MX',
      address: {
        '@type': 'PostalAddress',
        addressLocality: CONTACT.ciudad,
        addressCountry: 'MX',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: CONTACT.email,
        areaServed: 'MX',
        availableLanguage: ['Spanish'],
      },
      knowsAbout: [
        'Desarrollo de software a la medida',
        'Inteligencia artificial',
        'Chatbots de WhatsApp',
        'Facturación CFDI',
        'Videovigilancia con IA',
        'Cámaras de seguridad',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'XOLUM',
      publisher: { '@id': `${SITE}/#organization` },
      inLanguage: 'es-MX',
    },
  ],
};

// Service de XOLSEC: la división de videovigilancia con IA. Va en /xolsec.
export const xolsecServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/xolsec/#service`,
  serviceType: 'Videovigilancia con inteligencia artificial',
  name: 'XOLSEC · Videovigilancia con IA',
  description:
    'Cámaras CCTV profesionales con inteligencia artificial en sitio que detecta actividad sospechosa y alerta al instante por Telegram o WhatsApp.',
  url: `${SITE}/xolsec`,
  areaServed: 'MX',
  provider: {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'XOLSEC',
  },
  category: ['Videovigilancia', 'Seguridad electrónica', 'CCTV con IA'],
};
