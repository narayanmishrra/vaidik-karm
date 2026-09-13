import React from 'react';
import {
  Eye,
  MapPin,
  Flame,
  CalendarCheck,
  Users,
  CheckCircle2,
  Clock,
  CalendarDays,
  BellRing,
  ArrowRight,
} from 'lucide-react';
import { Language, HomeVariant } from '../types';

interface PujaInfoSectionProps {
  /** Matches the dedicated homepage — Kaalsarp info only on the Kaalsarp
      home, Narayan Nagbali info only on the Nagbali home. This is the
      page-unique content that keeps the two homepages distinct for search
      engines. */
  heroVariant: HomeVariant;
  lang: Language;
  onViewPujaDetails: () => void;
}

/* ------------------------------------------------------------------ */
/* All facts below are taken from the site's own puja data (vidhi,     */
/* samagri, dates) — nothing is fabricated.                            */
/* ------------------------------------------------------------------ */
interface Bi {
  en: string;
  hi: string;
}

interface InfoCard {
  icon: React.ComponentType<{ className?: string }>;
  title: Bi;
  desc: Bi;
}

interface ScheduleRow {
  icon: React.ComponentType<{ className?: string }>;
  label: Bi;
  value: Bi;
}

interface PujaInfo {
  sectionId: string;
  heading: Bi;
  intro: Bi;
  cards: InfoCard[];
  benefitsTitle: Bi;
  benefits: { en: string[]; hi: string[] };
  scheduleTitle: Bi;
  schedule: ScheduleRow[];
  scheduleNote: Bi;
  detailsLink: Bi;
}

