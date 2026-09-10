import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const siteUrl = "https://medyrad.cl";
const blogDir = path.resolve("client/content/blog");
const teamDir = path.resolve("client/content/team");
const generatedFile = path.resolve("client/src/generated/content.ts");
const outputDir = path.resolve("dist/public");

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  updatedDate: string;
  author: string;
  authorCredentials: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  gallery: { image: string; alt: string; caption?: string }[];
  seoTitle: string;
  seoDescription: string;
  canonicalOverride?: string;
  html: string;
};

export type TeamMember = {
  name: string;
  profession: string;
  specialty: string;
  experience: string;
  credentials: string[];
  photo: string;
  photoAlt: string;
  order: number;
  html: string;
};

const cleanMarkdown = async (markdown: string) =>
  sanitizeHtml(await marked.parse(markdown), {
    allowedTags: [
      "p", "br", "strong", "em", "s", "blockquote", "ul", "ol", "li",
      "h2", "h3", "h4", "h5", "h6", "a", "img", "figure", "figcaption",
      "code", "pre", "hr", "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title"],
      th: ["scope"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
  });

function required(data: Record<string, unknown>, field: string, file: string): string {
  const value = data[field];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${file}: el campo "${field}" es obligatorio`);
  }
  return value.trim();
}

function date(data: Record<string, unknown>, field: string, file: string): string {
  const value = data[field];
  const parsed = value instanceof Date
    ? value
    : typeof value === "string" && value.trim()
      ? new Date(value)
      : new Date(Number.NaN);
  if (Number.isNaN(parsed.valueOf())) throw new Error(`${file}: fecha "${field}" inválida`);
  return parsed.toISOString().slice(0, 10);
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

async function markdownFiles(directory: string) {
  return (await readdir(directory))
    .filter((name) => name.endsWith(".md") && name.toLowerCase() !== "readme.md")
    .sort();
}

export async function loadContent(): Promise<{ blogPosts: BlogPost[]; teamMembers: TeamMember[] }> {
  const blogPosts: BlogPost[] = [];
  for (const file of await markdownFiles(blogDir)) {
    const parsed = matter(await readFile(path.join(blogDir, file), "utf8"));
    const data = parsed.data as Record<string, unknown>;
    if (data.draft !== false) continue;
    const slug = required(data, "slug", file);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${file}: slug inválido`);
    if (blogPosts.some((post) => post.slug === slug)) throw new Error(`${file}: el slug "${slug}" está duplicado`);
    const gallery = Array.isArray(data.gallery)
      ? data.gallery.map((item, index) => {
          const entry = item as Record<string, unknown>;
          return {
            image: required(entry, "image", `${file} galería ${index + 1}`),
            alt: required(entry, "alt", `${file} galería ${index + 1}`),
            ...(typeof entry.caption === "string" && entry.caption.trim()
              ? { caption: entry.caption.trim() }
              : {}),
          };
        })
      : [];
    const canonical = typeof data.canonicalOverride === "string" && data.canonicalOverride.trim()
      ? data.canonicalOverride.trim()
      : undefined;
    if (canonical && !/^https?:\/\//.test(canonical)) {
      throw new Error(`${file}: canonicalOverride debe ser una URL absoluta`);
    }
    blogPosts.push({
      title: required(data, "title", file),
      slug,
      excerpt: required(data, "excerpt", file),
      publishDate: date(data, "publishDate", file),
      updatedDate: date(data, "updatedDate", file),
      author: required(data, "author", file),
      authorCredentials: required(data, "authorCredentials", file),
      category: required(data, "category", file),
      tags: strings(data.tags),
      featuredImage: required(data, "featuredImage", file),
      featuredImageAlt: required(data, "featuredImageAlt", file),
      gallery,
      seoTitle: required(data, "seoTitle", file),
      seoDescription: required(data, "seoDescription", file),
      ...(canonical ? { canonicalOverride: canonical } : {}),
      html: await cleanMarkdown(parsed.content),
    });
  }
  blogPosts.sort((a, b) => b.publishDate.localeCompare(a.publishDate));

  const teamMembers: TeamMember[] = [];
  for (const file of await markdownFiles(teamDir)) {
    const parsed = matter(await readFile(path.join(teamDir, file), "utf8"));
    const data = parsed.data as Record<string, unknown>;
    if (data.visible !== true) continue;
    const order = Number(data.order);
    if (!Number.isInteger(order) || order < 0) throw new Error(`${file}: orden inválido`);
    const credentials = strings(data.credentials);
    if (credentials.length === 0) throw new Error(`${file}: debe incluir al menos una credencial verificada`);
    teamMembers.push({
      name: required(data, "name", file),
      profession: required(data, "profession", file),
      specialty: required(data, "specialty", file),
      experience: required(data, "experience", file),
      credentials,
      photo: required(data, "photo", file),
      photoAlt: required(data, "photoAlt", file),
      order,
      html: await cleanMarkdown(parsed.content),
    });
  }
  teamMembers.sort((a, b) => a.order - b.order);
  return { blogPosts, teamMembers };
}

