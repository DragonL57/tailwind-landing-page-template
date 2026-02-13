"use client";

import { useState } from "react";
import Logo from "./logo";
import AuthModal from "@/components/auth-modal";
import CartModal from "@/components/cart-modal";
import { useCart } from "@/context/cart-context";
import { useUI } from "@/context/ui-context";

export default function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { itemCount } = useCart();
  const { isCartOpen, setIsCartOpen } = useUI();

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
      <header className="fixed top-2 z-30 w-full md:top-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative flex h-14 items-center justify-between gap-6 rounded-2xl bg-white/90 px-4 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
            {/* Site branding */}
            <div className="flex items-center pt-4">
              <Logo />
            </div>

            {/* Navigation Menu */}
            <nav className="flex items-center gap-8">
              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-vmg-blue font-medium transition-colors"
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
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                    {products.map((product, index) => (
                      <a
                        key={index}
                        href={product.href}
                        className="block px-4 py-3 hover:bg-vmg-blue/5 text-gray-700 hover:text-vmg-blue transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {product.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Sign in links & Cart */}
            <ul className="flex items-center justify-end gap-4">
              {/* Shopping Cart Button */}
              <li>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-gray-700 hover:text-vmg-blue transition-colors hover:bg-vmg-blue/10 rounded-lg"
                  aria-label="Giỏ hàng"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-vmg-green text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                      {itemCount}
                    </span>
                  )}
                </button>
              </li>

              {/* Auth Buttons */}
              <li>
                <button
                  onClick={() => openAuthModal("login")}
                  className="text-gray-700 hover:text-vmg-blue font-medium px-4 py-2 rounded-lg hover:bg-vmg-blue/10 transition-all"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => openAuthModal("register")}
                  className="bg-vmg-blue hover:bg-vmg-navy text-white font-medium px-4 py-2 rounded-lg transition-all"
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onCloseAction={() => setIsCartOpen(false)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onCloseAction={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
