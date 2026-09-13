import React, { useEffect, useState } from 'react';
import { Phone, MapPin, Camera } from 'lucide-react';
import { HomeVariant, Language } from '../types';
import { HOME_VARIANTS } from '../lib/routes';
import {
  trackEvent,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
} from '../lib/analytics';

interface HeroSectionProps {
  lang: Language;
  /**
   * Which homepage this hero belongs to. It changes *only* the hero title
   * (H1 + H2) — the photographs, location line, description, CTA and every
   * section below the hero stay identical on both URLs.
   * Defaults to the main Kaalsarp homepage.
   */
  variant?: HomeVariant;
}

/* ------------------------------------------------------------------ */
/* REAL photographs only — taken from the website's existing gallery.  */
/* Order: Kaalsarp Puja → Narayan Nagbali → Trimbakeshwar Temple →     */
/* puja vidhi, rotating every 3 seconds.                               */
/* ------------------------------------------------------------------ */
const HERO_SLIDES = [
  {
    src: '/images/2.webp',
    alt: 'Real photograph: Kaalsarp Puja at Trimbakeshwar — Shivling decorated with silver Nag-Nagin and marigold garlands',
    caption: { en: 'Kaalsarp Puja • Trimbakeshwar', hi: 'कालसर्प पूजा • त्र्यंबकेश्वर' },
  },
  {
    src: '/images/narayan_nagbali.jpg',
    alt: 'Real photograph: Narayan Nagbali Puja ritual being performed by pandits at Trimbakeshwar',
    caption: { en: 'Narayan Nagbali Puja Vidhi', hi: 'नारायण नागबली पूजा विधि' },
  },
  {
    src: '/images/Trimbakeshwar_Mandir.webp',
    srcSet: '/images/Trimbakeshwar_Mandir-640.webp 640w, /images/Trimbakeshwar_Mandir.webp 960w',
    sizes: '(max-width: 1023px) 100vw, 60vw',
    alt: 'Real photograph: Trimbakeshwar Jyotirlinga Temple, Nashik',
    caption: { en: 'Trimbakeshwar Jyotirlinga Mandir', hi: 'त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर' },
  },
  {
    src: '/images/4.webp',
    alt: 'Real photograph: Puja kalash and ritual arrangements by the pandit at Trimbakeshwar',
    caption: { en: 'Vedic Puja Arrangements', hi: 'वैदिक पूजा व्यवस्था' },
  },
];

const SLIDE_INTERVAL_MS = 3000;

/** Stacked, crossfading real photographs with caption + dots. */
const HeroSlideshow: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(
      () => setActive((i) => (i + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={`overflow-hidden bg-stone-900 ${className}`}>
      {HERO_SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          srcSet={'srcSet' in slide ? slide.srcSet : undefined}
          sizes={'sizes' in slide ? slide.sizes : undefined}
          alt={slide.alt}
          data-active={i === active}
          fetchPriority={i === 0 ? 'high' : undefined}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="hero-slide absolute inset-0 h-full w-full object-cover"
        />
      ))}

      {/* Authenticity caption — small, subtle, bottom-left */}
      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 backdrop-blur-sm sm:bottom-3 sm:left-3">
        <Camera className="h-3 w-3 text-white/80" aria-hidden="true" />
        <span className="text-[10px] font-medium text-white/90 sm:text-[11px]">
          {HERO_SLIDES[active].caption.en}
        </span>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-2.5 right-2.5 flex gap-1.5 sm:bottom-4 sm:right-4" aria-hidden="true">
        {HERO_SLIDES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, variant = 'kaalsarp' }) => {
  const hero = HOME_VARIANTS[variant].hero;

  return (
    <section className="relative border-b border-[#D98E2B]/40 bg-[#FBF3E7] text-[#241A16]">
      {/* Desktop: full-bleed slideshow behind the content. */}
      <div className="absolute inset-0 hidden lg:block">
        <HeroSlideshow className="absolute inset-0 h-full w-full" />
        {/* Subtle left-to-right gradient: text stays readable while the
            photographs remain clearly recognisable on the right. */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#160b07]/90 via-[#160b07]/55 to-[#160b07]/10"
          aria-hidden="true"
        />
      </div>

      {/* Mobile: gallery image first in the flow (photo → H1 → H2 →
          description → CALL NOW), no overlay so photos stay vivid. */}
      <div className="relative lg:hidden">
        <HeroSlideshow className="relative h-[36svh] max-h-[400px] min-h-[230px] w-full" />
      </div>

      {/* Single semantic content block for both breakpoints. */}
      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-4 sm:px-6 lg:flex lg:min-h-[620px] lg:items-center lg:px-6 lg:py-16">
        <div className="max-w-2xl space-y-2.5 lg:space-y-4">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B0F1A] lg:text-xs lg:tracking-[0.22em] lg:text-[#EFC268]">
            <MapPin className="h-3.5 w-3.5 text-[#B5121B] lg:text-[#D98E2B]" aria-hidden="true" />
            Trimbakeshwar Jyotirlinga • Nashik{lang === 'hi' ? ' • महाराष्ट्र' : ', Maharashtra'}
          </p>

          <h1 className="font-hindi text-[clamp(1.45rem,6.4vw,2rem)] font-bold leading-snug text-[#6B0F1A] lg:text-5xl lg:leading-[1.25] lg:text-white lg:drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] xl:text-[3.4rem]">
            {hero.titleHi}
          </h1>

          <h2 className="font-serif text-base font-semibold leading-snug text-[#241A16] sm:text-lg lg:text-2xl lg:text-[#F5E9D8] lg:drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
            {hero.titleEn}
          </h2>

          <p className="font-hindi-body text-sm leading-relaxed text-gray-700 lg:text-white/90 sm:text-base">
            {lang === 'hi'
              ? 'त्र्यंबकेश्वर ज्योतिर्लिंग, नासिक में अनुभवी वैदिक पंडित द्वारा प्रामाणिक पूजा। तिथि, विधि एवं बुकिंग की जानकारी के लिए अभी कॉल करें।'
              : 'Authentic Vedic pujas performed by an experienced pandit at Trimbakeshwar Jyotirlinga, Nashik. Call now for dates, vidhi guidance and booking.'}
          </p>

          <div className="pt-2">
            <a
              href={BUSINESS_PHONE_TEL}
              id="hero-call-btn"
              onClick={() => trackEvent('hero_call_click', { cta_location: 'hero' })}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-green-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-green-900/20 transition-all hover:bg-green-700 active:scale-[0.99] lg:w-auto lg:px-8 lg:text-lg lg:shadow-xl lg:shadow-black/30 lg:hover:-translate-y-0.5"
            >
              <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>CALL NOW — {BUSINESS_PHONE_DISPLAY}</span>
            </a>
            <p className="mt-2 text-center text-[11px] text-gray-600 lg:text-left lg:text-white/75 lg:text-xs">
              {lang === 'hi'
                ? 'पंडित जी से सीधी बात • प्रातः 6 – रात्रि 9:30 IST • कोई बिचौलिया नहीं'
                : 'Direct call to the pandit • 6 AM – 9:30 PM IST • No middlemen'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
