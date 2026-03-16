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
      <div className="space-y-4">
        <p className="font-bold text-vmg-navy">Chương trình áp dụng mô hình <span className="text-vmg-red">Self-paced</span> kết hợp <span className="text-vmg-red">Live Sessions</span>:</p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-vmg-green mt-2.5 shrink-0" />
            <span className="text-vmg-navy"><strong className="text-vmg-navy">50% thời lượng tự học có hướng dẫn:</strong> Bạn tự học trên nền tảng LMS của VMG.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-vmg-green mt-2.5 shrink-0" />
            <span className="text-vmg-navy"><strong className="text-vmg-navy">30% thời gian thảo luận:</strong> Bạn sẽ được thảo luận và nhận feedback thực tế từ chuyên gia INTESOL cùng cộng đồng học viên.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-vmg-green mt-2.5 shrink-0" />
            <span className="text-vmg-navy"><strong className="text-vmg-navy">4 giờ cùng Trainer VMG:</strong> Những buổi Live Session được thiết kế riêng theo nhu cầu lớp học.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-vmg-green mt-2.5 shrink-0" />
            <span className="text-vmg-navy"><strong className="text-vmg-navy">Hơn 1 giờ làm bài tập & đánh giá:</strong> Căn cứ để VMG xét điều kiện hoàn thành.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "Tiến độ học tập được đẩy nhanh như thế nào?",
    answer: (
      <div className="space-y-4 text-vmg-navy">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-vmg-green mt-2.5 shrink-0" />
            <span>Học viên chủ động học tập trên hệ thống LMS (Video, Assignment..) kết hợp các buổi Live Session với Trainer: <strong className="font-bold text-vmg-red">2 – 6 tuần</strong> (tùy tốc độ cá nhân).</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-vmg-green mt-2.5 shrink-0" />
            <span>VMG cam kết rà soát và xác nhận điều kiện thi chỉ trong <strong className="font-bold text-vmg-red">24h – 72h</strong> kể từ khi bạn hoàn tất chương trình và nộp bài đầy đủ trên hệ thống LMS.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-vmg-green mt-2.5 shrink-0" />
            <span>Sau khi được xác nhận hoàn thành khoá học, học viên tiến hành làm bài trên nền tảng INTESOL và chờ nhận chứng chỉ.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "Yêu cầu đầu vào của chương trình là gì?",
    answer: (
      <div className="space-y-4 text-vmg-navy">
        <p>
          Chương trình không bắt buộc điều kiện tiếng Anh đầu vào, nhưng <span className="text-vmg-red font-bold">khuyến nghị</span> học viên có nền tảng tiếng Anh tốt để tiếp thu hiệu quả, đề xuất trình độ từ <span className="text-vmg-red font-bold">B2 trở lên (theo CEFR)</span> hoặc tương đương.
        </p>
        <p>
          VMG sẽ cung cấp bài <span className="italic font-semibold">Placement Test</span> nhằm đánh giá năng lực tiếng Anh học thuật.
        </p>
        <p className="text-sm bg-gray-50 p-4 rounded-xl border-l-4 border-vmg-green">
          Trong trường hợp học viên có trình độ dưới B2, VMG vẫn cho phép tham gia khóa học nhưng sẽ khuyến nghị bổ sung các module hỗ trợ về <span className="text-vmg-red font-bold">Academic English for Teaching</span> để đảm bảo khả năng theo học hiệu quả.
        </p>
      </div>
    ),
  },
  {
    question: "Chính sách đảm bảo đầu ra của VMG được quy định như thế nào?",
    answer: (
      <div className="space-y-3 text-vmg-navy">
        <p>
          Để đảm bảo bạn có kết quả tốt nhất tại kỳ thi quốc tế, bộ phận Học thuật sẽ <span className="text-vmg-red font-bold">rà soát kỹ lưỡng lộ trình</span> trước khi bạn bước vào bài đánh giá cuối khóa.
        </p>
        <p>
          Nếu kết quả chưa đạt yêu cầu, VMG sẽ liên hệ trực tiếp để trao đổi, hướng dẫn chi tiết và hỗ trợ bạn hoàn thiện những phần còn thiếu sót cho đến khi bạn đủ tự tin để vượt qua kỳ thi.
        </p>
      </div>
    ),
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <FadeSlideUp className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-3xl md:text-4xl leading-tight font-black text-vmg-navy tracking-tight">
                Các câu hỏi <br className="hidden md:block" />
                <span className="text-vmg-blue">thường gặp</span>
              </h2>
              <p className="mt-6 text-vmg-navy/60 font-medium leading-relaxed">
                Mọi thắc mắc của bạn về lộ trình, phương pháp và cam kết đầu ra đều được giải đáp chi tiết tại đây.
              </p>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`rounded-[2.5rem] border transition-all duration-300 ${openIndex === index ? 'border-vmg-blue/30 bg-vmg-blue-soft/10 shadow-sm' : 'border-gray-100 bg-white hover:border-vmg-blue/20'}`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                    aria-expanded={openIndex === index}
                  >
                    <span
                      className={`text-lg md:text-xl leading-tight font-bold pr-8 transition-colors duration-300 ${openIndex === index ? 'text-vmg-blue' : 'text-vmg-navy'}`}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 45 : 0,
                        backgroundColor: openIndex === index ? "var(--color-vmg-blue)" : "transparent",
                        color: openIndex === index ? "white" : "var(--color-vmg-navy)"
                      }}
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-vmg-navy/10 group-hover:border-vmg-blue/30"
                    >
                      <Plus className="w-4 h-4" strokeWidth={3} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-8">
                          <div className="text-base md:text-lg leading-relaxed text-vmg-navy/70 font-medium pt-2 border-t border-vmg-blue/10">
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
