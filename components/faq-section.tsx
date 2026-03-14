"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FadeSlideUp from "./fade-slide-up"
import { Plus } from "lucide-react"

type FAQItem = {
  question: string
  answer: React.ReactNode
}

const faqs: FAQItem[] = [
  {
    question: "Phương pháp học tập tại của TESOL E-path như thế nào?",
    answer: (
      <div className="space-y-3">
        <p>
          Chương trình áp dụng mô hình <span className="text-[#0038D1] font-semibold">Self-paced</span> kết hợp{" "}
          <span className="text-[#0038D1] font-semibold">Live Sessions</span>, giúp học viên linh hoạt thời gian nhưng vẫn đảm bảo kỷ luật và chất lượng học tập. Cụ thể:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Học viên có thể truy cập bài giảng, tài liệu và bài tập mọi lúc trên điện thoại hoặc laptop.</li>
          <li>Mỗi tuần, học viên tham gia buổi livestream trực tiếp với giảng viên để giải đáp thắc mắc và thảo luận chuyên sâu.</li>
          <li>Học viên được mentor hỗ trợ định hướng, theo sát tiến độ, tránh cảm giác lạc lõng trong môi trường online.</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Chương trình TESOL E-path có yêu cầu trình độ tiếng Anh đầu vào không?",
    answer: (
      <div className="space-y-3">
        <p>
          Chương trình không bắt buộc điều kiện tiếng Anh đầu vào, nhưng{" "}
          <span className="text-[#0038D1] font-semibold">khuyến nghị</span> học viên có nền tảng tiếng Anh tốt để tiếp thu hiệu quả.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Đề xuất trình độ tiếng Anh từ B2 trở lên (theo CEFR) hoặc tương đương.</li>
          <li>Nếu chưa có chứng chỉ phù hợp, học viên có thể đăng ký tham gia bài test đầu vào do VMG tổ chức để được đánh giá năng lực trước khi học.</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Sau khi hoàn thành khóa TESOL E-path, tôi có thể làm việc trong những môi trường nào?",
    answer: (
      <div className="space-y-3">
        <p>
          Sở hữu chứng chỉ TESOL từ VMG đủ điều kiện để giảng dạy{" "}
          <span className="text-[#0038D1] font-semibold">tiếng Anh chuẩn quốc tế</span> tại nhiều môi trường, bao gồm:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Trung tâm Anh ngữ.</li>
          <li>Trường học tư thục (lưu ý kiểm tra yêu cầu cụ thể của từng trường).</li>
          <li>Giảng dạy trực tuyến (online).</li>
          <li>Lớp học cá nhân 1–1.</li>
        </ul>
      </div>
    ),
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <FadeSlideUp className="w-full section-padding bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <h2
              className="text-3xl md:text-4xl leading-tight font-black text-[#202020] tracking-tight lg:sticky lg:top-24"
            >
              Các câu hỏi <br className="hidden md:block" />
              <span className="text-[#0038D1]">thường gặp</span>
            </h2>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-0 border-t border-[#e5e5e5]">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#e5e5e5]">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-8 text-left group hover:opacity-70 transition-opacity duration-150"
                    aria-expanded={openIndex === index}
                  >
                    <span
                      className="text-lg leading-7 text-[#202020] font-bold pr-8"
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="flex-shrink-0"
                    >
                      <Plus className="w-6 h-6 text-[#202020]" strokeWidth={2} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pr-12">
                          <div
                            className="text-base md:text-lg leading-relaxed text-[#666666]"
                          >
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeSlideUp>
  )
}

