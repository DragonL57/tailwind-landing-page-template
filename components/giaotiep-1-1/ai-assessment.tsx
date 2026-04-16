"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AssessmentResults from "@/components/giaotiep-1-1/assessment-results";
import AssessmentProgress from "@/components/giaotiep-1-1/assessment/assessment-progress";
import AssessmentPrompt from "@/components/giaotiep-1-1/assessment/assessment-prompt";
import {
  CountdownOverlay,
  ActiveRecording,
  TranscriptDisplay,
  ReviewActions,
  StartRecordingButton,
} from "@/components/giaotiep-1-1/assessment/recording-controls";
import ProcessingScreen from "@/components/giaotiep-1-1/assessment/processing-screen";
import LeadInfoStep from "@/components/giaotiep-1-1/assessment/lead-info-step";
import { useAzureSpeech } from "@/hooks/use-azure-speech";
import { PART1_SENTENCES, PART2_SCENARIOS, SESSION_STORAGE_KEYS } from "@/lib/ai-assessment/constants";
import type { FullResult, SurveyData, RawRecording } from "@/lib/ai-assessment/types";
import { batchAssessRecordings, computeFullResult } from "@/lib/ai-assessment/scoring";

type FlowPhase = "part1" | "part2" | "lead" | "processing" | "results";

