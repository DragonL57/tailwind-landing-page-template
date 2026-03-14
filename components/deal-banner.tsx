"use client";

import { useState, useEffect } from "react";
import { getCouponDaysRemaining, isCouponValid } from "@/lib/coupons";
import FadeSlideUp from "./fade-slide-up";

export default function DealBanner() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  
  const daysRemaining = getCouponDaysRemaining();
  const couponStillValid = isCouponValid();
  const couponCode = "VMG-SOM";

  const [timeLeft, setTimeLeft] = useState({
    days: daysRemaining,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Countdown timer - counts down to day 20
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
    
    if (!couponStillValid) {
      setSubmitMessage("Ưu đãi chỉ áp dụng trước ngày 20 hàng tháng. Vui lòng quay lại tháng sau!");
      return;
    }

    if (!phone || phone.length < 10) {
      setSubmitMessage("Vui lòng nhập số điện thoại hợp lệ");
      return;
    }

    // Store user info in localStorage
    localStorage.setItem('earlyBirdPhone', phone);
    localStorage.setItem('earlyBirdEmail', email);
    localStorage.setItem('earlyBirdSubmittedAt', new Date().toISOString());
    
    // Show popup instead of inline message
    setShowPopup(true);
    setSubmitMessage("");
  };

  const handleApplyNow = () => {
    // Store coupon in localStorage
    localStorage.setItem('appliedCoupon', couponCode);
    
    // Trigger storage event for payment sidebar
    window.dispatchEvent(new Event('storage'));
    
    // Close popup
    setShowPopup(false);
    
    // Show success message
    setSubmitMessage("✓ Đã áp dụng mã giảm giá! Đang chuyển đến phần thanh toán...");
    
    // Scroll to payment sidebar after 1 second
    setTimeout(() => {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1000);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <>
      <FadeSlideUp className="relative py-8 overflow-hidden bg-gradient-to-br from-vmg-navy via-vmg-blue to-vmg-navy rounded-2xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20 rounded-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-vmg-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="w-full px-4 sm:px-6 relative z-10">
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
                  Đăng Ký Nhận Ưu Đãi EARLY BIRD
                </h2>
                <p className="text-xl font-semibold text-vmg-green mb-2">
                  Giảm ngay 5% cho khóa học từ 5 triệu
                </p>
                <p className="text-sm opacity-90 mb-6">
                  {couponStillValid 
                  }
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vmg-red focus:border-transparent transition-all"
                    placeholder="Số điện thoại"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vmg-red focus:border-transparent transition-all"
                    placeholder="Email (tùy chọn)"
                  />
                  <button
                    type="submit"
                    disabled={!couponStillValid}
                    className="w-full bg-vmg-red hover:bg-vmg-red/90 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {couponStillValid ? 'Nhận Ưu Đãi Ngay' : 'Ưu đãi hết hạn'}
                  </button>
                  
                  {/* Success/Error Message */}
                  {submitMessage && (
                    <div className={`p-3 rounded-xl text-sm font-medium ${
                      submitMessage.includes('✓') 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                    }`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </FadeSlideUp>

      {/* Popup Modal for Coupon Code */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform animate-scaleIn">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-center text-vmg-navy mb-2">
              Chúc mừng!
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Bạn đã nhận được mã giảm giá
            </p>

            {/* Coupon Code Display */}
            <div className="bg-gradient-to-br from-vmg-navy to-vmg-blue rounded-xl p-6 mb-6 text-center">
              <div className="text-sm text-white/80 mb-2">Mã giảm giá của bạn</div>
              <div className="text-3xl font-bold text-white tracking-wider mb-2 font-mono">
                {couponCode}
              </div>
              <div className="text-vmg-green bg-white/90 rounded px-2 py-1 inline-block text-sm font-bold">
                Giảm 5% cho đơn từ 5 triệu
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleApplyNow}
                className="w-full bg-vmg-red hover:bg-vmg-red/90 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Áp Dụng Ngay
              </button>
              
              <button
                onClick={handleCopyCode}
                className="w-full bg-white border-2 border-vmg-red text-vmg-red font-bold py-4 rounded-xl hover:bg-vmg-red/5 transition-all flex items-center justify-center gap-2"
              >
                {copiedCode ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    Đã Sao Chép!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    Sao Chép Mã
                  </>
                )}
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
              >
                Đóng
              </button>
            </div>

            {/* Info Text */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Mã có hiệu lực đến ngày 20 hàng tháng
            </p>
          </div>
        </div>
      )}
    </>
  );
}
