import AnimatedCrest from "./AnimatedCrest";

export default function HeroCrest() {
  return <a href="/escudo" aria-label="Ver el escudo animado en detalle" className="block shrink-0 rounded-lg">
    <AnimatedCrest className="w-64 max-w-full sm:w-72 lg:w-60 xl:w-72" />
  </a>;
}
