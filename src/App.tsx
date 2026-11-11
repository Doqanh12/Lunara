import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { PillarsSection } from './components/home/PillarsSection';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { AboutSection } from './components/home/AboutSection';
import { ProductCatalog } from './components/shop/ProductCatalog';
import { BlogSection } from './components/blog/BlogSection';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { ProductDetailModal } from './components/shop/ProductDetailModal';
import { SkinQuizModal } from './components/quiz/SkinQuizModal';
import { RecycleBottleModal } from './components/blog/RecycleBottleModal';
import { AiConsultantChat } from './components/ai/AiConsultantChat';
import { ToastContainer } from './components/common/ToastContainer';
import { AdminLayout } from './components/admin/AdminLayout';

const MainAppContent: React.FC = () => {
  const { currentView } = useApp();

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-[#F7F6F2]">
        <AdminLayout />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#222823]">
      <Header />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroBanner />
            <FeaturedProducts />
            <PillarsSection />
          </>
        )}

        {currentView === 'shop' && <ProductCatalog />}
        {currentView === 'blog' && <BlogSection />}
        {currentView === 'about' && <AboutSection />}
      </main>

      <Footer />

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetailModal />
      <SkinQuizModal />
      <RecycleBottleModal />
      <AiConsultantChat />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
