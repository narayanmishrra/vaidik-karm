import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ServicesSection } from './components/ServicesSection';
import { HistorySection } from './components/HistorySection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SeoTags } from './components/SeoTags';
import { FloatingButtons } from './components/FloatingButtons';
import { SchemaModal } from './components/SchemaModal';
import { SectionId, Language } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [lang, setLang] = useState<Language>('en');
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
  const [initialPujaId, setInitialPujaId] = useState<string>('');

  useEffect(() => {
    const openPujaFromUrl = () => {
      const match = window.location.hash.match(/^#services\/([^/]+)\/procedure-faqs$/);
      if (match?.[1]) {
        setActiveSection('services');
        setInitialPujaId(decodeURIComponent(match[1]));
      }
    };

    openPujaFromUrl();
    window.addEventListener('hashchange', openPujaFromUrl);
    return () => window.removeEventListener('hashchange', openPujaFromUrl);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleOpenWhatsAppForPuja = () => {
    const phoneNumber = '+919109695176';
    const text = '🕉️ OM Namah Shivay Panditji\u0020🙏🏻';
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
  };

  const handleOpenWhatsAppWithCustomText = () => {
    const phoneNumber = '919109695176';
    const text = '🕉️ OM Namah Shivay Panditji\u0020🙏🏻';
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
  };

  const handleNavigateSection = (id: SectionId) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPuja = (pujaId: string) => {
    setInitialPujaId(pujaId);
    setActiveSection('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#241A16] flex flex-col font-sans relative">
      {/* Streamlined Header with Language Toggle */}
      <Header
        activeSection={activeSection}
        onSelectSection={handleNavigateSection}
        onOpenWhatsAppBuilder={handleOpenWhatsAppWithCustomText}
        lang={lang}
        onToggleLanguage={toggleLanguage}
      />

      {/* Main Multi-page Router Content Area */}
      <main className="flex-1">
        {activeSection === 'home' && (
          <HomePage
            onSelectSection={handleNavigateSection}
            onOpenWhatsAppForPuja={handleOpenWhatsAppForPuja}
            onOpenWhatsAppWithCustomText={handleOpenWhatsAppWithCustomText}
            onSelectPuja={handleSelectPuja}
            lang={lang}
          />
        )}

        {activeSection === 'history' && (
          <HistorySection lang={lang} />
        )}

        {activeSection === 'services' && (
          <ServicesSection
            onOpenWhatsAppForPuja={handleOpenWhatsAppForPuja}
            initialPujaId={initialPujaId}
            onClearInitialPujaId={() => setInitialPujaId('')}
            lang={lang}
          />
        )}

        {activeSection === 'about' && (
          <AboutSection
            onOpenWhatsAppBuilder={handleOpenWhatsAppWithCustomText}
            lang={lang}
          />
        )}

        {activeSection === 'gallery' && (
          <GallerySection lang={lang} />
        )}

        {activeSection === 'blog' && (
          <BlogSection
            onOpenWhatsAppForArticle={handleOpenWhatsAppWithCustomText}
            lang={lang}
          />
        )}

        {activeSection === 'contact' && (
          <ContactSection
            onOpenWhatsAppWithCustomText={handleOpenWhatsAppWithCustomText}
            lang={lang}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectSection={handleNavigateSection}
        onOpenWhatsAppBuilder={handleOpenWhatsAppWithCustomText}
        onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
      />

      {/* SEO Tags Footer Section */}
      <SeoTags />

      {/* Floating Action Buttons (WhatsApp, Phone Call) */}
      <FloatingButtons
        onOpenWhatsApp={handleOpenWhatsAppWithCustomText}
        lang={lang}
      />

      {/* Schema.org Inspector Modal */}
      <SchemaModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
      />
    </div>
  );
}
