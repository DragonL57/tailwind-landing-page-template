import React from "react";
import FadeSlideUp from "./fade-slide-up";

export default function CourseContent() {
  return (
    <div className="relative">
      {/* Nội dung khóa học - Bento Grid */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-black text-vmg-blue uppercase tracking-[0.3em] inline-block mb-3">Lộ trình đào tạo</span>
          <h2 className="text-3xl md:text-5xl font-black text-vmg-navy mb-4 tracking-tight">Nội dung khóa học</h2>
          <p className="text-lg text-vmg-navy/60 max-w-2xl mx-auto font-medium">
            Trang bị kiến thức sư phạm thực tế, chứng chỉ quốc tế và cơ hội thực tập chuyên nghiệp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Main Highlight - Certificate */}
          <div className="md:col-span-8 p-10 bg-white rounded-[2.5rem] border border-vmg-blue/10 shadow-sm flex flex-col items-start hover:border-vmg-blue/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -bottom-6 -right-4 text-[160px] font-black text-vmg-green/10 leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:text-vmg-green/20">1</div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black text-vmg-navy mb-4">Nhận chứng chỉ TESOL quốc tế</h3>
              <p className="text-vmg-navy/70 text-lg leading-relaxed max-w-2xl">Chứng chỉ <span className="text-vmg-blue font-bold">(ALAP - Anh Quốc)</span> có giá trị vĩnh viễn toàn cầu, được kiểm định bởi tổ chức uy tín hàng đầu Vương Quốc Anh.</p>
            </div>
          </div>

          {/* Card 2: Lesson Planning */}
          <div className="md:col-span-4 p-10 bg-white rounded-[2.5rem] border border-vmg-blue/10 shadow-sm flex flex-col items-start hover:border-vmg-blue/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -bottom-4 -right-2 text-[120px] font-black text-vmg-green/10 leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:text-vmg-green/20">2</div>
            <div className="relative z-10">
              <h3 className="text-xl font-black text-vmg-navy mb-3">Thành thạo kỹ năng soạn giáo án</h3>
              <p className="text-vmg-navy/60 text-sm leading-relaxed font-medium">Làm chủ phương pháp giảng dạy hiện đại cho cả môi trường Online & Offline.</p>
            </div>
          </div>

          {/* Card 3: Classroom Management */}
          <div className="md:col-span-4 p-10 bg-white rounded-[2.5rem] border border-vmg-blue/10 shadow-sm flex flex-col items-start hover:border-vmg-blue/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -bottom-4 -right-2 text-[120px] font-black text-vmg-green/10 leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:text-vmg-green/20">3</div>
            <div className="relative z-10">
              <h3 className="text-xl font-black text-vmg-navy mb-3">Tự tin quản lý lớp học</h3>
              <p className="text-vmg-navy/60 text-sm leading-relaxed font-medium">Đứng lớp chuyên nghiệp và xử lý tình huống linh hoạt trước mọi đối tượng học viên.</p>
            </div>
          </div>

          {/* Card 4: Internship */}
          <div className="md:col-span-4 p-10 bg-white rounded-[2.5rem] border border-vmg-blue/10 shadow-sm flex flex-col items-start hover:border-vmg-blue/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -bottom-4 -right-2 text-[120px] font-black text-vmg-green/10 leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:text-vmg-green/20">4</div>
            <div className="relative z-10">
              <h3 className="text-xl font-black text-vmg-navy mb-3">Thực tập & Việc làm</h3>
              <p className="text-vmg-navy/60 text-sm leading-relaxed font-medium">Được thực tập và kết nối việc làm ngay tại hệ thống VMG hoặc các đối tác uy tín.</p>
            </div>
          </div>

          {/* Card 5: Career Path */}
          <div className="md:col-span-4 p-10 bg-white rounded-[2.5rem] border border-vmg-blue/10 shadow-sm flex flex-col items-start hover:border-vmg-blue/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -bottom-4 -right-2 text-[120px] font-black text-vmg-green/10 leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:text-vmg-green/20">5</div>
            <div className="relative z-10">
              <h3 className="text-xl font-black text-vmg-navy mb-3">Phát triển sự nghiệp</h3>
              <p className="text-vmg-navy/60 text-sm leading-relaxed font-medium">Có đủ năng lực để tự mở lớp hoặc phát triển sự nghiệp giáo viên tự do chuyên nghiệp.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
