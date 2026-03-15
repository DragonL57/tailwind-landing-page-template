"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FloatingPurchaseCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("logo-band-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        // Show after the section has passed the top of the viewport
        if (rect.bottom < 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed z-[100] animate-in slide-in-from-bottom lg:slide-in-from-right-10 duration-500
      bottom-0 left-0 right-0 
      lg:bottom-6 lg:right-6 lg:left-auto lg:w-72">
      
      {/* Desktop Card / Mobile Bar Container */}
      <div className="bg-white border-t lg:border border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 lg:p-6 lg:rounded-2xl">
        <div className="max-w-md mx-auto flex lg:flex-col items-center lg:items-stretch justify-between gap-4">
          
          {/* Price Info */}
          <div className="flex flex-col text-vmg-navy shrink-0">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Học phí ưu đãi</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl lg:text-3xl font-black text-vmg-blue tracking-tighter tabular-nums">9.900.000</span>
              <span className="text-sm font-semibold opacity-60">₫</span>
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
