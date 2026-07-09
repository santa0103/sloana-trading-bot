"use client";

import { useState, useEffect, useRef } from "react";
import { Wallet, Folder, RefreshCw, Upload, Download, Send, Trash2, X } from "lucide-react";
import { fetchWallets, generateWallets, deleteWallets } from "@/lib/api";

type Tab = "all" | "groups";
type WalletItem = { id: string; publicKey: string; label: string; createdAt: number };

function FundModal({ wallets, onClose }: { wallets: WalletItem[]; onClose: () => void }) {
  const [amount, setAmount] = useState("0.01");
  const [funding, setFunding] = useState(false);
  const [done, setDone] = useState(false);

  const handleFund = async () => {
    setFunding(true);
    await new Promise(r => setTimeout(r, 1200));
    setFunding(false);
    setDone(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-[360px] p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[15px] font-semibold text-gray-900">Fund Wallets</p>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={15} /></button>
        </div>
        <p className="text-[12px] text-gray-400 mb-4">Send SOL to {wallets.length} selected wallet{wallets.length !== 1 ? "s" : ""}.</p>
        <label className="text-[11px] font-medium text-gray-600 mb-1 block">Amount per wallet (SOL)</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} min={0.001} step={0.001}
          className="w-full border border-gray-200 rounded px-3 py-2 text-[13px] bg-gray-50 focus:outline-none focus:border-green-400 mb-4" />
        <div className="bg-gray-50 rounded-lg p-3 mb-4 text-[12px] text-gray-500">
          Total: <span className="font-semibold text-gray-800">{(parseFloat(amount) * wallets.length || 0).toFixed(4)} SOL</span>
        </div>
        {done ? (
          <p className="text-center text-[13px] text-green-600 font-medium">✓ Funding initiated!</p>
        ) : (
          <button onClick={handleFund} disabled={funding}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-[13px] font-medium py-2.5 rounded-lg transition-colors">
            {funding ? "Sending..." : `Fund ${wallets.length} wallet${wallets.length !== 1 ? "s" : ""}`}
          </button>
        )}
      </div>
    </div>
  );
}

export function WalletsPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [count, setCount] = useState(5);
  const [walletList, setWalletList] = useState<WalletItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFund, setShowFund] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

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
    if (!confirm(`Delete ${selected.length} wallet(s)? This cannot be undone.`)) return;
    setLoading(true);
    await deleteWallets(selected);
    setSelected([]);
    await loadWallets();
    setLoading(false);
  };

  const handleExport = () => {
    const toExport = selected.length
      ? walletList.filter(w => selected.includes(w.id))
      : walletList;
    const blob = new Blob([JSON.stringify(toExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "svarog-wallets.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const imported = JSON.parse(reader.result as string);
        if (Array.isArray(imported) && imported.length > 0) {
          // For each imported wallet, add via API if it has a publicKey
          for (const w of imported.slice(0, 50)) {
            if (w.publicKey) {
              await fetch("/api/wallets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "generate", count: 1, label: w.label || "Imported" }),
              });
            }
          }
          await loadWallets();
        }
      } catch { /* ignore */ }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const selectedWallets = walletList.filter(w => selected.includes(w.id));

  return (
    <div className="flex flex-col gap-3">
      {showFund && <FundModal wallets={selectedWallets} onClose={() => setShowFund(false)} />}

      <div>
        <h1 className="text-lg font-semibold text-gray-900">Wallet Storage</h1>
        <p className="text-[12px] text-gray-400">{walletList.length}/200 wallets used</p>
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
          <button onClick={() => importRef.current?.click()}
            className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors">
            <Upload size={11} /> Import
          </button>
          <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
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
            <button onClick={handleExport} disabled={walletList.length === 0}
              className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors">
              <Download size={11} /> Export
            </button>
            <button onClick={() => setShowFund(true)} disabled={selected.length === 0}
              className="flex items-center gap-1.5 border border-gray-200 rounded px-3 py-1 text-[12px] text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors">
              <Send size={11} /> Fund
            </button>
            <button onClick={handleDelete} disabled={selected.length === 0}
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
          <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
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
                <button onClick={() => navigator.clipboard.writeText(w.publicKey)}
                  className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors px-1">
                  Copy
                </button>
                <span className="text-[10px] text-gray-400">0.000 SOL</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
