import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Button } from "@/components/ui/button";
import mriImg from "@/assets/service-mri.jpg";
import ctImg from "@/assets/service-ct.jpg";
import xrayImg from "@/assets/service-xray.jpg";
import ultrasoundImg from "@/assets/service-ultrasound.jpg";
import labImg from "@/assets/service-lab.jpg";

type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  overview: string[];
  when: string[];
  preparation: string[];
  faq: { question: string; answer: string }[];
};

const siteUrl = "https://medyrad.cl";
const appointmentUrl = "https://wa.me/56952191118";

const services: Record<string, Service> = {
  "/resonancia-magnetica-osorno": {
    slug: "resonancia-magnetica-osorno",
    title: "Resonancia Magnética en Osorno",
    eyebrow: "Diagnóstico por imágenes",
    description: "Imágenes detalladas para acompañar la evaluación indicada por su profesional tratante.",
    metaDescription: "Resonancia magnética en Osorno. Conozca el examen, orientación previa y cómo coordinar su hora en Medyrad.",
    image: mriImg, imageAlt: "Equipo de resonancia magnética en Medyrad Osorno",
    overview: ["La resonancia magnética utiliza un campo magnético y ondas de radio para obtener imágenes detalladas de distintas zonas del cuerpo.", "Es un examen solicitado habitualmente para complementar la evaluación de estructuras como cerebro, columna, articulaciones, músculos y otros tejidos. No utiliza radiación ionizante.", "En Medyrad le orientamos antes de su atención para que llegue con la información que corresponde a su orden médica."],
    when: ["Evaluación de columna, articulaciones y lesiones musculoesqueléticas.", "Estudio indicado por el profesional tratante en áreas neurológicas.", "Caracterización de tejidos blandos según la solicitud médica."],
    preparation: ["Informe previamente si tiene implantes, dispositivos médicos, prótesis, antecedentes de cirugía o posibilidad de embarazo.", "Retire objetos metálicos, joyas y accesorios antes del examen.", "La preparación puede cambiar según la zona a estudiar o si se solicita contraste. Confírmela con Medyrad al agendar."],
    faq: [{ question: "¿La resonancia usa radiación?", answer: "No. La resonancia magnética no utiliza radiación ionizante; funciona con un campo magnético y ondas de radio." }, { question: "¿Debo llevar mi orden médica?", answer: "Sí. Lleve su orden y, si dispone de ellos, exámenes o informes previos que puedan servir de referencia." }],
  },
  "/scanner-tomografia-osorno": {
    slug: "scanner-tomografia-osorno", title: "Scanner y Tomografía en Osorno", eyebrow: "Diagnóstico por imágenes",
    description: "Tomografía computada para estudios solicitados por su médico, con orientación clara antes de asistir.",
    metaDescription: "Scanner y tomografía computada en Osorno. Información útil sobre el examen, preparación y agendamiento en Medyrad.",
    image: ctImg, imageAlt: "Equipo de scanner o tomografía computada en Medyrad Osorno",
    overview: ["La tomografía computada, también conocida como scanner, genera imágenes en cortes de diferentes zonas del cuerpo.", "Es una herramienta de apoyo diagnóstico que su profesional puede indicar para revisar estructuras internas con mayor detalle.", "El equipo de Medyrad le explicará los pasos generales de su atención y resolverá las dudas administrativas previas al examen."],
    when: ["Estudios de cabeza, tórax, abdomen, pelvis o extremidades según orden médica.", "Evaluaciones de estructuras óseas y órganos internos.", "Exámenes con protocolo definido por el médico tratante."],
    preparation: ["Tenga disponible su orden médica y antecedentes de estudios anteriores.", "Informe alergias, enfermedades renales, medicamentos y posibilidad de embarazo, especialmente si su solicitud menciona contraste.", "Algunos exámenes requieren indicaciones de alimentación o hidratación. Confirme siempre su preparación con Medyrad."],
    faq: [{ question: "¿Qué es un scanner?", answer: "Es el nombre habitual de la tomografía computada: un examen que obtiene imágenes en cortes de una zona del cuerpo." }, { question: "¿Todos los scanner usan contraste?", answer: "No necesariamente. El uso de contraste depende de la indicación médica y del protocolo del examen." }],
  },
  "/radiografias-osorno": {
    slug: "radiografias-osorno", title: "Radiografías Digitales en Osorno", eyebrow: "Diagnóstico por imágenes",
    description: "Radiología digital para los exámenes indicados por su profesional de salud.",
    metaDescription: "Radiografías digitales en Osorno. Revise qué llevar, cómo prepararse y contacte a Medyrad para coordinar su atención.",
    image: xrayImg, imageAlt: "Radiografía digital en Medyrad Osorno",
    overview: ["La radiografía es un examen de imagen ampliamente utilizado para observar principalmente huesos y algunas estructuras del tórax.", "La tecnología digital permite registrar las imágenes del estudio solicitado por su médico.", "Su atención considera las indicaciones del examen y medidas de resguardo que correspondan al tipo de radiografía."],
    when: ["Evaluación de huesos y articulaciones ante una indicación clínica.", "Radiografías de tórax solicitadas por el profesional tratante.", "Controles o estudios comparativos cuando son requeridos en la orden médica."],
    preparation: ["Lleve su orden médica y estudios previos si los tiene.", "Use ropa cómoda; puede ser necesario retirar objetos metálicos de la zona a examinar.", "Informe al personal si existe posibilidad de embarazo antes de realizar el examen."],
    faq: [{ question: "¿Necesito agendar una radiografía?", answer: "La disponibilidad puede variar según el tipo de estudio. Escríbanos por WhatsApp para confirmar horarios e indicaciones." }, { question: "¿Debo llevar exámenes anteriores?", answer: "Es recomendable llevarlos si los tiene, especialmente cuando el profesional solicita comparación." }],
  },
  "/ecografias-osorno": {
    slug: "ecografias-osorno", title: "Ecografías en Osorno", eyebrow: "Diagnóstico por imágenes",
    description: "Estudios ecográficos solicitados por su profesional, con indicaciones previas según la zona a evaluar.",
    metaDescription: "Ecografías en Osorno: información sobre estudios abdominales, de partes blandas y otras indicaciones. Contacte a Medyrad.",
    image: ultrasoundImg, imageAlt: "Examen de ecografía en Medyrad Osorno",
    overview: ["La ecografía utiliza ondas de ultrasonido para generar imágenes en tiempo real de órganos, tejidos y vasos sanguíneos.", "Puede ser indicada para distintas zonas del cuerpo, incluyendo abdomen, partes blandas y evaluación vascular, de acuerdo con el criterio clínico.", "Cada examen tiene requisitos propios. Por eso, una confirmación previa ayuda a que su atención se realice con las indicaciones adecuadas."],
    when: ["Ecografías abdominales y de partes blandas.", "Estudios vasculares cuando el profesional tratante lo solicita.", "Evaluación de una zona específica según su orden médica."],
    preparation: ["Lleve la orden médica con el tipo de ecografía claramente indicado.", "Para algunos estudios puede requerirse ayuno o mantener la vejiga llena.", "No siga instrucciones genéricas: confirme con Medyrad la preparación exacta de su examen."],
    faq: [{ question: "¿Todas las ecografías requieren ayuno?", answer: "No. La preparación depende del área a estudiar; algunas ecografías no requieren ayuno." }, { question: "¿Qué debo llevar?", answer: "Su orden médica, documento de identificación y exámenes anteriores relacionados, si dispone de ellos." }],
  },
  "/laboratorio-clinico-osorno": {
    slug: "laboratorio-clinico-osorno", title: "Laboratorio Clínico en Osorno", eyebrow: "Apoyo diagnóstico",
    description: "Exámenes de laboratorio solicitados por su profesional, con orientación sobre requisitos previos.",
    metaDescription: "Laboratorio clínico en Osorno. Consulte por toma de muestras, preparación de exámenes y atención en Medyrad.",
    image: labImg, imageAlt: "Área de laboratorio clínico en Medyrad Osorno",
    overview: ["El laboratorio clínico procesa muestras solicitadas por profesionales de salud para apoyar la evaluación y seguimiento de distintas condiciones.", "La toma de muestra y sus requisitos dependen del examen solicitado: algunos necesitan ayuno, horarios específicos o instrucciones particulares.", "Antes de asistir, revise su orden y contáctenos para confirmar las condiciones de preparación que aplican en su caso."],
    when: ["Exámenes de sangre y perfiles solicitados en una orden médica.", "Controles de laboratorio indicados por el profesional tratante.", "Estudios bioquímicos y otras determinaciones disponibles según solicitud."],
    preparation: ["Lleve su orden médica y documento de identificación.", "Verifique si su examen requiere ayuno y por cuántas horas.", "Consulte antes de suspender medicamentos; siga siempre las indicaciones de su profesional tratante y confirme requisitos con Medyrad."],
    faq: [{ question: "¿Debo ir en ayunas?", answer: "Depende del examen. Confirme el requisito y el horario recomendado antes de asistir." }, { question: "¿Puedo tomar mis medicamentos?", answer: "No modifique tratamientos por cuenta propia. Consulte a su médico y comuníquenos el examen solicitado para orientar la preparación." }],
  },
};

