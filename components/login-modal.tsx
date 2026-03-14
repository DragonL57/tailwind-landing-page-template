"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onCloseAction?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginModal({ isOpen, onCloseAction, onSwitchToRegister }: LoginModalProps) {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-0 md:p-4 bg-vmg-navy/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onCloseAction} />

      <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col">
        <div className="bg-vmg-navy p-6 md:p-8 shrink-0 relative text-center">
          <h2 className="text-2xl font-black text-white tracking-tight">Đăng Nhập</h2>
          <button onClick={onCloseAction} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-[10px] font-black text-vmg-navy uppercase tracking-widest">Số điện thoại *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-vmg-blue focus:bg-white outline-none transition-all font-medium text-sm text-vmg-navy rounded-xl"
                placeholder="Số điện thoại của bạn"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[10px] font-black text-vmg-navy uppercase tracking-widest">Mật khẩu *</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-vmg-blue focus:bg-white outline-none transition-all font-medium text-sm text-vmg-navy rounded-xl"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-3.5 h-3.5 border-gray-300 text-vmg-blue focus:ring-0" />
                <span className="text-xs font-bold text-vmg-navy/50 group-hover:text-vmg-navy transition-colors">Duy trì đăng nhập</span>
              </label>
              <button type="button" className="text-[10px] font-black text-vmg-blue hover:text-vmg-navy transition-colors uppercase tracking-widest">
                Quên mật khẩu?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-vmg-red hover:bg-vmg-red/90 text-white font-black shadow-lg shadow-vmg-red/20 transition-all active:scale-[0.99] uppercase tracking-widest text-xs mt-4"
            >
              Đăng Nhập
            </button>

            <div className="text-center pt-4 border-t border-gray-100 mt-2">
              <p className="text-xs font-medium text-vmg-navy/50">
                Chưa có tài khoản?{" "}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-vmg-blue hover:text-vmg-navy font-black uppercase tracking-widest ml-1 transition-colors"
                >
                  Đăng ký
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
