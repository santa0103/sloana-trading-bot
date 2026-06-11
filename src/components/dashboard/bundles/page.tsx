"use client";

import { useState } from "react";
import { Plus, Search, Package } from "lucide-react";
import { SolanaIcon } from "@/components/core/solana-icon";

export function BundlesPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Bundles</h1>
          <p className="text-[12px] text-gray-400">Manage your token launch bundles</p>
        </div>
        <button className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium px-4 py-2 rounded transition-colors">
          <Plus size={13} />
          New Bundle
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-1">
          <p className="text-[11px] text-gray-400">Total Launches</p>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-1">
          <p className="text-[11px] text-gray-400">Best Launch</p>
          <p className="text-2xl font-bold text-gray-900 flex items-center gap-1.5">
            <SolanaIcon size={16} /> 0.00
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-1">
          <p className="text-[11px] text-gray-400">Total PnL</p>
          <p className="text-2xl font-bold text-gray-900 flex items-center gap-1.5">
            <SolanaIcon size={16} /> 0.00
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-64">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search bundles..."
          className="w-full border border-gray-200 rounded pl-8 pr-3 py-1.5 text-[12px] text-gray-700 placeholder-gray-300 bg-white focus:outline-none focus:border-green-400 transition-colors"
        />
      </div>

      {/* Empty state */}
      <div className="bg-white border border-gray-200 rounded-lg flex-1 flex flex-col items-center justify-center py-24 gap-3">
        <Package size={36} className="text-gray-300" />
        <p className="text-[13px] text-gray-400">No bundles found</p>
        <button className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium px-4 py-2 rounded transition-colors">
          <Plus size={13} />
          Create your first bundle
        </button>
      </div>
    </div>
  );
}