export async function generateReactContent() {
  const content = await loadContent();
  const source = `// Generated by script/content.ts. Do not edit directly.
export type GalleryItem = { image: string; alt: string; caption?: string };
export type BlogPost = { title: string; slug: string; excerpt: string; publishDate: string; updatedDate: string; author: string; authorCredentials: string; category: string; tags: string[]; featuredImage: string; featuredImageAlt: string; gallery: GalleryItem[]; seoTitle: string; seoDescription: string; canonicalOverride?: string; html: string };
export type TeamMember = { name: string; profession: string; specialty: string; experience: string; credentials: string[]; photo: string; photoAlt: string; order: number; html: string };
export const blogPosts: BlogPost[] = ${JSON.stringify(content.blogPosts, null, 2)};
export const teamMembers: TeamMember[] = ${JSON.stringify(content.teamMembers, null, 2)};
`;
  await mkdir(path.dirname(generatedFile), { recursive: true });
  await writeFile(generatedFile, source);
  return content;
}

const escapeText = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const absoluteUrl = (value: string) => value.startsWith("http") ? value : `${siteUrl}${value.startsWith("/") ? "" : "/"}${value}`;
const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

function shell(indexHtml: string, head: string, main: string) {
  const assetTags = [
    ...(indexHtml.match(/<link[^>]+rel="stylesheet"[^>]*>/g) ?? []),
    ...(indexHtml.match(/<script[^>]+type="module"[^>]*><\/script>/g) ?? []),
  ].join("\n");
  return `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">${head}<link rel="icon" type="image/png" href="/favicon.png">${assetTags}</head><body><div id="root">${main}</div></body></html>`;
}

