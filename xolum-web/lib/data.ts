// Contenido principal del sitio XOLUM & XOLSEC.
// Diseñado para comunicación B2B directa, profesional y orientada a resultados.

export const CONTACT = {
  whatsapp: '525645915734', // 52 (México) + número de 10 dígitos
  email: 'contacto@xolum.mx',
  ciudad: 'Ciudad de México',
};

export const waLink = (texto: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(texto)}`;

export const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/xolumsolutions/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61593226901128' },
] as const;

// Identidad de marca basada en la filosofía de Xólotl: protección, dirección y fiabilidad.
export const nosotros = {
  origen:
    'En la mitología mexica, Xólotl es la deidad guardiana que acompaña a las almas a través de los pasajes complejos de la oscuridad. De este principio nace XOLUM: ingeniería de software que guía, optimiza y protege las operaciones de empresas en crecimiento.',
  slogan: 'Guía en la luz, guardia en la sombra.',
  mision:
    'Desarrollar plataformas de software personalizadas, automatizaciones con IA y sistemas de videovigilancia de grado industrial para empresas que requieren operaciones eficientes, seguras y escalables.',
  vision:
    'Consolidarnos como el socio tecnológico de referencia en Latinoamérica para empresas que buscan delegar la complejidad técnica y enfocarse en su expansión.',
  valores: [
    { icon: 'Handshake', t: 'Transparencia de Ingeniería', d: 'Arquitecturas limpias, código propietario sin intermediarios y comunicación directa de ingeniero a empresa.' },
    { icon: 'ShieldCheck', t: 'Seguridad Operativa 24/7', d: 'Protección integral de datos, cifrado en tránsito y continuidad de negocio ante cualquier eventualidad.' },
    { icon: 'Sparkle', t: 'Estándar Premium', d: 'Diseño de interfaz de alto impacto, tiempos de respuesta ultra-bajos y atención obsesiva por el detalle.' },
  ],
};

export const stats = [
  { valor: 14, sufijo: '+', label: 'Empresas operando plataformas desarrolladas por XOLUM' },
  { valor: 7, sufijo: '+', label: 'Sistemas de videovigilancia inteligente XOLSEC activos' },
  { valor: 5, sufijo: '', label: 'Motores de IA y bots de WhatsApp en producción' },
  { valor: 60, sufijo: ' FPS', label: 'Rendimiento de interfaz y renderizado optimizado' },
];

export const bots = [
  {
    id: 'almacen',
    nombre: 'Bot de Almacén e Inventario',
    tagline: 'Gestión de stock en tiempo real desde WhatsApp',
    descripcion:
      'Elimina sistemas complejos de escritorio. Tu equipo puede consultar existencias, registrar entradas o salidas, solicitar herramientas y generar listas de corte con una foto o comando de voz por WhatsApp.',
    capacidades: [
      'Consulta instantánea de stock y alertas de mínimos por producto',
      'Registro automatizado de entradas, salidas y consumos por obra o sucursal',
      'Control de préstamos de herramienta con firma y usuario responsable',
      'Generación de cotizaciones en PDF y planes de optimización de materiales',
    ],
    chat: [
      { de: 'user', texto: '¿Cuánto cable calibre 12 nos queda en bodega?' },
      { de: 'bot', texto: '340 m en existencia (mínimo operativo: 200 m). Nivel de stock: Óptimo.' },
      { de: 'user', texto: 'Salieron 80 m para la obra de San Ángel.' },
      { de: 'bot', texto: 'Registrado. Salida: 80 m. Stock actualizado: 260 m.' },
    ],
  },
  {
    id: 'facturacion',
    nombre: 'Bot de Facturación CFDI 4.0',
    tagline: 'Emisión de facturas automatizada en segundos',
    descripcion:
      'El cliente envía la foto de su Constancia de Situación Fiscal. Nuestro motor de visión por IA extrae los datos fiscales, valida RFC ante el SAT, solicita el uso de CFDI y timbra automáticamente entregando PDF y XML.',
    capacidades: [
      'Extracción automática de datos fiscales mediante visión artificial',
      'Validación de RFC y régimen fiscal contra catálogos vigentes del SAT',
      'Selección de uso de CFDI y forma de pago con botones interactivos',
      'Timbrado inmediato vía PAC certificado y entrega instantánea de XML + PDF',
    ],
    chat: [
      { de: 'user', texto: '[Adjunta foto de Constancia de Situación Fiscal]' },
      { de: 'bot', texto: 'Datos validados: RASF860917J3A · Régimen Simplificado de Confianza. ¿Uso de CFDI?' },
      { de: 'user', texto: 'G03 · Gastos en general' },
      { de: 'bot', texto: 'Factura timbrada ante el SAT con éxito. Archivos PDF y XML generados.' },
    ],
  },
  {
    id: 'citas',
    nombre: 'Bot de Citas y Reservas',
    tagline: 'Motor de agenda automatizada con prevención de solapamientos',
    descripcion:
      'Gestiona reservaciones de servicios de forma continua por WhatsApp. El sistema guía al usuario paso a paso (Servicio → Especialista → Horario disponible), confirma la cita y envía recordatorios preventivos.',
    capacidades: [
      'Flujo conversacional guiado de alta conversión',
      'Motor de sincronización de agenda sin riesgo de doble reserva',
      'Notificaciones y recordatorios automáticos 24h antes del compromiso',
      'Integración opcional con panel web para personal de recepción',
    ],
    chat: [
      { de: 'user', texto: 'Necesito agendar corte con Beto este sábado' },
      { de: 'bot', texto: 'Horarios disponibles para Beto el sábado: 11:00, 12:30 y 16:00. ¿Cuál prefieres?' },
      { de: 'user', texto: '12:30' },
      { de: 'bot', texto: 'Cita confirmada: Sábado 12:30 con Beto. Enviaremos un recordatorio preventivo.' },
    ],
  },
  {
    id: 'difusion',
    nombre: 'Bot de Difusión Segmentada',
    tagline: 'Campañas masivas de alta entrega mediante Meta Cloud API',
    descripcion:
      'Comunica actualizaciones, avisos de pago o promociones exclusivas a tu base de datos mediante plantillas oficiales aprobadas por Meta, protegiendo tu número contra bloqueos.',
    capacidades: [
      'Segmentación precisa por tipo de cliente, estatus o zona geográfica',
      'Envío gradual mediante Meta Cloud API oficial con tasa de apertura >90%',
      'Rastreo en tiempo real de mensajes entregados, leídos y respondidos',
      'Flujos automatizados de respuesta tras el contacto inicial',
    ],
    chat: [
      { de: 'user', texto: 'Manda el aviso de actualización a la lista de clientes VIP' },
      { de: 'bot', texto: '212 contactos identificados. ¿Confirmar envío de plantilla "aviso-vip"?' },
      { de: 'user', texto: 'Confirmado, enviar.' },
      { de: 'bot', texto: 'Envío iniciado: 212 mensajes procesados. 189 entregados, 24 interacciones.' },
    ],
  },
] as const;

export const verticales = [
  { icon: 'Barbell', nombre: 'Barbería y Estética', desc: 'Control de citas, comisión de personal y portal de reservas.' },
  { icon: 'Package', nombre: 'Almacén y Suministros', desc: 'Kardex digital, entradas/salidas por QR y alertas por WhatsApp.' },
  { icon: 'Tooth', nombre: 'Clínica Dental y Salud', desc: 'Expediente clínico, agendas cruzadas y seguimiento de tratamientos.' },
  { icon: 'ForkKnife', nombre: 'Restaurantes y Alimentos', desc: 'Comandero web, control de inventario de insumos y menú digital.' },
  { icon: 'Barbell', nombre: 'Gimnasios y Centros Fitness', desc: 'Control de accesos, cobros recurrentes y vigencia de membresías.' },
  { icon: 'Stethoscope', nombre: 'Consultorios Médicos', desc: 'Recordatorio preventivo de citas y archivo digital de pacientes.' },
  { icon: 'Invoice', nombre: 'Servicios Profesionales', desc: 'Emisión masiva de CFDI 4.0 y cobro automatizado por WhatsApp.' },
  { icon: 'Buildings', nombre: 'Operación a la Medida', desc: 'Desarrollamos soluciones personalizadas para tu flujo de trabajo.' },
];

export const servicios = [
  {
    icon: 'Code',
    titulo: 'Plataformas & Software a la Medida',
    desc: 'Arquitecturas web escalables y sistemas de gestión interna que eliminan procesos manuales en hojas de cálculo. Construidos con React, Node y bases de datos relacionales de alta velocidad.',
    puntos: [
      'Paneles de administración con roles y permisos finos',
      'Bases de datos relacionales cifradas y respaldadas',
      'APIs de integración con tus sistemas actuales',
    ],
  },
  {
    icon: 'WhatsappLogo',
    titulo: 'Automatización con IA por WhatsApp',
    desc: 'Soluciones conversacionales conectadas a Meta Cloud API oficial. Procesan mensajes de texto, notas de voz y documentos visuales para resolver tareas operativas sin intervención humana.',
    puntos: [
      'Modelos de IA conversacional y lectura OCR de documentos',
      'Integración nativa con tu inventario y bases de datos',
      'Infraestructura oficial aprobada por Meta',
    ],
  },
  {
    icon: 'Palette',
    titulo: 'Experiencias Web & Landings de Alto Impacto',
    desc: 'Sitios corporativos y portales digitales que proyectan solidez de marca e ingeniería avanzada. Diseñados con animaciones de precisión, tecnología 3D en navegador y optimización SEO.',
    puntos: [
      'Animación fluida y gráficos WebGL adaptativos',
      'Optimización de tasa de conversión y carga ultrarrápida',
      'Adaptación perfecta a dispositivos móviles y escritorios',
    ],
  },
];

export const proceso = [
  {
    n: '01',
    titulo: 'Diagnóstico & Análisis Operativo',
    desc: 'Auditamos el flujo de trabajo de tu empresa para identificar los cuellos de botella que consumen tiempo y recursos.',
  },
  {
    n: '02',
    titulo: 'Arquitectura de Sistema & Prototipado',
    desc: 'Diseñamos la estructura técnica del software, las bases de datos y los modelos de IA antes de escribir la primera línea de código.',
  },
  {
    n: '03',
    titulo: 'Desarrollo & Automatización IA',
    desc: 'Construimos la plataforma con estándares de ingeniería modernos, realizando pruebas rigurosas de seguridad y rendimiento.',
  },
  {
    n: '04',
    titulo: 'Despliegue, Monitoreo & Escala',
    desc: 'Ponemos el sistema en producción, capacitamos a tu equipo y proporcionamos soporte técnico continuo para acompañar tu crecimiento.',
  },
];

export const proyectos = [
  {
    nombre: 'NICTE',
    tipo: 'Plataforma Legal & Análisis de Contratos con IA',
    logo: '/proyectos/nicte.png',
    variant: 'light' as const,
    resumen: 'Sistema de procesamiento de documentos jurídicos con extracción de cláusulas críticas mediante IA.',
  },
  {
    nombre: 'ICEMEX',
    tipo: 'Portal Corporativo & Control de Almacén',
    logo: '/proyectos/icemex.png',
    variant: 'dark' as const,
    resumen: 'Plataforma web integrada con inventario en tiempo real y catálogo digital de suministros.',
  },
  {
    nombre: 'CARHEMA',
    tipo: 'Experiencia Web 3D para Arquitectura',
    logo: '/proyectos/carhema.jpg',
    variant: 'light' as const,
    resumen: 'Showcase inmersivo interactivo para visualización de proyectos inmobiliarios de alta gama.',
  },
  {
    nombre: 'La Santa',
    tipo: 'Plataforma Digital de Restaurante',
    logo: '/proyectos/lasanta.jpg',
    variant: 'dark' as const,
    resumen: 'Sistema de reserva de mesas, menú digital interactivo y gestión de experiencia del comensal.',
  },
  {
    nombre: 'Los Ramos',
    tipo: 'Restaurante & Operación Digital',
    logo: '/proyectos/losramos.jpg',
    variant: 'dark' as const,
    resumen: 'Comandero digital y plataforma de pedidos directa para optimizar tiempos de cocina.',
  },
  {
    nombre: 'The Land Café',
    tipo: 'Sitio Web Corporativo & Marca',
    logo: null,
    variant: 'word' as const,
    word: 'the land',
    wordClass: 'font-serif italic',
    resumen: 'Experiencia visual elegante orientada a posicionar la identidad de la marca y sus sucursales.',
  },
  {
    nombre: 'Los Bigotes',
    tipo: 'Landing Page & Motor de Agendamiento',
    logo: '/proyectos/losbigotes.jpg',
    variant: 'dark' as const,
    resumen: 'Portal de reservaciones con asignación automática de barbero y recordatorios preventivos.',
  },
  {
    nombre: 'Kinara',
    tipo: 'E-commerce & Catálogo de Producto',
    logo: null,
    variant: 'word' as const,
    word: 'KINARA',
    wordClass: 'tracking-[0.25em] font-light',
    resumen: 'Plataforma e-commerce minimalista optimizada para velocidad de carga y conversión.',
  },
];

export const xolsec = {
  claim: 'Seguridad Inteligente: Análisis en Tiempo Real & Alertas en Sitio.',
  intro:
    'XOLSEC es la división de seguridad electrónica y visión artificial de XOLUM. Integramos sistemas de videovigilancia profesional con modelos de inteligencia artificial procesados localmente en la cámara, permitiendo detectar intrusiones y emitir alertas inmediatas sin depender de monitoreo manual.',
  servicios: [
    {
      icon: 'VideoCamera',
      titulo: 'Videovigilancia Profesional CCTV',
      desc: 'Instalación de cámaras motorizadas PTZ, domo y tipo bala con resolución 4K, certificación IP66 para intemperie y visión nocturna infrarroja.',
    },
    {
      icon: 'Brain',
      titulo: 'Visión Artificial Edge AI',
      desc: 'Procesamiento de imágenes directo en sitio: modelos de Deep Learning que discriminan entre personas, vehículos y falsa alarma (lluvia, animales, vegetación).',
    },
    {
      icon: 'BellRinging',
      titulo: 'Alertas Automatizadas por WhatsApp/Telegram',
      desc: 'Ante cualquier evento sospechoso fuera de horario, el sistema transmite una notificación prioritaria con el clip de video adjunto en menos de 3 segundos.',
    },
    {
      icon: 'DeviceMobile',
      titulo: 'Centro de Monitoreo Móvil Cifrado',
      desc: 'Acceso seguro multi-dispositivo a transmisiones en vivo y grabaciones en NVR desde cualquier ubicación mediante conexiones cifradas.',
    },
  ],
  compromiso: [
    { n: '01', t: 'Levantamiento & Diseño Perimetral', d: 'Evaluamos la geometría del inmueble para eliminar puntos ciegos y determinar el equipo óptimo.' },
    { n: '02', t: 'Instalación & Cableado Estructurado', d: 'Montaje profesional, canalización industrial y configuración de red privada de seguridad.' },
    { n: '03', t: 'Garantía & Mantenimiento Preventivo', d: 'Respaldo directo en hardware, soporte ante incidencias y actualización periódica de modelos de IA.' },
  ],
  camaras: [
    {
      icon: 'VideoCamera',
      nombre: 'Cámara PTZ Exterior Motorizada',
      desc: 'Domo exterior de alta velocidad con giro de 360°, inclinación vertical y zoom óptico inteligente.',
      specs: ['2K / 4K HR', 'Conexión PoE / Wi-Fi', 'IP66 Intemperie', 'Seguimiento Táctico'],
    },
    {
      icon: 'SecurityCamera',
      nombre: 'Cámara Tipo Bala Perimetral',
      desc: 'Diseño de largo alcance ideal para cobertura de fachadas, estacionamientos y pasillos industriales.',
      specs: ['4–5 MP', 'Visión Nocturna Color', 'Batería Solar Opcional', 'Carcasa Antivandálica'],
    },
    {
      icon: 'HouseLine',
      nombre: 'Domo Interior Discreto',
      desc: 'Monitoreo discreto de alto rendimiento para oficinas, recepción y salas de servidores.',
      specs: ['Full HD 1080p', 'Audio Bidireccional', 'Detección de Movimiento', 'Diseño Elegante'],
    },
    {
      icon: 'Lightbulb',
      nombre: 'Cámara PTZ Integrada en Foco',
      desc: 'Vigilancia disimulada con lente dual e instalación simplificada en socket estándar.',
      specs: ['Lente Dual 2MP+2MP', 'Giro 355°', 'Plug & Play', 'Visión 360°'],
    },
    {
      icon: 'Sun',
      nombre: 'Sistema Solar Autónomo',
      desc: 'Unidad de vigilancia autosuficiente alimentada por panel solar para ubicaciones sin cableado.',
      specs: ['Panel Solar Integrado', 'Conexión 4G / Wi-Fi', 'Operación 24/7', 'Zero Cableado'],
    },
  ],
  frigate: {
    titulo: 'Caso de Operación Real: Detección en Tiempo Real',
    desc: 'En una instalación protegida por XOLSEC, un motor de inteligencia artificial procesa el flujo de video a 30 FPS. Al registrar una persona en el perímetro fuera de horario laboral, el sistema envía automáticamente una alerta con evidencia en video a Telegram en menos de 3 segundos.',
    alertas: [
      { hora: '02:14', texto: 'Persona detectada · Patio trasero · Fuera de horario laboral', nivel: 'alto' },
      { hora: '02:14', texto: 'Evidencia en video (12 s) adjunta · Nivel de confianza 94%', nivel: 'info' },
      { hora: '07:03', texto: 'Vehículo registrado · Acceso vehicular principal', nivel: 'medio' },
    ],
  },
};
