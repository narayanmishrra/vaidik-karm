import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageSquare, Menu, X, Clock, MapPin, Globe, Languages, ChevronDown, Check } from 'lucide-react';
import { SectionId, Language, HomeVariant } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { HOME_PATHS } from '../lib/routes';

interface HeaderProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  /** Which dedicated homepage is currently shown (Kaalsarp `/` or Nagbali `/narayan-nagbali-puja`). */
  homeVariant: HomeVariant;
  /** Switch between the two dedicated puja homepages. */
  onSelectHome: (variant: HomeVariant) => void;
  onOpenWhatsAppBuilder: () => void;
  lang: Language;
  onToggleLanguage: () => void;
}

/**
 * The site has one homepage per puja:
 *   • Kaalsarp Puja        -> /
 *   • Narayan Nagbali Puja -> /narayan-nagbali-puja
 * Both are listed in the nav bar (desktop: "Home" menu, mobile: two entries).
 */
const HOME_LINKS: { variant: HomeVariant; labelKey: string; subKey: string }[] = [
  { variant: 'kaalsarp', labelKey: 'navKaalsarpHome', subKey: 'navKaalsarpHomeSub' },
  { variant: 'nagbali', labelKey: 'navNagbaliHome', subKey: 'navNagbaliHomeSub' },
];

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  homeVariant,
  onSelectHome,
  onOpenWhatsAppBuilder,
  lang,
  onToggleLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [homeMenuOpen, setHomeMenuOpen] = useState(false);
  const [istTime, setIstTime] = useState('');
  const homeMenuRef = useRef<HTMLDivElement | null>(null);

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

  // Close the Home menu on Escape or on a click/tap outside of it.
  useEffect(() => {
    if (!homeMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setHomeMenuOpen(false);
    };
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (homeMenuRef.current && !homeMenuRef.current.contains(e.target as Node)) {
        setHomeMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [homeMenuOpen]);

  // Sections shared by both homepages. The homepages themselves are rendered
  // separately as the "Home" menu so both puja URLs stay one click away.
  const navItems: { id: SectionId; label: string }[] = [
    { id: 'history', label: t.navHistory },
    { id: 'services', label: t.navServices },
    { id: 'about', label: t.navAbout },
    { id: 'gallery', label: t.navGallery },
    { id: 'blog', label: t.navBlog },
    { id: 'contact', label: t.navContact }
  ];

  const isHomeActive = activeSection === 'home';

  const handleNavClick = (id: SectionId) => {
    setHomeMenuOpen(false);
    onSelectSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Navigate to one of the two dedicated homepages. The real href is kept on
   * the anchor (crawlable link + middle-click / open-in-new-tab works), while
   * a normal click is handled in-app so no full page reload is needed.
   */
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>, variant: HomeVariant) => {
    // Let the browser handle modifier-clicks and new-tab opens natively.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setHomeMenuOpen(false);
    setMobileMenuOpen(false);
    onSelectHome(variant);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#6B0F1A] text-[#F5E9D8] shadow-md border-b-2 border-[#D98E2B]">
      {/* Sleek Compact Top Bar (hidden on mobile to keep the first
          viewport focused on the hero + call CTA) */}
      <div className="hidden md:block bg-[#4A0B12] text-[#D98E2B] text-[11px] py-1 px-4 border-b border-[#D98E2B]/20">
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
          {/* Home menu — the two dedicated puja homepages */}
          <div
            ref={homeMenuRef}
            className="relative"
            onMouseEnter={() => setHomeMenuOpen(true)}
            onMouseLeave={() => setHomeMenuOpen(false)}
          >
            <button
              type="button"
              onClick={() => setHomeMenuOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={homeMenuOpen}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 relative flex items-center gap-1 ${isHomeActive
                ? 'text-[#D98E2B] bg-[#4A0B12] font-semibold'
                : 'text-[#F5E9D8] hover:text-[#D98E2B] hover:bg-[#4A0B12]/40'
                }`}
            >
              {t.navHome}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${homeMenuOpen ? 'rotate-180' : ''
                  }`}
              />
              {isHomeActive && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#D98E2B] rounded-full" />
              )}
            </button>

            {/* Panel stays mounted (hidden) so both homepage URLs remain
                crawlable internal links at all times. The `pt-2` is a
                transparent hover bridge — the card itself sits 8px below the
                button without the pointer ever leaving the menu. */}
            <div
              className={`absolute left-0 top-full z-50 pt-2 transition-all duration-150 ${homeMenuOpen
                ? 'visible opacity-100 translate-y-0'
                : 'invisible opacity-0 -translate-y-1 pointer-events-none'
                }`}
            >
              <div
                role="menu"
                aria-label={t.navHomeMenuLabel}
                className="w-72 origin-top-left rounded-xl border border-[#D98E2B]/40 bg-[#4A0B12] p-1.5 shadow-2xl"
              >
                <p className="px-2.5 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#D98E2B]/80">
                  {t.navHomeMenuLabel}
                </p>
                {HOME_LINKS.map((link) => {
                  const isCurrent = isHomeActive && homeVariant === link.variant;
                  return (
                    <a
                      key={link.variant}
                      href={HOME_PATHS[link.variant]}
                      role="menuitem"
                      onClick={(e) => handleHomeClick(e, link.variant)}
                      className={`flex items-start gap-2 rounded-lg px-2.5 py-2 transition-colors ${isCurrent
                        ? 'bg-[#6B0F1A] text-[#D98E2B]'
                        : 'text-[#F5E9D8] hover:bg-[#6B0F1A]/60 hover:text-[#D98E2B]'
                        }`}
                    >
                      <Check
                        className={`mt-0.5 w-3.5 h-3.5 shrink-0 ${isCurrent ? 'opacity-100' : 'opacity-0'
                          }`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold leading-tight">
                          {t[link.labelKey]}
                        </span>
                        <span className="block text-[11px] leading-snug text-[#F5E9D8]/70">
                          {t[link.subKey]}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

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
          {/* The two dedicated puja homepages */}
          <p className="px-3.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D98E2B]/80">
            {t.navHomeMenuLabel}
          </p>
          {HOME_LINKS.map((link) => {
            const isCurrent = isHomeActive && homeVariant === link.variant;
            return (
              <a
                key={link.variant}
                href={HOME_PATHS[link.variant]}
                onClick={(e) => handleHomeClick(e, link.variant)}
                className={`flex items-center justify-between gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${isCurrent
                  ? 'bg-[#6B0F1A] text-[#D98E2B] font-semibold border-l-4 border-[#D98E2B]'
                  : 'text-[#F5E9D8] hover:bg-[#6B0F1A]/50 hover:text-[#D98E2B]'
                  }`}
              >
                <span>{t[link.labelKey]}</span>
                <Check
                  className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'opacity-100' : 'opacity-0'}`}
                  aria-hidden="true"
                />
              </a>
            );
          })}

          <div className="pt-1 pb-1 border-b border-[#D98E2B]/20" />

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
