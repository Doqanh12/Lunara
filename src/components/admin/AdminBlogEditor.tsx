import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPost } from '../../types';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  Eye,
  Plus,
  Send,
  Trash2,
  Edit,
  Sparkles,
  CheckCircle,
  FileText,
  X,
  AlertTriangle,
  Calendar,
  Clock,
  User,
  Search,
  Upload
} from 'lucide-react';

export const AdminBlogEditor: React.FC = () => {
  const { blogs, addBlogPost, updateBlogPost, deleteBlogPost, showToast } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Search & Filter
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modals state
  const [viewingBlog, setViewingBlog] = useState<BlogPost | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);

  // Image insert modal
  const [isImagePromptOpen, setIsImagePromptOpen] = useState(false);
  const [insertImageUrl, setInsertImageUrl] = useState('https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80');

  // Form State
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80');
  const [author, setAuthor] = useState('Ban Biên Tập LUNARA');
  const [readTime, setReadTime] = useState('4 phút');
  const [category, setCategory] = useState<BlogPost['category']>('Lối sống thuần chay');
  const [tagsInput, setTagsInput] = useState('Mỹ phẩm thuần chay, Da nhạy cảm, Bền vững');
  const [content, setContent] = useState(`<h2>Tiêu đề đoạn 1: Sức mạnh làm đẹp từ thực vật</h2>\n<p>Viết nội dung quảng bá thương hiệu Lunara tại đây. Mỹ phẩm thuần chay đem lại hiệu quả bền vững và an toàn tuyệt đối cho làn da nhạy cảm.</p>\n<blockquote>"LUNARA - Vẻ đẹp thuần khiết khởi nguồn từ thiên nhiên."</blockquote>\n<p>Hãy chia sẻ thêm thông tin về nguồn nguyên liệu dừa Bến Tre và trà xanh Thái Nguyên.</p>`);

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Kích thước ảnh tối đa là 5MB', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverImage(event.target.result as string);
          showToast('Tải ảnh bìa bài viết thành công!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Kích thước ảnh tối đa là 5MB', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setInsertImageUrl(event.target.result as string);
          showToast('Tải ảnh minh họa lên thành công!');
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const filteredBlogs = blogs.filter((b) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!b.title.toLowerCase().includes(q) && !b.author.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (categoryFilter !== 'all' && b.category !== categoryFilter) return false;
    return true;
  });

  // Insert tag helper into content
  const handleInsertTag = (tagStart: string, tagEnd = '') => {
    const textarea = document.getElementById('wysiwyg-content') as HTMLTextAreaElement;
    if (!textarea) {
      setContent(prev => prev + tagStart + tagEnd);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = tagStart + (selected || 'Văn bản mẫu') + tagEnd;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
  };

  const handleConfirmInsertImage = () => {
    if (insertImageUrl.trim()) {
      handleInsertTag(`<img src="${insertImageUrl}" alt="Hình ảnh bài viết Lunara" class="rounded-2xl my-4 w-full object-cover shadow-sm" />`);
      setIsImagePromptOpen(false);
    }
  };

  const handleStartCreate = () => {
    setEditingId(null);
    setTitle('');
    setExcerpt('');
    setContent(`<h2>Khởi nguồn vẻ đẹp đạo đức và dịu lành</h2>\n<p>Mỹ phẩm thuần chay LUNARA ra đời nhằm trao quyền cho người tiêu dùng với các giải pháp chăm sóc nếp nhăn và phục hồi da nhạy cảm 100% hữu cơ...</p>\n<blockquote>"Vẻ đẹp đích thực là sự bình an trong tâm hồn và sự nâng niu làn da một cách tử tế."</blockquote>\n<p>Chiến dịch Green Bottle Take-back tiếp tục thu gom vỏ chai rỗng để trao voucher 50.000 VND và tích điểm xanh bảo vệ môi trường.</p>`);
    setCoverImage('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80');
    setCategory('Lối sống thuần chay');
    setAuthor('Ban Biên Tập LUNARA');
    setReadTime('3 phút');
    setTagsInput('Thuần chay, Nông sản Việt, Green Bottle, Da nhạy cảm');
    setIsCreating(true);
    setActiveTab('editor');
  };

  const handleStartEdit = (b: BlogPost) => {
    setEditingId(b.id);
    setTitle(b.title);
    setExcerpt(b.excerpt);
    setCoverImage(b.coverImage);
    setAuthor(b.author);
    setReadTime(b.readTime);
    setCategory(b.category);
    setTagsInput(b.tags.join(', '));
    setContent(b.content);
    setIsCreating(true);
    setActiveTab('editor');
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('Vui lòng nhập tiêu đề và nội dung bài viết!', 'warning');
      return;
    }

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    if (editingId) {
      const existing = blogs.find(b => b.id === editingId);
      if (existing) {
        updateBlogPost({
          ...existing,
          title,
          slug,
          excerpt: excerpt || title.slice(0, 100),
          coverImage,
          author,
          readTime,
          category,
          tags,
          content,
        });
      }
    } else {
      addBlogPost({
        title,
        slug,
        excerpt: excerpt || title.slice(0, 100),
        coverImage,
        author,
        readTime,
        category,
        tags,
        content,
        published: true,
      });
    }

    setIsCreating(false);
  };

  const handleConfirmDelete = () => {
    if (deletingBlogId) {
      deleteBlogPost(deletingBlogId);
      setDeletingBlogId(null);
    }
  };

  const blogBeingDeleted = blogs.find(b => b.id === deletingBlogId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E4DC]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#2A4B37] uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4 text-[#C29B38]" />
            <span>Hệ Thống Quản Trị Nội Dung CMS & Soạn Thảo Blog</span>
          </div>
          <h2 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
            Quản Lý Bài Viết & Quảng Cáo LUNARA
          </h2>
          <p className="text-xs text-[#5D6F61] mt-1">
            Soạn thảo bài viết quảng cáo, định dạng trực quan (WYSIWYG), chèn hình ảnh và xuất bản tức thì lên chuyên trang Blog LUNARA.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="px-5 py-2.5 bg-[#2A4B37] hover:bg-[#1E3728] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Viết bài quảng cáo mới</span>
          </button>
        )}
      </div>

      {isCreating ? (
        /* ========================================================
            WYSIWYG EDITOR FORM
           ======================================================== */
        <form onSubmit={handleSavePost} className="bg-white rounded-3xl border border-[#E3DFD5] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-4">
            <h3 className="font-serif-brand text-xl font-bold text-[#1F3325] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2A4B37]" />
              <span>{editingId ? 'Chỉnh sửa bài viết quảng cáo' : 'Soạn thảo bài viết quảng cáo mới'}</span>
            </h3>
            <div className="flex items-center gap-2">
              {/* Tab selector */}
              <div className="flex items-center p-1 bg-[#F2F7F4] rounded-xl border border-[#D5E5DA]">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'editor' ? 'bg-[#2A4B37] text-white' : 'text-[#4A5B4E]'
                  }`}
                >
                  Soạn thảo
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'preview' ? 'bg-[#2A4B37] text-white' : 'text-[#4A5B4E]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem trước (Preview)</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3.5 py-1 text-xs text-[#6F7F72] hover:text-[#2A4B37] cursor-pointer"
              >
                Hủy bỏ
              </button>
            </div>
          </div>

          {activeTab === 'editor' ? (
            <div className="space-y-5">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Tiêu đề bài viết quảng cáo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Vì sao nên chọn mỹ phẩm thuần chay chống nhăn 100% hữu cơ?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] text-[#1F3325] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Chuyên mục bài viết *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] text-[#1F3325] bg-white cursor-pointer"
                  >
                    <option value="Lối sống thuần chay">Lối sống thuần chay</option>
                    <option value="Chăm sóc da tự nhiên">Chăm sóc da tự nhiên</option>
                    <option value="Chiến dịch xanh">Chiến dịch xanh</option>
                    <option value="Nghiên cứu thành phần">Nghiên cứu thành phần</option>
                  </select>
                </div>
              </div>

              {/* Cover Image & Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1 flex items-center justify-between">
                    <span>Ảnh bìa bài viết *</span>
                    <label className="text-[11px] text-[#2A4B37] hover:underline font-bold cursor-pointer flex items-center gap-1">
                      <Upload className="w-3 h-3 text-[#C29B38]" />
                      <span>Tải từ máy</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        className="hidden"
                      />
                    </label>
                  </label>
                  <input
                    type="text"
                    required
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Tác giả bài viết
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#405043] mb-1">
                    Thời gian đọc ước tính
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Đoạn trích tóm tắt (Excerpt) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Đoạn mở đầu ngắn gọn để thu hút người đọc trên danh sách Blog..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] leading-relaxed"
                />
              </div>

              {/* WYSIWYG Content Area */}
              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1.5 flex items-center justify-between">
                  <span>Trình soạn thảo trực quan WYSIWYG *</span>
                  <span className="text-[11px] text-[#7A8B7E] font-normal">Hỗ trợ định dạng HTML & chia đoạn văn bản</span>
                </label>

                <div className="border border-[#D5DCD6] rounded-2xl overflow-hidden focus-within:border-[#2A4B37] transition-colors">
                  {/* Toolbar */}
                  <div className="bg-[#F6F8F6] p-2 border-b border-[#E7E4DC] flex flex-wrap items-center gap-1 text-xs text-[#334237]">
                    <button
                      type="button"
                      onClick={() => handleInsertTag('<strong>', '</strong>')}
                      className="p-1.5 rounded hover:bg-white transition-colors cursor-pointer"
                      title="In đậm (Bold)"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertTag('<em>', '</em>')}
                      className="p-1.5 rounded hover:bg-white transition-colors cursor-pointer"
                      title="In nghiêng (Italic)"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <span className="text-[#CFD7D1]">|</span>
                    <button
                      type="button"
                      onClick={() => handleInsertTag('<h2>', '</h2>')}
                      className="p-1.5 rounded hover:bg-white transition-colors cursor-pointer"
                      title="Tiêu đề đoạn H2"
                    >
                      <Heading2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertTag('<h3>', '</h3>')}
                      className="p-1.5 rounded hover:bg-white transition-colors cursor-pointer"
                      title="Tiêu đề mục nhỏ H3"
                    >
                      <Heading3 className="w-4 h-4" />
                    </button>
                    <span className="text-[#CFD7D1]">|</span>
                    <button
                      type="button"
                      onClick={() => handleInsertTag('<p>', '</p>')}
                      className="px-2 py-1 rounded hover:bg-white transition-colors cursor-pointer text-xs font-semibold"
                      title="Chia đoạn văn bản (Paragraph)"
                    >
                      ¶ Chia đoạn
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertTag('<ul>\n  <li>', '</li>\n  <li>Nội dung 2</li>\n</ul>')}
                      className="p-1.5 rounded hover:bg-white transition-colors cursor-pointer"
                      title="Danh sách gạch đầu dòng"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertTag('<blockquote>', '</blockquote>')}
                      className="p-1.5 rounded hover:bg-white transition-colors cursor-pointer"
                      title="Khối trích dẫn"
                    >
                      <Quote className="w-4 h-4" />
                    </button>
                    <span className="text-[#CFD7D1]">|</span>
                    <button
                      type="button"
                      onClick={() => setIsImagePromptOpen(true)}
                      className="px-2.5 py-1 rounded hover:bg-white transition-colors cursor-pointer flex items-center gap-1 font-semibold text-[#2A4B37]"
                      title="Chèn ảnh minh họa"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#C29B38]" />
                      <span>Chèn ảnh</span>
                    </button>
                  </div>

                  {/* Textarea */}
                  <textarea
                    id="wysiwyg-content"
                    rows={12}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-4 text-xs font-mono text-[#1F3325] focus:outline-none leading-relaxed"
                    placeholder="Soạn nội dung bài viết bằng mã HTML / định dạng trực quan..."
                  />
                </div>
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-semibold text-[#405043] mb-1">
                  Thẻ phân loại bài viết (Tags)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Mỹ phẩm thuần chay, Da nhạy cảm, Bền vững"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E7E4DC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-5 py-2.5 border border-[#D5DCD6] text-xs font-semibold text-[#5D6F61] rounded-xl hover:bg-[#F2EFE8] cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 bg-[#2A4B37] hover:bg-[#1E3728] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{editingId ? 'Lưu cập nhật bài viết' : 'Xuất bản bài viết lên Blog'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Live Preview */
            <div className="space-y-4">
              <div className="p-4 bg-[#F2F7F4] rounded-2xl border border-[#D5E5DA] text-xs text-[#2A4B37]">
                👁️ Đây là giao diện hiển thị thực tế của bài viết khi khách hàng truy cập chuyên trang Blog LUNARA.
              </div>

              <div className="p-6 border border-[#E7E4DC] rounded-2xl bg-[#FAF9F5] space-y-4">
                <div className="aspect-16/9 rounded-xl overflow-hidden bg-white max-w-lg">
                  <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-[#C29B38] uppercase tracking-wider">{category}</span>
                <h2 className="font-serif-brand text-2xl font-bold text-[#1F3325]">{title || 'Tiêu đề bài viết xem trước'}</h2>
                <div className="text-xs text-[#6F7F72]">Tác giả: {author} · {readTime}</div>
                <div
                  className="prose prose-sm text-xs text-[#334237] leading-relaxed border-t border-[#E7E4DC] pt-4"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          )}
        </form>
      ) : (
        /* ========================================================
            BLOG POST LIST TABLE & SEARCH
           ======================================================== */
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-[#E3DFD5] p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F9182]" />
              <input
                type="text"
                placeholder="Tìm bài viết theo tiêu đề, tác giả..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#6F7F72]">Chuyên mục:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs py-1.5 px-3 rounded-xl border border-[#D5DCD6] text-[#2A4B37] bg-white cursor-pointer font-medium"
              >
                <option value="all">Tất cả chuyên mục ({blogs.length})</option>
                <option value="Lối sống thuần chay">Lối sống thuần chay</option>
                <option value="Chăm sóc da tự nhiên">Chăm sóc da tự nhiên</option>
                <option value="Chiến dịch xanh">Chiến dịch xanh</option>
                <option value="Nghiên cứu thành phần">Nghiên cứu thành phần</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E3DFD5] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F6F8F6] text-[#526356] font-semibold border-b border-[#E7E4DC]">
                  <tr>
                    <th className="p-4">Ảnh bìa</th>
                    <th className="p-4">Tiêu đề bài viết</th>
                    <th className="p-4">Chuyên mục</th>
                    <th className="p-4">Tác giả</th>
                    <th className="p-4">Ngày đăng</th>
                    <th className="p-4">Trạng thái</th>
                    <th className="p-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE4]">
                  {filteredBlogs.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FAF9F5] transition-colors">
                      <td className="p-4 w-20">
                        <img src={b.coverImage} alt={b.title} className="w-14 h-10 object-cover rounded-xl border border-[#E7E4DC]" />
                      </td>
                      <td className="p-4 max-w-xs">
                        <p className="font-bold text-[#1F3325] line-clamp-1 text-sm">{b.title}</p>
                        <p className="text-[#7A8B7E] line-clamp-1 mt-0.5">{b.excerpt}</p>
                      </td>
                      <td className="p-4">
                        <span className="bg-[#EAF2EC] text-[#2A4B37] px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                          {b.category}
                        </span>
                      </td>
                      <td className="p-4 text-[#526356]">{b.author}</td>
                      <td className="p-4 text-[#7A8B7E] tabular-nums font-mono">{b.publishDate}</td>
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => {
                            updateBlogPost({ ...b, published: !b.published });
                          }}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            b.published
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                          title="Nhấp để thay đổi trạng thái"
                        >
                          {b.published ? '✓ Đã xuất bản' : 'Bản nháp'}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Detail button */}
                          <button
                            onClick={() => setViewingBlog(b)}
                            className="p-1.5 rounded-lg text-[#2A4B37] hover:bg-[#EAF2EC] transition-colors cursor-pointer"
                            title="Xem chi tiết bài viết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit button */}
                          <button
                            onClick={() => handleStartEdit(b)}
                            className="p-1.5 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Chỉnh sửa bài viết"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => setDeletingBlogId(b.id)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Xóa bài viết"
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
        </div>
      )}

      {/* ========================================================
          MODAL 1: XEM CHI TIẾT BÀI VIẾT (View Blog Modal)
         ======================================================== */}
      {viewingBlog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl border border-[#E7E4DC]">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E7E4DC] flex items-center justify-between z-10">
              <span className="text-xs font-bold text-[#C29B38] uppercase tracking-wider">
                {viewingBlog.category}
              </span>
              <button
                onClick={() => setViewingBlog(null)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="aspect-16/9 max-w-xl mx-auto rounded-2xl overflow-hidden border border-[#E7E4DC] bg-[#FAF9F5]">
                <img
                  src={viewingBlog.coverImage}
                  alt={viewingBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#1F3325]">
                  {viewingBlog.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-[#7A8B7E] mt-2 border-b border-[#EFECE4] pb-3">
                  <span>Tác giả: <strong>{viewingBlog.author}</strong></span>
                  <span>·</span>
                  <span>Ngày đăng: {viewingBlog.publishDate}</span>
                  <span>·</span>
                  <span>Thời gian đọc: {viewingBlog.readTime}</span>
                </div>
              </div>

              <div
                className="prose prose-sm max-w-none text-xs sm:text-sm text-[#334437] leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: viewingBlog.content }}
              />

              <div className="pt-4 border-t border-[#EFECE4] flex flex-wrap gap-1.5">
                {viewingBlog.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-[#F2F7F4] text-[#2A4B37] text-[10px] font-semibold rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF9F5] px-6 py-4 border-t border-[#E7E4DC] flex items-center justify-between">
              <button
                onClick={() => {
                  const b = viewingBlog;
                  setViewingBlog(null);
                  handleStartEdit(b);
                }}
                className="px-4 py-2 bg-[#2A4B37] text-white text-xs font-bold rounded-xl hover:bg-[#1E3728] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Chỉnh sửa bài viết</span>
              </button>

              <button
                onClick={() => setViewingBlog(null)}
                className="px-5 py-2 border border-[#D5DCD6] text-xs font-semibold rounded-xl hover:bg-white cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: XÁC NHẬN XÓA BÀI VIẾT (Safe Confirmation)
         ======================================================== */}
      {deletingBlogId && blogBeingDeleted && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-red-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#1F3325]">
                Xác nhận xóa bài viết này?
              </h3>
              <p className="text-xs text-[#5D6F61] mt-1 leading-relaxed">
                Bạn có chắc chắn muốn xóa bài viết <strong>"{blogBeingDeleted.title}"</strong> khỏi hệ thống blog LUNARA?
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingBlogId(null)}
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

      {/* ========================================================
          MODAL 3: CHÈN ẢNH VÀO NỘI DUNG (Insert Image Prompt)
         ======================================================== */}
      {isImagePromptOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#E7E4DC] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-3">
              <h3 className="font-serif-brand text-base font-bold text-[#1F3325] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#C29B38]" />
                <span>Chèn Hình Ảnh Vào Bài Viết</span>
              </h3>
              <button
                onClick={() => setIsImagePromptOpen(false)}
                className="p-1 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#405043]">
                    Hình ảnh cần chèn *
                  </label>
                  <label className="text-[11px] text-[#2A4B37] hover:underline font-bold cursor-pointer flex items-center gap-1">
                    <Upload className="w-3 h-3 text-[#C29B38]" />
                    <span>Tải từ máy tính</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleInsertImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={insertImageUrl}
                  onChange={(e) => setInsertImageUrl(e.target.value)}
                  placeholder="Dán link ảnh hoặc tải từ máy (https://...)"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37]"
                />
              </div>

              {insertImageUrl && (
                <div className="h-32 rounded-xl overflow-hidden bg-gray-50 border border-[#E7E4DC]">
                  <img src={insertImageUrl} alt="Xem trước ảnh chèn" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E7E4DC]">
              <button
                type="button"
                onClick={() => setIsImagePromptOpen(false)}
                className="px-4 py-2 border border-[#D5DCD6] text-xs font-semibold rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmInsertImage}
                className="px-5 py-2 bg-[#2A4B37] text-white text-xs font-bold rounded-xl hover:bg-[#1E3728] shadow-md cursor-pointer transition-all"
              >
                Chèn vào bài viết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
