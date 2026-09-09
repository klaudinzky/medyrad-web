import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CalendarDays, ChevronRight, FileText, MessageCircle, Tag } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { blogPosts } from "@/generated/content";

const siteUrl = "https://medyrad.cl";

function setSeo(title: string, description: string, canonical: string, image = `${siteUrl}/opengraph.jpg`) {
  document.title = title;
  const setMeta = (selector: string, value: string) => {
    const element = document.querySelector<HTMLMetaElement>(selector);
    if (element) element.content = value;
  };
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:url"]', canonical);
  setMeta('meta[property="og:image"]', image);
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', description);
  setMeta('meta[name="twitter:image"]', image);
  const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (link) link.href = canonical;
}

export function BlogIndex() {
  useEffect(() => {
    setSeo("Blog de salud e imagenología | Medyrad", "Información y novedades de salud, diagnóstico por imágenes y laboratorio clínico de Medyrad Osorno.", `${siteUrl}/blog/`);
  }, []);

  return (
    <div className="min-h-[100dvh] page-wash">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="max-w-3xl border-l-4 border-secondary pl-5 md:pl-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Información para pacientes</p>
            <h1 className="mt-3 text-4xl text-primary md:text-6xl">Conversaciones claras sobre su salud</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Orientación cercana sobre exámenes, preparación y diagnóstico por imágenes desde Medyrad Osorno.</p>
          </div>
        </section>
        <section className="container mx-auto mt-14 max-w-6xl px-4 md:px-6">
          {blogPosts.length === 0 ? (
            <div className="max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-[0_16px_42px_hsl(208_74%_31%_/_0.07)] md:p-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary"><FileText size={22} /></div>
              <h2 className="mt-6 text-2xl text-primary">Estamos preparando este espacio</h2>
              <p className="mt-3 leading-7 text-muted-foreground">Próximamente compartiremos contenidos revisados por nuestro equipo para acompañar sus dudas antes y después de un examen.</p>
              <a href="https://wa.me/56952191118" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 font-bold text-primary hover:text-secondary transition-colors">Hable con Medyrad <ArrowRight size={17} /></a>
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2">
              {blogPosts.map((post) => (
                <article key={post.slug} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_30px_hsl(208_74%_31%_/_0.06)] transition-transform duration-300 hover:-translate-y-1">
                  <img src={post.featuredImage} alt={post.featuredImageAlt || `Imagen del artículo ${post.title}`} className="aspect-[16/8] w-full object-cover" loading="lazy" />
                  <div className="p-6 md:p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">{post.category}</p>
                    <h2 className="mt-3 text-2xl text-primary"><Link href={`/blog/${post.slug}/`} className="hover:text-secondary transition-colors">{post.title}</Link></h2>
                    <p className="mt-3 leading-7 text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4">
                      <time dateTime={post.publishDate} className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays size={15} />{post.publishDate}</time>
                      <Link href={`/blog/${post.slug}/`} aria-label={`Leer artículo: ${post.title}`} className="text-primary transition-transform duration-300 group-hover:translate-x-1"><ArrowRight size={20} /></Link>
                    </div>
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

export function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  useEffect(() => {
    if (!post) return;
    const canonical = post.canonicalOverride || `${siteUrl}/blog/${post.slug}/`;
    const image = post.featuredImage.startsWith("http") ? post.featuredImage : `${siteUrl}${post.featuredImage}`;
    setSeo(post.seoTitle, post.seoDescription, canonical, image);
  }, [post]);

  if (!post) {
    return <div className="min-h-[100dvh] page-wash"><Navbar /><main className="container mx-auto max-w-3xl px-4 pb-20 pt-36 text-center"><p className="text-sm font-bold uppercase tracking-widest text-secondary">Blog Medyrad</p><h1 className="mt-3 text-3xl text-primary">No encontramos este artículo</h1><p className="mt-4 text-muted-foreground">Puede que el enlace haya cambiado o que el contenido ya no esté publicado.</p><Link href="/blog/" className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground">Volver al blog</Link></main><Footer /></div>;
  }

  return (
    <div className="min-h-[100dvh] bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <article className="container mx-auto max-w-4xl px-4 md:px-6">
          <nav aria-label="Migas de pan" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary">Inicio</Link><ChevronRight size={14}/><Link href="/blog/" className="hover:text-primary">Blog</Link><ChevronRight size={14}/><span aria-current="page" className="max-w-[18rem] truncate text-foreground">{post.title}</span></nav>
          <header>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">{post.category}</p>
            <h1 className="mt-3 text-4xl text-primary md:text-6xl">{post.title}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-muted-foreground">{post.excerpt}</p>
            <div className="mt-7 border-y border-border py-4 text-sm text-muted-foreground"><strong className="text-foreground">Revisado por {post.author}</strong>{post.authorCredentials ? ` · ${post.authorCredentials}` : ""}<span className="mx-2">|</span><time dateTime={post.publishDate}>Publicado {post.publishDate}</time>{post.updatedDate && post.updatedDate !== post.publishDate ? <><span className="mx-2">|</span>Actualizado {post.updatedDate}</> : null}</div>
            <img src={post.featuredImage} alt={post.featuredImageAlt || `Imagen principal: ${post.title}`} className="mt-8 w-full rounded-2xl object-cover shadow-sm" />
          </header>
          <div className="editorial-copy mt-10 max-w-3xl text-[1.06rem]" dangerouslySetInnerHTML={{ __html: post.html }} />
          {post.gallery.map((item) => (
            <figure className="mt-10" key={item.image}>
              <img src={item.image} alt={item.alt || `Imagen complementaria del artículo ${post.title}`} className="w-full rounded-2xl" loading="lazy" />
              {item.caption && <figcaption className="mt-3 border-l-2 border-secondary pl-3 text-sm leading-6 text-muted-foreground">{item.caption}</figcaption>}
            </figure>
          ))}
          {post.tags.length > 0 && <section aria-label="Etiquetas del artículo" className="mt-10 border-t border-border pt-7"><p className="flex items-center gap-2 text-sm font-bold text-primary"><Tag size={16}/> Temas relacionados</p><div className="mt-3 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-accent px-3 py-1.5 text-sm text-primary">{tag}</span>)}</div></section>}
          <aside className="mt-12 rounded-2xl bg-primary p-7 text-primary-foreground md:flex md:items-center md:justify-between md:gap-8"><div><p className="text-sm font-bold uppercase tracking-widest text-secondary-foreground">¿Tiene una consulta?</p><h2 className="mt-2 text-2xl">Conversemos sobre su atención en Medyrad.</h2><p className="mt-2 text-primary-foreground/80">Nuestro equipo puede orientarle por nuestros canales de contacto.</p></div><a href="https://wa.me/56952191118" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full bg-background px-5 py-3 font-bold text-primary transition-transform hover:-translate-y-0.5 md:mt-0"><MessageCircle size={18}/> Contactar por WhatsApp</a></aside>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}