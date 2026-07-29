import { Testimonial } from '../types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rajesh & Sunita Kulkarni',
    location: {
      en: 'London, United Kingdom',
      hi: 'लंदन, यूनाइटेड किंगडम'
    },
    isNRI: true,
    pujaPerformed: {
      en: 'Narayan Nagbali Puja',
      hi: 'नारायण नागबली पूजा'
    },
    date: 'June 2026',
    rating: 5,
    comment: {
      en: 'Coming all the way from London, we were initially nervous about managing a 3-day Puja in India. Pt. Vinay Shastri(Guruji) guided us at every step. From hotel booking support near the temple to organizing immaculate Samagri, everything was handled with complete purity and warmth. Highly recommended for NRI families!',
      hi: 'लंदन से आते हुए हमें शुरुआत में भारत में 3 दिवसीय पूजा की व्यवस्था को लेकर चिंता थी। पं. विनय शास्त्री (गुरुजी) ने हर कदम पर हमारा मार्गदर्शन किया। मंदिर के पास होटल बुकिंग सहायता से लेकर अचूक सामग्री की व्यवस्था तक, सब कुछ पूर्ण शुद्धता और उष्मा के साथ संभाला गया। NRI परिवारों के लिए अत्यधिक अनुशंसित!'
    }
  },
  {
    id: 'test-2',
    name: 'Vikramaditya Sharma',
    location: {
      en: 'California, USA',
      hi: 'कैलिफोर्निया, अमेरिका'
    },
    isNRI: true,
    pujaPerformed: {
      en: 'Kaalsarp Dosh Shanti Puja',
      hi: 'कालसर्प दोष शांति पूजा'
    },
    date: 'May 2026',
    rating: 5,
    comment: {
      en: 'I had been suffering from continuous business setbacks and severe anxiety. An astrologer suggested Kaalsarp Shanti at Trimbakeshwar. Trimbakeshwar Guruji made the entire process seamless. The Sanskrit mantras were chanted with intense devotion. I felt an immediate sense of peace following the Visarjan.',
      hi: 'मैं लगातार व्यावसायिक असफलताओं और गंभीर चिंता से पीड़ित था। एक ज्योतिषी ने त्र्यंबकेश्वर पर कालसर्प शांति का सुझाव दिया। त्र्यंबकेश्वर गुरुजी ने पूरी प्रक्रिया को सहज बना दिया। संस्कृत मंत्रों का अत्यंत भक्ति भाव से पाठ किया गया। विसर्जन के बाद मुझे तत्काल शांति का अनुभव हुआ।'
    }
  },
  {
    id: 'test-3',
    name: 'Dr. Anand Rao',
    location: {
      en: 'Bengaluru, Karnataka',
      hi: 'बेंगलुरु, कर्नाटक'
    },
    isNRI: false,
    pujaPerformed: {
      en: 'Tripindi Shraddha & Mahamrityunjay Jaap',
      hi: 'त्रिपिंडी श्राद्ध एवं महामृत्युंजय जप'
    },
    date: 'April 2026',
    rating: 5,
    comment: {
      en: 'The level of Vedic authenticity provided by Pandit Shivkumar Shastri Ji is unmatched. No hidden demands, no commercial rush — just pure devotion and clear explanations of every step of the Vidhi.',
      hi: 'पंडित शिवकुमार शास्त्री जी द्वारा प्रदान की गई वैदिक प्रामाणिकता का स्तर अतुलनीय है। कोई छिपी माँग नहीं, कोई व्यावसायिक जल्दबाजी नहीं — केवल शुद्ध भक्ति और विधि के प्रत्येक चरण की स्पष्ट व्याख्या।'
    }
  },
  {
    id: 'test-4',
    name: 'Meenakshi & Devendra Patel',
    location: {
      en: 'Dubai, UAE',
      hi: 'दुबई, संयुक्त अरब अमीरात'
    },
    isNRI: true,
    pujaPerformed: {
      en: 'Kaalsarp Dosh & Navgrah Shanti',
      hi: 'कालसर्प दोष एवं नवग्रह शांति'
    },
    date: 'March 2026',
    rating: 5,
    comment: {
      en: 'Pt. Vinay Shastri(Guruji) responded to all our WhatsApp queries before we booked our flights from Dubai. The arrangement at Kusavarta Kund was smooth, respectful, and deeply spiritual.',
      hi: 'पं. विनय शास्त्री (गुरुजी) ने दुबई से हमारी उड़ान बुक करने से पहले ही हमारे सभी व्हाट्सएप प्रश्नों का उत्तर दिया। कुशावर्त कुंड पर व्यवस्था सहज, आदरपूर्ण और गहराई से आध्यात्मिक थी।'
    }
  }
];
