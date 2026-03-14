"use client";

import { useState } from "react";
import Link from "next/link";
import FadeSlideUp from "./fade-slide-up";
import LogoBand from "./logo-band";
import CourseContent from "./course-content";
import TesolBenefits from "./tesol-benefits";
import ConsultationForm from "./consultation-form";
import DealBanner from "./deal-banner";
import CourseCurriculum from "./course-curriculum";
import PricingSection from "./pricing-section";
import TestimonialsSection from "./testimonials-section";
import InstructorSection from "./instructor-section";
import RelatedCourses from "./related-courses";
import FaqSection from "./faq-section";
import CertificateCeremonySection from "./certificate-ceremony-section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function HeroTesol() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <>
    <FadeSlideUp className="relative scroll-mt-24">
      {/* Decorative Effects */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-vmg-blue/10 rounded-full blur-3xl -z-10 animate-float-slow" style={{animationDelay: '0s'}}></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-vmg-green/10 rounded-full blur-3xl -z-10 animate-float-slow" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-vmg-blue/5 via-vmg-green/5 to-transparent rounded-full blur-2xl -z-10" style={{transform: 'translate(-50%, -50%)'}}></div>
      {/* Hero Section */}
      <div className="bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Main Headline */}
              <div>
                <h1 id="hero-heading" className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-2">
                  Trở thành giáo viên tiếng Anh <span className="text-[#0038D1]">chuyên nghiệp</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8 text-left">
                  Chứng chỉ TESOL quốc tế được công nhận tại 150+ quốc gia. 100% online, mentor đồng hành, livestream hàng tuần, cam kết chất lượng.
                </p>
              </div>

              {/* Feature List */}
              <div className="flex flex-col gap-2 md:gap-3 mt-2">
                <div className="flex items-start gap-3">
                  <div className="pt-0.5">
                    <Check className="text-[#0038D1] h-5 w-5" />
                  </div>
                  <span className="text-gray-900 text-base leading-6 font-medium">
                    Lộ trình học cá nhân hóa, mentor đồng hành
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="pt-0.5">
                    <Check className="text-[#0038D1] h-5 w-5" />
                  </div>
                  <span className="text-gray-900 text-base leading-6 font-medium">
                    Chứng chỉ ALAP quốc tế, giá trị toàn cầu
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="pt-0.5">
                    <Check className="text-[#0038D1] h-5 w-5" />
                  </div>
                  <span className="text-gray-900 text-base leading-6 font-medium">
                    100% online, linh hoạt thời gian, cam kết việc làm
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row mt-4">
                <Button>Đăng ký ngay</Button>
                <Button variant="ghost">
                  Tìm hiểu thêm
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
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
    </FadeSlideUp>

    {/* Content Section */}
    <FadeSlideUp id="pricing" className="w-full bg-[#F8FAFF] section-padding scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <CourseContent />
          
          <LogoBand />
          <CertificateCeremonySection />
          <TesolBenefits />

          {/* Deal Banner Section */}
          <DealBanner />
          
          <InstructorSection />

          <CourseCurriculum />
        </div>
      </div>
    </FadeSlideUp>

    <PricingSection />

    <TestimonialsSection />

    <FaqSection />

    <RelatedCourses />

    {/* Mobile Bottom Payment Bar */}
    <div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4">
      <div className="max-w-md mx-auto flex items-center justify-between gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Tổng học phí</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#0038D1] tracking-tighter">9.900.000đ</span>
          </div>
        </div>
        <button className="flex-1 bg-[#75E04D] hover:bg-[#68C944] text-white font-black py-4 rounded-xl transition-all active:scale-95 shadow-xl shadow-[#75E04D]/25 text-sm uppercase tracking-wider">
          ĐĂNG KÝ NGAY
        </button>
      </div>
    </div>

    {/* Consultation Form Section */}
    <ConsultationForm />
    </>
  );
}
