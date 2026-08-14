// Contenido del sitio. Todo vive aquí para editar sin tocar JSX.

export const CONTACT = {
  whatsapp: '525645915734', // 52 (México) + número de 10 dígitos
  email: 'aramperez57@gmail.com',
  ciudad: 'Ciudad de México',
};

export const waLink = (texto: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(texto)}`;

export const stats = [
  { valor: 14, sufijo: '+', label: 'Empresas operando con nuestro software' },
  { valor: 7, sufijo: '+', label: 'Instalaciones de videovigilancia XOLSEC' },
  { valor: 5, sufijo: '', label: 'Bots de WhatsApp con IA en producción' },
  { valor: 60, sufijo: ' FPS', label: 'Interfaces con microinteracciones fluidas' },
];

// Los bots reales de la plataforma. El copy sale del comportamiento verificado.
export const bots = [
  {
    id: 'almacen',
    nombre: 'Bot de Almacén',
    tagline: 'Tu inventario responde por WhatsApp',
    descripcion:
      'Le escribes o le mandas una foto y resuelve el almacén sin abrir un sistema: consulta stock, registra entradas, salidas y préstamos de herramienta, y arma cotizaciones al momento.',
    capacidades: [
      'Consulta de stock, mínimos y unidad por nombre',
      'Registro de entradas, salidas y consumos',
      'Préstamo y devolución de herramienta, con quién la tiene',
      'Cotizaciones al instante y plan de corte óptimo',
    ],
    chat: [
      { de: 'user', texto: '¿Cuánto cable calibre 12 me queda?' },
      { de: 'bot', texto: 'Quedan 340 m de cable cal. 12 (mínimo 200 m). Stock sano.' },
      { de: 'user', texto: 'Salieron 80 m para la obra de San Ángel' },
      { de: 'bot', texto: 'Registrado. Salida de 80 m. Nuevo stock: 260 m.' },
    ],
  },
  {
    id: 'facturacion',
    nombre: 'Bot de Facturación',
    tagline: 'CFDI 4.0 en un chat, como la gasolinera',
    descripcion:
      'El cliente manda foto de su Constancia de Situación Fiscal. La IA lee RFC, razón social, régimen y CP, pide uso de CFDI y forma de pago con botones, y timbra ante el SAT. Entrega PDF y XML.',
    capacidades: [
      'Lectura automática de la Constancia con visión IA',
      'Validación de RFC y régimen contra catálogos del SAT',
      'Uso de CFDI y forma de pago con botones tocables',
      'Timbrado vía PAC y entrega de PDF + XML',
    ],
    chat: [
      { de: 'user', texto: '[Foto de la Constancia de Situación Fiscal]' },
      { de: 'bot', texto: 'Leí tus datos: RASF860917J3A · Régimen Simplificado de Confianza. ¿Uso de CFDI?' },
      { de: 'user', texto: 'Gastos en general' },
      { de: 'bot', texto: 'Listo. Factura timbrada ante el SAT. Te envío PDF y XML.' },
    ],
  },
  {
    id: 'citas',
    nombre: 'Bot de Citas',
    tagline: 'Agenda llena sin contestar el teléfono',
    descripcion:
      'Reserva por WhatsApp de punta a punta: servicio, profesional, fecha y hora, con motor anti doble-reserva. Ideal para barbería, clínica dental y consultorios.',
    capacidades: [
      'Flujo servicio → profesional → horario → confirmación',
      'Motor de disponibilidad anti doble-reserva',
      'Recordatorios automáticos y reagenda',
      'Página pública de reservas por negocio',
    ],
    chat: [
      { de: 'user', texto: 'Quiero corte con Beto el sábado' },
      { de: 'bot', texto: 'Beto tiene 11:00, 12:30 y 16:00 el sábado. ¿Cuál te acomoda?' },
      { de: 'user', texto: '12:30' },
      { de: 'bot', texto: 'Confirmado, sábado 12:30 con Beto. Te recuerdo un día antes.' },
    ],
  },
  {
    id: 'difusion',
    nombre: 'Bot de Difusión',
    tagline: 'Campañas masivas sin quemar tu número',
    descripcion:
      'Envíos segmentados a tu base de clientes por audiencia, con seguimiento de entregados y respuestas. Promociones, avisos y recordatorios que sí llegan.',
    capacidades: [
      'Segmentación por audiencia y estado',
      'Envío controlado con seguimiento de entrega',
      'Plantillas aprobadas de Meta Cloud API',
      'Métricas de entregados y respuestas',
    ],
    chat: [
      { de: 'user', texto: 'Manda la promo de octubre a clientes frecuentes' },
      { de: 'bot', texto: '212 clientes en el segmento. ¿Envío la plantilla "promo-octubre"?' },
      { de: 'user', texto: 'Sí, adelante' },
      { de: 'bot', texto: 'Enviado a 212. 189 entregados hasta ahora, 24 respondieron.' },
    ],
  },
] as const;

export const verticales = [
  { icon: 'Barbell', nombre: 'Barbería y estética', desc: 'Agenda, reservas públicas y equipo.' },
  { icon: 'Package', nombre: 'Almacén e insumos', desc: 'Kardex, BOM, cotizaciones y QR.' },
  { icon: 'Tooth', nombre: 'Clínica dental', desc: 'Tratamientos, citas y expediente.' },
  { icon: 'ForkKnife', nombre: 'Restaurante', desc: 'Menú, platillos y operación diaria.' },
  { icon: 'Barbell', nombre: 'Gimnasio', desc: 'Membresías, accesos y vigencias.' },
  { icon: 'Stethoscope', nombre: 'Consultorio médico', desc: 'Agenda y seguimiento de pacientes.' },
  { icon: 'Invoice', nombre: 'Facturación', desc: 'CFDI 4.0 por WhatsApp para cualquier giro.' },
  { icon: 'Buildings', nombre: 'Tu giro', desc: 'Adaptamos la plataforma a tu operación.' },
];

export const servicios = [
  {
    icon: 'Code',
    titulo: 'Software a la medida',
    desc: 'Plataformas web reales, no plantillas. Panel de administración, base de datos multi-empresa y la operación que tu negocio necesita.',
    puntos: ['Web y panel de gestión', 'Bases de datos seguras', 'Roles y permisos por equipo'],
  },
  {
    icon: 'WhatsappLogo',
    titulo: 'Automatización con IA por WhatsApp',
    desc: 'Bots que trabajan en el canal donde ya están tus clientes. Almacén, facturación, citas y difusión, entendiendo lenguaje natural y fotos.',
    puntos: ['Lenguaje natural y visión IA', 'Integrados a tu operación', 'Meta Cloud API oficial'],
  },
  {
    icon: 'Palette',
    titulo: 'Sitios y landings de alto impacto',
    desc: 'Experiencias cinematográficas con animación y 3D que convierten. La misma calidad de esta página, para tu marca.',
    puntos: ['Animación y 3D en el navegador', 'Optimizadas para vender', 'Responsivas de verdad'],
  },
];

export const proceso = [
  { n: '01', titulo: 'Escuchamos tu operación', desc: 'Entendemos cómo trabajas hoy y dónde se te va el tiempo.' },
  { n: '02', titulo: 'Diseñamos la solución', desc: 'Prototipo y arquitectura a la medida de tu giro, sin humo.' },
  { n: '03', titulo: 'Construimos y automatizamos', desc: 'Software y bots en producción, integrados a WhatsApp.' },
  { n: '04', titulo: 'Acompañamos y mejoramos', desc: 'Soporte cercano y evolución continua del sistema.' },
];

// Proyectos reales (marca del cliente + tipo de trabajo). Sin exponer datos sensibles.
export const proyectos = [
  { nombre: 'ICEMEX', tipo: 'Sitio corporativo + almacén', seed: 'icemex-industrial-warehouse' },
  { nombre: 'CARHEMA', tipo: 'Landing 3D de arquitectura', seed: 'carhema-modern-architecture' },
  { nombre: 'La Santa', tipo: 'Sitio de restaurante', seed: 'lasanta-restaurant-interior' },
  { nombre: 'Los Ramos', tipo: 'Restaurante + menú digital', seed: 'losramos-mexican-food' },
  { nombre: 'The Land Café', tipo: 'Sitio de cafetería', seed: 'theland-coffee-shop' },
  { nombre: 'Los Bigotes', tipo: 'Landing gastronómica', seed: 'bigotes-tacos-restaurant' },
  { nombre: 'Kinara', tipo: 'E-commerce de producto', seed: 'kinara-product-ecommerce' },
];

// XOLSEC
export const xolsec = {
  claim: 'Seguridad que ve, entiende y avisa.',
  intro:
    'XOLSEC es la división de seguridad de XOLUM. Instalamos videovigilancia profesional y le sumamos inteligencia artificial en la cámara: no solo grabamos, detectamos actividad sospechosa y te avisamos al instante.',
  servicios: [
    {
      icon: 'VideoCamera',
      titulo: 'Videovigilancia profesional',
      desc: 'Cámaras PTZ, bala y domo Wi-Fi, resistentes a la intemperie (IP66), con visión nocturna y grabación segura en NVR.',
    },
    {
      icon: 'Brain',
      titulo: 'IA dentro de la cámara',
      desc: 'Modelos de detección corriendo en sitio: distinguen personas, vehículos y movimiento relevante del ruido de siempre.',
    },
    {
      icon: 'BellRinging',
      titulo: 'Alertas automáticas',
      desc: 'Cuando la IA detecta actividad sospechosa, un bot te avisa al instante por Telegram o WhatsApp, con el clip del evento.',
    },
    {
      icon: 'DeviceMobile',
      titulo: 'Monitoreo desde tu celular',
      desc: 'Supervisión en tiempo real, control remoto y acceso a grabaciones desde donde estés, día y noche.',
    },
  ],
  compromiso: [
    { n: '01', t: 'Asesoría técnica', d: 'Elegimos el equipo correcto para tu espacio, antes y después de instalar.' },
    { n: '02', t: 'Instalación profesional', d: 'Montaje, configuración y acceso remoto listo desde el primer día.' },
    { n: '03', t: 'Garantía y soporte', d: 'Respaldo en todos los equipos y soporte directo ante cualquier duda o falla.' },
  ],
  camaras: [
    {
      icon: 'VideoCamera',
      nombre: 'PTZ Exterior',
      desc: 'Domo motorizado que gira, apunta y hace zoom. Resistente a la intemperie.',
      specs: ['2–4 MP', 'Wi-Fi', 'IP66', 'Visión 360°'],
    },
    {
      icon: 'SecurityCamera',
      nombre: 'Bala',
      desc: 'Largo alcance para cubrir accesos y perímetros. Versión con batería.',
      specs: ['4–5 MP', 'Wi-Fi', 'Batería opcional', 'Visión nocturna'],
    },
    {
      icon: 'HouseLine',
      nombre: 'Interior',
      desc: 'Domo y mini cámaras discretas para monitoreo dentro del hogar o negocio.',
      specs: ['Wi-Fi', 'Discreta', 'Audio', 'Tiempo real'],
    },
    {
      icon: 'Lightbulb',
      nombre: 'Foco cámara',
      desc: 'Cámara PTZ oculta en un foco. Seguridad disimulada de instalación sencilla.',
      specs: ['PTZ', 'Wi-Fi', '2MP + 2MP', 'Plug & play'],
    },
    {
      icon: 'Sun',
      nombre: 'Solar',
      desc: 'Vigilancia autónoma 24/7 con panel solar, sin depender de cableado.',
      specs: ['4–5 MP', 'Panel solar', 'Sin cables', 'Exterior'],
    },
  ],
  frigate: {
    titulo: 'Un caso real, funcionando hoy',
    desc: 'En una de las empresas que protegemos, un motor de IA analiza el video en vivo y, al detectar una persona en zona restringida fuera de horario, envía la alerta con el clip a Telegram en segundos.',
    alertas: [
      { hora: '02:14', texto: 'Persona detectada · Patio trasero · fuera de horario', nivel: 'alto' },
      { hora: '02:14', texto: 'Clip de 12 s adjunto · confianza 94%', nivel: 'info' },
      { hora: '07:03', texto: 'Vehículo detectado · Entrada principal', nivel: 'medio' },
    ],
  },
};
