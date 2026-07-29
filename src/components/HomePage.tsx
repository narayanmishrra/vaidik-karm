import React from 'react';
import { HeroSection } from './HeroSection';
import { GoogleBusinessWidget } from './GoogleBusinessWidget';
import { PUJA_SERVICES } from '../data/pujas';
import { TESTIMONIALS } from '../data/testimonials';
import { SectionId, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Star, ShieldCheck, Phone, MessageSquare, Flame, Globe, ChevronRight, Clock, Calendar } from 'lucide-react';

interface HomePageProps {
  onSelectSection: (id: SectionId) => void;
  onOpenWhatsAppForPuja: (pujaName: string) => void;
  onOpenWhatsAppWithCustomText: (text: string) => void;
  onSelectPuja: (pujaId: string) => void;
  lang: Language;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectSection,
  onOpenWhatsAppForPuja,
  onOpenWhatsAppWithCustomText,
  onSelectPuja,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const L = (field: { en: string; hi: string }) => field[lang];

  // Show top 3 featured pujas on homepage
  const featuredPujas = PUJA_SERVICES.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSection
        onOpenWhatsAppBuilder={() =>
          onOpenWhatsAppWithCustomText('Hari Om Acharya Ji. I am seeking guidance on Puja at Trimbakeshwar.')
        }
        onNavigateToServices={() => onSelectSection('services')}
        lang={lang}
      />

