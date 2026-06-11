"use client";

import { useState } from "react";
import { Zap, Plus, Search } from "lucide-react";
import { SolanaIcon } from "@/components/core/solana-icon";

type Mode = "custom" | "bundle";
const WALLET_OPTIONS = [5, 10, 15, 20, 25];
const SPEED_OPTIONS = [
  { label: "Gentle", range: "90-150s", value: "gentle" },
  { label: "Moderate", range: "20-40s", value: "moderate" },
  { label: "Fast", range: "10-20s", value: "fast" },
];

export function BumpBotPage() {
  const [mode, setMode] = useState<Mode>("custom");
  const [tokenAddress, setTokenAddress] = useState("");
  const [wallets, setWallets] = useState(10);
  const [speed, setSpeed] = useState("moderate");
  const [budget, setBudget] = useState("0.5");

  const budgetNum = parseFloat(budget) || 0;
  const bumpSize = 0.003;
  const costPerBump = 0.00017;
  const bumpsPerHour = speed === "gentle" ? 30 : speed === "moderate" ? 120 : 300;
  const totalBumps = budgetNum > 0 ? Math.floor(budgetNum / costPerBump) : 0;
  const willLast = bumpsPerHour > 0 ? (totalBumps / bumpsPerHour).toFixed(1) : "0";

  return (
    <div className="flex gap-3 mx-auto max-w-3xl">
      {/* Left — Create form */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4">
        {/* Title */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
            <Zap size={15} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-[13px] font-semibold text-gray-900">Bump Bot</h1>
            <p className="text-[10px] text-gray-400">Keep your token visible with automated bumps</p>
          </div>
        </div>

        {/* Section header */}
        <div className="flex items-center gap-1 text-[11px] font-medium text-gray-700 mb-2">
          <Plus size={11} /> Create Bump Bot
        </div>

        {/* Mode toggle */}
        <div className="flex bg-gray-100 rounded-md p-0.5 mb-3">
          {(["custom", "bundle"] as Mode[]).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-1 rounded-md text-[11px] font-medium transition-colors ${
                mode === m ? "bg-green-500 text-white" : "text-gray-500 hover:text-gray-700"
              }`}>
              {m === "custom" ? "Custom CA" : "From Bundle"}
            </button>
          ))}
        </div>

        {/* Token Address */}
        <div className="mb-3">
          <label className="text-[10px] font-medium text-gray-700 mb-1 block">Token Address</label>
          <div className="relative">
            <input type="text" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Enter token CA..."
              className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-[11px] text-gray-700 placeholder-gray-300 bg-gray-50 focus:outline-none focus:border-green-400 pr-8" />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-green-100 hover:bg-green-200 rounded flex items-center justify-center">
              <Search size={10} className="text-green-600" />
            </button>
          </div>
        </div>

        {/* Number of Wallets */}
        <div className="mb-3">
          <label className="text-[10px] font-medium text-gray-700 mb-1.5 block">Number of Wallets</label>
          <div className="flex gap-1.5">
            {WALLET_OPTIONS.map((n) => (
              <button key={n} onClick={() => setWallets(n)}
                className={`w-9 h-7 rounded text-[11px] font-medium border transition-colors ${
                  wallets === n ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
                }`}>
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
                className={`flex-1 py-1.5 rounded border text-center transition-colors ${
                  speed === s.value ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
                }`}>
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

        {/* Submit */}
        <button className="w-full flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-[12px] font-medium py-2 rounded-lg transition-colors">
          <Plus size={12} /> Create Bump Bot
        </button>
      </div>

      {/* Right — Active bots */}
      <div className="w-56 bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-1.5 mb-3">
          <Zap size={12} className="text-gray-500" />
          <span className="text-[12px] font-semibold text-gray-800">Active Bots</span>
        </div>
        <div className="flex flex-col items-center justify-center h-40 gap-2">
          <Zap size={24} className="text-gray-200" />
          <p className="text-[11px] text-gray-400 font-medium">No active bump bots</p>
          <p className="text-[10px] text-gray-300">Create one to get started</p>
        </div>
      </div>
    </div>
  );
}
