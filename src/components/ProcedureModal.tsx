import React from 'react';
import { X, Clock, Calendar, CheckCircle2, Flame, HelpCircle, Phone, MessageSquare } from 'lucide-react';
import { PujaService, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ProcedureModalProps {
  puja: PujaService | null;
  onClose: () => void;
  onOpenWhatsAppForPuja: (pujaName: string) => void;
  lang?: Language;
}

export const ProcedureModal: React.FC<ProcedureModalProps> = ({
  puja,
  onClose,
  onOpenWhatsAppForPuja,
  lang = 'en'
}) => {
  const t = TRANSLATIONS[lang];
  const L = (field: { en: string; hi: string }) => field[lang];
  const LA = (field: { en: string[]; hi: string[] }) => field[lang];

  if (!puja) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#FBF3E7] text-[#241A16] rounded-2xl shadow-2xl border-2 border-[#D98E2B] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#6B0F1A] text-[#F5E9D8] px-6 py-4 flex items-center justify-between border-b border-[#D98E2B]/40">
          <div>
            <span className="text-xs font-semibold text-[#D98E2B] uppercase tracking-wider">
              {t.modalBadge}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FBF3E7]">
              {L(puja.name)}
            </h2>
            <p className="text-xs text-[#F5E9D8]/80 font-serif italic">{puja.sanskritName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#4A0B12] text-[#D98E2B] hover:text-white hover:bg-[#B5121B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
          {/* Quick Overview Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#F3E6D3] border border-[#D98E2B]/30">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#B5121B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-[#6B0F1A] block">{t.modalDuration}</strong>
                <span className="text-xs text-[#241A16]">{L(puja.duration)}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-[#B5121B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-[#6B0F1A] block">{t.modalMahurat}</strong>
                <span className="text-xs text-[#241A16]">{L(puja.bestDays)}</span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h3 className="font-serif font-bold text-lg text-[#6B0F1A] border-b border-[#D98E2B]/30 pb-1 mb-2 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#D98E2B]" />
              {t.modalSignificance}
            </h3>
            <p className="text-gray-800">{L(puja.fullDesc)}</p>
          </div>

          {/* Who Should Perform */}
          <div>
            <h3 className="font-serif font-bold text-base text-[#6B0F1A] border-b border-[#D98E2B]/30 pb-1 mb-2">
              {t.modalWhoShouldPerform}
            </h3>
            <ul className="space-y-1.5">
              {LA(puja.whoShouldPerform).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#B5121B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Benefits */}
          <div>
            <h3 className="font-serif font-bold text-base text-[#6B0F1A] border-b border-[#D98E2B]/30 pb-1 mb-2">
              {t.modalBenefits}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {LA(puja.keyBenefits).map((benefit, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-[#D98E2B]/20 text-xs text-[#241A16]">
                  ✨ {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Step by Step Procedure */}
          <div>
            <h3 className="font-serif font-bold text-base text-[#6B0F1A] border-b border-[#D98E2B]/30 pb-1 mb-2">
              {t.modalProcedure}
            </h3>
            <ol className="space-y-2">
              {LA(puja.procedureSteps).map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-[#F3E6D3]/60 text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#6B0F1A] text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-[#241A16] font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Included Samagri */}
          <div>
            <h3 className="font-serif font-bold text-base text-[#6B0F1A] border-b border-[#D98E2B]/30 pb-1 mb-2">
              {t.modalSamagri}
            </h3>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs space-y-1">
              <p className="font-semibold text-amber-900">{t.modalSamagriNote}</p>
              <ul className="list-disc pl-5 space-y-0.5 text-amber-950">
                {LA(puja.samagriIncluded).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          {puja.faqs.length > 0 && (
            <div>
              <h3 className="font-serif font-bold text-base text-[#6B0F1A] border-b border-[#D98E2B]/30 pb-1 mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#D98E2B]" />
                {t.modalFaq}
              </h3>
              <div className="space-y-3">
                {puja.faqs.map((faq, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white border border-[#D98E2B]/30">
                    <p className="font-bold text-xs text-[#6B0F1A]">Q: {L(faq.question)}</p>
                    <p className="text-xs text-gray-700 mt-1">A: {L(faq.answer)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTAs */}
        <div className="bg-[#4A0B12] p-4 border-t border-[#D98E2B]/40 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#F5E9D8]">
            {t.modalCta}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenWhatsAppForPuja(L(puja.name));
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200" />
              <span>{t.whatsappInquiry}</span>
            </button>
            <a
              href="tel:+919109695176"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#B5121B] hover:bg-[#8F0E15] text-white font-bold text-xs border border-[#D98E2B]"
            >
              <Phone className="w-4 h-4 text-[#D98E2B]" />
              <span>{t.callNow}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
