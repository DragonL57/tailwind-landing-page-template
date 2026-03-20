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
      color: "border-[#BE202F] text-[#BE202F] group-hover:bg-[#BE202F]",
      accent: "border-[#BE202F]"
    },
    {
      title: "CHUYÊN GIA & QUẢN LÝ",
      desc: "Yêu cầu sự chuẩn xác về ngôn ngữ và phong thái chuyên môn cao để dẫn dắt đội ngũ và đàm phán.",
      color: "border-[#B6914C] text-[#B6914C] group-hover:bg-[#B6914C]",
      accent: "border-[#B6914C]"
    },
    {
      title: "HỌC VIÊN HỌC THUẬT",
      desc: "Học sinh, sinh viên có mục tiêu chinh phục các chứng chỉ hoặc nâng cao năng lực học đường.",
      color: "border-[#BE202F] text-[#BE202F] group-hover:bg-[#BE202F]",
      accent: "border-[#BE202F]"
    },
    {
      title: "CÁ NHÂN HÓA",
      desc: "Người bận rộn cần một lộ trình học tập cực kỳ linh hoạt, được thiết kế riêng biệt theo quỹ thời gian.",
      color: "border-[#B6914C] text-[#B6914C] group-hover:bg-[#B6914C]",
      accent: "border-[#B6914C]"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Dot Texture */}
      <div className="absolute inset-0 opacity-60" style={academicGridStyle}></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#191c1c] leading-[1.1] font-headline uppercase mb-8">
              ĐỐI TƯỢNG <br />
              <span className="text-[#B6914C]">PHÙ HỢP NHẤT</span>
            </h2>
            <p className="text-lg md:text-xl text-[#5b403f] font-body leading-relaxed max-w-md border-l-4 lg:border-l-0 lg:border-r-4 border-[#BE202F] pl-8 lg:pl-0 lg:pr-8 lg:text-right">
              Hệ thống FlexTrack được tinh chỉnh để phục vụ những cá nhân đòi hỏi sự nghiêm túc trong học thuật và sự linh hoạt trong thực thi.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e7e8e8] border border-[#e7e8e8]">
            {audiences.map((item, i) => (
              <div 
                key={i} 
                className="group relative bg-white p-10 transition-all duration-300 hover:bg-[#f8f9f9]"
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-current transition-colors ${item.accent}`}></div>
                
                <div className="mb-10">
                  <div className={`inline-block border-2 px-6 py-3 transition-all duration-300 rounded-none ${item.color} group-hover:text-white`}>
                    <h4 className="text-sm font-bold font-headline tracking-[2px] uppercase">
                      {item.title}
                    </h4>
                  </div>
                </div>
                
                <p className="text-[#5b403f] font-body text-sm md:text-base leading-relaxed opacity-80 group-hover:opacity-100">
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
