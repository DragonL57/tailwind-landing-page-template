"use client";

import { useState, useEffect } from "react";
import { isCouponValid } from "@/lib/coupons";
import FadeSlideUp from "./fade-slide-up";

export default function DealBanner() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  
  const couponStillValid = isCouponValid();
  const couponCode = "VMG";

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
      return {
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponStillValid) {
      setSubmitMessage("Ưu đãi đã hết hạn.");
      return;
    }
    if (!phone || phone.length < 10) {
      setSubmitMessage("Số điện thoại không hợp lệ");
      return;
    }
    localStorage.setItem('earlyBirdPhone', phone);
    localStorage.setItem('earlyBirdEmail', email);
    setShowPopup(true);
    setSubmitMessage("");
  };

  const handleApplyNow = () => {
    localStorage.setItem('appliedCoupon', couponCode);
    window.dispatchEvent(new Event('storage'));
    setShowPopup(false);
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <>
      <FadeSlideUp className="w-full">
        <div className="bg-[#0038D1] rounded-3xl overflow-hidden relative border border-white/10 shadow-sm">
          {/* Subtle decorative background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
          
          <div className="grid lg:grid-cols-12 items-stretch relative z-10">
            
            {/* Left Content: Info & Timer */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-vmg-green font-semibold text-xs uppercase tracking-widest mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-vmg-green"></span>
                Ưu đãi có hạn trong ngày
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                Đăng Ký Nhận Ưu Đãi <span className="text-vmg-green">EARLY BIRD</span>
              </h2>
              <p className="text-white/70 text-lg font-medium mb-10">
                Giảm ngay <span className="text-white font-bold border-b border-vmg-green/50">20%</span> cho khóa học từ 5 triệu đồng.
              </p>

              {/* Flat Clean Timer */}
              <div className="flex items-center gap-4">
                {[
                  { val: timeLeft.hours, label: "Giờ" },
                  { val: timeLeft.minutes, label: "Phút" },
                  { val: timeLeft.seconds, label: "Giây" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl">
                        <span className="text-2xl font-semibold text-white tabular-nums">{formatNumber(item.val)}</span>
                      </div>
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-2">{item.label}</span>
                    </div>
                    {i < 2 && <span className="text-xl font-light text-white/20 pb-6">:</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content: Quick Form */}
            <div className="lg:col-span-5 p-8 md:p-12 bg-black/10 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-white/5">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-1">Nhận mã giảm giá</h3>
                <p className="text-sm text-white/50">Mã sẽ được gửi tự động sau khi đăng ký</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-4 bg-white/10 border-2 border-white/30 rounded-2xl focus:bg-white/20 focus:border-vmg-green focus:outline-none transition-all text-base text-white placeholder:text-white/40"
                  placeholder="Số điện thoại của bạn"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-white/10 border-2 border-white/30 rounded-2xl focus:bg-white/20 focus:border-vmg-green focus:outline-none transition-all text-base text-white placeholder:text-white/40"
                  placeholder="Email (không bắt buộc)"
                />
                
                <button
                  type="submit"
                  disabled={!couponStillValid}
                  className="w-full bg-vmg-red hover:bg-vmg-red/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-vmg-red/10 transition-all active:scale-[0.99] disabled:bg-gray-600 uppercase tracking-widest text-xs mt-4"
                >
                  {couponStillValid ? 'Nhận Ưu Đãi Ngay' : 'Đã kết thúc'}
                </button>
                
                {submitMessage && (
                  <p className="text-xs font-semibold text-center text-vmg-green mt-4">{submitMessage}</p>
                )}
              </form>
            </div>

          </div>
        </div>
      </FadeSlideUp>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-vmg-navy/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full p-10 border border-gray-100 transform animate-scaleIn">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-vmg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-7 h-7 text-vmg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-vmg-navy mb-2 tracking-tight">Thành công!</h3>
              <p className="text-sm text-gray-500">Mã giảm giá của bạn đã sẵn sàng</p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 mb-8 text-center border border-gray-100 shadow-inner">
              <div className="text-4xl font-bold text-vmg-navy tracking-widest font-mono">{couponCode}</div>
              <div className="text-xs font-bold text-vmg-red uppercase mt-3 tracking-widest">Giảm 20% TOÀN KHÓA</div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleApplyNow}
                className="w-full bg-vmg-navy text-white font-bold py-4 rounded-2xl hover:bg-vmg-navy/90 transition-all text-xs uppercase tracking-widest"
              >
                Áp Dụng & Thanh Toán
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full text-gray-400 hover:text-gray-600 font-bold py-2 text-[10px] uppercase tracking-widest"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
