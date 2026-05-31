export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string; // 'men', 'women', 'unisex', 'shoes', 'accessories', 'student'
  subCategory?: string;
  image: string;
  rating: number;
  isNew?: boolean;
  discountBadge?: string;
  inStock: boolean;
}

export const CATEGORIES = [
  { id: 'men', name: "Men's Fashion", image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80' },
  { id: 'women', name: "Women's Fashion", image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80' },
  { id: 'unisex', name: "Unisex Fashion", image: 'https://images.unsplash.com/photo-1489987707023-afc432cb11f6?w=500&q=80' },
  { id: 'shoes', name: "Shoes", image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80' },
  { id: 'accessories', name: "Accessories", image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&q=80' },
  { id: 'student', name: "Student Essentials", image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Classic Navy Suit Jacket",
    description: "A premium tailored suit jacket perfect for business and formal occasions.",
    price: 199.99,
    category: 'men',
    subCategory: 'Jackets',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e5?w=500&q=80',
    rating: 4.8,
    isNew: true,
    inStock: true
  },
  {
    id: '2',
    name: "Summer Floral Maxi Dress",
    description: "Flowy, comfortable and elegant dress for summer outings.",
    price: 89.99,
    category: 'women',
    subCategory: 'Dresses',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
    rating: 4.7,
    discountBadge: '10% OFF',
    inStock: true
  },
  {
    id: '3',
    name: "Oversized Streetwear Hoodie",
    description: "Comfortable organic cotton oversized hoodie for everyday wear.",
    price: 65.00,
    category: 'unisex',
    subCategory: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
    rating: 4.9,
    inStock: true
  },
  {
    id: '4',
    name: "Premium Leather Sneakers",
    description: "Minimalist leather sneakers, combining luxury with everyday comfort.",
    price: 145.00,
    category: 'shoes',
    subCategory: 'Sneakers',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80',
    rating: 4.6,
    isNew: true,
    inStock: true
  },
  {
    id: '5',
    name: "Chronograph Gold Watch",
    description: "An elegant chronograph watch with a gold-tone stainless steel mesh bracelet.",
    price: 250.00,
    category: 'accessories',
    subCategory: 'Watches',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&q=80',
    rating: 5.0,
    inStock: true
  },
  {
    id: '6',
    name: "Minimalist Smart Backpack",
    description: "Water-resistant, anti-theft backpack perfect for students and professionals.",
    price: 75.00,
    category: 'student',
    subCategory: 'Backpacks',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    rating: 4.5,
    discountBadge: 'SALE',
    inStock: true
  },
  {
    id: '7',
    name: "Designer Sunglasses",
    description: "UV400 protection with a sleek geometric frame.",
    price: 120.00,
    category: 'accessories',
    subCategory: 'Sunglasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
    rating: 4.8,
    inStock: true
  },
  {
    id: '8',
    name: "Classic White T-Shirt",
    description: "Premium thick cotton unisex basic tee.",
    price: 25.00,
    category: 'unisex',
    subCategory: 'T-shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    rating: 4.7,
    inStock: true
  }
];
