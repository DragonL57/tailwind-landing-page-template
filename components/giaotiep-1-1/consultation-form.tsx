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
    <section className="relative min-h-fit py-12 md:py-32 bg-[#f8f9f9] flex flex-col justify-center overflow-hidden">
      {/* Background Dot Texture - The Academic Grid */}
      <div className="absolute inset-0 opacity-60" style={academicGridStyle}></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t-4 border-brand-gold bg-white shadow-2xl">
          
          {/* Left: Narrative Content (Layer 2 - Shifts) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 bg-[#f3f4f4] p-10 md:p-12 flex flex-col justify-between border-r border-slate-200">
            <div>
              <div className="text-brand-gold font-bold text-[10px] tracking-[3px] uppercase mb-4">Registration</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline leading-[1.1] text-[#191c1c] uppercase mb-8">
                ĐẶT LỊCH <br />
                <span className="text-brand-crimson">TƯ VẤN 1-1</span>
              </h2>
              <p className="text-sm md:text-base text-[#5b403f] font-body leading-relaxed border-l-4 border-brand-crimson pl-6 mb-12 italic">
                Chúng tôi sẽ ngưng nhận đăng ký khi đủ số lượng để đảm bảo chất lượng chuyên môn tốt nhất cho từng học viên.
              </p>
            </div>

            <div className="space-y-8 hidden lg:block">
              {[
                { id: "01", text: "Xác định mục tiêu học thuật" },
                { id: "02", text: "Thiết kế lộ trình cá nhân" },
                { id: "03", text: "Cam kết đầu ra chuẩn quốc tế" }
              ].map((outcome, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-[2px] text-brand-gold opacity-60">Bước {outcome.id}</span>
                  <span className="text-xs font-bold uppercase font-headline text-[#191c1c]">{outcome.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: The Modern Form */}
          <motion.div variants={itemVariants} className="lg:col-span-8 p-8 md:p-12 lg:p-16">
            <form className="space-y-10">
              
              {/* Section: Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-slate-300 py-3 pl-2 text-[#191c1c] outline-none focus:border-brand-crimson focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none transition-all rounded-none font-body" 
                  />
                  <label htmlFor="name" className="absolute left-2 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-500 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-brand-crimson">Họ tên của bạn là (*)</label>
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-slate-300 py-3 pl-2 text-[#191c1c] outline-none focus:border-brand-crimson focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none transition-all rounded-none font-body" 
                  />
                  <label htmlFor="email" className="absolute left-2 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-500 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-brand-crimson">Email liên hệ (*)</label>
                </div>

                <div className="relative group md:col-span-2">
                  <input 
                    type="tel" 
                    id="phone" 
                    required 
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-slate-300 py-3 pl-2 text-[#191c1c] outline-none focus:border-brand-crimson focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none transition-all rounded-none font-body" 
                  />
                  <label htmlFor="phone" className="absolute left-2 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-500 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-brand-crimson">Số điện thoại (*)</label>
                </div>
              </div>

              {/* Section: Course & Readiness */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold block mb-4">Lộ trình bạn quan tâm là (*)</label>
                  <select 
                    required 
                    className="w-full bg-[#f3f4f4] border-l-4 border-brand-crimson p-4 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none font-body text-sm rounded-none appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <option value="">Chọn gói học...</option>
                    <option value="basic">FlexTrack Basic (60 Giờ)</option>
                    <option value="pro">FlexTrack Pro (120 Giờ)</option>
                    <option value="premium">FlexTrack Premium (180 Giờ)</option>
                    <option value="specific">Tiếng Anh Giao Tiếp Chuyên Ngành</option>
                    <option value="other">Cần tư vấn lộ trình riêng</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold block mb-4">Bạn đã sẵn sàng đầu tư? (*)</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Rất sẵn sàng", "Sẵn sàng", "Đang tìm hiểu"].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="readiness" 
                          value={option} 
                          className="w-4 h-4 accent-brand-crimson focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none" 
                        />
                        <span className="text-xs font-body text-[#5b403f] group-hover:text-brand-crimson transition-colors">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section: Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold block mb-4">Ngày trao đổi thuận tiện nhất (*)</label>
                  <select 
                    required 
                    className="w-full bg-[#f3f4f4] border-l-4 border-brand-gold p-4 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none font-body text-sm rounded-none appearance-none cursor-pointer"
                  >
                    <option value="">Chọn ngày...</option>
                    <option value="mon">Thứ 2</option>
                    <option value="tue">Thứ 3</option>
                    <option value="wed">Thứ 4</option>
                    <option value="thu">Thứ 5</option>
                    <option value="fri">Thứ 6</option>
                    <option value="sat">Thứ 7</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold block mb-4">Khung giờ phù hợp (*)</label>
                  <select 
                    required 
                    className="w-full bg-[#f3f4f4] border-l-4 border-brand-gold p-4 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none font-body text-sm rounded-none appearance-none cursor-pointer"
                  >
                    <option value="">Chọn khung giờ...</option>
                    <option value="morning">09h00 - 11h00</option>
                    <option value="afternoon">14h00 - 17h00</option>
                    <option value="evening">18h30 - 21h00</option>
                  </select>
                </div>
              </div>

              {/* Section: Commitment & Additional */}
              <div className="space-y-8 pt-4">
                <div className="relative group">
                  <textarea 
                    id="more" 
                    rows={1} 
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-slate-300 py-3 pl-2 text-[#191c1c] outline-none focus:border-brand-crimson focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none transition-all rounded-none font-body resize-none" 
                  />
                  <label htmlFor="more" className="absolute left-2 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-brand-gold transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-500 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-brand-crimson">Cần tư vấn thêm điều gì?</label>
                </div>

                <div className="bg-slate-50 p-6 border-l-4 border-brand-crimson flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#191c1c]">Bạn cam kết xuất hiện đúng giờ? (*)</p>
                    <div className="flex gap-6">
                      {["Tôi chắc chắn", "Tôi cam kết"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="commitment" 
                            required 
                            className="w-3 h-3 accent-brand-crimson focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none" 
                          />
                          <span className="text-[10px] font-bold uppercase text-slate-600">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="bg-brand-crimson text-white px-10 py-4 font-bold tracking-[2px] uppercase text-xs hover:bg-[#93001a] transition-all rounded-none w-full md:w-auto shadow-xl">
                    XÁC NHẬN ĐẶT LỊCH
                  </button>
                </div>
              </div>

            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
