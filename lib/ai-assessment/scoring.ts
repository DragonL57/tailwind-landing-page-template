import type { CriterionKey, CriterionScore, PartResult, FullResult } from "@/lib/ai-assessment/types";
import { scoreToLevel, buildComment, createEmptyCriterion } from "@/lib/ai-assessment/utils";

export interface RecordingScores {
  pronunciation: number;
  fluency: number;
  vocabulary: number;
  grammar: number;
  questionHandling: number;
}

export interface StoredRecording {
  audioBlob: Blob;
  reference: string;
  transcript: string;
  scores: RecordingScores;
}

export function scoresToRecordingScores(
  accuracyScore: number,
  fluencyScore: number,
  vocabulary: number,
  grammar: number,
  questionHandling: number
): RecordingScores {
  const to10 = (v: number) => Math.max(1, Math.min(10, Math.round(v / 10)));

  return {
    pronunciation: to10(accuracyScore),
    fluency: to10(fluencyScore),
    vocabulary: to10(vocabulary),
    grammar: to10(grammar),
    questionHandling: to10(questionHandling),
  };
}

export async function fetchContentScores(transcript: string, referenceText: string, scenarioPrompt?: string): Promise<{ vocabulary: number; grammar: number; questionHandling: number }> {
  try {
    const resp = await fetch("/api/assess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, referenceText, scenarioPrompt }),
    });

    if (!resp.ok) {
      console.error("Content scoring failed:", resp.status);
      return { vocabulary: 50, grammar: 50, questionHandling: 50 };
    }

    const data = await resp.json();
    return {
      vocabulary: Math.max(0, Math.min(100, data.vocabulary ?? 50)),
      grammar: Math.max(0, Math.min(100, data.grammar ?? 50)),
      questionHandling: Math.max(0, Math.min(100, data.questionHandling ?? 50)),
    };
  } catch {
    console.error("Content scoring error");
    return { vocabulary: 50, grammar: 50, questionHandling: 50 };
  }
}

export function computePart(recs: StoredRecording[], name: string): PartResult {
  if (recs.length === 0) {
    return {
      name,
      criteria: {
        vocabulary: createEmptyCriterion(),
        grammar: createEmptyCriterion(),
        pronunciation: createEmptyCriterion(),
        fluency: createEmptyCriterion(),
        questionHandling: createEmptyCriterion(),
      },
      total: 0,
      maxTotal: 50,
    };
  }

  const avg = (key: keyof RecordingScores) =>
    recs.reduce((s, r) => s + r.scores[key], 0) / recs.length;

  const criteria: Record<CriterionKey, CriterionScore> = {
    pronunciation: { score: Math.round(avg("pronunciation")), maxScore: 10, level: "Weak", comment: "" },
    fluency: { score: Math.round(avg("fluency")), maxScore: 10, level: "Weak", comment: "" },
    vocabulary: { score: Math.round(avg("vocabulary")), maxScore: 10, level: "Weak", comment: "" },
    grammar: { score: Math.round(avg("grammar")), maxScore: 10, level: "Weak", comment: "" },
    questionHandling: { score: Math.round(avg("questionHandling")), maxScore: 10, level: "Weak", comment: "" },
  };

  Object.entries(criteria).forEach(([key, c]) => {
    c.level = scoreToLevel(c.score);
    c.comment = buildComment(key as CriterionKey, c.level);
  });

  const total = Object.values(criteria).reduce((s, c) => s + c.score, 0);
  return { name, criteria, total, maxTotal: 50 };
}

export function computeFullResult(
  recordings: StoredRecording[],
  part1Count: number
): FullResult {
  const part1Result = computePart(recordings.slice(0, part1Count), "Part 1: Interview");
  const part2Result = computePart(recordings.slice(part1Count), "Part 2: Role Play");

  return {
    part1: part1Result,
    part2: part2Result,
    grandTotal: part1Result.total + part2Result.total,
    grandMax: 100,
  };
}
