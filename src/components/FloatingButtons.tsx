import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

interface FloatingButtonsProps {
  onOpenWhatsApp: () => void;
  lang?: 'en' | 'hi';
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  onOpenWhatsApp,
  lang = 'en'
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* WhatsApp Circular Floating Button */}
      <button
        onClick={onOpenWhatsApp}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl border-2 border-emerald-300/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        aria-label="WhatsApp Direct Chat"
        title={lang === 'hi' ? 'व्हाट्सएप चैट करें' : 'Chat on WhatsApp'}
      >
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-stone-900/90 text-white text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-emerald-500/30 shadow-lg">
          {lang === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'Chat on WhatsApp'}
        </span>
      </button>

      {/* Direct Phone Call Circular Floating Button */}
      <a
        href="tel:+919109695176"
        id="floating-call-btn"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#6B0F1A] hover:bg-[#8F0E15] text-[#D98E2B] shadow-2xl border-2 border-[#D98E2B] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        aria-label="Call Now"
        title={lang === 'hi' ? 'सीधा कॉल करें' : 'Call Purohit Directly'}
      >
        <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-[#D98E2B] pointer-events-none" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-stone-900/90 text-white text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#D98E2B]/30 shadow-lg">
          {lang === 'hi' ? 'सीधा कॉल करें' : 'Call +91 91096 95176'}
        </span>
      </a>
    </div>
  );
};
