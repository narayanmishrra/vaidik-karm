import React from 'react';
import { Phone, MessageSquare, MapPin, Mail, Clock, Globe, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { SectionId } from '../types';

interface FooterProps {
  onSelectSection: (id: SectionId) => void;
  onOpenWhatsAppBuilder: () => void;
  onOpenSchemaModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSection,
  onOpenWhatsAppBuilder,
  onOpenSchemaModal
}) => {
  return (
    <footer className="bg-[#4A0B12] text-[#F5E9D8] border-t-2 border-[#D98E2B] relative">
      {/* Pre-footer Call/WhatsApp CTA Banner */}
      <div className="bg-gradient-to-r from-[#6B0F1A] via-[#B5121B] to-[#6B0F1A] text-white py-10 px-4 border-b border-[#D98E2B]/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs text-[#D98E2B] font-bold uppercase tracking-wider block">
              Ready to Book or Seek Guidance?
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FBF3E7]">
              Speak Directly with Trimbakeshwar Purohit
            </h3>
            <p className="text-xs sm:text-sm text-[#F5E9D8]/90">
              Free consultation on auspicious Mahurat, traditional attire, and travel dates.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:+919109695176"
              id="footer-call-btn"
              aria-label="Call Now"
              className="px-6 py-3.5 rounded-xl bg-[#6B0F1A] hover:bg-[#4A0B12] text-white font-bold text-sm border border-[#D98E2B] shadow-xl flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D98E2B] pointer-events-none" />
              <span className="pointer-events-none">Call +91 91096 95176</span>
            </a>

            <button
              onClick={onOpenWhatsAppBuilder}
              className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-xl flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200" />
              <span>WhatsApp Message</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B5121B] border-2 border-[#D98E2B] flex items-center justify-center text-[#D98E2B] font-serif font-bold text-xl">
              ॐ
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-[#FBF3E7]">
                वैदिक कर्म <span className="text-xs text-[#D98E2B] font-sans">Vaidik Karm</span>
              </h4>
              <p className="text-[11px] text-[#F5E9D8]/70">Trimbakeshwar Puja Services</p>
            </div>
          </div>

          <p className="text-[#F5E9D8]/80 leading-relaxed">
            Authentic, hereditary Purohit services at Trimbakeshwar Jyotirlinga. Conducting Kaalsarp Dosh Shanti, Narayan Nagbali, Tripindi Shraddha, and all Vedic Anushthans strictly adhering to Yajurveda Shastras.
          </p>

          <div className="pt-2 text-[#D98E2B] flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Famous & Authorised Purohit (Serving 3-4 Generations)</span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="lg:col-span-3 space-y-3">
          <h5 className="font-serif font-bold text-sm text-[#D98E2B] uppercase tracking-wider border-b border-[#D98E2B]/30 pb-2">
            Quick Links
          </h5>
          <ul className="space-y-2 text-[#F5E9D8]/90">
            <li>
              <button onClick={() => onSelectSection('home')} className="hover:text-[#D98E2B] flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> Home
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('history')} className="hover:text-[#D98E2B] flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> History & Temple
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('services')} className="hover:text-[#D98E2B] flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> Puja Services
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('about')} className="hover:text-[#D98E2B] flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> About Us & Lineage
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('gallery')} className="hover:text-[#D98E2B] flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> Gallery
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('blog')} className="hover:text-[#D98E2B] flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> Blog & Guides
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('contact')} className="hover:text-[#D98E2B] flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Key Pujas */}
        <div className="lg:col-span-3 space-y-3">
          <h5 className="font-serif font-bold text-sm text-[#D98E2B] uppercase tracking-wider border-b border-[#D98E2B]/30 pb-2">
            Trimbakeshwar Vidhis
          </h5>
          <ul className="space-y-2 text-[#F5E9D8]/90">
            <li>
              <button onClick={() => onSelectSection('services')} className="hover:text-[#D98E2B] text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> Kaalsarp Dosh Shanti Puja
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('services')} className="hover:text-[#D98E2B] text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> Narayan Nagbali Puja (3 Days)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('services')} className="hover:text-[#D98E2B] text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> Tripindi Shraddha Vidhi
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('services')} className="hover:text-[#D98E2B] text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> Mahamrityunjay Jaap & Havan
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('services')} className="hover:text-[#D98E2B] text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> Navgrah Dosh Shanti Puja
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('services')} className="hover:text-[#D98E2B] text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> Vastu Shanti & Rudrabhishek
              </button>
            </li>
            <li>
              <button onClick={() => onSelectSection('services')} className="hover:text-[#D98E2B] text-left flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-[#D98E2B]" /> All Vedic Anushthans
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & GEO Info */}
        <div className="lg:col-span-2 space-y-3">
          <h5 className="font-serif font-bold text-sm text-[#D98E2B] uppercase tracking-wider border-b border-[#D98E2B]/30 pb-2">
            Address & Phone
          </h5>
          <div className="space-y-2 text-[#F5E9D8]/80 leading-relaxed">
            <p className="flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-[#D98E2B] shrink-0 mt-0.5" />
              <span>Trimbakeshwar Village</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#D98E2B] shrink-0 pointer-events-none" />
              <a href="tel:+919109695176" id="footer-phone-link" aria-label="Call Now" className="hover:text-white font-bold">+91 91096 95176</a>
            </p>
            <p className="flex items-center gap-1.5 text-emerald-300">
              <Globe className="w-4 h-4 shrink-0" />
              <span>NRI Guidance Active</span>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#6B0F1A] py-4 px-4 text-center text-[11px] text-[#F5E9D8]/70 border-t border-[#D98E2B]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Vaidik Karm — Trimbakeshwar Puja Services. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
