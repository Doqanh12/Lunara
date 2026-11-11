import React from 'react';
import { useApp } from '../../context/AppContext';
import { BilingualText } from '../common/BilingualText';
import {
  ShieldCheck,
  Sparkles,
  Heart,
  Award,
  CheckCircle,
  Leaf,
  Globe,
  ArrowRight,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { brandDesign, products, addToCart, setIsCartOpen, setCurrentView, setSelectedProduct, language } = useApp();

  const spotlightProduct = products.find(p => p.id === brandDesign.spotlightProductId) || products[1] || products[0];

  const handleBuySpotlight = () => {
    if (spotlightProduct) {
      addToCart(spotlightProduct, 1);
      setIsCartOpen(true);
    }
  };

  const handleOpenSpotlightDetail = () => {
    if (spotlightProduct) {
      setSelectedProduct(spotlightProduct);
    }
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#26332A] pb-20">
      {/* 1. Cocoon Top Announcement Strip */}
      <div className="bg-[#1C2C22] text-[#EAF2EC] text-xs py-2.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span>
          {language === 'vi'
            ? 'Tận hưởng giao hàng miễn phí toàn quốc với hoá đơn từ 99.000 ₫'
            : 'Enjoy free nationwide delivery on orders from 99.000 ₫'}
        </span>
        <span className="text-[#C29B38] font-bold">
          · {language === 'vi' ? 'Mỹ phẩm thuần chay 100% hữu cơ' : '100% Organic Vegan Cosmetics'}
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-16">
        {/* Navigation Breadcrumb / Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2A4B37] tracking-widest uppercase">
            <Leaf className="w-4 h-4 text-[#C29B38]" />
            <span>
              {language === 'vi'
                ? 'Thương Hiệu Mỹ Phẩm Thuần Chay LUNARA'
                : 'LUNARA Vegan Cosmetics Brand'}
            </span>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs text-[#2A4B37] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'vi' ? 'Đến Cửa Hàng' : 'Go to Shop'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ========================================================
            BLOCK 1: COCOON FLOATING CARD (Theo mẫu image_8e4ffaa6.png)
           ======================================================== */}
        {(brandDesign.displayLayout === 'cocoon_both' || brandDesign.displayLayout === 'cocoon_card') && (
          <div className="relative rounded-3xl overflow-hidden min-h-[520px] flex items-center justify-center p-6 sm:p-12 shadow-md border border-[#E7E4DC]">
            {/* Background: Native Vietnamese crops & white bunny figurines */}
            <img
              src={brandDesign.philosophyBgImage || '/assets/aistudio/image_8e4ffaa6.png'}
              alt="Nông sản đặc hữu Việt Nam và cam kết nhân đạo LUNARA"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Soft dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-black/25" />

            {/* Floating Card centered in the middle */}
            <div
              className={`relative z-10 max-w-2xl w-full bg-[#FAF9F5]/96 backdrop-blur-md rounded-3xl p-8 sm:p-12 text-center card-depth-cocoon border border-white/80 space-y-6 ${
                brandDesign.enableFloatingMotion ? 'animate-float-gentle' : ''
              }`}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-[#EAF2EC] text-[#2A4B37] text-[10px] font-bold tracking-widest uppercase">
                {brandDesign.cardBadgeText || 'LUNARA ORIGINAL VIETNAM'}
              </div>

              {/* Editorial Title */}
              <h1 className="font-serif-brand text-3xl sm:text-5xl font-bold text-[#1F3325] leading-tight tracking-tight">
                {language === 'vi' ? (
                  <>
                    <span className="italic font-normal">Triết lý</span>{' '}
                    <span className="font-sans font-extrabold uppercase tracking-wider text-2xl sm:text-4xl text-[#1E3527]">
                      THƯƠNG HIỆU
                    </span>
                  </>
                ) : (
                  <>
                    <span className="italic font-normal">Brand</span>{' '}
                    <span className="font-sans font-extrabold uppercase tracking-wider text-2xl sm:text-4xl text-[#1E3527]">
                      PHILOSOPHY
                    </span>
                  </>
                )}
              </h1>

              {/* Philosophy Paragraph */}
              <p className="text-sm sm:text-base text-[#465A4A] leading-relaxed max-w-xl mx-auto font-normal">
                {language === 'vi'
                  ? brandDesign.philosophyDescription
                  : 'As nature lovers passionate about discovering Vietnam\'s endemic botanical resources, we steadfastly adhere to our core philosophy on the journey to uncovering true skin health.'}
              </p>

              {/* CTA button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('pillars-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 bg-[#1F3325] hover:bg-[#2A4B37] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <span>{language === 'vi' ? 'TÌM HIỂU THÊM' : 'LEARN MORE'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Badges footer */}
              <div className="pt-4 border-t border-[#E5E1D8] flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#55695A]">
                {brandDesign.showPetaBadge && (
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Heart className="w-3.5 h-3.5 text-[#C29B38]" />
                    <span>PETA Cruelty-Free & Animal-Test Free</span>
                  </span>
                )}
                {brandDesign.showVeganSocietyBadge && (
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#2A4B37]" />
                    <span>The Vegan Society Certified</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            BLOCK 2: COCOON 3-COLUMN SPOTLIGHT (Theo mẫu image_9f7d347a.png)
           ======================================================== */}
        {(brandDesign.displayLayout === 'cocoon_both' || brandDesign.displayLayout === 'cocoon_spotlight') && spotlightProduct && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E4DC] shadow-xs relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F2F7F4] rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Column 1: Editorial Title */}
              <div className="md:col-span-4 text-left space-y-3">
                <span className="text-xs font-bold text-[#C29B38] tracking-widest uppercase block">
                  {language === 'vi' ? 'Chiết xuất bản địa Việt Nam' : 'Native Vietnamese Botanicals'}
                </span>
                <h2 className="font-serif-brand text-3xl sm:text-5xl font-bold text-[#1F3325] leading-tight">
                  {language === 'vi'
                    ? (brandDesign.spotlightCustomTitle || spotlightProduct.nameVi || spotlightProduct.name)
                    : (spotlightProduct.nameEn || spotlightProduct.name)}
                </h2>
                <div className="flex items-center gap-2 pt-2">
                  <span className="px-2.5 py-1 bg-[#EAF2EC] text-[#2A4B37] text-xs font-bold rounded-lg font-mono">
                    {spotlightProduct.volume}
                  </span>
                  <span className="text-xs text-[#7A8B7E]">
                    {language === 'vi' ? '100% Thuần chay hữu cơ' : '100% Organic Vegan'}
                  </span>
                </div>
                <p className="text-xs text-[#6A7F70] italic pt-1">
                  {language === 'vi'
                    ? 'Đặc chế chuyên biệt cho làn da nhạy cảm & xóa mờ nếp nhăn sớm không gây kích ứng.'
                    : 'Engineered specifically for sensitive skin & gently reducing early wrinkles.'}
                </p>
              </div>

              {/* Column 2: 3D Depth Product Center with Parallax / Floating elements */}
              <div className="md:col-span-4 flex justify-center relative py-6">
                {/* Floating organic bubble / leaf accents for depth */}
                {brandDesign.enableFloatingMotion && (
                  <>
                    <div className="absolute top-2 left-6 w-8 h-8 rounded-full bg-emerald-100/70 border border-emerald-200/50 blur-[0.5px] animate-float-gentle -z-0" />
                    <div className="absolute bottom-4 right-8 w-12 h-12 rounded-full bg-amber-100/60 border border-amber-200/40 blur-[0.5px] animate-float-reverse -z-0" />
                    <div className="absolute top-1/3 -right-2 text-emerald-800/40 text-xl font-serif animate-float-gentle">
                      🍃
                    </div>
                  </>
                )}

                {/* Main Product Container */}
                <div
                  onClick={handleOpenSpotlightDetail}
                  className={`relative z-10 w-52 sm:w-60 h-72 sm:h-80 cursor-pointer group transition-transform duration-500 hover:scale-105 ${
                    brandDesign.enableFloatingMotion ? 'animate-float-reverse' : ''
                  }`}
                >
                  <img
                    src={spotlightProduct.imageUrl}
                    alt={spotlightProduct.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(30,53,39,0.22)] rotate-3 group-hover:rotate-0 transition-transform duration-500"
                  />
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap">
                    {language === 'vi' ? 'Nhấp để xem chi tiết' : 'Click to view details'}
                  </span>
                </div>
              </div>

              {/* Column 3: Efficacy description & Action */}
              <div className="md:col-span-4 space-y-5 text-left">
                <p className="text-xs sm:text-sm text-[#4E5E52] leading-relaxed">
                  {brandDesign.spotlightCustomDescription || spotlightProduct.detailedDescription}
                </p>

                <div className="space-y-2 border-t border-[#EFECE4] pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#1F3325] tabular-nums">
                      {spotlightProduct.price.toLocaleString('vi-VN')} ₫
                    </span>
                    {spotlightProduct.originalPrice && (
                      <span className="text-xs text-[#9DAFA2] line-through tabular-nums">
                        {spotlightProduct.originalPrice.toLocaleString('vi-VN')} ₫
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={handleBuySpotlight}
                      className="px-6 py-2.5 bg-[#2A4B37] hover:bg-[#1E3728] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? 'MUA NGAY →' : 'BUY NOW →'}</span>
                    </button>

                    <button
                      onClick={handleOpenSpotlightDetail}
                      className="px-4 py-2.5 border border-[#D5DCD6] hover:bg-[#F2F7F4] text-[#2A4B37] text-xs font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      {language === 'vi' ? 'Xem chi tiết' : 'View details'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            BLOCK 3: CÂU CHUYỆN LUNA & NARA (Triết lý Danh Xưng)
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E7E4DC] shadow-xs space-y-5">
            <span className="text-xs font-bold text-[#C29B38] uppercase tracking-wider block">
              {language === 'vi' ? 'Triết Lý Danh Xưng Thương Hiệu' : 'Brand Naming Philosophy'}
            </span>
            <h3 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#1F3325]">
              {language === 'vi' ? 'Sự Hòa Điệu Giữa "Luna" và "Nara"' : 'The Harmony Between "Luna" & "Nara"'}
            </h3>
            <p className="text-sm text-[#4E5E52] leading-relaxed">
              {language === 'vi' ? (
                <>
                  <strong>Luna – Vầng trăng:</strong> Đại diện cho sự thanh bình, tái tạo và nhịp điệu tĩnh lặng của thiên nhiên ban đêm — khoảng thời gian vàng để làn da phục hồi tế bào và làm mờ các nếp nhăn.
                </>
              ) : (
                <>
                  <strong>Luna – The Moon:</strong> Representing serenity, overnight regeneration, and nature’s tranquil rhythm — the golden hour when skin cells restore and soften lines.
                </>
              )}
            </p>
            <p className="text-sm text-[#4E5E52] leading-relaxed">
              {language === 'vi' ? (
                <>
                  <strong>Nara – Mầm sống xanh:</strong> Tượng trưng cho sự thuần khiết, tươi mới và sức sống bền bỉ của cây cỏ thực vật bản địa Việt Nam.
                </>
              ) : (
                <>
                  <strong>Nara – The Green Sprout:</strong> Symbolizing pristine purity, fresh vitality, and the enduring resilience of native Vietnamese botanicals.
                </>
              )}
            </p>
            <p className="text-sm text-[#4E5E52] leading-relaxed italic border-l-3 border-[#2A4B37] pl-4 py-1.5 bg-[#F6FAF7] rounded-r-xl">
              {language === 'vi'
                ? '"LUNARA không chỉ tạo ra mỹ phẩm thuần chay hữu cơ, mà còn lan tỏa lối sống hòa ái với thiên nhiên, không làm tổn hại đến bất kỳ sinh linh nào."'
                : '"LUNARA not only crafts organic vegan skincare, but also inspires a harmonious lifestyle with nature, never harming any sentient life."'}
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg border border-[#E7E4DC] aspect-4/3 bg-[#F0F5F1] relative group">
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
              alt="Đồi trà xanh Thái Nguyên LUNARA"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <span className="text-white text-xs font-medium">
                {language === 'vi'
                  ? 'Vùng nguyên liệu Trà Xanh hữu cơ Thái Nguyên đạt chuẩn GlobalGAP của LUNARA'
                  : 'LUNARA GlobalGAP certified organic green tea plantation in Thái Nguyên'}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            BLOCK 4: 4 TRỤ CỘT ĐẠO ĐỨC & GIÁ TRỊ CỐT LÕI (Pillars)
           ======================================================== */}
        <div id="pillars-section" className="space-y-8 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#C29B38] uppercase tracking-wider">
              {brandDesign.pillarsHeadline || (language === 'vi' ? '4 Trụ Cột Giá Trị Cốt Lõi' : '4 Core Value Pillars')}
            </span>
            <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#1F3325]">
              {language === 'vi' ? 'Cam Kết Đạo Đức Vì Con Người & Hành Tinh' : 'Ethical Commitment to People & Planet'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7E4DC] hover:border-[#2A4B37] transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] text-[#2A4B37] flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 text-[#C29B38]" />
              </div>
              <h3 className="font-bold text-sm text-[#1F3325]">
                {language === 'vi' ? '1. Vẻ Đẹp Có Đạo Đức' : '1. Ethical Beauty'}
              </h3>
              <p className="text-xs text-[#5D6F61] leading-relaxed">
                {language === 'vi'
                  ? 'Chứng nhận PETA và The Vegan Society. Tuyệt đối 100% không thử nghiệm trên động vật và không dùng dẫn xuất từ động vật.'
                  : 'Certified by PETA and The Vegan Society. Strictly 100% cruelty-free and zero animal-derived ingredients.'}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7E4DC] hover:border-[#2A4B37] transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] text-[#2A4B37] flex items-center justify-center font-bold">
                <CheckCircle className="w-5 h-5 text-[#2A4B37]" />
              </div>
              <h3 className="font-bold text-sm text-[#1F3325]">
                {language === 'vi' ? '2. Minh Bạch Nguồn Gốc' : '2. 100% INCI Transparency'}
              </h3>
              <p className="text-xs text-[#5D6F61] leading-relaxed">
                {language === 'vi'
                  ? 'Công khai 100% bảng thành phần INCI, nồng độ hoạt chất và hồ sơ thông tin sản phẩm (PIF) đã được cơ quan y tế kiểm định.'
                  : '100% transparent INCI disclosure, active percentages, and Product Information Files (PIF).'}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7E4DC] hover:border-[#2A4B37] transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] text-[#2A4B37] flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5 text-[#2A4B37]" />
              </div>
              <h3 className="font-bold text-sm text-[#1F3325]">
                {language === 'vi' ? '3. Phát Triển Bền Vững' : '3. Eco-Friendly Sustainability'}
              </h3>
              <p className="text-xs text-[#5D6F61] leading-relaxed">
                {language === 'vi'
                  ? 'Chiến dịch Green Bottle Take-Back thu gom vỏ chai rỗng tái chế, bao bì giấy đạt chuẩn FSC và bảo vệ rạn san hô Reef-Safe.'
                  : 'Green Bottle Take-Back bottle recycling, FSC paper packaging, and reef-safe formulations.'}
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7E4DC] hover:border-[#2A4B37] transition-all shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EAF2EC] text-[#2A4B37] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-[#C29B38]" />
              </div>
              <h3 className="font-bold text-sm text-[#1F3325]">
                {language === 'vi' ? '4. An Toàn Cho Da Nhạy Cảm' : '4. Dermatological Safety'}
              </h3>
              <p className="text-xs text-[#5D6F61] leading-relaxed">
                {language === 'vi'
                  ? 'Kiểm nghiệm da liễu nghiêm ngặt, đạt chuẩn Hypoallergenic, an toàn tuyệt đối cho 35% phụ nữ Việt có cơ địa da nhạy cảm.'
                  : 'Rigorous dermatological testing, hypoallergenic certified, safe for 35% of individuals with sensitive skin.'}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            BLOCK 5: NGUỒN NGUYÊN LIỆU NÔNG SẢN VIỆT BẢN ĐỊA
           ======================================================== */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#EAF2EC] border border-[#D2E2D6] space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#2A4B37] uppercase tracking-wider block mb-1">
              {language === 'vi' ? 'Chuỗi Giá Trị Nông Nghiệp Bản Địa' : 'Native Agricultural Value Chain'}
            </span>
            <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#1F3325]">
              {language === 'vi' ? 'Nông Sản Việt Trong Từng Giọt Mỹ Phẩm LUNARA' : 'Vietnamese Botanicals in Every Drop'}
            </h2>
            <p className="text-sm text-[#465B4C] mt-2 leading-relaxed">
              {language === 'vi'
                ? 'LUNARA hợp tác trực tiếp cùng bà con nông dân và đối tác chế biến tại các vùng nông nghiệp đặc hữu:'
                : 'LUNARA partners directly with local farmers and certified processing partners across endemic agricultural regions:'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="bg-white p-6 rounded-2xl border border-[#D5E5DA] shadow-2xs space-y-2">
              <h4 className="font-bold text-[#1F3325] text-sm">
                {language === 'vi' ? 'Dừa Bến Tre Ép Lạnh' : 'Cold-Pressed Bến Tre Coconut'}
              </h4>
              <p className="text-xs text-[#5D6F61] leading-relaxed">
                {language === 'vi'
                  ? 'Dầu dừa tươi ép lạnh phân đoạn giàu acid béo tự nhiên, cấp ẩm sâu và làm mềm mượt mà không gây bít tắc lỗ chân lông.'
                  : 'Fractionated fresh cold-pressed coconut oil rich in natural fatty acids, deeply hydrating without clogging pores.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5E5DA] shadow-2xs space-y-2">
              <h4 className="font-bold text-[#1F3325] text-sm">
                {language === 'vi' ? 'Trà Xanh Hữu Cơ Thái Nguyên' : 'Thái Nguyên Organic Green Tea'}
              </h4>
              <p className="text-xs text-[#5D6F61] leading-relaxed">
                {language === 'vi'
                  ? 'Búp trà xanh đồi cao dồi dào EGCG chống oxy hóa mạnh mẽ, kháng viêm và bảo vệ tế bào khỏi tác hại ánh sáng xanh.'
                  : 'Highland green tea buds packed with potent EGCG antioxidants, fighting inflammation and blue-light damage.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5E5DA] shadow-2xs space-y-2">
              <h4 className="font-bold text-[#1F3325] text-sm">
                {language === 'vi' ? 'Bao Bì Xanh Sinh Thái Kapac & SCG' : 'FSC Certified Eco-Packaging'}
              </h4>
              <p className="text-xs text-[#5D6F61] leading-relaxed">
                {language === 'vi'
                  ? '100% hộp giấy đạt chuẩn FSC bảo vệ rừng nguyên sinh và chai thủy tinh cao cấp có thể tái nạp và tái chế trọn đời.'
                  : '100% FSC certified boxes preserving old-growth forests, paired with recyclable glass bottles for lifetime circular use.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentView('shop')}
            className="px-8 py-3.5 bg-[#2A4B37] hover:bg-[#1E3728] text-white font-medium rounded-xl transition-all shadow-md cursor-pointer text-xs uppercase tracking-wider"
          >
            {language === 'vi' ? 'Khám phá trọn bộ mỹ phẩm thuần chay LUNARA' : 'Explore Full LUNARA Vegan Collection'}
          </button>
        </div>
      </div>
    </div>
  );
};
