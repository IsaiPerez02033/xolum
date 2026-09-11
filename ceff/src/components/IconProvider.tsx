"use client";

import { IconContext } from "@phosphor-icons/react";
import { ReactNode } from "react";

// Estilo premium por defecto para todos los iconos Phosphor: duotone.
// Cada icono puede sobrescribir con su prop `weight` (bold, fill, etc.).
export default function IconProvider({ children }: { children: ReactNode }) {
  return (
    <IconContext.Provider value={{ weight: "duotone", size: 24 }}>
      {children}
    </IconContext.Provider>
  );
}
