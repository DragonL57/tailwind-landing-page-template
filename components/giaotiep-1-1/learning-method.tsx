"use client";

import { motion, Variants } from "framer-motion";

export default function LearningMethod() {
  const methods = [
    {
      title: "Tương Tác Trực Tiếp",
      desc: "Giáo viên giảng dạy trực tiếp và tương tác liên tục với học viên trong suốt buổi học.",
      icon: "01"
    },
    {
      title: "Điều Chỉnh Cá Nhân",
      desc: "Nội dung học được điều chỉnh linh hoạt theo tiến độ thực tế và mục tiêu riêng biệt.",
      icon: "02"
    },
    {
      title: "Hệ Thống Mentor",
      desc: "Mentor theo dõi sát sao tiến trình học tập và hỗ trợ chuyên sâu trong suốt khóa học.",
      icon: "03"
    },
    {
      title: "Mục Tiêu Rõ Ràng",
      desc: "Mỗi buổi học đều có mục tiêu đầu ra cụ thể và được theo dõi xuyên suốt lộ trình.",
      icon: "04"
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
    <section className="relative h-full w-full py-8 md:py-12 bg-[#f3f4f4] flex flex-col justify-center overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start mb-10 gap-8">
          <div className="max-w-3xl">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-[#191c1c] leading-tight font-headline uppercase mb-4">
              PHƯƠNG PHÁP <br />
              <span className="text-[#B6914C]">KIẾN TẠO TRI THỨC</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-[#5b403f] font-body leading-relaxed max-w-2xl border-l-4 border-[#B6914C] pl-6 italic">
              Học 1–1 trực tuyến qua nền tảng tương tác cao, đảm bảo sự tập trung và hiệu quả tối ưu.
            </motion.p>
          </div>
          
          <motion.div variants={itemVariants} className="hidden lg:flex flex-col items-end gap-1 text-[#B6914C]/40 pt-2">
             <div className="w-32 h-px bg-current"></div>
             <div className="text-[10px] font-bold tracking-[2px] uppercase">Mô hình kiến trúc</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
          {methods.map((method, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="bg-white p-6 md:p-8 hover:bg-[#f8f9f9] transition-all duration-300 group"
            >
              <div className="text-4xl font-bold font-headline text-[#f3f4f4] group-hover:text-[#BE202F]/10 transition-colors mb-6">
                {method.icon}
              </div>
              <h4 className="text-lg font-bold mb-3 uppercase tracking-[1.5px] font-headline text-[#191c1c]">
                {method.title}
              </h4>
              <p className="text-[#5b403f] font-body leading-relaxed text-xs md:text-sm">
                {method.desc}
              </p>
              <div className="mt-6 w-10 h-1 bg-[#BE202F] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
