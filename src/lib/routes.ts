import { HomeVariant } from '../types';

/**
 * The site has TWO dedicated homepages — one per puja — plus a Google Ads
 * landing page. All three are real paths served from the same index.html via
 * the vercel.json rewrites, so every link to them (nav bar, footer, sitemap)
 * must use exactly these constants.
 *
 *   /                        -> Kaalsarp Puja homepage
 *   /narayan-nagbali-puja    -> Narayan Nagbali Puja homepage
 *   /kaal-sarp-puja          -> standalone Google Ads landing page (no chrome)
 */
export const KAALSARP_HOME_PATH = '/';
export const NAGBALI_HOME_PATH = '/narayan-nagbali-puja';
export const KAAL_SARP_LANDING_PATH = '/kaal-sarp-puja';

/** Path of each dedicated homepage, keyed by variant. */
export const HOME_PATHS: Record<HomeVariant, string> = {
  kaalsarp: KAALSARP_HOME_PATH,
  nagbali: NAGBALI_HOME_PATH,
};

/** Strips trailing slashes so `/x` and `/x/` compare equal. */
export function normalizePath(path: string): string {
  const clean = path.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

/** True when `path` points at the Kaalsarp homepage (`/` or `/index.html`). */
export function isKaalsarpHomePath(path: string): boolean {
  return /^\/(index\.html)?$/i.test(normalizePath(path));
}

/** Which dedicated homepage a browser path belongs to. */
export function homeVariantFromPath(path: string): HomeVariant {
  return normalizePath(path) === NAGBALI_HOME_PATH ? 'nagbali' : 'kaalsarp';
}

/** True when the browser is already sitting on the given homepage. */
export function isOnHomePath(path: string, variant: HomeVariant): boolean {
  return variant === 'nagbali'
    ? normalizePath(path) === NAGBALI_HOME_PATH
    : isKaalsarpHomePath(path);
}
