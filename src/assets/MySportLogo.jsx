import React from 'react';

export default function MySportLogo({ className = '', height = 40, showText = true, layout = 'horizontal' }) {
  if (layout === 'horizontal') {
    return (
      <div className={`mysport-brand-logo ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <svg
          height={height}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, borderRadius: '8px', background: '#0a0a0a', padding: '6px' }}
        >
          {/* Athlete head */}
          <circle cx="76" cy="24" r="6" fill="#15803d" />
          {/* Arched dynamic body */}
          <path d="M 40 40 C 55 26, 75 22, 90 38 C 78 33, 60 38, 48 48 Z" fill="#15803d" />
          {/* M glyph */}
          <path d="M 18 80 L 25 36 L 40 36 L 56 64 L 70 45 L 66 60 L 52 78 L 38 52 L 32 80 Z" fill="#15803d" />
          {/* S glyph */}
          <path d="M 58 80 L 102 80 C 110 80, 112 74, 108 67 C 104 60, 96 61, 86 61 L 78 61 C 70 61, 68 53, 74 49 C 80 44, 92 45, 102 48 L 105 38 C 92 34, 74 34, 63 43 C 54 51, 57 64, 67 68 C 76 71, 84 70, 97 70 C 102 70, 103 72, 101 74 C 98 75, 93 75, 84 75 L 56 75 Z" fill="#15803d" />
        </svg>

        {showText && (
          <span style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            fontSize: `${height * 0.52}px`,
            letterSpacing: '1px',
            lineHeight: 1,
            display: 'inline-flex',
            alignItems: 'center'
          }}>
            <span style={{ color: '#15803d', marginRight: '4px' }}>MY</span>
            <span style={{ color: '#0a0a0a' }}>SPORT</span>
          </span>
        )}
      </div>
    );
  }

  // Stacked layout (e.g. for hero or splash)
  return (
    <div className={`mysport-brand-logo stacked ${className}`} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <img
        src="/mysport-logo.svg"
        alt="MY SPORT"
        style={{ height: `${height}px`, width: 'auto', borderRadius: '12px' }}
      />
    </div>
  );
}