      {/* Greeting & About Us Summary Section */}
      <section className="py-6 sm:py-8 bg-white text-[#241A16] border-b border-[#D98E2B]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Pandits Image Card */}
            <div className="md:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border-2 border-[#D98E2B] shadow-lg bg-white">
                <img
                  src="/images/vinay_shastri.jpg"
                  alt="Pandit Vinay Shastri"
                  className="w-full max-w-[450px] h-auto object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="p-2.5 bg-[#F3E6D3] border-t border-[#D98E2B]/30 text-center">
                  <p className="font-serif font-bold text-xs text-[#6B0F1A]">
                    {t.panditCardName}
                  </p>
                </div>
              </div>
            </div>
            {/* Short Description */}
            <div className="md:col-span-7 space-y-2">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-body">
                {t.homeWelcomeDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Business Profile Widget Strip */}
      <section className="py-6 bg-[#F3E6D3] border-b border-[#D98E2B]/30 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <GoogleBusinessWidget variant="compact" />
        </div>
      </section>

      {/* Pujas We Provide Summary Section */}
      <section className="py-10 sm:py-14 bg-[#FBF3E7] text-[#241A16] border-b border-[#D98E2B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#6B0F1A]">
              {t.homeServicesHeading}
            </h2>
            <div className="gold-divider w-24 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPujas.map((puja) => (
              <div
                key={puja.id}
                onClick={() => onSelectPuja(puja.id)}
                className="bg-[#FBF3E7] rounded-2xl border border-[#D98E2B]/40 p-5 shadow-md flex flex-col justify-between space-y-4 hover:border-[#D98E2B] transition-all cursor-pointer hover:shadow-xl"
              >
                <div className="space-y-3">
                  <div className="relative h-44 rounded-xl overflow-hidden border border-[#D98E2B]/30">
                    <img
                      src={puja.image}
                      alt={L(puja.name)}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 text-white">
                      <span className="text-[10px] text-[#D98E2B] font-serif italic block">
                        {puja.sanskritName}
                      </span>
                      <h3 className="font-serif font-bold text-base text-white">
                        {L(puja.name)}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                    {L(puja.shortDesc)}
                  </p>

                  <div className="space-y-1 text-xs text-gray-600 pt-2 border-t border-[#D98E2B]/20">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B5121B]" />
                      <span>{t.durationLabel} {L(puja.duration)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B5121B]" />
                      <span>{t.bestDaysLabel} {L(puja.bestDays)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenWhatsAppForPuja(L(puja.name));
                    }}
                    className="py-2 px-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] shadow flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t.whatsappChat}</span>
                  </button>
                  <a
                    href="tel:+919109695176"
                    onClick={(e) => { e.stopPropagation(); }}
                    className="py-2 px-2 rounded-lg bg-[#B5121B] hover:bg-[#8F0E15] text-white font-bold text-[11px] border border-[#D98E2B] shadow flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D98E2B]" />
                    <span>{t.callNow}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onSelectSection('services')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#6B0F1A] hover:bg-[#8F0E15] text-[#F5E9D8] font-bold text-sm border border-[#D98E2B] shadow-lg transition-all"
            >
              <span>{t.viewAllServices}</span>
              <ChevronRight className="w-4 h-4 text-[#D98E2B]" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Devotees Choose Us */}
      <section className="py-12 sm:py-16 bg-[#F3E6D3] text-[#241A16] border-b border-[#D98E2B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border-2 border-[#D98E2B] shadow-xl">
                <img
                  src="public\images\kushavarth_kund.webp"
                  alt="Trimbakeshwar Temple Sanctum"
                  className="w-full h-72 sm:h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B0F1A]/10 text-[#6B0F1A] text-xs font-semibold uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.whyChooseBadge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#6B0F1A]">
                {t.whyChooseTitle}
              </h2>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {t.whyChooseDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-white border border-[#D98E2B]/30 flex items-start gap-2 shadow-sm">
                  <Flame className="w-4 h-4 text-[#E2711D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#6B0F1A] block font-bold">{t.pureSamagriTitle}</strong>
                    <span className="text-gray-600">{t.pureSamagriDesc}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white border border-[#D98E2B]/30 flex items-start gap-2 shadow-sm">
                  <Globe className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#6B0F1A] block font-bold">{t.nriSupportTitle}</strong>
                    <span className="text-gray-600">{t.nriSupportDesc}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() =>
                    onOpenWhatsAppWithCustomText(
                      'Hari Om Acharya Ji. I wish to know more about your Purohit family lineage and services.'
                    )
                  }
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md"
                >
                  {t.whatsappAcharya}
                </button>
                <a
                  href="tel:+919109695176"
                  className="px-5 py-2.5 rounded-xl bg-[#B5121B] hover:bg-[#6B0F1A] text-white font-bold text-xs border border-[#D98E2B] shadow-md"
                >
                  Call +91 91096 95176
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devotee Testimonials */}
      <section className="py-12 sm:py-16 bg-[#FBF3E7] text-[#241A16] border-b border-[#D98E2B]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#B5121B] uppercase tracking-wider">
              {t.homeTestimonialsSub}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#6B0F1A]">
              {t.homeTestimonialsHeading}
            </h2>
            <div className="gold-divider w-24 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="p-5 rounded-2xl bg-white border border-[#D98E2B]/40 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#D98E2B] transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-amber-500">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    {test.isNRI && (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {t.nriClientBadge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-700 italic leading-relaxed line-clamp-4">
                    "{L(test.comment)}"
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 text-xs">
                  <p className="font-serif font-bold text-[#6B0F1A]">{test.name}</p>
                  <p className="text-[11px] text-gray-500">
                    {L(test.location)} • <span className="text-[#B5121B] font-semibold">{L(test.pujaPerformed)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Inquire CTA Banner */}
      <section className="py-12 bg-white text-[#241A16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl bg-[#F3E6D3] border-2 border-[#D98E2B] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-bold text-[#6B0F1A]">
                {t.ctaQuestion}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700">
                {t.ctaDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                onClick={() => onSelectSection('contact')}
                className="px-6 py-3 rounded-xl bg-[#6B0F1A] hover:bg-[#8F0E15] text-[#F5E9D8] font-bold text-xs border border-[#D98E2B] shadow-md"
              >
                {t.inquireOnline}
              </button>
              <button
                onClick={() =>
                  onOpenWhatsAppWithCustomText(
                    'Hari Om Acharya Ji. I am seeking guidance on Puja at Trimbakeshwar.'
                  )
                }
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md"
              >
                {t.whatsappDirectly}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
