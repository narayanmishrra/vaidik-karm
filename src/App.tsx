import React, { useState, useEffect, Suspense, lazy } from 'react';
import { KaalSarpLandingPage } from './components/KaalSarpLandingPage';
import { SectionId, Language } from './types';

/**
 * The main-site chrome (header, sections, footer) is lazy-loaded so the
 * dedicated Kaal Sarp Puja Google Ads landing page ships a minimal JS bundle.
 * Landing-page visitors never download the main site's data-heavy chunks.
 */
const Header = lazy(() => import('./components/Header').then((m) => ({ default: m.Header })));
const HomePage = lazy(() => import('./components/HomePage').then((m) => ({ default: m.HomePage })));
const ServicesSection = lazy(() =>
  import('./components/ServicesSection').then((m) => ({ default: m.ServicesSection }))
);
const HistorySection = lazy(() =>
  import('./components/HistorySection').then((m) => ({ default: m.HistorySection }))
);
const AboutSection = lazy(() =>
  import('./components/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const GallerySection = lazy(() =>
  import('./components/GallerySection').then((m) => ({ default: m.GallerySection }))
);
const BlogSection = lazy(() =>
  import('./components/BlogSection').then((m) => ({ default: m.BlogSection }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));
const SeoTags = lazy(() => import('./components/SeoTags').then((m) => ({ default: m.SeoTags })));
const FloatingButtons = lazy(() =>
  import('./components/FloatingButtons').then((m) => ({ default: m.FloatingButtons }))
);
const SchemaModal = lazy(() =>
  import('./components/SchemaModal').then((m) => ({ default: m.SchemaModal }))
);

/** Minimal on-brand loader shown while a main-site section chunk loads. */
const SectionLoader: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center bg-[#FBF3E7]">
    <div className="text-center space-y-3">
      <div className="w-14 h-14 mx-auto rounded-full bg-[#6B0F1A] border-2 border-[#D98E2B] flex items-center justify-center text-[#D98E2B] font-serif font-bold text-2xl animate-pulse">
        ॐ
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [lang, setLang] = useState<Language>('en');
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
  const [initialPujaId, setInitialPujaId] = useState<string>('');
  const [initialPostId, setInitialPostId] = useState<string>('');
  const [isLanding, setIsLanding] = useState(false);

  // Sync state with URL path + hash on mount, hashchange and popstate
  // Expanded blog URLs (/blog/:slug) and the landing page (/kaal-sarp-puja)
  // are real paths served via vercel.json rewrites.
  useEffect(() => {
    const syncRouteFromUrl = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.replace('#', '').trim();

      // Dedicated Kaal Sarp Puja landing page (Google Ads destination).
      if (path === '/kaal-sarp-puja' || path === '/kaal-sarp-puja/' || hash === 'kaal-sarp-puja') {
        setIsLanding(true);
        return;
      }

      // Leaving the landing page back into the main site.
      if (path === '/' && hash && hash !== 'kaal-sarp-puja') {
        setIsLanding(false);
      }

      // Real path route: /blog/<slug> (expanded URL for SEO)
      const blogMatch = path.match(/^\/blog\/([^/]+)\/?$/);
      if (blogMatch) {
        setActiveSection('blog');
        setInitialPostId(decodeURIComponent(blogMatch[1]));
        setInitialPujaId('');
        return;
      }

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

  // Exit the dedicated Kaal Sarp Puja landing page back into the main site.
  const handleExitLanding = (section?: 'home' | 'services' | 'about' | 'blog' | 'contact') => {
    setIsLanding(false);
    window.history.replaceState({}, '', '/');
    setInitialPujaId('');
    setInitialPostId('');
    if (section && section !== 'home') {
      setActiveSection(section);
      window.location.hash = section;
    } else {
      setActiveSection('home');
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Dedicated Google Ads landing page renders standalone (no site chrome).
  if (isLanding) {
    return <KaalSarpLandingPage onExitLanding={handleExitLanding} />;
  }

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#241A16] flex flex-col font-sans relative">
      {/* Streamlined Header with Language Toggle */}
      <Suspense fallback={null}>
        <Header
          activeSection={activeSection}
          onSelectSection={handleNavigateSection}
          onOpenWhatsAppBuilder={handleOpenWhatsAppWithCustomText}
          lang={lang}
          onToggleLanguage={toggleLanguage}
        />
      </Suspense>

      {/* Main Multi-page Router Content Area */}
      <main className="flex-1">
        {activeSection === 'home' && (
          <Suspense fallback={<SectionLoader />}>
            <HomePage
              onSelectSection={handleNavigateSection}
              onOpenWhatsAppForPuja={handleOpenWhatsAppForPuja}
              onOpenWhatsAppWithCustomText={handleOpenWhatsAppWithCustomText}
              onSelectPuja={handleSelectPuja}
              lang={lang}
            />
          </Suspense>
        )}

        {activeSection === 'history' && (
          <Suspense fallback={<SectionLoader />}>
            <HistorySection lang={lang} />
          </Suspense>
        )}

        {activeSection === 'services' && (
          <Suspense fallback={<SectionLoader />}>
            <ServicesSection
              onOpenWhatsAppForPuja={handleOpenWhatsAppForPuja}
              initialPujaId={initialPujaId}
              onClearInitialPujaId={() => setInitialPujaId('')}
              lang={lang}
            />
          </Suspense>
        )}

        {activeSection === 'about' && (
          <Suspense fallback={<SectionLoader />}>
            <AboutSection
              onOpenWhatsAppBuilder={handleOpenWhatsAppWithCustomText}
              lang={lang}
            />
          </Suspense>
        )}

        {activeSection === 'gallery' && (
          <Suspense fallback={<SectionLoader />}>
            <GallerySection lang={lang} />
          </Suspense>
        )}

        {activeSection === 'blog' && (
          <Suspense fallback={<SectionLoader />}>
            <BlogSection
              onOpenWhatsAppForArticle={handleOpenWhatsAppWithCustomText}
              lang={lang}
              initialPostId={initialPostId}
            />
          </Suspense>
        )}

        {activeSection === 'contact' && (
          <Suspense fallback={<SectionLoader />}>
            <ContactSection
              onOpenWhatsAppWithCustomText={handleOpenWhatsAppWithCustomText}
              lang={lang}
            />
          </Suspense>
        )}
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer
          onSelectSection={handleNavigateSection}
          onOpenWhatsAppBuilder={handleOpenWhatsAppWithCustomText}
          onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
        />
      </Suspense>

      {/* SEO Tags Footer Section */}
      <Suspense fallback={null}>
        <SeoTags />
      </Suspense>

      {/* Floating Action Buttons (WhatsApp, Phone Call) */}
      <Suspense fallback={null}>
        <FloatingButtons
          onOpenWhatsApp={handleOpenWhatsAppWithCustomText}
          lang={lang}
        />
      </Suspense>

      {/* Schema.org Inspector Modal */}
      <Suspense fallback={null}>
        <SchemaModal
          isOpen={isSchemaModalOpen}
          onClose={() => setIsSchemaModalOpen(false)}
        />
      </Suspense>
    </div>
  );
}
