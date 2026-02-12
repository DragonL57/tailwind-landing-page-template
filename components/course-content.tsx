import React from "react";

export default function CourseContent() {
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
    </div>
  );
}
