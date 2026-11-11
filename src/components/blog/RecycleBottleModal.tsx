import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Recycle, CheckCircle, Gift, Truck, MapPin } from 'lucide-react';

export const RecycleBottleModal: React.FC = () => {
  const { isRecycleModalOpen, setIsRecycleModalOpen, showToast, addRecycledBottles, customers } = useApp();
  const [bottlesCount, setBottlesCount] = useState(5);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupMethod, setPickupMethod] = useState<'courier' | 'store'>('courier');
  const [submitted, setSubmitted] = useState(false);

  if (!isRecycleModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Vui lòng điền họ tên và số điện thoại để ghi nhận điểm tích lũy!');
      return;
    }

    const matched = customers.find(c => c.phone === phone);
    if (matched) {
      addRecycledBottles(matched.id, bottlesCount);
    } else {
      showToast(`Đã ghi nhận yêu cầu gửi ${bottlesCount} vỏ chai! Điểm thưởng sẽ cộng vào Sapo CRM sau khi nhận.`);
    }

    setSubmitted(true);
  };

  const handleClose = () => {
    setIsRecycleModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E3DFD5] overflow-hidden my-8 p-6 sm:p-8">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9F5] hover:bg-[#EAE6DB] text-[#2A4B37] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E5EFE8] text-[#2A4B37] flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
              Đăng Ký Thu Gom Vỏ Chai Thành Công!
            </h3>
            <p className="text-sm text-[#526356]">
              Cảm ơn bạn đã đồng hành cùng LUNARA vì một đại dương không rác thải nhựa. Mã voucher <strong>GREENBOTTLE</strong> (giảm 50.000đ) đã sẵn sàng sử dụng cho đơn hàng tiếp theo.
            </p>
            <div className="p-4 rounded-xl bg-[#F4F8F5] border border-[#D5E5DA] text-xs text-left space-y-1">
              <p>• Số vỏ chai đăng ký: <strong>{bottlesCount} vỏ chai</strong></p>
              <p>• Điểm xanh tích lũy dự kiến: <strong>+{bottlesCount * 20} điểm Sapo Loyalty</strong></p>
              <p>• Phương thức: <strong>{pickupMethod === 'courier' ? 'Gửi bưu tá Viettel Post miễn phí' : 'Gửi trực tiếp tại cửa hàng'}</strong></p>
            </div>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 bg-[#2A4B37] text-white text-xs font-semibold rounded-xl hover:bg-[#1E3728] cursor-pointer"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#2A4B37] uppercase tracking-wider">
              <Recycle className="w-4 h-4 text-[#C29B38]" />
              <span>Chương trình Green Bottle Take-Back</span>
            </div>
            <h2 className="font-serif-brand text-2xl font-bold text-[#1F3325] mb-2">
              Đổi Vỏ Chai Rỗng Lấy Quà Xanh
            </h2>
            <p className="text-xs text-[#5D6F61] mb-6">
              Thu gom đủ từ <strong>5 vỏ chai LUNARA</strong> rỗng để nhận ngay voucher 50.000đ và tích điểm nâng hạng hội viên Rừng Lunara.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Họ và tên của bạn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Lê Thảo My"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Số điện thoại đăng ký (để tích điểm Sapo CRM) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0988123456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Số lượng vỏ chai LUNARA bạn đang có:
                </label>
                <div className="flex items-center gap-3">
                  {[5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBottlesCount(num)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                        bottlesCount === num
                          ? 'bg-[#2A4B37] text-white border-[#2A4B37]'
                          : 'bg-white text-[#4A5B4E] border-[#D5DCD6]'
                      }`}
                    >
                      {num} vỏ
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-2">
                  Hình thức gửi vỏ chai:
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setPickupMethod('courier')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      pickupMethod === 'courier' ? 'border-[#2A4B37] bg-[#F0F7F1]' : 'border-[#D5DCD6] bg-white'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#2A4B37] mb-1" />
                    <p className="font-semibold text-[#1F3325]">Bưu tá nhận tận nhà</p>
                    <p className="text-[11px] text-[#6E8072]">Viettel Post / J&T miễn cước</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickupMethod('store')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      pickupMethod === 'store' ? 'border-[#2A4B37] bg-[#F0F7F1]' : 'border-[#D5DCD6] bg-white'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#2A4B37] mb-1" />
                    <p className="font-semibold text-[#1F3325]">Gửi tại điểm bán</p>
                    <p className="text-[11px] text-[#6E8072]">Guardian / Hasaki</p>
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2A4B37] hover:bg-[#1E3728] text-white font-medium text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Gift className="w-4 h-4 text-[#D4AF37]" />
                  <span>Xác nhận tham gia & Nhận Voucher 50.000đ</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
