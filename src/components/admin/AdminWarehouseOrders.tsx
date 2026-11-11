import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Eye,
  Printer,
  X,
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  Barcode
} from 'lucide-react';

export const AdminWarehouseOrders: React.FC = () => {
  const { orders, updateOrderStatus, showToast } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Modals
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<Order | null>(null);
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!o.id.toLowerCase().includes(q) && !o.customerName.toLowerCase().includes(q) && !o.phone.includes(q) && !o.trackingNumber.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (filterStatus !== 'all' && o.orderStatus !== filterStatus) return false;
    return true;
  });

  const getStatusBadge = (status: Order['orderStatus']) => {
    switch (status) {
      case 'confirmed':
        return <span className="bg-blue-100 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-md font-bold text-[11px]">1. Đã tiếp nhận đơn</span>;
      case 'stock_validated':
        return <span className="bg-purple-100 text-purple-900 border border-purple-200 px-2.5 py-1 rounded-md font-bold text-[11px]">2. Đã duyệt tồn kho</span>;
      case 'processing':
        return <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-md font-bold text-[11px]">3. Kho Sapo đóng gói</span>;
      case 'shipped':
        return <span className="bg-indigo-100 text-indigo-900 border border-indigo-200 px-2.5 py-1 rounded-md font-bold text-[11px]">4. Đang giao hàng</span>;
      case 'delivered':
        return <span className="bg-emerald-100 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-md font-bold text-[11px]">5. Giao thành công</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-900 border border-red-200 px-2.5 py-1 rounded-md font-bold text-[11px]">Đã hủy đơn</span>;
      default:
        return null;
    }
  };

  const advanceOrderStatus = (order: Order) => {
    if (order.orderStatus === 'confirmed') {
      updateOrderStatus(order.id, 'stock_validated', 'paid');
    } else if (order.orderStatus === 'stock_validated') {
      updateOrderStatus(order.id, 'processing');
    } else if (order.orderStatus === 'processing') {
      updateOrderStatus(order.id, 'shipped');
    } else if (order.orderStatus === 'shipped') {
      updateOrderStatus(order.id, 'delivered');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E4DC]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2A4B37] uppercase tracking-wider mb-1">
            <Truck className="w-4 h-4 text-[#C29B38]" />
            <span>Quy trình Xử lý Đơn hàng Chuẩn TO-BE (Sapo Fulfillment)</span>
          </div>
          <h2 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
            Quản Lý Đơn Hàng & Vận Chuyển Đa Kênh
          </h2>
          <p className="text-xs text-[#5D6F61] mt-1">
            Xem danh sách đơn hàng, cập nhật trạng thái tức thì, in phiếu xuất kho và kết nối bưu tá Viettel Post / J&T Express.
          </p>
        </div>
      </div>

      {/* Swimlane Process Workflow Banner */}
      <div className="p-4 rounded-2xl bg-[#EAF2EC] border border-[#D0E2D4] text-xs text-[#2A4B37] space-y-2">
        <p className="font-bold flex items-center gap-1.5">
          <RefreshCw className="w-4 h-4 text-[#C29B38]" />
          <span>Mô hình Chuẩn Hóa Tiến Trình Tự Động (LUNARA Sapo TO-BE Workflow):</span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] pt-1">
          <div className="p-2.5 bg-white rounded-xl border border-[#D5E5DA]">
            <strong className="block text-[#1F3325]">1. Sapo Order Capture</strong>
            Tự động ghi nhận đơn D2C & TikTok Shop
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-[#D5E5DA]">
            <strong className="block text-[#1F3325]">2. Auto Stock Check</strong>
            Kiểm tra số lô thảo mộc & hạn dùng EXP
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-[#D5E5DA]">
            <strong className="block text-[#1F3325]">3. Auto Payment Sync</strong>
            Xác thực thanh toán ngân hàng & QR
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-[#D5E5DA]">
            <strong className="block text-[#1F3325]">4. Sapo Express Dispatch</strong>
            In vận đơn & bàn giao bưu tá Viettel/J&T
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-[#E3DFD5] p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F9182]" />
          <input
            type="text"
            placeholder="Tìm theo mã đơn, tên khách, SĐT, mã vận đơn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6F7F72]">Lọc trạng thái:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-[#D5DCD6] text-[#2A4B37] bg-white cursor-pointer font-medium"
          >
            <option value="all">Tất cả đơn hàng ({orders.length})</option>
            <option value="confirmed">1. Đã tiếp nhận đơn</option>
            <option value="stock_validated">2. Đã duyệt tồn kho</option>
            <option value="processing">3. Đang đóng gói</option>
            <option value="shipped">4. Đang vận chuyển</option>
            <option value="delivered">5. Giao thành công</option>
            <option value="cancelled">Đã hủy đơn</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#E3DFD5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F8F6] text-[#526356] font-semibold border-b border-[#E7E4DC]">
              <tr>
                <th className="p-4">Mã đơn & Thời gian</th>
                <th className="p-4">Khách hàng & Kênh</th>
                <th className="p-4">Mặt hàng mua</th>
                <th className="p-4">Tổng tiền & Thanh toán</th>
                <th className="p-4">Vận chuyển & Vận đơn</th>
                <th className="p-4">Trạng thái xử lý</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE4]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF9F5] transition-colors">
                  {/* Order ID & Created At */}
                  <td className="p-4">
                    <p className="font-bold text-[#1F3325] font-mono text-xs">{order.id}</p>
                    <p className="text-[11px] text-[#7A8B7E] mt-0.5">{order.createdAt}</p>
                  </td>

                  {/* Customer info & Channel */}
                  <td className="p-4">
                    <p className="font-bold text-[#1F3325]">{order.customerName}</p>
                    <p className="text-[11px] text-[#7A8B7E] font-mono">{order.phone}</p>
                    <span className="text-[10px] bg-[#FAF3E0] text-[#8C6D23] px-2 py-0.5 rounded font-semibold mt-1 inline-block">
                      {order.channel}
                    </span>
                  </td>

                  {/* Items summary */}
                  <td className="p-4 max-w-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#3F4F42]">
                        <span className="text-[#C29B38] font-bold">•</span>
                        <span className="truncate">{item.productName}</span>
                        <span className="font-bold text-[#2A4B37] tabular-nums">x{item.quantity}</span>
                      </div>
                    ))}
                  </td>

                  {/* Amount & Payment */}
                  <td className="p-4">
                    <p className="font-bold text-[#2A4B37] text-sm tabular-nums">
                      {order.finalAmount.toLocaleString('vi-VN')} ₫
                    </p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase inline-block mt-0.5 ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.paymentMethod.toUpperCase()} · {order.paymentStatus === 'paid' ? 'Đã thu tiền' : 'Thu COD'}
                    </span>
                  </td>

                  {/* Shipping info */}
                  <td className="p-4">
                    <p className="font-semibold text-[#1F3325]">{order.shippingCarrier}</p>
                    <p className="text-[11px] font-mono font-bold text-emerald-800">{order.trackingNumber}</p>
                  </td>

                  {/* Status badge & Quick dropdown */}
                  <td className="p-4 space-y-1">
                    <div>{getStatusBadge(order.orderStatus)}</div>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                      className="text-[10px] py-1 px-2 rounded-md border border-[#D5DCD6] text-[#2A4B37] bg-white cursor-pointer font-medium"
                    >
                      <option value="confirmed">1. Đã tiếp nhận</option>
                      <option value="stock_validated">2. Duyệt tồn kho</option>
                      <option value="processing">3. Đang đóng gói</option>
                      <option value="shipped">4. Đang giao hàng</option>
                      <option value="delivered">5. Đã giao thành công</option>
                      <option value="cancelled">Hủy đơn</option>
                    </select>
                  </td>

                  {/* Actions: View Detail, Print, Advance */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View Detail button */}
                      <button
                        onClick={() => setSelectedOrderForDetail(order)}
                        className="p-1.5 rounded-lg text-[#2A4B37] hover:bg-[#EAF2EC] transition-colors cursor-pointer"
                        title="Xem chi tiết đơn hàng"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Print Packing Slip */}
                      <button
                        onClick={() => setSelectedOrderForPrint(order)}
                        className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        title="In phiếu xuất kho & vận đơn"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      {/* Advance workflow button */}
                      {order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                        <button
                          onClick={() => advanceOrderStatus(order)}
                          className="px-2.5 py-1 bg-[#2A4B37] hover:bg-[#1E3728] text-white rounded-lg text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1"
                          title="Duyệt nhanh sang bước tiếp theo"
                        >
                          <span>Tiếp</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          MODAL 1: CHI TIẾT ĐƠN HÀNG (Order Details Modal)
         ======================================================== */}
      {selectedOrderForDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl border border-[#E7E4DC]">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E7E4DC] flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#2A4B37]" />
                <h3 className="font-serif-brand text-lg font-bold text-[#1F3325]">
                  Chi Tiết Đơn Hàng: {selectedOrderForDetail.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Status & Tracking Banner */}
              <div className="p-4 bg-[#F2F7F4] rounded-2xl border border-[#D5E5DA] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-[#6F7F72] block">Trạng thái đơn hàng:</span>
                  <div className="mt-1">{getStatusBadge(selectedOrderForDetail.orderStatus)}</div>
                </div>
                <div>
                  <span className="text-[11px] text-[#6F7F72] block">Đơn vị vận chuyển:</span>
                  <p className="font-bold text-[#1F3325] text-xs mt-0.5">
                    {selectedOrderForDetail.shippingCarrier} · Mã vận đơn: <span className="font-mono text-[#2A4B37]">{selectedOrderForDetail.trackingNumber}</span>
                  </p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-[#FAF9F5] space-y-2 text-xs">
                <h4 className="font-bold text-[#1F3325] text-sm flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#C29B38]" />
                  <span>Thông Tin Người Nhận Hàng:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#465A4B] pt-1">
                  <p><strong>Họ tên:</strong> {selectedOrderForDetail.customerName}</p>
                  <p><strong>Số điện thoại:</strong> {selectedOrderForDetail.phone}</p>
                  <p><strong>Email:</strong> {selectedOrderForDetail.email}</p>
                  <p><strong>Kênh bán:</strong> {selectedOrderForDetail.channel}</p>
                  <p className="sm:col-span-2"><strong>Địa chỉ giao hàng:</strong> {selectedOrderForDetail.shippingAddress}</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-[#1F3325] uppercase tracking-wider">
                  Danh Sách Sản Phẩm Trong Đơn ({selectedOrderForDetail.items.length})
                </h4>
                <div className="border border-[#E7E4DC] rounded-2xl overflow-hidden divide-y divide-[#EFECE4]">
                  {selectedOrderForDetail.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between gap-4 bg-white">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-12 h-12 object-cover rounded-xl bg-[#F0F5F1] border border-[#E7E4DC]"
                        />
                        <div>
                          <p className="font-bold text-xs text-[#1F3325]">{item.productName}</p>
                          <p className="text-[11px] text-[#7A8B7E]">
                            Đơn giá: {item.price.toLocaleString('vi-VN')} ₫
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-xs text-[#2A4B37] tabular-nums block">
                          {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                        </span>
                        <span className="text-[11px] text-[#6F7F72]">Số lượng: x{item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="p-4 rounded-2xl bg-[#F9FAF9] border border-[#E7E4DC] space-y-2 text-xs">
                <div className="flex justify-between text-[#6F7F72]">
                  <span>Tạm tính hàng hóa:</span>
                  <span className="tabular-nums font-medium">{selectedOrderForDetail.totalAmount.toLocaleString('vi-VN')} ₫</span>
                </div>
                {selectedOrderForDetail.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Ưu đãi voucher Green Bottle:</span>
                    <span className="tabular-nums font-medium">-{selectedOrderForDetail.discountAmount.toLocaleString('vi-VN')} ₫</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6F7F72]">
                  <span>Phí vận chuyển Sapo Express:</span>
                  <span className="text-emerald-700 font-medium">Miễn phí giao hàng</span>
                </div>
                <div className="pt-2 border-t border-[#E5E1D8] flex justify-between items-baseline text-sm font-bold text-[#1F3325]">
                  <span>Tổng thanh toán:</span>
                  <span className="text-xl text-[#2A4B37] tabular-nums">{selectedOrderForDetail.finalAmount.toLocaleString('vi-VN')} ₫</span>
                </div>
                <p className="text-[11px] text-[#7A8B7E] pt-1">
                  Phương thức: <strong>{selectedOrderForDetail.paymentMethod.toUpperCase()}</strong> · Trạng thái: <strong>{selectedOrderForDetail.paymentStatus === 'paid' ? 'Đã thanh toán đủ' : 'Chưa thu tiền (COD)'}</strong>
                </p>
              </div>
            </div>

            <div className="bg-[#FAF9F5] px-6 py-4 border-t border-[#E7E4DC] flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedOrderForPrint(selectedOrderForDetail);
                  setSelectedOrderForDetail(null);
                }}
                className="px-4 py-2 bg-white border border-[#D5DCD6] text-xs font-semibold rounded-xl hover:bg-[#F2F7F4] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-[#2A4B37]" />
                <span>In Phiếu Xuất Kho / Vận Đơn</span>
              </button>

              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="px-5 py-2 bg-[#2A4B37] text-white text-xs font-bold rounded-xl hover:bg-[#1E3728] transition-all cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: IN PHIẾU XUẤT KHO & VẬN ĐƠN (Print Slip Modal)
         ======================================================== */}
      {selectedOrderForPrint && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl max-h-[92vh] rounded-3xl overflow-y-auto shadow-2xl border border-[#E7E4DC] p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-dashed border-[#D5DCD6] pb-4">
              <div>
                <span className="font-serif-brand text-xl font-bold text-[#1F3325] tracking-wider block">
                  LUNARA COSMETICS
                </span>
                <span className="text-[10px] text-[#7A8B7E]">
                  PHIẾU XUẤT KHO KIÊM VẬN ĐƠN SAPO EXPRESS
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-xs text-[#2A4B37] block">
                  {selectedOrderForPrint.id}
                </span>
                <span className="text-[10px] text-[#7A8B7E]">{selectedOrderForPrint.createdAt}</span>
              </div>
            </div>

            {/* Barcode Simulator */}
            <div className="p-3 bg-[#F9FAF9] rounded-xl border border-[#E7E4DC] text-center space-y-1">
              <div className="font-mono text-lg tracking-[8px] font-bold text-[#1F3325]">
                ||||| | |||| ||| ||||||| |||
              </div>
              <p className="font-mono text-xs text-[#2A4B37] font-bold">
                {selectedOrderForPrint.shippingCarrier}: {selectedOrderForPrint.trackingNumber}
              </p>
            </div>

            {/* Sender & Receiver Info */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E7E4DC] space-y-1">
                <strong className="block text-[#1F3325] font-bold">NGƯỜI GỬI:</strong>
                <p>Kho LUNARA Central Hub</p>
                <p>Hotline: 1234-1900</p>
                <p>Bến Tre & Thái Nguyên Hub</p>
              </div>

              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E7E4DC] space-y-1">
                <strong className="block text-[#1F3325] font-bold">NGƯỜI NHẬN:</strong>
                <p className="font-bold">{selectedOrderForPrint.customerName}</p>
                <p>{selectedOrderForPrint.phone}</p>
                <p className="text-[11px] leading-tight">{selectedOrderForPrint.shippingAddress}</p>
              </div>
            </div>

            {/* Products Table */}
            <div className="text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D5DCD6] text-[#6F7F72] text-[11px]">
                    <th className="py-1">Mặt hàng</th>
                    <th className="py-1 text-center">SL</th>
                    <th className="py-1 text-right">Đơn giá</th>
                    <th className="py-1 text-right">T.Tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE4]">
                  {selectedOrderForPrint.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2">{item.productName}</td>
                      <td className="py-2 text-center font-bold">{item.quantity}</td>
                      <td className="py-2 text-right tabular-nums">{item.price.toLocaleString('vi-VN')} ₫</td>
                      <td className="py-2 text-right tabular-nums font-bold text-[#2A4B37]">
                        {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Amount details */}
            <div className="border-t border-dashed border-[#D5DCD6] pt-3 text-xs space-y-1">
              <div className="flex justify-between font-bold text-sm text-[#1F3325]">
                <span>Tổng thu (COD/Đã trả):</span>
                <span className="text-[#2A4B37] text-base tabular-nums">
                  {selectedOrderForPrint.paymentStatus === 'paid' ? '0 ₫ (Đã thanh toán)' : `${selectedOrderForPrint.finalAmount.toLocaleString('vi-VN')} ₫`}
                </span>
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-4 text-center text-xs pt-4 border-t border-[#E7E4DC]">
              <div>
                <p className="font-bold text-[#1F3325]">Người Đóng Gói Kho Sapo</p>
                <p className="text-[10px] text-[#7A8B7E] mt-8">(Ký và ghi rõ họ tên)</p>
              </div>
              <div>
                <p className="font-bold text-[#1F3325]">Bưu Tá Nhận Hàng</p>
                <p className="text-[10px] text-[#7A8B7E] mt-8">({selectedOrderForPrint.shippingCarrier})</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E4DC]">
              <button
                type="button"
                onClick={() => setSelectedOrderForPrint(null)}
                className="px-4 py-2 border border-[#D5DCD6] text-xs font-semibold rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Đã xuất lệnh in phiếu xuất kho ${selectedOrderForPrint.id}!`);
                  setSelectedOrderForPrint(null);
                }}
                className="px-6 py-2 bg-[#2A4B37] text-white text-xs font-bold rounded-xl hover:bg-[#1E3728] shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>In Phiếu Ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
