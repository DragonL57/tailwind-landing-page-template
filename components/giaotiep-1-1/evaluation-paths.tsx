"use client";

import { motion, Variants } from "framer-motion";

export default function EvaluationPaths() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="relative min-h-fit md:h-full w-full py-12 md:py-24 bg-white flex flex-col justify-center overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 w-full"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-[#191c1c] leading-tight font-headline uppercase">
              XÁC ĐỊNH NĂNG LỰC <br />
              <span className="text-brand-crimson">KIẾN TẠO LỘ TRÌNH</span>
            </motion.h2>
          </div>
          <motion.p variants={itemVariants} className="text-[#5b403f] font-body max-w-sm text-right border-r-4 border-brand-crimson pr-6 italic">
            Lựa chọn phương thức đánh giá phù hợp để thiết lập nền móng vững chắc nhất cho hành trình học thuật của bạn.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Case 1: AI Test */}
          <motion.div 
            variants={itemVariants}
            className="bg-white border-2 border-[#e3bebc] p-10 hover:border-brand-crimson transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-crimson/5 rotate-45 translate-x-12 -translate-y-12 transition-transform group-hover:scale-150"></div>
            <div className="text-brand-crimson font-bold text-xs uppercase tracking-[2px] mb-4">Trường hợp 01 / Tự động</div>
            <h3 className="text-3xl font-bold font-headline mb-6 uppercase">TEST VỚI AI</h3>
            <ul className="text-base text-[#5b403f] space-y-4 mb-10 font-body">
              {[
                "Điền Form khảo sát nhu cầu mục tiêu",
                "Thực hiện bài kiểm tra trực tuyến tức thì",
                "Nhận kết quả và lộ trình mẫu ngay lập tức"
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-brand-crimson font-bold">0{i+1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-brand-crimson text-white py-5 font-bold tracking-[1.5px] uppercase text-sm hover:opacity-90 transition-all rounded-none">
              BẮT ĐẦU VỚI AI
            </button>
          </motion.div>

          {/* Case 2: Teacher Test */}
          <motion.div 
            variants={itemVariants}
            className="bg-[#f3f4f4] border-2 border-brand-gold/20 p-10 hover:border-brand-gold transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rotate-45 translate-x-12 -translate-y-12 transition-transform group-hover:scale-150"></div>
            <div className="text-brand-gold font-bold text-xs uppercase tracking-[2px] mb-4">Trường hợp 02 / Chuyên sâu</div>
            <h3 className="text-3xl font-bold font-headline mb-6 uppercase">VỚI GIÁO VIÊN</h3>
            <ul className="text-base text-[#5b403f] space-y-4 mb-10 font-body">
              {[
                "Điền Form đăng ký lịch hẹn",
                "Phỏng vấn 1-1 trực tiếp với Giáo viên",
                "Trả kết quả qua Mail kèm Rubric chi tiết"
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-brand-gold font-bold">0{i+1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <button className="w-full border-2 border-brand-gold text-brand-gold py-5 font-bold tracking-[1.5px] uppercase text-sm hover:bg-brand-gold hover:text-white transition-all rounded-none">
              ĐẶT LỊCH VỚI GIÁO VIÊN
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
