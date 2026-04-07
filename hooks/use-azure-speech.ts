"use client";

import { useRef, useState, useCallback } from "react";

interface PronunciationScores {
  accuracyScore: number;
  fluencyScore: number;
  completenessScore: number;
  pronScore: number;
  prosodyScore?: number;
}

interface UseAzureSpeechReturn {
  isReady: boolean;
  error: string | null;
  init: () => Promise<boolean>;
  startRecognition: (stream: MediaStream, referenceText: string, onResult: (transcript: string, scores: PronunciationScores) => void) => void;
  stopRecognition: () => void;
  scoreAudioBlob: (blob: Blob, referenceText: string) => Promise<{ transcript: string; scores: PronunciationScores }>;
}

type AzureRecognizer = {
  stopContinuousRecognitionAsync: (success: () => void, error: (err: string) => void) => void;
  close: () => void;
};

export function useAzureSpeech(): UseAzureSpeechReturn {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tokenRef = useRef("");
  const regionRef = useRef("");
  const recognizerRef = useRef<AzureRecognizer | null>(null);

  const init = useCallback(async () => {
    if (isReady) return true;
    try {
      const resp = await fetch("/api/speech-token");
      if (!resp.ok) throw new Error("Failed to get token");
      const data = await resp.json();
      tokenRef.current = data.token;
      regionRef.current = data.region;
      setIsReady(true);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      return false;
    }
  }, [isReady]);

  const getSpeechConfig = useCallback(() => {
    const SpeechSDK = (window as any).SpeechSDK;
    if (!SpeechSDK || !tokenRef.current) return null;

    const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(
      tokenRef.current,
      regionRef.current
    );
    speechConfig.speechRecognitionLanguage = "en-US";
    speechConfig.outputFormat = SpeechSDK.OutputFormat.Detailed;
    return { SpeechSDK, speechConfig };
  }, []);

  const createPronConfig = useCallback((referenceText: string) => {
    const config = getSpeechConfig();
    if (!config) return null;

    const { SpeechSDK, speechConfig } = config;
    const pronConfig = SpeechSDK.PronunciationAssessmentConfig.fromJSON(JSON.stringify({
      referenceText,
      gradingSystem: "HundredMark",
      granularity: "Phoneme",
      enableMiscue: false,
      enableProsodyAssessment: true,
    }));
    return { SpeechSDK, speechConfig, pronConfig };
  }, [getSpeechConfig]);

  const extractScores = useCallback((jsonResult: any): { transcript: string; scores: PronunciationScores } => {
    const nbest = jsonResult.NBest?.[0];
    const pronResult = nbest?.PronunciationAssessment;
    const transcript = jsonResult.DisplayText || nbest?.Display || "";

    if (pronResult) {
      return {
        transcript,
        scores: {
          accuracyScore: pronResult.AccuracyScore ?? 0,
          fluencyScore: pronResult.FluencyScore ?? 0,
          completenessScore: pronResult.CompletenessScore ?? 0,
          pronScore: pronResult.PronScore ?? 0,
          prosodyScore: pronResult.ProsodyScore,
        },
      };
    }

    return { transcript, scores: { accuracyScore: 0, fluencyScore: 0, completenessScore: 0, pronScore: 0 } };
  }, []);

  const startRecognition = useCallback(
    (stream: MediaStream, referenceText: string, onResult: (transcript: string, scores: PronunciationScores) => void) => {
      const config = createPronConfig(referenceText);
      if (!config) {
        console.error("[AZURE] Failed to create pronunciation config");
        return;
      }

      const { SpeechSDK, speechConfig, pronConfig } = config;
      const audioConfig = SpeechSDK.AudioConfig.fromStreamInput(stream);
      const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, "en-US", audioConfig);
      pronConfig.applyTo(recognizer);

      console.log("[AZURE] Recognition started for reference:", referenceText.substring(0, 50));

      recognizer.recognized = (_s: any, e: any) => {
        const result = e.result;
        if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
          const jsonResult = JSON.parse(
            result.properties.getProperty(SpeechSDK.PropertyId.SpeechServiceResponse_JsonResult)
          );
          const { transcript, scores } = extractScores(jsonResult);
          console.log("[AZURE] Recognized:", transcript);
          console.log("[AZURE] Scores:", JSON.stringify(scores));
          if (scores.pronScore > 0) {
            onResult(transcript, scores);
          }
        }
      };

      recognizer.canceled = (_s: any, e: any) => {
        console.error("[AZURE] Recognition canceled:", e.reason, e.errorDetails);
      };

      recognizer.sessionStopped = (_s: any, e: any) => {
        console.log("[AZURE] Session stopped");
      };

      recognizer.startContinuousRecognitionAsync(
        () => console.log("[AZURE] Recognition started successfully"),
        (err: string) => console.error("[AZURE] Failed to start recognition:", err)
      );

      recognizerRef.current = recognizer as AzureRecognizer;
    },
    [createPronConfig, extractScores]
  );

  const stopRecognition = useCallback(() => {
    if (recognizerRef.current) {
      const rec = recognizerRef.current;
      rec.stopContinuousRecognitionAsync(
        () => {
          try { rec.close(); } catch {}
          recognizerRef.current = null;
        },
        () => {
          try { rec.close(); } catch {}
          recognizerRef.current = null;
        }
      );
    }
  }, []);

  const scoreAudioBlob = useCallback(
    async (blob: Blob, referenceText: string): Promise<{ transcript: string; scores: PronunciationScores }> => {
      console.log("[AZURE-BATCH] Scoring audio blob, size:", blob.size, "type:", blob.type);

      const config = createPronConfig(referenceText);
      if (!config) {
        console.error("[AZURE-BATCH] Failed to create pronunciation config");
        return { transcript: "", scores: { accuracyScore: 50, fluencyScore: 50, completenessScore: 50, pronScore: 50 } };
      }

      return new Promise((resolve) => {
        const { SpeechSDK, speechConfig, pronConfig } = config;

        const audioConfig = SpeechSDK.AudioConfig.fromWavFileInput(blob);
        const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
        pronConfig.applyTo(recognizer);

        let resolved = false;
        const finish = (result: { transcript: string; scores: PronunciationScores }) => {
          if (!resolved) {
            resolved = true;
            try { recognizer.close(); } catch {}
            console.log("[AZURE-BATCH] Final result:", JSON.stringify(result));
            resolve(result);
          }
        };

        recognizer.recognized = (_s: any, e: any) => {
          const result = e.result;
          console.log("[AZURE-BATCH] Recognized event, reason:", result.reason);
          if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
            const jsonResult = JSON.parse(
              result.properties.getProperty(SpeechSDK.PropertyId.SpeechServiceResponse_JsonResult)
            );
            console.log("[AZURE-BATCH] JSON result:", JSON.stringify(jsonResult));
            finish(extractScores(jsonResult));
          }
        };

        recognizer.canceled = (_s: any, e: any) => {
          console.error("[AZURE-BATCH] Canceled:", e.reason, e.errorDetails);
          finish({ transcript: "", scores: { accuracyScore: 50, fluencyScore: 50, completenessScore: 50, pronScore: 50 } });
        };

        recognizer.recognizeOnceAsync(
          (result: any) => {
            console.log("[AZURE-BATCH] recognizeOnceAsync completed, reason:", result.reason);
            if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
              const jsonResult = JSON.parse(
                result.properties.getProperty(SpeechSDK.PropertyId.SpeechServiceResponse_JsonResult)
              );
              finish(extractScores(jsonResult));
            } else {
              finish({ transcript: "", scores: { accuracyScore: 50, fluencyScore: 50, completenessScore: 50, pronScore: 50 } });
            }
          },
          (err: string) => {
            console.error("[AZURE-BATCH] recognizeOnceAsync error:", err);
            finish({ transcript: "", scores: { accuracyScore: 50, fluencyScore: 50, completenessScore: 50, pronScore: 50 } });
          }
        );
      });
    },
    [createPronConfig, extractScores]
  );

  return {
    isReady,
    error,
    init,
    startRecognition,
    stopRecognition,
    scoreAudioBlob,
  };
}
