import React, { useEffect, useRef, useState } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Award,
  CalendarCheck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Users,
  Star,
  ChevronRight,
  Send,
  TrainFront,
  Plane,
  Car,
  Navigation,
  Quote,
  Sparkles,
} from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  trackEvent,
  whatsappUrl,
  openExternal,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  WHATSAPP_DEFAULT_MESSAGE,
} from '../lib/analytics';

/* ------------------------------------------------------------------ */
/* Business facts — everything below is taken from the existing site    */
/* (Vaidik Karm / Trimbakeshwar Guruji) or is a clearly labelled        */
/* placeholder. Nothing is fabricated.                                  */
/* ------------------------------------------------------------------ */

const BRAND_NAME = 'Vaidik Karm';
const BRAND_TAGLINE = 'Trimbakeshwar Puja Services';
const GURUJI_NAME = 'Pt. Vinay Shastri (Guruji)';
const ADDRESS = 'Trimbakeshwar Kshetra, Nashik District, Maharashtra 422212, India';
const CONSULT_HOURS = 'Consultation Hours: 6:00 AM – 9:30 PM (IST Daily)';
const MAP_URL = 'https://maps.app.goo.gl/mz44QaH1dkGmYRfa7';
const SITE_URL = 'https://www.kaalsarpintrimbakeshwar.com';
const LANDING_PATH = '/kaal-sarp-puja';

const WHATSAPP_BOOKING_MESSAGE =
  'Hello, I want to enquire about Kaal Sarp Puja in Trimbakeshwar. Please share available dates and booking details.';

const TRUST_ITEMS = [
  {
    icon: MapPin,
    title: 'Trimbakeshwar, Nashik',
    sub: 'Puja performed at the Trimbakeshwar Kshetra, Maharashtra',
  },
  {
    icon: Award,
    title: 'Experienced Pandit Ji',
    sub: `${GURUJI_NAME} — hereditary purohit, 30+ years at Trimbakeshwar`,
  },
  {
    icon: CalendarCheck,
    title: 'Date & Process Guidance',
    sub: 'Auspicious dates and puja details shared before you book',
  },
  {
    icon: Phone,
    title: 'Direct Contact',
    sub: 'Call or WhatsApp for booking assistance — no middlemen',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Contact / Booking',
    desc: 'Call, WhatsApp or submit the booking form. Share your name, birth details and preferred dates.',
  },
  {
    step: '02',
    title: 'Select Puja Date',
    desc: 'An auspicious date is suggested based on the Panchang and your details.',
  },
  {
    step: '03',
    title: 'Receive Puja Guidance',
    desc: 'Get clear guidance on the puja process, attire, samagri and arrival at Trimbakeshwar.',
  },
  {
    step: '04',
    title: 'Perform Puja at Trimbakeshwar',
    desc: 'The puja is performed at the Trimbakeshwar Kshetra by experienced Pandit Ji.',
  },
  {
    step: '05',
    title: 'Complete the Ritual',
    desc: 'Havan, aarti and ritual completion — with transparency at every step.',
  },
];

const INCLUDED_ITEMS = [
  'Experienced Pandit Ji for the complete puja',
  'Puja coordination and ritual arrangements',
  'Auspicious date and time (muhurat) guidance',
  'Trimbakeshwar location and arrival guidance',
  'Clear information on the puja process and samagri',
  'Booking assistance by phone and WhatsApp',
  'Ritual samagri arrangements (incl. silver Nag-Nagin pair, havan samagri)',
  'Guidance on traditional attire and preparation',
];

