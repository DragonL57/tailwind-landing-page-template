"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { levelColor, levelBg, scoreToLevel, levelToVietnamese } from "@/lib/ai-assessment/utils";
import type { FullResult } from "@/lib/ai-assessment/types";

interface AssessmentResultsProps {
  result: FullResult;
  onReset: () => void;
  onBackToSurvey?: () => void;
}

export default function AssessmentResults({ result, onReset, onBackToSurvey }: AssessmentResultsProps) {
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
          <h3 className="font-headline font-bold text-lg uppercase text-[#191c1c] mb-2">Báo cáo chi tiết đã được gửi</h3>
          <p className="font-body text-sm text-[#5b403f] mb-6 max-w-lg mx-auto">
            Cảm ơn bạn đã thực hiện bài đánh giá. Báo cáo chi tiết từng tiêu chí, điểm mạnh/yếu và lộ trình học tập được thiết kế riêng cho bạn đã được gửi qua email của bạn.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-8 pb-8">
          {onBackToSurvey && (
            <button onClick={onBackToSurvey} className="font-body text-sm text-[#191c1c]/50 hover:text-brand-crimson transition-colors cursor-pointer">
              ← Sửa thông tin
            </button>
          )}
          <button onClick={onReset} className="font-body text-sm text-[#191c1c]/50 hover:text-brand-crimson transition-colors cursor-pointer">Làm lại bài đánh giá</button>
          <Link href="/public" className="font-body text-sm text-[#191c1c]/50 hover:text-brand-crimson transition-colors cursor-pointer">Quay lại trang chủ</Link>
        </div>
      </div>
    </div>
  );
}
