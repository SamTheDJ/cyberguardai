# CyberGuard AI

CyberGuard AI is an autonomous AI-powered cyber defense agent built with Next.js and Genkit. It provides real-time threat detection, analysis, and mitigation capabilities.

## Features

- **Dashboard Overview**: Live metrics and a feed of recent threat events.
- **Autonomous Threat Hunting**: Actively monitors network traffic for behavioral anomalies and allows for autonomous deception via honeypots.
- **Generative Phishing & Deepfake Defense**: Scans incoming communications for AI-generated scam markers and provides AI-powered summaries.
- **Real-Time Code Vulnerability Patching**: Monitors codebases for vulnerabilities, generates patches with AI, and allows for AI-assisted review before deployment.
- **Safe Search**: Analyzes text or links to determine if they are safe from threats like phishing or malware.

## Tech Stack

- **Framework**: Next.js (with App Router)
- **AI**: Google Gemini via Genkit
- **UI**: React, TypeScript, ShadCN UI, Tailwind CSS
- **Icons**: Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v20 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to get your development environment set up.

### 1. Set up Environment Variables

The AI capabilities of this application are powered by Google's Gemini models through Genkit. You will need a Google AI API key to proceed.

1.  Create a `.env` file in the root of the project by copying the example:
    ```bash
    cp .env.example .env
    ```
2.  Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Add the API key to your `.env` file:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

### 2. Install Dependencies

Install the necessary packages using npm:

```bash
npm install
```

### 3. Run the Development Servers

This application requires two separate processes to be running in your local development environment:

1.  **The Next.js Frontend Application**: This serves the web interface.
2.  **The Genkit Flows Server**: This serves the AI backend functions.

You will need to open two separate terminal windows or tabs to run these commands.

**In your first terminal, run the Next.js app:**

```bash
npm run dev
```
This will start the web application, typically available at `http://localhost:9002`.

**In your second terminal, run the Genkit flows:**

```bash
npm run genkit:dev
```
This starts the Genkit development server, which makes the AI flows available for the frontend to call.

Once both are running, you can open your browser to `http://localhost:9002` to use the application.

## Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run genkit:dev`: Starts the Genkit flows server.
- `npm run genkit:watch`: Starts the Genkit server in watch mode, automatically restarting on file changes.
- `npm run build`: Creates a production-ready build of the Next.js application.
- `npm run start`: Starts the production server for the built Next.js application.
- `npm run lint`: Runs ESLint to check for code quality and style issues.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
