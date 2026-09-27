import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function MainLayout() {
  const { currentView, checkoutNotification } = useShop();

  return (
    <div className="app-layout">
      {/* 1. Header / Navbar */}
      <Navbar />

      {/* 2. Main Page Content */}
      <main className="main-content">
        {currentView === 'home' && <HomePage />}
        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product' && <ProductDetailsPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'checkout' && <CheckoutPage />}
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Notification Toast */}
      {checkoutNotification && (
        <div className="notification-banner">
          <span className="notif-icon">⚽</span>
          <span>{checkoutNotification}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
