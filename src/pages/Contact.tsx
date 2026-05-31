import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageCircle, Phone } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      
      const text = `Hello, I'm contacting you from Motun's Unisex.\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Order/Subject:* ${formData.subject}\n*Message:* ${formData.message}`;
      const url = `https://wa.me/2349115275892?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-[80vh] py-12 lg:py-24 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#0F172A] mb-6 font-heading">Get In Touch</h1>
          <p className="text-lg text-gray-500 font-sans leading-relaxed">
            Need help with an order, styling advice, or general inquiries? Our customer support team is here for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-10"
          >
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-6 font-heading">Support Channels</h3>
              <div className="space-y-4">
                <a href="mailto:akinnuoyesolomon7@gmail.com" className="flex items-center space-x-4 group p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#6D28D9]/30 transition-colors">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl text-[#6D28D9] flex items-center justify-center group-hover:bg-[#6D28D9] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A]">Email Us</p>
                    <p className="text-sm text-gray-500">akinnuoyesolomon7@gmail.com</p>
                  </div>
                </a>
                
                <a href="https://wa.me/2349115275892" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#10B981]/30 transition-colors">
                  <div className="w-12 h-12 bg-green-50 rounded-xl text-[#10B981] flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A]">WhatsApp Chat</p>
                    <p className="text-sm text-gray-500">09115275892</p>
                  </div>
                </a>

                <a href="tel:+2349115275892" className="flex items-center space-x-4 group p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-gray-300 transition-colors">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl text-gray-600 flex items-center justify-center group-hover:bg-gray-800 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F172A]">Call Us</p>
                    <p className="text-sm text-gray-500">09115275892</p>
                  </div>
                </a>
              </div>
            </div>

          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-[#0F172A]/5 border border-gray-100 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full translate-x-16 -translate-y-16"></div>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-gray-700">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-gray-700">Order Number / Subject</label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-gray-700">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/50 transition-all resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center space-x-2 bg-[#F59E0B] text-[#0F172A] font-bold py-4 rounded-xl hover:bg-[#D97706] hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
              >
                {status === 'submitting' ? (
                  <span>Sending Message...</span>
                ) : status === 'success' ? (
                  <span>Message Sent! We will reply soon.</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
