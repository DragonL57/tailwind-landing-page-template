export const PART1_SENTENCES = [
  "Good morning. Could you please introduce yourself and tell me about your daily routine?",
  "What do you enjoy doing in your free time and why?",
  "Could you describe your favorite place to visit and what makes it special?",
];

export const PART2_SCENARIOS = [
  {
    scenario: "At a Restaurant",
    prompt: "You are ordering food at a restaurant. Talk about what you'd like to order, ask about today's specials, dietary restrictions, or anything related to dining out.",
  },
  {
    scenario: "Job Interview",
    prompt: "You are at a job interview. Talk about your background, strengths, career goals, and why you're interested in this position.",
  },
  {
    scenario: "Making a Phone Call",
    prompt: "You need to call a hotel to book a room. Talk about your travel plans, what kind of room you need, your budget, and any questions you have.",
  },
];

export const CRITERIA_NAMES = [
  "Vocabulary",
  "Grammar",
  "Pronunciation",
  "Fluency",
  "Question Handling",
];

export type IndustryId = "logistics" | "airline" | "hotel" | "retail" | "banking" | "tech" | "healthcare" | "general";

export interface Industry {
  id: IndustryId;
  label: string;
  labelVi: string;
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

export type GoalId = "professional-email" | "fluent-communication" | "cefr-b1" | "cefr-b2" | "cefr-c1" | "cefr-c2";

export interface Goal {
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

export type SkillId = "professional-email" | "fluent-communication" | "job-interview" | "presentation" | "travel" | "daily-conversation";

export interface Skill {
  id: SkillId;
  label: string;
  labelVi: string;
}

export const SKILLS: Skill[] = [
  { id: "professional-email", label: "Viết email chuyên nghiệp", labelVi: "Professional Email Writing" },
  { id: "fluent-communication", label: "Giao tiếp trôi chảy với đối tác", labelVi: "Fluent Communication with Partners" },
  { id: "job-interview", label: "Phỏng vấn xin việc", labelVi: "Job Interview" },
  { id: "presentation", label: "Thuyết trình", labelVi: "Presentation" },
  { id: "travel", label: "Giao tiếp khi du lịch", labelVi: "Travel Communication" },
  { id: "daily-conversation", label: "Giao tiếp hàng ngày", labelVi: "Daily Conversation" },
];

export type CEFRLevelId = "not-sure" | "a1" | "a2" | "b1" | "b2" | "c1" | "c2";

export interface CEFRLevel {
  id: CEFRLevelId;
  label: string;
  labelVi: string;
  targetCEFR: string;
}

export const CEFR_LEVELS: CEFRLevel[] = [
  { id: "not-sure", label: "Tôi chưa biết", labelVi: "I'm not sure", targetCEFR: "B1" },
  { id: "a1", label: "Đạt trình độ A1", labelVi: "Achieve A1 Level", targetCEFR: "A1" },
  { id: "a2", label: "Đạt trình độ A2", labelVi: "Achieve A2 Level", targetCEFR: "A2" },
  { id: "b1", label: "Đạt trình độ B1", labelVi: "Achieve B1 Level", targetCEFR: "B1" },
  { id: "b2", label: "Đạt trình độ B2", labelVi: "Achieve B2 Level", targetCEFR: "B2" },
  { id: "c1", label: "Đạt trình độ C1", labelVi: "Achieve C1 Level", targetCEFR: "C1" },
  { id: "c2", label: "Đạt trình độ C2", labelVi: "Achieve C2 Level", targetCEFR: "C2" },
];

export interface HoursRecommendation {
  maxGap: number;
  hours: number;
  label: string;
  labelVi: string;
}

export const HOURS_RECOMMENDATION: HoursRecommendation[] = [
  { maxGap: 0, hours: 0, label: "Không cần học", labelVi: "No study required" },
  { maxGap: 0.5, hours: 36, label: "Gói 36h", labelVi: "36h Package" },
  { maxGap: 1, hours: 60, label: "Gói 60h", labelVi: "60h Package" },
  { maxGap: 1.5, hours: 72, label: "Gói 72h", labelVi: "72h Package" },
  { maxGap: 2, hours: 120, label: "Gói 120h", labelVi: "120h Package" },
  { maxGap: Infinity, hours: 180, label: "Gói 180h", labelVi: "180h Package" },
];

export const INDUSTRY_ROADMAPS: Record<IndustryId, string[]> = {
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

export const THRESHOLDS = {
  excellent: 80,
  good: 60,
  adequate: 40,
  inadequate: 20,
};

export const ASSESSMENT_PHASES = {
  SURVEY: "survey",
  INTRO: "intro",
  PART1: "part1",
  PART2: "part2",
  LEAD: "lead",
  PROCESSING: "processing",
  RESULTS: "results",
} as const;

export type AssessmentPhase = (typeof ASSESSMENT_PHASES)[keyof typeof ASSESSMENT_PHASES];

export const ROUTE_MAP: Record<AssessmentPhase, string> = {
  [ASSESSMENT_PHASES.SURVEY]: "/giaotiep-1-1/danh-gia-lo-trinh/khao-sat",
  [ASSESSMENT_PHASES.INTRO]: "/giaotiep-1-1/danh-gia-lo-trinh/gioi-thieu",
  [ASSESSMENT_PHASES.PART1]: "/giaotiep-1-1/danh-gia-lo-trinh/test",
  [ASSESSMENT_PHASES.PART2]: "/giaotiep-1-1/danh-gia-lo-trinh/test",
  [ASSESSMENT_PHASES.LEAD]: "/giaotiep-1-1/danh-gia-lo-trinh/test",
  [ASSESSMENT_PHASES.PROCESSING]: "/giaotiep-1-1/danh-gia-lo-trinh/test",
  [ASSESSMENT_PHASES.RESULTS]: "/giaotiep-1-1/danh-gia-lo-trinh/test",
};

export const SESSION_STORAGE_KEYS = {
  SURVEY_DATA: "surveyData",
  ASSESSMENT_RESULT: "assessmentResult",
} as const;
