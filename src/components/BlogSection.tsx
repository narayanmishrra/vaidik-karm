import React, { useEffect, useMemo } from 'react';
import { BLOG_POSTS } from '../data/blog';
import { BlogPost, Language } from '../types';
import { BookOpen, Clock, User, ChevronRight, HelpCircle, ArrowLeft, Calendar, MessageSquare } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

const BASE_URL = 'https://www.kaalsarpintrimbakeshwar.com';

interface BlogSectionProps {
  onOpenWhatsAppForArticle: (title: string) => void;
  lang?: Language;
  initialPostId?: string;
}

const DEFAULT_META = {
  title: 'Trimbakeshwar Guruji | Authentic Trimbakeshwar Puja & Ritual Services',
  description:
    'Authentic Vedic Pujas at Trimbakeshwar Jyotirlinga conducted by experienced Purohits. Kaalsarp Shanti, Narayan Nagbali, Tripindi Shraddha, Mahamrityunjay Jaap. Direct Call & WhatsApp consultation.',
  canonical: `${BASE_URL}/`,
  keywords:
    'Trimbakeshwar Puja, Kaalsarp Shanti Puja, Narayan Nagbali Trimbakeshwar, Tripindi Shraddha, Trimbakeshwar Guruji, Pandit for Puja in Trimbakeshwar, Kaalsarp Puja Cost, Kaalsarp Puja Booking, Kaal sarp puja'
};

