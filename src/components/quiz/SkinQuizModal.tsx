import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, CheckCircle, ArrowRight, RotateCcw, ShoppingBag, Sun, Moon, Shield } from 'lucide-react';
import { Product } from '../../types';

export const SkinQuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, products, addToCart, showToast, language } = useApp();

  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState('sensitive');
  const [concern, setConcern] = useState('wrinkles');
  const [exposure, setExposure] = useState('office');
  const [priority, setPriority] = useState('gentle');

  if (!isQuizOpen) return null;

  const handleFinish = () => {
    setStep(5); // Show results
  };

  const handleReset = () => {
    setStep(1);
    setSkinType('sensitive');
    setConcern('wrinkles');
  };

  // Determine recommended routine based on answers
  const recommendedRoutine: { morning: Product[]; evening: Product[]; advice: string } = (() => {
    const wash = products.find(p => p.id === 'prod-7') || products[0];
    const toner = products.find(p => p.id === 'prod-3') || products[2];
    const scrub = products.find(p => p.id === 'prod-1') || products[0];
    const chamomileSerum = products.find(p => p.id === 'prod-2') || products[1];
    const sunVeil = products.find(p => p.id === 'prod-4') || products[3];
    const nightCream = products.find(p => p.id === 'prod-5') || products[4];

    if (concern === 'wrinkles') {
      return {
        morning: [wash, toner, chamomileSerum, sunVeil],
        evening: [wash, scrub, chamomileSerum, nightCream],
        advice: language === 'vi'
          ? 'Làn da của bạn cần liệu trình nuôi dưỡng sâu với "100% Organic Wrinkle Care". Tinh chất hoa cúc Chamomile kết hợp bơ hạt mỡ hữu cơ sẽ kích thích sản sinh collagen tự nhiên mà không gây đỏ rát như Retinol thông thường.'
          : 'Your skin will thrive with "100% Organic Wrinkle Care". Roman Chamomile essence paired with organic shea butter stimulates collagen synthesis without redness or irritation.'
      };
    } else if (concern === 'sensitivity') {
      return {
        morning: [wash, chamomileSerum, sunVeil],
        evening: [wash, toner, chamomileSerum, nightCream],
        advice: language === 'vi'
          ? 'Làn da nhạy cảm cần sự tối giản tối đa. Ưu tiên Chamomile Serum giàu Bisabolol làm dịu mẩn đỏ và kem chống nắng vật lý Sun Veil SPF 50+ không cồn, không hương liệu.'
          : 'Sensitive skin requires minimalist soothing care. Prioritize Bisabolol-rich Chamomile Serum and alcohol-free mineral Sun Veil SPF 50+.'
      };
    } else {
      return {
        morning: [wash, toner, sunVeil],
        evening: [wash, scrub, toner, chamomileSerum],
        advice: language === 'vi'
          ? 'Tập trung thanh lọc bã nhờn với trà xanh Thái Nguyên và tẩy da chết nha đam dịu nhẹ, kết hợp bảo vệ da khỏi tia cực tím bằng màng khoáng chất Nano Zinc.'
          : 'Purify excess sebum with Thái Nguyên green tea and soothing aloe vera scrub, shielding against UV rays with Nano Zinc mineral barriers.'
      };
    }
  })();

  const handleAddAllToCart = () => {
    const allProducts = Array.from(new Set([...recommendedRoutine.morning, ...recommendedRoutine.evening]));
    allProducts.forEach(p => addToCart(p, 1));
    showToast(
      language === 'vi'
        ? `Đã thêm trọn bộ Routine (${allProducts.length} sản phẩm) vào giỏ hàng!`
        : `Added full routine (${allProducts.length} products) to cart!`
    );
    setIsQuizOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E3DFD5] overflow-hidden my-8 p-6 sm:p-8">
        <button
          onClick={() => setIsQuizOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9F5] hover:bg-[#EAE6DB] text-[#2A4B37] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step < 5 ? (
          <div>
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E7E4DC]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C29B38]" />
                <div>
                  <span className="text-xs font-semibold text-[#2A4B37] uppercase tracking-wider block">
                    {language === 'vi' ? `Chẩn đoán da AI · Bước ${step}/4` : `AI Skin Diagnostic · Step ${step} of 4`}
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#7A8B7E] font-medium hidden sm:inline">LUNARA Skin Diagnostic</span>
            </div>

            {/* Question 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
                  1. Hiện tại, bạn cảm thấy làn da mình thuộc loại nào?
                </h3>
                <p className="text-xs text-[#5D6F61]">
                  Giúp LUNARA xác định tỷ lệ cấp ẩm và kiểm soát màng lipid phù hợp nhất.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'sensitive', label: 'Da nhạy cảm, dễ kích ứng', desc: 'Thường bị đỏ ngứa khi đổi thời tiết hoặc dùng mỹ phẩm lạ.' },
                    { id: 'dry', label: 'Da khô & Thiếu ẩm', desc: 'Cảm giác căng rát sau rửa mặt, dễ xuất hiện rãnh nhăn nông.' },
                    { id: 'oily', label: 'Da dầu nhờn & Mụn', desc: 'Đổ nhiều dầu vùng chữ T, dễ bít tắc lỗ chân lông.' },
                    { id: 'combination', label: 'Da hỗn hợp', desc: 'Dầu vùng trán, mũi và khô căng ở hai bên gò má.' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSkinType(item.id)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        skinType === item.id
                          ? 'border-[#2A4B37] bg-[#F2F7F4] shadow-xs'
                          : 'border-[#E0E7E2] bg-white hover:border-[#2A4B37]'
                      }`}
                    >
                      <p className="text-sm font-bold text-[#1F3325]">{item.label}</p>
                      <p className="text-xs text-[#6F7F72] mt-1">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
                  2. Mối bận tâm lớn nhất của bạn về da là gì?
                </h3>
                <p className="text-xs text-[#5D6F61]">
                  Mỗi giải pháp thuần chay của LUNARA tập trung vào giải quyết tận gốc nguyên nhân.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'wrinkles', label: 'Nếp nhăn & Dấu hiệu lão hóa', desc: 'Rãnh cười, vết chân chim, da kém đàn hồi, cần dòng Organic Wrinkle.' },
                    { id: 'sensitivity', label: 'Da nhạy cảm tổn thương', desc: 'Màng bảo vệ yếu, dễ đỏ rát do ô nhiễm bụi mịn hoặc kem trộn.' },
                    { id: 'acne', label: 'Mụn trứng cá & Lỗ chân lông', desc: 'Bã nhờn tích tụ, vi khuẩn gây mụn cần thảo mộc kháng viêm.' },
                    { id: 'dullness', label: 'Da xỉn màu, không đều màu', desc: 'Cần tẩy da chết nhẹ nhàng và bổ sung vitamin thực vật.' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setConcern(item.id)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        concern === item.id
                          ? 'border-[#2A4B37] bg-[#F2F7F4] shadow-xs'
                          : 'border-[#E0E7E2] bg-white hover:border-[#2A4B37]'
                      }`}
                    >
                      <p className="text-sm font-bold text-[#1F3325]">{item.label}</p>
                      <p className="text-xs text-[#6F7F72] mt-1">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
                  3. Môi trường làm việc và sinh hoạt hàng ngày của bạn?
                </h3>
                <p className="text-xs text-[#5D6F61]">
                  Xác định mức độ ảnh hưởng của điều hòa nhiệt độ và ánh sáng xanh từ màn hình.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'office', label: 'Văn phòng điều hòa máy lạnh', desc: 'Ngồi phòng máy lạnh 6-8 tiếng mỗi ngày, tiếp xúc màn hình máy tính liên tục.' },
                    { id: 'outdoor', label: 'Thường xuyên di chuyển ngoài trời', desc: 'Tiếp xúc nhiều với nắng gắt và khói bụi giao thông.' },
                    { id: 'student', label: 'Học sinh & Sinh viên năng động', desc: 'Sinh hoạt linh hoạt, hay thức khuya, cần routine nhanh gọn.' },
                    { id: 'indoor', label: 'Làm việc tự do & Tại nhà', desc: 'Môi trường làm việc từ xa freelance, muốn chăm sóc da chuyên sâu thư giãn.' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setExposure(item.id)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        exposure === item.id
                          ? 'border-[#2A4B37] bg-[#F2F7F4] shadow-xs'
                          : 'border-[#E0E7E2] bg-white hover:border-[#2A4B37]'
                      }`}
                    >
                      <p className="text-sm font-bold text-[#1F3325]">{item.label}</p>
                      <p className="text-xs text-[#6F7F72] mt-1">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 4 */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
                  4. Tiêu chí quan trọng nhất khi bạn chọn mỹ phẩm?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'gentle', label: '100% Thuần chay & Lành tính', desc: 'Không chứa cồn khô, paraben, hương liệu hóa học tổng hợp.' },
                    { id: 'wrinkle_proof', label: 'Hiệu quả mờ nếp nhăn an toàn', desc: 'Cải thiện nếp nhăn bằng thảo mộc hữu cơ không gây kích ứng.' },
                    { id: 'eco', label: 'Bền vững & Chứng nhận PETA', desc: 'Bao bì tái chế, tuyệt đối không thử nghiệm trên động vật.' },
                    { id: 'simple', label: 'Routine tối giản, dễ duy trì', desc: 'Chỉ 3-4 bước cơ bản mỗi ngày nhưng mang lại hiệu quả cao.' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPriority(item.id)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                        priority === item.id
                          ? 'border-[#2A4B37] bg-[#F2F7F4] shadow-xs'
                          : 'border-[#E0E7E2] bg-white hover:border-[#2A4B37]'
                      }`}
                    >
                      <p className="text-sm font-bold text-[#1F3325]">{item.label}</p>
                      <p className="text-xs text-[#6F7F72] mt-1">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="mt-8 pt-4 border-t border-[#E7E4DC] flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-semibold text-[#6F7F72] hover:text-[#2A4B37] cursor-pointer"
                >
                  Quay lại
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 bg-[#2A4B37] text-white text-xs font-medium rounded-xl hover:bg-[#1E3728] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Tiếp tục</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#C29B38] text-[#1C2C22] text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Xem Phác Đồ Routine Của Bạn</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Diagnosis Results View */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E4DC]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#2A4B37]" />
                <h3 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
                  Phác Đồ Skincare Thuần Chay Cá Nhân Hóa
                </h3>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-[#6F7F72] hover:text-[#2A4B37] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại trắc nghiệm</span>
              </button>
            </div>

            {/* Analysis card */}
            <div className="p-4 rounded-2xl bg-[#F2F7F4] border border-[#D5E5DA] text-xs text-[#2F4435] leading-relaxed">
              <p className="font-semibold text-sm text-[#2A4B37] mb-1">
                Đánh giá da liễu LUNARA AI:
              </p>
              <p>{recommendedRoutine.advice}</p>
            </div>

            {/* Morning Routine */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#C29B38] uppercase tracking-wider mb-2">
                <Sun className="w-4 h-4" />
                <span>Routine Buổi Sáng (Bảo vệ & Cấp ẩm nhẹ nhàng)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {recommendedRoutine.morning.map((prod, idx) => (
                  <div key={idx} className="p-2.5 bg-white border border-[#E0E7E2] rounded-xl text-center">
                    <img src={prod.imageUrl} alt={prod.name} className="w-12 h-12 object-cover mx-auto rounded-lg mb-1" />
                    <span className="text-[10px] text-[#7A8B7E] block font-mono">Bước {idx + 1}</span>
                    <p className="text-xs font-bold text-[#1F3325] truncate">{prod.name}</p>
                    <p className="text-[11px] text-[#2A4B37] font-semibold">{prod.price.toLocaleString('vi-VN')} ₫</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Evening Routine */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#2A4B37] uppercase tracking-wider mb-2">
                <Moon className="w-4 h-4" />
                <span>Routine Buổi Tối (Phục hồi & Chống nếp nhăn chuyên sâu)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {recommendedRoutine.evening.map((prod, idx) => (
                  <div key={idx} className="p-2.5 bg-white border border-[#E0E7E2] rounded-xl text-center">
                    <img src={prod.imageUrl} alt={prod.name} className="w-12 h-12 object-cover mx-auto rounded-lg mb-1" />
                    <span className="text-[10px] text-[#7A8B7E] block font-mono">Bước {idx + 1}</span>
                    <p className="text-xs font-bold text-[#1F3325] truncate">{prod.name}</p>
                    <p className="text-[11px] text-[#2A4B37] font-semibold">{prod.price.toLocaleString('vi-VN')} ₫</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Routine to Cart Button */}
            <div className="pt-2">
              <button
                onClick={handleAddAllToCart}
                className="w-full py-3.5 bg-[#2A4B37] hover:bg-[#1E3728] text-white font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Trọn Bộ Routine Phù Hợp Vào Giỏ Hàng</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
