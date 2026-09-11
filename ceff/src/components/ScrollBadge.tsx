"use client";

import { ArrowDown } from "@phosphor-icons/react";

/**
 * Indicador de scroll premium: un anillo de texto que gira lentamente
 * con una flecha animada al centro. Es un enlace: al tocarlo lleva a la
 * siguiente sección (#nosotros).
 */
export default function ScrollBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href="#nosotros"
      aria-label="Desliza para descubrir"
      className={`group relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28 ${className}`}
    >
      {/* Anillo de texto giratorio */}
      <svg
        viewBox="0 0 100 100"
        className="animate-spin-slow h-full w-full text-blue-dark/65"
      >
        <defs>
          <path
            id="scroll-circle"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text className="uppercase" fontSize="8.2" fontWeight="700" letterSpacing="1.5" fill="currentColor">
          <textPath href="#scroll-circle" startOffset="0" textLength="232" lengthAdjust="spacing">
            Desliza para descubrir&nbsp;•&nbsp;
          </textPath>
        </text>
      </svg>

      {/* Círculo central + flecha */}
      <span className="absolute flex h-11 w-11 items-center justify-center rounded-full bg-blue text-white shadow-md shadow-blue/30 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
        <ArrowDown weight="bold" className="animate-nudge h-5 w-5" />
      </span>
    </a>
  );
}
