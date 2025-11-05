'use server';

/**
 * @fileOverview A reasoning AI agent to evaluate AI-generated patches before deployment.
 *
 * - reasoningForPatch - A function that handles the reasoning process for evaluating patches.
 * - ReasoningForPatchInput - The input type for the reasoningForPatch function.
 * - ReasoningForPatchOutput - The return type for the reasoningForPatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReasoningForPatchInputSchema = z.object({
  vulnerabilityDescription: z
    .string()
    .describe('Description of the vulnerability being patched.'),
  proposedPatch: z
    .string()
    .describe('The AI-generated patch proposed to fix the vulnerability.'),
});
export type ReasoningForPatchInput = z.infer<typeof ReasoningForPatchInputSchema>;

const ReasoningForPatchOutputSchema = z.object({
  isPatchSafe: z.boolean().describe('Whether the patch is deemed safe to deploy.'),
  reasoning: z.string().describe('The reasoning behind the safety assessment.'),
});
export type ReasoningForPatchOutput = z.infer<typeof ReasoningForPatchOutputSchema>;

export async function reasoningForPatch(
  input: ReasoningForPatchInput
): Promise<ReasoningForPatchOutput> {
  return reasoningForPatchFlow(input);
}

const reasoningForPatchPrompt = ai.definePrompt({
  name: 'reasoningForPatchPrompt',
  input: {schema: ReasoningForPatchInputSchema},
  output: {schema: ReasoningForPatchOutputSchema},
  prompt: `You are a security expert evaluating an AI-generated patch for a security vulnerability.

Vulnerability Description: {{{vulnerabilityDescription}}}
Proposed Patch: {{{proposedPatch}}}

Assess the patch and determine if it is safe to deploy. Consider potential side effects, security implications, and correctness.
Explain your reasoning in detail and set the isPatchSafe field accordingly.

Is Patch Safe: {{isPatchSafe}}
Reasoning: {{reasoning}}`,
});

const reasoningForPatchFlow = ai.defineFlow(
  {
    name: 'reasoningForPatchFlow',
    inputSchema: ReasoningForPatchInputSchema,
    outputSchema: ReasoningForPatchOutputSchema,
  },
  async input => {
    const {output} = await reasoningForPatchPrompt(input);
    return output!;
  }
);
