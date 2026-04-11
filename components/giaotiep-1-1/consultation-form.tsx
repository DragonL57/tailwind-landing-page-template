"use client";

import { motion, Variants } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ConsultationForm() {
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
    <section className="relative min-h-fit py-20 md:py-32 bg-white flex flex-col justify-center overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[#f9fafb] opacity-50 -z-10"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-2xl border border-brand-dark/5 bg-white overflow-hidden">
          
          {/* Left: Narrative Content with World Map Animation (NOW WHITE) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 bg-white p-12 md:p-16 flex flex-col justify-between relative overflow-hidden border-r border-brand-dark/5">
            {/* World Map Lottie - Subtle Background on White, lowered slightly */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none scale-150 grayscale transform translate-y-12">
              <DotLottieReact
                src="https://lottie.host/5628ae4f-69f6-4f31-ac82-c168e5ee5b35/fcarVkPVTi.lottie"
                loop
                autoplay
              />
            </div>
            
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-crimson/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-brand-crimson font-bold text-[10px] tracking-[3px] uppercase mb-6">
                Đừng chờ đợi nữa
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-headline leading-[1.1] text-brand-dark mb-8">
                Đặt lịch <br />
                <span className="text-brand-gold italic">tư vấn 1–1</span>.
              </h2>
              <p className="text-base text-brand-muted font-be-vietnam-pro leading-relaxed border-l-2 border-brand-crimson pl-6 max-w-xs">
                Sẵn sàng để trở thành công dân toàn cầu. Đăng ký để nhận bản phân tích năng lực chuyên sâu ngay hôm nay.
              </p>
            </div>

            <div className="relative z-10 mt-12 pt-12 border-t border-brand-dark/5 hidden lg:block">
               <div className="flex items-center gap-4 text-brand-dark/40 text-[10px] font-bold tracking-widest uppercase">
                  <span className="w-2 h-2 bg-brand-crimson rounded-full animate-pulse"></span>
                  Phản hồi trong 2 giờ làm việc
               </div>
            </div>
          </motion.div>

          {/* Right: The Modern Form */}
          <motion.div variants={itemVariants} className="lg:col-span-8 p-8 md:p-16 lg:p-20 bg-white">
            <form className="space-y-12">
              
              {/* Section: Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-brand-dark/10 py-4 text-brand-dark outline-none focus:border-brand-crimson transition-all rounded-none font-be-vietnam-pro" 
                  />
                  <label htmlFor="name" className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[2px] text-brand-gold transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-brand-muted peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-brand-crimson">Họ tên của bạn (*)</label>
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-brand-dark/10 py-4 text-brand-dark outline-none focus:border-brand-crimson transition-all rounded-none font-be-vietnam-pro" 
                  />
                  <label htmlFor="email" className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[2px] text-brand-gold transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-brand-muted peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-brand-crimson">Email liên hệ (*)</label>
                </div>

                <div className="relative group md:col-span-2">
                  <input 
                    type="tel" 
                    id="phone" 
                    required 
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-brand-dark/10 py-4 text-brand-dark outline-none focus:border-brand-crimson transition-all rounded-none font-be-vietnam-pro" 
                  />
                  <label htmlFor="phone" className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[2px] text-brand-gold transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-brand-muted peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-brand-crimson">Số điện thoại (*)</label>
                </div>
              </div>

              {/* Section: Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-4">
                <div className="space-y-6">
                  <label className="text-[10px] font-bold uppercase tracking-[2px] text-brand-gold block">Lộ trình quan tâm (*)</label>
                  <select 
                    required 
                    className="w-full bg-[#f9fafb] border-l-2 border-brand-crimson p-5 outline-none font-be-vietnam-pro text-sm rounded-none appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <option value="">Chọn lộ trình...</option>
                    <option value="basic">Lộ trình Chuyên nghiệp (A1-B1)</option>
                    <option value="pro">Lộ trình Bứt phá (A1-B2)</option>
                    <option value="premium">Lộ trình Tinh hoa (A1-C1)</option>
                    <option value="business">Giải pháp Doanh nghiệp (B2B)</option>
                  </select>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-bold uppercase tracking-[2px] text-brand-gold block">Thời gian thuận tiện (*)</label>
                  <select 
                    required 
                    className="w-full bg-[#f9fafb] border-l-2 border-brand-crimson p-5 outline-none font-be-vietnam-pro text-sm rounded-none appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <option value="">Chọn khung giờ...</option>
                    <option value="morning">Buổi sáng (09h - 11h)</option>
                    <option value="afternoon">Buổi chiều (14h - 17h)</option>
                    <option value="evening">Buổi tối (18h30 - 21h)</option>
                  </select>
                </div>
              </div>

              <div className="pt-8">
                <button type="submit" className="w-full bg-brand-crimson text-white py-6 font-bold tracking-[2px] uppercase text-sm hover:bg-brand-dark shadow-xl shadow-brand-crimson/20 transition-all duration-500 flex items-center justify-center gap-4 group/btn">
                  XÁC NHẬN ĐĂNG KÝ
                  <svg className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <p className="text-[10px] text-brand-muted/50 text-center mt-6 uppercase tracking-widest font-bold">
                  Bằng cách nhấn đăng ký, bạn đồng ý với chính sách bảo mật của chúng tôi.
                </p>
              </div>

            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
