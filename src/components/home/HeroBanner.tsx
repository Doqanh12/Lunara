import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles, Check, Leaf } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setCurrentView, setIsQuizOpen, language } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7F4] via-[#FAF9F5] to-[#FAF9F5] pt-12 pb-20 md:py-24 border-b border-[#E7E4DC]">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#E5EFE8]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-[#F5EEDC]/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Value proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Subtle Kicker / Brand Statement */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-[#3D634C] tracking-widest uppercase">
              <Leaf className="w-4 h-4 text-[#C29B38]" />
              <span>For your vegan beauty</span>
              <span className="text-[#A7B9AB]" aria-hidden="true">·</span>
              <span>100% Plant-Based Certified</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1F3325] leading-[1.15] text-balance">
              100% Organic <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#2A4B37]">Wrinkle Cosmetics</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#526356] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {language === 'vi' ? (
                <>
                  Lấy cảm hứng từ sự thanh bình của vầng trăng <strong className="font-medium text-[#2A4B37]">Luna</strong> và mầm sống xanh tinh khiết <strong className="font-medium text-[#2A4B37]">Nara</strong>. Công thức mỹ phẩm thuần chay giải phóng làn da nhạy cảm khỏi hóa chất tổng hợp, đẩy lùi nếp nhăn bằng thảo mộc bản địa Việt Nam.
                </>
              ) : (
                <>
                  Inspired by the tranquility of the moon <strong className="font-medium text-[#2A4B37]">Luna</strong> and pure green life <strong className="font-medium text-[#2A4B37]">Nara</strong>. 100% vegan formulations freeing sensitive skin from synthetic chemicals, reducing wrinkles with native Vietnamese botanicals.
                </>
              )}
            </p>

            {/* Quick trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#405043]">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#E4EFE7] text-[#2A4B37] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>PETA Cruelty-Free</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#E4EFE7] text-[#2A4B37] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>The Vegan Society</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#E4EFE7] text-[#2A4B37] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{language === 'vi' ? 'Dịu lành cho da nhạy cảm' : 'Gentle for Sensitive Skin'}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setCurrentView('shop')}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#2A4B37] hover:bg-[#1E3728] text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>{language === 'vi' ? 'Khám phá Cửa hàng' : 'Explore Shop'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#F2EFE8] text-[#2A4B37] border border-[#CBD5CD] font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#C29B38]" />
                <span>{language === 'vi' ? 'Trắc nghiệm Chẩn đoán Da' : 'AI Skin Diagnostic'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Campaign Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl bg-white p-4 shadow-xl border border-[#E5E2D8]">
              {/* Image banner */}
              <div className="relative overflow-hidden rounded-2xl aspect-4/3 bg-[#EAF0EB]">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80"
                  alt="LUNARA Organic Vegan Skincare Line"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#E3EDE5] font-medium">
                    {language === 'vi' ? 'Bản sắc thiên nhiên' : 'Natural Heritage'}
                  </span>
                  <p className="font-serif-brand text-2xl font-bold leading-tight">
                    {language === 'vi' ? 'Dầu dừa Bến Tre & Trà xanh Thái Nguyên' : 'Bến Tre Coconut & Thái Nguyên Green Tea'}
                  </p>
                </div>
              </div>

              {/* Trust Badge Bar */}
              <div className="mt-4 pt-3 border-t border-[#F0ECE2] flex items-center justify-between text-xs text-[#526356] px-2">
                <span className="font-medium text-[#2A4B37]">
                  {language === 'vi' ? 'Cam kết 100% hữu cơ' : '100% Organic Commitment'}
                </span>
                <span className="text-[#C29B38] font-serif-brand italic font-semibold">
                  {language === 'vi' ? 'Thuần khiết & Minh bạch' : 'Pure & Transparent'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
