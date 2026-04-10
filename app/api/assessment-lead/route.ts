import { NextResponse } from "next/server";
import { INDUSTRY_ROADMAPS, type IndustryId } from "@/lib/ai-assessment/constants";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, industry, goal, currentLevel, targetLevel, gapHours, packageLabel, scores } = body;

    console.log("[LEAD] New assessment lead:", { name, email, phone, industry, goal });

    const roadmap = INDUSTRY_ROADMAPS[industry as IndustryId] || INDUSTRY_ROADMAPS.general;

    const leadData = {
      name,
      email,
      phone,
      industry,
      goal,
      currentLevel,
      targetLevel,
      gapHours,
      packageLabel,
      scores,
      roadmap,
      submittedAt: new Date().toISOString(),
    };

    console.log("[LEAD] Lead data:", JSON.stringify(leadData, null, 2));

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
