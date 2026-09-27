import React from 'react';
import { useShop } from '../context/ShopContext';
import MySportLogo from '../assets/MySportLogo';
import './Footer.css';

export default function Footer() {
  const { navigateTo } = useShop();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Brand column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <MySportLogo height={36} />
          </div>
          <p className="footer-tagline">
            MY SPORT is a dedicated football equipment store providing athletes with match-grade boots, grip socks, and carbon shin guards.
          </p>
          <span className="footer-copyright">
            © {new Date().getFullYear()} MY SPORT. All rights reserved.
          </span>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-list">
            <li>
              <button type="button" className="footer-link-btn" onClick={() => navigateTo('home')}>
                Home
              </button>
            </li>
            <li>
              <button type="button" className="footer-link-btn" onClick={() => navigateTo('shop', { category: 'all' })}>
                All Products
              </button>
            </li>
            <li>
              <button type="button" className="footer-link-btn" onClick={() => navigateTo('cart')}>
                View Cart
              </button>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4 className="footer-heading">Football Gear</h4>
          <ul className="footer-list">
            <li>
              <button type="button" className="footer-link-btn" onClick={() => navigateTo('shop', { category: 'shoes' })}>
                Football Shoes
              </button>
            </li>
            <li>
              <button type="button" className="footer-link-btn" onClick={() => navigateTo('shop', { category: 'socks' })}>
                Football Socks
              </button>
            </li>
            <li>
              <button type="button" className="footer-link-btn" onClick={() => navigateTo('shop', { category: 'shinpads' })}>
                Shin Pads
              </button>
            </li>
          </ul>
        </div>

        {/* Commitment */}
        <div className="footer-col">
          <h4 className="footer-heading">Our Promise</h4>
          <p className="footer-text">
            Every product is tested on real grass and artificial turf for maximum traction, comfort, and protection.
          </p>
          <div className="footer-badge">
            <span className="badge-dot"></span>
            <span>100% Football Focused</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
