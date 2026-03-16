"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FloatingPurchaseCTA() {
  // Visible only after passing hero section; discount always shown
  const [isVisible, setIsVisible] = useState(false);
  const [discountActive, setDiscountActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHeroPassed = () => {
      const hero = document.getElementById('hero-section');
      if (!hero) {
        setIsVisible(true);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setIsVisible(rect.bottom < 0);
    };

    window.addEventListener('scroll', checkHeroPassed);
    checkHeroPassed();

    return () => {
      window.removeEventListener('scroll', checkHeroPassed);
    };
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (isVisible && containerRef.current) {
        const height = containerRef.current.offsetHeight;
        // Add 16px extra gap when visible
        document.documentElement.style.setProperty('--purchase-cta-offset', `${height + 16}px`);
      } else {
        document.documentElement.style.setProperty('--purchase-cta-offset', '0px');
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      document.documentElement.style.setProperty('--purchase-cta-offset', '0px');
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
          
          {/* Price Info (vertical layout) */}
          <div className="flex flex-col text-vmg-navy shrink-0">
            <span className="text-[9px] lg:text-[10px] font-bold text-vmg-blue uppercase tracking-tight leading-none mb-2">
              Nhận học bổng 20% khi đăng ký sớm
            </span>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-black text-vmg-navy tracking-tighter">7.920.000</span>
                <span className="text-xl font-bold text-vmg-navy/40">VNĐ</span>
              </div>

              {discountActive && (
                <div className="flex items-center gap-3">
                  <span className="text-lg text-vmg-navy/30 line-through font-bold">9.900.000đ</span>
                  <span className="bg-vmg-red text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">Tiết kiệm 20%</span>
                </div>
              )}
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
        <p className="hidden lg:block text-[10px] text-center text-vmg-navy/60 font-bold uppercase tracking-tight mt-3">
          Khóa TESOL E-path • Online 100%
        </p>
      </div>
    </div>
  );
}
