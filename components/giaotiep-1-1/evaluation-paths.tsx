"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-fit md:h-full w-full py-20 md:py-32 bg-white flex flex-col justify-center">
      {/* Background Accent & Silhouette */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#f9fafb] -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] pointer-events-none z-0">
        <Image src="/images/Picture1.png" alt="Silhouette" fill className="object-contain" />
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-6">
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-5xl font-bold text-brand-dark leading-[1.1] font-headline tracking-tight"
            >
              Xác định năng lực,<br />
              <span className="text-brand-crimson italic">kiến tạo lộ trình</span> riêng.
            </motion.h2>
          </div>
          <div className="lg:col-span-6">
            <motion.p variants={itemVariants} className="text-lg text-brand-muted font-be-vietnam-pro max-w-lg lg:ml-auto">
              Chúng tôi cung cấp hai phương thức đánh giá chuyên sâu để đảm bảo lộ trình học tập khớp hoàn toàn với năng lực thực tế của bạn.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Case 1 */}
          <motion.div 
            variants={itemVariants}
            className="group relative bg-white border border-brand-dark/5 p-12 hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-crimson/5 rounded-full blur-3xl group-hover:bg-brand-crimson/10 transition-colors"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold font-headline mb-6 text-brand-dark">Đánh giá tức thì với AI</h3>
              <ul className="text-brand-muted space-y-5 mb-12 font-be-vietnam-pro">
                {[
                  "Phân tích giọng nói và phản xạ ngôn ngữ",
                  "Chấm điểm chi tiết theo khung tham chiếu quốc tế",
                  "Nhận lộ trình cá nhân hóa ngay sau khi hoàn thành"
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-brand-crimson font-bold mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/assessment-flow/giaotiep-1-1/danh-gia-lo-trinh"
                className="inline-flex items-center justify-center w-full bg-brand-crimson text-white py-5 font-bold tracking-[1px] text-sm hover:bg-brand-dark transition-all group/btn"
              >
                BẮT ĐẦU NGAY
                <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Case 2 */}
          <motion.div 
            variants={itemVariants}
            className="group relative bg-white border border-brand-gold/20 p-12 hover:shadow-2xl transition-all duration-500 overflow-hidden md:translate-y-8"
          >
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl group-hover:bg-brand-gold/10 transition-colors"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold font-headline mb-6 text-brand-dark">Phỏng vấn trực tiếp 1–1</h3>
              <ul className="text-brand-muted space-y-5 mb-12 font-be-vietnam-pro">
                {[
                  "Tương tác trực tiếp với chuyên gia học thuật",
                  "Đánh giá chuyên sâu về ngữ cảnh giao tiếp",
                  "Tư vấn trực tiếp lộ trình và cam kết học tập"
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-brand-gold font-bold mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
              <button className="inline-flex items-center justify-center w-full bg-brand-dark text-white py-5 font-bold tracking-[1px] text-sm hover:bg-brand-crimson transition-all group/btn">
                ĐẶT LỊCH VỚI GIÁO VIÊN
                <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
