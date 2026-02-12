import React from "react";

export default function LogoBand() {
  return (
    <div className="space-y-8">
      {/* Logos */}
      <div className="flex flex-wrap items-center justify-center gap-8">
        <img src="/images/INTESOL_WORLDWIDE.svg" alt="INTESOL Worldwide Logo" className="h-20 md:h-28 object-contain" />
        <img src="/images/ALAP.png" alt="ALAP Logo" className="h-20 md:h-28 object-contain" />
        <img src="/images/INTESOL_VIETNAM.svg" alt="INTESOL Vietnam Logo" className="h-20 md:h-28 object-contain" />
      </div>
      
      {/* Text */}
      <div className="text-center px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-vmg-navy mb-2">Chứng chỉ TESOL quốc tế</h3>
        <p className="text-lg text-gray-700 mb-2">Được công nhận bởi các tổ chức giáo dục uy tín trên toàn cầu.</p>
        <p className="text-md text-gray-500">Học viên hoàn thành sẽ nhận chứng chỉ TESOL quốc tế, mở rộng cơ hội giảng dạy và phát triển sự nghiệp.</p>
      </div>
      
      {/* Certificate Image */}
      <div className="flex items-center justify-center">
        <img src="/images/tesol_certificate.avif" alt="TESOL Certificate" className="rounded-xl shadow-lg max-w-xl w-full object-contain" />
      </div>
    </div>
  );
}
