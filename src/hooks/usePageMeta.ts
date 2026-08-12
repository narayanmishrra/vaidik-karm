import { useEffect } from 'react';

/**
 * Client-side page metadata manager (title / description / canonical / OG /
 * LCP preload / JSON-LD structured data).
 *
 * The SPA is served from a single index.html, so route-specific meta tags are
 * applied here and restored to the index.html defaults when the route changes.
 */

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  /** Path of the LCP image to preload with high fetch priority. */
  preloadImage?: string;
  /** Structured data objects; serialised into <script type="application/ld+json"> in <head>. */
  jsonLd?: object[];
}

interface SavedMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  robots: string;
}

let saved: SavedMeta | null = null;
let injectedPreloads: HTMLLinkElement[] = [];
let injectedJsonLd: HTMLScriptElement[] = [];

function readMeta(name: string): string {
  return document.querySelector<HTMLMetaElement>(`meta[property="${name}"], meta[name="${name}"]`)?.content ?? '';
}

function setMeta(selector: string, attr: 'content' | 'href', value: string): void {
  let el = document.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!el) {
    // Create the tag if the current document doesn't have it (robustness).
    if (selector.startsWith('link')) {
      el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
    } else {
      el = document.createElement('meta');
      const nameMatch = selector.match(/meta\[(?:name|property)="([^"]+)"\]/);
      if (nameMatch) el.setAttribute(selector.includes('property') ? 'property' : 'name', nameMatch[1]);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function saveDefaults(): void {
  if (saved) return;
  saved = {
    title: document.title,
    description: readMeta('description'),
    canonical: document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? '',
    ogTitle: readMeta('og:title'),
    ogDescription: readMeta('og:description'),
    ogUrl: readMeta('og:url'),
    ogImage: readMeta('og:image'),
    robots: readMeta('robots'),
  };
}

function restoreDefaults(): void {
  if (!saved) return;
  document.title = saved.title;
  setMeta('meta[name="description"]', 'content', saved.description);
  setMeta('link[rel="canonical"]', 'href', saved.canonical);
  setMeta('meta[property="og:title"]', 'content', saved.ogTitle);
  setMeta('meta[property="og:description"]', 'content', saved.ogDescription);
  setMeta('meta[property="og:url"]', 'content', saved.ogUrl);
  setMeta('meta[property="og:image"]', 'content', saved.ogImage);
  if (saved.robots) setMeta('meta[name="robots"]', 'content', saved.robots);
  else document.querySelector('meta[name="robots"]')?.remove();
}

function apply(meta: PageMeta): void {
  saveDefaults();
  document.title = meta.title;
  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('link[rel="canonical"]', 'href', meta.canonical);
  if (meta.ogTitle) setMeta('meta[property="og:title"]', 'content', meta.ogTitle);
  if (meta.ogDescription) setMeta('meta[property="og:description"]', 'content', meta.ogDescription);
  if (meta.canonical) setMeta('meta[property="og:url"]', 'content', meta.canonical);
  if (meta.ogImage) setMeta('meta[property="og:image"]', 'content', meta.ogImage);

  // LCP preload — never lazy-load the hero image.
  if (meta.preloadImage) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = meta.preloadImage;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    injectedPreloads.push(link);
  }

  // Structured data (JSON-LD) — facts must match visible page content.
  if (meta.jsonLd?.length) {
    meta.jsonLd.forEach((obj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(obj);
      document.head.appendChild(script);
      injectedJsonLd.push(script);
    });
  }
}

function cleanup(): void {
  restoreDefaults();
  injectedPreloads.forEach((el) => el.remove());
  injectedJsonLd.forEach((el) => el.remove());
  injectedPreloads = [];
  injectedJsonLd = [];
}

export function usePageMeta(meta: PageMeta | null): void {
  useEffect(() => {
    if (!meta) return;
    apply(meta);
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    meta?.title,
    meta?.description,
    meta?.canonical,
    meta?.preloadImage,
    meta?.jsonLd?.length,
  ]);
}
