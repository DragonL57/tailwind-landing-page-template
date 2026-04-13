"use client";

import { motion, Variants } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function TargetAudience() {
  const audiences = [
    {
      title: "NGƯỜI ĐI LÀM",
      desc: "Cần phản xạ ngôn ngữ nhạy bén trong giao tiếp xã hội và các tình huống đời sống hàng ngày.",
      accent: "border-brand-crimson"
    },
    {
      title: "CHUYÊN GIA & QUẢN LÝ",
      desc: "Yêu cầu sự chuẩn xác cao trong thuật ngữ chuyên môn, đàm phán và thuyết trình quốc tế.",
      accent: "border-brand-gold"
    },
    {
      title: "DU LỊCH & DỊCH VỤ",
      desc: "Chuyên sâu cho nhân sự ngành dịch vụ, khách sạn, hàng không và những người đam mê xê dịch.",
      accent: "border-brand-crimson"
    },
    {
      title: "HỌC THUẬT & NGHIÊN CỨU",
      desc: "Người cần xây dựng nền tảng tư duy, bày tỏ quan điểm và bảo vệ lập luận logic bằng tiếng Anh.",
      accent: "border-brand-gold"
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
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-fit py-20 md:py-32 bg-white flex flex-col justify-center">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-pattern-grid opacity-5 pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Headline Narrative & THE GOAL */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <motion.div variants={itemVariants} className="text-brand-crimson font-bold text-[10px] tracking-[3px] uppercase mb-4">
              Ứng dụng thực tiễn
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight font-headline mb-8">
              Thiết kế cho <br />
              <span className="text-brand-gold italic">mọi ngữ cảnh</span>.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-brand-muted font-be-vietnam-pro leading-relaxed max-w-md border-l-2 border-brand-crimson pl-8 mb-8 md:mb-12">
              Lộ trình được tinh chỉnh để phục vụ những cá nhân đòi hỏi tính ứng dụng cao, từ giao tiếp xã hội đến môi trường làm việc chuyên biệt.
            </motion.p>

            {/* THE GOAL VISUAL - Fixed for Mobile visibility */}
            <motion.div variants={itemVariants} className="relative w-full h-[250px] md:h-[350px] overflow-visible select-none pointer-events-none mb-12 lg:mb-0">
               <div className="absolute inset-0 flex items-center justify-center scale-[1.3] md:scale-150 transform">
                  <DotLottieReact
                    src="https://lottie.host/ee4d54e6-c7b5-4693-bd13-956118f89aa4/WM3tvykKdt.lottie"
                    loop
                    autoplay
                  />
               </div>
               <div className="absolute bottom-0 left-8 text-brand-dark/[0.15] text-[9px] font-bold tracking-[3px] uppercase">
                  Đích đến: Kết nối tự nhiên
               </div>
            </motion.div>
          </div>

          {/* Right: Audience Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {audiences.map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className={`group relative bg-white p-10 border-t-2 ${item.accent} shadow-sm hover:shadow-2xl transition-all duration-500`}
              >
                <div className="mb-8">
                  <h4 className="text-xl font-bold font-headline text-brand-dark tracking-tight">
                    {item.title}
                  </h4>
                </div>
                
                <p className="text-brand-muted font-be-vietnam-pro text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
                
                {/* Decorative Element */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <svg className="w-6 h-6 text-brand-dark/10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                   </svg>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
