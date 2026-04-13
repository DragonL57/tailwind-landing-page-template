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
import { useAzureSpeech } from "@/hooks/use-azure-speech";
import { PART1_SENTENCES, PART2_SCENARIOS } from "@/lib/ai-assessment/constants";
import type { AssessmentPhase, FullResult, SurveyData } from "@/lib/ai-assessment/types";
import type { RawRecording } from "@/lib/ai-assessment/types";
import { batchAssessRecordings, computeFullResult } from "@/lib/ai-assessment/scoring";
import { motion } from "framer-motion";

function LeadInfoStep({ onSubmit }: { onSubmit: (data: { name: string; email: string; phone: string }) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 p-8">
        <h3 className="font-headline font-bold text-lg uppercase text-[#191c1c] mb-2 text-center">Nhận kết quả đánh giá</h3>
        <p className="font-body text-sm text-[#5b403f] mb-6 text-center">
          Vui lòng để lại thông tin để hệ thống xử lý và gửi báo cáo chi tiết cho bạn.
        </p>
        <form onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          const formData = new FormData(e.currentTarget);
          onSubmit({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
          });
        }} className="space-y-5">
          <div>
            <label className="block font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-2">Họ tên (*)</label>
            <input type="text" required name="name" className="w-full bg-[#f3f4f4] border border-slate-200 p-3 outline-none font-body text-sm rounded-none focus:border-brand-crimson transition-colors" />
          </div>
          <div>
            <label className="block font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-2">Email (*)</label>
            <input type="email" required name="email" className="w-full bg-[#f3f4f4] border border-slate-200 p-3 outline-none font-body text-sm rounded-none focus:border-brand-crimson transition-colors" />
          </div>
          <div>
            <label className="block font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold mb-2">Số điện thoại (*)</label>
            <input type="tel" required name="phone" className="w-full bg-[#f3f4f4] border border-slate-200 p-3 outline-none font-body text-sm rounded-none focus:border-brand-crimson transition-colors" />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-brand-crimson text-white py-3 font-bold tracking-[1.5px] uppercase text-xs rounded-none hover:opacity-90 transition-all cursor-pointer disabled:opacity-50">
            {isSubmitting ? "Đang xử lý..." : "Tiếp tục để xem kết quả"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// Extend phase type locally for lead collection
type FlowPhase = AssessmentPhase | "lead";

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
  
  // Explicitly store the blob for the CURRENT item in state
  const [currentBlob, setCurrentBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const azure = useAzureSpeech();

  useEffect(() => {
    const storedSurvey = sessionStorage.getItem("surveyData");
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
      // Unsubscribe from events to prevent late data delivery
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
    audioChunksRef.current = []; // Clear the reference buffer
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
      survey: "/giaotiep-1-1/danh-gia-lo-trinh/khao-sat",
      intro: "/giaotiep-1-1/danh-gia-lo-trinh/gioi-thieu",
      part1: "/giaotiep-1-1/danh-gia-lo-trinh/test",
      part2: "/giaotiep-1-1/danh-gia-lo-trinh/test",
      lead: "/giaotiep-1-1/danh-gia-lo-trinh/test",
      processing: "/giaotiep-1-1/danh-gia-lo-trinh/test",
      results: "/giaotiep-1-1/danh-gia-lo-trinh/test",
    };
    
    router.push(routeMap[targetPhase]);
  }, [router]);

  const startRecording = useCallback(async () => {
    // 1. Force a complete cleanup before starting a new one
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

        navigator.mediaDevices.getUserMedia({ 
          audio: true 
        })
          .then((stream) => {
            streamRef.current = stream;
            // Clear chunks one more time to be absolutely sure
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

    // Define the stop handler to capture the final blob
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      console.log("[ASSESS] Recording finalized, size:", blob.size);
      
      setCurrentBlob(blob); // Save to state immediately
      
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
    // 2. Use the blob from STATE, not from the mutable REF
    if (!currentBlob) return;

    const isPart1 = currentPart === "part1";
    const referenceText = isPart1
      ? PART1_SENTENCES[currentIndex]
      : "";
    const scenarioPrompt = !isPart1
      ? PART2_SCENARIOS[currentIndex]?.prompt
      : undefined;

    const newRecording: RawRecording = {
      audioBlob: currentBlob,
      reference: referenceText,
      transcript: "", 
      scenarioPrompt,
      isPart1,
    };

    // UI state reset
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
      navigateTo("lead"); // Go to lead collection before processing
    }
  }, [currentBlob, currentPart, currentIndex, navigateTo]);

  const resetAssessment = useCallback(() => {
    cleanup();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setPhase("survey");
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
    sessionStorage.removeItem("surveyData");
    sessionStorage.removeItem("assessmentResult");
    router.push("/giaotiep-1-1/danh-gia-lo-trinh/khao-sat");
  }, [cleanup, audioUrl, router]);

  const backToSurvey = useCallback(() => {
    cleanup();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setPhase("survey");
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

    // Save lead info if we have it
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
            scores: {
              grandTotal: result.grandTotal,
              grandMax: result.grandMax,
              part1: result.part1.total,
              part2: result.part2.total,
            },
          }),
        });
      } catch (error) {
        console.error("Failed to submit lead:", error);
      }
    }

    setFinalResult(result);
    sessionStorage.setItem("assessmentResult", JSON.stringify(result));
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