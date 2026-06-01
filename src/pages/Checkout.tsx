import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { usePaystackPayment } from 'react-paystack';

export const Checkout = () => {
  const { cart, addOrder, clearCart } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Retrieve paystack public key and clean any accidental quotes
  const rawKey = typeof window !== 'undefined' ? localStorage.getItem('paystack_public_key') : '';
  const publicKey = rawKey ? rawKey.replace(/['"]/g, '').trim() : '';

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email,
    amount: Math.round(total * 100), // Paystack amount is in kobo and must be an integer
    publicKey: publicKey,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    addOrder({
      items: [...cart],
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      totalPrice: total,
      status: 'Processing'
    });
    setIsProcessing(false);
    setSuccess(true);
    clearCart();
    // Redirect after success
    setTimeout(() => navigate('/'), 3000);
  };

  const onClose = () => {
    setIsProcessing(false);
    console.log('Payment closed');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (cart.length === 0) return;
    
    if (!publicKey) {
      setErrorMsg("Paystack Public Key is not set. Please set it in Admin or Integrations Settings.");
      return;
    }

    if (!publicKey.startsWith('pk_')) {
      setErrorMsg("Invalid Paystack Public Key. It must start with 'pk_'. Please check your Admin settings. Make sure you didn't paste a Secret Key.");
      return;
    }

    setIsProcessing(true);
    // Passing onSuccess and onClose to initializePayment.
    // react-paystack v6 handles options either as a callback or config object.
    // Ensure we trigger it correctly:
    // @ts-ignore - The react-paystack signatures might overlap
    initializePayment({ config, onSuccess, onClose });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="w-full bg-[#F8FAFC] min-h-[80vh] flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-heading mb-4">No items to checkout</h2>
          <button onClick={() => navigate('/shop')} className="text-[#6D28D9] font-bold hover:underline">Return to Shop</button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="w-full bg-[#F8FAFC] min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl text-center max-w-md w-full border border-gray-100 shadow-xl shadow-[#10B981]/5">
          <CheckCircle className="w-20 h-20 text-[#10B981] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#0F172A] mb-2 font-heading">Payment Successful</h2>
          <p className="text-gray-500 mb-8 font-sans">Thank you for your order! We are processing it now and will send you an email confirmation shortly.</p>
          <div className="w-full bg-gray-100 h-1 overflow-hidden rounded-full">
            <div className="h-full bg-[#10B981] animate-[progress_3s_ease-in-out_forwards]"></div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row gap-8">
        
        {/* Form Container */}
        <div className="flex-1">
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
              <h3 className="text-red-800 font-bold mb-1 font-heading">Payment Setup Error</h3>
              <p className="text-red-700 text-sm">{errorMsg}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6 font-heading">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9]/50 focus:border-[#6D28D9] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9]/50 focus:border-[#6D28D9] focus:outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9]/50 focus:border-[#6D28D9] focus:outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9]/50 focus:border-[#6D28D9] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9]/50 focus:border-[#6D28D9] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input required type="text" name="zip" value={formData.zip} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9]/50 focus:border-[#6D28D9] focus:outline-none" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full py-5 bg-[#F59E0B] text-[#0F172A] rounded-full font-bold text-lg hover:bg-[#D97706] hover:text-white transition-colors shadow-xl shadow-[#F59E0B]/20 flex items-center justify-center disabled:opacity-70 disabled:cursor-wait"
            >
              {isProcessing ? 'Processing Securely...' : `Pay ₦${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96 shrink-0">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-28 bg-[#0F172A] text-white">
            <h3 className="text-xl font-bold mb-6 font-heading">Your Order</h3>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto hide-scrollbar pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold line-clamp-2">{item.name}</h4>
                    <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold mt-1 text-[#F59E0B]">₦{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-800 space-y-3 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">₦{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-white">{shipping === 0 ? 'Free' : `₦${shipping.toFixed(2)}`}</span>
              </div>
              <div className="pt-4 mt-2 flex justify-between items-center border-t border-gray-800">
                <span className="font-bold text-lg">Total</span>
                <span className="text-2xl font-black text-[#10B981]">₦{total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4" /> SSL Encrypted Checkout
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
