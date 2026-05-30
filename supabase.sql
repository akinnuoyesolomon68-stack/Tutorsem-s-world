-- Run this script in your Supabase SQL Editor to set up the database and storage.

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price numeric NOT NULL DEFAULT 0,
  category text,
  image text,
  is_sold boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 2. Create Portfolio Items Table
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  category text,
  image text,
  created_at timestamptz DEFAULT now()
);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number text NOT NULL,
  product_name text NOT NULL,
  customer_name text NOT NULL,
  total_price numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Processing',
  estimated_delivery text,
  created_at timestamptz DEFAULT now()
);

-- 4. Create Site Content Table
CREATE TABLE IF NOT EXISTS public.site_content (
  id integer PRIMARY KEY,
  home_hero_title text,
  home_hero_subtitle text,
  about_intro text,
  vision_text text,
  created_at timestamptz DEFAULT now()
);

-- Insert default site content (id = 1)
INSERT INTO public.site_content (id, home_hero_title, home_hero_subtitle, about_intro, vision_text)
VALUES (
  1, 
  'Welcome to TUTORSEM', 
  'Your one-stop destination for standard learning and quality products.', 
  'We are dedicated to providing the best learning tools and materials.', 
  'Our vision is to empower students through quality education resources.'
) ON CONFLICT (id) DO NOTHING;

-- 5. Set up Storage Bucket for Images
-- Assuming you already created a bucket called 'images', but if you haven't:
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the images bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated/anon users to insert/upload images
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');

-- Allow authenticated/anon users to update/delete (optional for admin operations)
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'images');

-- 6. Turn off RLS (Row Level Security) for development ease, or set it up properly for production.
-- To allow the client (anon key) to access and modify data:
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content DISABLE ROW LEVEL SECURITY;

-- If you prefer RLS enabled, uncomment the following and comment the DISABLE lines above:
/*
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for products" ON public.products FOR ALL USING (true);

ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for portfolio" ON public.portfolio_items FOR ALL USING (true);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for orders" ON public.orders FOR ALL USING (true);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for site content" ON public.site_content FOR ALL USING (true);
*/
