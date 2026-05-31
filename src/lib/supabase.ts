import { createClient } from '@supabase/supabase-js';

const getBaseUrl = (url: any) => {
  if (!url || typeof url !== 'string') return 'https://placeholder.supabase.co';
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
const envUrl = import.meta.env.VITE_SUPABASE_URL;
// @ts-ignore
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const localUrl = typeof window !== 'undefined' ? localStorage.getItem('supabase_url') : null;
const localKey = typeof window !== 'undefined' ? localStorage.getItem('supabase_anon_key') : null;

const rawUrl = localUrl || envUrl || 'https://placeholder.supabase.co';
export const isSupabaseConfigured = rawUrl !== 'https://placeholder.supabase.co';
const supabaseUrl = getBaseUrl(rawUrl);
const supabaseAnonKey = localKey || envKey || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
