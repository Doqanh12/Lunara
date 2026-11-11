import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../shop/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, setCurrentView } = useApp();

  // Highlight the 4 required natural products
  const featured = products.slice(0, 4);

  return (
    <section className="py-20 bg-white border-b border-[#E7E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#3D634C] tracking-widest uppercase mb-2">
              <Sparkles className="w-4 h-4 text-[#C29B38]" />
              <span>Tinh Hoa Thực Vật Bản Địa</span>
            </div>
            <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#1F3325]">
              Sản Phẩm Thuần Chay Tiêu Biểu
            </h2>
            <p className="text-sm text-[#5D6F61] mt-2 max-w-xl">
              Chiết xuất nha đam, hoa cúc La Mã, trà xanh Thái Nguyên và dầu dừa Bến Tre được phối hợp theo tỷ lệ an toàn tuyệt đối.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-sm font-semibold text-[#2A4B37] hover:text-[#182e21] cursor-pointer group"
          >
            <span>Xem tất cả danh mục</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};
