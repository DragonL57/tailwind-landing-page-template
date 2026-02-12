import Link from "next/link";
import Logo from "./logo";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-4">
            <div>
              <Logo />
            </div>
            <div className="text-sm text-gray-600">
              &copy; VMG Education - Lộ trình TESOL chuẩn quốc tế
            </div>
          </div>

          {/* 2nd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-vmg-navy">Chương Trình</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-600 transition hover:text-vmg-blue"
                  href="#0"
                >
                  TESOL Online
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-vmg-blue"
                  href="#0"
                >
                  Chứng Chỉ Quốc Tế
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-vmg-blue"
                  href="#0"
                >
                  Giảng Viên
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-vmg-blue"
                  href="#0"
                >
                  Quy Trình Học Tập
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-vmg-navy">Công Ty</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-600 transition hover:text-vmg-blue"
                  href="#0"
                >
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-vmg-blue"
                  href="#0"
                >
                  Tầm Nhìn & Sứ Mạng
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-vmg-blue"
                  href="#0"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-vmg-blue"
                  href="#0"
                >
                  Tuyển Dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-vmg-navy">Hỗ Trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-gray-600 transition hover:text-vmg-blue"
                  href="#0"
                >
                  Trung Tâm Trợ Giúp
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-vmg-blue"
                  href="#0"
                >
                  Điều Khoản Dịch Vụ
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 transition hover:text-vmg-blue"
                  href="#0"
                >
                  Chính Sách Bảo Mật
                </Link>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-vmg-navy">Kết Nối</h3>
            <ul className="flex gap-1">
              <li>
                <Link
                  className="flex items-center justify-center text-vmg-blue transition hover:text-vmg-navy"
                  href="#0"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-center text-vmg-blue transition hover:text-vmg-navy"
                  href="#0"
                  aria-label="YouTube"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M29.41 13.76a2.6 2.6 0 0 0-1.83-1.85c-1.62-.44-8.1-.44-8.1-.44s-6.48 0-8.1.44a2.6 2.6 0 0 0-1.83 1.85 27.35 27.35 0 0 0-.44 4.74 27.35 27.35 0 0 0 .44 4.74 2.6 2.6 0 0 0 1.83 1.85c1.62.44 8.1.44 8.1.44s6.48 0 8.1-.44a2.6 2.6 0 0 0 1.83-1.85 27.35 27.35 0 0 0 .44-4.74 27.35 27.35 0 0 0-.44-4.74zm-12.29 7.68v-6.41l5.42 3.2-5.42 3.21z"></path>
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-center text-vmg-blue transition hover:text-vmg-navy"
                  href="#0"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-8 w-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M26.4 26.4v-9.6c0-4.8-2.4-7.2-6.4-7.2-3.2 0-4.8 1.6-5.6 3.2v-2.8h-5.6v20.8h5.6v-9.6c0-1.6.8-3.2 2.4-3.2s2.4 1.6 2.4 3.2v9.6h5.6zM7.2 11.2c1.6 0 3.2-1.6 3.2-3.2 0-1.6-1.6-3.2-3.2-3.2S4 6.4 4 8c0 1.6 1.6 3.2 3.2 3.2zM9.6 26.4V5.6H4v20.8h5.6zM28.8 0H3.2C1.6 0 0 1.6 0 3.2v25.6C0 30.4 1.6 32 3.2 32h25.6c1.6 0 3.2-1.6 3.2-3.2V3.2C32 1.6 30.4 0 28.8 0z"></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Big text */}
      <div className="relative -mt-16 h-60 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[348px] font-bold leading-none" style={{backgroundImage: 'linear-gradient(to bottom, #012a9e, #023bef, #75d648)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: 'none'}}>
          VMG
        </div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-56 w-56 rounded-full border-[20px] border-vmg-green blur-[80px] opacity-60"></div>
        </div>
      </div>
    </footer>
  );
}
