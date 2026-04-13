import { NextResponse } from "next/server";
import { getBatchContentScores } from "@/lib/ai-assessment/llm-service";

export async function POST(req: Request) {
  try {
    const { transcripts } = await req.json();

    console.log("[BATCH-API] === Batch Assessment Request ===");
    if (!transcripts || transcripts.length === 0) {
      return NextResponse.json({ error: "Missing transcripts" }, { status: 400 });
    }

    const scores = await getBatchContentScores(transcripts);
    
    console.log("[BATCH-API] Finished batch assessment");
    return NextResponse.json({ scores });
  } catch (error) {
    console.error("[BATCH-API] Batch assessment error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Batch assessment failed" },
      { status: 500 }
    );
  }
}
