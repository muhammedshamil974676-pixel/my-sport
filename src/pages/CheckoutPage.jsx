import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { supabase } from '../lib/supabase';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { cart, subtotal, total, clearCart, navigateTo } = useShop();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }

    if (orderError) {
      setOrderError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const cleanedPhone = formData.phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!phoneRegex.test(cleanedPhone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required.';
    }

    const pinRegex = /^\d{6}$/;

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN Code is required.';
    } else if (!pinRegex.test(formData.pincode.trim())) {
      newErrors.pincode = 'PIN Code must be exactly 6 digits.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Place order and save it to Supabase
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      return;
    }

    setIsPlacingOrder(true);
    setOrderError('');

    // Generate order number
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `MS-${randomNum}`;

    // Prepare items for database
    const orderItems = cart.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      image: item.image
    }));

    // Save order to Supabase
    // We intentionally do NOT use .select()
    // because customers only need INSERT permission.
    const { error } = await supabase
      .from('orders')
      .insert([
        {
          order_number: orderNumber,
          customer_name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pin: formData.pincode.trim(),
          items: orderItems,
          subtotal: subtotal,
          total: total,
          status: 'Pending'
        }
      ]);

    if (error) {
      console.error('Failed to save order:', error);

      setOrderError(
        'Unable to place your order right now. Please try again.'
      );

      setIsPlacingOrder(false);
      return;
    }

    // Create order snapshot for success screen
    const orderDetails = {
      orderNumber: orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      customer: { ...formData },
      items: [...cart],
      subtotal,
      total
    };

    setPlacedOrder(orderDetails);

    // Clear cart after successful database save
    clearCart();

    setIsPlacingOrder(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SUCCESS SCREEN
  if (placedOrder) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success-card">
            <div className="success-icon-badge">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <span className="success-tag">
              THANK YOU FOR YOUR ORDER
            </span>

            <h1 className="success-title">
              Order Placed Successfully!
            </h1>

            <p className="success-lead">
              Your football gear is confirmed and will be prepared for dispatch.
            </p>

            <div className="order-number-banner">
              <span className="order-label">Order Number</span>

              <strong className="order-code">
                #{placedOrder.orderNumber}
              </strong>

              <span className="order-date">
                Placed on {placedOrder.date}
              </span>
            </div>

            <div className="order-breakdown-grid">
              <div className="breakdown-card">
                <h3 className="breakdown-heading">
                  Shipping Details
                </h3>

                <div className="customer-info-box">
                  <p className="info-name">
                    {placedOrder.customer.fullName}
                  </p>

                  <p className="info-text">
                    {placedOrder.customer.address}
                  </p>

                  <p className="info-text">
                    {placedOrder.customer.city},{' '}
                    {placedOrder.customer.state} -{' '}
                    {placedOrder.customer.pincode}
                  </p>

                  <p className="info-contact">
                    📞 {placedOrder.customer.phone}
                  </p>

                  <p className="info-contact">
                    ✉️ {placedOrder.customer.email}
                  </p>
                </div>
              </div>

              <div className="breakdown-card">
                <h3 className="breakdown-heading">
                  Items Ordered
                </h3>

                <div className="ordered-items-list">
                  {placedOrder.items.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="ordered-item-row"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="ordered-item-thumb"
                      />

                      <div className="ordered-item-info">
                        <span className="ordered-item-name">
                          {item.name}
                        </span>

                        <span className="ordered-item-variant">
                          Size: {item.selectedSize} • Color:{' '}
                          {item.selectedColor}
                        </span>

                        <span className="ordered-item-qty">
                          Qty: {item.quantity}
                        </span>
                      </div>

                      <span className="ordered-item-price">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-final-totals">
                  <div className="final-row">
                    <span>Subtotal</span>

                    <span>
                      ${placedOrder.subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="final-row">
                    <span>Shipping</span>

                    <span className="free-text">
                      FREE
                    </span>
                  </div>

                  <div className="final-row total-highlight">
                    <span>Total Paid</span>

                    <span>
                      ${placedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="success-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg continue-btn"
                onClick={() => navigateTo('shop')}
              >
                <span>Continue Shopping</span>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                  ></line>

                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART
  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-checkout-card">
            <div className="empty-icon">⚽</div>

            <h2>Your Cart is Empty</h2>

            <p>
              Please add products to your cart before proceeding
              to checkout.
            </p>

            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => navigateTo('shop')}
            >
              Explore Football Gear
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM
  return (
    <div className="checkout-page">
      <div className="container">

        <nav className="checkout-nav">
          <button
            type="button"
            className="back-to-cart-btn"
            onClick={() => navigateTo('cart')}
          >
            ← Back to Cart
          </button>

          <span className="nav-separator">/</span>

          <span className="nav-current">
            Checkout
          </span>
        </nav>

        <div className="checkout-header">
          <span className="checkout-subtitle">
            SECURE ORDER
          </span>

          <h1 className="checkout-title">
            Checkout
          </h1>
        </div>

        {orderError && (
          <div
            className="error-message"
            style={{
              marginBottom: '20px',
              padding: '12px'
            }}
          >
            {orderError}
          </div>
        )}

        <div className="checkout-grid">

          <div className="customer-form-section">
            <div className="form-card">

              <div className="form-card-header">
                <span className="step-indicator">1</span>

                <div>
                  <h2 className="card-title">
                    Customer & Delivery Information
                  </h2>

                  <p className="card-subtitle">
                    Enter your contact and shipping destination details.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handlePlaceOrder}
                noValidate
                className="checkout-form"
              >

                {/* FULL NAME */}
                <div className="form-group">
                  <label
                    htmlFor="fullName"
                    className="form-label"
                  >
                    Full Name <span className="req">*</span>
                  </label>

                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.fullName ? 'input-error' : ''
                    }`}
                  />

                  {errors.fullName && (
                    <span className="error-message">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* EMAIL + PHONE */}
                <div className="form-row">

                  <div className="form-group">
                    <label
                      htmlFor="email"
                      className="form-label"
                    >
                      Email Address{' '}
                      <span className="req">*</span>
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${
                        errors.email ? 'input-error' : ''
                      }`}
                    />

                    {errors.email && (
                      <span className="error-message">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="phone"
                      className="form-label"
                    >
                      Phone Number{' '}
                      <span className="req">*</span>
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-input ${
                        errors.phone ? 'input-error' : ''
                      }`}
                    />

                    {errors.phone && (
                      <span className="error-message">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                </div>

                {/* ADDRESS */}
                <div className="form-group">
                  <label
                    htmlFor="address"
                    className="form-label"
                  >
                    Street Address{' '}
                    <span className="req">*</span>
                  </label>

                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="House/Flat number, building, street, area"
                    value={formData.address}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.address ? 'input-error' : ''
                    }`}
                  />

                  {errors.address && (
                    <span className="error-message">
                      {errors.address}
                    </span>
                  )}
                </div>

                {/* CITY + STATE + PIN */}
                <div className="form-row-three">

                  <div className="form-group">
                    <label
                      htmlFor="city"
                      className="form-label"
                    >
                      City <span className="req">*</span>
                    </label>

                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className={`form-input ${
                        errors.city ? 'input-error' : ''
                      }`}
                    />

                    {errors.city && (
                      <span className="error-message">
                        {errors.city}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="state"
                      className="form-label"
                    >
                      State <span className="req">*</span>
                    </label>

                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className={`form-input ${
                        errors.state ? 'input-error' : ''
                      }`}
                    />

                    {errors.state && (
                      <span className="error-message">
                        {errors.state}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="pincode"
                      className="form-label"
                    >
                      PIN Code (6 Digits){' '}
                      <span className="req">*</span>
                    </label>

                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      maxLength={6}
                      placeholder="e.g. 560001"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`form-input ${
                        errors.pincode ? 'input-error' : ''
                      }`}
                    />

                    {errors.pincode && (
                      <span className="error-message">
                        {errors.pincode}
                      </span>
                    )}
                  </div>

                </div>

                {/* PLACE ORDER BUTTON */}
                <div className="form-submit-row">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg place-order-btn"
                    disabled={isPlacingOrder}
                  >
                    <span>
                      {isPlacingOrder
                        ? 'Placing Order...'
                        : 'Place Order'}
                    </span>

                    {!isPlacingOrder && (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <line
                          x1="5"
                          y1="12"
                          x2="19"
                          y2="12"
                        ></line>

                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="checkout-summary-section">
            <div className="summary-card">

              <h2 className="summary-title">
                Order Summary ({cart.length}{' '}
                {cart.length === 1 ? 'item' : 'items'})
              </h2>

              <div className="summary-items-list">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="summary-item-card"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="summary-thumb"
                    />

                    <div className="summary-item-details">

                      <h4 className="summary-item-name">
                        {item.name}
                      </h4>

                      <div className="summary-item-variants">
                        <span>
                          Size:{' '}
                          <strong>
                            {item.selectedSize}
                          </strong>
                        </span>

                        <span>
                          Color:{' '}
                          <strong>
                            {item.selectedColor}
                          </strong>
                        </span>
                      </div>

                      <div className="summary-item-qty-price">
                        <span className="qty-tag">
                          Qty: {item.quantity}
                        </span>

                        <span className="unit-price">
                          ₹{item.price.toFixed(2)} each
                        </span>
                      </div>

                    </div>

                    <span className="summary-line-total">
                      ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-calc-box">

                <div className="calc-row">
                  <span>Subtotal</span>

                  <span className="calc-val">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="calc-row">
                  <span>Delivery</span>

                  <span className="calc-val free-val">
                    FREE
                  </span>
                </div>

                <div className="calc-divider"></div>

                <div className="calc-row total-highlight">
                  <span className="total-title">
                    Total
                  </span>

                  <span className="total-val">
                    ${total.toFixed(2)}
                  </span>
                </div>

              </div>

              <div className="checkout-guarantee">
                <span className="guarantee-icon">
                  🛡️
                </span>

                <span>
                  Official MY SPORT Direct Delivery •
                  Pitch Ready
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}