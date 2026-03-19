"use client";

export default function StatsGrid() {
  const academicGridStyle = {
    backgroundImage: "radial-gradient(#e1e3e3 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  };

  const stats = [
    { value: "98%", label: "Sinh viên tốt nghiệp", border: "border-[#B6914C]" },
    { value: "250+", label: "Chuyên gia giảng dạy", border: "border-[#BE202F]" },
    { value: "15k", label: "Cộng đồng học thuật", border: "border-[#B6914C]" },
    { value: "12+", label: "Giải thưởng danh giá", border: "border-[#BE202F]" },
  ];

  return (
    <section className="py-24 bg-[#f8f9f9]" style={academicGridStyle}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e1e3e3] border border-[#e1e3e3]">
          {stats.map((stat, i) => (
            <div key={i} className={`bg-white p-12 border-t-4 ${stat.border} transition-transform hover:-translate-y-1`}>
              <h3 className="text-4xl md:text-5xl font-bold text-[#BE202F] mb-2 font-headline">{stat.value}</h3>
              <p className="text-xs md:text-sm font-semibold uppercase text-[#B6914C] tracking-[1.5px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
