"use client";

export default function Features() {
  const features = [
    {
      title: "Cấu Trúc Linh Hoạt",
      desc: "Chương trình học được module hóa, cho phép tùy chỉnh lộ trình theo năng lực và mục tiêu cá nhân.",
      color: "border-[#BE202F]",
    },
    {
      title: "Chất Lượng Học Thuật",
      desc: "Đội ngũ giảng viên là những chuyên gia đầu ngành, mang đến những kiến thức thực tiễn và chuyên sâu.",
      color: "border-[#B6914C]",
    },
    {
      title: "Hiệu Suất Tối Ưu",
      desc: "Hệ thống quản lý học tập (LMS) thế hệ mới giúp theo dõi tiến độ và tối ưu hóa thời gian nghiên cứu.",
      color: "border-[#BE202F]",
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#191c1c] leading-tight font-headline uppercase">
              Nền Tảng Tri Thức Với <br />
              <span className="text-[#BE202F]">Độ Chính Xác Tuyệt Đối</span>
            </h2>
          </div>
          <div className="text-[#5b403f] font-body max-w-sm text-right border-r-4 border-[#BE202F] pr-6">
            Mọi cấu trúc chương trình đều được thiết kế tỉ mỉ để tối ưu hóa khả năng tiếp thu và phát triển của học viên.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <div key={i} className={`group relative bg-[#f3f4f4] p-10 hover:bg-white transition-all duration-500 border-l-4 border-transparent hover:${feature.color}`}>
              <div className="text-[#BE202F] mb-8">
                <div className="w-12 h-12 border-2 border-current flex items-center justify-center font-bold text-xl">
                  {i + 1}
                </div>
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-[1.5px] font-headline text-[#191c1c]">{feature.title}</h4>
              <p className="text-[#5b403f] font-body leading-relaxed mb-8">
                {feature.desc}
              </p>
              <button className="inline-flex items-center text-[#B6914C] font-bold text-sm tracking-[1.5px] group-hover:text-[#BE202F] transition-colors uppercase">
                XEM CHI TIẾT <span className="ml-2">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
