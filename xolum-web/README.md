# XOLUM · Sitio corporativo

Sitio principal de **XOLUM** (estudio de software) y su división de seguridad **XOLSEC**.
Next.js 14 (App Router) · Tailwind · Motion · GSAP-ready · Canvas/WebGL. Tema dark, acento
gradiente de marca cyan → esmeralda del logo Xolo.

## Correr en local

```bash
cd xolum-web
npm install
npm run dev
```

Abre http://localhost:3000 (o el puerto que indique). Producción: `npm run build && npm start`.

## Estructura

- `app/page.tsx` — Home XOLUM (hero, servicios, bots con IA, verticales, proyectos, proceso, teaser XOLSEC, CTA).
- `app/xolsec/page.tsx` — Página dedicada XOLSEC (hero radar, servicios, caso Frigate/alertas, compromiso, CTA).
- `lib/data.ts` — **Todo el contenido editable vive aquí** (bots, verticales, proyectos, XOLSEC, contacto).
- `components/` — Secciones y primitivas (Reveal, MagneticButton, CountUp, NetworkCanvas, RadarCanvas).

## Pendientes antes de publicar

1. **Número de WhatsApp y email reales** → `lib/data.ts` (`CONTACT.whatsapp`, `CONTACT.email`).
2. **Imágenes de proyectos**: hoy usan placeholders de `picsum.photos`. Reemplazar por
   capturas reales de cada cliente en `components/Proyectos.tsx` (o servir desde `public/`).
3. Ajustar cifras de `stats` en `lib/data.ts` si cambian.
4. Deploy sugerido: Vercel (import del repo, root `xolum-web`).
