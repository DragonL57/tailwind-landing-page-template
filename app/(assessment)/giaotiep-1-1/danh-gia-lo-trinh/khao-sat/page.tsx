"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SurveyStep from "@/components/giaotiep-1-1/survey-step";
import type { SurveyData } from "@/lib/ai-assessment/types";

export default function SurveyPage() {
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

  const handleComplete = (data: SurveyData) => {
    sessionStorage.setItem("surveyData", JSON.stringify(data));
    window.location.href = "/giaotiep-1-1/danh-gia-lo-trinh/gioi-thieu";
  };

  return <SurveyStep onComplete={handleComplete} />;
}