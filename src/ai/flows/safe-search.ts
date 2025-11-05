'use server';

/**
 * @fileOverview A flow to determine if a given text or link is safe.
 *
 * - safeSearch - A function that analyzes a string to check if it's safe.
 * - SafeSearchInput - The input type for the safeSearch function.
 * - SafeSearchOutput - The return type for the safeSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SafeSearchInputSchema = z.object({
  textOrLink: z.string().describe('The text or link to be analyzed for safety.'),
});
export type SafeSearchInput = z.infer<typeof SafeSearchInputSchema>;

const SafeSearchOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the provided text or link is safe.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the safety assessment.'),
});
export type SafeSearchOutput = z.infer<typeof SafeSearchOutputSchema>;

export async function safeSearch(
  input: SafeSearchInput
): Promise<SafeSearchOutput> {
  return safeSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'safeSearchPrompt',
  input: {schema: SafeSearchInputSchema},
  output: {schema: SafeSearchOutputSchema},
  prompt: `You are a cybersecurity expert. Analyze the following text or link and determine if it is safe.
  
Consider phishing, malware, scams, and other malicious content. Provide a clear "isSafe" boolean result and a concise reasoning for your assessment.

Content to analyze: {{{textOrLink}}}
`,
});

const safeSearchFlow = ai.defineFlow(
  {
    name: 'safeSearchFlow',
    inputSchema: SafeSearchInputSchema,
    outputSchema: SafeSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
