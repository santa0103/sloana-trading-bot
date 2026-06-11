"use client";

import { useState } from "react";
import { Wallet, Folder, RefreshCw, Upload, Download, Send, Trash2 } from "lucide-react";

type Tab = "all" | "groups";

export function WalletsPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [count, setCount] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Wallet Storage</h1>
        <p className="text-[12px] text-gray-400">0/200 wallets used</p>
      </div>

      {/* Tab cards */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setTab("all")}
          className={`flex items-center gap-3 p-4 rounded-lg border transition-colors text-left ${
            tab === "all" ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tab === "all" ? "bg-green-500" : "bg-gray-100"}`}>
            <Wallet size={16} className={tab === "all" ? "text-white" : "text-gray-400"} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-800">All Wallets</p>
            <p className="text-[11px] text-gray-400">0 wallets</p>
          </div>
        </button>

        <button
          onClick={() => setTab("groups")}
          className={`flex items-center gap-3 p-4 rounded-lg border transition-colors text-left ${
            tab === "groups" ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tab === "groups" ? "bg-green-500" : "bg-gray-100"}`}>
            <Folder size={16} className={tab === "groups" ? "text-white" : "text-gray-400"} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-800">Groups</p>
            <p className="text-[11px] text-gray-400">0 groups</p>
          </div>
        </button>
      </div>

      {/* Storage + actions */}
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
              <Wallet size={13} className="text-green-500" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-800">Storage</p>
              <p className="text-[11px] text-gray-400">0/200</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw size={13} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min={1}
            max={200}
            className="w-14 border border-gray-200 rounded px-2 py-1 text-[12px] text-gray-700 bg-gray-50 focus:outline-none focus:border-green-400 transition-colors text-center"
          />
          <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
            <RefreshCw size={11} />
            Generate
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
            <Upload size={11} />
            Import
          </button>
        </div>
      </div>

      {/* Wallet list area */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <div className="flex items-center gap-3 text-[12px]">
            <button className="text-gray-500 hover:text-gray-700 transition-colors">Select All</button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">Deselect</button>
            <span className="text-gray-400">{selected.length} selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
              <Download size={11} />
              Export
            </button>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
              <Send size={11} />
              Fund
            </button>
            <button className="flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-500 rounded px-3 py-1 text-[12px] font-medium transition-colors">
              <Trash2 size={11} />
              Delete
            </button>
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <Wallet size={32} className="text-gray-300" />
          <p className="text-[13px] text-gray-400 font-medium">No wallets yet</p>
          <p className="text-[11px] text-gray-300">Generate or import wallets to get started</p>
        </div>
      </div>
    </div>
  );
}
