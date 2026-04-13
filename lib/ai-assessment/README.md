# AI Assessment Library

This directory contains the core logic for the AI-powered speaking assessment system. It orchestrates interactions between the browser's MediaRecorder API, Azure Speech Services, and Inception AI (LLM).

## Core Modules

### 1. `scoring.ts`
The primary entry point for calculating results.
- **`batchAssessRecordings`**: Orchestrates the multi-step process of preparing audio, calling the Azure batch API, and conditionally calling the LLM batch API for unscripted content.
- **`computeFullResult`**: Aggregates individual item scores into Part 1/Part 2 results and calculates the final CEFR/EPLUS level.
- **`mapToRubric`**: Implements linear mapping (`raw / 10`) for granular accuracy.

### 2. `llm-service.ts`
Handles all interactions with Inception AI.
- Centralizes prompt templates (`prompts.ts`).
- Manages robust JSON parsing of LLM responses.
- Implements verbose logging for prompt/response debugging in the server terminal.

### 3. `batch-utils.ts`
Utility functions for batch operations.
- **`prepareAudioBatch`**: Converts raw Blobs to Base64 WAV format.
- **`streamAzureBatchResults`**: Parses the SSE (Server-Sent Events) stream from the Azure API route and handles progress updates.

### 4. `types.ts`
Shared TypeScript interfaces for the entire assessment subsystem. Ensure any changes to the API contracts are reflected here.

## Scoring Overview

| Component | Logic | Source |
|---|---|---|
| **Part 1 (Reading)** | Pure Delivery | Azure (Accuracy, Fluency, Prosody, Completeness, PronScore) |
| **Part 2 (Roleplay)** | Content + Delivery | LLM (Vocab, Grammar, Question Handling) + Azure (Accuracy, Fluency) |

## Implementation Notes

- **Linear Mapping**: We use `score / 10` to provide high granularity (e.g., an 86 becomes 8.6 instead of 10.0).
- **Audio Isolation**: The recording flow in `ai-assessment.tsx` uses a state-locked blob capture and aggressive media stream cleanup to prevent audio data from leaking between assessment items.
- **Server-Side Security**: All LLM calls and Azure Speech interactions are proxied through server-side API routes to protect credentials.
