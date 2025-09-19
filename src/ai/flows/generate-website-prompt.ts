
'use server';

/**
 * @fileOverview An AI agent that generates a prompt for an AI website builder.
 *
 * - generateWebsitePrompt - A function that generates the website prompt.
 * - GenerateWebsitePromptInput - The input type for the generateWebsitePrompt function.
 * - GenerateWebsitePromptOutput - The return type for the generateWebsitePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Brand } from '@/lib/types';

const GenerateWebsitePromptInputSchema = z.object({
  brand: z.custom<Brand>(),
});
export type GenerateWebsitePromptInput = z.infer<typeof GenerateWebsitePromptInputSchema>;

const GenerateWebsitePromptOutputSchema = z.object({
  websitePrompt: z.string().describe('The AI-generated prompt for the website builder.'),
});
export type GenerateWebsitePromptOutput = z.infer<typeof GenerateWebsitePromptOutputSchema>;

export async function generateWebsitePrompt(input: GenerateWebsitePromptInput): Promise<GenerateWebsitePromptOutput> {
  return generateWebsitePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWebsitePrompt',
  input: {schema: GenerateWebsitePromptInputSchema},
  output: {schema: GenerateWebsitePromptOutputSchema},
  prompt: `You are an expert prompt engineer. Your task is to generate a detailed prompt for an AI code assistant (like Google's Firebase Studio) to build a single-page website for a client.

The website should be built using Next.js, React, Tailwind CSS, and shadcn/ui components.

**Client Brand Information:**
- Brand Name: {{{brand.brand_name}}}
- Brand Description: {{{brand.description}}}
{{#if brand.socials}}
- Social Media: {{{brand.socials}}}
{{/if}}

**Website Specifications:**
The website MUST be a single-page layout. It should include the following sections in this order:
1.  A modern, visually appealing hero section that introduces the brand.
2.  An "About" section that elaborates on the brand's story and mission, using the description provided.
3.  A "Services" or "Products" section. You must infer the services/products from the brand description. If no specific services or products are mentioned, create a simple section that highlights the brand's key value propositions.
4.  A "Contact" section with a simple form (Name, Email, Message) that has a placeholder for sending an email.
5.  A brand-specific "FAQ" section. You MUST generate 3-5 relevant frequently asked questions and their answers based on the provided brand description. The questions should be things a potential customer might ask about their products, services, or the brand itself. Do NOT use generic FAQs.

**Design & Styling Guidelines:**
-   The overall aesthetic should be modern, clean, and professional, and it MUST be tailored to the brand's industry and target audience as described.
-   Infer a color palette from the brand description. If no colors are mentioned, suggest a professional and appropriate palette based on the industry (e.g., for a coffee shop, suggest warm, earthy tones; for a tech startup, suggest blues and grays). Use these colors in your instructions for styling the site.
-   All components should be from the shadcn/ui library where possible.
-   The website must be fully responsive and mobile-friendly.

**Final Output:**
Based on all the information above, generate a single, comprehensive prompt that can be given to an AI code assistant to build the entire website. The prompt should be detailed, clear, and structured to ensure the AI can follow it accurately. Start the prompt with "Build a single-page website for..." and be very specific in your instructions. Do not include any of our internal notes or brand information in the final prompt you generate.
`,
});

const generateWebsitePromptFlow = ai.defineFlow(
  {
    name: 'generateWebsitePromptFlow',
    inputSchema: GenerateWebsitePromptInputSchema,
    outputSchema: GenerateWebsitePromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
