import React, { useState } from 'react';
import { X, MessageSquare, Send, Sparkles } from 'lucide-react';
import { PUJA_SERVICES } from '../data/pujas';

interface WhatsAppBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPujaName?: string;
  customText?: string;
}

export const WhatsAppBuilderModal: React.FC<WhatsAppBuilderModalProps> = ({
  isOpen,
  onClose,
  initialPujaName,
  customText
}) => {
  if (!isOpen) return null;

  const [devoteeName, setDevoteeName] = useState('');
  const [selectedPuja, setSelectedPuja] = useState(initialPujaName || 'Kaalsarp Dosh Shanti Puja');
  const [preferredMonth, setPreferredMonth] = useState('This Month');
  const [isNRI, setIsNRI] = useState(false);
  const [country, setCountry] = useState('USA / Overseas');
  const [note, setNote] = useState('');

  const builtMessage = customText || `Hari Om Acharya Ji. Sacred Inquiry from Vaidik Karm Website:
• Devotee Name: ${devoteeName || 'Not specified'}
• Puja Required: ${selectedPuja}
• Preferred Time: ${preferredMonth}
• NRI Status: ${isNRI ? `Yes (${country})` : 'No (India)'}
• Additional Note: ${note || 'Seeking advice on auspicious Mahurat, Samagri, and Vidhi steps.'}`;

  const handleLaunchWhatsApp = () => {
    const phoneNumber = '+919109695176';
    const encoded = encodeURIComponent(builtMessage);
    const url = `https://wa.me/${+919109695176}?text=${encoded}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#4A0B12] text-[#F5E9D8] rounded-2xl border-2 border-[#D98E2B] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#6B0F1A] px-5 py-4 border-b border-[#D98E2B]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-serif font-bold text-lg text-[#FBF3E7]">
                WhatsApp Direct Message Builder
              </h3>
              <p className="text-[11px] text-[#D98E2B]">Instant 1-Click Chat with Acharya Ji</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-[#4A0B12] text-[#D98E2B] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="p-5 space-y-4 text-xs overflow-y-auto max-h-[70vh]">
          {!customText && (
            <>
              <div className="space-y-1">
                <label className="text-[#D98E2B] font-semibold block">Your Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Sharma"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#6B0F1A] border border-[#D98E2B]/40 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#D98E2B] font-semibold block">Puja / Service Interested In</label>
                <select
                  value={selectedPuja}
                  onChange={(e) => setSelectedPuja(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#6B0F1A] border border-[#D98E2B]/40 text-white"
                >
                  {PUJA_SERVICES.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="General Consultation">General Kundali & Mahurat Consultation</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#D98E2B] font-semibold block">Preferred Travel Month</label>
                  <input
                    type="text"
                    placeholder="e.g. Next 2 Weeks"
                    value={preferredMonth}
                    onChange={(e) => setPreferredMonth(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-[#6B0F1A] border border-[#D98E2B]/40 text-white"
                  />
                </div>

                <div className="p-2.5 rounded-lg bg-[#6B0F1A] border border-[#D98E2B]/30 flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="nri-check-modal"
                    checked={isNRI}
                    onChange={(e) => setIsNRI(e.target.checked)}
                    className="w-4 h-4 accent-[#D98E2B]"
                  />
                  <label htmlFor="nri-check-modal" className="text-[11px] text-white cursor-pointer">
                    NRI / Overseas Client
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#D98E2B] font-semibold block">Additional Message / Question</label>
                <textarea
                  rows={2}
                  placeholder="e.g. How many days required for Narayan Nagbali?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#6B0F1A] border border-[#D98E2B]/40 text-white"
                />
              </div>
            </>
          )}

          {/* Message Preview Box */}
          <div className="space-y-1 pt-2">
            <span className="text-[#D98E2B] font-bold block text-[11px] uppercase tracking-wider">
              Message Preview:
            </span>
            <div className="p-3 rounded-lg bg-[#6B0F1A] border border-emerald-500/40 text-[11px] text-emerald-100 font-mono whitespace-pre-wrap leading-relaxed">
              {builtMessage}
            </div>
          </div>
        </div>

        {/* Launch Button Footer */}
        <div className="p-4 bg-[#6B0F1A] border-t border-[#D98E2B]/30 flex items-center justify-between gap-3">
          <span className="text-[11px] text-[#F5E9D8]/80">Opens WhatsApp App or Web</span>
          <button
            onClick={handleLaunchWhatsApp}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Launch WhatsApp Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};
