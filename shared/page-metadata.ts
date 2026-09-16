export type PageMetadata = {
  title: string;
  description: string;
  image?: string;
};

export const SITE_URL = "https://medyrad.cl";

export const pageMetadata: Record<string, PageMetadata> = {
  "/": {
    title: "Medyrad Osorno | Imagenología, Resonancia, Scanner y Ecografías",
    description:
      "Medyrad Osorno: diagnóstico por imágenes, atención médica y laboratorio clínico. Resonancia magnética, scanner/tomografía, radiografías y ecografías. Agenda por WhatsApp.",
  },
  "/resonancia-magnetica-osorno/": {
    title: "Resonancia Magnética en Osorno | Medyrad",
    description:
      "Resonancia magnética en Osorno. Conozca el examen, orientación previa y cómo coordinar su hora en Medyrad.",
  },
  "/scanner-tomografia-osorno/": {
    title: "Scanner y Tomografía en Osorno | Medyrad",
    description:
      "Scanner y tomografía computada en Osorno. Información útil sobre el examen, preparación y agendamiento en Medyrad.",
  },
  "/radiografias-osorno/": {
    title: "Radiografías Digitales en Osorno | Medyrad",
    description:
      "Radiografías digitales en Osorno. Revise qué llevar, cómo prepararse y contacte a Medyrad para coordinar su atención.",
  },
  "/ecografias-osorno/": {
    title: "Ecografías en Osorno | Medyrad",
    description:
      "Ecografías en Osorno: información sobre estudios abdominales, de partes blandas y otras indicaciones. Contacte a Medyrad.",
  },
  "/laboratorio-clinico-osorno/": {
    title: "Laboratorio Clínico en Osorno | Medyrad",
    description:
      "Laboratorio clínico en Osorno. Consulte por toma de muestras, preparación de exámenes y atención en Medyrad.",
  },
  "/equipo/": {
    title: "Equipo | Medyrad Osorno",
    description:
      "Conozca los perfiles profesionales publicados del equipo de Medyrad Osorno.",
  },
  "/politica-de-privacidad/": {
    title: "Política de privacidad | Medyrad Osorno",
    description:
      "Política de privacidad del sitio web público de Medyrad Osorno.",
  },
  "/terminos-y-condiciones/": {
    title: "Términos y condiciones | Medyrad Osorno",
    description:
      "Términos y condiciones de uso del sitio web público de Medyrad Osorno.",
  },
  "/blog/": {
    title: "Blog de salud e imagenología | Medyrad",
    description:
      "Información y novedades de salud, diagnóstico por imágenes y laboratorio clínico de Medyrad Osorno.",
  },
};