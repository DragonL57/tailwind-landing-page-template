import type { CriterionKey, CriterionScore } from "./types";
import { HOURS_RECOMMENDATION, INDUSTRY_ROADMAPS, type IndustryId } from "./constants";

export function mapToRubric(score: number): number {
  if (score <= 0) return 0;
  return Math.round(score) / 10;
}

export function getCEFRLevel(percentage: number): { cefr: string; level: string } {
  if (percentage >= 90) return { cefr: "B1+", level: "EPLUS 4" };
  if (percentage >= 80) return { cefr: "B1", level: "EPLUS 3" };
  if (percentage >= 70) return { cefr: "A2+", level: "EPLUS 2" };
  if (percentage >= 60) return { cefr: "A2", level: "EPLUS 1" };
  if (percentage >= 40) return { cefr: "A1", level: "Pre EPLUS" };
  return { cefr: "< A1", level: "-" };
}

const CEFR_ORDER = ["< A1", "A1", "A2", "A2+", "B1", "B1+", "B2", "C1", "C2"];

export function calculateGapAndRecommendation(
  currentCEFR: string,
  targetCEFR: string
): { gap: number; recommendedHours: number; packageLabel: string; adjustedTarget?: string } {
  const currentIdx = CEFR_ORDER.indexOf(currentCEFR);
  let targetIdx = CEFR_ORDER.indexOf(targetCEFR);
  let adjustedTarget = undefined;

  // Business Logic: If user reached or exceeded target, encourage them to reach the NEXT level
  if (currentIdx >= targetIdx) {
    targetIdx = Math.min(currentIdx + 1, CEFR_ORDER.length - 1);
    adjustedTarget = CEFR_ORDER[targetIdx];
  }

  const gap = Math.max(0.5, targetIdx - currentIdx); // Minimum gap of 0.5 to ensure a package is always recommended
  
  const rec = HOURS_RECOMMENDATION.find(h => gap <= h.maxGap);
  return { 
    gap, 
    recommendedHours: rec?.hours ?? 180, 
    packageLabel: rec?.label ?? "Gói 180h",
    adjustedTarget
  };
}

export function getRoadmap(industry: IndustryId): string[] {
  return INDUSTRY_ROADMAPS[industry] || INDUSTRY_ROADMAPS.general;
}

export function getStrengthsAndWeaknesses(criteria: Record<CriterionKey, CriterionScore>): { strengths: string[]; weaknesses: string[] } {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  Object.values(criteria).forEach((c) => {
    if (c.score >= 8) {
      strengths.push(c.comment);
    } else if (c.score <= 4 && c.score !== -1 && c.score !== 0) {
      weaknesses.push(c.comment);
    }
  });
  
  return { strengths, weaknesses };
}

export const PART1_CRITERIA: CriterionKey[] = [
  "pronunciation",
  "fluency",
  "prosody",
  "completeness",
  "overall",
];

export const PART2_CRITERIA: CriterionKey[] = [
  "vocabulary",
  "grammar",
  "questionHandling",
  "pronunciation",
  "fluency",
];