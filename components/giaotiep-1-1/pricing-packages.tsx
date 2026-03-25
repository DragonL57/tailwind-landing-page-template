"use client";

import { motion, Variants } from "framer-motion";

export default function PricingPackages() {
  const packages = [
    {
      name: "FlexTrack Basic",
      duration: "60 Giờ",
      focus: "Lộ trình tập trung vào một nhóm mục tiêu chính.",
      audience: "Phù hợp với học viên muốn cải thiện kỹ năng trọng tâm.",
      accent: "border-[#BE202F]",
      tag: "CỐT LÕI"
    },
    {
      name: "FlexTrack Pro",
      duration: "120 Giờ",
      focus: "Lộ trình mở rộng, cá nhân hóa sâu hơn theo tiến độ.",
      audience: "Phù hợp với học viên cần sử dụng ổn định cho công việc.",
      accent: "border-[#BE202F]",
      tag: "TIÊU CHUẨN"
    },
    {
      name: "FlexTrack Premium",
      duration: "180 Giờ",
      focus: "Lộ trình toàn diện và dài hạn.",
      audience: "Mức độ cá nhân hóa cao, theo sát mục tiêu lâu dài.",
      accent: "border-[#B6914C]",
      tag: "ĐẲNG CẤP",
      isPremium: true
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-fit md:h-full w-full py-12 md:py-12 bg-white flex flex-col justify-center overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full"
      >
        <div className="text-center mb-8 md:mb-12">
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#191c1c] leading-tight font-headline uppercase">
            CÁC GÓI HỌC TRONG <br />
            <span className="text-[#BE202F]">FLEXTRACK PATHWAY</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className={`relative bg-[#f8f9f9] border-t-4 md:border-t-8 ${pkg.accent} p-6 md:p-8 flex flex-col transition-all duration-500 hover:bg-white group ${pkg.isPremium ? 'lg:-translate-y-2' : ''}`}
            >
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <span className={`text-[9px] font-bold tracking-[2px] uppercase px-2 py-0.5 ${pkg.isPremium ? 'bg-[#B6914C] text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {pkg.tag}
                </span>
                <span className="text-2xl font-bold font-headline text-slate-200 group-hover:text-[#BE202F]/10 transition-colors">
                  0{i + 1}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold font-headline text-[#191c1c] mb-1 uppercase">
                {pkg.name}
              </h3>
              
              <div className="flex items-baseline gap-2 mb-4 md:mb-6">
                <span className="text-[10px] font-bold text-[#B6914C] uppercase tracking-[1px]">Thời lượng:</span>
                <span className="text-lg font-bold text-[#191c1c]">{pkg.duration}</span>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="border-l-2 border-slate-200 pl-4 group-hover:border-[#BE202F] transition-colors">
                  <p className="text-sm text-[#5b403f] font-body leading-relaxed italic">
                    {pkg.focus}
                  </p>
                </div>
                <p className="text-[11px] md:text-xs text-[#5b403f] font-body leading-relaxed opacity-80">
                  {pkg.audience}
                </p>
              </div>

              <button className={`w-full py-3 font-bold tracking-[1.5px] uppercase text-[10px] md:text-xs transition-all rounded-none ${pkg.isPremium ? 'bg-[#B6914C] text-white hover:bg-[#a07e40]' : 'border-2 border-[#BE202F] text-[#BE202F] hover:bg-[#BE202F] hover:text-white'}`}>
                ĐĂNG KÝ NGAY
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
