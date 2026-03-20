"use client";

export default function ConsultationForm() {
  const academicGridStyle = {
    backgroundImage: "radial-gradient(#e1e3e3 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  };

  return (
    <section className="py-24 md:py-32 bg-[#f8f9f9] relative overflow-hidden">
      {/* Background Dot Texture - The Academic Grid */}
      <div className="absolute inset-0 opacity-60" style={academicGridStyle}></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t-4 border-[#B6914C]">
          
          {/* Left: Narrative Content (Layer 2 - Shifts) */}
          <div className="lg:col-span-5 bg-[#f3f4f4] p-10 md:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline leading-[1.1] text-[#191c1c] uppercase mb-8">
                ĐÁNH GIÁ <br />
                <span className="text-[#BE202F]">NĂNG LỰC</span>
              </h2>
              <p className="text-base md:text-lg text-[#5b403f] font-body leading-relaxed border-l-4 border-[#BE202F] pl-6 mb-12 italic">
                Hệ thống FlexTrack yêu cầu đánh giá đầu vào nghiêm túc để thiết lập cấu trúc lộ trình chính xác nhất cho từng học viên.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#B6914C]">Outcome 01</span>
                <span className="text-sm font-bold uppercase font-headline text-[#191c1c]">Nhánh học phù hợp</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#B6914C]">Outcome 02</span>
                <span className="text-sm font-bold uppercase font-headline text-[#191c1c]">Gói học tối ưu</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#B6914C]">Outcome 03</span>
                <span className="text-sm font-bold uppercase font-headline text-[#191c1c]">Lộ trình cá nhân hóa</span>
              </div>
            </div>
          </div>

          {/* Right: Input Form (Layer 1 - Cards) - Minimalist Rigor */}
          <div className="lg:col-span-7 bg-white p-10 md:p-16 lg:p-20">
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                
                {/* Field: Name */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="academic-name"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-slate-200 py-3 text-[#191c1c] outline-none focus:border-[#B6914C] transition-all duration-300 rounded-none placeholder-transparent font-body"
                  />
                  <label 
                    htmlFor="academic-name"
                    className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-[#B6914C] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#B6914C]"
                  >
                    Họ và tên
                  </label>
                </div>

                {/* Field: Phone */}
                <div className="relative group">
                  <input 
                    type="tel" 
                    id="academic-phone"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-slate-200 py-3 text-[#191c1c] outline-none focus:border-[#B6914C] transition-all duration-300 rounded-none placeholder-transparent font-body"
                  />
                  <label 
                    htmlFor="academic-phone"
                    className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-[#B6914C] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#B6914C]"
                  >
                    Số điện thoại
                  </label>
                </div>

                {/* Field: Email */}
                <div className="relative group md:col-span-2">
                  <input 
                    type="email" 
                    id="academic-email"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-slate-200 py-3 text-[#191c1c] outline-none focus:border-[#B6914C] transition-all duration-300 rounded-none placeholder-transparent font-body"
                  />
                  <label 
                    htmlFor="academic-email"
                    className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-[#B6914C] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#B6914C]"
                  >
                    Email liên hệ
                  </label>
                </div>

                {/* Field: Objective */}
                <div className="relative group md:col-span-2">
                  <input 
                    type="text" 
                    id="academic-objective"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-slate-200 py-3 text-[#191c1c] outline-none focus:border-[#B6914C] transition-all duration-300 rounded-none placeholder-transparent font-body"
                  />
                  <label 
                    htmlFor="academic-objective"
                    className="absolute left-0 -top-4 text-[10px] font-bold uppercase tracking-[1.5px] text-[#B6914C] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-[#B6914C]"
                  >
                    Mục tiêu học tập
                  </label>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-[10px] text-[#5b403f] font-body tracking-[1px] uppercase max-w-xs opacity-60">
                  Đội ngũ chuyên viên sẽ liên hệ trong vòng 24 giờ làm việc để xác nhận lịch đánh giá.
                </p>
                <button 
                  type="submit"
                  className="bg-[#BE202F] text-white px-12 py-5 font-bold tracking-[1.5px] uppercase text-xs hover:bg-[#93001a] transition-all rounded-none w-full md:w-auto"
                >
                  Nhận tư vấn miễn phí
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
