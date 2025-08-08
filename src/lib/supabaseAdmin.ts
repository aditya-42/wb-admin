import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;

if (!serviceKey) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_SERVICE_KEY is required for server-side operations",
  );
}

export const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
