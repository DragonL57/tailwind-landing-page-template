"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const products = [
    { name: "TESOL E-path", href: "/tesolmooc" },
    { name: "Flextrack (giao tiếp 1-1)", href: "/giaotiep-1-1" },
  ];

  const scrollToForm = () => {
    const form = document.getElementById('name');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b-2 border-brand-gold">
        <div className="flex justify-between items-center px-6 md:px-12 h-16">
          <Link href="/giaotiep-1-1" className="relative h-6 md:h-8 w-48 md:w-64">
            <Image
              src="/flextrack/flextrack_logo_white.png"
              alt="VMG FlexTrack Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>
          
          <div className="hidden lg:flex gap-10 h-full items-center">
            <Link href="/" className="text-slate-600 font-bold hover:text-brand-crimson transition-colors font-body text-xs md:text-sm tracking-[1.5px] uppercase">
              Trang chủ
            </Link>

            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-2 text-slate-600 font-bold hover:text-brand-crimson transition-colors font-body text-xs md:text-sm tracking-[1.5px] uppercase"
              >
                Các khóa học
                <svg
                  className={`w-4 h-4 transition-transform ${coursesDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu - Academic Style */}
              {coursesDropdownOpen && (
                <div
                  className="absolute top-full left-0 w-64 bg-white border-2 border-brand-gold/20 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50"
                >
                  {products.map((product, index) => (
                    <Link
                      key={index}
                      href={product.href}
                      className="block px-6 py-4 hover:bg-[#f8f9f9] text-slate-600 hover:text-brand-crimson font-bold text-[10px] tracking-[1.5px] uppercase transition-colors border-b border-slate-100 last:border-b-0"
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog" className="text-slate-600 font-bold hover:text-brand-crimson transition-colors font-body text-xs md:text-sm tracking-[1.5px] uppercase">
              Blog
            </Link>

            <Link href="/contact" className="text-slate-600 font-bold hover:text-brand-crimson transition-colors font-body text-xs md:text-sm tracking-[1.5px] uppercase">
              Liên hệ
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <button
              onClick={scrollToForm}
              className="bg-brand-crimson text-white px-4 md:px-7 py-2 md:py-2.5 font-bold tracking-[1px] md:tracking-[1.5px] text-[10px] md:text-sm hover:opacity-90 transition-all uppercase rounded-none whitespace-nowrap"
            >
              Đăng ký tư vấn
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-slate-700 hover:text-brand-crimson transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu - Academic Style matching tesolmooc structure */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-300">
            <div className="px-6 py-8 space-y-6">
              <Link href="/" className="block text-sm font-bold tracking-[1.5px] uppercase text-slate-700 hover:text-brand-crimson">Trang chủ</Link>
              
              <div className="space-y-4">
                <div className="text-[10px] font-bold tracking-[2px] uppercase text-brand-gold">Các khóa học</div>
                <div className="pl-4 space-y-4 border-l-2 border-brand-gold/20">
                  {products.map((product, index) => (
                    <Link key={index} href={product.href} className="block text-xs font-bold tracking-[1.5px] uppercase text-slate-600 hover:text-brand-crimson">{product.name}</Link>
                  ))}
                </div>
              </div>

              <Link href="/blog" className="block text-sm font-bold tracking-[1.5px] uppercase text-slate-700 hover:text-brand-crimson">Blog</Link>
              <Link href="/contact" className="block text-sm font-bold tracking-[1.5px] uppercase text-slate-700 hover:text-brand-crimson">Liên hệ</Link>

              <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                <button
                  onClick={scrollToForm}
                  className="w-full text-center bg-brand-crimson text-white font-bold tracking-[1.5px] uppercase py-4"
                >
                  Đăng ký tư vấn
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
