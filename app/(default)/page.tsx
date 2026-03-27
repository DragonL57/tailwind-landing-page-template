"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { BookOpen, Users, Globe, Award } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const stats = [
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "15+", label: "Trung tâm toàn quốc" },
  { value: "50K+", label: "Học viên đã đào tạo" },
  { value: "98%", label: "Hài lòng chương trình" },
];

const programs = [
  {
    title: "TESOL E-Path",
    subtitle: "Chứng chỉ giảng dạy quốc tế",
    description: "Lộ trình TESOL trực tuyến 100% với chứng chỉ ALAP quốc tế, mentor đồng hành và cam kết việc làm.",
    href: "/tesolmooc",
    icon: Award,
    badge: "CHỨNG CHỈ QUỐC TẾ",
  },
  {
    title: "FlexTrack 1-1",
    subtitle: "Giao tiếp tiếng Anh cá nhân hóa",
    description: "Hệ chương trình tiếng Anh 1-1 trực tuyến được thiết kế riêng biệt cho mục tiêu học thuật và sự nghiệp.",
    href: "/giaotiep-1-1",
    icon: Users,
    badge: "LỘ TRÌNH CÁ NHÂN",
  },
];

const values = [
  { icon: BookOpen, title: "Học thuật chuẩn quốc tế", description: "Chương trình được thiết kế theo tiêu chuẩn toàn cầu với đội ngũ chuyên gia đầu ngành." },
  { icon: Globe, title: "Tiếp cận toàn cầu", description: "Kết nối học viên Việt Nam với nền giáo dục tiên tiến trên thế giới." },
  { icon: Users, title: "Mentor đồng hành", description: "Đội ngũ giảng viên và mentor tận tâm hỗ trợ xuyên suốt hành trình học tập." },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f3f4f4] -z-10 hidden lg:block overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{ backgroundImage: "radial-gradient(#e1e3e3 1px, transparent 1px)", backgroundSize: "30px 30px" }}
          />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-16 lg:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 z-10">
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-block font-bold text-[10px] uppercase tracking-[2px] text-brand-gold border-l-4 border-brand-gold pl-4">
                  VMG
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#191c1c] leading-[1.05] tracking-tight mb-8 uppercase font-headline"
              >
                NỀN TẢNG GIÁO DỤC <br />
                <span className="text-brand-crimson italic">CHUẨN QUỐC TẾ</span><br />
                CHO NGƯỜI VIỆT
              </motion.h1>

              <motion.div variants={fadeUp} className="space-y-4 max-w-2xl mb-10">
                <p className="border-l-4 border-brand-crimson pl-6 font-medium text-base md:text-lg text-[#5b403f]">
                  Kiến tạo lộ trình học tập chuyên nghiệp từ chứng chỉ TESOL quốc tế đến giao tiếp tiếng Anh 1-1 cá nhân hóa.
                </p>
                <p className="pl-6 text-sm md:text-base text-[#5b403f]/80">
                  Hơn 10 năm đồng hành cùng hàng chục nghìn học viên trên hành trình chinh phục tiếng Anh học thuật và sự nghiệp.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 gap-y-3 gap-x-6 mb-10 max-w-2xl border-t-2 border-brand-gold py-6"
              >
                {["Chứng chỉ ALAP quốc tế", "Lớp học 1-1 tương tác cao", "Mentor đồng hành 24/7", "Cam kết đầu ra"].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-brand-gold" />
                    <span className="font-bold text-xs uppercase tracking-[1.5px] text-[#191c1c]">{feature}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link
                  href="/tesolmooc"
                  className="bg-brand-crimson text-white px-8 py-4 font-bold tracking-[2px] uppercase text-xs md:text-sm transition-all rounded-none hover:opacity-90"
                >
                  KHÁM PHÁ TESOL
                </Link>
                <Link
                  href="/giaotiep-1-1"
                  className="border-2 border-brand-crimson text-brand-crimson px-8 py-4 font-bold tracking-[2px] uppercase text-xs md:text-sm transition-all rounded-none hover:bg-brand-crimson hover:text-white"
                >
                  FLEXTRACK 1-1
                </Link>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[450px] aspect-[3/4] bg-[#e7e8e8] overflow-hidden">
                <div className="absolute inset-0 border-[15px] border-[#f3f4f4] z-10 pointer-events-none" />
                <Image
                  src="/images/homepage-hero.jpg"
                  alt="VMG"
                  fill
                  className="object-cover grayscale brightness-110 contrast-125"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-4 border-b-4 border-brand-crimson z-20" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ===== STATS BENTO GRID ===== */}
      <section className="bg-[#f3f4f4] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(#e1e3e3 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20 relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`bg-white p-8 md:p-10 ${i % 2 === 0 ? "border-t-4 border-brand-crimson" : "border-t-4 border-brand-gold"}`}
              >
                <p className="font-headline font-bold text-3xl md:text-4xl lg:text-5xl text-[#191c1c] mb-2">
                  {stat.value}
                </p>
                <p className="font-body font-bold text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/50">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <span className="font-bold text-[10px] uppercase tracking-[2px] text-brand-gold border-l-4 border-brand-gold pl-4">
                Chương trình đào tạo
              </span>
              <h2 className="font-headline font-bold text-3xl md:text-4xl uppercase text-[#191c1c] mt-4 tracking-tight">
                LỘ TRÌNH DÀNH CHO BẠN
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((program, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`bg-[#f8f9f9] p-8 md:p-12 group hover:bg-white transition-colors ${i === 0 ? "border-l-4 border-brand-crimson" : "border-l-4 border-brand-gold"}`}
                >
                  <span className="inline-block font-bold text-[9px] uppercase tracking-[2px] text-brand-gold mb-6">
                    {program.badge}
                  </span>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white flex items-center justify-center text-brand-crimson">
                      <program.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-xl md:text-2xl uppercase text-[#191c1c]">
                        {program.title}
                      </h3>
                      <p className="font-body text-xs text-[#191c1c]/50 tracking-[1px] uppercase font-bold">
                        {program.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="font-body text-sm md:text-base text-[#191c1c]/70 leading-relaxed mb-8 max-w-md">
                    {program.description}
                  </p>

                  <Link
                    href={program.href}
                    className="inline-block bg-brand-crimson text-white px-8 py-3 font-bold tracking-[1.5px] uppercase text-xs transition-all rounded-none hover:opacity-90"
                  >
                    Tìm hiểu thêm
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="bg-[#f3f4f4] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(#e1e3e3 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28 relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <span className="font-bold text-[10px] uppercase tracking-[2px] text-brand-gold border-l-4 border-brand-gold pl-4">
                Tại sao chọn VMG
              </span>
              <h2 className="font-headline font-bold text-3xl md:text-4xl uppercase text-[#191c1c] mt-4 tracking-tight">
                GIÁ TRỊ CỐT LÕI
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white p-8 md:p-12"
                >
                  <div className="w-14 h-14 bg-[#f3f4f4] flex items-center justify-center mb-6 text-brand-crimson">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline font-bold text-base md:text-lg uppercase text-[#191c1c] mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-[#191c1c]/60 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-brand-crimson relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28 relative z-10 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <motion.h2
              variants={fadeUp}
              className="font-headline font-bold text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-tight tracking-tight mb-6"
            >
              BẮT ĐẦU HÀNH TRÌNH<br />CỦA BẠN NGAY HÔM NAY
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-base md:text-lg text-white/80 mb-10 leading-relaxed">
              Đăng ký tư vấn miễn phí để nhận lộ trình học tập phù hợp nhất với mục tiêu và năng lực của bạn.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/giaotiep-1-1"
                className="bg-white text-brand-crimson px-10 py-4 font-bold tracking-[2px] uppercase text-xs md:text-sm transition-all rounded-none hover:bg-brand-gold hover:text-white"
              >
                ĐĂNG KÝ TƯ VẤN
              </Link>
              <Link
                href="/tesolmooc"
                className="border-2 border-white text-white px-10 py-4 font-bold tracking-[2px] uppercase text-xs md:text-sm transition-all rounded-none hover:bg-white hover:text-brand-crimson"
              >
                KHÁM PHÁ KHÓA HỌC
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
