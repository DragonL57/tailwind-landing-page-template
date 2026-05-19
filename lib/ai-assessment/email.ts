import type { AssessmentReport, CriterionKey, CriterionScore } from "./types";
import { INDUSTRIES, GOALS, type IndustryId, type GoalId } from "./constants";
import { sendEmail } from "@/lib/email";
import { levelToVietnamese } from "./utils";

const LOGO = "https://vmg-online.vercel.app/_next/image?url=%2Fflextrack%2Fflextrack_logo_white.png&w=1920&q=75";

function industryLabel(id: IndustryId): string {
  return INDUSTRIES.find((i) => i.id === id)?.labelVi || id;
}
function goalLabel(id: GoalId): string {
  return GOALS.find((g) => g.id === id)?.label || id;
}
function goalDescription(id: GoalId): string {
  const d: Record<GoalId, string> = {
    "professional-email": "có thể tự tin viết email chuyên nghiệp và trao đổi với đồng nghiệp, khách hàng và đối tác",
    "fluent-communication": "có thể tự tin giao tiếp trôi chảy và thảo luận hiệu quả với đối tác nước ngoài",
    "cefr-b1": "có thể tự tin giao tiếp trong hầu hết các tình huống công việc thông thường",
    "cefr-b2": "có thể tự tin thảo luận và thuyết trình nội dung phức tạp trong công việc bằng tiếng Anh",
    "cefr-c1": "có thể tự tin làm chủ các buổi thuyết trình và đàm phán chuyên sâu",
    "cefr-c2": "có thể tự tin sử dụng tiếng Anh thành thạo như ngôn ngữ thứ hai trong mọi tình huống",
  };
  return d[id] || "có thể tự tin làm chủ các tình huống giao tiếp trong công việc";
}
function sc(c: Record<CriterionKey, CriterionScore> | undefined, key: CriterionKey) {
  const v = c?.[key];
  return v ? { score: v.score.toFixed(1), level: levelToVietnamese(v.level), comment: v.comment } : { score: "0.0", level: "-", comment: "Chưa có dữ liệu" };
}
function levelColor(l: string) {
  switch (l) {
    case "Xuất sắc": return "#166534";
    case "Tốt": return "#065f46";
    case "Đạt yêu cầu": return "#92400e";
    case "Chưa đạt": return "#9a3412";
    default: return "#991b1b";
  }
}
function levelBg(l: string) {
  switch (l) {
    case "Xuất sắc": return "#dcfce7";
    case "Tốt": return "#d1fae5";
    case "Đạt yêu cầu": return "#fef3c7";
    case "Chưa đạt": return "#ffedd5";
    default: return "#fce4ec";
  }
}

