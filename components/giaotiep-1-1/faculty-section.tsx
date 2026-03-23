"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function FacultySection({ isActive }: { isActive?: boolean }) {
  const teachers = [
    {
      name: "Ms. Elena Nguyen",
      role: "Academic Head",
      credentials: "IELTS 8.5 / Master in TESOL",
      bio: "10 năm kinh nghiệm đào tạo Tiếng Anh học thuật và giao tiếp chuyên sâu cho doanh nghiệp.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Mr. David Harrison",
      role: "Senior Instructor",
      credentials: "CELTA / BA in Linguistics",
      bio: "Chuyên gia về phát âm và phong thái giao tiếp trong môi trường công sở quốc tế.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Ms. Sophia Tran",
      role: "Communications Coach",
      credentials: "IELTS 8.0 / MBA",
      bio: "Kinh nghiệm thực chiến trong đàm phán và thuyết trình Tiếng Anh thương mại.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=800&auto=format&fit=crop"
    }
  ];

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
    <section className="relative min-h-fit py-12 md:py-24 bg-white flex flex-col justify-center overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10"
      >
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div variants={itemVariants} className="text-brand-gold font-bold text-[10px] tracking-[3px] uppercase mb-4">Expert Faculty</motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-[#191c1c] leading-tight font-headline uppercase">
              HỘI ĐỒNG <br />
              <span className="text-brand-crimson">CHUYÊN GIA ĐỒNG HÀNH</span>
            </motion.h2>
          </div>
          <motion.div variants={itemVariants} className="hidden lg:block w-32 h-1 bg-brand-gold mb-4"></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-12 max-w-6xl mx-auto">
          {teachers.map((teacher, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="group"
            >
              <div className="relative aspect-[4/5] mb-8 overflow-hidden bg-slate-100 shadow-xl max-w-[320px] mx-auto lg:mx-0">
                {/* Image Placeholder */}
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                {/* Architectural Borders */}
                <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/20 z-10 group-hover:border-white/40 transition-colors"></div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-r-2 border-b-2 border-brand-gold z-20"></div>
              </div>

              <div className="space-y-3 max-w-[320px] mx-auto lg:mx-0">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-brand-gold">[{teacher.credentials}]</span>
                </div>
                <h3 className="text-xl font-bold font-headline text-[#191c1c] uppercase tracking-wide">
                  {teacher.name}
                </h3>
                <div className="text-brand-crimson font-bold text-[10px] tracking-[2px] uppercase">
                  {teacher.role}
                </div>
                <p className="text-sm text-[#5b403f] font-body leading-relaxed opacity-80 border-t border-slate-100 pt-4">
                  {teacher.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
