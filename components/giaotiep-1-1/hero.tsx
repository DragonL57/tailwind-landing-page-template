"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

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
    <section 
      ref={targetRef}
      className="relative h-full w-full flex flex-col justify-center bg-white"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full -z-10 overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 bg-[#f9fafb] opacity-80"
        >
          <div className="absolute inset-0 bg-pattern-grid opacity-10"></div>
        </motion.div>
        
        {/* Silhouette Logo - Full Opacity */}
        <motion.div 
          style={{ rotate, y: useTransform(scrollYProgress, [0, 1], [-50, 150]) }}
          className="absolute top-1/4 -right-32 w-[700px] h-[700px] pointer-events-none z-0"
        >
          <Image src="/images/Picture1.png" alt="Silhouette" fill className="object-contain" priority />
        </motion.div>

        {/* Large Geometric Shape */}
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[120%] bg-white/60 rotate-12 blur-3xl"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-12 lg:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: The Narrative */}
          <div className="lg:col-span-7 z-10">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-dark leading-[0.95] tracking-[-0.04em] mb-8 font-headline"
            >
              Tiếng Anh 1–1 <br />
              <span className="text-brand-crimson italic">Tương tác thực</span>.<br />
              Phản hồi thực.
            </motion.h1>
            
            <motion.div variants={itemVariants} className="max-w-xl mb-10">
              <p className="text-lg md:text-xl text-brand-muted font-be-vietnam-pro leading-relaxed mb-6">
                Hệ chương trình đào tạo trực tuyến cá nhân hóa chuyên biệt, giúp bạn biến kiến thức thành năng lực sử dụng thực tế ngay sau mỗi buổi học.
              </p>
              
              <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-brand-dark/5">
                {[
                  { label: "Tương tác", value: "1-on-1" },
                  { label: "Chuẩn đầu ra", value: "CEFR" },
                  { label: "Chuyên sâu", value: "Ngành nghề" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-2xl font-bold text-brand-dark font-headline">{stat.value}</span>
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/giaotiep-1-1/danh-gia-lo-trinh" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-brand-crimson text-white px-10 py-5 font-bold tracking-[1px] text-sm transition-all hover:bg-brand-dark shadow-xl shadow-brand-crimson/20 flex items-center justify-center gap-3 group"
                >
                  XÁC ĐỊNH LỘ TRÌNH NGAY
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </Link>
              
              <button className="flex items-center gap-3 text-brand-dark font-bold text-sm group">
                <div className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
                TÌM HIỂU PHƯƠNG PHÁP
              </button>
            </motion.div>
          </div>

          {/* Right Column: Visual Composition (Reverted to Image) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 aspect-[4/5] w-full max-w-[480px] ml-auto overflow-hidden group shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Student learning"
                fill
                className="object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              
              {/* Glass Overlay Card */}
              <div className="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-md bg-white/80 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                        <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User avatar" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-bold text-brand-dark uppercase tracking-wider">
                    Đã cá nhân hóa 500+ lộ trình
                  </div>
                </div>
                <p className="text-xs text-brand-muted font-medium italic leading-relaxed">
                  &quot;Chương trình giúp tôi đi từ &apos;biết&apos; tiếng Anh đến thực sự &apos;dùng&apos; được tiếng Anh trong công việc.&quot;
                </p>
              </div>

              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-white/30 pointer-events-none"></div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-brand-gold/10 -z-10 rotate-12"></div>
            <div className="absolute -bottom-12 -right-4 w-48 h-48 border-2 border-brand-crimson/10 -z-10 rounded-full"></div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
