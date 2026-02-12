"use client";

import { useState } from "react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-3 right-8 z-50 flex flex-col items-end gap-3">
      {/* Contact Options - Show when open */}
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-4 fade-in">
          {/* Zalo Button */}
          <a
            href="https://zalo.me/your-zalo-number"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transition-all pl-4 pr-5 py-3 border border-gray-200"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 2.237.738 4.304 1.986 5.972L2.317 21.69a.5.5 0 00.638.638l3.718-1.669A9.958 9.958 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm3.5 13.5h-7a.5.5 0 010-1h7a.5.5 0 010 1zm0-3h-7a.5.5 0 010-1h7a.5.5 0 010 1zm0-3h-7a.5.5 0 010-1h7a.5.5 0 010 1z"/>
              </svg>
            </div>
            <span className="font-semibold text-gray-800 whitespace-nowrap">Zalo</span>
          </a>

          {/* Messenger Button */}
          <a
            href="https://m.me/your-facebook-page"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white hover:bg-blue-50 rounded-full shadow-lg hover:shadow-xl transition-all pl-4 pr-5 py-3 border border-gray-200"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.912 1.45 5.51 3.717 7.197V22l3.487-1.912c.93.257 1.915.399 2.796.399 5.523 0 10-4.145 10-9.244C22 6.145 17.523 2 12 2zm.993 12.416l-2.558-2.73-4.993 2.73 5.491-5.827 2.62 2.73 4.931-2.73-5.491 5.827z"/>
              </svg>
            </div>
            <span className="font-semibold text-gray-800 whitespace-nowrap">Messenger</span>
          </a>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => {
          if (!isOpen) {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          setIsOpen(!isOpen);
        }}
        className="bg-gradient-to-br from-vmg-blue to-vmg-navy hover:from-vmg-navy hover:to-vmg-blue text-white font-bold px-4 py-2.5 rounded-full shadow-2xl hover:shadow-vmg-blue/50 transition-all transform hover:scale-105 flex items-center gap-2"
      >
        {isOpen ? (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="whitespace-nowrap">Đóng</span>
          </>
        ) : (
          <>
            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="whitespace-nowrap">Đăng ký tư vấn</span>
          </>
        )}
      </button>
    </div>
  );
}
