"use client";

import { Award, Users, Camera, PartyPopper } from "lucide-react";
import FadeSlideUp from "./fade-slide-up";
import Image from "next/image";

// Card fallback for bento grid
const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`rounded-xl bg-white shadow-sm border border-gray-200 ${className}`}>{children}</div>
);
const CardContent = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export default function CertificateCeremonySection() {
  return (
    <FadeSlideUp className="bg-[#F7F8FC] section-padding border-b" id="certificate-ceremony">
      <div className="container mx-auto flex flex-col gap-10 md:gap-12 px-4">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center gap-4">
          <span className="text-xs font-black text-[#0038D1] uppercase tracking-widest mb-2">Lễ trao chứng chỉ</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-2">Khoảnh khắc vinh danh học viên TESOL</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {/* Wide Feature Card - Top Left */}
          <Card className="bg-white gap-0 overflow-hidden rounded-xl border-none p-0 shadow-none lg:col-span-2">
            <Image
              src="/images/graduation/image1.png"
              alt="Lễ trao chứng chỉ TESOL VMG 1"
              width={813}
              height={332}
              className="hidden h-auto w-full object-cover md:block md:h-[332px]"
            />
            <Image
              src="/images/graduation/image2.png"
              alt="Lễ trao chứng chỉ TESOL VMG 2"
              width={480}
              height={332}
              className="block h-auto w-full md:hidden"
            />
            <CardContent className="flex flex-col gap-2 p-6">
              <h3 className="text-gray-900 text-lg font-semibold">Khoảnh khắc nhận bằng</h3>
              <p className="text-gray-500">Học viên được vinh danh và nhận chứng chỉ TESOL quốc tế.</p>
            </CardContent>
          </Card>
          {/* Regular Feature Card - Top Right */}
          <Card className="bg-white gap-0 overflow-hidden rounded-xl border-none p-0 shadow-none lg:col-span-1">
            <Image
              src="/images/graduation/image3.png"
              alt="Giao lưu cộng đồng TESOL"
              width={480}
              height={332}
              className="h-auto w-full object-cover md:h-[332px]"
            />
            <CardContent className="flex flex-col gap-2 p-6">
              <h3 className="text-gray-900 text-lg font-semibold">Giao lưu cộng đồng</h3>
              <p className="text-gray-500">Kết nối, chia sẻ và mở rộng mạng lưới giáo viên TESOL.</p>
            </CardContent>
          </Card>
          {/* Regular Feature Card - Bottom Left */}
          <Card className="bg-white gap-0 overflow-hidden rounded-xl border-none p-0 shadow-none lg:col-span-1">
            <Image
              src="/images/graduation/image4.png"
              alt="Lưu giữ khoảnh khắc"
              width={480}
              height={332}
              className="h-auto w-full object-cover md:h-[332px]"
            />
            <CardContent className="flex flex-col gap-2 p-6">
              <h3 className="text-gray-900 text-lg font-semibold">Lưu giữ kỷ niệm</h3>
              <p className="text-gray-500">Chụp ảnh lưu niệm, ghi lại dấu ấn quan trọng trong sự nghiệp.</p>
            </CardContent>
          </Card>
          {/* Wide Feature Card - Bottom Right */}
          <Card className="bg-white gap-0 overflow-hidden rounded-xl border-none p-0 shadow-none lg:col-span-2">
            <Image
              src="/images/graduation/image5.png"
              alt="Ăn mừng thành công TESOL"
              width={813}
              height={332}
              className="hidden h-[332px] w-full object-cover md:block"
            />
            <Image
              src="/images/graduation/image6.png"
              alt="Ăn mừng thành công TESOL"
              width={480}
              height={332}
              className="block h-auto w-full object-cover md:hidden md:h-[332px]"
            />
            <CardContent className="flex flex-col gap-2 p-6">
              <h3 className="text-gray-900 text-lg font-semibold">Ăn mừng thành công</h3>
              <p className="text-gray-500">Không khí trang trọng, ấm cúng và đầy cảm xúc tại lễ trao bằng.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </FadeSlideUp>
  );
}
