import type { CriterionKey, CriterionScore, PartResult, FullResult, LevelInfo, SurveyData } from "@/lib/ai-assessment/types";
import { scoreToLevel, buildComment, createEmptyCriterion } from "@/lib/ai-assessment/utils";
import { blobToWav } from "@/lib/ai-assessment/audio-utils";
import { HOURS_RECOMMENDATION, INDUSTRY_ROADMAPS, type IndustryId } from "./constants";

export function mapToRubric(score: number): number {
  if (score >= 80) return 10;
  if (score >= 60) return 8;
  if (score >= 40) return 6;
  if (score >= 20) return 4;
  return 2;
}

export function getEPLUSLevel(totalScore: number, maxScore: number = 50): LevelInfo {
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  
  if (percentage >= 90) return { level: "EPLUS 4", cefr: "B1+" };
  if (percentage >= 80) return { level: "EPLUS 3", cefr: "B1" };
  if (percentage >= 70) return { level: "EPLUS 2", cefr: "A2+" };
  if (percentage >= 60) return { level: "EPLUS 1", cefr: "A2" };
  if (percentage >= 50) return { level: "Pre EPLUS", cefr: "A1" };
  return { level: "-", cefr: "< A1" };
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
  
  Object.entries(criteria).forEach(([key, c]) => {
    if (c.score >= 8) {
      strengths.push(c.comment);
    } else if (c.score <= 4) {
      weaknesses.push(c.comment);
    }
  });
  
  return { strengths, weaknesses };
}

export interface RecordingScores {
  pronunciation: number;
  fluency: number;
  prosody: number;
  completeness: number;
  vocabulary: number;
  grammar: number;
  questionHandling: number;
  pronScore: number;
}

export function scoresToRecordingScores(
  azure: {
    accuracyScore: number;
    fluencyScore: number;
    prosodyScore: number;
    completenessScore: number;
    pronScore: number;
  },
  llm: {
    vocabulary: number;
    grammar: number;
    questionHandling: number;
  }
): RecordingScores {
  return {
    pronunciation: Math.max(0, Math.min(100, azure.accuracyScore)),
    fluency: Math.max(0, Math.min(100, azure.fluencyScore)),
    prosody: Math.max(0, Math.min(100, azure.prosodyScore)),
    completeness: Math.max(0, Math.min(100, azure.completenessScore)),
    vocabulary: Math.max(0, Math.min(100, llm.vocabulary)),
    grammar: Math.max(0, Math.min(100, llm.grammar)),
    questionHandling: Math.max(0, Math.min(100, llm.questionHandling)),
    pronScore: Math.max(0, Math.min(100, azure.pronScore)),
  };
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

export async function batchAssessRecordings(
  rawRecordings: RawRecording[],
  onProgress?: (progress: number, message: string) => void,
): Promise<StoredRecording[]> {
  console.log("[BATCH] Starting batch assessment for", rawRecordings.length, "recordings");

  const audioItems = await Promise.all(rawRecordings.map(async (raw) => {
    const wavBlob = await blobToWav(raw.audioBlob);
    const buffer = await wavBlob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const chunkSize = 8192;
    for (let j = 0; j < bytes.length; j += chunkSize) {
      binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(j, j + chunkSize)));
    }
    const base64 = btoa(binary);
    return {
      audioBase64: base64,
      referenceText: raw.reference,
    };
  }));

  let azureResults: AzureResult[] = [];

  try {
    const resp = await fetch("/api/azure-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: audioItems }),
    });

    if (!resp.ok) {
      console.error("[BATCH] Azure batch API failed:", resp.status);
      throw new Error("Azure batch failed");
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
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.error) {
                console.error("[BATCH] Error:", data.error);
              } else if (data.progress !== undefined) {
                onProgress?.(data.progress, data.message || "");
                if (data.results) {
                  azureResults = data.results.map((r: AzureResult) => ({
                    transcript: r.transcript || "",
                    accuracyScore: r.accuracyScore ?? -1,
                    fluencyScore: r.fluencyScore ?? -1,
                    completenessScore: r.completenessScore ?? -1,
                    prosodyScore: r.prosodyScore ?? -1,
                    pronScore: r.pronScore ?? -1,
                  }));
                }
              }
            } catch {}
          }
        }
      }
    }
  } catch (e) {
    console.error("[BATCH] Azure batch error:", e);
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

  const part2Recs = rawRecordings.filter(r => !r.isPart1);
  const part2WithAudio = part2Recs.filter(r => r.transcript && r.transcript.length > 0);

  let llmScores: LlmScore[] = [];
  if (part2WithAudio.length > 0) {
    llmScores = await fetchBatchContentScores(part2WithAudio);
  }

  const contentMap = new Map<number, LlmScore>();
  rawRecordings.forEach((raw, i) => {
    if (!raw.isPart1 && azureResults[i]?.accuracyScore !== -1) {
      const idx = part2WithAudio.indexOf(rawRecordings[i]);
      if (idx >= 0 && llmScores[idx]) {
        contentMap.set(i, llmScores[idx]);
      }
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
          pronunciation: -1,
          fluency: -1,
          prosody: -1,
          completeness: -1,
          vocabulary: -1,
          grammar: -1,
          questionHandling: -1,
          pronScore: -1,
        },
      };
    }

    const llm = content ?? { vocabulary: -1, grammar: -1, questionHandling: -1 };

    return {
      audioBlob: raw.audioBlob,
      reference: raw.reference,
      transcript: azure.transcript,
      scores: scoresToRecordingScores(azure, llm),
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
  recordings: RawRecording[],
): Promise<LlmScore[]> {
  try {
    const batch: BatchTranscript[] = recordings.map((r) => ({
      transcript: r.transcript,
      referenceText: r.reference,
      scenarioPrompt: r.scenarioPrompt,
    }));

    const resp = await fetch("/api/assess-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcripts: batch, isPart2: true }),
    });

    if (!resp.ok) {
      console.error("[BATCH] LLM scoring failed:", resp.status);
      return recordings.map(() => ({ vocabulary: -1, grammar: -1, questionHandling: -1 }));
    }

    const data = await resp.json();
    return (data.scores || []).map((s: LlmScore) => ({
      vocabulary: Math.max(0, Math.min(100, s.vocabulary ?? -1)),
      grammar: Math.max(0, Math.min(100, s.grammar ?? -1)),
      questionHandling: Math.max(0, Math.min(100, s.questionHandling ?? -1)),
    }));
  } catch {
    console.error("[BATCH] LLM scoring error");
    return recordings.map(() => ({ vocabulary: -1, grammar: -1, questionHandling: -1 }));
  }
}

