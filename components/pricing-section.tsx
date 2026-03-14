"use client";

import React, { useState, useEffect } from "react";
import FadeSlideUp from "./fade-slide-up";

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
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-vmg-green/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="w-full px-4 relative z-10">
        <div className="max-w-[1200px] mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20">
          {/* Left: Benefits & Info */}
          <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-vmg-navy/5 bg-vmg-blue-soft/30">
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

          {/* Right: Pricing & CTA */}
          <div className="w-full md:w-96 bg-vmg-blue-soft/50 p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <span className="text-[10px] font-black text-vmg-blue uppercase tracking-[0.2em] mb-2">Học phí trọn gói</span>
            <div className="mb-6">
              {isApplied && (
                <div className="flex flex-col items-center mb-1">
                  <span className="text-sm text-vmg-navy/40 line-through font-bold italic leading-none">
                    {ORIGINAL_PRICE.toLocaleString()}đ
                  </span>
                  <span className="text-xs font-black text-vmg-red uppercase mt-1">
                    Trừ {discountAmount.toLocaleString()}đ ({activeDiscount * 100}%)
                  </span>
                </div>
              )}
              <span className="text-5xl font-black text-vmg-navy tracking-tighter tabular-nums leading-tight block">
                {currentPrice.toLocaleString()}đ
              </span>
              <p className="text-[11px] font-bold text-vmg-navy/40 mt-2 italic px-4">Cam kết không phát sinh chi phí trong suốt quá trình học</p>
            </div>

            {/* Discount Code Input Bar */}
            <div className="w-full max-w-[300px] mb-8">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Mã giảm giá"
                  className="w-full pl-4 pr-20 py-3 bg-white border border-vmg-blue/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-vmg-blue/20 transition-all text-xs font-bold uppercase tracking-widest text-vmg-navy"
                />
                <button
                  onClick={handleApplyDiscount}
                  className={`absolute right-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                    isApplied 
                      ? 'bg-vmg-green text-white' 
                      : 'bg-vmg-blue text-white hover:bg-vmg-blue/90'
                  }`}
                >
                  {isApplied ? 'Đã dùng' : 'Áp dụng'}
                </button>
              </div>
              {discountError && <p className="text-[10px] font-bold text-vmg-red mt-2 uppercase tracking-wide">{discountError}</p>}
            </div>

            <button 
              onClick={handleConsultation}
              className="w-full bg-vmg-red hover:bg-vmg-red/90 text-white font-black py-5 rounded-2xl shadow-xl shadow-vmg-red/30 transition-all hover:scale-[1.05] active:scale-[0.95] uppercase tracking-widest text-sm"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </FadeSlideUp>
  );
}
