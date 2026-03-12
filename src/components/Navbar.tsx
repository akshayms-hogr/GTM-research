import React from 'react';
import { Layout, Box, ShoppingCart, TestTube2, BookOpen } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onNavigate: (page: 'home' | 'sandbox' | 'ecommerce' | 'docs') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="#" className="logo-group" onClick={() => onNavigate('home')}>
          <div className="logo-icon">
            <Layout size={20} className="text-white" />
          </div>
          <span>GTM<span className="logo-accent">Research</span></span>
        </a>
        
        <div className="nav-links">
          <a href="#" className="nav-link" onClick={() => onNavigate('home')}>
            <Box size={16} />
            Overview
          </a>
          <a href="#" className="nav-link" onClick={() => onNavigate('sandbox')}>
            <TestTube2 size={16} />
            Sandbox
          </a>
          <a href="#" className="nav-link" onClick={() => onNavigate('ecommerce')}>
            <ShoppingCart size={16} />
            E-commerce
          </a>
          <a href="#" className="nav-link" onClick={() => onNavigate('docs')}>
            <BookOpen size={16} />
            Docs
          </a>
        </div>

        <button className="nav-btn" onClick={() => onNavigate('sandbox')}>
          Get Started
        </button>
      </div>
    </nav>
  );
};
