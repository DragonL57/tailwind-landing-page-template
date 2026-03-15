"use client";

import { useState } from "react";
import FadeSlideUp from "./fade-slide-up";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Play } from "lucide-react";
import Image from "next/image";

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

import Link from "next/link";

import FloatingPurchaseCTA from "./floating-purchase-cta";

export default function HeroTesol() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <>
    <div className="relative w-full overflow-hidden bg-white h-auto lg:h-[calc(100vh-64px)] lg:min-h-[600px] flex items-center mt-16 py-12 lg:py-0">
      {/* Background Silhouette Logo */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-100 pointer-events-none z-0 select-none">
        <img src="/images/Picture1.png" alt="" className="w-full h-full object-contain opacity-10 grayscale" />
      </div>

      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-vmg-blue-soft/30 -skew-x-12 translate-x-32 -z-10 hidden lg:block"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-10 relative w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content (6 cols) */}
          <div className="lg:col-span-6 space-y-8 relative z-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-vmg-navy leading-[1.1] tracking-tighter">
                Nâng tầm sự nghiệp <br />
                <span className="text-vmg-blue">Giảng dạy</span> Tiếng Anh
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-vmg-navy/80 leading-relaxed max-w-xl">
                Sở hữu chứng chỉ <span className="font-bold text-vmg-blue">ALAP quốc tế</span> giá trị toàn cầu. 
                Học 100% Online với mentor chuyên môn đồng hành sát sao.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                "Chứng chỉ Anh Quốc ALAP",
                "100% Online linh hoạt",
                "Mentor hỗ trợ 1-1",
                "Cam kết việc làm"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-vmg-green/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-vmg-green" strokeWidth={4} />
                  </div>
                  <span className="text-sm lg:text-base font-semibold text-vmg-navy/70">{item}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/checkout"
                className="bg-vmg-red hover:bg-vmg-red/90 text-white shadow-xl shadow-vmg-red/20 group h-14 px-8 rounded-xl flex items-center justify-center font-bold uppercase tracking-widest text-sm transition-all"
              >
                Mua ngay 
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Button variant="ghost" size="lg" className="border-2 border-vmg-blue/20 text-vmg-blue hover:bg-vmg-blue/5">
                Tải Brochure
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 flex items-center gap-6 border-t border-gray-100">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-11 h-11 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} alt="student" />
                  </div>
                ))}
              </div>
              <div className="text-sm lg:text-base">
                <div className="flex items-center gap-1 mb-0.5">
                  <div className="flex text-vmg-green">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 lg:w-5 lg:h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <span className="font-bold">4.9/5</span>
                </div>
                <p className="text-gray-500 font-medium">+2,000 học viên tin tưởng</p>
              </div>
            </div>
          </div>

          {/* Right: Video & Visuals (6 cols) */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">
            <div className="relative group w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border-8 border-white bg-gray-100">
                {!isVideoPlaying ? (
                  <>
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2400"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt="TESOL Course"
                    />
                    <div className="absolute inset-0 bg-vmg-navy/20 group-hover:bg-vmg-navy/30 transition-colors flex items-center justify-center">
                      <button 
                        onClick={() => setIsVideoPlaying(true)}
                        className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transform transition-all hover:scale-110 active:scale-95 group/play"
                      >
                        <Play className="w-10 h-10 text-vmg-blue fill-current ml-1" />
                      </button>
                    </div>
                  </>
                ) : (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/FAXH0ab8tCY?autoplay=1&rel=0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    {/* Content Section */}
    <FadeSlideUp id="pricing" className="w-full bg-white section-padding scroll-mt-24 relative overflow-hidden">
      {/* Background Silhouette Logo */}
      <div className="absolute -right-32 -bottom-32 w-[600px] h-[600px] opacity-100 pointer-events-none z-0 select-none">
        <img src="/images/Picture1.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="w-full px-4 sm:px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto space-y-16">
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

    {/* Consolidated Floating Purchase CTA (Mobile Bar & Desktop Card) */}
    <FloatingPurchaseCTA />

    {/* Consultation Form Section */}
    <ConsultationForm />
    </>
  );
}
