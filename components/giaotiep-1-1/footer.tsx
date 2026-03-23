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
    <footer className="bg-brand-crimson text-white min-h-fit w-full flex flex-col justify-center border-t-8 border-brand-gold py-20 md:py-32 relative overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1440px] mx-auto px-8 md:px-16 w-full"
      >
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-16 mb-16">
          
          {/* Column 1: Identity */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div>
              <div className="relative h-10 w-64 md:h-12 md:w-80 mb-8 mx-auto lg:mx-0">
                <Image
                  src="/flextrack/flextrack_logo_dark.png"
                  alt="VMG FlexTrack Logo"
                  fill
                  className="object-contain object-center lg:object-left" 
                />
              </div>
              <p className="text-white font-body text-sm md:text-base leading-relaxed max-w-md opacity-90">
                Kiến tạo tương lai thông qua hệ thống giáo dục 1–1 trực tuyến, tích hợp công nghệ và lộ trình học thuật linh hoạt.
              </p>
            </div>
            
            <div className="mt-10 lg:mt-12">
              <div className="text-xl md:text-2xl font-bold font-headline uppercase tracking-wider">VMG EDUCATION © 2026</div>
            </div>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-[10px] font-bold uppercase tracking-[2px] text-brand-gold mb-8">Lộ trình học</h4>
            <ul className="space-y-4">
              {["FlexTrack Basic", "FlexTrack Pro", "FlexTrack Premium", "Đánh giá năng lực"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white hover:text-brand-gold transition-colors font-body text-xs group flex items-center gap-2">
                    <span className="hidden lg:block w-0 h-px bg-white group-hover:w-3 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Institutional Disclosure */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-4 flex flex-col items-start text-left">
            <h4 className="text-[10px] font-bold uppercase tracking-[2px] text-brand-gold mb-8">Thông tin</h4>
            <div className="space-y-8 w-full">
              <div className="grid grid-cols-1 gap-y-4">
                {[
                  { label: "Chính sách bảo mật", href: "#" },
                  { label: "Điều khoản dịch vụ", href: "#" },
                  { label: "Liên hệ", href: "/contact" }
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="text-[10px] font-bold uppercase tracking-[1.5px] text-white hover:text-brand-gold transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <div className="flex gap-4 border-t border-white/10 pt-8 w-full justify-start">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-9 h-9 border-2 border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all cursor-pointer">
                    <span className="text-[10px] font-bold">MXH</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div variants={itemVariants} className="pt-10 border-t border-white/10 text-center lg:text-left">
          <p className="text-[9px] md:text-[10px] uppercase tracking-[2.5px] text-white/40 leading-relaxed">
            © 2026 Tập đoàn Giáo dục VMG. Bảo lưu mọi quyền.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
