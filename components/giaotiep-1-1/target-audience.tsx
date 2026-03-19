"use client";

export default function TargetAudience() {
  const academicGridStyle = {
    backgroundImage: "radial-gradient(#e1e3e3 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  };

  const audiences = [
    {
      title: "NGƯỜI ĐI LÀM",
      desc: "Cần sử dụng tiếng Anh nhạy bén trong giao tiếp hàng ngày hoặc môi trường công việc chuyên nghiệp.",
      icon: "💼"
    },
    {
      title: "CHUYÊN GIA & QUẢN LÝ",
      desc: "Yêu cầu sự chuẩn xác về ngôn ngữ và phong thái chuyên môn cao để dẫn dắt đội ngũ và đàm phán.",
      icon: "🎯"
    },
    {
      title: "HỌC VIÊN HỌC THUẬT",
      desc: "Học sinh, sinh viên có mục tiêu chinh phục các chứng chỉ hoặc nâng cao năng lực học đường.",
      icon: "🎓"
    },
    {
      title: "CÁ NHÂN HÓA",
      desc: "Người bận rộn cần một lộ trình học tập cực kỳ linh hoạt, được thiết kế riêng biệt theo quỹ thời gian.",
      icon: "⚡"
    }
  ];

  return (
    <section className="py-24 bg-[#f3f4f4] relative overflow-hidden" style={academicGridStyle}>
      {/* Decorative Brand Block */}
      <div className="absolute top-0 right-0 w-1/4 h-2 bg-[#BE202F]"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Headline Narrative */}
          <div className="lg:col-span-5 sticky top-24">
            <span className="inline-block text-[#BE202F] font-bold tracking-[2px] text-xs md:text-sm uppercase mb-6 bg-[#BE202F]/10 px-4 py-1">
              SUITABILITY FRAMEWORK
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#191c1c] leading-tight font-headline uppercase mb-8">
              ĐỐI TƯỢNG <br />
              <span className="text-[#B6914C]">PHÙ HỢP NHẤT</span>
            </h2>
            <div className="w-24 h-1 bg-[#BE202F] mb-8"></div>
            <p className="text-lg text-[#5b403f] font-body leading-relaxed max-w-md">
              Hệ thống FlexTrack được tinh chỉnh để phục vụ những cá nhân đòi hỏi sự nghiêm túc trong học thuật và sự linh hoạt trong thực thi.
            </p>
          </div>

          {/* Right: Audience Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {audiences.map((item, i) => (
              <div 
                key={i} 
                className="bg-white p-8 border-l-4 border-slate-200 hover:border-[#BE202F] transition-all duration-300 group shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
              >
                <div className="text-2xl mb-6 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                <h4 className="text-lg font-bold font-headline text-[#191c1c] mb-4 tracking-[1px]">
                  {item.title}
                </h4>
                <p className="text-[#5b403f] font-body text-sm leading-relaxed opacity-80 group-hover:opacity-100">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