const PUJA_DETAILS = [
  { term: 'Puja name', detail: 'Kaal Sarp Puja (Kaalsarp Dosh Shanti Puja)' },
  { term: 'Location', detail: 'Trimbakeshwar Jyotirlinga Kshetra, Nashik, Maharashtra' },
  { term: 'Approximate duration', detail: '1 day — approx. 3 to 4 hours' },
  {
    term: 'Preferred days',
    detail: 'Amavasya, Nag Panchami, Tuesday, Sunday — as per Panchang and muhurat',
  },
  {
    term: 'Traditional attire',
    detail: 'Men: dhoti-kurta. Women: saree or salwar suit. Black / blue clothes are avoided.',
  },
  {
    term: 'What to share for booking',
    detail: 'Full name, birth details (date, time, place), gotra and preferred dates',
  },
  {
    term: 'NRI devotees',
    detail: 'In-person presence is ideal; Sankalp-based puja can be arranged with full transparency',
  },
  {
    term: 'After booking',
    detail: 'Puja date confirmation and complete preparation guidance shared in advance',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What is Kaal Sarp Puja?',
    a: 'Kaal Sarp Puja is a Vedic shanti ritual traditionally performed when all seven planets in a birth chart are placed between Rahu and Ketu — a planetary condition known as Kaal Sarp Dosh. The puja includes sankalp, mantra japa, abhishek and havan, and is performed with full Vedic procedure at Trimbakeshwar.',
  },
  {
    q: 'Where is Kaal Sarp Puja performed in Trimbakeshwar?',
    a: 'Kaal Sarp Puja is performed at the Trimbakeshwar Kshetra — home to the only Jyotirlinga where Brahma, Vishnu and Mahesh reside in a single linga, and near Kushavarta Kund, considered the origin of the Godavari river.',
  },
  {
    q: 'How can I book Kaal Sarp Puja?',
    a: 'You can book by phone (+91 91096 95176), on WhatsApp, or through the booking form on this page. Share your name, birth details, gotra and preferred dates — we will confirm availability, price and the puja date.',
  },
  {
    q: 'How much does Kaal Sarp Puja cost?',
    a: 'The price depends on the puja date, samagri requirements and the number of devotees. Contact us for the current price and availability — we will share complete booking details before you confirm.',
  },
  {
    q: 'How long does the puja take?',
    a: 'Kaal Sarp Puja is completed in one day, with the main ritual taking approximately 3 to 4 hours. You will receive the full schedule in advance.',
  },
  {
    q: 'What should I bring for the puja?',
    a: 'Bring your birth details if you have them. Traditional attire is advised — men wear dhoti-kurta, women wear saree or salwar suit, and black or blue clothes are avoided. Ritual samagri arrangements are handled for you.',
  },
  {
    q: 'How do I choose a puja date?',
    a: 'Auspicious days include Amavasya, Nag Panchami, Tuesday and Sunday. The final date is suggested based on the Panchang and your birth details, and confirmed with you before booking.',
  },
  {
    q: 'Can I contact the Pandit before booking?',
    a: 'Yes. You can call or message on WhatsApp before booking to ask about dates, price, the puja process or any other question. Consultation hours are 6:00 AM – 9:30 PM IST daily.',
  },
  {
    q: 'Can NRI devotees perform the puja without visiting in person?',
    a: 'In-person presence is most ideal, but for devotees who cannot travel, Sankalp-based puja — performed by the purohit on your behalf — can be arranged with complete transparency.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Vikramaditya Sharma',
    location: 'California, USA',
    puja: 'Kaalsarp Dosh Shanti Puja',
    date: 'May 2026',
    comment:
      'I had been suffering from continuous business setbacks and severe anxiety. An astrologer suggested Kaalsarp Shanti at Trimbakeshwar. Trimbakeshwar Guruji made the entire process seamless. The Sanskrit mantras were chanted with intense devotion. I felt an immediate sense of peace following the Visarjan.',
  },
  {
    name: 'Meenakshi & Devendra Patel',
    location: 'Dubai, UAE',
    puja: 'Kaalsarp Dosh & Navgrah Shanti',
    date: 'March 2026',
    comment:
      'Pt. Vinay Shastri (Guruji) responded to all our WhatsApp queries before we booked our flights from Dubai. The arrangement at Kusavarta Kund was smooth, respectful, and deeply spiritual.',
  },
  {
    name: 'Rajesh & Sunita Kulkarni',
    location: 'London, United Kingdom',
    puja: 'Narayan Nagbali Puja',
    date: 'June 2026',
    comment:
      'Coming all the way from London, we were initially nervous about managing a 3-day Puja in India. Pt. Vinay Shastri (Guruji) guided us at every step. From hotel booking support near the temple to organizing immaculate Samagri, everything was handled with complete purity and warmth. Highly recommended for NRI families!',
  },
  {
    name: 'Dr. Anand Rao',
    location: 'Bengaluru, Karnataka',
    puja: 'Tripindi Shraddha & Mahamrityunjay Jaap',
    date: 'April 2026',
    comment:
      'The level of Vedic authenticity provided by Pandit Shivkumar Shastri Ji is unmatched. No hidden demands, no commercial rush — just pure devotion and clear explanations of every step of the Vidhi.',
  },
];

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  title,
  sub,
  light = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-3">
      <span
        className={`inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] ${
          light ? 'text-[#D98E2B]' : 'text-[#B5121B]'
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight ${
          light ? 'text-[#FBF3E7]' : 'text-[#6B0F1A]'
        }`}
      >
        {title}
      </h2>
      <div className={`gold-divider w-24 mx-auto ${light ? 'opacity-80' : ''}`} />
      {sub && (
        <p className={`text-sm sm:text-base leading-relaxed ${light ? 'text-[#F5E9D8]/85' : 'text-gray-700'}`}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main landing page                                                   */
/* ------------------------------------------------------------------ */

interface KaalSarpLandingPageProps {
  onExitLanding: (section?: 'home' | 'services' | 'about' | 'blog' | 'contact') => void;
}

export const KaalSarpLandingPage: React.FC<KaalSarpLandingPageProps> = ({ onExitLanding }) => {
  const bookingRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', date: '', devotees: '1-2', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  /* ------------------------- SEO / structured data ------------------------- */

  usePageMeta({
    title: 'Kaal Sarp Puja in Trimbakeshwar | Trimbakeshwar Guruji',
    description:
      'Book Kaal Sarp Puja in Trimbakeshwar, Nashik. Get puja details, availability and booking assistance from experienced Pandit Ji.',
    canonical: `${SITE_URL}${LANDING_PATH}`,
    ogTitle: 'Kaal Sarp Puja in Trimbakeshwar | Trimbakeshwar Guruji',
    ogDescription:
      'Book Kaal Sarp Puja at Trimbakeshwar, Nashik with experienced Pandit Ji. Get puja details, availability and booking assistance.',
    ogImage: `${SITE_URL}/images/Trimbakeshwar_Mandir.webp`,
    preloadImage: '/images/Trimbakeshwar_Mandir.webp',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${SITE_URL}/#business`,
        name: `${BRAND_NAME} – ${BRAND_TAGLINE}`,
        alternateName: 'Trimbakeshwar Guruji',
        description:
          'Authentic Vedic puja and ritual services at Trimbakeshwar Jyotirlinga, Nashik, Maharashtra — including Kaal Sarp Puja, Narayan Nagbali and Tripindi Shraddha.',
        url: SITE_URL,
        telephone: '+91-9109695176',
        image: `${SITE_URL}/images/logo.webp`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Trimbakeshwar',
          addressRegion: 'Maharashtra',
          postalCode: '422212',
          addressCountry: 'IN',
        },
        areaServed: ['Trimbakeshwar', 'Nashik', 'Maharashtra', 'India'],
        openingHours: 'Mo-Su 06:00-21:30',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${SITE_URL}${LANDING_PATH}/#service`,
        name: 'Kaal Sarp Puja in Trimbakeshwar',
        serviceType: 'Kaal Sarp Puja / Kaalsarp Dosh Shanti Puja',
        description:
          'Kaal Sarp Puja performed at Trimbakeshwar Jyotirlinga Kshetra, Nashik, Maharashtra by experienced hereditary Pandit Ji. Booking assistance, date and muhurat guidance, and complete puja arrangements.',
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: ['Trimbakeshwar', 'Nashik', 'Maharashtra', 'India'],
        url: `${SITE_URL}${LANDING_PATH}`,
        audience: {
          '@type': 'PeopleAudience',
          name: 'Devotees seeking Kaal Sarp Puja at Trimbakeshwar',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${SITE_URL}${LANDING_PATH}/#faq`,
        mainEntity: FAQ_ITEMS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Kaal Sarp Puja in Trimbakeshwar',
            item: `${SITE_URL}${LANDING_PATH}`,
          },
        ],
      },
    ],
  });

  /* ----------------------- engagement tracking ----------------------- */

  // Support deep links like /kaal-sarp-puja#booking (scroll after first paint).
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && hash !== 'kaal-sarp-puja') {
      const el = document.getElementById(hash);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'auto', block: 'start' }));
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const seen = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max <= 0) return;
      const pct = Math.round((doc.scrollTop / max) * 100);
      [25, 50, 75, 100].forEach((t) => {
        if (pct >= t && !seen.has(t)) {
          seen.add(t);
          trackEvent('kaal_sarp_scroll_depth', { scroll_depth: t });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = bookingRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackEvent('kaal_sarp_section_view', { section: 'booking' });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* --------------------------- form handlers --------------------------- */

  const handlePhoneClick = (label: string) => () =>
    trackEvent('kaal_sarp_phone_click', { cta_label: label });

  const handleWhatsAppClick = (label: string) => () =>
    trackEvent('kaal_sarp_whatsapp_click', { cta_label: label });

  const handleCtaClick = (label: string) => () =>
    trackEvent('kaal_sarp_cta_click', { cta_label: label });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('kaal_sarp_booking_submit', {
      devotees: form.devotees,
      has_date: Boolean(form.date.trim()),
      has_message: Boolean(form.message.trim()),
    });
    const text =
      `Hari Om Acharya Ji. Kaal Sarp Puja Booking Request (from landing page):\n` +
      `• Name: ${form.name}\n` +
      `• Phone: ${form.phone}\n` +
      `• Preferred date: ${form.date || 'Next available auspicious date'}\n` +
      `• Devotees: ${form.devotees}\n` +
      `• Message: ${form.message || 'Please share availability and booking details.'}`;
    openExternal(whatsappUrl(text));
    setFormSubmitted(true);
  };

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ------------------------------- render ------------------------------ */

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#241A16] font-body flex flex-col pb-16 md:pb-0">
      {/* ============================ SLIM HEADER ============================ */}
      <header className="sticky top-0 z-40 bg-[#6B0F1A] text-[#F5E9D8] shadow-md border-b-2 border-[#D98E2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          <button
            onClick={() => onExitLanding('home')}
            className="flex items-center gap-2.5 group"
            aria-label="Go to Trimbakeshwar Guruji homepage"
          >
            <img
              src="/images/logo.webp"
              alt="Trimbakeshwar Guruji logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border-2 border-[#D98E2B] object-cover shadow group-hover:scale-105 transition-transform"
            />
            <span className="text-left">
              <span className="block text-sm sm:text-base font-serif font-bold text-[#F5E9D8] leading-tight tracking-wide group-hover:text-[#D98E2B] transition-colors">
                Trimbakeshwar Guruji
              </span>
              <span className="hidden sm:block text-[10px] text-[#F5E9D8]/80 tracking-wider uppercase">
                {BRAND_NAME} • {BRAND_TAGLINE}
              </span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={BUSINESS_PHONE_TEL}
              onClick={handlePhoneClick('header')}
              aria-label={`Call ${BUSINESS_PHONE_DISPLAY}`}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#4A0B12] hover:bg-[#8F0E15] text-white text-xs font-bold border border-[#D98E2B]/60 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D98E2B] pointer-events-none" />
              <span className="pointer-events-none">{BUSINESS_PHONE_DISPLAY}</span>
            </a>
            <a
              href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick('header')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Us
            </a>
            <button
              onClick={() => {
                handleCtaClick('header_book')();
                scrollToBooking();
              }}
              className="px-4 py-2 rounded-lg bg-[#B5121B] hover:bg-[#8F0E15] text-white text-xs font-bold border border-[#D98E2B] shadow transition-colors"
            >
              Book Puja
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* ============================== HERO ============================== */}
        <section className="relative overflow-hidden bg-[#FBF3E7] border-b border-[#D98E2B]/40">
          {/* Subtle decorative glow (pure CSS, no images) */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.12] pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, #D98E2B 0%, transparent 65%)',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-10 sm:py-14 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Copy */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left animate-fade-in-up">
                <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B0F1A]/5 border border-[#D98E2B]/50 text-[#B5121B] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#D98E2B]" aria-hidden="true" />
                  Kaal Sarp Puja • Trimbakeshwar
                </p>

                <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-serif font-bold text-[#6B0F1A] leading-[1.12] tracking-tight">
                  Kaal Sarp Puja in{' '}
                  <span className="text-[#B5121B] italic">Trimbakeshwar</span>
                </h1>

                <p className="text-sm sm:text-base text-[#4A3E39] leading-relaxed max-w-xl font-body">
                  Book Kaal Sarp Puja at Trimbakeshwar with experienced Pandit Ji. Get
                  guidance for the puja process, timing and booking.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    onClick={() => {
                      handleCtaClick('hero_book')();
                      scrollToBooking();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#B5121B] hover:bg-[#6B0F1A] text-white font-bold text-sm sm:text-base border border-[#D98E2B] shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    Book Kaal Sarp Puja
                    <ChevronRight className="w-4 h-4 text-[#D98E2B]" aria-hidden="true" />
                  </button>
                  <a
                    href={BUSINESS_PHONE_TEL}
                    onClick={handlePhoneClick('hero')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#6B0F1A] hover:bg-[#4A0B12] text-white font-bold text-sm sm:text-base border border-[#D98E2B]/60 shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    <Phone className="w-4 h-4 text-[#D98E2B] pointer-events-none" aria-hidden="true" />
                    <span className="pointer-events-none">Call Now</span>
                  </a>
                  <a
                    href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick('hero')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-200" aria-hidden="true" />
                    WhatsApp Us
                  </a>
                </div>

                {/* Trust indicators */}
                <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-xs sm:text-[13px] text-gray-700">
                  {[
                    'Trimbakeshwar-based puja service',
                    'Hereditary Pandit Ji',
                    'Booking & date assistance',
                    'Direct call & WhatsApp',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#D98E2B] shadow-2xl bg-stone-900">
                  <img
                    src="/images/Trimbakeshwar_Mandir.webp"
                    srcSet="/images/Trimbakeshwar_Mandir-640.webp 640w, /images/Trimbakeshwar_Mandir.webp 960w"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    width={960}
                    height={640}
                    fetchPriority="high"
                    alt="Trimbakeshwar Jyotirlinga temple — Kaal Sarp Puja performed at Trimbakeshwar, Nashik"
                    className="w-full h-[240px] sm:h-[320px] lg:h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6B0F1A]/85 via-[#6B0F1A]/10 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <p className="font-serif font-bold text-[#FBF3E7] text-sm sm:text-base">
                      Trimbakeshwar Jyotirlinga Kshetra
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#D98E2B] font-medium">
                      Nashik, Maharashtra — the sacred site for Kaal Sarp Puja
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================ TRUST BAR ============================ */}
        <section aria-label="Trust signals" className="bg-white border-b border-[#D98E2B]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/30 shadow-sm"
                >
                  <span className="p-2.5 rounded-full bg-[#6B0F1A]/10 text-[#6B0F1A] shrink-0">
                    <item.icon className="w-5 h-5 text-[#B5121B]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-[#6B0F1A]">{item.title}</span>
                    <span className="block text-[11px] text-gray-600 leading-snug mt-0.5">{item.sub}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== WHY KAAL SARP PUJA AT TRIMBAKESHWAR ==================== */}
        <section id="why" className="py-12 sm:py-16 bg-[#FBF3E7] border-b border-[#D98E2B]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <SectionHeading
              eyebrow="Why Trimbakeshwar"
              title="Why Perform Kaal Sarp Puja at Trimbakeshwar?"
              sub="Understand the puja, the sacred site, and what to expect — before you book."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden border-2 border-[#D98E2B] shadow-xl">
                  <img
                    src="/images/kaal_sarp_puja.webp"
                    width={1000}
                    height={667}
                    loading="lazy"
                    alt="Kaal Sarp Puja ritual performed at Trimbakeshwar with havan samagri"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-[280px] rounded-xl bg-[#6B0F1A] border border-[#D98E2B] shadow-lg p-3.5">
                  <p className="text-[11px] text-[#D98E2B] font-bold uppercase tracking-wider">Did you know</p>
                  <p className="text-[11px] sm:text-xs text-[#F5E9D8] leading-snug mt-1">
                    Trimbakeshwar is the only Jyotirlinga where Brahma, Vishnu and Mahesh reside in one linga.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  <strong className="text-[#6B0F1A]">Kaal Sarp Puja</strong> is a Vedic shanti
                  ritual traditionally performed when the seven planets in a birth chart are
                  placed between Rahu and Ketu — a planetary condition known as{' '}
                  <strong className="text-[#6B0F1A]">Kaal Sarp Dosh</strong>. The puja seeks to
                  pacify this influence through sankalp, mantra japa, abhishek and havan, and is
                  performed with complete Vedic procedure.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Devotees from across India and abroad choose{' '}
                  <strong className="text-[#6B0F1A]">Trimbakeshwar, Nashik</strong> for this puja
                  because it is home to the only Jyotirlinga embodying Brahma, Vishnu and Mahesh
                  together, and to <strong className="text-[#6B0F1A]">Kushavarta Kund</strong> —
                  considered the origin of the Godavari river.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {[
                    {
                      title: 'What it addresses',
                      desc: 'Traditionally understood to help with delays in marriage, career, health or peace of mind linked to Rahu–Ketu influence.',
                    },
                    {
                      title: 'Why Trimbakeshwar',
                      desc: 'A unique Jyotirlinga kshetra where the puja is performed with full Vedic procedure by hereditary purohits.',
                    },
                    {
                      title: 'What you can expect',
                      desc: 'Clear guidance before the puja, a properly conducted ritual, and transparency from sankalp to visarjan.',
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="p-4 rounded-xl bg-white border border-[#D98E2B]/30 shadow-sm"
                    >
                      <h3 className="font-serif font-bold text-[#6B0F1A] text-sm">{card.title}</h3>
                      <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed mt-1.5">{card.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-gray-500 italic leading-relaxed">
                  We perform every ritual with complete Vedic procedure and respect for tradition.
                  Puja outcomes are a matter of faith — we make no claims of guaranteed results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================ PROCESS ============================ */}
        <section id="process" className="py-12 sm:py-16 bg-[#F3E6D3] border-b border-[#D98E2B]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <SectionHeading
              eyebrow="How It Works"
              title="Kaal Sarp Puja Process"
              sub="A simple, guided booking — from your first call to the completed ritual."
            />

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PROCESS_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="relative p-5 rounded-2xl bg-white border border-[#D98E2B]/40 shadow-md flex flex-col gap-2.5 hover:border-[#D98E2B] hover:shadow-lg transition-all"
                >
                  <span
                    className="font-display text-3xl font-bold text-[#D98E2B]"
                    aria-hidden="true"
                  >
                    {item.step}
                  </span>
                  <h3 className="font-serif font-bold text-[#6B0F1A] text-sm leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============================ WHAT'S INCLUDED ============================ */}
        <section id="included" className="py-12 sm:py-16 bg-white border-b border-[#D98E2B]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <SectionHeading
              eyebrow="Transparent Service"
              title="What's Included"
              sub="Know exactly what the Kaal Sarp Puja booking covers."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-4xl mx-auto">
              {INCLUDED_ITEMS.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/30 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-xs sm:text-sm text-gray-800 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-gray-600">
              Need details on any of these? Ask us on{' '}
              <a
                href={BUSINESS_PHONE_TEL}
                onClick={handlePhoneClick('included_note')}
                className="font-bold text-[#B5121B] underline decoration-[#D98E2B] underline-offset-2"
              >
                call
              </a>{' '}
              or{' '}
              <a
                href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick('included_note')}
                className="font-bold text-emerald-700 underline decoration-emerald-300 underline-offset-2"
              >
                WhatsApp
              </a>{' '}
              before you book.
            </p>
          </div>
        </section>

        {/* ============================ PUJA DETAILS ============================ */}
        <section id="details" className="py-12 sm:py-16 bg-[#FBF3E7] border-b border-[#D98E2B]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <SectionHeading
              eyebrow="Puja Details"
              title="Kaal Sarp Puja Details"
              sub="Everything you need to know about the puja at a glance."
            />

            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PUJA_DETAILS.map((item) => (
                <div
                  key={item.term}
                  className="p-5 rounded-2xl bg-white border border-[#D98E2B]/40 shadow-sm"
                >
                  <dt className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[#B5121B]">
                    {item.term}
                  </dt>
                  <dd className="mt-1.5 text-xs sm:text-sm text-gray-800 leading-relaxed">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="text-center text-[11px] sm:text-xs text-gray-600 max-w-2xl mx-auto">
              Muhurat dates may shift slightly per the Panchang for your birth details. A
              personalised puja date is confirmed with you at the time of booking.
            </p>
          </div>
        </section>

        {/* ======================= PRICE / BOOKING + FORM ======================= */}
        <section
          id="booking"
          ref={bookingRef}
          className="py-12 sm:py-16 relative overflow-hidden bg-[#4A0B12] border-b border-[#D98E2B]/50"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 20% 20%, #D98E2B 0%, transparent 45%), radial-gradient(circle at 85% 85%, #D98E2B 0%, transparent 40%)',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <SectionHeading
              light
              eyebrow="Booking"
              title="Kaal Sarp Puja Booking"
              sub="Get the current price and availability, then confirm your puja date — by call, WhatsApp or the form below."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Price & availability panel */}
              <div className="lg:col-span-5 space-y-5">
                <div className="p-6 sm:p-7 rounded-2xl bg-[#6B0F1A]/70 border-2 border-[#D98E2B] shadow-xl space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-xl text-[#FBF3E7]">
                      Get Puja Price &amp; Availability
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F5E9D8]/85 leading-relaxed">
                      Contact us for available dates and complete booking details. We will share
                      the current price, date options and puja arrangements before you confirm.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <a
                      href={whatsappUrl(WHATSAPP_BOOKING_MESSAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWhatsAppClick('booking_availability')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-200" aria-hidden="true" />
                      Check Availability
                    </a>
                    <a
                      href={BUSINESS_PHONE_TEL}
                      onClick={handlePhoneClick('booking')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#B5121B] hover:bg-[#8F0E15] text-white font-bold text-xs sm:text-sm border border-[#D98E2B]/60 shadow-lg transition-all"
                    >
                      <Phone className="w-4 h-4 text-[#D98E2B] pointer-events-none" aria-hidden="true" />
                      <span className="pointer-events-none">Call Now</span>
                    </a>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#F5E9D8] pt-1">
                    <li className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#D98E2B] shrink-0" aria-hidden="true" />
                      {BUSINESS_PHONE_DISPLAY}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#D98E2B] shrink-0" aria-hidden="true" />
                      {CONSULT_HOURS}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#D98E2B] shrink-0" aria-hidden="true" />
                      {ADDRESS}
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#6B0F1A]/40 border border-[#D98E2B]/40 space-y-2">
                  <p className="text-xs font-bold text-[#D98E2B] uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    Before you book
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#F5E9D8]/85 leading-relaxed">
                    Keep your birth details handy (date, time and place of birth, plus gotra if
                    known). This helps us confirm the right muhurat for you.
                  </p>
                </div>
              </div>

              {/* Booking form */}
              <div className="lg:col-span-7">
                <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#D98E2B] shadow-2xl">
                  <div className="border-b border-[#D98E2B]/30 pb-3 mb-5">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#6B0F1A]">
                      Request Puja Booking
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      Fill in your details — we will respond with availability, price and the
                      confirmed puja date.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div
                      className="p-6 rounded-xl bg-[#F3E6D3] border border-[#D98E2B] text-center space-y-3"
                      role="status"
                    >
                      <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" aria-hidden="true" />
                      <h4 className="text-lg font-serif font-bold text-[#6B0F1A]">
                        Thank you, {form.name.split(' ')[0] || 'Devotee'}!
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-md mx-auto">
                        WhatsApp is opening with your booking request to {GURUJI_NAME}. If it
                        didn't open, message us directly at{' '}
                        <a
                          href={BUSINESS_PHONE_TEL}
                          onClick={handlePhoneClick('form_success')}
                          className="font-bold text-[#B5121B]"
                        >
                          {BUSINESS_PHONE_DISPLAY}
                        </a>{' '}
                        or on WhatsApp.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="text-xs text-[#B5121B] font-bold underline underline-offset-2 pt-1"
                      >
                        Submit another request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="ksp-name" className="block text-xs font-semibold text-[#6B0F1A]">
                            Your Name *
                          </label>
                          <input
                            id="ksp-name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="e.g. Ramesh Sharma"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6B0F1A] focus:border-[#6B0F1A]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="ksp-phone" className="block text-xs font-semibold text-[#6B0F1A]">
                            Phone Number (with country code) *
                          </label>
                          <input
                            id="ksp-phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            placeholder="e.g. +91 98765 43210"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6B0F1A] focus:border-[#6B0F1A]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="ksp-date" className="block text-xs font-semibold text-[#6B0F1A]">
                            Preferred Date
                          </label>
                          <input
                            id="ksp-date"
                            type="text"
                            placeholder="e.g. Next month / 15 Aug 2026"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                            className="w-full p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6B0F1A] focus:border-[#6B0F1A]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="ksp-devotees" className="block text-xs font-semibold text-[#6B0F1A]">
                            Number of Devotees
                          </label>
                          <select
                            id="ksp-devotees"
                            value={form.devotees}
                            onChange={(e) => setForm({ ...form, devotees: e.target.value })}
                            className="w-full p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6B0F1A] focus:border-[#6B0F1A]"
                          >
                            <option value="1">1 Devotee</option>
                            <option value="2">2 Devotees (Couple)</option>
                            <option value="3-5">3–5 Devotees (Family)</option>
                            <option value="6+">6+ Devotees (Group)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="ksp-message" className="block text-xs font-semibold text-[#6B0F1A]">
                          Message / Requirement <span className="font-normal text-gray-500">(optional)</span>
                        </label>
                        <textarea
                          id="ksp-message"
                          rows={3}
                          placeholder="Share birth details, gotra, or any specific question about the puja..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6B0F1A] focus:border-[#6B0F1A]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-xl bg-[#B5121B] hover:bg-[#6B0F1A] text-white font-bold text-sm border border-[#D98E2B] shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                      >
                        <Send className="w-4 h-4 text-[#D98E2B]" aria-hidden="true" />
                        Request Puja Booking
                      </button>

                      <p className="text-[11px] text-center text-gray-500 pt-0.5">
                        🔒 Your details are used only to respond to your puja enquiry and are
                        kept strictly confidential.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================ LOCATION ============================ */}
        <section id="location" className="py-12 sm:py-16 bg-white border-b border-[#D98E2B]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <SectionHeading
              eyebrow="Location — Trimbakeshwar, Nashik"
              title="How to Reach Us"
              sub="Kaal Sarp Puja in Trimbakeshwar, Nashik, Maharashtra — the ancient Jyotirlinga kshetra."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* NAP card */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-[#FBF3E7] border border-[#D98E2B]/40 shadow-md space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#6B0F1A] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#B5121B]" aria-hidden="true" />
                  Puja Location
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <p className="font-bold text-[#6B0F1A]">{GURUJI_NAME}</p>
                  <p>{ADDRESS}</p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#B5121B] shrink-0 pointer-events-none" aria-hidden="true" />
                    <a href={BUSINESS_PHONE_TEL} onClick={handlePhoneClick('location')} className="font-bold hover:text-[#B5121B]">
                      {BUSINESS_PHONE_DISPLAY}
                    </a>
                  </p>
                  <p className="text-emerald-800 font-semibold">⏰ {CONSULT_HOURS}</p>
                </div>
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleCtaClick('location_map')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6B0F1A] hover:bg-[#B5121B] text-white font-bold text-xs border border-[#D98E2B] shadow-md transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#D98E2B]" aria-hidden="true" />
                  Open in Google Maps
                </a>
              </div>

              {/* Travel card */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-[#FBF3E7] border border-[#D98E2B]/40 shadow-md space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#6B0F1A] flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#B5121B]" aria-hidden="true" />
                  Reaching Trimbakeshwar
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <TrainFront className="w-5 h-5 text-[#B5121B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="text-[#6B0F1A]">By train:</strong> Nashik Road Railway
                      Station — 30 km (45 mins). Frequent taxis &amp; buses run directly to
                      Trimbakeshwar.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Plane className="w-5 h-5 text-[#B5121B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="text-[#6B0F1A]">By air:</strong> Ozar Nashik Airport —
                      50 km (~1.2 hrs). Mumbai Airport — 180 km (~3.5–4 hrs via NH160).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-[#B5121B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong className="text-[#6B0F1A]">By road:</strong> Direct highway access
                      from Nashik and major Maharashtra cities.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Map card */}
              <div className="lg:col-span-4 rounded-2xl overflow-hidden border-2 border-[#D98E2B] shadow-lg bg-[#4A0B12] relative flex flex-col">
                <div className="flex-1 min-h-[180px] flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <MapPin className="w-9 h-9 text-[#D98E2B]" aria-hidden="true" />
                  <p className="font-serif font-bold text-sm sm:text-base text-[#FBF3E7]">
                    Trimbakeshwar Kshetra
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#D98E2B]">
                    Nashik District, Maharashtra 422212
                  </p>
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleCtaClick('location_map_card')}
                    className="mt-2 px-4 py-2.5 rounded-lg bg-[#B5121B] border border-[#D98E2B] text-xs font-bold text-white hover:bg-[#6B0F1A] transition-colors"
                  >
                    View on Google Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================ TESTIMONIALS ============================ */}
        <section id="testimonials" className="py-12 sm:py-16 bg-[#FBF3E7] border-b border-[#D98E2B]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
            <SectionHeading
              eyebrow="From Our Devotees"
              title="What Devotees Say"
              sub="Genuine feedback from devotees who performed puja with us at Trimbakeshwar."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TESTIMONIALS.map((test) => (
                <figure
                  key={test.name}
                  className="p-6 rounded-2xl bg-white border border-[#D98E2B]/40 shadow-md flex flex-col gap-4 hover:border-[#D98E2B] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-amber-500" aria-label={`${test.puja} — 5 star review`}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[#D98E2B]/60" aria-hidden="true" />
                  </div>
                  <blockquote className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                    “{test.comment}”
                  </blockquote>
                  <figcaption className="pt-3 border-t border-gray-100 text-xs">
                    <p className="font-serif font-bold text-[#6B0F1A]">{test.name}</p>
                    <p className="text-[11px] text-gray-500">
                      {test.location} •{' '}
                      <span className="text-[#B5121B] font-semibold">{test.puja}</span> • {test.date}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ FAQ ============================ */}
        <section id="faq" className="py-12 sm:py-16 bg-white border-b border-[#D98E2B]/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <SectionHeading
              eyebrow="Common Questions"
              title="Frequently Asked Questions"
              sub="Answers to the questions devotees ask us most before booking."
            />

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => (
                <details
                  key={item.q}
                  className="group rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 shadow-sm open:border-[#D98E2B] open:shadow-md transition-colors"
                >
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-xs sm:text-sm font-bold text-[#6B0F1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B0F1A] focus-visible:ring-offset-2 rounded-xl">
                    <span>{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-6 h-6 rounded-full bg-[#6B0F1A] text-[#D98E2B] flex items-center justify-center font-bold text-sm transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>

            <p className="text-center text-xs text-gray-600">
              Still have a question? Call{' '}
              <a
                href={BUSINESS_PHONE_TEL}
                onClick={handlePhoneClick('faq')}
                className="font-bold text-[#B5121B]"
              >
                {BUSINESS_PHONE_DISPLAY}
              </a>{' '}
              or{' '}
              <a
                href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick('faq')}
                className="font-bold text-emerald-700"
              >
                WhatsApp us
              </a>
              .
            </p>
          </div>
        </section>

        {/* ============================ FINAL CTA ============================ */}
        <section className="py-14 sm:py-20 relative overflow-hidden bg-[#6B0F1A]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 15% 30%, #D98E2B 0%, transparent 40%), radial-gradient(circle at 90% 70%, #D98E2B 0%, transparent 35%)',
            }}
          />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#D98E2B]">
              Ready When You Are
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FBF3E7] leading-tight">
              Planning Kaal Sarp Puja at Trimbakeshwar?
            </h2>
            <p className="text-sm sm:text-base text-[#F5E9D8]/85 leading-relaxed max-w-xl mx-auto">
              Speak with us about available dates, puja details and booking.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  handleCtaClick('final_book')();
                  scrollToBooking();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#B5121B] hover:bg-[#8F0E15] text-white font-bold text-sm border border-[#D98E2B] shadow-xl transition-all hover:-translate-y-0.5"
              >
                Book Kaal Sarp Puja
                <ChevronRight className="w-4 h-4 text-[#D98E2B]" aria-hidden="true" />
              </button>
              <a
                href={BUSINESS_PHONE_TEL}
                onClick={handlePhoneClick('final')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#4A0B12] hover:bg-[#2D060B] text-white font-bold text-sm border border-[#D98E2B]/60 shadow-xl transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-[#D98E2B] pointer-events-none" aria-hidden="true" />
                <span className="pointer-events-none">Call Now</span>
              </a>
              <a
                href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick('final')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-xl transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
            <p className="text-[11px] text-[#F5E9D8]/70">
              {GURUJI_NAME} • {BUSINESS_PHONE_DISPLAY} • {CONSULT_HOURS}
            </p>
          </div>
        </section>
      </main>

      {/* ============================ LANDING FOOTER ============================ */}
      <footer className="bg-[#4A0B12] text-[#F5E9D8] border-t-2 border-[#D98E2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B5121B] border-2 border-[#D98E2B] flex items-center justify-center text-[#D98E2B] font-serif font-bold text-xl">
                ॐ
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-[#FBF3E7]">
                  {BRAND_NAME} <span className="text-[10px] text-[#D98E2B] font-sans uppercase tracking-wider">{BRAND_TAGLINE}</span>
                </h3>
              </div>
            </div>
            <p className="text-[#F5E9D8]/80 leading-relaxed">
              Authentic Vedic puja services at Trimbakeshwar Jyotirlinga — Kaal Sarp Puja,
              Narayan Nagbali, Tripindi Shraddha and all Vedic anushthans.
            </p>
            <p className="text-[#F5E9D8]/60 italic text-[11px] leading-relaxed">
              Puja is a matter of faith. Rituals are performed with complete Vedic procedure;
              we make no claims of guaranteed outcomes.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D98E2B] uppercase tracking-wider border-b border-[#D98E2B]/30 pb-2">
              Contact
            </h4>
            <ul className="space-y-2 text-[#F5E9D8]/85">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D98E2B] shrink-0 mt-0.5" aria-hidden="true" />
                {ADDRESS}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D98E2B] shrink-0 pointer-events-none" aria-hidden="true" />
                <a href={BUSINESS_PHONE_TEL} onClick={handlePhoneClick('footer')} className="font-bold hover:text-[#D98E2B]">
                  {BUSINESS_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2 text-emerald-300">
                <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
                WhatsApp: +91 91096 95176
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D98E2B] shrink-0" aria-hidden="true" />
                {CONSULT_HOURS}
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D98E2B] uppercase tracking-wider border-b border-[#D98E2B]/30 pb-2">
              Explore the Full Website
            </h4>
            <ul className="space-y-2 text-[#F5E9D8]/85">
              {(
                [
                  ['home', 'Home'],
                  ['services', 'All Puja Services'],
                  ['about', 'About Us & Lineage'],
                  ['blog', 'Blog & Muhurat Guides'],
                  ['contact', 'Contact'],
                ] as const
              ).map(([section, label]) => (
                <li key={section}>
                  <button
                    onClick={() => onExitLanding(section)}
                    className="hover:text-[#D98E2B] flex items-center gap-1 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-[#D98E2B]" aria-hidden="true" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#6B0F1A] py-4 px-4 text-center text-[11px] text-[#F5E9D8]/70 border-t border-[#D98E2B]/30">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME} — Trimbakeshwar Puja Services. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* ============================ STICKY MOBILE CTA BAR ============================ */}
      <nav
        aria-label="Quick contact actions"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#6B0F1A] border-t-2 border-[#D98E2B] shadow-2xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid grid-cols-3 gap-2 px-3 py-2.5 max-w-lg mx-auto">
          <a
            href={BUSINESS_PHONE_TEL}
            onClick={handlePhoneClick('sticky_call')}
            aria-label={`Call ${BUSINESS_PHONE_DISPLAY}`}
            className="flex items-center justify-center gap-1.5 py-3 rounded-lg bg-[#B5121B] text-white font-bold text-[11px] tracking-wide shadow-lg active:scale-95 transition-transform border border-[#D98E2B]/50"
          >
            <Phone className="w-4 h-4 text-[#D98E2B] pointer-events-none" aria-hidden="true" />
            <span className="pointer-events-none">CALL</span>
          </a>
          <a
            href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick('sticky_whatsapp')}
            className="flex items-center justify-center gap-1.5 py-3 rounded-lg bg-emerald-700 text-white font-bold text-[11px] tracking-wide shadow-lg active:scale-95 transition-transform border border-emerald-500/40"
          >
            <MessageSquare className="w-4 h-4 text-emerald-200" aria-hidden="true" />
            WHATSAPP
          </a>
          <button
            onClick={() => {
              handleCtaClick('sticky_book')();
              scrollToBooking();
            }}
            className="flex items-center justify-center gap-1.5 py-3 rounded-lg bg-[#F3E6D3] text-[#6B0F1A] font-bold text-[11px] tracking-wide shadow-lg active:scale-95 transition-transform border border-[#D98E2B]"
          >
            <Users className="w-4 h-4 text-[#B5121B]" aria-hidden="true" />
            BOOK PUJA
          </button>
        </div>
      </nav>
    </div>
  );
};
