"use client";

import { motion, Variants } from "framer-motion";

export default function ConsultationForm({ isActive }: { isActive?: boolean }) {
  const academicGridStyle = {
    backgroundImage: "radial-gradient(#e1e3e3 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  };

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
    <section className="relative min-h-fit md:h-full w-full py-12 md:py-32 bg-[#f8f9f9] flex flex-col justify-center overflow-hidden">
      {/* Background Dot Texture - The Academic Grid */}
      <div className="absolute inset-0 opacity-60" style={academicGridStyle}></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t-4 border-brand-gold">
          
          {/* Left: Narrative Content (Layer 2 - Shifts) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 bg-[#f3f4f4] p-10 md:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline leading-[1.1] text-[#191c1c] uppercase mb-8">
                ĐÁNH GIÁ <br />
                <span className="text-brand-crimson">NĂNG LỰC</span>
              </h2>
              <p className="text-base md:text-lg text-[#5b403f] font-body leading-relaxed border-l-4 border-brand-crimson pl-6 mb-12 italic">
                Hệ thống FlexTrack yêu cầu đánh giá đầu vào nghiêm túc để thiết lập cấu trúc lộ trình chính xác nhất cho từng học viên.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { id: "01", text: "Nhánh học phù hợp" },
                { id: "02", text: "Gói học tối ưu" },
                { id: "03", text: "Lộ trình cá nhân hóa" }
              ].map((outcome, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[2px] text-brand-gold">Outcome {outcome.id}</span>
                  <span className="text-sm font-bold uppercase font-headline text-[#191c1c]">{outcome.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Input Form (Layer 1 - Cards) - Minimalist Rigor */}
          <motion.div variants={itemVariants} className="lg:col-span-7 bg-white p-10 md:p-16 lg:p-20">
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                
                {/* Field: Name */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="academic-name"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-slate-200 py-3 text-[#191c1c] outline-none focus:border-brand-gold transition-all duration-300 rounded-none placeholder-transparent font-body"
                  />
                  <label 
                    htmlFor="academic-name"
                    className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-600 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-brand-gold"
                  >
                    Họ và tên
                  </label>
                </div>

                {/* Field: Phone */}
                <div className="relative group">
                  <input type="tel" id="academic-phone" placeholder=" " className="peer w-full bg-transparent border-b-2 border-slate-200 py-3 text-[#191c1c] outline-none focus:border-brand-gold transition-all duration-300 rounded-none placeholder-transparent font-body" />
                  <label htmlFor="academic-phone" className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-600 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-brand-gold">
                    Số điện thoại
                  </label>
                </div>

                {/* Field: Email */}
                <div className="relative group md:col-span-2">
                  <input type="email" id="academic-email" placeholder=" " className="peer w-full bg-transparent border-b-2 border-slate-200 py-3 text-[#191c1c] outline-none focus:border-brand-gold transition-all duration-300 rounded-none placeholder-transparent font-body" />
                  <label htmlFor="academic-email" className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-600 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-brand-gold">
                    Email liên hệ
                  </label>
                </div>

                {/* Field: Objective */}
                <div className="relative group md:col-span-2">
                  <input type="text" id="academic-objective" placeholder=" " className="peer w-full bg-transparent border-b-2 border-slate-200 py-3 text-[#191c1c] outline-none focus:border-brand-gold transition-all duration-300 rounded-none placeholder-transparent font-body" />
                  <label htmlFor="academic-objective" className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-600 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-brand-gold">
                    Mục tiêu học tập
                  </label>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-[10px] text-[#5b403f] font-body tracking-[1px] uppercase max-w-xs opacity-60">
                  Đội ngũ chuyên viên sẽ liên hệ trong vòng 24 giờ làm việc để xác nhận lịch đánh giá.
                </p>
                <button 
                  type="submit"
                  className="bg-brand-crimson text-white px-12 py-5 font-bold tracking-[1.5px] uppercase text-xs hover:bg-[#93001a] transition-all rounded-none w-full md:w-auto"
                >
                  Nhận tư vấn miễn phí
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
