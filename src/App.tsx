import React, { useState, useEffect } from 'react';
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
  const [initialPostId, setInitialPostId] = useState<string>('');

  // Sync state with URL path + hash on mount, hashchange and popstate
  // Expanded blog URLs (/blog/:slug) are real paths served via vercel.json rewrites.
  useEffect(() => {
    const syncRouteFromUrl = () => {
      // Real path route: /blog/<slug> (expanded URL for SEO)
      const path = window.location.pathname;
      const blogMatch = path.match(/^\/blog\/([^/]+)\/?$/);
      if (blogMatch) {
        setActiveSection('blog');
        setInitialPostId(decodeURIComponent(blogMatch[1]));
        setInitialPujaId('');
        return;
      }

      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setActiveSection('home');
        setInitialPujaId('');
        setInitialPostId('');
        return;
      }

      if (hash.startsWith('services/') && hash.endsWith('/procedure-faqs')) {
        const pujaId = hash.replace(/^services\//, '').replace(/\/procedure-faqs$/, '');
        setActiveSection('services');
        setInitialPujaId(decodeURIComponent(pujaId));
        setInitialPostId('');
        return;
      }

      if (hash.startsWith('puja/')) {
        const pujaId = hash.replace('puja/', '');
        setActiveSection('services');
        setInitialPujaId(pujaId);
        setInitialPostId('');
        return;
      }

      const validSections: SectionId[] = ['home', 'history', 'services', 'about', 'gallery', 'blog', 'contact'];
      if (validSections.includes(hash as SectionId)) {
        setActiveSection(hash as SectionId);
        if (hash !== 'services') {
          setInitialPujaId('');
        }
        setInitialPostId('');
      }
    };

    syncRouteFromUrl();
    window.addEventListener('hashchange', syncRouteFromUrl);
    window.addEventListener('popstate', syncRouteFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncRouteFromUrl);
      window.removeEventListener('popstate', syncRouteFromUrl);
    };
  }, []);

  // When navigating to a hash-based section from an expanded blog URL,
  // reset the pathname so the URL stays clean (e.g. /blog/x -> /#services).
  const resetPathForHashNavigation = () => {
    if (!/^\/(index\.html)?$/.test(window.location.pathname)) {
      window.history.replaceState({}, '', '/');
    }
  };

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
    setInitialPujaId('');
    setInitialPostId('');
    resetPathForHashNavigation();
    window.location.hash = id === 'home' ? '' : id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPuja = (pujaId: string) => {
    setInitialPujaId(pujaId);
    setActiveSection('services');
    setInitialPostId('');
    resetPathForHashNavigation();
    window.location.hash = `puja/${pujaId}`;
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
            initialPostId={initialPostId}
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
