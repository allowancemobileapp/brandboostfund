
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
import type { FaqItem } from '@/lib/faq';

const GenerateWebsitePromptInputSchema = z.object({
  brand: z.custom<Brand>(),
  faqContent: z.custom<FaqItem[]>(),
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
- Brand Name: {{{brand.brandName}}}
- Brand Description: {{{brand.description}}}
{{#if brand.socials}}
- Social Media: {{{brand.socials}}}
{{/if}}

**Website Specifications (based on our service agreement):**
The website MUST be a single-page layout. It should include the following sections in this order:
1. A modern, visually appealing hero section that introduces the brand.
2. An "About" section that elaborates on the brand's story and mission, using the description provided.
3. A simple "Services" or "Products" section if applicable from their description. If not, omit this.
4. A "Contact" section with a simple form (Name, Email, Message) that sends an email (or a placeholder for this functionality).
5. An FAQ section based on the details below.

**FAQ Section Content:**
Your generated prompt must instruct the AI to include an FAQ section containing the following questions and answers:
{{#each faqContent}}
- Question: "{{this.question}}"
- Answer: "{{this.answer}}"
{{/each}}

**Design & Styling Guidelines:**
- The overall aesthetic should be modern, clean, and professional.
- Use a color palette that is appropriate for the brand. You can suggest one based on the brand's name and description.
- All components should be from the shadcn/ui library where possible.
- The website must be fully responsive and mobile-friendly.

**Final Output:**
Based on all the information above, generate a single, comprehensive prompt that can be given to an AI code assistant to build the entire website. The prompt should be detailed, clear, and structured to ensure the AI can follow it accurately. Start the prompt with "Build a single-page website for..." and be very specific in your instructions.
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
