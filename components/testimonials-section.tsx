"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import FadeSlideUp from "./fade-slide-up";

export default function TestimonialsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const testimonials = [
    {
      quote:
        "Tấm bằng ALAP quốc tế đã giúp mình tự tin ứng tuyển vào các trường quốc tế hàng đầu. Phương pháp dạy Demo thực hành cực kỳ sát thực tế!",
      author: "Nguyễn Thu Hà",
      role: "Giáo viên Tiếng Anh Quốc tế",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent("Nguyễn Thu Hà")}`,
      stars: 5,
      rotation: "-rotate-12",
    },
    {
      quote:
        "Mình ấn tượng nhất với tư duy giáo dục hiện đại và cách thiết kế giáo án chuẩn quốc tế. Khóa học TESOL tại VMG thực sự vượt mong đợi.",
      author: "Trần Anh Tuấn",
      role: "Học viên tốt nghiệp TESOL",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent("Trần Anh Tuấn")}`,
      stars: 5,
      rotation: "rotate-6",
    },
    {
      quote:
        "Trước đây mình dạy theo bản năng, nhưng sau khóa học, mình đã nắm vững các kỹ thuật sư phạm chuyên sâu để quản lý lớp học hiệu quả hơn.",
      author: "Lê Minh Hương",
      role: "Giáo viên Trung tâm Anh ngữ",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent("Lê Minh Hương")}`,
      stars: 5,
      rotation: "-rotate-3",
    },
    {
      quote:
        "Chương trình đào tạo rất thực tế, tập trung vào kỹ năng giảng dạy hiện đại. Từ một người mới, mình đã có thể tự tin đứng lớp Demo đầy thuyết phục.",
      author: "Hoàng Đức Anh",
      role: "Giảng viên tiếng Anh Tự do",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent("Hoàng Đức Anh")}`,
      stars: 5,
      rotation: "rotate-8",
    },
    {
      quote:
        "Sự hỗ trợ nhiệt tình từ giảng viên và môi trường học tập chuyên nghiệp đã giúp mình hoàn thiện kỹ năng sư phạm và sở hữu chứng chỉ ALAP giá trị.",
      author: "Phạm Gia Linh",
      role: "Giáo viên tiếng Anh THCS",
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent("Phạm Gia Linh")}`,
      stars: 5,
      rotation: "-rotate-6",
    },
  ];

  return (
    <FadeSlideUp className="section-padding bg-[#0038D1] relative overflow-hidden">
      <div className="w-full px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Học Viên Nói Gì Về Chúng Tôi</h2>
          <p className="text-lg md:text-xl text-[#B3C7F7] max-w-3xl mx-auto font-medium">
            Lắng nghe chia sẻ từ những giáo viên đã thay đổi sự nghiệp cùng <span className="text-white font-bold">VMG TESOL</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 max-w-7xl mx-auto min-h-[400px]">
          {testimonials.map((testimonial, index) => {
            const isCorner = index === 0 || index === 4;
            const isCenter = index === 1 || index === 2 || index === 3;

            return (
              <div
                key={index}
                className={`relative transition-all duration-500 ${testimonial.rotation} ${
                  isCorner
                    ? hoveredCard === index
                      ? "opacity-100 scale-110 z-20"
                      : "opacity-40 scale-95 z-10"
                    : "opacity-100 scale-100 z-15"
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
                      ? "shadow-2xl border-2 border-[#0038D1] ring-4 ring-[#0038D1]/20"
                      : isCenter
                        ? "shadow-xl border border-[#0038D1]/10"
                        : "shadow-lg border border-[#0038D1]/5"
                  }`}
                >
                  {/* Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[#0038D1] mb-6 text-base leading-relaxed line-clamp-4">"{testimonial.quote}"</p>

                  {/* Author */}
                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0 border-2 border-[#0038D1]">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-[#0038D1] text-sm">{testimonial.author}</div>
                      <div className="text-gray-500 text-xs">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <h3 className="text-3xl font-black text-white tracking-tight">Uy Tín & Chất Lượng</h3>
        </div>
      </div>
    </FadeSlideUp>
  );
}
