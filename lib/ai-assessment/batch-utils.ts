import { AzureResult } from "./types";
import { blobToWav } from "./audio-utils";

/**
 * Converts a list of audio blobs into Base64 format for batch processing.
 */
export async function prepareAudioBatch(
  recordings: { audioBlob: Blob; reference: string }[]
) {
  return Promise.all(recordings.map(async (rec, i) => {
    try {
      console.log(`[BATCH-UTILS] Preparing item ${i}, blob size: ${rec.audioBlob.size}, type: ${rec.audioBlob.type}`);
      const wavBlob = await blobToWav(rec.audioBlob);
      console.log(`[BATCH-UTILS] Item ${i} converted to WAV, size: ${wavBlob.size}`);
      
      const audioBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const base64 = dataUrl.split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(wavBlob);
      });
      
      return {
        index: i,
        audioBase64,
        referenceText: rec.reference,
      };
    } catch (e) {
      console.error(`[BATCH-UTILS] Error preparing item ${i}:`, e);
      return { index: i, audioBase64: "", referenceText: rec.reference };
    }
  }));
}

/**
 * Robustly parses Azure Batch SSE stream and calls progress updates.
 */
export async function streamAzureBatchResults(
  response: Response,
  onProgress?: (progress: number, message: string) => void
) {
  const reader = response.body?.getReader();
  if (!reader) return [];

  const decoder = new TextDecoder();
  let buffer = "";
  let finalResults: AzureResult[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      
      try {
        const data = JSON.parse(line.slice(6));
        if (data.error) {
          console.error("[BATCH-UTILS] Server error:", data.error);
        } else if (data.progress !== undefined) {
          onProgress?.(data.progress, data.message || "");
          if (data.results) {
            finalResults = data.results;
          }
        }
      } catch (e) {
        console.error("[BATCH-UTILS] SSE parse error:", line, e);
      }
    }
  }

  return finalResults;
}
