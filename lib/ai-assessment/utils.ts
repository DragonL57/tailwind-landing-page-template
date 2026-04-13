import type { CriterionLevel, CriterionScore } from "./types";
import { THRESHOLDS } from "./constants";

export function scoreToLevel(score: number): CriterionLevel {
  if (score >= THRESHOLDS.excellent) return "Excellent";
  if (score >= THRESHOLDS.good) return "Good";
  if (score >= THRESHOLDS.adequate) return "Adequate";
  if (score >= THRESHOLDS.inadequate) return "Inadequate";
  return "Weak";
}

export function levelColor(level: string) {
  switch (level) {
    case "Excellent": return "text-green-600";
    case "Good": return "text-emerald-500";
    case "Adequate": return "text-yellow-600";
    case "Inadequate": return "text-orange-500";
    default: return "text-brand-crimson";
  }
}

export function levelBg(level: string) {
  switch (level) {
    case "Excellent": return "bg-green-100 text-green-700";
    case "Good": return "bg-emerald-50 text-emerald-600";
    case "Adequate": return "bg-yellow-50 text-yellow-700";
    case "Inadequate": return "bg-orange-50 text-orange-600";
    default: return "bg-red-50 text-red-600";
  }
}

export function levelToVietnamese(level: CriterionLevel): string {
  switch (level) {
    case "Excellent": return "Xuất sắc";
    case "Good": return "Tốt";
    case "Adequate": return "Đạt yêu cầu";
    case "Inadequate": return "Chưa đạt";
    case "Weak": return "Yếu";
    default: return level;
  }
}

export function buildComment(criterion: string, level: string): string {
  const comments: Record<string, Record<string, string>> = {
    pronunciation: {
      Excellent: "Phát âm rõ ràng, tự nhiên. Hiếm khi ảnh hưởng đến giao tiếp.",
      Good: "Phát âm tốt, không ảnh hưởng nhiều đến giao tiếp.",
      Adequate: "Phát âm đôi khi ảnh hưởng nhưng vẫn hiểu được.",
      Inadequate: "Phát âm ảnh hưởng đến giao tiếp. Cần luyện tập thêm.",
      Weak: "Phát âm nghiêm trọng ảnh hưởng đến giao tiếp. Cần luyện tập intensiv.",
    },
    fluency: {
      Excellent: "Trôi chảy, tốc độ tốt, tự nhiên.",
      Good: "Đôi khi ngập ngừng nhưng vẫn duy trì được tốc độ.",
      Adequate: "Thỉnh thoảng dừng lại và ngập ngừng. Tốc độ có thể cải thiện.",
      Inadequate: "Ngập ngừng thường xuyên. Tốc độ không đều.",
      Weak: "Ngập ngừng đáng kể. Cần cải thiện lưu loát đáng kể.",
    },
    prosody: {
      Excellent: "Giọng điệu tự nhiên, nhấn mạnh đúng chỗ. Nghe như người bản ngữ.",
      Good: "Nhìn chung tốt, thỉnh thoảng có phần đơn điệu.",
      Adequate: "Một số vấn đề về ngữ điệu. Có thể hiểu nhưng chưa tự nhiên.",
      Inadequate: "Phẳng lặng, máy móc. Sử dụng ít mô hình ngữ điệu.",
      Weak: "Giọng đơn điệu. Không có mô hình nhấn hoặc ngữ điệu tự nhiên.",
    },
    vocabulary: {
      Excellent: "Sử dụng từ vựng xuất sắc và đa dạng. Rất ít lỗi.",
      Good: "Một số vấn đề từ vựng nhưng nhìn chung không ảnh hưởng đến giao tiếp.",
      Adequate: "Một số vấn đề từ vựng ảnh hưởng đến giao tiếp.",
      Inadequate: "Nhiều vấn đề từ vựng nghiêm trọng ảnh hưởng đến giao tiếp.",
      Weak: "Vấn đề từ vựng rất nghiêm trọng, cản trở giao tiếp.",
    },
    grammar: {
      Excellent: "Kiểm soát ngôn ngữ rất tốt. Rất ít lỗi ngữ pháp.",
      Good: "Kiểm soát ngôn ngữ tốt. Một số lỗi nhưng không ảnh hưởng.",
      Adequate: "Kiểm soát ngôn ngữ đủ. Vấn đề ngữ pháp ảnh hưởng đến giao tiếp.",
      Inadequate: "Sử dụng ngôn ngữ và vấn đề ngữ pháp nghiêm trọng ảnh hưởng giao tiếp.",
      Weak: "Lỗi ngữ pháp rất nghiêm trọng cản trở giao tiếp hiệu quả.",
    },
    questionHandling: {
      Excellent: "Trả lời tốt và rõ ràng. Hiểu câu hỏi xuất sắc.",
      Good: "Trả lời khá rõ. Hiểu câu hỏi tốt.",
      Adequate: "Trả lời đủ và thường rõ. Có thể cần làm rõ thêm.",
      Inadequate: "Thường trả lời yếu. Vấn đề nghiêm trọng về hiểu câu hỏi.",
      Weak: "Trả lời gây nhầm lẫn. Hầu như không hiểu câu hỏi.",
    },
    completeness: {
      Excellent: "Đọc đầy đủ và chính xác tất cả các từ trong câu.",
      Good: "Đọc hầu hết các từ chính xác, bỏ sót rất ít.",
      Adequate: "Đọc được các từ chính, bỏ sót một số từ nối.",
      Inadequate: "Bỏ sót nhiều từ quan trọng.",
      Weak: "Bỏ sót hầu hết các từ hoặc đọc sai hoàn toàn.",
    },
    overall: {
      Excellent: "Kỹ năng nói toàn diện xuất sắc.",
      Good: "Kỹ năng nói tốt, giao tiếp hiệu quả.",
      Adequate: "Kỹ năng nói đạt mức trung bình, đủ dùng.",
      Inadequate: "Kỹ năng nói còn nhiều hạn chế.",
      Weak: "Kỹ năng nói rất yếu, cần cải thiện nhiều.",
    },
  };
  return comments[criterion]?.[level] || "";
}

export function createEmptyCriterion(): CriterionScore {
  return { score: 0, maxScore: 100, level: "Weak", comment: "No recording" };
}
