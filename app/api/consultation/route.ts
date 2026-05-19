import { NextResponse } from "next/server";
import { appendConsultationToSheet, type ConsultationRecord } from "@/lib/sheets-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, roadmap, timeSlot } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const record: ConsultationRecord = {
      name,
      email,
      phone,
      roadmap: roadmap || "",
      timeSlot: timeSlot || "",
      submittedAt: new Date().toISOString(),
    };

    if (process.env.GOOGLE_SHEETS_ID) {
      await appendConsultationToSheet(record);
    }

    return NextResponse.json({ success: true, message: "Consultation request submitted" });
  } catch (error) {
    console.error("[CONSULTATION] Error:", error);
    return NextResponse.json({ success: false, message: "Failed to submit" }, { status: 500 });
  }
}