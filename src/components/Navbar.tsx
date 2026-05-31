import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, Search, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Shop All', path: '/shop' },
  { name: 'Men', path: '/shop/category/men' },
  { name: 'Women', path: '/shop/category/women' },
  { name: 'Shoes', path: '/shop/category/shoes' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart, wishlist } = useAppContext();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8 lg:px-12',
          isScrolled ? 'bg-[#0F172A]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg' : 'bg-[#0F172A] py-5'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight text-white group flex items-center gap-1 font-heading">
            <span className="text-white">Motun's</span>
            <span className="text-[#6D28D9]">Unisex</span>
            <span className="text-[#F59E0B]">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-[#F59E0B] relative font-sans',
                  location.pathname === link.path ? 'text-[#F59E0B]' : 'text-gray-300'
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F59E0B] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link to="/shop" className="text-gray-300 hover:text-[#F59E0B] transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/admin" className="text-gray-300 hover:text-[#F59E0B] transition-colors hidden sm:block" title="Admin Dashboard">
              <User className="w-5 h-5" />
            </Link>
            
            <Link to="/shop" className="relative text-gray-300 hover:text-[#F59E0B] transition-colors">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F59E0B] text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative text-gray-300 hover:text-[#10B981] transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#10B981] text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden p-1 text-white"
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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <Link to="/" className="text-2xl font-bold tracking-tight text-[#0F172A] font-heading">
                Motun's <span className="text-[#6D28D9]">Unisex</span><span className="text-[#F59E0B]">.</span>
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
                    'text-xl font-medium tracking-tight transition-colors border-b border-transparent pb-2 border-gray-100 font-heading',
                    location.pathname === link.path ? 'text-[#6D28D9]' : 'text-gray-900'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/admin" className="text-xl font-medium tracking-tight text-gray-900 border-b border-gray-100 pb-2 font-heading">
                Admin Dashboard
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
