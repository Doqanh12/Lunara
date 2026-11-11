import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Customer, CustomerSegment } from '../../types';
import {
  Users,
  Search,
  Filter,
  UserCheck,
  Recycle,
  Mail,
  Send,
  Plus,
  Tag,
  Sparkles,
  Heart,
  Award,
  CheckCircle,
  Eye,
  X,
  Phone,
  MapPin,
  Calendar,
  Gift
} from 'lucide-react';

export const AdminCustomerCRM: React.FC = () => {
  const { customers, addCustomer, activateMembership, addRecycledBottles, showToast, language } = useApp();

  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');
  const [selectedConcern, setSelectedConcern] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Modals state
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [campaignModalCustomer, setCampaignModalCustomer] = useState<Customer | null>(null);
  const [campaignMessage, setCampaignMessage] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Add customer form
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newSkinType, setNewSkinType] = useState<Customer['skinType']>('Da nhạy cảm');
  const [newConcern, setNewConcern] = useState<Customer['primaryConcern']>('Nếp nhăn & Lão hóa');
  const [newSegment, setNewSegment] = useState<CustomerSegment>('sensitive_skin');

  const segmentLabels: Record<CustomerSegment, string> = {
    gen_z: 'Gen Z · 16-25 tuổi · Nhạy bén xu hướng',
    office_worker: 'Giới Văn Phòng · 23-35 tuổi · Giá trị cao',
    eco_lifestyle: 'Lối Sống Xanh · 25-40 tuổi · Bền vững',
    sensitive_skin: 'Người Da Nhạy Cảm · Trung thành cao',
  };

  const filteredCustomers = customers.filter((c) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!c.fullName.toLowerCase().includes(q) && !c.phone.includes(q) && !c.email.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (selectedSegment !== 'all' && c.segment !== selectedSegment) return false;
    if (selectedSkinType !== 'all' && c.skinType !== selectedSkinType) return false;
    if (selectedConcern !== 'all' && c.primaryConcern !== selectedConcern) return false;
    return true;
  });

  const handleOpenCampaign = (c: Customer) => {
    setCampaignModalCustomer(c);
    setCampaignMessage(
      `Chào ${c.fullName}! LUNARA AI nhận thấy bạn đang quan tâm đến "${c.primaryConcern}" cho "${c.skinType}". ` +
      `LUNARA gửi tặng bạn mã voucher chăm sóc cá nhân hóa: [VEGAN-${c.skinType.slice(0, 3).toUpperCase()}] giảm 15% cho dòng Chamomile Serum & kem chống nhăn GreenCalm!`
    );
  };

  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignModalCustomer) return;
    showToast(`Đã gửi thông điệp chăm sóc cá nhân hóa đến ${campaignModalCustomer.fullName} (${campaignModalCustomer.email}) qua Sapo CRM!`);
    setCampaignModalCustomer(null);
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone) return;

    addCustomer({
      fullName: newFullName,
      email: newEmail || `${newPhone}@customer.lunara.vn`,
      phone: newPhone,
      address: newAddress || 'Việt Nam',
      skinType: newSkinType,
      primaryConcern: newConcern,
      segment: newSegment,
      isMember: true,
      notes: 'Đăng ký qua cổng Sapo CRM',
    });

    setIsAddOpen(false);
    setNewFullName('');
    setNewEmail('');
    setNewPhone('');
    setNewAddress('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E4DC]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2A4B37] uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-[#C29B38]" />
            <span>Hệ Thống Sapo CRM & Dữ Liệu Khách Hàng Cá Nhân Hóa</span>
          </div>
          <h2 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
            Quản Lý Khách Hàng & Phân Khúc LUNARA
          </h2>
          <p className="text-xs text-[#5D6F61] mt-1">
            Theo dõi phân khúc 4 nhóm khách hàng chiến lược, loại da, mối quan tâm da và tiến độ đổi vỏ chai Green Bottle.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-2.5 bg-[#2A4B37] hover:bg-[#1E3728] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm khách hàng mới</span>
        </button>
      </div>

      {/* 4 Segment Quick Filter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {(['gen_z', 'office_worker', 'eco_lifestyle', 'sensitive_skin'] as CustomerSegment[]).map((seg) => {
          const count = customers.filter((c) => c.segment === seg).length;
          const isSelected = selectedSegment === seg;
          return (
            <div
              key={seg}
              onClick={() => setSelectedSegment(isSelected ? 'all' : seg)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#2A4B37] text-white border-[#2A4B37] shadow-xs'
                  : 'bg-white text-[#263529] border-[#E3DFD5] hover:border-[#CAD7CE]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#D4AF37]' : 'text-[#7F9182]'}`}>
                  Phân khúc
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-[#EAF2EC] text-[#2A4B37]'}`}>
                  {count} khách
                </span>
              </div>
              <p className="font-bold text-xs mt-1.5 line-clamp-1">{segmentLabels[seg].split('(')[0]}</p>
              <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#7A8B7E]'}`}>
                {segmentLabels[seg].split('(')[1]?.replace(')', '') || ''}
              </p>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl border border-[#E3DFD5] p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F9182]" />
          <input
            type="text"
            placeholder="Tìm theo tên, số điện thoại, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6F7F72]">Loại da:</span>
            <select
              value={selectedSkinType}
              onChange={(e) => setSelectedSkinType(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-[#D5DCD6] text-[#2A4B37] bg-white cursor-pointer font-medium"
            >
              <option value="all">Tất cả loại da</option>
              <option value="Da nhạy cảm">Da nhạy cảm</option>
              <option value="Da dầu">Da dầu</option>
              <option value="Da khô">Da khô</option>
              <option value="Da hỗn hợp">Da hỗn hợp</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6F7F72]">Mối quan tâm:</span>
            <select
              value={selectedConcern}
              onChange={(e) => setSelectedConcern(e.target.value)}
              className="text-xs py-1.5 px-3 rounded-xl border border-[#D5DCD6] text-[#2A4B37] bg-white cursor-pointer font-medium"
            >
              <option value="all">Tất cả vấn đề</option>
              <option value="Nếp nhăn & Lão hóa">Nếp nhăn & Lão hóa</option>
              <option value="Kích ứng & Mẩn đỏ">Kích ứng & Mẩn đỏ</option>
              <option value="Mụn & Lỗ chân lông">Mụn & Lỗ chân lông</option>
              <option value="Thiếu ẩm & Bong tróc">Thiếu ẩm & Bong tróc</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-[#E3DFD5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F8F6] text-[#526356] font-semibold border-b border-[#E7E4DC]">
              <tr>
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Loại da & Mối quan tâm</th>
                <th className="p-4">Phân khúc</th>
                <th className="p-4">Hạng thành viên Sapo</th>
                <th className="p-4">Tích lũy & Đơn hàng</th>
                <th className="p-4">Vỏ chai tái chế</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE4]">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF9F5] transition-colors">
                  {/* Customer info */}
                  <td className="p-4">
                    <p className="font-bold text-[#1F3325] text-sm">{c.fullName}</p>
                    <p className="text-[11px] text-[#7A8B7E] font-mono">{c.phone}</p>
                    <p className="text-[10px] text-[#9EAFA1]">{c.email}</p>
                  </td>

                  {/* Skin type & Concern */}
                  <td className="p-4">
                    <span className="bg-[#EAF2EC] text-[#2A4B37] px-2 py-0.5 rounded font-bold text-[10px] inline-block">
                      {c.skinType}
                    </span>
                    <p className="text-[11px] text-[#55695A] mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#C29B38]" />
                      <span>{c.primaryConcern}</span>
                    </p>
                  </td>

                  {/* Segment */}
                  <td className="p-4">
                    <span className="text-[11px] font-semibold text-[#1F3325] block">
                      {segmentLabels[c.segment]?.split('(')[0]}
                    </span>
                    <span className="text-[10px] text-[#7A8B7E]">
                      {c.segment === 'sensitive_skin' ? 'Tỷ lệ trung thành cao' : 'Tiềm năng LTV cao'}
                    </span>
                  </td>

                  {/* Loyalty Tier */}
                  <td className="p-4">
                    <span className="bg-[#FAF3E0] text-[#8C6D23] px-2 py-0.5 rounded font-bold text-[11px] inline-block border border-[#EADBBD]">
                      {c.loyaltyTier}
                    </span>
                    <p className="text-[10px] text-[#7A8B7E] mt-0.5">
                      {c.loyaltyPoints} điểm tích lũy
                    </p>
                  </td>

                  {/* Spending & Orders */}
                  <td className="p-4">
                    <p className="font-bold text-[#2A4B37] tabular-nums">
                      {c.totalSpent.toLocaleString('vi-VN')} ₫
                    </p>
                    <p className="text-[11px] text-[#7A8B7E]">{c.ordersCount} đơn đã đặt</p>
                  </td>

                  {/* Green Bottles */}
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-emerald-800 font-bold">
                      <Recycle className="w-3.5 h-3.5" />
                      <span>{c.bottlesRecycled} vỏ chai</span>
                    </span>
                    <span className="text-[10px] text-[#7A8B7E] block mt-0.5">Green Bottle</span>
                  </td>

                  {/* Actions: View Detail, Campaign Message */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View Profile */}
                      <button
                        onClick={() => setViewingCustomer(c)}
                        className="p-1.5 rounded-lg text-[#2A4B37] hover:bg-[#EAF2EC] transition-colors cursor-pointer"
                        title="Xem chi tiết hồ sơ khách hàng"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Send Campaign message */}
                      <button
                        onClick={() => handleOpenCampaign(c)}
                        className="px-2.5 py-1 rounded-lg bg-[#2A4B37] hover:bg-[#1E3728] text-white text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                        title="Gửi ưu đãi cá nhân hóa"
                      >
                        <Gift className="w-3 h-3 text-[#D4AF37]" />
                        <span>Ưu đãi</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          MODAL 1: XEM CHI TIẾT HỒ SƠ KHÁCH HÀNG (Customer Profile)
         ======================================================== */}
      {viewingCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl border border-[#E7E4DC]">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E7E4DC] flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2A4B37]" />
                <h3 className="font-serif-brand text-lg font-bold text-[#1F3325]">
                  Hồ Sơ Khách Hàng: {viewingCustomer.fullName} ({viewingCustomer.id})
                </h3>
              </div>
              <button
                onClick={() => setViewingCustomer(null)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Header Profile Summary */}
              <div className="p-5 bg-[#F2F7F4] rounded-2xl border border-[#D5E5DA] flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#2A4B37] text-white font-serif-brand text-2xl font-bold flex items-center justify-center shadow-xs">
                  {viewingCustomer.fullName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-[#1F3325] text-base">{viewingCustomer.fullName}</h2>
                    <span className="bg-[#FAF3E0] text-[#8C6D23] px-2 py-0.5 rounded text-[10px] font-bold border border-[#EADBBD]">
                      {viewingCustomer.loyaltyTier}
                    </span>
                  </div>
                  <p className="text-xs text-[#526356] mt-0.5">{viewingCustomer.email} · {viewingCustomer.phone}</p>
                  <p className="text-[11px] text-[#7A8B7E]">Ngày tham gia: {viewingCustomer.joinedDate}</p>
                </div>
              </div>

              {/* Skin Diagnostic & Concerns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-[#FAF9F5] space-y-2">
                  <h4 className="text-xs font-bold text-[#1F3325] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                    <span>{language === 'vi' ? 'Hồ Sơ Chẩn Đoán Làn Da:' : 'Skin Diagnostic Profile:'}</span>
                  </h4>
                  <p className="text-xs text-[#334437]">
                    Loại da: <strong className="text-[#2A4B37]">{viewingCustomer.skinType}</strong>
                  </p>
                  <p className="text-xs text-[#334437]">
                    Vấn đề quan tâm: <strong className="text-[#2A4B37]">{viewingCustomer.primaryConcern}</strong>
                  </p>
                  <p className="text-[11px] text-[#7A8B7E] pt-1">
                    Phân khúc: {segmentLabels[viewingCustomer.segment]}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[#E7E4DC] bg-[#FAF9F5] space-y-2">
                  <h4 className="text-xs font-bold text-[#1F3325] uppercase tracking-wider flex items-center gap-1.5">
                    <Recycle className="w-3.5 h-3.5 text-[#2A4B37]" />
                    <span>Chiến Dịch Green Bottle & Tích Điểm:</span>
                  </h4>
                  <p className="text-xs text-[#334437]">
                    Vỏ chai rỗng đã thu gom: <strong className="text-emerald-700 font-bold">{viewingCustomer.bottlesRecycled} vỏ chai</strong>
                  </p>
                  <p className="text-xs text-[#334437]">
                    Điểm thưởng Sapo Loyalty: <strong className="text-[#8C6D23] font-bold">{viewingCustomer.loyaltyPoints} điểm</strong>
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => addRecycledBottles(viewingCustomer.id, 5)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Ghi nhận thêm 5 vỏ chai (+100 điểm)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Lifetime Value & Orders */}
              <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] space-y-2">
                <h4 className="text-xs font-bold text-[#1F3325] uppercase tracking-wider">
                  {language === 'vi' ? 'Giá Trị Vòng Đời Khách Hàng' : 'Customer Lifetime Value'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-3 bg-[#F9FAF9] rounded-xl border border-[#EFECE4]">
                    <span className="text-[#7A8B7E] block text-[11px]">Tổng chi tiêu:</span>
                    <strong className="text-sm text-[#2A4B37] tabular-nums">{viewingCustomer.totalSpent.toLocaleString('vi-VN')} ₫</strong>
                  </div>
                  <div className="p-3 bg-[#F9FAF9] rounded-xl border border-[#EFECE4]">
                    <span className="text-[#7A8B7E] block text-[11px]">Số đơn hàng:</span>
                    <strong className="text-sm text-[#1F3325]">{viewingCustomer.ordersCount} đơn</strong>
                  </div>
                  <div className="p-3 bg-[#F9FAF9] rounded-xl border border-[#EFECE4]">
                    <span className="text-[#7A8B7E] block text-[11px]">Lần mua gần nhất:</span>
                    <strong className="text-xs text-[#1F3325]">{viewingCustomer.lastPurchaseDate || 'Chưa phát sinh'}</strong>
                  </div>
                </div>
              </div>

              {/* Address & Notes */}
              <div className="p-4 rounded-2xl bg-[#F9FAF9] border border-[#E7E4DC] space-y-1 text-xs">
                <p><strong>Địa chỉ nhận hàng:</strong> {viewingCustomer.address}</p>
                <p><strong>Ghi chú nội bộ CRM:</strong> {viewingCustomer.notes || 'Khách hàng quan tâm các sản phẩm thuần chay, làn da dễ kích ứng.'}</p>
              </div>
            </div>

            <div className="bg-[#FAF9F5] px-6 py-4 border-t border-[#E7E4DC] flex items-center justify-between">
              <button
                onClick={() => {
                  const cust = viewingCustomer;
                  setViewingCustomer(null);
                  handleOpenCampaign(cust);
                }}
                className="px-4 py-2 bg-[#2A4B37] text-white text-xs font-bold rounded-xl hover:bg-[#1E3728] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Gửi ưu đãi cá nhân hóa</span>
              </button>

              <button
                onClick={() => setViewingCustomer(null)}
                className="px-5 py-2 border border-[#D5DCD6] text-xs font-semibold rounded-xl hover:bg-white cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: GỬI CHIẾN DỊCH CHĂM SÓC CÁ NHÂN HÓA (Campaign)
         ======================================================== */}
      {campaignModalCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-[#E7E4DC] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-3">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#2A4B37]" />
                <h3 className="font-serif-brand text-lg font-bold text-[#1F3325]">
                  {language === 'vi' ? 'Gửi Ưu Đãi Cá Nhân Hóa' : 'Send Personalized Offer'}
                </h3>
              </div>
              <button
                onClick={() => setCampaignModalCustomer(null)}
                className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[#F2F7F4] rounded-xl border border-[#D5E5DA] text-xs space-y-1">
              <p>Khách hàng: <strong>{campaignModalCustomer.fullName}</strong></p>
              <p>Loại da: <strong className="text-[#2A4B37]">{campaignModalCustomer.skinType}</strong> · Vấn đề: <strong>{campaignModalCustomer.primaryConcern}</strong></p>
            </div>

            <form onSubmit={handleSendCampaign} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Nội dung thông điệp gửi qua Email/SMS:
                </label>
                <textarea
                  rows={4}
                  required
                  value={campaignMessage}
                  onChange={(e) => setCampaignMessage(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E7E4DC]">
                <button
                  type="button"
                  onClick={() => setCampaignModalCustomer(null)}
                  className="px-4 py-2 border border-[#D5DCD6] text-xs font-semibold rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2A4B37] hover:bg-[#1E3728] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi chiến dịch ngay</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: THÊM KHÁCH HÀNG MỚI (Add Customer Form)
         ======================================================== */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-[#E7E4DC] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-3">
              <h3 className="font-serif-brand text-lg font-bold text-[#1F3325]">
                Thêm Khách Hàng Mới Vào CRM
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Họ và tên khách hàng *
                </label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Lan Anh"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="0912..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="lananh@gmail.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Hà Nội, TP.HCM..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Loại da chẩn đoán
                  </label>
                  <select
                    value={newSkinType}
                    onChange={(e) => setNewSkinType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] bg-white"
                  >
                    <option value="Da nhạy cảm">Da nhạy cảm</option>
                    <option value="Da dầu">Da dầu</option>
                    <option value="Da khô">Da khô</option>
                    <option value="Da hỗn hợp">Da hỗn hợp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Mối quan tâm da
                  </label>
                  <select
                    value={newConcern}
                    onChange={(e) => setNewConcern(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] bg-white"
                  >
                    <option value="Nếp nhăn & Lão hóa">Nếp nhăn & Lão hóa</option>
                    <option value="Kích ứng & Mẩn đỏ">Kích ứng & Mẩn đỏ</option>
                    <option value="Mụn & Lỗ chân lông">Mụn & Lỗ chân lông</option>
                    <option value="Thiếu ẩm & Bong tróc">Thiếu ẩm & Bong tróc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Phân khúc khách hàng Sapo
                </label>
                <select
                  value={newSegment}
                  onChange={(e) => setNewSegment(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] bg-white"
                >
                  <option value="sensitive_skin">Người Da Nhạy Cảm</option>
                  <option value="office_worker">Giới Văn Phòng</option>
                  <option value="gen_z">Gen Z</option>
                  <option value="eco_lifestyle">Lối Sống Xanh</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7E4DC]">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-[#D5DCD6] text-xs font-semibold rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2A4B37] text-white text-xs font-bold rounded-xl hover:bg-[#1E3728] shadow-md cursor-pointer"
                >
                  Lưu khách hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
