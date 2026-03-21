"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function Footer({ isActive }: { isActive?: boolean }) {
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-brand-crimson text-white h-full w-full flex flex-col justify-center border-t-8 border-brand-gold px-6 md:px-12 relative overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-6 md:px-12 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16">
          
          {/* Column 1: Identity */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="relative h-8 w-56 md:h-10 md:w-72 mb-8">
                <Image
                  src="/flextrack/flextrack_logo_dark.png"
                  alt="VMG FlexTrack Logo"
                  fill
                  className="object-contain object-left" 
                />
              </div>
              <p className="text-white font-body text-sm md:text-base leading-relaxed max-w-md">
                Kiến tạo tương lai thông qua hệ thống giáo dục 1–1 trực tuyến, tích hợp công nghệ và lộ trình học thuật linh hoạt.
              </p>
            </div>
            
            <div className="mt-8 lg:mt-12">
              <div className="text-lg md:text-xl font-bold font-headline uppercase">VMG EDUCATION © 2024</div>
            </div>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[2px] text-brand-gold mb-6">Pathways</h4>
            <ul className="space-y-3">
              {["FlexTrack Basic", "FlexTrack Pro", "FlexTrack Premium", "Evaluation"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white hover:underline transition-colors font-body text-sm group flex items-center gap-2">
                    <span className="w-0 h-px bg-white group-hover:w-3 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Institutional Disclosure */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[2px] text-brand-gold mb-6">Information</h4>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
                  <Link key={item} href="#" className="text-[10px] font-bold uppercase tracking-[1px] text-white hover:underline transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
              
              <div className="flex gap-3 border-t border-white/10 pt-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-crimson transition-all cursor-pointer">
                    <span className="text-[8px] font-bold">SC</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div variants={itemVariants} className="pt-6 border-t border-white/10 text-center md:text-left">
          <p className="text-[9px] uppercase tracking-[2px] text-white/30">
            © 2024 VMG Education Group. All Rights Reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
