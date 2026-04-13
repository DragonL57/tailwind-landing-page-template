"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { levelColor, levelBg, scoreToLevel, levelToVietnamese } from "@/lib/ai-assessment/utils";
import type { FullResult } from "@/lib/ai-assessment/types";
import type { SurveyData } from "@/lib/ai-assessment/types";

interface AssessmentResultsProps {
  result: FullResult;
  onReset: () => void;
  surveyData?: SurveyData | null;
  onBackToSurvey?: () => void;
}

export default function AssessmentResults({ result, onReset, surveyData, onBackToSurvey }: AssessmentResultsProps) {
  const [showRegistration, setShowRegistration] = useState(false);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">

          <h2 className="font-headline font-bold text-2xl md:text-3xl uppercase text-[#191c1c]">Kết quả đánh giá</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-200 p-6 md:p-10 mb-8 text-center"
        >
          <p className="font-body text-xs uppercase tracking-[1.5px] text-[#191c1c]/40 mb-2">Tổng điểm</p>
          <p className={`font-headline font-bold text-5xl md:text-6xl ${levelColor(scoreToLevel(result.grandTotal))}`}>
            {result.grandTotal.toFixed(1)}<span className="text-2xl text-[#191c1c]/30">/{result.grandMax}</span>
          </p>
          <span className={`inline-block mt-3 px-4 py-1 text-xs font-bold uppercase tracking-[1.5px] rounded-none ${levelBg(scoreToLevel(result.grandTotal))}`}>
            {levelToVietnamese(scoreToLevel(result.grandTotal))}
          </span>
        </motion.div>

        {/* Level & Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#003366] to-[#004488] p-6 md:p-10 mb-8 text-center text-white"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="font-body text-xs uppercase tracking-[1.5px] text-white/60 mb-2">Trình độ hiện tại</p>
              <p className="font-headline font-bold text-3xl">{result.currentLevel?.cefr || "A1"}</p>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-[1.5px] text-white/60 mb-2">Mục tiêu</p>
              <p className="font-headline font-bold text-3xl">{result.targetLevel?.cefr || "B1"}</p>
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-[1.5px] text-white/60 mb-2">Khuyến nghị</p>
              <p className="font-headline font-bold text-2xl text-brand-gold">{result.packageLabel || "Gói 36h"}</p>
              {result.gapHours > 0 && (
                <p className="text-white/80">{result.gapHours} giờ học</p>
              )}
            </div>
          </div>
        </motion.div>

        {[result.part1, result.part2].map((part, pi) => (
          <motion.div
            key={part.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pi * 0.15 }}
            className="bg-white border border-slate-200 mb-6"
          >
            <div className={`px-6 py-4 ${pi === 0 ? "border-b-2 border-brand-crimson" : "border-b-2 border-brand-gold"}`}>
              <div className="flex justify-between items-center">
                <h3 className="font-headline font-bold text-base uppercase text-[#191c1c]">{part.name}</h3>
                <p className="font-headline font-bold text-lg text-[#191c1c]">
                  {part.total.toFixed(1)}<span className="text-sm text-[#191c1c]/30">/{part.maxTotal}</span>
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f8f9f9]">
                    <th className="text-left p-4 font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold">Tiêu chí</th>
                    <th className="text-center p-4 font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold">Điểm</th>
                    <th className="text-center p-4 font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold">Mức độ</th>
                    <th className="text-left p-4 font-body text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50 font-bold">Nhận xét</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(part.criteria)
                    .filter(([ , criterion]) => criterion.score !== -1)
                    .map(([key, criterion]) => (
                    <tr key={key} className="border-t border-slate-100 hover:bg-[#f8f9f9]/50 transition-colors">
                      <td className="p-4 font-body text-xs font-bold text-[#191c1c] capitalize whitespace-nowrap">
                        {key === "pronunciation" ? "Phát âm" : key === "fluency" ? "Lưu loát" : key === "prosody" ? "Giọng điệu" : key === "vocabulary" ? "Từ vựng" : key === "grammar" ? "Ngữ pháp" : key === "questionHandling" ? "Xử lý câu hỏi" : key}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-headline font-bold text-lg ${levelColor(criterion.level)}`}>
                          {criterion.score.toFixed(1)}
                        </span>
                        <span className="text-[#191c1c]/20 text-xs">/{criterion.maxScore}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-[1px] rounded-none ${levelBg(criterion.level)}`}>
                          {levelToVietnamese(criterion.level)}
                        </span>
                      </td>
                      <td className="p-4 font-body text-xs text-[#5b403f] max-w-xs">{criterion.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-slate-200 p-6 md:p-10 text-center"
        >
          <h3 className="font-headline font-bold text-lg uppercase text-[#191c1c] mb-2">Nhận báo cáo chi tiết & lộ trình học</h3>
          <p className="font-body text-sm text-[#5b403f] mb-6 max-w-lg mx-auto">
            Đăng ký để nhận phân tích chi tiết từng tiêu chí, điểm mạnh/yếu và lộ trình học tập được thiết kế riêng cho bạn qua email.
          </p>
          <button
            onClick={() => setShowRegistration(true)}
            className="bg-brand-crimson text-white px-8 py-3 font-bold tracking-[1.5px] uppercase text-xs rounded-none hover:opacity-90 transition-all cursor-pointer"
          >
            Đăng ký nhận báo cáo
          </button>
        </motion.div>

        <div className="flex justify-center gap-6 mt-8 pb-8">
          {onBackToSurvey && (
            <button onClick={onBackToSurvey} className="font-body text-sm text-[#191c1c]/50 hover:text-brand-crimson transition-colors cursor-pointer">
              ← Sửa thông tin
            </button>
          )}
          <button onClick={onReset} className="font-body text-sm text-[#191c1c]/50 hover:text-brand-crimson transition-colors cursor-pointer">Làm lại bài đánh giá</button>
          <Link href="/giaotiep-1-1" className="font-body text-sm text-[#191c1c]/50 hover:text-brand-crimson transition-colors cursor-pointer">Quay lại trang chủ</Link>
        </div>
      </div>

      {showRegistration && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white max-w-md w-full p-8 relative">
            <button onClick={() => setShowRegistration(false)} className="absolute top-4 right-4 text-[#191c1c]/30 hover:text-brand-crimson transition-colors cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {regSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-headline font-bold text-lg uppercase text-[#191c1c] mb-3">Đăng ký thành công</h3>
                <p className="font-body text-sm text-[#5b403f]">Báo cáo chi tiết và lộ trình học tập sẽ được gửi đến email của bạn trong 24h.</p>
              </div>
            ) : (
              <>
                <h3 className="font-headline font-bold text-lg uppercase text-[#191c1c] mb-2">Nhận báo cáo chi tiết</h3>
                <p className="font-body text-sm text-[#5b403f] mb-6">
                  Tổng điểm của bạn: <strong>{result.grandTotal.toFixed(1)}/{result.grandMax}</strong> ({levelToVietnamese(scoreToLevel(result.grandTotal))})
                </p>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  
                  const formData = new FormData(e.currentTarget);
                  const leadData = {
                    name: formData.get("name"),
                    email: formData.get("email"),
                    phone: formData.get("phone"),
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
                  };
                  
                  try {
                    await fetch("/api/assessment-lead", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(leadData),
                    });
                    setRegSubmitted(true);
                  } catch (error) {
                    console.error("Failed to submit lead:", error);
                  } finally {
                    setIsSubmitting(false);
                  }
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
                    {isSubmitting ? "Đang gửi..." : "Gửi báo cáo cho tôi"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
