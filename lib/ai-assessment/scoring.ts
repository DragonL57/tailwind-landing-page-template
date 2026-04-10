import type { CriterionKey, CriterionScore, PartResult, FullResult, LevelInfo, SurveyData } from "@/lib/ai-assessment/types";
import { scoreToLevel, buildComment } from "@/lib/ai-assessment/utils";
import { blobToWav } from "@/lib/ai-assessment/audio-utils";
import { HOURS_RECOMMENDATION, INDUSTRY_ROADMAPS, type IndustryId } from "./constants";

/**
 * Maps a 0-100 score to the 0, 2, 4, 6, 8, 10 rubric score
 */
export function mapToRubric(score: number): number {
  if (score <= 0) return 0;
  if (score >= 80) return 10;
  if (score >= 60) return 8;
  if (score >= 40) return 6;
  if (score >= 20) return 4;
  return 2;
}

/**
 * Maps the percentage score (0-100%) to CEFR level
 */
export function getCEFRLevel(percentage: number): LevelInfo {
  if (percentage >= 90) return { cefr: "B1+" };
  if (percentage >= 80) return { cefr: "B1" };
  if (percentage >= 70) return { cefr: "A2+" };
  if (percentage >= 60) return { cefr: "A2" };
  if (percentage >= 40) return { cefr: "A1" };
  return { cefr: "< A1" };
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
    } else if (c.score <= 4 && c.score !== -1) {
      weaknesses.push(c.comment);
    }
  });
  
  return { strengths, weaknesses };
}

export interface RecordingScores {
  vocabulary: number;
  grammar: number;
  pronunciation: number;
  fluency: number;
  prosody: number;
  completeness: number;
  questionHandling: number;
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

// PART 1 (Scripted): Focus on delivery only
export const PART1_CRITERIA: CriterionKey[] = [
  "pronunciation",
  "fluency",
  "prosody",
  "completeness",
];

// PART 2 (Unscripted): Focus on content and delivery
export const PART2_CRITERIA: CriterionKey[] = [
  "vocabulary",
  "grammar",
  "pronunciation",
  "fluency",
  "questionHandling",
];

export async function batchAssessRecordings(
  rawRecordings: RawRecording[],
  onProgress?: (progress: number, message: string) => void,
): Promise<StoredRecording[]> {
  console.log("[BATCH] Starting batch assessment for", rawRecordings.length, "recordings");

  onProgress?.(5, "Đang chuẩn bị dữ liệu âm thanh...");

  const audioItems = await Promise.all(rawRecordings.map(async (raw, i) => {
    try {
      const wavBlob = await blobToWav(raw.audioBlob);
      const arrayBuffer = await wavBlob.arrayBuffer();
      
      const bytes = new Uint8Array(arrayBuffer);
      let binary = "";
      const chunkSize = 8192;
      for (let j = 0; j < bytes.length; j += chunkSize) {
        binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(j, j + chunkSize)));
      }
      const base64 = btoa(binary);
      
      return {
        index: i,
        audioBase64: base64,
        referenceText: raw.reference,
      };
    } catch (e) {
      console.error(`[BATCH] Error preparing item ${i}:`, e);
      return { index: i, audioBase64: "", referenceText: raw.reference };
    }
  }));

  let azureResults: AzureResult[] = [];

  try {
    console.log("[BATCH] Calling /api/azure-batch with", audioItems.length, "items...");
    const resp = await fetch("/api/azure-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: audioItems }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("[BATCH] Azure batch API failed:", resp.status, errorText);
      throw new Error(`Azure batch failed: ${resp.status}`);
    }

    const reader = resp.body?.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        
        for (const line of lines) {
          if (line.trim() === "") continue;
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.error) {
                console.error("[BATCH] Server error:", data.error);
              } else if (data.progress !== undefined) {
                onProgress?.(data.progress, data.message || "");
                if (data.results) {
                  azureResults = data.results;
                }
              }
            } catch (e) {
              console.error("[BATCH] JSON parse error in SSE:", line, e);
            }
          }
        }
      }
    }
  } catch (e) {
    console.error("[BATCH] Azure batch fetch error:", e);
  }

  if (azureResults.length === 0) {
    azureResults = rawRecordings.map((raw) => ({
      transcript: raw.transcript,
      accuracyScore: -1,
      fluencyScore: -1,
      completenessScore: -1,
      prosodyScore: -1,
      pronScore: -1,
    }));
  }

  onProgress?.(85, "Đang đánh giá nội dung...");

  const part2Items: { transcript: string; reference: string; scenarioPrompt?: string; originalIdx: number }[] = [];
  
  rawRecordings.forEach((raw, i) => {
    if (!raw.isPart1) {
      const azure = azureResults[i];
      if (azure && azure.accuracyScore !== -1) {
        part2Items.push({
          transcript: azure.transcript,
          reference: raw.reference,
          scenarioPrompt: raw.scenarioPrompt,
          originalIdx: i
        });
      }
    }
  });

  let llmScores: LlmScore[] = [];
  if (part2Items.length > 0) {
    console.log("[BATCH] Calling /api/assess-batch with actual transcripts...");
    llmScores = await fetchBatchContentScores(part2Items.map(item => ({
      transcript: item.transcript,
      referenceText: item.reference,
      scenarioPrompt: item.scenarioPrompt
    })));
  }

  const contentMap = new Map<number, LlmScore>();
  part2Items.forEach((item, i) => {
    if (llmScores[i]) {
      contentMap.set(item.originalIdx, llmScores[i]);
    }
  });

  onProgress?.(95, "Đang tính điểm tổng...");

  const stored: StoredRecording[] = rawRecordings.map((raw, i) => {
    const azure = azureResults[i];
    const content = contentMap.get(i);
    const hasAudio = azure?.accuracyScore !== -1;

    if (!hasAudio) {
      return {
        audioBlob: raw.audioBlob,
        reference: raw.reference,
        transcript: "",
        scores: {
          vocabulary: -1,
          grammar: -1,
          pronunciation: -1,
          fluency: -1,
          prosody: -1,
          completeness: -1,
          questionHandling: -1,
        },
      };
    }

    const llm = content ?? { vocabulary: -1, grammar: -1, questionHandling: -1 };

    return {
      audioBlob: raw.audioBlob,
      reference: raw.reference,
      transcript: azure.transcript,
      scores: {
        vocabulary: llm.vocabulary,
        grammar: llm.grammar,
        pronunciation: azure.accuracyScore,
        fluency: azure.fluencyScore,
        prosody: azure.prosodyScore,
        completeness: azure.completenessScore,
        questionHandling: llm.questionHandling,
      },
    };
  });

  console.log("[BATCH] Batch assessment complete");
  return stored;
}

