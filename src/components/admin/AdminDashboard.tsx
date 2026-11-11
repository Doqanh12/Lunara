import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Package,
  Users,
  Recycle,
  Sparkles,
  ShoppingBag,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { products, orders, customers, blogs, setAdminTab } = useApp();

  const totalRevenue = orders.reduce((sum, o) => sum + o.finalAmount, 0);
  const totalBottlesRecycled = customers.reduce((sum, c) => sum + c.bottlesRecycled, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus !== 'delivered' && o.orderStatus !== 'cancelled').length;
  const lowStockProducts = products.filter((p) => p.stock < 35);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#243D2E] to-[#1C3224] text-white shadow-lg border border-[#3A5644] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Hệ thống Quản trị Doanh nghiệp LUNARA · SAPO Omnichannel</span>
          </div>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold">
            Chào mừng trở lại, Ban Giám Đốc LUNARA!
          </h2>
          <p className="text-xs sm:text-sm text-[#D1E0D5] max-w-xl leading-relaxed">
            Hệ thống đang đồng bộ dữ liệu trực tuyến giữa Website D2C, TikTok Shop, Shopee và mạng lưới bán buôn Guardian & Hasaki.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setAdminTab('blogs')}
            className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#C29B38] text-[#1C2C22] text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            + Viết bài quảng cáo mới
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer border border-white/20"
          >
            Quản lý kho sản phẩm
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Doanh thu */}
        <div className="p-5 rounded-2xl bg-white border border-[#E3DFD5] shadow-xs">
          <div className="flex items-center justify-between text-[#6F7F72] text-xs mb-2">
            <span>Tổng doanh thu đa kênh</span>
            <div className="w-8 h-8 rounded-full bg-[#EAF2EC] text-[#2A4B37] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1F3325] tabular-nums font-mono">
            {formatPrice(totalRevenue)}
          </p>
          <p className="text-[11px] text-[#408558] font-medium mt-1">
            ↑ +18.4% so với tháng trước (Tăng trưởng D2C & TikTok)
          </p>
        </div>

        {/* Đơn hàng */}
        <div className="p-5 rounded-2xl bg-white border border-[#E3DFD5] shadow-xs">
          <div className="flex items-center justify-between text-[#6F7F72] text-xs mb-2">
            <span>Đơn hàng đang xử lý (TO-BE)</span>
            <div className="w-8 h-8 rounded-full bg-[#FAF3E0] text-[#C29B38] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1F3325] tabular-nums font-mono">
            {pendingOrders} <span className="text-xs font-normal text-[#6F7F72]">/ {orders.length} tổng đơn</span>
          </p>
          <p className="text-[11px] text-[#2A4B37] font-medium mt-1">
            ✓ 100% tự động duyệt tồn kho qua Sapo
          </p>
        </div>

        {/* Khách hàng CRM */}
        <div className="p-5 rounded-2xl bg-white border border-[#E3DFD5] shadow-xs">
          <div className="flex items-center justify-between text-[#6F7F72] text-xs mb-2">
            <span>Khách hàng trong CRM</span>
            <div className="w-8 h-8 rounded-full bg-[#EBF0FF] text-[#3451B2] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1F3325] tabular-nums font-mono">
            {customers.length} <span className="text-xs font-normal text-[#6F7F72]">hồ sơ</span>
          </p>
          <p className="text-[11px] text-[#6F7F72] font-medium mt-1">
            35% Da nhạy cảm · 40% Giới trẻ Gen Z
          </p>
        </div>

        {/* Vỏ chai tái chế */}
        <div className="p-5 rounded-2xl bg-white border border-[#E3DFD5] shadow-xs">
          <div className="flex items-center justify-between text-[#6F7F72] text-xs mb-2">
            <span>Chai rỗng thu hồi (Green Bottle)</span>
            <div className="w-8 h-8 rounded-full bg-[#E6F4EA] text-emerald-800 flex items-center justify-center">
              <Recycle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1F3325] tabular-nums font-mono">
            {totalBottlesRecycled} <span className="text-xs font-normal text-[#6F7F72]">vỏ chai</span>
          </p>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">
            Đã chuyển đối tác Kapac & SCG tái chế
          </p>
        </div>
      </div>

      {/* 2 Columns: Multi-channel sales distribution & Low stock alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales by Channels */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E3DFD5] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-3">
            <h3 className="font-serif-brand text-lg font-bold text-[#1F3325]">
              Cơ cấu Doanh số theo Kênh Bán hàng (Omnichannel)
            </h3>
            <span className="text-xs text-[#7A8B7E]">Chuẩn tích hợp Sapo</span>
          </div>

          <div className="space-y-3.5 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#1F3325] mb-1">
                <span>Website D2C Chính Hãng (Biên lợi nhuận cao nhất)</span>
                <span className="tabular-nums">52% (2.450.000 ₫)</span>
              </div>
              <div className="w-full bg-[#F0F5F1] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#2A4B37] h-full rounded-full" style={{ width: '52%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#1F3325] mb-1">
                <span>TikTok Shop (Livestream cùng KOC Trinh Meow)</span>
                <span className="tabular-nums">26% (1.220.000 ₫)</span>
              </div>
              <div className="w-full bg-[#F0F5F1] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#C29B38] h-full rounded-full" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#1F3325] mb-1">
                <span>Sàn Shopee Mall</span>
                <span className="tabular-nums">14% (660.000 ₫)</span>
              </div>
              <div className="w-full bg-[#F0F5F1] h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '14%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#1F3325] mb-1">
                <span>Kênh Bán lẻ Offline (Guardian, Hasaki)</span>
                <span className="tabular-nums">8% (380.000 ₫)</span>
              </div>
              <div className="w-full bg-[#F0F5F1] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#5A7363] h-full rounded-full" style={{ width: '8%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock & Expiration Warnings (Sapo Warehouse) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#E3DFD5] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-3">
            <h3 className="font-serif-brand text-lg font-bold text-[#1F3325] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Cảnh báo Lô Tồn kho & Hạn dùng</span>
            </h3>
            <button
              onClick={() => setAdminTab('products')}
              className="text-xs text-[#2A4B37] font-semibold hover:underline cursor-pointer"
            >
              Xem kho →
            </button>
          </div>

          <p className="text-xs text-[#6F7F72]">
            Mỹ phẩm thuần chay hữu cơ nhạy cảm với hạn dùng (tối đa 18-24 tháng). Hệ thống cảnh báo tự động kích hoạt tái đặt hàng (Auto-replenish):
          </p>

          <div className="space-y-2.5 pt-1">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EBE4D5] flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-[#1F3325]">{p.name}</p>
                  <p className="text-[10px] text-[#7A8B7E] font-mono">
                    Lô: {p.batchNo} · HSD: {p.expiryDate}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Còn {p.stock} chai
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
