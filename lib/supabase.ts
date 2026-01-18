import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = new Proxy({} as SupabaseClient, {
    get(_, prop) {
        if (!supabaseInstance) {
            console.warn('Supabase client not initialized. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
            // Return a no-op function for method calls to prevent crashes
            return () => Promise.resolve({ data: null, error: new Error('Supabase not configured') });
        }
        return (supabaseInstance as any)[prop];
    }
});
