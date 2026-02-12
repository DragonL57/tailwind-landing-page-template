import React, { useState } from "react";
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
        {/* Nội dung khóa học */}
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-vmg-blue/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-vmg-green/5 rounded-full blur-2xl"></div>
          
          <div className="relative bg-white rounded-2xl p-4 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-vmg-navy mb-6">
              Nội dung khóa học
            </h2>
            <ul className="space-y-2">
          <li className="group flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-vmg-blue/5 transition-all duration-200">
            <div className="w-8 h-8 bg-vmg-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-vmg-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-lg text-gray-700 group-hover:text-vmg-navy transition-colors">Nhận chứng chỉ TESOL quốc tế (ALAP - Anh Quốc) có giá trị vĩnh viễn toàn cầu.</span>
          </li>
          <li className="group flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-vmg-blue/5 transition-all duration-200">
            <div className="w-8 h-8 bg-vmg-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-vmg-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-lg text-gray-700 group-hover:text-vmg-navy transition-colors">Thành thạo kỹ năng soạn giáo án và phương pháp giảng dạy (Online & Offline).</span>
          </li>
          <li className="group flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-vmg-blue/5 transition-all duration-200">
            <div className="w-8 h-8 bg-vmg-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-vmg-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-lg text-gray-700 group-hover:text-vmg-navy transition-colors">Tự tin quản lý lớp học và đứng lớp chuyên nghiệp trước mọi đối tượng học viên.</span>
          </li>
          <li className="group flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-vmg-blue/5 transition-all duration-200">
            <div className="w-8 h-8 bg-vmg-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-vmg-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-lg text-gray-700 group-hover:text-vmg-navy transition-colors">Được thực tập và kết nối việc làm ngay tại VMG hoặc các trường đối tác uy tín.</span>
          </li>
          <li className="group flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-vmg-blue/5 transition-all duration-200">
            <div className="w-8 h-8 bg-vmg-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-vmg-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-lg text-gray-700 group-hover:text-vmg-navy transition-colors">Có đủ năng lực để tự mở lớp hoặc phát triển sự nghiệp giáo viên tự do.</span>
          </li>
        </ul>
          </div>
        </div>

      {/* Vì sao TESOL */}
      <div className="relative">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-vmg-blue/[0.02] to-vmg-green/[0.02] rounded-3xl"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-vmg-navy/5 rounded-full blur-3xl"></div>
        
        <div className="relative py-4">
          <h2 className="text-3xl md:text-4xl font-bold text-vmg-navy mb-8 relative">
            <span className="relative z-10">Vì sao TESOL Online tại VMG là một lựa chọn khác biệt</span>
            <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-vmg-blue to-vmg-green rounded-full"></div>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-vmg-blue/30 transition-all duration-300">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-vmg-blue/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <button
                onClick={() => toggleAccordion(index)}
                className="relative w-full flex items-center justify-between p-6 text-left hover:bg-gradient-to-r hover:from-vmg-blue/5 hover:to-transparent transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${feature.color}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-vmg-navy">{feature.title}</h3>
                </div>
                <svg
                  className={`w-6 h-6 text-vmg-navy transition-transform ${openAccordion.includes(index) ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openAccordion.includes(index) && (
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-700 leading-relaxed pl-16">{feature.description}</p>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
