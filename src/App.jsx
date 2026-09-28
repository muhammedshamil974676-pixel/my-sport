import React, { useEffect, useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { supabase } from './lib/supabase';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminOrderDetailsPage from './pages/AdminOrderDetailsPage';
import AdminProductsPage from './pages/AdminProductsPage';

import './App.css';

function MainLayout() {
  const {
    currentView,
    checkoutNotification,
    navigateTo
  } = useShop();

  const [adminUser, setAdminUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAdminSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data?.session?.user) {
        setAdminUser(data.session.user);
      }

      setCheckingAuth(false);
    };

    checkAdminSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAdminLogin = (user) => {
    setAdminUser(user);
    navigateTo('admin-dashboard');
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();

    setAdminUser(null);
    setSelectedOrder(null);

    navigateTo('home');
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    navigateTo('admin-order-details');
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
    navigateTo('admin-dashboard');
  };

  const handleOpenProducts = () => {
    navigateTo('admin-products');
  };

  const handleBackToDashboard = () => {
    navigateTo('admin-dashboard');
  };

  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="app-layout">

      {/* Customer Navbar */}
      {currentView !== 'admin-login' &&
        currentView !== 'admin-dashboard' &&
        currentView !== 'admin-order-details' &&
        currentView !== 'admin-products' && (
          <Navbar />
        )}

      <main className="main-content">

        {/* Customer Pages */}
        {currentView === 'home' && <HomePage />}

        {currentView === 'shop' && <ShopPage />}

        {currentView === 'product' && <ProductDetailsPage />}

        {currentView === 'cart' && <CartPage />}

        {currentView === 'checkout' && <CheckoutPage />}


        {/* Admin Login */}
        {currentView === 'admin-login' && (
          <AdminLoginPage
            onLogin={handleAdminLogin}
          />
        )}


        {/* Admin Dashboard */}
        {currentView === 'admin-dashboard' && adminUser && (
          <AdminDashboardPage
            user={adminUser}
            onLogout={handleAdminLogout}
            onViewOrder={handleViewOrder}
            onOpenProducts={handleOpenProducts}
          />
        )}


        {/* Admin Dashboard - Not Logged In */}
        {currentView === 'admin-dashboard' && !adminUser && (
          <AdminLoginPage
            onLogin={handleAdminLogin}
          />
        )}


        {/* Order Details */}
        {currentView === 'admin-order-details' && adminUser && (
          <AdminOrderDetailsPage
            order={selectedOrder}
            onBack={handleBackToOrders}
          />
        )}


        {/* Order Details - Not Logged In */}
        {currentView === 'admin-order-details' && !adminUser && (
          <AdminLoginPage
            onLogin={handleAdminLogin}
          />
        )}


        {/* Product Management */}
        {currentView === 'admin-products' && adminUser && (
          <AdminProductsPage
            onBack={handleBackToDashboard}
          />
        )}


        {/* Product Management - Not Logged In */}
        {currentView === 'admin-products' && !adminUser && (
          <AdminLoginPage
            onLogin={handleAdminLogin}
          />
        )}

      </main>

      {/* Customer Footer */}
      {currentView !== 'admin-login' &&
        currentView !== 'admin-dashboard' &&
        currentView !== 'admin-order-details' &&
        currentView !== 'admin-products' && (
          <Footer />
        )}

      {/* Checkout Notification */}
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