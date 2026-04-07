"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import AssessmentIntro from "@/components/giaotiep-1-1/assessment-intro";
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
import type { AssessmentPhase, FullResult } from "@/lib/ai-assessment/types";
import type { RawRecording, StoredRecording } from "@/lib/ai-assessment/scoring";
import { batchAssessRecordings, computeFullResult } from "@/lib/ai-assessment/scoring";

export default function AIAssessment() {
  const [phase, setPhase] = useState<AssessmentPhase>("intro");
  const [currentPart, setCurrentPart] = useState<"part1" | "part2">("part1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [recordings, setRecordings] = useState<RawRecording[]>([]);
  const [finalResult, setFinalResult] = useState<FullResult | null>(null);
  const [countdown, setCountdown] = useState(0);


  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const azure = useAzureSpeech();

  const cleanup = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    azure.stopRecognition();
  }, [azure]);

  useEffect(() => {
    return () => {
      cleanup();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [cleanup, audioUrl]);

  const startRecording = useCallback(async () => {
    setTranscript("");
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
              if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };
            mr.start();
            mediaRecorderRef.current = mr;
          })
          .catch(() => {
            setIsRecording(false);
          });
      }
    }, 1000);
  }, []);

  const cancelCountdown = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(0);
  }, []);

  const stopRecording = useCallback(() => {
    cancelCountdown();

    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setIsRecording(false);
      setIsReviewing(true);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };

    mediaRecorderRef.current.stop();
  }, [cancelCountdown, audioUrl]);

  const recordAgain = useCallback(() => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setTranscript("");
    setIsReviewing(false);
    startRecording();
  }, [audioUrl, startRecording]);

  const acceptRecording = useCallback(async () => {
    if (!audioUrl) return;

    const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    const isPart1 = currentPart === "part1";
    const referenceText = isPart1
      ? PART1_SENTENCES[currentIndex]
      : "";
    const scenarioPrompt = !isPart1
      ? PART2_SCENARIOS[currentIndex]?.prompt
      : undefined;

    const transcriptText = transcript || referenceText || scenarioPrompt || "";

    const newRecording: RawRecording = {
      audioBlob: blob,
      reference: referenceText,
      transcript: transcriptText,
      scenarioPrompt,
      isPart1,
    };

    setAudioUrl(null);
    setTranscript("");
    setIsReviewing(false);
    audioChunksRef.current = [];

    setRecordings((prev) => [...prev, newRecording]);

    const items = isPart1 ? PART1_SENTENCES : PART2_SCENARIOS;

    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else if (isPart1) {
      setCurrentPart("part2");
      setCurrentIndex(0);
      setPhase("part2");
    } else {
      setPhase("processing");
    }
  }, [audioUrl, currentPart, currentIndex, transcript]);

  const resetAssessment = useCallback(() => {
    cleanup();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setPhase("intro");
    setCurrentPart("part1");
    setCurrentIndex(0);
    setRecordings([]);
    setFinalResult(null);
    setAudioUrl(null);
    setTranscript("");
    setIsRecording(false);
    setIsReviewing(false);
    setCountdown(0);
  }, [cleanup, audioUrl]);

  const handleBatchAssessment = useCallback(async () => {
    console.log("[ASSESS] Starting batch assessment for", recordings.length, "recordings");

    const storedRecordings = await batchAssessRecordings(recordings);
    const result = computeFullResult(storedRecordings, PART1_SENTENCES.length);

    setFinalResult(result);
    setPhase("results");
  }, [recordings]);

  const isPart1 = currentPart === "part1";
  const totalItems = PART1_SENTENCES.length + PART2_SCENARIOS.length;

  if (phase === "intro") {
    return <AssessmentIntro onStart={() => setPhase("part1")} />;
  }

  if (phase === "processing") {
    return <ProcessingScreen recordingCount={recordings.length} onProcess={handleBatchAssessment} />;
  }

  if (phase === "results" && finalResult) {
    return <AssessmentResults result={finalResult} onReset={resetAssessment} />;
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