export default function AIAssessmentFlow() {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<FlowPhase>("part1");
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [leadData, setLeadData] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [currentPart, setCurrentPart] = useState<"part1" | "part2">("part1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [recordings, setRecordings] = useState<RawRecording[]>([]);
  const [finalResult, setFinalResult] = useState<FullResult | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState("");

  const [currentBlob, setCurrentBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const azure = useAzureSpeech();

  useEffect(() => {
    const storedSurvey = sessionStorage.getItem(SESSION_STORAGE_KEYS.SURVEY_DATA);
    if (storedSurvey) {
      setSurveyData(JSON.parse(storedSurvey));
    }
  }, []);

  useEffect(() => {
    console.log("[GA4] Page view:", pathname);
  }, [pathname]);

  const stopActiveStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const stopActiveRecorder = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.ondataavailable = null;
      mediaRecorderRef.current.onstop = null;
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.warn("[ASSESS] Error stopping recorder:", e);
      }
    }
    mediaRecorderRef.current = null;
  }, []);

  const cleanup = useCallback(() => {
    stopActiveStream();
    stopActiveRecorder();
    azure.stopRecognition();
    audioChunksRef.current = [];
  }, [stopActiveStream, stopActiveRecorder, azure]);

  useEffect(() => {
    return () => {
      cleanup();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [cleanup, audioUrl]);

  const navigateTo = useCallback((targetPhase: FlowPhase) => {
    setPhase(targetPhase);

    const routeMap: Record<FlowPhase, string> = {
      part1: "/giaotiep-1-1/danh-gia-lo-trinh/test",
      part2: "/giaotiep-1-1/danh-gia-lo-trinh/test",
      lead: "/giaotiep-1-1/danh-gia-lo-trinh/test",
      processing: "/giaotiep-1-1/danh-gia-lo-trinh/test",
      results: "/giaotiep-1-1/danh-gia-lo-trinh/test",
    };

    router.push(routeMap[targetPhase]);
  }, [router]);

  const startRecording = useCallback(async () => {
    cleanup();
    setTranscript("");
    setCurrentBlob(null);
    setCountdown(3);

    let count = 3;
    countdownRef.current = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        if (countdownRef.current) clearInterval(countdownRef.current);
        setCountdown(0);
        setIsRecording(true);

        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            streamRef.current = stream;
            audioChunksRef.current = [];

            const mr = new MediaRecorder(stream);
            mr.ondataavailable = (e) => {
              if (e.data.size > 0) {
                audioChunksRef.current.push(e.data);
              }
            };
            mr.start();
            mediaRecorderRef.current = mr;
          })
          .catch((err) => {
            console.error("[ASSESS] Mic error:", err);
            setIsRecording(false);
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
              alert("Không thể truy cập Micro. Vui lòng cấp quyền truy cập Micro trong cài đặt trình duyệt để tiếp tục.");
            } else {
              alert("Lỗi kết nối Micro. Vui lòng kiểm tra lại thiết bị thu âm của bạn.");
            }
          });
      }
    }, 1000);
  }, [cleanup]);

  const cancelCountdown = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(0);
  }, []);

  const stopRecording = useCallback(() => {
    cancelCountdown();

    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      console.log("[ASSESS] Recording finalized, size:", blob.size);

      setCurrentBlob(blob);

      if (audioUrl) URL.revokeObjectURL(audioUrl);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setIsRecording(false);
      setIsReviewing(true);

      stopActiveStream();
    };

    mediaRecorderRef.current.stop();
  }, [cancelCountdown, audioUrl, stopActiveStream]);

  const recordAgain = useCallback(() => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setTranscript("");
    setCurrentBlob(null);
    setIsReviewing(false);
    startRecording();
  }, [audioUrl, startRecording]);

  const acceptRecording = useCallback(async () => {
    if (!currentBlob) return;

    const isPart1 = currentPart === "part1";
    const referenceText = isPart1 ? PART1_SENTENCES[currentIndex] : "";
    const scenarioPrompt = !isPart1 ? PART2_SCENARIOS[currentIndex]?.prompt : undefined;

    const newRecording: RawRecording = {
      audioBlob: currentBlob,
      reference: referenceText,
      transcript: "",
      scenarioPrompt,
      isPart1,
    };

    setAudioUrl(null);
    setTranscript("");
    setCurrentBlob(null);
    setIsReviewing(false);
    audioChunksRef.current = [];

    setRecordings((prev) => [...prev, newRecording]);

    const items = isPart1 ? PART1_SENTENCES : PART2_SCENARIOS;

    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else if (isPart1) {
      setCurrentPart("part2");
      setCurrentIndex(0);
      navigateTo("part2");
    } else {
      navigateTo("lead");
    }
  }, [currentBlob, currentPart, currentIndex, navigateTo]);

  const resetAssessment = useCallback(() => {
    cleanup();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setPhase("part1");
    setCurrentPart("part1");
    setCurrentIndex(0);
    setRecordings([]);
    setFinalResult(null);
    setAudioUrl(null);
    setTranscript("");
    setCurrentBlob(null);
    setIsRecording(false);
    setIsReviewing(false);
    setCountdown(0);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.SURVEY_DATA);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.ASSESSMENT_RESULT);
    router.push("/giaotiep-1-1/danh-gia-lo-trinh/khao-sat");
  }, [cleanup, audioUrl, router]);

  const backToSurvey = useCallback(() => {
    cleanup();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setPhase("part1");
    setCurrentPart("part1");
    setCurrentIndex(0);
    setRecordings([]);
    setFinalResult(null);
    setAudioUrl(null);
    setTranscript("");
    setCurrentBlob(null);
    setIsRecording(false);
    setIsReviewing(false);
    setCountdown(0);
    router.push("/giaotiep-1-1/danh-gia-lo-trinh/khao-sat");
  }, [cleanup, audioUrl, router]);

  const handleBatchAssessment = useCallback(async () => {
    console.log("[ASSESS] Starting batch assessment for", recordings.length, "recordings");

    setProcessingProgress(0);
    setProcessingMessage("Đang chuẩn bị...");

    const storedRecordings = await batchAssessRecordings(recordings, (progress, message) => {
      setProcessingProgress(progress);
      setProcessingMessage(message);
    });
    const result = computeFullResult(storedRecordings, PART1_SENTENCES.length, surveyData || undefined);

    if (leadData) {
      try {
        await fetch("/api/assessment-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...leadData,
            industry: surveyData?.industry,
            goal: surveyData?.skills,
            currentLevel: result.currentLevel,
            targetLevel: result.targetLevel,
            gapHours: result.gapHours,
            packageLabel: result.packageLabel,
            isTargetNotSure: result.isTargetNotSure,
            scores: {
              grandTotal: result.grandTotal,
              grandMax: result.grandMax,
              part1: result.part1.total,
              p1_pronunciation: result.part1.criteria.pronunciation?.score || 0,
              p1_fluency: result.part1.criteria.fluency?.score || 0,
              p1_prosody: result.part1.criteria.prosody?.score || 0,
              p1_completeness: result.part1.criteria.completeness?.score || 0,
              p1_overall: result.part1.criteria.overall?.score || 0,

              part2: result.part2.total,
              p2_vocabulary: result.part2.criteria.vocabulary?.score || 0,
              p2_grammar: result.part2.criteria.grammar?.score || 0,
              p2_questionHandling: result.part2.criteria.questionHandling?.score || 0,
              p2_pronunciation: result.part2.criteria.pronunciation?.score || 0,
              p2_fluency: result.part2.criteria.fluency?.score || 0,
            },
          }),
        });
      } catch (error) {
        console.error("Failed to submit lead:", error);
      }
    }

    setFinalResult(result);
    sessionStorage.setItem(SESSION_STORAGE_KEYS.ASSESSMENT_RESULT, JSON.stringify(result));
    navigateTo("results");
  }, [recordings, surveyData, navigateTo, leadData]);

  const isPart1 = currentPart === "part1";
  const totalItems = PART1_SENTENCES.length + PART2_SCENARIOS.length;

  if (phase === "lead") {
    return (
      <div className="h-[calc(100vh-4rem)] flex justify-center overflow-y-auto py-8 px-8">
        <div className="w-full max-w-lg">
          <LeadInfoStep onSubmit={(data) => {
            setLeadData(data);
            navigateTo("processing");
          }} />
        </div>
      </div>
    );
  }

  if (phase === "processing") {
    return (
      <ProcessingScreen
        recordingCount={recordings.length}
        onProcess={handleBatchAssessment}
        progress={processingProgress}
        progressMessage={processingMessage}
      />
    );
  }

  if (phase === "results" && finalResult) {
    return <AssessmentResults result={finalResult} onReset={resetAssessment} onBackToSurvey={backToSurvey} />;
  }

  const items = isPart1 ? PART1_SENTENCES : PART2_SCENARIOS;
  const currentItem = items[currentIndex];

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-white">
      <div className="h-[calc(100vh-4rem)] flex justify-center overflow-y-auto py-8 px-8 md:px-12">
        <div className="w-full max-w-lg flex flex-col">
          <AssessmentProgress
            isPart1={isPart1}
            totalItems={totalItems}
            completedCount={recordings.length}
            isReviewing={isReviewing}
          />

          <AssessmentPrompt isPart1={isPart1} currentItem={currentItem} />

          {countdown > 0 ? (
            <CountdownOverlay countdown={countdown} onCancel={cancelCountdown} />
          ) : isRecording ? (
            <ActiveRecording onStop={stopRecording} />
          ) : isReviewing && audioUrl ? (
            <div className="py-4">
              <audio controls src={audioUrl} className="w-full mb-4" />
              <TranscriptDisplay transcript={transcript} />
              <ReviewActions onRecordAgain={recordAgain} onAccept={acceptRecording} />
            </div>
          ) : (
            <StartRecordingButton onStart={startRecording} error={azure.error} />
          )}
        </div>
      </div>
    </div>
  );
}