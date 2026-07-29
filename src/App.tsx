import React, { useState } from 'react';
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
import { LiveChatWidget } from './components/LiveChatWidget';
import { WhatsAppBuilderModal } from './components/WhatsAppBuilderModal';
import { SchemaModal } from './components/SchemaModal';
import { SectionId, Language } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [lang, setLang] = useState<Language>('en');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsAppInitialPuja, setWhatsAppInitialPuja] = useState<string>('');
  const [whatsAppCustomText, setWhatsAppCustomText] = useState<string>('');
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [initialPujaId, setInitialPujaId] = useState<string>('');

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

      {/* Floating Action Buttons (Live Chat Tawk.to, WhatsApp, Phone Call) */}
      <FloatingButtons
        onToggleLiveChat={() => setIsLiveChatOpen((prev) => !prev)}
        isLiveChatOpen={isLiveChatOpen}
        onOpenWhatsApp={handleOpenWhatsAppWithCustomText}
        lang={lang}
      />

      {/* Live Chat Hovering Widget (Connected to Tawk.to) */}
      <LiveChatWidget
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
        lang={lang}
        onOpenWhatsApp={handleOpenWhatsAppWithCustomText}
      />

      {/* Schema.org Inspector Modal */}
      <SchemaModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
      />
    </div>
  );
}
