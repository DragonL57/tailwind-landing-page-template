"use client";

import React, { useState } from "react";
import FadeSlideUp from "./fade-slide-up";
import Image from "next/image";

export default function ProductOverview() {
  const [openAccordion, setOpenAccordion] = useState<number[]>([0, 1]);

  const toggleAccordion = (index: number) => {
    if (openAccordion.includes(index)) {
      setOpenAccordion(openAccordion.filter(i => i !== index));
    } else {
      setOpenAccordion([...openAccordion, index]);
    }
  };

  const features = [
    {
      title: "Chứng chỉ có giá trị thật",
      description: "Chứng chỉ TESOL tại VMG có giá trị vĩnh viễn, được kiểm định bởi ALAP – tổ chức kiểm định quốc tế với hơn 20 năm uy tín, tính pháp lý tức thì trên phạm vi toàn cầu.",
      icon: (
        <svg className="w-6 h-6 text-vmg-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "vmg-blue"
    },
    {
      title: "Học online nhưng không học một mình",
      description: "Học viên được tương tác trực tiếp với giảng viên thông qua các buổi livestream giải đáp định kỳ , cùng hệ thống mentor và tutor theo sát tiến độ học tập.",
      icon: (
        <svg className="w-6 h-6 text-vmg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "vmg-green"
    },
    {
      title: "Có thực hành, không chỉ lý thuyết",
      description: "Học viên được tham gia dạy demo, hoạt động nhập vai sư phạm và kết nối thực tập – cơ hội giảng dạy có lương tại hệ thống VMG và các đối tác trường học sau khóa học.",
      icon: (
        <svg className="w-6 h-6 text-vmg-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "vmg-blue"
    },
    {
      title: "Chi phí minh bạch, dễ tiếp cận",
      description: "Hỗ trợ trả góp linh hoạt từ 1 triệu/ tháng, VMG cam kết minh bạch 100%, không phát sinh phụ phí cho đến khi học viên hoàn tất chương trình và nhận chứng chỉ.",
      icon: (
        <svg className="w-6 h-6 text-vmg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "vmg-green"
    }
  ];
  return (
    <div className="relative p-2 md:p-4">
      {/* Gemini Background Logo - Blended */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        <img
          src="/images/gemini_bg.svg"
          alt=""
          className="absolute top-0 right-0 w-[400px] h-auto opacity-20"
        />
      </div>
      <div className="relative space-y-12">
        {/* Nội dung khóa học - full-width band */}
        <FadeSlideUp className="w-full bg-[#F7F8FC]">
          <div className="max-w-7xl mx-auto px-4 section-padding">
            <div className="text-center mb-12">
              <span className="text-xs font-black text-[#0038D1] uppercase tracking-widest inline-block mb-2">Nội dung khóa học</span>
              <h2 className="text-3xl md:text-5xl font-black text-vmg-navy mb-4 italic">Nội dung khóa học</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Lộ trình đào tạo toàn diện từ lý thuyết chuyên sâu đến thực hành thực tế, 
                giúp bạn trở thành giáo viên tiếng Anh chuyên nghiệp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Card 1: Main Highlight - Certificate */}
              <div className="md:col-span-8 p-8 bg-gradient-to-br from-white to-vmg-blue/5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-vmg-blue/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-vmg-blue/10 flex items-center justify-center text-vmg-blue">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <span className="text-vmg-blue font-bold text-sm bg-vmg-blue/5 px-3 py-1 rounded-full">Quốc tế</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-vmg-navy group-hover:text-vmg-blue transition-colors mb-2">Nhận chứng chỉ TESOL quốc tế (ALAP - Anh Quốc)</h3>
                  <p className="text-gray-600 text-sm">Chứng chỉ có giá trị vĩnh viễn toàn cầu, được kiểm định bởi tổ chức uy tín hàng đầu Vương Quốc Anh.</p>
                </div>
              </div>

              {/* Card 2: Lesson Planning */}
              <div className="md:col-span-4 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-vmg-green/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-vmg-green/10 flex items-center justify-center text-vmg-green mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-vmg-navy mb-2">Thành thạo kỹ năng soạn giáo án</h3>
                  <p className="text-gray-600 text-sm">Làm chủ phương pháp giảng dạy hiện đại cho cả môi trường Online & Offline.</p>
                </div>
              </div>

              {/* Card 3: Classroom Management */}
              <div className="md:col-span-4 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-vmg-blue/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-vmg-blue/10 flex items-center justify-center text-vmg-blue mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-vmg-navy mb-2">Tự tin quản lý lớp học</h3>
                  <p className="text-gray-600 text-sm">Đứng lớp chuyên nghiệp và xử lý tình huống linh hoạt trước mọi đối tượng học viên.</p>
                </div>
              </div>

              {/* Card 4: Internship */}
              <div className="md:col-span-4 p-8 bg-gradient-to-br from-white to-vmg-green/5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-vmg-green/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-vmg-green/10 flex items-center justify-center text-vmg-green mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-vmg-navy mb-2">Thực tập & Kết nối việc làm</h3>
                  <p className="text-gray-600 text-sm">Cơ hội thực hành thực tế và kết nối việc làm ngay tại VMG hoặc đối tác uy tín.</p>
                </div>
              </div>

              {/* Card 5: Career Path */}
              <div className="md:col-span-4 p-8 bg-vmg-navy text-white rounded-3xl shadow-xl flex flex-col justify-between group hover:bg-vmg-navy/95 transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2">Phát triển sự nghiệp tự do</h3>
                  <p className="text-white/80 text-sm">Đủ năng lực để tự mở lớp hoặc phát triển lộ trình sự nghiệp giáo viên tự do (Freelance).</p>
                </div>
              </div>
            </div>
          </div>
        </FadeSlideUp>
      
      </div>
      {/* Vì sao TESOL */}
      <div className="relative">
        <div className="relative py-4">
          <h2 className="text-3xl md:text-4xl font-bold text-vmg-navy mb-8 text-center">
            Vì sao TESOL Online tại VMG là một lựa chọn khác biệt
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 hover:border-vmg-blue/40 transition-all duration-300 p-6">
                {/* Icon and Title Row */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 bg-${feature.color}/10`}>
                    <div className="scale-125">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-vmg-navy group-hover:text-vmg-blue transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Bottom accent line */}
                <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-vmg-blue to-vmg-green rounded-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
