import { ImageResponse } from 'next/og';

// Imagen que se muestra al compartir xolum.mx en WhatsApp, redes y buscadores.
// Se genera en build/tiempo de request; Next la enlaza sola en OG y Twitter.
export const alt = 'XOLUM · Software a la medida y automatización con IA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background:
            'linear-gradient(135deg, #0e2a33 0%, #0f172a 48%, #0b1120 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 148,
            fontWeight: 800,
            letterSpacing: '-4px',
            color: 'transparent',
            backgroundImage: 'linear-gradient(90deg, #22d3ee, #10b981)',
            backgroundClip: 'text',
            display: 'flex',
          }}
        >
          XOLUM
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 44,
            fontWeight: 600,
            color: '#e2e8f0',
            display: 'flex',
          }}
        >
          Software a la medida · IA · Videovigilancia
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: '#94a3b8',
            display: 'flex',
          }}
        >
          Chatbots de WhatsApp con IA · Facturación CFDI · XOLSEC
        </div>
        <div
          style={{
            marginTop: 'auto',
            fontSize: 30,
            fontWeight: 700,
            color: '#22d3ee',
            display: 'flex',
          }}
        >
          xolum.mx
        </div>
      </div>
    ),
    { ...size },
  );
}
