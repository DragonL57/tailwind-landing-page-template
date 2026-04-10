import { NextResponse } from "next/server";

const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    const referenceText = formData.get("reference") as string || "";

    if (!audioFile) {
      return NextResponse.json({ error: "Missing audio file" }, { status: 400 });
    }

    console.log("[AZURE-TEST] File:", audioFile.name, "size:", audioFile.size, "type:", audioFile.type);
    console.log("[AZURE-TEST] Reference:", referenceText);

    if (!AZURE_KEY || !AZURE_REGION) {
      return NextResponse.json({ error: "Azure credentials not configured" }, { status: 500 });
    }

    await getAzureToken();
    console.log("[AZURE-TEST] Got token, region:", AZURE_REGION);

    const audioBuffer = await audioFile.arrayBuffer();

    const url = `https://${AZURE_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed`;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": AZURE_KEY,
        "Content-Type": "audio/wav; codecs=audio/pcm; samplerate=16000",
      },
      body: audioBuffer,
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("[AZURE-TEST] API error:", resp.status, errorText);
      return NextResponse.json({ error: `Azure API error: ${resp.status}`, details: errorText }, { status: resp.status });
    }

    const data = await resp.json();
    console.log("[AZURE-TEST] Response:", JSON.stringify(data, null, 2));

    return NextResponse.json(data);
  } catch (error) {
    console.error("[AZURE-TEST] Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

async function getAzureToken() {
  const resp = await fetch(`https://${AZURE_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": AZURE_KEY!,
    },
  });

  if (!resp.ok) {
    throw new Error(`Failed to get Azure token: ${resp.status}`);
  }

  return await resp.text();
}
