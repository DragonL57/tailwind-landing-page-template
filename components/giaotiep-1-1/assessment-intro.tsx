"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PART1_SENTENCES, PART2_SCENARIOS, INDUSTRIES, SKILLS } from "@/lib/ai-assessment/constants";
import type { SurveyData } from "@/lib/ai-assessment/types";

interface AssessmentIntroProps {
  onStart: () => void;
  onBack?: () => void;
  surveyData?: SurveyData | null;
}

export default function AssessmentIntro({ onStart, onBack, surveyData }: AssessmentIntroProps) {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-white flex items-center justify-center">
      <div className="max-w-lg mx-auto px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          {/* Header */}
          <h2 className="font-headline font-black text-3xl md:text-4xl uppercase text-[#191c1c] leading-[1.3] tracking-tight mb-4">
            Bài Đánh Giá<br />Nói Tiếng Anh
          </h2>
          <p className="font-body text-sm text-gray-500 mb-8">
            Bài kiểm tra gồm 2 phần • Khoảng 10 phút
          </p>

          {/* Survey data summary */}
          {surveyData && (
            <div className="bg-[#f8f9f9] p-4 mb-6 text-left">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-400 mb-1">Ngành nghề</p>
                  <p className="font-bold text-[#191c1c]">{INDUSTRIES.find(i => i.id === surveyData.industry)?.label || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Mục tiêu</p>
                  <p className="font-bold text-[#191c1c]">
                    {surveyData.skills.length > 0 
                      ? surveyData.skills.map(s => SKILLS.find(sk => sk.id === s)?.label).join(", ")
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="space-y-3 mb-8 text-left">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[var(--color-crimson)]/10 flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-[var(--color-crimson)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-body text-sm text-[#191c1c]">Kết quả tức thì</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[var(--color-crimson)]/10 flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-[var(--color-crimson)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-body text-sm text-[#191c1c]">5 tiêu chí: Phát âm, Lưu loát, Từ vựng, Ngữ pháp, Xử lý câu hỏi</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[var(--color-crimson)]/10 flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-[var(--color-crimson)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-body text-sm text-[#191c1c]">Lộ trình cá nhân hóa</p>
            </div>
          </div>

          {/* Test structure */}
          <div className="flex justify-center gap-8 mb-8 py-4 border-y border-gray-100">
            <div>
              <p className="font-headline font-bold text-lg text-[var(--color-crimson)]">Phần 1</p>
              <p className="font-body text-xs text-gray-500">Đọc câu ({PART1_SENTENCES.length})</p>
            </div>
            <div>
              <p className="font-headline font-bold text-lg text-[var(--color-gold)]">Phần 2</p>
              <p className="font-body text-xs text-gray-500">Nói tự do ({PART2_SCENARIOS.length})</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={onStart}
              className="bg-[var(--color-crimson)] text-white px-10 py-3 font-bold tracking-[2px] uppercase text-xs rounded-none hover:opacity-90 transition-all cursor-pointer"
            >
              Bắt đầu kiểm tra
            </button>
            {onBack ? (
              <button
                onClick={onBack}
                className="font-body text-xs text-gray-400 hover:text-[var(--color-crimson)] transition-colors cursor-pointer"
              >
                Quay lại
              </button>
            ) : (
              <Link
                href="/giaotiep-1-1"
                className="font-body text-xs text-gray-400 hover:text-[var(--color-crimson)] transition-colors cursor-pointer"
              >
                Quay lại
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
