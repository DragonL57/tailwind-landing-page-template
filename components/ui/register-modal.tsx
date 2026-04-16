"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onCloseAction?: () => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterModal({ isOpen, onCloseAction, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "OTHER",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <h2 className="text-2xl font-black text-white tracking-tight">Đăng ký</h2>
          <button onClick={onCloseAction} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 flex-1 overflow-y-auto max-h-[80vh] scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-vmg-navy uppercase tracking-widest">Họ và tên *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-vmg-blue focus:bg-white outline-none transition-all font-medium text-sm text-vmg-navy rounded-xl"
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-vmg-navy uppercase tracking-widest">Số điện thoại *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-vmg-blue focus:bg-white outline-none transition-all font-medium text-sm text-vmg-navy rounded-xl"
                  placeholder="0912 345 678"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-vmg-navy uppercase tracking-widest">Giới tính</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-vmg-blue focus:bg-white outline-none transition-all font-medium text-sm text-vmg-navy rounded-xl appearance-none"
                >
                  <option value="MALE">NAM</option>
                  <option value="FEMALE">NỮ</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-vmg-navy uppercase tracking-widest">Tài khoản *</label>
              <div className="relative flex items-center group">
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-vmg-blue focus:bg-white outline-none transition-all font-medium text-sm text-vmg-navy rounded-xl pr-16"
                  placeholder="vana"
                />
                <span className="absolute right-4 text-sm font-bold text-vmg-navy/30 pointer-events-none group-focus-within:text-vmg-blue/50 transition-colors">
                  @vmg
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-vmg-navy uppercase tracking-widest">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-vmg-blue focus:bg-white outline-none transition-all font-medium text-sm text-vmg-navy rounded-xl"
                placeholder="nguyenvana@gmail.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-vmg-navy uppercase tracking-widest">Mật khẩu *</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-vmg-blue focus:bg-white outline-none transition-all font-medium text-sm text-vmg-navy rounded-xl"
                  placeholder="••••••••••••••"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-vmg-navy uppercase tracking-widest">Nhập lại mật khẩu *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-vmg-blue focus:bg-white outline-none transition-all font-medium text-sm text-vmg-navy rounded-xl"
                  placeholder="Nhập lại mật khẩu"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-vmg-red hover:bg-vmg-red/90 text-white font-black shadow-lg shadow-vmg-red/20 transition-all active:scale-[0.99] uppercase tracking-widest text-xs mt-4"
            >
              Đăng ký
            </button>

            <div className="text-center pt-4 border-t border-gray-100 mt-2">
              <p className="text-xs font-medium text-vmg-navy/50">
                Đã có tài khoản?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-vmg-blue hover:text-vmg-navy font-black uppercase tracking-widest ml-1 transition-colors"
                >
                  Đăng nhập
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
