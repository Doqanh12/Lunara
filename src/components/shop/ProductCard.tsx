import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { BilingualText } from '../common/BilingualText';
import { Plus, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, language } = useApp();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const ingredientLabels: Record<string, { vi: string; en: string }> = {
    aloe_vera: { vi: 'Nha đam hữu cơ', en: 'Organic Aloe Vera' },
    chamomile: { vi: 'Hoa cúc La Mã', en: 'Roman Chamomile' },
    green_tea: { vi: 'Trà xanh Thái Nguyên', en: 'Thái Nguyên Green Tea' },
    coconut_oil: { vi: 'Dừa ép lạnh Bến Tre', en: 'Bến Tre Coconut' },
    shea_butter: { vi: 'Bơ hạt mỡ hữu cơ', en: 'Organic Shea Butter' },
    matcha: { vi: 'Matcha Bảo Lộc', en: 'Bảo Lộc Matcha' },
  };

  const ingredientName = ingredientLabels[product.mainIngredient]
    ? (language === 'vi' ? ingredientLabels[product.mainIngredient].vi : ingredientLabels[product.mainIngredient].en)
    : (language === 'vi' ? 'Thảo mộc' : 'Botanical');

  return (
    <div className="group rounded-2xl bg-white border border-[#E7E4DC] hover:border-[#3D634C] transition-all duration-300 hover:shadow-md flex flex-col justify-between overflow-hidden">
      {/* Product Image Area */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="relative aspect-4/3 overflow-hidden bg-[#F3F6F3] cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quiet text tag (max 1 tag) */}
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#2A4B37] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-2xs border border-[#E0E7E2]">
            {language === 'vi' ? 'Bán chạy' : 'Best Seller'}
          </div>
        )}
        {!product.isBestSeller && product.isNew && (
          <div className="absolute top-3 left-3 bg-[#2A4B37] text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-2xs">
            {language === 'vi' ? 'Mới ra mắt' : 'New Arrival'}
          </div>
        )}

        {/* Quick view hover button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/90 text-[#2A4B37] text-xs font-medium px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Xem chi tiết & Thành phần' : 'Quick View & Ingredients'}</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Ingredient text metadata */}
          <div className="flex items-center gap-2 text-xs text-[#6B7D70] mb-1 font-medium">
            <span className="uppercase tracking-wider">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{ingredientName}</span>
          </div>

          {/* Product Name */}
          <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
            <BilingualText
              vi={product.nameVi || product.name}
              en={product.nameEn || product.name}
              primaryClassName="font-serif-brand text-base sm:text-lg font-bold text-[#1F3325] hover:text-[#2A4B37] transition-colors leading-snug line-clamp-1"
            />
          </div>

          {/* Short description */}
          <p className="mt-1.5 text-xs text-[#5D6F61] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#F0ECE2] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#2A4B37] tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#95A599] line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="p-2.5 bg-[#F2F7F4] hover:bg-[#2A4B37] text-[#2A4B37] hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
            title={language === 'vi' ? 'Thêm vào giỏ hàng' : 'Add to cart'}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'vi' ? 'Thêm' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
