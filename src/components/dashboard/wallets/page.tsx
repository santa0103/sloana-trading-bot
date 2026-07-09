"use client";

import { useState, useEffect } from "react";
import { Wallet, Folder, RefreshCw, Upload, Download, Send, Trash2 } from "lucide-react";
import { fetchWallets, generateWallets, deleteWallets } from "@/lib/api";

type Tab = "all" | "groups";
type WalletItem = { id: string; publicKey: string; label: string; createdAt: number };

export function WalletsPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [count, setCount] = useState(5);
  const [walletList, setWalletList] = useState<WalletItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const selectAll = () => setSelected(walletList.map(w => w.id));
  const deselectAll = () => setSelected([]);

  const loadWallets = async () => {
    const list = await fetchWallets();
    setWalletList(list);
  };

  useEffect(() => { loadWallets(); }, []);

  const handleGenerate = async () => {
    setLoading(true);
    await generateWallets(count);
    await loadWallets();
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!selected.length) return;
    setLoading(true);
    await deleteWallets(selected);
    setSelected([]);
    await loadWallets();
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Wallet Storage</h1>
        <p className="text-[12px] text-gray-400">0/200 wallets used</p>
      </div>

      {/* Tab cards */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setTab("all")}
          className={`flex items-center gap-3 p-4 rounded-lg border transition-colors text-left ${tab === "all" ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tab === "all" ? "bg-green-500" : "bg-gray-100"}`}>
            <Wallet size={16} className={tab === "all" ? "text-white" : "text-gray-400"} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-800">All Wallets</p>
            <p className="text-[11px] text-gray-400">{walletList.length} wallets</p>
          </div>
        </button>
        <button onClick={() => setTab("groups")}
          className={`flex items-center gap-3 p-4 rounded-lg border transition-colors text-left ${tab === "groups" ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
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
              <p className="text-[11px] text-gray-400">{walletList.length}/200</p>
            </div>
          </div>
          <button onClick={loadWallets} className="text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} min={1} max={200}
            className="w-14 border border-gray-200 rounded px-2 py-1 text-[12px] text-gray-700 bg-gray-50 focus:outline-none focus:border-green-400 transition-colors text-center" />
          <button onClick={handleGenerate} disabled={loading}
            className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors">
            <RefreshCw size={11} className={loading ? "animate-spin" : ""} /> Generate
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
            <Upload size={11} /> Import
          </button>
        </div>
      </div>

      {/* Wallet list */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <div className="flex items-center gap-3 text-[12px]">
            <button onClick={selectAll} className="text-gray-500 hover:text-gray-700 transition-colors">Select All</button>
            <button onClick={deselectAll} className="text-gray-400 hover:text-gray-600 transition-colors">Deselect</button>
            <span className="text-gray-400">{selected.length} selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
              <Download size={11} /> Export
            </button>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
              <Send size={11} /> Fund
            </button>
            <button onClick={handleDelete} disabled={!selected.length}
              className="flex items-center gap-1.5 bg-red-100 hover:bg-red-200 disabled:opacity-40 text-red-500 rounded px-3 py-1 text-[12px] font-medium transition-colors">
              <Trash2 size={11} /> Delete
            </button>
          </div>
        </div>

        {walletList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <Wallet size={32} className="text-gray-300" />
            <p className="text-[13px] text-gray-400 font-medium">No wallets yet</p>
            <p className="text-[11px] text-gray-300">Generate or import wallets to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {walletList.map(w => (
              <div key={w.id} className="flex items-center gap-3 px-4 py-2.5">
                <input type="checkbox" checked={selected.includes(w.id)}
                  onChange={e => setSelected(prev => e.target.checked ? [...prev, w.id] : prev.filter(id => id !== w.id))}
                  className="accent-green-500 w-3.5 h-3.5 cursor-pointer" />
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-600">
                  {w.label.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-gray-700 truncate">{w.label}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{w.publicKey.slice(0, 16)}…{w.publicKey.slice(-8)}</p>
                </div>
                <span className="text-[10px] text-gray-400">0.000 SOL</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
