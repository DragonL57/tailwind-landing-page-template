"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FloatingPurchaseCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("logo-band-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          document.documentElement.style.setProperty('--purchase-cta-offset', '0px');
        }
      }
    };

    const updateHeight = () => {
      if (isVisible && containerRef.current) {
        const height = containerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--purchase-cta-offset', `${height + 16}px`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHeight);
    
    // Initial check
    handleScroll();
    if (isVisible) updateHeight();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed z-[100] animate-in slide-in-from-bottom lg:slide-in-from-right-10 duration-500
      bottom-0 left-0 right-0 
      lg:bottom-6 lg:right-6 lg:left-auto lg:w-72 pointer-events-none"
    >
      {/* Desktop Card / Mobile Bar Container */}
      <div className="bg-white border-t lg:border border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 lg:p-6 lg:rounded-2xl pointer-events-auto">
        <div className="max-w-md mx-auto flex lg:flex-col items-center lg:items-stretch justify-between gap-4">
          
          {/* Price Info */}
          <div className="flex flex-col text-vmg-navy shrink-0">
            <span className="text-[9px] lg:text-[10px] font-bold text-vmg-blue uppercase tracking-tight leading-none mb-1.5">
              Nhận học bổng 20% khi đăng ký sớm
            </span>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs lg:text-sm font-bold text-gray-400 line-through decoration-2 decoration-gray-400 tabular-nums">9.900.000₫</span>
                <span className="bg-vmg-green/10 text-vmg-green text-[9px] font-black px-1.5 py-0.5 rounded border border-vmg-green/10">-20%</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-black text-vmg-navy tracking-tighter tabular-nums">7.920.000</span>
                <span className="text-sm font-bold opacity-60">₫</span>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <Link
            href="/checkout"
            className="flex-1 lg:w-full bg-vmg-red hover:bg-vmg-red/90 text-white font-black py-4 lg:py-3.5 rounded-xl transition-all active:scale-95 shadow-xl shadow-vmg-red/25 text-sm lg:text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            Mua ngay
            <ArrowRight className="hidden lg:block w-4 h-4" strokeWidth={3} />
          </Link>
        </div>
        
        {/* Desktop-only secondary info */}
        <p className="hidden lg:block text-[10px] text-center text-gray-400 font-bold uppercase tracking-tight mt-3">
          Khóa TESOL E-path • Online 100%
        </p>
      </div>
    </div>
  );
}
