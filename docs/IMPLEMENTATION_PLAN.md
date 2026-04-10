# AI Placement Test - Implementation Plan

## Overview

Implement complete AI placement test workflow according to business requirements:

1. **Survey Step**: Capture industry/job + goal
2. **Placement Test**: Speaking assessment (Part 1 + Part 2)
3. **Scoring & Mapping**: CEFR/EPLUS levels
4. **Gap Analysis**: Current → Target distance → recommended hours
5. **Results Output**: Email + Sales lead

---

## Current State

### What's Working
- Audio recording (Part 1 + Part 2)
- Azure Speech API integration
- LUMS content scoring
- Results display

### What's Missing
- Survey step (industry/goal)
- Rubric mapping (2/4/6/8/10 instead of raw 0-100)
- CEFR/EPLUS level determination
- Gap calculation (current → target)
- Recommended hours calculation
- Email generation
- Lead push to Sales

---

## Implementation Steps

### Step 1: Survey Data Capture

**File**: New component + state

**Components**:
- `survey-step.tsx` - Industry selection + Goal selection
- Add to assessment flow before "intro"

**Industry List** (from workflow doc):
```typescript
type IndustryId = "logistics" | "airline" | "hotel" | "retail" | "banking" | "tech" | "healthcare" | "general";

interface Industry {
  id: IndustryId;
  label: string;
  labelVi: string;
  icon?: string;
}

export const INDUSTRIES: Industry[] = [
  { id: "logistics", label: "Logistics", labelVi: "Logistics" },
  { id: "airline", label: "Hàng không", labelVi: "Aviation" },
  { id: "hotel", label: "Khách sạn", labelVi: "Hotel & Hospitality" },
  { id: "retail", label: "Bán lẻ", labelVi: "Retail" },
  { id: "banking", label: "Ngân hàng", labelVi: "Banking & Finance" },
  { id: "tech", label: "Công nghệ", labelVi: "Technology" },
  { id: "healthcare", label: "Y tế", labelVi: "Healthcare" },
  { id: "general", label: "Chung", labelVi: "General" },
];
```

**Goal List** (from workflow doc):
```typescript
type GoalId = "professional-email" | "fluent-communication" | "cefr-b1" | "cefr-b2" | "cefr-c1" | "cefr-c2";

interface Goal {
  id: GoalId;
  label: string;
  labelVi: string;
  targetCEFR: string;
}

export const GOALS: Goal[] = [
  { id: "professional-email", label: "Viết email chuyên nghiệp", labelVi: "Professional Email Writing", targetCEFR: "B1" },
  { id: "fluent-communication", label: "Giao tiếp trôi chảy với đối tác", labelVi: "Fluent Communication with Partners", targetCEFR: "B1+" },
  { id: "cefr-b1", label: "Đạt trình độ B1", labelVi: "Achieve B1 Level", targetCEFR: "B1" },
  { id: "cefr-b2", label: "Đạt trình độ B2", labelVi: "Achieve B2 Level", targetCEFR: "B2" },
  { id: "cefr-c1", label: "Đạt trình độ C1", labelVi: "Achieve C1 Level", targetCEFR: "C1" },
  { id: "cefr-c2", label: "Đạt trình độ C2", labelVi: "Achieve C2 Level", targetCEFR: "C2" },
];
```

**State**:
```typescript
interface SurveyData {
  industry: IndustryId;
  goal: GoalId;
}
```

---

### Step 2: Update Scoring Logic

**File**: `lib/ai-assessment/scoring.ts`

**Changes**:

1. Add rubric mapping function:
```typescript
export function mapToRubric(score: number): number {
  if (score >= 80) return 10;
  if (score >= 60) return 8;
  if (score >= 40) return 6;
  if (score >= 20) return 4;
  return 2;
}
```

