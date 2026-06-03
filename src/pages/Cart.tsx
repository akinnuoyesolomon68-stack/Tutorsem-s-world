import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useAppContext();
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal > 0 ? subtotal + shipping : 0;

  return (
    <div className="w-full bg-[#F8FAFC] min-h-[80vh] py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 font-heading">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2 font-heading">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Discover our premium collections and find something you love.</p>
            <Link to="/shop" className="px-8 py-4 bg-[#F59E0B] text-[#0F172A] rounded-full font-bold hover:bg-[#D97706] hover:text-white transition-colors inline-flex items-center gap-2 shadow-lg">
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {cart.map(item => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id} 
                    className="bg-white p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border border-gray-100 shadow-sm"
                  >
                    <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                      <img src={item.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80'} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-bold text-[#0F172A] text-lg font-heading">{item.name}</h3>
                      <p className="text-sm text-gray-500 font-sans uppercase tracking-wider mt-1">{item.category}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-50 rounded-full border border-gray-200">
                        <button 
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#0F172A]"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-[#0F172A]">{item.quantity}</span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#0F172A]"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="w-20 text-right font-bold text-[#0F172A]">
                        ₦{(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 rounded-full shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96 shrink-0">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-28">
                <h3 className="text-xl font-bold text-[#0F172A] mb-6 font-heading">Order Summary</h3>
                
                <div className="space-y-4 text-sm font-sans">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#0F172A]">₦{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-[#0F172A]">{shipping === 0 ? 'Free' : `₦${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-[#F59E0B] italic">Free shipping on orders over ₦100!</p>
                  )}
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                    <span className="font-bold text-[#0F172A]">Total</span>
                    <span className="text-2xl font-black text-[#0F172A]">₦{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full py-4 bg-[#F59E0B] text-[#0F172A] rounded-full font-bold hover:bg-[#D97706] hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#F59E0B]/20"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => navigate('/shop')}
                    className="w-full py-3 text-[#0F172A] font-bold hover:bg-gray-50 rounded-full transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
