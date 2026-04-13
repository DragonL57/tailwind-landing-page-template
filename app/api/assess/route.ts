import { NextResponse } from "next/server";
import { getSingleContentScores } from "@/lib/ai-assessment/llm-service";

export async function POST(req: Request) {
  try {
    const { transcript, referenceText, scenarioPrompt } = await req.json();

    console.log("[ASSESS] === Content Assessment Request ===");
    if (!transcript) {
      return NextResponse.json({ error: "Missing transcript" }, { status: 400 });
    }

    const isPart2 = !referenceText && !!scenarioPrompt;
    const scores = await getSingleContentScores(transcript, referenceText, scenarioPrompt, isPart2);
    
    console.log("[ASSESS] Final scores:", JSON.stringify(scores));
    return NextResponse.json(scores);
  } catch (error) {
    console.error("[ASSESS] Content assessment error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Assessment failed" },
      { status: 500 }
    );
  }
}
