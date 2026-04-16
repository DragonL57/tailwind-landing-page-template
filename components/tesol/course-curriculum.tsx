"use client";

import { useState } from "react";
import FadeSlideUp from "./fade-slide-up";

interface Lesson {
  type: "Video" | "Thảo luận" | "Bài tập Thực hành" | "Bài kiểm tra";
  title: string;
  titleVi: string;
  duration?: number;
}

interface Module {
  id: number;
  title: string;
  titleVi: string;
  totalDuration: number;
  totalLessons: number;
  lessons: Lesson[];
}

const curriculumData: Module[] = [
  {
    id: 1,
    title: "A Critical & Practical Guide to Grammar Pedagogy",
    titleVi: "Hướng dẫn thực hành về Sư phạm Ngữ pháp",
    totalDuration: 133,
    totalLessons: 9,
    lessons: [
      { type: "Video", title: "A Critical & Practical Guide to Grammar Pedagogy - SLOs & foundational terms", titleVi: "Chuẩn đầu ra & Thuật ngữ nền tảng", duration: 5 },
      { type: "Video", title: "The Deductive Approach - A Deep dive", titleVi: "Phương pháp Diễn dịch - Phân tích chuyên sâu", duration: 7 },
      { type: "Video", title: "Strengths and Weaknesses of the Deductive Approach", titleVi: "Ưu nhược điểm của Phương pháp Diễn dịch", duration: 8 },
      { type: "Video", title: "Stage 3 and 4 of the Deductive approach", titleVi: "Giai đoạn 3 và 4 của Phương pháp Diễn dịch", duration: 4 },
      { type: "Thảo luận", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
      { type: "Video", title: "The Inductive Approach - A Deep Dive", titleVi: "Phương pháp Quy nạp - Phân tích chuyên sâu", duration: 6 },
      { type: "Thảo luận", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
      { type: "Video", title: "The art of Inductive Questioning", titleVi: "Nghệ thuật đặt câu hỏi Quy nạp", duration: 13 },
      { type: "Bài kiểm tra", title: "Final quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
    ]
  },
  {
    id: 2,
    title: "Teaching Pronunciation and Lexis",
    titleVi: "Giảng dạy Phát âm và Từ vựng",
    totalDuration: 190,
    totalLessons: 13,
    lessons: [
      { type: "Video", title: "Teaching Pronunciation and Lexis - Introduction", titleVi: "Giới thiệu Giảng dạy Phát âm & Từ vựng", duration: 3 },
      { type: "Video", title: "Why Focus on Pronunciation & Lexis?", titleVi: "Tại sao cần chú trọng Phát âm & Từ vựng?", duration: 4 },
      { type: "Video", title: "Segmentals vs. Suprasegmentals", titleVi: "Âm đoạn với Siêu âm đoạn", duration: 2 },
      { type: "Video", title: "Segmentals - Deep dive", titleVi: "Đi sâu vào Âm đoạn", duration: 7 },
      { type: "Thảo luận", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
      { type: "Video", title: "Suprasegmentals - Deep dive", titleVi: "Đi sâu vào Siêu âm đoạn", duration: 7 },
      { type: "Thảo luận", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
      { type: "Video", title: "Lesson Walkthrough and Discussion - An Integrated Stress Lesson", titleVi: "Hướng dẫn bài giảng Trọng âm Tích hợp", duration: 3 },
      { type: "Video", title: "Moving from Vocabulary to Lexis", titleVi: "Từ Từ vựng sang Hệ thống Ngữ vựng", duration: 10 },
      { type: "Thảo luận", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
      { type: "Video", title: "From Reactive to Planned Instruction", titleVi: "Từ Dạy ứng biến sang Dạy có chủ đích", duration: 4 },
      { type: "Thảo luận", title: "Discussion 4", titleVi: "Thảo luận 4", duration: 30 },
      { type: "Bài kiểm tra", title: "Final Quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
    ]
  },
  {
    id: 3,
    title: "An Overview of Core ESOL Issues",
    titleVi: "Tổng quan các vấn đề cốt lõi trong ESOL",
    totalDuration: 149,
    totalLessons: 9,
    lessons: [
      { type: "Video", title: "An Overview of Core ESOL Issues - Learning objectives and foundational terms", titleVi: "Mục tiêu học tập & Thuật ngữ nền tảng", duration: 9 },
      { type: "Video", title: "Engagement in the classroom - Theory", titleVi: "Lý thuyết về sự gắn kết trong lớp học", duration: 9 },
      { type: "Thảo luận", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
      { type: "Video", title: "Drilling for Accuracy", titleVi: "Luyện tập rập khuôn để đạt độ chính xác", duration: 4 },
      { type: "Thảo luận", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
      { type: "Video", title: "Inductive vs. Deductive Teaching", titleVi: "Dạy học Quy nạp và Diễn dịch", duration: 4 },
      { type: "Thảo luận", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
      { type: "Video", title: "The Cognitive & Interactionist Toolkit", titleVi: "Bộ công cụ Nhận thức và Tương tác", duration: 3 },
      { type: "Bài kiểm tra", title: "Final Assessment quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
    ]
  },
  {
    id: 4,
    title: "The Art & Science of Teaching Receptive Skills",
    titleVi: "Nghệ thuật & Khoa học Giảng dạy Kỹ năng Tiếp nhận",
    totalDuration: 152,
    totalLessons: 8,
    lessons: [
      { type: "Video", title: "Overview - The Art & Science of Teaching Receptive Skills - Learning objectives", titleVi: "Tổng quan & Mục tiêu học tập", duration: 3 },
      { type: "Video", title: "What Makes Listening Difficult?", titleVi: "Tại sao kỹ năng Nghe lại khó?", duration: 4 },
      { type: "Thảo luận", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
      { type: "Video", title: "Three Listening Stages", titleVi: "Ba giai đoạn của bài giảng Nghe", duration: 10 },
      { type: "Thảo luận", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
      { type: "Video", title: "Teaching Reading", titleVi: "Giảng dạy kỹ năng Đọc", duration: 15 },
      { type: "Thảo luận", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
      { type: "Bài kiểm tra", title: "Final assessment Quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
    ]
  },
  {
    id: 5,
    title: "The Art & Science of Teaching Productive Skills",
    titleVi: "Nghệ thuật & Khoa học Giảng dạy Kỹ năng Sinh ngôn ngữ",
    totalDuration: 158,
    totalLessons: 8,
    lessons: [
      { type: "Video", title: "Overview - The Art & Science of Teaching Productive Skills", titleVi: "Tổng quan Giảng dạy Kỹ năng Sinh ngôn ngữ", duration: 4 },
      { type: "Video", title: "The Dual Purpose of Production in the Classroom", titleVi: "Mục đích kép của Sinh ngôn ngữ", duration: 4 },
      { type: "Thảo luận", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
      { type: "Video", title: "Analyzing the Speaking Skill", titleVi: "Phân tích kỹ năng Nói", duration: 19 },
      { type: "Thảo luận", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
      { type: "Video", title: "A Deep Dive into Teaching Writing", titleVi: "Đi sâu vào Giảng dạy kỹ năng Viết", duration: 11 },
      { type: "Thảo luận", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
      { type: "Bài kiểm tra", title: "Final Assessment Quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
    ]
  },
  {
    id: 6,
    title: "Enhancing Learning through Feedback and Resources",
    titleVi: "Nâng cao Học tập qua Phản hồi và Tài nguyên",
    totalDuration: 237,
    totalLessons: 15,
    lessons: [
      { type: "Video", title: "Overview - Enhancing Learning through Feedback and Resources", titleVi: "Tổng quan Nâng cao Học tập", duration: 2 },
      { type: "Video", title: "The Art & Science of Error Correction - Overview and Learning Outcomes", titleVi: "Nghệ thuật & Khoa học Sửa lỗi", duration: 3 },
      { type: "Video", title: "Understanding Errors", titleVi: "Thấu hiểu các loại lỗi", duration: 3 },
      { type: "Thảo luận", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
      { type: "Video", title: "A mistake vs an error", titleVi: "Phân biệt Mistake và Error", duration: 2 },
      { type: "Video", title: "Providing correction", titleVi: "Cách thức cung cấp phản hồi sửa lỗi", duration: 13 },
      { type: "Thảo luận", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
      { type: "Video", title: "The power of Instructional Aids", titleVi: "Sức mạnh của Học liệu Hỗ trợ", duration: 3 },
      { type: "Video", title: "Why and how to use visual aids", titleVi: "Tại sao và cách dùng Trực quan", duration: 6 },
      { type: "Video", title: "Different visual tools", titleVi: "Các công cụ trực quan khác nhau", duration: 4 },
      { type: "Thảo luận", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
      { type: "Video", title: "Teaching at Public school", titleVi: "Giảng dạy tại trường công lập", duration: 16 },
      { type: "Thảo luận", title: "Discussion 4", titleVi: "Thảo luận 4", duration: 30 },
      { type: "Video", title: "A virtuous cycle of teaching", titleVi: "Vòng lặp giảng dạy hiệu quả", duration: 5 },
      { type: "Bài kiểm tra", title: "Final quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
    ]
  },
  {
    id: 7,
    title: "Classroom Management and Lesson Planning",
    titleVi: "Quản lý lớp học và Lập kế hoạch bài giảng",
    totalDuration: 230,
    totalLessons: 15,
    lessons: [
      { type: "Video", title: "Overview - The philosophy and practice of classroom management", titleVi: "Triết lý và thực hành quản lý lớp học", duration: 7 },
      { type: "Video", title: "The core aim and the teacher's mindset", titleVi: "Mục tiêu cốt lõi và tư duy giáo viên", duration: 3 },
      { type: "Video", title: "Classroom Management & Lesson Planning - Practical Techniques 1-3", titleVi: "Kỹ thuật thực hành quản lý 1-3", duration: 12 },
      { type: "Thảo luận", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
      { type: "Video", title: "Practical Application for big classrooms", titleVi: "Ứng dụng thực tế cho lớp học đông", duration: 11 },
      { type: "Thảo luận", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
      { type: "Video", title: "Classroom Management & Lesson Planning - Practical Techniques 4-6", titleVi: "Kỹ thuật thực hành quản lý 4-6", duration: 13 },
      { type: "Thảo luận", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
      { type: "Video", title: "The Architecture of an Effective Lesson Plan", titleVi: "Cấu trúc kế hoạch bài giảng hiệu quả", duration: 3 },
      { type: "Video", title: "The Architecture of an Effective Lesson Plan - The step by step approach", titleVi: "Tiến trình lập kế hoạch bài giảng", duration: 12 },
      { type: "Video", title: "The lesson plan in Action", titleVi: "Kế hoạch bài giảng trong thực tế", duration: 3 },
      { type: "Video", title: "Stages of a basic TEFL lesson", titleVi: "Các giai đoạn của bài giảng TEFL cơ bản", duration: 12 },
      { type: "Thảo luận", title: "Discussion 4", titleVi: "Thảo luận 4", duration: 30 },
      { type: "Video", title: "Summary", titleVi: "Phần tổng kết", duration: 4 },
      { type: "Bài kiểm tra", title: "Final quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
    ]
  },
  {
    id: 8,
    title: "Teaching Young Learners",
    titleVi: "Giảng dạy tiếng Anh cho trẻ em",
    totalDuration: 206,
    totalLessons: 12,
    lessons: [
      { type: "Video", title: "Overview and learning outcomes", titleVi: "Tổng quan & Chuẩn đầu ra", duration: 15 },
      { type: "Video", title: "Understanding young learners", titleVi: "Thấu hiểu người học nhỏ tuổi", duration: 9 },
      { type: "Thảo luận", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
      { type: "Video", title: "Learning patterns of young learners", titleVi: "Mô hình học tập của trẻ em", duration: 19 },
      { type: "Video", title: "Sample lesson plan for young learners", titleVi: "Mẫu kế hoạch bài giảng chuyên sâu", duration: 11 },
      { type: "Thảo luận", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
      { type: "Video", title: "Four key pillars of effective classroom management", titleVi: "Bốn trụ cột quản lý lớp học hiệu quả", duration: 9 },
      { type: "Thảo luận", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
      { type: "Video", title: "Teacher's checklist", titleVi: "Danh sách kiểm tra dành cho giáo viên", duration: 12 },
      { type: "Video", title: "Designing a child-centered lesson", titleVi: "Thiết kế bài học lấy trẻ làm trung tâm", duration: 9 },
      { type: "Bài kiểm tra", title: "Final quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
      { type: "Video", title: "End of course", titleVi: "Hoàn thành khóa học", duration: 2 },
    ]
  }
];

export default function CourseCurriculum() {
  const [openModule, setOpenModule] = useState<number | null>(null);

  const toggleModule = (moduleId: number) => {
    setOpenModule(openModule === moduleId ? null : moduleId);
  };

  const getStatusColor = (type: Lesson["type"]) => {
    switch (type) {
      case "Video": return "bg-vmg-blue";
      case "Thảo luận": return "bg-vmg-green";
      case "Bài kiểm tra": return "bg-vmg-red";
      default: return "bg-vmg-navy/40";
    }
  };

  const totalCourseDuration = curriculumData.reduce((sum, m) => sum + m.totalDuration, 0);
  const totalCourseLessons = curriculumData.reduce((sum, m) => sum + m.totalLessons, 0);

  return (
    <div className="space-y-12 section-padding" id="curriculum">
      {/* Section Header */}
      <FadeSlideUp>
        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-vmg-blue mb-2 block">Chương trình đào tạo</span>
          <h2 className="text-3xl md:text-4xl font-black text-vmg-navy mb-4 tracking-tight">
            Nội dung Khóa học Chi tiết
          </h2>
          <p className="text-sm font-bold text-vmg-navy/50 mb-10">
            8 chương • {totalCourseLessons} bài học • {Math.floor(totalCourseDuration / 60)} giờ {totalCourseDuration % 60} phút
          </p>
        </div>
      </FadeSlideUp>

      {/* High Contrast Accordion */}
      <FadeSlideUp delay={0.15}>
        <div className="max-w-[1000px] mx-auto space-y-4">
          {curriculumData.map((module) => (
            <div key={module.id} className="rounded-3xl border-2 border-vmg-blue/10 overflow-hidden shadow-sm hover:border-vmg-blue/30 transition-all duration-300 group/module">
              <button
                onClick={() => toggleModule(module.id)}
                className={`w-full py-6 px-8 flex items-center justify-between transition-all duration-300 ${
                  openModule === module.id 
                    ? "bg-vmg-blue-soft/50 border-b-2 border-vmg-blue/5" 
                    : "bg-white hover:bg-vmg-blue-soft/20"
                }`}
              >
                <div className="flex items-center gap-6 text-left">
                  <span className={`text-2xl font-black tabular-nums ${openModule === module.id ? "text-vmg-blue" : "text-vmg-navy/10 group-hover/module:text-vmg-blue/30"}`}>
                    {module.id < 10 ? `0${module.id}` : module.id}
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-vmg-navy tracking-tight">{module.title}</h3>
                    <p className="text-xs font-bold text-vmg-navy/40 mt-0.5">
                      {module.titleVi}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.1em] text-vmg-blue/60 bg-vmg-blue/5 px-3 py-1 rounded-full">
                    {module.totalLessons} bài
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    openModule === module.id ? "bg-vmg-blue border-vmg-blue text-white rotate-180" : "bg-white border-vmg-blue/10 text-vmg-blue/30 group-hover/module:border-vmg-blue/30"
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* High Contrast Content */}
              {openModule === module.id && (
                <div className="bg-white p-2 animate-fadeIn">
                  <div className="space-y-1">
                    {module.lessons.map((lesson, lessonIdx) => (
                      <div
                        key={lessonIdx}
                        className="flex items-center gap-4 py-4 px-6 hover:bg-vmg-blue-soft/30 rounded-2xl transition-all duration-200 group/lesson border border-transparent hover:border-vmg-blue/5"
                      >
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(lesson.type)} shadow-sm`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-vmg-navy/80 group-hover/lesson:text-vmg-blue transition-colors">
                            {lesson.title}
                          </p>
                          <p className="text-[11px] text-vmg-navy/40 font-bold mt-0.5">{lesson.titleVi}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                            lesson.type === 'Video' ? 'bg-vmg-blue/10 text-vmg-blue' : 
                            lesson.type === 'Thảo luận' ? 'bg-vmg-green/10 text-vmg-green' : 
                            'bg-vmg-red/10 text-vmg-red'
                          }`}>
                            {lesson.type}
                          </span>
                          {lesson.duration && (
                            <span className="text-[10px] font-bold text-vmg-navy/30 tabular-nums w-12 text-right">
                              {lesson.duration}m
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </FadeSlideUp>
    </div>

  );
}
