if (!globalThis.import) {
  (globalThis as any).import = { meta: { env: { VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co', VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || 'placeholder' } } };
}

import { supabase } from './src/lib/supabase.ts';

async function testAddProduct() {
  const { data, error } = await supabase.from('products').insert({
    name: 'Test Product',
    description: 'A test product',
    price: 99,
    category: 'Accessories',
    image: 'https://example.com/test.png',
    is_sold: false
  }).select();

  console.log("Data:", data);
  console.log("Error:", error);
}

testAddProduct();
