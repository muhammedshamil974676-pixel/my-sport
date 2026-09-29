import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart, navigateTo } = useShop();
  const [added, setAdded] = useState(false);

  const handleCardClick = () => {
    navigateTo('product', { product });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const defaultSize = product.availableSizes ? product.availableSizes[0] : (product.sizes ? product.sizes[0] : null);
    const defaultColor = product.availableColors ? product.availableColors[0] : (product.colors ? product.colors[0] : null);
    addToCart(product, 1, defaultSize, defaultColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleViewProduct = (e) => {
    e.stopPropagation();
    navigateTo('product', { product });
  };

  return (
    <div
      className="product-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleCardClick();
      }}
    >
      {/* Product Image */}
      <div className="product-image-box">
        <img
          src={product.image}
          alt={product.name}
          className="product-thumb"
          loading="lazy"
        />
        <span className="product-cat-pill">{product.categoryName}</span>
      </div>

      {/* Product Body */}
      <div className="product-details">
        <span className="product-cat-label">{product.categoryName}</span>
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        <div className="product-price-row">
          <span className="product-price">₹{product.price.toFixed(2)}</span>
        </div>

        {/* Buttons: Add to Cart and View Product */}
        <div className="product-card-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm view-btn"
            onClick={handleViewProduct}
          >
            View Product
          </button>

          <button
            type="button"
            className={`btn btn-primary btn-sm add-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Added</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
