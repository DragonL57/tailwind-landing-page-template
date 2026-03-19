"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-12 md:py-16 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#BE202F] text-white border-t border-[#BE202F]">
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="relative h-8 w-64 md:h-10 md:w-80">
          <Image
            src="/flextrack/flextrack_logo_white.png"
            alt="VMG FlexTrack Logo"
            fill
            className="object-contain object-left"
          />
        </div>
        <p className="text-white/70 font-body text-xs md:text-sm text-center md:text-left">
          © 2024 VMG FlexTrack. Architectural Academic Excellence.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {["Privacy Policy", "Terms of Service", "Institutional Disclosure", "Contact"].map((item) => (
          <Link key={item} href="#" className="text-white/80 hover:text-white font-label text-xs uppercase font-semibold tracking-[1.5px] transition-colors">
            {item}
          </Link>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Social Icons Placeholder */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-5 h-5 bg-[#B6914C] hover:bg-white transition-colors cursor-pointer"></div>
        ))}
      </div>
    </footer>
  );
}
