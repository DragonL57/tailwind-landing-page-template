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
      description: "Học viên được tương tác trực tiếp với giảng viên thông qua các buổi livestream giải đáp định kỳ hàng tuần, cùng hệ thống mentor và tutor theo sát tiến độ học tập.",
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
            <div className="text-center mb-8">
              <span className="text-xs font-black text-[#0038D1] uppercase tracking-widest inline-block mb-2">Nội dung khóa học</span>
              <h2 className="text-3xl md:text-4xl font-black text-vmg-navy mb-2">Nội dung khóa học</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">Khóa học trang bị kiến thức sư phạm thực tế, chứng chỉ quốc tế và cơ hội thực tập — phù hợp cho giáo viên mới và muốn nâng cao chuyên môn.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <div className="flex flex-col items-start gap-4 p-6 bg-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-vmg-green/10 flex items-center justify-center text-vmg-green">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                </div>
                <h3 className="font-bold text-vmg-navy">Nhận chứng chỉ TESOL quốc tế (ALAP)</h3>
                <p className="text-sm text-gray-600">Chứng chỉ có giá trị vĩnh viễn toàn cầu.</p>
              </div>

              <div className="flex flex-col items-start gap-4 p-6 bg-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-vmg-blue/10 flex items-center justify-center text-vmg-blue">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3h12v2H4V3zM4 7h12v2H4V7zM4 11h12v2H4v-2zM4 15h12v2H4v-2z"/></svg>
                </div>
                <h3 className="font-bold text-vmg-navy">Thành thạo soạn giáo án & phương pháp</h3>
                <p className="text-sm text-gray-600">Thực hành soạn giảng cho cả online & offline.</p>
              </div>

              <div className="flex flex-col items-start gap-4 p-6 bg-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-vmg-green/10 flex items-center justify-center text-vmg-green">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 100 12A6 6 0 0010 2zM2 18a8 8 0 0116 0H2z"/></svg>
                </div>
                <h3 className="font-bold text-vmg-navy">Tự tin quản lý lớp & đứng lớp</h3>
                <p className="text-sm text-gray-600">Kỹ năng quản trị lớp học trước mọi đối tượng học viên.</p>
              </div>

              <div className="flex flex-col items-start gap-4 p-6 bg-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-vmg-blue/10 flex items-center justify-center text-vmg-blue">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v11l-4-2-4 2-4-2-4 2V5z"/></svg>
                </div>
                <h3 className="font-bold text-vmg-navy">Thực tập & kết nối việc làm</h3>
                <p className="text-sm text-gray-600">Cơ hội thực tập tại VMG và các trường đối tác uy tín.</p>
              </div>

              <div className="flex flex-col items-start gap-4 p-6 bg-white rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-vmg-green/10 flex items-center justify-center text-vmg-green">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M3 3h14v2H3V3zm0 4h14v10H3V7z"/></svg>
                </div>
                <h3 className="font-bold text-vmg-navy">Đủ năng lực mở lớp & phát triển nghề</h3>
                <p className="text-sm text-gray-600">Chuẩn bị để tự mở lớp hoặc làm giảng viên tự do.</p>
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
