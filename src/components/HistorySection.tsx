import React from 'react';
import { TRIMBAKESHWAR_HISTORY, TRAVEL_GUIDE } from '../data/history';
import { Landmark, Flame, MapPin, Plane, Train, Bus } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HistorySectionProps {
  lang?: Language;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ lang = 'en' }) => {
  const t = TRANSLATIONS[lang];
  const L = (field: { en: string; hi: string }) => field[lang];

  const modeIcons: Record<string, React.ReactNode> = {
    'By Air': <Plane className="w-5 h-5 text-[#B5121B]" />,
    'हवाई मार्ग से': <Plane className="w-5 h-5 text-[#B5121B]" />,
    'By Train': <Train className="w-5 h-5 text-[#B5121B]" />,
    'रेल मार्ग से': <Train className="w-5 h-5 text-[#B5121B]" />,
    'By Road': <Bus className="w-5 h-5 text-[#B5121B]" />,
    'सड़क मार्ग से': <Bus className="w-5 h-5 text-[#B5121B]" />
  };

  return (
    <section id="history" className="py-12 sm:py-20 bg-[#FBF3E7] text-[#241A16] relative overflow-hidden border-b border-[#D98E2B]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B0F1A]/10 border border-[#D98E2B]/40 text-[#6B0F1A] text-xs font-semibold uppercase tracking-widest">
            <Landmark className="w-3.5 h-3.5 text-[#D98E2B]" />
            <span>{t.navHistory}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#6B0F1A]">
            {t.historyPageTitle}
          </h2>

          <div className="gold-divider w-32 mx-auto" />

          <p className="text-sm sm:text-base text-gray-700 font-serif italic">
            "{t.historyPageSub}"
          </p>
        </div>

        {/* Story Intro Layout with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base leading-relaxed text-gray-800">
            <p className="text-base sm:text-lg font-body">{L(TRIMBAKESHWAR_HISTORY.introParagraph)}</p>
            <p>{t.historyIntroExtra}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {TRIMBAKESHWAR_HISTORY.significancePoints.map((pt, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-[#D98E2B]/40 shadow-sm space-y-1">
                  <h3 className="font-serif font-bold text-sm text-[#6B0F1A] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#E2711D]" />
                    {L(pt.title)}
                  </h3>
                  <p className="text-xs text-gray-600 leading-normal">{L(pt.description)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Temple Photo Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D98E2B] shadow-xl">
              <img
                src="/images/kushavarth_kund.webp"
                alt="Trimbakeshwar Kshetra"
                className="w-full h-80 lg:h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white bg-black/60 p-3 rounded-lg backdrop-blur-sm border border-[#D98E2B]/30">
                <p className="font-serif font-bold text-[#D98E2B]">{t.kusavartaCaption}</p>
                <p className="text-[11px] text-gray-200">{t.kusavartaCaptionSub}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Specific Pujas Are Done Here Block */}
        <div className="space-y-6 pt-6 border-t border-[#D98E2B]/20">
          <div className="text-center">
            <h3 className="text-2xl font-serif font-bold text-[#6B0F1A]">
              {t.whyVidhisHere}
            </h3>
            <p className="text-xs text-[#B5121B] font-medium mt-1">
              {t.whyVidhisHereSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRIMBAKESHWAR_HISTORY.whyUniqueForPujas.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#D98E2B]/40 space-y-2 shadow-md hover:border-[#D98E2B] transition-colors"
              >
                <h4 className="font-serif font-bold text-base text-[#6B0F1A]">
                  {L(item.heading)}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {L(item.text)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel & How to Reach Section */}
        <div className="p-8 rounded-2xl bg-[#F3E6D3] border-2 border-[#D98E2B]/60 space-y-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D98E2B]/30 pb-4">
            <div>
              <span className="text-xs text-[#B5121B] font-bold uppercase tracking-wider block">
                {t.pilgrimageBadge}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#6B0F1A]">
                {t.howToReach}
              </h3>
            </div>
            <span className="text-xs text-gray-700 flex items-center gap-1 font-medium">
              <MapPin className="w-4 h-4 text-[#B5121B]" /> {t.nashikDistance}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRAVEL_GUIDE.map((mode, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-[#D98E2B]/30 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-[#6B0F1A]">
                  {modeIcons[L(mode.mode)]}
                  <h4 className="font-bold text-sm text-[#6B0F1A]">{L(mode.title)}</h4>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">{L(mode.detail)}</p>
                <div className="pt-2 text-[11px] text-[#B5121B] font-semibold">
                  {t.distanceLabel} {mode.distance}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
