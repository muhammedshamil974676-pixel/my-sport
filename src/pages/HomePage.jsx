import React from 'react';
import Hero from '../components/Hero';
import CategoryCards from '../components/CategoryCards';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import './HomePage.css';

export default function HomePage() {
  const { products, navigateTo } = useShop();

  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Three Simple Category Cards */}
      <CategoryCards />

      {/* 3. Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <div>
              <span className="featured-subtitle">TOP PICKS</span>
              <h2 className="featured-title">Featured Football Gear</h2>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigateTo('shop', { category: 'all' })}
            >
              <span>View All</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
