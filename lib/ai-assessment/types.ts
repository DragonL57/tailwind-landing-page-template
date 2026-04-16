import type { IndustryId, SkillId, GoalId } from "./constants";

export type CriterionLevel = "Excellent" | "Good" | "Adequate" | "Inadequate" | "Weak";

export type CriterionKey = "vocabulary" | "grammar" | "pronunciation" | "fluency" | "prosody" | "completeness" | "questionHandling" | "overall";

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

export interface RawRecording {
  audioBlob: Blob;
  reference: string;
  transcript: string;
  scenarioPrompt?: string;
  isPart1: boolean;
}

export interface StoredRecording {
  audioBlob: Blob;
  reference: string;
  transcript: string;
  scores: RecordingScores;
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

export interface AzureResult {
  transcript: string;
  accuracyScore: number;
  fluencyScore: number;
  completenessScore: number;
  prosodyScore: number;
  pronScore: number;
}

export interface LlmScore {
  vocabulary: number;
  grammar: number;
  questionHandling: number;
}

export interface RecordingScores {
  vocabulary: number;
  grammar: number;
  pronunciation: number;
  fluency: number;
  prosody: number;
  completeness: number;
  questionHandling: number;
  overall: number;
}

export interface BatchTranscript {
  transcript: string;
  referenceText: string;
  scenarioPrompt?: string;
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
  isTargetNotSure?: boolean;
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