const upsertMeta = (name: string, content: string) => {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertProperty = (property: string, content: string) => {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const upsertJsonLd = (id: string, data: object) => {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

const removeJsonLd = (id: string) => {
  document.getElementById(id)?.remove();
};

export const BlogSection: React.FC<BlogSectionProps> = ({
  onOpenWhatsAppForArticle,
  lang = 'en',
  initialPostId
}) => {
  const t = TRANSLATIONS[lang];
  const L = (field: { en: string; hi: string }) => field[lang];
  const [activeCategory, setActiveCategory] = React.useState<string>('All');

  const activePost = useMemo(
    () => (initialPostId ? BLOG_POSTS.find((p) => p.id === initialPostId) : undefined),
    [initialPostId]
  );

  // ---- Dynamic SEO / GEO tags for the open article ----
  useEffect(() => {
    if (!activePost) {
      document.title = DEFAULT_META.title;
      upsertMeta('description', DEFAULT_META.description);
      upsertMeta('keywords', DEFAULT_META.keywords);
      upsertCanonical(DEFAULT_META.canonical);
      removeJsonLd('blogposting-jsonld');
      removeJsonLd('blogfaq-jsonld');
      return;
    }

    const post = activePost;
    const title = L(post.title);
    const excerpt = L(post.excerpt);
    const url = `${BASE_URL}/blog/${post.id}`;
    const imageUrl = `${BASE_URL}${post.image}`;
    const published = new Date(post.date).toISOString();

    document.title = `${title} | Trimbakeshwar Guruji`;
    upsertMeta('description', excerpt);
    upsertMeta('keywords', [
      `${post.id.replace(/-/g, ' ')}`,
      'kaalsarp muhurat 2026',
      'narayan nagbali muhurat 2026',
      'kaal sarp puja dates 2026',
      'kaalsarp shanti dates 2026',
      'narayan nagbali dates 2026',
      'puja muhurat 2026 trimbakeshwar',
      'trimbakeshwar puja muhurat 2026'
    ].join(', '));
    upsertCanonical(url);

    upsertProperty('og:title', title);
    upsertProperty('og:description', excerpt);
    upsertProperty('og:url', url);
    upsertProperty('og:type', 'article');
    upsertProperty('og:image', imageUrl);
    upsertProperty('og:site_name', 'Trimbakeshwar Guruji');
    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', excerpt);
    upsertMeta('twitter:image', imageUrl);

    upsertJsonLd('blogposting-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      headline: title,
      description: excerpt,
      image: [imageUrl],
      datePublished: published,
      dateModified: published,
      inLanguage: lang === 'hi' ? 'hi-IN' : 'en-IN',
      keywords: 'muhurat 2026, trimbakeshwar puja, kaalsarp, narayan nagbali',
      articleSection: L(post.category),
      author: {
        '@type': 'Person',
        name: post.author,
        jobTitle: 'Hereditary Vedic Purohit at Trimbakeshwar Jyotirlinga',
        url: `${BASE_URL}/#about`
      },
      publisher: {
        '@type': 'Organization',
        name: 'Trimbakeshwar Guruji',
        url: BASE_URL,
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/logo.jpg` }
      }
    });

    if (post.faqs.length > 0) {
      upsertJsonLd('blogfaq-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((faq) => ({
          '@type': 'Question',
          name: L(faq.question),
          acceptedAnswer: { '@type': 'Answer', text: L(faq.answer) }
        }))
      });
    } else {
      removeJsonLd('blogfaq-jsonld');
    }
  }, [activePost, lang]);

  // ---- Inline full article view at a real expanded URL (/blog/:slug) ----
  if (activePost) {
    const post = activePost;
    const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

    return (
      <section id="blog" className="py-12 sm:py-16 bg-[#FBF3E7] text-[#241A16] border-b border-[#D98E2B]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Back link */}
          <a
            href="/#blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B0F1A] hover:text-[#B5121B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.blogAll} — {t.navBlog}
          </a>

          {/* Featured image */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#D98E2B] shadow-xl bg-stone-900">
            <img
              src={post.image}
              alt={L(post.title)}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-5">
              <div className="space-y-1.5">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#6B0F1A] text-[#D98E2B] text-[10px] font-bold uppercase tracking-wider border border-[#D98E2B]/40">
                  {L(post.category)}
                </span>
                <h1 className="font-serif font-bold text-xl sm:text-3xl text-white leading-tight">
                  {L(post.title)}
                </h1>
              </div>
            </div>
          </div>

          {/* Article meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 border-b border-[#D98E2B]/30 pb-4">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#B5121B]" /> {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#B5121B]" /> Published: {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#B5121B]" /> {L(post.readTime)}
            </span>
          </div>

          {/* Article body */}
          <div
            className="text-sm leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: L(post.content) }}
          />

          {/* Mid-article CTA */}
          <div className="p-5 rounded-2xl bg-[#6B0F1A] text-[#F5E9D8] border border-[#D98E2B] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif font-bold text-base text-[#D98E2B]">{t.blogCta}</h4>
              <p className="text-xs text-[#F5E9D8]/80">{t.blogCtaDesc}</p>
            </div>
            <button
              onClick={() => onOpenWhatsAppForArticle(L(post.title))}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {t.askAcharya}
            </button>
          </div>

          {/* FAQs */}
          {post.faqs.length > 0 && (
            <div className="space-y-3 pt-2">
              <h2 className="font-serif font-bold text-xl text-[#6B0F1A] flex items-center gap-1.5 border-b border-[#D98E2B]/30 pb-1">
                <HelpCircle className="w-5 h-5 text-[#D98E2B]" />
                {t.modalFaq}
              </h2>
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-[#D98E2B]/30">
                  <p className="font-bold text-sm text-[#6B0F1A]">Q: {L(faq.question)}</p>
                  <p className="text-xs text-gray-700 mt-1.5 leading-relaxed">A: {L(faq.answer)}</p>
                </div>
              ))}
            </div>
          )}

          {/* Related posts */}
          <div className="pt-4 space-y-4">
            <h2 className="font-serif font-bold text-xl text-[#6B0F1A] border-b border-[#D98E2B]/30 pb-1">
              {lang === 'en' ? 'Related Guides' : 'संबंधित मार्गदर्शिकाएं'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <a
                  key={p.id}
                  href={`/blog/${p.id}`}
                  className="group bg-white rounded-2xl border border-[#D98E2B]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
                >
                  <div className="relative h-36 overflow-hidden bg-stone-900">
                    <img
                      src={p.image}
                      alt={L(p.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#6B0F1A] text-[#D98E2B] text-[9px] font-bold uppercase tracking-wider border border-[#D98E2B]/40">
                      {L(p.category)}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                    <h3 className="font-serif font-bold text-sm text-[#6B0F1A] leading-snug group-hover:text-[#B5121B] transition-colors">
                      {L(p.title)}
                    </h3>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#B5121B]">
                      {lang === 'en' ? 'Read Guide' : 'मार्गदर्शिका पढ़ें'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
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
      </section>
    );
  }

  // ---- Blog listing (default) ----
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
            <a
              key={post.id}
              href={`/blog/${post.id}`}
              className="group bg-white rounded-2xl border border-[#D98E2B]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
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

                  <h3 className="font-serif font-bold text-lg text-[#6B0F1A] leading-snug group-hover:text-[#B5121B] transition-colors">
                    {L(post.title)}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {L(post.excerpt)}
                  </p>
                </div>

                <span className="w-full py-2 px-3 rounded-lg bg-[#F3E6D3] group-hover:bg-[#6B0F1A] text-[#6B0F1A] group-hover:text-[#F5E9D8] font-bold text-xs transition-colors flex items-center justify-center gap-1">
                  <span>{t.readMoreArticle}</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </a>
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
    </section>
  );
};
