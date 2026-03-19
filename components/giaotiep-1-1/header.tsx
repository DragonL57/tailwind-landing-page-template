"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-2 md:py-3 bg-white/80 backdrop-blur-xl border-b-2 border-[#B6914C] shadow-[0_24px_48px_rgba(25,28,28,0.06)]">
      <Link href="/giaotiep-1-1" className="relative h-6 md:h-8 w-48 md:w-64">
        <Image
          src="/flextrack/flextrack_logo_white.png"
          alt="VMG FlexTrack Logo"
          fill
          className="object-contain object-left"
          priority
        />
      </Link>
      
      <div className="hidden lg:flex gap-10">
        <Link href="#" className="text-[#BE202F] font-bold border-b-2 border-[#BE202F] pb-1 font-body text-xs md:text-sm tracking-[1.5px] uppercase">
          PROGRAMS
        </Link>
        <Link href="#" className="text-slate-600 font-medium hover:text-[#BE202F] transition-colors font-body text-xs md:text-sm tracking-[1.5px] uppercase">
          CURRICULUM
        </Link>
        <Link href="#" className="text-slate-600 font-medium hover:text-[#BE202F] transition-colors font-body text-xs md:text-sm tracking-[1.5px] uppercase">
          FACULTY
        </Link>
        <Link href="#" className="text-slate-600 font-medium hover:text-[#BE202F] transition-colors font-body text-xs md:text-sm tracking-[1.5px] uppercase">
          ADMISSIONS
        </Link>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="p-2 text-[#5b403f] hover:text-[#BE202F] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <button className="bg-[#BE202F] text-white px-5 md:px-7 py-1.5 md:py-2 font-bold tracking-[1.5px] text-xs md:text-sm hover:opacity-90 transition-all uppercase rounded-none">
          ENROLL
        </button>
      </div>
    </nav>
  );
}
