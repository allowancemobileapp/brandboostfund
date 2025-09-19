import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase/client';
import { supabase } from '@/lib/supabase/client';
import type { Brand, Metrics } from '@/lib/types';

// Use a server-side client for admin tasks
const getSupabaseServerClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        // In a real app, you'd want more robust error handling or logging.
        console.error('Supabase server-side environment variables not set.');
        return null;
    }
    
    // Create a new client with the service role key for elevated privileges
    return createClient<Database>(
        supabaseUrl,
        serviceRoleKey
    );
};


// This is the initial data for the metrics table.
// It will only be inserted if the table is empty.
const initialMetrics: Metrics = {
  goal: 1000000,
  raised: 0,
  slots: 100,
};

export const getMetrics = async (): Promise<Metrics> => {
  const { data, error, count } = await supabase.from('metrics').select().limit(1);

  if (error) {
    console.error('Error fetching metrics:', error);
    return initialMetrics; // Return default metrics on error
  }

  // If the table is empty, insert the initial data
  if (data && data.length === 0) {
    const supabaseAdmin = getSupabaseServerClient();
    if (!supabaseAdmin) return initialMetrics;

    const { data: insertedData, error: insertError } = await supabaseAdmin
      .from('metrics')
      .insert(initialMetrics)
      .select()
      .single();
    
    if (insertError) {
      console.error('Error inserting initial metrics:', insertError);
      return initialMetrics;
    }
    return insertedData || initialMetrics;
  }

  return data[0] || initialMetrics;
};

export const updateMetrics = async (newMetrics: Partial<Metrics>): Promise<Metrics> => {
    const supabaseAdmin = getSupabaseServerClient();
    if (!supabaseAdmin) throw new Error('Supabase admin client not initialized.');

    // Since we only have one row, we'll update it. We need its ID first.
    const { data: currentMetrics, error: fetchError } = await supabaseAdmin.from('metrics').select('id').limit(1).single();

    if (fetchError || !currentMetrics) {
        // If no metrics exist, create initial one
        if(fetchError?.code === 'PGRST116'){ // "exact one row expected"
            const { data: insertedData, error: insertError } = await supabaseAdmin
                .from('metrics')
                .insert({ ...initialMetrics, ...newMetrics })
                .select()
                .single();
            if(insertError) throw new Error('Could not create initial metrics.');
            return insertedData;
        }
        throw new Error('Could not fetch metrics to update.');
    }

    const { data, error } = await supabaseAdmin
        .from('metrics')
        .update(newMetrics)
        .eq('id', currentMetrics.id)
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

export const getBrandById = async (id: string): Promise<Brand | undefined> => {
    const supabaseAdmin = getSupabaseServerClient();
    if (!supabaseAdmin) return undefined;

    const { data, error } = await supabaseAdmin.from('brands').select('*').eq('id', id).single();

    if (error) {
        console.error(`Error fetching brand ${id}:`, error);
        return undefined;
    }
    return data || undefined;
};

export const addBrand = async (brandData: {
    name: string;
    brandName: string;
    description: string;
    contact: string;
    socials?: string;
}): Promise<Brand> => {
    const { data, error } = await supabase
        .from('brands')
        .insert([
            {
                name: brandData.name,
                brandName: brandData.brandName,
                description: brandData.description,
                contact: brandData.contact,
                socials: brandData.socials || null,
                status: 'pending', // Default status
            },
        ])
        .select()
        .single();

    if (error) {
        console.error('Error adding brand:', error);
        throw error;
    }
    return data;
};


export const updateBrand = async (brandId: string, updates: Partial<Brand>): Promise<Brand | undefined> => {
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
