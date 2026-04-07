export type CriterionLevel = "Excellent" | "Good" | "Adequate" | "Inadequate" | "Weak";

export type CriterionKey = "vocabulary" | "grammar" | "pronunciation" | "fluency" | "prosody" | "questionHandling";

export type AssessmentPhase = "intro" | "part1" | "part2" | "processing" | "results";

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

export interface FullResult {
  part1: PartResult;
  part2: PartResult;
  grandTotal: number;
  grandMax: number;
}
