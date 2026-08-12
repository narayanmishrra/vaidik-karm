/**
 * Lightweight Google Tag Manager / Google Ads event layer helper.
 *
 * The site loads the Google Tag Manager container (GTM-N99NDZMP) in index.html.
 * GTM reads `window.dataLayer`; custom events pushed here can be mapped to
 * Google Ads conversion tags inside GTM without touching this code:
 *
 *   Primary conversions (set up as Google Ads conversion actions in GTM):
 *     - kaal_sarp_phone_click     -> Phone call
 *     - kaal_sarp_whatsapp_click  -> WhatsApp chat
 *     - kaal_sarp_booking_submit  -> Booking form submission
 *
 *   Secondary interactions (used for engagement metrics, not conversions):
 *     - kaal_sarp_cta_click       -> CTA button clicks (label in `cta_label`)
 *     - kaal_sarp_scroll_depth    -> 25 / 50 / 75 / 100 % scroll
 *     - kaal_sarp_section_view    -> Booking / contact section became visible
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: string, params: Record<string, unknown> = {}): void {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {
    // Tracking must never break the user experience.
  }
}

/* ------------------------------------------------------------------ */
/* Shared business constants (single source of truth for the landing    */
/* page — keep in sync with the main site: +91 91096 95176)             */
/* ------------------------------------------------------------------ */

export const BUSINESS_PHONE_DISPLAY = '+91 91096 95176';
export const BUSINESS_PHONE_TEL = 'tel:+919109695176';
export const WHATSAPP_NUMBER = '919109695176';
export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello, I want to enquire about Kaal Sarp Puja in Trimbakeshwar.';

export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Opens an external URL (WhatsApp chat) without ever breaking the page. */
export function openExternal(url: string): void {
  try {
    window.open(url, '_blank', 'noopener');
  } catch {
    // Fallback for environments where window.open is unavailable.
    try {
      window.location.href = url;
    } catch {
      // Never break the user experience.
    }
  }
}
