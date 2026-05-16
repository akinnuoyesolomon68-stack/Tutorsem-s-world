import { createClient } from '@supabase/supabase-js';

const getBaseUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.host}`;
  } catch (e) {
    return url.replace(/\/+$/, '').replace(/\/rest\/v1\/?$/, '');
  }
};

const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseUrl = getBaseUrl(rawUrl);
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
