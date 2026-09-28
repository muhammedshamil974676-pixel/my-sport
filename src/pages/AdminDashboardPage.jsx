import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminDashboardPage({
  user,
  onLogout,
  onViewOrder,
  onOpenProducts
}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    setError('');

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load orders:', error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      console.error('Failed to update order:', error);
      alert(`Failed to update order: ${error.message}`);
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
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
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: '#123c2a',
                fontSize: '28px'
              }}
            >
              MY SPORT Admin Dashboard
            </h1>

            <p
              style={{
                margin: '8px 0 0',
                color: '#666'
              }}
            >
              Logged in as: {user?.email}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >

            {/* Product Management */}
            <button
              type="button"
              onClick={onOpenProducts}
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
              Product Management
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={onLogout}
              style={{
                padding: '10px 18px',
                border: '1px solid #d5d9d7',
                borderRadius: '8px',
                background: '#ffffff',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Logout
            </button>

          </div>
        </div>

        {/* Orders */}
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
              Orders
            </h2>

            <button
              type="button"
              onClick={loadOrders}
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

          {/* Loading */}
          {loading && (
            <p style={{ color: '#666' }}>
              Loading orders...
            </p>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                padding: '14px',
                background: '#fff0f0',
                color: '#b42318',
                borderRadius: '8px'
              }}
            >
              {error}
            </div>
          )}

          {/* No Orders */}
          {!loading && !error && orders.length === 0 && (
            <p style={{ color: '#666' }}>
              No orders found.
            </p>
          )}

          {/* Orders Table */}
          {!loading && !error && orders.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  minWidth: '950px'
                }}
              >

                <thead>
                  <tr
                    style={{
                      borderBottom: '2px solid #e5e7e6',
                      textAlign: 'left'
                    }}
                  >
                    <th style={{ padding: '12px' }}>
                      Order
                    </th>

                    <th style={{ padding: '12px' }}>
                      Customer
                    </th>

                    <th style={{ padding: '12px' }}>
                      Total
                    </th>

                    <th style={{ padding: '12px' }}>
                      Date
                    </th>

                    <th style={{ padding: '12px' }}>
                      Status
                    </th>

                    <th style={{ padding: '12px' }}>
                      Details
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom: '1px solid #eeeeee'
                      }}
                    >

                      {/* Order Number */}
                      <td style={{ padding: '12px' }}>
                        <strong>
                          {order.order_number}
                        </strong>
                      </td>

                      {/* Customer */}
                      <td style={{ padding: '12px' }}>
                        <div>
                          <strong>
                            {order.customer_name}
                          </strong>
                        </div>

                        <div
                          style={{
                            fontSize: '13px',
                            color: '#777',
                            marginTop: '4px'
                          }}
                        >
                          {order.email}
                        </div>
                      </td>

                      {/* Total */}
                      <td style={{ padding: '12px' }}>
                        ₹{Number(order.total).toFixed(2)}
                      </td>

                      {/* Date */}
                      <td style={{ padding: '12px' }}>
                        {new Date(
                          order.created_at
                        ).toLocaleDateString('en-IN')}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px' }}>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value
                            )
                          }
                          style={{
                            padding: '8px 10px',
                            borderRadius: '6px',
                            border: '1px solid #d5d9d7',
                            background: '#ffffff'
                          }}
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Confirmed">
                            Confirmed
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>
                        </select>
                      </td>

                      {/* Details */}
                      <td style={{ padding: '12px' }}>
                        <button
                          type="button"
                          onClick={() =>
                            onViewOrder?.(order)
                          }
                          style={{
                            padding: '8px 14px',
                            border: 'none',
                            borderRadius: '7px',
                            background: '#123c2a',
                            color: '#ffffff',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          View Details
                        </button>
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