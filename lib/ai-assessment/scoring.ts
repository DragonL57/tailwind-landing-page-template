import type { PartResult, FullResult, SurveyData, StoredRecording, RawRecording, AzureResult, LlmScore, CriterionKey, CriterionScore } from "./types";
import { scoreToLevel, buildComment } from "./utils";
import { prepareAudioBatch, streamAzureBatchResults } from "./batch-utils";
import { PART1_CRITERIA, PART2_CRITERIA, mapToRubric, getCEFRLevel, calculateGapAndRecommendation } from "./scoring-domain";

export async function batchAssessRecordings(
  rawRecordings: RawRecording[],
  onProgress?: (progress: number, message: string) => void,
): Promise<StoredRecording[]> {
  console.log("[BATCH] Starting batch assessment for", rawRecordings.length, "recordings");

  onProgress?.(5, "Đang chuẩn bị dữ liệu âm thanh...");
  const audioItems = await prepareAudioBatch(rawRecordings);

  let azureResults: AzureResult[] = [];

  try {
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
    try {
      const resp = await fetch("/api/assess-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcripts: part2Items, isPart2: true }),
      });
      if (resp.ok) {
        const data = await resp.json();
        llmScores = data.scores || [];
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
      vocabulary: 0, grammar: 0, pronunciation: 0, fluency: 0, prosody: 0, completeness: 0, questionHandling: 0, overall: 0,
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
  const maxScorePerCriterion = 10;
  const criteria: Partial<Record<CriterionKey, CriterionScore>> = {};

  criteriaKeys.forEach((key) => {
    const rubricValues = recs.map((r) => mapToRubric(r.scores[key]));
    const avgRubric = rubricValues.length > 0 ? rubricValues.reduce((s, v) => s + v, 0) / rubricValues.length : 0;
    const finalScore = Math.round(avgRubric * 10) / 10;
    
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
  const roundedTotal = Math.round(total * 10) / 10;

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