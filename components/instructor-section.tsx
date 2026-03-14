"use client";

import React from "react";
import FadeSlideUp from "./fade-slide-up";

interface InstructorProps {
  name: string;
  image: string;
  degree: string;
  ielts: string;
  sat: string;
  experience: string;
  quote: string;
  description: string;
  isReversed?: boolean;
}

const InstructorRow = ({ name, image, degree, ielts, sat, experience, quote, description, isReversed }: InstructorProps) => (
  <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16 py-12`}>
    {/* Image Container */}
    <div className="w-full max-w-[300px] md:w-5/12 shrink-0">
      <div className="relative group">
        <div className={`absolute -inset-4 rounded-[40px] bg-gradient-to-br ${isReversed ? 'from-vmg-blue/10 to-vmg-green/10' : 'from-vmg-red/10 to-vmg-blue/10'} blur-2xl opacity-50`}></div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border-4 border-white bg-white shadow-xl transition-transform duration-500 group-hover:scale-[1.01]">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>

    {/* Content Container */}
    <div className="flex-1 space-y-6 text-center md:text-left">
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0038D1]">Chuyên gia đào tạo</span>
        <h3 className="text-3xl md:text-4xl font-bold text-vmg-navy tracking-tight">{name}</h3>
        <div className="text-sm font-bold text-vmg-red leading-relaxed max-w-xl whitespace-pre-line">
          {degree}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:justify-start">
        <div className="min-w-[100px] rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-vmg-navy">{ielts}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">IELTS Score</p>
        </div>
        <div className="min-w-[100px] rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#2d7a45]">{experience}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Năm kinh nghiệm</p>
        </div>
        <div className="min-w-[100px] rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-vmg-red">{sat}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">SAT Score</p>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <p className="text-xl leading-relaxed text-gray-700 italic font-medium">
          "{quote}"
        </p>
        <p className="text-base leading-relaxed text-gray-500 max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default function InstructorSection() {
  const instructors = [
    {
      name: "Ms. Phạm Thị Bảo Minh (Amy)",
      image: "/images/teacher/Minh.png",
      degree: "NCS TS. Quản Lý Giáo Dục tại Mỹ\nMBA tại Western Sydney University (Australia)",
      ielts: "8.5",
      sat: "1550",
      experience: "10+",
      quote: "Giáo dục không phải là việc đổ đầy một chiếc bình, mà là thắp sáng một ngọn lửa.",
      description: "Với nền tảng học thuật quốc tế vững chắc, Ms. Amy tập trung vào việc phát triển tư duy quản lý và phương pháp giảng dạy tiếng Anh chuyên sâu cho học viên TESOL.",
      isReversed: false
    },
    {
      name: "Ms. Nguyễn Phan Thiên Thanh (Helen)",
      image: "/images/teacher/image.png",
      degree: "Master of Arts - TESOL tại University of Huddersfield (UK)",
      ielts: "8.0",
      sat: "1500",
      experience: "13+",
      quote: "Sứ mệnh của tôi là giúp thế hệ giáo viên mới truyền cảm hứng và thay đổi cuộc đời người học qua ngôn ngữ.",
      description: "Ms. Helen mang đến phương pháp giảng dạy hiện đại, tập trung vào tính ứng dụng thực tế và tư duy sư phạm sáng tạo, giúp học viên tự tin làm chủ lớp học.",
      isReversed: true
    }
  ];

  return (
    <FadeSlideUp className="section-padding bg-gray-50/50">
      <div className="w-full px-4 max-w-[1200px] mx-auto">
        <div className="mb-12 text-center md:text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0038D1]">
            Đội ngũ giảng viên
          </span>
          <h2 className="mt-1 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Chuyên gia đào tạo TESOL</h2>
        </div>

        <div className="space-y-12">
          {instructors.map((instructor, index) => (
            <InstructorRow key={index} {...instructor} />
          ))}
        </div>
      </div>
    </FadeSlideUp>
  );
}
