"use client";

import React, { useState, useEffect } from "react";
import FadeSlideUp from "./fade-slide-up";
import Link from "next/link";
import { Check, ShieldCheck, CreditCard, ArrowRight, Tag } from "lucide-react";

export default function PricingSection() {
  const [couponInput, setCouponInput] = useState("");
  const [discountActive, setDiscountActive] = useState(false);
  const [error, setError] = useState("");

  const originalPrice = 9900000;
  const discountedPrice = 7920000;
  const currentPrice = discountActive ? discountedPrice : originalPrice;

  useEffect(() => {
    const checkCoupon = () => {
      const applied = localStorage.getItem('appliedCoupon');
      if (applied === 'VMG') {
        setDiscountActive(true);
      } else {
        setDiscountActive(false);
      }
    };
    
    checkCoupon();
    
    // Listen for storage changes (even in the same window via manual dispatch)
    window.addEventListener('storage', checkCoupon);
    return () => window.removeEventListener('storage', checkCoupon);
  }, []);

  const handleApplyCoupon = () => {
    if (couponInput.toUpperCase() === 'VMG') {
      setDiscountActive(true);
      localStorage.setItem('appliedCoupon', 'VMG');
      window.dispatchEvent(new Event('storage'));
      setError("");
    } else {
      setError("Mã ưu đãi không hợp lệ");
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountActive(false);
    localStorage.removeItem('appliedCoupon');
    window.dispatchEvent(new Event('storage'));
    setCouponInput("");
  };

  const benefits = [
    "Tài khoản học tập phần mềm LMS",
    "Đã bao gồm phí kích hoạt tài khoản INTESOL quốc tế",
    "Bộ giáo trình chuẩn & tài liệu hỗ trợ (VMG biên soạn)",
    "Định hướng giải bài tập & bài kiểm tra",
    "Các buổi học Live Session theo nhu cầu",
    "10 Lesson Plan cho trường hợp thực tế tại VMG",
    "Đã bao gồm phí cấp và chuyển chứng chỉ tận nơi",
    "Buổi Đào tạo CV & Định hướng nghề nghiệp (trị giá 1,5 triệu)",
    "Tặng voucher 20% cho khách hàng đăng ký tháng 3",
    "Miễn phí kiểm tra đầu vào (Placement Test)"
  ];

  return (
    <FadeSlideUp id="pricing-final" className="relative w-full py-24 bg-vmg-blue overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-white opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-vmg-green opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />

      {/* Background PNG silhouettes copied from TesolBenefits */}
      <div className="absolute -right-24 -top-12 w-[600px] h-[600px] pointer-events-none z-0 select-none">
        <img src="/images/Picture1.png" alt="" className="w-full h-full object-contain opacity-100 brightness-0 invert -rotate-12" />
      </div>
      <div className="absolute -left-32 -bottom-24 w-[700px] h-[700px] pointer-events-none z-0 select-none">
        <img src="/images/Picture1.png" alt="" className="w-full h-full object-contain opacity-100 brightness-0 invert rotate-12" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Sẵn sàng bắt đầu <br className="md:hidden" />
            hành trình <span className="text-vmg-green">TESOL</span> của bạn
          </h2>
          <p className="text-white/60 text-lg mt-4 font-medium max-w-2xl mx-auto">
            Đầu tư cho sự nghiệp giảng dạy quốc tế với lộ trình minh bạch và quyền lợi tối ưu.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col lg:grid lg:grid-cols-12">
          
          {/* Left: Benefits List */}
          <div className="lg:col-span-7 p-10 md:p-16 bg-white border-b lg:border-b-0 lg:border-r border-gray-100 order-1">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-vmg-navy uppercase tracking-wider">Quyền lợi học viên</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-vmg-green/10 flex items-center justify-center shrink-0 mt-0.5 transition-colors group-hover:bg-vmg-green/20">
                    <Check className="w-3 h-3 text-vmg-green" strokeWidth={4} />
                  </div>
                  <span className="text-sm md:text-[0.95rem] font-bold text-vmg-navy/70 leading-snug group-hover:text-vmg-navy transition-colors">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-vmg-blue/5 rounded-3xl border border-vmg-blue/10">
              <p className="text-xs text-vmg-blue/70 font-medium italic leading-relaxed text-center">
                "Khóa học được thiết kế trọn gói, cam kết không phát sinh bất kỳ phụ phí nào cho đến khi học viên nhận chứng chỉ quốc tế trên tay."
              </p>
            </div>
          </div>

          {/* Right: Pricing & CTA */}
          <div className="lg:col-span-5 p-10 md:p-16 flex flex-col justify-center bg-gray-50 order-2 relative">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-vmg-blue uppercase tracking-[0.2em] bg-vmg-blue/5 px-3 py-1 rounded-full">Trọn gói khóa học</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-black text-vmg-navy tracking-tighter">
                    {currentPrice.toLocaleString()}
                  </span>
                  <span className="text-xl font-bold text-vmg-navy/40">VNĐ</span>
                </div>
                {discountActive && (
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-vmg-navy/30 line-through font-bold">{originalPrice.toLocaleString()}đ</span>
                    <span className="bg-vmg-red text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">Tiết kiệm 20%</span>
                  </div>
                )}
              </div>

              {/* Coupon Section */}
              <div className="space-y-3">
                {!discountActive ? (
                  <>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-vmg-navy/30 group-focus-within:text-vmg-blue transition-colors">
                        <Tag className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="NHẬP MÃ ƯU ĐÃI"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        className="w-full pl-11 pr-24 h-12 bg-white border border-gray-200 rounded-xl focus:border-vmg-blue outline-none transition-all text-xs font-black tracking-widest text-vmg-navy"
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-4 bg-vmg-navy text-white text-[10px] font-black uppercase rounded-lg hover:bg-vmg-blue transition-colors"
                      >
                        Áp dụng
                      </button>
                    </div>
                    {error && <p className="text-[10px] text-vmg-red font-bold ml-1">{error}</p>}
                  </>
                ) : (
                  <div className="bg-vmg-green/10 border border-vmg-green/30 p-3 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-vmg-green flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />
                      </div>
                      <span className="text-[11px] font-black text-vmg-navy uppercase tracking-wider">Đã áp dụng mã <span className="text-vmg-green">VMG</span></span>
                    </div>
                    <button 
                      onClick={handleRemoveCoupon}
                      className="text-[10px] font-black text-vmg-red hover:text-vmg-red/80 underline uppercase tracking-widest transition-colors px-2 py-1"
                    >
                      Gỡ bỏ
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-vmg-green/20 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-vmg-green/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-vmg-green" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-vmg-navy leading-none uppercase tracking-wider mb-1">Cam kết chất lượng</p>
                    <p className="text-[10px] text-vmg-navy/50 font-medium">Đảm bảo đầu ra cho học viên</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-vmg-blue/10 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-vmg-blue/10 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-vmg-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-vmg-navy leading-none uppercase tracking-wider mb-1">Trả góp linh hoạt</p>
                    <p className="text-[10px] text-vmg-navy/50 font-medium">Chỉ từ 1.000.000đ / tháng</p>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full h-16 bg-vmg-red hover:bg-vmg-red/90 text-white font-black rounded-2xl shadow-xl shadow-vmg-red/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
              >
                Mua ngay
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <p className="text-[10px] text-center text-vmg-navy/30 font-bold uppercase tracking-widest">
                Thanh toán an toàn • Bảo mật 100%
              </p>
            </div>
          </div>

        </div>
      </div>
    </FadeSlideUp>
  );
}
