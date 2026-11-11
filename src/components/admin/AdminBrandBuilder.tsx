import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Palette,
  Eye,
  RotateCcw,
  Save,
  Sparkles,
  Layers,
  Image as ImageIcon,
  CheckCircle,
  ExternalLink,
  Shield,
  Heart,
  Sliders,
  Move,
  Upload
} from 'lucide-react';

export const AdminBrandBuilder: React.FC = () => {
  const { brandDesign, updateBrandDesign, resetBrandDesign, products, setCurrentView, showToast } = useApp();

  // Local form state
  const [philosophyTitle, setPhilosophyTitle] = useState(brandDesign.philosophyTitle);
  const [philosophySubtitle, setPhilosophySubtitle] = useState(brandDesign.philosophySubtitle);
  const [philosophyDescription, setPhilosophyDescription] = useState(brandDesign.philosophyDescription);
  const [philosophyBgImage, setPhilosophyBgImage] = useState(brandDesign.philosophyBgImage);
  const [cardBadgeText, setCardBadgeText] = useState(brandDesign.cardBadgeText);
  const [enableFloatingMotion, setEnableFloatingMotion] = useState(brandDesign.enableFloatingMotion);
  const [displayLayout, setDisplayLayout] = useState(brandDesign.displayLayout);
  const [spotlightProductId, setSpotlightProductId] = useState(brandDesign.spotlightProductId);
  const [spotlightCustomTitle, setSpotlightCustomTitle] = useState(brandDesign.spotlightCustomTitle);
  const [spotlightCustomDescription, setSpotlightCustomDescription] = useState(brandDesign.spotlightCustomDescription);
  const [showPetaBadge, setShowPetaBadge] = useState(brandDesign.showPetaBadge);
  const [showVeganSocietyBadge, setShowVeganSocietyBadge] = useState(brandDesign.showVeganSocietyBadge);

  // Live preview modal inside Admin
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        showToast('Kích thước ảnh tối đa là 8MB', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhilosophyBgImage(event.target.result as string);
          showToast('Đã tải ảnh nền mới từ máy tính!');
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const backgroundPresets = [
    {
      id: 'cocoon_original',
      name: 'Nông sản Việt & Thỏ ngọc PETA (Chuẩn Cocoon)',
      url: '/assets/aistudio/image_8e4ffaa6.png',
      desc: 'Nền quả gấc, bí ngô, gừng và 2 chú thỏ sứ trắng tinh khôi biểu trưng cho cam kết không thử nghiệm động vật.'
    },
    {
      id: 'thai_nguyen_tea',
      name: 'Đồi Trà Xanh Thái Nguyên Hữu Cơ',
      url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=80',
      desc: 'Búp trà xanh tươi nguyên bản đồi cao, dồi dào chất chống oxy hóa EGCG và tanin sinh học.'
    },
    {
      id: 'ben_tre_coconut',
      name: 'Vườn Dừa Bến Tre Tươi Mát',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      desc: 'Rặng dừa bạt ngàn sông nước miền Tây, nguồn cung cấp dầu dừa ép lạnh phân đoạn lành tính.'
    },
    {
      id: 'chamomile_meadow',
      name: 'Cánh Đồng Hoa Cúc La Mã & Dược Liệu',
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
      desc: 'Hoa cúc nở rộ dưới nắng mai thanh khiết, làm dịu và nuôi dưỡng làn da nhạy cảm.'
    }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandDesign({
      philosophyTitle,
      philosophySubtitle,
      philosophyDescription,
      philosophyBgImage,
      cardBadgeText,
      enableFloatingMotion,
      displayLayout,
      spotlightProductId,
      spotlightCustomTitle,
      spotlightCustomDescription,
      showPetaBadge,
      showVeganSocietyBadge,
    });
  };

  const handleReset = () => {
    resetBrandDesign();
    setPhilosophyTitle('Triết lý THƯƠNG HIỆU LUNARA');
    setPhilosophySubtitle('Vẻ đẹp có đạo đức · Minh bạch · Bền vững · An toàn cho làn da');
    setPhilosophyDescription('Là những người yêu thiên nhiên và trân quý các nguồn nông sản đặc hữu của Việt Nam, chúng tôi kiến tạo LUNARA với niềm tin kiên định: Mỹ phẩm phải thực sự thuần chay, đạo đức với muôn loài và dịu lành tuyệt đối cho làn da phụ nữ Việt.');
    setPhilosophyBgImage('/assets/aistudio/image_8e4ffaa6.png');
    setCardBadgeText('LUNARA ORIGINAL VIETNAM');
    setEnableFloatingMotion(true);
    setDisplayLayout('cocoon_both');
    setSpotlightProductId('prod-2');
    setSpotlightCustomTitle('Chamomile Serum');
    setSpotlightCustomDescription('Giải pháp làm dịu và phục hồi da tổn thương với chiết xuất 82% hoa cúc La Mã chamomile cô đặc, rau má Việt Nam và Niacinamide 2%.');
    setShowPetaBadge(true);
    setShowVeganSocietyBadge(true);
  };

  const activeSpotlightProduct = products.find(p => p.id === spotlightProductId) || products[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E4DC]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2A4B37] uppercase tracking-wider mb-1">
            <Palette className="w-4 h-4 text-[#C29B38]" />
            <span>Công Cụ Thiết Kế Bố Cục Trang (Brand Page Builder)</span>
          </div>
          <h2 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
            Tùy Chỉnh Phần "Về LUNARA & Triết Lý Thương Hiệu"
          </h2>
          <p className="text-xs text-[#5D6F61] mt-1">
            Mô phỏng phong cách nghệ thuật Cocoon Original Vietnam với hiệu ứng chuyển động lơ lửng nhẹ nhàng và chiều sâu thị giác.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewModalOpen(true)}
            className="px-4 py-2 bg-white border border-[#D5DCD6] text-xs font-semibold text-[#2A4B37] rounded-xl hover:bg-[#F2F7F4] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>Xem trước trực tiếp</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-[#7F9182] hover:text-[#2A4B37] hover:bg-[#EAF2EC] rounded-xl transition-all cursor-pointer"
            title="Khôi phục mặc định Cocoon"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Layout Selection */}
        <div className="bg-white rounded-3xl border border-[#E3DFD5] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#EFECE4] pb-3">
            <Layers className="w-4 h-4 text-[#2A4B37]" />
            <h3 className="font-serif-brand text-base font-bold text-[#1F3325]">
              1. Lựa Chọn Phong Cách Bố Cục (Cocoon Layout Style)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Option 1: Both */}
            <div
              onClick={() => setDisplayLayout('cocoon_both')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                displayLayout === 'cocoon_both'
                  ? 'border-[#2A4B37] bg-[#F2F7F4] shadow-xs'
                  : 'border-[#E7E4DC] hover:border-[#CAD7CE]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#1F3325]">Bố Cục Đa Tầng Hoàn Hảo (Khuyên dùng)</span>
                {displayLayout === 'cocoon_both' && <CheckCircle className="w-4 h-4 text-[#2A4B37]" />}
              </div>
              <p className="text-[11px] text-[#637568] leading-relaxed">
                Hiển thị kết hợp cả 2 khối: Khối Thẻ Triết lý nổi trên nền nông sản Việt VÀ Khối 3-Cột Spotlight sản phẩm giữa bọt nước và thảo mộc bay nhẹ.
              </p>
            </div>

            {/* Option 2: Floating Card */}
            <div
              onClick={() => setDisplayLayout('cocoon_card')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                displayLayout === 'cocoon_card'
                  ? 'border-[#2A4B37] bg-[#F2F7F4] shadow-xs'
                  : 'border-[#E7E4DC] hover:border-[#CAD7CE]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#1F3325]">Khối Thẻ Nổi (Cocoon Floating Card)</span>
                {displayLayout === 'cocoon_card' && <CheckCircle className="w-4 h-4 text-[#2A4B37]" />}
              </div>
              <p className="text-[11px] text-[#637568] leading-relaxed">
                Tập trung vào thẻ trắng kem nổi lơ lửng ở trung tâm, nền hình ảnh nông sản Việt Nam đặc hữu và thỏ ngọc không thử nghiệm động vật.
              </p>
            </div>

            {/* Option 3: 3-Column Spotlight */}
            <div
              onClick={() => setDisplayLayout('cocoon_spotlight')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                displayLayout === 'cocoon_spotlight'
                  ? 'border-[#2A4B37] bg-[#F2F7F4] shadow-xs'
                  : 'border-[#E7E4DC] hover:border-[#CAD7CE]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#1F3325]">Spotlight 3 Cột (3-Column Depth)</span>
                {displayLayout === 'cocoon_spotlight' && <CheckCircle className="w-4 h-4 text-[#2A4B37]" />}
              </div>
              <p className="text-[11px] text-[#637568] leading-relaxed">
                Thiết kế 3 cột chuẩn tạp chí: Tên sản phẩm thanh lịch, Chai sản phẩm nghiêng 15° nổi 3D, và Đoạn văn giải thích hoạt chất khoa học.
              </p>
            </div>
          </div>

          {/* Floating Motion Switch */}
          <div className="pt-3 border-t border-[#EFECE4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Move className="w-4 h-4 text-[#C29B38]" />
              <div>
                <span className="text-xs font-bold text-[#1F3325] block">Hiệu ứng chuyển động lơ lửng nhẹ nhàng (Gentle Floating Motion)</span>
                <span className="text-[11px] text-[#7A8B7E]">Các thành phần thảo mộc, bọt khoáng và thẻ triết lý sẽ tự động dao động mềm mại mô phỏng chiều sâu không gian.</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableFloatingMotion}
                onChange={(e) => setEnableFloatingMotion(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2A4B37]"></div>
            </label>
          </div>
        </div>

        {/* Section 2: Philosophy Content & Background Image */}
        <div className="bg-white rounded-3xl border border-[#E3DFD5] p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-[#EFECE4] pb-3">
            <ImageIcon className="w-4 h-4 text-[#2A4B37]" />
            <h3 className="font-serif-brand text-base font-bold text-[#1F3325]">
              2. Nội Dung Khối Thẻ Triết Lý & Ảnh Nền Nông Sản
            </h3>
          </div>

          {/* Background Presets */}
          <div>
            <label className="block text-xs font-semibold text-[#405043] mb-2">
              Chọn Ảnh Nền Phong Cách Cocoon (Background Presets):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {backgroundPresets.map((preset) => {
                const isSelected = philosophyBgImage === preset.url;
                return (
                  <div
                    key={preset.id}
                    onClick={() => setPhilosophyBgImage(preset.url)}
                    className={`rounded-2xl border-2 p-2.5 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#2A4B37] bg-[#F2F7F4] shadow-xs ring-1 ring-[#2A4B37]'
                        : 'border-[#E7E4DC] hover:border-[#CAD7CE]'
                    }`}
                  >
                    <div className="h-20 rounded-xl overflow-hidden mb-2 bg-[#F0EDE6]">
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="font-bold text-xs text-[#1F3325] line-clamp-1">{preset.name}</p>
                    <p className="text-[10px] text-[#7A8B7E] line-clamp-2 mt-0.5">{preset.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#EFECE4] space-y-2">
              <label className="block text-xs font-semibold text-[#405043] mb-1 flex items-center justify-between">
                <span>Tùy chỉnh ảnh nền riêng của bạn:</span>
                <span className="text-[11px] text-[#7A8B7E] font-normal">Tải từ máy tính hoặc dán URL</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                {philosophyBgImage && (
                  <div className="w-20 h-14 rounded-xl border border-[#D5DCD6] overflow-hidden shrink-0 bg-[#F2F7F4] shadow-xs">
                    <img src={philosophyBgImage} alt="Xem trước nền" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="px-3.5 py-1.5 bg-[#EAF2EC] hover:bg-[#D5E5DA] text-[#2A4B37] rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-[#C29B38]" />
                      <span>Tải ảnh từ máy tính lên</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-[#7A8B7E]">hoặc dán URL:</span>
                  </div>
                  <input
                    type="text"
                    value={philosophyBgImage}
                    onChange={(e) => setPhilosophyBgImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form fields for texts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#405043] mb-1">
                Tiêu đề nghệ thuật chính (Title) *
              </label>
              <input
                type="text"
                required
                value={philosophyTitle}
                onChange={(e) => setPhilosophyTitle(e.target.value)}
                placeholder="Ví dụ: Triết lý THƯƠNG HIỆU LUNARA"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] font-serif-brand font-bold text-sm text-[#1F3325]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#405043] mb-1">
                Thẻ danh xưng nhỏ (Card Badge)
              </label>
              <input
                type="text"
                value={cardBadgeText}
                onChange={(e) => setCardBadgeText(e.target.value)}
                placeholder="LUNARA ORIGINAL VIETNAM"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#405043] mb-1">
              Thông điệp Triết lý Thương hiệu (Philosophy Description) *
            </label>
            <textarea
              rows={3}
              required
              value={philosophyDescription}
              onChange={(e) => setPhilosophyDescription(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] leading-relaxed text-[#263529]"
            />
          </div>

          {/* Trust Badges Checkbox */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#2A4B37]">
              <input
                type="checkbox"
                checked={showPetaBadge}
                onChange={(e) => setShowPetaBadge(e.target.checked)}
                className="rounded text-[#2A4B37] focus:ring-[#2A4B37]"
              />
              <span>Hiển thị chứng nhận PETA Cruelty-Free & Animal Test-Free</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#2A4B37]">
              <input
                type="checkbox"
                checked={showVeganSocietyBadge}
                onChange={(e) => setShowVeganSocietyBadge(e.target.checked)}
                className="rounded text-[#2A4B37] focus:ring-[#2A4B37]"
              />
              <span>Hiển thị chứng nhận The Vegan Society UK</span>
            </label>
          </div>
        </div>

        {/* Section 3: Spotlight 3-Column Configuration */}
        <div className="bg-white rounded-3xl border border-[#E3DFD5] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#EFECE4] pb-3">
            <Sliders className="w-4 h-4 text-[#2A4B37]" />
            <h3 className="font-serif-brand text-base font-bold text-[#1F3325]">
              3. Tùy Chỉnh Khối 3 Cột (Cocoon Product Spotlight)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#405043] mb-1">
                Chọn sản phẩm tâm điểm hiển thị:
              </label>
              <select
                value={spotlightProductId}
                onChange={(e) => {
                  const pId = e.target.value;
                  setSpotlightProductId(pId);
                  const selectedP = products.find(p => p.id === pId);
                  if (selectedP) {
                    setSpotlightCustomTitle(selectedP.name);
                    setSpotlightCustomDescription(selectedP.detailedDescription);
                  }
                }}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] bg-white cursor-pointer"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.price.toLocaleString('vi-VN')} ₫) - {p.volume}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#405043] mb-1">
                Tiêu đề hiển thị cột trái:
              </label>
              <input
                type="text"
                value={spotlightCustomTitle}
                onChange={(e) => setSpotlightCustomTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] font-serif-brand font-bold text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#405043] mb-1">
              Nội dung mô tả công dụng & khoa học (Cột phải):
            </label>
            <textarea
              rows={3}
              value={spotlightCustomDescription}
              onChange={(e) => setSpotlightCustomDescription(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] leading-relaxed"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setCurrentView('about')}
            className="text-xs text-[#2A4B37] hover:underline flex items-center gap-1.5 font-medium cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Mở trang "Về LUNARA" trên giao diện khách hàng</span>
          </button>

          <button
            type="submit"
            className="px-8 py-3 bg-[#2A4B37] hover:bg-[#1E3728] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Lưu & Áp Dụng Lên Website</span>
          </button>
        </div>
      </form>

      {/* Live Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F5] w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl border border-[#E7E4DC] flex flex-col">
            <div className="sticky top-0 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-[#E7E4DC] flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#2A4B37]" />
                <span className="font-bold text-xs text-[#1F3325]">Xem Trước Thời Gian Thực (Live Preview Canvas)</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-3 py-1 bg-[#2A4B37] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Đóng xem trước
              </button>
            </div>

            <div className="p-6 space-y-12">
              {/* Cocoon Floating Card Preview */}
              {(displayLayout === 'cocoon_both' || displayLayout === 'cocoon_card') && (
                <div className="relative rounded-3xl overflow-hidden min-h-[460px] flex items-center justify-center p-6 sm:p-12 border border-[#E3DFD5]">
                  <img
                    src={philosophyBgImage}
                    alt="Nền nông sản LUNARA"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Floating Card */}
                  <div
                    className={`relative z-10 max-w-xl w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 text-center card-depth-cocoon border border-white/60 space-y-4 ${
                      enableFloatingMotion ? 'animate-float-gentle' : ''
                    }`}
                  >
                    <span className="text-[10px] font-bold tracking-widest text-[#C29B38] uppercase">
                      {cardBadgeText}
                    </span>
                    <h2 className="font-serif-brand text-2xl sm:text-4xl font-bold text-[#1F3325] leading-tight">
                      {philosophyTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4E5E52] leading-relaxed">
                      {philosophyDescription}
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        className="px-6 py-2.5 bg-[#1F3325] text-white text-xs font-semibold rounded-xl hover:bg-[#2A4B37] transition-all cursor-pointer"
                      >
                        TÌM HIỂU THÊM →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Cocoon 3-Column Spotlight Preview */}
              {(displayLayout === 'cocoon_both' || displayLayout === 'cocoon_spotlight') && (
                <div className="bg-white rounded-3xl p-8 border border-[#E7E4DC] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-4 text-left">
                    <span className="text-xs text-[#C29B38] font-bold uppercase tracking-wider block mb-2">
                      Chiết xuất bản địa
                    </span>
                    <h3 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#1F3325] leading-tight">
                      {spotlightCustomTitle || activeSpotlightProduct.name}
                    </h3>
                    <p className="text-xs text-[#7A8B7E] mt-2 font-mono">
                      {activeSpotlightProduct.volume} · Thuần chay hữu cơ
                    </p>
                  </div>

                  <div className="md:col-span-4 flex justify-center relative">
                    <div className={`relative w-48 h-64 ${enableFloatingMotion ? 'animate-float-reverse' : ''}`}>
                      <img
                        src={activeSpotlightProduct.imageUrl}
                        alt={activeSpotlightProduct.name}
                        className="w-full h-full object-contain rounded-2xl filter drop-shadow-2xl rotate-6"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-4 space-y-4 text-xs text-[#4E5E52] leading-relaxed">
                    <p>{spotlightCustomDescription || activeSpotlightProduct.detailedDescription}</p>
                    <div className="pt-2">
                      <span className="font-bold text-[#2A4B37] text-sm block mb-2">
                        {activeSpotlightProduct.price.toLocaleString('vi-VN')} ₫
                      </span>
                      <button
                        type="button"
                        className="font-bold text-xs text-[#1F3325] hover:text-[#2A4B37] flex items-center gap-1 cursor-pointer"
                      >
                        <span>MUA NGAY</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
