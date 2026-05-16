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

const rawUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseUrl = getBaseUrl(rawUrl);
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
