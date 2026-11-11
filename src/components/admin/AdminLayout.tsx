import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminProductManager } from './AdminProductManager';
import { AdminBlogEditor } from './AdminBlogEditor';
import { AdminCustomerCRM } from './AdminCustomerCRM';
import { AdminWarehouseOrders } from './AdminWarehouseOrders';
import { AdminBrandBuilder } from './AdminBrandBuilder';
import {
  LayoutDashboard,
  Package,
  FileEdit,
  Users,
  Truck,
  Palette,
  LogOut,
  ArrowLeft,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const {
    isAdminLoggedIn,
    logoutAdmin,
    adminTab,
    setAdminTab,
    setCurrentView,
    language,
  } = useApp();

  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }

  const navItems = [
    { id: 'dashboard', vi: 'Tổng quan', en: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', vi: 'Sản phẩm & Kho', en: 'Catalog & Stock', icon: Package },
    { id: 'warehouse', vi: 'Đơn hàng & Vận đơn', en: 'Orders & Shipping', icon: Truck },
    { id: 'crm', vi: 'Khách hàng & CRM', en: 'Customer CRM', icon: Users },
    { id: 'blogs', vi: 'Soạn thảo Blog & CMS', en: 'Article Publisher', icon: FileEdit },
    { id: 'builder', vi: 'Thiết kế Giao diện', en: 'Page Builder', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col">
      {/* Admin Top Navbar */}
      <header className="bg-[#1C2C22] text-white border-b border-[#2D4536] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand lockup */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-[#1C2C22] font-serif-brand font-bold flex items-center justify-center">
              L
            </div>
            <div>
              <span className="font-serif-brand text-lg font-bold tracking-wider block leading-none">
                LUNARA ADMIN CMS
              </span>
              <span className="text-[10px] text-[#A5BBAA] font-mono block">
                {language === 'vi' ? 'Sapo Omnichannel Portal · Quản trị viên' : 'Sapo Omnichannel Portal · Admin'}
              </span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              title={language === 'vi' ? 'Mở giao diện người mua' : 'Open Storefront'}
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">
                {language === 'vi' ? 'Xem Cửa Hàng' : 'View Storefront'}
              </span>
            </button>

            <button
              onClick={logoutAdmin}
              className="p-2 rounded-xl text-red-300 hover:bg-red-950/40 hover:text-red-200 transition-colors cursor-pointer"
              title={language === 'vi' ? 'Đăng xuất' : 'Logout'}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area with Sidebar Tabs */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="bg-white p-3 rounded-2xl border border-[#E3DFD5] shadow-2xs space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#738477]">
              {language === 'vi' ? 'Phân Hệ Nghiệp Vụ' : 'Admin Modules'}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;
              const label = language === 'vi' ? item.vi : item.en;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#2A4B37] text-white shadow-xs'
                      : 'text-[#465749] hover:bg-[#F2F7F4] hover:text-[#2A4B37]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-[#7B8C7E]'}`} />
                  <span className="font-semibold block">{label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Tab Content Display */}
        <main className="flex-1 min-w-0">
          {adminTab === 'dashboard' && <AdminDashboard />}
          {adminTab === 'products' && <AdminProductManager />}
          {adminTab === 'blogs' && <AdminBlogEditor />}
          {adminTab === 'crm' && <AdminCustomerCRM />}
          {adminTab === 'warehouse' && <AdminWarehouseOrders />}
          {adminTab === 'builder' && <AdminBrandBuilder />}
        </main>
      </div>
    </div>
  );
};
