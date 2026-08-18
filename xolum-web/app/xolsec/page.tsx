import type { Metadata } from 'next';
import { XolsecNav } from '@/components/xolsec/XolsecNav';
import { XolsecHero } from '@/components/xolsec/XolsecHero';
import { XolsecServicios } from '@/components/xolsec/XolsecServicios';
import { FrigateDemo } from '@/components/xolsec/FrigateDemo';
import { XolsecCatalogo } from '@/components/xolsec/XolsecCatalogo';
import { XolsecCompromiso } from '@/components/xolsec/XolsecCompromiso';
import { XolsecCTA } from '@/components/xolsec/XolsecCTA';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { xolsecServiceJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'XOLSEC · Videovigilancia con inteligencia artificial',
  description:
    'XOLSEC, la división de seguridad de XOLUM. Cámaras de seguridad y CCTV profesionales con IA en sitio que detecta actividad sospechosa y te alerta al instante por Telegram o WhatsApp.',
  keywords: [
    'cámaras de seguridad',
    'cámaras de videovigilancia',
    'videovigilancia con inteligencia artificial',
    'CCTV con IA',
    'circuito cerrado de televisión',
    'detección de intrusos con IA',
    'cámaras con alertas por WhatsApp',
    'instalación de cámaras México',
    'XOLSEC',
    'XOLUM',
  ],
  alternates: {
    canonical: '/xolsec',
  },
  openGraph: {
    title: 'XOLSEC · Videovigilancia con inteligencia artificial',
    description:
      'Cámaras de seguridad con IA en sitio que detecta actividad sospechosa y alerta al instante por Telegram o WhatsApp.',
    url: 'https://xolum.mx/xolsec',
    siteName: 'XOLUM',
    type: 'website',
    locale: 'es_MX',
  },
};

export default function XolsecPage() {
  // XOLSEC adapta claro/oscuro como el resto del sitio. Su identidad "night-vision"
  // (verde/cyan) se preserva en islas oscuras puntuales: el radar 3D y el feed de
  // alertas, que se muestran como pantallas/monitores oscuros embebidos.
  return (
    <>
      <JsonLd data={xolsecServiceJsonLd} />
      <XolsecNav />
      <main>
        <XolsecHero />
        <XolsecServicios />
        <FrigateDemo />
        <XolsecCatalogo />
        <XolsecCompromiso />
        <XolsecCTA />
      </main>
      <Footer />
    </>
  );
}
