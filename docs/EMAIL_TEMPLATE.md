# Email Template - Assessment Results & Learning Path

## Subject Lines

**Vietnamese:**
```
Kết quả đánh giá & Lộ trình học EPLUS của bạn
```

**English:**
```
Your EPLUS Assessment Results & Learning Path
```

---

## Email Template (HTML)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; background: #f9f9f9; }
    .score-box { background: white; border-radius: 10px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .score-number { font-size: 48px; font-weight: bold; color: #2d5a87; }
    .level-badge { display: inline-block; background: #4CAF50; color: white; padding: 8px 20px; border-radius: 20px; font-weight: bold; }
    .criteria-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .criteria-table th, .criteria-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    .criteria-table th { background: #f5f5f5; }
    .learning-path { background: white; border-radius: 10px; padding: 25px; margin: 20px 0; }
    .path-item { padding: 15px; margin: 10px 0; border-left: 4px solid #2d5a87; background: #f5f8fa; }
    .path-item.current { border-left-color: #4CAF50; background: #e8f5e9; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    .cta-button { display: inline-block; background: #2d5a87; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Kết quả đánh giá EPLUS</h1>
      <p>EPLUS Speaking Assessment Results</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Greeting -->
      <p>Xin chào <strong>{{student_name}}</strong>,</p>
      <p>Cảm ơn bạn đã tham gia đánh giá năng lực tiếng Anh EPLUS. Dưới đây là kết quả chi tiết của bạn:</p>

      <!-- Score Overview -->
      <div class="score-box">
        <h2 style="margin-top: 0;">Tổng điểm / Total Score</h2>
        <div class="score-number">{{total_score}}/100</div>
        <span class="level-badge">{{cefr_level}} - {{eplus_level}}</span>
      </div>

      <!-- Criteria Scores -->
      <h3>Chi tiết điểm theo tiêu chí</h3>
      <table class="criteria-table">
        <thead>
          <tr>
            <th>Tiêu chí</th>
            <th>Điểm</th>
            <th>Mức độ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Từ vựng (Vocabulary)</td>
            <td>{{vocabulary_score}}/10</td>
            <td>{{vocabulary_level}}</td>
          </tr>
          <tr>
            <td>Ngữ pháp (Grammar)</td>
            <td>{{grammar_score}}/10</td>
            <td>{{grammar_level}}</td>
          </tr>
          <tr>
            <td>Phát âm (Pronunciation)</td>
            <td>{{pronunciation_score}}/10</td>
            <td>{{pronunciation_level}}</td>
          </tr>
          <tr>
            <td>Lưu loát (Fluency)</td>
            <td>{{fluency_score}}/10</td>
            <td>{{fluency_level}}</td>
          </tr>
          <tr>
            <td>Xử lý câu hỏi (Question Handling)</td>
            <td>{{questionhandling_score}}/10</td>
            <td>{{questionhandling_level}}</td>
          </tr>
        </tbody>
      </table>

      <!-- Learning Path Recommendation -->
      <div class="learning-path">
        <h2>📚 Lộ trình học được đề xuất</h2>
        <h3>Your Recommended Learning Path</h3>
        
        <p>Dựa trên kết quả đánh giá, chúng tôi recommend bạn bắt đầu với:</p>
        
        {{#if (eq eplus_level "Pre EPLUS")}}
        <div class="path-item current">
          <h4>🎯 Pre EPLUS (CEFR: A1)</h4>
          <p><strong>Level hiện tại của bạn / Your current level</strong></p>
          <p>Giao tiếp sinh tồn, nền tảng căn bản</p>
          <ul>
            <li>Chào hỏi, giới thiệu bản thân</li>
            <li>Hỏi và trả lời thông tin cá nhân</li>
            <li>Nói về gia đình, công việc</li>
          </ul>
        </div>
        {{/if}}

        {{#if (eq eplus_level "EPLUS 1")}}
        <div class="path-item current">
          <h4>🎯 EPLUS 1 (CEFR: A2)</h4>
          <p><strong>Level hiện tại của bạn / Your current level</strong></p>
          <p>Giao tiếp hàng ngày, hội thoại quen thuộc</p>
        </div>
        <div class="path-item">
          <h4>📖 EPLUS 2 (CEFR: A2+)</h4>
          <p><strong>Level tiếp theo / Next level</strong></p>
          <p>Giao tiếp chức năng trong đời sống và công việc</p>
        </div>
        {{/if}}

        {{#if (eq eplus_level "EPLUS 2")}}
        <div class="path-item current">
          <h4>🎯 EPLUS 2 (CEFR: A2+)</h4>
          <p><strong>Level hiện tại của bạn / Your current level</strong></p>
          <p>Giao tiếp chức năng trong đời sống và công việc</p>
        </div>
        <div class="path-item">
          <h4>📖 EPLUS 3 (CEFR: B1)</h4>
          <p><strong>Level tiếp theo / Next level</strong></p>
          <p>Giao tiếp mở rộng, xử lý tình huống</p>
        </div>
        {{/if}}

        {{#if (eq eplus_level "EPLUS 3")}}
        <div class="path-item current">
          <h4>🎯 EPLUS 3 (CEFR: B1)</h4>
          <p><strong>Level hiện tại của bạn / Your current level</strong></p>
          <p>Giao tiếp mở rộng, xử lý tình huống</p>
        </div>
        <div class="path-item">
          <h4>📖 EPLUS 4 (CEFR: B1+)</h4>
          <p><strong>Level tiếp theo / Next level</strong></p>
          <p>Giao tiếp độc lập, chuyên nghiệp</p>
        </div>
        {{/if}}

        {{#if (eq eplus_level "EPLUS 4")}}
        <div class="path-item current">
          <h4>🎯 EPLUS 4 (CEFR: B1+)</h4>
          <p><strong>Chúc mừng! Congratulations!</strong></p>
          <p>Bạn đã đạt level cao nhất của chương trình EPLUS!</p>
        </div>
        {{/if}}
      </div>

      <!-- CTA -->
      <div style="text-align: center;">
        <a href="{{cta_url}}" class="cta-button">Đăng ký ngay / Register Now</a>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>© 2024 EPLUS - Hệ thống anh ngữ Việt Mỹ VMG</p>
        <p>Hotline: 1900 xxxx | Email: info@eplus.edu.vn</p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `{{student_name}}` | Student's name | Nguyễn Văn A |
| `{{total_score}}` | Total score (0-100) | 72 |
| `{{cefr_level}}` | CEFR level | B1 |
| `{{eplus_level}}` | EPLUS level | EPLUS 2 |
| `{{vocabulary_score}}` | Vocabulary score (/10) | 8 |
| `{{vocabulary_level}}` | Vocabulary level | Good |
| `{{grammar_score}}` | Grammar score (/10) | 6 |
| `{{grammar_level}}` | Grammar level | Adequate |
| `{{pronunciation_score}}` | Pronunciation score (/10) | 8 |
| `{{pronunciation_level}}` | Pronunciation level | Good |
| `{{fluency_score}}` | Fluency score (/10) | 6 |
| `{{fluency_level}}` | Fluency level | Adequate |
| `{{questionhandling_score}}` | Question Handling score (/10) | 8 |
| `{{questionhandling_level}}` | Question Handling level | Good |
| `{{cta_url}}` | Registration link | https://eplus.edu.vn/register |

---

## Learning Path Details

### Pre EPLUS (A1) - Giao tiếp sinh tồn

**Topics:**
- Greetings & Introductions
- Personal Information
- Family & Friends
- Possessions
- Interests
- Lifestyles

**Applications:**
- Chào hỏi khi gặp người mới
- Giới thiệu tên, tuổi, nghề nghiệp
- Nói về gia đình
- Nói về sở thích

---

### EPLUS 1 (A2) - Giao tiếp hàng ngày

**Topics:**
- New Friends
- Interests
- People
- Shopping
- Food
- Past and Future

**Applications:**
- Làm quen với người mới
- Nói chuyện xã giao ngắn
- Hỏi và trả lời về sở thích
- Mua đồ, hỏi giá

---

### EPLUS 2 (A2+) - Giao tiếp chức năng

**Topics:**
- Family and Friends
- Restaurants
- Health and Lifestyle
- Jobs
- Travel
- Opinions

**Applications:**
- Đi nhà hàng, gọi món
- Nói về sức khỏe
- Trao đổi về công việc
- Thực hiện cuộc gọi công việc

---

### EPLUS 3 (B1) - Giao tiếp mở rộng

**Topics:**
- People
- Vacation
- Errands
- Stories
- Business
- Future

**Applications:**
- Nhận phòng khách sạn
- Đặt lịch hẹn
- Kể chuyện
- Thuyết trình ngắn

---

### EPLUS 4 (B1+) - Giao tiếp độc lập

**Topics:**
- Socializing
- Career
- Feelings
- Pop Culture
- Travel
- News

**Applications:**
- Tham gia phỏng vấn
- Nêu quan điểm
- Thuyết trình
- Bảo vệ quan điểm bằng lý do và ví dụ
