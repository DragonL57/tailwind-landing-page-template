"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [note, setNote] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplied, setIsApplied] = useState(false);

  const originalPrice = 9900000;
  const total = originalPrice - discount;

  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === "vmg") {
      setDiscount(originalPrice * 0.2); // 20% discount
      setIsApplied(true);
    } else {
      setDiscount(0);
      setIsApplied(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12 text-vmg-navy font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Thanh toán đơn hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Student Info */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-bold text-xs uppercase tracking-widest">Thông tin học viên</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Họ tên</label>
                    <input 
                      type="text" 
                      readOnly 
                      value="Nguyễn Văn A" 
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-500 rounded cursor-not-allowed" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Số điện thoại</label>
                    <input 
                      type="text" 
                      readOnly 
                      value="0912 345 678" 
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-500 rounded cursor-not-allowed" 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="nguyenvana@gmail.com" 
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-500 rounded cursor-not-allowed" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Ghi chú</label>
                  <textarea 
                    rows={3} 
                    value={note} 
                    onChange={(e) => setNote(e.target.value)} 
                    placeholder="Nhập ghi chú" 
                    className="w-full px-4 py-2 bg-white border border-gray-300 focus:border-vmg-blue outline-none rounded" 
                  />
                </div>
                <p className="text-[11px] text-vmg-red italic">
                  *Chú ý: Các thông tin các nhân như họ tên, số điện thoại, email được lấy từ hệ thống. Vui lòng không chỉnh sửa.
                </p>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-bold text-xs uppercase tracking-widest">Hình thức thanh toán</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4 p-4 border border-vmg-blue bg-vmg-blue-soft/10 rounded">
                  <div className="mt-1">
                    <div className="w-4 h-4 rounded-full border-4 border-vmg-blue bg-white"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-vmg-navy text-sm uppercase">Chuyển khoản ngân hàng</h4>
                    <p className="text-xs text-gray-600 mt-1">Thanh toán qua tài khoản ngân hàng do VMG cung cấp sau khi đặt hàng</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Course Info */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-bold text-xs uppercase tracking-widest">Thông tin khóa học</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-vmg-navy uppercase">Tesol E-path</h3>
                  <p className="text-sm text-gray-500">Lộ trình giảng dạy tiếng Anh chuẩn quốc tế</p>
                </div>
                <div className="space-y-2 border-t border-gray-50 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Học phí</span>
                    <span className="font-bold">9.900.000 ₫</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Khuyến mãi</span>
                    <span className="font-bold">0 ₫</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase">Mã ưu đãi</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={coupon} 
                      onChange={(e) => setCoupon(e.target.value)} 
                      placeholder="Nhập mã giảm giá" 
                      className={`flex-1 px-3 py-2 border rounded text-sm outline-none focus:border-vmg-blue ${isApplied ? 'border-vmg-green bg-vmg-green/5' : 'border-gray-300'}`}
                    />
                    <button 
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-vmg-navy text-white text-xs font-bold rounded uppercase tracking-wider hover:bg-black transition-colors"
                    >
                      {isApplied ? 'Đã dùng' : 'Áp dụng'}
                    </button>
                  </div>
                  {isApplied && <p className="text-[10px] text-vmg-green font-bold uppercase mt-1">Áp dụng mã VMG thành công! Giảm 20%</p>}
                </div>
              </div>
            </section>

            {/* Billing Details */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-bold text-xs uppercase tracking-widest">Chi tiết thanh toán</h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Học phí gốc</span>
                  <span className="font-bold">{originalPrice.toLocaleString()} ₫</span>
                </div>
                <div className="flex justify-between text-sm text-vmg-red">
                  <span>Giảm giá</span>
                  <span className="font-bold">-{discount.toLocaleString()} ₫</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                  <span className="text-sm font-bold uppercase">Thành tiền</span>
                  <span className="text-2xl font-bold text-vmg-red">{total.toLocaleString()} ₫</span>
                </div>
                <button className="w-full py-4 bg-vmg-red text-white font-bold rounded uppercase tracking-widest text-sm mt-4 hover:bg-red-700 transition-colors shadow-md">
                  Xác nhận đặt hàng
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
