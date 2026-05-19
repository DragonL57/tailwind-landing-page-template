import { sendAssessmentEmail } from "@/lib/ai-assessment/email";
import type { CriterionKey, CriterionScore } from "@/lib/ai-assessment/types";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await sendAssessmentEmail({
    userEmail: "vmthelong2004@gmail.com",
    userName: "Thế Long", industry: "tech", goal: "fluent-communication",
    currentLevel: { cefr: "A2" }, targetLevel: { cefr: "B1" },
    gapHours: 72, packageLabel: "Gói 72h",
    scores: { pronunciation: 5.0, fluency: 4.5, vocabulary: 6.0, grammar: 4.0, questionHandling: 5.5 },
    strengths: ["Sử dụng từ vựng cơ bản tốt.", "Phát âm các từ đơn lẻ tương đối chính xác."],
    weaknesses: ["Phát âm các âm cuối còn thiếu.", "Cần nhiều thời gian để dịch từ.", "Thường chia sai động từ."],
    roadmap: [],
    fullResult: {
      part1: { name: "Part 1: Scripted Reading", criteria: {
        pronunciation: { score: 5.0, maxScore: 10, level: "Adequate", comment: "Phát âm đôi khi ảnh hưởng nhưng vẫn hiểu được." },
        fluency: { score: 4.5, maxScore: 10, level: "Adequate", comment: "Thỉnh thoảng dừng lại và ngập ngừng." },
        prosody: { score: 4.0, maxScore: 10, level: "Inadequate", comment: "Phẳng lặng, máy móc." },
        completeness: { score: 7.0, maxScore: 10, level: "Good", comment: "Đọc hầu hết các từ chính xác." },
        overall: { score: 5.0, maxScore: 10, level: "Adequate", comment: "Kỹ năng nói đạt mức trung bình." },
      } as Record<CriterionKey, CriterionScore>, total: 25.5, maxTotal: 50 },
      part2: { name: "Part 2: Role Play", criteria: {
        vocabulary: { score: 6.0, maxScore: 10, level: "Good", comment: "Một số vấn đề từ vựng nhưng không ảnh hưởng." },
        grammar: { score: 4.0, maxScore: 10, level: "Inadequate", comment: "Nhiều vấn đề ngữ pháp ảnh hưởng giao tiếp." },
        questionHandling: { score: 5.5, maxScore: 10, level: "Adequate", comment: "Trả lời đủ và thường rõ." },
        pronunciation: { score: 5.0, maxScore: 10, level: "Adequate", comment: "Phát âm đôi khi ảnh hưởng nhưng vẫn hiểu được." },
        fluency: { score: 4.5, maxScore: 10, level: "Adequate", comment: "Thỉnh thoảng dừng lại và ngập ngừng." },
      } as Record<CriterionKey, CriterionScore>, total: 25.0, maxTotal: 50 },
      grandTotal: 50.5, grandMax: 100, currentLevel: { cefr: "A2" }, targetLevel: { cefr: "B1" }, gapHours: 72, packageLabel: "Gói 72h", rubricScores: { part1: 25.5, part2: 25.0, total: 50.5 },
    },
  }, "VMG FlexTrack <noreply@thelong.online>");
  return NextResponse.json(result);
}