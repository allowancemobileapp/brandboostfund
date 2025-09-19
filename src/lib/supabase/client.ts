import { createClient } from '@supabase/supabase-js';
import type { Brand, Metrics } from '@/lib/types';

// This is a type definition for our database schema.
// It's manually kept in sync with the SQL schema for type safety.
export type Database = {
  public: {
    Tables: {
      brands: {
        Row: Brand;
        Insert: Omit<Brand, 'id' | 'status' | 'websiteUrl' | 'featured' | 'generatedDescription' | 'logoUrl' | 'websitePrompt' | 'created_at' | 'updated_at'>;
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single Supabase client for use in client-side components
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
