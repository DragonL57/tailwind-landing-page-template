"use client";

import { useCart } from "@/context/cart-context";

interface CartModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export default function CartModal({ isOpen, onCloseAction }: CartModalProps) {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onCloseAction}
      />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-vmg-navy to-vmg-blue px-6 py-5 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Giỏ hàng</h2>
                    <p className="text-sm text-white/80">{itemCount} sản phẩm</p>
                  </div>
                </div>
                <button
                  onClick={onCloseAction}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h3>
                  <p className="text-gray-600 mb-6">Bạn chưa có khóa học nào trong giỏ hàng</p>
                  <button
                    onClick={onCloseAction}
                    className="bg-vmg-blue hover:bg-vmg-navy text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Khám phá khóa học
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border-2 border-gray-100 hover:border-vmg-blue/30 rounded-xl p-4 transition-all group"
                    >
                      <div className="flex gap-4">
                        {/* Image */}
                        {item.image && (
                          <div className="w-20 h-20 bg-gradient-to-br from-vmg-navy to-vmg-blue rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain filter brightness-0 invert"
                            />
                          </div>
                        )}

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-vmg-blue transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl font-bold text-vmg-blue">
                              ₫{item.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500">x{item.quantity}</span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-md bg-white border border-gray-200 hover:border-vmg-blue hover:bg-vmg-blue hover:text-white flex items-center justify-center transition-all font-bold"
                              >
                                -
                              </button>
                              <span className="w-10 text-center font-bold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-md bg-white border border-gray-200 hover:border-vmg-blue hover:bg-vmg-blue hover:text-white flex items-center justify-center transition-all font-bold"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-medium">Tổng phụ:</span>
                        <span className="text-lg font-bold text-vmg-navy">
                          ₫{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Checkout Section */}
            {items.length > 0 && (
              <div className="border-t-2 border-gray-200 bg-gray-50 p-6 space-y-4 flex-shrink-0">
                {/* Total */}
                <div className="bg-white rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính:</span>
                    <span className="font-semibold">₫{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển:</span>
                    <span className="font-semibold text-vmg-green">Miễn phí</span>
                  </div>
                  <div className="border-t-2 border-dashed border-gray-200 pt-2 flex justify-between items-baseline">
                    <span className="text-lg font-bold text-gray-900">Tổng cộng:</span>
                    <span className="text-3xl font-bold text-vmg-blue">
                      ₫{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button className="w-full bg-vmg-blue hover:bg-vmg-navy text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                    Thanh Toán Ngay
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
                        clearCart();
                      }
                    }}
                    className="w-full border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-500 hover:bg-red-50 font-semibold py-3 rounded-xl transition-all"
                  >
                    Xóa giỏ hàng
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
  );
}
