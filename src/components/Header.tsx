import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, Clock, MapPin, Globe, Languages } from 'lucide-react';
import { SectionId, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onOpenWhatsAppBuilder: () => void;
  lang: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  onOpenWhatsAppBuilder,
  lang,
  onToggleLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [istTime, setIstTime] = useState('');

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      setIstTime(now.toLocaleTimeString('en-US', options) + ' IST');
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'home', label: t.navHome },
    { id: 'history', label: t.navHistory },
    { id: 'services', label: t.navServices },
    { id: 'about', label: t.navAbout },
    { id: 'gallery', label: t.navGallery },
    { id: 'blog', label: t.navBlog },
    { id: 'contact', label: t.navContact }
  ];

  const handleNavClick = (id: SectionId) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#6B0F1A] text-[#F5E9D8] shadow-md border-b-2 border-[#D98E2B]">
      {/* Sleek Compact Top Bar */}
      <div className="bg-[#4A0B12] text-[#D98E2B] text-[11px] py-1 px-4 border-b border-[#D98E2B]/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium text-[#F5E9D8]">
              <MapPin className="w-3 h-3 text-[#D98E2B]" />
              Trimbakeshwar Kshetra, Nashik
            </span>
            <span className="hidden md:inline text-[#D98E2B]/40">•</span>
            <span className="hidden md:flex items-center gap-1 text-[#FBF3E7]/90">
              <Clock className="w-3 h-3 text-[#D98E2B]" />
              {istTime || 'Asia/Kolkata IST'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:flex items-center gap-1 text-emerald-300 font-medium">
              <Globe className="w-3 h-3" />
              NRI WhatsApp Consultation Active
            </span>

            <a
              href="tel:+919109695176"
              id="header-topbar-call-btn"
              aria-label="Call Now"
              className="flex items-center gap-1 font-bold text-white hover:text-[#D98E2B] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D98E2B] pointer-events-none" />
              <span className="hidden sm:inline pointer-events-none">+91 91096 95176</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Streamlined Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Brand Title */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <img
            src="/images/logo.webp"
            alt="Trimbakeshwar Guruji"
            className="w-10 h-10 rounded-full border-2 border-[#D98E2B] object-cover shadow group-hover:scale-105 transition-transform"
          />
          <div>
            <span className="block text-lg sm:text-xl font-serif font-bold text-[#F5E9D8] leading-tight tracking-wide group-hover:text-[#D98E2B] transition-colors">
              {t.brandTitle}
            </span>
            <p className="text-[10px] text-[#F5E9D8]/80 font-sans tracking-wider uppercase hidden sm:block">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 relative ${isActive
                  ? 'text-[#D98E2B] bg-[#4A0B12] font-semibold'
                  : 'text-[#F5E9D8] hover:text-[#D98E2B] hover:bg-[#4A0B12]/40'
                  }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#D98E2B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onToggleLanguage}
            className="px-2.5 py-1.5 rounded bg-[#4A0B12] hover:bg-[#6B0F1A] border border-[#D98E2B] text-white text-xs font-bold flex items-center gap-1 transition-colors"
            title="Switch Language / भाषा बदलें"
          >
            <Languages className="w-3.5 h-3.5 text-[#D98E2B]" />
            <span>{t.languageName}</span>
          </button>
          <button
            onClick={onOpenWhatsAppBuilder}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white shadow transition-all hover:scale-105"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.whatsappChat}</span>
          </button>
          <a
            href="tel:+919109695176"
            id="header-call-btn"
            aria-label="Call Now"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#B5121B] hover:bg-[#8F0E15] text-white border border-[#D98E2B] shadow transition-all hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5 text-[#D98E2B] pointer-events-none" />
            <span className="pointer-events-none">{t.callNow}</span>
          </a>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={onToggleLanguage}
            className="px-2.5 py-1 rounded bg-[#4A0B12] border border-[#D98E2B] text-white text-xs font-bold flex items-center gap-1"
          >
            <Languages className="w-3 h-3 text-[#D98E2B]" />
            <span>{t.languageName}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-[#D98E2B] hover:text-white hover:bg-[#4A0B12] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#4A0B12] border-t border-[#D98E2B]/30 px-4 py-3 space-y-1 shadow-2xl animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${activeSection === item.id
                ? 'bg-[#6B0F1A] text-[#D98E2B] font-semibold border-l-4 border-[#D98E2B]'
                : 'text-[#F5E9D8] hover:bg-[#6B0F1A]/50 hover:text-[#D98E2B]'
                }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-[#D98E2B]/20 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsAppBuilder();
              }}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-700 text-white font-medium text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </button>
            <a
              href="tel:+919109695176"
              id="header-mobile-call-btn"
              aria-label="Call Now"
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#B5121B] text-white font-medium text-xs border border-[#D98E2B]"
            >
              <Phone className="w-3.5 h-3.5 text-[#D98E2B] pointer-events-none" />
              <span className="pointer-events-none">Call Now</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
