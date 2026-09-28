import React, { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORIES } from '../data/products';
import { supabase } from '../lib/supabase';

const ShopContext = createContext(null);

const CART_STORAGE_KEY = 'mysport_cart_items';

export function ShopProvider({ children }) {
  // Navigation: 'home' | 'shop' | 'product' | 'cart'
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Products from Supabase
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  // Brief notification message
  const [notification, setNotification] = useState(null);

  // Cart state persisted using localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);

      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load cart from storage', e);
    }

    return [];
  });

  // Load products from Supabase
  useEffect(() => {
    async function loadProducts() {
      setProductsLoading(true);
      setProductsError(null);

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Failed to load products:', error);
        setProductsError(error.message);
        setProductsLoading(false);
        return;
      }

      const mappedProducts = data.map((product) => ({
        ...product,

        // Convert Supabase field names to existing frontend field names
        categoryName: product.category_name,
        isFeatured: product.is_featured,

        // Convert JSON text back into arrays
        additionalImages: JSON.parse(
          product.additional_images || '[]'
        ),

        sizes: JSON.parse(
          product.sizes || '[]'
        ),

        availableSizes: JSON.parse(
          product.sizes || '[]'
        ),

        colors: JSON.parse(
          product.colors || '[]'
        ),

        availableColors: JSON.parse(
          product.colors || '[]'
        )
      }));

      setProducts(mappedProducts);
      setProductsLoading(false);
    }

    loadProducts();
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch (e) {
      console.warn('Failed to save cart to storage', e);
    }
  }, [cart]);

  // Navigate helper
  const navigateTo = (view, options = {}) => {
    if (options.product) {
      setSelectedProduct(options.product);
    }

    if (options.category !== undefined) {
      setSelectedCategory(options.category);
    }

    setCurrentView(view);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Add to cart
  const addToCart = (
    product,
    quantity = 1,
    size = null,
    color = null
  ) => {
    const chosenSize =
      size ||
      (product.availableSizes &&
        product.availableSizes[0]) ||
      (product.sizes && product.sizes[0]) ||
      'Standard';

    const chosenColor =
      color ||
      (product.availableColors &&
        product.availableColors[0]) ||
      (product.colors && product.colors[0]) ||
      'Standard';

    const cartItemId =
      `${product.id}-${chosenSize}-${chosenColor}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.cartItemId === cartItemId
      );

      if (existingIndex > -1) {
        const updated = [...prev];

        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity:
            updated[existingIndex].quantity + quantity
        };

        return updated;
      }

      return [
        ...prev,
        {
          ...product,
          cartItemId,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity
        }
      ];
    });

    triggerNotification(
      `Added ${quantity}x ${product.name} to Cart`
    );
  };

  // Update quantity
  const updateQuantity = (
    cartItemId,
    newQuantity
  ) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: newQuantity
            }
          : item
      )
    );
  };

  // Remove product from cart
  const removeFromCart = (cartItemId) => {
    setCart((prev) =>
      prev.filter(
        (item) => item.cartItemId !== cartItemId
      )
    );

    triggerNotification('Item removed from Cart');
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Trigger notification
  const triggerNotification = (msg) => {
    setNotification(msg);

    setTimeout(() => {
      setNotification((curr) =>
        curr === msg ? null : curr
      );
    }, 3200);
  };

  // Handle checkout button click
  const handleCheckout = () => {
    triggerNotification('Checkout coming soon.');
  };

  // Cart calculations
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const total = subtotal;

  const totalCartCount = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  return (
    <ShopContext.Provider
      value={{
        // Products
        products,
        productsLoading,
        productsError,

        // Categories
        categories: CATEGORIES,

        // Navigation
        currentView,
        navigateTo,
        selectedProduct,
        setSelectedProduct,
        selectedCategory,
        setSelectedCategory,

        // Search and sorting
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,

        // Cart
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,

        // Cart totals
        subtotal,
        total,
        totalCartCount,

        // Notifications
        notification,
        checkoutNotification: notification,
        handleCheckout,
        triggerNotification
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error(
      'useShop must be used within a ShopProvider'
    );
  }

  return context;
}