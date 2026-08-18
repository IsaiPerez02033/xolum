# Formulario de contacto → contacto@xolum.mx

El formulario de la landing (`components/ContactForm.tsx`) envía las solicitudes a
`contacto@xolum.mx` mediante un **route handler propio** (`app/api/contacto/route.ts`)
que llama a la API REST de SendGrid. No usa el backend de la plataforma: la landing
queda autocontenida.

## Comportamiento

- **Enviar** → POST a `/api/contacto` → correo a `contacto@xolum.mx` con los datos
  (nombre, negocio, email, tipo, mensaje) y *reply-to* al correo del cliente, para
  responderle directo desde Gmail.
- Si el envío falla (o SendGrid aún no está configurado), el formulario **no pierde
  el lead**: muestra un fallback con botón de **WhatsApp** (mensaje prellenado) y
  **email** (`mailto:contacto@xolum.mx`).
- **Honeypot** anti-spam (campo oculto `website`): si un bot lo llena, se descarta
  silenciosamente.

## Variables de entorno en Vercel (proyecto de la landing)

En **Vercel → proyecto `xolum` → Settings → Environment Variables**:

| Variable            | Valor                  | ¿Obligatoria? |
| ------------------- | ---------------------- | ------------- |
| `SENDGRID_API_KEY`  | *(la key de SendGrid)* | Sí (para enviar) |
| `MAIL_FROM_CONTACTO`| `contacto@xolum.mx`    | No (default: contacto@xolum.mx) |
| `CONTACT_INBOX`     | `contacto@xolum.mx`    | No (default: contacto@xolum.mx) |

> Es la **misma** API key de SendGrid que usa el backend en Render, pero hay que
> ponerla **también aquí en Vercel** porque el route handler corre en la landing,
> no en el backend. Requiere el dominio `xolum.mx` autenticado en SendGrid (ver
> `xolum-platform/docs/correos-setup.md`).

## Sin SendGrid configurado

El endpoint responde `503 correo-no-configurado` y el formulario cae al fallback de
WhatsApp/mailto. Los mensajes siguen llegándote (por WhatsApp o al `mailto`), solo
que no de forma automática por correo hasta poner la key.
