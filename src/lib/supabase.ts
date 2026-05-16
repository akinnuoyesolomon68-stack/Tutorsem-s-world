import { createClient } from '@supabase/supabase-js';

const getBaseUrl = (url: string) => {
  let cleanUrl = url.replace(/^["']|["']$/g, '').trim();
  cleanUrl = cleanUrl.replace(/\/+$/, '').replace(/\/rest\/v1\/?$/, '');
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = `https://${cleanUrl}`;
  }
  try {
    const parsed = new URL(cleanUrl);
    return `${parsed.protocol}//${parsed.host}`;
  } catch (e) {
    return cleanUrl;
  }
};

// @ts-ignore
const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseUrl = getBaseUrl(rawUrl);
// @ts-ignore
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
