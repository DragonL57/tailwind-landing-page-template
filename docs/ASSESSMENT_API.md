# AI Assessment System Documentation

## Overview

This document describes the AI-powered speaking assessment system used in giaotiep-1-1. The system uses Azure Speech API for pronunciation evaluation and LLM (Azure OpenAI) for content assessment.

---

## Azure Speech API

### Configuration

- **Grading System**: `HundredMark` (0-100 scale)
- **Granularity**: `Phoneme`
- **Prosody Assessment**: Enabled

### API Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `accuracyScore` | number | Pronunciation accuracy (0-100) |
| `fluencyScore` | number | Speech fluency (0-100) |
| `completenessScore` | number | Completeness vs reference text (0-100) |
| `prosodyScore` | number | Prosody, intonation, rhythm (0-100) |
| `pronScore` | number | Overall pronunciation score (weighted) |
| `transcript` | string | Recognized speech text |

### PronScore Calculation

According to Azure documentation:

**Reading (Scripted) Scenario:**
- With prosody: `PronScore = 0.4×s0 + 0.2×s1 + 0.2×s2 + 0.2×s3`
- Without prosody: `PronScore = 0.6×s0 + 0.2×s1 + 0.2×s2`

**Speaking (Unscripted) Scenario:**
- With prosody: `PronScore = 0.6×s0 + 0.2×s1 + 0.2×s2`
- Without prosody: `PronScore = 0.6×s0 + 0.4×s1`

Where s0-s3 are the scores sorted from lowest to highest.

---

## LLM Content Assessment

### Purpose

Evaluates vocabulary, grammar, and question handling for unscripted responses (Part 2).

### API Endpoint

`POST /api/assess-batch`

### Request

```json
{
  "transcripts": [
    {
      "transcript": "I think the most important thing is...",
      "referenceText": "What is important for you?",
      "scenarioPrompt": "Discuss a topic"
    }
  ],
  "isPart2": true
}
```

### Response

```json
{
  "scores": [
    {
      "vocabulary": 75,
      "grammar": 80,
      "questionHandling": 70
    }
  ]
}
```

---

## Score Processing

### RecordingScores Interface

All scores are kept in **raw 0-100 scale** (no conversion).

```typescript
interface RecordingScores {
  pronunciation: number;   // From Azure accuracyScore
  fluency: number;        // From Azure fluencyScore
  prosody: number;        // From Azure prosodyScore
  completeness: number;    // From Azure completenessScore
  vocabulary: number;     // From LLM
  grammar: number;        // From LLM
  questionHandling: number; // From LLM
  pronScore: number;      // From Azure pronScore (overall)
}
```

### Score Levels

| Score Range | Level (EN) | Level (VN) |
|-------------|------------|-------------|
| 80-100 | Excellent | Xuất sắc |
| 60-79 | Good | Tốt |
| 40-59 | Adequate | Đạt yêu cầu |
| 20-39 | Inadequate | Chưa đạt |
| 0-19 | Weak | Yếu |

---

## Assessment Parts

### Part 1: Interview (Scripted Reading)

- Evaluates pronunciation, fluency, prosody
- Uses Azure scores only
- No vocabulary/grammar (scripted content)

### Part 2: Role Play (Unscripted)

- Evaluates all criteria
- Azure: pronunciation, fluency, prosody
- LLM: vocabulary, grammar, questionHandling

---

## API Endpoints

### `POST /api/azure-batch`

Process multiple audio recordings through Azure Speech API.

**Request:**
```json
{
  "items": [
    {
      "audioBase64": "base64-encoded-audio...",
      "referenceText": "Hello, how are you?"
    }
  ]
}
```

**Response:**
```json
{
  "results": [
    {
      "transcript": "Hello, how are you?",
      "accuracyScore": 85,
      "fluencyScore": 78,
      "completenessScore": 92,
      "prosodyScore": 80,
      "pronScore": 82
    }
  ]
}
```

### `POST /api/assess-batch`

Get LLM-based content scores for transcripts.

**Request:**
```json
{
  "transcripts": [...],
  "isPart2": true
}
```

**Response:**
```json
{
  "scores": [
    {
      "vocabulary": 75,
      "grammar": 80,
      "questionHandling": 70
    }
  ]
}
```

---

## File Structure

```
lib/ai-assessment/
├── scoring.ts      # Core scoring logic
├── types.ts       # TypeScript interfaces
├── utils.ts       # Helper functions (level, colors, comments)
├── constants.ts   # Constants
└── audio-utils.ts # Audio processing
```

---

## Usage Example

```typescript
import { batchAssessRecordings, computeFullResult } from "@/lib/ai-assessment/scoring";

// 1. Get recordings from user
const recordings = await batchAssessRecordings(rawRecordings);

// 2. Compute results
const result = computeFullResult(recordings, part1Count);

// 3. result contains:
// - result.grandTotal (sum of all criteria)
// - result.grandMax (max possible score)
// - result.part1 and result.part2 with detailed criteria
```

---

## Company Rubric (ePLUS Speaking Rubric)

See `docs/SCORING_RUBRIC.md` for the complete scoring rubric.

### Scoring Summary

| Part | Max Score | Criteria |
|------|----------|----------|
| Part 1: Interview | 50 pts | 5 |
| Part 2: Role Play | 50 pts | 5 |
| **Total** | **100 pts** | **5** |

Each criterion scored: 2, 4, 6, 8, or 10

### Azure to Rubric Mapping

| Azure Score (0-100) | Rubric Score | Level |
|---------------------|-------------|-------|
| 80-100 | 10 | Excellent |
| 60-79 | 8 | Good |
| 40-59 | 6 | Adequate |
| 20-39 | 4 | Inadequate |
| 0-19 | 2 | Weak |

---

## Notes

- All scores are kept in raw 0-100 format from Azure/LLM
- No artificial conversion or weighting is applied
- The system maps Azure scores to company rubric for final display
- Company rubric: see `docs/SCORING_RUBRIC.md`
