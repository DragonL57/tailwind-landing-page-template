import { NextResponse } from "next/server";
import { INDUSTRY_ROADMAPS, type IndustryId } from "@/lib/ai-assessment/constants";
import { appendLeadToSheet, type LeadRecord } from "@/lib/sheets-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, industry, goal, currentLevel, targetLevel, gapHours, packageLabel, scores } = body;

    console.log("[LEAD] New assessment lead:", { name, email, phone, industry, goal });

    const roadmap = INDUSTRY_ROADMAPS[industry as IndustryId] || INDUSTRY_ROADMAPS.general;

    // Save to Google Sheets
    if (process.env.GOOGLE_SHEETS_ID) {
      const sheetRecord: LeadRecord = {
        name,
        email,
        phone,
        industry,
        goals: Array.isArray(goal) ? goal.join(", ") : goal,
        currentLevel: currentLevel?.cefr || "",
        targetLevel: targetLevel?.cefr || "",
        gapHours,
        packageLabel,
        grandTotal: scores?.grandTotal || 0,
        grandMax: scores?.grandMax || 100,

        // Part 1
        p1_total: scores?.part1 || 0,
        p1_pronunciation: scores?.p1_pronunciation || 0,
        p1_fluency: scores?.p1_fluency || 0,
        p1_prosody: scores?.p1_prosody || 0,
        p1_completeness: scores?.p1_completeness || 0,
        p1_overall: scores?.p1_overall || 0,

        // Part 2
        p2_total: scores?.part2 || 0,
        p2_vocabulary: scores?.p2_vocabulary || 0,
        p2_grammar: scores?.p2_grammar || 0,
        p2_questionHandling: scores?.p2_questionHandling || 0,
        p2_pronunciation: scores?.p2_pronunciation || 0,
        p2_fluency: scores?.p2_fluency || 0,

        submittedAt: new Date().toISOString(),
      };

      try {
        await appendLeadToSheet(sheetRecord);
      } catch (sheetError: unknown) {
        const errorMessage = sheetError instanceof Error ? sheetError.message : "Unknown error";
        console.error("[LEAD] Google Sheets save failed:", errorMessage);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully",
      roadmap,
    });
  } catch (error) {
    console.error("[LEAD] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
