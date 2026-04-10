# AI Placement Test - Kế hoạch triển khai

## Tổng quan

Triển khai complete workflow cho bài đánh giá placement test theo yêu cầu kinh doanh:

1. **Bước Khảo sát**: Thu thập ngành nghề + mục tiêu
2. **Bài kiểm tra**: Đánh giá nói (Phần 1 + Phần 2)
3. **Chấm điểm & Mapping**: CEFR/EPLUS levels
4. **Phân tích Gap**: Hiện tại → Mục tiêu → Số giờ học đề xuất
5. **Kết quả**: Email + Lead cho Sales

---

## Hiện trạng

### ✅ Đã hoàn thành
- Thu thập dữ liệu khảo sát (industry, skills, target CEFR)
- Component khảo sát `survey-step.tsx`
- Ánh xạ rubric (2/4/6/8/10)
- Xác định CEFR/EPLUS level
- Tính gap & số giờ học đề xuất
- Tạo email (`email.ts`)
- API endpoint cho lead (`assessment-lead/route.ts`)
- Trang kết quả với levels, gap, email capture
- Intro page với mic test

### ⏳ Chưa hoàn thành
- Gửi email thực tế cho user (chỉ có API placeholder)
- Tích hợp CRM/Sales (chỉ log console)

---

## Các bước tiếp theo (TODO)

### Bước 1: Thu thập dữ liệu khảo sát ✅ HOÀN THÀNH

**File**: 
- `lib/ai-assessment/constants.ts` - INDUSTRIES, SKILLS, CEFR_LEVELS, HOURS_RECOMMENDATION, INDUSTRY_ROADMAPS
- `lib/ai-assessment/types.ts` - SurveyData interface
- `components/giaotiep-1-1/survey-step.tsx` - Survey component

**File**: Component mới + state

**Components**:
- `survey-step.tsx` - Chọn ngành nghề + Mục tiêu
- Thêm vào flow trước "intro"

**Danh sách ngành nghề**:
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

**Danh sách mục tiêu**:
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

### Bước 2: Cập nhật logic chấm điểm ✅ HOÀN THÀNH

**File**: `lib/ai-assessment/scoring.ts`

**Đã thêm**:
- `mapToRubric()` - Ánh xạ score 0-100 về 2/4/6/8/10
- `getEPLUSLevel()` - Xác định EPLUS level từ rubric score
- `calculateGapAndRecommendation()` - Tính gap & đề xuất giờ học
- `computePart()` - Cập nhật để dùng rubric
- `computeFullResult()` - Thêm currentLevel, targetLevel, gapHours
```typescript
export function mapToRubric(score: number): number {
  if (score >= 80) return 10;
  if (score >= 60) return 8;
  if (score >= 40) return 6;
  if (score >= 20) return 4;
  return 2;
}
```

2. Thêm ánh xạ CEFR/EPLUS:
```typescript
export function getEPLUSLevel(totalScore: number): { level: string; cefr: string } {
  // Score đã ở scale rubric (0-50)
  const percentage = (totalScore / 50) * 100;
  
  if (percentage >= 90) return { level: "EPLUS 4", cefr: "B1+" };
  if (percentage >= 80) return { level: "EPLUS 3", cefr: "B1" };
  if (percentage >= 70) return { level: "EPLUS 2", cefr: "A2+" };
  if (percentage >= 60) return { level: "EPLUS 1", cefr: "A2" };
  if (percentage >= 50) return { level: "Pre EPLUS", cefr: "A1" };
  return { level: "-", cefr: "< A1" };
}
```

3. Cập nhật `computePart()` để dùng rubric:
```typescript
// Thay vì tính trung bình raw 0-100
// Ánh xạ mỗi criterion về rubric (2,4,6,8,10), rồi tính trung bình
```

4. Cập nhật `computeFullResult()`:
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

### Bước 3: Phân tích Gap & Đề xuất ✅ HOÀN THÀNH

**Đã thêm trong `scoring.ts`**:
- HOURS_RECOMMENDATION array
- calculateGapAndRecommendation() function

---

### Bước 4: Tạo Email ✅ HOÀN THÀNH

**File**: `lib/ai-assessment/email.ts`

**Đã thêm**:
- generateAssessmentEmail() function
- AssessmentReport interface
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

### Bước 4: Tạo Email

**File**: `lib/ai-assessment/email.ts` (mới)

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

**Nội dung**:
- Subject: "Kết quả đánh giá trình độ tiếng Anh - giaotiep-1-1"
- Body: Level hiện tại, mục tiêu, đề xuất
- HTML: Báo cáo chi tiết với điểm, điểm mạnh/yếu, lộ trình

---

### Bước 5: Cập nhật trang kết quả ✅ HOÀN THÀNH

**File**: `components/giaotiep-1-1/assessment-results.tsx`

