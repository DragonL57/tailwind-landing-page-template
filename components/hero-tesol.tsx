"use client";

import { useState } from "react";
import Link from "next/link";
import LogoBand from "./logo-band";
import PaymentSidebar from "./payment-sidebar";
import CourseContent from "./course-content";
import TesolBenefits from "./tesol-benefits";
import ConsultationForm from "./consultation-form";
import DealBanner from "./deal-banner";
import CourseCurriculum from "./course-curriculum";

export default function HeroTesol() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <>
    <section className="relative scroll-mt-24">
      {/* Decorative Effects */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-vmg-blue/10 rounded-full blur-3xl -z-10 animate-float-slow" style={{animationDelay: '0s'}}></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-vmg-green/10 rounded-full blur-3xl -z-10 animate-float-slow" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-vmg-blue/5 via-vmg-green/5 to-transparent rounded-full blur-2xl -z-10" style={{transform: 'translate(-50%, -50%)'}}></div>
      {/* Hero Section */}
      <div className="bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Main Headline */}
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-2 text-left">
                  Trở Thành Giáo Viên Tiếng Anh{" "}
                  <span className="text-vmg-blue">Chuyên Nghiệp</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8 text-left">
                  Chứng chỉ TESOL quốc tế được công nhận tại 150+ quốc gia. 100% online, linh hoạt thời gian, cam kết chất lượng.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="inline-flex items-center gap-2 bg-vmg-blue hover:bg-vmg-navy text-white font-bold px-8 py-4 rounded-lg transition-colors text-lg cursor-pointer"
                >
                  <span>Đăng Ký Ngay</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="inline-flex items-center gap-2 border-2 border-vmg-blue hover:bg-vmg-blue/10 text-vmg-blue font-semibold px-8 py-4 rounded-lg transition-colors text-lg cursor-pointer"
                >
                  Liên Hệ Tư Vấn
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-vmg-blue to-vmg-green"
                      />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-vmg-navy flex items-center justify-center text-white text-xs font-bold">
                      1K+
                    </div>
                  </div>
                </div>
                <div className="border-l border-gray-300 pl-6">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex text-vmg-green">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">4.9 / 5</span>
                  </div>
                  <p className="text-sm text-gray-600">Từ hơn 850 đánh giá</p>
                </div>
              </div>
            </div>

            {/* Right: Video Preview */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] relative bg-gradient-to-br from-vmg-blue via-vmg-blue to-vmg-green">
                  {!isVideoPlaying ? (
                    <div className="absolute inset-0">
                      <div 
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2400')] bg-cover bg-center opacity-70"
                        style={{ backgroundPosition: "center 40%" }}
                      />
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="absolute inset-0 flex flex-col items-center justify-center group"
                        aria-label="Play video"
                      >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <svg className="w-10 h-10 text-vmg-blue ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/FAXH0ab8tCY?autoplay=1&rel=0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="VMG TESOL Course Introduction"
                    />
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 70/30 Layout Section */}
    <section id="pricing" className="w-full bg-gray-50 border-t border-gray-200 py-12 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-10 gap-12">
        {/* Left: Course Content + Deal Banner + TESOL Benefits + Logo Band (70%) */}
        <div className="lg:col-span-7 space-y-12">
          <CourseContent />
          
          <TesolBenefits />

          {/* Deal Banner Section */}
          <DealBanner />
          
          
          <LogoBand />

          <CourseCurriculum />
        </div>
        {/* Right: Payment Sidebar (30%) */}
        <div className="lg:col-span-3">
          <div className="sticky top-24">
            <PaymentSidebar />
          </div>
        </div>
      </div>
    </section>

    {/* Consultation Form Section */}
    <ConsultationForm />
    </>
  );
}
