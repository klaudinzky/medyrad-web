import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronRight, MessageCircle, ShieldCheck } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function Legal({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  const title = privacy ? "Política de privacidad" : "Términos y condiciones";
  useEffect(() => {
    const description = privacy ? "Política de privacidad del sitio web público de Medyrad Osorno." : "Términos y condiciones de uso del sitio web público de Medyrad Osorno.";
    document.title = `${title} | Medyrad Osorno`;
    const setMeta = (selector: string, content: string) => { const node = document.querySelector<HTMLMetaElement>(selector); if (node) node.content = content; };
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', document.title);
    setMeta('meta[property="og:description"]', description);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://medyrad.cl/${privacy ? "politica-de-privacidad" : "terminos-y-condiciones"}/`;
  }, [privacy, title]);
  return (
    <div className="min-h-[100dvh] bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <nav aria-label="Migas de pan" className="flex items-center gap-2 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary">Inicio</Link><ChevronRight size={14}/><span aria-current="page">{title}</span></nav>
          <header className="mt-10 border-l-4 border-secondary pl-5 md:pl-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Sitio web Medyrad</p><h1 className="mt-3 text-4xl text-primary md:text-5xl">{title}</h1><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{privacy ? "Cómo tratamos la información que usted comparte al navegar o contactarnos a través de nuestros canales públicos." : "Condiciones generales para una navegación informada y responsable en el sitio web público de Medyrad."}</p></header>
          <div className="editorial-copy mt-12 max-w-3xl rounded-2xl border border-border bg-card p-6 md:p-10">
            {privacy ? <PrivacyContent /> : <TermsContent />}
          </div>
          <aside className="mt-10 flex flex-col gap-5 rounded-2xl bg-accent p-6 md:flex-row md:items-center md:justify-between"><div className="flex gap-3"><ShieldCheck className="mt-1 shrink-0 text-primary" size={22}/><div><h2 className="text-lg text-primary">¿Necesita consultar sobre este sitio?</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Escríbanos por WhatsApp o contáctenos directamente en Medyrad Osorno.</p></div></div><a href="https://wa.me/56952191118" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 font-bold text-primary hover:text-secondary"><MessageCircle size={18}/> Contactar</a></aside>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function PrivacyContent() {
  return <><h2>1. Alcance</h2><p>Esta política se aplica a la información entregada voluntariamente en el sitio web público de Medyrad y en sus canales de contacto vinculados desde este sitio.</p><h2>2. Información que podemos recibir</h2><p>Según el canal utilizado, podemos recibir datos de contacto y el contenido de su consulta. Le recomendamos no enviar antecedentes clínicos sensibles, resultados de exámenes ni información que no sea necesaria para iniciar una conversación.</p><h2>3. Uso de la información</h2><p>La información se utiliza para responder consultas, orientar sobre canales de atención y mejorar la comunicación del sitio. El envío de una consulta no constituye reserva de hora, atención médica ni confirmación de prestación.</p><h2>4. Enlaces y canales externos</h2><p>Este sitio puede enlazar a WhatsApp, redes sociales y plataformas de resultados. Cada servicio opera bajo sus propias condiciones y políticas. Revise esas políticas antes de compartir información.</p><h2>5. Consultas sobre privacidad</h2><p>Si desea realizar una consulta relacionada con la información enviada mediante nuestros canales públicos, contáctenos por WhatsApp al +56 9 5219 1118 o por los datos de contacto publicados en este sitio.</p><h2>6. Actualizaciones</h2><p>Podemos actualizar este texto para reflejar cambios en nuestros canales digitales o prácticas de comunicación. La versión vigente estará disponible en esta página.</p></>;
}

function TermsContent() {
  return <><h2>1. Propósito del sitio</h2><p>El sitio web de Medyrad entrega información general sobre el centro, sus servicios y formas de contacto. Procuramos mantener el contenido claro y actualizado, pero puede modificarse sin aviso previo.</p><h2>2. Información de salud</h2><p>Los contenidos publicados son de carácter informativo y no reemplazan una consulta, evaluación, indicación, diagnóstico ni tratamiento realizado por profesionales de la salud. Ante dudas sobre su condición o un examen, consulte a su profesional tratante o contacte a Medyrad por sus canales oficiales.</p><h2>3. Contacto y agendamiento</h2><p>Los enlaces de contacto permiten iniciar una conversación con el centro. La disponibilidad, preparación, valores y requisitos de atención deben confirmarse directamente con Medyrad. No utilice estos canales para emergencias médicas.</p><h2>4. Uso permitido</h2><p>Puede navegar y compartir enlaces al contenido para fines personales e informativos. No está permitido reproducir, modificar o utilizar contenido, marcas o imágenes del sitio de manera que induzca a error sobre su origen o relación con Medyrad.</p><h2>5. Enlaces externos</h2><p>Los enlaces a sitios de terceros se proporcionan como referencia o canal de servicio. Medyrad no controla el contenido, disponibilidad ni políticas de dichos sitios.</p><h2>6. Contacto</h2><p>Para consultas sobre el sitio, sus contenidos o estos términos, comuníquese con Medyrad Osorno a través del WhatsApp +56 9 5219 1118 o los datos de contacto publicados en el sitio.</p></>;
}