**Đã thêm**:
- EPLUS/CEFR level hiện tại
- Level mục tiêu (từ khảo sát)
- Phân tích gap
- Package đề xuất
- Form đăng ký nhận báo cáo (gửi đến API)

---

### Bước 6: API Endpoint cho Lead ✅ HOÀN THÀNH

**File**: `app/api/assessment-lead/route.ts`

**Đã thêm**:
- POST endpoint nhận lead data
- Log lead data (placeholder cho CRM integration)

---

### Bước 7: User Input (Email/Name) ✅ HOÀN THÀNH

**Đã tích hợp trong `assessment-results.tsx`**:
- Form nhập name, email, phone
- Submit đến assessment-lead API

---

### Bước 8: Intro Page với Mic Test ✅ HOÀN THÀNH

**File**: `app/(assessment)/giaotiep-1-1/danh-gia-lo-trinh/page.tsx`

**Đã thêm**:
- Giới thiệu bài đánh giá
- Mic test component
- Thông tin về AI đánh giá
- Checklist chuẩn bị

---

### Bước 6: API Endpoint cho Lead

**File**: `app/api/assessment-lead/route.ts` (mới)

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

**Hành động**:
1. Lưu lead vào database (hoặc gửi đến CRM)
2. Gửi email cho user
3. Đẩy đến đội Sales

---

### Bước 7: User Input (Email/Name)

**File**: Component mới trong results

**Thêm**:
- Input field email
- Input field tên (optional)
- Nút "Nhận kết quả qua email"

---

## Mapping Ngành nghề - Lộ trình

Dựa trên theme EPLUS, tạo lộ trình cá nhân hóa:

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

## Cấu trúc file sau thay đổi

```
lib/ai-assessment/
├── scoring.ts        # Thêm rubric mapping, CEFR, tính gap
├── types.ts         # Thêm SurveyData, AssessmentReport
├── utils.ts         # (hiện có)
├── constants.ts     # Thêm INDUSTRIES, GOALS, HOURS_RECOMMENDATION, INDUSTRY_ROADMAPS
├── email.ts         # MỚI - Tạo email
└── audio-utils.ts  # (hiện có)

components/giaotiep-1-1/
├── survey-step.tsx       # MỚI - Chọn ngành nghề/mục tiêu
├── assessment-results.tsx # CẬP NHẬT - Thêm levels, gap, email
└── ...

app/api/
├── assessment-lead/route.ts  # MỚI - Thu thập lead
└── ...
```

---

## Data Flow

```
[Khảo sát: Ngành nghề + Mục tiêu]
       ↓
[Bài kiểm tra: Phần 1 + Phần 2]
       ↓
[Azure + LLM Scoring]
       ↓
[Ánh xạ Rubric (2,4,6,8,10)]
       ↓
[Xác định CEFR/EPLUS Level]
       ↓
[Phân tích Gap → Số giờ học đề xuất]
       ↓
[Hiển thị kết quả + Email + Lead]
```

---

## Thứ tự triển khai

1. **constants.ts** - Thêm INDUSTRIES, GOALS, HOURS_RECOMMENDATION, INDUSTRY_ROADMAPS
2. **types.ts** - Thêm interface SurveyData, AssessmentReport
3. **scoring.ts** - Thêm rubric mapping, ánh xạ CEFR, tính gap
4. **email.ts** - Thêm tạo email
5. **survey-step.tsx** - Component khảo sát mới
6. **ai-assessment.tsx** - Thêm khảo sát vào flow
7. **assessment-results.tsx** - Cập nhật hiển thị
8. **assessment-lead/route.ts** - API endpoint mới
9. **Cập nhật test coverage** - Thêm tests cho functions mới

---

## Tham khảo Mapping giá

### 1. Học phí theo khóa

| Cấp độ (Khóa) | Giờ học GV /khóa | Kiểm soát chất lượng lớp học /khóa | TK Hệ thống |
| :--- | :---: | :---: | :---: |
| **A1/A2** | 36 | 4h | [x] |
| **B1/B2** | 72 | 4h | [x] |
| **C1** | 72 | 4h | [x] |

### 2. Học phí theo lộ trình

| Lộ trình | Số khóa /lộ trình | Giờ học GV /lộ trình | Kiểm soát chất lượng /lộ trình | TK Hệ thống |
| :--- | :---: | :---: | :---: | :---: |
| **A1 -> C1** | 5 | 288 | 20 giờ | [x] |
| **A1 -> B2** | 4 | 216 | 16 giờ | [x] |
| **A1 -> B1** | 3 | 144 | 12 giờ | [x] |
| **A2 -> C1** | 4 | 252 | 16 giờ | [x] |
| **A2 -> B2** | 3 | 180 | 12 giờ | [x] |
| **A2 -> B1** | 2 | 108 | 8 giờ | [x] |

