import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Accessories' | 'Student Materials' | 'Clothes' | 'Shoes' | 'Data Analysis';
  image: string;
  isSold: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'Website Design' | 'Graphics Design' | 'Data Analysis';
  image: string;
}

export interface SiteContent {
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  aboutIntro: string;
  visionText: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  productName: string;
  customerName: string;
  totalPrice: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  createdAt: string;
}

interface AppContextType {
  products: Product[];
  portfolioItems: PortfolioItem[];
  siteContent: SiteContent;
  orders: Order[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => Promise<void>;
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => Promise<void>;
  deletePortfolioItem: (id: string) => Promise<void>;
  updateSiteContent: (updates: Partial<SiteContent>) => Promise<void>;
  addOrder: (order: Omit<Order, 'id'>) => Promise<void>;
  updateOrder: (id: string, updates: Partial<Order>) => Promise<void>;
}

const defaultContent: SiteContent = {
  homeHeroTitle: "TUTORSEM's World",
  homeHeroSubtitle: 'Designing digital experiences, data insights, & curating premium products.',
  aboutIntro: 'I am a passionate UI/UX developer, designer, and data analyst bridging the gap between creativity, technology, and commerce.',
  visionText: 'To build a platform that combines creativity, technology, business, and opportunities for students and customers globally.'
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultContent);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchData();

    // Subscribe to realtime changes
    const productSubscription = supabase
      .channel('public:products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchData)
      .subscribe();

    const portfolioSubscription = supabase
      .channel('public:portfolio_items')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_items' }, fetchData)
      .subscribe();

    const orderSubscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchData)
      .subscribe();

