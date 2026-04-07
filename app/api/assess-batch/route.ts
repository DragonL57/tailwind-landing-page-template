import { NextResponse } from "next/server";

const INCEPTION_KEY = process.env.INCEPTION_API_KEY;

interface LlmScore {
  vocabulary: number;
  grammar: number;
  questionHandling: number;
}

interface BatchTranscript {
  index: number;
  transcript: string;
  referenceText: string;
  scenarioPrompt?: string;
}

export async function POST(req: Request) {
  try {
    const { transcripts, isPart2 } = await req.json();

    console.log("[BATCH-API] === Batch Assessment Request ===");
    console.log("[BATCH-API] Count:", transcripts?.length || 0);
    console.log("[BATCH-API] Type:", isPart2 ? "Part 2 (Role Play)" : "Part 1 (Scripted)");

    if (!transcripts || transcripts.length === 0) {
      return NextResponse.json({ error: "Missing transcripts" }, { status: 400 });
    }

    const scores = await getBatchScores(transcripts as BatchTranscript[], isPart2);
    console.log("[BATCH-API] Scores:", JSON.stringify(scores, null, 2));
    console.log("[BATCH-API] === End Batch Assessment ===\n");

    return NextResponse.json({ scores });
  } catch (error) {
    console.error("[BATCH-API] Batch assessment error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Batch assessment failed" },
      { status: 500 }
    );
  }
}

async function getBatchScores(transcripts: BatchTranscript[], isPart2: boolean) {
  if (!INCEPTION_KEY) {
    console.warn("[BATCH-API] INCEPTION_API_KEY not set, returning defaults");
    return transcripts.map(() => ({ vocabulary: 50, grammar: 50, questionHandling: 50 }));
  }

  const systemPrompt = isPart2
    ? `You are an experienced ESL/EFL teacher. Grade each spoken English transcript for vocabulary, grammar, and question handling on a 0-100 scale. Output ONLY a JSON array of objects. Each object has three keys: "vocabulary", "grammar", and "questionHandling". No explanation, no markdown, no code blocks, no backticks.`
    : `You are an experienced ESL/EFL teacher. Grade each spoken English transcript for vocabulary and grammar on a 0-100 scale. Output ONLY a JSON array of objects. Each object has three keys: "vocabulary", "grammar", and "questionHandling". No explanation, no markdown, no code blocks, no backticks.`;

  const criteriaSection = isPart2
    ? `- vocabulary (0-100): word range, appropriateness, advanced usage, misused words, repetition\n- grammar (0-100): sentence structure, verb tense, articles, prepositions, subject-verb agreement, errors\n- questionHandling (0-100): how well the speaker addresses the scenario, stays on topic, uses appropriate conversational language, and demonstrates communicative competence`
    : `- vocabulary (0-100): word range, appropriateness, advanced usage, misused words, repetition\n- grammar (0-100): sentence structure, verb tense, articles, prepositions, subject-verb agreement, errors\n- questionHandling (0-100): how well the speaker handles the conversation topic`;

  const itemsText = transcripts.map((t, i) => {
    let text = `Item ${i + 1}:\n  Transcript: "${t.transcript}"`;
    if (t.referenceText) {
      text += `\n  Reference: "${t.referenceText}"`;
    }
    if (t.scenarioPrompt) {
      text += `\n  Scenario: "${t.scenarioPrompt}"`;
    }
    return text;
  }).join("\n\n");

  const userPrompt = `Grade these ${transcripts.length} spoken English transcript(s):

${itemsText}

Criteria:
${criteriaSection}

Respond with ONLY a JSON array of ${transcripts.length} objects, each with {"vocabulary": number, "grammar": number, "questionHandling": number} in the same order as the items above.`;

  console.log("[BATCH-API] System prompt:", systemPrompt);
  console.log("[BATCH-API] User prompt:", userPrompt);
  console.log("[BATCH-API] Calling Inception API (model: mercury-2)...");

  const resp = await fetch("https://api.inceptionlabs.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${INCEPTION_KEY}`,
    },
    body: JSON.stringify({
      model: "mercury-2",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
    }),
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    console.error("[BATCH-API] Inception API error:", resp.status, errorText);
    return transcripts.map(() => ({ vocabulary: 50, grammar: 50, questionHandling: 50 }));
  }

  const data = await resp.json();
  console.log("[BATCH-API] Inception API response:", JSON.stringify(data, null, 2));

  const content = data.choices?.[0]?.message?.content || "[]";
  console.log("[BATCH-API] LLM raw output:", content);

  try {
    const match = content.match(/\[[\s\S]*\]/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) {
        console.log("[BATCH-API] Parsed scores array:", parsed);
        return parsed.map((s: LlmScore) => ({
          vocabulary: Math.max(0, Math.min(100, s.vocabulary ?? 50)),
          grammar: Math.max(0, Math.min(100, s.grammar ?? 50)),
          questionHandling: Math.max(0, Math.min(100, s.questionHandling ?? 50)),
        }));
      }
    }
    throw new Error("No JSON array found");
  } catch {
    console.error("[BATCH-API] Failed to parse Inception response:", content);
    return transcripts.map(() => ({ vocabulary: 50, grammar: 50, questionHandling: 50 }));
  }
}
