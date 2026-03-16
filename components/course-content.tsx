import React from "react";
import { Check } from "lucide-react";

export default function CourseContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Silhouette Logo */}
      <div className="absolute -left-1 -bottom-20 w-[600px] h-[600px] opacity-100 pointer-events-none z-0 select-none">
        <img src="/images/Picture1.png" alt="" className="w-50 h-50 object-contain opacity-5 grayscale" />
      </div>

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
          {/* Card 1: Certificate */}
          <div className="md:col-span-7 p-10 bg-white rounded-[2.5rem] border border-vmg-blue/10 shadow-sm flex flex-col items-start hover:border-vmg-blue/30 transition-all duration-300 relative overflow-hidden group min-h-[280px]">
            <div className="absolute -bottom-6 -right-4 text-[160px] font-black text-vmg-green/15 leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:text-vmg-green/25">1</div>
            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-2xl md:text-3xl font-black text-vmg-navy mb-4">Nhận chứng chỉ TESOL quốc tế</h3>
              <p className="text-vmg-navy/70 text-lg leading-relaxed">
                Chứng chỉ <span className="text-vmg-blue font-bold">(ALAP - Anh Quốc)</span> có giá trị vĩnh viễn toàn cầu, được kiểm định bởi tổ chức uy tín hàng đầu Vương Quốc Anh.
              </p>
            </div>
          </div>

          {/* Card 2: Internship */}
          <div className="md:col-span-5 p-10 bg-white rounded-[2.5rem] border border-vmg-blue/10 shadow-sm flex flex-col items-start hover:border-vmg-blue/30 transition-all duration-300 relative overflow-hidden group min-h-[280px]">
            <div className="absolute -bottom-4 -right-2 text-[120px] font-black text-vmg-green/15 leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:text-vmg-green/25">2</div>
            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-2xl font-black text-vmg-navy mb-4">Thực tập & Việc làm</h3>
              <p className="text-vmg-navy/60 text-base leading-relaxed font-medium">
                Học viên được <span className="font-bold text-vmg-blue">thực tập và kết nối việc làm</span> trực tiếp tại hệ thống Anh ngữ VMG hoặc mạng lưới đối tác giáo dục uy tín trên toàn quốc ngay sau khi tốt nghiệp.
              </p>
            </div>
          </div>

          {/* Card 3: Skills */}
          <div className="md:col-span-6 p-10 bg-white rounded-[2.5rem] border border-vmg-blue/10 shadow-sm flex flex-col items-start hover:border-vmg-blue/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -bottom-6 -right-4 text-[160px] font-black text-vmg-green/15 leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:text-vmg-green/25">3</div>
            <div className="relative z-10 w-full">
              <h3 className="text-2xl font-black text-vmg-navy mb-5">Kỹ năng sư phạm chuyên nghiệp</h3>
              <ul className="space-y-3">
                {[
                  "Language awareness & grammar pedagogy",
                  "Teaching methodology (CLT, inductive/deductive)",
                  "Lesson planning & classroom management",
                  "Assessment & learner feedback",
                  "Practical teaching application"
                ].map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 w-4 h-4 rounded-full bg-vmg-green/20 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-vmg-green" strokeWidth={4} />
                    </div>
                    <span className="text-vmg-navy/70 text-sm md:text-base font-medium">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 4: Career Path */}
          <div className="md:col-span-6 p-10 bg-white rounded-[2.5rem] border border-vmg-blue/10 shadow-sm flex flex-col items-start hover:border-vmg-blue/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -bottom-6 -right-4 text-[160px] font-black text-vmg-green/15 leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:text-vmg-green/25">4</div>
            <div className="relative z-10 w-full">
              <h3 className="text-2xl font-black text-vmg-navy mb-5">Phát triển sự nghiệp</h3>
              <p className="text-vmg-navy/70 text-base mb-4 font-medium">Sở hữu chứng chỉ TESOL từ VMG đủ điều kiện để giảng dạy <span className="font-bold text-vmg-blue">tiếng Anh chuẩn quốc tế</span> tại nhiều môi trường:</p>
              <ul className="space-y-3">
                {[
                  "Trung tâm Anh ngữ quốc tế",
                  "Trường học tư thục & song ngữ",
                  "Giảng dạy trực tuyến (online)",
                  "Lớp học cá nhân 1–1"
                ].map((path, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1.5 w-4 h-4 rounded-full bg-vmg-blue/20 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-vmg-blue" strokeWidth={4} />
                    </div>
                    <span className="text-vmg-navy/70 text-sm md:text-base font-medium">{path}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
