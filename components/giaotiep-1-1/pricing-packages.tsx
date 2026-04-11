"use client";

import { motion, Variants } from "framer-motion";

export default function PricingPackages() {
  const roadmaps = [
    {
      name: "Lộ trình Chuyên nghiệp",
      path: "A1 → B1",
      courses: "3 Khóa học",
      hours: "144 Giờ",
      qc: "12 Giờ",
      focus: "Từ mất gốc đến giao tiếp tự tin trong môi trường làm việc cơ bản.",
      tag: "PHỔ BIẾN",
    },
    {
      name: "Lộ trình Bứt phá",
      path: "A1 → B2",
      courses: "4 Khóa học",
      hours: "216 Giờ",
      qc: "16 Giờ",
      focus: "Làm chủ ngôn ngữ, sẵn sàng cho các vị trí quản lý và hội nhập quốc tế.",
      tag: "TOÀN DIỆN",
      isPopular: true,
    },
    {
      name: "Lộ trình Tinh hoa",
      path: "A1 → C1",
      courses: "5 Khóa học",
      hours: "288 Giờ",
      qc: "20 Giờ",
      focus: "Đạt đến sự tinh tế trong ngôn ngữ, tư duy phản biện và thuyết phục đỉnh cao.",
      tag: "TỐI ƯU",
    },
    {
      name: "Giải pháp Doanh nghiệp",
      path: "B2B Custom",
      courses: "Quy mô lớn",
      hours: "Thiết kế riêng",
      qc: "Tiêu chuẩn cao",
      focus: "Đào tạo đội ngũ, quy chuẩn hóa giao tiếp và nâng tầm thương hiệu quốc tế cho tổ chức.",
      tag: "CHIẾN LƯỢC",
    }
  ];

  const levels = [
    { name: "Cấp độ A1/A2", hours: "36 Giờ", qc: "4h", desc: "Nền tảng căn bản" },
    { name: "Cấp độ B1/B2", hours: "72 Giờ", qc: "4h", desc: "Giao tiếp độc lập" },
    { name: "Cấp độ C1", hours: "72 Giờ", qc: "4h", desc: "Thành thạo chuyên sâu" }
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
            className="text-4xl md:text-5xl font-bold text-brand-dark leading-tight font-headline"
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
                <div className="text-2xl font-bold text-brand-crimson font-headline">
                  {pkg.path}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-brand-dark/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-brand-muted/50 tracking-wider">Thời lượng</span>
                  <span className="text-sm font-bold text-brand-dark">{pkg.hours}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-brand-muted/50 tracking-wider">Cấu trúc</span>
                  <span className="text-sm font-bold text-brand-dark">{pkg.courses}</span>
                </div>
              </div>

              <div className="space-y-6 mb-12 flex-grow">
                <p className="text-sm font-medium italic leading-relaxed text-brand-dark">
                  &quot;{pkg.focus}&quot;
                </p>
                <div className="flex items-center gap-3 text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                   <span className="w-1 h-1 bg-brand-gold rounded-full"></span>
                   +{pkg.qc} kiểm soát chất lượng
                </div>
              </div>

              <button className={`w-full py-5 font-bold tracking-[1.5px] uppercase text-[10px] transition-all flex items-center justify-center gap-3 group/btn ${
                pkg.isPopular 
                ? 'bg-brand-crimson text-white hover:bg-brand-dark shadow-xl shadow-brand-crimson/20' 
                : 'bg-brand-dark text-white hover:bg-brand-crimson'
              }`}>
                TƯ VẤN CHI TIẾT
                <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
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
            <div className="max-wxl">
              <h3 className="text-3xl md:text-4xl font-bold font-headline text-white mb-6">
                Chưa biết lộ trình nào <span className="text-brand-gold italic">thuộc về bạn?</span>
              </h3>
              <p className="text-white/60 font-be-vietnam-pro leading-relaxed">
                Dù bạn là cá nhân đang tìm kiếm sự đột phá hay doanh nghiệp cần nâng tầm đội ngũ, chuyên gia của chúng tôi luôn sẵn sàng trực tiếp phân tích để kiến tạo một bản đồ thành công độc bản.
              </p>
            </div>
            <button className="bg-brand-gold text-brand-dark px-10 py-6 font-bold tracking-[2px] uppercase text-xs hover:bg-white transition-all whitespace-nowrap shadow-xl shadow-brand-gold/10">
              KIẾN TẠO LỘ TRÌNH RIÊNG
            </button>
          </div>
        </motion.div>

        {/* Small Level Section */}
        <div className="max-w-5xl mx-auto border-t border-brand-dark/5 pt-20">
           <div className="text-center mb-12">
              <h4 className="font-headline font-bold text-xl text-brand-dark uppercase tracking-widest">
                 Khóa học theo mục tiêu ngắn hạn
              </h4>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-dark/5 border border-brand-dark/5">
              {levels.map((level, i) => (
                <div key={i} className="bg-white p-8 group hover:bg-brand-surface/30 transition-colors">
                   <div className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-2">{level.desc}</div>
                   <h5 className="font-bold text-lg text-brand-dark mb-4">{level.name}</h5>
                   <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-brand-muted">{level.hours} tương tác</span>
                      <span className="text-brand-crimson font-bold">+{level.qc} QC</span>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-12 text-center">
              <p className="text-xs text-brand-muted/60 uppercase tracking-widest font-bold">
                 Tất cả khóa học đều bao gồm tài khoản hệ thống học tập 24/7
              </p>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
