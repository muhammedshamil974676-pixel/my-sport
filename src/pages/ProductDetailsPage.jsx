import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import './ProductDetailsPage.css';

export default function ProductDetailsPage() {
  const { selectedProduct, addToCart, navigateTo, products } = useShop();

  // Fallback to first product if none selected
  const product = selectedProduct || products[0];

  const sizes = product.availableSizes || product.sizes || [];
  const colors = product.availableColors || product.colors || [];
  const images = product.additionalImages && product.additionalImages.length > 0
    ? product.additionalImages
    : [product.image];

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(sizes.length > 0 ? sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(colors.length > 0 ? colors[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Sync state whenever the viewed product changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(sizes.length > 0 ? sizes[0] : null);
    setSelectedColor(colors.length > 0 ? colors[0] : null);
    setQuantity(1);
    setAdded(false);
  }, [product.id]);

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQty = () => {
    const maxStock = product.stock || 99;
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="product-details-page">
      <div className="container">
        {/* Navigation Breadcrumb / Back Button */}
        <nav className="details-breadcrumb">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigateTo('shop', { category: product.category })}
          >
            ← Back to {product.categoryName || 'Shop'}
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Product Layout Grid */}
        <div className="product-details-grid">
          {/* Left Column: Image Gallery */}
          <div className="gallery-section">
            <div className="main-image-frame">
              <img
                src={activeImage}
                alt={product.name}
                className="main-product-img"
              />
            </div>

            {images.length > 1 && (
              <div className="thumbnail-row">
                {images.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`thumb-btn ${activeImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setActiveImage(imgUrl)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={imgUrl} alt={`${product.name} thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Information & Purchase Controls */}
          <div className="info-section">
            <div className="badge-row">
              <span className="category-tag">{product.categoryName}</span>
              <span className="stock-tag">
                In Stock ({product.stock || 10} available)
              </span>
            </div>

            <h1 className="details-title">{product.name}</h1>

            <div className="price-tag-row">
              <span className="details-price">₹{product.price.toFixed(2)}</span>
            </div>

            <p className="details-description">{product.description}</p>

            {/* Size Selection where applicable */}
            {sizes.length > 0 && (
              <div className="option-group">
                <div className="option-header">
                  <span className="option-label">Available Size:</span>
                  <span className="selected-value">{selectedSize}</span>
                </div>
                <div className="option-pills">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`option-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection where applicable */}
            {colors.length > 0 && (
              <div className="option-group">
                <div className="option-header">
                  <span className="option-label">Available Color:</span>
                  <span className="selected-value">{selectedColor}</span>
                </div>
                <div className="option-pills">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`option-btn ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart button */}
            <div className="action-row">
              <div className="qty-selector">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={handleDecreaseQty}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={handleIncreaseQty}
                  disabled={product.stock ? quantity >= product.stock : false}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`btn btn-primary btn-lg add-to-cart-cta ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            {/* Guarantees Box */}
            <div className="guarantees-card">
              <div className="guarantee-item">
                <span className="guarantee-icon">⚽</span>
                <div>
                  <strong>Official MY SPORT Gear</strong>
                  <p>Tournament and pitch approved specifications.</p>
                </div>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-icon">⚡</span>
                <div>
                  <strong>Fast Football Dispatch</strong>
                  <p>Dispatched directly from our football distribution center.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
