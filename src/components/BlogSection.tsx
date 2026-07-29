import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blog';
import { BlogPost, Language } from '../types';
import { BookOpen, Clock, User, ChevronRight, X, HelpCircle } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface BlogSectionProps {
  onOpenWhatsAppForArticle: (title: string) => void;
  lang?: Language;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onOpenWhatsAppForArticle,
  lang = 'en'
}) => {
  const t = TRANSLATIONS[lang];
  const L = (field: { en: string; hi: string }) => field[lang];

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Compute categories from bilingual blog data
  const categoryValues = Array.from(new Set(BLOG_POSTS.map((p) => L(p.category))));
  const allLabel = t.blogAll || 'All';
  const categories = [allLabel, ...categoryValues];

  const filteredPosts = BLOG_POSTS.filter((post) =>
    activeCategory === allLabel ? true : L(post.category) === activeCategory
  );

  return (
    <section id="blog" className="py-12 sm:py-20 bg-[#FBF3E7] text-[#241A16] border-b border-[#D98E2B]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B0F1A]/10 border border-[#D98E2B]/40 text-[#6B0F1A] text-xs font-semibold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-[#D98E2B]" />
            <span>{t.navBlog}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#6B0F1A]">
            {t.blogPageTitle}
          </h2>

          <div className="gold-divider w-32 mx-auto" />

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-body">
            {t.blogPageSub}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeCategory === cat
                  ? 'bg-[#6B0F1A] text-[#F5E9D8] border border-[#D98E2B]'
                  : 'bg-white text-[#241A16] hover:bg-[#F3E6D3] border border-[#D98E2B]/30'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-[#D98E2B]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <img
                  src={post.image}
                  alt={L(post.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#6B0F1A] text-[#D98E2B] text-[10px] font-bold uppercase tracking-wider border border-[#D98E2B]/40">
                  {L(post.category)}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-[#B5121B]" /> {post.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B5121B]" /> {L(post.readTime)}
                    </span>
                  </div>

                  <h3
                    className="font-serif font-bold text-lg text-[#6B0F1A] leading-snug hover:text-[#B5121B] transition-colors cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    {L(post.title)}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {L(post.excerpt)}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full py-2 px-3 rounded-lg bg-[#F3E6D3] hover:bg-[#6B0F1A] text-[#6B0F1A] hover:text-[#F5E9D8] font-bold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <span>{t.readMoreArticle}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-2xl bg-[#6B0F1A] text-[#F5E9D8] border-2 border-[#D98E2B] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-serif font-bold text-[#FBF3E7]">{t.blogCta}</h3>
            <p className="text-xs text-[#F5E9D8]/80">{t.blogCtaDesc}</p>
          </div>
          <button
            onClick={() => onOpenWhatsAppForArticle('General Kundali/Dosh Consultation')}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shrink-0"
          >
            {t.askAcharya}
          </button>
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#FBF3E7] text-[#241A16] rounded-2xl shadow-2xl border-2 border-[#D98E2B] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#6B0F1A] text-[#F5E9D8] px-6 py-4 flex items-center justify-between border-b border-[#D98E2B]/40">
              <div>
                <span className="text-xs text-[#D98E2B] font-bold uppercase tracking-wider block">
                  {L(selectedPost.category)} • {L(selectedPost.readTime)}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FBF3E7]">
                  {L(selectedPost.title)}
                </h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-full bg-[#4A0B12] text-[#D98E2B] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
              <div className="flex items-center gap-4 text-xs text-gray-600 border-b border-[#D98E2B]/20 pb-3">
                <span><strong>Author:</strong> {selectedPost.author}</span>
                <span><strong>Published:</strong> {selectedPost.date}</span>
              </div>

              {/* Rendered HTML content */}
              <div
                className="prose max-w-none text-gray-800 space-y-4"
                dangerouslySetInnerHTML={{ __html: L(selectedPost.content) }}
              />

              {/* Mid-article WhatsApp Banner */}
              <div className="p-4 rounded-xl bg-[#6B0F1A] text-[#F5E9D8] border border-[#D98E2B] flex flex-col sm:flex-row items-center justify-between gap-3 my-6">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#D98E2B]">
                    {t.blogCta}
                  </h4>
                  <p className="text-xs text-[#F5E9D8]/80">
                    {t.blogCtaDesc}
                  </p>
                </div>
                <button
                  onClick={() => onOpenWhatsAppForArticle(L(selectedPost.title))}
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shrink-0"
                >
                  {t.askAcharya}
                </button>
              </div>

              {/* FAQs section */}
              {selectedPost.faqs.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#D98E2B]/30">
                  <h3 className="font-serif font-bold text-base text-[#6B0F1A] flex items-center gap-1">
                    <HelpCircle className="w-4 h-4 text-[#D98E2B]" />
                    {t.modalFaq}
                  </h3>
                  {selectedPost.faqs.map((faq, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white border border-[#D98E2B]/30">
                      <p className="font-bold text-xs text-[#6B0F1A]">Q: {L(faq.question)}</p>
                      <p className="text-xs text-gray-700 mt-1">A: {L(faq.answer)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-[#6B0F1A] p-4 border-t border-[#D98E2B]/40 flex items-center justify-between gap-2">
              <span className="text-xs text-[#F5E9D8]">{t.modalCta}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    onOpenWhatsAppForArticle(L(selectedPost.title));
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-700 text-white font-bold text-xs"
                >
                  {t.whatsappChat}
                </button>
                <a
                  href="tel:+919109695176"
                  className="px-4 py-2 rounded-lg bg-[#B5121B] text-white font-bold text-xs border border-[#D98E2B]"
                >
                  {t.callNow}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
