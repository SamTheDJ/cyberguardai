'use server';

/**
 * @fileOverview A reasoning model to evaluate the likelihood of success of a deception tactic before deploying a honeypot.
 *
 * - reasoningForDeception - A function that evaluates the likelihood of success of a deception tactic.
 * - ReasoningForDeceptionInput - The input type for the reasoningForDeception function.
 * - ReasoningForDeceptionOutput - The return type for the reasoningForDeception function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReasoningForDeceptionInputSchema = z.object({
  attackerProfile: z
    .string()
    .describe('The profile of the attacker, including their skills, goals, and past behavior.'),
  deceptionTactic: z
    .string()
    .describe('The description of the deception tactic to be deployed.'),
  environmentContext: z
    .string()
    .describe('The context of the environment where the deception tactic will be deployed.'),
});
export type ReasoningForDeceptionInput = z.infer<typeof ReasoningForDeceptionInputSchema>;

const ReasoningForDeceptionOutputSchema = z.object({
  likelihoodOfSuccess: z
    .number()
    .describe(
      'The likelihood of success of the deception tactic, on a scale of 0 to 1, where 0 is very unlikely and 1 is very likely.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the likelihood of success score.'),
});
export type ReasoningForDeceptionOutput = z.infer<typeof ReasoningForDeceptionOutputSchema>;

export async function reasoningForDeception(input: ReasoningForDeceptionInput): Promise<ReasoningForDeceptionOutput> {
  return reasoningForDeceptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reasoningForDeceptionPrompt',
  input: {schema: ReasoningForDeceptionInputSchema},
  output: {schema: ReasoningForDeceptionOutputSchema},
  prompt: `You are a cybersecurity expert specializing in deception tactics.

You are evaluating the likelihood of success of a deception tactic against a specific attacker profile in a given environment.

Based on the attacker's profile, the deception tactic, and the environment context, provide a likelihood of success score (0 to 1) and explain your reasoning.

Attacker Profile: {{{attackerProfile}}}
Deception Tactic: {{{deceptionTactic}}}
Environment Context: {{{environmentContext}}}

Likelihood of Success (0 to 1): 
Reasoning: `,
});

const reasoningForDeceptionFlow = ai.defineFlow(
  {
    name: 'reasoningForDeceptionFlow',
    inputSchema: ReasoningForDeceptionInputSchema,
    outputSchema: ReasoningForDeceptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
