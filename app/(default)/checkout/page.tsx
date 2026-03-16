"use client";

import { useState, useEffect } from "react";
import { 
  CreditCard, 
  User, 
  ChevronRight,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn A",
    phone: "0912 345 678",
    gender: "OTHER",
    username: "vmthelong2004@gmail.com",
    email: "nguyenvana@gmail.com",
    password: "",
    confirmPassword: "",
    note: ""
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const originalPrice = 9900000;

  useEffect(() => {
    const applied = localStorage.getItem('appliedCoupon');
    if (applied === 'VMG') {
      setCoupon("VMG");
      setDiscount(originalPrice * 0.2);
      setIsCouponApplied(true);
    }
  }, []);

  const total = originalPrice - discount;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === "VMG") {
      setDiscount(originalPrice * 0.2);
      setIsCouponApplied(true);
      localStorage.setItem('appliedCoupon', 'VMG');
    } else {
      setDiscount(0);
      setIsCouponApplied(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration logic
    if (formData.password && formData.password === formData.confirmPassword) {
      setIsRegistered(true);
    } else {
      alert("Vui lòng kiểm tra lại mật khẩu");
    }
  };

  return (
    <div className="bg-[#f0f2f5] min-h-screen pt-28 pb-20 text-slate-800 font-sans">
      <div className="max-w-[1100px] mx-auto px-4">
        
        {/* Simple Header */}
        <div className="border-b border-slate-300 pb-6 mb-10">
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Thanh toán Đơn hàng</h1>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-2 font-semibold">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Xác nhận thông tin & Đăng ký</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Box 1: Account Registration */}
            <section className={`bg-white border transition-all duration-300 rounded shadow-sm ${isRegistered ? 'border-vmg-green/30 bg-vmg-green/5' : 'border-slate-200'}`}>
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> 1. Đăng ký thông tin tài khoản
                </h2>
                {isRegistered && (
                  <span className="text-[10px] font-bold text-vmg-green flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> ĐÃ XÁC NHẬN
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Họ và tên *</label>
                      <input 
                        type="text" 
                        required
                        disabled={isRegistered}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded text-sm outline-none focus:border-slate-800 disabled:bg-slate-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Số điện thoại *</label>
                      <input 
                        type="tel" 
                        required
                        disabled={isRegistered}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded text-sm outline-none focus:border-slate-800 disabled:bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Giới tính</label>
                      <select 
                        disabled={isRegistered}
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full h-11 px-4 bg-white border border-slate-300 rounded text-sm outline-none focus:border-slate-500 disabled:bg-slate-50"
                      >
                        <option value="MALE">NAM</option>
                        <option value="FEMALE">NỮ</option>
                        <option value="OTHER">KHÁC</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Tài khoản *</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required
                          disabled={isRegistered}
                          value={formData.username}
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                          className="w-full h-11 pl-4 pr-14 bg-white border border-slate-300 rounded text-sm outline-none focus:border-slate-500 disabled:bg-slate-50 font-semibold"
                          placeholder="username"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">@vmg</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Email *</label>
                    <input 
                      type="email" 
                      required
                      disabled={isRegistered}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 bg-white border border-slate-300 rounded text-sm outline-none focus:border-slate-800 disabled:bg-slate-50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Mật khẩu *</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          required
                          disabled={isRegistered}
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="w-full px-4 py-2 bg-white border border-slate-300 rounded text-sm outline-none focus:border-slate-800 disabled:bg-slate-50"
                          placeholder="••••••••••••"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Nhập lại mật khẩu *</label>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        disabled={isRegistered}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded text-sm outline-none focus:border-slate-800 disabled:bg-slate-50"
                        placeholder="Nhập lại mật khẩu"
                      />
                    </div>
                  </div>

                  {!isRegistered && (
                    <div className="pt-2">
                      <button 
                        type="submit"
                        className="w-full md:w-auto bg-slate-800 text-white px-8 py-2.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-black transition-all"
                      >
                        Đăng ký tài khoản
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </section>

            {/* Step 2: Payment - Disabled until registered */}
            <section className={`bg-white border border-slate-200 shadow-sm rounded transition-opacity duration-300 ${!isRegistered ? 'opacity-50 pointer-events-none select-none' : 'opacity-100'}`}>
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5" /> 2. Hình thức thanh toán
                </h2>
              </div>
              <div className="p-6">
                <div className="border-2 border-slate-800 rounded p-5 flex items-start gap-4">
                  <div className="mt-1">
                    <div className="w-5 h-5 rounded-full border-4 border-slate-800 bg-white shadow-sm"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Chuyển khoản Ngân hàng (Fast 24/7)</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Quý khách vui lòng chuyển khoản qua mã QR sẽ được hiển thị sau khi nhấn xác nhận.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className={`bg-white border border-slate-200 shadow-sm rounded transition-opacity duration-300 ${!isRegistered ? 'opacity-50 pointer-events-none select-none' : 'opacity-100'}`}>
              <div className="p-6">
                <label className="text-[11px] font-bold text-slate-600 uppercase">Ghi chú giao dịch</label>
                <textarea 
                  rows={2} 
                  value={formData.note} 
                  onChange={(e) => setFormData({...formData, note: e.target.value})} 
                  placeholder="Ghi chú thêm (nếu có)" 
                  className="w-full px-4 py-2.5 mt-1 bg-white border border-slate-300 focus:border-slate-800 outline-none rounded text-sm transition-all shadow-inner" 
                />
              </div>
            </section>
          </div>

          {/* Sidebar: Summary */}
          <div className="space-y-6">
            <section className="bg-white border-2 border-slate-800 shadow-lg rounded overflow-hidden">
              <div className="bg-slate-800 p-5 text-white">
                <h3 className="text-sm font-bold uppercase tracking-widest">Tóm tắt đơn hàng</h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-bold text-slate-900 text-base uppercase">TESOL E-PATH</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Chứng chỉ ALAP Anh Quốc</p>
                </div>

                <div className="space-y-3 py-4 border-y border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">Học phí gốc</span>
                    <span className="font-bold text-slate-900">{originalPrice.toLocaleString()} ₫</span>
                  </div>
                  {isCouponApplied && (
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-vmg-green font-bold text-xs uppercase">Ưu đãi</span>
                      <span className="font-bold text-vmg-green">-{discount.toLocaleString()} ₫</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã giảm giá</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={coupon} 
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())} 
                      className="flex-1 h-10 px-3 border border-slate-300 outline-none text-xs font-bold tracking-widest rounded"
                    />
                    <button onClick={handleApplyCoupon} className="h-10 px-4 bg-slate-800 text-white text-[10px] font-bold uppercase rounded transition-colors hover:bg-black">
                      {isCouponApplied ? 'OK' : 'NHẬP'}
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-end">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Tổng thanh toán</p>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900 tabular-nums">{total.toLocaleString()}</span>
                    <span className="text-sm font-bold text-slate-900 ml-1">₫</span>
                  </div>
                </div>

                <button 
                  disabled={!isRegistered}
                  className="w-full py-4 bg-vmg-red text-white font-black uppercase tracking-widest text-xs shadow-md rounded-sm mt-2 disabled:bg-slate-300 disabled:shadow-none transition-all hover:bg-red-700"
                >
                  Xác nhận Thanh toán
                </button>

                <p className="text-[10px] text-slate-400 leading-relaxed text-center font-medium mt-2">
                  Bằng cách nhấn nút "Xác nhận", quý khách đồng ý với các <Link href="#" className="underline">Điều khoản</Link> và <Link href="#" className="underline">Chính sách bảo mật</Link>.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
