"use client";

import { motion, Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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

  const academicGridStyle = {
    backgroundImage: "radial-gradient(#e1e3e3 1px, transparent 1px)",
    backgroundSize: "30px 30px",
  };

  return (
    <section className="relative h-full w-full flex flex-col justify-center bg-white overflow-hidden">
      {/* Background Decorative Element - Full Width with Academic Grid Texture */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f3f4f4] -z-10 hidden lg:block overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={academicGridStyle}></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-8 lg:py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: The Narrative */}
          <div className="lg:col-span-7 z-10">
            <motion.h1 
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#191c1c] leading-[1.1] tracking-tight mb-6 uppercase font-headline"
            >
              LINH HOẠT ĐỂ HỌC TỐT. <br />
              <span className="text-brand-crimson italic">VỮNG VÀNG</span> ĐỂ TIẾN XA.
            </motion.h1>
            
            <motion.div variants={itemVariants} className="space-y-4 text-base md:text-lg text-[#5b403f] font-body leading-relaxed max-w-2xl mb-8">
              <p className="border-l-4 border-brand-crimson pl-6 font-medium">
                Hệ chương trình tiếng Anh 1–1 trực tuyến được thiết kế riêng biệt để đáp ứng các mục tiêu học thuật và sự nghiệp cao nhất.
              </p>
              <p className="pl-6 opacity-80 text-sm md:text-base">
                Xây dựng lộ trình cá nhân hóa dựa trên năng lực thực tế, thời gian biểu cá nhân và mục đích sử dụng ngôn ngữ trong môi trường chuyên nghiệp.
              </p>
            </motion.div>

            {/* Feature Bullets - Increased text size for readability */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-8 max-w-2xl border-t border-b border-slate-200 py-6"
            >
              {[
                "Lớp học 1–1 tương tác cao",
                "Phân tích năng lực chuyên sâu",
                "Lịch học linh hoạt 24/7",
                "Tiêu chuẩn học thuật quốc tế"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-gold"></div>
                  <span className="font-bold text-xs uppercase tracking-[1.5px] text-[#191c1c]">{feature}</span>
                </div>
              ))}
            </motion.div>

            <div className="flex justify-center lg:justify-start">
              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-brand-crimson text-white px-10 py-4 font-bold tracking-[2px] uppercase text-xs md:text-sm transition-all rounded-none"
              >
                BẮT ĐẦU LỘ TRÌNH NGAY
              </motion.button>
            </div>
          </div>

          {/* Right Column: Video Placeholder (3:4 Portrait) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center lg:justify-end h-full"
          >
            <div className="relative w-full max-w-[450px] aspect-[3/4] md:aspect-[3/4] bg-slate-200 overflow-hidden group max-h-[50vh] md:max-h-[70vh]">
              {/* Architectural Border */}
              <div className="absolute inset-0 border-[15px] border-[#f3f4f4] z-10 pointer-events-none"></div>
              
              <video 
                className="w-full h-full object-cover grayscale brightness-110 contrast-125 bg-slate-300"
                autoPlay 
                muted 
                loop 
                playsInline
                poster="https://lh3.googleusercontent.com/aida-public/AB6AXuAGzZ9Hf8lRYDMFCAgMRTNylBU6uYNGJJgUKLhhbhwmlrhRM3PTLNiKrOfDxuuQ1luthmNbLmjVuRn-Yf0n7ktOsjr4qXypVCYuPJNPpPLw9A-LMbgUSB5L2t3J-_k-jlx_c6ujngDcDFY1V9UplrIdgQs666EtnpPCs41UgsOV8VsKm1ZRyLXH_7SriXiTxS3-NdQCT7_Y3sgLiGhrIky5nTrYAFZSGfLm8g1Y1pFxmIZVVgiW8jRKRDMKJkFHoWe6V7aKq1LfaA0"
              >
              </video>

              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                 <div className="w-16 h-16 border-2 border-white flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                 </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-4 border-b-4 border-brand-crimson z-20"></div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
