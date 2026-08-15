import type { Metadata } from 'next';
import { XolsecNav } from '@/components/xolsec/XolsecNav';
import { XolsecHero } from '@/components/xolsec/XolsecHero';
import { XolsecServicios } from '@/components/xolsec/XolsecServicios';
import { FrigateDemo } from '@/components/xolsec/FrigateDemo';
import { XolsecCatalogo } from '@/components/xolsec/XolsecCatalogo';
import { XolsecCompromiso } from '@/components/xolsec/XolsecCompromiso';
import { XolsecCTA } from '@/components/xolsec/XolsecCTA';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'XOLSEC · Videovigilancia con inteligencia artificial',
  description:
    'XOLSEC, la división de seguridad de XOLUM. Cámaras CCTV profesionales con IA en sitio que detecta actividad sospechosa y te alerta al instante por Telegram o WhatsApp.',
};

export default function XolsecPage() {
  // XOLSEC conserva su identidad "night-vision": se mantiene en paleta oscura
  // aunque el sitio esté en modo claro (isla .stage-dark).
  return (
    <div className="stage-dark">
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
    </div>
  );
}
