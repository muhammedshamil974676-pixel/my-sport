export const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'shoes', name: 'Football Shoes' },
  { id: 'socks', name: 'Football Socks' },
  { id: 'shinpads', name: 'Shin Pads' }
];

export const products = [
  // 1. FOOTBALL SHOES
  {
    id: 1,
    name: 'MY SPORT Apex Match Pro Cleats',
    category: 'shoes',
    categoryName: 'Football Shoes',
    price: 139.99,
    stock: 16,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Precision engineered for speed and surgical ball control on firm ground pitches. Crafted with a micro-textured synthetic upper, responsive sprint chassis, and ergonomic conical studs for razor-sharp direction changes.',
    availableSizes: ['UK 7', 'UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 11'],
    sizes: ['UK 7', 'UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 11'],
    availableColors: ['Dark Green / Stealth Black', 'Triple Black', 'White / Forest Green'],
    colors: ['Dark Green / Stealth Black', 'Triple Black', 'White / Forest Green']
  },
  {
    id: 2,
    name: 'MY SPORT Phantom Strike FG',
    category: 'shoes',
    categoryName: 'Football Shoes',
    price: 159.99,
    stock: 12,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Dominate every blade of grass with high-friction 3D strike elements. The anatomical fit hugs the foot while the lightweight split-sole plate delivers explosive acceleration off the mark.',
    availableSizes: ['UK 6.5', 'UK 7', 'UK 8', 'UK 8.5', 'UK 9', 'UK 10', 'UK 10.5'],
    sizes: ['UK 6.5', 'UK 7', 'UK 8', 'UK 8.5', 'UK 9', 'UK 10', 'UK 10.5'],
    availableColors: ['Pitch Black / Green Accent', 'Pure White / Green'],
    colors: ['Pitch Black / Green Accent', 'Pure White / Green']
  },
  {
    id: 3,
    name: 'MY SPORT TurfMaster Pro AG/TF',
    category: 'shoes',
    categoryName: 'Football Shoes',
    price: 99.99,
    stock: 20,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Engineered specifically for artificial turf and hard ground surfaces. Low-profile rubber multi-stud outsole paired with cushioned EVA midsole reduces joint impact during intense 90-minute battles.',
    availableSizes: ['UK 7', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 11'],
    sizes: ['UK 7', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 11'],
    availableColors: ['Dark Forest Green', 'Matte Black'],
    colors: ['Dark Forest Green', 'Matte Black']
  },
  {
    id: 4,
    name: 'MY SPORT Velocita Speed Boot',
    category: 'shoes',
    categoryName: 'Football Shoes',
    price: 179.99,
    stock: 8,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Weighing just 180 grams, the Velocita boot offers a second-skin monofilament collar with carbon-reinforced sole plate for wingers and strikers who thrive on pure raw pace.',
    availableSizes: ['UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10'],
    sizes: ['UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10'],
    availableColors: ['Emerald Green / Black', 'Stealth Night'],
    colors: ['Emerald Green / Black', 'Stealth Night']
  },

  // 2. FOOTBALL SOCKS
  {
    id: 5,
    name: 'MY SPORT Anti-Slip Pro Grip Socks',
    category: 'socks',
    categoryName: 'Football Socks',
    price: 18.99,
    stock: 45,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1582965372486-66ff05e6b7d3?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1582965372486-66ff05e6b7d3?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Equipped with silicone suction grip technology on the underfoot to lock your foot securely inside your boots. Eliminates slippage, blisters, and wasted energy during quick decelerations.',
    availableSizes: ['Small (UK 3-6)', 'Medium (UK 6.5-9)', 'Large (UK 9.5-12)'],
    sizes: ['Small (UK 3-6)', 'Medium (UK 6.5-9)', 'Large (UK 9.5-12)'],
    availableColors: ['Pitch Black / Green Grips', 'Classic White / Green Grips', 'Forest Green'],
    colors: ['Pitch Black / Green Grips', 'Classic White / Green Grips', 'Forest Green']
  },
  {
    id: 6,
    name: 'MY SPORT Match Day Over-Calf Socks',
    category: 'socks',
    categoryName: 'Football Socks',
    price: 14.99,
    stock: 35,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Traditional knee-high football socks with compression arch support and ribbed ankle stabilization. Breathable mesh ventilation along the calf keeps legs cool and dry.',
    availableSizes: ['Youth (UK 1-5)', 'Adult (UK 6-11)'],
    sizes: ['Youth (UK 1-5)', 'Adult (UK 6-11)'],
    availableColors: ['Dark Green', 'Solid Black', 'Pure White'],
    colors: ['Dark Green', 'Solid Black', 'Pure White']
  },
  {
    id: 7,
    name: 'MY SPORT Calf Sleeve & Grip Sock Combo',
    category: 'socks',
    categoryName: 'Football Socks',
    price: 24.99,
    stock: 28,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The modern pro player combination: high-elasticity graduated compression calf sleeve paired with anti-slip grip foot socks. Seamless transition for holding shin pads firmly in place.',
    availableSizes: ['Medium (UK 6-8.5)', 'Large (UK 9-12)'],
    sizes: ['Medium (UK 6-8.5)', 'Large (UK 9-12)'],
    availableColors: ['Black / Dark Green', 'White / Green'],
    colors: ['Black / Dark Green', 'White / Green']
  },
  {
    id: 8,
    name: 'MY SPORT Cushioned Football Training Socks (3-Pack)',
    category: 'socks',
    categoryName: 'Football Socks',
    price: 27.99,
    stock: 22,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1582965372486-66ff05e6b7d3?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1582965372486-66ff05e6b7d3?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Value pack of 3 heavy-duty training socks featuring double-density terry loops on the heel and toe box for extra impact absorption on artificial turf and hard grounds.',
    availableSizes: ['Medium (UK 6-9)', 'Large (UK 9-12)'],
    sizes: ['Medium (UK 6-9)', 'Large (UK 9-12)'],
    availableColors: ['Multi-Pack (1x Green, 1x Black, 1x White)'],
    colors: ['Multi-Pack (1x Green, 1x Black, 1x White)']
  },

  // 3. SHIN PADS
  {
    id: 9,
    name: 'MY SPORT CarbonGuard Pro Shin Pads',
    category: 'shinpads',
    categoryName: 'Shin Pads',
    price: 39.99,
    stock: 18,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Real 3K carbon fiber outer shield providing supreme impact dissipation with featherlight mass. Backed by EVA foam cushioning that molds to the contour of your tibia for zero distraction.',
    availableSizes: ['Small (Under 5\'3")', 'Medium (5\'3" - 5\'10")', 'Large (Over 5\'10")'],
    sizes: ['Small (Under 5\'3")', 'Medium (5\'3" - 5\'10")', 'Large (Over 5\'10")'],
    availableColors: ['Carbon Matte / Green Trim', 'Raw Carbon Black'],
    colors: ['Carbon Matte / Green Trim', 'Raw Carbon Black']
  },
  {
    id: 10,
    name: 'MY SPORT Slip-In Lite Shin Guards with Sleeves',
    category: 'shinpads',
    categoryName: 'Shin Pads',
    price: 22.99,
    stock: 30,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Streamlined low-profile polypropylene protective shell with anatomical left/right curvature. Includes breathable compressive mesh sleeves to secure the pads without clumsy straps.',
    availableSizes: ['XS (Youth)', 'Small', 'Medium', 'Large'],
    sizes: ['XS (Youth)', 'Small', 'Medium', 'Large'],
    availableColors: ['Dark Green / White Shield', 'Stealth Black'],
    colors: ['Dark Green / White Shield', 'Stealth Black']
  },
  {
    id: 11,
    name: 'MY SPORT Ankle Guard Total Protection Shin Pads',
    category: 'shinpads',
    categoryName: 'Shin Pads',
    price: 26.99,
    stock: 14,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Full coverage shin protection with integrated padded ankle discs and stirrup foot strap. Ideal for physical defenders and competitive youth leagues needing maximum impact defense.',
    availableSizes: ['Junior (4\'0" - 4\'8")', 'Small (4\'8" - 5\'3")', 'Medium (5\'3" - 5\'9")'],
    sizes: ['Junior (4\'0" - 4\'8")', 'Small (4\'8" - 5\'3")', 'Medium (5\'3" - 5\'9")'],
    availableColors: ['Dark Green / Black', 'Solid Black'],
    colors: ['Dark Green / Black', 'Solid Black']
  },
  {
    id: 12,
    name: 'MY SPORT MicroFlex Mini Shin Pads',
    category: 'shinpads',
    categoryName: 'Shin Pads',
    price: 19.99,
    stock: 25,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1589801258579-18e091f4ca26?w=800&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1589801258579-18e091f4ca26?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The ultra-minimalist 8cm mini shin pads favored by modern wingers and playmakers. Ultra-light, discreet, and flexible while meeting match day equipment regulations.',
    availableSizes: ['One Size (Ultra Minimal 8x5cm)'],
    sizes: ['One Size (Ultra Minimal 8x5cm)'],
    availableColors: ['Matte Black / Green Logo', 'Pure White'],
    colors: ['Matte Black / Green Logo', 'Pure White']
  }
];
