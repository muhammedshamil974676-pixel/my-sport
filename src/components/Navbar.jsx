import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import MySportLogo from '../assets/MySportLogo';
import './Navbar.css';

export default function Navbar() {
  const { currentView, navigateTo, selectedCategory, totalCartCount } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view, category = null) => {
    setMobileMenuOpen(false);
    if (category) {
      navigateTo('shop', { category });
    } else {
      navigateTo(view);
    }
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <button
          type="button"
          className="navbar-brand-btn"
          onClick={() => handleNavClick('home')}
          aria-label="MY SPORT Home"
        >
          <MySportLogo height={38} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <button
            type="button"
            className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-btn ${currentView === 'shop' && selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleNavClick('shop', 'all')}
          >
            Shop
          </button>
          <button
            type="button"
            className={`nav-btn ${currentView === 'shop' && selectedCategory === 'shoes' ? 'active' : ''}`}
            onClick={() => handleNavClick('shop', 'shoes')}
          >
            Football Shoes
          </button>
          <button
            type="button"
            className={`nav-btn ${currentView === 'shop' && selectedCategory === 'socks' ? 'active' : ''}`}
            onClick={() => handleNavClick('shop', 'socks')}
          >
            Socks
          </button>
          <button
            type="button"
            className={`nav-btn ${currentView === 'shop' && selectedCategory === 'shinpads' ? 'active' : ''}`}
            onClick={() => handleNavClick('shop', 'shinpads')}
          >
            Shin Pads
          </button>
        </nav>

        {/* Right Actions: Cart & Mobile toggle */}
        <div className="navbar-actions">
          <button
            type="button"
            className={`cart-btn ${currentView === 'cart' ? 'active' : ''}`}
            onClick={() => handleNavClick('cart')}
            aria-label={`View Cart, ${totalCartCount} items`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-text">Cart</span>
            <span className="cart-badge">{totalCartCount}</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="container mobile-nav-content">
            <button
              type="button"
              className={`mobile-nav-btn ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
            <button
              type="button"
              className={`mobile-nav-btn ${currentView === 'shop' && selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleNavClick('shop', 'all')}
            >
              Shop All
            </button>
            <button
              type="button"
              className={`mobile-nav-btn ${currentView === 'shop' && selectedCategory === 'shoes' ? 'active' : ''}`}
              onClick={() => handleNavClick('shop', 'shoes')}
            >
              Football Shoes
            </button>
            <button
              type="button"
              className={`mobile-nav-btn ${currentView === 'shop' && selectedCategory === 'socks' ? 'active' : ''}`}
              onClick={() => handleNavClick('shop', 'socks')}
            >
              Socks
            </button>
            <button
              type="button"
              className={`mobile-nav-btn ${currentView === 'shop' && selectedCategory === 'shinpads' ? 'active' : ''}`}
              onClick={() => handleNavClick('shop', 'shinpads')}
            >
              Shin Pads
            </button>
            <button
              type="button"
              className={`mobile-nav-btn ${currentView === 'cart' ? 'active' : ''}`}
              onClick={() => handleNavClick('cart')}
            >
              Cart ({totalCartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
