'use server';

/**
 * @fileOverview An AI agent that generates a compelling brand description.
 *
 * - generateBrandDescription - A function that generates the brand description.
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
  generatedDescription: z.string().describe('The AI-generated brand description.'),
});
export type GenerateBrandDescriptionOutput = z.infer<typeof GenerateBrandDescriptionOutputSchema>;

export async function generateBrandDescription(input: GenerateBrandDescriptionInput): Promise<GenerateBrandDescriptionOutput> {
  return generateBrandDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBrandDescriptionPrompt',
  input: {schema: GenerateBrandDescriptionInputSchema},
  output: {schema: GenerateBrandDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter.

  You will use this information to create a compelling brand description for the brand.

  Brand Name: {{{brandName}}}
  Existing Description: {{{brandDescription}}}

  Generated Description:`, // The output should be a creative and engaging brand description.
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
