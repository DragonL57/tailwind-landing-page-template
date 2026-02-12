"use client";

import { useState, useEffect } from "react";

export default function DealBanner() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store coupon in localStorage
    localStorage.setItem('appliedCoupon', 'VMG-SOM');
    // Scroll to payment sidebar
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <>
      <section className="relative py-8 overflow-hidden bg-gradient-to-br from-vmg-navy via-vmg-blue to-vmg-navy rounded-2xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20 rounded-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-vmg-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Deal Info & Timer */}
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-vmg-green/20 backdrop-blur-sm text-vmg-green border border-vmg-green/30 font-bold px-4 py-2 rounded-full text-sm mb-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Ưu đãi có hạn
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Đăng Ký Nhận Ưu Đãi
                </h2>
                <p className="text-xl font-semibold text-vmg-green mb-6">
                  Giảm giá lên tới 35%
                </p>
                
                {/* Compact Countdown */}
                <div className="flex gap-3 mb-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 min-w-[70px] text-center border border-white/20">
                    <div className="text-2xl font-bold">{formatNumber(timeLeft.days)}</div>
                    <div className="text-xs opacity-80">Ngày</div>
                  </div>
                  <div className="text-2xl font-bold self-center opacity-50">:</div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 min-w-[70px] text-center border border-white/20">
                    <div className="text-2xl font-bold">{formatNumber(timeLeft.hours)}</div>
                    <div className="text-xs opacity-80">Giờ</div>
                  </div>
                  <div className="text-2xl font-bold self-center opacity-50">:</div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 min-w-[70px] text-center border border-white/20">
                    <div className="text-2xl font-bold">{formatNumber(timeLeft.minutes)}</div>
                    <div className="text-xs opacity-80">Phút</div>
                  </div>
                  <div className="text-2xl font-bold self-center opacity-50">:</div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 min-w-[70px] text-center border border-white/20">
                    <div className="text-2xl font-bold">{formatNumber(timeLeft.seconds)}</div>
                    <div className="text-xs opacity-80">Giây</div>
                  </div>
                </div>
              </div>

              {/* Right: Quick Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-vmg-green/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-vmg-green" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-vmg-navy">Nhận ưu đãi ngay</h3>
                </div>
                <p className="text-sm text-gray-600 text-center mb-6">Điền thông tin để nhận mã giảm giá</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vmg-blue focus:border-transparent transition-all"
                    placeholder="Số điện thoại"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vmg-blue focus:border-transparent transition-all"
                    placeholder="Email (tùy chọn)"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-vmg-blue to-vmg-navy hover:from-vmg-navy hover:to-vmg-blue text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                  >
                    Nhận Ưu Đãi Ngay
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
