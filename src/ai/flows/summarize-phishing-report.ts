'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing phishing reports.
 *
 * - summarizePhishingReport - A function that takes a detailed phishing report and returns a concise, urgent summary.
 * - SummarizePhishingReportInput - The input type for the summarizePhishingReport function, representing the detailed phishing report.
 * - SummarizePhishingReportOutput - The output type for the summarizePhishingReport function, representing the concise summary report.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePhishingReportInputSchema = z.object({
  report: z.string().describe('A detailed report of the detected phishing attempt.'),
});
export type SummarizePhishingReportInput = z.infer<typeof SummarizePhishingReportInputSchema>;

const SummarizePhishingReportOutputSchema = z.object({
  summary: z.string().describe('A concise and urgent summary of the phishing report.'),
});
export type SummarizePhishingReportOutput = z.infer<typeof SummarizePhishingReportOutputSchema>;

export async function summarizePhishingReport(input: SummarizePhishingReportInput): Promise<SummarizePhishingReportOutput> {
  return summarizePhishingReportFlow(input);
}

const summarizePhishingReportPrompt = ai.definePrompt({
  name: 'summarizePhishingReportPrompt',
  input: {schema: SummarizePhishingReportInputSchema},
  output: {schema: SummarizePhishingReportOutputSchema},
  prompt: `You are a security analyst tasked with summarizing phishing reports.
  Your goal is to provide a concise and urgent summary of the provided phishing report, highlighting the key details of the threat.
  The summary should be no more than 200 words.

  Phishing Report:
  {{report}}`,
});

const summarizePhishingReportFlow = ai.defineFlow(
  {
    name: 'summarizePhishingReportFlow',
    inputSchema: SummarizePhishingReportInputSchema,
    outputSchema: SummarizePhishingReportOutputSchema,
  },
  async input => {
    const {output} = await summarizePhishingReportPrompt(input);
    return output!;
  }
);
