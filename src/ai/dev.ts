import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-phishing-report.ts';
import '@/ai/flows/generate-security-patch.ts';
import '@/ai/flows/analyze-network-anomalies.ts';
import '@/ai/flows/reasoning-for-patch.ts';
import '@/ai/flows/reasoning-for-deception.ts';