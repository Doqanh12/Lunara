import React from 'react';
import { HeartHandshake, Eye, RefreshCw, ShieldCheck, Sparkles, Sprout } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BilingualText } from '../common/BilingualText';

export const PillarsSection: React.FC = () => {
  const { setCurrentView, language } = useApp();

  const pillars = [
    {
      icon: HeartHandshake,
      title: 'Vẻ Đẹp Có Đạo Đức',
      english: 'Ethical Beauty',
      descriptionVi: 'Tuyệt đối không thử nghiệm trên động vật. Được bảo chứng bởi chứng nhận PETA và The Vegan Society, tôn trọng mọi sinh mệnh và hệ sinh thái tự nhiên.',
      descriptionEn: 'Strictly cruelty-free. Certified by PETA and The Vegan Society, respecting every sentient life and our natural ecosystems.',
      accent: '#2A4B37',
    },
    {
      icon: Eye,
      title: 'Minh Bạch Nguồn Gốc',
      english: 'Transparency',
      descriptionVi: 'Công khai 100% bảng thành phần INCI, tỷ lệ chiết xuất hữu cơ và hồ sơ thông tin sản phẩm (PIF). Mã QR trên từng chai để tra cứu nguồn gốc nông sản Bến Tre & Thái Nguyên.',
      descriptionEn: '100% transparent INCI ingredient list, organic extract percentages, and PIF files. Traceable QR code on every bottle.',
      accent: '#3D634C',
    },
    {
      icon: RefreshCw,
      title: 'Phát Triển Bền Vững',
      english: 'Sustainability',
      descriptionVi: 'Chương trình Green Bottle Take-Back thu hồi chai lọ rỗng, bao bì tự phân hủy FSC từ Kapac & SCG, cùng công nghệ Waterless giảm thiểu phát thải carbon khi vận chuyển.',
      descriptionEn: 'Green Bottle Take-Back recycling, FSC biodegradable packaging from Kapac & SCG, and waterless formulation reducing carbon footprint.',
      accent: '#C29B38',
    },
    {
      icon: ShieldCheck,
      title: 'An Toàn Cho Da',
      english: 'Skin Safety',
      descriptionVi: 'Phát triển chuyên biệt cho 35% người tiêu dùng Việt có làn da nhạy cảm. Công thức 100% không paraben, không hương liệu tổng hợp, đạt chuẩn GMP-ASEAN.',
      descriptionEn: 'Specially engineered for sensitive skin. 100% free of parabens and synthetic fragrances, compliant with GMP-ASEAN standards.',
      accent: '#2A4B37',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF9F5] border-b border-[#E7E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#3D634C] tracking-widest uppercase mb-3">
            <Sprout className="w-4 h-4 text-[#C29B38]" />
            <span>
              {language === 'vi' ? '4 Trụ Cột Triết Lý LUNARA' : '4 Pillars of LUNARA Philosophy'}
            </span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-medium text-[#1F3325] tracking-tight">
            {language === 'vi'
              ? 'Vẻ đẹp bền vững khởi nguồn từ sự tử tế'
              : 'Sustainable Beauty Rooted in Kindness'}
          </h2>
          <p className="mt-4 text-base text-[#526356] leading-relaxed">
            {language === 'vi'
              ? 'Chúng tôi định nghĩa lại chuẩn mực chăm sóc sắc đẹp: Chăm sóc bản thân không bao giờ được đánh đổi bằng sự tổn hại của làn da hay môi trường sống.'
              : 'We redefine self-care standards: Caring for yourself should never come at the expense of skin health or our living planet.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-2xl bg-white border border-[#E5E2D8] hover:border-[#3D634C] transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F5F1] text-[#2A4B37] group-hover:bg-[#2A4B37] group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif-brand text-xl font-bold text-[#1F3325] mb-3">
                    {language === 'vi' ? pillar.title : pillar.english}
                  </h3>
                  <p className="text-sm text-[#5D6F61] leading-relaxed">
                    {language === 'vi' ? pillar.descriptionVi : pillar.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Story Snippet - Luna & Nara */}
        <div className="mt-16 rounded-3xl bg-[#EAF2EC] border border-[#D5E4D9] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-[#2A4B37] uppercase block">
              {language === 'vi' ? 'Câu Chuyện Thương Hiệu' : 'Our Brand Story'}
            </span>
            <h3 className="font-serif-brand text-2xl md:text-3xl font-bold text-[#1F3325]">
              {language === 'vi'
                ? 'Ý nghĩa tên gọi LUNARA: Hòa điệu cùng thiên nhiên'
                : 'The Meaning of LUNARA: In Harmony with Nature'}
            </h3>
            <p className="text-sm md:text-base text-[#465B4C] leading-relaxed">
              {language === 'vi' ? (
                <>
                  <strong>"Luna"</strong> – biểu tượng mặt trăng, mang lại cảm giác thanh bình, sự tái tạo tế bào trong tĩnh lặng. <br />
                  <strong>"Nara"</strong> – mầm non tinh khiết, tượng trưng cho sức sống mãnh liệt và vẻ đẹp thuần khiết không tì vết.
                </>
              ) : (
                <>
                  <strong>"Luna"</strong> – the serene moon, symbolizing tranquility and quiet overnight cellular renewal. <br />
                  <strong>"Nara"</strong> – the pure green sprout, representing vibrant resilience and unblemished botanical purity.
                </>
              )}
            </p>
          </div>
          <button
            onClick={() => setCurrentView('about')}
            className="px-6 py-3 bg-[#2A4B37] hover:bg-[#1E3728] text-white text-sm font-medium rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            {language === 'vi' ? 'Đọc toàn bộ câu chuyện' : 'Read Full Story'}
          </button>
        </div>
      </div>
    </section>
  );
};
