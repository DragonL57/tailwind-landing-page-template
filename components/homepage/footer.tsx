"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Facebook, Youtube, Instagram, MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "TESOL E-path", href: "/tesolmooc" },
  { name: "Flextrack 1-1", href: "/giaotiep-1-1" },
  { name: "Liên hệ", href: "/contact" },
];

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "Youtube" },
  { icon: Instagram, label: "Instagram" },
];

export default function Footer() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
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
        backgroundImage: "radial-gradient(#e1e3e3 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-start gap-8">
            <div className="relative h-12 w-48 lg:h-14 lg:w-52">
              <Image
                src="/flextrack/flextrack_logo_white.png"
                alt="VMG Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="max-w-md border-l-4 border-brand-crimson pl-6 py-2">
              <p className="font-body text-base leading-relaxed text-[#191c1c]/80 italic">
                &quot;Kiến tạo thế hệ công dân toàn cầu thông qua sự chính xác trong ngôn ngữ và tư duy học thuật đỉnh cao.&quot;
              </p>
            </div>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, label }, i) => (
                <motion.button
                  key={i}
                  whileHover={{ backgroundColor: "#BE202F", color: "#ffffff" }}
                  aria-label={label}
                  className="w-12 h-12 border-2 border-[#191c1c]/10 flex items-center justify-center transition-all cursor-pointer rounded-none"
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Links & Contact */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <h4 className="font-headline font-bold text-xs uppercase tracking-[2px] text-brand-gold mb-8">
                TRUY CẬP NHANH
              </h4>
              <ul className="grid grid-cols-1 gap-4">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="font-body font-bold text-xs uppercase tracking-[1.5px] text-[#191c1c]/60 hover:text-brand-crimson transition-colors block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-headline font-bold text-xs uppercase tracking-[2px] text-brand-gold mb-8">
                LIÊN HỆ
              </h4>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-crimson mt-0.5 flex-shrink-0" />
                  <p className="font-body text-sm text-[#191c1c]/70 leading-relaxed">
                    Phòng L17-11, Tầng 17, Tòa nhà Vincom Center,<br />
                    72 Lê Thánh Tôn, P. Bến Nghé, Quận 1, TP.HCM
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-crimson flex-shrink-0" />
                  <p className="font-body font-bold text-sm">1900 636 838</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-crimson flex-shrink-0" />
                  <p className="font-body font-bold text-sm uppercase">info@vmg.edu.vn</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#191c1c]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body font-bold text-[9px] uppercase tracking-[2px] text-[#191c1c]/30">
            © 2026 VMG EDUCATION GROUP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="font-body font-bold text-[9px] uppercase tracking-[2px] text-[#191c1c]/30 hover:text-brand-crimson">Chính sách bảo mật</Link>
            <Link href="/terms" className="font-body font-bold text-[9px] uppercase tracking-[2px] text-[#191c1c]/30 hover:text-brand-crimson">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