function ServiceSeo({ service }: { service: Service }) {
  useEffect(() => {
    const url = `${siteUrl}/${service.slug}`;
    document.title = `${service.title} | Medyrad`;
    const setMeta = (selector: string, content: string) => {
      const element = document.querySelector(selector) as HTMLMetaElement | null;
      if (element) element.content = content;
    };
    setMeta('meta[name="description"]', service.metaDescription);
    setMeta('meta[property="og:title"]', `${service.title} | Medyrad Osorno`);
    setMeta('meta[property="og:description"]', service.metaDescription);
    setMeta('meta[property="og:url"]', url);
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = url;
    const scriptId = "service-json-ld";
    document.getElementById(scriptId)?.remove();
    const script = document.createElement("script");
    script.id = scriptId; script.type = "application/ld+json";
    script.text = JSON.stringify({ "@context": "https://schema.org", "@type": "MedicalProcedure", name: service.title, description: service.metaDescription, url, image: `${siteUrl}${service.image}`, provider: { "@type": "MedicalOrganization", name: "Medyrad Osorno", url: siteUrl, telephone: "+56 9 5219 1118", address: { "@type": "PostalAddress", addressLocality: "Osorno", addressRegion: "Los Lagos", addressCountry: "CL" } } });
    document.head.appendChild(script);
    return () => document.getElementById(scriptId)?.remove();
  }, [service]);
  return null;
}

