import type { IndustryId, SkillId, GoalId } from "./constants";

export type CriterionLevel = "Excellent" | "Good" | "Adequate" | "Inadequate" | "Weak";

export type CriterionKey = "vocabulary" | "grammar" | "pronunciation" | "fluency" | "prosody" | "completeness" | "questionHandling";

export type AssessmentPhase = "survey" | "intro" | "part1" | "part2" | "processing" | "results";

export interface SurveyData {
  industry: IndustryId;
  skills: SkillId[];
  targetCEFR: string;
}

export interface CriterionScore {
  score: number;
  maxScore: number;
  level: CriterionLevel;
  comment: string;
}

export interface StoredRecording {
  audioBlob: Blob;
  reference: string;
}

export interface PartResult {
  name: string;
  criteria: Record<CriterionKey, CriterionScore>;
  total: number;
  maxTotal: number;
}

export interface LevelInfo {
  cefr: string;
}

export interface FullResult {
  part1: PartResult;
  part2: PartResult;
  grandTotal: number;
  grandMax: number;
  currentLevel: LevelInfo;
  targetLevel: LevelInfo;
  gapHours: number;
  packageLabel: string;
  rubricScores: { part1: number; part2: number; total: number };
}

export interface AssessmentReport {
  userEmail?: string;
  userName?: string;
  industry: IndustryId;
  goal: GoalId;
  currentLevel: LevelInfo;
  targetLevel: LevelInfo;
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
