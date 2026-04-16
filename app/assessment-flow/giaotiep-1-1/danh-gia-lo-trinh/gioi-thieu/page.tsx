"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AssessmentIntro from "@/components/giaotiep-1-1/assessment-intro";
import type { SurveyData } from "@/lib/ai-assessment/types";

export default function IntroPage() {
  const pathname = usePathname();
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);

  useEffect(() => {
    console.log("[GA4] Page view:", pathname);
  }, [pathname]);

  useEffect(() => {
    const stored = sessionStorage.getItem("surveyData");
    if (stored) {
      setSurveyData(JSON.parse(stored));
    }
  }, []);

  const handleStart = () => {
    window.location.href = "/giaotiep-1-1/danh-gia-lo-trinh/test";
  };

  const handleBack = () => {
    window.location.href = "/giaotiep-1-1/danh-gia-lo-trinh/khao-sat";
  };

  return <AssessmentIntro onStart={handleStart} onBack={handleBack} surveyData={surveyData} />;
}