"use client";

export default function EvaluationPaths() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-[#191c1c] leading-tight font-headline uppercase">
              Xác Định Năng Lực <br />
              <span className="text-[#BE202F]">Bắt Đầu Lộ Trình</span>
            </h2>
          </div>
          <p className="text-[#5b403f] font-body max-w-sm text-right border-r-4 border-[#BE202F] pr-6">
            Chúng tôi cung cấp hai hướng kiểm tra đầu vào để đảm bảo tính chính xác nhất cho chương trình học của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Case 1: AI Test */}
          <div className="bg-white border-2 border-[#e3bebc] p-10 hover:border-[#BE202F] transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#BE202F]/5 rotate-45 translate-x-12 -translate-y-12 transition-transform group-hover:scale-150"></div>
            <div className="text-[#BE202F] font-bold text-xs uppercase tracking-[2px] mb-4">Case 01 / Automated</div>
            <h3 className="text-3xl font-bold font-headline mb-6 uppercase">TEST VỚI AI</h3>
            <ul className="text-base text-[#5b403f] space-y-4 mb-10 font-body">
              <li className="flex items-start gap-3">
                <span className="text-[#BE202F] font-bold">01.</span>
                <span>Điền Form khảo sát nhu cầu mục tiêu</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#BE202F] font-bold">02.</span>
                <span>Thực hiện bài kiểm tra trực tuyến tức thì</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#BE202F] font-bold">03.</span>
                <span>Nhận kết quả và lộ trình mẫu ngay lập tức</span>
              </li>
            </ul>
            <button className="w-full bg-[#BE202F] text-white py-5 font-bold tracking-[1.5px] uppercase text-sm hover:opacity-90 transition-all">
              BẮT ĐẦU VỚI AI
            </button>
          </div>

          {/* Case 2: Teacher Test */}
          <div className="bg-[#f3f4f4] border-2 border-[#B6914C]/20 p-10 hover:border-[#B6914C] transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B6914C]/5 rotate-45 translate-x-12 -translate-y-12 transition-transform group-hover:scale-150"></div>
            <div className="text-[#B6914C] font-bold text-xs uppercase tracking-[2px] mb-4">Case 02 / Professional</div>
            <h3 className="text-3xl font-bold font-headline mb-6 uppercase">VỚI GIÁO VIÊN</h3>
            <ul className="text-base text-[#5b403f] space-y-4 mb-10 font-body">
              <li className="flex items-start gap-3">
                <span className="text-[#B6914C] font-bold">01.</span>
                <span>Điền Form đăng ký lịch hẹn</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B6914C] font-bold">02.</span>
                <span>Phỏng vấn 1-1 trực tiếp với Giáo viên</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#B6914C] font-bold">03.</span>
                <span>Trả kết quả qua Mail kèm Rubric chi tiết</span>
              </li>
            </ul>
            <button className="w-full border-2 border-[#B6914C] text-[#B6914C] py-5 font-bold tracking-[1.5px] uppercase text-sm hover:bg-[#B6914C] hover:text-white transition-all">
              ĐẶT LỊCH VỚI GIÁO VIÊN
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
