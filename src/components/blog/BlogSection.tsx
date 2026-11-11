import React from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPost } from '../../types';
import { Recycle, ArrowRight, Calendar, User, Clock, BookOpen, X, Sparkles } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { blogs, selectedBlog, setSelectedBlog, setIsRecycleModalOpen } = useApp();

  const publishedBlogs = blogs.filter(b => b.published);

  return (
    <section className="py-12 bg-[#FAF9F5] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#3D634C] tracking-widest uppercase mb-2">
            <Sparkles className="w-4 h-4 text-[#C29B38]" />
            <span>Chuyên Trang Lối Sống Xanh & Dưỡng Da Thuần Chay</span>
          </div>
          <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#1F3325]">
            Kiến Thức & Hoạt Động Vì Môi Trường
          </h1>
          <p className="mt-3 text-sm text-[#5D6F61] leading-relaxed">
            Nơi sẻ chia hành trình làm đẹp an toàn, kiến thức phân tích thành phần minh bạch và các chiến dịch bảo vệ hệ sinh thái của LUNARA.
          </p>
        </div>

        {/* Featured Campaign Spotlight Card (Green Bottle Take-Back) */}
        <div className="rounded-3xl bg-gradient-to-r from-[#243D2E] to-[#1C3224] text-white p-8 md:p-12 shadow-xl mb-16 overflow-hidden relative border border-[#3A5644]">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <Recycle className="w-96 h-96" />
          </div>

          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              <Recycle className="w-4 h-4" />
              <span>Chiến dịch Bền Vững Độc Quyền</span>
            </div>

            <h2 className="font-serif-brand text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-balance">
              Thu Gom 5 Vỏ Chai Rỗng LUNARA · Nhận Ngay Voucher 50.000đ
            </h2>

            <p className="text-sm text-[#D1E0D5] leading-relaxed">
              Hành động nhỏ của bạn là một bước tiến lớn cho đại dương. Toàn bộ chai lọ rỗng LUNARA thu hồi được chuyển đến đối tác Kapac & SCG Packaging để tái chế thành vật liệu sinh thái. Miễn phí vận chuyển chiều gửi qua Viettel Post & J&T.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsRecycleModalOpen(true)}
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C29B38] text-[#1C2C22] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Đăng ký gửi vỏ chai ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const campaignBlog = blogs.find(b => b.id === 'blog-1');
                  if (campaignBlog) setSelectedBlog(campaignBlog);
                }}
                className="px-5 py-3 border border-[#869E8D] hover:bg-white/10 text-white font-medium text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
              >
                Xem thể lệ chi tiết
              </button>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedBlogs.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedBlog(post)}
              className="group bg-white rounded-2xl border border-[#E7E4DC] hover:border-[#3D634C] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-16/10 overflow-hidden bg-[#EAF0EB]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-6">
                  {/* Category text metadata */}
                  <div className="flex items-center gap-2 text-xs text-[#6E8072] mb-2 font-medium">
                    <span className="text-[#2A4B37] font-semibold">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-serif-brand text-lg font-bold text-[#1F3325] group-hover:text-[#2A4B37] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#5D6F61] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#F0ECE2] flex items-center justify-between text-xs text-[#7A8B7E]">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#2A4B37]" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.publishDate}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Reading Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E3DFD5] overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E7E4DC] flex items-center justify-between bg-white shrink-0">
              <span className="text-xs font-semibold text-[#2A4B37] uppercase tracking-wider">
                {selectedBlog.category}
              </span>
              <button
                onClick={() => setSelectedBlog(null)}
                className="p-1.5 rounded-full hover:bg-[#F2EFE8] text-[#2A4B37] cursor-pointer"
                aria-label="Đóng bài viết"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#1F3325] leading-tight">
                {selectedBlog.title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-[#6F7F72] border-y border-[#F0ECE2] py-3">
                <span className="font-medium text-[#2A4B37]">Tác giả: {selectedBlog.author}</span>
                <span>·</span>
                <span>Ngày đăng: {selectedBlog.publishDate}</span>
                <span>·</span>
                <span>Thời gian đọc: {selectedBlog.readTime}</span>
              </div>

              <div className="aspect-16/9 rounded-2xl overflow-hidden bg-[#F3F6F3]">
                <img
                  src={selectedBlog.coverImage}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Render article HTML or prose content */}
              <div
                className="prose prose-sm max-w-none text-[#334237] leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />

              {/* Tags */}
              <div className="pt-6 border-t border-[#F0ECE2] flex items-center gap-2 flex-wrap">
                <span className="text-xs text-[#7A8B7E] font-medium">Chủ đề:</span>
                {selectedBlog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#F2F7F4] text-[#2A4B37] px-2.5 py-1 rounded-md font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF9F5] border-t border-[#E7E4DC] flex justify-end shrink-0">
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-5 py-2 bg-[#2A4B37] text-white text-xs font-semibold rounded-xl hover:bg-[#1E3728] cursor-pointer"
              >
                Đóng bài đọc
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
