# SEO de xolum.mx — Search Console y keywords

## 1. Qué quedó implementado en el código

- **Metadata completa** en `app/layout.tsx` (home) y `app/xolsec/page.tsx`: título,
  descripción, keywords, canonical, Open Graph, Twitter Card y directivas de robots
  (`index, follow`, `max-image-preview:large`).
- **`/sitemap.xml`** (`app/sitemap.ts`) — lista `/` y `/xolsec`.
- **`/robots.txt`** (`app/robots.ts`) — permite todo y apunta al sitemap.
- **`/manifest.webmanifest`** (`app/manifest.ts`) — ficha PWA de marca.
- **Datos estructurados JSON-LD** (`lib/seo.ts` + `components/JsonLd.tsx`):
  `Organization` + `WebSite` en todo el sitio, y `Service` (videovigilancia con IA)
  en `/xolsec`.
- **Imágenes Open Graph** generadas (`app/opengraph-image.tsx` y
  `app/xolsec/opengraph-image.tsx`): la tarjeta que se ve al compartir el link en
  WhatsApp, redes y buscadores.

Todo esto ya está verificado en build. Se publica solo al hacer deploy en Vercel.

## 2. Conectar con Google Search Console

Recomendado: **propiedad de dominio** (cubre `xolum.mx`, `www`, `app`, http/https
de una vez) verificada por **DNS TXT en Squarespace**.

1. Entra a [Search Console](https://search.google.com/search-console) →
   **Agregar propiedad** → **Dominio** → escribe `xolum.mx`.
2. Google te da un registro **TXT** (`google-site-verification=…`).
3. En **Squarespace → DNS de xolum.mx**, agrega un registro **TXT** en el host `@`
   (raíz) con ese valor. **No se toca** ningún registro de correo (MX/SPF/DKIM):
   se pueden tener varios TXT en la raíz sin conflicto.
4. Vuelve a Search Console y pulsa **Verificar** (puede tardar por propagación DNS).
5. Ya verificado: **Sitemaps** → agrega `sitemap.xml` → Enviar.

> Alternativa por meta-tag (si no quisieras tocar DNS): define
> `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` en Vercel con el token que da Google para
> el método "Etiqueta HTML". El `<meta name="google-site-verification">` ya se
> inyecta solo en el `<head>` cuando esa variable existe. Verifica solo la
> propiedad de prefijo de URL `https://xolum.mx`, no el dominio completo.

### Después de verificar
- **Inspección de URLs** → pega `https://xolum.mx` y `https://xolum.mx/xolsec` →
  **Solicitar indexación** para acelerar el primer rastreo.
- Revisa **Cobertura** y **Mejoras** a los pocos días.
- Opcional pero recomendable: crea también **Bing Webmaster Tools** (importa la
  propiedad desde Search Console en 2 clics) para aparecer en Bing/DuckDuckGo.

## 3. Estrategia de keywords

La página es un **landing único** (no un blog), así que la estrategia es concentrar
señales en dos URLs. Las keywords ya están en el `<head>`; lo que sigue es la guía
de a qué término apunta cada página y qué reforzar en el contenido visible.

### `/` (XOLUM) — desarrollo de software + IA
| Prioridad | Keyword | Estado |
| --- | --- | --- |
| Alta | software a la medida (México) | En título + H1 + keywords |
| Alta | desarrollo de aplicaciones / apps | En keywords; reforzar en copy |
| Alta | chatbots con inteligencia artificial | En keywords + sección de bots |
| Alta | chatbot / bot de WhatsApp con IA | En copy (BotsShowcase) |
| Media | automatización con IA para empresas | En descripción |
| Media | facturación CFDI por WhatsApp | En bots |
| Media | páginas web profesionales | En keywords |

### `/xolsec` (XOLSEC) — videovigilancia
| Prioridad | Keyword | Estado |
| --- | --- | --- |
| Alta | cámaras de seguridad / videovigilancia | En título + H1 |
| Alta | videovigilancia con inteligencia artificial | En título + descripción |
| Alta | CCTV con IA | En keywords |
| Media | detección de intrusos con IA | En keywords |
| Media | cámaras con alertas por WhatsApp/Telegram | En descripción + demo |
| Media | instalación de cámaras (México) | En keywords; reforzar en copy |

### Recomendaciones para mejorar posicionamiento (a futuro)
1. **Google Business Profile**: da de alta XOLUM como negocio (aunque sea sin
   dirección pública, con área de servicio "Ciudad de México"). Es lo que más mueve
   la aguja en búsquedas locales tipo "cámaras de seguridad cerca de mí".
2. **Contenido**: la vía más fuerte para rankear términos genéricos ("software a la
   medida", "cámaras con IA") es un **blog** con artículos que respondan preguntas
   reales ("¿cuánto cuesta un sistema de videovigilancia con IA?", "cómo automatizar
   facturación CFDI por WhatsApp"). Cada artículo se agrega al `sitemap.ts`.
3. **Backlinks**: enlaces desde los sitios de tus clientes (ICEMEX, NICTE, etc.) con
   un "Hecho por XOLUM" hacia `xolum.mx` suman autoridad.
4. **Redes sociales**: al abrir Instagram/Facebook/LinkedIn de XOLUM, agrega sus URLs
   al array `sameAs` del `Organization` en `lib/seo.ts` (hoy vacío) para reforzar el
   Knowledge Graph.
5. Valida los datos estructurados en
   [Rich Results Test](https://search.google.com/test/rich-results) tras publicar.

## 4. Verificar en producción (tras el deploy)
- `https://xolum.mx/sitemap.xml` y `https://xolum.mx/robots.txt` responden.
- Comparte `https://xolum.mx` en WhatsApp: debe salir la tarjeta con la imagen OG.
- Pega la URL en el [Rich Results Test](https://search.google.com/test/rich-results):
  debe detectar `Organization`, `WebSite` y (en /xolsec) `Service`.
