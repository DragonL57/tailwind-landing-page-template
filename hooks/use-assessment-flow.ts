"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AssessmentPhase } from "@/lib/ai-assessment/constants";
import { ROUTE_MAP, SESSION_STORAGE_KEYS, ASSESSMENT_PHASES } from "@/lib/ai-assessment/constants";
import type { SurveyData, RawRecording } from "@/lib/ai-assessment/types";

type FlowPhase = AssessmentPhase | "lead";

interface UseAssessmentFlowReturn {
  phase: FlowPhase;
  currentPart: "part1" | "part2";
  currentIndex: number;
  recordings: RawRecording[];
  surveyData: SurveyData | null;
  setPhase: (phase: FlowPhase) => void;
  setCurrentPart: (part: "part1" | "part2") => void;
  setCurrentIndex: (index: number) => void;
  setRecordings: (recordings: RawRecording[]) => void;
  setSurveyData: (data: SurveyData | null) => void;
  navigateTo: (targetPhase: FlowPhase) => void;
  resetAssessment: () => void;
  backToSurvey: () => void;
  loadFromSession: () => void;
  saveToSession: () => void;
}

export function useAssessmentFlow(): UseAssessmentFlowReturn {
  const router = useRouter();
  const [phase, setPhase] = useState<FlowPhase>(ASSESSMENT_PHASES.PART1);
  const [currentPart, setCurrentPart] = useState<"part1" | "part2">("part1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordings, setRecordings] = useState<RawRecording[]>([]);
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);

  const navigateTo = useCallback((targetPhase: FlowPhase) => {
    setPhase(targetPhase);
    router.push(ROUTE_MAP[targetPhase as AssessmentPhase]);
  }, [router]);

  const navigateToPhase = useCallback((phaseValue: FlowPhase) => {
    setPhase(phaseValue);
  }, []);

  const navigateToRoute = useCallback((targetPhase: FlowPhase) => {
    router.push(ROUTE_MAP[targetPhase as AssessmentPhase]);
  }, [router]);

  const resetAssessment = useCallback(() => {
    setPhase(ASSESSMENT_PHASES.SURVEY);
    setCurrentPart("part1");
    setCurrentIndex(0);
    setRecordings([]);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.SURVEY_DATA);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.ASSESSMENT_RESULT);
    router.push(ROUTE_MAP[ASSESSMENT_PHASES.SURVEY]);
  }, [router]);

  const resetToSurvey = useCallback(() => {
    setPhase(ASSESSMENT_PHASES.SURVEY);
    setCurrentPart("part1");
    setCurrentIndex(0);
    setRecordings([]);
    router.push(ROUTE_MAP[ASSESSMENT_PHASES.SURVEY]);
  }, [router]);

  const loadFromSession = useCallback(() => {
    const storedSurvey = sessionStorage.getItem(SESSION_STORAGE_KEYS.SURVEY_DATA);
    if (storedSurvey) {
      setSurveyData(JSON.parse(storedSurvey));
    }
  }, []);

  const saveToSession = useCallback(() => {
    if (surveyData) {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.SURVEY_DATA, JSON.stringify(surveyData));
    }
  }, [surveyData]);

  // Override navigateTo to use both setPhase and router
  const effectiveNavigateTo = useCallback((targetPhase: FlowPhase) => {
    setPhase(targetPhase);
    router.push(ROUTE_MAP[targetPhase as AssessmentPhase]);
  }, [router]);

  return {
    phase,
    currentPart,
    currentIndex,
    recordings,
    surveyData,
    setPhase: setPhase,
    setCurrentPart: setCurrentPart,
    setCurrentIndex: setCurrentIndex,
    setRecordings: setRecordings,
    setSurveyData: setSurveyData,
    navigateTo: effectiveNavigateTo,
    resetAssessment,
    backToSurvey: resetToSurvey,
    loadFromSession,
    saveToSession,
  };
}