    const siteContentSubscription = supabase
      .channel('public:site_content')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content' }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(productSubscription);
      supabase.removeChannel(portfolioSubscription);
      supabase.removeChannel(orderSubscription);
      supabase.removeChannel(siteContentSubscription);
    };
  }, []);

  const fetchData = async () => {
    try {
      // Products
      const { data: prodData, error: prodErr } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (prodErr) console.error('Fetch products error:', prodErr);
      if (prodData) {
        setProducts(prodData.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          image: p.image,
          isSold: p.is_sold
        })));
      }

      // Portfolio
      const { data: portData, error: portErr } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: false });
      if (portErr) console.error('Fetch portfolio error:', portErr);
      if (portData) {
        setPortfolioItems(portData.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          category: p.category,
          image: p.image
        })));
      }

      // Orders
      const { data: orderData, error: orderErr } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (orderErr) console.error('Fetch orders error:', orderErr);
      if (orderData) {
        setOrders(orderData.map(o => ({
          id: o.id,
          orderNumber: o.order_number,
          productName: o.product_name,
          customerName: o.customer_name,
          totalPrice: o.total_price,
          status: o.status,
          estimatedDelivery: o.estimated_delivery,
          createdAt: o.created_at
        })));
      }

      // Site Content
      const { data: contentData, error: contentErr } = await supabase.from('site_content').select('*').eq('id', 1).single();
      if (contentErr && contentErr.code !== 'PGRST116') { // PGRST116 is just "no rows returned"
         console.error('Fetch site content error:', contentErr);
      }
      if (contentData) {
        setSiteContent({
          homeHeroTitle: contentData.home_hero_title,
          homeHeroSubtitle: contentData.home_hero_subtitle,
          aboutIntro: contentData.about_intro,
          visionText: contentData.vision_text
        });
      }
    } catch (err) {
      console.error('Unexpected error fetching data from Supabase:', err);
    }
  };

  const addProduct = async (p: Omit<Product, 'id'>) => {
    const { data, error } = await supabase.from('products').insert({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      image: p.image,
      is_sold: p.isSold
    }).select().single();
    if (error) {
      console.error('Supabase addProduct error:', error);
      throw new Error(error.message);
    }
    if (data) {
      setProducts(prev => [{
        id: data.id, name: data.name, description: data.description, 
        price: data.price, category: data.category, image: data.image, isSold: data.is_sold 
      }, ...prev]);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const updateData: any = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.image !== undefined) updateData.image = updates.image;
    if (updates.isSold !== undefined) updateData.is_sold = updates.isSold;
    
    const { error } = await supabase.from('products').update(updateData).eq('id', id);
    if (error) {
      console.error('Supabase updateProduct error:', error);
      throw new Error(error.message);
    }
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Supabase deleteProduct error:', error);
      throw new Error(error.message);
    }
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addPortfolioItem = async (p: Omit<PortfolioItem, 'id'>) => {
    const { data, error } = await supabase.from('portfolio_items').insert({
      title: p.title,
      description: p.description,
      category: p.category,
      image: p.image
    }).select().single();
    if (error) {
      console.error('Supabase addPortfolioItem error:', error);
      throw new Error(error.message);
    }
    if (data) {
      setPortfolioItems(prev => [{
        id: data.id, title: data.title, description: data.description,
        category: data.category, image: data.image
      }, ...prev]);
    }
  };

  const updatePortfolioItem = async (id: string, updates: Partial<PortfolioItem>) => {
    const updateData: any = {};
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.image !== undefined) updateData.image = updates.image;

    const { error } = await supabase.from('portfolio_items').update(updateData).eq('id', id);
    if (error) {
      console.error('Supabase updatePortfolioItem error:', error);
      throw new Error(error.message);
    }
    setPortfolioItems(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePortfolioItem = async (id: string) => {
    const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
    if (error) {
      console.error('Supabase deletePortfolioItem error:', error);
      throw new Error(error.message);
    }
    setPortfolioItems(prev => prev.filter(p => p.id !== id));
  };

  const updateSiteContent = async (updates: Partial<SiteContent>) => {
    const updateData: any = {};
    if (updates.homeHeroTitle !== undefined) updateData.home_hero_title = updates.homeHeroTitle;
    if (updates.homeHeroSubtitle !== undefined) updateData.home_hero_subtitle = updates.homeHeroSubtitle;
    if (updates.aboutIntro !== undefined) updateData.about_intro = updates.aboutIntro;
    if (updates.visionText !== undefined) updateData.vision_text = updates.visionText;

    const { error } = await supabase.from('site_content').update(updateData).eq('id', 1);
    if (error) {
      console.error('Supabase updateSiteContent error:', error);
      throw new Error(error.message);
    }
    setSiteContent(prev => ({ ...prev, ...updates }));
  };

  const addOrder = async (o: Omit<Order, 'id'>) => {
    const orderData = {
      order_number: o.orderNumber,
      product_name: o.productName,
      customer_name: o.customerName,
      total_price: o.totalPrice,
      status: o.status,
      estimated_delivery: o.estimatedDelivery
    };
    const { data, error } = await supabase.from('orders').insert(orderData).select().single();
    if (error) {
      console.error("Order insertion error:", error);
      throw new Error(error.message);
    }
    if (data) {
      setOrders(prev => [{
        id: data.id,
        orderNumber: data.order_number,
        productName: data.product_name,
        customerName: data.customer_name,
        totalPrice: data.total_price,
        status: data.status,
        estimatedDelivery: data.estimated_delivery,
        createdAt: data.created_at
      }, ...prev]);
    }
  };

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    const updateData: any = {};
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.estimatedDelivery !== undefined) updateData.estimated_delivery = updates.estimatedDelivery;

    const { error } = await supabase.from('orders').update(updateData).eq('id', id);
    if (error) {
      console.error("Order update error:", error);
      throw new Error(error.message);
    }
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  return (
    <AppContext.Provider value={{
      products, portfolioItems, siteContent, orders,
      addProduct, updateProduct, deleteProduct,
      addPortfolioItem, updatePortfolioItem, deletePortfolioItem,
      updateSiteContent, addOrder, updateOrder
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