export function generateAssessmentEmail(report: AssessmentReport): { subject: string; body: string; html: string } {
  const { userName, industry, goal, currentLevel, targetLevel, gapHours, packageLabel, strengths, weaknesses, fullResult } = report;
  const subject = "Kết quả bài thi thử tiếng Anh giao tiếp bằng AI";
  const body = `Kết quả bài thi thử tiếng Anh giao tiếp bằng AI\nTrình độ hiện tại: ${currentLevel.cefr}\nTrình độ mục tiêu: ${targetLevel.cefr}\nGói đề xuất: ${packageLabel} (${gapHours}h)`.trim();

  const p1 = fullResult?.part1;
  const p2 = fullResult?.part2;
  const signedName = userName || "Quý khách";

  const p1Rows = [["Phát âm","pronunciation"],["Lưu loát","fluency"],["Giọng điệu","prosody"],["Completeness","completeness"],["Overall","overall"]].map(([label, key]) => {
    const s = sc(p1?.criteria, key as CriterionKey);
    return `<tr>
      <td style="padding:8px 10px;border-bottom:1px solid #eee;font-size:13px;color:#333;font-weight:600">${label}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center;font-size:14px;font-weight:700;color:#1a1a1a">${s.score}/10</td>
      <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center"><span style="display:inline-block;padding:2px 8px;border-radius:3px;font-size:11px;font-weight:700;background:${levelBg(s.level)};color:${levelColor(s.level)}">${s.level}</span></td>
      <td style="padding:8px 10px;border-bottom:1px solid #eee;font-size:12px;color:#666">${s.comment}</td>
    </tr>`;
  }).join("");

  const p2Rows = [["Từ vựng","vocabulary"],["Ngữ pháp","grammar"],["Xử lý câu hỏi","questionHandling"],["Phát âm","pronunciation"],["Lưu loát","fluency"]].map(([label, key]) => {
    const s = sc(p2?.criteria, key as CriterionKey);
    const note = (key === "pronunciation" || key === "fluency") ? "[Đồng bộ từ Part 1] " : "";
    return `<tr>
      <td style="padding:8px 10px;border-bottom:1px solid #eee;font-size:13px;color:#333;font-weight:600">${label}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center;font-size:14px;font-weight:700;color:#1a1a1a">${s.score}/10</td>
      <td style="padding:8px 10px;border-bottom:1px solid #eee;text-align:center"><span style="display:inline-block;padding:2px 8px;border-radius:3px;font-size:11px;font-weight:700;background:${levelBg(s.level)};color:${levelColor(s.level)}">${s.level}</span></td>
      <td style="padding:8px 10px;border-bottom:1px solid #eee;font-size:12px;color:#666">${note}${s.comment}</td>
    </tr>`;
  }).join("");

  const strengthsHtml = strengths.length ? strengths.map((s) => `<li style="font-size:13px;color:#555;margin-bottom:4px;line-height:1.4">${s}</li>`).join("") : "<li style='font-size:13px;color:#999'>Chưa có đánh giá</li>";
  const weaknessesHtml = weaknesses.length ? weaknesses.map((w) => `<li style="font-size:13px;color:#555;margin-bottom:4px;line-height:1.4">${w}</li>`).join("") : "<li style='font-size:13px;color:#999'>Chưa có đánh giá</li>";

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f5f5f5">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:20px 10px">
<table width="640" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden">

<!-- HEADER -->
<tr><td style="background:#ffffff;padding:25px 30px 15px;text-align:center;border-bottom:3px solid #BE202F">
  <img src="${LOGO}" alt="FlexTrack" style="height:50px;width:auto;display:block;margin:0 auto 8px">
</td></tr>
<tr><td style="padding:12px 30px 5px;text-align:center">
  <h2 style="margin:0;color:#BE202F;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;font-weight:700">Kết quả bài thi thử tiếng Anh giao tiếp bằng AI</h2>
</td></tr>

<!-- PITCH -->
<tr><td style="padding:25px 30px 5px;font-size:14px;color:#555;line-height:1.8">
  <p style="margin:0 0 12px">Chào anh/chị <strong style="color:#BE202F">${signedName}</strong>,</p>
  <p style="margin:0 0 12px">Lời đầu tiên, cảm ơn anh/chị đã tin tưởng lựa chọn chương trình đào tạo của chúng tôi. Dựa trên nhu cầu thực tế của anh/chị trong ngành <strong style="color:#BE202F">${industryLabel(industry)}</strong> và mục tiêu cụ thể là <strong style="color:#BE202F">${goalLabel(goal)}</strong>, đội ngũ chuyên môn đã xây dựng lộ trình học tập riêng biệt như sau:</p>

  <p style="margin:0 0 8px"><strong>1. Giải pháp đào tạo:</strong> Lộ trình được thiết kế theo gói <strong>${packageLabel}</strong>. Chúng ta sẽ đi từ trình độ hiện tại <strong>${currentLevel.cefr}</strong> để đạt đến mục tiêu cam kết là <strong>${targetLevel.cefr}</strong>. Với trình độ này, anh/chị hoàn toàn ${goalDescription(goal)}.</p>

  <p style="margin:0 0 8px"><strong>2. Lịch học & Phương pháp:</strong> 3 buổi/tuần, mỗi buổi 60 phút, lịch học linh hoạt theo thời gian biểu cá nhân. Mô hình <strong>1 kèm 1</strong> tương tác trực tiếp 100%, phương pháp <strong>Role-play</strong> xử lý tình huống thực tế tại văn phòng.</p>

  <p style="margin:0 0 8px"><strong>3. Lộ trình 5 giai đoạn bứt phá:</strong></p>
  <ul style="margin:0 0 12px;padding-left:20px">
    <li style="font-size:13px;color:#555;line-height:1.7"><strong>Giai đoạn 1:</strong> Xây dựng nền tảng phản xạ giao tiếp tự nhiên.</li>
    <li style="font-size:13px;color:#555;line-height:1.7"><strong>Giai đoạn 2:</strong> Chuẩn hóa phát âm và luyện ngữ điệu chuyên nghiệp.</li>
    <li style="font-size:13px;color:#555;line-height:1.7"><strong>Giai đoạn 3:</strong> Mở rộng vốn từ vựng chuyên ngành theo đặc thù công việc của anh/chị.</li>
    <li style="font-size:13px;color:#555;line-height:1.7"><strong>Giai đoạn 4:</strong> Thực hành chuyên sâu kỹ năng họp, thuyết trình và trao đổi thực tế.</li>
    <li style="font-size:13px;color:#555;line-height:1.7"><strong>Giai đoạn 5:</strong> Đánh giá tổng kết và định hướng nâng cao sau khóa học.</li>
  </ul>

  <p style="margin:0 0 5px"><strong style="color:#BE202F">VMG FlexTrack</strong> xin gửi chi tiết kết quả phân tích năng lực bên dưới để anh/chị nắm rõ các chỉ số về phát âm, từ vựng và ngữ pháp hiện tại của mình.</p>
</td></tr>

<tr><td style="padding:10px 30px"><div style="border-top:2px solid #B6914C"></div></td></tr>

<!-- CEFR LEVELS -->
<tr><td style="padding:10px 30px 20px">
  <table width="100%" cellpadding="0" cellspacing="0" style="border:2px solid #B6914C;border-radius:8px">
    <tr>
      <td style="background:#fff5f5;padding:12px;text-align:center;width:33%">
        <div style="font-size:10px;color:#BE202F;text-transform:uppercase;font-weight:700;letter-spacing:1px">Trình độ hiện tại</div>
        <div style="font-size:22px;font-weight:800;color:#BE202F;margin-top:4px">${currentLevel.cefr}</div>
      </td>
      <td style="background:#fdfaf3;padding:12px;text-align:center;width:34%">
        <div style="font-size:10px;color:#B6914C;text-transform:uppercase;font-weight:700;letter-spacing:1px">Khoảng cách</div>
        <div style="font-size:18px;font-weight:800;color:#B6914C;margin-top:4px">${gapHours}h</div>
        <div style="font-size:10px;color:#999">${packageLabel}</div>
      </td>
      <td style="background:#f0f4f8;padding:12px;text-align:center;width:33%">
        <div style="font-size:10px;color:#232d3b;text-transform:uppercase;font-weight:700;letter-spacing:1px">Mục tiêu</div>
        <div style="font-size:22px;font-weight:800;color:#B6914C;margin-top:4px">${targetLevel.cefr}</div>
      </td>
    </tr>
  </table>
</td></tr>

${fullResult ? `
<!-- SCORE TABLES -->
<tr><td style="padding:0 30px 20px">
  <h3 style="margin:0 0 8px;font-size:14px;color:#BE202F;text-transform:uppercase;letter-spacing:1px">BÁO CÁO PHÂN TÍCH NĂNG LỰC</h3>
  <h4 style="margin:0 0 6px;font-size:12px;color:#BE202F">Part 1: Scripted Reading (${p1?.total.toFixed(1) ?? "0.0"}/50)</h4>
  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ddd;border-collapse:collapse">
    <thead><tr style="background:#BE202F;color:#fff">
      <th style="padding:8px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px">Tiêu chí</th>
      <th style="padding:8px 10px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.5px">Điểm</th>
      <th style="padding:8px 10px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.5px">Mức độ</th>
      <th style="padding:8px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px">Nhận xét</th>
    </tr></thead>
    <tbody>
      ${p1Rows}
      <tr style="background:#fff5f5">
        <td style="padding:8px 10px;font-size:13px;font-weight:700;color:#BE202F">Tổng Part 1</td>
        <td style="padding:8px 10px;text-align:center;font-size:15px;font-weight:800;color:#BE202F">${p1?.total.toFixed(1) ?? "0.0"}/50</td>
        <td colspan="2"></td>
      </tr>
    </tbody>
  </table>
</td></tr>

<tr><td style="padding:0 30px 20px">
  <h4 style="margin:0 0 6px;font-size:12px;color:#B6914C">Part 2: Role Play (${p2?.total.toFixed(1) ?? "0.0"}/50)</h4>
  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ddd;border-collapse:collapse">
    <thead><tr style="background:#B6914C;color:#fff">
      <th style="padding:8px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px">Tiêu chí</th>
      <th style="padding:8px 10px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.5px">Điểm</th>
      <th style="padding:8px 10px;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:0.5px">Mức độ</th>
      <th style="padding:8px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px">Nhận xét</th>
    </tr></thead>
    <tbody>
      ${p2Rows}
      <tr style="background:#fdfaf3">
        <td style="padding:8px 10px;font-size:13px;font-weight:700;color:#B6914C">Tổng Part 2</td>
        <td style="padding:8px 10px;text-align:center;font-size:15px;font-weight:800;color:#B6914C">${p2?.total.toFixed(1) ?? "0.0"}/50</td>
        <td colspan="2"></td>
      </tr>
    </tbody>
  </table>
</td></tr>

<tr><td style="padding:0 30px 20px">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#BE202F;border-radius:6px">
    <tr><td style="padding:12px 20px;text-align:center">
      <span style="color:rgba(255,255,255,0.7);font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:700">Tổng điểm</span>
      <span style="color:#fff;font-size:26px;font-weight:800;margin-left:12px">${fullResult.grandTotal.toFixed(1)}/${fullResult.grandMax}</span>
    </td></tr>
  </table>
</td></tr>
` : ""}

<!-- STRENGTHS -->
<tr><td style="padding:0 30px 20px">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td width="50%" style="padding-right:8px;vertical-align:top">
        <h3 style="margin:0 0 6px;font-size:11px;color:#166534;text-transform:uppercase;letter-spacing:1px">Điểm mạnh</h3>
        <ul style="margin:0;padding-left:16px">${strengthsHtml}</ul>
      </td>
      <td width="50%" style="padding-left:8px;vertical-align:top">
        <h3 style="margin:0 0 6px;font-size:11px;color:#991b1b;text-transform:uppercase;letter-spacing:1px">Cần cải thiện</h3>
        <ul style="margin:0;padding-left:16px">${weaknessesHtml}</ul>
      </td>
    </tr>
  </table>
</td></tr>

<!-- CLOSING -->
<tr><td style="padding:10px 30px">
  <p style="margin:0;font-size:14px;color:#555;line-height:1.8">Rất mong được đồng hành cùng anh/chị trên hành trình chinh phục mục tiêu này!</p>
  <p style="margin:12px 0 0;font-size:14px;color:#333;font-weight:600">Trân trọng,<br><span style="color:#BE202F;font-weight:700">VMG FlexTrack</span></p>
</td></tr>

<tr><td style="padding:5px 30px 25px;text-align:center">
  <a href="https://vmg-tesol.edu.vn/giaotiep-1-1" style="display:inline-block;background:#BE202F;color:#fff;padding:12px 32px;text-decoration:none;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-radius:4px">Đăng ký tư vấn ngay</a>
</td></tr>

<tr><td style="background:#f5f5f5;padding:15px 30px;text-align:center;border-top:1px solid #ddd">
  <p style="margin:0;font-size:10px;color:#999;line-height:1.5">VMG FlexTrack | Email: info@vmg-tesol.edu.vn | Hotline: 1900 xxxx</p>
</td></tr>

</table>
</td></tr></table>
</body>
</html>`;

  return { subject, body, html };
}

export async function sendAssessmentEmail(report: AssessmentReport, from: string = "VMG FlexTrack <noreply@thelong.online>"): Promise<{ success: boolean; message: string }> {
  if (!report.userEmail) {
    console.warn("[EMAIL] No user email provided, skipping");
    return { success: false, message: "No email address" };
  }
  const { subject, body, html } = generateAssessmentEmail(report);
  try {
    await sendEmail({ to: report.userEmail, subject, html, text: body, from, tags: [{name:"category",value:"assessment-result"},{name:"industry",value:report.industry}] });
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[EMAIL] Failed:", message);
    return { success: false, message };
  }
}