### 3. Mapping EPLUS Level

| EPLUS Level | CEFR Equivalent |
| :--- | :---: |
| Pre EPLUS | A1 |
| EPLUS 1 | A2 |
| EPLUS 2 | A2+ |
| EPLUS 3 | B1 |
| EPLUS 4 | B1+ |

### 4. Đề xuất giờ học theo gap CEFR

| Gap CEFR | Số giờ học | Package |
| :--- | :---: | :---: |
| 0 | 0 | Không cần học |
| 0.5 | 36 | Gói 36h |
| 1 | 60 | Gói 60h |
| 1.5 | 72 | Gói 72h |
| 2 | 120 | Gói 120h |
| > 2 | 180 | Gói 180h |

---

## Course Roadmap (Lộ trình khóa học)

### Cấu trúc khóa A1 (24 lessons)

| Unit | Lesson | Topics | Vocabulary | Grammar |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 1-2 | First meetings | Introductions, Numbers 1-10 | Verb be (I/you/we/they) |
| 2 | 3-4 | Questions | The alphabet, Question words | this/that/these/those |
| 3 | 5-6 | People & possessions | Family, Jobs | have got, possessive 's |
| 4 | 7-8 | My life | Daily activities | Present simple |
| 5 | 9-10 | Style & design | Colours, Clothes | Adverbs of frequency |
| 6 | 11-12 | Places & facilities | Places in a town | there is/are |
| 7 | 13-14 | Skills & interests | Abilities, Hobbies | can/can't |
| 8 | 15-16 | Our past | Dates, Past time | Past simple (was/were) |
| 9 | 17-18 | Unusual stories | Adjectives | Past simple irregular |
| 10 | 19-20 | New places | Future time | going to |
| - | 21 | Review Unit 1-10 | - | - |
| - | 22 | Mid-term Test | - | - |
| - | 23 | Review Unit 1-10 | - | - |
| - | 24 | Final Test | - | - |

### Add-on Modules (tùy chọn theo nhu cầu)

| Add-on | Topics | Ghi chú |
| :--- | :--- | :--- |
| Travelling abroad | plane, flight, airport, journey, ticket, passport | Cho ngành airline, logistics |
| Check in at the Airport | boarding pass, luggage, window/aisle seat | Thực hành check-in |
| Airport security | passport, scanner, security check | Quan trọng cho travel |
| Presentation | Tips for a smooth airport experience | Cho hotel, airline |

---

## Cá nhân hóa lộ trình (DỰ KIẾN)

AI sẽ lồng ghép các yếu tố từ khảo sát vào lộ trình:

### Theo ngành nghề

| Ngành | Chủ đề ưu tiên thêm |
| :--- | :--- |
| **Airline** | Airport scenarios, check-in, boarding announcements |
| **Hotel** | Reception, booking, room service, guest complaints |
| **Logistics** | Warehouse communication, shipping terms, driver communication |
| **Retail** | Product consultation, checkout, customer complaints |
| **Banking** | Transaction procedures, customer service, financial terms |
| **Tech** | Technical demos, project communication, team meetings |
| **Healthcare** | Patient communication, medical terms, instructions |
| **General** | Daily conversation, small talk, job interviews |

### Theo kỹ năng

| Kỹ năng | Module thêm |
| :--- | :--- |
| Professional email | Cấu trúc viết email |
| Fluent communication | Luyện thảo luận, debates |
| Job interview | Tình huống phỏng vấn, review CV |
| Presentation | Kỹ năng thuyết trình |
| Travel | Tình huống sân bay, khách sạn, nhà hàng |
| Daily conversation | Small talk, giao tiếp xã hội |

### Ví dụ lộ trình cá nhân hóa

```
[User Survey]
- Industry: Hotel
- Skills: [Giao tiếp trôi chảy, Xử lý khiếu nại khách]
- Target: B1

[Generated Roadmap - DỰ KIẾN]
1. Unit 1-2: Basic introductions (giữ nguyên)
2. Unit 3-4: Daily activities (giữ nguyên)
3. ADD-ON: Hotel check-in scenarios
4. Unit 5-6: Places (giữ nguyên)
5. ADD-ON: Reception & booking practice
6. Unit 7-8: Past tense (giữ nguyên)
7. ADD-ON: Handling guest complaints
8. ADD-ON: Fluent communication practice
...
```

### Ghi chú quan trọng

- **Lộ trình này là DỰ KIẾN** - sẽ được điều chỉnh khi vào lớp học thực tế
- Giáo viên hoặc chuyên viên tư vấn sẽ điều chỉnh lộ trình sau khi đánh giá đầu vào tại lớp
- Các Add-on modules có thể được thêm/bớt tùy theo nhu cầu thực tế của học viên
