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
      <section className="relative py-8 overflow-hidden bg-gradient-to-r from-red-600 to-orange-500">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Left: Deal Info & Timer */}
              <div className="text-white">
                <div className="inline-block bg-yellow-400 text-red-700 font-bold px-3 py-1 rounded-full text-xs uppercase mb-2">
                  🔥 Ưu đãi có hạn
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Săn Deal Hời - Nhập Học Ngay
                </h2>
                <p className="text-xl font-bold text-yellow-300 mb-4">
                  Giảm giá lên tới 35%
                </p>
                
                {/* Compact Countdown */}
                <div className="flex gap-2 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px] text-center">
                    <div className="text-2xl font-bold">{formatNumber(timeLeft.days)}</div>
                    <div className="text-xs opacity-90">Ngày</div>
                  </div>
                  <div className="text-2xl font-bold self-center">:</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px] text-center">
                    <div className="text-2xl font-bold">{formatNumber(timeLeft.hours)}</div>
                    <div className="text-xs opacity-90">Giờ</div>
                  </div>
                  <div className="text-2xl font-bold self-center">:</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px] text-center">
                    <div className="text-2xl font-bold">{formatNumber(timeLeft.minutes)}</div>
                    <div className="text-xs opacity-90">Phút</div>
                  </div>
                  <div className="text-2xl font-bold self-center">:</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px] text-center">
                    <div className="text-2xl font-bold">{formatNumber(timeLeft.seconds)}</div>
                    <div className="text-xs opacity-90">Giây</div>
                  </div>
                </div>
              </div>

              {/* Right: Quick Form */}
              <div className="bg-white rounded-xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  🎁 Nhận ưu đãi ngay
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Số điện thoại"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Email (tùy chọn)"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all transform hover:scale-105"
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
