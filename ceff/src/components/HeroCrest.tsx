"use client";
import { useState } from "react";
import AnimatedCrest from "./AnimatedCrest";

export default function HeroCrest() {
  const [paused, setPaused] = useState(false);
  return <div className="shrink-0 text-center">
    <a href="/escudo" aria-label="Ver el escudo animado en detalle" className="block rounded-lg">
      <AnimatedCrest paused={paused} className="w-40 sm:w-44" />
    </a>
    <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="mt-1 min-h-11 px-3 text-xs font-semibold text-muted underline decoration-silver underline-offset-4 hover:text-blue">
      {paused ? "Animar llama" : "Pausar llama"}
    </button>
  </div>;
}
