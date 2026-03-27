"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const sections = [
  {
    id: "I",
    title: "TRÁCH NHIỆM CỦA NGƯỜI DÙNG",
    content: `Khi truy cập vào trang web này, bạn đồng ý chấp nhận mọi rủi ro. VMG và các bên đối tác không chịu trách nhiệm về bất kỳ tổn thất nào do hậu quả trực tiếp, tình cờ hay gián tiếp; những thất thoát, chi phí (bao gồm chi phí pháp lý, chi phí tư vấn hoặc các khoản chi tiêu khác) có thể phát sinh trực tiếp hoặc gián tiếp do việc truy cập trang web hoặc khi tải dữ liệu về máy; những tổn hại do virus, hành động phá hoại trực tiếp hay gián tiếp của hệ thống máy tính khác, đường dây điện thoại, phần cứng, phần mềm, lỗi chương trình, hoặc bất kỳ các lỗi nào khác; đường truyền dẫn của máy tính hoặc nối kết mạng bị chậm.`,
  },
  {
    id: "II",
    title: "VỀ NỘI DUNG TRÊN TRANG WEB",
    content: `Tất cả thông tin trên trang web được cung cấp một cách trung thực như bản thân sự việc. VMG và các bên liên quan không bảo đảm hay có bất kỳ tuyên bố nào liên quan đến tính chính xác, tin cậy của việc sử dụng hay kết quả của việc sử dụng nội dung trên trang web này.`,
  },
  {
    id: "III",
    title: "QUYỀN SỞ HỮU",
    content: `VMG là chủ sở hữu của các thương hiệu, biểu tượng và các nhãn mác dịch vụ được hiển thị trên trang web này. Không được phép sử dụng các thương hiệu, biểu tượng và nhãn mác dịch vụ mà không có sự đồng ý bằng văn bản của VMG hoặc bên sở hữu chúng.\n\nCác tài liệu trên trang web này được bảo vệ bản quyền. Không ai được sửa đổi, sao chép, ghi lại trong bộ nhớ điện tử, chuyển dịch, mô phỏng, phát tán, sử dụng vì các mục đích thương mại hay công cộng bất kỳ phần nào của những tài liệu này mà không được VMG chấp thuận trước bằng văn bản.`,
  },
  {
    id: "IV",
    title: "THƯ ĐIỆN TỬ",
    content: `VMG không đảm bảo rằng các thư điện tử gửi đến VMG qua Internet sẽ được bảo đảm hoàn toàn.\n\nVMG không chịu trách nhiệm đối với bất kỳ thiệt hại nào mà người sử dụng phải chịu nếu người sử dụng gửi thư điện tử cho VMG, hoặc nếu VMG gửi thư điện tử qua Internet cho người sử dụng theo yêu cầu của họ.`,
  },
  {
    id: "V",
    title: "THAY ĐỔI NỘI DUNG",
    content: `VMG giữ quyền thay đổi, chỉnh sửa và loại bỏ những thông tin vào bất kỳ thời điểm nào vì bất kỳ lý do nào mà không cần thông báo trước.`,
  },
  {
    id: "VI",
    title: "ĐƯA THÔNG TIN LÊN TRANG WEB",
    content: `Bạn không được đưa lên, hoặc chuyển tải lên trang web tất cả những hình ảnh, từ ngữ khiêu dâm, thô tục, xúc phạm, phỉ báng, bôi nhọ, đe dọa, những thông tin không hợp pháp hoặc những thông tin có thể đưa đến việc vi phạm pháp luật, trách nhiệm pháp lý.\n\nVMG và tất cả các bên có liên quan đến việc xây dựng và quản lý trang web không chịu trách nhiệm hoặc có nghĩa vụ pháp lý đối với những phát sinh từ nội dung do bạn tải lên trang web.`,
  },
  {
    id: "VII",
    title: "GIẢI QUYẾT TRANH CHẤP",
    content: `Hai bên cam kết nghiêm chỉnh thực hiện các Điều khoản và Điều kiện. Bất kỳ bất đồng nào phát sinh trong quá trình thực hiện sẽ được giải quyết theo nguyên tắc thương lượng và hòa giải. Nếu bất đồng không thể được giải quyết theo phương pháp thương lượng hòa giải thì sẽ được Tòa án có thẩm quyền giải quyết.`,
  },
  {
    id: "VIII",
    title: "LUẬT ÁP DỤNG",
    content: `Những Điều khoản và Điều kiện này sẽ được thi hành dựa theo Luật hiện hành của Việt Nam.`,
  },
];

export default function TermsOfUse() {
  return (
    <div className="bg-[#f8f9f9] min-h-screen">
      {/* Header */}
      <section className="bg-white border-b-4 border-brand-gold">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-bold text-[10px] uppercase tracking-[2px] text-brand-gold hover:text-brand-crimson transition-colors border-l-4 border-brand-gold pl-4"
              >
                <ArrowLeft className="w-3 h-3" /> Quay lại trang chủ
              </Link>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-headline font-bold text-3xl md:text-4xl lg:text-5xl uppercase text-[#191c1c] tracking-tight mb-4"
            >
              ĐIỀU KHOẢN SỬ DỤNG
            </motion.h1>

            <motion.p variants={fadeUp} className="font-body font-bold text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/40 mb-6">
              VMG Group
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="max-w-3xl font-body text-base md:text-lg text-[#191c1c]/70 leading-relaxed border-l-4 border-brand-crimson pl-6"
            >
              Bằng việc truy cập và sử dụng trang web của VMG, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu dưới đây. Vui lòng đọc kỹ trước khi sử dụng.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
          className="space-y-6"
        >
          {sections.map((section) => (
            <motion.article
              key={section.id}
              variants={fadeUp}
              className="bg-white p-8 md:p-12"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#f3f4f4] flex items-center justify-center">
                  <span className="font-headline font-bold text-sm text-brand-crimson">
                    {section.id}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-headline font-bold text-base md:text-lg uppercase text-[#191c1c] mb-4">
                    {section.title}
                  </h2>
                  <p className="font-body text-sm md:text-base text-[#191c1c]/70 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
