import React from 'react';
import { Phone, MessageSquare, MessageSquareText } from 'lucide-react';

interface FloatingButtonsProps {
  onOpenWhatsApp: () => void;
  onToggleLiveChat: () => void;
  isLiveChatOpen?: boolean;
  lang?: 'en' | 'hi';
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  onOpenWhatsApp,
  onToggleLiveChat,
  isLiveChatOpen = false,
  lang = 'en'
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Live Chat (Tawk.to / Hovering In-Page Chat) Circular Floating Button */}
      <div className="relative flex items-center">
        {!isLiveChatOpen && (
          <div className="absolute right-full mr-3 px-3 py-1.5 rounded-full bg-[#B5121B] text-[#F5E9D8] text-[11px] sm:text-xs font-serif font-bold whitespace-nowrap border border-[#D98E2B] shadow-xl animate-pulse flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            <span>LIVE Chat</span>
            <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#B5121B]" />
          </div>
        )}
        <button
          onClick={onToggleLiveChat}
          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full ${isLiveChatOpen ? 'bg-[#8F0E15] border-amber-300' : 'bg-[#6B0F1A] hover:bg-[#8F0E15] border-[#D98E2B]'
            } text-[#F5E9D8] shadow-2xl border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative`}
          aria-label="Live Chat on Page"
          title={lang === 'hi' ? 'लाइव चैट करें (पेज पर)' : 'Live Chat on Page (Tawk.to)'}
        >
          <MessageSquareText className="w-6 h-6 sm:w-7 sm:h-7 text-[#D98E2B]" />

          {/* Live Green Online Badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          </span>

          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-stone-900/90 text-white text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#D98E2B]/30 shadow-lg">
            {lang === 'hi' ? 'लाइव चैट (पेज पर रहें)' : 'Live Chat (Stay on Page)'}
          </span>
        </button>
      </div>

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
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#6B0F1A] hover:bg-[#8F0E15] text-[#D98E2B] shadow-2xl border-2 border-[#D98E2B] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        aria-label="Direct Call Purohit"
        title={lang === 'hi' ? 'सीधा कॉल करें' : 'Call Purohit Directly'}
      >
        <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-[#D98E2B]" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-stone-900/90 text-white text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#D98E2B]/30 shadow-lg">
          {lang === 'hi' ? 'सीधा कॉल करें' : 'Call +91 91096 95176'}
        </span>
      </a>
    </div>
  );
};
