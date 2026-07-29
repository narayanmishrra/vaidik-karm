import { PriestProfile, CoreValue, NRIGuidanceText } from '../types';

export const PRIEST_PROFILES: PriestProfile[] = [
  {
    id: 'pandit-vinay-shastri',
    name: 'Pandit Vinay Shastri (Guruji)',
    title: {
      en: 'Famous & Authorised Veda-Pathi Purohit',
      hi: 'प्रसिद्ध एवं अधिकृत वेदपाठी पुरोहित'
    },
    experienceYears: 30,
    specialization: {
      en: [
        'Kaalsarp Dosh Shanti',
        'Narayan Nagbali Vidhi',
        'Tripindi Shraddha',
        'Mahamrityunjay Havan',
        'Rudrabhishek',
        'Navgrah Shanti'
      ],
      hi: [
        'कालसर्प दोष शांति',
        'नारायण नागबली विधि',
        'त्रिपिंडी श्राद्ध',
        'महामृत्युंजय हवन',
        'रुद्राभिषेक',
        'नवग्रह शांति'
      ]
    },
    bio: {
      en: `Pandit Vinay Shastri lives in Trimbakeshwar and has been performing puja there for over 30 years.

He has performed 32,000+ Kaal Sarp Dosh Pujas so far and earned the title of Expert Guruji in Kaal Sarp Dosh Nivaran in Trimbakeshwar and the Best Pandit for Kaal Sarp Dosh Puja in Trimbakeshwar.

Pandit Vinay Shastri does Kaal Sarp dosh Pooja, Mahamrityunjay Jaap, Narayan Nagbali, Pitru puja, Trimbakeshwar Rudrabhishekh, Navagrah Shanti, Arak Vivah, Kumbh Vivah, Tripindi, etc., all types of puja in scriptural method in Trimbakeshwar, which is why the problems of their Yajaman's and troubles are also resolved quickly.`,
      hi: `पंडित विनय शास्त्री त्र्यंबकेश्वर में निवास करते हैं और 30 से अधिक वर्षों से यहाँ पूजा-विधान संपन्न करा रहे हैं।

अब तक उन्होंने 32,000 से अधिक कालसर्प दोष पूजाएं संपन्न कराई हैं और त्र्यंबकेश्वर में "कालसर्प दोष निवारण विशेषज्ञ गुरुजी" तथा "कालसर्प दोष पूजा के सर्वश्रेष्ठ पंडित" की उपाधि अर्जित की है।

पंडित विनय शास्त्री त्र्यंबकेश्वर में कालसर्प दोष पूजा, महामृत्युंजय जप, नारायण नागबली, पितृ पूजा, त्र्यंबकेश्वर रुद्राभिषेक, नवग्रह शांति, अर्क विवाह, कुंभ विवाह, त्रिपिंडी आदि सभी प्रकार की पूजाएं शास्त्रोक्त विधि से संपन्न कराते हैं, जिससे उनके यजमानों की समस्याएं एवं कष्ट शीघ्र दूर होते हैं।`
    },
    image: '/images/vinay shastri.jpg'
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    title: {
      en: 'Strict Vedic Authenticity (Shuddhata)',
      hi: 'कठोर वैदिक प्रामाणिकता (शुद्धता)'
    },
    desc: {
      en: 'Every mantra, samagri, and ritual step adheres 100% to ancient Shastras without shortcuts or dilution.',
      hi: 'प्रत्येक मंत्र, सामग्री एवं अनुष्ठान का चरण बिना किसी संक्षिप्तीकरण के 100% प्राचीन शास्त्रों के अनुसार होता है।'
    }
  },
  {
    title: {
      en: 'Complete Transparency & Guidance',
      hi: 'पूर्ण पारदर्शिता एवं मार्गदर्शन'
    },
    desc: {
      en: 'Prior consultation over phone/WhatsApp explaining exact mahurat, samagri provided, and clothing requirements.',
      hi: 'फोन/व्हाट्सएप पर पूर्व परामर्श जिसमें सटीक महूर्त, प्रदत्त सामग्री एवं वस्त्र आवश्यकताओं की जानकारी दी जाती है।'
    }
  },
  {
    title: {
      en: 'Generational Trimbakeshwar Lineage',
      hi: 'पीढ़ियों की त्र्यंबकेश्वर परंपरा'
    },
    desc: {
      en: 'Our family priests hold traditional Vedic authority at Trimbakeshwar Jyotirlinga for generations.',
      hi: 'हमारे परिवार के पुरोहित पीढ़ियों से त्र्यंबकेश्वर ज्योतिर्लिंग पर पारंपरिक वैदिक अधिकार रखते हैं।'
    }
  },
  {
    title: {
      en: 'Dedicated NRI Family Assistance',
      hi: 'NRI परिवारों के लिए समर्पित सहायता'
    },
    desc: {
      en: 'Tailored scheduling, local accommodation coordination, multi-lingual guidance (Hindi, English, Marathi, Gujarati), and post-puja prasad dispatch.',
      hi: 'अनुकूलित कार्यक्रम, स्थानीय आवास समन्वय, बहुभाषी मार्गदर्शन (हिंदी, अंग्रेजी, मराठी, गुजराती) और पूजा के बाद प्रसाद भेजने की व्यवस्था।'
    }
  }
];

