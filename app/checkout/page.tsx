"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { validateCoupon, getCouponDaysRemaining, isCouponValid, Coupon } from "@/lib/coupons";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{ coupon: Coupon; discount: number } | null>(null);
  const [voucherMessage, setVoucherMessage] = useState("");
  const [voucherError, setVoucherError] = useState(false);
  const [showVATForm, setShowVATForm] = useState(false);
  const [showAlternateReceiver, setShowAlternateReceiver] = useState(false);

  const daysRemaining = getCouponDaysRemaining();
  const couponStillValid = isCouponValid();
  const [hasRegistered, setHasRegistered] = useState(false);
  const [revealedCode, setRevealedCode] = useState("");

  // Check if user registered from deal banner
  useEffect(() => {
    const earlyBirdPhone = localStorage.getItem('earlyBirdPhone');
    const appliedCoupon = localStorage.getItem('appliedCoupon');
    if (earlyBirdPhone && appliedCoupon) {
      setHasRegistered(true);
      setRevealedCode(appliedCoupon);
      setVoucherCode(appliedCoupon);
    }
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    note: "",
    // Alternate receiver
    altName: "",
    altPhone: "",
    // VAT info
    companyName: "",
    taxCode: "",
    companyAddress: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyVoucher = () => {
    setVoucherMessage("");
    setVoucherError(false);

    const result = validateCoupon(voucherCode, total, formData.phone);

    if (result.valid && result.coupon && result.discount !== undefined) {
      setAppliedVoucher({ coupon: result.coupon, discount: result.discount });
      setVoucherMessage(result.message);
      setVoucherError(false);
      
      // Store coupon usage with phone number
      const couponUsage = {
        code: result.coupon.code,
        phone: formData.phone,
        appliedAt: new Date().toISOString(),
        orderTotal: total,
      };
      localStorage.setItem('lastCouponUsage', JSON.stringify(couponUsage));
    } else {
      setVoucherError(true);
      setVoucherMessage(result.message);
      setAppliedVoucher(null);
    }
  };

  const discount = appliedVoucher ? total * appliedVoucher.discount : 0;
  const finalTotal = total - discount;

  const handleCheckout = () => {
    if (!formData.fullName || !formData.phone) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Here you would send order to backend
    alert(`Đặt hàng thành công!\nTổng tiền: ₫${finalTotal.toLocaleString()}\nPhương thức: ${paymentMethod}`);
    clearCart();
    router.push("/");
  };

  const paymentMethods = [
    { id: "cod", name: "Thanh toán khi nhận hàng", icon: "💵" },
    { id: "zalopay", name: "Thanh toán qua ZaloPay", icon: "📱" },
    { id: "momo", name: "Ví Momo", icon: "🎀" },
    { id: "vnpay", name: "Ví điện tử VNPAY", icon: "💳" },
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <button
            onClick={() => router.push("/tesolmooc")}
            className="bg-vmg-blue hover:bg-vmg-navy text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-vmg-blue font-medium mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại
          </button>
          <h1 className="text-3xl font-bold text-vmg-navy mb-2">Thanh toán</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
              <h2 className="text-xl font-bold text-vmg-navy mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-vmg-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Thông tin học viên
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ tên của bạn"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    pattern="[0-9]{10,11}"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập email của bạn"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Nhập địa chỉ"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="haiphong">Hải Phòng</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú</label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Nhập ghi chú"
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Alternate Receiver */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showAlternateReceiver}
                    onChange={(e) => setShowAlternateReceiver(e.target.checked)}
                    className="w-5 h-5 text-vmg-blue border-2 border-gray-300 rounded focus:ring-2 focus:ring-vmg-blue/20"
                  />
                  <span className="font-semibold text-gray-700 group-hover:text-vmg-blue transition-colors">
                    Gọi người khác nhận hàng
                  </span>
                </label>

                {showAlternateReceiver && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Họ tên người nhận</label>
                      <input
                        type="text"
                        name="altName"
                        value={formData.altName}
                        onChange={handleInputChange}
                        placeholder="Nhập họ tên"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">SĐT người nhận</label>
                      <input
                        type="tel"
                        name="altPhone"
                        value={formData.altPhone}
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* VAT Invoice */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showVATForm}
                    onChange={(e) => setShowVATForm(e.target.checked)}
                    className="w-5 h-5 text-vmg-blue border-2 border-gray-300 rounded focus:ring-2 focus:ring-vmg-blue/20"
                  />
                  <span className="font-semibold text-gray-700 group-hover:text-vmg-blue transition-colors">
                    Xuất hóa đơn VAT
                  </span>
                </label>

                {showVATForm && (
                  <div className="mt-4 grid grid-cols-1 gap-4 pl-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tên công ty</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Nhập tên công ty"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Mã số thuế</label>
                      <input
                        type="text"
                        name="taxCode"
                        value={formData.taxCode}
                        onChange={handleInputChange}
                        placeholder="Nhập mã số thuế"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ công ty</label>
                      <input
                        type="text"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ công ty"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
              <h2 className="text-xl font-bold text-vmg-navy mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-vmg-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Hình thức thanh toán
              </h2>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? "border-vmg-blue bg-vmg-blue/5"
                        : "border-gray-200 hover:border-vmg-blue/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-vmg-blue focus:ring-2 focus:ring-vmg-blue/20"
                    />
                    <span className="text-3xl">{method.icon}</span>
                    <span className="font-semibold text-gray-900">{method.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Cart Items */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-vmg-navy">Giỏ hàng</h2>
                  <span className="bg-vmg-blue text-white text-sm font-bold px-3 py-1 rounded-full">
                    {items.length} sản phẩm
                  </span>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                      {item.image && (
                        <div className="w-20 h-20 bg-gradient-to-br from-vmg-navy to-vmg-blue rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain filter brightness-0 invert"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">SL: {item.quantity}</span>
                          <span className="font-bold text-vmg-blue">₫{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Voucher */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-vmg-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  Mã giảm giá EARLY BIRD
                </h3>
                
                {/* Coupon Info Banner */}
                <div className="mb-4 p-4 bg-gradient-to-r from-vmg-blue/10 to-vmg-navy/10 border-2 border-vmg-blue/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-vmg-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      {hasRegistered ? (
                        <>
                          <p className="font-bold text-vmg-navy mb-1">{revealedCode}</p>
                          <p className="text-sm text-gray-700 mb-2">
                            🎉 Giảm ngay <span className="font-bold text-vmg-blue">5%</span> cho khóa học từ <span className="font-bold">₫5.000.000</span>
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-bold text-vmg-navy mb-1">Ưu đãi EARLY BIRD</p>
                          <p className="text-sm text-gray-700 mb-2">
                            🎁 Kéo xuống và <span className="font-bold text-vmg-blue">đăng ký SĐT</span> để nhận mã giảm <span className="font-bold">5%</span>
                          </p>
                        </>
                      )}
                      <div className="flex items-center gap-2 text-xs">
                        {couponStillValid ? (
                          <>
                            <span className="px-2 py-1 bg-green-100 text-green-700 font-semibold rounded">
                              ⏰ Còn {daysRemaining} ngày
                            </span>
                            <span className="text-gray-600">
                              (Thanh toán trước ngày 20 hàng tháng)
                            </span>
                          </>
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-700 font-semibold rounded">
                            ⚠️ Đã hết hạn - Chờ tháng sau
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => {
                      setVoucherCode(e.target.value.toUpperCase());
                      setVoucherMessage("");
                      setVoucherError(false);
                    }}
                    placeholder={hasRegistered ? revealedCode : "Đăng ký SĐT để nhận mã"}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-vmg-blue focus:outline-none uppercase"
                    disabled={!couponStillValid || !hasRegistered}
                  />
                  <button
                    onClick={handleApplyVoucher}
                    disabled={!couponStillValid || !hasRegistered}
                    className="bg-vmg-blue hover:bg-vmg-navy text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Áp dụng
                  </button>
                </div>

                {/* Validation Messages */}
                {voucherMessage && (
                  <div className={`p-3 rounded-lg flex items-start gap-2 ${
                    voucherError 
                      ? 'bg-red-50 border border-red-200' 
                      : 'bg-green-50 border border-green-200'
                  }`}>
                    <svg 
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        voucherError ? 'text-red-600' : 'text-green-600'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      {voucherError ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      )}
                    </svg>
                    <p className={`text-sm font-semibold ${
                      voucherError ? 'text-red-800' : 'text-green-800'
                    }`}>
                      {voucherMessage}
                    </p>
                  </div>
                )}

                {/* Applied Voucher */}
                {appliedVoucher && (
                  <div className="mt-3 p-4 bg-green-50 border-2 border-green-300 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🎉</span>
                        <div>
                          <p className="font-bold text-green-900">{appliedVoucher.coupon.name}</p>
                          <p className="text-xs text-green-700">Mã: {appliedVoucher.coupon.code}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setAppliedVoucher(null);
                          setVoucherMessage("");
                          setVoucherCode("");
                        }}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm"
                      >
                        Xóa
                      </button>
                    </div>
                    <p className="text-sm text-green-800">
                      Tiết kiệm: <span className="font-bold">₫{discount.toLocaleString()}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Chi tiết thanh toán</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span className="font-semibold">₫{total.toLocaleString()}</span>
                  </div>
                  {appliedVoucher && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá</span>
                      <span className="font-semibold">-₫{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t-2 border-dashed border-gray-200 pt-3 flex justify-between items-baseline">
                    <span className="text-lg font-bold text-gray-900">Thành tiền</span>
                    <span className="text-3xl font-bold text-vmg-blue">₫{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {appliedVoucher && (
                  <p className="text-sm text-green-600 font-medium mb-4">
                    🎉 Đã giảm ₫{discount.toLocaleString()} trên giá gốc
                  </p>
                )}

                <button
                  onClick={handleCheckout}
                  className="w-full bg-vmg-green hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
