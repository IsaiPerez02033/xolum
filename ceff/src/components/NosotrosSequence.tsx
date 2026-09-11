import { Heart, ShieldCheck, Medal, RocketLaunch } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
type Scene = { Icon: typeof Heart; kicker: string; title: string; subtitle: string; bg: string; text: string; accent: string; };
const scenes: Scene[] = [
  {
    Icon: Heart,
    kicker: "Nuestro corazón",
    title: "Amor por aprender",
    subtitle:
      "Un ambiente cálido y seguro donde cada alumno se siente visto, valorado y motivado a dar lo mejor de sí.",
    bg: "linear-gradient(135deg, #1b3aa5 0%, #3b6fe0 100%)",
    text: "#ffffff",
    accent: "#fde68a",
  },
  {
    Icon: ShieldCheck,
    kicker: "Nuestra base",
    title: "Disciplina que forma",
    subtitle:
      "Hábitos, valores y responsabilidad que construyen carácter y acompañan a nuestros alumnos toda la vida.",
    bg: "linear-gradient(135deg, #112567 0%, #1b3aa5 100%)",
    text: "#ffffff",
    accent: "#f5c518",
  },
  {
    Icon: Medal,
    kicker: "Nuestro compromiso",
    title: "Excelencia académica",
    subtitle:
      "Un nivel exigente y actualizado que prepara a cada estudiante para los retos de su siguiente etapa.",
    bg: "linear-gradient(135deg, #d9a406 0%, #f5c518 100%)",
    text: "#112567",
    accent: "#112567",
  },
  {
    Icon: RocketLaunch,
    kicker: "Nuestra visión",
    title: "Formación integral",
    subtitle:
      "Deporte, arte, tecnología e idiomas para desarrollar todo el potencial de cada niño y joven.",
    bg: "linear-gradient(135deg, #1b3aa5 0%, #112567 100%)",
    text: "#ffffff",
    accent: "#fde68a",
  },
];

export default function NosotrosSequence() {
  return (
    <section id="nosotros" className="bg-blue-dark py-20 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.3fr] lg:gap-20">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Nuestra esencia</p>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight sm:text-5xl">Una comunidad que acompaña su crecimiento.</h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-white/75">Amor, disciplina y excelencia académica en cada etapa de su formación.</p>
        </Reveal>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {scenes.map(({Icon, title, subtitle}, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <Icon className="h-8 w-8 text-gold" />
              <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{subtitle}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
