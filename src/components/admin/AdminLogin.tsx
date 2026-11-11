import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setCurrentView } = useApp();
  const [email, setEmail] = useState('admin@lunara.vn');
  const [password, setPassword] = useState('lunara2025');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(email, password);
  };

  const handleQuickDemo = () => {
    loginAdmin('admin@lunara.vn', 'lunara2025');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-[#FAF9F5]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#E3DFD5] p-8 space-y-6">
        {/* Top return link */}
        <button
          onClick={() => setCurrentView('home')}
          className="text-xs text-[#5D6F61] hover:text-[#2A4B37] flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Về trang chủ khách hàng</span>
        </button>

        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#2A4B37] text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h2 className="font-serif-brand text-2xl font-bold text-[#1F3325]">
            Cổng Quản Trị LUNARA
          </h2>
          <p className="text-xs text-[#6F7F72]">
            Hệ thống Quản lý Bán hàng Đa kênh & CRM chuẩn SAPO
          </p>
        </div>

        {/* Demo credentials hint */}
        <div className="p-3.5 rounded-2xl bg-[#F0F5F1] border border-[#D5E5DA] text-xs text-[#2A4B37] space-y-1">
          <p className="font-semibold flex items-center justify-between">
            <span>Tài khoản Quản trị viên thử nghiệm:</span>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-[#C29B38] underline font-bold hover:text-[#a07e2a] cursor-pointer"
            >
              1-Click Đăng Nhập
            </button>
          </p>
          <p>• Email: <code className="bg-white/80 px-1 py-0.5 rounded font-mono">admin@lunara.vn</code></p>
          <p>• Mật khẩu: <code className="bg-white/80 px-1 py-0.5 rounded font-mono">lunara2025</code></p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#405043] mb-1">
              Email đăng nhập Quản trị *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F9182]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] text-[#1F3325]"
                placeholder="admin@lunara.vn"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#405043] mb-1">
              Mật khẩu bảo mật *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F9182]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] text-[#1F3325]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#2A4B37] hover:bg-[#1E3728] text-white text-sm font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Đăng nhập Quản trị CMS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
