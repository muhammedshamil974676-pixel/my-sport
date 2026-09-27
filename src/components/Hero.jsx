import React from 'react';
import { useShop } from '../context/ShopContext';
import './Hero.css';

export default function Hero() {
  const { navigateTo } = useShop();

  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left: Content */}
        <div className="hero-content">
          <div className="hero-brand-tag">
            <span className="hero-brand-dot"></span>
            <span>FOOTBALL ESSENTIALS</span>
          </div>

          <h1 className="hero-title">
            ELEVATE YOUR <span className="highlight-text">FOOTBALL</span> GAME
          </h1>

          <p className="hero-description">
            Match-ready football boots, high-traction anti-slip grip socks, and carbon protective shin pads. Designed for players who demand precision and performance.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => navigateTo('shop')}
            >
              <span>Shop Now</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Highlights / trust points */}
          <div className="hero-features">
            <div className="hero-feature-item">
              <span className="feature-check">✓</span>
              <span>Tested on Pitch</span>
            </div>
            <div className="hero-feature-item">
              <span className="feature-check">✓</span>
              <span>Premium Durability</span>
            </div>
            <div className="hero-feature-item">
              <span className="feature-check">✓</span>
              <span>Fast Shipping</span>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1511886929837-354d827aae26?w=1000&auto=format&fit=crop&q=80"
              alt="Football player with cleats and ball on pitch"
              className="hero-image"
            />
            <div className="hero-badge-overlay">
              <span className="overlay-title">MY SPORT</span>
              <span className="overlay-subtitle">Boots • Socks • Shin Pads</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
