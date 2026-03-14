"use client";

import { useState } from "react";
import FadeSlideUp from "./fade-slide-up";

export default function CertificateCeremonySection() {
  const moments = [
    { title: "Khoảnh khắc nhận bằng", image: "/images/graduation/image1.png" },
    { title: "Lễ tốt nghiệp trang trọng", image: "/images/graduation/image2.png" },
    { title: "Giao lưu cộng đồng", image: "/images/graduation/image3.png" },
    { title: "Lưu giữ kỷ niệm", image: "/images/graduation/image4.png" },
    { title: "Ăn mừng thành công", image: "/images/graduation/image5.png" },
    { title: "Chứng chỉ quốc tế ALAP", image: "/images/graduation/image6.png" },
    { title: "Đội ngũ giáo viên mới", image: "/images/graduation/image7.png" },
    { title: "Hợp tác đào tạo", image: "/images/graduation/image8.png" },
    { title: "Tương lai tươi sáng", image: "/images/graduation/image9.png" },
  ];

  // Tripled the items to ensure the screen is always filled before looping
  const row1 = [...moments, ...moments, ...moments];
  const row2 = [...moments.slice().reverse(), ...moments.reverse(), ...moments.reverse()];

  const CardItem = ({ moment }: { moment: { title: string, image: string } }) => (
    <div className="w-[300px] md:w-[450px] shrink-0">
      <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 group/card transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={moment.image}
            alt={moment.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
          />
        </div>
        <div className="p-5">
          <h3 className="text-vmg-navy font-bold text-sm md:text-base truncate">{moment.title}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#F7F8FC] w-full overflow-hidden">
      {/* Section 1: Infinite Scroll Rows - Truly Edge to Edge */}
      <FadeSlideUp className="py-20 flex flex-col gap-12 w-full max-w-none" id="certificate-ceremony">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center gap-4 px-4">
          <span className="text-xs font-bold text-[#0038D1] uppercase tracking-[0.3em] mb-2">Lễ trao chứng chỉ</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">Khoảnh khắc vinh danh học viên TESOL</h2>
          <p className="text-gray-500 font-medium max-w-lg">Ghi lại những cột mốc quan trọng trong hành trình trở thành giáo viên quốc tế.</p>
        </div>

        <div className="flex flex-col gap-8 w-full">
          {/* Row 1: Left to Right */}
          <div className="w-full inline-flex flex-nowrap overflow-hidden group [mask-image:_linear-gradient(to_right,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)]">
            <div className="flex items-center justify-center md:justify-start [&_div]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused] gap-6 px-3">
              {row1.map((moment, index) => (
                <CardItem key={`r1-${index}`} moment={moment} />
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div className="w-full inline-flex flex-nowrap overflow-hidden group [mask-image:_linear-gradient(to_right,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)]">
            <div className="flex items-center justify-center md:justify-start [&_div]:max-w-none animate-infinite-scroll-reverse group-hover:[animation-play-state:paused] gap-6 px-3">
              {row2.map((moment, index) => (
                <CardItem key={`r2-${index}`} moment={moment} />
              ))}
            </div>
          </div>
        </div>
      </FadeSlideUp>

      {/* Section 2: Bento Grid - Hợp tác quốc tế */}
      <FadeSlideUp className="section-padding pt-0" id="signing-ceremony">
        <div className="w-full px-4 max-w-[1200px] mx-auto">
          <div className="mb-12 text-center md:text-left border-b border-gray-100 pb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0038D1] mb-2 block">Đối tác chiến lược</span>
            <h2 className="text-3xl font-bold text-vmg-navy tracking-tight">Hợp tác & Ký kết Quốc tế</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[240px]">
            <div className="md:col-span-8 md:row-span-2 rounded-[2rem] overflow-hidden group relative border border-gray-200">
              <img
                src="/images/vmg-intesolvietnam/image.png"
                alt="Signing Ceremony Main"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vmg-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <h4 className="text-white font-bold text-xl mb-2">Lễ ký kết VMG & INTESOL Worldwide</h4>
                <p className="text-white/80 text-sm">Hợp tác chiến lược nâng tầm chất lượng đào tạo giáo viên tiếng Anh tại Việt Nam.</p>
              </div>
            </div>

            <div className="md:col-span-4 rounded-[2rem] overflow-hidden group relative border border-gray-100">
              <img
                src="/images/vmg-intesolvietnam/image1.png"
                alt="Signing Ceremony 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-vmg-blue/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="md:col-span-4 rounded-[2rem] overflow-hidden group relative border border-gray-100">
              <img
                src="/images/vmg-intesolvietnam/image2.png"
                alt="Signing Ceremony 2"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-vmg-red/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="md:col-span-12 rounded-[2rem] h-[300px] overflow-hidden group relative mt-4 border border-gray-200">
              <img
                src="/images/vmg-intesolvietnam/image3.png"
                alt="Signing Ceremony 3"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 md:p-12">
                <div className="max-w-xl">
                  <h4 className="text-white font-bold text-2xl mb-2">Cam kết Chất lượng</h4>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">Đảm bảo tiêu chuẩn giảng dạy quốc tế ALAP (UK) cho mọi học viên tốt nghiệp.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeSlideUp>
    </div>
  );
}
