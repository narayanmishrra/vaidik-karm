import React from 'react';
import { Phone, MessageSquare, ShieldCheck, Award, Flame, Users, MapPin, ChevronRight, Sparkles } from 'lucide-react';
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
    <section className="relative bg-[#FBF3E7] text-[#241A16] pt-4 pb-8 sm:py-12 lg:py-16 border-b border-[#D98E2B]/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-center">
          {/* Image Column */}
          <div className="order-1 lg:order-2 lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D98E2B] shadow-2xl bg-stone-900 group">
              <img
                src="/images/Trimbakeshwar_Mandir.webp"
                alt="Trimbakeshwar Sanctum"
                className="w-full h-[230px] sm:h-[307px] lg:h-[504px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6B0F1A]/90 via-[#6B0F1A]/20 to-transparent" />
            </div>
          </div>

          {/* Left Column: Content Container */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-3 sm:space-y-4 text-left">
            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#6B0F1A] leading-[1.15] tracking-tight">
              {t.heroTitleLine1}{' '}
              <span className="text-[#B5121B] italic underline decoration-[#D98E2B] decoration-wavy decoration-1 block sm:inline">
                {t.heroTitleLine2}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#4A3E39] leading-relaxed max-w-2xl font-sans">
              {t.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row gap-3">
              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href="tel:+919109695176"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg bg-[#B5121B] hover:bg-[#6B0F1A] text-white font-serif font-bold text-xs sm:text-base sm:px-6 sm:py-3.5 border border-[#D98E2B] shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4 text-[#D98E2B]" />
                  <span>{t.quickCallBtn}</span>
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

            {/* Quick Assurance */}
            <p className="text-xs text-gray-600 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.heroStripAssurance}</span>
            </p>
          </div>
        </div>

        {/* Feature Strip Below Hero */}
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
              <h3 className="text-xs font-bold text-[#6B0F1A]">Kusavarta Kund</h3>
              <p className="text-[11px] text-gray-600">Trimbakeshwar Mandir Marg</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
