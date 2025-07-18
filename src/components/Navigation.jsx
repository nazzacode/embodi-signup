import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="w-full py-6 flex justify-center">
      <div className="flex items-center space-x-4">
        {/* Logo Section */}
        <div className="bg-black/20 backdrop-blur-sm rounded shadow-xl border border-white/20 px-4 py-1.5 smooth-hover">
          <Link to="/" className="flex items-center space-x-1 text-gray-200 font-normal text-base hover:text-white transition-all duration-200">
            <img src="/assets/logo2_white.svg" alt="Embodi Logo" className="h-5 w-5" />
            <span>Embodi</span>
          </Link>
        </div>
        
        {/* Navigation Links */}
        <div className="bg-black/20 backdrop-blur-sm rounded shadow-xl border border-white/20 px-4 py-1.5 smooth-hover">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className={`text-gray-350 font-normal text-base hover:text-gray-200 hover:bg-white/20 transition-all duration-200 px-2 py-0.5 rounded ${
                location.pathname === '/' ? 'bg-white/10' : ''
              }`}
            >
              home
            </Link>
            <Link 
              to="/blog" 
              className={`text-gray-350 font-normal text-base hover:text-gray-200 hover:bg-white/20 transition-all duration-200 px-2 py-0.5 rounded ${
                location.pathname === '/blog' ? 'bg-white/10' : ''
              }`}
            >
              blog
            </Link>
            <Link 
              to="/contact" 
              className={`text-gray-350 font-normal text-base hover:text-gray-200 hover:bg-white/20 transition-all duration-200 px-2 py-0.5 rounded ${
                location.pathname === '/contact' ? 'bg-white/10' : ''
              }`}
            >
              contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;