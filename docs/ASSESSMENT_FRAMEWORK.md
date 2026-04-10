# Assessment Framework Documentation

## Overview

This document describes the complete assessment framework used by giaotiep-1-1, including:
1. Azure Speech API scores
2. EPLUS Speaking Rubric
3. CEFR levels
4. Complete mapping between all systems

---

## 1. Azure Speech API

### 1.1 Configuration

- **Grading System**: `HundredMark` (0-100 scale)
- **Granularity**: `Phoneme`
- **Prosody Assessment**: Enabled

### 1.2 API Response Fields

| Field | Description | Scale |
|-------|-------------|-------|
| `accuracyScore` | Pronunciation accuracy | 0-100 |
| `fluencyScore` | Speech fluency | 0-100 |
| `completenessScore` | Completeness vs reference text | 0-100 |
| `prosodyScore` | Prosody, intonation, rhythm | 0-100 |
| `pronScore` | Overall pronunciation (weighted) | 0-100 |
| `transcript` | Recognized speech text | - |

### 1.3 LLM Content Assessment

For unscripted responses (Part 2), LLM provides additional scores:

| Field | Description | Scale |
|-------|-------------|-------|
| `vocabulary` | Vocabulary range and usage | 0-100 |
| `grammar` | Grammar accuracy | 0-100 |
| `questionHandling` | Question comprehension and response | 0-100 |

---

## 2. EPLUS Speaking Rubric

### 2.1 Scoring Structure

| Part | Max Score | Criteria | Each Criterion |
|------|----------|----------|----------------|
| Part 1: Interview | 50 pts | 5 | /10 |
| Part 2: Role Play | 50 pts | 5 | /10 |
| **Total** | **100 pts** | **5** | **/10** |

### 2.2 Criteria Description

#### Vocabulary

| Score | Level | Description |
|-------|-------|-------------|
| 10 | Excellent | Excellent use/range of vocabulary. Only few usage errors |
| 8 | Good | Some vocabulary problems that generally do not interfere with communication |
| 6 | Adequate | Several vocabulary problems that interfere with communication |
| 4 | Inadequate | Many vocabulary problems that severely interfere with communication |
| 2 | Weak | Very serious vocabulary problems that prevent communication |

#### Grammar

| Score | Level | Description |
|-------|-------|-------------|
| 10 | Excellent | Very good language control. Only few grammatical errors |
| 8 | Good | Good language control. Several grammatical errors but generally do not interfere |
| 6 | Adequate | Adequate language control. Grammatical problems that interfere with communication |
| 4 | Inadequate | Serious language use/grammatical problems that interfere with communication |
| 2 | Weak | Very serious grammatical errors that interfere with communication |

#### Pronunciation

| Score | Level | Description |
|-------|-------|-------------|
| 10 | Excellent | Pronunciation rarely interferes with communication |
| 8 | Good | Pronunciation does generally not interfere with communication |
| 6 | Adequate | Pronunciation sometimes interferes with communication |
| 4 | Inadequate | Pronunciation interferes with communication |
| 2 | Weak | Pronunciation severely interferes with communication |

#### Fluency

| Score | Level | Description |
|-------|-------|-------------|
| 10 | Excellent | Seldom hesitates while speaking, excellent pace |
| 8 | Good | Sometimes hesitates while speaking, good pace |
| 6 | Adequate | Sometimes provides responses that lack clarity |
| 4 | Inadequate | Often provides responses that are weak, needs clarification very often |
| 2 | Weak | Provides confusing responses. Needs clarification very often |

#### Question Handling

| Score | Level | Description |
|-------|-------|-------------|
| 10 | Excellent | Provides good and clear responses |
| 8 | Good | Provides mostly clear responses |
| 6 | Adequate | Provides adequate and often clear responses. May need clarification |
| 4 | Inadequate | Often provides responses that are weak, has serious problems with question comprehension |
| 2 | Weak | Provides confusing responses, demonstrates almost no question comprehension |

---

## 3. CEFR Levels

### 3.1 CEFR Overview

| Level | Name | Description |
|-------|------|-------------|
| A1 | Beginner | Can understand and use familiar everyday expressions |
| A2 | Elementary | Can communicate in simple and routine tasks |
| B1 | Intermediate | Can deal with most situations likely to arise while travelling |
| B2 | Upper Intermediate | Can interact with a degree of fluency and spontaneity |
| C1 | Advanced | Can express ideas fluently and spontaneously |
| C2 | Mastery | Can understand with ease virtually everything heard or read |

### 3.2 EPLUS Learning Path (mapped to CEFR)

| EPLUS Level | CEFR | Description |
|-------------|------|-------------|
| Pre EPLUS | A1 | Giao tiếp sinh tồn, nền tảng căn bản |
| EPLUS 1 | A2 | Giao tiếp hàng ngày, hội thoại quen thuộc |
| EPLUS 2 | A2+ | Giao tiếp chức năng trong đời sống và công việc |
| EPLUS 3 | B1 | Giao tiếp mở rộng, xử lý tình huống, logic hơn |
| EPLUS 4 | B1+ | Giao tiếp độc lập, chuyên nghiệp hơn, bày tỏ quan điểm rõ ràng |

---

## 4. Complete Mapping

