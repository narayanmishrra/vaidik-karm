import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, RefreshCw, MessageSquare, Phone, HelpCircle } from 'lucide-react';
import { PUJA_SERVICES } from '../data/pujas';

interface PujaFinderProps {
  onSelectPujaForInquiry: (pujaName: string) => void;
  onOpenWhatsAppWithCustomText: (text: string) => void;
}

export const PujaFinder: React.FC<PujaFinderProps> = ({
  onSelectPujaForInquiry,
  onOpenWhatsAppWithCustomText
}) => {
  const [step, setStep] = useState<number>(1);
  const [primaryConcern, setPrimaryConcern] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const concernOptions = [
    {
      id: 'rahu_ketu',
      title: 'Astrological Rahu-Ketu Alignment / Kaalsarp Dosh',
      desc: 'In Kundali, planets trapped between Rahu & Ketu; snake dreams, sudden obstacles in career/marriage.'
    },
    {
      id: 'pitru_ancestral',
      title: 'Ancestral Affliction / Pitru Dosh',
      desc: 'Repeated family disputes, inability to hold wealth, missed annual ancestral rites, unexplained health issues.'
    },
    {
      id: 'premature_death',
      title: 'Past Premature Death or Unnatural Family Loss',
      desc: 'History of accidental death or Sarp Hatyadosh in family hierarchy requiring liberation.'
    },
    {
      id: 'health_longevity',
      title: 'Critical Illness or Protection from Severe Harms',
      desc: 'Seeking divine healing, protection from fatal accidents, longevity, and mental strength.'
    },
    {
      id: 'general_planetary',
      title: 'Sade Sati / Shani / Multi-Planetary Imbalance',
      desc: 'Ongoing Shani Dasha, business instability, legal troubles, or house Vastu issues.'
    }
  ];

  const symptomOptions: Record<string, string[]> = {
    rahu_ketu: [
      'Frequent dreams of snakes or rising water',
      'Sudden cancellation of marriage proposals or deals',
      'Severe anxiety despite lack of obvious physical causes',
      'Constantly changing job or career direction'
    ],
    pitru_ancestral: [
      'Missed annual Shraddha rites for parents/grandparents',
      'Unexplained childlessness or recurrent miscarriages',
      'Persistent financial drain despite hard work',
      'Hereditary family disharmony'
    ],
    premature_death: [
      'Family member died prematurely or accidentally without proper rites',
      'Guilt or astrological indication of snake injury (Sarp Shaap)',
      'Desire to grant Moksha (liberation) to dissatisfied souls'
    ],
    health_longevity: [
      'Undergoing major medical treatment or surgery',
      'Sudden recurring accidents or fear of untimely harm',
      'Desire for long life and spiritual vitality'
    ],
    general_planetary: [
      'Currently under Sade Sati or Shani Dhaiya',
      'Moving into new house or commercial premises',
      'Stagnant business growth across last 3+ years'
    ]
  };

  const toggleSymptom = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const getRecommendedPuja = () => {
    if (primaryConcern === 'rahu_ketu') return PUJA_SERVICES.find(p => p.id === 'kaalsarp-shanti');
    if (primaryConcern === 'pitru_ancestral') return PUJA_SERVICES.find(p => p.id === 'tripindi-shraddha');
    if (primaryConcern === 'premature_death') return PUJA_SERVICES.find(p => p.id === 'narayan-nagbali');
    if (primaryConcern === 'health_longevity') return PUJA_SERVICES.find(p => p.id === 'mahamrityunjay-jaap');
    if (primaryConcern === 'general_planetary') return PUJA_SERVICES.find(p => p.id === 'navgrah-shanti');
    return PUJA_SERVICES[0];
  };

  const recommended = getRecommendedPuja();

  const handleReset = () => {
    setStep(1);
    setPrimaryConcern('');
    setSymptoms([]);
  };

  const handleWhatsAppInquiry = () => {
    const text = `Hari Om Acharya Ji. I used your Vaidik Guide on the website. My main concern is: ${primaryConcern} (${symptoms.join(', ')}). Recommended Puja: ${recommended?.name}. Please advise on auspicious Mahurat and Vidhi details.`;
    onOpenWhatsAppWithCustomText(text);
  };

  return (
    <div className="bg-[#4A0B12] text-[#F5E9D8] rounded-2xl border-2 border-[#D98E2B]/50 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background Decorative Emblem */}
      <div className="absolute -right-10 -bottom-10 opacity-10 text-[#D98E2B] text-9xl font-serif pointer-events-none">
        ॐ
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D98E2B]/30 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#D98E2B]" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FBF3E7]">
              Vaidik Puja Assistant & Kundali Guide
            </h2>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#6B0F1A] border border-[#D98E2B]/40 text-[#D98E2B] font-mono">
            Step {step} of 3
          </span>
        </div>

        {/* STEP 1: Select Concern */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-sm text-[#F5E9D8]/90 font-medium">
              Select your primary life challenge or astrological indication:
            </p>

            <div className="space-y-2.5">
              {concernOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setPrimaryConcern(opt.id);
                    setSymptoms([]);
                    setStep(2);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${primaryConcern === opt.id
                      ? 'bg-[#6B0F1A] border-[#D98E2B] text-[#D98E2B] shadow-md'
                      : 'bg-[#6B0F1A]/50 border-[#D98E2B]/20 hover:border-[#D98E2B]/60 text-[#F5E9D8] hover:bg-[#6B0F1A]/80'
                    }`}
                >
                  <div className="w-5 h-5 rounded-full border border-[#D98E2B] flex items-center justify-center shrink-0 mt-0.5 text-xs text-[#D98E2B]">
                    {primaryConcern === opt.id ? '✓' : ''}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#FBF3E7]">{opt.title}</h3>
                    <p className="text-xs text-[#F5E9D8]/80 mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Select Specific Symptoms */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#F5E9D8]/90 font-medium">
                Check any specific conditions you or your family are experiencing:
              </p>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#D98E2B] underline hover:text-white"
              >
                Change Main Concern
              </button>
            </div>

            <div className="space-y-2">
              {(symptomOptions[primaryConcern] || []).map((sym, idx) => {
                const isSelected = symptoms.includes(sym);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleSymptom(sym)}
                    className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${isSelected
                        ? 'bg-[#B5121B]/40 border-[#D98E2B] text-[#FBF3E7] font-medium'
                        : 'bg-[#6B0F1A]/40 border-[#D98E2B]/20 text-[#F5E9D8]/90 hover:border-[#D98E2B]/40'
                      }`}
                  >
                    <span>{sym}</span>
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#D98E2B]' : 'text-gray-500'
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-lg bg-[#6B0F1A] text-xs text-[#F5E9D8] hover:text-white border border-[#D98E2B]/30"
              >
                ← Back
              </button>

              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-lg bg-[#B5121B] hover:bg-[#8F0E15] text-white font-bold text-xs sm:text-sm border border-[#D98E2B] flex items-center gap-1.5 shadow"
              >
                <span>View Recommendation</span>
                <ArrowRight className="w-4 h-4 text-[#D98E2B]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Recommended Puja Result */}
        {step === 3 && recommended && (
          <div className="space-y-5 animate-fadeIn">
            <div className="p-4 rounded-xl bg-[#6B0F1A] border-2 border-[#D98E2B] space-y-3">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#D98E2B] bg-[#4A0B12] px-2.5 py-1 rounded">
                Recommended Vedic Ritual
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FBF3E7]">
                {recommended.name} <span className="text-sm font-sans text-[#D98E2B] block sm:inline">({recommended.sanskritName})</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#F5E9D8]/90 leading-relaxed">
                {recommended.fullDesc}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#D98E2B]/20">
                <div>
                  <span className="text-[#D98E2B] font-semibold">Expected Duration:</span> {recommended.duration}
                </div>
                <div>
                  <span className="text-[#D98E2B] font-semibold">Best Days:</span> {recommended.bestDays}
                </div>
              </div>
            </div>

            {/* Direct Consult Actions */}
            <div className="space-y-3 pt-2">
              <p className="text-xs text-center text-[#F5E9D8]/80">
                Speak directly with Acharya Ji to verify your Janma Kundali mahurat:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-200" />
                  <span>Send WhatsApp Inquiry</span>
                </button>

                <a
                  href="tel:+919109695176"
                  id="pujafinder-call-btn"
                  aria-label="Call Now"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#B5121B] hover:bg-[#8F0E15] text-white font-bold text-xs border border-[#D98E2B] shadow-lg"
                >
                  <Phone className="w-4 h-4 text-[#D98E2B] pointer-events-none" />
                  <span className="pointer-events-none">Call Purohit Now</span>
                </a>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs text-[#D98E2B] hover:underline inline-flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Start Over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
