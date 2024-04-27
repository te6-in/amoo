import { createBrowserClient as createBrowserSupabaseClient } from "@supabase/ssr";

import { env } from "@/env";

export function createBrowserClient() {
  return createBrowserSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
