"use client";

import { useState, useEffect } from "react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitMessage("✓ Đã gửi thông tin thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.");
    
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSubmitMessage("");
      setShowPopup(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div 
        className="fixed right-4 z-[60] flex flex-col items-end gap-2 transition-all duration-500 ease-in-out"
        style={{ bottom: 'calc(24px + var(--purchase-cta-offset, 0px))' }}
      >
        {/* Contact Options - Expanding upward */}
        {isOpen && (
          <div className="flex flex-col gap-2 animate-scaleIn">
            <button
              onClick={() => {
                setShowPopup(true);
                setIsOpen(false);
              }}
              className="group flex items-center gap-2 bg-white hover:bg-red-50 rounded-full shadow-lg hover:shadow-xl transition-all pl-3 pr-4 py-2 border border-gray-200"
            >
              <div className="w-8 h-8 bg-vmg-red rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-vmg-red/20">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 whitespace-nowrap text-sm">Đăng ký tư vấn</span>
            </button>

            <a
              href="https://zalo.me/your-zalo-number"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-white hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transition-all pl-3 pr-4 py-2 border border-gray-200"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.738 4.304 1.986 5.972L2.317 21.69a.5.5 0 00.638.638l3.718-1.669A9.958 9.958 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm3.5 13.5h-7a.5.5 0 010-1h7a.5.5 0 010 1zm0-3h-7a.5.5 0 010-1h7a.5.5 0 010 1zm0-3h-7a.5.5 0 010-1h7a.5.5 0 010 1z"/>
                </svg>
              </div>
              <span className="font-semibold text-gray-800 whitespace-nowrap text-sm">Zalo</span>
            </a>

            <a
              href="https://m.me/your-facebook-page"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-white hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transition-all pl-3 pr-4 py-2 border border-gray-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.45 5.51 3.717 7.197V22l3.487-1.912c.93.257 1.915.399 2.796.399 5.523 0 10-4.145 10-9.244C22 6.145 17.523 2 12 2zm.993 12.416l-2.558-2.73-4.993 2.73 5.491-5.827 2.62 2.73 4.931-2.73-5.491 5.827z"/>
                </svg>
              </div>
              <span className="font-semibold text-gray-800 whitespace-nowrap text-sm">Messenger</span>
            </a>
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center"
          aria-label="Open contact menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.45 5.51 3.717 7.197V22l3.487-1.912c.93.257 1.915.399 2.796.399 5.523 0 10-4.145 10-9.244C22 6.145 17.523 2 12 2zm.993 12.416l-2.558-2.73-4.993 2.73 5.491-5.827 2.62 2.73 4.931-2.73-5.491 5.827z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Consultation Form Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform animate-scaleIn text-vmg-navy">
            {/* Header */}
            <div className="sticky top-0 bg-vmg-navy p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Đăng Ký Tư Vấn Miễn Phí
                  </h3>
                  <p className="text-white/70 text-sm">
                    Để lại thông tin, chúng tôi sẽ liên hệ tư vấn chi tiết
                  </p>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-vmg-blue outline-none transition-all"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-vmg-blue outline-none transition-all"
                      placeholder="0912 345 678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-vmg-blue outline-none transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nội dung cần tư vấn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-vmg-blue outline-none transition-all resize-none"
                    placeholder="Cho chúng tôi biết bạn quan tâm về điều gì..."
                  />
                </div>

                {submitMessage && (
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium">
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-vmg-red hover:bg-vmg-red/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                >
                  Gửi Thông Tin Đăng Ký
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
