import type { Metadata } from "next";
import { Archivo, Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import IconProvider from "@/components/IconProvider";

// Grotesca pesada y sólida — iguala el logotipo "FEDERICO FROEBEL"
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

// Serif itálica de acento — iguala el "Excelencia Educativa." del escudo
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Grotesque limpia y cálida para el cuerpo
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "Centro Educativo Federico Froebel | Preescolar, Primaria y Secundaria en Teoloyucan",
  description:
    "Educamos con amor, disciplina y excelente nivel académico. Preescolar, Primaria y Secundaria en Teoloyucan con Robótica Lego, Certificaciones Cambridge, deportes y actividades culturales. ¡Inscripciones abiertas con becas hasta 50%!",
  keywords: [
    "escuela Teoloyucan",
    "primaria Teoloyucan",
    "secundaria Teoloyucan",
    "kinder Teoloyucan",
    "preescolar Teoloyucan",
    "Centro Educativo Federico Froebel",
    "colegio particular Estado de México",
    "robótica Lego",
    "certificaciones Cambridge",
    "becas escolares",
  ],
  openGraph: {
    title: "Centro Educativo Federico Froebel",
    description:
      "Por el estudio, la superación humana. Preescolar, Primaria y Secundaria en Teoloyucan con excelencia académica.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${fraunces.variable} ${hanken.variable}`}
    >
      <body className="antialiased bg-background text-foreground">
        <IconProvider>{children}</IconProvider>
      </body>
    </html>
  );
}