const PUJA_INFO: Record<HomeVariant, PujaInfo> = {
  kaalsarp: {
    sectionId: 'kaalsarp-vivar',
    heading: {
      hi: 'कालसर्प दोष शांति पूजा — विधि एवं लाभ',
      en: 'Kaalsarp Dosh Shanti Puja — The Ritual & Its Benefits',
    },
    intro: {
      en: 'Kaalsarp Dosh occurs when all seven planets of the birth chart sit between Rahu (serpent head) and Ketu (serpent tail). Life under this alignment often feels stuck — repeated delays in career, marriage and business, unexplained anxiety and recurring dreams of snakes. The Kaalsarp Dosh Shanti Puja at Trimbakeshwar Jyotirlinga is performed to break this planetary bondage and invoke the grace of Lord Shiva, the supreme controller of Rahu-Ketu.',
      hi: 'कालसर्प दोष तब बनता है जब जन्म कुंडली के सातों ग्रह राहु (सर्प का मुख) और केतु (सर्प की पूंछ) के बीच स्थित हो जाते हैं। इस स्थिति में जीवन अक्सर थमा हुआ लगता है — करियर, विवाह और व्यवसाय में बार-बार देरी, अकारण चिंता तथा सांपों के बुरे स्वप्न। त्र्यंबकेश्वर ज्योतिर्लिंग पर कालसर्प दोष शांति पूजा इस ग्रह-बंधन से मुक्ति और राहु-केतु के अधिपति भगवान शिव की दिव्य कृपा पाने के लिए संपन्न की जाती है।',
    },
    cards: [
      {
        icon: Eye,
        title: { hi: 'कालसर्प दोष क्या है?', en: 'What Is Kaalsarp Dosh?' },
        desc: {
          en: 'When Rahu and Ketu trap the planets of the birth chart, the soul is said to remain stuck in a cycle of suffering. Common signs include repeated setbacks in new endeavours, financial ups and downs, and mental unrest with no visible cause.',
          hi: 'जब राहु और केतु कुंडली के ग्रहों को अपने बीच में बंधन में ले लेते हैं, तो आत्मा के कष्ट-चक्र में बंधी रहना माना जाता है। प्रमुख लक्षण — नई कार्यों में बार-बार असफलता, आर्थिक उतार-चढ़ाव और स्पष्ट कारण के बिना मानसिक अशांति।',
        },
      },
      {
        icon: MapPin,
        title: { hi: 'त्र्यंबकेश्वर पर क्यों?', en: 'Why Trimbakeshwar?' },
        desc: {
          en: 'Trimbakeshwar is the only Jyotirlinga where Brahma, Vishnu and Mahesh reside in a single Linga. Lord Shiva — the master of Rahu and Ketu — dwells here, and the ritual performed with the sacred waters of Kushavarta Kund is considered the most potent for this dosha.',
          hi: 'त्र्यंबकेश्वर एकमात्र ज्योतिर्लिंग है जहाँ ब्रह्मा, विष्णु और महेश एक ही लिंग में विराजमान हैं। राहु-केतु के अधिपति भगवान शिव यहीं निवास करते हैं, और कुशावर्त कुंड के पवित्र जल से संपन्न यह पूजा इस दोष के लिए सर्वाधिक प्रभावशाली मानी जाती है।',
        },
      },
      {
        icon: Flame,
        title: { hi: 'विधि कैसे संपन्न होती है?', en: 'How the Ritual Is Performed' },
        desc: {
          en: 'Completed in one day: sankalp with full family names and gotra, Ganesh Pujan, Rahu-Ketu Japa, abhishek of the silver Nag-Nagin (Rahu-Ketu pratima) with Panchamrut and Godavari water, Vedic havan, and Visarjan of the Nag-Nagin.',
          hi: 'एक दिन में संपन्न: पूरे परिवार के नाम एवं गोत्र सहित संकल्प, गणेश पूजन, राहु-केतु जप, पंचामृत व गोदावरी जल से चांदी की नाग-नागिन (राहु-केतु प्रतिमा) का अभिषेक, वैदिक हवन तथा नाग-नागिन का विसर्जन।',
        },
      },
    ],
    benefitsTitle: {
      hi: 'पूजा के लाभ',
      en: 'What This Puja Removes & Restores',
    },
    benefits: {
      en: [
        'Removes unseen obstacles in personal and professional growth',
        'Restores peace of mind, family harmony and mental stability',
        'Neutralizes the malefic effects of Rahu-Ketu Dasha / Antardasha',
        'Brings financial stability and clears obstacles in progeny and family planning',
      ],
      hi: [
        'व्यक्तिगत एवं व्यावसायिक विकास में अदृश्य बाधाओं का निवारण',
        'मानसिक शांति, पारिवारिक सौहार्द और स्थिरता का पुनर्स्थापन',
        'राहु-केतु दशा / अंतर्दशा के अशुभ प्रभावों का निष्क्रियकरण',
        'आर्थिक स्थिरता और संतान-प्राप्ति एवं परिवार नियोजन में बाधाओं का निवारण',
      ],
    },
    scheduleTitle: {
      hi: 'कालसर्प पूजा — मुहूर्त एवं अवधि',
      en: 'Kaalsarp Puja — Muhurat & Duration',
    },
    schedule: [
      {
        icon: Clock,
        label: { hi: 'अवधि', en: 'Duration' },
        value: {
          en: '1 day — the main vidhi takes approximately 3 to 4 hours',
          hi: '1 दिन — मुख्य विधि में लगभग 3 से 4 घंटे लगते हैं',
        },
      },
      {
        icon: CalendarDays,
        label: { hi: 'शुभ तिथियाँ', en: 'Auspicious Days' },
        value: {
          en: 'Amavasya, Nag Panchami, Tuesday, Sunday, or Rahu Kaal Muhurat',
          hi: 'अमावस्या, नाग पंचमी, मंगलवार, रविवार अथवा राहु काल मुहूर्त',
        },
      },
      {
        icon: BellRing,
        label: { hi: 'बुकिंग से पहले', en: 'Before Booking' },
        value: {
          en: 'Share your birth details with Pandit Ji for a personalised Muhurat',
          hi: 'व्यक्तिगत मुहूर्त के लिए जन्म-विवरण पंडित जी से साझा करें',
        },
      },
    ],
    scheduleNote: {
      en: 'Nag Panchami (17 August 2026) is considered the most powerful day of the year for Kaalsarp Shanti — plan your visit accordingly.',
      hi: 'नाग पंचमी (17 अगस्त 2026) को कालसर्प शांति के लिए वर्ष का सर्वाधिक शक्तिशाली दिन माना जाता है — अपनी यात्रा की योजना तदनुसार बनाएं।',
    },
    detailsLink: {
      hi: 'कालसर्प पूजा की पूर्ण विधि, सामग्री व 2026 मुहूर्त कैलेंडर देखें',
      en: 'See the full Kaalsarp Puja vidhi, samagri & 2026 muhurat calendar',
    },
  },

  nagbali: {
    sectionId: 'narayan-nagbali-vivar',
    heading: {
      hi: 'नारायण नागबली पूजा — विधि एवं लाभ',
      en: 'Narayan Nagbali Puja — The Ritual & Its Benefits',
    },
    intro: {
      en: 'Narayan Nagbali is a specialised 3-day Vedic vidhi of Trimbakeshwar that combines two rituals. Narayan Bali grants moksha to ancestors who died prematurely (Apmrityu) or whose last rites were never completed, while Nagbali is the prashchitta (atonement) for accidentally harming snakes. Performed together, they remove Pitru Dosh and Naga Dosh at the same time — releasing deep karmic blocks that quietly affect an entire family across generations.',
      hi: 'नारायण नागबली त्र्यंबकेश्वर की विशेष 3-दिवसीय वैदिक विधि है, जिसमें दो अनुष्ठानों का संयोजन होता है। नारायण बलि उन पूर्वजों की मोक्ष के लिए होती है जिनकी अकाल मृत्यु (अपमृत्यु) हुई हो या जिनका अंतिम संस्कार पूर्ण न हो पाया हो, जबकि नागबली सांपों की अनजाने में हानि का प्रायश्चित है। दोनों के साथ संपन्न होने पर पितृ दोष और नाग दोष एक साथ निवारण होते हैं — गहरे कर्म-बंधन टूटते हैं जो पीढ़ी-दर-पीढ़ी पूरे परिवार को प्रभावित करते हैं।',
    },
    cards: [
      {
        icon: CalendarCheck,
        title: { hi: '3 दिनों की विधि', en: 'The 3-Day Vidhi' },
        desc: {
          en: 'Day 1: Sankalp, Narayan Pratima Sthapana and Shradh Vidhi. Day 2: Nagbali Vidhi — wheat effigy rites, Snake Prashchitta and Havan. Day 3: Ganesh Pujan, Nag Pujan at Ahilya Sangam, Brahmin Bhojan and Daan.',
          hi: 'दिन 1: संकल्प, नारायण प्रतिमा स्थापना एवं श्राद्ध विधि। दिन 2: नागबली विधि — गेहूं की प्रतिमा की क्रिया, सर्प प्रायश्चित एवं हवन। दिन 3: गणेश पूजन, अहिल्या संगम पर नाग पूजन, ब्राह्मण भोजन एवं दान।',
        },
      },
      {
        icon: Users,
        title: { hi: 'कौन करवाएं?', en: 'Who Should Perform It?' },
        desc: {
          en: 'For families facing Pitru Dosh in the horoscope, couples struggling with unexplained childlessness or recurrent pregnancy loss, families with a history of premature or unnatural deaths, and persons facing unexplained financial losses or family disputes.',
          hi: 'जिन परिवारों की कुंडली में पितृ दोष हो, अकारण निःसंतानता या बार-बार गर्भपात से पीड़ित दंपति, जिनके परिवार में अकाल या अप्राकृतिक मृत्यु का इतिहास हो, तथा अकारण आर्थिक हानि या पारिवारिक विवाद झेल रहे व्यक्ति।',
        },
      },
      {
        icon: MapPin,
        title: { hi: 'त्र्यंबकेश्वर की विशेष विधि', en: 'Unique to Trimbakeshwar Kshetra' },
        desc: {
          en: 'The sankalp and tarpan use the sacred waters of Kushavarta Kund — the origin of the Godavari — and the vidhi concludes with the sacred Nag Pujan at Ahilya Sangam, making this ritual unique to the Trimbakeshwar Kshetra.',
          hi: 'संकल्प व तर्पण के लिए कुशावर्त कुंड का पवित्र जल — गोदावरी का उद्गम स्थल — प्रयोग होता है, और विधि अहिल्या संगम पर पवित्र नाग पूजन के साथ समाप्त होती है। इस विधि की यह विशेषता केवल त्र्यंबकेश्वर क्षेत्र की है।',
        },
      },
    ],
    benefitsTitle: {
      hi: 'पूजा के लाभ',
      en: 'What This Puja Releases & Restores',
    },
    benefits: {
      en: [
        'Grants liberation (Moksha) to dissatisfied ancestral souls',
        'Removes obstacles in lineage continuation and progeny (Santati Prapti)',
        'Eliminates ancestral curses affecting prosperity and health across generations',
        'Brings the divine blessings of Lord Vishnu and Brahma to the household',
      ],
      hi: [
        'असंतुष्ट पितृ आत्माओं को मोक्ष प्रदान करता है',
        'वंश-वृद्धि एवं संतान-प्राप्ति (सन्तति प्राप्ति) में आने वाली बाधाओं का निवारण',
        'पीढ़ी-दर-पीढ़ी समृद्धि और स्वास्थ्य को प्रभावित करने वाले पितृ-श्राप का समापन',
        'गृह में भगवान विष्णु एवं ब्रह्मा की दिव्य कृपा का आविर्भाव',
      ],
    },
    scheduleTitle: {
      hi: 'नारायण नागबली — मुहूर्त एवं अवधि',
      en: 'Narayan Nagbali — Muhurat & Duration',
    },
    schedule: [
      {
        icon: Clock,
        label: { hi: 'अवधि', en: 'Duration' },
        value: {
          en: '3 consecutive days — approximately 3 to 4 hours daily, morning hours',
          hi: 'लगातार 3 दिन — प्रतिदिन लगभग 3 से 4 घंटे, प्रातःकाल',
        },
      },
      {
        icon: CalendarDays,
        label: { hi: 'शुभ तिथियाँ', en: 'Auspicious Days' },
        value: {
          en: 'Pitrutarpana days, Amavasya, Pitru Paksha, or a specific Tithi suggested by the Purohit',
          hi: 'पितृ तर्पण के दिन, अमावस्या, पितृ पक्ष अथवा पुरोहित द्वारा बताई गई विशेष तिथि',
        },
      },
      {
        icon: BellRing,
        label: { hi: 'योजना', en: 'Planning' },
        value: {
          en: 'Book at least 15 days in advance to confirm your Muhurat and details',
          hi: 'मुहूर्त एवं विवरण की पुष्टि के लिए कम से कम 15 दिन पहले बुकिंग करें',
        },
      },
    ],
    scheduleNote: {
      en: 'Due to Adhik Maas (extra lunar month) in 2026, there are no auspicious muhurats from 16 May to 14 June — plan your visit accordingly.',
      hi: '2026 में अधिक मास (अतिरिक्त चंद्र मास) के कारण 16 मई से 14 जून तक कोई शुभ मुहूर्त नहीं हैं — अपनी यात्रा की योजना तदनुसार बनाएं।',
    },
    detailsLink: {
      hi: 'नारायण नागबली की पूर्ण विधि, सामग्री व 2026 मुहूर्त कैलेंडर देखें',
      en: 'See the full Narayan Nagbali vidhi, samagri & 2026 muhurat calendar',
    },
  },
};

