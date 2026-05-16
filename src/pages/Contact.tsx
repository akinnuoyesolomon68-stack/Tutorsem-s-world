import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen pt-20 pb-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-gray-900 mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Have a project in mind, need to order a custom product, or simply want to say hello? Let's connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-10"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <a href="mailto:hello@tutorsem.com" className="flex items-start space-x-4 group text-gray-600 hover:text-teal-600 transition-colors">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-teal-50 transition-colors">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-teal-600">Email</p>
                    <p>hello@tutorsem.com</p>
                  </div>
                </a>
                <a href="https://wa.me/2348154405635" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group text-gray-600 hover:text-[#25D366] transition-colors">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-[#25D366]/10 transition-colors">
                    <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-[#25D366]">WhatsApp</p>
                    <p>+234 815 440 5635</p>
                  </div>
                </a>
                <div className="flex items-start space-x-4 text-gray-600">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p>Available for freelance worldwide.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Socials</h3>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-gray-900 hover:bg-gray-50 transition-all">X Profile</a>
                <a href="#" className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-gray-900 hover:bg-gray-50 transition-all">Facebook profile</a>
                <a href="#" className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-gray-900 hover:bg-gray-50 transition-all">Instagram profile</a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white font-medium py-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <span>Sending...</span>
                ) : status === 'success' ? (
                  <span>Message Sent Successfully!</span>
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

        {/* Embedded Map Section Placeholder */}
        <div className="mt-24 h-96 bg-gray-200 rounded-[2rem] overflow-hidden relative">
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d-0.1276!3d51.5072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
