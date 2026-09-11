# Centro Educativo Federico Froebel — Sitio web

Landing single-page para el Centro Educativo Federico Froebel (Teoloyucan, Edo. Méx.).
Preescolar, Primaria y Secundaria.

Construido con el mismo stack que los demás sitios de XOLUM:
**Next.js + TypeScript + Tailwind CSS 4 + GSAP (ScrollTrigger)**.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Estructura

- `src/app/layout.tsx` — metadatos SEO + fuentes (**Fraunces** display serif / **Hanken Grotesk** cuerpo) + `IconProvider` (Phosphor duotone).
- `src/app/globals.css` — paleta de marca (azul rey, dorado, plata) y utilidades.
- `src/lib/site.ts` — **datos oficiales** (dirección, teléfonos, correo, redes, WhatsApp).
  Edita aquí para actualizar la información de contacto en todo el sitio.
- `src/components/` — secciones:
  - `Navbar` · `Hero` · `NosotrosSequence` (valores, scroll cinematográfico)
  - `NivelesSection` · `OfertaSection` · `TalleresSection`
  - `AdmisionesSection` (becas y promociones) · `InfoSection` (contacto + mapa)
  - `Reveal` (animación de entrada) · `FloatingWhatsApp`

## Favicon e imagen de compartir (OG)

- `src/app/icon.png` / `src/app/apple-icon.png` — favicon y icono de iOS (el escudo).
- `src/app/opengraph-image.png` / `twitter-image.png` — vista previa al compartir el
  link en WhatsApp, Facebook, etc. Se regenera con `python3 /tmp/gen_og.py` (o el
  script equivalente) si cambia la marca.

> **Importante para el deploy:** define la variable de entorno
> `NEXT_PUBLIC_SITE_URL` con el dominio final (ej. `https://www.federicofroebel.mx`)
> en Vercel. Con eso las imágenes de compartir usan URLs absolutas y se muestran
> correctamente en redes. En local usa `http://localhost:3000` por defecto.

## Logo

- `public/logo.png` — escudo oficial (fondo amarillo), usado en las insignias circulares.
- `public/logo-banner.png` — escudo con banda "Preescolar · Primaria · Secundaria".

## Fotos reales de la escuela (opcional)

La sección **Talleres y vida escolar** usa mosaicos de color por defecto.
Para usar fotos reales: coloca la imagen en `public/` (ej. `public/vida-1.jpg`) y
agrega `img: "/vida-1.jpg"` al objeto correspondiente en
`src/components/TalleresSection.tsx`.

## Datos usados

- **Dirección:** Av. Nacional No. 2, Cda. Progreso, Teoloyucan, México, 54770
- **Teléfonos:** 55 763 926 72 · 593 914 0576
- **Correo:** cefteoloyucan@gmail.com
- **Instagram:** @ceff.teoloyucan · **Facebook:** Centro Educativo Federico Froebel

---
Diseñado por Aram Perez · XOLUM.
