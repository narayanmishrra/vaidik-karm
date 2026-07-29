import React from 'react';
import { PRIEST_PROFILES, CORE_VALUES, NRI_GUIDANCE_TEXT } from '../data/aboutUs';
import { Award, Globe, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { GoogleBusinessWidget } from './GoogleBusinessWidget';

interface AboutSectionProps {
  onOpenWhatsAppBuilder: () => void;
  lang?: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenWhatsAppBuilder, lang = 'en' }) => {
  const t = TRANSLATIONS[lang];
  const L = (field: { en: string; hi: string }) => field[lang];
  const LA = (field: { en: string[]; hi: string[] }) => field[lang];

  return (
    <section id="about" className="py-12 sm:py-20 bg-[#FBF3E7] text-[#241A16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B0F1A]/10 border border-[#D98E2B]/40 text-[#6B0F1A] text-xs font-semibold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-[#D98E2B]" />
            <span>{t.navAbout}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#6B0F1A]">
            {t.aboutPageTitle}
          </h2>

          <div className="gold-divider w-32 mx-auto" />

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-body">
            {t.aboutPageSub}
          </p>
        </div>

        {/* Acharya Profiles */}
        <div className="flex justify-center">
          {PRIEST_PROFILES.map((profile) => (
            <div
              key={profile.id}
              className="max-w-3xl w-full bg-white rounded-2xl border border-[#D98E2B]/40 p-6 shadow-xl flex flex-col sm:flex-row gap-6 items-start hover:border-[#D98E2B] transition-all"
            >
              <img
                src="/images/vinay_shastri.jpg"
                alt={profile.name}
                className="w-full sm:w-40 h-48 object-cover rounded-xl border-2 border-[#D98E2B]/50 shrink-0"
                referrerPolicy="no-referrer"
              />

              <div className="space-y-3 flex-1">
                <div>
                  <span className="text-[11px] font-bold text-[#B5121B] uppercase tracking-wider block">
                    {profile.experienceYears}{t.yearsVedaPathi}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#6B0F1A]">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium">{L(profile.title)}</p>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                  {L(profile.bio)}
                </p>

                <div className="pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-900 block mb-1">
                    {t.specializedVidhis}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {LA(profile.specialization).map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#F3E6D3] text-[#6B0F1A] text-[10px] font-semibold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Business Profile Card */}
        <GoogleBusinessWidget variant="full" />

        {/* Core Values Grid */}
        <div className="bg-[#F3E6D3] text-[#241A16] rounded-2xl p-8 border-2 border-[#D98E2B] shadow-lg space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-[#6B0F1A]">
              {t.coreCommitmentsTitle}
            </h3>
            <p className="text-xs text-[#B5121B] mt-1 font-medium">
              {t.coreCommitmentsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-[#D98E2B]/30 space-y-2 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-[#6B0F1A] text-[#D98E2B] flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <h4 className="font-serif font-bold text-sm text-[#6B0F1A]">
                  {L(val.title)}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {L(val.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated NRI Section */}
        <div className="p-8 rounded-2xl bg-white text-[#241A16] border-2 border-[#D98E2B] shadow-xl space-y-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#D98E2B]/30 pb-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B0F1A]/10 text-[#6B0F1A] text-xs font-semibold">
                <Globe className="w-3.5 h-3.5 text-[#B5121B]" />
                <span>{t.nriNoteTitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#6B0F1A]">
                {L(NRI_GUIDANCE_TEXT.heading)}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {L(NRI_GUIDANCE_TEXT.paragraph)}
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
              <button
                onClick={onOpenWhatsAppBuilder}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.nriWhatsappConsult}</span>
              </button>
              <a
                href="tel:+919109695176"
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#B5121B] hover:bg-[#8F0E15] text-white font-bold text-xs border border-[#D98E2B] flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D98E2B]" />
                <span>{t.callNow} +91 91096 95176</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {LA(NRI_GUIDANCE_TEXT.perks).map((perk, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F3E6D3] border border-[#D98E2B]/30 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span className="text-[#241A16] font-medium">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
