"use client";

import Image from "next/image";

export default function AcademicShowcase() {
  return (
    <section className="py-24 bg-[#f8f9f9]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-center">
        <div className="w-full lg:w-5/12">
          <div className="relative">
            {/* L-Corner Frame Decoration */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-l-4 border-t-4 border-[#B6914C] opacity-30"></div>
            <div className="relative aspect-[4/5] bg-slate-200">
               <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUHCS5OXSTqqnZpH8_mS6ST13p74zzIlqmjcoxesr9LMxysxYlxCJqZLRrjT5vnYmob_9ka_N5g-2li9u7U9-XCiaiB8tBPi_7qg58CO031KdP0EUFtrWMZcDQJK9xzz83p4rcP9-laTXeYelJPiPH9KeEEnqVSg5amJJBbyWjZ_S-w1b4dSIHmBgQLEFe5ATxSu9jiEKHDG2LI1AdT7W3d7nuiIKJnHBJmN1lls2X0dMvDx41DR7eL0KfSb6ut7EQXsY5gXGcD9o"
                alt="University library space"
                fill
                className="object-cover grayscale brightness-105"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-[#BE202F] p-8 md:p-12 text-white">
              <span className="block text-4xl md:text-5xl font-bold mb-2 font-headline">20+</span>
              <span className="block text-[10px] md:text-xs font-semibold uppercase tracking-[2px]">Năm Kinh Nghiệm</span>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-7/12 lg:pl-20 mt-12 lg:mt-0">
          <h2 className="text-4xl md:text-5xl font-bold text-[#191c1c] mb-8 leading-tight font-headline uppercase">
            Nơi Tư Duy Gặp Gỡ <br />
            <span className="text-[#BE202F]">Sự Kiến Tạo Bản Lĩnh</span>
          </h2>
          <div className="space-y-6 text-[#5b403f] font-body text-base md:text-lg leading-relaxed">
            <p>Tại VMG FlexTrack, chúng tôi tin rằng giáo dục không chỉ là truyền tải thông tin, mà là xây dựng một cấu trúc tư duy bền vững. Mỗi khóa học được thiết kế như một bản thiết kế kiến trúc hoàn chỉnh.</p>
            <p>Hệ thống của chúng tôi được tối ưu hóa cho những chuyên gia bận rộn, đòi hỏi sự linh hoạt tối đa nhưng không bao giờ thỏa hiệp về chất lượng học thuật và chiều sâu chuyên môn.</p>
          </div>
          <div className="mt-12 flex flex-wrap gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-[#B6914C] flex items-center justify-center text-[#B6914C]">✓</div>
              <span className="font-semibold text-xs md:text-sm uppercase tracking-[1.5px]">Accredited Excellence</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-[#B6914C] flex items-center justify-center text-[#B6914C]">🌐</div>
              <span className="font-semibold text-xs md:text-sm uppercase tracking-[1.5px]">Global Standards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
