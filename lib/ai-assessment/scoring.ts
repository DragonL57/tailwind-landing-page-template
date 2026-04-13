import type { 
  CriterionKey, 
  CriterionScore, 
  PartResult, 
  FullResult, 
  SurveyData, 
  StoredRecording, 
  RawRecording, 
  AzureResult, 
  LlmScore 
} from "./types";
import { scoreToLevel, buildComment } from "./utils";
import { prepareAudioBatch, streamAzureBatchResults } from "./batch-utils";
import { HOURS_RECOMMENDATION, INDUSTRY_ROADMAPS, type IndustryId } from "./constants";

/**
 * Maps a 0-100 score to a 0-10 rubric score linearly.
 * This provides high granularity (e.g., 86 -> 8.6) as requested.
 */
export function mapToRubric(score: number): number {
  if (score <= 0) return 0;
  // Linear mapping: 0-100 -> 0-10
  return Math.round(score) / 10;
}

/**
 * Maps the percentage score (0-100%) to CEFR and EPLUS level based on the rubric.
 */
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
): { gap: number; recommendedHours: number; packageLabel: string } {
  const currentIdx = CEFR_ORDER.indexOf(currentCEFR);
  const targetIdx = CEFR_ORDER.indexOf(targetCEFR);
  const gap = Math.max(0, targetIdx - currentIdx);
  
  const rec = HOURS_RECOMMENDATION.find(h => gap <= h.maxGap);
  return { 
    gap, 
    recommendedHours: rec?.hours ?? 180, 
    packageLabel: rec?.label ?? "Gói 180h" 
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

// PART 1 (Scripted Reading): Pure delivery assessment via Azure
export const PART1_CRITERIA: CriterionKey[] = [
  "pronunciation", // accuracyScore
  "fluency",       // fluencyScore
  "prosody",       // prosodyScore
  "completeness",  // completenessScore
  "overall",       // pronScore
];

// PART 2 (Unscripted Role Play): Content (LLM) and Delivery (Azure)
export const PART2_CRITERIA: CriterionKey[] = [
  "vocabulary",       // LLM
  "grammar",          // LLM
  "questionHandling", // LLM
  "pronunciation",    // Azure accuracyScore
  "fluency",          // Azure fluencyScore
];

/**
 * Orchestrates batch assessment of multiple recordings.
 */
export async function batchAssessRecordings(
  rawRecordings: RawRecording[],
  onProgress?: (progress: number, message: string) => void,
): Promise<StoredRecording[]> {
  console.log("[BATCH] Starting batch assessment for", rawRecordings.length, "recordings");

  onProgress?.(5, "Đang chuẩn bị dữ liệu âm thanh...");
  const audioItems = await prepareAudioBatch(rawRecordings);

  let azureResults: AzureResult[] = [];

  try {
    console.log("[BATCH] Calling /api/azure-batch with", audioItems.length, "items...");
    const resp = await fetch("/api/azure-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: audioItems }),
    });

    if (!resp.ok) throw new Error(`Azure batch API failed: ${resp.status}`);
    azureResults = await streamAzureBatchResults(resp, onProgress);
    
  } catch (e) {
    console.error("[BATCH] Azure batch fetch error:", e);
  }

  // Ensure azureResults matches rawRecordings length
  if (azureResults.length === 0) {
    azureResults = rawRecordings.map(() => ({
      transcript: "",
      accuracyScore: 0,
      fluencyScore: 0,
      completenessScore: 0,
      prosodyScore: 0,
      pronScore: 0,
    }));
  }

  onProgress?.(85, "Đang đánh giá nội dung...");

  // Only send Part 2 items to the LLM
  const part2Items = rawRecordings
    .map((raw, i) => ({ raw, i, azure: azureResults[i] }))
    .filter(({ raw, azure }) => !raw.isPart1 && azure?.transcript && azure.transcript.trim().length > 0)
    .map(({ raw, azure, i }) => ({
      transcript: azure.transcript,
      referenceText: raw.reference,
      scenarioPrompt: raw.scenarioPrompt,
      originalIdx: i
    }));

  let llmScores: LlmScore[] = [];
  if (part2Items.length > 0) {
    console.log("[BATCH] Calling server-side LLM assessment...");
    try {
      const resp = await fetch("/api/assess-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcripts: part2Items, isPart2: true }),
      });
      if (resp.ok) {
        const data = await resp.json();
        llmScores = data.scores || [];
      } else {
        console.error("[BATCH] LLM API responded with error:", resp.status);
      }
    } catch (e) {
      console.error("[BATCH] LLM assessment error:", e);
    }
  }

  const contentMap = new Map<number, LlmScore>();
  part2Items.forEach((item, i) => {
    if (llmScores[i]) contentMap.set(item.originalIdx, llmScores[i]);
  });

  onProgress?.(95, "Đang tính điểm tổng...");

  const stored: StoredRecording[] = rawRecordings.map((raw, i) => {
    const azure = azureResults[i] || { transcript: "", accuracyScore: 0, fluencyScore: 0, completenessScore: 0, prosodyScore: 0, pronScore: 0 };
    const content = contentMap.get(i);
    const hasTranscript = azure.transcript && azure.transcript.trim().length > 0;

    const scores = !hasTranscript ? {
      vocabulary: 0,
      grammar: 0,
      pronunciation: 0,
      fluency: 0,
      prosody: 0,
      completeness: 0,
      questionHandling: 0,
      overall: 0,
    } : {
      vocabulary: content?.vocabulary ?? 0,
      grammar: content?.grammar ?? 0,
      pronunciation: azure.accuracyScore,
      fluency: azure.fluencyScore,
      prosody: azure.prosodyScore,
      completeness: azure.completenessScore,
      questionHandling: content?.questionHandling ?? 0,
      overall: azure.pronScore,
    };

    return {
      audioBlob: raw.audioBlob,
      reference: raw.reference,
      transcript: azure.transcript,
      scores,
    };
  });

  console.log("[BATCH] Batch assessment complete");
  return stored;
}

