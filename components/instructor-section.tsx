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

const InstructorCard = ({ name, image, degree, ielts, sat, experience, quote, description, isReversed }: InstructorProps) => (
  <div className="bg-white border-2 border-gray-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm hover:border-vmg-blue/30 transition-all duration-500 overflow-hidden group">
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}>
      
      {/* Image Side */}
      <div className="w-full max-w-[280px] md:w-4/12 shrink-0">
        <div className="relative">
          <div className={`absolute -inset-2 rounded-[2rem] bg-gradient-to-br ${isReversed ? 'from-vmg-blue/10 to-vmg-green/10' : 'from-vmg-red/10 to-vmg-blue/10'} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-gray-100 shadow-lg bg-gray-50">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="flex-1 space-y-8 text-left">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-vmg-blue px-3 py-1 bg-vmg-blue/5 rounded-full w-fit block">Chuyên gia đào tạo</span>
          <h3 className="text-3xl md:text-4xl font-bold text-vmg-navy tracking-tight">{name}</h3>
          <div className="text-sm font-bold text-vmg-red leading-relaxed max-w-xl whitespace-pre-line border-l-2 border-vmg-red/20 pl-4">
            {degree}
          </div>
        </div>

        {/* High Contrast Stats */}
        <div className="flex flex-wrap gap-4 md:gap-8">
          <div className="bg-white border border-vmg-blue/10 rounded-2xl px-6 py-4 min-w-[120px] transition-all group-hover:border-vmg-blue/40 shadow-sm">
            <p className="text-2xl font-black text-vmg-blue leading-none">{ielts}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-vmg-navy/40 mt-2">IELTS Score</p>
          </div>
          <div className="bg-white border border-vmg-green/10 rounded-2xl px-6 py-4 min-w-[120px] transition-all group-hover:border-vmg-green/40 shadow-sm">
            <p className="text-2xl font-black text-vmg-green leading-none">{experience}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-vmg-navy/40 mt-2">Kinh nghiệm</p>
          </div>
          <div className="bg-white border border-vmg-red/10 rounded-2xl px-6 py-4 min-w-[120px] transition-all group-hover:border-vmg-red/40 shadow-sm">
            <p className="text-2xl font-black text-vmg-red leading-none">{sat}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-vmg-navy/40 mt-2">SAT Score</p>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-vmg-navy/5">
          <p className="text-xl leading-relaxed text-vmg-navy/80 italic font-medium">
            "{quote}"
          </p>
          <p className="text-base leading-relaxed text-vmg-navy/60 max-w-2xl">
            {description}
          </p>
        </div>
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
    <FadeSlideUp className="section-padding bg-vmg-blue-soft/30">
      <div className="w-full px-4 max-w-[1200px] mx-auto">
        <div className="mb-12">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-vmg-blue mb-2 block">Đội ngũ giảng viên</span>
          <h2 className="text-3xl md:text-4xl font-black text-vmg-navy tracking-tight">Chuyên gia đào tạo TESOL</h2>
        </div>

        <div className="space-y-8">
          {instructors.map((instructor, index) => (
            <InstructorCard key={index} {...instructor} />
          ))}
        </div>
      </div>
    </FadeSlideUp>
  );
}
