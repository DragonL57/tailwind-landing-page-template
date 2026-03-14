import React from "react";
import FadeSlideUp from "./fade-slide-up";

export default function CourseContent() {
  return (
    <div className="relative">
      {/* Nội dung khóa học - Bento Grid */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-black text-[#0038D1] uppercase tracking-widest inline-block mb-2">Lộ trình đào tạo</span>
          <h2 className="text-3xl md:text-5xl font-black text-vmg-navy mb-4 italic">Nội dung khóa học</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Trang bị kiến thức sư phạm thực tế, chứng chỉ quốc tế và cơ hội thực tập chuyên nghiệp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Card 1: Main Highlight - Certificate */}
          <div className="md:col-span-8 p-8 bg-gradient-to-br from-white to-vmg-blue/5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-end group hover:border-vmg-blue/30 transition-all duration-300">
            <div>
              <h3 className="text-2xl font-black text-black mb-2">Nhận chứng chỉ TESOL quốc tế (ALAP - Anh Quốc)</h3>
              <p className="text-black">Chứng chỉ có giá trị vĩnh viễn toàn cầu, được kiểm định bởi tổ chức uy tín hàng đầu Vương Quốc Anh.</p>
            </div>
          </div>

          {/* Card 2: Lesson Planning */}
          <div className="md:col-span-4 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-end group hover:border-vmg-green/30 transition-all duration-300">
            <div>
              <h3 className="text-xl font-black text-black mb-2">Thành thạo kỹ năng soạn giáo án</h3>
              <p className="text-black text-sm">Làm chủ phương pháp giảng dạy hiện đại (Online & Offline).</p>
            </div>
          </div>

          {/* Card 3: Classroom Management */}
          <div className="md:col-span-4 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-end group hover:border-vmg-blue/30 transition-all duration-300">
            <div>
              <h3 className="text-xl font-black text-black mb-2">Tự tin quản lý lớp học</h3>
              <p className="text-black text-sm">Đứng lớp chuyên nghiệp trước mọi đối tượng học viên.</p>
            </div>
          </div>

          {/* Card 4: Internship */}
          <div className="md:col-span-4 p-8 bg-gradient-to-br from-white to-vmg-green/5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-end group hover:border-vmg-green/30 transition-all duration-300">
            <div>
              <h3 className="text-xl font-black text-black mb-2">Thực tập & Việc làm</h3>
              <p className="text-black text-sm">Kết nối việc làm ngay tại VMG hoặc các trường đối tác uy tín.</p>
            </div>
          </div>

          {/* Card 5: Career Path */}
          <div className="md:col-span-4 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-end group hover:border-vmg-blue/30 transition-all duration-300 relative overflow-hidden">
            <div>
              <h3 className="text-xl font-black text-black mb-2">Phát triển sự nghiệp</h3>
              <p className="text-black text-sm">Đủ năng lực tự mở lớp hoặc phát triển sự nghiệp giáo viên tự do.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
