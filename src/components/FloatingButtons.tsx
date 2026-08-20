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
    <div
      className="fixed z-50 flex flex-row items-center gap-2.5 sm:gap-3"
      style={{
        right: 'max(0.75rem, env(safe-area-inset-right))',
        bottom: 'max(0.75rem, env(safe-area-inset-bottom))'
      }}
    >
      {/* WhatsApp Circular Floating Button */}
      <button
        onClick={onOpenWhatsApp}
        className="group relative h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl border-2 border-emerald-300/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="WhatsApp Direct Chat"
        title={lang === 'hi' ? 'व्हाट्सएप चैट करें' : 'Chat on WhatsApp'}
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-stone-900/90 text-white text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-emerald-500/30 shadow-lg">
          {lang === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'Chat on WhatsApp'}
        </span>
      </button>

      {/* Direct Phone Call Circular Floating Button */}
      <a
        href="tel:+919109695176"
        id="floating-call-btn"
        className="group relative h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#6B0F1A] hover:bg-[#8F0E15] text-[#D98E2B] shadow-xl border-2 border-[#D98E2B] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Call Now"
        title={lang === 'hi' ? 'सीधा कॉल करें' : 'Call Purohit Directly'}
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#D98E2B] pointer-events-none" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-stone-900/90 text-white text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#D98E2B]/30 shadow-lg">
          {lang === 'hi' ? 'सीधा कॉल करें' : 'Call +91 91096 95176'}
        </span>
      </a>
    </div>
  );
};
