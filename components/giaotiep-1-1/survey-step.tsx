"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { INDUSTRIES, SKILLS, CEFR_LEVELS, type IndustryId, type SkillId, type CEFRLevelId } from "@/lib/ai-assessment/constants";
import type { SurveyData } from "@/lib/ai-assessment/types";

interface SurveyStepProps {
  onComplete: (data: SurveyData) => void;
}

export default function SurveyStep({ onComplete }: SurveyStepProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<SkillId[]>([]);
  const [selectedCEFR, setSelectedCEFR] = useState<CEFRLevelId | null>(null);
  const [step, setStep] = useState<"industry" | "skill" | "cefr">("industry");

  const handleContinue = () => {
    if (step === "industry" && selectedIndustry) {
      setStep("skill");
    } else if (step === "skill" && selectedSkills.length > 0) {
      setStep("cefr");
    } else if (step === "cefr" && selectedCEFR) {
      const cefr = CEFR_LEVELS.find(c => c.id === selectedCEFR);
      onComplete({
        industry: selectedIndustry!,
        skills: selectedSkills,
        targetCEFR: cefr?.targetCEFR || "B1",
      });
    }
  };

  const handleBack = () => {
    if (step === "skill") {
      setStep("industry");
    } else if (step === "cefr") {
      setStep("skill");
    }
  };

  const canContinue = 
    step === "industry" ? !!selectedIndustry : 
    step === "skill" ? selectedSkills.length > 0 : 
    !!selectedCEFR;

  const getProgressDots = () => {
    const steps = ["industry", "skill", "cefr"];
    return steps.map(s => (
      <div key={s} className={`h-1 flex-1 rounded-full ${step === s ? "bg-brand-crimson" : "bg-gray-200"}`} />
    ));
  };

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-white">
      <div className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="max-w-lg mx-auto w-full"
        >
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-4">
            {getProgressDots()}
          </div>

          {/* Back button */}
          {step !== "industry" && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-crimson)] transition-colors mb-4 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại
            </button>
          )}

          {step === "industry" ? (
            <>
              <h2 className="font-headline font-black text-3xl md:text-4xl uppercase text-[#191c1c] leading-[0.95] tracking-tight mb-2">
                Bạn làm việc trong ngành nào?
              </h2>
              <p className="font-body text-sm text-[#5b403f]/70 mb-8">
                Chọn ngành nghề để chúng tôi cá nhân hóa lộ trình học tập cho bạn
              </p>

              <div className="grid grid-cols-2 gap-3">
                {INDUSTRIES.map((industry) => (
                  <button
                    key={industry.id}
                    onClick={() => setSelectedIndustry(industry.id)}
                    className={`p-4 text-left rounded-lg border-2 transition-all cursor-pointer ${
                      selectedIndustry === industry.id
                        ? "border-[var(--color-crimson)] bg-white"
                        : "border-gray-200 hover:border-[var(--color-crimson)] bg-white hover:text-[var(--color-crimson)]"
                    }`}
                  >
                    <span className="font-body font-bold text-sm">{industry.label}</span>
                  </button>
                ))}
              </div>
            </>
          ) : step === "skill" ? (
            <>
              <h2 className="font-headline font-black text-3xl md:text-4xl uppercase text-[#191c1c] leading-[0.95] tracking-tight mb-2">
                Mục tiêu của bạn là gì?
              </h2>
              <p className="font-body text-sm text-[#5b403f]/70 mb-8">
                Bạn muốn sử dụng tiếng Anh để làm gì? (chọn nhiều)
              </p>

              <div className="grid grid-cols-2 gap-3">
                {SKILLS.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkills(prev => 
                      prev.includes(skill.id) 
                        ? prev.filter(id => id !== skill.id) 
                        : [...prev, skill.id]
                    )}
                    className={`p-4 text-left rounded-lg border-2 transition-all cursor-pointer ${
                      selectedSkills.includes(skill.id)
                        ? "border-[var(--color-crimson)] bg-white"
                        : "border-gray-200 hover:border-[var(--color-crimson)] bg-white hover:text-[var(--color-crimson)]"
                    }`}
                  >
                    <span className="font-body font-bold text-sm">{skill.label}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="font-headline font-black text-3xl md:text-4xl uppercase text-[#191c1c] leading-[0.95] tracking-tight mb-2">
                Bạn muốn đạt trình độ nào?
              </h2>
              <p className="font-body text-sm text-[#5b403f]/70 mb-8">
                Chọn trình độ tiếng Anh bạn muốn đạt được
              </p>

              <div className="grid grid-cols-2 gap-3">
                {CEFR_LEVELS.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedCEFR(level.id)}
                    className={`p-4 text-left rounded-lg border-2 transition-all cursor-pointer ${
                      selectedCEFR === level.id
                        ? "border-[var(--color-crimson)] bg-white"
                        : "border-gray-200 hover:border-[var(--color-crimson)] bg-white hover:text-[var(--color-crimson)]"
                    }`}
                  >
                    <span className="font-body font-bold text-sm">{level.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`w-full mt-8 px-10 py-4 font-bold tracking-[2px] uppercase text-xs rounded-none transition-all cursor-pointer ${
              canContinue
                ? "bg-[var(--color-crimson)] text-white hover:bg-[var(--color-crimson)]/90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {step === "cefr" ? "Bắt đầu kiểm tra" : "Tiếp tục"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
