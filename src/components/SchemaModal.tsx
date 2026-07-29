import React, { useState } from 'react';
import { X, Code, Check, Sparkles, Copy } from 'lucide-react';

interface SchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchemaModal: React.FC<SchemaModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const schemaJsonLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ReligiousOrganization",
        "@id": "https://www.kaalsarpintrimbakeshwar.com/#organization",
        "name": "Vaidik Karm - Trimbakeshwar Puja Services",
        "url": "https://www.kaalsarpintrimbakeshwar.com",
        "logo": "https://www.kaalsarpintrimbakeshwar.com/images/logo.jpg",
        "description": "Authentic Vedic Pujas and Rituals at Trimbakeshwar Jyotirlinga conducted by traditional hereditary Purohits. Kaalsarp Shanti, Narayan Nagbali, Tripindi Shraddha.",
        "telephone": "+919109695176",
        "email": "contact@kaalsarpintrimbakeshwar.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Trimbakeshwar Kshetra",
          "addressLocality": "Trimbakeshwar, Nashik",
          "addressRegion": "Maharashtra",
          "postalCode": "422212",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 19.9304,
          "longitude": 73.5303
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "06:00",
          "closes": "21:30"
        }
      },
      {
        "@type": "Service",
        "name": "Kaalsarp Dosh Shanti Puja",
        "provider": { "@id": "https://www.kaalsarpintrimbakeshwar.com/#organization" },
        "serviceType": "Vedic Ritual",
        "areaServed": "Trimbakeshwar, Nashik, India",
        "description": "Sankalp-based Kaalsarp Dosh Shanti Puja at Trimbakeshwar Kshetra with silver Nag-Nagin pairs and Vedic Havan."
      },
      {
        "@type": "Service",
        "name": "Narayan Nagbali Puja",
        "provider": { "@id": "https://www.kaalsarpintrimbakeshwar.com/#organization" },
        "serviceType": "3-Day Ancestral Ritual",
        "areaServed": "Trimbakeshwar, Nashik, India",
        "description": "3-day authentic Narayan Nagbali ritual for Pitru Dosh and Sarp Shaap liberation."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why is Kaalsarp Shanti performed exclusively at Trimbakeshwar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Trimbakeshwar Jyotirlinga embodies Lord Brahma, Lord Vishnu, and Lord Mahesh in a single divine emblem, making rituals performed at Trimbakeshwar Kshetra 100x more potent."
            }
          }
        ]
      }
    ]
  };

  const jsonString = JSON.stringify(schemaJsonLD, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#4A0B12] text-[#F5E9D8] rounded-2xl border-2 border-[#D98E2B] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#6B0F1A] px-5 py-4 border-b border-[#D98E2B]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D98E2B]" />
            <div>
              <h3 className="font-serif font-bold text-lg text-[#FBF3E7]">
                Schema.org JSON-LD Inspector (SEO / GEO)
              </h3>
              <p className="text-[11px] text-[#D98E2B]">Generative Engine & Local Business Structured Data</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-[#4A0B12] text-[#D98E2B] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* JSON Display */}
        <div className="p-5 space-y-3 overflow-y-auto max-h-[65vh]">
          <p className="text-xs text-[#F5E9D8]/90 leading-relaxed">
            This structured schema markup is embedded across all pages to optimize AI Answer Engines (ChatGPT, Gemini, Perplexity) and Google Rich Results for local Trimbakeshwar searches.
          </p>

          <pre className="p-4 rounded-xl bg-stone-900 border border-[#D98E2B]/30 text-[11px] text-emerald-300 font-mono overflow-x-auto leading-relaxed">
            {jsonString}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#6B0F1A] border-t border-[#D98E2B]/30 flex items-center justify-between">
          <span className="text-[11px] text-[#F5E9D8]/80">WCAG AA Compliant • Valid JSON-LD</span>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg bg-[#B5121B] hover:bg-[#8F0E15] text-white font-bold text-xs border border-[#D98E2B] flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4 text-[#D98E2B]" />}
            <span>{copied ? 'Copied JSON!' : 'Copy Schema JSON'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
