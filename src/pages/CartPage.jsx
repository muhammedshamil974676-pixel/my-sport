import React from 'react';
import { useShop } from '../context/ShopContext';
import './CartPage.css';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    total,
    navigateTo
  } = useShop();

  const onCheckoutClick = () => {
    navigateTo('checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart-card">
            <div className="empty-cart-icon">🛒</div>
            <h1 className="empty-cart-title">Your Cart is Empty</h1>
            <p className="empty-cart-desc">
              You don't have any football boots, grip socks, or shin pads in your cart yet.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => navigateTo('shop')}
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <span className="cart-subtitle">ORDER REVIEW</span>
          <h1 className="cart-title">Shopping Cart</h1>
        </div>

        <div className="cart-grid">
          {/* Left Column: Cart Items List */}
          <div className="cart-items-container">
            <div className="cart-items-header">
              <span>Item Details</span>
              <span className="header-center">Quantity</span>
              <span className="header-right">Total</span>
            </div>

            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.cartItemId} className="cart-item-row">
                  {/* Product Thumbnail & Details */}
                  <div className="item-main">
                    <img src={item.image} alt={item.name} className="item-thumbnail" />
                    <div className="item-meta">
                      <span className="item-category">{item.categoryName}</span>
                      <h3
                        className="item-name"
                        onClick={() => navigateTo('product', { product: item })}
                        title="Click to view product details"
                      >
                        {item.name}
                      </h3>
                      <div className="item-variants">
                        {item.selectedSize && <span>Size: <strong>{item.selectedSize}</strong></span>}
                        {item.selectedColor && <span>Color: <strong>{item.selectedColor}</strong></span>}
                      </div>
                      <span className="item-unit-price">${item.price.toFixed(2)} each</span>
                    </div>
                  </div>

                  {/* Quantity Controls & Line Total Wrapper */}
                  <div className="item-controls-wrapper">
                    {/* Quantity Controls */}
                    <div className="item-quantity-cell">
                      <div className="cart-qty-ctrl">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="cart-qty-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.cartItemId)}
                      >
                        Remove
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="item-total-cell">
                      <span className="line-total-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigateTo('shop')}
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-card">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-val">${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Estimated Shipping</span>
              <span className="summary-val free-shipping">FREE</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span className="total-label">Total</span>
              <span className="total-val">${total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-lg checkout-btn"
              onClick={onCheckoutClick}
            >
              <span>Proceed to Checkout</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <div className="security-notice">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Official MY SPORT Football Store</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
