import React, { useState, useEffect } from 'react';
import { X, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const IntegrationSettingsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [paystack, setPaystack] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setUrl(localStorage.getItem('supabase_url') || '');
      setKey(localStorage.getItem('supabase_anon_key') || '');
      setPaystack(localStorage.getItem('paystack_public_key') || '');
      setStatus(null);
    }
  }, [isOpen]);

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('supabase_url', url);
    localStorage.setItem('supabase_anon_key', key);
    localStorage.setItem('paystack_public_key', paystack);
    setStatus('Saved successfully! Refreshing...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-lg p-6 md:p-8 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-[#F59E0B]/10 p-3 rounded-full">
                  <Settings2 className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <h2 className="text-2xl font-bold font-heading text-[#0F172A]">API Settings</h2>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-500 font-sans mb-6 text-sm">
              Enter your credentials below. They are stored securely in your browser's local storage and used directly from the client.
            </p>
            
            <form onSubmit={saveSettings} className="space-y-5 font-sans">
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2">Supabase Project URL</label>
                <input 
                  type="text" 
                  placeholder="https://your-project.supabase.co" 
                  className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9] focus:outline-none transition-all placeholder:text-gray-400 font-mono text-sm" 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2">Supabase Anon Key</label>
                <input 
                  type="password" 
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                  className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9] focus:outline-none transition-all placeholder:text-gray-400 font-mono text-sm" 
                  value={key} 
                  onChange={(e) => setKey(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0F172A] mb-2">Paystack Public Key</label>
                <input 
                  type="text" 
                  placeholder="pk_test_..." 
                  className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D28D9] focus:outline-none transition-all placeholder:text-gray-400 font-mono text-sm" 
                  value={paystack} 
                  onChange={(e) => setPaystack(e.target.value)} 
                />
              </div>
              
              {status && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 font-bold bg-green-50 p-3 rounded-lg text-center text-sm"
                >
                  {status}
                </motion.p>
              )}
              
              <button 
                type="submit" 
                className="w-full py-4 mt-2 bg-[#F59E0B] text-[#0F172A] rounded-xl hover:bg-[#D97706] hover:text-white transition-colors font-bold shadow-lg"
              >
                Save Keys & Reload
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
