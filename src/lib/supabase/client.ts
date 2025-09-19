import { createClient } from '@supabase/supabase-js';
import type { Brand, Metrics } from '@/lib/types';

// This is a type definition for our database schema.
// It's manually kept in sync with the SQL schema for type safety.
export type Database = {
  public: {
    Tables: {
      brands: {
        Row: Brand;
        Insert: Omit<Brand, 'id' | 'created_at' | 'updated_at' | 'status' | 'website_url' | 'featured' | 'generated_description' | 'logo_url' | 'website_prompt'>;
        Update: Partial<Brand>;
      };
      metrics: {
        Row: Metrics;
        Insert: Partial<Metrics>;
        Update: Partial<Metrics>;
      };
    };
    Enums: {
      brand_status: 'pending' | 'approved' | 'rejected';
    };
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // In a real app, you'd want more robust error handling or logging.
  console.error('Supabase client-side environment variables not set.');
}

// Create a single Supabase client for use in client-side components
export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!);
