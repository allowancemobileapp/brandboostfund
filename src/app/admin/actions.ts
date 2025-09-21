
'use server';

import { revalidatePath } from 'next/cache';
import { getBrandById, updateBrand } from '@/lib/data';
import { generateBrandDescription } from '@/ai/flows/generate-brand-description';
import { generateWebsitePrompt } from '@/ai/flows/generate-website-prompt';
import type { Brand } from '@/lib/types';

const ADMIN_CODE = '4190';

export async function approveBrandAction(brandId: string, code: string) {
  if (code !== ADMIN_CODE) {
    return { success: false, message: 'Invalid admin code.' };
  }
  try {
    // First, fetch the brand to get its description
    const brand = await getBrandById(brandId);
    if (!brand) {
      throw new Error('Brand not found.');
    }

    // Generate the summary description
    const descriptionResult = await generateBrandDescription({
      brandName: brand.brand_name,
      brandDescription: brand.description,
    });

    const websiteUrl = `https://brandboostfund-showcase.vercel.app/${brand.brand_name.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Update the brand with approved status and the generated description
    await updateBrand(brandId, { 
      status: 'approved',
      website_url: websiteUrl,
      generated_description: descriptionResult.generatedDescription,
    });

    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true, message: 'Brand approved and summary generated.' };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to approve brand.';
    return { success: false, message: errorMessage };
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
      brandName: brand.brand_name,
      brandDescription: brand.description,
    });
    
    await updateBrand(brand.id, { generated_description: result.generatedDescription });

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

    await updateBrand(brand.id, { website_prompt: result.websitePrompt });

    revalidatePath('/admin');
    
    return { success: true, prompt: result.websitePrompt };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to generate website prompt.' };
  }
}
