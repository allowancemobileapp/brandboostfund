import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase/client';
import { supabase } from '@/lib/supabase/client';
import type { Brand, Metrics } from '@/lib/types';

// Use a server-side client for admin tasks
const getSupabaseServerClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        console.error('Supabase server-side environment variables not set.');
        // In a real app, handle this more gracefully.
        // For now, returning null and letting the calling function handle it.
        return null;
    }
    
    // Create a new client with the service role key for elevated privileges
    return createClient<Database>(
        supabaseUrl,
        serviceRoleKey
    );
};


// This is the initial data for the metrics table.
const initialMetrics: Metrics = {
  id: 1,
  goal: 1000000,
  raised: 0,
  slots: 100,
};

export const getMetrics = async (): Promise<Metrics> => {
  const { data, error } = await supabase.from('metrics').select('*').limit(1).single();

  if (error || !data) {
    console.error('Error fetching metrics:', error);
    return initialMetrics; // Return default metrics on error or if no data
  }

  return data;
};

export const updateMetrics = async (newMetrics: Partial<Metrics>): Promise<Metrics> => {
    const supabaseAdmin = getSupabaseServerClient();
    if (!supabaseAdmin) throw new Error('Supabase admin client not initialized.');

    const { data, error } = await supabaseAdmin
        .from('metrics')
        .update(newMetrics)
        .eq('id', 1) // We know there is only one row with id=1
        .select()
        .single();

    if (error) {
        console.error('Error updating metrics:', error);
        throw error;
    }
    return data;
};


export const getBrands = async (): Promise<Brand[]> => {
  const { data, error } = await supabase.from('brands').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
  return data || [];
};

export const getBrandById = async (id: string): Promise<Brand | null> => {
    const supabaseAdmin = getSupabaseServerClient();
    if (!supabaseAdmin) return null;

    const { data, error } = await supabaseAdmin.from('brands').select('*').eq('id', id).single();

    if (error) {
        console.error(`Error fetching brand ${id}:`, error);
        return null;
    }
    return data;
};

export const addBrand = async (brandData: {
    name: string;
    brand_name: string;
    description: string;
    contact: string;
    socials?: string;
}): Promise<Brand> => {
    // The server-side client is needed for write operations if RLS were enabled for inserts.
    // Even without RLS, it's good practice to handle writes from a trusted server environment.
    const supabaseAdmin = getSupabaseServerClient();
    if (!supabaseAdmin) {
        throw new Error('Supabase admin client not initialized for adding brand.');
    }

    const { data, error } = await supabaseAdmin
        .from('brands')
        .insert({
            name: brandData.name,
            brand_name: brandData.brand_name,
            description: brandData.description,
            contact: brandData.contact,
            socials: brandData.socials || null,
        })
        .select()
        .single();

    if (error) {
        console.error('Error adding brand:', error);
        throw error;
    }
    return data;
};


export const updateBrand = async (brandId: string, updates: Partial<Brand>): Promise<Brand> => {
    const supabaseAdmin = getSupabaseServerClient();
    if (!supabaseAdmin) throw new Error('Supabase admin client not initialized.');

    // Get the brand's current state before updating
    const currentBrand = await getBrandById(brandId);
    if (!currentBrand) {
        throw new Error('Brand not found');
    }

    const { data, error } = await supabaseAdmin
        .from('brands')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', brandId)
        .select()
        .single();

    if (error) {
        console.error('Error updating brand:', error);
        throw error;
    }

    // If brand is newly approved, update the metrics
    const wasPending = currentBrand.status === 'pending';
    if (updates.status === 'approved' && wasPending) {
        const currentMetrics = await getMetrics();
        await updateMetrics({
            raised: currentMetrics.raised + 10000,
            slots: currentMetrics.slots - 1,
        });
    }

    return data;
};
