import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ShoppingCart, X, CheckCircle } from 'lucide-react';
import { useAppContext, Product, Order } from '../context/AppContext';
import { cn } from '../lib/utils';

const CATEGORIES = ['All', 'Accessories', 'Student Materials', 'Clothes', 'Shoes', 'Data Analysis'] as const;
type Category = typeof CATEGORIES[number];

export const Marketplace = () => {
  const { products, addOrder } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | null;
  
  const [activeCategory, setActiveCategory] = useState<Category>(categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'price-asc' | 'price-desc'>('latest');

  const [purchasingProduct, setPurchasingProduct] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [orderSuccess, setOrderSuccess] = useState<Order | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return parseInt(b.id) - parseInt(a.id); // latest assuming id is timestamp
    });

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!purchasingProduct) return;
    
    // Generate an order
    const orderNum = 'ORD-' + Math.floor(10000000 + Math.random() * 90000000);
    const newOrder: Omit<Order, 'id'> = {
       orderNumber: orderNum,
       productName: purchasingProduct.name,
       customerName,
       totalPrice: purchasingProduct.price,
       status: 'Processing',
       estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
       createdAt: new Date().toISOString()
    };
    
    try {
      await addOrder(newOrder);
      setOrderSuccess({ ...newOrder, id: 'temp' });
      setPurchasingProduct(null);
      setCustomerName('');
    } catch (err: any) {
      alert("Failed to place order: " + err.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-12 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-gray-900 mb-6">Marketplace</h1>
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex bg-white rounded-full p-1 border border-gray-200 overflow-x-auto hide-scrollbar w-full md:w-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                    activeCategory === cat ? "bg-gray-900 text-white shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white border border-gray-200 rounded-full py-3 pl-4 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all cursor-pointer"
                >
                  <option value="latest">Latest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <SlidersHorizontal className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map(product => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group hover:shadow-xl hover:shadow-gray-200/50 transition-all flex flex-col"
                >
                  <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.isSold && (
                      <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                        SOLD OUT
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs font-semibold tracking-wider text-teal-600 uppercase mb-2">{product.category}</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-6 flex-grow">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-semibold text-gray-900">₦{product.price.toLocaleString()}</span>
                      <button 
                        disabled={product.isSold} 
                        onClick={() => !product.isSold && setPurchasingProduct(product)}
                        className={cn(
                          "flex items-center space-x-2 text-sm font-medium px-4 py-2.5 rounded-full transition-colors",
                          product.isSold 
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                            : "bg-gray-900 text-white hover:bg-gray-800"
                        )}
                      >
                        {product.isSold ? (
                          <span>Unavailable</span>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Buy Now</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-32 text-center">
            <h3 className="text-2xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your category or search filters.</p>
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      <AnimatePresence>
        {purchasingProduct && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
             <motion.div
               initial={{ scale: 0.95, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 20 }}
               className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
             >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                   <h3 className="text-xl font-semibold text-gray-900">Checkout</h3>
                   <button onClick={() => setPurchasingProduct(null)} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6 bg-gray-50 flex items-center space-x-4">
                   <img src={purchasingProduct.image} alt={purchasingProduct.name} className="w-16 h-16 rounded-xl object-cover" />
                   <div>
                      <h4 className="font-medium text-gray-900">{purchasingProduct.name}</h4>
                      <p className="text-teal-600 font-semibold">₦{purchasingProduct.price.toLocaleString()}</p>
                   </div>
                </div>
                <form onSubmit={handlePurchase} className="p-6 space-y-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" required placeholder="Enter your full name" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                   </div>
                   <button type="submit" className="w-full py-4 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors mt-4">Complete Purchase</button>
                </form>
             </motion.div>
          </motion.div>
        )}
        
        {/* Success Modal */}
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
             <motion.div
               initial={{ scale: 0.95, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 20 }}
               className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 text-center"
             >
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Order Confirmed!</h3>
                <p className="text-gray-500 mb-6">Thank you for your purchase. Your order has been placed.</p>
                <div className="bg-gray-50 p-4 rounded-xl mb-8 border border-gray-100">
                   <p className="text-sm border-gray-500 mb-1">Your Order Number is:</p>
                   <p className="text-xl font-bold text-gray-900 tracking-wider">{orderSuccess.orderNumber}</p>
                   <p className="text-xs text-gray-400 mt-2">Save this number to track your order.</p>
                </div>
                <div className="space-y-3">
                   <a 
                     href={`https://wa.me/2348154405635?text=Hello, I just placed an order for ${encodeURIComponent(orderSuccess.productName)}.%0A%0AOrder Number: ${orderSuccess.orderNumber}%0ACustomer Name: ${encodeURIComponent(orderSuccess.customerName)}`}
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="block w-full py-4 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
                   >
                     Notify Vendor on WhatsApp
                   </a>
                   <button onClick={() => setOrderSuccess(null)} className="block w-full py-4 rounded-xl bg-white border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 transition-colors">Continue Shopping</button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
