-- Supabase Database Schema for Motun's Unisex

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==========================================
-- 1. PRODUCTS TABLE
-- ==========================================
create table public.products (
    id uuid default uuid_generate_v4() primary key,
    name varchar not null,
    description text not null,
    price numeric(10, 2) not null default 0.00,
    category varchar not null check (category in ('men', 'women', 'unisex', 'shoes', 'accessories', 'student')),
    sub_category varchar,
    image varchar not null,
    rating numeric(2, 1) not null default 5.0,
    is_new boolean default false,
    discount_badge varchar,
    in_stock boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on row level security for products
alter table public.products enable row level security;

-- Policies for public access to products
create policy "Allow public read access on products"
    on public.products for select
    using (true);

-- ==========================================
-- 2. CATEGORIES TABLE (Optional, if you want dynamic categories instead of enums)
-- ==========================================
create table public.categories (
    id varchar primary key, -- e.g., 'men', 'women'
    name varchar not null,
    image varchar not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on row level security for categories
alter table public.categories enable row level security;

-- Policies for public access to categories
create policy "Allow public read access on categories"
    on public.categories for select
    using (true);

-- ==========================================
-- 3. ORDERS TABLE
-- ==========================================
create table public.orders (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete set null, -- Optional: Link to Auth users
    customer_name varchar not null,
    customer_email varchar not null,
    delivery_address text not null,
    total_amount numeric(10, 2) not null default 0.00,
    status varchar not null check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) default 'pending',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 4. ORDER ITEMS TABLE
-- ==========================================
create table public.order_items (
    id uuid default uuid_generate_v4() primary key,
    order_id uuid references public.orders(id) on delete cascade not null,
    product_id uuid references public.products(id) on delete set null,
    product_name varchar not null, -- Store snapshot in case product name changes
    price numeric(10, 2) not null,
    quantity integer not null check (quantity > 0),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- HELPER FUNCTIONS & TRIGGERS
-- ==========================================

-- Function to automatically update the 'updated_at' column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Trigger for products
create trigger on_products_updated
    before update on public.products
    for each row execute procedure public.handle_updated_at();

-- Trigger for orders
create trigger on_orders_updated
    before update on public.orders
    for each row execute procedure public.handle_updated_at();

-- ==========================================
-- INITIAL DUMMY DATA SEEDING
-- ==========================================
insert into public.categories (id, name, image) values
  ('men', 'Men''s Fashion', 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80'),
  ('women', 'Women''s Fashion', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'),
  ('unisex', 'Unisex Fashion', 'https://images.unsplash.com/photo-1489987707023-afc432cb11f6?w=500&q=80'),
  ('shoes', 'Shoes', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80'),
  ('accessories', 'Accessories', 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&q=80'),
  ('student', 'Student Essentials', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80');

insert into public.products (name, description, price, category, sub_category, image, rating, is_new, in_stock) values
  ('Classic Navy Suit Jacket', 'A premium tailored suit jacket perfect for business and formal occasions.', 199.99, 'men', 'Jackets', 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e5?w=500&q=80', 4.8, true, true),
  ('Premium Leather Sneakers', 'Minimalist leather sneakers, combining luxury with everyday comfort.', 145.00, 'shoes', 'Sneakers', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80', 4.6, true, true);
