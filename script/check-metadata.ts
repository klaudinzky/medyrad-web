import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pageMetadata, SITE_URL } from "../shared/page-metadata";
import { loadContent } from "./content";

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Validate the actual HTML, without executing JavaScript. Optionally check Netlify. */
export async function checkMetadata(baseUrl?: string) {
  const content = await loadContent();
  const expected = [
    ...Object.entries(pageMetadata).map(([route, meta]) => ({ route, ...meta, canonical: `${SITE_URL}${route}`, article: false })),
    ...content.blogPosts.map(post => ({
      route: `/blog/${post.slug}/`, title: post.seoTitle, description: post.seoDescription,
      canonical: post.canonicalOverride || `${SITE_URL}/blog/${post.slug}/`, article: true,
    })),
  ];
  async function get(route: string) {
    if (!baseUrl) return readFile(path.join("dist/public", route === "/sitemap.xml" ? "sitemap.xml" : `${route.slice(1)}index.html`), "utf8");
    const response = await fetch(new URL(route, baseUrl));
    assert.equal(response.status, 200, `${route}: HTTP status`);
    return response.text();
  }
  const sitemap = await get("/sitemap.xml");
  for (const page of expected) {
    const html = await get(page.route);
    assert.equal((html.match(/<title>/g) || []).length, 1, `${page.route}: one title`);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${page.route}: one canonical`);
    assert.equal((html.match(/name="description"/g) || []).length, 1, `${page.route}: one description`);
    for (const tag of [
      `<title>${escape(page.title)}</title>`,
      `<meta name="description" content="${escape(page.description)}">`,
      `<link rel="canonical" href="${escape(page.canonical)}">`,
      `<meta property="og:url" content="${escape(page.canonical)}">`,
      `<meta property="og:title" content="${escape(page.title)}">`,
      `<meta property="og:description" content="${escape(page.description)}">`,
      `<meta name="twitter:title" content="${escape(page.title)}">`,
      `<meta name="twitter:description" content="${escape(page.description)}">`,
    ]) assert.ok(html.includes(tag), `${page.route}: missing ${tag}`);
    assert.ok(html.includes('type="module"'), `${page.route}: React bundle preserved`);
    assert.ok(html.includes('name="google-site-verification"'), `${page.route}: verification preserved`);
    if (page.article) {
      assert.ok(html.includes("<article"), `${page.route}: prerendered article preserved`);
      assert.ok(html.includes('"@type":"BlogPosting"'), `${page.route}: article schema preserved`);
    }
    if (page.canonical === `${SITE_URL}${page.route}`) {
      assert.ok(sitemap.includes(`<loc>${page.canonical}</loc>`), `${page.route}: sitemap matches canonical`);
    }
    // Existing non-trailing-slash links must also serve the right metadata.
    if (baseUrl && page.route !== "/") {
      const alias = await get(page.route.slice(0, -1));
      assert.ok(alias.includes(`<link rel="canonical" href="${escape(page.canonical)}">`), `${page.route}: slashless URL`);
    }
  }
  console.log(`Verified initial HTML metadata for ${expected.length} pages (${baseUrl || "dist/public"}).`);
}

if (process.argv[1]?.endsWith("check-metadata.ts")) {
  await checkMetadata(process.argv[2]);
}