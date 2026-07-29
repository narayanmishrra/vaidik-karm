import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data/gallery';
import { GalleryImage, Language } from '../types';
import { Camera, X, ZoomIn } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface GallerySectionProps {
  lang?: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang = 'en' }) => {
  const t = TRANSLATIONS[lang];
  const L = (field: { en: string; hi: string }) => field[lang];

  const [activeCategory, setActiveCategory] = useState<string>('__all__');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = [
    { key: '__all__', label: t.galleryAll || 'All' },
    { key: 'temple', label: t.galleryFilterTemple },
    { key: 'rituals', label: t.galleryFilterRituals },
    { key: 'samagri', label: t.galleryFilterSamagri },
    { key: 'devotees', label: t.galleryFilterDevotees }
  ];

  // Map category keys to actual English category values for matching
  const categoryKeyToEn: Record<string, string> = {
    '__all__': '__all__',
    'temple': 'Temple & Sanctum',
    'rituals': 'Rituals & Havans',
    'samagri': 'Sacred Samagri',
    'devotees': 'Devotees & Blessings'
  };

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    if (activeCategory === '__all__') return true;
    return img.category.en === categoryKeyToEn[activeCategory];
  });

  return (
    <section id="gallery" className="pt-12 pb-6 sm:py-20 bg-[#FBF3E7] text-[#241A16] border-b border-[#D98E2B]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B0F1A]/10 border border-[#D98E2B]/40 text-[#6B0F1A] text-xs font-semibold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5 text-[#D98E2B]" />
            <span>{t.navGallery}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#6B0F1A]">
            {t.galleryPageTitle}
          </h2>

          <div className="gold-divider w-32 mx-auto" />

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-body">
            {t.galleryPageSub}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeCategory === cat.key
                  ? 'bg-[#6B0F1A] text-[#F5E9D8] border border-[#D98E2B]'
                  : 'bg-white text-[#241A16] hover:bg-[#F3E6D3] border border-[#D98E2B]/30'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group relative h-64 rounded-2xl overflow-hidden border border-[#D98E2B]/40 shadow-lg cursor-pointer bg-stone-900"
            >
              <img
                src={img.url}
                alt={L(img.title)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Image title on hover */}
              <div className="absolute bottom-2 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[11px] font-bold text-[#D98E2B]">{L(img.category)}</p>
                <p className="text-xs font-semibold">{L(img.title)}</p>
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-[#D98E2B] opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden border-2 border-[#D98E2B] shadow-2xl flex flex-col">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-full bg-black/60 text-[#D98E2B] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image title bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-10">
              <p className="text-xs text-[#D98E2B] font-bold">{L(selectedImage.category)}</p>
              <p className="text-sm text-white font-serif font-bold">{L(selectedImage.title)}</p>
            </div>

            <div className="relative bg-black flex items-center justify-center max-h-[85vh]">
              <img
                src={selectedImage.url}
                alt={L(selectedImage.title)}
                className="max-h-[85vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
