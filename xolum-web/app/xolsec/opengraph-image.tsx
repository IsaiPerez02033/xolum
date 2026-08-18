import { ImageResponse } from 'next/og';

// Imagen Open Graph propia de la página XOLSEC (identidad night-vision).
export const alt = 'XOLSEC · Videovigilancia con inteligencia artificial';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function XolsecOpengraphImage() {
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
            'linear-gradient(135deg, #030a12 0%, #06251f 60%, #04231c 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: '6px',
            color: '#34d399',
            display: 'flex',
          }}
        >
          XOLUM
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: '-3px',
            color: 'transparent',
            backgroundImage: 'linear-gradient(90deg, #34d399, #22d3ee)',
            backgroundClip: 'text',
            display: 'flex',
          }}
        >
          XOLSEC
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 42,
            fontWeight: 600,
            color: '#e2e8f0',
            display: 'flex',
          }}
        >
          Videovigilancia con inteligencia artificial
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: '#94a3b8',
            display: 'flex',
          }}
        >
          Cámaras con IA que detectan y alertan al instante
        </div>
        <div
          style={{
            marginTop: 'auto',
            fontSize: 28,
            fontWeight: 700,
            color: '#34d399',
            display: 'flex',
          }}
        >
          xolum.mx/xolsec
        </div>
      </div>
    ),
    { ...size },
  );
}
