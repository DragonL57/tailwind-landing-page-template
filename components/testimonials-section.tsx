"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import FadeSlideUp from "./fade-slide-up";

export default function TestimonialsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const testimonials = [
    {
      quote:
        "Tấm bằng ALAP giúp mình tự tin ứng tuyển vào các trường quốc tế hàng đầu. Phương pháp dạy Demo thực tế, sát nhu cầu công việc!",
      author: "Nguyễn Thu Hà",
      role: "Giáo viên Tiếng Anh Quốc tế",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent("Nguyễn Thu Hà")}`,
      stars: 5,
      rotation: "-rotate-12",
    },
    {
      quote:
        "Ấn tượng nhất với tư duy giáo dục hiện đại và cách thiết kế giáo án chuẩn quốc tế. Khóa học tại VMG thực sự vượt mong đợi.",
      author: "Trần Anh Tuấn",
      role: "Học viên tốt nghiệp TESOL",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent("Trần Anh Tuấn")}`,
      stars: 5,
      rotation: "rotate-6",
    },
    {
      quote:
        "Sau khóa học, mình đã nắm vững các kỹ thuật sư phạm chuyên sâu để quản lý lớp học hiệu quả và chuyên nghiệp hơn rất nhiều.",
      author: "Lê Minh Hương",
      role: "Giáo viên Trung tâm Anh ngữ",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent("Lê Minh Hương")}`,
      stars: 5,
      rotation: "-rotate-3",
    },
    {
      quote:
        "Đào tạo rất thực tế, tập trung vào kỹ năng giảng dạy hiện đại. Từ một người mới, mình đã có thể tự tin đứng lớp Demo đầy thuyết phục.",
      author: "Hoàng Đức Anh",
      role: "Giảng viên tiếng Anh Tự do",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent("Hoàng Đức Anh")}`,
      stars: 5,
      rotation: "rotate-8",
    },
    {
      quote:
        "Giảng viên nhiệt tình và môi trường chuyên nghiệp giúp mình hoàn thiện kỹ năng sư phạm và sở hữu chứng chỉ ALAP giá trị toàn cầu.",
      author: "Phạm Gia Linh",
      role: "Giáo viên tiếng Anh THCS",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent("Phạm Gia Linh")}`,
      stars: 5,
      rotation: "-rotate-6",
    },
  ];

  return (
    <FadeSlideUp className="section-padding bg-vmg-blue relative overflow-hidden">
      {/* Background Silhouette Logo */}
      <div className="absolute -right-32 -bottom-32 w-[600px] h-[600px] opacity-100 pointer-events-none z-0 select-none">
        <img src="/images/Picture1.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="w-full px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Học Viên Nói Gì Về Chúng Tôi</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-medium">
            Lắng nghe chia sẻ từ những giáo viên đã thay đổi sự nghiệp cùng <span className="text-white font-bold underline decoration-vmg-green underline-offset-4">VMG TESOL</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 max-w-7xl mx-auto min-h-[400px]">
          {testimonials.map((testimonial, index) => {
            const isCorner = index === 0 || index === 4;
            const isCenter = index === 1 || index === 2 || index === 3;

            return (
              <div
                key={index}
                className={`relative transition-all duration-500 ${testimonial.rotation} opacity-100 ${
                  isCorner
                    ? hoveredCard === index
                      ? "scale-110 z-20"
                      : "scale-95 z-10"
                    : "scale-100 z-15"
                } ${hoveredCard === index ? "rotate-0" : ""}`}
                style={{
                  transform: hoveredCard === index ? "rotate(0deg) scale(1.1)" : "",
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`bg-white rounded-2xl p-6 w-80 h-72 transition-all duration-500 ${
                    hoveredCard === index && isCorner
                      ? "shadow-2xl border-2 border-vmg-blue ring-4 ring-vmg-blue/20"
                      : isCenter
                        ? "shadow-xl border border-vmg-blue/10"
                        : "shadow-lg border border-vmg-blue/5"
                  }`}
                >
                  {/* Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-vmg-navy mb-6 text-base leading-relaxed line-clamp-4 font-medium">"{testimonial.quote}"</p>

                  {/* Author */}
                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0 border-2 border-vmg-blue">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-vmg-red text-sm">{testimonial.author}</div>
                      <div className="text-vmg-navy/50 text-xs font-semibold">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-3xl font-black text-white tracking-tight uppercase">Uy Tín & Chất Lượng</h3>
        </div>
      </div>
    </FadeSlideUp>
  );
}
