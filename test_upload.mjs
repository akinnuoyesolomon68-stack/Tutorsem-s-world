import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://placeholder.supabase.co';
const supabaseKey = 'placeholder-key';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  try {
    const { error } = await supabase.storage.from('images').upload('test/abc.png', new Blob(['test']));
    console.log(error);
  } catch(e) {
    console.log("CATCH:", e.message);
  }
}
test();
