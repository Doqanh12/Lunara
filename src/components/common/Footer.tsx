import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Sparkles, Shield, Recycle, Mail, Phone, MapPin, Award, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsQuizOpen, setIsRecycleModalOpen, language } = useApp();

  return (
    <footer className="bg-[#1C2C22] text-[#E0E7E2] pt-16 pb-12 border-t border-[#2D4536]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Certification Logos & Trust Row */}
        <div className="border-b border-[#2D4536] pb-12 mb-12">
          <p className="text-center text-xs tracking-widest uppercase font-semibold text-[#B1C3B6] mb-6">
            {language === 'vi'
              ? 'Chứng nhận Tiêu chuẩn Quốc tế & Cam kết Đạo đức'
              : 'International Standards & Ethical Commitments'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-[#24392D]/70 border border-[#304B3B] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#304B3B] text-[#D4AF37] flex items-center justify-center mb-3">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-white text-sm">PETA Cruelty-Free</h4>
              <p className="text-xs text-[#A3B8A8] mt-1">
                {language === 'vi'
                  ? 'Cam kết 100% không thử nghiệm trên động vật'
                  : '100% Cruelty-free certified'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#24392D]/70 border border-[#304B3B] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#304B3B] text-[#D4AF37] flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-white text-sm">The Vegan Society</h4>
              <p className="text-xs text-[#A3B8A8] mt-1">
                {language === 'vi'
                  ? 'Chứng nhận thuần chay chuẩn quốc tế'
                  : 'Internationally certified vegan standard'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#24392D]/70 border border-[#304B3B] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#304B3B] text-[#D4AF37] flex items-center justify-center mb-3">
                <Recycle className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-white text-sm">Green Bottle Take-Back</h4>
              <p className="text-xs text-[#A3B8A8] mt-1">
                {language === 'vi'
                  ? 'Hệ thống thu hồi vỏ chai rỗng tái chế 100%'
                  : '100% circular bottle recycling program'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#24392D]/70 border border-[#304B3B] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#304B3B] text-[#D4AF37] flex items-center justify-center mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-white text-sm">GMP-ASEAN Standards</h4>
              <p className="text-xs text-[#A3B8A8] mt-1">
                {language === 'vi'
                  ? 'Sản xuất khép kín, an toàn cho da nhạy cảm'
                  : 'Cleanroom manufacturing, safe for sensitive skin'}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2D4536]">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1C2C22] flex items-center justify-center font-serif-brand font-bold">
                L
              </div>
              <span className="font-serif-brand text-2xl font-bold tracking-wider text-white">LUNARA</span>
            </div>
            <p className="text-sm text-[#A8BCAE] leading-relaxed">
              {language === 'vi'
                ? '"Luna" - Vầng trăng thanh bình và nhịp điệu tái tạo. "Nara" - Sự tinh khiết và mầm sống xanh. LUNARA là người bạn đồng hành dịu lành cho làn da khỏe mạnh và lối sống có trách nhiệm.'
                : '"Luna" - The peaceful moon and gentle renewal. "Nara" - Pristine purity and green vitality. LUNARA is your gentle companion for healthy skin and mindful living.'}
            </p>
            <div className="pt-2">
              <span className="text-xs text-[#D4AF37] font-medium block">
                ★ 100% Organic Wrinkle Cosmetics · For your vegan beauty
              </span>
            </div>
          </div>

          {/* Sapo Omnichannel & Cửa hàng */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              {language === 'vi' ? 'Cửa hàng & Danh mục' : 'Shop & Products'}
            </h4>
            <ul className="space-y-3 text-sm text-[#A8BCAE]">
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  <span className="font-medium text-white hover:underline">
                    {language === 'vi' ? 'Tẩy tế bào chết Nha đam' : 'Aloe Vera Scrub'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  <span className="font-medium text-white hover:underline">
                    {language === 'vi' ? 'Tinh chất Hoa cúc' : 'Chamomile Serum'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  <span className="font-medium text-white hover:underline">
                    {language === 'vi' ? 'Nước hoa hồng Trà xanh' : 'Green tea toner'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  <span className="font-medium text-white hover:underline">
                    {language === 'vi' ? 'Kem chống nắng phổ rộng' : 'Sun Veil SPF 50+'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  <span className="font-medium text-white hover:underline">
                    {language === 'vi' ? 'Kem dưỡng chống nhăn ban đêm' : 'GreenCalm Night Cream'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Dịch vụ & Trải nghiệm */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              {language === 'vi' ? 'Dịch vụ & Trải nghiệm' : 'Services & Experience'}
            </h4>
            <ul className="space-y-3 text-sm text-[#A8BCAE]">
              <li>
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-medium text-white hover:underline">
                    {language === 'vi' ? 'Trắc nghiệm chẩn đoán da AI' : 'AI Skin Diagnostic'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsRecycleModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  <span className="font-medium text-white hover:underline">
                    {language === 'vi' ? 'Đăng ký gửi vỏ chai rỗng' : 'Empty Bottle Recycling'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('blog')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  <span className="font-medium text-white hover:underline">
                    {language === 'vi' ? 'Góc Lối Sống Xanh & Bài Viết Mới' : 'Green Lifestyle & Blog'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  <span className="font-medium text-white hover:underline">
                    {language === 'vi' ? 'Về Lunara & Giá trị cốt lõi' : 'About Lunara & Core Values'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="text-[#D4AF37] hover:underline cursor-pointer text-left block font-medium"
                >
                  {language === 'vi' ? 'Cổng Quản trị Admin CMS' : 'Admin CMS Portal'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              {language === 'vi' ? 'Liên hệ & Hỗ trợ' : 'Contact & Support'}
            </h4>
            <div className="flex items-center gap-2.5 text-sm text-[#A8BCAE]">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Hotline 24/7: 1234-1900</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-[#A8BCAE]">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Luanracustomer@gmail.com</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-[#A8BCAE]">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Hà Nội & TP. Hồ Chí Minh, Việt Nam</span>
            </div>
            <div className="pt-2 text-xs text-[#879C8E]">
              {language === 'vi'
                ? 'Vận chuyển hỏa tốc toàn quốc qua đối tác Viettel Post & J&T Express.'
                : 'Express nationwide delivery via Viettel Post & J&T Express.'}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#879C8E] gap-4">
          <p>
            {language === 'vi'
              ? '© 2026 LUNARA Vegan Cosmetics. Tất cả các quyền được bảo lưu.'
              : '© 2026 LUNARA Vegan Cosmetics. All rights reserved.'}
          </p>
          <div className="flex items-center gap-6">
            <span>{language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}</span>
            <span>·</span>
            <span>{language === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}</span>
            <span>·</span>
            <span>{language === 'vi' ? 'Minh bạch thành phần PIF' : 'PIF Transparency'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
