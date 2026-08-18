// Inserta datos estructurados schema.org (JSON-LD) para que Google entienda qué
// es XOLUM y muestre resultados enriquecidos. Se renderiza en el servidor.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El JSON es de datos propios (no entrada de usuario): serializar es seguro.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
