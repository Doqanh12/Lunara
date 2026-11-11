import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { Search, Filter, Sparkles, SlidersHorizontal, Check } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { products, setIsQuizOpen, language } = useApp();

  // Filters state
  const [selectedIngredient, setSelectedIngredient] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkinConcern, setSelectedSkinConcern] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const ingredientsList = [
    { id: 'all', vi: 'Tất cả thành phần', en: 'All Ingredients' },
    { id: 'aloe_vera', vi: 'Nha đam', en: 'Aloe Vera' },
    { id: 'chamomile', vi: 'Hoa cúc', en: 'Chamomile' },
    { id: 'green_tea', vi: 'Trà xanh', en: 'Green Tea' },
    { id: 'coconut_oil', vi: 'Dầu dừa Bến Tre', en: 'Ben Tre Coconut' },
    { id: 'shea_butter', vi: 'Bơ hạt mỡ', en: 'Shea Butter' },
    { id: 'matcha', vi: 'Bột Matcha Bảo Lộc', en: 'Organic Matcha' },
  ];

  const categoriesList = [
    { id: 'all', vi: 'Tất cả phân loại', en: 'All Categories' },
    { id: 'scrub', vi: 'Tẩy tế bào chết', en: 'Facial Scrub' },
    { id: 'serum', vi: 'Serum & Tinh chất', en: 'Serum & Essence' },
    { id: 'toner', vi: 'Nước hoa hồng cân bằng', en: 'Balancing Toner' },
    { id: 'sunscreen', vi: 'Kem chống nắng phổ rộng', en: 'Mineral Sunscreen' },
    { id: 'cream', vi: 'Kem dưỡng ẩm chống nhăn', en: 'Wrinkle Cream' },
    { id: 'mask', vi: 'Mặt nạ thanh lọc', en: 'Purifying Mask' },
  ];

  const skinConcernsList = [
    { id: 'all', vi: 'Mọi tình trạng da', en: 'All Skin Types' },
    { id: 'sensitivity', vi: 'Da nhạy cảm & Dễ đỏ', en: 'Sensitive Skin' },
    { id: 'wrinkles', vi: 'Nếp nhăn & Chống lão hóa', en: 'Wrinkle & Anti-Aging' },
    { id: 'acne', vi: 'Da mụn & Dầu nhờn', en: 'Acne & Sebum Control' },
    { id: 'pores', vi: 'Lỗ chân lông to', en: 'Pore Refining' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesIngr = p.ingredientsList.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesIngr) return false;
      }

      // Ingredient filter
      if (selectedIngredient !== 'all' && p.mainIngredient !== selectedIngredient) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Concern filter
      if (selectedSkinConcern !== 'all' && !p.skinConcerns.includes(selectedSkinConcern as any)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // Default: best sellers first, then rating
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return b.rating - a.rating;
    });
  }, [products, selectedIngredient, selectedCategory, selectedSkinConcern, searchQuery, sortBy]);

  return (
    <section className="py-12 bg-[#FAF9F5] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E7E4DC]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#3D634C] tracking-widest uppercase mb-1">
              <span>{language === 'vi' ? 'Danh mục sản phẩm hữu cơ LUNARA' : 'LUNARA Organic Skincare Catalog'}</span>
            </div>
            <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#1F3325]">
              {language === 'vi' ? 'Cửa Hàng Mỹ Phẩm Thuần Chay' : 'Vegan Cosmetics Shop'}
            </h1>
            <p className="mt-2 text-sm text-[#5D6F61] max-w-xl">
              {language === 'vi'
                ? '100% không thử nghiệm trên động vật, chiết xuất thực vật bản địa giàu dưỡng chất, đạt tiêu chuẩn khắt khe cho làn da nhạy cảm.'
                : '100% cruelty-free, nutrient-dense native botanical extracts, formulated to meet rigorous standards for sensitive skin.'}
            </p>
          </div>

          {/* Skin Quiz CTA Banner */}
          <div className="p-4 rounded-2xl bg-[#EAF2EC] border border-[#CFE0D3] flex items-center gap-4 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#2A4B37] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1F3325]">
                {language === 'vi' ? 'Chưa biết da bạn hợp sản phẩm nào?' : 'Not sure which product suits your skin?'}
              </p>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="text-xs text-[#2A4B37] font-bold hover:underline cursor-pointer flex items-center gap-1 mt-0.5"
              >
                <span>{language === 'vi' ? 'Chẩn đoán da AI trong 60s →' : 'AI Skin Diagnostic in 60s →'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 space-y-4">
          {/* Row 1: Search & Sorting */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F9182]" />
              <input
                type="text"
                placeholder={language === 'vi' ? 'Tìm sản phẩm, thành phần thảo mộc...' : 'Search products, botanicals...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white border border-[#D5DCD6] text-[#222823] placeholder-[#8F9E92] focus:outline-none focus:border-[#2A4B37] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  {language === 'vi' ? 'Xóa' : 'Clear'}
                </button>
              )}
            </div>

            {/* Sort & Count */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-[#6F7F72] tabular-nums font-medium">
                {language === 'vi' ? 'Hiển thị' : 'Showing'} <strong>{filteredProducts.length}</strong> {language === 'vi' ? 'sản phẩm' : 'products'}
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sắp xếp sản phẩm"
                className="text-xs font-medium py-2 px-3 rounded-xl bg-white border border-[#D5DCD6] text-[#2A4B37] focus:outline-none cursor-pointer"
              >
                <option value="featured">{language === 'vi' ? 'Nổi bật & Bán chạy' : 'Featured & Best Sellers'}</option>
                <option value="price-asc">{language === 'vi' ? 'Giá: Thấp đến Cao' : 'Price: Low to High'}</option>
                <option value="price-desc">{language === 'vi' ? 'Giá: Cao đến Thấp' : 'Price: High to Low'}</option>
              </select>
            </div>
          </div>

          {/* Row 2: Main Natural Ingredient Filters (Interactive Segmented buttons) */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-[#48594C] block mb-2">
              {language === 'vi' ? 'Lọc theo Chiết xuất tự nhiên:' : 'Filter by Natural Botanicals:'}
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {ingredientsList.map((ing) => (
                <button
                  key={ing.id}
                  onClick={() => setSelectedIngredient(ing.id)}
                  className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer shrink-0 text-center ${
                    selectedIngredient === ing.id
                      ? 'bg-[#2A4B37] text-white shadow-xs font-semibold'
                      : 'bg-white text-[#4A5A4E] border border-[#D8DFD9] hover:border-[#2A4B37] font-medium'
                  }`}
                >
                  <span className="text-xs block">
                    {language === 'vi' ? ing.vi : ing.en}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Category & Skin Concern Sub-filters */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#68786B] font-medium">
                {language === 'vi' ? 'Danh mục:' : 'Category:'}
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Lọc theo danh mục"
                className="text-xs py-1.5 px-2.5 rounded-lg bg-white border border-[#D5DCD6] text-[#2A4B37] focus:outline-none cursor-pointer font-medium"
              >
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {language === 'vi' ? cat.vi : cat.en}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#68786B] font-medium">
                {language === 'vi' ? 'Mối quan tâm da:' : 'Skin Concern:'}
              </span>
              <select
                value={selectedSkinConcern}
                onChange={(e) => setSelectedSkinConcern(e.target.value)}
                aria-label="Lọc theo mối quan tâm da"
                className="text-xs py-1.5 px-2.5 rounded-lg bg-white border border-[#D5DCD6] text-[#2A4B37] focus:outline-none cursor-pointer font-medium"
              >
                {skinConcernsList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {language === 'vi' ? c.vi : c.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Reset */}
            {(selectedIngredient !== 'all' || selectedCategory !== 'all' || selectedSkinConcern !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedIngredient('all');
                  setSelectedCategory('all');
                  setSelectedSkinConcern('all');
                  setSearchQuery('');
                }}
                className="text-xs text-[#C29B38] font-semibold hover:underline cursor-pointer ml-auto"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Product Grid (3-column desktop layout following e-commerce specs) */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center py-16 px-4 rounded-3xl bg-white border border-[#E7E4DC] max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-[#A0B0A3] mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[#1F3325]">Không tìm thấy sản phẩm phù hợp</h3>
            <p className="text-xs text-[#6F7F72] mt-1">
              Vui lòng thử tìm kiếm với từ khóa khác hoặc điều chỉnh lại bộ lọc thành phần thiên nhiên.
            </p>
            <button
              onClick={() => {
                setSelectedIngredient('all');
                setSelectedCategory('all');
                setSelectedSkinConcern('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#2A4B37] text-white text-xs font-medium rounded-xl hover:bg-[#1E3728] cursor-pointer"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
