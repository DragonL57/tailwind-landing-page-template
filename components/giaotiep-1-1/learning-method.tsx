"use client";

export default function LearningMethod() {
  const methods = [
    {
      title: "Tương Tác Trực Tiếp",
      desc: "Giáo viên giảng dạy trực tiếp và tương tác liên tục với học viên trong suốt buổi học.",
      icon: "01"
    },
    {
      title: "Điều Chỉnh Cá Nhân",
      desc: "Nội dung học được điều chỉnh linh hoạt theo tiến độ thực tế và mục tiêu riêng biệt của từng học viên.",
      icon: "02"
    },
    {
      title: "Hệ Thống Mentor",
      desc: "Mentor theo dõi sát sao tiến trình học tập và cung cấp hỗ trợ chuyên sâu trong suốt khóa học.",
      icon: "03"
    },
    {
      title: "Mục Tiêu Rõ Ràng",
      desc: "Mỗi buổi học đều có mục tiêu đầu ra cụ thể và được theo dõi xuyên suốt toàn bộ lộ trình.",
      icon: "04"
    }
  ];

  return (
    <section className="py-24 bg-[#f3f4f4]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-12">
          <div className="max-w-3xl">
            <span className="inline-block text-[#BE202F] font-bold tracking-[2px] text-xs md:text-sm uppercase mb-6 bg-[#BE202F]/10 px-4 py-1">
              LEARNING METHODOLOGY
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#191c1c] leading-tight font-headline uppercase mb-8">
              PHƯƠNG PHÁP <br />
              <span className="text-[#B6914C]">KIẾN TẠO TRI THỨC</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#5b403f] font-body leading-relaxed max-w-2xl border-l-4 border-[#B6914C] pl-8">
              Tất cả các nhánh học đều áp dụng mô hình học 1–1 trực tuyến qua nền tảng học tương tác cao, đảm bảo sự tập trung và hiệu quả tối ưu.
            </p>
          </div>
          
          {/* Decorative Element */}
          <div className="hidden lg:flex flex-col items-end gap-2 text-[#B6914C]/40 pt-4">
             <div className="w-48 h-px bg-current"></div>
             <div className="text-sm font-bold tracking-[3px] uppercase">Architectural Model</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
          {methods.map((method, i) => (
            <div 
              key={i} 
              className="bg-white p-10 hover:bg-[#f8f9f9] transition-all duration-300 group"
            >
              <div className="text-5xl font-bold font-headline text-[#f3f4f4] group-hover:text-[#BE202F]/10 transition-colors mb-8">
                {method.icon}
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-[1.5px] font-headline text-[#191c1c]">
                {method.title}
              </h4>
              <p className="text-[#5b403f] font-body leading-relaxed text-sm md:text-base">
                {method.desc}
              </p>
              <div className="mt-8 w-12 h-1 bg-[#BE202F] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