2. Add CEFR/EPLUS mapping:
```typescript
export function getEPLUSLevel(totalScore: number): { level: string; cefr: string } {
  // Score here is already in rubric scale (0-50)
  const percentage = (totalScore / 50) * 100;
  
  if (percentage >= 90) return { level: "EPLUS 4", cefr: "B1+" };
  if (percentage >= 80) return { level: "EPLUS 3", cefr: "B1" };
  if (percentage >= 70) return { level: "EPLUS 2", cefr: "A2+" };
  if (percentage >= 60) return { level: "EPLUS 1", cefr: "A2" };
  if (percentage >= 50) return { level: "Pre EPLUS", cefr: "A1" };
  return { level: "-", cefr: "< A1" };
}
```

3. Update `computePart()` to use rubric:
```typescript
// Instead of averaging raw 0-100 scores
// Map each criterion to rubric (2,4,6,8,10), then average
```

4. Update `computeFullResult()`:
```typescript
export interface FullResult {
  // ...existing
  currentLevel: { level: string; cefr: string };
  targetLevel: { level: string; cefr: string };
  gapHours: number;
  rubricScores: { part1: number; part2: number; total: number };
}
```

---

### Step 3: Gap Analysis & Recommendation

**File**: `lib/ai-assessment/scoring.ts`

**Hours Packages** (from workflow doc: 36h, 60h, 72h, 120h, 180h):
```typescript
export const HOURS_RECOMMENDATION = [
  { maxGap: 0, hours: 0, label: "Không cần học", labelVi: "No study required" },
  { maxGap: 0.5, hours: 36, label: "Gói 36h", labelVi: "36h Package" },
  { maxGap: 1, hours: 60, label: "Gói 60h", labelVi: "60h Package" },
  { maxGap: 1.5, hours: 72, label: "Gói 72h", labelVi: "72h Package" },
  { maxGap: 2, hours: 120, label: "Gói 120h", labelVi: "120h Package" },
  { maxGap: Infinity, hours: 180, label: "Gói 180h", labelVi: "180h Package" },
];

export function calculateGapAndRecommendation(
  currentCEFR: string,
  targetCEFR: string
): { gap: number; recommendedHours: number; packageLabel: string } {
  const cefrLevels = ["< A1", "A1", "A2", "A2+", "B1", "B1+", "B2", "C1", "C2"];
  const currentIdx = cefrLevels.indexOf(currentCEFR);
  const targetIdx = cefrLevels.indexOf(targetCEFR);
  const gap = Math.max(0, targetIdx - currentIdx);
  
  const rec = HOURS_RECOMMENDATION.find(h => gap <= h.maxGap);
  return { 
    gap, 
    recommendedHours: rec?.hours ?? 180, 
    packageLabel: rec?.label ?? "Gói 180h" 
  };
}
```

---

### Step 4: Email Generation

**File**: `lib/ai-assessment/email.ts` (new)

**Function**:
```typescript
export interface AssessmentReport {
  userEmail?: string;
  userName?: string;
  industry: string;
  goal: string;
  currentLevel: { level: string; cefr: string };
  targetLevel: { level: string; cefr: string };
  gapHours: number;
  packageLabel: string;
  scores: {
    pronunciation: number;
    fluency: number;
    vocabulary: number;
    grammar: number;
    questionHandling: number;
  };
  strengths: string[];
  weaknesses: string[];
  roadmap: string[];
}

export function generateAssessmentEmail(report: AssessmentReport): {
  subject: string;
  body: string;
  html: string;
};
```

**Content**:
- Subject: "Kết quả đánh giá trình độ tiếng Anh - giaotiep-1-1"
- Body: Current level, target level, recommendation
- HTML: Detailed report with scores, strengths, weaknesses, roadmap

---

### Step 5: Results Page Update

**File**: `components/giaotiep-1-1/assessment-results.tsx`

**Add to display**:
- Current EPLUS/CEFR level
- Target level (from survey)
- Gap analysis
- Recommended package
- "Register Now" CTA
- Email button

---

### Step 6: API Endpoint for Lead

**File**: `app/api/assessment-lead/route.ts` (new)

**POST**:
```json
{
  "email": "user@email.com",
  "name": "User Name",
  "industry": "logistics",
  "goal": "cefr-b2",
  "currentLevel": "A2",
  "targetLevel": "B2",
  "gapHours": 120,
  "scores": { ... }
}
```

