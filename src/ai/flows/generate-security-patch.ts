'use server';

/**
 * @fileOverview AI-powered security patch generator and deployer.
 *
 * - generateSecurityPatch - A function that generates, tests, and deploys security patches.
 * - GenerateSecurityPatchInput - The input type for the generateSecurityPatch function.
 * - GenerateSecurityPatchOutput - The return type for the generateSecurityPatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSecurityPatchInputSchema = z.object({
  vulnerabilityDescription: z
    .string()
    .describe('Description of the security vulnerability.'),
  codeSnippet: z.string().describe('The vulnerable code snippet.'),
  applicationContext: z
    .string()
    .describe('Context of the application where the vulnerability exists.'),
});
export type GenerateSecurityPatchInput = z.infer<typeof GenerateSecurityPatchInputSchema>;

const GenerateSecurityPatchOutputSchema = z.object({
  patchCode: z.string().describe('The AI-generated patch code.'),
  testResult: z.string().describe('The result of testing the patch in a sandbox.'),
  deploymentStatus: z
    .string()
    .describe('The status of deploying the patch (e.g., success, failure).'),
  reasoning: z.string().describe('Reasoning for solution'),
});
export type GenerateSecurityPatchOutput = z.infer<typeof GenerateSecurityPatchOutputSchema>;

export async function generateSecurityPatch(input: GenerateSecurityPatchInput): Promise<GenerateSecurityPatchOutput> {
  return generateSecurityPatchFlow(input);
}

const generatePatchPrompt = ai.definePrompt({
  name: 'generatePatchPrompt',
  input: {schema: GenerateSecurityPatchInputSchema},
  output: {schema: GenerateSecurityPatchOutputSchema},
  prompt: `You are an AI-powered security engineer tasked with generating, testing, and deploying security patches.

  Vulnerability Description: {{{vulnerabilityDescription}}}
  Code Snippet: {{{codeSnippet}}}
  Application Context: {{{applicationContext}}}

  1.  Analyze the provided code snippet and vulnerability description to understand the security flaw.
  2.  Generate a patch to address the vulnerability. The patch code must be compatible with the context of the provided Code Snippet.
  3.  Test the patch in a sandbox environment to ensure it resolves the vulnerability without introducing new issues.
  4.  Based on the test results, determine if the patch is safe to deploy and make a determination to deploy it to production. If it is not safe, explain why.
  5.  Return the patch code, test results, and deployment status.
  6.  Provide the reasoning for the fix.
  `,
});

const generateSecurityPatchFlow = ai.defineFlow(
  {
    name: 'generateSecurityPatchFlow',
    inputSchema: GenerateSecurityPatchInputSchema,
    outputSchema: GenerateSecurityPatchOutputSchema,
  },
  async input => {
    const {output} = await generatePatchPrompt(input);
    return output!;
  }
);
