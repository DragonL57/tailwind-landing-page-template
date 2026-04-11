"use client";

import { motion, Variants } from "framer-motion";

export default function LearningMethod() {
  const methods = [
    {
      title: "Học Để Dùng Thực Tế",
      desc: "Ngôn ngữ được tích hợp trong các tình huống thật: phỏng vấn, thuyết trình, và đàm phán chuyên môn.",
      icon: "01"
    },
    {
      title: "Tối Ưu Thời Lượng Nói",
      desc: "Mô hình 1–1 giúp bạn tối đa hóa thời gian phản hồi, biến kiến thức thụ động thành phản xạ chủ động.",
      icon: "02"
    },
    {
      title: "Phản Hồi Chuyên Sâu",
      desc: "Chỉnh sửa phát âm, ngữ điệu và tư duy ngôn ngữ ngay lập tức từ đội ngũ chuyên gia học thuật.",
      icon: "03"
    },
    {
      title: "Lộ Trình Độc Bản",
      desc: "Nội dung được tinh chỉnh 100% dựa trên năng lực đầu vào và mục tiêu sự nghiệp riêng biệt của bạn.",
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
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-fit py-20 md:py-32 bg-white flex flex-col justify-center overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div variants={itemVariants} className="text-brand-crimson font-bold text-[10px] tracking-[3px] uppercase mb-4">
              Triết lý đào tạo
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight font-headline">
              Đi từ <span className="text-brand-crimson italic">Biết tiếng Anh</span> <br />đến <span className="text-brand-gold">Dùng được tiếng Anh</span>.
            </motion.h2>
          </div>
          <motion.p variants={itemVariants} className="text-lg text-brand-muted font-be-vietnam-pro max-w-md border-l-2 border-brand-gold pl-6">
            Chúng tôi không dạy bạn ghi nhớ thụ động. Chúng tôi kiến tạo môi trường để bạn luyện tập thật, phản hồi thật và sử dụng thật.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-brand-dark/10">
          {methods.map((method, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="relative group p-10 border-r border-b last:border-r-0 lg:border-b-0 border-brand-dark/10 hover:bg-brand-surface/30 transition-all duration-500 overflow-hidden"
            >
              {/* Large background number */}
              <div className="absolute bottom-4 right-4 text-7xl font-bold font-headline text-brand-dark/[0.03] group-hover:text-brand-crimson/[0.05] transition-colors duration-500 select-none pointer-events-none">
                {method.icon}
              </div>
              
              <div className="relative z-10">
                <div className="w-10 h-1 bg-brand-gold mb-8 group-hover:bg-brand-crimson group-hover:w-16 transition-all duration-500"></div>
                
                <h4 className="text-xl font-bold mb-4 font-headline text-brand-dark leading-tight">
                  {method.title}
                </h4>
                <p className="text-brand-muted font-be-vietnam-pro leading-relaxed text-sm">
                  {method.desc}
                </p>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-r-[12px] border-t-transparent border-r-brand-gold/20 group-hover:border-r-brand-crimson/40 transition-all"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
