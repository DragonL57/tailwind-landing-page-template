"use client";

import React, { useState, useEffect } from "react";
import FadeSlideUp from "./fade-slide-up";

import Link from "next/link";

export default function PricingSection() {
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [activeDiscount, setActiveDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const ORIGINAL_PRICE = 9900000;
  
  const currentPrice = isApplied 
    ? ORIGINAL_PRICE * (1 - activeDiscount) 
    : ORIGINAL_PRICE;

  const discountAmount = ORIGINAL_PRICE * activeDiscount;

  useEffect(() => {
    const checkCoupon = (code: string | null) => {
      if (!code) return;
      const upperCode = code.toUpperCase();
      if (upperCode === "VMG") {
        setCouponCode("VMG");
        setActiveDiscount(0.20);
        setIsApplied(true);
      } else if (upperCode === "VMG-SOM") {
        setCouponCode("VMG-SOM");
        setActiveDiscount(0.05);
        setIsApplied(true);
      }
    };

    checkCoupon(localStorage.getItem('appliedCoupon'));

    const handleStorageChange = () => {
      checkCoupon(localStorage.getItem('appliedCoupon'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleApplyDiscount = () => {
    const upperCode = couponCode.toUpperCase();
    if (upperCode === "VMG") {
      setIsApplied(true);
      setActiveDiscount(0.20);
      setDiscountError("");
      localStorage.setItem('appliedCoupon', "VMG");
    } else if (upperCode === "VMG-SOM") {
      setIsApplied(true);
      setActiveDiscount(0.05);
      setDiscountError("");
      localStorage.setItem('appliedCoupon', "VMG-SOM");
    } else if (couponCode === "") {
      setDiscountError("Vui lòng nhập mã");
    } else {
      setDiscountError("Mã không hợp lệ");
      setIsApplied(false);
      setActiveDiscount(0);
    }
  };

  const handleConsultation = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <FadeSlideUp id="pricing-final" className="w-full bg-vmg-blue section-padding scroll-mt-24 overflow-hidden relative">
      {/* Background Silhouette Logo */}
      <div className="absolute -right-20 -top-20 w-[600px] h-[600px] opacity-100 pointer-events-none z-0 select-none">
        <img src="/images/Picture1.png" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-vmg-green/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="w-full px-4 relative z-10">
        <div className="max-w-[1200px] mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left: Benefits & Info */}
          <div className="flex-1 p-8 md:p-12 bg-vmg-blue-soft/30">
            <h2 className="text-3xl md:text-4xl font-black text-vmg-navy mb-8 tracking-tight leading-tight">
              Sẵn sàng bắt đầu hành trình <span className="text-vmg-blue">TESOL</span> của bạn?
            </h2>
            <div className="space-y-6">
              {[
                { title: "Chứng chỉ Quốc tế", desc: "Được cấp bởi ALAP Anh Quốc, công nhận toàn cầu." },
                { title: "Lộ trình tinh gọn", desc: "Học 100% online, linh hoạt theo thời gian của bạn." },
                { title: "Hỗ trợ trọn đời", desc: "Tham gia cộng đồng giáo viên và nhận tài liệu cập nhật." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-vmg-green/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3.5 h-3.5 text-vmg-green" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-vmg-navy text-sm">{item.title}</h4>
                    <p className="text-vmg-navy/60 text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pricing & CTA - Corporate Layout */}
          <div className="w-full md:w-[400px] bg-vmg-blue-soft/50 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-vmg-blue/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="mb-8">
                <p className="text-vmg-navy/50 text-xs font-bold uppercase tracking-widest mb-2">Học phí trọn gói</p>
                <div className="space-y-1">
                  {isApplied && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-vmg-navy/30 line-through font-bold text-lg leading-none italic">
                        {ORIGINAL_PRICE.toLocaleString()}đ
                      </span>
                      <span className="bg-vmg-red/10 text-vmg-red text-[10px] font-black px-2 py-0.5 rounded border border-vmg-red/20">
                        -{activeDiscount * 100}%
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-1 text-vmg-navy">
                    <span className="text-5xl font-black tracking-tighter tabular-nums">
                      {currentPrice.toLocaleString()}
                    </span>
                    <span className="text-xl font-bold opacity-60">đ</span>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-vmg-green mt-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-vmg-green animate-pulse"></span>
                  Cam kết không phát sinh chi phí
                </p>
              </div>

              {/* Discount Code Input */}
              <div className="mb-8 group">
                <div className="relative">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Mã ưu đãi"
                    className="w-full pl-4 pr-24 py-4 bg-white border border-vmg-blue/10 rounded-2xl focus:outline-none focus:border-vmg-blue transition-all text-xs font-bold uppercase tracking-widest text-vmg-navy placeholder:text-vmg-navy/20"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className={`absolute right-2 top-2 bottom-2 px-4 rounded-xl text-[10px] font-black uppercase transition-all ${
                      isApplied 
                        ? 'bg-vmg-green text-vmg-navy' 
                        : 'bg-white text-vmg-navy hover:bg-vmg-blue hover:text-white'
                    }`}
                  >
                    {isApplied ? 'Đã dùng' : 'Áp dụng'}
                  </button>
                </div>
                {discountError && <p className="text-[10px] font-bold text-vmg-red mt-2 uppercase tracking-wide ml-1">{discountError}</p>}
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-vmg-red hover:bg-vmg-red/90 text-white font-black py-5 rounded-2xl shadow-xl shadow-vmg-red/30 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm relative z-10 flex items-center justify-center"
            >
              Mua ngay
            </Link>
          </div>
        </div>
      </div>
    </FadeSlideUp>
  );
}
