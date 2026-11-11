import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BilingualText } from './BilingualText';
import { ShoppingBag, Sparkles, ShieldCheck, Menu, X, ArrowRight, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    currentView,
    setCurrentView,
    setIsQuizOpen,
    isAdminLoggedIn,
    language,
    setLanguage,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E3DFD5] transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#2A4B37] text-[#EAF2EC] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3">
        <span>🌱 {language === 'vi' ? 'Thu gom 5 vỏ chai rỗng LUNARA - Nhận ngay Voucher 50.000đ & Tích điểm Sapo' : 'Recycle 5 Empty LUNARA Bottles - Get 50.000₫ Voucher & Sapo Points'}</span>
        <span className="hidden md:inline text-[#D4AF37]">·</span>
        <span className="hidden md:inline">100% {language === 'vi' ? 'Thuần Chay & Chứng nhận PETA' : 'Vegan & PETA Certified'}</span>
      </div>

      {/* Main Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none shrink-0"
        >
          <div className="w-9 h-9 rounded-full bg-[#2A4B37] text-[#FAF9F5] flex items-center justify-center shadow-xs">
            <span className="font-serif-brand text-xl font-bold italic">L</span>
          </div>
          <div>
            <span className="font-serif-brand text-2xl font-bold tracking-wider text-[#2A4B37] block leading-none">
              LUNARA
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#6E7B70] block font-medium mt-0.5">
              Vegan Cosmetics
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links with clean 0.875rem muted sub-text underneath */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#465348]">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`cursor-pointer transition-colors text-left hover:text-[#2A4B37] pb-1 ${
              currentView === 'home' ? 'text-[#2A4B37] font-semibold border-b-2 border-[#2A4B37]' : ''
            }`}
          >
            <BilingualText vi="Trang chủ" en="Home" primaryClassName="font-semibold text-sm leading-tight" />
          </button>

          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`cursor-pointer transition-colors text-left hover:text-[#2A4B37] pb-1 ${
              currentView === 'shop' ? 'text-[#2A4B37] font-semibold border-b-2 border-[#2A4B37]' : ''
            }`}
          >
            <BilingualText vi="Cửa hàng" en="Shop" primaryClassName="font-semibold text-sm leading-tight" />
          </button>

          <button
            onClick={() => {
              setCurrentView('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`cursor-pointer transition-colors text-left hover:text-[#2A4B37] pb-1 ${
              currentView === 'blog' ? 'text-[#2A4B37] font-semibold border-b-2 border-[#2A4B37]' : ''
            }`}
          >
            <BilingualText vi="Lối sống xanh & Blog" en="Green Lifestyle & Blog" primaryClassName="font-semibold text-sm leading-tight" />
          </button>

          <button
            onClick={() => {
              setCurrentView('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`cursor-pointer transition-colors text-left hover:text-[#2A4B37] pb-1 ${
              currentView === 'about' ? 'text-[#2A4B37] font-semibold border-b-2 border-[#2A4B37]' : ''
            }`}
          >
            <BilingualText vi="Về Lunara & Giá trị" en="About Lunara & Values" primaryClassName="font-semibold text-sm leading-tight" />
          </button>

          <button
            onClick={() => setIsQuizOpen(true)}
            className="cursor-pointer text-[#2A4B37] hover:text-[#1c3325] text-left pb-1 flex items-start gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] mt-1 shrink-0" />
            <BilingualText vi="Chẩn đoán da AI" en="AI Skin Diagnostic" primaryClassName="font-semibold text-sm leading-tight" />
          </button>
        </nav>

        {/* Zone 3: Language Toggle, Admin Portal & Cart */}
        <div className="flex items-center gap-3 shrink-0">
          {/* State-based Language Switcher (VN / EN) matching Cocoon aesthetics */}
          <div className="flex items-center rounded-lg border border-[#D5DCD6] bg-white p-0.5 text-xs font-semibold shadow-2xs">
            <button
              type="button"
              onClick={() => setLanguage('vi')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                language === 'vi'
                  ? 'bg-[#2A4B37] text-white shadow-xs font-bold'
                  : 'text-[#627366] hover:text-[#2A4B37]'
              }`}
              title="Chuyển sang Tiếng Việt"
              aria-label="Tiếng Việt"
            >
              VN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#2A4B37] text-white shadow-xs font-bold'
                  : 'text-[#627366] hover:text-[#2A4B37]'
              }`}
              title="Switch to English"
              aria-label="English"
            >
              EN
            </button>
          </div>

          {/* Admin CMS Access Button */}
          <button
            onClick={() => setCurrentView('admin')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              currentView === 'admin'
                ? 'bg-[#2A4B37] text-white border-[#2A4B37]'
                : 'bg-white/80 hover:bg-white text-[#2A4B37] border-[#D0D7D1]'
            }`}
            title={language === 'vi' ? 'Truy cập Cổng Quản trị Admin CMS (Sapo)' : 'Access Admin CMS (Sapo)'}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C29B38]" />
            <span className="hidden sm:inline font-semibold">
              {language === 'vi' ? 'Cổng Admin' : 'Admin Portal'}
            </span>
            <span className="sm:hidden">Admin</span>
            {isAdminLoggedIn && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Đã đăng nhập" />
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg bg-white border border-[#D5DCD6] text-[#2A4B37] hover:border-[#2A4B37] transition-all cursor-pointer shadow-2xs"
            aria-label={language === 'vi' ? 'Giỏ hàng' : 'Cart'}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#2A4B37] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#2A4B37] hover:bg-[#EAE7DC] cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E3DFD5] bg-[#FAF9F5] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between py-2 border-b border-[#E7E4DC]">
            <span className="text-xs text-[#5C6E60] font-medium">Ngôn ngữ / Language:</span>
            <div className="flex items-center rounded-lg border border-[#D5DCD6] bg-white p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage('vi')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  language === 'vi' ? 'bg-[#2A4B37] text-white font-bold' : 'text-[#627366]'
                }`}
              >
                VN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  language === 'en' ? 'bg-[#2A4B37] text-white font-bold' : 'text-[#627366]'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentView('home');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-[#2A4B37]"
          >
            <BilingualText vi="Trang chủ" en="Home" primaryClassName="font-semibold text-sm" />
          </button>

          <button
            onClick={() => {
              setCurrentView('shop');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-[#2A4B37]"
          >
            <BilingualText vi="Cửa hàng" en="Shop" primaryClassName="font-semibold text-sm" />
          </button>

          <button
            onClick={() => {
              setCurrentView('blog');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-[#2A4B37]"
          >
            <BilingualText vi="Lối sống xanh & Blog" en="Green Lifestyle & Blog" primaryClassName="font-semibold text-sm" />
          </button>

          <button
            onClick={() => {
              setCurrentView('about');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-[#2A4B37]"
          >
            <BilingualText vi="Về Lunara & Giá trị" en="About Lunara & Values" primaryClassName="font-semibold text-sm" />
          </button>

          <button
            onClick={() => {
              setIsQuizOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-medium text-[#C29B38] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <BilingualText vi="Chẩn đoán da AI" en="AI Skin Diagnostic" primaryClassName="font-semibold text-sm text-[#C29B38]" />
          </button>

          <button
            onClick={() => {
              setCurrentView('admin');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 py-2.5 px-3.5 text-sm font-medium bg-[#2A4B37] text-white rounded-lg flex items-center justify-between"
          >
            <span>{language === 'vi' ? 'Vào Cổng Quản trị Admin CMS' : 'Enter Admin CMS Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
