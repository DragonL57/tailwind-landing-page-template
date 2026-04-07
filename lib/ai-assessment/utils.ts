import type { CriterionKey, CriterionLevel, CriterionScore } from "./types";

export function scoreToLevel(score: number): CriterionLevel {
  if (score >= 9) return "Excellent";
  if (score >= 7) return "Good";
  if (score >= 5) return "Adequate";
  if (score >= 3) return "Inadequate";
  return "Weak";
}

export function levelColor(level: string) {
  switch (level) {
    case "Excellent": return "text-green-600";
    case "Good": return "text-emerald-500";
    case "Adequate": return "text-yellow-600";
    case "Inadequate": return "text-orange-500";
    default: return "text-brand-crimson";
  }
}

export function levelBg(level: string) {
  switch (level) {
    case "Excellent": return "bg-green-100 text-green-700";
    case "Good": return "bg-emerald-50 text-emerald-600";
    case "Adequate": return "bg-yellow-50 text-yellow-700";
    case "Inadequate": return "bg-orange-50 text-orange-600";
    default: return "bg-red-50 text-brand-crimson";
  }
}

export function estimateCriterion(
  criterion: CriterionKey,
  accuracyScore: number,
  fluencyScore: number,
  prosodyScore: number,
  completenessScore: number,
  wordCount: number,
  errorWords: number
): number {
  switch (criterion) {
    case "pronunciation":
      return Math.round(accuracyScore / 10);
    case "fluency":
      return Math.round(((fluencyScore * 0.6 + completenessScore * 0.4) / 10));
    case "vocabulary": {
      const vocabBase = wordCount > 15 ? 7 : wordCount > 8 ? 5 : 3;
      const vocabPenalty = (errorWords / Math.max(wordCount, 1)) * 4;
      return Math.max(1, Math.min(10, Math.round(vocabBase - vocabPenalty)));
    }
    case "grammar": {
      const grammarBase = accuracyScore > 80 ? 7 : accuracyScore > 60 ? 5 : 3;
      const grammarPenalty = (errorWords / Math.max(wordCount, 1)) * 3;
      return Math.max(1, Math.min(10, Math.round(grammarBase - grammarPenalty)));
    }
    case "questionHandling":
      return Math.round((completenessScore / 10) * 0.5 + (accuracyScore / 10) * 0.3 + (fluencyScore / 10) * 0.2);
    default:
      return 5;
  }
}

export function buildComment(criterion: string, level: string): string {
  const comments: Record<string, Record<string, string>> = {
    pronunciation: {
      Excellent: "Pronunciation rarely interferes with communication. Clear and natural.",
      Good: "Pronunciation generally does not interfere with communication.",
      Adequate: "Pronunciation sometimes interferes with communication but mostly understandable.",
      Inadequate: "Pronunciation interferes with communication. Needs focused practice.",
      Weak: "Pronunciation severely interferes with communication. Intensive practice recommended.",
    },
    fluency: {
      Excellent: "Seldom hesitates. Excellent pace and natural flow.",
      Good: "Sometimes hesitates but maintains good pace overall.",
      Adequate: "Occasional pauses and hesitation. Pace could improve.",
      Inadequate: "Frequent hesitation. Pace is inconsistent.",
      Weak: "Significant hesitation and pauses. Fluency needs substantial development.",
    },
    vocabulary: {
      Excellent: "Excellent use and range of vocabulary. Only few usage errors.",
      Good: "Some vocabulary problems that generally do not interfere with communication.",
      Adequate: "Several vocabulary problems that interfere with communication.",
      Inadequate: "Many vocabulary problems that severely interfere with communication.",
      Weak: "Very serious vocabulary problems that prevent communication.",
    },
    grammar: {
      Excellent: "Very good language control. Only few grammatical errors.",
      Good: "Good language control. Several grammatical errors evident but do not interfere.",
      Adequate: "Adequate language control. Grammatical problems interfere with communication.",
      Inadequate: "Serious language use and grammatical problems that interfere with communication.",
      Weak: "Very serious grammatical errors that prevent effective communication.",
    },
    questionHandling: {
      Excellent: "Provides good and clear responses. Excellent question comprehension.",
      Good: "Provides mostly clear responses. Good understanding of questions.",
      Adequate: "Provides adequate and often clear responses. May need to ask for clarification.",
      Inadequate: "Often provides weak responses. Serious problems with question comprehension.",
      Weak: "Provides confusing responses. Almost no question comprehension.",
    },
  };
  return comments[criterion]?.[level] || "";
}

export function createEmptyCriterion(): CriterionScore {
  return { score: 0, maxScore: 10, level: "Weak", comment: "No recording" };
}
