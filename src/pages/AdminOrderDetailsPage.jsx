import React from 'react';

export default function AdminOrderDetailsPage({ order, onBack }) {
  if (!order) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#f5f7f6',
          padding: '40px 20px'
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: '#ffffff',
            padding: '30px',
            borderRadius: '12px'
          }}
        >
          <h2 style={{ color: '#123c2a' }}>
            Order not found
          </h2>

          <button
            type="button"
            onClick={onBack}
            style={{
              padding: '10px 18px',
              border: 'none',
              borderRadius: '8px',
              background: '#123c2a',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const items = Array.isArray(order.items) ? order.items : [];

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
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '20px',
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
              Order Details
            </h1>

            <p
              style={{
                margin: '8px 0 0',
                color: '#666'
              }}
            >
              Order #{order.order_number}
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
            ← Back to Orders
          </button>
        </div>

        {/* Customer Information */}
        <div
          style={{
            background: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '20px'
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: '#123c2a'
            }}
          >
            Customer Information
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '18px'
            }}
          >
            <div>
              <strong>Name</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>
                {order.customer_name}
              </p>
            </div>

            <div>
              <strong>Email</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>
                {order.email}
              </p>
            </div>

            <div>
              <strong>Phone</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>
                {order.phone}
              </p>
            </div>

            <div>
              <strong>City</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>
                {order.city}
              </p>
            </div>

            <div>
              <strong>State</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>
                {order.state}
              </p>
            </div>

            <div>
              <strong>PIN Code</strong>
              <p style={{ margin: '6px 0', color: '#555' }}>
                {order.pin}
              </p>
            </div>
          </div>

          <div style={{ marginTop: '18px' }}>
            <strong>Address</strong>
            <p style={{ margin: '6px 0', color: '#555' }}>
              {order.address}
            </p>
          </div>
        </div>

        {/* Products */}
        <div
          style={{
            background: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '20px'
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: '#123c2a'
            }}
          >
            Products
          </h2>

          {items.length === 0 ? (
            <p style={{ color: '#666' }}>
              No product information available.
            </p>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {items.map((item, index) => (
                <div
                  key={item.id || index}
                  style={{
                    padding: '16px',
                    border: '1px solid #e5e7e6',
                    borderRadius: '10px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '15px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          color: '#123c2a'
                        }}
                      >
                        {item.name}
                      </h3>

                      <p
                        style={{
                          margin: '8px 0 0',
                          color: '#666'
                        }}
                      >
                        Quantity: {item.quantity || 1}
                      </p>

                      {item.selectedSize && (
                        <p
                          style={{
                            margin: '4px 0 0',
                            color: '#666'
                          }}
                        >
                          Size: {item.selectedSize}
                        </p>
                      )}

                      {item.selectedColor && (
                        <p
                          style={{
                            margin: '4px 0 0',
                            color: '#666'
                          }}
                        >
                          Color: {item.selectedColor}
                        </p>
                      )}
                    </div>

                    <strong>
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 1)
                      ).toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div
          style={{
            background: '#ffffff',
            padding: '24px',
            borderRadius: '12px'
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: '#123c2a'
            }}
          >
            Order Summary
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxWidth: '400px',
              marginLeft: 'auto'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>Subtotal</span>
              <strong>
                ₹{Number(order.subtotal || 0).toFixed(2)}
              </strong>
            </div>

            <div
              style={{
                borderTop: '1px solid #e5e7e6',
                paddingTop: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '18px'
              }}
            >
              <strong>Total</strong>
              <strong style={{ color: '#123c2a' }}>
                ₹{Number(order.total || 0).toFixed(2)}
              </strong>
            </div>

            <div
              style={{
                marginTop: '8px',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>Status</span>
              <strong>{order.status}</strong>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>Order Date</span>
              <span>
                {new Date(order.created_at).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}