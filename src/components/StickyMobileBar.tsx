import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenWhatsAppBuilder: () => void;
  onOpenConsultationModal: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  onOpenWhatsAppBuilder,
  onOpenConsultationModal
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#6B0F1A] border-t-2 border-[#D98E2B] px-3 py-2.5 shadow-2xl backdrop-blur-md bg-opacity-95">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href="tel:+919109695176"
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-[#B5121B] text-white font-bold text-xs tracking-wide shadow-lg active:scale-95 transition-transform border border-[#D98E2B]/40"
        >
          <Phone className="w-4 h-4 text-[#D98E2B] animate-pulse" />
          <span>📞 CALL PANDITJI</span>
        </a>

        {/* WhatsApp Chat Button */}
        <button
          onClick={onOpenWhatsAppBuilder}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-lg active:scale-95 transition-transform border border-emerald-500/40"
        >
          <MessageSquare className="w-4 h-4 text-emerald-200" />
          <span>💬 WHATSAPP INQUIRY</span>
        </button>
      </div>
    </div>
  );
};
