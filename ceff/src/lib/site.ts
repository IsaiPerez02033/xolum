// Datos oficiales del Centro Educativo Federico Froebel (Teoloyucan)

export const SITE = {
  name: "Centro Educativo Federico Froebel",
  shortName: "CEFF",
  city: "Teoloyucan, Estado de México",
  motto: "Por el estudio, la superación humana",
  tagline: "Educamos con amor, disciplina y excelente nivel académico.",
  address: "Av. Nacional No. 2, Cda. Progreso, Teoloyucan, México, 54770",
  email: "cefteoloyucan@gmail.com",

  // Teléfonos
  phones: ["55 763 926 72", "593 914 0576"],

  // WhatsApp (número principal, formato internacional sin símbolos)
  whatsapp: "525576392672",

  // Redes sociales
  instagram: "https://www.instagram.com/ceff.teoloyucan",
  instagramHandle: "@ceff.teoloyucan",
  facebook: "https://www.facebook.com/profile.php?id=61570908203636",
  facebookHandle: "Centro Educativo Federico Froebel",

  // Google Maps (búsqueda por dirección)
  mapsQuery:
    "Centro Educativo Federico Froebel, Av. Nacional, Teoloyucan, Estado de México",
};

export const waLink = (message: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const WA_MESSAGES = {
  informes:
    "Hola, quiero información sobre las inscripciones en el Centro Educativo Federico Froebel.",
  visita:
    "Hola, me gustaría agendar una visita para conocer el Centro Educativo Federico Froebel.",
  becas:
    "Hola, quiero información sobre las becas y descuentos de inscripción del Centro Educativo Federico Froebel.",
};
