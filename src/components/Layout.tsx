import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar />
      <main className="flex-grow pt-[88px]"> {/* Space for fixed navbar */}
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
