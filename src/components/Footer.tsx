import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-[#1E293B] py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
        <div className="col-span-1 md:col-span-1 lg:col-span-2">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white font-heading flex items-center gap-1">
            <span className="text-white">Motun's</span>
            <span className="text-[#6D28D9]">Unisex</span>
            <span className="text-[#F59E0B]">.</span>
          </Link>
          <p className="mt-4 text-gray-400 max-w-sm text-sm leading-relaxed font-sans">
            A premium e-commerce platform defining fashion and lifestyle. We bring luxurious, high-quality styles directly to students, professionals, and fashion enthusiasts worldwide.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a href="#" className="w-10 h-10 rounded-full bg-[#1E293B] text-gray-300 flex items-center justify-center hover:bg-[#F59E0B] hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#1E293B] text-gray-300 flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#1E293B] text-gray-300 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase font-heading">Shop</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-sans">
            <li><Link to="/shop/category/men" className="hover:text-[#F59E0B] transition-colors">Men's Fashion</Link></li>
            <li><Link to="/shop/category/women" className="hover:text-[#F59E0B] transition-colors">Women's Fashion</Link></li>
            <li><Link to="/shop/category/shoes" className="hover:text-[#F59E0B] transition-colors">Shoes & Sneakers</Link></li>
            <li><Link to="/shop/category/student" className="hover:text-[#F59E0B] transition-colors">Student Essentials</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase font-heading">Company</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-sans">
            <li><Link to="/about" className="hover:text-[#F59E0B] transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#F59E0B] transition-colors">Contact Support</Link></li>
            <li><a href="#" className="hover:text-[#F59E0B] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#F59E0B] transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between font-sans">
        <div className="text-sm text-gray-500 space-y-1 md:space-y-0 md:flex md:items-center md:gap-2 text-center md:text-left">
          <p>© {new Date().getFullYear()} Motun's Unisex. All rights reserved.</p>
          <span className="hidden md:inline">|</span>
          <p>Proudly designed by TUTORSEM'S world</p>
        </div>
      </div>
    </footer>
  );
};
