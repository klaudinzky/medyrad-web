import { useEffect } from "react";
import { Award, MessageCircle, ShieldCheck, UsersRound } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { teamMembers } from "@/generated/content";

export default function Team() {
  useEffect(() => {
    document.title = "Equipo | Medyrad Osorno";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = "Conozca los perfiles profesionales publicados del equipo de Medyrad Osorno.";
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = "https://medyrad.cl/equipo/";
  }, []);

  return (
    <div className="min-h-[100dvh] page-wash">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-8 rounded-3xl bg-primary px-7 py-10 text-primary-foreground md:grid-cols-[1.25fr_.75fr] md:px-12 md:py-14">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-foreground">Medyrad Osorno</p><h1 className="mt-3 text-4xl md:text-5xl">Personas que acompañan cada examen</h1><p className="mt-5 max-w-2xl leading-8 text-primary-foreground/80">Conozca los perfiles y antecedentes profesionales que nuestro centro ha publicado para usted.</p></div>
            <div className="grid content-center gap-4 border-primary-foreground/15 md:border-l md:pl-8"><div className="flex items-center gap-3 text-sm"><ShieldCheck className="text-secondary-foreground" size={20}/> Información presentada desde perfiles publicados</div><div className="flex items-center gap-3 text-sm"><UsersRound className="text-secondary-foreground" size={20}/> Atención con cercanía y respeto</div></div>
          </div>
        </section>
        <section className="container mx-auto mt-12 max-w-6xl px-4 md:px-6">
          {teamMembers.length === 0 ? <div className="max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-sm md:p-12"><Award className="text-secondary" size={28}/><h2 className="mt-5 text-2xl text-primary">Perfiles en actualización</h2><p className="mt-3 leading-7 text-muted-foreground">Aún no hay perfiles profesionales publicados en esta sección. Para resolver dudas sobre atención o exámenes, contáctenos directamente.</p><a href="https://wa.me/56952191118" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:text-secondary">Consultar a Medyrad <MessageCircle size={17}/></a></div> : (
            <div className="grid gap-8 md:grid-cols-2">
              {teamMembers.map((member) => (
                <article key={`${member.name}-${member.order}`} className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_30px_hsl(208_74%_31%_/_0.06)]">
                  <img src={member.photo} alt={member.photoAlt || `Retrato profesional de ${member.name}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <div className="p-6 md:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">{member.profession}</p>
                    <h2 className="mt-2 text-2xl text-primary">{member.name}</h2>
                    {member.specialty && <p className="mt-1 font-semibold text-foreground">{member.specialty}</p>}
                    {member.experience && <p className="mt-4 leading-7 text-muted-foreground">{member.experience}</p>}
                    {member.credentials.length > 0 && <div className="mt-5 border-t border-border pt-4"><p className="text-sm font-bold text-primary">Antecedentes publicados</p><ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">{member.credentials.map((credential) => <li key={credential} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"/>{credential}</li>)}</ul></div>}
                    {member.html && <div className="editorial-copy mt-5 text-sm" dangerouslySetInnerHTML={{ __html: member.html }} />}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}