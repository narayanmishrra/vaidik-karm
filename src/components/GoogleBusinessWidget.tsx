import React from 'react';
import { Star, MapPin, ExternalLink, ShieldCheck, MessageSquareQuote } from 'lucide-react';

interface GoogleBusinessWidgetProps {
  variant?: 'compact' | 'full';
  profileUrl?: string;
}

export const GoogleBusinessWidget: React.FC<GoogleBusinessWidgetProps> = ({
  variant = 'compact',
  profileUrl = 'https://maps.app.goo.gl/oZTn2h4Z6JtbudHb8'
}) => {
  if (variant === 'compact') {
    return (
      <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#D98E2B]/50 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          {/* Google G Symbol / Icon */}
          <div className="w-12 h-12 rounded-xl bg-white border border-[#D98E2B]/20 flex items-center justify-center p-2.5 shrink-0 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500">
              <span className="font-bold text-sm text-gray-900 mr-1">5.0</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
              ))}
              <span className="text-[11px] text-gray-500 ml-1 font-sans">(500+ Devotee Reviews)</span>
            </div>
            <h4 className="font-serif font-bold text-sm text-[#6B0F1A]">
              Pandit. Vinay Shastri (Guruji) — Google Business Profile
            </h4>
            <p className="text-[11px] text-gray-600 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3 h-3 text-[#B5121B]" />
              <span>Trimbakeshwar Village, Nashik</span>
            </p>
          </div>
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-[#6B0F1A] hover:bg-[#8F0E15] text-white font-bold text-xs border border-[#D98E2B] shadow flex items-center gap-1.5 shrink-0 transition-all"
        >
          <span>View Google Profile & Reviews</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#D98E2B]" />
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#D98E2B] shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D98E2B]/30 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#D98E2B]/30 flex items-center justify-center p-3 shrink-0 shadow">
            <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
          </div>
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold mb-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              Verified Google Business Listing
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#6B0F1A]">
              Pandit. Vinay Shastri (Guruji) Trimbakeshwar
            </h3>
            <div className="flex items-center gap-1 text-amber-500 text-xs mt-0.5">
              <span className="font-bold text-gray-900 mr-1">5.0 Star Rating</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
              ))}
              <span className="text-gray-500 ml-1">(500+ Verified Reviews)</span>
            </div>
          </div>
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-[#6B0F1A] hover:bg-[#8F0E15] text-[#F5E9D8] font-bold text-xs border border-[#D98E2B] shadow-md flex items-center justify-center gap-2 transition-all shrink-0"
        >
          <span>Open Google Business Profile</span>
          <ExternalLink className="w-4 h-4 text-[#D98E2B]" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/30 space-y-1">
          <p className="font-bold text-[#6B0F1A]">📍 Location</p>
          <p className="text-gray-700">Trimbakeshwar Kshetra, Nashik, Maharashtra 422212</p>
        </div>
        <div className="p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/30 space-y-1">
          <p className="font-bold text-[#6B0F1A]">⭐ Rating & Reviews</p>
          <p className="text-gray-700">5.0 Stars rated by devotees across India & international NRIs</p>
        </div>
        <div className="p-3 rounded-xl bg-[#FBF3E7] border border-[#D98E2B]/30 space-y-1">
          <p className="font-bold text-[#6B0F1A]">🙏 Authorised Purohit</p>
          <p className="text-gray-700">Serving Trimbakeshwar from past 3-4 generations</p>
        </div>
      </div>
    </div>
  );
};
