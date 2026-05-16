import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Vision', path: '/vision' },
  { name: 'Data Analysis', path: '/data-analysis' },
  { name: 'Marketplace', path: '/marketplace' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12',
          isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm' : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold tracking-tight text-gray-900 group">
            TUTORSEM's World<span className="text-teal-600 transition-colors group-hover:text-teal-500">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-teal-600',
                  location.pathname === link.path ? 'text-teal-600 border-b-2 border-teal-600 pb-1' : 'text-gray-600'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/marketplace" className="p-2 text-gray-600 hover:text-teal-600 transition-colors hidden md:block">
              <ShoppingBag className="w-5 h-5" />
            </Link>
            <button
              className="md:hidden p-2 text-gray-900"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white md:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
              <Link to="/" className="text-2xl font-semibold tracking-tight text-gray-900">
                TUTORSEM's World<span className="text-teal-600">.</span>
              </Link>
              <button
                className="p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col p-6 space-y-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'text-xl font-medium tracking-tight transition-colors',
                    location.pathname === link.path ? 'text-teal-600' : 'text-gray-900'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
