import { NextResponse } from "next/server";

const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION;

export async function GET() {
  if (!AZURE_KEY || !AZURE_REGION) {
    return NextResponse.json({ error: "Azure Speech credentials not configured" }, { status: 500 });
  }

  try {
    const resp = await fetch(
      `https://${AZURE_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": AZURE_KEY,
          "Content-Length": "0",
        },
      }
    );

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Azure token fetch failed:", resp.status, text);
      return NextResponse.json({ error: "Failed to get Azure token" }, { status: 500 });
    }

    const token = await resp.text();
    return NextResponse.json({ token, region: AZURE_REGION });
  } catch (error) {
    console.error("Token endpoint error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