**Action**:
1. Save lead to database (or send to CRM)
2. Trigger email to user
3. Push to Sales team

---

### Step 7: User Input (Email/Name)

**File**: New component in results

**Add**:
- Email input field
- Name input field (optional)
- "Nhận kết quả qua email" button

---

## Industry-to-Roadmap Mapping

Based on EPLUS themes, create personalized roadmap:

```typescript
export const INDUSTRY_ROADMAPS: Record<string, string[]> = {
  logistics: [
    "Giao tiếp hàng ngày trong kho",
    "Mô tả quy trình vận chuyển",
    "Thông tin xuất/nhập hàng",
    "Giao tiếp với lái xe",
    "Báo cáo tồn kho",
  ],
  airline: [
    "Chào hỏi hành khách",
    "Thông tin chuyến bay",
    "Hỗ trợ hành lý",
    "Xử lý khiếu nại",
    "An toàn hàng không",
  ],
  hotel: [
    "Tiếp đón khách",
    "Nhận đặt phòng",
    "Hỗ trợ phòng",
    "Giải quyết khiếu nại",
    "Thanh toán",
  ],
  retail: [
    "Chào hỏi khách hàng",
    "Tư vấn sản phẩm",
    "Mô tả sản phẩm",
    "Thanh toán",
    "Xử lý khiếu nại",
  ],
  banking: [
    "Chào hỏi khách hàng",
    "Tư vấn sản phẩm",
    "Giải thích thủ tục",
    "Xử lý giao dịch",
    "An ninh tài chính",
  ],
  tech: [
    "Giao tiếp trong dự án",
    "Mô tả sản phẩm",
    "Hỗ trợ kỹ thuật",
    "Demo sản phẩm",
    "Họp team",
  ],
  healthcare: [
    "Chào hỏi bệnh nhân",
    "Hỏi triệu chứng",
    "Hướng dẫn thủ thuật",
    "Giải thích điều trị",
    "Tư vấn sức khỏe",
  ],
  general: [
    "Giao tiếp hàng ngày",
    "Small talk",
    "Phỏng vấn",
    "Thuyết trình",
    "Email chuyên nghiệp",
  ],
};
```

---

## File Structure After Changes

```
lib/ai-assessment/
├── scoring.ts        # Add rubric mapping, CEFR, gap calc
├── types.ts         # Add SurveyData, AssessmentReport
├── utils.ts         # (existing)
├── constants.ts     # Add INDUSTRIES, GOALS, HOURS_RECOMMENDATION, INDUSTRY_ROADMAPS
├── email.ts         # NEW - Email generation
└── audio-utils.ts   # (existing)

components/giaotiep-1-1/
├── survey-step.tsx       # NEW - Industry/Goal selection
├── assessment-results.tsx # UPDATE - Add levels, gap, email
└── ...

app/api/
├── assessment-lead/route.ts  # NEW - Lead capture
└── ...
```

---

## Data Flow

```
[Survey: Industry + Goal]
       ↓
[Placement Test: Part 1 + Part 2]
       ↓
[Azure + LLM Scoring]
       ↓
[Rubric Mapping (2,4,6,8,10)]
       ↓
[CEFR/EPLUS Level Determination]
       ↓
[Gap Analysis → Recommended Hours]
       ↓
[Results Display + Email + Lead]
```

---

## Implementation Order

1. **constants.ts** - Add INDUSTRIES, GOALS, HOURS_RECOMMENDATION, INDUSTRY_ROADMAPS
2. **types.ts** - Add SurveyData, AssessmentReport interfaces
3. **scoring.ts** - Add rubric mapping, CEFR mapping, gap calculation
4. **email.ts** - Add email generation
5. **survey-step.tsx** - New survey component
6. **ai-assessment.tsx** - Add survey to flow
7. **assessment-results.tsx** - Update display
8. **assessment-lead/route.ts** - New API endpoint
9. **Update test coverage** - Add tests for new functions
