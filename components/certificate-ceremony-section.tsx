"use client";

import Image from 'next/image';
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
      <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-vmg-blue/5 group/card transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-vmg-blue/20">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={moment.image}
            alt={moment.title}
            fill
            className="object-cover transition-transform duration-700 group-hover/card:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vmg-navy/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="p-5 border-t border-vmg-blue/5 group-hover/card:bg-vmg-blue-soft/50 transition-colors duration-500">
          <h3 className="text-vmg-navy font-black text-sm md:text-base truncate group-hover/card:text-vmg-blue transition-colors">{moment.title}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-vmg-blue-soft/20 w-full overflow-hidden">
      {/* Section 1: Infinite Scroll Rows - Truly Edge to Edge */}
      <FadeSlideUp className="py-20 flex flex-col gap-12 w-full max-w-none" id="certificate-ceremony">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center gap-4 px-4">
          <span className="text-[10px] font-black text-vmg-blue uppercase tracking-[0.3em] mb-2">Lễ trao chứng chỉ</span>
          <h2 className="text-3xl md:text-5xl font-black text-vmg-navy tracking-tight">Khoảnh khắc vinh danh học viên TESOL</h2>
          <p className="text-vmg-navy/50 font-medium max-w-lg">Ghi lại những cột mốc quan trọng trong hành trình trở thành giáo viên quốc tế.</p>
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

      {/* Section 2: Đối tác chiến lược */}
      <FadeSlideUp className="section-padding pt-0" id="signing-ceremony">
          <div className="w-full px-4 max-w-[1200px] mx-auto">
            <div className="mb-12 text-center md:text-left border-b border-vmg-blue/10 pb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-vmg-blue mb-3 block">Đối tác chiến lược</span>
              <h2 className="text-3xl md:text-5xl font-black text-vmg-navy tracking-tight mb-6">VMG & INTESOL Vietnam</h2>
              <p className="text-vmg-navy/70 text-base md:text-xl font-medium leading-relaxed max-w-4xl">
                Sự kết hợp giữa <span className="text-vmg-blue font-black">22 năm kinh nghiệm</span> của VMG và <span className="text-vmg-blue font-black">uy tín toàn cầu</span> từ INTESOL Worldwide, khẳng định vị thế dẫn đầu trong đào tạo giáo viên Anh ngữ chuẩn Quốc tế tại Việt Nam.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-[2.5rem] overflow-hidden group relative border border-vmg-blue/10 hover:border-vmg-blue/30 transition-all duration-500 aspect-[16/10]">
                <Image
                  src="/images/vmg-intesolvietnam/image.png"
                  alt="Strategic Partnership"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="rounded-[2.5rem] overflow-hidden group relative border border-vmg-blue/10 hover:border-vmg-blue/30 transition-all duration-500 aspect-[16/10]">
                <Image
                  src="/images/vmg-intesolvietnam/image1.png"
                  alt="Signing Ceremony"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </FadeSlideUp>
    </div>

  );
}
