"use client";

import { useState } from "react";
import FadeSlideUp from "./fade-slide-up";

interface Lesson {
  type: "Video" | "Bài đọc" | "Bài tập Thực hành" | "Bài tập được chấm điểm";
  title: string;
  titleVi: string;
  duration?: number;
}

interface Section {
  title: string;
  titleVi: string;
  lessons: Lesson[];
}

interface Module {
  id: number;
  title: string;
  titleVi: string;
  sections: Section[];
  totalDuration: number;
  totalLessons: number;
}

const curriculumData: Module[] = [
  {
    id: 1,
    title: "A Critical & Practical Guide to Grammar Pedagogy",
    titleVi: "Chuẩn đầu ra & Thuật ngữ nền tảng",
    totalDuration: 118,
    totalLessons: 9,
    sections: [
      {
        title: "Module 1 Content",
        titleVi: "Nội dung Module 1",
        lessons: [
          { type: "Video", title: "A Critical & Practical Guide to Grammar Pedagogy - SLOs & foundational terms", titleVi: "Hướng dẫn thực hành Ngữ pháp - SLOs & Thuật ngữ", duration: 5 },
          { type: "Video", title: "The Deductive Approach - A Deep dive", titleVi: "Đi sâu vào Phương pháp Diễn dịch", duration: 7 },
          { type: "Video", title: "Strengths and Weaknesses of the Deductive Approach", titleVi: "Ưu nhược điểm của Phương pháp Diễn dịch", duration: 8 },
          { type: "Video", title: "Stage 3 and 4 of the Deductive approach", titleVi: "Giai đoạn 3 và 4 của Phương pháp Diễn dịch", duration: 4 },
          { type: "Bài đọc", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
          { type: "Video", title: "The Inductive Approach - A Deep Dive", titleVi: "Đi sâu vào Phương pháp Quy nạp", duration: 6 },
          { type: "Bài đọc", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
          { type: "Video", title: "The art of Inductive Questioning", titleVi: "Nghệ thuật đặt câu hỏi Quy nạp", duration: 13 },
          { type: "Bài tập được chấm điểm", title: "Final quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Teaching Pronunciation and Lexis",
    titleVi: "Giảng dạy Phát âm và Từ vựng",
    totalDuration: 180,
    totalLessons: 13,
    sections: [
      {
        title: "Module 2 Content",
        titleVi: "Nội dung Module 2",
        lessons: [
          { type: "Video", title: "Teaching Pronunciation and Lexis - Introduction", titleVi: "Giới thiệu Giảng dạy Phát âm & Từ vựng", duration: 3 },
          { type: "Video", title: "Why Focus on Pronunciation & Lexis?", titleVi: "Tại sao cần chú trọng Phát âm & Từ vựng?", duration: 4 },
          { type: "Video", title: "Segmentals vs. Suprasegmentals", titleVi: "Âm đoạn với Siêu âm đoạn", duration: 2 },
          { type: "Video", title: "Segmentals - Deep dive", titleVi: "Đi sâu vào Âm đoạn", duration: 7 },
          { type: "Bài đọc", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
          { type: "Video", title: "Suprasegmentals - Deep dive", titleVi: "Đi sâu vào Siêu âm đoạn", duration: 7 },
          { type: "Bài đọc", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
          { type: "Video", title: "Lesson Walkthrough and Discussion - An Integrated Stress Lesson", titleVi: "Hướng dẫn bài giảng Trọng âm Tích hợp", duration: 3 },
          { type: "Video", title: "Moving from Vocabulary to Lexis", titleVi: "Từ Từ vựng sang Hệ thống Ngữ vựng", duration: 10 },
          { type: "Bài đọc", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
          { type: "Video", title: "From Reactive to Planned Instruction", titleVi: "Từ Dạy ứng biến sang Dạy có chủ đích", duration: 4 },
          { type: "Bài đọc", title: "Discussion 4", titleVi: "Thảo luận 4", duration: 30 },
          { type: "Bài tập được chấm điểm", title: "Final Quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
        ]
      }
    ]
  },
  {
    id: 3,
    title: "An Overview of Core ESOL Issues",
    titleVi: "Tổng quan các vấn đề cốt lõi trong ESOL",
    totalDuration: 147,
    totalLessons: 9,
    sections: [
      {
        title: "Module 3 Content",
        titleVi: "Nội dung Module 3",
        lessons: [
          { type: "Video", title: "An Overview of Core ESOL Issues - Learning objectives and foundational terms", titleVi: "Mục tiêu học tập & Thuật ngữ nền tảng", duration: 9 },
          { type: "Video", title: "Engagement in the classroom - Theory", titleVi: "Lý thuyết về sự gắn kết trong lớp học", duration: 9 },
          { type: "Bài đọc", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
          { type: "Video", title: "Drilling for Accuracy", titleVi: "Luyện tập rập khuôn để đạt độ chính xác", duration: 4 },
          { type: "Bài đọc", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
          { type: "Video", title: "Inductive vs. Deductive Teaching", titleVi: "Dạy học Quy nạp và Diễn dịch", duration: 4 },
          { type: "Bài đọc", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
          { type: "Video", title: "The Cognitive & Interactionist Toolkit", titleVi: "Bộ công cụ Nhận thức và Tương tác", duration: 3 },
          { type: "Bài tập được chấm điểm", title: "Final Assessment quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
        ]
      }
    ]
  },
  {
    id: 4,
    title: "The Art & Science of Teaching Receptive Skills",
    titleVi: "Nghệ thuật & Khoa học Giảng dạy Kỹ năng Tiếp nhận",
    totalDuration: 137,
    totalLessons: 8,
    sections: [
      {
        title: "Module 4 Content",
        titleVi: "Nội dung Module 4",
        lessons: [
          { type: "Video", title: "Overview - The Art & Science of Teaching Receptive Skills - Learning objectives", titleVi: "Tổng quan & Mục tiêu học tập", duration: 3 },
          { type: "Video", title: "What Makes Listening Difficult?", titleVi: "Tại sao kỹ năng Nghe lại khó?", duration: 4 },
          { type: "Bài đọc", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
          { type: "Video", title: "Three Listening Stages", titleVi: "Ba giai đoạn của bài giảng Nghe", duration: 10 },
          { type: "Bài đọc", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
          { type: "Video", title: "Teaching Reading", titleVi: "Giảng dạy kỹ năng Đọc", duration: 15 },
          { type: "Bài đọc", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
          { type: "Bài tập được chấm điểm", title: "Final assessment Quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
        ]
      }
    ]
  },
  {
    id: 5,
    title: "The Art & Science of Teaching Productive Skills",
    titleVi: "Nghệ thuật & Khoa học Giảng dạy Kỹ năng Sinh ngôn ngữ",
    totalDuration: 147,
    totalLessons: 8,
    sections: [
      {
        title: "Module 5 Content",
        titleVi: "Nội dung Module 5",
        lessons: [
          { type: "Video", title: "Overview - The Art & Science of Teaching Productive Skills", titleVi: "Tổng quan Giảng dạy Kỹ năng Sinh ngôn ngữ", duration: 4 },
          { type: "Video", title: "The Dual Purpose of Production in the Classroom", titleVi: "Mục đích kép của Sinh ngôn ngữ", duration: 4 },
          { type: "Bài đọc", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
          { type: "Video", title: "Analyzing the Speaking Skill", titleVi: "Phân tích kỹ năng Nói", duration: 19 },
          { type: "Bài đọc", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
          { type: "Video", title: "A Deep Dive into Teaching Writing", titleVi: "Đi sâu vào Giảng dạy kỹ năng Viết", duration: 11 },
          { type: "Bài đọc", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
          { type: "Bài tập được chấm điểm", title: "Final Assessment Quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Enhancing Learning through Feedback and Resources",
    titleVi: "Nâng cao Học tập qua Phản hồi và Tài nguyên",
    totalDuration: 236,
    totalLessons: 15,
    sections: [
      {
        title: "Module 6 Content",
        titleVi: "Nội dung Module 6",
        lessons: [
          { type: "Video", title: "Overview - Enhancing Learning through Feedback and Resources", titleVi: "Tổng quan Nâng cao Học tập", duration: 2 },
          { type: "Video", title: "The Art & Science of Error Correction - Overview and Learning Outcomes", titleVi: "Nghệ thuật & Khoa học Sửa lỗi", duration: 3 },
          { type: "Video", title: "Understanding Errors", titleVi: "Thấu hiểu các loại lỗi", duration: 3 },
          { type: "Bài đọc", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
          { type: "Video", title: "A mistake vs an error", titleVi: "Phân biệt Mistake và Error", duration: 2 },
          { type: "Video", title: "Providing correction", titleVi: "Cách thức cung cấp phản hồi sửa lỗi", duration: 13 },
          { type: "Bài đọc", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
          { type: "Video", title: "The power of Instructional Aids", titleVi: "Sức mạnh của Học liệu Hỗ trợ", duration: 3 },
          { type: "Video", title: "Why and how to use visual aids", titleVi: "Tại sao và cách dùng Trực quan", duration: 6 },
          { type: "Video", title: "Different visual tools", titleVi: "Các công cụ trực quan khác nhau", duration: 4 },
          { type: "Bài đọc", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
          { type: "Video", title: "Teaching at Public school", titleVi: "Giảng dạy tại trường công lập", duration: 16 },
          { type: "Bài đọc", title: "Discussion 4", titleVi: "Thảo luận 4", duration: 30 },
          { type: "Video", title: "A virtuous cycle of teaching", titleVi: "Vòng lặp giảng dạy hiệu quả", duration: 5 },
          { type: "Bài tập được chấm điểm", title: "Final quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Classroom Management and Lesson Planning",
    titleVi: "Quản lý lớp học và Lập kế hoạch bài giảng",
    totalDuration: 251,
    totalLessons: 15,
    sections: [
      {
        title: "Module 7 Content",
        titleVi: "Nội dung Module 7",
        lessons: [
          { type: "Video", title: "Overview - The philosophy and practice of classroom management", titleVi: "Triết lý và thực hành quản lý lớp học", duration: 7 },
          { type: "Video", title: "The core aim and the teacher's mindset", titleVi: "Mục tiêu cốt lõi và tư duy giáo viên", duration: 3 },
          { type: "Video", title: "Classroom Management & Lesson Planning - Practical Techniques 1-3", titleVi: "Kỹ thuật thực hành quản lý 1-3", duration: 12 },
          { type: "Bài đọc", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
          { type: "Video", title: "Practical Application for big classrooms", titleVi: "Ứng dụng thực tế cho lớp học đông", duration: 11 },
          { type: "Bài đọc", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
          { type: "Video", title: "Classroom Management & Lesson Planning - Practical Techniques 4-6", titleVi: "Kỹ thuật thực hành quản lý 4-6", duration: 13 },
          { type: "Bài đọc", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
          { type: "Video", title: "The Architecture of an Effective Lesson Plan", titleVi: "Cấu trúc kế hoạch bài giảng hiệu quả", duration: 3 },
          { type: "Video", title: "The Architecture of an Effective Lesson Plan - The step by step approach", titleVi: "Tiến trình lập kế hoạch bài giảng", duration: 12 },
          { type: "Video", title: "The lesson plan in Action", titleVi: "Kế hoạch bài giảng trong thực tế", duration: 3 },
          { type: "Video", title: "Stages of a basic TEFL lesson", titleVi: "Các giai đoạn của bài giảng TEFL cơ bản", duration: 12 },
          { type: "Bài đọc", title: "Discussion 4", titleVi: "Thảo luận 4", duration: 30 },
          { type: "Video", title: "Summary", titleVi: "Phần tổng kết", duration: 4 },
          { type: "Bài tập được chấm điểm", title: "Final quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Teaching Young Learners",
    titleVi: "Giảng dạy tiếng Anh cho trẻ em",
    totalDuration: 186,
    totalLessons: 11,
    sections: [
      {
        title: "Module 8 Content",
        titleVi: "Nội dung Module 8",
        lessons: [
          { type: "Video", title: "Overview and learning outcomes", titleVi: "Tổng quan & Chuẩn đầu ra", duration: 15 },
          { type: "Video", title: "Understanding young learners", titleVi: "Thấu hiểu người học nhỏ tuổi", duration: 9 },
          { type: "Bài đọc", title: "Discussion 1", titleVi: "Thảo luận 1", duration: 30 },
          { type: "Video", title: "Learning patterns of young learners", titleVi: "Mô hình học tập của trẻ em", duration: 19 },
          { type: "Video", title: "Sample lesson plan for young learners", titleVi: "Mẫu kế hoạch bài giảng chuyên sâu", duration: 11 },
          { type: "Bài đọc", title: "Discussion 2", titleVi: "Thảo luận 2", duration: 30 },
          { type: "Video", title: "Four key pillars of effective classroom management", titleVi: "Bốn trụ cột quản lý lớp học hiệu quả", duration: 9 },
          { type: "Bài đọc", title: "Discussion 3", titleVi: "Thảo luận 3", duration: 30 },
          { type: "Video", title: "Teacher's checklist", titleVi: "Danh sách kiểm tra dành cho giáo viên", duration: 12 },
          { type: "Video", title: "Designing a child-centered lesson", titleVi: "Thiết kế bài học lấy trẻ làm trung tâm", duration: 9 },
          { type: "Bài tập được chấm điểm", title: "Final quiz", titleVi: "Bài kiểm tra cuối khóa", duration: 30 },
        ]
      }
    ]
  },
  {
    id: 9,
    title: "End of Course",
    titleVi: "Kết thúc khóa học",
    totalDuration: 2,
    totalLessons: 1,
    sections: [
      {
        title: "Closing",
        titleVi: "Lời kết",
        lessons: [
          { type: "Video", title: "End of course", titleVi: "Hoàn thành khóa học", duration: 2 },
        ]
      }
    ]
  }
];

export default function CourseCurriculum() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleModule = (moduleId: number) => {
    setOpenModule(openModule === moduleId ? null : moduleId);
  };

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getTypeIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "Video":
        return (
          <svg className="w-3.5 h-3.5 text-[#0038D1]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      case "Bài đọc":
        return (
          <svg className="w-3.5 h-3.5 text-[#75E04D]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        );
      case "Bài tập Thực hành":
        return (
          <svg className="w-3.5 h-3.5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      case "Bài tập được chấm điểm":
        return (
          <svg className="w-3.5 h-3.5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const totalCourseDuration = curriculumData.reduce((sum, m) => sum + m.totalDuration, 0);
  const totalCourseLessons = curriculumData.reduce((sum, m) => sum + m.totalLessons, 0);

  return (
    <div className="space-y-12 section-padding" id="curriculum">
      {/* Section Header */}
      <FadeSlideUp>
        <div className="text-center">
          <div className="inline-block mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Nội dung Khóa học Chi tiết
          </h2>
          <p className="text-lg text-gray-500 mb-6 font-medium">
            8 Module với <span className="text-[#0038D1] font-bold">{totalCourseLessons} bài học</span> •
            Tổng thời lượng <span className="text-[#0038D1] font-bold">{Math.floor(totalCourseDuration / 60)} giờ {totalCourseDuration % 60} phút</span>
          </p>
        </div>
      </FadeSlideUp>
      {/* Curriculum Accordion */}
      <FadeSlideUp delay={0.15}>
        <div className="space-y-4 max-w-[1200px] mx-auto">
          {curriculumData.map((module) => (
            <FadeSlideUp key={module.id} delay={0.2 + module.id * 0.05}>
              <div
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full px-6 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-6 flex-1 text-left">
                    <div className="relative flex-shrink-0">
                      <span className="text-4xl font-light text-gray-200 group-hover:text-[#0038D1]/20 transition-colors duration-300 tabular-nums">
                        {module.id < 10 ? `0${module.id}` : module.id}
                      </span>
                      <div className="absolute -bottom-1 left-0 w-4 h-[2px] bg-[#75E04D] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0038D1] transition-colors duration-300">
                        {module.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm font-medium text-gray-400">{module.titleVi}</p>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="text-xs font-bold text-[#0038D1]/60 tracking-tight uppercase">
                          {module.totalLessons} Lessons
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center transition-all duration-300 ${
                    openModule === module.id ? "bg-[#0038D1] border-[#0038D1] text-white rotate-180" : "bg-white text-gray-400"
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {/* Module Content */}
                {openModule === module.id && (
                  <div className="border-t border-gray-100 bg-gray-50/30">
                    <div className="px-6 py-4 space-y-1">
                      {module.sections.map((section) => (
                        section.lessons.map((lesson, lessonIdx) => (
                          <div
                            key={lessonIdx}
                            className="flex items-center gap-4 p-3 hover:bg-white rounded-lg transition-all duration-200 group/lesson"
                          >
                            <div className="w-8 h-8 rounded-full border border-gray-100 bg-white flex items-center justify-center flex-shrink-0 group-hover/lesson:border-[#75E04D]/30 transition-colors">
                              {getTypeIcon(lesson.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-700 truncate group-hover/lesson:text-[#0038D1] transition-colors">
                                {lesson.title}
                              </p>
                              <p className="text-[11px] text-gray-400 font-medium truncate italic">{lesson.titleVi}</p>
                            </div>
                            {lesson.duration && (
                              <span className="text-[10px] font-black text-gray-300 group-hover/lesson:text-gray-400 transition-colors tabular-nums">
                                {lesson.duration.toString().toUpperCase()} MIN
                              </span>
                            )}
                          </div>
                        ))
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FadeSlideUp>
          ))}
        </div>
      </FadeSlideUp>
    </div>
  );
}
