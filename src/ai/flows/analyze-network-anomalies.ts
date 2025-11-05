'use server';

/**
 * @fileOverview Analyzes network traffic for subtle behavioral anomalies to discover potential threats.
 *
 * - analyzeNetworkTraffic - A function that analyzes network traffic for anomalies.
 * - AnalyzeNetworkTrafficInput - The input type for the analyzeNetworkTraffic function.
 * - AnalyzeNetworkTrafficOutput - The return type for the analyzeNetworkTraffic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeNetworkTrafficInputSchema = z.object({
  networkTrafficData: z
    .string()
    .describe(
      'Network traffic data in a format suitable for analysis (e.g., PCAP data, network logs).'
    ),
  baselineProfile: z
    .string()
    .optional()
    .describe(
      'Optional baseline profile of normal network behavior for comparison.'
    ),
});
export type AnalyzeNetworkTrafficInput = z.infer<typeof AnalyzeNetworkTrafficInputSchema>;

const AnalyzeNetworkTrafficOutputSchema = z.object({
  anomalies: z
    .array(z.string())
    .describe('A list of detected network anomalies with descriptions.'),
  severityLevels: z
    .array(z.string())
    .describe('A list of severity levels for each anomaly detected.'),
  recommendations: z
    .array(z.string())
    .describe('A list of recommended actions for each anomaly.'),
});
export type AnalyzeNetworkTrafficOutput = z.infer<typeof AnalyzeNetworkTrafficOutputSchema>;

export async function analyzeNetworkTraffic(
  input: AnalyzeNetworkTrafficInput
): Promise<AnalyzeNetworkTrafficOutput> {
  return analyzeNetworkTrafficFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeNetworkTrafficPrompt',
  input: {schema: AnalyzeNetworkTrafficInputSchema},
  output: {schema: AnalyzeNetworkTrafficOutputSchema},
  prompt: `You are an expert network security analyst specializing in anomaly detection.

  Analyze the provided network traffic data for subtle behavioral anomalies that may indicate potential threats. Compare the traffic data against the provided baseline profile, if available, to identify deviations from normal behavior. Return the detected anomalies, their severity levels and any recommendations.

  Network Traffic Data:
  {{networkTrafficData}}

  Baseline Profile (if available):
  {{#if baselineProfile}}
    {{baselineProfile}}
  {{else}}
    No baseline profile provided.
  {{/if}}
  
  Format the output as a list of anomalies, severity levels, and recommendations.
  `,
});

const analyzeNetworkTrafficFlow = ai.defineFlow(
  {
    name: 'analyzeNetworkTrafficFlow',
    inputSchema: AnalyzeNetworkTrafficInputSchema,
    outputSchema: AnalyzeNetworkTrafficOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
