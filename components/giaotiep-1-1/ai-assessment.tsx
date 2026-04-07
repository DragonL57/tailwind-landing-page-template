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
import type { StoredRecording } from "@/lib/ai-assessment/scoring";
import { scoresToRecordingScores, computeFullResult, fetchContentScores } from "@/lib/ai-assessment/scoring";

export default function AIAssessment() {
  const [phase, setPhase] = useState<AssessmentPhase>("intro");
  const [currentPart, setCurrentPart] = useState<"part1" | "part2">("part1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [recordings, setRecordings] = useState<StoredRecording[]>([]);
  const [finalResult, setFinalResult] = useState<FullResult | null>(null);
  const [countdown, setCountdown] = useState(0);


  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const liveScoresRef = useRef<{ accuracyScore: number; fluencyScore: number } | null>(null);

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
    if (!azure.isReady) {
      const ok = await azure.init();
      if (!ok) return;
    }

    setTranscript("");
    liveScoresRef.current = null;
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

            const referenceText = currentPart === "part1"
              ? PART1_SENTENCES[currentIndex]
              : "";

            azure.startRecognition(stream, referenceText, (t, scores) => {
              setTranscript(t);
              liveScoresRef.current = {
                accuracyScore: scores.accuracyScore,
                fluencyScore: scores.fluencyScore,
              };
            });
          })
          .catch(() => {
            setIsRecording(false);
          });
      }
    }, 1000);
  }, [azure, currentPart, currentIndex]);

  const cancelCountdown = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(0);
  }, []);

  const stopRecording = useCallback(() => {
    cancelCountdown();
    azure.stopRecognition();

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
  }, [azure, cancelCountdown, audioUrl]);

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

    const scores = liveScoresRef.current
      ? scoresToRecordingScores(liveScoresRef.current.accuracyScore, liveScoresRef.current.fluencyScore, 50, 50, 50)
      : await azure.scoreAudioBlob(blob, referenceText).then(async (r) => {
          const content = await fetchContentScores(transcriptText, referenceText, scenarioPrompt);
          return scoresToRecordingScores(r.scores.accuracyScore, r.scores.fluencyScore, content.vocabulary, content.grammar, content.questionHandling);
        });

    const newRecording: StoredRecording = {
      audioBlob: blob,
      reference: referenceText,
      transcript: transcriptText,
      scores,
    };

    setAudioUrl(null);
    setTranscript("");
    setIsReviewing(false);
    audioChunksRef.current = [];
    liveScoresRef.current = null;

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
      const allRecordings = [...recordings, newRecording];
      const result = computeFullResult(allRecordings, PART1_SENTENCES.length);
      setFinalResult(result);
      setTimeout(() => setPhase("results"), 500);
    }
  }, [audioUrl, currentPart, currentIndex, transcript, recordings, azure]);

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
    liveScoresRef.current = null;
  }, [cleanup, audioUrl]);

  const isPart1 = currentPart === "part1";
  const totalItems = PART1_SENTENCES.length + PART2_SCENARIOS.length;

  if (phase === "intro") {
    return <AssessmentIntro onStart={() => setPhase("part1")} />;
  }

  if (phase === "processing") {
    return <ProcessingScreen recordingCount={recordings.length} />;
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
