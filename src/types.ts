export type SectionId = 'home' | 'history' | 'services' | 'about' | 'gallery' | 'blog' | 'contact';

export type Language = 'en' | 'hi';

// Bilingual string helper type
export type BiStr = { en: string; hi: string };
export type BiArr = { en: string[]; hi: string[] };

export interface PujaFaq {
  question: BiStr;
  answer: BiStr;
}

export interface PujaDatesMonth {
  month: BiStr;
  dates: string;
}

export interface PujaDates2026 {
  title: BiStr;
  intro: BiStr;
  months: PujaDatesMonth[];
  highlightsTitle: BiStr;
  highlights: BiArr;
  footnote?: BiStr;
}

export interface PujaService {
  id: string;
  name: BiStr;
  sanskritName: string;
  shortDesc: BiStr;
  fullDesc: BiStr;
  duration: BiStr;
  bestDays: BiStr;
  whoShouldPerform: BiArr;
  keyBenefits: BiArr;
  samagriIncluded: BiArr;
  procedureSteps: BiArr;
  image: string;
  faqs: PujaFaq[];
  isPopular?: boolean;
  dates2026?: PujaDates2026;
}

export interface Testimonial {
  id: string;
  name: string;
  location: BiStr;
  isNRI?: boolean;
  pujaPerformed: BiStr;
  date: string;
  rating: number;
  comment: BiStr;
  avatar?: string;
}

export interface PriestProfile {
  id: string;
  name: string;
  title: BiStr;
  experienceYears: number;
  specialization: BiArr;
  bio: BiStr;
  image: string;
}

export interface CoreValue {
  title: BiStr;
  desc: BiStr;
}

export interface NRIGuidanceText {
  heading: BiStr;
  paragraph: BiStr;
  perks: BiArr;
}

export interface BlogPost {
  id: string;
  title: BiStr;
  category: BiStr;
  excerpt: BiStr;
  content: BiStr;
  author: string;
  date: string;
  readTime: BiStr;
  image: string;
  faqs: { question: BiStr; answer: BiStr }[];
}

export interface GalleryImage {
  id: string;
  title: BiStr;
  category: BiStr;
  url: string;
  caption: BiStr;
}

export interface HistoryFact {
  title: BiStr;
  description: BiStr;
  iconName: string;
}

export interface TravelInfo {
  mode: BiStr;
  title: BiStr;
  detail: BiStr;
  distance: string;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email?: string;
  selectedPuja: string;
  preferredMonth: string;
  devoteesCount: number;
  isNRI: boolean;
  country: string;
  message: string;
}
