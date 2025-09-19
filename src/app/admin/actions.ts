
'use server';

import { revalidatePath } from 'next/cache';
import { updateBrand } from '@/lib/data';
import { generateBrandDescription } from '@/ai/flows/generate-brand-description';
import { generateWebsitePrompt } from '@/ai/flows/generate-website-prompt';
import type { Brand } from '@/lib/types';

const ADMIN_CODE = '0000';

export async function approveBrandAction(brandId: string, code: string) {
  if (code !== ADMIN_CODE) {
    return { success: false, message: 'Invalid admin code.' };
  }
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

export async function rejectBrandAction(brandId: string, code: string) {
  if (code !== ADMIN_CODE) {
    return { success: false, message: 'Invalid admin code.' };
  }
  try {
    await updateBrand(brandId, { status: 'rejected' });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true, message: 'Brand rejected.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to reject brand.' };
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

export async function generateWebsitePromptAction(brand: Brand) {
  try {
    if (brand.status !== 'approved') {
      throw new Error('Can only generate prompts for approved brands.');
    }
    const result = await generateWebsitePrompt({
      brand,
    });

    await updateBrand(brand.id, { websitePrompt: result.websitePrompt });

    revalidatePath('/admin');
    
    return { success: true, prompt: result.websitePrompt };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to generate website prompt.' };
  }
}
