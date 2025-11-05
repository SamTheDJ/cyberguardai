"use server";

import { analyzeNetworkTraffic } from "@/ai/flows/analyze-network-anomalies";
import { reasoningForDeception } from "@/ai/flows/reasoning-for-deception";
import { summarizePhishingReport } from "@/ai/flows/summarize-phishing-report";
import { generateSecurityPatch } from "@/ai/flows/generate-security-patch";
import { reasoningForPatch } from "@/ai/flows/reasoning-for-patch";

import { networkTrafficData, type Vulnerability } from "@/lib/data";

// Simulate providing network data to the flow
export async function handleNetworkAnalysis() {
  const networkDataString = networkTrafficData
    .map(
      (log) =>
        `${log.timestamp} | ${log.sourceIp} -> ${log.destinationIp} [${log.protocol}] | ${log.details}`
    )
    .join("\n");

  const result = await analyzeNetworkTraffic({
    networkTrafficData: networkDataString,
  });

  return result;
}

// Simulate providing context to the deception reasoning flow
export async function getDeceptionReasoning(anomaly: string) {
  const result = await reasoningForDeception({
    attackerProfile: "Assumed to be a moderately skilled attacker looking for easy targets. Likely automated scanning.",
    deceptionTactic: `Deploy a honeypot that emulates a vulnerable SSH server in response to the anomaly: '${anomaly}'. The honeypot will log all interaction attempts.`,
    environmentContext: "The target is a development server within a sandboxed corporate network. No critical production data is accessible from this segment.",
  });
  return result;
}

// Pass phishing email content to the summarization flow
export async function summarizePhishingEmail(report: string) {
  const result = await summarizePhishingReport({ report });
  return result;
}

// Pass vulnerability data to the patch generation flow
export async function generatePatch(vuln: Vulnerability) {
  const result = await generateSecurityPatch({
    vulnerabilityDescription: vuln.description,
    codeSnippet: vuln.codeSnippet,
    applicationContext: `The vulnerability is in the file '${vuln.filePath}'. The application is a Node.js web server using Express.`,
  });
  return result;
}

// Pass patch data to the reasoning flow
export async function getPatchReasoning(vuln: Vulnerability, patchCode: string) {
    const result = await reasoningForPatch({
        vulnerabilityDescription: vuln.description,
        proposedPatch: patchCode
    });
    return result;
}
