import AnimatedCrest from "@/components/AnimatedCrest";
export default function CrestPreview() {
  return <main className="min-h-screen bg-surface px-6 py-8 text-blue-dark">
    <div className="mx-auto max-w-3xl"><a href="/" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">Volver al colegio</a>
    <div className="mt-5 rounded-2xl bg-white p-4 sm:p-8"><AnimatedCrest className="w-full" /></div>
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><div><h1 className="font-display text-2xl font-bold">La llama de nuestro escudo</h1><p className="mt-2 max-w-lg text-sm text-muted">El escudo original con movimiento localizado en el fuego de la antorcha.</p></div></div>
    <p className="mt-5 text-sm text-muted">La animación se reproduce automáticamente. Con movimiento reducido, el efecto es más suave.</p></div>
  </main>;
}
