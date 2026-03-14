"use client";

import { useState } from "react";
import Logo from "./logo";
import AuthModal from "@/components/auth-modal";

export default function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-6">
            {/* Site branding */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center gap-10">
              <a href="/" className="text-gray-900 hover:text-[#0038D1] font-medium text-sm transition-colors py-4">
                Trang chủ
              </a>

              {/* Courses Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setCoursesDropdownOpen(true)}
                  onMouseLeave={() => setCoursesDropdownOpen(false)}
                  className="flex items-center gap-2 text-gray-900 hover:text-[#0038D1] font-medium text-sm transition-colors py-4"
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
                        className="block px-6 py-4 hover:bg-[#F8FAFF] text-gray-700 hover:text-[#0038D1] font-medium text-sm transition-colors border-b border-gray-50 last:border-b-0"
                      >
                        {product.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="/blog" className="text-gray-900 hover:text-[#0038D1] font-medium text-sm transition-colors py-4">
                Blog
              </a>

              <a href="/contact" className="text-gray-900 hover:text-[#0038D1] font-medium text-sm transition-colors py-4">
                Liên hệ
              </a>

              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setProductsDropdownOpen(true)}
                  onMouseLeave={() => setProductsDropdownOpen(false)}
                  className="flex items-center gap-2 text-gray-900 hover:text-[#0038D1] font-medium text-sm transition-colors py-4"
                >
                  Các sản phẩm khác
                  <svg
                    className={`w-4 h-4 transition-transform ${productsDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {productsDropdownOpen && (
                  <div 
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                    className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50"
                  >
                    <a
                      href="#"
                      className="block px-4 py-3 hover:bg-vmg-blue/5 text-gray-700 hover:text-vmg-blue transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      Dịch vụ doanh nghiệp
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 hover:bg-vmg-blue/5 text-gray-700 hover:text-vmg-blue transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      Tư vấn du học
                    </a>
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Sign in links */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => openAuthModal("login")}
                  className="text-gray-700 hover:text-vmg-blue font-medium px-4 py-2 rounded-lg hover:bg-vmg-blue/10 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => openAuthModal("register")}
                  className="bg-vmg-blue hover:bg-vmg-navy text-white font-medium px-4 py-2 rounded-lg transition-all"
                >
                  Register
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
                  onClick={() => { openAuthModal("login"); setMobileMenuOpen(false); }}
                  className="w-full text-center text-gray-700 font-medium py-3 rounded-xl border border-gray-200"
                >
                  Login
                </button>
                <button
                  onClick={() => { openAuthModal("register"); setMobileMenuOpen(false); }}
                  className="w-full text-center bg-vmg-blue text-white font-medium py-3 rounded-xl shadow-md"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onCloseAction={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
