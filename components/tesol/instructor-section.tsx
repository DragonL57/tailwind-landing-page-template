"use client";

import Image from 'next/image';
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
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="flex-1 space-y-8 text-left">
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-vmg-blue px-3 py-1 bg-vmg-blue/5 rounded-full w-fit block">Chuyên gia đào tạo</span>
          <h3 className="text-3xl md:text-4xl font-bold text-vmg-navy tracking-tight">{name}</h3>
          <div className="space-y-2 max-w-xl">
            {degree.split('\n').map((line, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-vmg-green shrink-0 mt-1.5" />
                <span className="text-sm font-bold text-vmg-navy/80 leading-relaxed">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* High Contrast Stats - Optimized for 1 line on mobile */}
        <div className="grid grid-cols-3 gap-2 md:gap-8">
          <div className="bg-white border border-vmg-blue/10 rounded-xl md:rounded-2xl p-3 md:px-6 md:py-4 transition-all group-hover:border-vmg-blue/40 shadow-sm text-center">
            <p className="text-xl md:text-2xl font-black text-vmg-blue leading-none">{ielts}</p>
            <p className="text-[7px] md:text-[9px] font-bold uppercase tracking-wider md:tracking-widest text-vmg-navy/40 mt-2 whitespace-nowrap">IELTS Score</p>
          </div>
          <div className="bg-white border border-vmg-green/10 rounded-xl md:rounded-2xl p-3 md:px-6 md:py-4 transition-all group-hover:border-vmg-green/40 shadow-sm text-center">
            <p className="text-xl md:text-2xl font-black text-vmg-green leading-none">{experience}</p>
            <p className="text-[7px] md:text-[9px] font-bold uppercase tracking-wider md:tracking-widest text-vmg-navy/40 mt-2 whitespace-nowrap">Kinh nghiệm</p>
          </div>
          <div className="bg-white border border-vmg-red/10 rounded-xl md:rounded-2xl p-3 md:px-6 md:py-4 transition-all group-hover:border-vmg-red/40 shadow-sm text-center">
            <p className="text-xl md:text-2xl font-black text-vmg-red leading-none">{sat}</p>
            <p className="text-[7px] md:text-[9px] font-bold uppercase tracking-wider md:tracking-widest text-vmg-navy/40 mt-2 whitespace-nowrap">SAT Score</p>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-vmg-navy/5">
          <p className="text-xl leading-relaxed text-vmg-navy/80 italic font-medium">
            {quote}
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
    <FadeSlideUp className="section-padding bg-white relative overflow-hidden">
      {/* Background Silhouette Logo */}
      <div className="absolute -left-32 -bottom-32 w-[600px] h-[600px] opacity-100 pointer-events-none -z-10 select-none">
        <Image src="/images/Picture1.png" alt="" width={600} height={600} className="w-full h-full object-contain" />
      </div>

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
