import React from 'react';
import { Phone } from 'lucide-react';
import {
  trackEvent,
  whatsappUrl,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
} from '../lib/analytics';

interface FloatingButtonsProps {
  onOpenWhatsApp: () => void;
  lang?: 'en' | 'hi';
}

/** Official WhatsApp glyph (brand asset path). */
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/**
 * Persistent floating conversion buttons.
 *   LEFT  → WhatsApp (secondary)
 *   RIGHT → Call (primary, glowing + periodic ripple, ringing animation)
 * Respects safe-area insets and prefers-reduced-motion.
 */
export const FloatingButtons: React.FC<FloatingButtonsProps> = ({ lang = 'en' }) => {
  return (
    <>
      {/* ---------- LEFT: WhatsApp (secondary) ---------- */}
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { cta_location: 'floating_left' })}
        aria-label={lang === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'Chat on WhatsApp'}
        title={lang === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'Chat on WhatsApp'}
        className="fixed z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 transition-transform hover:scale-105 active:scale-95 sm:h-14 sm:w-14"
        style={{
          left: 'max(0.85rem, env(safe-area-inset-left))',
          bottom: 'max(0.85rem, env(safe-area-inset-bottom))',
        }}
      >
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>

      {/* ---------- RIGHT: Call (primary) ---------- */}
      <a
        href={BUSINESS_PHONE_TEL}
        id="floating-call-btn"
        onClick={() => trackEvent('floating_call_click', { cta_location: 'floating_right' })}
        aria-label={`${lang === 'hi' ? 'अभी कॉल करें' : 'Call now'} ${BUSINESS_PHONE_DISPLAY}`}
        title={lang === 'hi' ? 'सीधा कॉल करें' : 'Call the pandit directly'}
        className="floating-call-btn fixed z-50 flex h-[3.9rem] w-[3.9rem] items-center justify-center rounded-full bg-green-600 text-white shadow-xl shadow-black/25 transition-transform hover:scale-105 hover:bg-green-700 active:scale-95 sm:h-[4.2rem] sm:w-[4.2rem]"
        style={{
          right: 'max(0.85rem, env(safe-area-inset-right))',
          bottom: 'max(0.85rem, env(safe-area-inset-bottom))',
        }}
      >
        {/* Expanding ripple ring (paused for reduced motion) */}
        <span className="floating-call-ripple" aria-hidden="true" />
        {/* Phone icon with ringing animation */}
        <Phone className="floating-call-icon relative h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
      </a>
    </>
  );
};
