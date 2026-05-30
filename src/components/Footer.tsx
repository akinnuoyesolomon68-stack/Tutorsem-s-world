import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-xl font-semibold tracking-tight text-gray-900 group">
            TUTORSEM's World<span className="text-amber-600 transition-colors">.</span>
          </Link>
          <p className="mt-4 text-gray-500 max-w-sm text-sm leading-relaxed">
            A premium portfolio and marketplace showcasing creative works and quality products. Building experiences through technology, design, and commerce.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link to="/about" className="hover:text-amber-600 transition-colors">About</Link></li>
            <li><Link to="/portfolio" className="hover:text-amber-600 transition-colors">Portfolio</Link></li>
            <li><Link to="/vision" className="hover:text-amber-600 transition-colors">Vision & Goals</Link></li>
            <li><Link to="/contact" className="hover:text-amber-600 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide uppercase">Categories</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link to="/marketplace" className="hover:text-amber-600 transition-colors">Accessories</Link></li>
            <li><Link to="/marketplace" className="hover:text-amber-600 transition-colors">Student Materials</Link></li>
            <li><Link to="/marketplace" className="hover:text-amber-600 transition-colors">Clothes & Shoes</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} TUTORSEM's World. All rights reserved.
        </p>
        <Link to="/admin" className="text-sm text-gray-400 hover:text-amber-600 mt-4 md:mt-0 transition-colors">
          Admin Access
        </Link>
      </div>
    </footer>
  );
};
