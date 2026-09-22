import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Escudo animado | Centro Educativo Federico Froebel",
  alternates: { canonical: "/escudo" },
  robots: { index: false, follow: true },
};
export default function CrestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
