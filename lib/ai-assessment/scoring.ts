import type { CriterionKey, CriterionScore, PartResult, FullResult } from "@/lib/ai-assessment/types";
import { scoreToLevel, buildComment, createEmptyCriterion } from "@/lib/ai-assessment/utils";
import { blobToWav } from "@/lib/ai-assessment/audio-utils";

export interface RecordingScores {
  pronunciation: number;
  fluency: number;
  prosody: number;
  vocabulary: number;
  grammar: number;
  questionHandling: number;
}

export interface RawRecording {
  audioBlob: Blob;
  reference: string;
  transcript: string;
  scenarioPrompt?: string;
  isPart1: boolean;
  accuracyScore?: number;
  fluencyScore?: number;
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

export function scoresToRecordingScores(
  accuracyScore: number,
  fluencyScore: number,
  prosodyScore: number,
  vocabulary: number,
  grammar: number,
  questionHandling: number
): RecordingScores {
  const to10 = (v: number) => Math.max(1, Math.min(10, Math.round(v / 10)));

  return {
    pronunciation: to10(accuracyScore),
    fluency: to10(fluencyScore),
    prosody: to10(prosodyScore),
    vocabulary: to10(vocabulary),
    grammar: to10(grammar),
    questionHandling: to10(questionHandling),
  };
}

export async function batchAssessRecordings(
  rawRecordings: RawRecording[],
): Promise<StoredRecording[]> {
  console.log("[BATCH] Starting batch assessment for", rawRecordings.length, "recordings");

  const azureResults: { transcript: string; accuracyScore: number; fluencyScore: number; completenessScore: number; prosodyScore: number; pronScore: number }[] = [];

  const audioItems = await Promise.all(rawRecordings.map(async (raw, i) => {
    const wavBlob = await blobToWav(raw.audioBlob);
    const buffer = await wavBlob.arrayBuffer();
    // Safe base64 conversion for large audio files
    const bytes = new Uint8Array(buffer);
    let binary = '';
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
  }));

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

    const data = await resp.json();
    console.log("[BATCH] Azure results:", JSON.stringify(data.results));

    data.results.forEach((r: AzureResult, i: number) => {
      azureResults.push({
        transcript: r.transcript || rawRecordings[i].transcript,
        accuracyScore: r.accuracyScore,
        fluencyScore: r.fluencyScore,
        completenessScore: r.completenessScore ?? -1,
        prosodyScore: r.prosodyScore ?? -1,
        pronScore: r.pronScore ?? -1,
      });
    });
  } catch (e) {
    console.error("[BATCH] Azure batch error:", e);
    rawRecordings.forEach((raw) => {
      azureResults.push({
        transcript: raw.transcript,
        accuracyScore: -1,
        fluencyScore: -1,
        completenessScore: -1,
        prosodyScore: -1,
        pronScore: -1,
      });
    });
  }

  // Build part1/part2 arrays with proper transcripts from Azure results
  const part1Recs = rawRecordings.map((r, i) => ({ 
    ...r, 
    transcript: azureResults[i]?.accuracyScore !== -1 ? azureResults[i].transcript : r.transcript 
  })).filter(r => r.isPart1);
  
  const part2Recs = rawRecordings.map((r, i) => ({ 
    ...r, 
    transcript: azureResults[i]?.accuracyScore !== -1 ? azureResults[i].transcript : r.transcript 
  })).filter(r => !r.isPart1);

  // Part 1: Only pronunciation and fluency from Azure (no vocab/grammar for scripted reading)
  // Part 2: All 5 criteria from LLM (vocabulary, grammar, questionHandling) + Azure (pronunciation, fluency)

  // Only fetch content scores for Part 2 (unscripted role-play) that have audio
  let part2Content: Awaited<ReturnType<typeof fetchBatchContentScores>> = [];
  const part2WithAudio = part2Recs.filter(r => r.transcript && r.transcript.length > 0);

  if (part2WithAudio.length > 0) {
    part2Content = await fetchBatchContentScores(part2WithAudio, true);
  }

  // Map content scores only for Part 2 items
  const contentMap = new Map<number, { vocabulary: number; grammar: number; questionHandling: number }>();
  
  // Map part2 content scores to correct indices
  rawRecordings.forEach((raw, i) => {
    if (!raw.isPart1 && azureResults[i]?.accuracyScore !== -1 && part2WithAudio.includes(rawRecordings[i])) {
      const audioIdx = part2WithAudio.indexOf(rawRecordings[i]);
      if (audioIdx >= 0 && part2Content[audioIdx]) {
        contentMap.set(i, part2Content[audioIdx]);
      }
    }
  });

