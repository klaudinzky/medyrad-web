import {
  pageMetadata,
  SITE_URL,
  type PageMetadata,
} from "@shared/page-metadata";

export type MetadataType = "website" | "article";

const DEFAULT_IMAGE = `${SITE_URL}/opengraph.jpg`;

function normalizePath(path: string): string {
  const pathWithoutOrigin = path.startsWith(SITE_URL)
    ? path.slice(SITE_URL.length)
    : path;
  const pathname = pathWithoutOrigin.split(/[?#]/, 1)[0] || "/";

  if (pathname === "/") return "/";
  return `/${pathname.replace(/^\/+|\/+$/g, "")}/`;
}

function absoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function setMeta(
  attribute: "name" | "property",
  name: string,
  content: string,
): void {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${name}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.content = content;
}

/**
 * Applies one complete set of page metadata after a client-side navigation.
 * The optional metadata argument is useful for CMS-backed blog articles,
 * while the site's fixed pages resolve from the shared pageMetadata record.
 */
export function applyPageMetadata(
  path: string,
  metadata?: PageMetadata,
  type: MetadataType = "website",
): void {
  const canonicalPath = normalizePath(path);
  const resolvedMetadata = metadata ?? pageMetadata[canonicalPath];

  if (!resolvedMetadata) return;

  const canonical = /^https?:\/\//i.test(path)
    ? path
    : `${SITE_URL}${canonicalPath}`;
  const image = absoluteUrl(resolvedMetadata.image ?? DEFAULT_IMAGE);

  document.title = resolvedMetadata.title;
  setMeta("name", "description", resolvedMetadata.description);
  setMeta("property", "og:title", resolvedMetadata.title);
  setMeta("property", "og:description", resolvedMetadata.description);
  setMeta("property", "og:type", type);
  setMeta("property", "og:url", canonical);
  setMeta("property", "og:image", image);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", resolvedMetadata.title);
  setMeta("name", "twitter:description", resolvedMetadata.description);
  setMeta("name", "twitter:image", image);

  let canonicalLink = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = canonical;
}