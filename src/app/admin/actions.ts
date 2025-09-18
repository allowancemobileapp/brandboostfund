'use server';

import { revalidatePath } from 'next/cache';
import { updateBrand } from '@/lib/data';
import { generateBrandDescription } from '@/ai/flows/generate-brand-description';
import type { Brand } from '@/lib/types';

export async function approveBrandAction(brandId: string) {
  try {
    await updateBrand(brandId, { 
      status: 'approved',
      websiteUrl: 'https://example.com' // Default URL, can be edited via DB access
    });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true, message: 'Brand approved successfully.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to approve brand.' };
  }
}

export async function generateDescriptionAction(brand: Brand) {
  try {
    if (brand.status !== 'approved') {
      throw new Error('Brand is not approved.');
    }
    const result = await generateBrandDescription({
      brandName: brand.brandName,
      brandDescription: brand.description,
    });
    
    await updateBrand(brand.id, { generatedDescription: result.generatedDescription });

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true, generatedDescription: result.generatedDescription };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to generate description.' };
  }
}
