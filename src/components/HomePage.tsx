import React from 'react';
import {
  Phone,
  MapPin,
  Award,
  BookOpenCheck,
  Flame,
  ChevronDown,
  Mountain,
  Droplets,
} from 'lucide-react';
import { HeroSection } from './HeroSection';
import { SectionId, Language, HomeVariant } from '../types';
import { HOME_VARIANTS } from '../lib/routes';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  trackEvent,
  whatsappUrl,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
} from '../lib/analytics';

interface HomePageProps {
  onSelectSection: (id: SectionId) => void;
  onOpenWhatsAppForPuja: (pujaName: string) => void;
  onOpenWhatsAppWithCustomText: (text: string) => void;
  onSelectPuja: (pujaId: string) => void;
  lang: Language;
  /**
   * 'kaalsarp' → main homepage at '/'
   * 'nagbali'  → homepage at '/narayan-nagbali-puja-trimbakeshwar'
   * Only the hero title and the route's SEO metadata change; the page itself
   * (CTA, both puja service blocks, kshetra, FAQ, final CTA) is identical.
   */
  variant?: HomeVariant;
}

/* ------------------------------------------------------------------ */
/* Compact trust points — concise, no unverifiable claims.             */
/* ------------------------------------------------------------------ */
const TRUST_ITEMS = [
  {
    icon: MapPin,
    en: 'Puja performed at Trimbakeshwar',
    hi: 'पूजा त्र्यंबकेश्वर में संपन्न',
  },
  {
    icon: Award,
    en: 'Experienced Vedic pandit',
    hi: 'अनुभवी वैदिक पंडित',
  },
  {
    icon: BookOpenCheck,
    en: 'Guidance on puja rituals & dates',
    hi: 'पूजा विधि एवं तिथि का मार्गदर्शन',
  },
  {
    icon: Flame,
    en: 'Assistance with puja arrangements',
    hi: 'पूजा व्यवस्था में सहायता',
  },
  {
    icon: Phone,
    en: 'Direct phone consultation',
    hi: 'सीधी फोन बातचीत',
  },
];

const FAQ_ITEMS = [
  {
    qEn: 'How do I book Kaalsarp Puja at Trimbakeshwar?',
    qHi: 'त्र्यंबकेश्वर में कालसर्प पूजा की बुकिंग कैसे करें?',
    aEn: 'Call or WhatsApp the pandit ji directly. Share your name, birth details, gotra and preferred dates — an auspicious date is suggested as per the panchang and confirmed with you before booking.',
    aHi: 'पंडित जी को सीधे कॉल या व्हाट्सएप करें। अपना नाम, जन्म विवरण, गोत्र और पसंदीदा तिथि बताएं — पंचांग के अनुसार शुभ तिथि सुझाई जाती है और बुकिंग से पहले आपसे पुष्टि की जाती है।',
  },
  {
    qEn: 'How long does Kaalsarp Puja take?',
    qHi: 'कालसर्प पूजा में कितना समय लगता है?',
    aEn: 'The puja is completed in one day — the main vidhi takes approximately 3 to 4 hours. You receive the full schedule in advance.',
    aHi: 'पूजा एक दिन में संपन्न होती है — मुख्य विधि में लगभग 3 से 4 घंटे लगते हैं। पूरा समय-क्रम पहले से बता दिया जाता है।',
  },
  {
    qEn: 'How is Narayan Nagbali Puja performed?',
    qHi: 'नारायण नागबली पूजा कैसे संपन्न होती है?',
    aEn: 'Narayan Nagbali is a traditional ritual performed at Trimbakeshwar as per shastra vidhi, usually over three days. The pandit ji explains the process, dates, samagri and requirements clearly on call before you plan your visit.',
    aHi: 'नारायण नागबली त्र्यंबकेश्वर में शास्त्र विधि से संपन्न होने वाली पारंपरिक पूजा है, सामान्यतः तीन दिनों में। आपकी यात्रा की योजना से पहले पंडित जी फोन पर प्रक्रिया, तिथि और सामग्री की स्पष्ट जानकारी देते हैं।',
  },
  {
    qEn: 'Which days are preferred for these pujas?',
    qHi: 'कौन-सी तिथियाँ शुभ मानी जाती हैं?',
    aEn: 'Amavasya, Nag Panchami, Tuesday and Sunday are traditionally preferred. The final date is suggested based on the panchang and your birth details.',
    aHi: 'अमावस्या, नाग पंचमी, मंगलवार और रविवार परंपरागत रूप से शुभ माने जाते हैं। अंतिम तिथि पंचांग और आपके जन्म विवरण के आधार पर सुझाई जाती है।',
  },
  {
    qEn: 'Can NRI devotees book without travelling?',
    qHi: 'क्या NRI भक्त बिना यात्रा किए बुकिंग कर सकते हैं?',
    aEn: 'In-person presence is most ideal. For devotees who cannot travel, a Sankalp-based puja performed by the purohit on your behalf can be arranged with complete transparency.',
    aHi: 'स्वयं उपस्थित रहना सबसे उत्तम है। जो भक्त यात्रा नहीं कर सकते, उनके लिए पंडित जी द्वारा आपकी ओर से संकल्प-आधारित पूजा पूर्ण पारदर्शिता के साथ आयोजित की जा सकती है।',
  },
  {
    qEn: 'What is the cost of the puja?',
    qHi: 'पूजा का शुल्क क्या है?',
    aEn: 'The cost depends on the puja date, samagri requirements and the number of devotees. Call for the current details — complete information is shared before you confirm.',
    aHi: 'शुल्क पूजा तिथि, सामग्री और भक्तों की संख्या पर निर्भर करता है। वर्तमान जानकारी के लिए कॉल करें — पुष्टि से पहले पूरी जानकारी साझा की जाती है।',
  },
];

