"use client";

import { motion, Variants } from "framer-motion";
import { MoveRight } from "lucide-react";

export default function PricingPackages() {
  const roadmaps = [
    {
      name: "Standard Package",
      path: { from: "A1", to: "A2" },
      duration: "2 tháng",
      hours: "36 Giờ",
      sessions: "3 buổi/tuần",
      perSession: "1.5 giờ/buổi",
      focus: "Xây dựng nền tảng giao tiếp cơ bản, tự tin trong các tình huống hội thoại đơn giản hàng ngày.",
      tag: "CƠ BẢN",
    },
    {
      name: "Advance Package",
      path: { from: "A1", to: "B1" },
      duration: "4 tháng",
      hours: "72 Giờ",
      sessions: "3 buổi/tuần",
      perSession: "1.5 giờ/buổi",
      focus: "Từ nền tảng đến giao tiếp độc lập, tự tin xử lý các tình huống công việc cơ bản bằng tiếng Anh.",
      tag: "PHỔ BIẾN",
      isPopular: true,
    },
    {
      name: "Professional Package",
      path: { from: "A1", to: "B2" },
      duration: "8 tháng",
      hours: "144 Giờ",
      sessions: "3 buổi/tuần",
      perSession: "1.5 giờ/buổi",
      focus: "Làm chủ ngôn ngữ, sẵn sàng quản lý đội nhóm và hội nhập quốc tế chuyên sâu.",
      tag: "TOÀN DIỆN",
    },
    {
      name: "Master Package",
      path: { from: "A1", to: "C1" },
      duration: "16 tháng",
      hours: "216 Giờ",
      sessions: "3 buổi/tuần",
      perSession: "1.5 giờ/buổi",
      focus: "Đạt đến sự tinh tế trong ngôn ngữ, tư duy phản biện, thuyết phục và thương thuyết đỉnh cao.",
      tag: "TỐI ƯU",
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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-fit py-20 md:py-32 bg-white flex flex-col justify-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[#f9fafb] -z-10 opacity-50"></div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div variants={itemVariants} className="text-brand-crimson font-bold text-[10px] tracking-[3px] uppercase mb-4">
            Linh hoạt để bứt phá
          </motion.div>
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-bold text-brand-dark leading-tight font-headline"
          >
            Thiết kế <span className="text-brand-crimson italic">lộ trình tương lai</span>.
          </motion.h2>
        </div>

        {/* Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-24">
          {roadmaps.map((pkg, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className={`relative flex flex-col p-8 transition-all duration-500 group overflow-hidden bg-white border ${
                pkg.isPopular 
                ? 'border-brand-crimson border-2 scale-105 shadow-2xl z-20' 
                : 'border-brand-dark/5 shadow-sm hover:shadow-xl'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-0 bg-brand-crimson text-white text-[10px] font-bold px-4 py-1 tracking-widest uppercase">
                  Đề xuất ưu tiên
                </div>
              )}
              
              <div className="mb-10">
                <div className={`text-[10px] font-bold tracking-[2px] uppercase mb-4 text-brand-gold`}>
                  {pkg.tag}
                </div>
                <h3 className="text-xl font-bold font-headline text-brand-dark mb-1">
                  {pkg.name}
                </h3>
                <div className="text-2xl font-bold text-brand-crimson font-headline flex items-center gap-3">
                  {typeof pkg.path === 'string' ? (
                    pkg.path
                  ) : (
                    <>
                      {pkg.path.from}
                      <MoveRight className="w-5 h-5 text-brand-gold" />
                      {pkg.path.to}
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-brand-dark/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-brand-muted/50 tracking-wider">Thời lượng</span>
                  <span className="text-sm font-bold text-brand-dark">{pkg.hours}</span>
                  <span className="text-[10px] text-brand-muted/60">~{pkg.duration}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-brand-muted/50 tracking-wider">Lịch học</span>
                  <span className="text-sm font-bold text-brand-dark">{pkg.sessions}</span>
                  <span className="text-[10px] text-brand-muted/60">{pkg.perSession}</span>
                </div>
              </div>

              <div className="space-y-6 mb-12 flex-grow">
                <p className="text-sm font-medium italic leading-relaxed text-brand-dark">
                  &quot;{pkg.focus}&quot;
                </p>
              </div>

              <button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })} className={`w-full py-5 font-bold tracking-[1.5px] uppercase text-[10px] transition-all flex items-center justify-center gap-3 group/btn cursor-pointer ${
                pkg.isPopular 
                ? 'bg-brand-crimson text-white hover:bg-brand-dark shadow-xl shadow-brand-crimson/20' 
                : 'bg-brand-dark text-white hover:bg-brand-crimson'
              }`}>
                TƯ VẤN CHI TIẾT
                <MoveRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Unsure Section */}
        <motion.div 
          variants={itemVariants}
          className="max-w-5xl mx-auto bg-brand-dark p-12 md:p-16 mb-24 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-crimson/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-white mb-6">
                Chưa biết lộ trình nào <span className="text-brand-gold italic">thuộc về bạn?</span>
              </h3>
              <p className="text-white/60 font-be-vietnam-pro leading-relaxed">
                Dù bạn là cá nhân đang tìm kiếm sự đột phá hay doanh nghiệp cần nâng tầm đội ngũ, chuyên gia của chúng tôi luôn sẵn sàng trực tiếp phân tích để kiến tạo một bản đồ thành công độc bản.
              </p>
            </div>
            <button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })} className="bg-brand-gold text-brand-dark px-10 py-6 font-bold tracking-[2px] uppercase text-xs hover:bg-white transition-all whitespace-nowrap shadow-xl shadow-brand-gold/10 flex items-center gap-3 cursor-pointer">
              KIẾN TẠO LỘ TRÌNH RIÊNG
              <MoveRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>


      </motion.div>
    </section>
  );
}
