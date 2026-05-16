const getBaseUrl = (url) => {
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
console.log(1, getBaseUrl('https://example.supabase.co/'));
console.log(2, getBaseUrl('https://example.supabase.co'));
console.log(3, getBaseUrl('https://example.supabase.co/rest/v1'));
console.log(4, getBaseUrl('https://example.supabase.co/rest/v1/'));
console.log(5, getBaseUrl('example.supabase.co/'));
