import Image from 'next/image';
import React from "react";
import { ShieldCheck, Laptop, Zap, DollarSign } from "lucide-react";
import DealBanner from "./deal-banner";

export default function TesolBenefits() {
  const features = [
    {
      title: "Chứng chỉ có giá trị thật",
      description: (
        <>
          Chứng chỉ TESOL tại VMG có giá trị vĩnh viễn, được kiểm định bởi <span className="font-bold text-vmg-blue">ALAP</span> – tổ chức kiểm định quốc tế với hơn 20 năm uy tín, tính pháp lý tức thì trên phạm vi toàn cầu.
        </>
      ),
      icon: <ShieldCheck className="w-6 h-6 text-vmg-blue" />,
      color: "vmg-blue"
    },
    {
      title: "Chỉ dạy thứ học viên cần",
      description: (
        <>
          Ngoài các giờ tự học, Buổi <span className="font-bold text-vmg-blue">Live Session</span> hàng tuần được VMG thiết kế <span className="font-bold text-vmg-blue">linh hoạt theo nhu cầu</span> của học viên. Trong buổi đó, các bạn cùng thảo luận chuyên sâu với bạn học, nhận phản hồi trực tiếp từ Trainer.
        </>
      ),
      icon: <Laptop className="w-6 h-6 text-vmg-green" />,
      color: "vmg-green"
    },
    {
      title: "Tối ưu chi phí nhờ công nghệ",
      description: (
        <>
          Nhờ ứng dụng <span className="font-bold text-vmg-blue">công nghệ</span>, VMG mang đến khóa học chất lượng quốc tế với <span className="font-bold text-vmg-blue">mức phí dễ tiếp cận nhất</span>. Ngoài ra, hỗ trợ trả góp linh hoạt từ 1 triệu/ tháng, VMG cam kết minh bạch 100%, không phát sinh phụ phí.
        </>
      ),
      icon: <DollarSign className="w-6 h-6 text-vmg-blue" />,
      color: "vmg-blue"
    },
    {
      title: "Rút ngắn thời gian học tập",
      description: (
        <>
          Không chờ đợi, không rập khuôn — sự kết hợp giữa mô hình <span className="font-bold text-vmg-blue">Self-paced</span> và <span className="font-bold text-vmg-blue">Live Session</span> cho phép học viên <span className="font-bold text-vmg-blue">học nhanh, thi sớm</span> để sở hữu bằng Tesol quốc tế, tốc độ là do bạn quyết định.
        </>
      ),
      icon: <Zap className="w-6 h-6 text-vmg-green" />,
      color: "vmg-green"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-vmg-blue py-24 px-4 w-full">
      {/* Background Silhouette Logos - Full Opacity */}
      <div className="absolute -left-24 -top-12 w-[600px] h-[600px] pointer-events-none z-0 select-none">
        <Image src="/images/Picture1.png" alt="" width={600} height={600} className="w-full h-full object-contain opacity-100 brightness-0 invert rotate-12" />
      </div>
      <div className="absolute -right-32 -bottom-24 w-[700px] h-[700px] pointer-events-none z-0 select-none">
        <Image src="/images/Picture1.png" alt="" width={700} height={700} className="w-full h-full object-contain opacity-100 brightness-0 invert -rotate-12" />
      </div>

      <div className="relative max-w-[1200px] mx-auto z-10 px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.15] -tracking-[0.03em] max-w-3xl mx-auto">
            Vì sao TESOL E-path tại VMG là một lựa chọn khác biệt
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div key={index} className="group relative rounded-[2.5rem] p-10 transition-all duration-500 hover:translate-y-[-4px] min-h-[240px] flex flex-col justify-center overflow-hidden">
              {/* Card background - solid white */}
              <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-white transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"></div>
              
              {/* Background Number - Bolder dark grey on white card */}
              <div className="absolute -bottom-8 -right-4 text-[180px] font-black text-vmg-navy/[0.08] leading-none select-none pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:text-vmg-navy/[0.15] group-hover:-translate-y-4">
                {index + 1}
              </div>

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-vmg-navy leading-tight -tracking-[0.02em] mb-5 max-w-[80%] transition-colors duration-300 group-hover:text-vmg-blue">
                  {feature.title}
                </h3>
                
                <div className="text-vmg-navy/60 leading-[1.6] text-[0.95rem] md:text-base font-medium text-justify">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integrated Deal Banner */}
        <div id="deal-section-trigger">
          <DealBanner />
        </div>
      </div>
    </div>
  );
}
