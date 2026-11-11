import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, cartTotal, setIsCheckoutOpen } = useApp();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isCartOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const freeShippingThreshold = 300000;
  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - cartTotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'GREENBOTTLE') {
      setCouponApplied(true);
    } else {
      alert('Mã giảm giá không hợp lệ. Gợi ý: Dùng mã "GREENBOTTLE" để giảm 50.000đ từ chiến dịch đổi vỏ chai!');
    }
  };

  const discountAmount = couponApplied ? 50000 : 0;
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col justify-between border-l border-[#E5E1D5]">
          {/* Top Header */}
          <div className="p-6 border-b border-[#E7E4DC] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h2 className="font-serif-brand text-xl font-bold text-[#1F3325]">
                Giỏ hàng của bạn
              </h2>
              <span className="text-xs bg-[#EAF2EC] text-[#2A4B37] font-semibold px-2 py-0.5 rounded-full tabular-nums">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-[#F2EFE8] text-[#2A4B37] cursor-pointer"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#F0F5F1] px-6 py-3 border-b border-[#D8E6DB] text-xs text-[#2A4B37]">
            {isFreeShipping ? (
              <p className="font-medium text-emerald-800 flex items-center gap-1.5">
                <span>🎉 Bạn đã đủ điều kiện được <strong>Miễn Phí Vận Chuyển Toàn Quốc!</strong></span>
              </p>
            ) : (
              <p>
                Mua thêm <strong>{formatPrice(remainingForFreeShip)}</strong> để được <strong>Freeship</strong> qua Viettel Post / J&T!
              </p>
            )}
            <div className="w-full bg-[#D4E4D8] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#2A4B37] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Itemized List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-[#738477]">
                <p className="text-sm">Giỏ hàng của bạn đang trống</p>
                <p className="text-xs mt-1">Hãy chọn cho làn da những sản phẩm thuần chay dịu lành nhất.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded-2xl border border-[#E7E4DC] shadow-2xs"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover bg-[#F3F6F3] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#1F3325] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#9CA99E] hover:text-red-600 transition-colors cursor-pointer"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#738477] font-medium">{item.product.volume}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#D5DCD6] rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#2A4B37] hover:bg-[#F2F7F4] font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#2A4B37] hover:bg-[#F2F7F4] font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#2A4B37] tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E7E4DC] space-y-4">
              {/* Green Bottle Voucher input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#899C8E]" />
                  <input
                    type="text"
                    placeholder="Mã voucher · VD: GREENBOTTLE"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D5DCD6] uppercase placeholder:normal-case focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#F2F7F4] text-[#2A4B37] border border-[#CFE0D3] hover:bg-[#2A4B37] hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Áp dụng
                </button>
              </form>

              {couponApplied && (
                <div className="p-2.5 bg-[#F0F7F1] rounded-xl text-xs text-[#2A4B37] flex items-center justify-between border border-[#CCE2D2]">
                  <span>🌿 Đã áp dụng mã Voucher đổi vỏ chai:</span>
                  <span className="font-bold text-emerald-800">-50.000đ</span>
                </div>
              )}

              {/* Pricing breakdown */}
              <div className="space-y-1.5 text-xs text-[#5D6F61] pt-2">
                <div className="flex justify-between">
                  <span>Tạm tính hàng:</span>
                  <span className="tabular-nums font-medium text-[#1F3325]">{formatPrice(cartTotal)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Giảm giá chiến dịch Xanh:</span>
                    <span className="tabular-nums font-medium">-50.000 ₫</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí vận chuyển toàn quốc:</span>
                  <span className="tabular-nums font-medium">
                    {isFreeShipping ? 'Miễn phí giao hàng' : '25.000 ₫'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1F3325] pt-2 border-t border-[#F0ECE2]">
                  <span>Tổng thanh toán:</span>
                  <span className="text-[#2A4B37] tabular-nums">
                    {formatPrice(finalTotal + (isFreeShipping ? 0 : 25000))}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 bg-[#2A4B37] hover:bg-[#1E3728] text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Tiến hành Đặt hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
