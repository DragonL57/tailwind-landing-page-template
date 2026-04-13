import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import type { AzureResult } from "@/lib/ai-assessment/types";

const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_SPEECH_REGION;

interface BatchAudioItem {
  index: number;
  audioBase64: string;
  referenceText: string;
}

export async function POST(req: Request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const { items } = await req.json();

        console.log("[AZURE-BATCH] === Azure Batch Assessment ===");
        console.log("[AZURE-BATCH] Count:", items?.length || 0);

        if (!items || items.length === 0) {
          controller.enqueue(encoder.encode(`data: {"error": "Missing audio items"}\n\n`));
          return;
        }

        if (!AZURE_KEY || !AZURE_REGION) {
          controller.enqueue(encoder.encode(`data: {"error": "Azure credentials not configured"}\n\n`));
          return;
        }

        const sendProgress = (progress: number, message: string) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ progress, message })}\n\n`));
        };

        // Send initial progress immediately
        sendProgress(0, "Đang chuẩn bị phân tích...");

        const results = await processBatch(items as BatchAudioItem[], sendProgress);
        console.log("[AZURE-BATCH] Results:", JSON.stringify(results, null, 2));
        console.log("[AZURE-BATCH] === End Azure Batch ===\n");

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ results, progress: 100, message: "Hoàn tất" })}\n\n`));
      } catch (error) {
        console.error("[AZURE-BATCH] Error:", error);
        controller.enqueue(encoder.encode(`data: {"error": "Internal error"}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

function processItem(audioBuffer: Buffer, referenceText: string): Promise<AzureResult> {
  return new Promise((resolve) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(AZURE_KEY!, AZURE_REGION!);
    speechConfig.speechRecognitionLanguage = "en-US";
    speechConfig.outputFormat = sdk.OutputFormat.Detailed;

    const pronConfig = new sdk.PronunciationAssessmentConfig(
      referenceText,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      false
    );
    pronConfig.enableProsodyAssessment = true;

    // Create 16kHz mono 16-bit PCM format to match converted WAV audio
    const audioFormat = sdk.AudioStreamFormat.getDefaultInputFormat();
    const pushStream = sdk.AudioInputStream.createPushStream(audioFormat);
    const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    pronConfig.applyTo(recognizer);

    const finish = (result: AzureResult) => {
      try { recognizer.close(); } catch {}
      try { speechConfig.close(); } catch {}
      try { audioConfig.close(); } catch {}
      resolve(result);
    };

    const arrayBuffer = audioBuffer.buffer.slice(audioBuffer.byteOffset, audioBuffer.byteOffset + audioBuffer.byteLength) as ArrayBuffer;
    pushStream.write(arrayBuffer);
    pushStream.close();

    recognizer.recognizeOnceAsync(
      (result: sdk.SpeechRecognitionResult) => {
        console.log("[AZURE-BATCH] Result reason:", sdk.ResultReason[result.reason]);
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          const json = JSON.parse(result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult));
          const nbest = json.NBest?.[0];
          const pron = nbest?.PronunciationAssessment;
          
          console.log("[AZURE-BATCH] Transcript:", nbest?.Display);
          console.log("[AZURE-BATCH] Pron scores:", JSON.stringify(pron));

          finish({
            transcript: json.DisplayText || nbest?.Display || "",
            accuracyScore: pron?.AccuracyScore ?? 0,
            fluencyScore: pron?.FluencyScore ?? 0,
            completenessScore: pron?.CompletenessScore ?? 0,
            pronScore: pron?.PronScore ?? 0,
            prosodyScore: pron?.ProsodyScore ?? 0,
          });
        } else {
          // No speech recognized (NoMatch or Canceled)
          finish({ transcript: "", accuracyScore: 0, fluencyScore: 0, completenessScore: 0, pronScore: 0, prosodyScore: 0 });
        }
      },
      (err: string) => {
        console.error("[AZURE-BATCH] Recognition error:", err);
        finish({ transcript: "", accuracyScore: 0, fluencyScore: 0, completenessScore: 0, prosodyScore: 0, pronScore: 0 });
      }
    );
  });
}

async function processBatch(
  items: BatchAudioItem[],
  sendProgress: (progress: number, message: string) => void
) {
  const results: AzureResult[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(`[AZURE-BATCH] Processing item ${i + 1}, reference: "${item.referenceText.substring(0, 50)}", base64 length: ${item.audioBase64.length}`);

    const progress = Math.round(((i + 1) / items.length) * 80);
    sendProgress(progress, `Đang chấm câu ${i + 1}/${items.length}...`);

    try {
      const audioBuffer = Buffer.from(item.audioBase64, "base64");
      console.log(`[AZURE-BATCH] Item ${i + 1} buffer size: ${audioBuffer.length} bytes`);
      const result = await processItem(audioBuffer, item.referenceText);
      results.push(result);
    } catch (e) {
      console.error(`[AZURE-BATCH] Item ${i} error:`, e);
      results.push({ transcript: "", accuracyScore: 0, fluencyScore: 0, completenessScore: 0, pronScore: 0, prosodyScore: 0 });
    }
  }

  return results;
}
