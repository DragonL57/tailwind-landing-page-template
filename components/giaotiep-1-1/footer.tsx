"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Facebook, Youtube, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/about" },
  { name: "Liên hệ", href: "/contact" },
  { name: "Chương trình học", href: "/programs" },
  { name: "Hệ thống trung tâm", href: "/centers" },
  { name: "Học phí", href: "/pricing" },
];

const centers = [
  { name: "CN Đồng Nai 1", address: "E99 Võ Thị Sáu, Phường Trấn Biên, Đồng Nai" },
  { name: "CN Đồng Nai 2", address: "1209 Phạm Văn Thuận, Phường Trấn Biên, Đồng Nai" },
  { name: "CN Đồng Nai 3", address: "388 Nguyễn Khuyến, Phường Trảng Dài, Đồng Nai" },
  { name: "CN Đồng Nai 4", address: "438C Đinh Quang Ân, Phường Phước Tân, Đồng Nai" },
  { name: "CN Đồng Nai 5", address: "1 Nguyễn Trãi, Phường Long Khánh, Đồng Nai" },
  { name: "CN Đồng Nai 6", address: "505 Lê Duẩn, Phường Long Thành, Đồng Nai" },
  { name: "CN Đồng Nai 7", address: "Số 668 đường Trần Phú, Xã Nhơn Trạch, Đồng Nai" },
  { name: "CN Đồng Nai 8", address: "Số 132 đường Hùng Vương, Xã Xuân Lộc, Đồng Nai" },
  { name: "CN Đồng Nai 9", address: "Số 15-17, đường 30/4, Xã Trảng Bom, Đồng Nai" },
  { name: "CN Đồng Nai 10", address: "Lô 6-7, KP Tân Đồng I, Đường Phú Riềng Đỏ, Phường Bình Phước" },
];

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "Youtube" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "Linkedin" },
];