export default function ServiceDetail() {
  const [location] = useLocation();
  const service = services[location];
  if (!service) return null;
  return <div className="min-h-screen bg-background font-sans text-gray-700">
    <ServiceSeo service={service} />
    <Navbar />
    <main className="pt-20">
      <section className="relative isolate overflow-hidden bg-primary py-16 md:py-24">
        <div className="absolute inset-0 opacity-20"><img src={service.image} alt="" className="h-full w-full object-cover" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
        <div className="container relative mx-auto px-4 md:px-6">
          <Link href="/#servicios" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" /> Volver a servicios</Link>
          <div className="mt-10 max-w-3xl animate-service-reveal">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary-foreground">{service.eyebrow}</p>
            <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{service.description}</p>
            <Button asChild size="lg" className="mt-8 rounded-full bg-secondary px-7 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-secondary/90"><a href={appointmentUrl} target="_blank" rel="noopener noreferrer"><Calendar className="mr-2 h-5 w-5" /> Consultar por hora</a></Button>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20"><div className="container mx-auto grid gap-12 px-4 md:grid-cols-[1.2fr_.8fr] md:px-6">
        <div className="animate-service-reveal">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary">Información del examen</p>
          <h2 className="mt-3 text-3xl font-heading font-bold text-gray-900">Orientación antes de su atención</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-600">{service.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
        <aside className="rounded-2xl border border-blue-100 bg-blue-50/70 p-7 shadow-sm">
          <ShieldCheck className="h-8 w-8 text-primary" /><h2 className="mt-4 text-xl font-heading font-bold text-gray-900">Antes de venir</h2>
          <p className="mt-3 leading-relaxed text-gray-600">Traiga su orden médica y confirme la preparación antes de asistir. Nuestro equipo puede orientarle por WhatsApp.</p>
          <a href={appointmentUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-secondary"><MessageCircle className="h-5 w-5" /> Hablar con Medyrad <ArrowRight className="h-4 w-4" /></a>
        </aside>
      </div></section>
      <section className="bg-gray-50/80 py-16"><div className="container mx-auto grid gap-10 px-4 md:grid-cols-2 md:px-6">
        <div><h2 className="text-3xl font-heading font-bold text-gray-900">¿En qué casos puede indicarse?</h2><p className="mt-3 text-gray-600">Estos son ejemplos generales. La solicitud y la interpretación corresponden a su profesional tratante.</p><ul className="mt-7 space-y-4">{service.when.map((item) => <li key={item} className="flex gap-3 leading-relaxed text-gray-700"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />{item}</li>)}</ul></div>
        <div className="rounded-2xl bg-white p-7 shadow-md"><Clock3 className="h-7 w-7 text-secondary" /><h2 className="mt-4 text-2xl font-heading font-bold text-gray-900">Preparación y recomendaciones</h2><ul className="mt-5 space-y-4">{service.preparation.map((item) => <li key={item} className="border-l-2 border-secondary pl-4 leading-relaxed text-gray-600">{item}</li>)}</ul></div>
      </div></section>
      <section className="py-16 md:py-20"><div className="container mx-auto max-w-4xl px-4 md:px-6"><p className="text-center text-sm font-bold uppercase tracking-[0.16em] text-secondary">Preguntas frecuentes</p><h2 className="mt-3 text-center text-3xl font-heading font-bold text-gray-900">Resolvemos sus dudas habituales</h2><div className="mt-10 grid gap-5">{service.faq.map((item) => <article key={item.question} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"><h3 className="font-heading text-lg font-bold text-gray-900">{item.question}</h3><p className="mt-3 leading-relaxed text-gray-600">{item.answer}</p></article>)}</div></div></section>
      <section className="bg-secondary py-14 text-center text-white"><div className="container mx-auto px-4"><h2 className="text-3xl font-heading font-bold">¿Tiene dudas sobre su examen?</h2><p className="mx-auto mt-3 max-w-2xl text-lg text-white/90">Contáctenos para confirmar disponibilidad, orden médica y requisitos de preparación.</p><Button asChild size="lg" className="mt-7 rounded-full bg-white px-8 font-bold text-secondary hover:bg-gray-100"><a href={appointmentUrl} target="_blank" rel="noopener noreferrer">Contactar por WhatsApp</a></Button></div></section>
    </main><WhatsAppButton /><Footer />
  </div>;
}