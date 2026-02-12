import React, { useState, useEffect } from "react";

export default function PaymentSidebar() {
  const [coupon, setCoupon] = useState("");
  const [price, setPrice] = useState(5000000);
  const [discount, setDiscount] = useState(0);

  // Check for applied coupon on mount and listen for storage changes
  useEffect(() => {
    const appliedCoupon = localStorage.getItem('appliedCoupon');
    if (appliedCoupon) {
      setCoupon(appliedCoupon);
      setDiscount(0.05);
    }

    // Listen for storage changes from deal banner
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'appliedCoupon' && e.newValue) {
        setCoupon(e.newValue);
        setDiscount(0.05);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Dummy coupon logic
  function handleApplyCoupon() {
    if (coupon.trim().toUpperCase() === "VMG-SOM" || coupon.trim().toUpperCase() === "EARLYBIRD") {
      setDiscount(0.05);
    } else {
      setDiscount(0);
    }
  }

  const finalPrice = Math.round(price * (1 - discount));

  return (
    <aside className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Price Header Section */}
      <div className="bg-gradient-to-br from-vmg-navy to-vmg-blue p-6 text-white">
        <div className="text-sm font-medium opacity-90 mb-2">Học phí khóa học</div>
        <div className="flex items-baseline gap-2">
          {discount > 0 && (
            <span className="text-2xl line-through opacity-70">₫{price.toLocaleString()}</span>
          )}
          <span className="text-4xl font-bold">₫{finalPrice.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="mt-3 inline-block bg-vmg-green text-white text-sm font-semibold px-3 py-1 rounded-full">
            🎉 Tiết kiệm 5%
          </div>
        )}
      </div>

      <div className="p-6 space-y-5">
        {/* CTA Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full bg-vmg-green hover:bg-green-600 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
          >
            Mua ngay
          </button>
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="w-full bg-white border-2 border-vmg-blue text-vmg-blue hover:bg-vmg-blue hover:text-white font-bold py-3 rounded-lg transition-all"
          >
            Thêm vào giỏ hàng
          </button>
        </div>

        {/* Course Includes */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-bold text-vmg-navy mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-vmg-green" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
            </svg>
            Khóa học bao gồm
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-vmg-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Video bài giảng theo yêu cầu</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-vmg-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Livestream định kỳ với giảng viên</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-vmg-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Bài tập và tài liệu học tập</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-vmg-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Hoạt động nhập vai và dạy demo</span>
            </li>
          </ul>
        </div>

        {/* Coupon Section */}
        <div className="pt-4 border-t border-gray-200">
          <label className="block text-sm font-semibold text-vmg-navy mb-2 flex items-center gap-2" htmlFor="coupon">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/>
            </svg>
            Mã giảm giá
          </label>
          <div className="flex gap-2">
            <input
              id="coupon"
              type="text"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-vmg-blue focus:border-transparent"
              placeholder="Nhập mã giảm giá"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="bg-vmg-blue hover:bg-vmg-navy text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
