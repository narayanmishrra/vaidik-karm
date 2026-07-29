import React, { useState, useEffect, useRef } from 'react';
import { MessageSquareText, X, Send, Sparkles, ShieldCheck, Bot, Calendar, MessageSquare } from 'lucide-react';
import { Language } from '../types';

interface LiveChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
  onOpenWhatsApp?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  isOpen,
  onClose,
  lang = 'en',
  onOpenWhatsApp
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Bilingual labels
  const labels = {
    headerName: 'Pandit. Vinay Shastri (Guruji)',
    liveStatus: lang === 'hi' ? 'लाइव चैट सक्रिय • त्र्यंबकेश्वर' : 'Live Chat Active • Trimbakeshwar',
    tawkStrip: lang === 'hi' ? 'लाइव चैट — पेज पर रहें' : 'Tawk.to Live Chat — Stay on page',
    typingText: lang === 'hi' ? 'गुरुजी टाइप कर रहे हैं...' : 'Guruji is typing response...',
    placeholder: lang === 'hi' ? 'यहाँ अपना संदेश लिखें...' : 'Type message here...',
    pujaDatesPill: lang === 'hi' ? 'मुहूर्त तिथि' : 'Puja Dates',
    kaalsarpPill: lang === 'hi' ? '🐍 कालसर्प दोष' : '🐍 Kaalsarp Dosh',
    narayanPill: lang === 'hi' ? '🚩 नारायण नागबली' : '🚩 Narayan Nagbali'
  };

  // Initialize initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: lang === 'hi'
          ? 'प्रणाम! हरि ओम 🙏 पं. विनय शास्त्री (गुरुजी) के आधिकारिक लाइव चैट में आपका स्वागत है। आप त्रिंबकेश्वर पूजा, कालसर्प दोष, नारायण नागबली या शुभ मुहूर्त के बारे में क्या जानना चाहते हैं?'
          : 'Pranam! Hari Om 🙏 Welcome to Pandit. Vinay Shastri (Guruji)\'s Live Chat. How can I assist you with Puja booking, Kaalsarp Dosh, Narayan Nagbali, or Mahurat dates at Trimbakeshwar today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [lang]);

  // Load Tawk.to script smoothly in background
  useEffect(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/66a000000000000000000000/1i3tawk01';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsTyping(true);

    // Simulate Guruji's live response
    setTimeout(() => {
      let responseText = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('date') || lower.includes('mahurat') || lower.includes('तारीख') || lower.includes('मुहूर्त')) {
        responseText = lang === 'hi'
          ? 'शुभ मुहूर्त हेतु कृपया अपनी जन्म तिथि, समय एवं आने का अनुमानित दिन बताएं। पं. विनय शास्त्री (गुरुजी) व्यक्तिगत रूप से आपकी कुंडली देखकर सर्वोत्तम तारीख का सुझाव देंगे।'
          : 'For auspicious Mahurat dates, please share your preferred travel window or birth details. Pt. Vinay Shastri (Guruji) will personally check the Shastra calendar for you.';
      } else if (lower.includes('kaalsarp') || lower.includes('कालसर्प')) {
        responseText = lang === 'hi'
          ? 'कालसर्प दोष शांति पूजा त्रिंबकेश्वर क्षेत्र पर 1 दिन (3-4 घंटे) में शुद्ध तांबे/चांदी के नाग-नागिन जोड़ों के साथ संपन्न होती है।'
          : 'Kaalsarp Dosh Shanti Puja is completed in 1 day (3-4 hours) at Trimbakeshwar Kshetra with silver Nag-Nagin pairs and pure Vedic mantras.';
      } else if (lower.includes('narayan') || lower.includes('नागबली')) {
        responseText = lang === 'hi'
          ? 'नारायण नागबली विधि 3 दिवसीय पवित्र अनुष्ठान है। इसके लिए सफेद धोती/सोला वस्त्र आवश्यक हैं। रहने एवं भोजन की संपूर्ण व्यवस्था गुरुजी द्वारा की जाती है।'
          : 'Narayan Nagbali is a 3-day sacred ritual for pitru dosh and lineage peace. Lodging and pure Samagri arrangements are managed directly by Guruji.';
      } else {
        responseText = lang === 'hi'
          ? 'धन्यवाद! आपका संदेश प्राप्त हो गया है। गुरुजी या हमारी पुरोहित टीम शीघ्र ही आपके प्रश्न का उत्तर देगी। आप नीचे दिए गए बटन से सीधे व्हाट्सएप पर भी बात कर सकते हैं।'
          : 'Hari Om! Thank you for your inquiry. Pandit. Vinay Shastri (Guruji) or our purohit office will guide you shortly. You can also connect directly on WhatsApp or call us.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] max-w-[400px] h-[520px] bg-white rounded-2xl shadow-2xl border-2 border-[#D98E2B] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
      {/* Header */}
      <div className="bg-[#6B0F1A] text-[#F5E9D8] p-3.5 border-b border-[#D98E2B]/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/images/vinay_shastri.jpg"
              alt="Pandit Vinay Shastri"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#D98E2B]"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#6B0F1A] rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm text-[#F5E9D8] leading-tight">
              {labels.headerName}
            </h3>
            <p className="text-[11px] text-emerald-300 flex items-center gap-1 font-sans">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{labels.liveStatus}</span>
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/10 text-[#D98E2B] transition-colors"
          title="Close Live Chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tawk.to Info Strip */}
      <div className="bg-[#FBF3E7] px-3 py-1.5 border-b border-[#D98E2B]/30 flex items-center justify-between text-[11px] text-[#6B0F1A]">
        <span className="flex items-center gap-1 font-semibold">
          <Sparkles className="w-3 h-3 text-[#D98E2B]" />
          <span>{labels.tawkStrip}</span>
        </span>
        {onOpenWhatsApp && (
          <button
            onClick={() => {
              onClose();
              onOpenWhatsApp();
            }}
            className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3" />
            <span>WhatsApp</span>
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-stone-50 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl shadow-sm leading-relaxed ${msg.sender === 'user'
                ? 'bg-[#6B0F1A] text-white rounded-br-none border border-[#D98E2B]/40'
                : 'bg-white text-gray-800 rounded-bl-none border border-stone-200 shadow'
                }`}
            >
              <p>{msg.text}</p>
              <span
                className={`text-[9px] mt-1 block text-right font-mono ${msg.sender === 'user' ? 'text-[#D98E2B]/80' : 'text-gray-400'
                  }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-gray-500 italic text-[11px] p-2 bg-white rounded-xl w-max border border-stone-200">
            <Bot className="w-3.5 h-3.5 text-[#6B0F1A] animate-spin" />
            <span>{labels.typingText}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Option Pills */}
      <div className="px-3 py-2 bg-white border-t border-stone-200 flex flex-wrap gap-1.5 shrink-0">
        <button
          onClick={() => handleSend(lang === 'hi' ? 'पूजा तिथि और मुहूर्त की जानकारी दें' : 'Please provide Puja Mahurat dates')}
          className="px-2.5 py-1 rounded-full bg-[#F3E6D3] hover:bg-[#6B0F1A] text-[#6B0F1A] hover:text-white text-[11px] font-semibold border border-[#D98E2B]/40 transition-all flex items-center gap-1"
        >
          <Calendar className="w-3 h-3 text-[#D98E2B]" />
          <span>{labels.pujaDatesPill}</span>
        </button>

        <button
          onClick={() => handleSend(lang === 'hi' ? 'कालसर्प दोष शांति पूजा का विवरण और खर्च' : 'Kaalsarp Dosh Shanti details and cost')}
          className="px-2.5 py-1 rounded-full bg-[#F3E6D3] hover:bg-[#6B0F1A] text-[#6B0F1A] hover:text-white text-[11px] font-semibold border border-[#D98E2B]/40 transition-all"
        >
          {labels.kaalsarpPill}
        </button>

        <button
          onClick={() => handleSend(lang === 'hi' ? 'नारायण नागबली 3 दिवसीय पूजा विधि' : 'Narayan Nagbali 3-day Puja procedure')}
          className="px-2.5 py-1 rounded-full bg-[#F3E6D3] hover:bg-[#6B0F1A] text-[#6B0F1A] hover:text-white text-[11px] font-semibold border border-[#D98E2B]/40 transition-all"
        >
          {labels.narayanPill}
        </button>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={labels.placeholder}
          className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#6B0F1A]"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-[#6B0F1A] hover:bg-[#8F0E15] text-[#D98E2B] transition-colors"
          title="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
