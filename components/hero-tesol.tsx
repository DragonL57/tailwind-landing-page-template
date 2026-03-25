"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Image from "next/image";

import LogoBand from "./logo-band";
import CourseContent from "./course-content";
import TesolBenefits from "./tesol-benefits";
import ConsultationForm from "./consultation-form";
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
  const driveFileId = "1NfaN8Gjs0DcueFvt0KHaWH3DP-SanaDK";
  // Use the local thumbnail as the primary to avoid Drive's unreliable direct-link thumbnail service

  return (
    <>
    <div id="hero-section" className="relative w-full overflow-hidden bg-white h-auto lg:h-[calc(100vh-64px)] lg:min-h-[600px] flex items-center mt-20 py-12 lg:py-0">
      {/* Background Silhouette Logo */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-100 pointer-events-none z-0 select-none">
        <Image src="/images/Picture1.png" alt="" width={800} height={800} className="w-full h-full object-contain opacity-10 grayscale" />
      </div>

      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-vmg-blue-soft/30 -skew-x-12 translate-x-32 -z-10 hidden lg:block"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-10 relative w-full">
        <div className="grid lg:grid-cols-12 gap-x-8 lg:gap-x-16 items-start lg:items-center">
          
          {/* 1. Heading Block */}
          <div className="lg:col-span-5 order-1 space-y-5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-vmg-navy leading-[1.15] tracking-tight">
              Trở thành giáo viên tiếng Anh <span className="text-vmg-blue">chuyên nghiệp</span>
            </h1>
            
            <p className="text-base md:text-lg text-vmg-navy/70 leading-relaxed max-w-xl">
              Chứng chỉ <span className="font-bold text-vmg-blue">TESOL quốc tế</span> được công nhận tại 150+ quốc gia. 
              100% online - mentor đồng hành - livestream , cam kết chất lượng.
            </p>
          </div>

          {/* 2. Video Block - Order 2 on mobile, pushed to right on desktop */}
          <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-4 order-2 mt-8 lg:mt-0 relative group w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border-8 border-white bg-vmg-navy aspect-video w-full">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src={`https://drive.google.com/file/d/${driveFileId}/preview`}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>

          {/* 3. Feature Grid (Bullet points) */}
          <div className="lg:col-span-5 order-3 mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {[
              "Lộ trình học cá nhân hóa",
              "Chứng chỉ ALAP quốc tế",
              "Mô hình Self-paced & Live Sessions",
              "100% online, mentor đồng hành"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-vmg-green/15 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-vmg-green" strokeWidth={4} />
                </div>
                <span className="text-sm lg:text-[0.95rem] font-medium text-vmg-navy/80">{item}</span>
              </div>
            ))}
          </div>

          {/* 4. Actions Block */}
          <div className="lg:col-span-5 order-4 mt-8 lg:mt-8 flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/checkout"
              className="bg-vmg-red hover:bg-vmg-red/90 text-white shadow-lg shadow-vmg-red/10 group h-12 rounded-xl flex items-center justify-center font-bold uppercase tracking-wider text-xs transition-all w-full sm:w-48"
            >
              Mua ngay 
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Button 
              variant="ghost" 
              className="h-12 border-2 border-vmg-blue/10 text-vmg-blue hover:bg-vmg-blue/5 text-xs font-bold uppercase tracking-wider rounded-xl w-full sm:w-48"
            >
              Tải e-book
            </Button>
          </div>

          {/* 5. Trust Badges Block */}
          <div className="lg:col-span-5 order-5 mt-10 lg:mt-12 pt-8 flex items-center gap-6 border-t border-gray-100">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-11 h-11 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-sm">
                  <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} alt="student" width={44} height={44} className="w-full h-full rounded-full" />
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
      </div>
    </div>

    {/* Content Section */}
    <div id="pricing" className="w-full bg-white scroll-mt-24 relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 relative z-10 py-16">
        <div className="max-w-[1200px] mx-auto">
          <CourseContent />
        </div>
      </div>

      <TesolBenefits />

      <div className="w-full px-4 sm:px-6 relative z-10 py-16">
        <div className="max-w-[1200px] mx-auto space-y-16">
          <FaqSection />
        </div>
      </div>

      <PricingSection />

      <div className="w-full px-4 sm:px-6 relative z-10 py-16">
        <div className="max-w-[1200px] mx-auto space-y-16">
          <LogoBand />

          <InstructorSection />

          <CertificateCeremonySection />
          
          <CourseCurriculum />
        </div>
      </div>
    </div>

    <TestimonialsSection />

    <RelatedCourses />

    {/* Consolidated Floating Purchase CTA (Mobile Bar & Desktop Card) */}
    <FloatingPurchaseCTA />

    {/* Consultation Form Section */}
    <ConsultationForm />
    </>
  );
}
