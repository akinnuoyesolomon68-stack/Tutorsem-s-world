/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Settings } from 'lucide-react';
import Layout from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { AppProvider } from './context/AppContext';
import { IntegrationSettingsModal } from './components/IntegrationSettings';

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(() => {
    return typeof window !== 'undefined' && 
      (!localStorage.getItem('supabase_url') || !localStorage.getItem('paystack_public_key'));
  });

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/category/:category" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <IntegrationSettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      </Router>
    </AppProvider>
  );
}
