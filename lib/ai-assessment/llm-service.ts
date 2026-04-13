import type { LlmScore, BatchTranscript } from "./types";
import { 
  SYSTEM_PROMPT_SINGLE, 
  USER_PROMPT_SINGLE, 
  SYSTEM_PROMPT_BATCH, 
  USER_PROMPT_BATCH 
} from "./prompts";

const INCEPTION_KEY = process.env.INCEPTION_API_KEY;
const INCEPTION_URL = "https://api.inceptionlabs.ai/v1/chat/completions";
const DEFAULT_MODEL = "mercury-2";

const ERROR_SCORES: LlmScore = { vocabulary: -1, grammar: -1, questionHandling: -1 };

async function callInception(messages: { role: string; content: string }[]) {
  if (!INCEPTION_KEY) {
    console.warn("[LLM-SERVICE] INCEPTION_API_KEY not set");
    return null;
  }

  console.log("[LLM-SERVICE] Calling Inception API...");
  console.log("[LLM-SERVICE] System Prompt:", messages.find(m => m.role === "system")?.content.substring(0, 100) + "...");
  console.log("[LLM-SERVICE] User Prompt Length:", messages.find(m => m.role === "user")?.content.length);

  const resp = await fetch(INCEPTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${INCEPTION_KEY}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages,
      temperature: 0.3,
    }),
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    console.error("[LLM-SERVICE] Inception API error:", resp.status, errorText);
    return null;
  }

  const data = await resp.json();
  console.log("[LLM-SERVICE] Raw Response content:", data.choices?.[0]?.message?.content);
  return data;
}

export async function getSingleContentScores(
  transcript: string, 
  referenceText?: string, 
  scenarioPrompt?: string, 
  isPart2?: boolean
): Promise<LlmScore> {
  const systemPrompt = SYSTEM_PROMPT_SINGLE(!!isPart2);
  const userPrompt = USER_PROMPT_SINGLE(transcript, referenceText, scenarioPrompt, isPart2);

  const data = await callInception([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ]);

  if (!data) return ERROR_SCORES;

  const content = data.choices?.[0]?.message?.content || "{}";
  try {
    const match = content.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      return {
        vocabulary: Math.max(0, Math.min(100, parsed.vocabulary ?? 50)),
        grammar: Math.max(0, Math.min(100, parsed.grammar ?? 50)),
        questionHandling: Math.max(0, Math.min(100, parsed.questionHandling ?? 50)),
      };
    }
  } catch (e) {
    console.error("[LLM-SERVICE] Parse error:", e, content);
  }

  return ERROR_SCORES;
}

export async function getBatchContentScores(
  transcripts: BatchTranscript[]
): Promise<LlmScore[]> {
  if (!transcripts.length) return [];

  console.log("[LLM-SERVICE] Batch assessing", transcripts.length, "items");

  const itemsText = transcripts.map((t, i) => {
    let text = `Item ${i + 1}:\n  Transcript: "${t.transcript}"`;
    if (t.referenceText) text += `\n  Reference: "${t.referenceText}"`;
    if (t.scenarioPrompt) text += `\n  Scenario: "${t.scenarioPrompt}"`;
    return text;
  }).join("\n\n");

  const userPrompt = USER_PROMPT_BATCH(itemsText, transcripts.length);

  const data = await callInception([
    { role: "system", content: SYSTEM_PROMPT_BATCH },
    { role: "user", content: userPrompt },
  ]);

  if (!data) return transcripts.map(() => ERROR_SCORES);

  const content = data.choices?.[0]?.message?.content || "[]";
  try {
    const match = content.match(/\[[\s\S]*\]/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) {
        console.log("[LLM-SERVICE] Successfully parsed batch scores array");
        return parsed.map((s: Partial<LlmScore>) => ({
          vocabulary: Math.max(0, Math.min(100, s.vocabulary ?? 50)),
          grammar: Math.max(0, Math.min(100, s.grammar ?? 50)),
          questionHandling: Math.max(0, Math.min(100, s.questionHandling ?? 50)),
        }));
      }
    }
  } catch (e) {
    console.error("[LLM-SERVICE] Batch parse error:", e, content);
  }

  return transcripts.map(() => ERROR_SCORES);
}
