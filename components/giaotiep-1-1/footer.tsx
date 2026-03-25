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
    <footer 
      className="relative overflow-hidden bg-[#f8f9f9] text-[#191c1c] border-t-8 border-brand-crimson"
      style={{
        backgroundImage: 'radial-gradient(#e1e3e3 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20"
        >
          {/* Brand Identity Section */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-start gap-10">
            <div className="relative h-12 w-48 lg:h-16 lg:w-56">
              <Image
                src="/flextrack/flextrack_logo_white.png"
                alt="VMG FlexTrack Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            
            <div className="max-w-md border-l-4 border-brand-crimson pl-6 py-2">
              <p className="font-be-vietnam-pro text-lg leading-relaxed text-[#191c1c]/80 italic">
                &quot;Kiến tạo thế hệ công dân toàn cầu thông qua sự chính xác trong ngôn ngữ và tư duy học thuật đỉnh cao.&quot;
              </p>
            </div>

            <div className="flex gap-4">
              {socials.map(({ icon: Icon, label }, i) => (
                <motion.button
                  key={i}
                  whileHover={{ backgroundColor: '#BE202F', color: '#ffffff' }}
                  aria-label={label}
                  className="w-12 h-12 border-2 border-[#191c1c]/10 flex items-center justify-center transition-all cursor-pointer rounded-none"
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links & Info Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-montserrat font-bold text-xs uppercase tracking-[2px] text-brand-gold mb-8">
                DANH MỤC TRUY CẬP
              </h4>
              <ul className="grid grid-cols-1 gap-4">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="font-be-vietnam-pro font-bold text-xs uppercase tracking-[1.5px] text-[#191c1c]/60 hover:text-brand-crimson transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Main Offices */}
            <motion.div variants={itemVariants}>
              <h4 className="font-montserrat font-bold text-xs uppercase tracking-[2px] text-brand-gold mb-8">
                TRỤ SỞ ĐIỀU HÀNH
              </h4>
              <div className="space-y-8">
                <div className="group">
                  <p className="font-montserrat font-bold text-[10px] uppercase tracking-[1.5px] text-brand-crimson mb-2 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> TRỤ SỞ CHÍNH (TP.HCM)
                  </p>
                  <p className="font-be-vietnam-pro text-sm text-[#191c1c]/70 leading-relaxed">
                    Phòng L17-11, Tầng 17, Tòa nhà Vincom Center,<br />
                    72 Lê Thánh Tôn, P. Bến Nghé, Quận 1
                  </p>
                </div>
                <div className="group">
                  <p className="font-montserrat font-bold text-[10px] uppercase tracking-[1.5px] text-brand-crimson mb-2 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> VĂN PHÒNG ĐỒNG NAI
                  </p>
                  <p className="font-be-vietnam-pro text-sm text-[#191c1c]/70 leading-relaxed">
                    E99 Võ Thị Sáu, Khu phố 7,<br />
                    Phường Thống Nhất, TP. Biên Hòa
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Center System Showcase (Bento Style) */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 pt-16 border-t border-[#191c1c]/10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h4 className="font-montserrat font-bold text-xs uppercase tracking-[2px] text-brand-gold mb-2">
                HỆ THỐNG ĐÀO TẠO
              </h4>
              <h3 className="font-montserrat font-bold text-2xl uppercase text-[#191c1c]">
                MẠNG LƯỚI TRUNG TÂM
              </h3>
            </div>
            <div className="h-1 w-24 bg-brand-crimson hidden md:block" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border-l border-t border-[#191c1c]/10">
            {centers.map((center, i) => (
              <div 
                key={i} 
                className="p-6 border-r border-b border-[#191c1c]/10 hover:bg-white transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-brand-crimson group-hover:h-full transition-all duration-300" />
                <p className="font-montserrat font-bold text-[10px] uppercase tracking-[1px] text-brand-gold mb-3 group-hover:text-brand-crimson transition-colors">
                  {center.name}
                </p>
                <p className="font-be-vietnam-pro text-[11px] text-[#191c1c]/50 leading-relaxed">
                  {center.address}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact & Newsletter Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col lg:flex-row gap-12 items-start lg:items-center justify-between pt-12 border-t-2 border-[#191c1c]"
        >
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#191c1c]/10 flex items-center justify-center text-brand-crimson">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-montserrat font-bold text-[9px] uppercase tracking-[1.5px] text-[#191c1c]/40">Đường dây nóng</p>
                <p className="font-be-vietnam-pro font-bold text-sm">1900 636 838</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#191c1c]/10 flex items-center justify-center text-brand-crimson">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="font-montserrat font-bold text-[9px] uppercase tracking-[1.5px] text-[#191c1c]/40">Thư điện tử</p>
                <p className="font-be-vietnam-pro font-bold text-sm uppercase">info@vmg.edu.vn</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-0">
            <input
              type="email"
              placeholder="ĐỊA CHỈ EMAIL CỦA BẠN"
              className="px-6 py-4 bg-white border-2 border-[#191c1c] text-xs uppercase tracking-[1px] w-full sm:w-80 focus:outline-none placeholder:text-[#191c1c]/20 font-be-vietnam-pro font-bold rounded-none"
            />
            <button className="px-10 py-4 bg-brand-crimson text-white font-montserrat font-bold uppercase tracking-[2px] text-xs whitespace-nowrap hover:bg-[#a31b28] transition-all cursor-pointer rounded-none">
              ĐĂNG KÝ NHẬN TIN
            </button>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-be-vietnam-pro font-bold text-[9px] uppercase tracking-[2px] text-[#191c1c]/30 text-center md:text-left">
            © 2026 VMG EDUCATION GROUP. ALL RIGHTS RESERVED. ACADEMIC ARCHITECT SYSTEM.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="font-be-vietnam-pro font-bold text-[9px] uppercase tracking-[2px] text-[#191c1c]/30 hover:text-brand-crimson">Chính sách bảo mật</Link>
            <Link href="#" className="font-be-vietnam-pro font-bold text-[9px] uppercase tracking-[2px] text-[#191c1c]/30 hover:text-brand-crimson">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
