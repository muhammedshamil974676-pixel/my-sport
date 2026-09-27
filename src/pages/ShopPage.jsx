import React, { useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import './ShopPage.css';

export default function ShopPage() {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  } = useShop();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1. Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 2. Search by product name
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    // 3. Price sorting (Low to High / High to Low)
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="shop-page">
      <div className="container">
        {/* Page Header */}
        <div className="shop-header">
          <span className="shop-subtitle">FOOTBALL GEAR CATALOG</span>
          <h1 className="shop-title">Shop All Gear</h1>
          <p className="shop-desc">
            Explore our curated selection of football shoes, high-grip socks, and lightweight shin guards.
          </p>
        </div>

        {/* Filters and Controls Bar */}
        <div className="shop-controls-bar">
          {/* Category Filter */}
          <div className="category-filter-group">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="search-sort-group">
            {/* Search by Product Name */}
            <div className="search-input-wrapper">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search by product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Price Sorting: Low to High / High to Low */}
            <div className="sort-wrapper">
              <label htmlFor="price-sort" className="sort-label">Sort by Price:</label>
              <select
                id="price-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="results-status">
          <span className="results-count">
            Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
          {(searchQuery || selectedCategory !== 'all' || sortBy !== 'featured') && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSortBy('featured');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="shop-product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products-box">
            <div className="empty-icon">⚽</div>
            <h3>No football products found</h3>
            <p>Try searching for another product name or reset your category filters.</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSortBy('featured');
              }}
            >
              Show All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
