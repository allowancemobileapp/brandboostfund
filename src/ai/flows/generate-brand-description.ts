'use server';

/**
 * @fileOverview An AI agent that generates a compelling, one-sentence brand summary.
 *
 * - generateBrandDescription - A function that generates the brand summary.
 * - GenerateBrandDescriptionInput - The input type for the generateBrandDescription function.
 * - GenerateBrandDescriptionOutput - The return type for the generateBrandDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBrandDescriptionInputSchema = z.object({
  brandName: z.string().describe('The name of the brand.'),
  brandDescription: z.string().describe('The existing description of the brand.'),
});
export type GenerateBrandDescriptionInput = z.infer<typeof GenerateBrandDescriptionInputSchema>;

const GenerateBrandDescriptionOutputSchema = z.object({
  generatedDescription: z.string().describe('The AI-generated one-sentence brand summary.'),
});
export type GenerateBrandDescriptionOutput = z.infer<typeof GenerateBrandDescriptionOutputSchema>;

export async function generateBrandDescription(input: GenerateBrandDescriptionInput): Promise<GenerateBrandDescriptionOutput> {
  return generateBrandDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBrandDescriptionPrompt',
  input: {schema: GenerateBrandDescriptionInputSchema},
  output: {schema: GenerateBrandDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter who specializes in creating concise and impactful brand statements.

  Based on the following information, generate a single, compelling, clean, and short sentence that summarizes the brand's core mission or value proposition. This will be used in a public showcase.

  Brand Name: {{{brandName}}}
  Brand's Full Description: {{{brandDescription}}}

  Generated one-sentence summary:`,
});

const generateBrandDescriptionFlow = ai.defineFlow(
  {
    name: 'generateBrandDescriptionFlow',
    inputSchema: GenerateBrandDescriptionInputSchema,
    outputSchema: GenerateBrandDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
