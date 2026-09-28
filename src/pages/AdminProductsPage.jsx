import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const emptyForm = {
  name: '',
  category: 'shoes',
  price: '',
  description: '',
  image: '',
  stock: '',
  sizes: '',
  colors: '',
  isFeatured: false
};

export default function AdminProductsPage({ onBack }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    setError('');

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Failed to load products:', error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!form.name.trim()) {
      setError('Product name is required.');
      return;
    }

    if (!form.price || Number(form.price) < 0) {
      setError('Please enter a valid price.');
      return;
    }

    if (!form.image.trim()) {
      setError('Product image URL is required.');
      return;
    }

    setSaving(true);

    const sizesArray = form.sizes
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const colorsArray = form.colors
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const productData = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      description: form.description.trim(),
      image: form.image.trim(),
      stock: Number(form.stock) || 0,
      category_name:
        form.category === 'shoes'
          ? 'Football Shoes'
          : form.category === 'socks'
          ? 'Socks'
          : 'Shin Pads',
      is_featured: form.isFeatured,
      additional_images: JSON.stringify([]),
      sizes: JSON.stringify(sizesArray),
      colors: JSON.stringify(colorsArray)
    };

    let result;

    if (editingId) {
      result = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingId);
    } else {
      result = await supabase
        .from('products')
        .insert([productData]);
    }

    if (result.error) {
      console.error('Failed to save product:', result.error);
      setError(result.error.message);
      setSaving(false);
      return;
    }

    resetForm();
    await loadProducts();

    setSaving(false);
  };

  const handleEdit = (product) => {
    let sizes = [];
    let colors = [];

    try {
      sizes = JSON.parse(product.sizes || '[]');
    } catch {
      sizes = [];
    }

    try {
      colors = JSON.parse(product.colors || '[]');
    } catch {
      colors = [];
    }

    setEditingId(product.id);

    setForm({
      name: product.name || '',
      category: product.category || 'shoes',
      price: product.price ?? '',
      description: product.description || '',
      image: product.image || '',
      stock: product.stock ?? '',
      sizes: sizes.join(', '),
      colors: colors.join(', '),
      isFeatured: Boolean(product.is_featured)
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Failed to delete product:', error);
      setError(error.message);
      return;
    }

    if (editingId === productId) {
      resetForm();
    }

    await loadProducts();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f7f6',
        padding: '32px 20px'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '15px',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: '#123c2a'
              }}
            >
              Product Management
            </h1>

            <p
              style={{
                margin: '8px 0 0',
                color: '#666'
              }}
            >
              Add, edit and manage MY SPORT products.
            </p>
          </div>

          <button
            type="button"
            onClick={onBack}
            style={{
              padding: '10px 18px',
              border: 'none',
              borderRadius: '8px',
              background: '#123c2a',
              color: '#ffffff',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              marginBottom: '20px',
              padding: '14px',
              borderRadius: '8px',
              background: '#fff0f0',
              color: '#b42318'
            }}
          >
            {error}
          </div>
        )}

        {/* Product Form */}
        <div
          style={{
            background: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px'
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: '#123c2a'
            }}
          >
            {editingId ? 'Edit Product' : 'Add Product'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '18px'
              }}
            >
              <div>
                <label>Product Name</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Product name"
                  style={inputStyle}
                />
              </div>

              <div>
                <label>Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="shoes">Football Shoes</option>
                  <option value="socks">Socks</option>
                  <option value="shinpads">Shin Pads</option>
                </select>
              </div>

              <div>
                <label>Price</label>

                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                  style={inputStyle}
                />
              </div>

              <div>
                <label>Stock</label>

                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Stock quantity"
                  style={inputStyle}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label>Image URL</label>

                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  style={inputStyle}
                />
              </div>

              <div>
                <label>Sizes</label>

                <input
                  name="sizes"
                  value={form.sizes}
                  onChange={handleChange}
                  placeholder="S, M, L, XL"
                  style={inputStyle}
                />

                <small style={helpStyle}>
                  Separate sizes with commas.
                </small>
              </div>

              <div>
                <label>Colors</label>

                <input
                  name="colors"
                  value={form.colors}
                  onChange={handleChange}
                  placeholder="Black, White"
                  style={inputStyle}
                />

                <small style={helpStyle}>
                  Separate colors with commas.
                </small>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label>Description</label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Product description"
                  rows="4"
                  style={{
                    ...inputStyle,
                    resize: 'vertical'
                  }}
                />
              </div>

              <div
                style={{
                  gridColumn: '1 / -1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <input
                  id="featured-product"
                  name="isFeatured"
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={handleChange}
                />

                <label htmlFor="featured-product">
                  Featured Product
                </label>
              </div>
            </div>

            <div
              style={{
                marginTop: '22px',
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap'
              }}
            >
              <button
                type="submit"
                disabled={saving}
                style={{
                  padding: '11px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#123c2a',
                  color: '#ffffff',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  opacity: saving ? 0.7 : 1
                }}
              >
                {saving
                  ? 'Saving...'
                  : editingId
                  ? 'Update Product'
                  : 'Add Product'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: '11px 20px',
                    border: '1px solid #d5d9d7',
                    borderRadius: '8px',
                    background: '#ffffff',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product List */}
        <div
          style={{
            background: '#ffffff',
            padding: '24px',
            borderRadius: '12px'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}
          >
            <h2
              style={{
                margin: 0,
                color: '#123c2a'
              }}
            >
              Products ({products.length})
            </h2>

            <button
              type="button"
              onClick={loadProducts}
              style={{
                padding: '9px 16px',
                border: 'none',
                borderRadius: '8px',
                background: '#123c2a',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={{ color: '#666' }}>
              Loading products...
            </p>
          ) : products.length === 0 ? (
            <p style={{ color: '#666' }}>
              No products found.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  minWidth: '850px'
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: '2px solid #e5e7e6',
                      textAlign: 'left'
                    }}
                  >
                    <th style={{ padding: '12px' }}>Product</th>
                    <th style={{ padding: '12px' }}>Category</th>
                    <th style={{ padding: '12px' }}>Price</th>
                    <th style={{ padding: '12px' }}>Stock</th>
                    <th style={{ padding: '12px' }}>Featured</th>
                    <th style={{ padding: '12px' }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: '1px solid #eeeeee'
                      }}
                    >
                      <td style={{ padding: '12px' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              width: '55px',
                              height: '55px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '1px solid #eeeeee'
                            }}
                          />

                          <strong>{product.name}</strong>
                        </div>
                      </td>

                      <td style={{ padding: '12px' }}>
                        {product.category_name}
                      </td>

                      <td style={{ padding: '12px' }}>
                        ₹{Number(product.price).toFixed(2)}
                      </td>

                      <td style={{ padding: '12px' }}>
                        {product.stock}
                      </td>

                      <td style={{ padding: '12px' }}>
                        {product.is_featured ? 'Yes' : 'No'}
                      </td>

                      <td style={{ padding: '12px' }}>
                        <div
                          style={{
                            display: 'flex',
                            gap: '8px'
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleEdit(product)}
                            style={{
                              padding: '7px 12px',
                              border: 'none',
                              borderRadius: '6px',
                              background: '#123c2a',
                              color: '#ffffff',
                              cursor: 'pointer'
                            }}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(product.id)
                            }
                            style={{
                              padding: '7px 12px',
                              border: 'none',
                              borderRadius: '6px',
                              background: '#b42318',
                              color: '#ffffff',
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  marginTop: '7px',
  padding: '11px 12px',
  border: '1px solid #d5d9d7',
  borderRadius: '7px',
  fontSize: '14px',
  background: '#ffffff'
};

const helpStyle = {
  display: 'block',
  marginTop: '5px',
  color: '#777',
  fontSize: '12px'
};