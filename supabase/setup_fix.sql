-- 1. Enable Storage
insert into storage.buckets (id, name, public) 
values ('images', 'images', true)
on conflict (id) do update set public = true;

-- 2. Storage Policies (Allow public uploads for development)
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Public Insert" on storage.objects;
drop policy if exists "Public Update" on storage.objects;
drop policy if exists "Public Delete" on storage.objects;

create policy "Public Access" on storage.objects for select using ( bucket_id = 'images' );
create policy "Public Insert" on storage.objects for insert with check ( bucket_id = 'images' );
create policy "Public Update" on storage.objects for update using ( bucket_id = 'images' );
create policy "Public Delete" on storage.objects for delete using ( bucket_id = 'images' );

-- 3. Fix Row Level Security Policies for the Admin Panel
-- Since there is no Authentication system yet, we allow ALL operations (Insert/Update/Delete)
-- so the Admin panel can manage products, portfolio, orders, and site content.

CREATE POLICY "Dev unrestricted products" ON products FOR ALL USING (true);
CREATE POLICY "Dev unrestricted portfolio" ON portfolio_items FOR ALL USING (true);
CREATE POLICY "Dev unrestricted orders" ON orders FOR ALL USING (true);
CREATE POLICY "Dev unrestricted site_content" ON site_content FOR ALL USING (true);

-- 4. Enable Realtime for all tables
-- This allows the frontend to listen for changes immediately across multiple tabs/devices
alter publication supabase_realtime add table products;
alter publication supabase_realtime add table portfolio_items;
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table site_content;
