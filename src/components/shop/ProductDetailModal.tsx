import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Check, ShieldCheck, Heart, ShoppingBag, Sparkles, Video, Calendar, AlertCircle } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, language } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage' | 'video'>('benefits');

  if (!selectedProduct) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E3DFD5] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#2A4B37] shadow-sm transition-all cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Media Gallery */}
          <div className="md:col-span-5 bg-[#F6F8F6] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EBE8DF]">
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-xs border border-[#E0E7E2]">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Batch & Sapo Inventory Guarantee */}
              <div className="p-3.5 rounded-xl bg-white border border-[#E3ECE5] text-xs text-[#4E6152] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2A4B37]">
                    {language === 'vi' ? 'Mã lô sản xuất:' : 'Batch No:'}
                  </span>
                  <span className="font-mono">{selectedProduct.batchNo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2A4B37]">
                    {language === 'vi' ? 'Hạn sử dụng:' : 'Expiry Date:'}
                  </span>
                  <span>{selectedProduct.expiryDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2A4B37]">
                    {language === 'vi' ? 'Tồn kho khả dụng:' : 'In Stock:'}
                  </span>
                  <span className="text-emerald-700 font-semibold">
                    {selectedProduct.stock} {language === 'vi' ? 'sản phẩm' : 'units'}
                  </span>
                </div>
              </div>
            </div>

            {/* Certifications badges */}
            <div className="pt-4 border-t border-[#E3DFD5]">
              <span className="text-[11px] uppercase tracking-wider text-[#738477] font-semibold block mb-2">
                {language === 'vi' ? 'Chứng nhận quốc tế' : 'Certifications'}
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#EAF2EC] text-[#2A4B37] px-2.5 py-1 rounded-md font-medium"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Deep Info */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Dung tích */}
              <div className="flex items-center gap-2 text-xs text-[#738477] font-medium mb-1">
                <span className="uppercase tracking-wider">{selectedProduct.category}</span>
                <span>·</span>
                <span>{language === 'vi' ? 'Dung tích:' : 'Volume:'} {selectedProduct.volume}</span>
                <span>·</span>
                <span>
                  {language === 'vi'
                    ? `Đánh giá: ★ ${selectedProduct.rating} · ${selectedProduct.reviewsCount} nhận xét`
                    : `Rating: ★ ${selectedProduct.rating} · ${selectedProduct.reviewsCount} reviews`}
                </span>
              </div>

              {/* Product Title (Single Active Language Only) */}
              <div>
                <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#1F3325]">
                  {language === 'vi'
                    ? (selectedProduct.nameVi || selectedProduct.name)
                    : (selectedProduct.nameEn || selectedProduct.name)}
                </h2>
              </div>

              {/* Price display */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#2A4B37] tabular-nums">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm text-[#95A599] line-through tabular-nums">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-[#C29B38] font-semibold bg-[#FAF3E0] px-2 py-0.5 rounded">
                  {language === 'vi' ? '100% Thuần Chay Hữu Cơ' : '100% Organic Vegan'}
                </span>
              </div>

              {/* Short Intro */}
              <p className="mt-3 text-sm text-[#526356] leading-relaxed">
                {selectedProduct.detailedDescription}
              </p>

              {/* Segmented Detail Tabs */}
              <div className="mt-6 border-b border-[#E7E4DC] flex items-center gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'benefits'
                      ? 'border-b-2 border-[#2A4B37] text-[#2A4B37]'
                      : 'text-[#6F7F72] hover:text-[#2A4B37]'
                  }`}
                >
                  {language === 'vi' ? 'Công dụng nổi bật' : 'Key Benefits'}
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'ingredients'
                      ? 'border-b-2 border-[#2A4B37] text-[#2A4B37]'
                      : 'text-[#6F7F72] hover:text-[#2A4B37]'
                  }`}
                >
                  {language === 'vi' ? 'Bảng thành phần INCI' : 'INCI Ingredients'}
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'usage'
                      ? 'border-b-2 border-[#2A4B37] text-[#2A4B37]'
                      : 'text-[#6F7F72] hover:text-[#2A4B37]'
                  }`}
                >
                  {language === 'vi' ? 'Hướng dẫn sử dụng' : 'How to Use'}
                </button>
                {selectedProduct.videoUrl && (
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`pb-2 transition-colors cursor-pointer flex items-center gap-1 ${
                      activeTab === 'video'
                        ? 'border-b-2 border-[#2A4B37] text-[#2A4B37]'
                        : 'text-[#6F7F72] hover:text-[#2A4B37]'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5 text-[#C29B38]" />
                    <span>{language === 'vi' ? 'Video HDSD' : 'Video Guide'}</span>
                  </button>
                )}
              </div>

              {/* Tab Content Display */}
              <div className="py-4 text-sm text-[#4E5E52] min-h-[140px]">
                {activeTab === 'benefits' && (
                  <ul className="space-y-2">
                    {selectedProduct.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#2A4B37] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-[#F2F7F4] rounded-xl border border-[#DFEAE2] text-xs leading-relaxed font-mono text-[#2B4533]">
                      {selectedProduct.ingredientsList}
                    </div>
                    <p className="text-xs text-[#738477]">
                      * Cam kết 100% minh bạch theo quy chuẩn thông tư 06/2011/TT-BYT và tiêu chuẩn PIF. Không paraben, không hương liệu tổng hợp độc hại, không vi hạt vi nhựa.
                    </p>
                  </div>
                )}

                {activeTab === 'usage' && (
                  <div className="space-y-2">
                    {selectedProduct.usageSteps.map((step, i) => (
                      <div key={i} className="text-xs text-[#405044] bg-[#FAF8F2] p-2.5 rounded-lg border border-[#EDE8DC]">
                        {step}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'video' && selectedProduct.videoUrl && (
                  <div className="space-y-2">
                    <p className="text-xs text-[#6F7F72]">
                      Video hướng dẫn thao tác thoa và vỗ kem đúng kỹ thuật da liễu để dưỡng chất thẩm thấu sâu:
                    </p>
                    <div className="aspect-video rounded-xl overflow-hidden bg-black/10 border border-[#E0E7E2]">
                      <iframe
                        src={selectedProduct.videoUrl}
                        title={`Hướng dẫn sử dụng ${selectedProduct.name}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity Stepper & Add to Cart Button */}
            <div className="pt-6 border-t border-[#E7E4DC] flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-[#CBD5CD] rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-[#2A4B37] hover:bg-[#F2F7F4] transition-colors font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-semibold text-[#1F3325] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-[#2A4B37] hover:bg-[#F2F7F4] transition-colors font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Buy CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 bg-[#2A4B37] hover:bg-[#1E3728] text-white font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {language === 'vi' ? 'Thêm vào giỏ' : 'Add to Cart'} · {formatPrice(selectedProduct.price * quantity)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
