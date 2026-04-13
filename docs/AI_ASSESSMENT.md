# AI Assessment System

This document describes the AI-powered speaking assessment system for giaotiep-1-1. The system evaluates users across two distinct phases using Azure Speech Services and Inception AI (LLM).

## 1. Assessment Phases

The assessment is divided into two 50-point parts, totaling 100 points on the EPLUS scale.

### Part 1: Scripted Reading (50 pts)
Evaluates **delivery only**. Users read fixed sentences provided by the system.
- **Criteria (10 pts each)**:
  1. **Pronunciation**: Azure `AccuracyScore`.
  2. **Fluency**: Azure `FluencyScore`.
  3. **Prosody**: Azure `ProsodyScore`.
  4. **Completeness**: Azure `CompletenessScore`.
  5. **Overall Delivery**: Azure `PronScore`.
- **Note**: Since the content is scripted, Vocabulary and Grammar are not evaluated.

### Part 2: Unscripted Role Play (50 pts)
Evaluates **content and delivery**. Users respond freely to unscripted scenarios.
- **Criteria (10 pts each)**:
  1. **Vocabulary**: Evaluated by LLM.
  2. **Grammar**: Evaluated by LLM.
  3. **Question Handling**: Evaluated by LLM.
  4. **Pronunciation**: Azure `AccuracyScore`.
  5. **Fluency**: Azure `FluencyScore`.

---

## 2. Scoring Logic

### Linear Granular Mapping
The system uses a strict linear mapping from API scores (0-100) to the EPLUS rubric (0-10):
- **Formula**: `Rubric Score = Raw Score / 10`
- **Example**: An Azure accuracy of **86%** results in **8.6 / 10.0**.

### Rounding
- All individual criterion scores and part totals are rounded to **1 decimal place**.
- Grand Total is rounded to **1 decimal place**.

---

## 3. CEFR & EPLUS Mapping

The final CEFR and EPLUS levels are derived from the percentage of the Grand Total:

| Total Score (100) | CEFR Level | EPLUS Level | Level Description |
|:---:|:---:|:---:|:---:|
| 90 - 100 | B1+ | EPLUS 4 | Xuất sắc |
| 80 - 89 | B1 | EPLUS 3 | Xuất sắc |
| 70 - 79 | A2+ | EPLUS 2 | Tốt |
| 60 - 69 | A2 | EPLUS 1 | Tốt |
| 40 - 59 | A1 | Pre EPLUS | Đạt yêu cầu / Chưa đạt |
| 0 - 39 | < A1 | - | Yếu |

---

## 4. Technical Architecture

### Audio Isolation
To prevent "stale audio" leakage between items:
- **State-Locked Capture**: Recordings are captured into a frozen `Blob` state immediately upon stopping.
- **Force Cleanup**: Every new recording attempt explicitly stops all active media streams and clears all recorder listeners before starting.

### API Orchestration
- **Azure Batch (`/api/azure-batch`)**: Orchestrates multiple audio files through Azure Pronunciation Assessment using SSE (Server-Sent Events) for progress updates.
- **LLM Batch (`/api/assess-batch`)**: Routes transcript assessment to the Inception API server-side to protect API keys and enable verbose terminal logging.

---

## 5. Directory Structure

- `lib/ai-assessment/scoring.ts`: Primary calculation and orchestration logic.
- `lib/ai-assessment/llm-service.ts`: Integration with Inception AI.
- `lib/ai-assessment/batch-utils.ts`: Audio encoding and SSE stream parsing.
- `lib/ai-assessment/types.ts`: Centralized TypeScript interfaces.
- `app/api/azure-batch/`: Azure Speech integration.
- `app/api/assess-batch/`: LLM assessment entry point.
