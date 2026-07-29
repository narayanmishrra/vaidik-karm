import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Mail, Send, Globe, CheckCircle2 } from 'lucide-react';
import { PUJA_SERVICES } from '../data/pujas';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { GoogleBusinessWidget } from './GoogleBusinessWidget';

interface ContactSectionProps {
  onOpenWhatsAppWithCustomText: (text: string) => void;
  lang?: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenWhatsAppWithCustomText,
  lang = 'en'
}) => {
  const t = TRANSLATIONS[lang];
  const L = (field: { en: string; hi: string }) => field[lang];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    puja: 'Kaalsarp Dosh Shanti Puja',
    preferredMonth: '',
    devoteesCount: '1-2',
    isNRI: false,
    country: 'India',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const text = `Hari Om Acharya Ji. Sacred Inquiry from Website:
• Name: ${formData.name}
• Phone: ${formData.phone}
• Puja Interested In: ${formData.puja}
• Preferred Month: ${formData.preferredMonth || 'Next Available'}
• Devotees: ${formData.devoteesCount}
• NRI Client: ${formData.isNRI ? `Yes (${formData.country})` : 'No'}
• Message: ${formData.message || 'Seeking guidance on Mahurat and Vidhi details.'}`;

    setTimeout(() => {
      onOpenWhatsAppWithCustomText(text);
    }, 1200);
  };

  // Labels for bilingual form
  const formLabels = {
    instantContact: lang === 'hi' ? 'तत्काल सीधा संपर्क' : 'Instant Direct Contact',
    fastestResponse: lang === 'hi' ? 'सबसे तेज़ प्रतिक्रिया के लिए, सीधे कॉल करें या व्हाट्सएप पर संदेश भेजें:' : 'For fastest response, call directly or message on WhatsApp:',
    directPhone: lang === 'hi' ? 'सीधी फोन लाइन' : 'Direct Phone Line',
    callNowArrow: lang === 'hi' ? 'अभी कॉल करें →' : 'Call Now →',
    whatsappOfficial: lang === 'hi' ? 'व्हाट्सएप आधिकारिक चैट' : 'WhatsApp Official Chat',
    chatNowArrow: lang === 'hi' ? 'अभी चैट करें →' : 'Chat Now →',
    locationAddress: lang === 'hi' ? 'स्थान एवं पता' : 'Location & Address',
    panditName: lang === 'hi' ? 'पंडित विनय शास्त्री (गुरुजी) — त्र्यंबकेश्वर गुरुजी' : 'Pandit. Vinay Shastri (Guruji) — Trimbakeshwar Guruji',
    addressText: lang === 'hi' ? 'त्र्यंबकेश्वर क्षेत्र, नासिक जिला, महाराष्ट्र 422212, भारत' : 'Trimbakeshwar Kshetra, Nashik District, Maharashtra 422212, India',
    mapTitle: lang === 'hi' ? '📍 त्र्यंबकेश्वर क्षेत्र मानचित्र' : '📍 Trimbakeshwar Kshetra Map',
    interactiveLocation: lang === 'hi' ? 'इंटरैक्टिव स्थान' : 'Interactive Location',
    purohitOffice: lang === 'hi' ? 'पुरोहित कार्यालय' : 'Purohit Office',
    distanceFromKund: lang === 'hi' ? 'त्र्यंबकेश्वर क्षेत्र, नासिक, महाराष्ट्र' : 'Trimbakeshwar Kshetra, Nashik, Maharashtra',
    openGoogleMaps: lang === 'hi' ? 'Google Maps में खोलें ↗' : 'Open in Google Maps ↗',
    nriNote: lang === 'hi' ? 'NRI / विदेशी भक्तों के लिए नोट:' : 'NRI Overseas Client Note:',
    nriDesc: lang === 'hi' ? 'US, UK, Canada या Australia से व्हाट्सएप पर संदेश भेजना चाहते हैं? हम सभी वैश्विक समय क्षेत्रों में शीघ्र प्रतिक्रिया देते हैं।' : 'Prefer WhatsApp messaging from US, UK, Canada, or Australia? We respond promptly across global time zones.',
    formTitle: lang === 'hi' ? 'पवित्र पूजा परामर्श फॉर्म' : 'Sacred Puja Consultation Form',
    formDesc: lang === 'hi' ? 'आचार्यजी को सीधे प्रश्न भेजने के लिए नीचे अपना विवरण भरें:' : 'Fill in your details below to submit a direct query to Acharya Ji:',
    yourName: lang === 'hi' ? 'आपका नाम *' : 'Your Name *',
    phoneNumber: lang === 'hi' ? 'फोन नंबर (देश कोड सहित) *' : 'Phone Number (With Country Code) *',
    pujaInterest: lang === 'hi' ? 'पूजा / अनुष्ठान जिसमें रुचि है *' : 'Puja / Ritual Interested In *',
    preferredMonth: lang === 'hi' ? 'पसंदीदा माह / तिथि' : 'Preferred Month / Dates',
    devoteesCount: lang === 'hi' ? 'उपस्थित भक्तों की संख्या' : 'Number of Attending Devotees',
    nriCheckbox: lang === 'hi' ? 'मैं NRI / अंतर्राष्ट्रीय भक्त हूँ' : 'I am an NRI / International Devotee',
    additionalMsg: lang === 'hi' ? 'अतिरिक्त संदेश / कुंडली प्रश्न (वैकल्पिक)' : 'Additional Message / Kundali Questions (Optional)',
    submitBtn: lang === 'hi' ? 'सबमिट करें एवं व्हाट्सएप पर परामर्श लें' : 'Submit & Consult on WhatsApp',
    privacyNote: lang === 'hi' ? '🔒 व्यक्तिगत विवरण पूर्णतः गोपनीय रखा जाता है और केवल पूजा परामर्श के लिए उपयोग होता है।' : '🔒 Personal details strictly confidential and used only for ritual consultation.',
    successTitle: lang === 'hi' ? 'हरि ओम! आपकी पूछताछ सबमिट हो गई है' : 'Hari Om! Your Inquiry Has Been Submitted',
    successDesc: lang === 'hi' ? 'आपकी विस्तृत पूछताछ पं. विनय शास्त्री (गुरुजी) को भेजने के लिए व्हाट्सएप स्वचालित रूप से खुल रहा है...' : 'Opening WhatsApp automatically to send your detailed query to Pt. Vinay Shastri(Guruji)...',
    submitAnother: lang === 'hi' ? 'एक और पूछताछ सबमिट करें' : 'Submit another inquiry',
    singleDevotee: lang === 'hi' ? '1 भक्त (एकल)' : '1 Devotee (Single)',
    couple: lang === 'hi' ? 'दंपति (पति एवं पत्नी)' : 'Couple (Husband & Wife)',
    familySmall: lang === 'hi' ? '3-5 परिवार के सदस्य' : '3-5 Family Members',
    familyLarge: lang === 'hi' ? '6+ बड़ा पारिवारिक समूह' : '6+ Large Family Group'
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-[#FBF3E7] text-[#241A16] relative border-b border-[#D98E2B]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B0F1A]/10 border border-[#D98E2B]/40 text-[#6B0F1A] text-xs font-semibold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-[#D98E2B]" />
            <span>{t.navContact}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#6B0F1A]">
            {t.contactPageTitle}
          </h2>

          <div className="gold-divider w-32 mx-auto" />

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-body">
            {t.contactPageSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Phone / WhatsApp / Map Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Action Box */}
            <div className="p-6 rounded-2xl bg-white border-2 border-[#D98E2B] shadow-xl space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#6B0F1A] border-b border-[#D98E2B]/30 pb-2">
                {formLabels.instantContact}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {formLabels.fastestResponse}
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="tel:+919109695176"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#B5121B] hover:bg-[#6B0F1A] text-white font-bold text-sm border border-[#D98E2B] shadow transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#D98E2B]" />
                    <div>
                      <span className="block text-xs font-normal text-white/80">{formLabels.directPhone}</span>
                      <span className="text-sm">+91 91096 95176</span>
                    </div>
                  </div>
                  <span className="text-xs text-[#D98E2B] font-bold">{formLabels.callNowArrow}</span>
                </a>

                <button
                  onClick={() =>
                    onOpenWhatsAppWithCustomText(
                      'Hari Om Acharya Ji. I am visiting your website and wish to consult regarding Puja Mahurat.'
                    )
                  }
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-emerald-200" />
                    <div className="text-left">
                      <span className="block text-xs font-normal text-emerald-200">{formLabels.whatsappOfficial}</span>
                      <span className="text-sm">+91 91096 95176</span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-200 font-bold">{formLabels.chatNowArrow}</span>
                </button>
              </div>
            </div>

            {/* Address & NAP Consistency */}
            <div className="p-6 rounded-2xl bg-white border border-[#D98E2B]/40 space-y-4 shadow-md">
              <h3 className="font-serif font-bold text-lg text-[#6B0F1A] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#B5121B]" />
                {formLabels.locationAddress}
              </h3>

              <div className="space-y-2 text-xs text-gray-700">
                <p className="font-bold text-[#6B0F1A] text-sm">{formLabels.panditName}</p>
                <p>{formLabels.addressText}</p>
                <p className="pt-2 text-emerald-800 font-bold">
                  ⏰ {t.consultationHours}
                </p>
              </div>
            </div>

            {/* Google Business Profile Card */}
            <GoogleBusinessWidget variant="full" />

            {/* Simulated Interactive Google Map */}
            <div className="rounded-2xl overflow-hidden border-2 border-[#D98E2B]/60 shadow-xl bg-stone-900 relative">
              <div className="p-3 bg-[#6B0F1A] text-xs font-bold text-[#D98E2B] flex items-center justify-between border-b border-[#D98E2B]/30">
                <span>{formLabels.mapTitle}</span>
                <span className="text-[10px] text-white/70">{formLabels.interactiveLocation}</span>
              </div>
              <div className="w-full h-52 bg-stone-800 relative flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 bg-stone-900 opacity-90 p-4 flex flex-col items-center justify-center gap-2">
                  <MapPin className="w-9 h-9 text-[#B5121B] animate-bounce" />
                  <p className="font-serif font-bold text-sm text-[#FBF3E7]">
                    {formLabels.purohitOffice}
                  </p>
                  <p className="text-[11px] text-[#D98E2B]">
                    {formLabels.distanceFromKund}
                  </p>
                  <a
                    href="https://maps.app.goo.gl/mz44QaH1dkGmYRfa7"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 px-3 py-1.5 rounded bg-[#6B0F1A] border border-[#D98E2B] text-xs font-bold text-white hover:bg-[#B5121B]"
                  >
                    {formLabels.openGoogleMaps}
                  </a>
                </div>
              </div>
            </div>

            {/* NRI Timezone Helper */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <Globe className="w-4 h-4 text-emerald-700" />
                <span>{formLabels.nriNote}</span>
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                {formLabels.nriDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Clean Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#D98E2B] shadow-xl space-y-6">
              <div className="border-b border-[#D98E2B]/30 pb-3">
                <h3 className="text-2xl font-serif font-bold text-[#6B0F1A]">
                  {formLabels.formTitle}
                </h3>
                <p className="text-xs text-gray-600">
                  {formLabels.formDesc}
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-[#F3E6D3] border border-[#D98E2B] text-center space-y-4 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-serif font-bold text-[#6B0F1A]">
                    {formLabels.successTitle}
                  </h4>
                  <p className="text-xs text-gray-700 max-w-md mx-auto leading-relaxed">
                    {formLabels.successDesc}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#B5121B] font-bold underline pt-2"
                  >
                    {formLabels.submitAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-[#6B0F1A]">
                        {formLabels.yourName}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === 'hi' ? 'जैसे रमेश शर्मा' : 'e.g. Ramesh Sharma'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6B0F1A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-[#6B0F1A]">
                        {formLabels.phoneNumber}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={lang === 'hi' ? 'जैसे +91 98765 43210' : 'e.g. +91 98765 43210 or +1 415...'}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6B0F1A]"
                      />
                    </div>
                  </div>

                  {/* Puja Dropdown & Preferred Month */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-[#6B0F1A]">
                        {formLabels.pujaInterest}
                      </label>
                      <select
                        value={formData.puja}
                        onChange={(e) => setFormData({ ...formData, puja: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 text-gray-900 focus:outline-none focus:border-[#6B0F1A]"
                      >
                        {PUJA_SERVICES.map((p) => (
                          <option key={p.id} value={p.name.en} className="bg-white text-gray-900">
                            {L(p.name)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-[#6B0F1A]">
                        {formLabels.preferredMonth}
                      </label>
                      <input
                        type="text"
                        placeholder={lang === 'hi' ? 'जैसे अगला माह / अगस्त 2026' : 'e.g. Next Month / Aug 2026'}
                        value={formData.preferredMonth}
                        onChange={(e) => setFormData({ ...formData, preferredMonth: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6B0F1A]"
                      />
                    </div>
                  </div>

                  {/* Devotees Count & NRI Checkbox */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-[#6B0F1A]">
                        {formLabels.devoteesCount}
                      </label>
                      <select
                        value={formData.devoteesCount}
                        onChange={(e) => setFormData({ ...formData, devoteesCount: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 text-gray-900 focus:outline-none focus:border-[#6B0F1A]"
                      >
                        <option value="1">{formLabels.singleDevotee}</option>
                        <option value="2">{formLabels.couple}</option>
                        <option value="3-5">{formLabels.familySmall}</option>
                        <option value="6+">{formLabels.familyLarge}</option>
                      </select>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/30 flex items-center gap-2 mt-4 sm:mt-0">
                      <input
                        type="checkbox"
                        id="nri-check"
                        checked={formData.isNRI}
                        onChange={(e) => setFormData({ ...formData, isNRI: e.target.checked })}
                        className="w-4 h-4 accent-[#6B0F1A]"
                      />
                      <label htmlFor="nri-check" className="text-xs text-gray-800 cursor-pointer select-none font-medium">
                        {formLabels.nriCheckbox}
                      </label>
                    </div>
                  </div>

                  {/* Optional Message */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#6B0F1A]">
                      {formLabels.additionalMsg}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={lang === 'hi' ? 'अपनी विशेष आवश्यकताएं या जन्म विवरण साझा करें...' : 'Share any specific requirements or birth details...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/40 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6B0F1A]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#B5121B] hover:bg-[#6B0F1A] text-white font-bold text-sm border border-[#D98E2B] shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <Send className="w-4 h-4 text-[#D98E2B]" />
                    <span>{formLabels.submitBtn}</span>
                  </button>

                  <p className="text-[11px] text-center text-gray-500 pt-1">
                    {formLabels.privacyNote}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
