/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cabecera de servidor innecesaria.
  poweredByHeader: false,
  // Compresión gzip/br en las respuestas (activo por defecto, explícito aquí).
  compress: true,

  images: {
    // Formatos modernos con negociación de contenido: los navegadores viejos
    // (Windows 7/XP) reciben automáticamente el PNG/JPG original; los actuales,
    // AVIF/WebP, mucho más ligeros para conexiones lentas.
    formats: ['image/avif', 'image/webp'],
    // Tamaños acotados a lo que realmente usamos (íconos pequeños + imágenes
    // de proyectos), evitando generar variantes enormes.
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    deviceSizes: [360, 640, 828, 1080, 1200, 1920],
    // Caché larga de las imágenes optimizadas.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  experimental: {
    // Tree-shaking de "barrels": sólo se empaqueta el ícono/animación usada,
    // no toda la librería. Reduce JS en móvil.
    optimizePackageImports: ['@phosphor-icons/react', 'motion'],
  },

  async headers() {
    return [
      {
        // Los assets con hash de Next son inmutables: caché de 1 año.
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