/** Shared green call CTA used across the page (one design language). */
const CallCta: React.FC<{
  id?: string;
  event: string;
  labelEn: string;
  large?: boolean;
}> = ({ id, event, labelEn, large = false }) => (
  <a
    href={BUSINESS_PHONE_TEL}
    id={id}
    onClick={() => trackEvent(event, { cta_location: event })}
    className={`inline-flex items-center justify-center gap-2.5 rounded-xl bg-green-600 font-bold text-white shadow-lg shadow-green-900/20 transition-colors hover:bg-green-700 ${
      large ? 'px-8 py-4 text-lg' : 'w-full px-5 py-3.5 text-sm sm:w-auto sm:text-base'
    }`}
  >
    <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
    <span>
      {labelEn} — {BUSINESS_PHONE_DISPLAY}
    </span>
  </a>
);

export const HomePage: React.FC<HomePageProps> = ({ lang, variant = 'kaalsarp' }) => {
  const hi = lang === 'hi';

  /* Route-level SEO metadata (title / description / canonical / OG / JSON-LD).
     The two homepage URLs serve the same page, so each one carries its own
     canonical + title while the visible content stays identical. */
  usePageMeta(HOME_VARIANTS[variant].meta);

  return (
    <div>
      {/* ============ HERO: real gallery + bilingual headline + call ============ */}
      {/* Only the hero title is variant-specific — everything below is shared. */}
      <HeroSection lang={lang} variant={variant} />

      {/* ===================== TRUST / QUICK BENEFITS ===================== */}
      <section className="border-b border-[#D98E2B]/30 bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.en}
                className="flex items-start gap-2.5 rounded-xl border border-[#D98E2B]/25 bg-[#FBF3E7] p-3"
              >
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-green-700" aria-hidden="true" />
                <div>
                  <p className="font-hindi text-[13px] font-semibold leading-snug text-[#6B0F1A]">
                    {item.hi}
                  </p>
                  <p className="text-[11px] leading-snug text-gray-600">{item.en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SERVICE 1: KAALSARP PUJA ===================== */}
      <section id="kaalsarp-puja" className="border-b border-[#D98E2B]/30 bg-[#FBF3E7] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="overflow-hidden rounded-2xl border-2 border-[#D98E2B]/60 shadow-lg">
              <img
                src="/images/kaal_sarp_puja.webp"
                alt="Real photograph: Kaalsarp Puja samagri — silver Nag-Nagin pairs and flowers arranged for the puja at Trimbakeshwar"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <h2 className="font-hindi text-2xl font-bold text-[#6B0F1A] sm:text-3xl">
                कालसर्प पूजा
              </h2>
              <h3 className="font-serif text-lg font-semibold text-[#241A16] sm:text-xl">
                Kaalsarp Puja at Trimbakeshwar
              </h3>
              <p className="font-hindi-body text-sm leading-relaxed text-gray-700 sm:text-base">
                {hi
                  ? 'कालसर्प दोष शांति पूजा त्र्यंबकेश्वर क्षेत्र में वैदिक विधि से संकल्प, मंत्र जाप, अभिषेक एवं हवन के साथ संपन्न होती है। बुकिंग से पहले पंडित जी तिथि, सामग्री एवं संपूर्ण प्रक्रिया का स्पष्ट मार्गदर्शन करते हैं।'
                  : 'Kaal Sarp Dosh Shanti Puja is performed at the Trimbakeshwar Kshetra as per Vedic vidhi — with sankalp, mantra jaap, abhishek and havan. Before you book, the pandit ji clearly guides you on auspicious dates, samagri and the complete process.'}
              </p>
              <div className="pt-2">
                <CallCta
                  id="kaalsarp-call-btn"
                  event="kaalsarp_call_click"
                  labelEn={hi ? 'कालसर्प पूजा हेतु कॉल करें' : 'Call for Kaalsarp Puja Enquiry'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================== SERVICE 2: NARAYAN NAGBALI PUJA ================== */}
      <section id="narayan-nagbali" className="border-b border-[#D98E2B]/30 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="order-1 lg:order-2 overflow-hidden rounded-2xl border-2 border-[#D98E2B]/60 shadow-lg">
              <img
                src="/images/narayan_nagbali.jpg"
                alt="Real photograph: Pandit performing the Narayan Nagbali ritual offering at Trimbakeshwar"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="order-2 lg:order-1 space-y-3">
              <h2 className="font-hindi text-2xl font-bold text-[#6B0F1A] sm:text-3xl">
                नारायण नागबली पूजा
              </h2>
              <h3 className="font-serif text-lg font-semibold text-[#241A16] sm:text-xl">
                Narayan Nagbali Puja at Trimbakeshwar
              </h3>
              <p className="font-hindi-body text-sm leading-relaxed text-gray-700 sm:text-base">
                {hi
                  ? 'नारायण नागबली त्र्यंबकेश्वर में शास्त्र विधि से संपन्न होने वाली पारंपरिक पूजा है। आपकी यात्रा की योजना बनाने से पहले पंडित जी फोन पर प्रक्रिया, तिथि, सामग्री और आवश्यकताओं की पूरी जानकारी देते हैं।'
                  : 'Narayan Nagbali is a traditional ritual performed at Trimbakeshwar as per shastra vidhi. Before you plan your visit, the pandit ji explains the process, dates, samagri and requirements clearly on call.'}
              </p>
              <div className="pt-2">
                <CallCta
                  id="nagbali-call-btn"
                  event="narayan_nagbali_call_click"
                  labelEn={hi ? 'नारायण नागबली हेतु कॉल करें' : 'Call for Narayan Nagbali Enquiry'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TRIMBAKESHWAR KSHETRA ===================== */}
      <section id="trimbakeshwar" className="border-b border-[#D98E2B]/30 bg-[#F3E6D3] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-2 text-center">
            <h2 className="font-hindi text-2xl font-bold text-[#6B0F1A] sm:text-3xl">
              त्र्यंबकेश्वर ज्योतिर्लिंग, नासिक
            </h2>
            <h3 className="font-serif text-lg font-semibold text-[#241A16]">
              The Sacred Kshetra Where Your Puja Is Performed
            </h3>
            <p className="font-hindi-body text-sm leading-relaxed text-gray-700 sm:text-base">
              {hi
                ? 'त्र्यंबकेश्वर बारह ज्योतिर्लिंगों में से एक है, जहाँ ब्रह्मा, विष्णु और महेश एक ही लिंग में विराजमान हैं। कुशावर्त कुंड से गोदावरी का उद्गम होता है और ब्रह्मगिरि पर्वत इस क्षेत्र की पवित्रता को पूर्ण करता है।'
                : 'Trimbakeshwar is one of the twelve Jyotirlingas, where Brahma, Vishnu and Mahesh reside in a single linga. The Godavari rises at Kushavarta Kund, and the Brahmagiri hills complete the sanctity of the kshetra.'}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <figure className="overflow-hidden rounded-2xl border-2 border-[#D98E2B]/60 bg-white shadow-md">
              <img
                src="/images/Trimbakeshwar_Mandir.webp"
                srcSet="/images/Trimbakeshwar_Mandir-640.webp 640w, /images/Trimbakeshwar_Mandir.webp 960w"
                sizes="(max-width: 640px) 100vw, 33vw"
                alt="Real photograph: Trimbakeshwar Jyotirlinga Temple — black stone shikhara, Nashik"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="px-3 py-2 text-center text-[11px] font-semibold text-[#6B0F1A]">
                {hi ? 'त्र्यंबकेश्वर मंदिर' : 'Trimbakeshwar Temple'}
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border-2 border-[#D98E2B]/60 bg-white shadow-md">
              <img
                src="/images/kushavarth_kund.webp"
                alt="Real photograph: Kushavarta Kund at Trimbakeshwar, origin of the Godavari river"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="flex items-center justify-center gap-1 px-3 py-2 text-center text-[11px] font-semibold text-[#6B0F1A]">
                <Droplets className="h-3 w-3 text-[#B5121B]" aria-hidden="true" />
                {hi ? 'कुशावर्त कुंड' : 'Kushavarta Kund'}
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border-2 border-[#D98E2B]/60 bg-white shadow-md">
              <img
                src="/images/bramahagiri.webp"
                alt="Real photograph: Brahmagiri hills above Trimbakeshwar, Nashik"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="flex items-center justify-center gap-1 px-3 py-2 text-center text-[11px] font-semibold text-[#6B0F1A]">
                <Mountain className="h-3 w-3 text-[#B5121B]" aria-hidden="true" />
                {hi ? 'ब्रह्मगिरि पर्वत' : 'Brahmagiri Hills'}
              </figcaption>
            </figure>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-gray-600 sm:text-sm">
            {hi
              ? 'त्र्यंबकेश्वर, जिला नासिक (महाराष्ट्र) — नासिक शहर से लगभग 28 किमी। पूजा की योजना से पहले पंडित जी से पहुँच एवं ठहराव का मार्गदर्शन प्राप्त करें।'
              : 'Trimbakeshwar, Nashik district (Maharashtra) — about 28 km from Nashik city. The pandit ji can guide you on arrival and stay when you plan your puja.'}
          </p>
        </div>
      </section>

      {/* ===================== FAQ / COMMON QUESTIONS ===================== */}
      <section id="faq" className="border-b border-[#D98E2B]/30 bg-[#FBF3E7] py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="space-y-1.5 text-center">
            <h2 className="font-hindi text-2xl font-bold text-[#6B0F1A] sm:text-3xl">
              सामान्य प्रश्न
            </h2>
            <h3 className="font-serif text-base font-semibold text-[#241A16] sm:text-lg">
              Common Questions
            </h3>
          </div>

          <div className="mt-6 space-y-3">
            {FAQ_ITEMS.map((faq) => (
              <details
                key={faq.qEn}
                className="faq-details group rounded-xl border border-[#D98E2B]/30 bg-white shadow-sm open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5">
                  <span>
                    <span className="font-hindi block text-sm font-semibold text-[#6B0F1A]">
                      {faq.qHi}
                    </span>
                    <span className="block text-xs text-gray-600 sm:text-[13px]">{faq.qEn}</span>
                  </span>
                  <ChevronDown
                    className="faq-chevron h-4 w-4 shrink-0 text-[#B5121B]"
                    aria-hidden="true"
                  />
                </summary>
                <div className="border-t border-[#D98E2B]/20 px-4 py-3.5">
                  <p className="font-hindi-body text-sm leading-relaxed text-gray-700">{hi ? faq.aHi : faq.aEn}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CALL CTA ===================== */}
      <section className="bg-[#6B0F1A] py-10 sm:py-14">
        <div className="mx-auto max-w-3xl space-y-4 px-4 text-center sm:px-6">
          <h2 className="font-hindi text-2xl font-bold text-[#F5E9D8] sm:text-3xl">
            पंडित जी से सीधी बात करें
          </h2>
          <p className="font-serif text-base font-semibold text-[#EFC268] sm:text-lg">
            Speak Directly to the Pandit — {BUSINESS_PHONE_DISPLAY}
          </p>
          <p className="font-hindi-body mx-auto max-w-xl text-sm leading-relaxed text-[#F5E9D8]/85">
            {hi
              ? 'तिथि, विधि, सामग्री और बुकिंग की संपूर्ण जानकारी एक ही फोन कॉल पर। प्रातः 6 – रात्रि 9:30 IST।'
              : 'Dates, vidhi, samagri and booking details on a single phone call. 6 AM – 9:30 PM IST daily.'}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <CallCta
              id="final-call-btn"
              event="final_call_click"
              labelEn={hi ? 'अभी कॉल करें' : 'Call Now'}
              large
            />
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { cta_location: 'final_section' })}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/60 bg-[#25D366]/10 px-6 py-3.5 text-sm font-bold text-[#7BE495] transition-colors hover:bg-[#25D366]/20"
            >
              {hi ? 'व्हाट्सएप करें' : 'WhatsApp'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
