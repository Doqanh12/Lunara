import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, BlogPost, Customer, Order, BrandDesignConfig } from '../types';
import { INITIAL_PRODUCTS, INITIAL_BLOGS, INITIAL_CUSTOMERS, INITIAL_ORDERS, INITIAL_BRAND_DESIGN } from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  // Storefront state
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Checkout modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber'>) => Order;

  // Blog state
  blogs: BlogPost[];
  selectedBlog: BlogPost | null;
  setSelectedBlog: (b: BlogPost | null) => void;
  addBlogPost: (post: Omit<BlogPost, 'id' | 'publishDate'>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;

  // Product management (Admin)
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Customers & CRM (Sapo standard)
  customers: Customer[];
  addCustomer: (c: Omit<Customer, 'id' | 'joinedDate' | 'totalSpent' | 'ordersCount' | 'loyaltyPoints' | 'bottlesRecycled' | 'loyaltyTier'>) => void;
  updateCustomer: (c: Customer) => void;
  activateMembership: (customerId: string) => void;
  addRecycledBottles: (customerId: string, count: number) => void;

  // Orders & Sapo Warehouse
  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], paymentStatus?: Order['paymentStatus']) => void;

  // Brand Design Customizer (Page Builder)
  brandDesign: BrandDesignConfig;
  updateBrandDesign: (config: Partial<BrandDesignConfig>) => void;
  resetBrandDesign: () => void;

  // Navigation & Admin mode
  currentView: 'home' | 'shop' | 'blog' | 'about' | 'admin';
  setCurrentView: (view: 'home' | 'shop' | 'blog' | 'about' | 'admin') => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  adminTab: 'dashboard' | 'products' | 'blogs' | 'crm' | 'warehouse' | 'builder';
  setAdminTab: (tab: 'dashboard' | 'products' | 'blogs' | 'crm' | 'warehouse' | 'builder') => void;

  // Language state (Vietnamese / English switcher)
  language: 'vi' | 'en';
  setLanguage: (lang: 'vi' | 'en') => void;
  toggleLanguage: () => void;


  // Skin Quiz Modal
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;

  // Recycling form modal
  isRecycleModalOpen: boolean;
  setIsRecycleModalOpen: (open: boolean) => void;

  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persistent or initial data
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lunara_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('lunara_blogs');
    return saved ? JSON.parse(saved) : INITIAL_BLOGS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('lunara_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('lunara_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lunara_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isRecycleModalOpen, setIsRecycleModalOpen] = useState(false);

  // Brand Design state
  const [brandDesign, setBrandDesign] = useState<BrandDesignConfig>(() => {
    const saved = localStorage.getItem('lunara_brand_design');
    return saved ? JSON.parse(saved) : INITIAL_BRAND_DESIGN;
  });

  // Navigation & Admin State
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'blog' | 'about' | 'admin'>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('lunara_admin_auth') === 'true';
  });
  const [adminTab, setAdminTab] = useState<'dashboard' | 'products' | 'blogs' | 'crm' | 'warehouse' | 'builder'>('dashboard');

  // Language state (defaults to 'vi', persists to localStorage)
  const [language, setLanguageState] = useState<'vi' | 'en'>(() => {
    const saved = localStorage.getItem('lunara_language');
    return saved === 'en' || saved === 'vi' ? saved : 'vi';
  });

  const setLanguage = (lang: 'vi' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('lunara_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };


  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('lunara_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lunara_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('lunara_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('lunara_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lunara_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lunara_brand_design', JSON.stringify(brandDesign));
  }, [brandDesign]);

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Place Order
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingNumber'>): Order => {
    const newId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomTracking = (orderData.shippingCarrier === 'Viettel Post' ? 'VP' : 'JT') + Math.floor(10000000 + Math.random() * 90000000) + 'VN';
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder: Order = {
      ...orderData,
      id: newId,
      trackingNumber: randomTracking,
      createdAt: formattedDate,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Auto-update or add customer record in CRM
    setCustomers(prev => {
      const existingIndex = prev.findIndex(c => c.phone === orderData.phone || c.email === orderData.email);
      if (existingIndex >= 0) {
        const updated = [...prev];
        const current = updated[existingIndex];
        const newTotal = current.totalSpent + orderData.finalAmount;
        const newOrdersCount = current.ordersCount + 1;
        const newPoints = current.loyaltyPoints + Math.floor(orderData.finalAmount / 10000);
        let tier = current.loyaltyTier;
        if (newPoints > 200) tier = 'Rừng Lunara';
        else if (newPoints > 100) tier = 'Cây Xanh';
        else if (newPoints > 40) tier = 'Chồi Non';

        updated[existingIndex] = {
          ...current,
          totalSpent: newTotal,
          ordersCount: newOrdersCount,
          loyaltyPoints: newPoints,
          loyaltyTier: tier,
          lastPurchaseDate: formattedDate.split(' ')[0],
        };
        return updated;
      } else {
        const newCustomer: Customer = {
          id: `CUST-${String(prev.length + 1).padStart(3, '0')}`,
          fullName: orderData.customerName,
          email: orderData.email,
          phone: orderData.phone,
          address: orderData.shippingAddress,
          skinType: 'Da nhạy cảm',
          primaryConcern: 'Nếp nhăn & Lão hóa',
          segment: 'office_worker',
          totalSpent: orderData.finalAmount,
          ordersCount: 1,
          loyaltyPoints: Math.floor(orderData.finalAmount / 10000),
          bottlesRecycled: 0,
          loyaltyTier: 'Hạt Mầm',
          isMember: true,
          joinedDate: formattedDate.split(' ')[0],
          lastPurchaseDate: formattedDate.split(' ')[0],
        };
        return [newCustomer, ...prev];
      }
    });

    // Reduce stock in products
    setProducts(prev => {
      return prev.map(p => {
        const orderedItem = orderData.items.find(i => i.productId === p.id);
        if (orderedItem) {
          return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
        }
        return p;
      });
    });

    showToast(`Đặt hàng thành công! Mã đơn: ${newId}`);
    return newOrder;
  };

  // Blog actions
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'publishDate'>) => {
    const newId = `blog-${Date.now()}`;
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const newPost: BlogPost = {
      ...post,
      id: newId,
      publishDate: formattedDate,
    };
    setBlogs(prev => [newPost, ...prev]);
    showToast('Đã xuất bản bài viết mới lên Blog LUNARA!');
  };

  const updateBlogPost = (post: BlogPost) => {
    setBlogs(prev => prev.map(b => (b.id === post.id ? post : b)));
    showToast('Cập nhật bài viết thành công');
  };

  const deleteBlogPost = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
    showToast('Đã xóa bài viết', 'info');
  };

  // Product actions
  const addProduct = (p: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...p,
      id: newId,
      rating: 5.0,
      reviewsCount: 1,
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Đã thêm sản phẩm "${p.name}" vào danh mục`);
  };

  const updateProduct = (p: Product) => {
    setProducts(prev => prev.map(item => (item.id === p.id ? p : item)));
    showToast(`Đã lưu thay đổi cho sản phẩm "${p.name}"`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Đã xóa sản phẩm', 'info');
  };

  // Customers & CRM
  const addCustomer = (c: Omit<Customer, 'id' | 'joinedDate' | 'totalSpent' | 'ordersCount' | 'loyaltyPoints' | 'bottlesRecycled' | 'loyaltyTier'>) => {
    const newId = `CUST-${String(customers.length + 1).padStart(3, '0')}`;
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const newCustomer: Customer = {
      ...c,
      id: newId,
      joinedDate: formattedDate,
      totalSpent: 0,
      ordersCount: 0,
      loyaltyPoints: 20, // Điểm thưởng chào mừng
      bottlesRecycled: 0,
      loyaltyTier: 'Hạt Mầm',
    };
    setCustomers(prev => [newCustomer, ...prev]);
    showToast(`Đã thêm khách hàng ${c.fullName} vào hệ thống CRM`);
  };

  const updateCustomer = (c: Customer) => {
    setCustomers(prev => prev.map(item => (item.id === c.id ? c : item)));
    showToast('Cập nhật hồ sơ khách hàng thành công');
  };

  const activateMembership = (customerId: string) => {
    setCustomers(prev =>
      prev.map(c => (c.id === customerId ? { ...c, isMember: true } : c))
    );
    showToast('Đã kích hoạt chương trình Thân thiết Sapo Loyalty cho khách hàng');
  };

  const addRecycledBottles = (customerId: string, count: number) => {
    setCustomers(prev =>
      prev.map(c => {
        if (c.id === customerId) {
          const newBottles = c.bottlesRecycled + count;
          const pointsEarned = count * 20;
          return {
            ...c,
            bottlesRecycled: newBottles,
            loyaltyPoints: c.loyaltyPoints + pointsEarned,
          };
        }
        return c;
      })
    );
    showToast(`Đã ghi nhận ${count} vỏ chai tái chế! Tích thêm ${count * 20} điểm xanh.`);
  };

  // Orders & Warehouse
  const updateOrderStatus = (orderId: string, status: Order['orderStatus'], paymentStatus?: Order['paymentStatus']) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus: status,
            ...(paymentStatus ? { paymentStatus } : {}),
          };
        }
        return o;
      })
    );
    showToast(`Cập nhật trạng thái đơn ${orderId} thành "${status}"`);
  };

  // Brand Design actions
  const updateBrandDesign = (config: Partial<BrandDesignConfig>) => {
    setBrandDesign(prev => ({ ...prev, ...config }));
    showToast('Đã lưu cấu hình thiết kế thương hiệu LUNARA!');
  };

  const resetBrandDesign = () => {
    setBrandDesign(INITIAL_BRAND_DESIGN);
    showToast('Đã khôi phục thiết kế ban đầu chuẩn Cocoon Original', 'info');
  };

  // Admin Auth
  const loginAdmin = (user: string, pass: string): boolean => {
    if (
      (user === 'admin@lunara.vn' && pass === 'lunara2025') ||
      (user === 'admin' && pass === '123456') ||
      (user === 'demo' && pass === 'demo')
    ) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('lunara_admin_auth', 'true');
      showToast('Đăng nhập Quản trị viên LUNARA thành công');
      return true;
    }
    showToast('Tài khoản hoặc mật khẩu quản trị không chính xác', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('lunara_admin_auth');
    setCurrentView('home');
    showToast('Đã đăng xuất khỏi cổng Quản trị', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        placeOrder,
        blogs,
        selectedBlog,
        setSelectedBlog,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addProduct,
        updateProduct,
        deleteProduct,
        customers,
        addCustomer,
        updateCustomer,
        activateMembership,
        addRecycledBottles,
        orders,
        updateOrderStatus,
        brandDesign,
        updateBrandDesign,
        resetBrandDesign,
        currentView,
        setCurrentView,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        adminTab,
        setAdminTab,
        isQuizOpen,
        setIsQuizOpen,
        isRecycleModalOpen,
        setIsRecycleModalOpen,
        toasts,
        showToast,
        removeToast,
        language,
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