export async function generateStaticContent(
  content?: Awaited<ReturnType<typeof loadContent>>,
) {
  content ??= await loadContent();
  const indexHtml = await readFile(path.join(outputDir, "index.html"), "utf8");
  const blogCards = content.blogPosts.map((post) => `
    <article class="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <img src="${escapeText(post.featuredImage)}" alt="${escapeText(post.featuredImageAlt)}" class="w-full aspect-video object-cover">
      <div class="p-6"><p class="text-sm text-primary font-semibold">${escapeText(post.category)}</p>
      <h2 class="text-2xl mt-2"><a href="/blog/${post.slug}/">${escapeText(post.title)}</a></h2>
      <p class="mt-3 text-gray-600">${escapeText(post.excerpt)}</p>
      <time datetime="${post.publishDate}" class="block mt-4 text-sm text-gray-500">${post.publishDate}</time></div>
    </article>`).join("");
  const blogHead = `<title>Blog de salud e imagenología | Medyrad</title><meta name="description" content="Información y novedades de salud, diagnóstico por imágenes y laboratorio clínico de Medyrad Osorno."><link rel="canonical" href="${siteUrl}/blog/"><meta name="robots" content="index, follow"><meta property="og:type" content="website"><meta property="og:title" content="Blog | Medyrad"><meta property="og:description" content="Información y novedades de Medyrad Osorno."><meta property="og:url" content="${siteUrl}/blog/"><meta property="og:image" content="${siteUrl}/opengraph.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${siteUrl}/opengraph.jpg">`;
  const blogMain = `<main class="min-h-screen bg-gray-50 pt-28 pb-16"><div class="container mx-auto px-4 md:px-6 max-w-5xl"><nav aria-label="Migas de pan" class="mb-8"><a href="/">Inicio</a> / Blog</nav><h1 class="text-4xl text-primary mb-8">Blog</h1><div class="grid md:grid-cols-2 gap-8">${blogCards || "<p>Aún no hay artículos publicados.</p>"}</div></div></main>`;
  await mkdir(path.join(outputDir, "blog"), { recursive: true });
  await writeFile(path.join(outputDir, "blog/index.html"), shell(indexHtml, blogHead, blogMain));

  for (const post of content.blogPosts) {
    const canonical = post.canonicalOverride || `${siteUrl}/blog/${post.slug}/`;
    const articleSchema = {
      "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title,
      description: post.seoDescription, image: absoluteUrl(post.featuredImage),
      datePublished: post.publishDate, dateModified: post.updatedDate,
      author: { "@type": "Person", name: post.author, description: post.authorCredentials },
      publisher: { "@type": "Organization", name: "Medyrad Osorno", url: siteUrl },
      mainEntityOfPage: canonical,
    };
    const breadcrumbs = {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog/` },
        { "@type": "ListItem", position: 3, name: post.title, item: canonical },
      ],
    };
    const head = `<title>${escapeText(post.seoTitle)}</title><meta name="description" content="${escapeText(post.seoDescription)}"><link rel="canonical" href="${escapeText(canonical)}"><meta name="robots" content="index, follow"><meta property="og:type" content="article"><meta property="og:title" content="${escapeText(post.seoTitle)}"><meta property="og:description" content="${escapeText(post.seoDescription)}"><meta property="og:url" content="${escapeText(canonical)}"><meta property="og:image" content="${escapeText(absoluteUrl(post.featuredImage))}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeText(post.seoTitle)}"><meta name="twitter:description" content="${escapeText(post.seoDescription)}"><meta name="twitter:image" content="${escapeText(absoluteUrl(post.featuredImage))}"><script type="application/ld+json">${jsonLd(articleSchema)}</script><script type="application/ld+json">${jsonLd(breadcrumbs)}</script>`;
    const gallery = post.gallery.map((item) => `<figure><img src="${escapeText(item.image)}" alt="${escapeText(item.alt)}">${item.caption ? `<figcaption>${escapeText(item.caption)}</figcaption>` : ""}</figure>`).join("");
    const main = `<main class="min-h-screen bg-white pt-28 pb-16"><article class="container mx-auto px-4 md:px-6 max-w-3xl"><nav aria-label="Migas de pan" class="mb-8"><a href="/">Inicio</a> / <a href="/blog/">Blog</a> / ${escapeText(post.title)}</nav><header><p class="text-primary font-semibold">${escapeText(post.category)}</p><h1 class="text-4xl md:text-5xl mt-2">${escapeText(post.title)}</h1><p class="text-xl text-gray-600 mt-4">${escapeText(post.excerpt)}</p><p class="mt-4 text-sm">Por ${escapeText(post.author)}, ${escapeText(post.authorCredentials)} · <time datetime="${post.publishDate}">${post.publishDate}</time></p><img src="${escapeText(post.featuredImage)}" alt="${escapeText(post.featuredImageAlt)}" class="w-full rounded-xl mt-8"></header><div class="prose max-w-none mt-10">${post.html}</div>${gallery}</article></main>`;
    const directory = path.join(outputDir, "blog", post.slug);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "index.html"), shell(indexHtml, head, main));
  }

  const routes = [
    "/", "/resonancia-magnetica-osorno", "/scanner-tomografia-osorno",
    "/radiografias-osorno", "/ecografias-osorno", "/laboratorio-clinico-osorno",
    "/blog/", "/equipo", "/politica-de-privacidad", "/terminos-y-condiciones",
    ...content.blogPosts.filter((post) => !post.canonicalOverride).map((post) => `/blog/${post.slug}/`),
  ];
  const today = new Date().toISOString().slice(0, 10);
  const entries = routes.map((route) => `  <url><loc>${siteUrl}${route}</loc><lastmod>${today}</lastmod></url>`).join("\n");
  await writeFile(path.join(outputDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`);
}