/**
 * Page-unique information block rendered at the top of each dedicated
 * homepage. The Kaalsarp home shows Kaalsarp-specific content and the
 * Narayan Nagbali home shows Narayan Nagbali-specific content — this is
 * what keeps the two URLs distinct for Google's duplicate-content checks.
 */
export const PujaInfoSection: React.FC<PujaInfoSectionProps> = ({
  heroVariant,
  lang,
  onViewPujaDetails,
}) => {
  const hi = lang === 'hi';
  const info = PUJA_INFO[heroVariant];

  return (
    <section id={info.sectionId} className="border-b border-[#D98E2B]/30 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading + intro */}
        <div className="mx-auto max-w-3xl space-y-2 text-center">
          <h2 className="font-hindi text-2xl font-bold text-[#6B0F1A] sm:text-3xl">
            {info.heading.hi}
          </h2>
          <h3 className="font-serif text-base font-semibold text-[#241A16] sm:text-lg">
            {info.heading.en}
          </h3>
          <p className="font-hindi-body mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base">
            {hi ? info.intro.hi : info.intro.en}
          </p>
        </div>

        {/* Three info cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {info.cards.map((card) => (
            <div
              key={card.title.en}
              className="rounded-2xl border-2 border-[#D98E2B]/50 bg-[#FBF3E7] p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B0F1A] text-[#D98E2B]">
                <card.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h4 className="font-hindi mt-3 text-lg font-bold text-[#6B0F1A]">{card.title.hi}</h4>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {card.title.en}
              </p>
              <p className="font-hindi-body mt-2 text-sm leading-relaxed text-gray-700">
                {hi ? card.desc.hi : card.desc.en}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits + Muhurat schedule */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-[#D98E2B]/50 bg-[#FBF3E7] p-5 sm:p-6">
            <h4 className="font-hindi text-lg font-bold text-[#6B0F1A]">
              {info.benefitsTitle.hi}
            </h4>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {info.benefitsTitle.en}
            </p>
            <ul className="mt-3 space-y-2.5">
              {(hi ? info.benefits.hi : info.benefits.en).map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-700" aria-hidden="true" />
                  <span className="font-hindi-body text-sm leading-relaxed text-gray-700">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[#6B0F1A] p-5 text-white sm:p-6">
            <h4 className="font-hindi text-lg font-bold text-[#F5E9D8]">
              {info.scheduleTitle.hi}
            </h4>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#D98E2B]">
              {info.scheduleTitle.en}
            </p>
            <ul className="mt-3 space-y-3">
              {info.schedule.map((row) => (
                <li key={row.label.en} className="flex items-start gap-3">
                  <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#D98E2B]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#D98E2B]/90">
                      {hi ? row.label.hi : row.label.en}
                    </p>
                    <p className="font-hindi-body text-sm leading-relaxed text-[#F5E9D8]">
                      {hi ? row.value.hi : row.value.en}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-[#D98E2B]/30 pt-3 text-xs leading-relaxed text-[#F5E9D8]/80">
              {hi ? info.scheduleNote.hi : info.scheduleNote.en}
            </p>
          </div>
        </div>

        {/* Jump to the full puja details on the services page */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onViewPujaDetails}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D98E2B]/60 bg-white px-5 py-3 text-sm font-bold text-[#6B0F1A] shadow-sm transition-colors hover:bg-[#FBF3E7] sm:text-base"
          >
            {hi ? info.detailsLink.hi : info.detailsLink.en}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
