"use client";

import { useState } from "react";
import Image from 'next/image';
import FadeSlideUp from "./fade-slide-up";

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FadeSlideUp id="contact" className="relative section-padding overflow-hidden scroll-mt-24 bg-white">
      {/* Background Silhouette Logo */}
      <div className="absolute -right-40 -bottom-40 w-[600px] h-[600px] opacity-100 pointer-events-none -z-10 select-none">
        <Image src="/images/Picture1.png" alt="" width={600} height={600} className="w-full h-full object-contain" />
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-vmg-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-vmg-green/5 rounded-full blur-3xl"></div>

      <div className="w-full px-4 sm:px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-vmg-navy mb-4">
              Đăng Ký Tư Vấn Miễn Phí
            </h2>
            <p className="text-xl text-vmg-navy/60 max-w-2xl mx-auto font-medium">
              Để lại thông tin, chúng tôi sẽ liên hệ tư vấn chi tiết về chương trình TESOL phù hợp với bạn
            </p>
          </div>

          {/* Form */}
          <div className="bg-vmg-blue-soft rounded-[2.5rem] shadow-2xl p-8 md:p-12 border-2 border-vmg-blue/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-vmg-navy mb-2">
                    Họ và tên <span className="text-vmg-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-vmg-blue/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-vmg-blue/20 focus:border-vmg-blue/40 transition-all bg-white text-vmg-navy"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-vmg-navy mb-2">
                    Số điện thoại <span className="text-vmg-red">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-vmg-blue/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-vmg-blue/20 focus:border-vmg-blue/40 transition-all bg-white text-vmg-navy"
                    placeholder="0912 345 678"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-vmg-navy mb-2">
                  Email <span className="text-vmg-red">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-vmg-blue/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-vmg-blue/20 focus:border-vmg-blue/40 transition-all bg-white text-vmg-navy"
                  placeholder="email@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-vmg-navy mb-2">
                  Nội dung cần tư vấn
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-vmg-blue/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-vmg-blue/20 focus:border-vmg-blue/40 transition-all resize-none bg-white text-vmg-navy"
                  placeholder="Cho chúng tôi biết bạn quan tâm về điều gì..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-vmg-red hover:bg-vmg-red/90 text-white font-black py-5 rounded-xl shadow-xl shadow-vmg-red/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                <span>Gửi Thông Tin Đăng Ký</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              {/* Privacy note */}
              <p className="text-sm text-vmg-navy/40 text-center font-medium">
                Thông tin của bạn sẽ được bảo mật tuyệt đối và chỉ dùng cho mục đích tư vấn
              </p>
            </form>
          </div>
        </div>
      </div>
    </FadeSlideUp>

  );
}
