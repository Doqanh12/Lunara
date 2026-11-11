import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, Truck, CreditCard, QrCode, ShieldCheck, ArrowRight } from 'lucide-react';
import { Order } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, placeOrder } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [carrier, setCarrier] = useState<'Viettel Post' | 'J&T Express'>('Viettel Post');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'momo' | 'vnpay'>('cod');

  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const freeShippingThreshold = 300000;
  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 25000;
  const finalAmount = cartTotal + shippingFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng!');
      return;
    }

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      imageUrl: item.product.imageUrl,
    }));

    const newOrder = placeOrder({
      customerName: fullName,
      phone,
      email: email || `${phone}@lunara.vn`,
      shippingAddress: address,
      items: orderItems,
      totalAmount: cartTotal,
      discountAmount: 0,
      finalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'confirmed',
      shippingCarrier: carrier,
      channel: 'Website D2C',
    });

    setCompletedOrder(newOrder);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E3DFD5] overflow-hidden my-8 p-6 sm:p-8">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9F5] hover:bg-[#EAE6DB] text-[#2A4B37] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Success State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E5EFE8] text-[#2A4B37] flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
              Đặt Hàng Thành Công!
            </h3>

            <p className="text-sm text-[#526356] max-w-md mx-auto">
              Cảm ơn bạn đã lựa chọn chăm sóc làn da với mỹ phẩm thuần chay LUNARA. Đơn hàng của bạn đã được kết nối tự động vào hệ thống Sapo Fulfillment.
            </p>

            {/* Order Details Card */}
            <div className="p-5 rounded-2xl bg-[#F6F9F7] border border-[#D8E6DB] text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#6C7E70]">Mã đơn hàng:</span>
                <span className="font-bold font-mono text-[#2A4B37]">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6C7E70]">Đơn vị vận chuyển:</span>
                <span className="font-semibold">{completedOrder.shippingCarrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6C7E70]">Mã vận đơn:</span>
                <span className="font-mono text-emerald-800 font-semibold">{completedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6C7E70]">Phương thức thanh toán:</span>
                <span className="font-semibold uppercase">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#DFEAE2] text-sm font-bold text-[#1F3325]">
                <span>Tổng số tiền:</span>
                <span className="text-[#2A4B37]">{formatPrice(completedOrder.finalAmount)}</span>
              </div>
            </div>

            <p className="text-xs text-[#7A8B7E]">
              Nhân viên chăm sóc khách hàng LUNARA hoặc chatbot AI sẽ gửi thông báo hành trình qua Sapo Express.
            </p>

            <button
              onClick={handleClose}
              className="mt-4 px-8 py-3 bg-[#2A4B37] text-white font-medium rounded-xl hover:bg-[#1E3728] transition-all cursor-pointer"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="mb-6 pb-4 border-b border-[#E7E4DC]">
              <span className="text-xs font-semibold tracking-wider text-[#C29B38] uppercase">
                Xác nhận thanh toán đơn lẻ
              </span>
              <h2 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
                Thông tin Giao hàng & Thanh toán
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Customer Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Họ và tên người nhận *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5DCD6] text-sm focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Số điện thoại nhận hàng *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5DCD6] text-sm focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Địa chỉ email · nhận hóa đơn điện tử Sapo Invoice
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5DCD6] text-sm focus:outline-none focus:border-[#2A4B37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Địa chỉ nhận hàng chi tiết · Số nhà, tên đường, phường/xã, quận/huyện *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Số 10, Ngõ 45, Đường Xuân Thủy, Cầu Giấy, Hà Nội"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5DCD6] text-sm focus:outline-none focus:border-[#2A4B37]"
                />
              </div>

              {/* Carrier Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-2 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#2A4B37]" />
                  <span>Đối tác Vận chuyển · Tích hợp Sapo Express:</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCarrier('Viettel Post')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      carrier === 'Viettel Post'
                        ? 'border-[#2A4B37] bg-[#F0F7F1]'
                        : 'border-[#D5DCD6] bg-white'
                    }`}
                  >
                    <p className="text-xs font-bold text-[#1F3325]">Viettel Post</p>
                    <p className="text-[11px] text-[#6B7D70]">Bưu chính uy tín toàn quốc · 2-3 ngày</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCarrier('J&T Express')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      carrier === 'J&T Express'
                        ? 'border-[#2A4B37] bg-[#F0F7F1]'
                        : 'border-[#D5DCD6] bg-white'
                    }`}
                  >
                    <p className="text-xs font-bold text-[#1F3325]">J&T Express</p>
                    <p className="text-[11px] text-[#6B7D70]">Giao hàng hỏa tốc liên tỉnh · 1-2 ngày</p>
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-2">
                  Phương thức Thanh toán an toàn:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-[#2A4B37] bg-[#F0F7F1] font-semibold text-[#2A4B37]' : 'border-[#D5DCD6] bg-white'
                    }`}
                  >
                    <span>Thu tiền COD</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'bank_transfer' ? 'border-[#2A4B37] bg-[#F0F7F1] font-semibold text-[#2A4B37]' : 'border-[#D5DCD6] bg-white'
                    }`}
                  >
                    <span>Chuyển khoản QR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'momo' ? 'border-[#2A4B37] bg-[#F0F7F1] font-semibold text-[#2A4B37]' : 'border-[#D5DCD6] bg-white'
                    }`}
                  >
                    <span>Ví MoMo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vnpay')}
                    className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'vnpay' ? 'border-[#2A4B37] bg-[#F0F7F1] font-semibold text-[#2A4B37]' : 'border-[#D5DCD6] bg-white'
                    }`}
                  >
                    <span>VNPAY QR</span>
                  </button>
                </div>
              </div>

              {/* Total & Submit */}
              <div className="pt-4 border-t border-[#E7E4DC] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6F7F72] block">Tổng số tiền thanh toán:</span>
                  <span className="text-xl font-bold text-[#2A4B37] tabular-nums">
                    {formatPrice(finalAmount)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#2A4B37] hover:bg-[#1E3728] text-white font-medium rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Hoàn tất đặt hàng</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
