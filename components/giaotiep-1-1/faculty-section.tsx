"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function FacultySection() {
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
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-fit py-20 md:py-32 bg-white flex flex-col justify-center">
      {/* Silhouette Background Decor - Full Visibility */}
      <div className="absolute top-1/2 right-[-10%] w-[600px] h-[600px] -translate-y-1/2 pointer-events-none -z-10">
        <Image src="/images/Picture1.png" alt="Silhouette" fill className="object-contain" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div variants={itemVariants} className="text-brand-crimson font-bold text-[10px] tracking-[3px] uppercase mb-4">
              Đội ngũ chuyên gia
            </motion.div>
            <motion.h2 
              variants={itemVariants} 
              className="text-3xl md:text-4xl font-bold text-brand-dark leading-tight font-headline"
            >
              Hội đồng <span className="text-brand-crimson italic">chuyên gia</span> đồng hành cùng bạn.
            </motion.h2>
          </div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-end gap-4">
             {/* 5 Stars Quality Indicator - Fixed alignment */}
             <div className="w-32 h-12 flex justify-end overflow-visible">
                <DotLottieReact
                   src="https://lottie.host/11ee05b6-0c31-4a7e-90da-51ff8fcae2a4/LsydjVWILD.lottie"
                   loop
                   autoplay
                 />
             </div>
             <button className="text-brand-dark font-bold text-sm border-b-2 border-brand-gold pb-1 hover:text-brand-crimson hover:border-brand-crimson transition-all">
                XEM TẤT CẢ GIẢNG VIÊN
             </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {teachers.map((teacher, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className={`group relative ${i === 1 ? 'lg:translate-y-12' : ''}`}
            >
              <div className="relative aspect-[4/5] mb-8 overflow-hidden bg-brand-surface group-hover:shadow-2xl transition-all duration-700">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Floating Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-dark/80 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <div className="text-brand-gold font-bold text-[10px] tracking-widest uppercase mb-1">
                      {teacher.credentials}
                   </div>
                </div>

                {/* Decorative Frame */}
                <div className="absolute inset-4 border border-white/20 group-hover:border-white/40 transition-colors pointer-events-none"></div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-headline text-brand-dark mb-1">
                    {teacher.name}
                  </h3>
                  <div className="text-brand-crimson font-bold text-[10px] tracking-[2px] uppercase">
                    {teacher.role}
                  </div>
                </div>
                
                <p className="text-sm text-brand-muted font-be-vietnam-pro leading-relaxed border-t border-brand-dark/5 pt-4">
                  {teacher.bio}
                </p>
              </div>
              
              {/* Staggered Index Number */}
              <div className="absolute -top-4 -left-4 text-6xl font-headline font-bold text-brand-dark/[0.03] select-none pointer-events-none group-hover:text-brand-crimson/[0.05] transition-colors">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