export default function Footer() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <footer className="relative overflow-hidden bg-white text-brand-dark border-t border-brand-dark/5">
      {/* Minimalist Grid Background */}
      <div className="absolute inset-0 bg-pattern-grid opacity-[0.03] -z-10"></div>

      <div className="max-w-[1440px] mx-auto px-6 py-20 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 mb-24"
        >
          {/* Brand Identity Section */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-start gap-12">
            <div className="relative h-12 w-48 lg:h-14 lg:w-56">
              <Image
                src="/flextrack/flextrack_logo_white.png"
                alt="VMG FlexTrack Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            
            <div className="max-w-md border-l-2 border-brand-crimson pl-8 py-2">
              <p className="font-be-vietnam-pro text-xl leading-relaxed text-brand-muted italic">
                &quot;Kiến tạo thế hệ công dân toàn cầu thông qua sự chính xác trong ngôn ngữ và tư duy học thuật đỉnh cao.&quot;
              </p>
            </div>

            <div className="flex gap-6">
              {socials.map(({ icon: Icon, label }, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -4, color: '#BE202F' }}
                  aria-label={label}
                  className="w-10 h-10 border border-brand-dark/10 flex items-center justify-center transition-all cursor-pointer rounded-full hover:border-brand-crimson/30"
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links & Info Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-headline font-bold text-xs uppercase tracking-[3px] text-brand-gold mb-10">
                Danh mục
              </h4>
              <ul className="grid grid-cols-1 gap-5">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="font-be-vietnam-pro font-bold text-sm text-brand-dark/60 hover:text-brand-crimson transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Main Offices */}
            <motion.div variants={itemVariants}>
              <h4 className="font-headline font-bold text-xs uppercase tracking-[3px] text-brand-gold mb-10">
                Trụ sở điều hành
              </h4>
              <div className="space-y-10">
                <div className="group">
                  <p className="font-headline font-bold text-[10px] uppercase tracking-[2px] text-brand-crimson mb-3 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> TP. Hồ Chí Minh
                  </p>
                  <p className="font-be-vietnam-pro text-sm text-brand-muted leading-relaxed">
                    Phòng L17-11, Tầng 17, Tòa nhà Vincom Center,<br />
                    72 Lê Thánh Tôn, P. Bến Nghé, Quận 1
                  </p>
                </div>
                <div className="group">
                  <p className="font-headline font-bold text-[10px] uppercase tracking-[2px] text-brand-crimson mb-3 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Tỉnh Đồng Nai
                  </p>
                  <p className="font-be-vietnam-pro text-sm text-brand-muted leading-relaxed">
                    E99 Võ Thị Sáu, Khu phố 7,<br />
                    Phường Thống Nhất, TP. Biên Hòa
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Center System Showcase */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24 pt-20 border-t border-brand-dark/5"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h4 className="font-headline font-bold text-xs uppercase tracking-[3px] text-brand-gold mb-3">
                Hệ thống đào tạo
              </h4>
              <h3 className="font-headline font-bold text-3xl text-brand-dark">
                Mạng lưới trung tâm.
              </h3>
            </div>
            <Link href="/centers" className="text-xs font-bold tracking-widest text-brand-crimson uppercase border-b border-brand-crimson pb-1">
              Xem chi tiết bản đồ
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border-l border-t border-brand-dark/5">
            {centers.map((center, i) => (
              <div 
                key={i} 
                className="p-8 border-r border-b border-brand-dark/5 hover:bg-brand-surface/30 transition-all group relative"
              >
                <p className="font-headline font-bold text-[10px] uppercase tracking-[1px] text-brand-gold mb-4 group-hover:text-brand-crimson transition-colors">
                  {center.name}
                </p>
                <p className="font-be-vietnam-pro text-[11px] text-brand-muted/60 leading-relaxed">
                  {center.address}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact & Newsletter Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col lg:flex-row gap-16 items-start lg:items-center justify-between pt-16 border-t-2 border-brand-dark"
        >
          <div className="flex flex-wrap gap-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-brand-dark/5 rounded-full flex items-center justify-center text-brand-crimson shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-headline font-bold text-[9px] uppercase tracking-[2px] text-brand-muted/40">Hotline</p>
                <p className="font-be-vietnam-pro font-bold text-base">1900 636 838</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-brand-dark/5 rounded-full flex items-center justify-center text-brand-crimson shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-headline font-bold text-[9px] uppercase tracking-[2px] text-brand-muted/40">Email</p>
                <p className="font-be-vietnam-pro font-bold text-base uppercase">info@vmg.edu.vn</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-0 shadow-xl shadow-brand-dark/5">
            <input
              type="email"
              placeholder="ĐỊA CHỈ EMAIL CỦA BẠN"
              className="px-8 py-5 bg-white border border-brand-dark text-[10px] uppercase tracking-[2px] w-full sm:w-80 focus:outline-none placeholder:text-brand-muted/30 font-be-vietnam-pro font-bold"
            />
            <button className="px-10 py-5 bg-brand-dark text-white font-headline font-bold uppercase tracking-[2px] text-[10px] whitespace-nowrap hover:bg-brand-crimson transition-all cursor-pointer">
              Đăng ký nhận tin
            </button>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-brand-dark/5">
          <p className="font-be-vietnam-pro font-bold text-[10px] uppercase tracking-[2px] text-brand-muted/30 text-center md:text-left">
            © 2026 VMG EDUCATION GROUP. ALL RIGHTS RESERVED. ACADEMIC ARCHITECT SYSTEM.
          </p>
          <div className="flex gap-10">
            <Link href="/privacy" className="font-be-vietnam-pro font-bold text-[10px] uppercase tracking-[2px] text-brand-muted/30 hover:text-brand-crimson transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="font-be-vietnam-pro font-bold text-[10px] uppercase tracking-[2px] text-brand-muted/30 hover:text-brand-crimson transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
