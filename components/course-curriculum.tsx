"use client";

import { useState } from "react";

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
    titleVi: "Hướng dẫn Phê phán & Thực hành về Giảng dạy Ngữ pháp",
    totalDuration: 57,
    totalLessons: 15,
    sections: [
      {
        title: "Learning objectives and foundational terms",
        titleVi: "Chuẩn đầu ra & Thuật ngữ nền tảng",
        lessons: [
          { type: "Video", title: "Module Introduction", titleVi: "Giới thiệu module 1", duration: 4 },
          { type: "Video", title: "SLOs & Foundation Terms", titleVi: "Chuẩn đầu ra của học phần & các thuật ngữ nền tảng", duration: 5 },
          { type: "Video", title: "The Deductive Approach - A Deep dive", titleVi: "Đi sâu vào Phương pháp Diễn dịch", duration: 7 },
        ]
      },
      {
        title: "Deductive Approach - Theory",
        titleVi: "Lý thuyết Phương pháp Diễn dịch",
        lessons: [
          { type: "Video", title: "Strengths and Weaknesses", titleVi: "Ưu điểm và Hạn chế của Phương pháp Diễn dịch", duration: 8 },
          { type: "Video", title: "Stage 3 and 4", titleVi: "Giai đoạn 3 & 4 trong Tiến trình Dạy học", duration: 4 },
        ]
      },
      {
        title: "Deductive Approach - Discussion",
        titleVi: "Thảo luận Phương pháp Diễn dịch",
        lessons: [
          { type: "Bài tập Thực hành", title: "Discussion Questions", titleVi: "Câu hỏi thảo luận" },
        ]
      },
      {
        title: "Inductive Approach Theory",
        titleVi: "Lý thuyết Phương pháp Quy nạp",
        lessons: [
          { type: "Video", title: "The Inductive Approach - A Deep Dive", titleVi: "Đi sâu vào Phương pháp Quy nạp", duration: 6 },
          { type: "Video", title: "Discussion", titleVi: "Thảo luận", duration: 10 },
          { type: "Video", title: "The art of Inductive Questioning", titleVi: "Nghệ thuật đặt câu hỏi quy nạp", duration: 13 },
        ]
      },
      {
        title: "Assessment",
        titleVi: "Đánh giá",
        lessons: [
          { type: "Bài tập được chấm điểm", title: "Module 1 Quiz", titleVi: "Bài kiểm tra Module 1" },
        ]
      },
    ]
  },
  {
    id: 2,
    title: "Teaching Pronunciation and Lexis",
    titleVi: "Giảng dạy Phát âm và Từ vựng",
    totalDuration: 62,
    totalLessons: 18,
    sections: [
      {
        title: "Learning objectives and foundational terms",
        titleVi: "Mục tiêu học tập & Thuật ngữ nền tảng",
        lessons: [
          { type: "Video", title: "Module Introduction", titleVi: "Giới thiệu module 2", duration: 3 },
          { type: "Video", title: "Why Focus on Pronunciation & Lexis?", titleVi: "Tại sao cần chú trọng vào Phát âm và Từ vựng?", duration: 4 },
          { type: "Video", title: "Segmentals vs. Suprasegmentals", titleVi: "Âm đoạn và Siêu âm đoạn", duration: 2 },
          { type: "Video", title: "Segmentals - Deep dive", titleVi: "Đi sâu vào Âm đoạn", duration: 7 },
        ]
      },
      {
        title: "Segmentals Discussion",
        titleVi: "Thảo luận về Âm đoạn",
        lessons: [
          { type: "Video", title: "Segmental Challenges and Making Stress Tangible", titleVi: "Giải quyết khó khăn về Âm đoạn", duration: 1 },
          { type: "Bài tập Thực hành", title: "Discussion Questions", titleVi: "Câu hỏi thảo luận" },
        ]
      },
      {
        title: "Suprasegmentals",
        titleVi: "Siêu âm đoạn",
        lessons: [
          { type: "Video", title: "Suprasegmentals - Deep dive", titleVi: "Phân tích sâu về Siêu âm đoạn", duration: 7 },
          { type: "Bài tập Thực hành", title: "Discussion Questions", titleVi: "Câu hỏi thảo luận" },
          { type: "Video", title: "An Integrated Stress Lesson", titleVi: "Bài giảng Trọng âm Tích hợp", duration: 3 },
        ]
      },
      {
        title: "Moving from Vocabulary to Lexis",
        titleVi: "Từ Từ vựng đơn lẻ sang Hệ thống Ngữ vựng",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 10 },
          { type: "Bài tập Thực hành", title: "Discussion Questions", titleVi: "Câu hỏi thảo luận" },
          { type: "Video", title: "The Role of the Teacher", titleVi: "Vai trò của Giáo viên", duration: 1 },
        ]
      },
      {
        title: "From Reactive to Planned Instruction",
        titleVi: "Từ Dạy Ứng biến sang Dạy có Chủ đích",
        lessons: [
          { type: "Video", title: "Introduction", titleVi: "Giới thiệu", duration: 4 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Assessment",
        titleVi: "Đánh giá",
        lessons: [
          { type: "Bài tập được chấm điểm", title: "Module 2 Quiz", titleVi: "Bài kiểm tra Module 2" },
        ]
      },
    ]
  },
  {
    id: 3,
    title: "Core ESOL Issues",
    titleVi: "Các Vấn đề Cốt lõi trong ESOL",
    totalDuration: 40,
    totalLessons: 12,
    sections: [
      {
        title: "Overview",
        titleVi: "Tổng quan",
        lessons: [
          { type: "Video", title: "Core ESOL Issues Overview", titleVi: "Tổng quan về các Vấn đề Cốt lõi", duration: 9 },
        ]
      },
      {
        title: "Engagement in the classroom",
        titleVi: "Sự Gắn kết của Người học",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết về Sự Gắn kết", duration: 9 },
          { type: "Video", title: "Discussion", titleVi: "Thảo luận", duration: 3 },
          { type: "Bài tập Thực hành", title: "Discussion Questions", titleVi: "Câu hỏi thảo luận" },
        ]
      },
      {
        title: "A Foundational Principle of Modern ELT",
        titleVi: "Nguyên tắc Nền tảng của Giảng dạy Hiện đại",
        lessons: [
          { type: "Video", title: "Drilling for Accuracy", titleVi: "Luyện tập Rập khuôn để đạt Độ chính xác", duration: 4 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "From Theory to Technique",
        titleVi: "Từ Lý thuyết đến Kỹ thuật",
        lessons: [
          { type: "Video", title: "Inductive vs. Deductive Teaching", titleVi: "So sánh Dạy học Quy nạp và Diễn dịch", duration: 4 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
          { type: "Video", title: "The Cognitive & Interactionist Toolkit", titleVi: "Bộ công cụ Nhận thức và Tương tác", duration: 3 },
        ]
      },
      {
        title: "Assessment",
        titleVi: "Đánh giá",
        lessons: [
          { type: "Bài tập được chấm điểm", title: "Module 3 Quiz", titleVi: "Bài kiểm tra Module 3" },
        ]
      },
    ]
  },
  {
    id: 4,
    title: "The Art & Science of Teaching Receptive Skills",
    titleVi: "Nghệ thuật & Khoa học Giảng dạy Kỹ năng Tiếp nhận",
    totalDuration: 32,
    totalLessons: 10,
    sections: [
      {
        title: "Overview",
        titleVi: "Tổng quan",
        lessons: [
          { type: "Video", title: "Module Introduction", titleVi: "Giới thiệu module 4", duration: 3 },
        ]
      },
      {
        title: "Challenges in teaching Listening",
        titleVi: "Thử thách trong Giảng dạy Nghe",
        lessons: [
          { type: "Video", title: "What Makes Listening Difficult?", titleVi: "Tại sao Nghe là thử thách?", duration: 4 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Three Listening Stages",
        titleVi: "Ba giai đoạn của bài giảng Nghe",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 10 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Teaching Reading",
        titleVi: "Giảng dạy kỹ năng Đọc",
        lessons: [
          { type: "Video", title: "Reading stages and Summary", titleVi: "Các giai đoạn Đọc & Tổng kết", duration: 15 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Assessment",
        titleVi: "Đánh giá",
        lessons: [
          { type: "Bài tập được chấm điểm", title: "Module 4 Quiz", titleVi: "Bài kiểm tra Module 4" },
        ]
      },
    ]
  },
  {
    id: 5,
    title: "The Art & Science of Teaching Productive Skills",
    titleVi: "Nghệ thuật & Khoa học Giảng dạy Kỹ năng Sinh ngôn ngữ",
    totalDuration: 38,
    totalLessons: 11,
    sections: [
      {
        title: "Overview",
        titleVi: "Tổng quan",
        lessons: [
          { type: "Video", title: "Module Introduction", titleVi: "Giới thiệu module 5", duration: 4 },
        ]
      },
      {
        title: "The Dual Purpose of Production",
        titleVi: "Hai mục đích của Sinh ngôn ngữ",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 4 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Analyzing the Speaking Skill",
        titleVi: "Phân tích kỹ năng Nói",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 19 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "A Deep Dive into Teaching Writing",
        titleVi: "Phân tích Giảng dạy kỹ năng Viết",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 11 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Assessment",
        titleVi: "Đánh giá",
        lessons: [
          { type: "Bài tập được chấm điểm", title: "Module 5 Quiz", titleVi: "Bài kiểm tra Module 5" },
        ]
      },
    ]
  },
  {
    id: 6,
    title: "Enhancing Learning through Feedback and Resources",
    titleVi: "Nâng cao Học tập qua Phản hồi và Tài nguyên",
    totalDuration: 45,
    totalLessons: 15,
    sections: [
      {
        title: "Overview",
        titleVi: "Tổng quan",
        lessons: [
          { type: "Video", title: "Module Introduction", titleVi: "Giới thiệu module 6", duration: 2 },
          { type: "Video", title: "The Art & Science of Error Correction", titleVi: "Nghệ thuật & Khoa học Sửa lỗi", duration: 3 },
        ]
      },
      {
        title: "Understanding Errors",
        titleVi: "Hiểu về Lỗi sai",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Bản chất của lỗi sai", duration: 3 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "A mistake vs an error",
        titleVi: "Lỗi sơ suất vs Lỗi hổng kiến thức",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 2 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Providing correction",
        titleVi: "Phương pháp Sửa lỗi",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 13 },
        ]
      },
      {
        title: "The power of Instructional Aids",
        titleVi: "Sức mạnh của Công cụ Giảng dạy",
        lessons: [
          { type: "Video", title: "Overview", titleVi: "Tổng quan", duration: 2 },
          { type: "Video", title: "Why and how to use visual aids", titleVi: "Tại sao và Cách sử dụng", duration: 6 },
          { type: "Video", title: "Different visual tools", titleVi: "Các công cụ trực quan", duration: 4 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Teaching at Public school",
        titleVi: "Giảng dạy tại trường công lập",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 16 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Summary",
        titleVi: "Tổng kết",
        lessons: [
          { type: "Video", title: "A virtuous cycle of teaching", titleVi: "Chu trình phát triển bền vững", duration: 5 },
        ]
      },
      {
        title: "Assessment",
        titleVi: "Đánh giá",
        lessons: [
          { type: "Bài tập được chấm điểm", title: "Module 6 Quiz", titleVi: "Bài kiểm tra Module 6" },
        ]
      },
    ]
  },
  {
    id: 7,
    title: "Classroom Management & Lesson Planning",
    titleVi: "Quản lý Lớp học & Thiết kế Giáo án",
    totalDuration: 69,
    totalLessons: 14,
    sections: [
      {
        title: "Overview",
        titleVi: "Tổng quan",
        lessons: [
          { type: "Video", title: "Philosophy and practice overview", titleVi: "Triết lý và thực hành", duration: 7 },
        ]
      },
      {
        title: "The core aim and the teacher's mindset",
        titleVi: "Mục tiêu cốt lõi & Tư duy giáo viên",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 3 },
        ]
      },
      {
        title: "Practical Techniques 1-3",
        titleVi: "Kỹ thuật Thực hành 1-3",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 12 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Practical Application for big classrooms",
        titleVi: "Ứng dụng cho lớp đông",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 11 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Practical Techniques 4-6",
        titleVi: "Kỹ thuật Thực hành 4-6",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 14 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "The Architecture of an Effective Lesson Plan",
        titleVi: "Kiến trúc của Giáo án Hiệu quả",
        lessons: [
          { type: "Video", title: "Overview", titleVi: "Tổng quan", duration: 3 },
          { type: "Video", title: "The step by step approach", titleVi: "Quy trình từng bước", duration: 12 },
        ]
      },
      {
        title: "The lesson plan in Action",
        titleVi: "Giáo án trong Thực tế",
        lessons: [
          { type: "Video", title: "Overview", titleVi: "Tổng quan", duration: 3 },
          { type: "Video", title: "Stages of a basic TEFL lesson", titleVi: "Các giai đoạn bài giảng TEFL", duration: 12 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Summary",
        titleVi: "Tổng kết",
        lessons: [
          { type: "Video", title: "Module Summary", titleVi: "Tổng kết Module", duration: 4 },
        ]
      },
      {
        title: "Assessment",
        titleVi: "Đánh giá",
        lessons: [
          { type: "Bài tập được chấm điểm", title: "Module 7 Quiz", titleVi: "Bài kiểm tra Module 7" },
        ]
      },
    ]
  },
  {
    id: 8,
    title: "Methodology for teaching young learners",
    titleVi: "Phương pháp Giảng dạy Học viên nhỏ tuổi",
    totalDuration: 73,
    totalLessons: 14,
    sections: [
      {
        title: "Overview",
        titleVi: "Tổng quan",
        lessons: [
          { type: "Video", title: "Introduction and Learning Outcomes", titleVi: "Giới thiệu và Mục tiêu", duration: 3 },
        ]
      },
      {
        title: "Understanding young learners",
        titleVi: "Thấu hiểu học viên nhỏ tuổi",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 9 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Learning patterns of young learners",
        titleVi: "Mô thức học tập của trẻ",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 19 },
          { type: "Video", title: "Sample lesson plan for young learners", titleVi: "Giáo án mẫu", duration: 12 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Four key pillars of effective classroom management",
        titleVi: "4 trụ cột Quản lý lớp học hiệu quả",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 9 },
          { type: "Bài tập Thực hành", title: "Discussion", titleVi: "Thảo luận" },
        ]
      },
      {
        title: "Teacher's checklist",
        titleVi: "Danh mục kiểm tra giáo viên",
        lessons: [
          { type: "Video", title: "Checklist", titleVi: "Danh mục kiểm tra", duration: 12 },
        ]
      },
      {
        title: "Designing a child-centered lesson",
        titleVi: "Thiết kế bài giảng lấy trẻ làm trung tâm",
        lessons: [
          { type: "Video", title: "Theory", titleVi: "Lý thuyết", duration: 9 },
        ]
      },
      {
        title: "Assessment",
        titleVi: "Đánh giá",
        lessons: [
          { type: "Bài tập được chấm điểm", title: "Module 8 Quiz", titleVi: "Bài kiểm tra Module 8" },
        ]
      },
    ]
  },
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
          <svg className="w-5 h-5 text-vmg-blue" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      case "Bài đọc":
        return (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        );
      case "Bài tập Thực hành":
        return (
          <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      case "Bài tập được chấm điểm":
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const totalCourseDuration = curriculumData.reduce((sum, m) => sum + m.totalDuration, 0);
  const totalCourseLessons = curriculumData.reduce((sum, m) => sum + m.totalLessons, 0);

  return (
    <div className="space-y-8" id="curriculum">
      {/* Section Header */}
      <div className="text-center">
        <div className="inline-block mb-4">
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-vmg-navy mb-4">
          Nội dung Khóa học Chi tiết
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          8 Module với <span className="font-bold text-vmg-blue">{totalCourseLessons} bài học</span> - 
          Tổng thời lượng <span className="font-bold text-vmg-blue">{Math.floor(totalCourseDuration / 60)} giờ {totalCourseDuration % 60} phút</span>
        </p>
      </div>

        {/* Curriculum Accordion */}
        <div className="space-y-4">
          {curriculumData.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1 text-left">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-vmg-blue to-vmg-navy rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {module.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-vmg-navy mb-1">
                      Module {module.id}: {module.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{module.titleVi}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {module.totalDuration} phút
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                        {module.totalLessons} bài học
                      </span>
                    </div>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-vmg-blue flex-shrink-0 transition-transform ${
                    openModule === module.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Module Content */}
              {openModule === module.id && (
                <div className="border-t-2 border-gray-100 bg-gray-50">
                  <div className="p-6 space-y-3">
                    {module.sections.map((section, sectionIdx) => {
                      const sectionKey = `${module.id}-${sectionIdx}`;
                      return (
                        <div
                          key={sectionKey}
                          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                          {/* Section Header */}
                          <button
                            onClick={() => toggleSection(sectionKey)}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3 flex-1 text-left">
                              <div className="w-8 h-8 bg-vmg-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-vmg-green font-bold text-sm">
                                  {sectionIdx + 1}
                                </span>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 text-sm">
                                  {section.title}
                                </p>
                                <p className="text-xs text-gray-500">{section.titleVi}</p>
                              </div>
                            </div>
                            <svg
                              className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                                openSections[sectionKey] ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Lessons */}
                          {openSections[sectionKey] && (
                            <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-2">
                              {section.lessons.map((lesson, lessonIdx) => (
                                <div
                                  key={lessonIdx}
                                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-shadow"
                                >
                                  {getTypeIcon(lesson.type)}
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                      {lesson.titleVi}
                                    </p>
                                    <p className="text-xs text-gray-500">{lesson.title}</p>
                                  </div>
                                  {lesson.duration && (
                                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                      {lesson.duration} phút
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-8 text-center p-6 bg-gradient-to-r from-vmg-blue/10 to-vmg-navy/10 rounded-2xl border-2 border-vmg-blue/20">
          <p className="text-gray-700 mb-2">
            🎓 <span className="font-bold">Hoàn thành toàn bộ khóa học</span> để nhận 
            <span className="font-bold text-vmg-blue"> Chứng chỉ TESOL quốc tế</span>
          </p>
          <p className="text-sm text-gray-600">
            Được công nhận bởi INTESOL và các tổ chức giáo dục uy tín trên thế giới
          </p>
        </div>
    </div>
  );
}
