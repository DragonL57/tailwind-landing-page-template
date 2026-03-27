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
    title: "THÔNG TIN NHẬN DẠNG CÁ NHÂN",
    content: `Chúng tôi có thể thu thập thông tin nhận dạng cá nhân từ Người dùng theo nhiều cách khác nhau, bao gồm nhưng không giới hạn: khi Người dùng truy cập trang web của chúng tôi, đăng ký trên trang web, đặt hàng, đăng ký nhận bản tin, điền vào biểu mẫu và liên quan đến các hoạt động, dịch vụ, tính năng hoặc tài nguyên khác mà chúng tôi cung cấp trên Trang web. Người dùng có thể được yêu cầu cung cấp tên, địa chỉ email, số điện thoại. Người dùng có thể truy cập trang web ẩn danh. Chúng tôi sẽ chỉ thu thập thông tin nhận dạng cá nhân từ Người dùng nếu họ tự nguyện gửi thông tin đó. Người dùng luôn có thể từ chối cung cấp thông tin nhận dạng cá nhân, ngoại trừ việc có thể ngăn họ tham gia vào một số hoạt động nhất định liên quan đến Trang web.`,
  },
  {
    id: "II",
    title: "THÔNG TIN NHẬN DẠNG PHI CÁ NHÂN",
    content: `Chúng tôi có thể thu thập thông tin nhận dạng phi cá nhân về Người dùng bất cứ khi nào họ tương tác với Trang web. Thông tin nhận dạng phi cá nhân có thể bao gồm tên trình duyệt, loại máy tính và thông tin kỹ thuật về Người dùng, nghĩa là kết nối với Trang web của chúng tôi, chẳng hạn như hệ điều hành và các nhà cung cấp dịch vụ Internet được sử dụng.`,
  },
  {
    id: "III",
    title: "COOKIE TRÌNH DUYỆT WEB",
    content: `Trang web của chúng tôi có thể sử dụng "cookie" để nâng cao trải nghiệm người dùng. Trình duyệt web của người dùng đặt cookie trên ổ cứng cho mục đích lưu trữ hồ sơ, đôi khi để theo dõi thông tin. Người dùng có thể chọn đặt trình duyệt từ chối cookie hoặc cảnh báo khi cookie được gửi. Nếu họ làm vậy, một số phần của trang web có thể không hoạt động đúng.`,
  },
  {
    id: "IV",
    title: "CÁCH CHÚNG TÔI SỬ DỤNG THÔNG TIN THU THẬP ĐƯỢC",
    content: `VMG có thể thu thập và sử dụng thông tin cá nhân của Người dùng cho các mục đích sau:\n\n• Cải thiện dịch vụ khách hàng — Thông tin bạn cung cấp giúp chúng tôi đáp ứng các yêu cầu dịch vụ khách hàng và nhu cầu hỗ trợ hiệu quả hơn.\n\n• Cá nhân hóa trải nghiệm người dùng — Chúng tôi có thể sử dụng thông tin tổng hợp để hiểu cách Người dùng sử dụng các dịch vụ và tài nguyên được cung cấp trên Trang web.\n\n• Cải thiện trang web — Chúng tôi có thể sử dụng phản hồi để cải thiện sản phẩm và dịch vụ.\n\n• Xử lý thanh toán — Chúng tôi có thể sử dụng thông tin Người dùng cung cấp khi đặt hàng để cung cấp dịch vụ. Chúng tôi không chia sẻ thông tin này với bên ngoài, ngoại trừ phạm vi cần thiết để cung cấp dịch vụ.\n\n• Gửi email định kỳ — Chúng tôi có thể sử dụng địa chỉ email để gửi thông tin cập nhật liên quan đến đơn đặt hàng, trả lời các yêu cầu và câu hỏi. Người dùng có thể hủy đăng ký nhận email bất cứ lúc nào.`,
  },
  {
    id: "V",
    title: "TRUY CẬP, CHỈNH SỬA VÀ XOÁ DỮ LIỆU",
    content: `Chúng tôi có thể giữ lại dữ liệu cá nhân liên quan đến các tài khoản không hoạt động trong tối đa 24 tháng kể từ ngày hoạt động cuối cùng. Người dùng có tài khoản đang hoạt động có thể truy cập, sửa đổi và xóa thông tin cá nhân bất cứ lúc nào. Người dùng không có tài khoản có thể gửi email đến info@vmg.edu.vn yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân.`,
  },
  {
    id: "VI",
    title: "CÁC QUYỀN KHÁC",
    content: `Ngoài các quyền được đề cập, Người dùng cũng có quyền hạn chế xử lý dữ liệu, phản đối việc xử lý dữ liệu, cũng như quyền di chuyển dữ liệu. Chúng tôi sẽ hợp tác với Người dùng để thực hiện các quyền này.`,
  },
  {
    id: "VII",
    title: "CÁCH CHÚNG TÔI BẢO VỆ THÔNG TIN CỦA BẠN",
    content: `Chúng tôi áp dụng các biện pháp thu thập, lưu trữ và xử lý dữ liệu phù hợp và các biện pháp bảo mật để bảo vệ chống lại truy cập trái phép, thay đổi, tiết lộ hoặc phá hủy thông tin cá nhân, tên người dùng, mật khẩu, thông tin giao dịch và dữ liệu được lưu trữ trên Trang web.`,
  },
  {
    id: "VIII",
    title: "CHIA SẺ THÔNG TIN CÁ NHÂN CỦA BẠN",
    content: `Chúng tôi không bán, trao đổi hoặc cho thuê thông tin nhận dạng cá nhân cho người khác. Chúng tôi có thể chia sẻ thông tin nhân khẩu học tổng hợp với các đối tác kinh doanh, chi nhánh đáng tin cậy và nhà quảng cáo. Chúng tôi có thể sử dụng các nhà cung cấp dịch vụ bên thứ ba để giúp điều hành doanh nghiệp và Trang web, và có thể chia sẻ thông tin với các bên thứ ba cho những mục đích hạn chế đó.`,
  },
  {
    id: "IX",
    title: "TRANG WEB CỦA BÊN THỨ BA",
    content: `Người dùng có thể tìm thấy quảng cáo hoặc nội dung khác trên Trang web liên kết đến các trang web của bên thứ ba. Chúng tôi không kiểm soát nội dung hoặc liên kết trên các trang web này và không chịu trách nhiệm về các hoạt động của chúng. Các trang web này có chính sách bảo mật và điều khoản riêng.`,
  },
  {
    id: "X",
    title: "THAY ĐỔI CHÍNH SÁCH QUYỀN RIÊNG TƯ",
    content: `VMG có toàn quyền cập nhật chính sách bảo mật này bất cứ lúc nào. Khi cập nhật, chúng tôi sẽ sửa đổi ngày cập nhật. Người dùng được khuyến khích thường xuyên kiểm tra trang này để biết các thay đổi.`,
  },
  {
    id: "XI",
    title: "BẠN CHẤP NHẬN CÁC ĐIỀU KHOẢN",
    content: `Để sử dụng trang web này, bạn phải chấp nhận chính sách này và các điều khoản dịch vụ đi kèm. Việc tiếp tục sử dụng Trang web sau khi đăng các thay đổi sẽ được coi là chấp nhận những thay đổi đó. Bạn có thể thu hồi sự đồng ý bất cứ lúc nào bằng cách gửi email đến info@vmg.edu.vn.`,
  },
  {
    id: "XII",
    title: "LIÊN HỆ VÀ KHIẾU NẠI",
    content: `Nếu bạn có bất kỳ câu hỏi hoặc ý kiến nào về chính sách bảo mật này, vui lòng liên hệ:\n\nCÔNG TY TNHH MỘT THÀNH VIÊN GIÁO DỤC VIỆT MỸ\nE99 Võ Thị Sáu, KP 7, Phường Thống Nhất, TP. Biên Hòa, Tỉnh Đồng Nai.\nĐiện thoại: 1900 636 838\nEmail: info@vmg.edu.vn\n\nBạn có quyền khiếu nại với cơ quan giám sát có liên quan, đặc biệt là nơi bạn sinh sống hoặc làm việc.`,
  },
];

export default function PrivacyPolicy() {
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
              CHÍNH SÁCH BẢO MẬT
            </motion.h1>

            <motion.p variants={fadeUp} className="font-body font-bold text-[10px] uppercase tracking-[1.5px] text-[#191c1c]/40 mb-6">
              Cập nhật lần cuối: 12 tháng 06 năm 2024
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="max-w-3xl font-body text-base md:text-lg text-[#191c1c]/70 leading-relaxed border-l-4 border-brand-crimson pl-6"
            >
              Chính sách bảo mật này chi phối cách thức VMG thu thập, sử dụng, duy trì và tiết lộ thông tin thu thập từ người dùng của trang web này. Chính sách áp dụng cho tất cả các sản phẩm và dịch vụ được cung cấp bởi VMG.
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
