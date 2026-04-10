# ePLUS Speaking Rubric

## Scoring System

### Overview

| Part | Max Score | Criteria | Each Criterion |
|------|----------|----------|---------------|
| Part 1: Interview | 50 pts | 5 | /10 |
| Part 2: Role Play | 50 pts | 5 | /10 |
| **Total** | **100 pts** | **5** | **/10** |

---

## Criteria Description

### 1. Vocabulary

| Score | Level | Description |
|-------|-------|-------------|
| 10 | Excellent | Excellent use/range of vocabulary. Only few usage errors |
| 8 | Good | Some vocabulary problems that generally do not interfere with communication |
| 6 | Adequate | Several vocabulary problems that interfere with communication |
| 4 | Inadequate | Many vocabulary problems that severely interfere with communication |
| 2 | Weak | Very serious vocabulary problems that prevent communication |

### 2. Grammar

| Score | Level | Description |
|-------|-------|-------------|
| 10 | Excellent | Very good language control. Only few grammatical errors |
| 8 | Good | Good language control. Several grammatical errors are evident but generally do not interfere with communication |
| 6 | Adequate | Adequate language control. Grammatical problems that interfere with communication |
| 4 | Inadequate | Serious language use/grammatical problems that interfere with communication |
| 2 | Weak | Very serious grammatical errors that interfere with communication |

### 3. Pronunciation

| Score | Level | Description |
|-------|-------|-------------|
| 10 | Excellent | Pronunciation rarely interferes with communication |
| 8 | Good | Pronunciation does generally not interfere with communication |
| 6 | Adequate | Pronunciation sometimes interferes with communication |
| 4 | Inadequate | Pronunciation interferes with communication |
| 2 | Weak | Pronunciation severely interferes with communication |

### 4. Fluency

| Score | Level | Description |
|-------|-------|-------------|
| 10 | Excellent | Seldom hesitates while speaking, excellent pace |
| 8 | Good | Sometimes hesitates while speaking, good pace |
| 6 | Adequate | Sometimes provides responses that lack clarity. Needs to ask for clarification |
| 4 | Inadequate | Often provides responses that are weak, has serious problems with question comprehension. Needs clarification very often |
| 2 | Weak | Provides confusing responses. Needs clarification very often, even for basic questions |

### 5. Question Handling

| Score | Level | Description |
|-------|-------|-------------|
| 10 | Excellent | Provides good and clear responses |
| 8 | Good | Provides mostly clear responses |
| 6 | Adequate | Provides adequate and often clear responses. May need to ask for clarification |
| 4 | Inadequate | Often provides responses that are weak, has serious problems with question comprehension. Needs clarification very often |
| 2 | Weak | Provides confusing responses, demonstrates almost no question comprehension. Needs clarification very often, for basic questions |

---

## Score Calculation

### Formula

```
Total Score = Part 1 Score + Part 2 Score

Part 1 Score = vocabulary + grammar + pronunciation + fluency + questionHandling
Part 2 Score = vocabulary + grammar + pronunciation + fluency + questionHandling
```

Each criterion scored: 2, 4, 6, 8, or 10

### Score Distribution

| Level | Points per Criterion | Total |
|-------|----------------|-------|
| Excellent | 10 | 50/50 |
| Good | 8 | 40/50 |
| Adequate | 6 | 30/50 |
| Inadequate | 4 | 20/50 |
| Weak | 2 | 10/50 |

---

## Mapping to Azure Scores

### Current System

Azure API returns 0-100 for each criterion. Need mapping to rubric (2, 4, 6, 8, 10).

### Proposed Mapping

| Azure Score (0-100) | Rubric Score | Level |
|---------------------|-------------|-------|
| 80-100 | 10 | Excellent |
| 60-79 | 8 | Good |
| 40-59 | 6 | Adequate |
| 20-39 | 4 | Inadequate |
| 0-19 | 2 | Weak |

---

## CEFR Mapping

CEFR (Common European Framework of Reference) mapped to EPLUS levels.

### EPLUS Learning Path

| Level | CEFR | Description |
|-------|------|-------------|
| Pre EPLUS | A1 | Giao tiếp sinh tồn, nền tảng căn bản |
| EPLUS 1 | A2 | Giao tiếp hàng ngày, hội thoại quen thuộc |
| EPLUS 2 | A2+ | Giao tiếp chức năng trong đời sống và công việc |
| EPLUS 3 | B1 | Giao tiếp mở rộng, xử lý tình huống, logic hơn |
| EPLUS 4 | B1+ | Giao tiếp độc lập, chuyên nghiệp hơn, bày tỏ quan điểm rõ ràng |

### Total Score to EPLUS/CEFR

| Total Score (100) | Rubric Level | EPLUS Level | CEFR |
|------------------|-------------|------------|------|
| 90-100 | Excellent | EPLUS 4 | B1+ |
| 80-89 | Excellent | EPLUS 3 | B1 |
| 70-79 | Good | EPLUS 2 | A2+ |
| 60-69 | Good | EPLUS 1 | A2 |
| 50-59 | Adequate | Pre EPLUS | A1 |
| 40-49 | Inadequate | Pre EPLUS | A1 |
| 20-39 | Weak | - | < A1 |
| 0-19 | Weak | - | < A1 |

### Per Criterion Score to CEFR

| Rubric Score | Percentage | CEFR Level | EPLUS |
|------------|-----------|-----------|-------|
| 10 | 80-100% | B1 | EPLUS 3-4 |
| 8 | 60-79% | A2+ | EPLUS 2 |
| 6 | 40-59% | A2 | EPLUS 1 |
| 4 | 20-39% | A1 | Pre EPLUS |
| 2 | 0-19% | < A1 | - |

---

## Notes

- This rubric is used for both Part 1 (Interview) and Part 2 (Role Play)
- Each part is worth 50 points
- Total assessment: 100 points
- Evaluation form uses same criteria but totals to /100
- CEFR/EPLUS mapping provides internationally recognized proficiency levels
- Final level recommendation based on total score
