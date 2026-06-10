"use client";

import { Bell, Download } from "lucide-react";

export function FooterBar() {
  return (
    <footer className="h-9 bg-[#0d0d0d] border-t border-white/10 flex items-center justify-between px-4 text-white shrink-0">
      {/* Left actions */}
      <div className="flex items-center gap-3">
        <button className="bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium px-3 py-1 rounded transition-colors flex items-center gap-1.5">
          <Download size={11} />
          Withdraw
        </button>
        <button className="text-white/40 hover:text-white/70 transition-colors">
          <span className="text-[11px]">↑↓ P&L</span>
        </button>
        <button className="text-white/40 hover:text-white/70 transition-colors text-[11px]">⊟</button>
        <button className="text-white/40 hover:text-white/70 transition-colors text-[11px]">⏱</button>
      </div>

      {/* Center balance */}
      <div className="flex items-center gap-4 text-[11px]">
        <span className="flex items-center gap-1">
          <span className="text-green-400">≡</span>
          <span className="text-white/70">$63.22</span>
        </span>
        <span className="text-white/40">◎ 33.314</span>
      </div>

      {/* Right status */}
      <div className="flex items-center gap-3 text-[11px]">
        <button className="text-white/40 hover:text-white/70 transition-colors">
          <Bell size={12} />
        </button>
        <span className="text-white/40">Discord</span>
        <span className="text-white/40">EU-C 30as</span>
        <span className="flex items-center gap-1 text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Connected
        </span>
      </div>
    </footer>
  );
}