  const stored: StoredRecording[] = rawRecordings.map((raw, i) => {
    const azure = azureResults[i];
    const hasAudio = azure?.accuracyScore !== -1;

    if (!hasAudio) {
      // No audio - return -1 for all scores
      return {
        audioBlob: raw.audioBlob,
        reference: raw.reference,
        transcript: "",
        scores: { pronunciation: -1, fluency: -1, prosody: -1, vocabulary: -1, grammar: -1, questionHandling: -1 },
      };
    }

    if (raw.isPart1) {
      // Part 1 (Scripted Reading): Only pronunciation and fluency from Azure
      // vocab/grammar/questionHandling are N/A for hardcoded text
      const to10 = (v: number) => Math.max(1, Math.min(10, Math.round(v / 10)));
      return {
        audioBlob: raw.audioBlob,
        reference: raw.reference,
        transcript: azure.transcript,
        scores: {
          pronunciation: to10(azure.accuracyScore),
          fluency: to10(azure.fluencyScore),
          prosody: to10(azure.prosodyScore ?? 50),
          vocabulary: -1, // N/A for scripted reading
          grammar: -1,    // N/A for scripted reading
          questionHandling: -1, // N/A for scripted reading
        },
      };
    }

    // Part 2 (Role Play): All 5 criteria
    const content = contentMap.get(i);
    const vocab = content?.vocabulary ?? 50;
    const gram = content?.grammar ?? 50;
    const qh = content?.questionHandling ?? 50;
    const to10 = (v: number) => Math.max(1, Math.min(10, Math.round(v / 10)));

    return {
      audioBlob: raw.audioBlob,
      reference: raw.reference,
      transcript: azure.transcript,
      scores: {
        pronunciation: to10(azure.accuracyScore),
        fluency: to10(azure.fluencyScore),
        prosody: to10(azure.prosodyScore ?? 50),
        vocabulary: to10(vocab),
        grammar: to10(gram),
        questionHandling: to10(qh),
      },
    };
  });

  console.log("[BATCH] Batch assessment complete");
  return stored;
}

interface BatchTranscript {
  index: number;
  transcript: string;
  referenceText: string;
  scenarioPrompt?: string;
}

async function fetchBatchContentScores(
  recordings: RawRecording[],
  isPart2: boolean
): Promise<{ vocabulary: number; grammar: number; questionHandling: number }[]> {
  try {
    const batch: BatchTranscript[] = recordings.map((r, i) => ({
      index: i,
      transcript: r.transcript,
      referenceText: r.reference,
      scenarioPrompt: r.scenarioPrompt,
    }));

    const resp = await fetch("/api/assess-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcripts: batch, isPart2 }),
    });

    if (!resp.ok) {
      console.error("[BATCH] Batch scoring failed:", resp.status);
      return recordings.map(() => ({ vocabulary: 50, grammar: 50, questionHandling: 50 }));
    }

    const data = await resp.json();
    return (data.scores || []).map((s: LlmScore) => ({
      vocabulary: Math.max(0, Math.min(100, s.vocabulary ?? 50)),
      grammar: Math.max(0, Math.min(100, s.grammar ?? 50)),
      questionHandling: Math.max(0, Math.min(100, s.questionHandling ?? 50)),
    }));
  } catch {
    console.error("[BATCH] Batch scoring error");
    return recordings.map(() => ({ vocabulary: 50, grammar: 50, questionHandling: 50 }));
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
        prosody: createEmptyCriterion(),
        questionHandling: createEmptyCriterion(),
      },
      total: 0,
      maxTotal: 0,
    };
  }

  // Count how many criteria have actual scores (not -1/N/A) in the recordings
  // Part 1 typically has pronunciation, fluency, prosody (3)
  // Part 2 typically has all 6 criteria
  const criteriaKeys: (keyof RecordingScores)[] = [
    "pronunciation",
    "fluency",
    "prosody",
    "vocabulary",
    "grammar",
    "questionHandling"
  ];
  
  // Check which criteria have at least one valid score across all recordings
  const validCriteria = criteriaKeys.filter(key => {
    const values = recs.map(r => r.scores[key]);
    return values.some(v => v !== -1);
  });
  
  const maxTotal = validCriteria.length * 10;

  const avg = (key: keyof RecordingScores) => {
    // Skip -1 values (N/A)
    const values = recs.map(r => r.scores[key]).filter(v => v !== -1);
    if (values.length === 0) return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
  };

  const criteria: Record<CriterionKey, CriterionScore> = {
    pronunciation: { score: Math.round(avg("pronunciation")), maxScore: 10, level: "Weak", comment: "" },
    fluency: { score: Math.round(avg("fluency")), maxScore: 10, level: "Weak", comment: "" },
    prosody: { score: Math.round(avg("prosody")), maxScore: 10, level: "Weak", comment: "" },
    vocabulary: { score: Math.round(avg("vocabulary")), maxScore: 10, level: "Weak", comment: "" },
    grammar: { score: Math.round(avg("grammar")), maxScore: 10, level: "Weak", comment: "" },
    questionHandling: { score: Math.round(avg("questionHandling")), maxScore: 10, level: "Weak", comment: "" },
  };

  Object.entries(criteria).forEach(([key, c]) => {
    c.level = scoreToLevel(c.score);
    c.comment = buildComment(key as CriterionKey, c.level);
  });

  const total = Object.values(criteria).reduce((s, c) => s + c.score, 0);
  return { name, criteria, total, maxTotal };
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
