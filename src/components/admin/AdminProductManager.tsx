import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Video,
  Image as ImageIcon,
  CheckCircle,
  Package,
  AlertTriangle,
  Search,
  X,
  Filter,
  Sparkles,
  Layers,
  Calendar,
  Barcode,
  Upload
} from 'lucide-react';

export const AdminProductManager: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, showToast } = useApp();

  // Search & Filter
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState(250000);
  const [originalPrice, setOriginalPrice] = useState(290000);
  const [category, setCategory] = useState<Product['category']>('serum');
  const [mainIngredient, setMainIngredient] = useState<Product['mainIngredient']>('chamomile');
  const [volume, setVolume] = useState('30ml');
  const [stock, setStock] = useState(50);
  const [batchNo, setBatchNo] = useState('LN-BATCH-2026');
  const [expiryDate, setExpiryDate] = useState('12/2026');
  const [description, setDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [ingredientsList, setIngredientsList] = useState('');
  const [benefitsInput, setBenefitsInput] = useState('Làm dịu da mẩn đỏ, Phục hồi màng ẩm tự nhiên, Chống nhăn hữu cơ');
  const [usageStepsInput, setUsageStepsInput] = useState('Bước 1: Làm sạch da\nBước 2: Lấy 3 giọt thoa đều\nBước 3: Khóa ẩm bằng kem dưỡng');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Kích thước ảnh tối đa là 5MB', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
          showToast('Tải ảnh lên thành công!');
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const filteredProducts = products.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.batchNo.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    return true;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setPrice(220000);
    setOriginalPrice(250000);
    setCategory('serum');
    setMainIngredient('green_tea');
    setVolume('50ml');
    setStock(60);
    setBatchNo(`LN-${Date.now().toString().slice(-4)}`);
    setExpiryDate('12/2027');
    setDescription('Sản phẩm mỹ phẩm thuần chay 100% hữu cơ từ thảo mộc thiên nhiên.');
    setDetailedDescription('Chiết xuất tự nhiên giàu dưỡng chất và chất chống oxy hóa lành tính, an toàn tuyệt đối cho làn da nhạy cảm.');
    setIngredientsList('Camellia Sinensis Leaf Extract, Aloe Barbadensis Leaf Juice, Vegetable Glycerin, Hyaluronic Acid.');
    setBenefitsInput('Kháng viêm tự nhiên, Cân bằng độ ẩm pH 5.5, Ngăn ngừa nếp nhăn sớm');
    setUsageStepsInput('Bước 1: Làm sạch da mặt\nBước 2: Thoa đều dưỡng chất\nBước 3: Vỗ nhẹ thẩm thấu');
    setImageUrl('https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80');
    setVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ');
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice || p.price);
    setCategory(p.category);
    setMainIngredient(p.mainIngredient);
    setVolume(p.volume);
    setStock(p.stock);
    setBatchNo(p.batchNo);
    setExpiryDate(p.expiryDate);
    setDescription(p.description);
    setDetailedDescription(p.detailedDescription);
    setIngredientsList(p.ingredientsList);
    setBenefitsInput(p.benefits.join(', '));
    setUsageStepsInput(p.usageSteps.join('\n'));
    setImageUrl(p.imageUrl);
    setVideoUrl(p.videoUrl || '');
    setIsFormModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const benefits = benefitsInput.split(',').map((b) => b.trim()).filter(Boolean);
    const usageSteps = usageStepsInput.split('\n').map((s) => s.trim()).filter(Boolean);
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name,
        slug,
        price,
        originalPrice,
        category,
        mainIngredient,
        volume,
        stock,
        batchNo,
        expiryDate,
        description,
        detailedDescription,
        ingredientsList,
        benefits,
        usageSteps,
        imageUrl,
        videoUrl,
      });
    } else {
      addProduct({
        name,
        slug,
        price,
        originalPrice,
        category,
        mainIngredient,
        volume,
        stock,
        batchNo,
        expiryDate,
        description,
        detailedDescription,
        ingredientsList,
        benefits,
        usageSteps,
        imageUrl,
        videoUrl,
        skinTypes: ['all', 'sensitive'],
        skinConcerns: ['sensitivity', 'wrinkles'],
        certifications: ['The Vegan Society', 'PETA Cruelty-Free', 'Dermatologically Tested'],
      });
    }

    setIsFormModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deletingProductId) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  const productBeingDeleted = products.find(p => p.id === deletingProductId);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E4DC]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2A4B37] uppercase tracking-wider mb-1">
            <Package className="w-4 h-4 text-[#C29B38]" />
            <span>Phân Hệ Quản Trị Sản Phẩm & Kho Hàng (Sapo Inventory)</span>
          </div>
          <h2 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
            Danh Mục Sản Phẩm LUNARA
          </h2>
          <p className="text-xs text-[#5D6F61] mt-1">
            Thêm sản phẩm mới, cập nhật giá niêm yết, theo dõi số lô (Batch Code), hạn dùng (EXP) và nhúng video hướng dẫn sử dụng.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#2A4B37] hover:bg-[#1E3728] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm sản phẩm mới</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-3xl border border-[#E3DFD5] p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F9182]" />
          <input
            type="text"
            placeholder="Tìm theo tên sản phẩm hoặc mã lô SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6F7F72]">Danh mục:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-[#D5DCD6] text-[#2A4B37] bg-white cursor-pointer font-medium"
          >
            <option value="all">Tất cả danh mục ({products.length})</option>
            <option value="scrub">Scrub (Tẩy da chết)</option>
            <option value="serum">Serum (Tinh chất)</option>
            <option value="toner">Toner (Nước cân bằng)</option>
            <option value="sunscreen">Sunscreen (Chống nắng)</option>
            <option value="cream">Cream (Kem dưỡng)</option>
            <option value="cleanser">Cleanser (Sữa rửa mặt)</option>
            <option value="mask">Mask (Mặt nạ)</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-3xl border border-[#E3DFD5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F8F6] text-[#526356] font-semibold border-b border-[#E7E4DC]">
              <tr>
                <th className="p-4">Hình ảnh</th>
                <th className="p-4">Tên sản phẩm & Dung tích</th>
                <th className="p-4">Danh mục</th>
                <th className="p-4">Giá bán lẻ</th>
                <th className="p-4">Mã lô (Batch)</th>
                <th className="p-4">Hạn dùng (EXP)</th>
                <th className="p-4">Tồn kho Sapo</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE4]">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF9F5] transition-colors">
                  <td className="p-4 w-16">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-xl bg-[#F0F5F1] border border-[#E7E4DC]"
                    />
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-[#1F3325] text-sm">{p.name}</p>
                    <p className="text-[11px] text-[#7A8B7E]">{p.volume}</p>
                  </td>
                  <td className="p-4">
                    <span className="bg-[#EAF2EC] text-[#2A4B37] px-2.5 py-0.5 rounded-md font-bold uppercase text-[10px]">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-[#2A4B37] text-sm tabular-nums">
                      {p.price.toLocaleString('vi-VN')} ₫
                    </span>
                    {p.originalPrice && (
                      <span className="text-[11px] text-[#9EAFA1] line-through block tabular-nums">
                        {p.originalPrice.toLocaleString('vi-VN')} ₫
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-mono text-[#526356] font-semibold">{p.batchNo}</td>
                  <td className="p-4 text-[#7A8B7E] font-medium">{p.expiryDate}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-md font-bold tabular-nums text-xs ${
                        p.stock < 20
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}
                    >
                      {p.stock} chai
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View Detail button */}
                      <button
                        onClick={() => setViewingProduct(p)}
                        className="p-1.5 rounded-lg text-[#2A4B37] hover:bg-[#EAF2EC] transition-colors cursor-pointer"
                        title="Xem chi tiết sản phẩm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit button */}
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Chỉnh sửa sản phẩm"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => setDeletingProductId(p.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
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
          MODAL 1: XEM CHI TIẾT SẢN PHẨM (View Product Details)
         ======================================================== */}
      {viewingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl border border-[#E7E4DC]">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E7E4DC] flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#2A4B37]" />
                <h3 className="font-serif-brand text-lg font-bold text-[#1F3325]">
                  Chi Tiết Hồ Sơ Sản Phẩm: {viewingProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setViewingProduct(null)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-1 space-y-3">
                  <div className="aspect-square rounded-2xl overflow-hidden border border-[#E7E4DC] bg-[#FAF9F5]">
                    <img
                      src={viewingProduct.imageUrl}
                      alt={viewingProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-[#F2F7F4] rounded-xl border border-[#D5E5DA] text-xs space-y-1">
                    <p className="text-[#6F7F72]">Mã định danh SKU / Batch:</p>
                    <p className="font-mono font-bold text-[#2A4B37] text-sm">{viewingProduct.batchNo}</p>
                    <p className="text-[#6F7F72] pt-1">Hạn sử dụng:</p>
                    <p className="font-bold text-[#1F3325]">{viewingProduct.expiryDate}</p>
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#C29B38] uppercase tracking-wider block mb-1">
                      {viewingProduct.category} · {viewingProduct.volume}
                    </span>
                    <h2 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
                      {viewingProduct.name}
                    </h2>
                    <div className="flex items-baseline gap-3 mt-2">
                      <span className="text-2xl font-bold text-[#2A4B37] tabular-nums">
                        {viewingProduct.price.toLocaleString('vi-VN')} ₫
                      </span>
                      {viewingProduct.originalPrice && (
                        <span className="text-sm text-[#9DAFA2] line-through tabular-nums">
                          {viewingProduct.originalPrice.toLocaleString('vi-VN')} ₫
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-[#EFECE4] pt-3">
                    <h4 className="text-xs font-bold text-[#1F3325] mb-1">Mô tả tóm tắt:</h4>
                    <p className="text-xs text-[#526356] leading-relaxed">
                      {viewingProduct.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#1F3325] mb-1">Chi tiết công dụng & khoa học:</h4>
                    <p className="text-xs text-[#526356] leading-relaxed">
                      {viewingProduct.detailedDescription}
                    </p>
                  </div>

                  {/* INCI Ingredients */}
                  <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-[#E7E4DC]">
                    <h4 className="text-xs font-bold text-[#2A4B37] mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                      <span>Bảng Thành Phần Minh Bạch (100% INCI Transparency):</span>
                    </h4>
                    <p className="text-[11px] text-[#4E5E52] leading-relaxed italic">
                      {viewingProduct.ingredientsList}
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits & Usage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EFECE4]">
                <div className="p-4 bg-[#F9FAF9] rounded-2xl border border-[#E7E4DC]">
                  <h4 className="text-xs font-bold text-[#1F3325] mb-2">Lợi ích kiểm chứng:</h4>
                  <ul className="text-xs text-[#526356] space-y-1.5">
                    {viewingProduct.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#2A4B37] font-bold">✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#F9FAF9] rounded-2xl border border-[#E7E4DC]">
                  <h4 className="text-xs font-bold text-[#1F3325] mb-2">Quy trình sử dụng:</h4>
                  <ul className="text-xs text-[#526356] space-y-1.5">
                    {viewingProduct.usageSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#C29B38] font-bold">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Video Tutorial if available */}
              {viewingProduct.videoUrl && (
                <div className="pt-2 border-t border-[#EFECE4]">
                  <h4 className="text-xs font-bold text-[#1F3325] mb-2 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-[#C29B38]" />
                    <span>Video Hướng Dẫn Sử Dụng:</span>
                  </h4>
                  <div className="aspect-16/9 max-w-lg rounded-2xl overflow-hidden bg-black shadow-md">
                    <iframe
                      src={viewingProduct.videoUrl}
                      title="Tutorial Video"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-[#FAF9F5] px-6 py-4 border-t border-[#E7E4DC] flex items-center justify-between">
              <span className="text-xs text-[#6F7F72]">
                Kho Sapo: <strong className="text-[#1F3325]">{viewingProduct.stock}</strong> sản phẩm khả dụng
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setViewingProduct(null);
                    handleOpenEdit(viewingProduct);
                  }}
                  className="px-4 py-2 bg-[#2A4B37] text-white text-xs font-bold rounded-xl hover:bg-[#1E3728] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Chỉnh sửa sản phẩm này</span>
                </button>
                <button
                  onClick={() => setViewingProduct(null)}
                  className="px-4 py-2 border border-[#D5DCD6] text-xs font-semibold rounded-xl hover:bg-white cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: THÊM / CHỈNH SỬA SẢN PHẨM (Form Modal)
         ======================================================== */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl max-h-[92vh] rounded-3xl overflow-y-auto shadow-2xl border border-[#E7E4DC]">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E7E4DC] flex items-center justify-between z-10">
              <h3 className="font-serif-brand text-lg font-bold text-[#1F3325]">
                {editingProduct ? 'Chỉnh Sửa Thông Tin Sản Phẩm' : 'Thêm Sản Phẩm Thuần Chay Mới'}
              </h3>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Tên sản phẩm *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: Chamomile Serum"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Dung tích (Volume) *
                  </label>
                  <input
                    type="text"
                    required
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="Ví dụ: 30ml, 100ml"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Giá bán lẻ (VND) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] font-bold text-[#2A4B37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Giá gốc niêm yết (VND)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Số lượng tồn kho Sapo *
                  </label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Phân loại danh mục *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] bg-white cursor-pointer"
                  >
                    <option value="serum">Serum (Tinh chất)</option>
                    <option value="scrub">Scrub (Tẩy da chết)</option>
                    <option value="toner">Toner (Nước hoa hồng)</option>
                    <option value="sunscreen">Sunscreen (Chống nắng)</option>
                    <option value="cream">Cream (Kem dưỡng)</option>
                    <option value="cleanser">Cleanser (Sữa rửa mặt)</option>
                    <option value="mask">Mask (Mặt nạ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Mã lô sản xuất (Batch No) *
                  </label>
                  <input
                    type="text"
                    required
                    value={batchNo}
                    onChange={(e) => setBatchNo(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Hạn sử dụng (EXP Date) *
                  </label>
                  <input
                    type="text"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="12/2026"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1.5 flex items-center justify-between">
                  <span>Hình ảnh sản phẩm *</span>
                  <span className="text-[11px] text-[#7A8B7E] font-normal">Tải từ máy tính hoặc dán URL ảnh</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  {imageUrl && (
                    <div className="w-16 h-16 rounded-xl border border-[#D5DCD6] overflow-hidden shrink-0 bg-[#F2F7F4] shadow-xs">
                      <img src={imageUrl} alt="Xem trước sản phẩm" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="px-3.5 py-1.5 bg-[#EAF2EC] hover:bg-[#D5E5DA] text-[#2A4B37] rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs">
                        <Upload className="w-3.5 h-3.5 text-[#C29B38]" />
                        <span>Tải ảnh từ máy tính</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-[#7A8B7E]">hoặc dán đường dẫn link:</span>
                    </div>
                    <input
                      type="text"
                      required
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Dán link ảnh (https://...)"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Link video hướng dẫn sử dụng (YouTube Embed URL)
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Mô tả tóm tắt ngắn *
                </label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Mô tả chi tiết & công dụng khoa học *
                </label>
                <textarea
                  rows={2}
                  required
                  value={detailedDescription}
                  onChange={(e) => setDetailedDescription(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Bảng thành phần minh bạch 100% INCI *
                </label>
                <textarea
                  rows={2}
                  required
                  value={ingredientsList}
                  onChange={(e) => setIngredientsList(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] font-mono"
                />
              </div>

              <div className="pt-4 border-t border-[#E7E4DC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-5 py-2 border border-[#D5DCD6] text-xs font-semibold rounded-xl hover:bg-[#F2F7F4] cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-7 py-2 bg-[#2A4B37] hover:bg-[#1E3728] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all"
                >
                  {editingProduct ? 'Lưu thay đổi' : 'Thêm sản phẩm vào kho'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: XÁC NHẬN XÓA SẢN PHẨM (Safe In-App Confirm)
         ======================================================== */}
      {deletingProductId && productBeingDeleted && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-red-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#1F3325]">
                Xác nhận xóa sản phẩm?
              </h3>
              <p className="text-xs text-[#5D6F61] mt-1 leading-relaxed">
                Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm <strong>"{productBeingDeleted.name}"</strong> (Mã lô: {productBeingDeleted.batchNo}) khỏi danh mục cửa hàng và cơ sở dữ liệu Sapo?
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 border border-[#D5DCD6] text-xs font-semibold rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
