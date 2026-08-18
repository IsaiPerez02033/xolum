import { NextResponse } from 'next/server';

// Endpoint del formulario de contacto de la landing. Envía la solicitud a
// contacto@xolum.mx vía la API REST de SendGrid (sin dependencia extra: fetch).
// Corre en el runtime Node de Vercel.

export const runtime = 'nodejs';

const MAX = { nombre: 120, negocio: 120, email: 160, tipo: 60, mensaje: 4000 };

function escapar(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Validación de email laxa (solo para decidir si sirve como reply-to).
function emailValido(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

interface Cuerpo {
  nombre?: string;
  negocio?: string;
  email?: string;
  tipo?: string;
  mensaje?: string;
  // Honeypot anti-bots: si viene lleno, es spam.
  website?: string;
}

export async function POST(req: Request) {
  let body: Cuerpo;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Cuerpo inválido' }, { status: 400 });
  }

  // Trampa de spam: los bots llenan campos ocultos. Fingimos éxito y no enviamos.
  if (body.website) return NextResponse.json({ ok: true });

  const nombre = (body.nombre ?? '').trim().slice(0, MAX.nombre);
  const negocio = (body.negocio ?? '').trim().slice(0, MAX.negocio);
  const email = (body.email ?? '').trim().slice(0, MAX.email);
  const tipo = (body.tipo ?? '').trim().slice(0, MAX.tipo);
  const mensaje = (body.mensaje ?? '').trim().slice(0, MAX.mensaje);

  if (!nombre) {
    return NextResponse.json(
      { ok: false, error: 'Falta el nombre.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.MAIL_FROM_CONTACTO ?? 'contacto@xolum.mx';
  const inbox = process.env.CONTACT_INBOX ?? 'contacto@xolum.mx';

  // Sin API key (dev / antes de activar SendGrid): no truena, avisa al cliente
  // para que muestre el fallback (WhatsApp / mailto).
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: 'correo-no-configurado' },
      { status: 503 },
    );
  }

  const filas: [string, string][] = [
    ['Nombre', nombre],
    ['Negocio', negocio || '—'],
    ['Email', email || '—'],
    ['Qué necesita', tipo || '—'],
  ];
  const htmlFilas = filas
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#64748b;">${k}</td><td style="padding:6px 12px;color:#0f172a;font-weight:600;">${escapar(
          v,
        )}</td></tr>`,
    )
    .join('');
  const html = `<div style="font-family:sans-serif;max-width:560px;">
    <h2 style="color:#0891b2;">Nueva solicitud desde xolum.mx</h2>
    <table style="border-collapse:collapse;">${htmlFilas}</table>
    <p style="color:#0f172a;white-space:pre-wrap;margin-top:16px;"><strong>Mensaje:</strong><br>${escapar(
      mensaje || '—',
    )}</p>
  </div>`;
  const texto = [
    'Nueva solicitud desde xolum.mx',
    '',
    ...filas.map(([k, v]) => `${k}: ${v}`),
    '',
    'Mensaje:',
    mensaje || '—',
  ].join('\n');

  const payload: Record<string, unknown> = {
    personalizations: [{ to: [{ email: inbox }] }],
    from: { email: from, name: 'XOLUM · Web' },
    subject: `Nueva solicitud: ${tipo || 'Contacto'} — ${nombre}`,
    content: [
      { type: 'text/plain', value: texto },
      { type: 'text/html', value: html },
    ],
  };
  // Reply-to al cliente para poder responderle directo desde Gmail.
  if (email && emailValido(email)) {
    payload.reply_to = { email, name: nombre };
  }

  try {
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detalle = await res.text().catch(() => '');
      console.error('SendGrid error', res.status, detalle);
      return NextResponse.json(
        { ok: false, error: 'No se pudo enviar el correo.' },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Fallo enviando contacto', err);
    return NextResponse.json(
      { ok: false, error: 'No se pudo enviar el correo.' },
      { status: 502 },
    );
  }
}
