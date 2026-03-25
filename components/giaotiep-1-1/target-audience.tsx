"use client";

import { motion, Variants } from "framer-motion";

export default function TargetAudience() {
  const academicGridStyle = {
    backgroundImage: "radial-gradient(#e1e3e3 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  };

  const audiences = [
    {
      title: "NGƯỜI ĐI LÀM",
      desc: "Cần sử dụng tiếng Anh nhạy bén trong công việc chuyên nghiệp.",
      color: "border-[#BE202F] text-[#BE202F] group-hover:bg-[#BE202F]",
      accent: "border-[#BE202F]"
    },
    {
      title: "QUẢN LÝ",
      desc: "Yêu cầu sự chuẩn xác về ngôn ngữ và phong thái chuyên môn cao.",
      color: "border-[#B6914C] text-[#B6914C] group-hover:bg-[#B6914C]",
      accent: "border-[#B6914C]"
    },
    {
      title: "HỌC THUẬT",
      desc: "Mục tiêu chinh phục chứng chỉ hoặc nâng cao năng lực học đường.",
      color: "border-[#BE202F] text-[#BE202F] group-hover:bg-[#BE202F]",
      accent: "border-[#BE202F]"
    },
    {
      title: "CHUYÊN BIỆT",
      desc: "Người bận rộn cần lộ trình linh hoạt, thiết kế riêng biệt theo quỹ thời gian.",
      color: "border-[#B6914C] text-[#B6914C] group-hover:bg-[#B6914C]",
      accent: "border-[#B6914C]"
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative h-full w-full py-12 md:py-20 bg-[#f3f4f4] flex flex-col justify-center overflow-hidden">
      {/* Background Dot Texture */}
      <div className="absolute inset-0 opacity-60" style={academicGridStyle}></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Headline Narrative */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#191c1c] leading-tight font-headline uppercase mb-8">
              ĐỐI TƯỢNG <br />
              <span className="text-[#B6914C]">PHÙ HỢP NHẤT</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-[#5b403f] font-body leading-relaxed max-w-md border-l-4 lg:border-l-0 lg:border-r-4 border-[#BE202F] pl-8 lg:pl-0 lg:pr-8 lg:text-right">
              Hệ thống FlexTrack được tinh chỉnh để phục vụ những cá nhân đòi hỏi sự nghiêm túc trong học thuật và sự linh hoạt trong thực thi.
            </motion.p>
          </div>

          {/* Right: Audience Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e7e8e8] border border-[#e7e8e8]">
            {audiences.map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group relative bg-white p-10 transition-colors duration-300 hover:bg-[#f8f9f9]"
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
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
