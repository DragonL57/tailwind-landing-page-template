import { sendAssessmentEmail } from "@/lib/ai-assessment/email";
import type { AssessmentReport } from "@/lib/ai-assessment/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: AssessmentReport = await req.json();
    const result = await sendAssessmentEmail(body);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[SEND-EMAIL] Failed:", message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}