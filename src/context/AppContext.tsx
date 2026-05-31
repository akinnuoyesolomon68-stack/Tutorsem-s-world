import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customerName: string;
  email: string;
  totalPrice: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  createdAt: string;
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist Actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Admin Product Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Admin Order Actions
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ts_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ts_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ts_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ts_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to local storage
  useEffect(() => { localStorage.setItem('ts_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('ts_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('ts_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('ts_orders', JSON.stringify(orders)); }, [orders]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => wishlist.some(item => item.id === productId);

  // Admin Actions
  const addProduct = (p: Omit<Product, 'id'>) => {
    const newProduct = { ...p, id: Date.now().toString() };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addOrder = (o: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const newOrder: Order = {
      ...o,
      id: Date.now().toString(),
      orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <AppContext.Provider value={{
      products, cart, wishlist, orders,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      toggleWishlist, isInWishlist,
      addProduct, updateProduct, deleteProduct,
      addOrder, updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
