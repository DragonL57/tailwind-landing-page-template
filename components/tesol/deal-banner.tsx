"use client";

import { useState, useEffect } from "react";
import { Gift, ArrowRight, Check } from "lucide-react";

export default function DealBanner() {
  const [phone, setPhone] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const couponCode = "VMG";

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = Math.max(0, midnight.getTime() - now.getTime());
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPopup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setSubmitMessage("Số điện thoại không hợp lệ");
      return;
    }
    setShowPopup(true);
  };

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="w-full mt-20">
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-white/20 relative group">
        <div className="grid lg:grid-cols-12 items-stretch">
          
          {/* Left: Highlight Info */}
          <div className="lg:col-span-7 p-10 md:p-14 flex flex-col items-center lg:items-start justify-center border-b lg:border-b-0 lg:border-r border-gray-100 text-center lg:text-left">
            <div className="flex items-center gap-2.5 mb-6">
              <Gift className="w-5 h-5 text-vmg-red" />
              <span className="text-vmg-red font-black text-xs uppercase tracking-[0.2em]">Ưu đãi học phí</span>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-8 w-full">
              {/* Bold Centerpiece Timer (responsive for mobile) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-4 w-full">
                {[{ val: timeLeft.days, label: "Ngày" },
                  { val: timeLeft.hours, label: "Giờ" },
                  { val: timeLeft.minutes, label: "Phút" },
                  { val: timeLeft.seconds, label: "Giây" }
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-14 sm:w-14 sm:h-16 md:w-16 md:h-20 lg:w-20 lg:h-24 bg-vmg-navy flex items-center justify-center rounded-2xl shadow-xl shadow-vmg-navy/20">
                        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tabular-nums tracking-tight">{formatNumber(t.val)}</span>
                      </div>
                      <span className="text-[10px] font-black text-vmg-navy uppercase tracking-[0.15em] mt-3">{t.label}</span>
                    </div>
                    {i < 3 && (
                      <div className="hidden sm:flex flex-col gap-2 mb-8">
                        <div className="w-1.5 h-1.5 rounded-full bg-vmg-blue/30"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-vmg-blue/30"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-black text-vmg-navy tracking-tight leading-tight">
                  Chỉ còn vài giờ để nhận <span className="text-vmg-red">Ưu đãi 20%</span> <br />
                  <span className="text-vmg-navy/40 text-lg md:text-xl font-bold italic">Dành riêng cho 50 học viên đăng ký sớm nhất</span>
                </h2>
                
                <div className="inline-flex items-center bg-vmg-green/10 px-4 py-2 rounded-full border border-vmg-green/20">
                  <span className="w-2 h-2 rounded-full bg-vmg-green mr-3 animate-pulse"></span>
                  <span className="text-vmg-green font-black text-xs uppercase tracking-wider">Duy nhất hôm nay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Action Form */}
          <div className="lg:col-span-5 p-10 md:p-14 bg-vmg-blue-soft/20 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-xl font-black text-vmg-navy mb-2 text-center lg:text-left">Đăng ký nhận mã</h3>
              <p className="text-sm text-vmg-navy/50 font-medium text-center lg:text-left">Mã giảm giá sẽ được gửi qua số điện thoại của bạn</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
                className="w-full h-14 px-6 bg-white border-2 border-gray-100 rounded-2xl focus:border-vmg-blue focus:outline-none transition-all text-vmg-navy font-bold shadow-sm"
              />
              
              <button
                type="submit"
                className="w-full h-14 bg-vmg-red hover:bg-vmg-red/90 text-white font-black rounded-2xl shadow-lg shadow-vmg-red/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                Nhận ưu đãi ngay
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {submitMessage && <p className="text-xs font-bold text-vmg-red mt-4 text-center">{submitMessage}</p>}
          </div>
        </div>
      </div>

      {/* Modern Success Modal - Compact & Centered */}
      {showPopup && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 backdrop-blur-sm bg-vmg-navy/40 animate-in fade-in duration-300">
          {/* Backdrop Overlay */}
          <div className="absolute inset-0" onClick={() => setShowPopup(false)} />
          
          <div className="relative bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] max-w-[360px] w-full overflow-hidden border border-gray-100 transform animate-in zoom-in-95 duration-300">
            <div className="p-8 text-center">
              {/* Success Icon - Scaled down */}
              <div className="w-12 h-12 bg-vmg-green/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Check className="w-6 h-6 text-vmg-green" strokeWidth={3} />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-vmg-navy tracking-tight mb-1">
                Mã ưu đãi của bạn
              </h3>
              <p className="text-sm text-vmg-navy/50 font-medium mb-6">
                Bạn đã nhận được học bổng 20% <br /> cho khóa TESOL E-path.
              </p>

              {/* Coupon Box - Compact */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6 relative group transition-all hover:bg-white hover:border-vmg-green/20">
                <div className="text-3xl font-mono font-bold text-vmg-green tracking-[0.2em]">
                  {couponCode}
                </div>
                <div className="text-[9px] font-bold text-vmg-navy/30 uppercase tracking-widest mt-2">
                  Nhấn nút bên dưới để áp dụng
                </div>
              </div>

              {/* Actions - Aligned and sized down */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    // 1. Set the coupon in storage
                    localStorage.setItem('appliedCoupon', couponCode);
                    // 2. Dispatch event so other components (PricingSection) can react immediately
                    window.dispatchEvent(new Event('storage'));
                    // 3. Close the modal
                    setShowPopup(false);
                    // 4. Smooth scroll to pricing with a slight delay to ensure UI updates
                    setTimeout(() => {
                      const pricingElement = document.getElementById('pricing-final');
                      if (pricingElement) {
                        pricingElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                  className="w-full h-12 bg-vmg-red text-white font-bold rounded-xl hover:bg-vmg-red/90 transition-all active:scale-[0.98] text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-vmg-red/20"
                >
                  Áp dụng & Xem báo giá
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full text-vmg-navy/30 hover:text-vmg-navy/60 font-bold py-2 text-[9px] uppercase tracking-[0.2em] transition-colors"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
