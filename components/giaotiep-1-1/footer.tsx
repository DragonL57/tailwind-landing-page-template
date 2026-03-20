"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#BE202F] text-white py-20 px-6 md:px-12 border-t-8 border-[#B6914C]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
          
          {/* Column 1: Identity */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="relative h-10 w-64 md:h-12 md:w-80 mb-10">
                <Image
                  src="/flextrack/flextrack_logo_dark.png"
                  alt="VMG FlexTrack Logo"
                  fill
                  className="object-contain object-left" 
                />
              </div>
              <p className="text-white/70 font-body text-base md:text-lg leading-relaxed max-w-md">
                Kiến tạo tương lai thông qua hệ thống giáo dục 1–1 trực tuyến, tích hợp công nghệ và lộ trình học thuật linh hoạt.
              </p>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="text-xl md:text-2xl font-bold font-headline uppercase">VMG EDUCATION © 2024</div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-[2px] text-[#B6914C] mb-8">Pathways</h4>
            <ul className="space-y-4">
              {["FlexTrack Basic", "FlexTrack Pro", "FlexTrack Premium", "Evaluation"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/80 hover:text-white transition-colors font-body text-base group flex items-center gap-3">
                    <span className="w-0 h-px bg-white group-hover:w-4 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institutional Disclosure */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-[2px] text-[#B6914C] mb-8">Information</h4>
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
                  <Link key={item} href="#" className="text-xs font-bold uppercase tracking-[1px] text-white/60 hover:text-white transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
              
              <div className="flex gap-4 border-t border-white/10 pt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#BE202F] transition-all cursor-pointer">
                    <span className="text-[10px] font-bold">SC</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Simplified */}
        <div className="pt-8 border-t border-white/10 text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[2px] text-white/30">
            © 2024 VMG Education Group. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
