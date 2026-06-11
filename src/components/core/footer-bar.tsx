"use client";

import { Bell, Download, BarChart2, Calculator, Clock } from "lucide-react";
import { SolanaIcon } from "@/components/core/solana-icon";
import Image from "next/image";
import downloadIcon from "@/assets/icon-img/download.jpg";

export function FooterBar() {
  return (
    <footer className="h-8 bg-white border-t border-gray-200 flex items-center justify-between px-[18px] text-black shrink-0">
      {/* Left actions */}
      <div className="flex items-center gap-1.5">
        <button className="bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium px-3 py-[3px] rounded transition-colors flex items-center gap-1">
          <Download size={11} />
          Withdraw
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-[11px] border border-gray-200 rounded px-1.5 py-[2px] hover:bg-gray-50 transition-colors">
          <BarChart2 size={11} />
          P&amp;L
        </button>
        <button className="text-gray-400 hover:text-gray-600 border border-gray-200 rounded p-[3px] hover:bg-gray-50 transition-colors">
          <Calculator size={11} />
        </button>
        <button className="text-gray-400 hover:text-gray-600 border border-gray-200 rounded p-[3px] hover:bg-gray-50 transition-colors">
          <Clock size={11} />
        </button>
      </div>

      {/* Center balance */}
      <div className="flex items-center gap-2 text-[11px]">
        <span className="flex items-center gap-1 border border-gray-200 rounded px-2 py-[2px]">
          <SolanaIcon size={11} />
          <span className="text-gray-600">$63.22</span>
        </span>
        <span className="flex items-center gap-1 border border-gray-200 rounded px-2 py-[2px] text-gray-400">
          <Image src={downloadIcon} alt="sol" width={11} height={11} className="rounded-full object-cover" />
          33.314
        </span>
      </div>

      {/* Right status */}
      <div className="flex items-center gap-2 text-[11px]">
        <button className="text-gray-400 hover:text-gray-600 border border-gray-200 rounded p-[3px] hover:bg-gray-50 transition-colors">
          <Bell size={11} />
        </button>
        <span className="text-gray-400">EU-C 30as</span>
        <span className="text-gray-400">EU-C 30as</span>
        <span className="flex items-center gap-1 text-green-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Connected
        </span>
      </div>
    </footer>
  );
}
