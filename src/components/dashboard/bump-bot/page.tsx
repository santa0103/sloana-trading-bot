"use client";

import { useState, useEffect } from "react";
import { Zap, Plus, Search } from "lucide-react";
import { SolanaIcon } from "@/components/core/solana-icon";
import { createBumpBot, fetchBumpBots } from "@/lib/api";

type Mode = "custom" | "bundle";
const WALLET_OPTIONS = [5, 10, 15, 20, 25];
const SPEED_OPTIONS = [
  { label: "Gentle", range: "90-150s", value: "gentle" },
  { label: "Moderate", range: "20-40s", value: "moderate" },
  { label: "Fast", range: "10-20s", value: "fast" },
];

type BotItem = { id: string; tokenAddress: string; status: string; bumpsExecuted: number };
type BundleOption = { id: string; name: string; symbol: string; status: string; txSignature: string | null };

export function BumpBotPage() {
  const [mode, setMode] = useState<Mode>("custom");
  const [tokenAddress, setTokenAddress] = useState("");
  const [wallets, setWallets] = useState(10);
  const [speed, setSpeed] = useState("moderate");
  const [budget, setBudget] = useState("0.5");
  const [activeBots, setActiveBots] = useState<BotItem[]>([]);
  const [bundleOptions, setBundleOptions] = useState<BundleOption[]>([]);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const budgetNum = parseFloat(budget) || 0;
  const bumpSize = 0.003;
  const costPerBump = 0.00017;
  const bumpsPerHour = speed === "gentle" ? 30 : speed === "moderate" ? 120 : 300;
  const totalBumps = budgetNum > 0 ? Math.floor(budgetNum / costPerBump) : 0;
  const willLast = bumpsPerHour > 0 ? (totalBumps / bumpsPerHour).toFixed(1) : "0";

  useEffect(() => {
    fetchBumpBots().then(setActiveBots);
    fetch("/api/token-launch").then(r => r.json()).then(d => setBundleOptions(d.launches || []));
  }, []);

  const handleSearch = () => {
    if (!tokenAddress.trim()) return;
    const isValid = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(tokenAddress.trim());
    if (!isValid) { setCreateError("Invalid token address format"); return; }
    setCreateError("");
    alert(`Token address looks valid.\nAddress: ${tokenAddress}\n\nIn production this fetches token metadata from Solana.`);
  };

  const handleStopBot = async (id: string) => {
    await fetch("/api/bump-bot", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setActiveBots(prev => prev.filter(b => b.id !== id));
  };

  const handleCreate = async () => {
    if (!tokenAddress.trim()) { setCreateError("Token address is required"); return; }
    setCreateError("");
    setCreating(true);
    const result = await createBumpBot({ tokenAddress, wallets, speed, budget: budgetNum });
    setCreating(false);
    if (result.bot) {
      setActiveBots(prev => [...prev, result.bot]);
      setTokenAddress("");
    } else {
      setCreateError(result.error || "Failed to create bot");
    }
  };

  return (
    <div className="flex gap-3 mx-auto max-w-3xl">
      {/* Left — Create form */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
            <Zap size={15} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-[13px] font-semibold text-gray-900">Bump Bot</h1>
            <p className="text-[10px] text-gray-400">Keep your token visible with automated bumps</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-medium text-gray-700 mb-2">
          <Plus size={11} /> Create Bump Bot
        </div>

        {/* Mode toggle */}
        <div className="flex bg-gray-100 rounded-md p-0.5 mb-3">
          {(["custom", "bundle"] as Mode[]).map((m) => (
            <button key={m} onClick={() => { setMode(m); setTokenAddress(""); setCreateError(""); }}
              className={`flex-1 py-1 rounded-md text-[11px] font-medium transition-colors ${mode === m ? "bg-green-500 text-white" : "text-gray-500 hover:text-gray-700"}`}>
              {m === "custom" ? "Custom CA" : "From Bundle"}
            </button>
          ))}
        </div>

        {/* Custom CA input */}
        {mode === "custom" && (
          <div className="mb-3">
            <label className="text-[10px] font-medium text-gray-700 mb-1 block">Token Address</label>
            <div className="relative">
              <input type="text" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="Enter token CA..."
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-[11px] text-gray-700 placeholder-gray-300 bg-gray-50 focus:outline-none focus:border-green-400 pr-8" />
              <button onClick={handleSearch} className="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-100 hover:bg-green-200 rounded flex items-center justify-center">
                <Search size={10} className="text-green-600" />
              </button>
            </div>
          </div>
        )}

        {/* From Bundle selector */}
        {mode === "bundle" && (
          <div className="mb-3">
            <label className="text-[10px] font-medium text-gray-700 mb-1 block">Select Bundle</label>
            <select value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)}
              className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-[11px] text-gray-700 bg-gray-50 focus:outline-none focus:border-green-400">
              <option value="">— Select a launched bundle —</option>
              {bundleOptions.map(b => (
                <option key={b.id} value={b.txSignature || b.id}>
                  {b.name} (${b.symbol}) — {b.status}
                </option>
              ))}
            </select>
            {bundleOptions.length === 0 && (
              <p className="text-[10px] text-gray-400 mt-1">No bundles yet. Launch a token first.</p>
            )}
          </div>
        )}

        {/* Number of Wallets */}
        <div className="mb-3">
          <label className="text-[10px] font-medium text-gray-700 mb-1.5 block">Number of Wallets</label>
          <div className="flex gap-1.5">
            {WALLET_OPTIONS.map((n) => (
              <button key={n} onClick={() => setWallets(n)}
                className={`w-9 h-7 rounded text-[11px] font-medium border transition-colors ${wallets === n ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-green-300"}`}>
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Bump Speed */}
        <div className="mb-3">
          <label className="text-[10px] font-medium text-gray-700 mb-1.5 block">Bump Speed</label>
          <div className="flex gap-1.5">
            {SPEED_OPTIONS.map((s) => (
              <button key={s.value} onClick={() => setSpeed(s.value)}
                className={`flex-1 py-1.5 rounded border text-center transition-colors ${speed === s.value ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-green-300"}`}>
                <p className="text-[11px] font-medium">{s.label}</p>
                <p className={`text-[9px] ${speed === s.value ? "text-green-100" : "text-gray-400"}`}>{s.range}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Total Budget */}
        <div className="mb-3">
          <label className="text-[10px] font-medium text-gray-700 mb-1 block">Total Budget (SOL)</label>
          <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)}
            className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-[11px] text-gray-700 bg-gray-50 focus:outline-none focus:border-green-400" />
          <p className="text-[9px] text-gray-400 mt-0.5">
            Min: 0.200 SOL for {wallets} wallets · per wallet: {(0.2 / wallets).toFixed(4)} SOL
          </p>
        </div>

        {/* Estimate */}
        <div className="bg-gray-50 rounded-md p-2.5 mb-3 text-[11px]">
          <p className="font-medium text-gray-700 mb-1.5">Estimate</p>
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between">
              <span className="text-gray-500">Bump size:</span>
              <span className="flex items-center gap-1 text-gray-700"><SolanaIcon size={10} /> {bumpSize.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bumps per hour:</span>
              <span className="text-gray-700">~{bumpsPerHour}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Cost per bump:</span>
              <span className="flex items-center gap-1 text-gray-700"><SolanaIcon size={10} /> {costPerBump.toFixed(5)}</span>
            </div>
            <div className="border-t border-gray-200 mt-1 pt-1 flex flex-col gap-0.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Total bumps:</span>
                <span className="text-green-500 font-medium">~{totalBumps.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Will last:</span>
                <span className="text-green-500 font-medium">~{willLast}h</span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleCreate} disabled={creating}
          className="w-full flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-[12px] font-medium py-2 rounded-lg transition-colors">
          <Plus size={12} /> {creating ? "Creating..." : "Create Bump Bot"}
        </button>
        {createError && <p className="text-[11px] text-red-500 text-center mt-1">{createError}</p>}
      </div>

      {/* Right — Active bots */}
      <div className="w-56 bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-1.5 mb-3">
          <Zap size={12} className="text-gray-500" />
          <span className="text-[12px] font-semibold text-gray-800">Active Bots</span>
          {activeBots.length > 0 && (
            <span className="ml-auto text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-medium">{activeBots.length}</span>
          )}
        </div>
        {activeBots.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2">
            <Zap size={24} className="text-gray-200" />
            <p className="text-[11px] text-gray-400 font-medium">No active bump bots</p>
            <p className="text-[10px] text-gray-300">Create one to get started</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {activeBots.map(bot => (
              <div key={bot.id} className="border border-gray-200 rounded-lg p-2.5 bg-green-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-gray-500">{bot.tokenAddress.slice(0, 8)}…</span>
                  <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded-full">{bot.status}</span>
                </div>
                <p className="text-[10px] text-gray-400 mb-1.5">Bumps: {bot.bumpsExecuted}</p>
                <button onClick={() => handleStopBot(bot.id)}
                  className="w-full text-[10px] text-red-500 border border-red-200 rounded px-2 py-0.5 hover:bg-red-50 transition-colors">
                  Stop Bot
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
