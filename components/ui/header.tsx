"use client";

import { useState } from "react";
import Logo from "./logo";
import LoginModal from "@/components/login-modal";
import RegisterModal from "@/components/register-modal";

export default function Header() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openLogin = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  const openRegister = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  const products = [
    { name: "TESOL Online", href: "/tesolmooc" },
    { name: "Tiếng Anh Giao Tiếp Chuyên Ngành (1-1)", href: "/giao-tiep-1-1" },
    { name: "Tiếng Anh Hospitality", href: "#" },
    { name: "Tiếng Anh Công Nghệ", href: "#" },
    { name: "Tiếng Anh Du Lịch", href: "#" },
  ];

  return (
    <>
      <header className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="w-full px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-6">
            {/* Site branding */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center gap-10">
              <a href="/" className="text-vmg-navy hover:text-vmg-blue font-semibold text-sm transition-colors py-4">
                Trang chủ
              </a>

              {/* Courses Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setCoursesDropdownOpen(true)}
                  onMouseLeave={() => setCoursesDropdownOpen(false)}
                  className="flex items-center gap-2 text-vmg-navy hover:text-vmg-blue font-semibold text-sm transition-colors py-4"
                >
                  Các khóa học
                  <svg
                    className={`w-4 h-4 transition-transform ${coursesDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {coursesDropdownOpen && (
                  <div 
                    onMouseEnter={() => setCoursesDropdownOpen(true)}
                    onMouseLeave={() => setCoursesDropdownOpen(false)}
                    className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50 py-2"
                  >
                    {products.map((product, index) => (
                      <a
                        key={index}
                        href={product.href}
                        className="block px-6 py-4 hover:bg-vmg-blue-soft text-vmg-navy hover:text-vmg-blue font-medium text-sm transition-colors border-b border-gray-50 last:border-b-0"
                      >
                        {product.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="/blog" className="text-vmg-navy hover:text-vmg-blue font-semibold text-sm transition-colors py-4">
                Blog
              </a>

              <a href="/contact" className="text-vmg-navy hover:text-vmg-blue font-semibold text-sm transition-colors py-4">
                Liên hệ
              </a>

              {/* Products dropdown removed as requested */}
            </nav>

            {/* Right: Sign in links */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={openLogin}
                  className="text-vmg-navy hover:text-vmg-blue font-semibold px-4 py-2 rounded-lg hover:bg-vmg-blue/5 transition-all"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={openRegister}
                  className="bg-vmg-red hover:bg-vmg-red/90 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-vmg-red/20 transition-all active:scale-95"
                >
                  Đăng ký
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white animate-in slide-in-from-top">
            <div className="px-4 py-6 space-y-4">
              <a href="/" className="block text-lg font-medium text-gray-700 hover:text-vmg-blue">Trang chủ</a>
              
              <div className="space-y-2">
                <div className="text-lg font-medium text-gray-700">Khóa học</div>
                <div className="pl-4 space-y-2 border-l-2 border-gray-100">
                  {products.map((product, index) => (
                    <a key={index} href={product.href} className="block text-gray-600 hover:text-vmg-blue">{product.name}</a>
                  ))}
                </div>
              </div>

              <a href="/blog" className="block text-lg font-medium text-gray-700 hover:text-vmg-blue">Blog</a>
              <a href="/contact" className="block text-lg font-medium text-gray-700 hover:text-vmg-blue">Liên hệ</a>

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <button
                  onClick={() => { openLogin(); setMobileMenuOpen(false); }}
                  className="w-full text-center text-gray-700 font-medium py-3 rounded-xl border border-gray-200"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => { openRegister(); setMobileMenuOpen(false); }}
                  className="w-full text-center bg-vmg-blue text-white font-medium py-3 rounded-xl shadow-md"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onCloseAction={() => setLoginModalOpen(false)}
        onSwitchToRegister={openRegister}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={registerModalOpen}
        onCloseAction={() => setRegisterModalOpen(false)}
        onSwitchToLogin={openLogin}
      />
    </>
  );
}
