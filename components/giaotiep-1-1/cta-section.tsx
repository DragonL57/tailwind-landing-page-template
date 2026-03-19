"use client";

export default function CTASection() {
  const academicGridStyle = {
    backgroundImage: "radial-gradient(#e1e3e3 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  };

  return (
    <section className="py-32 bg-[#f8f9f9] relative" style={academicGridStyle}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-16 border-t-2 border-[#B6914C] text-center max-w-5xl mx-auto shadow-[0_24px_48px_rgba(25,28,28,0.06)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#B6914C]/5 rotate-45 translate-x-24 -translate-y-24"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#191c1c] uppercase tracking-[1.5px] font-headline">
            Sẵn Sàng Cho Chuyến Hành Trình <br /> 
            <span className="text-[#BE202F]">Trí Tuệ Mới?</span>
          </h2>
          <p className="text-lg md:text-xl text-[#5b403f] font-body mb-12 max-w-2xl mx-auto">
            Đăng ký ngay hôm nay để nhận được sự tư vấn lộ trình cá nhân hóa từ ban cố vấn học thuật của chúng tôi.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-[#BE202F] text-white px-10 md:px-16 py-4 md:py-5 font-bold text-base md:text-lg tracking-[1.5px] hover:opacity-90 transition-all uppercase rounded-none">
              BẮT ĐẦU GHI DANH
            </button>
            <button className="bg-[#B6914C] text-white px-10 md:px-16 py-4 md:py-5 font-bold text-base md:text-lg tracking-[1.5px] hover:opacity-90 transition-all uppercase rounded-none">
              TẢI BROCHURE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