export const NRI_GUIDANCE_TEXT: NRIGuidanceText = {
  heading: {
    en: 'Specialized Guidance for NRI Devotees & International Pilgrims',
    hi: 'NRI भक्तों एवं अंतर्राष्ट्रीय तीर्थयात्रियों के लिए विशेष मार्गदर्शन'
  },
  paragraph: {
    en: 'We understand that traveling from abroad (USA, UK, Canada, UAE, Singapore, Australia) for a sacred ritual requires careful planning. Trimbakeshwar Guruji provides end-to-end assistance — from selecting the most auspicious Mahurat according to your travel dates, arranging peaceful lodging near the temple, providing all authentic ritual materials, to guiding you smoothly through every step of the ceremony.',
    hi: 'हम समझते हैं कि विदेश (USA, UK, Canada, UAE, Singapore, Australia) से किसी पवित्र अनुष्ठान के लिए यात्रा करने में सावधानीपूर्वक योजना की आवश्यकता होती है। त्र्यंबकेश्वर गुरुजी आपकी यात्रा तिथियों के अनुसार सबसे शुभ महूर्त के चयन से लेकर मंदिर के पास शांतिपूर्ण आवास की व्यवस्था, सभी प्रामाणिक अनुष्ठान सामग्री उपलब्ध कराने तक एवं समारोह के प्रत्येक चरण में सहज मार्गदर्शन करने तक संपूर्ण सहायता प्रदान करते हैं।'
  },
  perks: {
    en: [
      'Pre-flight consultation on phone/WhatsApp (IST & US/UK time zone support)',
      'Complete Puja Samagri & traditional dhoti/saree coordination provided',
      'Translational guidance in simple English and Hindi during the Vidhi',
      'Sanctified Prashadam and Rudraksha mala provided for taking back abroad',
      'Digital video updates and Sankalp for family members unable to travel'
    ],
    hi: [
      'उड़ान से पूर्व फोन/व्हाट्सएप पर परामर्श (IST एवं US/UK समय क्षेत्र समर्थन)',
      'संपूर्ण पूजा सामग्री एवं परंपरागत धोती/साड़ी की व्यवस्था उपलब्ध',
      'विधि के दौरान सरल अंग्रेजी एवं हिंदी में अनुवाद मार्गदर्शन',
      'विदेश ले जाने के लिए पवित्र प्रसाद एवं रुद्राक्ष माला उपलब्ध',
      'यात्रा में असमर्थ परिवार के सदस्यों के लिए डिजिटल वीडियो अपडेट एवं संकल्प'
    ]
  }
};