interface BatchTranscript {
  transcript: string;
  referenceText: string;
  scenarioPrompt?: string;
}

async function fetchBatchContentScores(
  items: BatchTranscript[],
): Promise<LlmScore[]> {
  try {
    const resp = await fetch("/api/assess-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcripts: items, isPart2: true }),
    });

    if (!resp.ok) return items.map(() => ({ vocabulary: -1, grammar: -1, questionHandling: -1 }));

    const data = await resp.json();
    return (data.scores || []).map((s: LlmScore) => ({
      vocabulary: Math.max(0, Math.min(100, s.vocabulary ?? -1)),
      grammar: Math.max(0, Math.min(100, s.grammar ?? -1)),
      questionHandling: Math.max(0, Math.min(100, s.questionHandling ?? -1)),
    }));
  } catch {
    return items.map(() => ({ vocabulary: -1, grammar: -1, questionHandling: -1 }));
  }
}

export function computePart(recs: StoredRecording[], name: string, criteriaKeys: CriterionKey[]): PartResult {
  const maxScorePerCriterion = 10;
  const criteria: Partial<Record<CriterionKey, CriterionScore>> = {};

  criteriaKeys.forEach((key) => {
    const values = recs.map(r => r.scores[key]).filter(v => v !== -1);
    const avgRaw = values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0;
    
    const level = scoreToLevel(avgRaw);
    const comment = buildComment(key, level);
    const rubricScore = mapToRubric(avgRaw);

    criteria[key] = {
      score: rubricScore,
      maxScore: maxScorePerCriterion,
      level,
      comment
    };
  });

  const total = criteriaKeys.reduce((s, key) => s + (criteria[key]?.score || 0), 0);
  const maxTotal = criteriaKeys.length * maxScorePerCriterion;

  return { name, criteria: criteria as Record<CriterionKey, CriterionScore>, total, maxTotal };
}

export function computeFullResult(
  recordings: StoredRecording[],
  part1Count: number,
  surveyData?: SurveyData
): FullResult {
  const part1Result = computePart(recordings.slice(0, part1Count), "Part 1: Interview", PART1_CRITERIA);
  const part2Result = computePart(recordings.slice(part1Count), "Part 2: Role Play", PART2_CRITERIA);

  const grandTotal = part1Result.total + part2Result.total;
  const grandMax = part1Result.maxTotal + part2Result.maxTotal;
  
  const percentage = grandMax > 0 ? (grandTotal / grandMax) * 100 : 0;
  const currentLevel = getCEFRLevel(percentage);

  let targetLevel: LevelInfo = { cefr: "B1" };
  let gapHours = 0;
  let packageLabel = "Gói 36h";

  if (surveyData?.targetCEFR) {
    const targetCEFR = surveyData.targetCEFR;
    const gapResult = calculateGapAndRecommendation(currentLevel.cefr, targetCEFR);
    gapHours = gapResult.recommendedHours;
    packageLabel = gapResult.packageLabel;
    targetLevel = { cefr: targetCEFR };
  }

  return {
    part1: part1Result,
    part2: part2Result,
    grandTotal,
    grandMax,
    currentLevel,
    targetLevel,
    gapHours,
    packageLabel,
    rubricScores: {
      part1: part1Result.total,
      part2: part2Result.total,
      total: grandTotal
    }
  };
}