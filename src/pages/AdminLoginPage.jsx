import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminLoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Admin login button clicked');

    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      console.log('Trying Supabase login...');

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      console.log('Supabase response:', data);

      if (error) {
        console.error('Supabase login error:', error);

        setError(error.message || 'Login failed.');
        setLoading(false);
        return;
      }

      if (data?.user) {
        console.log('Admin login successful:', data.user.email);

        onLogin?.(data.user);
      }

      setLoading(false);
    } catch (err) {
      console.error('Unexpected login error:', err);

      setError(
        err?.message || 'Something went wrong. Please try again.'
      );

      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: '#f5f7f6'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#ffffff',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}
        >
          <h1
            style={{
              margin: 0,
              color: '#123c2a',
              fontSize: '32px'
            }}
          >
            MY SPORT
          </h1>

          <p
            style={{
              marginTop: '8px',
              color: '#666'
            }}
          >
            Admin Login
          </p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="admin-email"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600'
              }}
            >
              Email
            </label>

            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              autoComplete="email"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '13px 14px',
                border: '1px solid #d5d9d7',
                borderRadius: '8px',
                fontSize: '15px'
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600'
              }}
            >
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              autoComplete="current-password"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '13px 14px',
                border: '1px solid #d5d9d7',
                borderRadius: '8px',
                fontSize: '15px'
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                marginBottom: '20px',
                padding: '12px',
                borderRadius: '8px',
                background: '#fff0f0',
                color: '#b42318',
                fontSize: '14px',
                lineHeight: '1.5'
              }}
            >
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: '8px',
              background: '#123c2a',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Signing in...' : 'Admin Login'}
          </button>
        </form>
      </div>
    </div>
  );
}