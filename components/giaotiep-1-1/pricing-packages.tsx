"use client";

export default function PricingPackages() {
  const packages = [
    {
      name: "FlexTrack Basic",
      duration: "60 Giờ",
      focus: "Lộ trình tập trung vào một nhóm mục tiêu chính.",
      audience: "Phù hợp với học viên muốn cải thiện kỹ năng trọng tâm trong thời gian gọn.",
      accent: "border-[#BE202F]",
      tag: "CORE"
    },
    {
      name: "FlexTrack Pro",
      duration: "120 Giờ",
      focus: "Lộ trình mở rộng, cá nhân hóa sâu hơn theo tiến độ học.",
      audience: "Phù hợp với học viên cần sử dụng tiếng Anh ổn định cho công việc hoặc học tập.",
      accent: "border-[#BE202F]",
      tag: "STANDARD"
    },
    {
      name: "FlexTrack Premium",
      duration: "180 Giờ",
      focus: "Lộ trình toàn diện và dài hạn.",
      audience: "Mức độ cá nhân hóa cao, theo sát mục tiêu phát triển lâu dài.",
      accent: "border-[#B6914C]",
      tag: "PRESTIGE",
      isPremium: true
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <span className="inline-block text-[#B6914C] font-bold tracking-[2px] text-xs md:text-sm uppercase mb-6 bg-[#B6914C]/10 px-4 py-1">
            PATHWAY SELECTION
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#191c1c] leading-tight font-headline uppercase">
            CÁC GÓI HỌC TRONG <br />
            <span className="text-[#BE202F]">FLEXTRACK PATHWAY</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <div 
              key={i} 
              className={`relative bg-[#f8f9f9] border-t-8 ${pkg.accent} p-10 flex flex-col transition-all duration-500 hover:shadow-[0_24px_48px_rgba(25,28,28,0.06)] group ${pkg.isPremium ? 'lg:-translate-y-4 lg:shadow-xl' : ''}`}
            >
              <div className="flex justify-between items-start mb-8">
                <span className={`text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 ${pkg.isPremium ? 'bg-[#B6914C] text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {pkg.tag}
                </span>
                <span className="text-4xl font-bold font-headline text-slate-200 group-hover:text-[#BE202F]/10 transition-colors">
                  0{i + 1}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold font-headline text-[#191c1c] mb-2 uppercase">
                {pkg.name}
              </h3>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-sm font-bold text-[#B6914C] uppercase tracking-[1.5px]">Thời lượng:</span>
                <span className="text-xl font-bold text-[#191c1c]">{pkg.duration}</span>
              </div>

              <div className="space-y-6 mb-12 flex-grow">
                <div className="border-l-2 border-slate-200 pl-6 group-hover:border-[#BE202F] transition-colors">
                  <p className="text-[#5b403f] font-body leading-relaxed italic">
                    {pkg.focus}
                  </p>
                </div>
                <p className="text-sm text-[#5b403f] font-body leading-relaxed opacity-80">
                  {pkg.audience}
                </p>
              </div>

              <button className={`w-full py-4 font-bold tracking-[2px] uppercase text-sm transition-all rounded-none ${pkg.isPremium ? 'bg-[#B6914C] text-white hover:bg-[#a07e40]' : 'border-2 border-[#BE202F] text-[#BE202F] hover:bg-[#BE202F] hover:text-white'}`}>
                ĐĂNG KÝ NGAY
              </button>

              {pkg.isPremium && (
                <div className="absolute top-0 right-0 p-4 pointer-events-none">
                  <div className="w-8 h-8 border-t-2 border-r-2 border-[#B6914C] opacity-50"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
