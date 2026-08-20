import React from 'react';
import { Phone, MessageSquare, ShieldCheck, Award, Flame, Users, MapPin, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroSectionProps {
  onOpenWhatsAppBuilder: () => void;
  onNavigateToServices: () => void;
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenWhatsAppBuilder,
  onNavigateToServices,
  lang
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative bg-[#FBF3E7] text-[#241A16] border-b border-[#D98E2B]/40 overflow-hidden">
      {/* ============================ HERO ============================ */}
      <div className="relative">
        {/* Mobile full-bleed background image (below lg). Desktop keeps its own card. */}
        <div className="absolute inset-0 lg:hidden" aria-hidden="true">
          <img
            src="/images/Trimbakeshwar_Mandir.webp"
            srcSet="/images/Trimbakeshwar_Mandir-640.webp 640w, /images/Trimbakeshwar_Mandir.webp 960w"
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Cinematic dark gradient for readable text (image stays visible) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140a07] via-[#140a07]/55 to-[#140a07]/10" />
          {/* Subtle brand tint under the sticky header for a seamless transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#6B0F1A]/45 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-center">
            {/* Desktop image column (unchanged visual) */}
            <div className="hidden lg:block lg:order-2 lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D98E2B] shadow-2xl bg-stone-900 group">
                <img
                  src="/images/Trimbakeshwar_Mandir.webp"
                  alt="Trimbakeshwar Sanctum"
                  className="w-full lg:h-[504px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6B0F1A]/90 via-[#6B0F1A]/20 to-transparent" />
              </div>
            </div>

            {/* Content column: mobile overlay on image, desktop left column */}
            <div className="hero-mobile-min relative z-10 order-1 lg:order-1 lg:col-span-7 flex flex-col justify-end pb-24 pt-6 lg:block lg:p-0 lg:space-y-4">
              {/* Mobile eyebrow — where it's offered */}
              <p className="lg:hidden flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#EFC268]">
                <MapPin className="w-3.5 h-3.5 text-[#D98E2B]" aria-hidden="true" />
                {t.heroLocationBadge}
              </p>

              {/* Headline */}
              <h1 className="mt-3 lg:mt-0 font-serif font-bold leading-[1.12] tracking-tight text-[clamp(1.75rem,8vw,2.6rem)] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] lg:text-6xl lg:text-[#6B0F1A] lg:leading-[1.15] lg:drop-shadow-none">
                {t.heroTitleLine1}{' '}
                <span className="block text-[#EFC268] lg:inline lg:text-[#B5121B] lg:italic lg:underline lg:decoration-[#D98E2B] lg:decoration-wavy lg:decoration-1">
                  {t.heroTitleLine2}
                </span>
              </h1>

              {/* Short description (mobile) */}
              <p className="lg:hidden mt-3 max-w-md text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                {t.heroDescriptionShort}
              </p>

              {/* Full description (desktop) */}
              <p className="hidden lg:block text-sm sm:text-base text-[#4A3E39] leading-relaxed max-w-2xl font-sans">
                {t.heroDescription}
              </p>

              {/* Mobile: single primary CTA */}
              <a
                href="tel:+919109695176"
                id="hero-call-btn-mobile"
                aria-label="Call Now"
                className="lg:hidden mt-5 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#B5121B] hover:bg-[#8F0E15] text-white font-bold text-base py-4 border border-[#D98E2B]/70 shadow-lg shadow-black/30 transition-all active:scale-[0.99]"
              >
                <Phone className="w-5 h-5 text-[#D98E2B]" aria-hidden="true" />
                <span>{t.quickCallBtn}</span>
              </a>

              {/* Desktop: action buttons (unchanged visual) */}
              <div className="hidden lg:flex pt-1 flex-col sm:flex-row gap-3">
                <div className="flex gap-2 w-full sm:w-auto">
                  <a
                    href="tel:+919109695176"
                    id="hero-call-btn"
                    aria-label="Call Now"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg bg-[#B5121B] hover:bg-[#6B0F1A] text-white font-serif font-bold text-xs sm:text-base sm:px-6 sm:py-3.5 border border-[#D98E2B] shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    <Phone className="w-4 h-4 text-[#D98E2B] pointer-events-none" />
                    <span className="pointer-events-none">{t.quickCallBtn}</span>
                  </a>

                  <button
                    onClick={onOpenWhatsAppBuilder}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-bold text-xs sm:text-base sm:px-6 sm:py-3.5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-200" />
                    <span>{t.whatsappBtn}</span>
                  </button>
                </div>

                <button
                  onClick={onNavigateToServices}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg bg-[#F3E6D3] hover:bg-[#6B0F1A] text-[#6B0F1A] hover:text-[#F5E9D8] font-bold text-xs sm:text-sm border border-[#D98E2B]/40 transition-colors"
                >
                  <span>{t.viewAllServices}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Desktop: quick assurance (unchanged) */}
              <p className="hidden lg:flex text-xs text-gray-600 items-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.heroStripAssurance}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== FEATURE STRIP (below hero) ===================== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-8 lg:pb-16">
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-[#D98E2B]/40 shadow-md">
          <div className="p-3 flex items-center gap-3 border-r border-[#D98E2B]/20 last:border-0 md:last:border-r">
            <div className="p-2.5 rounded-full bg-[#6B0F1A]/10 text-[#6B0F1A]">
              <Award className="w-5 h-5 text-[#D98E2B]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#6B0F1A]">{t.heroStripLineage}</h3>
              <p className="text-[11px] text-gray-600">{t.heroStripLineageSub}</p>
            </div>
          </div>

          <div className="p-3 flex items-center gap-3 border-r border-[#D98E2B]/20 last:border-0 md:last:border-r">
            <div className="p-2.5 rounded-full bg-[#6B0F1A]/10 text-[#6B0F1A]">
              <Flame className="w-5 h-5 text-[#E2711D]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#6B0F1A]">{t.heroStripVidhi}</h3>
              <p className="text-[11px] text-gray-600">{t.heroStripVidhiSub}</p>
            </div>
          </div>

          <div className="p-3 flex items-center gap-3 border-r border-[#D98E2B]/20 last:border-0 md:last:border-r">
            <div className="p-2.5 rounded-full bg-[#6B0F1A]/10 text-[#6B0F1A]">
              <Users className="w-5 h-5 text-[#6B0F1A]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#6B0F1A]">{t.heroStripDevotees}</h3>
              <p className="text-[11px] text-gray-600">{t.heroStripDevoteesSub}</p>
            </div>
          </div>

          <div className="p-3 flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#6B0F1A]/10 text-[#6B0F1A]">
              <MapPin className="w-5 h-5 text-[#B5121B]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#6B0F1A]">Trimbakeshwar Kshetra</h3>
              <p className="text-[11px] text-gray-600">Nashik, Maharashtra</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
