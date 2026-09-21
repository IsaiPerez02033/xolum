import { ReactNode } from "react";

// Keep content visible immediately, including anchor navigation and no-JS visits.
export default function Reveal({ children, className = "" }: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return <div className={className}>{children}</div>;
}
