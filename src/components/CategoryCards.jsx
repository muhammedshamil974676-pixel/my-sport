import React from 'react';
import { useShop } from '../context/ShopContext';
import './CategoryCards.css';

const CATEGORY_ITEMS = [
  {
    id: 'shoes',
    title: 'Football Shoes',
    subtitle: 'Firm ground, turf & sprint boots',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    itemCount: '4 Models'
  },
  {
    id: 'socks',
    title: 'Football Socks',
    subtitle: 'Anti-slip grip socks & match-day sleeves',
    image: 'https://images.unsplash.com/photo-1582965372486-66ff05e6b7d3?w=800&auto=format&fit=crop&q=80',
    itemCount: '4 Models'
  },
  {
    id: 'shinpads',
    title: 'Shin Pads',
    subtitle: 'Carbon fiber shields & lightweight slip-ins',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80',
    itemCount: '4 Models'
  }
];

export default function CategoryCards() {
  const { navigateTo } = useShop();

  return (
    <section className="category-section">
      <div className="container">
        <div className="section-head">
          <span className="section-subtitle">OUR CATEGORIES</span>
          <h2 className="section-title">Shop by Equipment</h2>
        </div>

        <div className="category-grid">
          {CATEGORY_ITEMS.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => navigateTo('shop', { category: cat.id })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigateTo('shop', { category: cat.id });
              }}
            >
              <div className="category-image-container">
                <img src={cat.image} alt={cat.title} className="category-img" loading="lazy" />
                <div className="category-overlay"></div>
              </div>
              <div className="category-info">
                <span className="category-count">{cat.itemCount}</span>
                <h3 className="category-name">{cat.title}</h3>
                <p className="category-desc">{cat.subtitle}</p>
                <span className="category-link">
                  <span>Explore Collection</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
