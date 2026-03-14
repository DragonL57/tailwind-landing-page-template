import React from "react";

export default function TesolBenefits() {
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
    <div className="relative overflow-hidden bg-white rounded-[3rem]">
      {/* Background Silhouette Logo */}
      <div className="absolute -left-24 -top-5 w-[500px] h-[500px] opacity-100 pointer-events-none z-0 select-none">
        <img src="/images/Picture1.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="relative section-padding z-10">
        <h2 className="text-3xl md:text-4xl font-black text-vmg-navy mb-12 text-center leading-tight">
          Vì sao TESOL Online tại VMG là một lựa chọn khác biệt
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 hover:border-vmg-blue/40 transition-all duration-300 p-6">
              {/* Icon and Title Row */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 bg-${feature.color}/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
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
  );
}
