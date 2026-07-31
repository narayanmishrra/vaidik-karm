import React, { useState, useEffect } from 'react';
import { PUJA_SERVICES } from '../data/pujas';
import { PujaService, Language } from '../types';
import { Phone, MessageSquare, Clock, Calendar, ChevronRight, Search, Sparkles } from 'lucide-react';
import { ProcedureModal } from './ProcedureModal';
import { TRANSLATIONS } from '../data/translations';

interface ServicesSectionProps {
  onOpenWhatsAppForPuja: (pujaName: string) => void;
  initialPujaId?: string;
  onClearInitialPujaId?: () => void;
  lang?: Language;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenWhatsAppForPuja,
  initialPujaId,
  onClearInitialPujaId,
  lang = 'en'
}) => {
  const t = TRANSLATIONS[lang];
  const L = (field: { en: string; hi: string }) => field[lang];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPujaForModal, setSelectedPujaForModal] = useState<PujaService | null>(null);

  const getPujaProcedureUrl = (pujaId: string) => `#services/${encodeURIComponent(pujaId)}/procedure-faqs`;

  const openPujaProcedure = (puja: PujaService) => {
    setSelectedPujaForModal(puja);
    window.history.pushState(null, '', getPujaProcedureUrl(puja.id));
  };

  const closePujaProcedure = () => {
    setSelectedPujaForModal(null);
    if (window.location.hash.startsWith('#services/')) {
      window.history.pushState(null, '', '#services');
    }
  };

  useEffect(() => {
    if (initialPujaId) {
      const puja = PUJA_SERVICES.find((p) => p.id === initialPujaId);
      if (puja) {
        openPujaProcedure(puja);
      }
    } else {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash.startsWith('puja/')) {
        const pujaId = hash.replace('puja/', '');
        const puja = PUJA_SERVICES.find((p) => p.id === pujaId);
        if (puja) {
          setSelectedPujaForModal(puja);
        }
      }
    }
  }, [initialPujaId]);

  const handleOpenPujaModal = (puja: PujaService) => {
    setSelectedPujaForModal(puja);
    window.location.hash = `puja/${puja.id}`;
  };

  const handleClosePujaModal = () => {
    setSelectedPujaForModal(null);
    if (onClearInitialPujaId) {
      onClearInitialPujaId();
    }
    window.location.hash = 'services';
  };

  useEffect(() => {
    const syncPujaFromUrl = () => {
      const match = window.location.hash.match(/^#services\/([^/]+)\/procedure-faqs$/);
      if (match?.[1]) {
        const puja = PUJA_SERVICES.find((p) => p.id === decodeURIComponent(match[1]));
        setSelectedPujaForModal(puja || null);
      } else if (window.location.hash === '#services' || !window.location.hash.startsWith('#services/')) {
        setSelectedPujaForModal(null);
      }
    };

    window.addEventListener('hashchange', syncPujaFromUrl);
    window.addEventListener('popstate', syncPujaFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncPujaFromUrl);
      window.removeEventListener('popstate', syncPujaFromUrl);
    };
  }, []);

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'popular', label: t.filterPopular },
    { id: 'pitru', label: t.filterPitru },
    { id: 'dosh', label: t.filterDosh },
    { id: 'health', label: t.filterHealth }
  ];

  const filteredPujas = PUJA_SERVICES.filter((puja) => {
    const nameStr = L(puja.name).toLowerCase();
    const descStr = L(puja.shortDesc).toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      nameStr.includes(searchLower) ||
      puja.sanskritName.includes(searchQuery) ||
      descStr.includes(searchLower);

    if (!matchesSearch) return false;

    if (activeCategory === 'popular') return puja.isPopular;
    if (activeCategory === 'pitru')
      return puja.id === 'narayan-nagbali' || puja.id === 'tripindi-shraddha';
    if (activeCategory === 'dosh')
      return puja.id === 'kaalsarp-shanti' || puja.id === 'navgrah-shanti';
    if (activeCategory === 'health')
      return puja.id === 'mahamrityunjay-jaap' || puja.id === 'vastu-shanti';

    return true;
  });

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#FBF3E7] text-[#241A16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B0F1A]/10 border border-[#D98E2B]/40 text-[#6B0F1A] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D98E2B]" />
            <span>{t.servicesBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#6B0F1A]">
            {t.servicesMainTitle}
          </h2>

          <div className="gold-divider w-32 mx-auto" />

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
            {t.servicesMainDesc}
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F3E6D3] p-3 rounded-2xl border border-[#D98E2B]/30">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${activeCategory === cat.id
                    ? 'bg-[#6B0F1A] text-[#F5E9D8] shadow-md border border-[#D98E2B]'
                    : 'text-[#241A16] hover:bg-[#6B0F1A]/10'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#D98E2B]/40 focus:outline-none focus:ring-2 focus:ring-[#6B0F1A]"
              />
            </div>
          </div>
        </div>

        {/* Puja Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPujas.map((puja) => (
            <div
              key={puja.id}
              onClick={() => openPujaProcedure(puja)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openPujaProcedure(puja);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${L(puja.name)} procedure and FAQs`}
              className="group bg-white rounded-2xl border border-[#D98E2B]/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#D98E2B]/40"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <img
                  src={puja.image}
                  alt={L(puja.name)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Popular Tag */}
                {puja.isPopular && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#B5121B] text-white text-[10px] font-bold uppercase tracking-wider shadow border border-[#D98E2B]">
                    {t.mostRequestedTag}
                  </span>
                )}

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs text-[#D98E2B] font-serif italic block">
                    {puja.sanskritName}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white leading-tight">
                    {L(puja.name)}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                    {L(puja.shortDesc)}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B5121B] shrink-0" />
                      <span><strong className="text-gray-900">{t.durationLabel}</strong> {L(puja.duration)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B5121B] shrink-0" />
                      <span><strong className="text-gray-900">{t.mahuratLabel}</strong> {L(puja.bestDays)}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      openPujaProcedure(puja);
                    }}
                    className="w-full text-center py-2 px-3 rounded-lg bg-[#F3E6D3] hover:bg-[#6B0F1A] text-[#6B0F1A] hover:text-[#F5E9D8] font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>{t.viewProcedure}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpenWhatsAppForPuja(L(puja.name));
                      }}
                      className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] shadow transition-transform active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-200" />
                      <span>{t.whatsappChat}</span>
                    </button>

                    <a
                      href="tel:+919109695176"
                      onClick={(event) => event.stopPropagation()}
                      className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-[#B5121B] hover:bg-[#8F0E15] text-white font-bold text-[11px] border border-[#D98E2B] shadow transition-transform active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D98E2B]" />
                      <span>{t.callNow}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="p-6 rounded-2xl bg-[#6B0F1A] text-[#F5E9D8] border-2 border-[#D98E2B] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-serif font-bold text-[#FBF3E7]">
              {t.customAnushthan}
            </h3>
            <p className="text-xs text-[#F5E9D8]/80">
              {t.customAnushthanDesc}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenWhatsAppForPuja('Custom Astrological Consultation')}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg"
            >
              {t.consultAcharya}
            </button>
          </div>
        </div>
      </div>

      {/* Procedure Modal */}
      <ProcedureModal
        puja={selectedPujaForModal}
        onClose={closePujaProcedure}
        onOpenWhatsAppForPuja={onOpenWhatsAppForPuja}
        lang={lang}
      />
    </section>
  );
};
