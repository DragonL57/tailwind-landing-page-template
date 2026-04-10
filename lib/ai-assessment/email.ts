import type { AssessmentReport, LevelInfo } from "./types";
import type { IndustryId, GoalId } from "./constants";

export function generateAssessmentEmail(
  report: AssessmentReport
): { subject: string; body: string; html: string } {
  const { currentLevel, targetLevel, gapHours, packageLabel, scores, strengths, weaknesses, roadmap, industry, goal } = report;

  const subject = "Kết quả đánh giá trình độ tiếng Anh - giaotiep-1-1";

  const body = `
Xin chào${report.userName ? ` ${report.userName}` : ''},

Cảm ơn bạn đã tham gia bài đánh giá trình độ tiếng Anh của giaotiep-1-1.

KẾT QUẢ ĐÁNH GIÁ
- Trình độ hiện tại: ${currentLevel.level} (${currentLevel.cefr})
- Mục tiêu của bạn: ${targetLevel.level} (${targetLevel.cefr})
- Khoảng cách: ${gapHours > 0 ? `${gapHours} giờ học (${packageLabel})` : 'Bạn đã đạt mục tiêu!'}

ĐIỂM MẠNH
${strengths.length > 0 ? strengths.map(s => `- ${s}`).join('\n') : 'Chưa có đánh giá'}

ĐIỂM CẦN CẢI THIỆN
${weaknesses.length > 0 ? weaknesses.map(w => `- ${w}`).join('\n') : 'Chưa có đánh giá'}

LỘ TRÌNH HỌC TẬP
${roadmap.map(r => `- ${r}`).join('\n')}

Để được tư vấn chi tiết về lộ trình học tập, vui lòng liên hệ:
- Email: info@giaotiep-1-1.com
- Hotline: 1900 xxxx

Trân trọng,
Đội ngũ giaotiep-1-1
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #003366; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .result-box { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #003366; }
    .level { font-size: 24px; font-weight: bold; color: #003366; }
    .score-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 15px 0; }
    .score-item { background: white; padding: 10px; border-radius: 4px; text-align: center; }
    .score-label { font-size: 12px; color: #666; }
    .score-value { font-size: 20px; font-weight: bold; color: #003366; }
    .section { margin: 20px 0; }
    .section h3 { color: #003366; border-bottom: 2px solid #003366; padding-bottom: 5px; }
    .roadmap-list { list-style: none; padding: 0; }
    .roadmap-list li { background: white; padding: 10px; margin: 5px 0; border-radius: 4px; border-left: 3px solid #B6914C; }
    .cta-button { display: inline-block; background: #B6914C; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Kết Quả Đánh Giá Trình Độ Tiếng Anh</h1>
    <p>giaotiep-1-1</p>
  </div>
  
  <div class="content">
    <p>Xin chào${report.userName ? ` <strong>${report.userName}</strong>` : ''},</p>
    <p>Cảm ơn bạn đã tham gia bài đánh giá trình độ tiếng Anh của giaotiep-1-1.</p>
    
    <div class="result-box">
      <h2 style="margin-top: 0;">KẾT QUẢ ĐÁNH GIÁ</h2>
      <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
        <div>
          <div class="score-label">TRÌNH ĐỘ HIỆN TẠI</div>
          <div class="level">${currentLevel.level}</div>
          <div>${currentLevel.cefr}</div>
        </div>
        <div style="text-align: right;">
          <div class="score-label">MỤC TIÊU</div>
          <div class="level">${targetLevel.level}</div>
          <div>${targetLevel.cefr}</div>
        </div>
      </div>
      <div style="background: #003366; color: white; padding: 10px; text-align: center; border-radius: 4px;">
        ${gapHours > 0 ? `Khuyến nghị: <strong>${packageLabel}</strong> (${gapHours} giờ học)` : '<strong>Bạn đã đạt mục tiêu!</strong>'}
      </div>
    </div>

    <div class="score-grid">
      <div class="score-item">
        <div class="score-label">Phát Âm</div>
        <div class="score-value">${scores.pronunciation}</div>
      </div>
      <div class="score-item">
        <div class="score-label">Lưu Loát</div>
        <div class="score-value">${scores.fluency}</div>
      </div>
      <div class="score-item">
        <div class="score-label">Từ Vựng</div>
        <div class="score-value">${scores.vocabulary}</div>
      </div>
      <div class="score-item">
        <div class="score-label">Ngữ Pháp</div>
        <div class="score-value">${scores.grammar}</div>
      </div>
    </div>

    ${strengths.length > 0 ? `
    <div class="section">
      <h3>Điểm Mạnh</h3>
      <ul>
        ${strengths.map(s => `<li>${s}</li>`).join('')}
      </ul>
    </div>
    ` : ''}

    ${weaknesses.length > 0 ? `
    <div class="section">
      <h3>Điểm Cần Cải Thiện</h3>
      <ul>
        ${weaknesses.map(w => `<li>${w}</li>`).join('')}
      </ul>
    </div>
    ` : ''}

    <div class="section">
      <h3>Lộ Trình Học Tập Đề Xuất</h3>
      <ul class="roadmap-list">
        ${roadmap.map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>

    <div style="text-align: center;">
      <a href="#" class="cta-button">Đăng Ký Ngay</a>
    </div>
  </div>

  <div class="footer">
    <p>Để được tư vấn chi tiết về lộ trình học tập, vui lòng liên hệ:</p>
    <p>Email: info@giaotiep-1-1.com | Hotline: 1900 xxxx</p>
    <p>&copy; 2024 giaotiep-1-1. All rights reserved.</p>
  </div>
</body>
</html>
  `.trim();

  return { subject, body, html };
}

export function createAssessmentReport(
  industry: IndustryId,
  goal: GoalId,
  currentLevel: LevelInfo,
  targetLevel: LevelInfo,
  gapHours: number,
  packageLabel: string,
  criteria: { pronunciation: number; fluency: number; vocabulary: number; grammar: number; questionHandling: number },
  strengths: string[],
  weaknesses: string[],
  roadmap: string[],
  userEmail?: string,
  userName?: string
): AssessmentReport {
  return {
    userEmail,
    userName,
    industry,
    goal,
    currentLevel,
    targetLevel,
    gapHours,
    packageLabel,
    scores: criteria,
    strengths,
    weaknesses,
    roadmap,
  };
}