export function computePart(recs: StoredRecording[], name: string, useRubric: boolean = true): PartResult {
  if (recs.length === 0) {
    return {
      name,
      criteria: {
        vocabulary: createEmptyCriterion(),
        grammar: createEmptyCriterion(),
        pronunciation: createEmptyCriterion(),
        fluency: createEmptyCriterion(),
        prosody: createEmptyCriterion(),
        completeness: createEmptyCriterion(),
        questionHandling: createEmptyCriterion(),
      },
      total: 0,
      maxTotal: 0,
    };
  }

  const criteriaKeys: (keyof RecordingScores)[] = [
    "pronunciation",
    "fluency",
    "prosody",
    "completeness",
    "vocabulary",
    "grammar",
    "questionHandling",
  ];

  const validCriteria = criteriaKeys.filter(key => {
    const values = recs.map(r => r.scores[key]);
    return values.some(v => v !== -1);
  });

  const maxScorePerCriterion = useRubric ? 10 : 100;
  const maxTotal = validCriteria.length * maxScorePerCriterion;

  const avg = (key: keyof RecordingScores) => {
    const values = recs.map(r => r.scores[key]).filter(v => v !== -1);
    if (values.length === 0) return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
  };

  const criteria: Record<CriterionKey, CriterionScore> = {
    pronunciation: { score: Math.round(avg("pronunciation")), maxScore: maxScorePerCriterion, level: "Weak", comment: "" },
    fluency: { score: Math.round(avg("fluency")), maxScore: maxScorePerCriterion, level: "Weak", comment: "" },
    prosody: { score: Math.round(avg("prosody")), maxScore: maxScorePerCriterion, level: "Weak", comment: "" },
    completeness: { score: Math.round(avg("completeness")), maxScore: maxScorePerCriterion, level: "Weak", comment: "" },
    vocabulary: { score: Math.round(avg("vocabulary")), maxScore: maxScorePerCriterion, level: "Weak", comment: "" },
    grammar: { score: Math.round(avg("grammar")), maxScore: maxScorePerCriterion, level: "Weak", comment: "" },
    questionHandling: { score: Math.round(avg("questionHandling")), maxScore: maxScorePerCriterion, level: "Weak", comment: "" },
  };

  Object.entries(criteria).forEach(([key, c]) => {
    if (useRubric) {
      c.score = mapToRubric(c.score);
    }
    c.level = scoreToLevel(c.score);
    c.comment = buildComment(key as CriterionKey, c.level);
  });

  const total = Object.values(criteria).reduce((s, c) => s + c.score, 0);
  return { name, criteria, total, maxTotal };
}

export function computeFullResult(
  recordings: StoredRecording[],
  part1Count: number,
  surveyData?: SurveyData
): FullResult {
  const part1Result = computePart(recordings.slice(0, part1Count), "Part 1: Interview", true);
  const part2Result = computePart(recordings.slice(part1Count), "Part 2: Role Play", true);

  const rubricTotal = part1Result.total + part2Result.total;
  const rubricMax = part1Result.maxTotal + part2Result.maxTotal;
  const currentLevel = getEPLUSLevel(rubricTotal, rubricMax);

  let targetLevel: LevelInfo = { level: "EPLUS 1", cefr: "A2" };
  let gapHours = 0;
  let packageLabel = "Gói 36h";

  if (surveyData?.targetCEFR) {
    targetLevel = { level: "", cefr: surveyData.targetCEFR };
    const gapResult = calculateGapAndRecommendation(currentLevel.cefr, surveyData.targetCEFR);
    gapHours = gapResult.recommendedHours;
    packageLabel = gapResult.packageLabel;
    
    const levelMap: Record<string, string> = {
      "A1": "Pre EPLUS", "A2": "EPLUS 1", "A2+": "EPLUS 2", "B1": "EPLUS 3", "B1+": "EPLUS 4"
    };
    targetLevel.level = levelMap[surveyData.targetCEFR] || "";
  }

  return {
    part1: part1Result,
    part2: part2Result,
    grandTotal: rubricTotal,
    grandMax: rubricMax,
    currentLevel,
    targetLevel,
    gapHours,
    packageLabel,
    rubricScores: {
      part1: part1Result.total,
      part2: part2Result.total,
      total: rubricTotal
    }
  };
}