### 4.1 Azure → Rubric (per criterion)

| Azure Score (0-100) | Rubric Score | Level |
|---------------------|--------------|-------|
| 80-100 | 10 | Excellent |
| 60-79 | 8 | Good |
| 40-59 | 6 | Adequate |
| 20-39 | 4 | Inadequate |
| 0-19 | 2 | Weak |

### 4.2 Criterion Mapping

| Rubric Criterion | Azure Source | Notes |
|-----------------|--------------|-------|
| Vocabulary | LLM vocabulary | Direct mapping |
| Grammar | LLM grammar | Direct mapping |
| Pronunciation | Azure accuracyScore | Direct mapping |
| Fluency | Azure fluencyScore | Direct mapping |
| Question Handling | LLM questionHandling | Direct mapping |

*Note: prosody and completeness from Azure are available but not currently used in the rubric*

### 4.3 Total Score → EPLUS/CEFR

| Total Score (100) | Rubric Level | EPLUS Level | CEFR |
|-------------------|--------------|-------------|------|
| 90-100 | Excellent | EPLUS 4 | B1+ |
| 80-89 | Excellent | EPLUS 3 | B1 |
| 70-79 | Good | EPLUS 2 | A2+ |
| 60-69 | Good | EPLUS 1 | A2 |
| 50-59 | Adequate | Pre EPLUS | A1 |
| 40-49 | Inadequate | Pre EPLUS | A1 |
| 20-39 | Weak | - | < A1 |
| 0-19 | Weak | - | < A1 |

### 4.4 Per Criterion → CEFR

| Rubric Score | Percentage | CEFR Level |
|--------------|------------|------------|
| 10 | 80-100% | B1 |
| 8 | 60-79% | A2+ |
| 6 | 40-59% | A2 |
| 4 | 20-39% | A1 |
| 2 | 0-19% | < A1 |

---

## 5. Implementation Formula

### 5.1 Score Calculation

```
Step 1: Get Azure/LLM scores
  - pronunciation = azure.accuracyScore (0-100)
  - fluency = azure.fluencyScore (0-100)
  - vocabulary = llm.vocabulary (0-100)
  - grammar = llm.grammar (0-100)
  - questionHandling = llm.questionHandling (0-100)

Step 2: Map to Rubric (2,4,6,8,10)
  - score = mapAzureToRubric(azureScore)
  - where: 80-100→10, 60-79→8, 40-59→6, 20-39→4, 0-19→2

Step 3: Calculate Total
  - total = (vocabulary + grammar + pronunciation + fluency + questionHandling) / 5
  - (using rubric scores 2,4,6,8,10)

Step 4: Determine EPLUS/CEFR Level
  - level = mapScoreToEPLUS(total)
```

### 5.2 Pseudocode

```typescript
function mapAzureToRubric(score: number): number {
  if (score >= 80) return 10;
  if (score >= 60) return 8;
  if (score >= 40) return 6;
  if (score >= 20) return 4;
  return 2;
}

function calculateTotal(scores: RecordingScores): number {
  const rubricScores = [
    mapAzureToRubric(scores.vocabulary),
    mapAzureToRubric(scores.grammar),
    mapAzureToRubric(scores.pronunciation),
    mapAzureToRubric(scores.fluency),
    mapAzureToRubric(scores.questionHandling)
  ];
  return rubricScores.reduce((a, b) => a + b, 0);
}

function mapScoreToEPLUS(total: number): { level: string; cefr: string } {
  if (total >= 90) return { level: "EPLUS 4", cefr: "B1+" };
  if (total >= 80) return { level: "EPLUS 3", cefr: "B1" };
  if (total >= 70) return { level: "EPLUS 2", cefr: "A2+" };
  if (total >= 60) return { level: "EPLUS 1", cefr: "A2" };
  if (total >= 50) return { level: "Pre EPLUS", cefr: "A1" };
  return { level: "-", cefr: "< A1" };
}
```

---

## 6. Example

### Input (Azure/LLM Scores)
- pronunciation: 75
- fluency: 82
- vocabulary: 68
- grammar: 71
- questionHandling: 65

### Step 1: Map to Rubric
- pronunciation: 75 → 8 (Good)
- fluency: 82 → 10 (Excellent)
- vocabulary: 68 → 8 (Good)
- grammar: 71 → 8 (Good)
- questionHandling: 65 → 8 (Good)

### Step 2: Calculate Total
- Total = 8 + 10 + 8 + 8 + 8 = 42
- Average = 42 / 5 = 8.4 → Round to nearest rubric = 8

### Step 3: Determine Level
- Total 42/50 → Maps to EPLUS 2 (A2+)

---

## 7. File Structure

```
lib/ai-assessment/
├── scoring.ts      # Core scoring logic
├── types.ts        # TypeScript interfaces
├── utils.ts       # Helper functions (level, colors, comments)
├── constants.ts   # Constants
└── audio-utils.ts # Audio processing
```

---

## 8. References

- Azure Speech API: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment
- CEFR: Common European Framework of Reference for Languages
- EPLUS: VMG English's proprietary curriculum
- Company Rubric: See `docs/SCORING_RUBRIC.md`
- Azure API Docs: See `docs/ASSESSMENT_API.md`
