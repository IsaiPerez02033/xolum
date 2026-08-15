import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Servicios } from '@/components/Servicios';
import { BotsShowcase } from '@/components/BotsShowcase';
import { Verticales } from '@/components/Verticales';
import { Proyectos } from '@/components/Proyectos';
import { Proceso } from '@/components/Proceso';
import { Nosotros } from '@/components/Nosotros';
import { XolsecTeaser } from '@/components/XolsecTeaser';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Servicios />
        <BotsShowcase />
        <Verticales />
        <Proyectos />
        <Proceso />
        <Nosotros />
        <XolsecTeaser />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
