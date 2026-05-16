-- Supabase Schema for TUTORSEM's World
-- Paste this entire script into your Supabase SQL Editor and run it.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. Products Table
-- ==========================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Accessories', 'Student Materials', 'Clothes', 'Shoes', 'Data Analysis')),
  image TEXT,
  is_sold BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. Portfolio Items Table
-- ==========================================
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Website Design', 'Graphics Design', 'Data Analysis')),
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. Orders Table
-- ==========================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL UNIQUE,
  product_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  total_price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Processing' CHECK (status IN ('Processing', 'Shipped', 'Out for Delivery', 'Delivered')),
  estimated_delivery TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. Site Content Table (Single Row)
-- ==========================================
CREATE TABLE IF NOT EXISTS site_content (
  id INT PRIMARY KEY CHECK (id = 1), -- Ensures only one row exists
  home_hero_title TEXT NOT NULL,
  home_hero_subtitle TEXT NOT NULL,
  about_intro TEXT NOT NULL,
  vision_text TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Default Site Content
INSERT INTO site_content (id, home_hero_title, home_hero_subtitle, about_intro, vision_text)
VALUES (
  1,
  'TUTORSEM''s World',
  'Designing digital experiences, data insights, & curating premium products.',
  'I am a passionate UI/UX developer, designer, and data analyst bridging the gap between creativity, technology, and commerce.',
  'To build a platform that combines creativity, technology, business, and opportunities for students and customers globally.'
) ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- 5. Row Level Security (RLS) Setup
-- ==========================================
-- By default, allow read access to everyone for the public site, 
-- but you can restrict INSERT/UPDATE/DELETE later using Supabase Auth.

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products, portfolio, and site content
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read portfolio" ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "Public read site content" ON site_content FOR SELECT USING (true);

-- Allow public to CREATE orders (for customers) but not read all orders
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);

-- During development without full Auth integration yet, you can uncomment the following 
-- to allow full unrestricted access to all operations from the app:
-- CREATE POLICY "Dev unrestricted products" ON products FOR ALL USING (true);
-- CREATE POLICY "Dev unrestricted portfolio" ON portfolio_items FOR ALL USING (true);
-- CREATE POLICY "Dev unrestricted orders" ON orders FOR ALL USING (true);
-- CREATE POLICY "Dev unrestricted site_content" ON site_content FOR ALL USING (true);