export function computePart(recs: StoredRecording[], name: string, criteriaKeys: CriterionKey[]): PartResult {
  console.log(`[SCORING] Computing part: ${name}`);
  const maxScorePerCriterion = 10;
  const criteria: Partial<Record<CriterionKey, CriterionScore>> = {};

  criteriaKeys.forEach((key) => {
    // Strict rubric mapping per recording, then average the rubric scores
    const rubricValues = recs.map((r, i) => {
      const rubric = mapToRubric(r.scores[key]);
      console.log(`  - Item ${i+1} [${key}]: raw=${r.scores[key]} -> rubric=${rubric}`);
      return rubric;
    });
    const avgRubric = rubricValues.length > 0 ? rubricValues.reduce((s, v) => s + v, 0) / rubricValues.length : 0;
    
    // Round to 1 decimal place
    const finalScore = Math.round(avgRubric * 10) / 10;
    console.log(`  - Average [${key}]: ${finalScore}`);
    
    const level = scoreToLevel(finalScore * 10); 
    const comment = buildComment(key, level);

    criteria[key] = {
      score: finalScore,
      maxScore: maxScorePerCriterion,
      level,
      comment
    };
  });

  const total = criteriaKeys.reduce((s, key) => s + (criteria[key]?.score || 0), 0);
  const maxTotal = criteriaKeys.length * maxScorePerCriterion;

  // Round the final total as well
  const roundedTotal = Math.round(total * 10) / 10;
  console.log(`[SCORING] Finished ${name}: Total=${roundedTotal}/${maxTotal}`);

  return { name, criteria: criteria as Record<CriterionKey, CriterionScore>, total: roundedTotal, maxTotal };
}

export function computeFullResult(
  recordings: StoredRecording[],
  part1Count: number,
  surveyData?: SurveyData
): FullResult {
  const part1Result = computePart(recordings.slice(0, part1Count), "Part 1: Scripted Reading", PART1_CRITERIA);
  const part2Result = computePart(recordings.slice(part1Count), "Part 2: Role Play", PART2_CRITERIA);

  const grandTotal = Math.round((part1Result.total + part2Result.total) * 10) / 10;
  const grandMax = part1Result.maxTotal + part2Result.maxTotal;
  
  const percentage = grandMax > 0 ? (grandTotal / grandMax) * 100 : 0;
  const { cefr } = getCEFRLevel(percentage);

  console.log(`[SCORING] Final Assessment: Total=${grandTotal}/${grandMax} -> CEFR=${cefr}`);

  const targetCEFR = surveyData?.targetCEFR || "B1";
  const gapResult = calculateGapAndRecommendation(cefr, targetCEFR);

  return {
    part1: part1Result,
    part2: part2Result,
    grandTotal,
    grandMax,
    currentLevel: { cefr }, 
    targetLevel: { cefr: targetCEFR },
    gapHours: gapResult.recommendedHours,
    packageLabel: gapResult.packageLabel,
    rubricScores: {
      part1: part1Result.total,
      part2: part2Result.total,
      total: grandTotal
    }
  };
}
