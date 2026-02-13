"use client";

import { useState } from "react";
import Link from "next/link";
import PaymentSidebar from "@/components/payment-sidebar";
import ConsultationForm from "@/components/consultation-form";

export default function GiaoTiep11Page() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const industries = [
    {
      icon: "✈️",
      title: "Du lịch & Lữ hành",
      description: "Giao tiếp chuyên nghiệp với khách hàng quốc tế, xử lý tình huống thực tế",
      topics: ["Check-in & Booking", "Tour Guide Language", "Customer Service"]
    },
    {
      icon: "🏨",
      title: "Khách sạn & Nhà hàng",
      description: "Phục vụ khách hàng, xử lý yêu cầu đặc biệt, tạo trải nghiệm tuyệt vời",
      topics: ["Reception Skills", "F&B Service", "Complaint Handling"]
    },
    {
      icon: "💼",
      title: "Kinh doanh & Thương mại",
      description: "Đàm phán, thuyết trình, email chuyên nghiệp trong môi trường quốc tế",
      topics: ["Negotiations", "Presentations", "Business Emails"]
    },
    {
      icon: "💻",
      title: "Công nghệ & IT",
      description: "Giao tiếp kỹ thuật, làm việc với đội ngũ quốc tế, trình bày sản phẩm",
      topics: ["Technical Discussions", "Remote Collaboration", "Product Demos"]
    },
    {
      icon: "🏥",
      title: "Y tế & Chăm sóc sức khỏe",
      description: "Tư vấn bệnh nhân, giải thích chuyên môn, giao tiếp nhân văn",
      topics: ["Patient Communication", "Medical Terminology", "Care Instructions"]
    },
    {
      icon: "📚",
      title: "Giáo dục & Đào tạo",
      description: "Giảng dạy, hướng dẫn học viên, tạo môi trường học tập quốc tế",
      topics: ["Classroom Management", "Student Engagement", "Academic Discussion"]
    }
  ];

  const courseFeatures = [
    {
      icon: "👥",
      title: "1-on-1 Cá nhân hóa 100%",
      description: "Lộ trình học được thiết kế riêng cho từng học viên dựa trên nhu cầu công việc thực tế"
    },
    {
      icon: "⏰",
      title: "Lịch học Linh hoạt",
      description: "Chọn khung giờ phù hợp với lịch làm việc của bạn, có thể sắp xếp ngay trong ngày"
    },
    {
      icon: "🎯",
      title: "Tập trung Kỹ năng Thực tế",
      description: "Luyện tập các tình huống công việc cụ thể, từ email đến cuộc họp quan trọng"
    },
    {
      icon: "📊",
      title: "Đánh giá & Phản hồi Chi tiết",
      description: "Báo cáo tiến độ sau mỗi buổi học, phân tích điểm mạnh và cần cải thiện"
    }
  ];

  const learningPath = [
    {
      step: "1",
      title: "Đánh giá Nhu cầu",
      description: "Xác định mục tiêu học tập, trình độ hiện tại và các tình huống giao tiếp cần thiết trong công việc"
    },
    {
      step: "2",
      title: "Thiết kế Lộ trình",
      description: "Giáo viên thiết kế chương trình học cá nhân hóa với nội dung và tình huống thực tế"
    },
    {
      step: "3",
      title: "Học & Thực hành",
      description: "Các buổi 1-on-1 tập trung luyện tập kỹ năng giao tiếp qua roleplay và tình huống thực tế"
    },
    {
      step: "4",
      title: "Áp dụng & Cải thiện",
      description: "Sử dụng ngay trong công việc, nhận phản hồi chi tiết và điều chỉnh lộ trình liên tục"
    }
  ];

  return (
    <>
      <section className="relative pt-24 pb-12 bg-gradient-to-br from-white via-vmg-blue/5 to-white">
        {/* Decorative Effects */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-vmg-blue/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-vmg-green/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/" className="text-vmg-blue hover:text-vmg-navy font-medium text-sm inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại trang chủ
            </Link>
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 mb-16">
            {/* Left: Content (70%) */}
            <div className="lg:col-span-7">
              {/* Hero Header */}
              <div className="mb-8">
                <div className="inline-block mb-4">
                  <span className="bg-vmg-green/10 text-vmg-green text-sm font-bold px-4 py-2 rounded-full">
                    🎯 GIAO TIẾP CHUYÊN NGÀNH 1-ON-1
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-vmg-navy mb-4 leading-tight">
                  Tiếng Anh Giao Tiếp 1-1
                  <span className="block text-vmg-blue mt-2">Cho Từng Chuyên Ngành</span>
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Học trực tiếp 1-on-1 với giáo viên chuyên ngành, tập trung 100% vào nhu cầu công việc thực tế của bạn
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white rounded-xl p-4 border-2 border-vmg-blue/20 text-center">
                    <div className="text-3xl font-bold text-vmg-blue">1:1</div>
                    <div className="text-sm text-gray-600">Cá nhân hóa</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-vmg-blue/20 text-center">
                    <div className="text-3xl font-bold text-vmg-blue">6+</div>
                    <div className="text-sm text-gray-600">Chuyên ngành</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-vmg-blue/20 text-center">
                    <div className="text-3xl font-bold text-vmg-blue">100%</div>
                    <div className="text-sm text-gray-600">Linh hoạt</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-vmg-blue/20 text-center">
                    <div className="text-3xl font-bold text-vmg-blue">∞</div>
                    <div className="text-sm text-gray-600">Thực hành</div>
                  </div>
                </div>

                {/* Video Preview */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 bg-gray-900">
                  {!isVideoPlaying ? (
                    <div className="relative aspect-video">
                      <img 
                        src="/images/VMG_LOGO.svg" 
                        alt="Preview" 
                        className="w-full h-full object-contain bg-gradient-to-br from-vmg-navy to-vmg-blue p-20"
                      />
                      <button 
                        onClick={() => setIsVideoPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center group"
                      >
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                          <svg className="w-10 h-10 text-vmg-blue ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                        title="Course Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Industries Section */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-vmg-navy mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-vmg-blue rounded-xl flex items-center justify-center text-white text-xl">📋</span>
                  Chuyên Ngành Đào Tạo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {industries.map((industry, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-vmg-blue hover:shadow-xl transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-vmg-blue to-vmg-navy rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                          {industry.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-vmg-navy mb-2">{industry.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{industry.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {industry.topics.map((topic, idx) => (
                              <span key={idx} className="text-xs bg-vmg-blue/10 text-vmg-blue px-3 py-1 rounded-full font-medium">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Features */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-vmg-navy mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-vmg-green rounded-xl flex items-center justify-center text-white text-xl">⭐</span>
                  Ưu Điểm Vượt Trội
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseFeatures.map((feature, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-vmg-blue/5 rounded-2xl p-6 border-2 border-vmg-blue/20">
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h3 className="text-xl font-bold text-vmg-navy mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Path */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-vmg-navy mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-vmg-blue rounded-xl flex items-center justify-center text-white text-xl">🚀</span>
                  Lộ Trình Học Tập
                </h2>
                <div className="space-y-4">
                  {learningPath.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-vmg-blue transition-all">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-vmg-blue to-vmg-navy rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-vmg-navy mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Note */}
              <div className="bg-gradient-to-r from-vmg-blue/10 to-vmg-green/10 rounded-2xl p-8 border-2 border-vmg-blue/20">
                <h3 className="text-2xl font-bold text-vmg-navy mb-4 flex items-center gap-3">
                  💰 Học phí linh hoạt theo gói
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-vmg-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span><strong>Gói 10 buổi:</strong> Phù hợp cho mục tiêu ngắn hạn</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-vmg-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span><strong>Gói 20 buổi:</strong> Cải thiện kỹ năng toàn diện</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-vmg-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span><strong>Gói 30+ buổi:</strong> Thành thạo giao tiếp chuyên môn</span>
                  </p>
                  <p className="text-sm text-vmg-blue mt-4 font-medium">
                    💡 Liên hệ tư vấn để nhận báo giá chi tiết và ưu đãi đặc biệt
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Payment Sidebar (30%) */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <PaymentSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <ConsultationForm />
    </>
  );
}
