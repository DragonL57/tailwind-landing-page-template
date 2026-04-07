import { NextResponse } from "next/server";

const INCEPTION_KEY = process.env.INCEPTION_API_KEY;

export async function POST(req: Request) {
  try {
    const { transcript, referenceText, scenarioPrompt } = await req.json();

    if (!transcript) {
      return NextResponse.json({ error: "Missing transcript" }, { status: 400 });
    }

    const isPart2 = !referenceText && scenarioPrompt;
    const scores = await getContentScores(transcript, referenceText, scenarioPrompt, isPart2);
    return NextResponse.json(scores);
  } catch (error) {
    console.error("Content assessment error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Assessment failed" },
      { status: 500 }
    );
  }
}

async function getContentScores(transcript: string, referenceText: string, scenarioPrompt?: string, isPart2?: boolean) {
  if (!INCEPTION_KEY) {
    return { vocabulary: 50, grammar: 50, questionHandling: 50 };
  }

  const systemPrompt = isPart2
    ? `You are an experienced ESL/EFL teacher. Grade spoken English transcripts for vocabulary, grammar, and question handling on a 0-100 scale. Output ONLY a JSON object with three keys: "vocabulary", "grammar", and "questionHandling". No explanation, no markdown, no code blocks, no backticks.`
    : `You are an experienced ESL/EFL teacher. Grade spoken English transcripts for vocabulary and grammar on a 0-100 scale. Output ONLY a JSON object with two keys: "vocabulary" and "grammar". No explanation, no markdown, no code blocks, no backticks.`;

  const userPrompt = isPart2
    ? `Grade this spoken English transcript for a role-play scenario:

Scenario context: "${scenarioPrompt}"

Transcript: "${transcript}"

Criteria:
- vocabulary (0-100): word range, appropriateness, advanced usage, misused words, repetition
- grammar (0-100): sentence structure, verb tense, articles, prepositions, subject-verb agreement, errors
- questionHandling (0-100): how well the speaker addresses the scenario, stays on topic, uses appropriate conversational language, and demonstrates communicative competence

Respond with ONLY: {"vocabulary": number, "grammar": number, "questionHandling": number}`
    : `Grade this spoken English transcript:

Transcript: "${transcript}"
${referenceText ? `Reference text (for scripted part): "${referenceText}"` : "This is unscripted free speech — no reference text."}

Criteria:
- vocabulary (0-100): word range, appropriateness, advanced usage, misused words, repetition
- grammar (0-100): sentence structure, verb tense, articles, prepositions, subject-verb agreement, errors

Respond with ONLY: {"vocabulary": number, "grammar": number}${!isPart2 ? ', "questionHandling": number' : ''}}`;

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
    console.error("Inception API error:", await resp.text());
    return { vocabulary: 50, grammar: 50, questionHandling: 50 };
  }

  const data = await resp.json();
  const content = data.choices?.[0]?.message?.content || "{}";

  try {
    const match = content.match(/\{[\s\S]*"vocabulary"[\s\S]*"grammar"[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      return {
        vocabulary: Math.max(0, Math.min(100, parsed.vocabulary ?? 50)),
        grammar: Math.max(0, Math.min(100, parsed.grammar ?? 50)),
        questionHandling: Math.max(0, Math.min(100, parsed.questionHandling ?? 50)),
      };
    }
    throw new Error("No JSON found");
  } catch {
    console.error("Failed to parse Inception response:", content);
    return { vocabulary: 50, grammar: 50, questionHandling: 50 };
  }
}
